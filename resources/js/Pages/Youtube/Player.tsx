import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Slider } from '@/Components/ui/slider';
import { parseTimeString, formatTime } from '@/lib/utils';

// Clé pour stocker le volume dans le localStorage
const VOLUME_STORAGE_KEY = 'video_player_volume';

export default function Player(props: {
  videoUrl: string;
  stopAt?: string | null;
  onVideoEnd?: () => void;
  onVideoStop?: () => void;
  className?: string;
}) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(() => {
    const savedVolume = localStorage.getItem(VOLUME_STORAGE_KEY);
    return savedVolume ? parseInt(savedVolume, 10) : 100;
  });
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [stopPointReached, setStopPointReached] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const stopTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Convertir le stopAt en secondes si fourni
  useEffect(() => {
    if (props.stopAt) {
      stopTimeRef.current = parseTimeString(props.stopAt);
      setStopPointReached(false);
    } else {
      stopTimeRef.current = null;
      setStopPointReached(false);
    }
  }, [props.stopAt]);

  // Gérer l'état du lecteur
  const onLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Mettre à jour l'état de lecture
  const onPlay = () => {
    setIsPlaying(true);
  };

  const onPause = () => {
    setIsPlaying(false);
  };

  const onEnded = () => {
    setIsPlaying(false);
    if (props.onVideoEnd) {
      props.onVideoEnd();
    }
  };

  // Démarrer/arrêter l'intervalle pour suivre le temps de lecture
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        if (videoRef.current) {
          const currentTimeValue = videoRef.current.currentTime;
          setCurrentTime(currentTimeValue);
          
          if (stopTimeRef.current !== null && 
              currentTimeValue >= stopTimeRef.current && 
              !stopPointReached) {
            videoRef.current.pause();
            setStopPointReached(true);
            if (props.onVideoStop) {
              props.onVideoStop();
            }
          }
        }
      }, 100);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, stopPointReached, props.onVideoStop]);

  // Gérer les événements clavier
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const isInputActive = activeElement instanceof HTMLInputElement || 
                           activeElement instanceof HTMLTextAreaElement ||
                           (activeElement as HTMLElement)?.hasAttribute('contenteditable');
      
      if (isInputActive) {
        return;
      }
      
      if (event.code === 'Space') {
        event.preventDefault();
        if (isPlaying) {
          pauseVideo();
        } else {
          playVideo();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlaying]);

  // Fonctions de contrôle
  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const seekTo = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      setCurrentTime(seconds);
      
      if (stopTimeRef.current !== null && seconds < stopTimeRef.current) {
        setStopPointReached(false);
      }
      else if (stopTimeRef.current !== null && seconds >= stopTimeRef.current) {
        setStopPointReached(true);
      }
    }
  };

  const handleSliderChange = (value: number[]) => {
    seekTo(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    if (videoRef.current) {
      const volumeValue = value[0];
      setVolume(volumeValue);
      videoRef.current.volume = volumeValue / 100;
      
      localStorage.setItem(VOLUME_STORAGE_KEY, volumeValue.toString());
      
      if (volumeValue === 0) {
        setIsMuted(true);
      } else {
        setIsMuted(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.muted = false;
        videoRef.current.volume = volume / 100;
        setIsMuted(false);
      } else {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  const rewindTenSeconds = () => {
    if (videoRef.current) {
      const newTime = Math.max(0, currentTime - 10);
      seekTo(newTime);
    }
  };

  const forwardTenSeconds = () => {
    if (videoRef.current) {
      const newTime = Math.min(duration, currentTime + 10);
      seekTo(newTime);
    }
  };

  // Convertir l'URL de la vidéo en URL de streaming
  const getStreamUrl = (url: string) => {
    // Si l'URL commence déjà par /video/, la retourner telle quelle
    if (url.startsWith('/video/')) {
      return url;
    }
    // Sinon, ajouter le préfixe /video/
    return `/video/${url}`;
  };

  // Gérer le mode plein écran
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // Écouter les changements d'état du mode plein écran
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Sortir du mode plein écran au point d'arrêt
  useEffect(() => {
    if (stopPointReached && isFullscreen) {
      document.exitFullscreen();
    }
  }, [stopPointReached, isFullscreen]);

  return (
    <Card className={`p-4 ${props.className || ''}`} ref={playerContainerRef}>
      <div className={"mb-4 relative"}>
        <video
          ref={videoRef}
          src={getStreamUrl(props.videoUrl)}
          className={"w-full object-contain bg-black cursor-pointer"}
          onLoadedMetadata={onLoadedMetadata}
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onEnded}
          controls={false}
          playsInline
          preload="metadata"
          onClick={() => {
            if (isPlaying) {
              pauseVideo();
            } else {
              playVideo();
            }
          }}
          onTimeUpdate={() => {
            if (videoRef.current) {
              setCurrentTime(videoRef.current.currentTime);
            }
          }}
        />
        <Button
          variant="outline"
          size="icon"
          onClick={toggleFullscreen}
          className={"absolute top-2 right-2 text-white bg-black/50"}
          title={isFullscreen ? "Quitter le mode plein écran" : "Mode plein écran"}
        >
          {isFullscreen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={"h-4 w-4"}>
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={"h-4 w-4"}>
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          )}
        </Button>
      </div>

      <div className={"space-y-4"}>
        {/* Barre de progression */}
        <div className={"flex items-center space-x-2"}>
          <span className={"text-sm"}>{formatTime(currentTime)}</span>
          <Slider
            value={[currentTime]}
            min={0}
            max={duration}
            step={1}
            onValueChange={handleSliderChange}
            className={"flex-1"}
          />
          <span className={"text-sm"}>{formatTime(duration)}</span>
        </div>

        {/* Contrôles de lecture */}
        <div className={"flex items-center justify-between"}>
          <div className={"flex items-center space-x-2"}>
            <Button
              variant="outline"
              size="icon"
              onClick={rewindTenSeconds}
              title="Reculer de 10 secondes"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={"h-4 w-4"}>
                <path d="M11 17l-5-5 5-5" />
                <path d="M18 17l-5-5 5-5" />
              </svg>
            </Button>

            {isPlaying ? (
              <Button
                variant="outline"
                size="icon"
                onClick={pauseVideo}
                title="Pause (Espace)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={"h-4 w-4"}>
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              </Button>
            ) : (
              <Button
                variant="outline"
                size="icon"
                onClick={playVideo}
                title="Lecture (Espace)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={"h-4 w-4"}>
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </Button>
            )}

            <Button
              variant="outline"
              size="icon"
              onClick={forwardTenSeconds}
              title="Avancer de 10 secondes"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={"h-4 w-4"}>
                <path d="M6 17l5-5-5-5" />
                <path d="M13 17l5-5-5-5" />
              </svg>
            </Button>
          </div>

          {/* Contrôle du volume */}
          <div className={"flex items-center space-x-2"}>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleMute}
              title={isMuted ? "Activer le son" : "Couper le son"}
            >
              {isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={"h-4 w-4"}>
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={"h-4 w-4"}>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              )}
            </Button>
            <Slider
              value={[volume]}
              min={0}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className={"w-24"}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
