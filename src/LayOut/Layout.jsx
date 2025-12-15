"use client";
import React, { useState, useEffect } from "react";
import SideBar from "../Pages/SideBar";
import Navbar from "../Pages/Navbar";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    onChange(); // set initial
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

export default function Layout({ children }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Desktop sidebar: open by default
  const [desktopOpen, setDesktopOpen] = useState(true);
  // Mobile drawer: always closed by default
  const [mobileOpen, setMobileOpen] = useState(false);

  // If we move from mobile -> desktop, make sure drawer is closed
  useEffect(() => {
    if (isDesktop) setMobileOpen(false);
  }, [isDesktop]);

  const toggleSideBar = () => {
    if (isDesktop) setDesktopOpen((v) => !v);
    else setMobileOpen((v) => !v);
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden ">
      {/* Navbar */}
      <div className="flex-none z-10">
        <Navbar onMenuClick={toggleSideBar} />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`hidden md:block bg-white dark:border-r dark:bg-gray-900 shadow-xl overflow-y-auto transition-all duration-300 ease-in-out ${
            desktopOpen ? "w-48" : "w-0"
          }`}
          aria-hidden={!isDesktop}
        >
          <SideBar isCollapsed={!desktopOpen} />
        </aside>

        {/* Mobile drawer — ONLY mounted when open */}
        {mobileOpen && !isDesktop && (
          <div className="fixed inset-0 z-30 flex md:hidden">
            {/* Overlay */}
            <button
              type="button"
              aria-label="Close sidebar overlay"
              className="fixed inset-0 bg-black opacity-40"
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <aside className="relative w-48 bg-white dark:border-r  dark:bg-gray-900 shadow-xl h-full overflow-y-auto transform transition-transform duration-300 ease-in-out translate-x-0">
              <SideBar isCollapsed={false} />
            </aside>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}
