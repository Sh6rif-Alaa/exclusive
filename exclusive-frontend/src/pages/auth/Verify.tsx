import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { verifyOtpSchema } from "../../schema/auth/auth.validation";
import type { verifyOtpType } from "../../schema/auth/auth.dto";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { reSendOtp, verifyEmail } from "../../redux/slice/authSlice";
import { setResetOtp } from "../../redux/slice/authFlowSlice";
import type { ErrorValidation, ErrorValidationType } from "../../types/errorValidation";
import OtpInputField from "../../components/form/OtpInput";
import Image from "../../components/home/Image";
import authImage from "../../assets/images/capture_20260202183654141.bmp";
import LoadingButton from "../../components/loading/loadingButton";
import { RotatingLines } from "react-loader-spinner";

const Verify = () => {
    // for resend button
    const isLoading = useAppSelector((state) => state.auth.loading)

    // if signUp and want verfiy email
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");
    const type = searchParams.get("type");

    const navigate = useNavigate();

    // if forget password and want reset password
    const { email: resetEmail } = useAppSelector((state) => state.authFlow);
    const dispatch = useAppDispatch();

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<verifyOtpType>({
        resolver: zodResolver(verifyOtpSchema),
        defaultValues: {
            otp: "",
        },
    });

    const handleResendOTP = async () => {
        if (email || resetEmail) {
            await dispatch(reSendOtp({ email: email || resetEmail, type: email ? 'confirmEmail' : 'forgetPassword' })).unwrap().then(() => {
                toast.success("OTP sent successfully");
            }).catch((error: ErrorValidationType) => {
                // error from validation array of objects
                if (Array.isArray(error)) error?.map((e: ErrorValidation) => toast.error(e.message))
                // error from server
                else toast.error(error as unknown as string);
            });
        }
    }

    const onSubmit = async (data: verifyOtpType) => {
        // if forget password and want reset password
        if (resetEmail) {
            await dispatch(verifyEmail({ otp: data.otp, email: resetEmail, type: 'forgetPassword' })).unwrap().then(() => {
                dispatch(setResetOtp(data.otp))
                toast.success("Email Verified Successfully! reset your password now");
                navigate("/reset-password");
            }).catch((error) => {
                toast.error(error as string);
            });
        }
        // if signUp and want verfiy email
        else if (email && type === "confirmEmail") {
            await dispatch(verifyEmail({ otp: data.otp, email, type: 'confirmEmail' })).unwrap().then(() => {
                toast.success("Email Verified Successfully try login now");
                navigate("/login");
            }).catch((error) => {
                toast.error(error as string);
            });
        } else {
            toast.error("Please verify your email first");
            navigate("/login");
        }
    };

    return (
        <section className="my-14">
            <div className="container-otp">
                <div className="grid pt-8 grid-cols-1 md:grid-cols-2 gap-4">
                    <div> <Image src={authImage} alt="Auth" className="w-full sm:h-[80vh]" /> </div>

                    <div className="flex justify-center items-center">
                        <div className="w-[90%] sm:w-[60%]">
                            <h2 className="text-3xl md:text-4xl font-semibold">Verify Your Email</h2>

                            <p className="mt-4">Code sent to <span className="text-primary font-semibold">{email || resetEmail}</span>
                                {(email || resetEmail) && " if the email is not sent or want send again click "}
                                <button
                                    onClick={handleResendOTP} disabled={isLoading}
                                    className="text-primary font-semibold underline underline-offset-4 cursor-pointer"> {isLoading ?
                                        <RotatingLines
                                            width="24"
                                            height="24"
                                            strokeColor="#fff"
                                            ariaLabel="rotating-lines-loading"
                                        /> : "resend otp"}
                                </button>
                            </p>

                            <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                                <Controller
                                    control={control}
                                    name="otp"
                                    render={({ field }) => (
                                        <OtpInputField
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                />

                                {errors.otp && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.otp.message}
                                    </p>
                                )}

                                <LoadingButton isSubmitting={isSubmitting} text="Verify Code" />

                                <Link to="/forget-password" className="block text-center mt-4 hover:text-primary transition-colors duration-300 ">Back</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Verify;