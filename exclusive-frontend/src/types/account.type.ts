import type { Address, PaymentMethod, Review, TrackingStep } from "../mockData/accountData";

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
    review: Review;
    onEdit: (review: Review) => void;
    onDelete: (id: string) => void;
}

export interface TrackStepProps {
    step: TrackingStep;
    isLast: boolean;
}