'use client';

import { useState, useEffect, useRef } from 'react';
import { Music } from 'lucide-react';

export function BGMPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    const tryPlay = async () => {
      try {
        await audio.play();
      } catch {
        // 浏览器自动播放限制，等待用户交互
        console.log('Autoplay prevented by browser, waiting for user interaction.');
      }
    };

    // 挂载时尝试自动播放
    tryPlay();

    // 备选方案：在用户第一次点击页面时尝试播放
    const onInteract = () => {
      tryPlay();
      document.removeEventListener('click', onInteract);
    };
    document.addEventListener('click', onInteract);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      document.removeEventListener('click', onInteract);
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} src="/music/bgm.mp3" loop />
      <button
        onClick={togglePlay}
        className={`p-3 rounded-full shadow-lg shadow-festive/20 backdrop-blur-md transition-all duration-300 flex items-center justify-center ${
          isPlaying
            ? 'bg-festive/90 text-white hover:bg-festive'
            : 'bg-white/80 text-festive border border-festive/20 hover:bg-white'
        }`}
        title={isPlaying ? '暂停音乐' : '播放音乐'}
      >
        <Music className={`w-5 h-5 ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`} />
      </button>
    </div>
  );
}
