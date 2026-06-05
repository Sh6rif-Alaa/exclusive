import { Link } from "react-router-dom";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../components/form/FormInput";
import authImage from "../../assets/images/capture_20260202183654141.bmp";
import { signInSchema } from "../../schema/auth/auth.validation";
import type { signInType } from "../../schema/auth/auth.dto";
import { signInFields } from "../../data/authFields";

const Login = () => {
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
        console.log(data);

        // await loginMutation.mutateAsync(data);
    };

    return (
        <section id="login" className="my-14">
            <div className="container-login">
                <div className="grid pt-8 grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="left col-span-1">
                        <img className="w-full sm:h-[80vh]" src={authImage} alt="Login" />
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

                                <div className="my-8 flex justify-between items-center">
                                    <button type="submit" disabled={isSubmitting} className="bg-primary text-white px-8 py-3 disabled:opacity-50 cursor-pointer hover:bg-primary/80 transition-colors duration-300">
                                        {isSubmitting ? "Logging In..." : "Log In"}
                                    </button>

                                    <Link to="/forget-password" className="hover:text-primary transition-colors duration-300">Forget Password?</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;