import * as z from "zod";
import { orderUpdateSchema, trackingStepSchema } from "./dashboard.validation";

export type TrackingStepFormType = z.infer<typeof trackingStepSchema>;
export type OrderUpdateFormType = z.infer<typeof orderUpdateSchema>;
