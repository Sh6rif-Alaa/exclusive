import Breadcrumb from "../../shared/header/Breadcrumb";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactUsSchema } from "../../schema/auth/auth.validation";
import type { ContactUsType } from "../../schema/auth/auth.dto";
import { contactFields } from "../../schema/auth/authFields";
import FormInput from "../../components/form/FormInput";
import FormTextarea from "../../components/form/FormTextarea";
import { Mail, Phone } from "lucide-react";

const ContactUs = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<ContactUsType>({
        resolver: zodResolver(contactUsSchema),

        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: "",
        },
    });

    const onSubmit = async (data: ContactUsType) => {
        console.log(data);
        // await contactMutation.mutateAsync(data);
        reset();
    };

    return (
        <>
            <Breadcrumb
                items={[
                    { label: "Home", href: "/", },
                    { label: "Contact Us", },
                ]}
            />

            <section id="contact-us" className="pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* Left */}
                        <div className="md:col-span-1 bg-white dark:bg-slate-800 shadow-lg rounded-md p-8 flex flex-col gap-8 border border-gray-100 dark:border-none">

                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="bg-primary p-3 rounded-full w-10 h-10 flex items-center justify-center">
                                        <Phone color="white" />
                                    </div>
                                    <h3 className="font-bold text-lg"> Call To Us</h3>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <p> We are available 24/7, 7 days a week. </p>
                                    <p> Phone: +8801611112222 </p>
                                </div>
                            </div>

                            <hr />

                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="bg-primary p-3 rounded-full w-10 h-10 flex items-center justify-center">
                                        <Mail color="white" />
                                    </div>

                                    <h3 className="font-bold text-lg">Write To Us</h3>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <p> Fill out our form and we will contact you within 24 hours. </p>
                                    <p> customer@exclusive.com </p>
                                    <p> support@exclusive.com </p>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="md:col-span-2 bg-white dark:bg-slate-800 shadow-lg rounded-md p-8 border border-gray-100 dark:border-none">

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                                    {contactFields.map(
                                        (field) => (
                                            <FormInput<ContactUsType>
                                                key={field.name}
                                                name={field.name}
                                                type={field.type}
                                                style='w-full bg-gray-100 dark:bg-dark-input text-black dark:text-white placeholder-gray-500 border border-transparent focus:border-primary rounded-md p-4 text-sm outline-none transition-all'
                                                placeholder={field.placeholder}
                                                {...field}
                                                register={register}
                                                errors={errors}
                                            />
                                        )
                                    )}
                                </div>

                                <FormTextarea<ContactUsType>
                                    name="message"
                                    placeholder="Your Message"
                                    register={register}
                                    errors={errors}
                                />

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-md font-medium transition-all active:scale-95 text-sm shadow-md disabled:opacity-50 cursor-pointer">
                                        {isSubmitting ? "Sending..." : "Send Message"}
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactUs;