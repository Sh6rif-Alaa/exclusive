const SectionCard = ({ icon: Icon, title, description, children }: { icon: React.ElementType; title: string; description: string; children: React.ReactNode; }) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
            <div className="flex items-start gap-3 px-5 py-4 border-b border-gray-100 dark:border-slate-700">
                <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={17} className="text-primary" />
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white">{title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{description}</p>
                </div>
            </div>
            <div className="p-5 space-y-4">{children}</div>
        </div>
    );
}

export default SectionCard