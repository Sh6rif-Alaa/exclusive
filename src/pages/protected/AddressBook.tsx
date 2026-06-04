import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { addressesData as initialAddresses, type Address, type AddressKind, } from "../../data/accountData";
import { addressSchema } from "../../schema/user/user.validation";
import type { AddressFormType } from "../../schema/user/user.dto";
import AddressCard from "../../components/account/AddressCard";
import FormInput from "../../components/form/FormInput";
import { addressFormFields } from "../../data/authFields";

const inputStyle =
    "w-full border border-gray-200 dark:border-gray-600 rounded-md p-3 bg-white dark:bg-gray-700 dark:text-white placeholder:text-gray-400 outline-none focus:border-primary transition-colors";

const addressTypes: { value: AddressKind; label: string }[] = [
    { value: "home", label: "Home" },
    { value: "work", label: "Work" },
    { value: "other", label: "Other" },
];

const AddressBook = () => {
    const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
    const [showForm, setShowForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
    } = useForm<AddressFormType>({
        resolver: zodResolver(addressSchema),
        defaultValues: { fullName: "", phone: "", address: "", city: "", type: "home" },
    });

    // handlers
    const handleEdit = (address: Address) => {
        setEditingAddress(address);
        setValue("fullName", address.fullName);
        setValue("phone", address.phone);
        setValue("address", address.address);
        setValue("city", address.city);
        setValue("type", address.type);
        setShowForm(true);
    };

    const handleDelete = (id: string) => {
        setAddresses((prev) => prev.filter((a) => a.id !== id));
        // TODO: API  DELETE /addresses/:id
    };

    const handleSetDefault = (id: string) => {
        setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
        // TODO: API  PATCH /addresses/:id/default
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingAddress(null);
        reset({ fullName: "", phone: "", address: "", city: "", type: "home" });
    };

    const onSubmit: SubmitHandler<AddressFormType> = async (data) => {
        if (editingAddress) {
            setAddresses((prev) =>
                prev.map((a) => (a.id === editingAddress.id ? { ...a, ...data } : a))
            );
            // TODO: API  PUT /addresses/:editingAddress.id  { ...data }
        } else {
            const newAddress: Address = {
                id: Date.now().toString(),
                isDefault: addresses.length === 0,
                ...data,
            };
            setAddresses((prev) => [...prev, newAddress]);
            // TODO: API  POST /addresses  { ...data }
        }
        handleCancel();
    };

    return (
        <div className="shadow-md rounded-md p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-lg text-primary">Address Book</h2>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 text-sm bg-primary text-white px-4 py-2 rounded hover:bg-red-600 transition-colors cursor-pointer">
                        <Plus size={16} /> Add Address
                    </button>
                )}
            </div>

            {/* ── Add / Edit form ── */}
            {showForm && (
                <form onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="mb-6 p-5 border border-primary/30 rounded-lg bg-primary/5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-sm">
                            {editingAddress ? "Edit Address" : "Add New Address"}
                        </h3>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                            aria-label="Close"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                        {addressFormFields.map((field) => (
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

                    {/* Address type select */}
                    <div className="mb-5">
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Address Type
                        </label>
                        <select
                            {...register("type")}
                            className={inputStyle}
                        >
                            {addressTypes.map(({ value, label }) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                        {errors.type && (
                            <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-primary text-white px-8 py-2.5 rounded hover:bg-red-600 transition-colors text-sm font-medium disabled:opacity-50 cursor-pointer">
                        {isSubmitting ? "Saving…" : editingAddress ? "Update Address" : "Save Address"}
                    </button>
                </form>
            )}

            {/* ── Address grid ── */}
            {addresses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                        <AddressCard
                            key={address.id}
                            address={address}
                            onDelete={handleDelete}
                            onSetDefault={handleSetDefault}
                            onEdit={handleEdit}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center py-12 text-sm text-gray-500 dark:text-gray-400">
                    No addresses saved yet.
                </p>
            )}
        </div>
    );
};

export default AddressBook;
