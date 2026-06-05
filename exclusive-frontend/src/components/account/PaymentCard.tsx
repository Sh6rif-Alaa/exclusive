import { Trash2, Star } from "lucide-react";
import type { PaymentCardProps } from "../../types/account.type";
import Image from "../home/Image";

const cardIcons: Record<string, string> = {
    visa: "https://img.icons8.com/color/48/visa.png",
    mastercard: "https://img.icons8.com/color/48/mastercard.png",
    amex: "https://img.icons8.com/color/48/amex.png",
};

const PaymentCard = ({ method, onDelete, onSetDefault }: PaymentCardProps) => {
    return (
        <div className={`border rounded-lg p-4 flex items-center justify-between gap-4 transition-all ${method.isDefault
            ? "border-primary bg-primary/5"
            : "border-gray-200 dark:border-gray-700"
            }`}>
            <div className="flex items-center gap-4">
                <Image src={cardIcons[method.type]} alt={method.type} skeleton={true} className="h-8 w-auto" />
                <div>
                    <p className="font-medium text-sm">•••• •••• •••• {method.last4}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {method.holder} · Expires {method.expiry}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {method.isDefault ? (
                    <span className="text-xs text-primary font-semibold">Default</span>
                ) : (
                    <button
                        onClick={() => onSetDefault(method.id)}
                        className="p-1.5 text-gray-400 hover:text-yellow-500 transition-colors cursor-pointer"
                        title="Set as default">
                        <Star size={16} />
                    </button>
                )}
                <button
                    onClick={() => onDelete(method.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                    aria-label="Remove card">
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};

export default PaymentCard;
