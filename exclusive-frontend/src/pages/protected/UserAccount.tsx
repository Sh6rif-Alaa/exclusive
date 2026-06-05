import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema } from "../../schema/user/user.validation";
import type { UpdateProfileType } from "../../schema/user/user.dto";
import FormInput from "../../components/form/FormInput";
import { profileInfoFields, passwordChangeFields } from "../../schema/auth/authFields";
import { useAppSelector } from "../../redux/store";

const inputStyle =
    "w-full p-3 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white placeholder:text-gray-400 outline-none focus:ring-1 focus:ring-primary transition";

const UserAccount = () => {
    const user = useAppSelector((state) => state.auth.user);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<UpdateProfileType>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            firstName: user?.name?.split(" ")[0] ?? "",
            lastName: user?.name?.split(" ")[1] ?? "",
            email: user?.email ?? "",
            address: "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit: SubmitHandler<UpdateProfileType> = async (data) => {
        console.log("Profile update:", data);
        // TODO: API  PUT /users/profile  { firstName, lastName, email, address, ...passwordFields }
    };

    return (
        <div className="shadow-md rounded-md p-6">
            <h2 className="font-semibold text-lg text-primary mb-6">Edit Your Profile</h2>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/*  Personal info (2-col grid)  */}
                <div className="grid sm:grid-cols-2 gap-x-8 mb-2">
                    {profileInfoFields.map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm font-medium mb-2">
                                {field.label}
                            </label>
                            <FormInput
                                name={field.name}
                                type={field.type}
                                placeholder={field.placeholder}
                                register={register}
                                errors={errors}
                                style={inputStyle}
                            />
                        </div>
                    ))}
                </div>

                {/*  Password changes  */}
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-4">
                        Password Changes
                        <span className="ml-2 text-xs text-gray-400 font-normal">
                            (leave blank to keep current password)
                        </span>
                    </label>
                    {passwordChangeFields.map((field) => (
                        <FormInput
                            key={field.name}
                            name={field.name}
                            type={field.type}
                            placeholder={field.placeholder}
                            register={register}
                            errors={errors}
                            style={inputStyle}
                        />
                    ))}
                </div>

                {/*  Actions  */}
                <div className="flex gap-3 justify-end">
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="shadow-md text-gray-700 dark:text-gray-300 px-8 py-3 rounded-sm hover:bg-primary hover:text-white transition-colors duration-300 font-medium cursor-pointer">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-primary text-white px-10 py-3 rounded-sm hover:bg-red-600 transition-colors duration-300 font-medium disabled:opacity-50 cursor-pointer">
                        {isSubmitting ? "Saving…" : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserAccount;
