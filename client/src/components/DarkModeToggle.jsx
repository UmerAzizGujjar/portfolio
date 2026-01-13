import { useTheme } from '../context/ThemeContext';

const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 group"
      aria-label="Toggle dark mode"
    >
      {/* Moon Icon - Show in Light Mode */}
      <svg
        className={`w-6 h-6 text-blue-400 transition-all duration-300 ${
          isDarkMode ? 'opacity-0 scale-0 -rotate-90' : 'opacity-100 scale-100 rotate-0'
        } absolute`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>

      {/* Sun Icon - Show in Dark Mode */}
      <svg
        className={`w-6 h-6 text-yellow-500 transition-all duration-300 ${
          isDarkMode ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-90'
        } absolute`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      {/* Placeholder for sizing */}
      <div className="w-6 h-6 opacity-0">
        <svg viewBox="0 0 24 24">
          <path d="M12 3v1m0 16v1m9-9h-1M4 12H3" />
        </svg>
      </div>
    </button>
  );
};

export default DarkModeToggle;
