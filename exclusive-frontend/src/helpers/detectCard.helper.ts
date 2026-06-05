import type { CardType } from "../types/dashboard.type";

// Detect card type from first digit (simplified)
export const detectCardType = (number: string): CardType => {
    if (number.startsWith("4")) return "visa";
    if (number.startsWith("5")) return "mastercard";
    return "visa";
};