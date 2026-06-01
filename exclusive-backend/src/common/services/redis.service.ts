import { createClient, RedisClientType } from "redis"
import { AppError } from "../utils/globalErrorHandler"
import env from "../../config/config.service"
import { emailEnum } from "../enum/email.enum"
import { Types } from "mongoose"

interface SetValueParams {
    key: string
    value: any
    ttl?: number | undefined
};

interface OTPParams {
    email: string
    subject?: emailEnum
}

// redis connect
const client: RedisClientType = createClient({ url: env.REDIS_URL });

client.on('error', () => {
    console.log('faild connect redis')
})

export const connect = async () => {
    await client.connect()
    console.log('redis connected Successfully')
}

// redis keys
export const revokeKey = ({ userId, jti }: { userId: Types.ObjectId, jti?: string }) => {
    return `revoke_token::${userId}::${jti}`;
}

export const getRevokeKey = (userId: Types.ObjectId) => {
    return `revoke_token::${userId}`;
}

export const getProfileKey = (userId: Types.ObjectId) => {
    return `profile::${userId}`;
}

export const otpKey = ({ email, subject = emailEnum.confirmEmail }: OTPParams) => {
    return `otp::${subject}::${email}`;
}

export const maxOtpKey = ({ email, subject = emailEnum.confirmEmail }: OTPParams) => {
    return `otp_max::${subject}::${email}`;
}

export const blockedOtpKey = ({ email, subject = emailEnum.confirmEmail }: OTPParams) => {
    return `otp_blocked::${subject}::${email}`;
}

// redis services
export const setValue = async ({ key, value, ttl }: SetValueParams) => {
    try {
        const data = typeof value === "string" ? value : JSON.stringify(value);
        return ttl ? await client.set(key, data, { EX: ttl }) : await client.set(key, data)
    } catch (error) {
        console.error("Error setting value in redis", error);
        throw new AppError('Error setting value in redis', 500);
    }
}

export const getValue = async (key: string): Promise<string | null> => {
    try {
        const value = await client.get(key)
        if (!value) return null

        try {
            return JSON.parse(value)
        } catch {
            return value
        }
    } catch (error) {
        console.error("Error getting value from redis", error);
        throw new AppError('Error getting value from redis', 500);
    }
}

export const updateValue = async ({ key, value, ttl }: SetValueParams) => {
    try {
        const isExist = await exists(key);
        if (!isExist) return;

        return await setValue({ key, value, ttl });
    } catch (error) {
        console.error("Error updating value in redis", error);
        throw new AppError('Error updating value in redis', 500);
    }
}

export const ttl = async (key: string): Promise<number> => {
    try {
        return await client.ttl(key);
    } catch (error) {
        console.error("Error getting ttl from redis", error);
        throw new AppError('Error getting ttl from redis', 500);
    }
}

export const expire = async ({ key, ttl: ttlValue }: { key: string, ttl: number }): Promise<number> => {
    try {
        return await client.expire(key, ttlValue);
    } catch (error) {
        console.error("Error setting expire in redis", error);
        throw new AppError('Error setting expire in redis', 500);
    }
}

export const exists = async (key: string): Promise<number> => {
    try {
        return await client.exists(key);
    } catch (error) {
        console.error("Error checking key existence", error);
        throw new AppError('Error checking key existence', 500);
    }
}

export const del = async (key: string | string[]): Promise<number> => {
    try {
        if (!key || (Array.isArray(key) && key.length === 0)) return 0;
        return await client.del(key);
    } catch (error) {
        console.error("Error deleting key", error);
        throw new AppError('Error deleting key', 500);
    }
}

export const keys = async (pattern: string): Promise<string[]> => {
    try {
        return await client.keys(`${pattern}*`);
    } catch (error) {
        console.error("Error getting keys", error);
        throw new AppError('Error getting keys', 500);
    }
}

export const incr = async (key: string): Promise<number> => {
    try {
        return await client.incr(key);
    } catch (error) {
        console.error("Error incrementing value", error);
        throw new AppError('Error incrementing value', 500);
    }
}