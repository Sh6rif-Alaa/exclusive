import type { FieldValues } from "react-hook-form";
import type { FormInputProps } from "../../types/components";

const FormInput = <T extends FieldValues>({ name, type, placeholder, register, errors, style }: FormInputProps<T>) => {
    return (
        <div className="mb-5">
            <input
                {...register(name)}
                type={type}
                placeholder={placeholder}
                className={style ? `${style}` : `w-full border-b p-3 placeholder:text-secondary outline-none`}
            />

            {errors[name] && (
                <p className="text-red-500 text-sm mt-1">
                    {String(errors[name]?.message ?? "")}
                </p>
            )}
        </div>
    );
};

export default FormInput