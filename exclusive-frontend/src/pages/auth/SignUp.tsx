import { Link } from "react-router-dom";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../schema/auth/auth.validation";
import type { signUpType } from "../../schema/auth/auth.dto";
import FormInput from "../../components/form/FormInput";
import { signUpFields } from "../../schema/auth/authFields";
import authImage from "../../assets/images/capture_20260202183654141.bmp";
import Image from "../../components/home/Image";
import { useAppDispatch } from "../../redux/store";
import { signUp } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingButton from "../../components/loading/loadingButton";

const SignUp = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<signUpType>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            userName: "",
            email: "",
            password: "",
            cPassword: "",
        },
    });

    const onSubmit: SubmitHandler<signUpType> = async (data) => {
        try {
            await dispatch(signUp(data)).unwrap();
            toast.success("email sent successfully, please verify your email to login");
            navigate(`/verify?email=${data.email}&type=confirmEmail`);
        } catch (error) {
            toast.error(error as string);
        }
    };

    return (
        <section id="register" className="my-14">
            <div className="container-signUp">
                <div className="grid pt-8 grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="left col-span-1"><Image src={authImage} alt="Auth" className="w-full sm:h-[80vh]" /></div>

                    <div className="right col-span-1 flex justify-center items-center flex-col">
                        <div className="w-[90%] sm:w-[60%]">
                            <h2 className="text-3xl md:text-4xl font-semibold font-inter">Create an account</h2>

                            <p className="mt-4"> Enter your details below</p>

                            <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                                {signUpFields.map((field) => (
                                    <FormInput
                                        key={field.name}
                                        name={field.name}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        register={register}
                                        errors={errors}
                                    />
                                ))}

                                <LoadingButton isSubmitting={isSubmitting} text="Sign Up" classess="w-full" />

                                <button type="button" className="border-2 w-full py-5 my-5 cursor-pointer hover:bg-primary hover:text-white transition-colors duration-300">Sign up with Google</button>
                            </form>

                            <p className="text-gray-400">Already have account?
                                <Link className="underline text-slate-800 dark:text-slate-200 hover:text-primary transition-colors duration-300 ms-1" to="/login">Log in</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default SignUp;