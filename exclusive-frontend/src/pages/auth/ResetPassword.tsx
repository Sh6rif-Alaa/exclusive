import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import authImage from "../../assets/images/capture_20260202183654141.bmp";
import FormInput from "../../components/form/FormInput";
import { resetPasswordFields } from "../../schema/auth/authFields";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import type { resetPasswordType } from "../../schema/auth/auth.dto";
import { resetPasswordSchema } from "../../schema/auth/auth.validation";
import Image from "../../components/home/Image";
import { resetPassword } from "../../redux/slice/authSlice";
import toast from "react-hot-toast";
import { clearResetFlow } from "../../redux/slice/authFlowSlice";
import LoadingButton from "../../components/loading/loadingButton";

const ResetPassword = () => {
    const { email, otp } = useAppSelector((state) => state.authFlow);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<resetPasswordType>({
        resolver: zodResolver(resetPasswordSchema)
    });

    if (!email || !otp) {
        return <Navigate to="/forget-password" replace />;
    }

    const onSubmit: SubmitHandler<any> = async (data) => {
        try {
            await dispatch(resetPassword({ email, otp, password: data.password, cPassword: data.cPassword })).unwrap()
            dispatch(clearResetFlow())
            toast.success("Password reset successfully, please login");
            navigate("/login");
        } catch (error) {
            toast.error(error as string);
        }
    };

    return (
        <section className="my-14">
            <div className="container-new-password">
                <div className="grid pt-8 grid-cols-1 md:grid-cols-2 gap-4">
                    <div> <Image src={authImage} alt="Auth" className="w-full sm:h-[80vh]" /> </div>

                    <div className="flex justify-center items-center">
                        <div className="w-[90%] sm:w-[60%]">
                            <h2 className="text-3xl md:text-4xl font-semibold">Create New Password</h2>

                            <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                                {resetPasswordFields.map((field) => (
                                    <FormInput
                                        key={field.name}
                                        {...field}
                                        type={field.type}
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        register={register}
                                        errors={errors}
                                    />
                                ))}

                                <LoadingButton isSubmitting={isSubmitting} text="Reset Password" />
                                
                                <Link to="/login" className="block text-center mt-4 hover:text-primary transition-colors duration-300" > Back to Login </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResetPassword;