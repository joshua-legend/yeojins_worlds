import ButtonContent from "./PostSubmitButtonContent";

export default function PostSubmitButton({ isLoading, disabled }) {
  return (
    <div className="flex justify-end">
      <button
        type="submit"
        disabled={disabled}
        className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold flex items-center gap-2"
      >
        <ButtonContent isLoading={isLoading} />
      </button>
    </div>
  );
}
