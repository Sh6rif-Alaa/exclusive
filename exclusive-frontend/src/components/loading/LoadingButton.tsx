import { RotatingLines } from "react-loader-spinner"

const LoadingButton = ({ isSubmitting, text, classess }: { isSubmitting: boolean, text: string, classess?: string }) => {
    return (
        <button type="submit" disabled={isSubmitting} className={`bg-primary text-white py-4 px-6 rounded-md disabled:opacity-50 cursor-pointer hover:bg-primary/80 transition-colors duration-300 flex justify-center items-center ${classess || ""}`}>
            {isSubmitting ? <RotatingLines
                width="24"
                height="24"
                strokeColor="#fff"
                ariaLabel="rotating-lines-loading"
            /> : text}
        </button>

    )
}

export default LoadingButton