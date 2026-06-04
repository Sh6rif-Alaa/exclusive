export const signUpFields = [
    {
        name: "userName",
        type: "text",
        placeholder: "Username",
    },
    {
        name: "email",
        type: "email",
        placeholder: "Email",
    },
    {
        name: "password",
        type: "password",
        placeholder: "Password",
    },
    {
        name: "cPassword",
        type: "password",
        placeholder: "Confirm Password",
    },
] as const;

export const signInFields = [
    {
        name: "email",
        type: "email",
        placeholder: "Email",
    },
    {
        name: "password",
        type: "password",
        placeholder: "Password",
    },
] as const;

export const forgotPasswordFields = [
    {
        name: "email",
        type: "email",
        placeholder: "Email Address",
    },
] as const;

export const verifyFields = [
    {
        name: "otp",
        type: "text",
        placeholder: "Enter OTP",
    },
] as const;

export const resetPasswordFields = [
    {
        name: "password",
        type: "password",
        placeholder: "New Password",
    },
    {
        name: "cPassword",
        type: "password",
        placeholder: "Confirm Password",
    },
] as const;

export const contactFields = [
    {
        name: "name",
        type: "text",
        placeholder: "Your Name *",
    },
    {
        name: "email",
        type: "email",
        placeholder: "Your Email *",
    },
    {
        name: "phone",
        type: "tel",
        placeholder: "Your Phone *",
    },
] as const;