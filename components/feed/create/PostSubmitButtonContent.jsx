export default function ButtonContent({ isLoading }) {
  if (isLoading) {
    return (
      <>
        <span>⏳</span>
        <span>작성 중...</span>
      </>
    );
  }

  return (
    <>
      <span>🚀</span>
      <span>게시하기</span>
    </>
  );
}

