import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import { Toaster } from "react-hot-toast";
import Marketplace from "./pages/Marketplace/Marketplace";
import MyCollection from "./pages/MyCollection/MyCollection";
import CommunityFeed from "./pages/CommunityFeed/CommunityFeed";

function AppContent() {
  const { theme, toggleTheme } = useApp();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-8">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Collector Hub
              </span>
              <nav className="flex h-16 space-x-8">
                <NavLink
                  to="/marketplace"
                  className={({ isActive }) =>
                    `inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors ${
                      isActive
                        ? "border-slate-950 text-slate-950 dark:border-white dark:text-white"
                        : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                    }`
                  }
                >
                  Marketplace
                </NavLink>
                <NavLink
                  to="/collection"
                  className={({ isActive }) =>
                    `inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors ${
                      isActive
                        ? "border-slate-950 text-slate-950 dark:border-white dark:text-white"
                        : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                    }`
                  }
                >
                  My Collection
                </NavLink>
                <NavLink
                  to="/community"
                  className={({ isActive }) =>
                    `inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors ${
                      isActive
                        ? "border-slate-950 text-slate-950 dark:border-white dark:text-white"
                        : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                    }`
                  }
                >
                  Community Feed
                </NavLink>
              </nav>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? (
                // Sun Icon
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                // Moon Icon
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Navigate to="/marketplace" replace />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/collection" element={<MyCollection />} />
          <Route path="/community" element={<CommunityFeed />} />
          <Route path="*" element={<Navigate to="/marketplace" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
      <Toaster position="bottom-right" />
    </AppProvider>
  );
}

export default App;