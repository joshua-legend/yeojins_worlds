"use client";

export default function TabButton({ tab, activeTab, icon, label, onClick }) {
  const isActive = activeTab === tab;

  return (
    <button
      onClick={onClick}
      className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors ${
        isActive
          ? "text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
          : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900"
      }`}
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );
}

