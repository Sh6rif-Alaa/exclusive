import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { paymentMethodsData } from "../../mockData/accountData";
import { paymentMethodSchema } from "../../schema/user/user.validation";
import type { PaymentMethodType } from "../../schema/user/user.dto";
import PaymentCard from "../../components/account/PaymentCard";
import FormInput from "../../components/form/FormInput";
import { paymentCardFields } from "../../schema/auth/authFields";
import type { PaymentMethod } from "../../types/dashboard.type";
import { detectCardType } from "../../helpers/detectCard.helper";

const inputStyle =
    "w-full border border-gray-200 dark:border-gray-600 rounded-md p-3 bg-white dark:bg-gray-700 dark:text-white placeholder:text-gray-400 outline-none focus:border-primary transition-colors";

const PaymentMethods = () => {
    const [methods, setMethods] = useState<PaymentMethod[]>(paymentMethodsData); // TODO: API GET /payment-methods
    const [showForm, setShowForm] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<PaymentMethodType>({
        resolver: zodResolver(paymentMethodSchema),
        defaultValues: { cardHolder: "", cardNumber: "", expiryDate: "", cvv: "" },
    });

    // handlers
    const handleDelete = (id: string) => {
        setMethods((prev) => prev.filter((m) => m.id !== id));
        // TODO: API  DELETE /payment-methods/:id
    };

    const handleSetDefault = (id: string) => {
        setMethods((prev) => prev.map((m) => ({ ...m, isDefault: m.id === id })));
        // TODO: API  PATCH /payment-methods/:id/default
    };

    const handleCloseForm = () => {
        setShowForm(false);
        reset();
    };

    const onSubmit: SubmitHandler<PaymentMethodType> = async (data) => {
        const newMethod: PaymentMethod = {
            id: Date.now().toString(),
            type: detectCardType(data.cardNumber),
            last4: data.cardNumber.slice(-4),
            holder: data.cardHolder,
            expiry: data.expiryDate,
            isDefault: methods.length === 0,
        };
        setMethods((prev) => [...prev, newMethod]);
        // TODO: API  POST /payment-methods  { ...data }

        handleCloseForm();
    };

    return (
        <div className="shadow-md rounded-md p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-lg text-primary">My Payment Options</h2>
                <button
                    onClick={() => (showForm ? handleCloseForm() : setShowForm(true))}
                    className="flex items-center gap-2 text-sm bg-primary text-white px-4 py-2 rounded hover:bg-red-600 transition-colors cursor-pointer"
                >
                    {showForm ? <X size={16} /> : <Plus size={16} />}
                    {showForm ? "Cancel" : "Add Card"}
                </button>
            </div>

            {/* Add card form  */}
            {showForm && (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="mb-6 p-5 border border-primary/30 rounded-lg bg-primary/5">
                    <h3 className="font-semibold mb-4 text-sm">Add New Card</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                        {paymentCardFields.map((field) => (
                            <div key={field.name}>
                                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
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

                    <button type="submit" disabled={isSubmitting} className="bg-primary text-white px-8 py-2.5 rounded hover:bg-red-600 transition-colors text-sm font-medium disabled:opacity-50 cursor-pointer">
                        {isSubmitting ? "Saving…" : "Save Card"}
                    </button>
                </form>
            )}

            {/* Saved cards */}
            <div className="space-y-3">
                {methods.length > 0 ? (
                    methods.map((method) => (
                        <PaymentCard
                            key={method.id}
                            method={method}
                            onDelete={handleDelete}
                            onSetDefault={handleSetDefault}
                        />
                    ))
                ) : (
                    <p className="text-center py-12 text-sm text-gray-500 dark:text-gray-400">
                        No payment methods saved yet.
                    </p>
                )}
            </div>
        </div>
    );
};

export default PaymentMethods;
