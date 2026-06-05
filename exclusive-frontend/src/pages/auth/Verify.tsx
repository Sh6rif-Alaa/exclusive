import { Link, Navigate, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import authImage from "../../assets/images/capture_20260202183654141.bmp";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setResetOtp } from "../../redux/slice/authFlowSlice";
import { verifyOtpSchema } from "../../schema/auth/auth.validation";
import type { verifyOtpType } from "../../schema/auth/auth.dto";
import OtpInputField from "../../components/form/OtpInput";
import Image from "../../components/home/Image";


const Verify = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const email = useAppSelector(
        (state) => state.authFlow.email
    );

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

    if (!email) {
        return <Navigate to="/forget-password" replace />;
    }

    const onSubmit = async (data: verifyOtpType) => {
        dispatch(setResetOtp(data.otp));
        navigate("/reset-password");
    };

    return (
        <section className="my-14">
            <div className="container-otp">
                <div className="grid pt-8 grid-cols-1 md:grid-cols-2 gap-4">
                    <div> <Image src={authImage} alt="Auth" className="w-full sm:h-[80vh]" /> </div>

                    <div className="flex justify-center items-center">
                        <div className="w-[90%] sm:w-[60%]">
                            <h2 className="text-3xl md:text-4xl font-semibold">Verify Your Email</h2>

                            <p className="mt-4">Code sent to {email}</p>

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

                                <button type="submit" disabled={isSubmitting} className="bg-primary text-white w-full py-4 mt-6 cursor-pointer hover:bg-primary/80 transition-colors duration-300">
                                    {isSubmitting ? "Verifying..." : "Verify Code"}
                                </button>

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