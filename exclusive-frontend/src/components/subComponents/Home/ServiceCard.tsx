interface ServiceCardProps {
    title: string;
    description: string;
    icon: React.ElementType;
}

export default function ServiceCard({ title, description, icon: Icon, }: ServiceCardProps) {
    return (
        <div className="flex flex-col items-center gap-4 group">
            <div className="size-20 bg-gray-300 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-2">
                <div className="size-14 bg-black text-white rounded-full flex items-center justify-center">
                    <Icon size={24} />
                </div>
            </div>
            <div className="space-y-1 text-center">
                <h3 className="font-bold uppercase text-lg font-inter">
                    {title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {description}
                </p>
            </div>
        </div>
    );
}