export default function EmptyState({ icon = "📝", title = "아직 피드가 없습니다", description = "첫 번째 피드를 작성해보세요! ✨" }) {
  return (
    <div className="p-8 text-center text-gray-500 dark:text-gray-400">
      <div className="text-4xl mb-4">{icon}</div>
      <div className="text-lg font-semibold mb-2">{title}</div>
      <div className="text-sm">{description}</div>
    </div>
  );
}

