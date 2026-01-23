import React, { createContext, useState, useCallback } from "react";

export const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback(({ title, description, variant }) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, description, variant }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map(({ id, title, description, variant }) => (
          <div
            key={id}
            className={`rounded-md px-4 py-3 shadow-md text-white ${
              variant === "destructive" ? "bg-red-600" : "bg-green-600"
            }`}
          >
            <strong>{title}</strong>
            <p className="text-sm">{description}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
