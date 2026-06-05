import { useEffect, useRef, useState } from "react";
import { MoonLoader } from "react-spinners";

interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> {
    src: string;
    alt: string;
    fallbackSrc?: string;
    lazy?: boolean;
    skeleton?: boolean;
}

const Image = ({
    src,
    alt,
    fallbackSrc = "https://placehold.co/600x400/red/white?font=oswald&text=no+img",
    lazy = true,
    skeleton = false,
    className = "",
    decoding = "async",
    fetchPriority,
    onLoad,
    onError,
    ...props
}: ImageProps) => {
    const [imageSrc, setImageSrc] = useState(src);
    const [isLoaded, setIsLoaded] = useState(false);
    const isFallback = useRef(false);

    useEffect(() => {
        setImageSrc(src);
        setIsLoaded(false);
        isFallback.current = false;
    }, [src]);

    const resolvedFetchPriority = fetchPriority ?? (lazy ? "low" : "high");

    return (
        <div className="relative inline-block">
            {skeleton && (
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                    <MoonLoader color="#db4444" />
                </div>
            )}
            <img
                {...props}
                src={imageSrc}
                alt={alt}
                loading={lazy ? "lazy" : "eager"}
                decoding={decoding}
                fetchPriority={resolvedFetchPriority}
                className={`${className} transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                onLoad={(e) => {
                    setIsLoaded(true);
                    onLoad?.(e);
                }}
                onError={(e) => {
                    if (fallbackSrc && !isFallback.current) {
                        isFallback.current = true;
                        setImageSrc(fallbackSrc);
                    }
                    onError?.(e);
                }}
            />
        </div>
    );
};

export default Image;