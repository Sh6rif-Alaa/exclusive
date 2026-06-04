import { OTPInput } from "input-otp";
import type { OtpInputProps } from "../../types/components";

const OtpInputField = ({ value, onChange }: OtpInputProps) => {
    return (
        <OTPInput
            maxLength={6}
            value={value}
            onChange={onChange}
            inputMode="numeric"
            pattern="[0-9]*"
            autoFocus
            containerClassName="flex justify-between gap-2 mb-4"
            render={({ slots }) => (
                <>
                    {slots.map((slot, index) => (
                        <div
                            key={index}
                            className={`w-12 h-14 flex items-center justify-center text-2xl font-semibold border-2 rounded-md transition-all
                                ${slot.isActive ? "border-primary" : "border-gray-300"}`}>
                            {slot.char || (
                                slot.isActive && (
                                    <div className="w-px h-6 bg-black animate-pulse" />
                                )
                            )}
                        </div>
                    ))}
                </>
            )}
        />
    );
};

export default OtpInputField;