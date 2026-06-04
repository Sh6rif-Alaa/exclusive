import { useEffect, useState } from "react";

export function useCountdown(targetDate: Date) {
    const calculateTimeLeft = () => {
        const difference = targetDate.getTime() - Date.now();

        if (difference <= 0) {
            return {
                days: "00",
                hours: "00",
                minutes: "00",
                seconds: "00",
            };
        }

        return {
            days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
            hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
            minutes: String(Math.floor((difference / (1000 * 60)) % 60)).padStart(2, "0"),
            seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return timeLeft;
}