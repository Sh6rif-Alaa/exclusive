export const emailTemplate = ({ email, userName = "User", otp, type = "confirmEmail" }: { email?: string, userName?: string | undefined, otp: string, type?: string | undefined }) => {

  return `
  <!DOCTYPE html>
  <html>
  <body style="font-family:Arial; background:#f4f7fb; padding:20px;">
    
    <div style="max-width:600px; margin:auto; background:#fff; padding:30px; border-radius:12px;">
      
      <h2>Hello ${userName}</h2>

      <p>
        ${type === "forgetPassword"
      ? "You requested to reset your password. Use the code below:"
      : "Use the following code to verify your email:"
    }
      </p>

      <h1 style="letter-spacing:8px; color:#2563eb;">
        ${otp}
      </h1>

      <p>
        ${type === "forgetPassword"
      ? "If you didn’t request a password reset, you can ignore this email."
      : "This code is valid for a limited time."
    }
      </p>

      <hr/>

      <a href=${`http://localhost:5173/verify${type === "confirmEmail" ? `?email=${email}&type=confirmEmail` : ''}`} target="_blank">
      <button style="color: #fff; background-color: #db4444; border-color: #db4444; padding: 10px 20px; border-radius: 5px; cursor: pointer; border: none;">
        ${type === "forgetPassword"
      ? "Reset Password"
      : "Verify Email"
    }
      </button>
      </a>

      <p style="font-size:12px; color:#999;">
        exclusive Security System
      </p>

    </div>

  </body>
  </html>
  `
}