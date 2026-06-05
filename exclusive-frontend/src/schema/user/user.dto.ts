import * as z from "zod";
import { updateProfileSchema, checkoutSchema, addressSchema, reviewSchema, paymentMethodSchema } from "./user.validation";

export type UpdateProfileType = z.infer<typeof updateProfileSchema>;
export type CheckoutType = z.infer<typeof checkoutSchema>;
export type AddressFormType = z.infer<typeof addressSchema>;
export type ReviewFormType = z.infer<typeof reviewSchema>;
export type PaymentMethodType = z.infer<typeof paymentMethodSchema>;
