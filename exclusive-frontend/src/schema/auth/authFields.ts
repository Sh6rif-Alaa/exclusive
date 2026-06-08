// Sign Up Fields

export const signUpFields = [
    { name: "userName", type: "text", placeholder: "Username", },
    { name: "email", type: "email", placeholder: "Email", },
    { name: "password", type: "password", placeholder: "Password", },
    { name: "cPassword", type: "password", placeholder: "Confirm Password", },
] as const;

// Sign In Fields

export const signInFields = [
    { name: "email", type: "email", placeholder: "Email", },
    { name: "password", type: "password", placeholder: "Password", },
] as const;

// Forgot Password Fields

export const forgotPasswordFields = [
    { name: "email", type: "email", placeholder: "Email Address", },
] as const;

// Verify OTP Fields

export const verifyFields = [
    { name: "otp", type: "text", placeholder: "Enter OTP", },
] as const;

// Reset Password Fields

export const resetPasswordFields = [
    { name: "password", type: "password", placeholder: "New Password", },
    { name: "cPassword", type: "password", placeholder: "Confirm Password", },
] as const;

// Contact Form Fields

export const contactFields = [
    { name: "name", type: "text", placeholder: "Your Name *", },
    { name: "email", type: "email", placeholder: "Your Email *", },
    { name: "phone", type: "tel", placeholder: "Your Phone *", },
] as const;


//  User Account / Profile 

export const profileInfoFields = [
    { name: "firstName", type: "text", label: "First Name", placeholder: "John" },
    { name: "lastName", type: "text", label: "Last Name", placeholder: "Doe" },
    { name: "email", type: "email", label: "Email", placeholder: "john@example.com" },
    { name: "address", type: "text", label: "Address", placeholder: "123 Main St" },
] as const;

export const passwordChangeFields = [
    { name: "currentPassword", type: "password", placeholder: "Current Password" },
    { name: "newPassword", type: "password", placeholder: "New Password" },
    { name: "reNewPassword", type: "password", placeholder: "Confirm New Password" },
] as const;

//  Checkout / Billing 

export const checkoutBillingFields = [
    { name: "firstName", type: "text", label: "First Name *", placeholder: "John" },
    { name: "company", type: "text", label: "Company Name", placeholder: "Acme Corp" },
    { name: "street", type: "text", label: "Street Address *", placeholder: "123 Main Street" },
    { name: "apartment", type: "text", label: "Apartment, floor, etc. (optional)", placeholder: "Apt 4B" },
    { name: "city", type: "text", label: "Town / City *", placeholder: "New York" },
    { name: "phone", type: "tel", label: "Phone Number *", placeholder: "+1 234 567 8900" },
    { name: "email", type: "email", label: "Email Address *", placeholder: "john@example.com" },
] as const;

//  Address Book 

export const addressFormFields = [
    { name: "fullName", type: "text", label: "Full Name *", placeholder: "John Doe" },
    { name: "phone", type: "tel", label: "Phone Number *", placeholder: "+1 234 567 8900" },
    { name: "address", type: "text", label: "Street Address *", placeholder: "123 Main Street" },
    { name: "city", type: "text", label: "City *", placeholder: "New York" },
] as const;

//  Payment Card 

export const paymentCardFields = [
    { name: "cardHolder", type: "text", label: "Card Holder Name *", placeholder: "John Doe" },
    { name: "cardNumber", type: "text", label: "Card Number *", placeholder: "1234567890123456" },
    { name: "expiryDate", type: "text", label: "Expiry Date (MM/YY) *", placeholder: "12/26" },
    { name: "cvv", type: "password", label: "CVV *", placeholder: "***" },
] as const;
