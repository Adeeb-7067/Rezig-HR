import React, { createContext, useContext, useState } from "react";
import { toastStyles, ToastType } from "./toastConfig";

const ToastContext = createContext(null);

// SVG Icons as React components
const ToastIcon = ({ type }: { type: ToastType }) => {
  switch (type) {
    case "success":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
    case "warning":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case "alert":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      );
    case "error":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      );
    case "loading":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
          <path d="M21 12a9 9 0 11-6.219-8.56" />
        </svg>
      );
    case "info":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
        </svg>
      );
    default:
      return null;
  }
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<{ id: number; message: string; type: ToastType }[]>([]);

  const showToast = (message: string, type: ToastType = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* TOAST UI */}
    
      <div className="fixed top-5 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-[420px] flex flex-col gap-3 z-50">
        {toasts.map((t) => {
          const style = toastStyles[t.type];

          return (
            <div
              key={t.id}
              className={`
                flex items-center justify-between
                px-3 py-2 sm:px-4
                rounded-lg
                border-l-4
                shadow-md
                ${style.bg} ${style.border}
              `}
            
            >
            
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                {/* Circular icon badge */}
             
                <div
                  className={`
                    flex items-center justify-center
                    w-7 h-7 sm:w-9 sm:h-9 rounded-full flex-shrink-0
                    ${style.iconBg}
                    ${t.type === "loading" ? "animate-spin" : ""}
                  `}
                >
                  <ToastIcon type={t.type} />
                </div>

                {/* Label + Message */}
                {/*
                  FIX 5: Added `min-w-0` to this wrapper and replaced `flex-wrap` with
                  a column stack on the smallest breakpoint so long messages don't push
                  the close button off-screen.
                    - Mobile  → column layout, tighter text sizes
                    - sm+     → row layout with original sizes
                */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 min-w-0">
                  <span className={`text-sm sm:text-base font-bold leading-tight ${style.labelColor}`}>
                    {style.label}
                  </span>
                  {/*
                    FIX 6: Added `truncate` as a safety net so an extremely long
                    single-word message can't burst the layout at any screen size.
                    Remove `truncate` if you always want the full message visible.
                  */}
                  <span className="text-xs sm:text-sm text-gray-500 font-normal truncate">
                    {t.message}
                  </span>
                </div>
              </div>

              {/* RIGHT: Close button */}
              {/*
                FIX 7: Changed `ml-4` to `ml-2 sm:ml-4` so the close button doesn't
                eat into the already-tight space on narrow screens.
              */}
              <button
                onClick={() => removeToast(t.id)}
                className={`
                  flex items-center justify-center
                  w-7 h-7 rounded-full flex-shrink-0 ml-2 sm:ml-4
                  ${style.closeBg}
                  hover:opacity-80 transition-opacity
                `}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);