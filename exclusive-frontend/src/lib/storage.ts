export const loadFromStorage = (key: string) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
};

export const saveToStorage = (key: string, value: unknown) => localStorage.setItem(key, JSON.stringify(value))

export const removeFromStorage = (key: string) => localStorage.removeItem(key)

// clear all storage except dark mode
export const clearStorage = () => {
    const theme = localStorage.getItem("coursehub-theme")
    localStorage.clear()
    if (theme) localStorage.setItem("coursehub-theme", theme)
}