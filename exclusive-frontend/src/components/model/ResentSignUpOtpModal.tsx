// import { useAppDispatch } from "../../redux/store";
// import { resendOTP } from "../../redux/slice/authSlice";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import toast from "react-hot-toast";

// const ResentSignUpOtpModal = ({ email }: { email: string }) => {
//     const dispatch = useAppDispatch()
//     const navigate = useNavigate()

//     const handleResendOTP = () => {
//         dispatch(resendOTP({ email }))
//         toast.success("email sent successfully, please verify your email to login")
//         navigate(`/verify?email=${email}&type=signup`)
//     }

//     useEffect(() => {
//         if (!email) {
//             toast.error("please signIn first")
//             navigate("/login")
//         }
//     }, [])

//     return (
//         <div>
//             <h2>Resend OTP</h2>
//             <p>if you don't receive otp, please click on resend otp</p>
//             <button onClick={handleResendOTP}>Resend OTP</button>
//         </div>
//     );
// };