/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Map, ChevronRight, ChevronLeft, Menu, X, Play, Pause, Volume2, Loader2, Flame } from 'lucide-react';
import { SURAHS } from './data';
import { Surah, Verse } from './types';

export default function App() {
  const [currentSurahIndex, setCurrentSurahIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showBismillah, setShowBismillah] = useState(true);
  const [viewMode, setViewMode] = useState<'arabic' | 'english' | 'dual'>('dual');
  const [streak, setStreak] = useState(0);
  
  // Audio state
  const [playingVerseId, setPlayingVerseId] = useState<string | null>(null);
  const [playingWordId, setPlayingWordId] = useState<string | null>(null);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSurah = useMemo(() => SURAHS[currentSurahIndex], [currentSurahIndex]);

  useEffect(() => {
    // Streak logic in useEffect
    const checkStreak = () => {
      const lastVisit = localStorage.getItem('last_visit');
      const currentStreak = parseInt(localStorage.getItem('streak_count') || '0', 10);
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

      if (!lastVisit) {
        // First time
        setStreak(1);
        localStorage.setItem('streak_count', '1');
        localStorage.setItem('last_visit', today.toString());
      } else {
        const lastVisitDate = parseInt(lastVisit, 10);
        const oneDay = 24 * 60 * 60 * 1000;
        const diff = today - lastVisitDate;

        if (diff === oneDay) {
          // Exactly one day later
          const newStreak = currentStreak + 1;
          setStreak(newStreak);
          localStorage.setItem('streak_count', newStreak.toString());
          localStorage.setItem('last_visit', today.toString());
        } else if (diff > oneDay) {
          // Missed a day
          setStreak(1);
          localStorage.setItem('streak_count', '1');
          localStorage.setItem('last_visit', today.toString());
        } else if (diff === 0) {
          // Same day
          setStreak(currentStreak || 1);
        } else {
          // Clock was moved back or something weird
          setStreak(currentStreak || 1);
        }
      }
    };

    checkStreak();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowBismillah(!currentSurah.isPartial);
    
    // Stop audio when changing surah
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayingVerseId(null);
      setPlayingWordId(null);
    }
  }, [currentSurahIndex, currentSurah]);

  const handleNext = () => {
    if (currentSurahIndex < SURAHS.length - 1) {
      setCurrentSurahIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSurahIndex > 0) {
      setCurrentSurahIndex(prev => prev - 1);
    }
  };

  const toggleAudio = (verse: Verse) => {
    const verseId = `${currentSurah.id}-${verse.number}`;
    
    if (playingVerseId === verseId) {
      audioRef.current?.pause();
      setPlayingVerseId(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    setPlayingWordId(null);
    const surahStr = currentSurah.surahNumber.toString().padStart(3, '0');
    const ayahStr = verse.number.toString().padStart(3, '0');
    const audioUrl = `https://everyayah.com/data/Alafasy_128kbps/${surahStr}${ayahStr}.mp3`;

    setIsAudioLoading(true);
    setPlayingVerseId(verseId);
    
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.oncanplaythrough = () => {
      setIsAudioLoading(false);
      audio.play().catch(err => {
        console.error("Audio play failed:", err);
        setPlayingVerseId(null);
        setIsAudioLoading(false);
      });
    };

    audio.onended = () => {
      setPlayingVerseId(null);
    };

    audio.onerror = () => {
      console.error("Audio load failed");
      setPlayingVerseId(null);
      setIsAudioLoading(false);
    };
  };

  const toggleWordAudio = (verse: Verse | 'bismillah', wordIndex: number) => {
    const id = verse === 'bismillah' ? 'bismillah' : `${currentSurah.id}-${verse.number}`;
    const wordId = `${id}-${wordIndex}`;
    
    if (playingWordId === wordId) {
      audioRef.current?.pause();
      setPlayingWordId(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    setPlayingVerseId(null);

    let surahStr, ayahStr;
    if (verse === 'bismillah') {
      surahStr = '001';
      ayahStr = '001';
    } else {
      surahStr = currentSurah.surahNumber.toString().padStart(3, '0');
      ayahStr = verse.number.toString().padStart(3, '0');
    }
    
    const wordStr = wordIndex.toString().padStart(3, '0');
    const audioUrl = `https://audio.qurancdn.com/wbw/${surahStr}_${ayahStr}_${wordStr}.mp3`;

    setPlayingWordId(wordId);
    
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.play().catch(err => {
      console.error("Word audio play failed:", err);
      setPlayingWordId(null);
    });

    audio.onended = () => {
      setPlayingWordId(null);
    };
  };

  return (
    <div className="flex h-screen bg-dark-bg text-[#d1d5db] overflow-hidden font-sans selection:bg-amber-accent selection:text-black">
      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-80 bg-dark-sidebar border-r border-dark-border flex flex-col shrink-0 transition-transform duration-300 lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-8 border-b border-dark-border flex items-center justify-between">
          <div>
            <h1 className="text-[#e5e7eb] text-2xl font-arabic tracking-tight flex items-center gap-3 italic">
              <span className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 text-sm not-italic font-bold">ن</span>
              Night Recitation
              <span className="text-[10px] not-italic font-sans text-gray-600 ml-1 font-medium tracking-normal mt-2">by Abrar Bashir</span>
            </h1>
            <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest font-semibold">Preserved Surahs</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className="relative">
                <Flame className={`w-5 h-5 ${streak > 0 ? 'text-amber-500 fill-amber-500/20 animate-pulse' : 'text-gray-600'}`} />
                {streak > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                )}
              </div>
              <span className="text-[10px] font-mono font-bold text-amber-500/80 mt-1">{streak}</span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-white/5 rounded-full lg:hidden"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
          {SURAHS.map((surah, idx) => (
            <button
              key={surah.id}
              onClick={() => {
                setCurrentSurahIndex(idx);
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }}
              className={`w-full group p-4 rounded-xl flex items-center gap-4 transition-all text-left ${
                idx === currentSurahIndex
                  ? 'bg-amber-500/10 border border-amber-500/30'
                  : 'hover:bg-white/5 border border-transparent'
              }`}
            >
              <span className={`text-xs font-mono transition-colors ${idx === currentSurahIndex ? 'text-amber-500/60' : 'text-gray-600'}`}>
                {(idx + 1).toString().padStart(2, '0')}
              </span>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className={`text-sm font-medium transition-colors ${idx === currentSurahIndex ? 'text-amber-100' : 'text-gray-300 group-hover:text-white'}`}>
                    {surah.englishName}
                  </p>
                  <p className={`arabic-text text-sm transition-colors ${idx === currentSurahIndex ? 'text-amber-500' : 'text-gray-500'}`}>
                    {surah.name}
                  </p>
                </div>
                <p className={`text-[10px] uppercase tracking-tighter transition-colors ${idx === currentSurahIndex ? 'text-amber-500/70' : 'text-gray-600'}`}>
                  {surah.isPartial ? 'Quranic Section' : `Surah ${surah.surahNumber}`}
                </p>
              </div>
              {idx === currentSurahIndex && (
                <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
              )}
            </button>
          ))}
        </div>

        <div className="p-6 border-t border-dark-border text-[9px] text-gray-600 flex justify-between tracking-widest font-bold uppercase">
          <span>{SURAHS.length} SECTIONS</span>
          <span>V1.0</span>
        </div>
      </aside>

      {/* Main Reader View */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background Decorative Text */}
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] select-none pointer-events-none hidden md:block">
          <span className="text-[180px] leading-none font-arabic">{currentSurah.name.split(' ').pop()}</span>
        </div>

        {/* Content Header */}
        <header className="px-6 md:px-12 pt-8 md:pt-16 pb-8 flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 z-10 shrink-0">
          <div className="flex items-center gap-4 md:block">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-white/5 rounded-full lg:hidden border border-white/10"
            >
              <Menu className="w-5 h-5 text-amber-500" />
            </button>
            <div className="lg:hidden flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full">
              <Flame className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-500 fill-amber-500/20" />
              <span className="text-[10px] md:text-sm font-mono font-bold text-amber-500">{streak}</span>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-arabic text-white tracking-tight">{currentSurah.englishName}</h2>
                <span className="text-lg sm:text-xl md:text-2xl font-arabic text-amber-500/80 mt-0.5">{currentSurah.name}</span>
              </div>
              <div className="flex items-center gap-3 mt-1 md:mt-2">
                <p className="text-amber-500 font-mono text-[9px] sm:text-xs md:text-sm tracking-widest uppercase text-balance">
                  {currentSurah.verses.length} Verses
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-1.5 sm:gap-2 mt-4 md:mt-0 flex-wrap">
            <button 
              onClick={() => setViewMode('arabic')}
              className={`px-3 sm:px-4 py-1.5 rounded-full border text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-all ${
                viewMode === 'arabic' ? 'bg-amber-500 text-black border-amber-500 shadow-lg shadow-amber-500/20' : 'border-dark-border text-gray-500 hover:border-amber-500/30'
              }`}
            >
              Arabic
            </button>
            <button 
              onClick={() => setViewMode('dual')}
              className={`px-3 sm:px-4 py-1.5 rounded-full border text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-all ${
                viewMode === 'dual' ? 'bg-amber-500 text-black border-amber-500 shadow-lg shadow-amber-500/20' : 'border-dark-border text-gray-500 hover:border-amber-500/30'
              }`}
            >
              Dual
            </button>
            <button 
              onClick={() => setViewMode('english')}
              className={`px-3 sm:px-4 py-1.5 rounded-full border text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-all ${
                viewMode === 'english' ? 'bg-amber-500 text-black border-amber-500 shadow-lg shadow-amber-500/20' : 'border-dark-border text-gray-500 hover:border-amber-500/30'
              }`}
            >
              English
            </button>
          </div>
        </header>

        {/* Reading Area */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-12 py-8 md:py-12 custom-scrollbar">
          <div className="max-w-3xl mx-auto space-y-16 md:space-y-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSurah.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-12 sm:space-y-16 md:space-y-20 pb-20"
              >
                {/* Bismillah */}
                {showBismillah && (
                  <div className="text-center pb-8 border-b border-white/5">
                    <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 mb-4" dir="rtl">
                      {'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'.split(' ').map((word, wIdx) => (
                        <span 
                          key={wIdx}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWordAudio('bismillah', wIdx + 1);
                          }}
                          className={`arabic-text text-3xl sm:text-4xl cursor-pointer transition-all hover:text-amber-400 ${
                            playingWordId === `bismillah-${wIdx + 1}` ? 'text-amber-500 scale-110 drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'text-amber-500/80'
                          }`}
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                    <p className="text-[10px] sm:text-xs text-gray-500 font-medium tracking-wide">In the Name of Allah, Most Compassionate, Most Merciful</p>
                  </div>
                )}

                {currentSurah.verses.map((verse) => (
                  <div 
                    key={`${currentSurah.id}-${verse.number}`} 
                    className="flex flex-col gap-6 sm:gap-8 group/verse cursor-pointer transition-all active:scale-[0.99]"
                    onClick={() => toggleAudio(verse)}
                  >
                    <div className="flex items-start justify-between gap-4 sm:gap-8">
                      <div className="flex flex-col items-center gap-3 sm:gap-4 pt-2 sm:pt-3 shrink-0">
                        <span className="text-[10px] sm:text-xs font-mono text-gray-600 w-10 sm:w-12 text-center">
                          {currentSurah.isPartial ? verse.number : `${currentSurah.surahNumber}:${verse.number}`}
                        </span>
                        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                          playingVerseId === `${currentSurah.id}-${verse.number}` 
                            ? 'bg-amber-500 text-black' 
                            : 'bg-white/5 text-gray-500 group-hover/verse:bg-white/10 group-hover/verse:text-amber-500'
                        }`}>
                          {playingVerseId === `${currentSurah.id}-${verse.number}` ? (
                            isAudioLoading ? (
                              <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                            ) : (
                              <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                            )
                          ) : (
                            <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5" />
                          )}
                        </div>
                      </div>
                      
                      {(viewMode === 'arabic' || viewMode === 'dual') && (
                        <div className={`arabic-text text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-right leading-[2.2] sm:leading-[2.6] flex-1 transition-colors flex flex-wrap justify-end gap-x-2 sm:gap-x-4 ${
                          playingVerseId === `${currentSurah.id}-${verse.number}` ? 'text-amber-500' : 'text-gray-100'
                        }`} dir="rtl">
                          {verse.arabic.split(/\s+/).filter(Boolean).map((word, wIdx) => (
                            <span 
                              key={wIdx}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleWordAudio(verse, wIdx + 1);
                              }}
                              className={`cursor-pointer transition-all hover:text-amber-400 select-none ${
                                playingWordId === `${currentSurah.id}-${verse.number}-${wIdx + 1}` ? 'text-amber-500 scale-110' : ''
                              }`}
                            >
                              {word}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {(viewMode === 'english' || viewMode === 'dual') && (
                      <p className={`text-sm sm:text-base md:text-xl font-sans border-l-2 pl-6 sm:pl-8 leading-[1.8] max-w-2xl transition-colors ${
                        playingVerseId === `${currentSurah.id}-${verse.number}` ? 'text-amber-100 border-amber-500' : 'text-gray-400 border-amber-500/20'
                      }`}>
                        {verse.english}
                      </p>
                    )}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Control Bar */}
        <footer className="h-24 md:h-20 bg-dark-surface border-t border-dark-border px-6 md:px-12 flex items-center justify-between shrink-0 z-20">
          <button
            onClick={handlePrev}
            disabled={currentSurahIndex === 0}
            className="group flex items-center gap-4 disabled:opacity-30"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-all">
              <ChevronLeft className="w-5 h-5" />
            </div>
            <span className="hidden md:inline text-[10px] text-gray-500 font-bold tracking-widest uppercase">Previous</span>
          </button>

          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-2">
              {SURAHS.map((_, i) => (
                <div 
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                    i === currentSurahIndex ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)] scale-125' : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>
            <span className="text-[9px] text-gray-500 font-bold tracking-tighter uppercase">{currentSurahIndex + 1} OF {SURAHS.length} SECTIONS</span>
          </div>

          <button
            onClick={handleNext}
            disabled={currentSurahIndex === SURAHS.length - 1}
            className="group flex items-center gap-4 disabled:opacity-30"
          >
            <span className="hidden md:inline text-[10px] text-gray-500 font-bold tracking-widest uppercase">Next</span>
            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-all">
              <ChevronRight className="w-5 h-5" />
            </div>
          </button>
        </footer>
      </div>
    </div>
  );
}
