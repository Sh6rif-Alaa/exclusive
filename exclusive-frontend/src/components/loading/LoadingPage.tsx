import { ThreeCircles } from 'react-loader-spinner'

const LoadingPage = () => {
    return (
        <div className="flex justify-center items-center h-dvh">
            <ThreeCircles
                color="#4fa94d"
                ariaLabel="three-circles-loading"
            />
        </div>
    )
}

export default LoadingPage