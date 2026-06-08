import { Link } from "react-router-dom";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../components/form/FormInput";
import authImage from "../../assets/images/capture_20260202183654141.bmp";
import { signInSchema } from "../../schema/auth/auth.validation";
import type { signInType } from "../../schema/auth/auth.dto";
import { signInFields } from "../../schema/auth/authFields";
import Image from "../../components/home/Image";
import { useAppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signIn } from "../../redux/slice/authSlice";
import LoadingButton from "../../components/loading/LoadingButton";

const Login = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<signInType>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<signInType> = async (data) => {
        try {
            await dispatch(signIn({ email: data.email, password: data.password })).unwrap();
            toast.success("Login success");
            navigate("/");
        } catch (error) {
            toast.error(error as string);
        }
    };

    return (
        <section id="login" className="my-14">
            <div className="container-login">
                <div className="grid pt-8 grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="left col-span-1">
                        <Image src={authImage} alt="Auth" className="w-full sm:h-[80vh]" />
                    </div>

                    <div className="right col-span-1 flex justify-center items-center flex-col">
                        <div className="w-[90%] sm:w-[60%]">
                            <h2 className="text-3xl md:text-4xl font-semibold font-inter">Log in to Exclusive</h2>

                            <p className="mt-4"> Enter your details below</p>

                            <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                                {signInFields.map((field) => (
                                    <FormInput
                                        key={field.name}
                                        name={field.name}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        register={register}
                                        errors={errors}
                                    />
                                ))}

                                <div className="my-8 flex justify-between items-center gap-2">
                                    <LoadingButton isSubmitting={isSubmitting} text="Log In" />

                                    <Link to="/forget-password" className="hover:text-primary transition-colors duration-300 text-right">Forget Password?</Link>
                                </div>

                                <p className="text-center text-md">don't have an account? <Link to="/register" className="hover:text-primary transition-colors duration-300 font-semibold"> register</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;