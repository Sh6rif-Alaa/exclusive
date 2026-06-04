import { useState } from "react";

const UserAccount = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: API call to update profile
        console.log("Profile update:", formData);
    };

    const handleCancel = () => {
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            address: "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
    };

    return (
        <div className="shadow-md rounded-md p-6">
            <h2 className="font-semibold text-lg text-primary mb-6">
                Edit Your Profile
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="row mb-6 grid sm:grid-cols-2 gap-8">
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="Md"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full mt-4 p-3 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Rimel"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full mt-4 p-3 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                </div>
                <div className="row mb-6 grid sm:grid-cols-2 gap-8">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Wagdy@gmail.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full mt-4 p-3 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="1234 Mansoura, Egypt"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full mt-4 p-3 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                </div>
                <div className="row mb-6">
                    <label htmlFor="currentPassword">Password Changes</label>
                    <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        placeholder="Current Password"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="w-full mt-4 p-3 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
                    />
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full mt-4 p-3 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm New Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full mt-4 p-3 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
                    />
                </div>
                <div className="row flex gap-3 justify-end">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="shadow-md text-gray-700 dark:text-gray-300 px-8 py-3 rounded-sm hover:bg-primary hover:text-white transition-colors duration-300 font-medium ml-4 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-primary text-white px-10 py-3 rounded-sm hover:bg-red-600 transition-colors duration-300 font-medium cursor-pointer"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserAccount;
