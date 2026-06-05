const Field = ({ label, children }: { label: string; children: React.ReactNode; }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 sm:items-center">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</label>
            <div className="sm:col-span-2">{children}</div>
        </div>
    );
}

export default Field