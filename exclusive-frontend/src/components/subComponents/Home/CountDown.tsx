import { useCountdown } from "../../../hooks/useCountdown";

interface CountdownProps {
    targetDate: Date;
    variant?: "sales" | "ads";
}

const CountDown = ({ targetDate, variant = "sales" }: CountdownProps) => {
    const { days, hours, minutes, seconds } = useCountdown(targetDate);

    if (variant === "ads") {
        return (
            <div className="flex items-center justify-center md:justify-start gap-4 md:gap-6 [&_div]:bg-white [&_div]:text-black [&_div]:rounded-full [&_div]:size-14 [&_div]:md:size-18 [&_div]:flex [&_div]:flex-col [&_div]:items-center [&_div]:justify-center [&_div]:leading-tight [&_div]:shrink-0 [&_span]:font-bold [&_span]:text-md [&_span]:md:text-lg [&_span]:font-inter [&_p]:text-[10px] [&_p]:md:text-xs [&_p]:font-medium">
                {[days, hours, minutes, seconds].map((value, index) => (
                    <div key={index}>
                        <span>{value}</span>
                        <p>{["Days", "Hours", "Minutes", "Seconds"][index]}</p>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex items-center gap-4 md:gap-6 pb-1 [&_div]:flex [&_div]:flex-col [&_p]:text-xs [&_p]:font-medium [&_span]:text-3xl [&_span]:font-bold [&_span]:font-inter [&_span]:leading-none">
            <div>
                <p>Days</p>
                <span>{days}</span>
            </div>

            <span className="text-primary">:</span>

            <div>
                <p>Hours</p>
                <span>{hours}</span>
            </div>

            <span className="text-primary">:</span>

            <div>
                <p>Minutes</p>
                <span>{minutes}</span>
            </div>

            <span className="text-primary">:</span>

            <div>
                <p>Seconds</p>
                <span>{seconds}</span>
            </div>
        </div>
    );
}

export default CountDown;