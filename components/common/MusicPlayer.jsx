"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 가사 데이터 예시 (시간(초), 가사)
// 총 3:17 (197초) 가정하여 주요 파트에 시간 배분
const lyrics = [
  { time: 0, text: "🎤 [Intro — 진(Leader Vocal)]" },
  { time: 3, text: "풀스택으로 가는 길," },
  { time: 7, text: "여긴 우리만의 클래스룸" },
  { time: 9, text: "Next.js vibe, Express ride" },
  { time: 12, text: "여진스월드, let’s boot up now!" },
  { time: 18, text: "🎶 [Verse 1 — 제이우(Sub Vocal)]" },
  { time: 20, text: "아침부터 디버깅, 커피보다 더 진해" },
  { time: 25, text: "API 문 열어봐, status 200이 뜨네" },
  { time: 31, text: "우리만의 프로젝트, commit마다 빛나" },
  { time: 36, text: "push하면 반짝이는 build의 향기가" },
  { time: 41, text: "🔥 [Rap — 도(Quite)]" },
  { time: 43, text: "Yo, 코드는 내 필체, flow는 MVC" },
  { time: 48, text: "Router 타고 흘러가는 나의 멜로디" },
  { time: 53, text: "Middleware처럼 난 너를 지나쳐도 깊지" },
  { time: 59, text: "Stack도 깊이 쌓여, 이것이 풀스택 스피릿" },
  { time: 64, text: "Next.js 서버 액션, hydration on the beat" },
  { time: 68, text: "frontend–backend 연결, 그게 바로 this click" },
  { time: 73, text: "배포할 때 render, cloud 위로 lift" },
  { time: 77, text: "여진스월드 업로딩, 준비됐어 shift!" },
  { time: 83, text: "🌈 [Pre-Chorus — 20-iron(Vocal)]" },
  { time: 85, text: "밤새워 짠 화면" },
  { time: 88, text: "네온처럼 빛나네" },
  { time: 91, text: "Hook처럼 맴돌아" },
  { time: 94, text: "이 기능에 취해가" },
  { time: 100, text: "🌟 [Chorus — 진 + 제이우 All]" },
  { time: 101, text: "국비! 지원! Full–Stack!" },
  { time: 105, text: "Next.js에 Express track" },
  { time: 109, text: "우리 심장 BPM은 Hot reload처럼 bang" },
  { time: 113, text: "코드처럼 이어져, 너와 나의 link tag" },
  { time: 117, text: "여진스월드의 첫 페이지, 지금 start!" },
  { time: 121, text: "국비! 지원! Full–Stack!" },
  { time: 125, text: "router 바꿔도 우린 strong" },
  { time: 129, text: "새벽 build 오류도 우린 웃고 넘어가" },
  { time: 134, text: "우리 log엔 victory만 남겨둬" },
  { time: 140, text: "🎶 [Verse 2 — 20-iron(Vocal)]" },
  { time: 142, text: "폴더 속에 숨겨둔" },
  { time: 145, text: "나만의 작은 함수" },
  { time: 148, text: "너에게만 보여줘" },
  { time: 151, text: "refactor된 나의 마음" },
  { time: 155, text: "🌊 [Rap 2 — 도(Quite)]" },
  { time: 157, text: "Swagger처럼 펼쳐봐, 우리의 히스토리" },
  { time: 160, text: "schema 맞춘 사랑은 strict type의 glory" },
  { time: 164, text: "JWT처럼 서로를 인증해" },
  { time: 167, text: "만료 안 돼, 영원히 validate" },
  { time: 171, text: "프레임워크 달라도 결국 너로 compile" },
  { time: 174, text: "module처럼 엮이는 건 destiny style" },
  { time: 177, text: "branch 나뉘어도 마지막은 merge" },
  { time: 180, text: "여진스월드 comeback, 네 마음을 surge" },
  { time: 184, text: "✨ [Bridge — 진]" },
  { time: 186, text: "서로 다른 언어라도" },
  { time: 189, text: "우린 결국 연결돼" },
  { time: 192, text: "built-in 같은 feeling" },
  { time: 194, text: "너에게 닿아가네" },
  { time: 197, text: "⭐ [Final Chorus — All]" },
  { time: 197, text: "국비! 지원! Full–Stack!" },
  { time: 200, text: "Next.js에 Express pack" },
  { time: 204, text: "우리 무대도 pipeline, stage마다 go react" },
  { time: 209, text: "디자인도 개발도 전부 여진스월드 style" },
  { time: 214, text: "이 universe의 root node는 너야" },
  { time: 220, text: "국비! 지원! Full–Stack!" },
  { time: 224, text: "버전업된 우리 track" },
  { time: 228, text: "debug된 감정들이 bundle 돼서 터져가" },
  { time: 234, text: "여진스월드의 첫 앨범, 지금 start!" },
  { time: 240, text: "🎤 [Outro — 제이우 + 도]" },
  { time: 241, text: "(제이우) 콘솔처럼 찍혀가는 memory of today" },
  { time: 247, text: "(도) 하지만 우린 clear 안 해, keep it all and play" },
  { time: 253, text: "(둘) 여진스월드, 풀스택 러브, begin again" },
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  // 현재 재생 중인 가사 찾기
  const getCurrentLyric = () => {
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= lyrics[i].time) {
        return lyrics[i];
      }
    }
    return lyrics[0];
  };

  const currentLyric = getCurrentLyric();

  // 재생/일시정지 토글
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // 시간 업데이트
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // 볼륨 조절
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <>
      {/* 오디오 요소 (음악 파일 경로는 나중에 추가) */}
      <audio
        ref={audioRef}
        src="/국비지원풀스택.mp3" // 실제 음악 파일 경로로 변경 필요
        loop
      />

      {/* 하단 미니 플레이어 */}
      <div className="fixed bottom-16 left-0 right-0 z-30">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/95 dark:bg-black/95 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3">
              {/* 재생 버튼 */}
              <button
                onClick={togglePlay}
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {isPlaying ? <span className="text-lg">⏸️</span> : <span className="text-lg ml-0.5">▶️</span>}
              </button>

              {/* 현재 가사 (클릭 시 확장) */}
              <div onClick={() => setIsExpanded(true)} className="flex-1 min-w-0 cursor-pointer">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentLyric.time}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm font-medium text-gray-900 dark:text-white truncate"
                  >
                    {currentLyric.text}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* 확장 버튼 */}
              <button onClick={() => setIsExpanded(true)} className="flex-shrink-0 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                <span className="text-lg">📋</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 확장 패널 (모달) */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* 배경 오버레이 */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsExpanded(false)} className="fixed inset-0 bg-black/50 z-40" />

            {/* 확장 패널 */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 bg-white dark:bg-black z-50 rounded-t-3xl shadow-2xl max-h-[80vh] flex flex-col"
            >
              {/* 헤더 */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">가사</h2>
                <button onClick={() => setIsExpanded(false)} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                  <span className="text-2xl">✕</span>
                </button>
              </div>

              {/* 가사 목록 */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="flex flex-col gap-2">
                  {lyrics.map((lyric, index) => {
                    const isActive = lyric.time === currentLyric.time;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className={`flex flex-col justify-center p-2 rounded-lg min-h-[46px] transition-all duration-200 ${
                          isActive
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100 font-semibold scale-[1.05] shadow-xl border-2 border-blue-400 dark:border-blue-600"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                        style={{
                          fontSize: isActive ? "1.15rem" : "1rem",
                          // active line bigger, inactive normal
                        }}
                      >
                        <div
                          className={`text-sm truncate break-keep ${isActive ? "whitespace-normal !truncate-none" : "whitespace-nowrap"}`}
                          style={{
                            lineHeight: isActive ? "1.9" : "1.5",
                            textAlign: isActive ? "center" : "start",
                          }}
                        >
                          {lyric.text}
                        </div>
                        <div className={`text-xs mt-1 ${isActive ? "text-blue-700 dark:text-blue-300 font-bold" : "text-gray-500 dark:text-gray-500"}`}>{Math.floor(lyric.time)}초</div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* 컨트롤 패널 */}
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
                {/* 재생 컨트롤 */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={togglePlay}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {isPlaying ? <span className="text-xl">⏸️</span> : <span className="text-xl ml-1">▶️</span>}
                  </button>
                </div>

                {/* 볼륨 조절 */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">🔊</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-400 w-8">{Math.round(volume * 100)}%</span>
                </div>

                {/* 시간 표시 */}
                <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                  {Math.floor(currentTime)}초 / {Math.floor(audioRef.current?.duration || 0)}초
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
