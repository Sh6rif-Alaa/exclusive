import type { FieldValues } from "react-hook-form";
import type { FormInputProps } from "../../types/components";

const FormTextarea = <T extends FieldValues>({ name, placeholder, register, errors }: FormInputProps<T>) => {
    return (
        <div>
            <textarea
                rows={8}
                placeholder={placeholder}
                {...register(name)}
                className="w-full bg-gray-100 dark:bg-slate-900 text-black dark:text-white placeholder-gray-500 border border-transparent focus:border-primary rounded-md p-4 text-sm outline-none resize-none transition-all"
            />

            {errors[name] && (
                <p className="text-red-500 text-sm mt-1">
                    {String(errors[name]?.message ?? "")}
                </p>
            )}
        </div>
    );
};

export default FormTextarea;