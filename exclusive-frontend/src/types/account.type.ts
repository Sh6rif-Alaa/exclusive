import type { Address, AdminReview, ITrackingStep, PaymentMethod } from "./dashboard.type";

export interface AddressCardProps {
    address: Address;
    onDelete: (id: string) => void;
    onSetDefault: (id: string) => void;
    onEdit: (address: Address) => void;
}

export interface PaymentCardProps {
    method: PaymentMethod;
    onDelete: (id: string) => void;
    onSetDefault: (id: string) => void;
}

export interface ReviewCardProps {
    review: AdminReview;
    onEdit: (review: AdminReview) => void;
    onDelete: (id: string) => void;
}

export interface TrackStepProps {
    step: ITrackingStep;
    isLast: boolean;
}