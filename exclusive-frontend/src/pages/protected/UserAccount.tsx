import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema } from "../../schema/user/user.validation";
import type { UpdateProfileType } from "../../schema/user/user.dto";
import FormInput from "../../components/form/FormInput";
import { profileInfoFields, passwordChangeFields } from "../../schema/auth/authFields";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect } from "react";
import { getProfile, updateMyPassword, updateProfile } from "../../redux/slice/userSlice";
import toast from "react-hot-toast";
import LoadingButton from "../../components/loading/LoadingButton";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slice/authSlice";
import type { IUser } from "../../types/user.type";

const inputStyle =
    "w-full p-3 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white placeholder:text-gray-400 outline-none focus:ring-1 focus:ring-primary transition";

const UserAccount = () => {
    const user = useAppSelector((state) => state.user.data as IUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<UpdateProfileType>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            firstName: user?.firstName ?? "",
            lastName: user?.lastName ?? "",
            email: user?.email ?? "",
            address: user?.address ?? "",
            currentPassword: "",
            newPassword: "",
            reNewPassword: "",
        },
    });

    useEffect(() => {
        const getUser = async () => {
            if (!user) {
                try {
                    const { data } = await dispatch(getProfile()).unwrap() as { data: IUser }
                    reset({ firstName: data.firstName, lastName: data.lastName, email: data.email, address: data?.address ?? "" })
                } catch (error) {
                    toast.error(error as string)
                }
            }
        }
        getUser()
    }, [])

    const onSubmit: SubmitHandler<UpdateProfileType> = async (data: UpdateProfileType) => {
        try {
            // if update Password
            if (data.currentPassword && data.newPassword && data.reNewPassword) {
                await dispatch(updateMyPassword({
                    currentPassword: data.currentPassword,
                    newPassword: data.newPassword,
                    reNewPassword: data.reNewPassword
                })).unwrap()
                reset({ newPassword: "", currentPassword: "", reNewPassword: "" })
                toast.success("New password updated successfully, please login again")
                await dispatch(logout()).unwrap()
                navigate("/login")
            }

            // if change data and update profile
            else if (data.email !== user?.email || data.firstName !== user?.firstName || data.lastName !== user?.lastName || data.address !== user?.address) {
                console.log(data)
                const { data: res } = await dispatch(updateProfile({
                    email: data.email,
                    userName: `${data.firstName} ${data.lastName}`,
                    address: data.address ?? ""
                })).unwrap() as { data: IUser }
                reset({ firstName: res.firstName, lastName: res.lastName, email: res.email, address: res?.address ?? "" })
                toast.success("Profile updated successfully")
            } else {
                toast.error("Please provide new data")
            }
        } catch (error) {
            toast.error(error as string)
        }
    };

    return (
        <div className="shadow-md rounded-md p-6">
            <h2 className="font-semibold text-lg text-primary mb-6">Edit Your Profile</h2>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/*  Personal info  */}
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
                    <LoadingButton isSubmitting={isSubmitting} text="Save Changes" />
                </div>
            </form>
        </div>
    );
};

export default UserAccount;
