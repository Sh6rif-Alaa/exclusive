const UserAvatar = ({ name }: { name: string }) => {
    const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
    const colors = ["bg-primary", "bg-blue-500", "bg-emerald-500", "bg-purple-500", "bg-amber-500"];
    const color = colors[name.charCodeAt(0) % colors.length];
    return (
        <div className={`size-8 rounded-full ${color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
            {initials}
        </div>
    );
}

export default UserAvatar;