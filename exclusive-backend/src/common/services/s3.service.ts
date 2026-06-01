import { DeleteObjectCommand, DeleteObjectsCommand, GetObjectCommand, ListObjectsV2Command, ObjectCannedACL, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import env from "../../config/config.service"
import { StorageEnum } from "../enum/multer_enum";
import { AppError } from "../utils/globalErrorHandler";
import { createReadStream } from "node:fs";
import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
    region: env.AWS_REGION,
    credentials: {
        accessKeyId: env.AWS_ACCESS_KEY,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY
    }
})

export const uploadFile = async ({
    store = StorageEnum.disk,
    Bucket = env.AWS_BUCKET_NAME as string,
    path = "general",
    ACL = "private" as ObjectCannedACL,
    file,
}: {
    store?: StorageEnum;
    Bucket?: string;
    path?: string | undefined;
    ACL?: ObjectCannedACL;
    file: Express.Multer.File;
}): Promise<string> => {
    const command = new PutObjectCommand({
        Bucket,
        Key: `${env.AWS_BUCKET_NAME}/${path}/${Date.now()}__${Math.random()}/${file.originalname}`,
        ACL,
        Body:
            store === StorageEnum.memory ? file.buffer : createReadStream(file.path),
        ContentType: file.mimetype,
    });

    await s3Client.send(command)
    if (!command.input?.Key) {
        throw new AppError("Fail to upload", 400);
    }
    return command.input.Key;
};

export const uploadLargeFile = async ({
    file,
    store = StorageEnum.disk,
    path = "General",
    ACL = ObjectCannedACL.private,
}: {
    file: Express.Multer.File;
    store?: StorageEnum;
    path?: string;
    ACL?: ObjectCannedACL;
}): Promise<string> => {
    const command = new Upload({
        client: s3Client,
        params: {
            Bucket: env.AWS_BUCKET_NAME,
            ACL,
            Key: `${env.AWS_BUCKET_NAME}/${path}/${Date.now()}__${Math.random()}/${file.originalname}`,
            Body: store === StorageEnum.memory ? file.buffer : createReadStream(file.path),
            ContentType: file.mimetype,
        },
    });

    command.on("httpUploadProgress", (progress) => {
        console.log(progress);
    });

    const result = await command.done();

    return result.Key as string;
}

export const uploadFiles = async ({
    files,
    store = StorageEnum.memory,
    path = "General",
    ACL = ObjectCannedACL.private,
    isLarge = false,
}: {
    files: Express.Multer.File[];
    store?: StorageEnum;
    path?: string;
    ACL?: ObjectCannedACL;
    isLarge?: boolean;
}): Promise<string[]> => {
    let urls: string[] = [];

    if (isLarge) {
        urls = await Promise.all(files.map((file) => {
            return uploadLargeFile({ file, store, path, ACL });
        }));
    } else {
        urls = await Promise.all(files.map((file) => {
            return uploadFile({ file, store: store!, path, ACL });
        }));
    }

    return urls;
}

export const createPreSignedUrl = async ({
    path,
    fileName,
    ContentType,
    expiresIn = 60,
}: {
    path: string;
    fileName: string;
    ContentType: string;
    expiresIn?: number;
}) => {
    const Key = `${env.AWS_BUCKET_NAME}/${path}/${Date.now()}__${Math.random()}/${fileName}`;
    const command = new PutObjectCommand({
        Bucket: env.AWS_BUCKET_NAME,
        Key,
        ContentType,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn });
    return { url, Key };
}

export const getFile = async (Key: string) => {
    const command = new GetObjectCommand({
        Bucket: env.AWS_BUCKET_NAME,
        Key,
    });

    return await s3Client.send(command);
}

export const getPreSignedUrl = async ({
    Key,
    expiresIn = 60,
    download = "true",
}: {
    Key: string;
    expiresIn?: number;
    download?: string | undefined;
}) => {
    const command = new GetObjectCommand({
        Bucket: env.AWS_BUCKET_NAME,
        Key,
        ResponseContentDisposition: download === "true"
            ? `attachment; filename="${Key.split("/").pop()}"`
            : undefined,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn });
    return url;
}

export const getFiles = async (folderName: string) => {
    const command = new ListObjectsV2Command({
        Bucket: env.AWS_BUCKET_NAME,
        Prefix: `${env.AWS_BUCKET_NAME}/${folderName}`,
    });

    return await s3Client.send(command);
}

export const deleteFile = async (Key: string) => {
    const command = new DeleteObjectCommand({
        Bucket: env.AWS_BUCKET_NAME,
        Key,
    });

    return await s3Client.send(command);
}

export const deleteFiles = async (Keys: string[]) => {
    const keyMapped = Keys.map((k) => {
        return { Key: k };
    });
    
    const command = new DeleteObjectsCommand({
        Bucket: env.AWS_BUCKET_NAME,
        Delete: {
            Objects: keyMapped,
        },
    });

    return await s3Client.send(command);
}

export const deleteFolder = async (folderName: string) => {
    const data = await getFiles(folderName);

    const keyMapped = data?.Contents?.map((k) => {
        return k.Key;
    });

    if (!keyMapped || keyMapped.length === 0) return;

    return await deleteFiles(keyMapped as string[]);
}