export function formatMoney(v: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
    }).format(v);
}

export function pctChange(current: number, previous: number) {
    if (previous === 0) return { value: 0, positive: true };
    const v = ((current - previous) / previous) * 100;
    return { value: Math.abs(v).toFixed(1), positive: v >= 0 };
}

export function formatShort(value: number) {
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
    return `$${value}`;
}