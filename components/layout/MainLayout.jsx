export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-white dark:bg-black pb-32">
      <div className="max-w-2xl mx-auto border-x border-gray-200 dark:border-gray-800">
        {children}
      </div>
    </div>
  );
}

