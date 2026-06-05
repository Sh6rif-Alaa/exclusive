import { useEffect, useState } from "react";
import axios from "axios";
import { Store, Bell, Truck, Save, Check } from "lucide-react";
import type { IAdminSettings } from "../../types/dashboard.type";
import { AdminSettingsData } from "../../mockData/dashboardData";
import SectionCard from "../../components/dashboard/settings/SectionCard";
import Field from "../../components/dashboard/settings/Field";
import TextInput from "../../components/dashboard/settings/TextInput";
import Toggle from "../../components/dashboard/settings/Toggle";
import NumberInput from "../../components/dashboard/settings/NumberInput";

const AdminSettings = () => {
  const [settings, setSettings] = useState<IAdminSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    axios
      .get<IAdminSettings>("/api/admin/settings")
      .then((res) => {
        if (typeof res.data === "string") throw new Error("no json");
        setSettings(res.data);
      })
      .catch(() => setSettings(AdminSettingsData))
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

  const set = <K extends keyof IAdminSettings>(
    section: K,
    key: keyof IAdminSettings[K],
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
export default AdminSettings;