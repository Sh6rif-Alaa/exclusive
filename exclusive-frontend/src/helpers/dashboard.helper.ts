import type { OrderStatus, TrackingEvent } from "../types/dashboard.type";

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

export function buildDefaultTracking(status: OrderStatus, date: string): TrackingEvent[] {
    const steps: { title: string; description: string }[] = [
        { title: "Order Placed", description: "Your order has been received and confirmed." },
        { title: "Processing", description: "We are preparing your items for shipment." },
        { title: "Shipped", description: "Your package is on its way." },
        { title: "Out for Delivery", description: "Your package is out for delivery today." },
        { title: "Delivered", description: "Your order has been delivered successfully." },
    ];
    const order: Record<OrderStatus, number> = {
        pending: 0, processing: 1, shipped: 2, delivered: 4, cancelled: -1,
    };
    const currentIdx = order[status] ?? 0;
    return steps.map((s, i) => ({
        id: String(i + 1),
        ...s,
        date: i <= currentIdx ? date : "",
        completed: i < currentIdx,
        current: i === currentIdx && status !== "cancelled",
    }));
}