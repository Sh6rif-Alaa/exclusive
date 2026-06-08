import { Link, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import authImage from "../../assets/images/capture_20260202183654141.bmp";
import FormInput from "../../components/form/FormInput";
import { forgetPasswordSchema } from "../../schema/auth/auth.validation";
import type { forgetPasswordType } from "../../schema/auth/auth.dto";
import { forgotPasswordFields } from "../../schema/auth/authFields";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setResetEmail } from "../../redux/slice/authFlowSlice";
import Image from "../../components/home/Image";
import toast from "react-hot-toast";
import { forgetPassword } from "../../redux/slice/authSlice";
import LoadingButton from "../../components/loading/LoadingButton";

const ForgotPassword = () => {
    const email = useAppSelector(state => state.authFlow.email)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<forgetPasswordType>({
        resolver: zodResolver(forgetPasswordSchema),
    });

    const onSubmit: SubmitHandler<forgetPasswordType> = async (data) => {
        try {
            if (email === data.email) {
                toast.success("already code sent to your email");
                navigate("/verify");
                return
            }
            await dispatch(forgetPassword({ email: data.email })).unwrap()
            dispatch(setResetEmail(data.email));
            toast.success("Code sent successfully");
            navigate("/verify");
        } catch (error) {
            toast.error(error as string);
        }
    };

    return (
        <section className="my-14">
            <div className="container-forget-password">
                <div className="grid pt-8 grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Image src={authImage} alt="Auth" className="w-full sm:h-[80vh]" />
                    </div>

                    <div className="flex justify-center items-center">
                        <div className="w-[90%] sm:w-[60%]">
                            <h2 className="text-3xl md:text-4xl font-semibold">Forget Password?</h2>

                            <p className="mt-4">Enter your email address.</p>

                            <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                                {forgotPasswordFields.map((field) => (
                                    <FormInput
                                        key={field.name}
                                        {...field}
                                        placeholder={field.placeholder}
                                        type={field.type}
                                        name={field.name}
                                        register={register}
                                        errors={errors}
                                    />
                                ))}

                                <LoadingButton isSubmitting={isSubmitting} text="Send Code" />

                                <Link to="/login" className="block text-center mt-4 hover:text-primary transition-colors duration-300">Back to Login</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;