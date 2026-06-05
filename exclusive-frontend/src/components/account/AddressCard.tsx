import { Trash2, Star, Edit2, Home, Briefcase, MapPin } from "lucide-react";
import type { AddressCardProps } from "../../types/account.type";
import type { AddressKind } from "../../types/dashboard.type";

//  Icons for address types
const typeIcons: Record<AddressKind, typeof Home> = {
    home: Home,
    work: Briefcase,
    other: MapPin,
};

const AddressCard = ({ address, onDelete, onSetDefault, onEdit }: AddressCardProps) => {
    const TypeIcon = typeIcons[address.type];

    return (
        <div className={`border rounded-lg p-4 transition-all ${address.isDefault
            ? "border-primary bg-primary/5"
            : "border-gray-200 dark:border-gray-700"
            }`}>
            {/* Card header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <TypeIcon size={16} className={address.isDefault ? "text-primary" : "text-gray-500"} />
                    <span className="text-sm font-medium capitalize">{address.type}</span>
                    {address.isDefault && <span className="text-xs text-primary font-semibold">Default</span>}
                </div>
                <div className="flex gap-1">
                    <button
                        onClick={() => onEdit(address)}
                        className="p-1.5 text-gray-400 hover:text-primary transition-colors cursor-pointer"
                        aria-label="Edit address">
                        <Edit2 size={14} />
                    </button>
                    {!address.isDefault && (
                        <button
                            onClick={() => onSetDefault(address.id)}
                            className="p-1.5 text-gray-400 hover:text-yellow-500 transition-colors cursor-pointer"
                            title="Set as default">
                            <Star size={14} />
                        </button>
                    )}
                    <button
                        onClick={() => onDelete(address.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                        aria-label="Delete address">
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>

            {/* Card body */}
            <p className="font-medium text-sm">{address.fullName}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{address.address}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{address.city}</p>
            <p className="text-sm text-gray-500 mt-1">{address.phone}</p>
        </div>
    );
};

export default AddressCard;
