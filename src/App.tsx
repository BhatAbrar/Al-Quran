/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Map, ChevronRight, ChevronLeft, Menu, X, Play, Pause, Volume2, Loader2, Flame, Sun, Moon, Settings } from 'lucide-react';
import { SURAHS } from './data';
import { Surah, Verse } from './types';

export default function App() {
  const [currentSurahIndex, setCurrentSurahIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showBismillah, setShowBismillah] = useState(true);
  const [viewMode, setViewMode] = useState<'arabic' | 'english' | 'dual'>('dual');
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [arabicFont, setArabicFont] = useState<'uthmani' | 'indopak' | 'modern' | 'kufi'>(() => {
    return (localStorage.getItem('app_arabic_font') as any) || 'uthmani';
  });
  const [textSize, setTextSize] = useState<'sm' | 'md' | 'lg' | 'xl'>(() => {
    return (localStorage.getItem('app_text_size') as 'sm' | 'md' | 'lg' | 'xl') || 'md';
  });
  const [streak, setStreak] = useState(0);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('app_theme') as 'dark' | 'light') || 'dark';
  });

  const accentColor = theme === 'dark' ? 'text-amber-500' : 'text-black';
  const accentColorMuted = theme === 'dark' ? 'text-amber-500/80' : 'text-black/80';
  const accentColorSubtle = theme === 'dark' ? 'text-amber-500/60' : 'text-black/60';
  const hoverAccentColor = theme === 'dark' ? 'hover:text-amber-400' : 'hover:text-black';
  const accentFill = theme === 'dark' ? 'fill-amber-500/20' : 'fill-black/10';
  const accentBgHighlight = theme === 'dark' ? 'bg-amber-500/10' : 'bg-black/5';
  const accentBorderHighlight = theme === 'dark' ? 'border-amber-500/30' : 'border-black/20';
  
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
    document.body.className = theme;
    localStorage.setItem('app_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('app_arabic_font', arabicFont);
  }, [arabicFont]);

  useEffect(() => {
    localStorage.setItem('app_text_size', textSize);
  }, [textSize]);

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

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const arabicSizeClasses = {
    sm: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
    md: 'text-2xl sm:text-4xl md:text-5xl lg:text-6xl',
    lg: 'text-3xl sm:text-5xl md:text-6xl lg:text-7xl',
    xl: 'text-4xl sm:text-6xl md:text-7xl lg:text-8xl'
  };

  const englishSizeClasses = {
    sm: 'text-xs sm:text-sm md:text-base',
    md: 'text-sm sm:text-base md:text-xl',
    lg: 'text-base sm:text-lg md:text-2xl',
    xl: 'text-lg sm:text-xl md:text-3xl'
  };

  const transliterationSizeClasses = {
    sm: 'text-[8px] sm:text-[9px]',
    md: 'text-[10px] sm:text-xs',
    lg: 'text-xs sm:text-sm',
    xl: 'text-sm sm:text-base'
  };

  return (
    <div className={`flex h-screen overflow-hidden font-sans selection:bg-amber-accent selection:text-black transition-colors duration-300 ${
      theme === 'dark' ? 'bg-dark-bg text-[#d1d5db]' : 'bg-light-bg text-[#495057]'
    }`}>
      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-80 flex flex-col shrink-0 transition-transform duration-300 lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${theme === 'dark' ? 'bg-dark-sidebar border-r border-dark-border' : 'bg-light-sidebar border-r border-light-border'}
      `}>
        <div className={`p-8 flex items-center justify-between border-b ${theme === 'dark' ? 'border-dark-border' : 'border-light-border'}`}>
          <div>
            <h1 className={`text-2xl font-arabic tracking-tight flex items-center gap-3 italic ${theme === 'dark' ? 'text-[#e5e7eb]' : 'text-[#212529]'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm not-italic font-bold bg-amber-500/10 border ${theme === 'dark' ? 'border-amber-500/30 text-amber-500' : 'border-black/20 text-black'}`}>ن</span>
              Night Recitation
              <span className={`text-[10px] not-italic font-sans ml-1 font-medium tracking-normal mt-2 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>by Abrar Bashir</span>
            </h1>
            <p className={`text-[10px] mt-2 uppercase tracking-widest font-semibold ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Preserved Surahs</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-white/5 text-amber-500' : 'hover:bg-black/5 text-black'}`}
              title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="flex flex-col items-center">
              <div className="relative">
                <Flame className={`w-5 h-5 ${streak > 0 ? `${accentColor} ${accentFill} animate-pulse` : theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
                {streak > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${theme === 'dark' ? 'bg-amber-500' : 'bg-black'}`}></span>
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-mono font-bold mt-1 ${accentColorMuted}`}>{streak}</span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className={`p-2 rounded-full lg:hidden ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}
            >
              <X className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
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
                  : theme === 'dark' ? 'hover:bg-white/5 border border-transparent' : 'hover:bg-black/5 border border-transparent'
              }`}
            >
              <span className={`text-xs font-mono transition-colors ${idx === currentSurahIndex ? 'text-amber-500/60' : theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
                {(idx + 1).toString().padStart(2, '0')}
              </span>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className={`text-sm font-medium transition-colors ${idx === currentSurahIndex ? 'text-amber-100' : theme === 'dark' ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-black'}`}>
                    {surah.englishName}
                  </p>
                  <p className={`arabic-text text-sm transition-colors ${idx === currentSurahIndex ? 'text-amber-500' : theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                    {surah.name}
                  </p>
                </div>
              <p className={`text-[10px] uppercase tracking-tighter transition-colors ${idx === currentSurahIndex ? (theme === 'dark' ? 'text-amber-500/70' : 'text-black/60') : theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
                {surah.isPartial ? 'Quranic Section' : `Surah ${surah.surahNumber}`}
              </p>
            </div>
            {idx === currentSurahIndex && (
              <div className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-black shadow-[0_0_8px_rgba(0,0,0,0.2)]'}`} />
            )}
            </button>
          ))}
        </div>

        <div className={`p-6 border-t text-[9px] flex flex-col gap-2 tracking-widest font-bold uppercase ${theme === 'dark' ? 'border-dark-border text-gray-600' : 'border-light-border text-gray-400'}`}>
          <div className={`flex justify-between items-center ${accentColorMuted}`}>
            <span>{new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())}</span>
          </div>
          <div className="flex justify-between items-center opacity-60">
            <span>{SURAHS.length} SECTIONS</span>
            <span>V1.0</span>
          </div>
        </div>
      </aside>

      {/* Main Reader View */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background Decorative Text */}
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] select-none pointer-events-none hidden md:block">
          <span className="text-[180px] leading-none font-arabic">{currentSurah.name.split(' ').pop()}</span>
        </div>

        {/* Content Header */}
        <header className={`px-6 md:px-12 pt-8 md:pt-16 pb-8 flex flex-col md:flex-row md:items-end justify-between border-b z-10 shrink-0 ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
          <div className="flex items-center gap-4 md:block">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className={`p-2 rounded-full lg:hidden border ${theme === 'dark' ? 'hover:bg-white/5 border-white/10' : 'hover:bg-black/5 border-black/10'}`}
            >
              <Menu className={`w-5 h-5 ${accentColor}`} />
            </button>
            <div className="lg:hidden flex flex-col items-center gap-1">
              <div className={`flex items-center gap-2 px-3 py-1.5 border rounded-full ${theme === 'dark' ? 'bg-amber-500/10 border-amber-500/20' : 'bg-black/5 border-black/10'}`}>
                <Flame className={`w-3.5 h-3.5 md:w-4 md:h-4 ${accentColor} ${accentFill}`} />
                <span className={`text-[10px] md:text-sm font-mono font-bold ${accentColor}`}>{streak}</span>
              </div>
              <span className={`text-[8px] font-bold uppercase tracking-tighter ${accentColorSubtle}`}>
                {new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', { day: 'numeric', month: 'short' }).format(new Date())}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-arabic tracking-tight ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{currentSurah.englishName}</h2>
                <span className={`text-lg sm:text-xl md:text-2xl font-arabic mt-0.5 ${accentColorMuted}`}>{currentSurah.name}</span>
              </div>
              <div className="flex items-center gap-3 mt-1 md:mt-2">
                <p className={`${accentColor} font-mono text-[9px] sm:text-xs md:text-sm tracking-widest uppercase text-balance`}>
                  {currentSurah.verses.length} Verses
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0 items-center relative">
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className={`p-2.5 rounded-full border transition-all flex items-center gap-2 ${
                isSettingsOpen 
                  ? (theme === 'dark' ? 'bg-amber-500 text-black border-amber-500 shadow-lg shadow-amber-500/20' : 'bg-black text-white border-black shadow-lg') 
                  : (theme === 'dark' ? 'border-dark-border text-gray-400 hover:border-amber-500/30' : 'border-light-border text-gray-500 hover:border-black/30')
              }`}
            >
              <Settings className={`w-5 h-5 ${isSettingsOpen ? 'animate-spin-slow' : ''}`} />
              <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">Settings</span>
            </button>

            <AnimatePresence>
              {isSettingsOpen && (
                <>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsSettingsOpen(false)}
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className={`absolute right-0 top-full mt-4 z-50 w-72 p-6 rounded-3xl border shadow-2xl ${
                      theme === 'dark' ? 'bg-dark-sidebar border-dark-border' : 'bg-white border-light-border'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Preference</h3>
                      <button onClick={() => setIsSettingsOpen(false)} className="p-1 hover:bg-black/5 rounded-full"><X className="w-4 h-4 opacity-50" /></button>
                    </div>

                    <div className="space-y-6">
                      {/* Theme */}
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold uppercase ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Theme</span>
                        <button
                          onClick={toggleTheme}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
                            theme === 'dark' ? 'bg-gray-800 border-gray-700 text-amber-500' : 'bg-gray-100 border-gray-200 text-black'
                          }`}
                        >
                          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                          <span className="text-[10px] font-bold uppercase">{theme}</span>
                        </button>
                      </div>

                      {/* View Mode */}
                      <div className="space-y-2">
                        <span className={`text-[10px] font-bold uppercase ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Display Mode</span>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setViewMode('arabic')}
                            className={`flex-1 py-2 rounded-xl border text-[9px] font-bold uppercase tracking-wider transition-all ${
                              viewMode === 'arabic' ? (theme === 'dark' ? 'bg-amber-500 text-black border-amber-500' : 'bg-black text-white border-black') : (theme === 'dark' ? 'border-dark-border text-gray-500' : 'border-light-border text-gray-400')
                            }`}
                          >
                            Arabic
                          </button>
                          <button 
                            onClick={() => setViewMode('dual')}
                            className={`flex-1 py-2 rounded-xl border text-[9px] font-bold uppercase tracking-wider transition-all ${
                              viewMode === 'dual' ? (theme === 'dark' ? 'bg-amber-500 text-black border-amber-500' : 'bg-black text-white border-black') : (theme === 'dark' ? 'border-dark-border text-gray-500' : 'border-light-border text-gray-400')
                            }`}
                          >
                            Dual
                          </button>
                        </div>
                      </div>

                      {/* Transliteration */}
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold uppercase ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Transliteration</span>
                        <button 
                          onClick={() => setShowTransliteration(!showTransliteration)}
                          className={`px-3 py-1.5 rounded-full border text-[9px] font-bold uppercase transition-all ${
                            showTransliteration ? (theme === 'dark' ? 'bg-amber-500/20 text-amber-500 border-amber-500/50' : 'bg-black/10 text-black border-black/30') : (theme === 'dark' ? 'border-dark-border text-gray-500' : 'border-light-border text-gray-400')
                          }`}
                        >
                          {showTransliteration ? 'On' : 'Off'}
                        </button>
                      </div>

                      {/* Arabic Font */}
                      <div className="space-y-2">
                        <span className={`text-[10px] font-bold uppercase ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Arabic Script Style</span>
                        <select 
                          value={arabicFont}
                          onChange={(e) => setArabicFont(e.target.value as any)}
                          className={`w-full px-4 py-2.5 rounded-xl border text-[10px] font-bold uppercase tracking-wider transition-all outline-none cursor-pointer ${
                            theme === 'dark' ? 'bg-dark-surface border-dark-border text-gray-300' : 'bg-gray-50 border-light-border text-gray-600'
                          }`}
                        >
                          <option value="uthmani">Uthmani (Global)</option>
                          <option value="indopak">IndoPak (South Asian)</option>
                          <option value="modern">Modern (Cursive)</option>
                          <option value="kufi">Kufic (Squared)</option>
                        </select>
                      </div>

                      {/* Text Size */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className={`text-[10px] font-bold uppercase ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Text Size</span>
                          <span className={`text-[10px] font-mono font-bold ${accentColor}`}>{textSize.toUpperCase()}</span>
                        </div>
                        <div className="flex gap-1 bg-black/5 p-1 rounded-xl">
                          {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
                            <button
                              key={size}
                              onClick={() => setTextSize(size)}
                              className={`flex-1 py-2 rounded-lg text-[9px] font-bold uppercase transition-all ${
                                textSize === size 
                                  ? (theme === 'dark' ? 'bg-amber-500 text-black shadow-sm' : 'bg-black text-white shadow-sm')
                                  : (theme === 'dark' ? 'text-gray-500 hover:text-amber-500' : 'text-gray-400 hover:text-black')
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
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
                  <div className={`text-center pb-8 border-b ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
                    <div className={`flex flex-wrap justify-center gap-x-2 gap-y-1 mb-4 font-${arabicFont}`} dir="rtl">
                      {'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'.split(' ').map((word, wIdx) => (
                        <span 
                          key={wIdx}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWordAudio('bismillah', wIdx + 1);
                          }}
                          className={`arabic-text text-3xl sm:text-4xl cursor-pointer transition-all ${hoverAccentColor} ${
                            playingWordId === `bismillah-${wIdx + 1}` ? `${accentColor} scale-110 drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]` : accentColorMuted
                          }`}
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                    <p className={`text-[10px] sm:text-xs font-medium tracking-wide ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>In the Name of Allah, Most Compassionate, Most Merciful</p>
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
                        <span className={`text-[10px] sm:text-xs font-mono w-10 sm:w-12 text-center ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
                          {currentSurah.isPartial ? verse.number : `${currentSurah.surahNumber}:${verse.number}`}
                        </span>
                        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                          playingVerseId === `${currentSurah.id}-${verse.number}` 
                            ? `${theme === 'dark' ? 'bg-amber-500 text-black' : 'bg-black text-white'}` 
                            : theme === 'dark' ? 'bg-white/5 text-gray-500 group-hover/verse:bg-white/10 group-hover/verse:text-amber-500' : 'bg-black/5 text-gray-400 group-hover/verse:bg-black/10 group-hover/verse:text-black'
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
                        <div className={`arabic-text ${arabicSizeClasses[textSize]} text-right leading-[2.2] sm:leading-[2.6] flex-1 transition-colors flex flex-wrap justify-end gap-x-2 sm:gap-x-4 font-${arabicFont} ${
                          playingVerseId === `${currentSurah.id}-${verse.number}` ? accentColor : theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                        }`} dir="rtl">
                          {verse.arabic.split(/\s+/).filter(Boolean).map((word, wIdx) => (
                            <span 
                              key={wIdx}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleWordAudio(verse, wIdx + 1);
                              }}
                              className={`cursor-pointer transition-all ${hoverAccentColor} select-none ${
                                playingWordId === `${currentSurah.id}-${verse.number}-${wIdx + 1}` ? `${accentColor} scale-110 underline decoration-2 underline-offset-8` : ''
                              }`}
                            >
                              {word}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {(viewMode === 'english' || viewMode === 'dual') && (
                      <p className={`${englishSizeClasses[textSize]} font-sans border-l-2 pl-6 sm:pl-8 leading-[1.8] max-w-2xl transition-colors ${
                        playingVerseId === `${currentSurah.id}-${verse.number}` 
                          ? `${theme === 'dark' ? 'text-amber-100 border-amber-500' : 'text-black font-semibold border-black'}` 
                          : theme === 'dark' ? 'text-gray-400 border-amber-500/20' : 'text-gray-500 border-black/10'
                      }`}>
                        {verse.english}
                      </p>
                    )}
                    {showTransliteration && (
                      <p className={`${transliterationSizeClasses[textSize]} font-serif italic pl-6 sm:pl-8 -mt-2 ${accentColorSubtle}`}>
                        {verse.transliteration}
                      </p>
                    )}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Control Bar */}
        <footer className={`h-24 md:h-20 border-t px-6 md:px-12 flex items-center justify-between shrink-0 z-20 ${theme === 'dark' ? 'bg-dark-surface border-dark-border' : 'bg-white border-light-border'}`}>
          <button
            onClick={handlePrev}
            disabled={currentSurahIndex === 0}
            className="group flex items-center gap-4 disabled:opacity-30"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${theme === 'dark' ? 'bg-white/5 border border-white/5 text-gray-400 group-hover:text-white group-hover:bg-amber-500/10 group-hover:border-amber-500/30' : 'bg-black/5 border border-black/5 text-gray-500 group-hover:text-black group-hover:bg-amber-500/5 group-hover:border-amber-500/20'}`}>
              <ChevronLeft className="w-5 h-5" />
            </div>
            <span className={`hidden md:inline text-[10px] font-bold tracking-widest uppercase ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Previous</span>
          </button>

          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-2">
              {SURAHS.map((_, i) => (
                <div 
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                    i === currentSurahIndex ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)] scale-125' : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className={`text-[9px] font-bold tracking-tighter uppercase ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>{currentSurahIndex + 1} OF {SURAHS.length} SECTIONS</span>
          </div>

          <button
            onClick={handleNext}
            disabled={currentSurahIndex === SURAHS.length - 1}
            className="group flex items-center gap-4 disabled:opacity-30"
          >
            <span className={`hidden md:inline text-[10px] font-bold tracking-widest uppercase ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Next</span>
            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-all">
              <ChevronRight className="w-5 h-5" />
            </div>
          </button>
        </footer>
      </div>
    </div>
  );
}
