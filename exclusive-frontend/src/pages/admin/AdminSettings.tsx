import { useEffect, useState } from "react";
import axios from "axios";
import { Store, Bell, Truck, Save, Check } from "lucide-react";
import type { AdminSettings } from "../../types/dashboard.type";

// Mock

const MOCK: AdminSettings = {
  store: {
    name: "Exclusive",
    email: "support@exclusive.com",
    phone: "+1 (555) 123-4567",
    address: "123 Commerce Street, New York, NY 10001",
    currency: "USD",
    timezone: "America/New_York",
  },
  notifications: {
    emailOnNewOrder: true,
    emailOnLowStock: true,
    emailOnNewUser: false,
    lowStockThreshold: 5,
  },
  shipping: {
    freeShippingThreshold: 100,
    standardShippingFee: 9.99,
    expressShippingFee: 24.99,
  },
};

// Sub-components

function SectionCard({ icon: Icon, title, description, children }: { icon: React.ElementType; title: string; description: string; children: React.ReactNode; }) {
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

function Field({ label, children }: { label: string; children: React.ReactNode; }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 sm:items-center">
      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</label>
      <div className="sm:col-span-2">{children}</div>
    </div>
  );
}

function TextInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string; }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
    />
  );
}

function NumberInput({ value, onChange, min, step, prefix }: {
  value: number; onChange: (v: number) => void; min?: number; step?: number; prefix?: string;
}) {
  return (
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
          {prefix}
        </span>
      )}
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        step={step}
        className={`w-full ${prefix ? "pl-7" : "px-3"} pr-3 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 number-spinner-hide`}
      />
    </div>
  );
}

function Toggle({ value, onChange, label, description }: { value: boolean; onChange: (v: boolean) => void; label: string; description?: string; }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>
        {description && (
          <p className="text-xs text-gray-400 mt-0.5">{description}</p>
        )}
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer shrink-0 ${value ? "bg-primary" : "bg-gray-200 dark:bg-slate-600"
          }`}
      >
        <span
          className={`inline-block size-4 rounded-full bg-white shadow-sm transition-transform ${value ? "translate-x-4.5" : "translate-x-0.5"
            }`}
        />
      </button>
    </div>
  );
}

// Pag

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    axios
      .get<AdminSettings>("/api/admin/settings")
      .then((res) => {
        if (typeof res.data === "string") throw new Error("no json");
        setSettings(res.data);
      })
      .catch(() => setSettings(MOCK))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      await axios.put("/api/admin/settings", settings);
    } catch {
      // mock: pretend it saved
    } finally {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  };

  const set = <K extends keyof AdminSettings>(
    section: K,
    key: keyof AdminSettings[K],
    value: unknown
  ) => {
    setSettings((prev) =>
      prev
        ? { ...prev, [section]: { ...prev[section], [key]: value } }
        : prev
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!settings) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Configure your store preferences and options.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all cursor-pointer shrink-0 ${saved
            ? "bg-emerald-500 text-white"
            : "bg-primary text-white hover:bg-primary/90"
            } disabled:opacity-70`}
        >
          {saved ? (
            <>
              <Check size={16} /> Saved!
            </>
          ) : saving ? (
            <>
              <div className="size-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              Saving…
            </>
          ) : (
            <>
              <Save size={16} /> Save Changes
            </>
          )}
        </button>
      </div>

      {/* Store Info */}
      <SectionCard
        icon={Store}
        title="Store Information"
        description="Basic information about your store."
      >
        <Field label="Store Name">
          <TextInput
            value={settings.store.name}
            onChange={(v) => set("store", "name", v)}
          />
        </Field>
        <Field label="Contact Email">
          <TextInput
            value={settings.store.email}
            onChange={(v) => set("store", "email", v)}
            placeholder="support@yourstore.com"
          />
        </Field>
        <Field label="Phone Number">
          <TextInput
            value={settings.store.phone}
            onChange={(v) => set("store", "phone", v)}
          />
        </Field>
        <Field label="Address">
          <TextInput
            value={settings.store.address}
            onChange={(v) => set("store", "address", v)}
          />
        </Field>
        <Field label="Currency">
          <select
            value={settings.store.currency}
            onChange={(e) => set("store", "currency", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
          >
            <option value="USD">USD – US Dollar</option>
            <option value="EUR">EUR – Euro</option>
            <option value="GBP">GBP – British Pound</option>
            <option value="EGP">EGP – Egyptian Pound</option>
            <option value="SAR">SAR – Saudi Riyal</option>
          </select>
        </Field>
        <Field label="Timezone">
          <select
            value={settings.store.timezone}
            onChange={(e) => set("store", "timezone", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
          >
            <option value="America/New_York">America/New_York</option>
            <option value="Europe/London">Europe/London</option>
            <option value="Africa/Cairo">Africa/Cairo</option>
            <option value="Asia/Dubai">Asia/Dubai</option>
            <option value="Asia/Riyadh">Asia/Riyadh</option>
          </select>
        </Field>
      </SectionCard>

      {/* Notifications */}
      <SectionCard
        icon={Bell}
        title="Notifications"
        description="Control which events trigger email notifications."
      >
        <Toggle
          value={settings.notifications.emailOnNewOrder}
          onChange={(v) => set("notifications", "emailOnNewOrder", v)}
          label="New Order"
          description="Receive an email whenever a new order is placed."
        />
        <div className="border-t border-gray-100 dark:border-slate-700" />
        <Toggle
          value={settings.notifications.emailOnLowStock}
          onChange={(v) => set("notifications", "emailOnLowStock", v)}
          label="Low Stock Alert"
          description="Receive an email when a product falls below the threshold."
        />
        {settings.notifications.emailOnLowStock && (
          <Field label="Low Stock Threshold">
            <NumberInput
              value={settings.notifications.lowStockThreshold}
              onChange={(v) => set("notifications", "lowStockThreshold", v)}
              min={1}
              step={1}
            />
          </Field>
        )}
        <div className="border-t border-gray-100 dark:border-slate-700" />
        <Toggle
          value={settings.notifications.emailOnNewUser}
          onChange={(v) => set("notifications", "emailOnNewUser", v)}
          label="New User Registration"
          description="Receive an email when a new customer signs up."
        />
      </SectionCard>

      {/* Shipping */}
      <SectionCard
        icon={Truck}
        title="Shipping & Delivery"
        description="Configure shipping fees and free-shipping thresholds."
      >
        <Field label="Free Shipping Above">
          <NumberInput
            value={settings.shipping.freeShippingThreshold}
            onChange={(v) => set("shipping", "freeShippingThreshold", v)}
            min={0}
            step={1}
            prefix="$"
          />
        </Field>
        <div className="border-t border-gray-100 dark:border-slate-700" />
        <Field label="Standard Shipping Fee">
          <NumberInput
            value={settings.shipping.standardShippingFee}
            onChange={(v) => set("shipping", "standardShippingFee", v)}
            min={0}
            step={0.01}
            prefix="$"
          />
        </Field>
        <div className="border-t border-gray-100 dark:border-slate-700" />
        <Field label="Express Shipping Fee">
          <NumberInput
            value={settings.shipping.expressShippingFee}
            onChange={(v) => set("shipping", "expressShippingFee", v)}
            min={0}
            step={0.01}
            prefix="$"
          />
        </Field>
      </SectionCard>
    </div>
  );
}
