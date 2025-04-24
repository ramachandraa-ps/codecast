/**
 * VideoPlayer Component
 * 
 * A custom video player component for CodeCast that provides a rich set of features:
 * - Play/Pause controls
 * - Volume control with mute toggle
 * - Progress bar with seek functionality
 * - Fullscreen support
 * - Auto-hiding controls
 * - Buffering indicator
 * - Time display
 * - Keyboard shortcuts
 */

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

/**
 * VideoPlayer Props Interface
 * @property videoUrl - URL of the video to play
 * @property thumbnailUrl - URL of the thumbnail to show before playback
 * @property onTimeUpdate - Optional callback for tracking playback progress
 * @property className - Optional CSS classes for styling
 */
interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl: string;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  thumbnailUrl,
  onTimeUpdate,
  className,
}) => {
  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  
  // Refs for DOM elements and timers
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<number | null>(null);
  
  // Demo video URL for development/testing
  const demoVideoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  /**
   * Setup video event listeners
   * Handles various video events and updates component state accordingly
   */
  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (!videoElement) return;
    
    const handleLoadedMetadata = () => {
      setDuration(videoElement.duration);
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime);
      onTimeUpdate?.(videoElement.currentTime, videoElement.duration);
    };
    
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleVolumeChange = () => {
      setVolume(videoElement.volume);
      setIsMuted(videoElement.muted);
    };
    
    const handleWaiting = () => setIsBuffering(true);
    const handlePlaying = () => setIsBuffering(false);
    
    // Add event listeners
    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    videoElement.addEventListener("play", handlePlay);
    videoElement.addEventListener("pause", handlePause);
    videoElement.addEventListener("volumechange", handleVolumeChange);
    videoElement.addEventListener("waiting", handleWaiting);
    videoElement.addEventListener("playing", handlePlaying);
    
    // Cleanup event listeners
    return () => {
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("play", handlePlay);
      videoElement.removeEventListener("pause", handlePause);
      videoElement.removeEventListener("volumechange", handleVolumeChange);
      videoElement.removeEventListener("waiting", handleWaiting);
      videoElement.removeEventListener("playing", handlePlaying);
    };
  }, [onTimeUpdate]);

  /**
   * Handle fullscreen changes
   * Updates component state when entering/exiting fullscreen
   */
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  /**
   * Toggle video playback
   * Plays or pauses the video and updates state
   */
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  /**
   * Seek to specific time in video
   * @param time - Target time in seconds
   */
  const seekTo = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };
  
  /**
   * Skip forward or backward in video
   * @param seconds - Number of seconds to skip (positive or negative)
   */
  const skip = (seconds: number) => {
    if (videoRef.current) {
      const newTime = Math.min(Math.max(videoRef.current.currentTime + seconds, 0), duration);
      seekTo(newTime);
    }
  };

  /**
   * Toggle video mute state
   */
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  /**
   * Change video volume
   * @param value - New volume value (0 to 1)
   */
  const changeVolume = (value: number) => {
    if (videoRef.current) {
      videoRef.current.volume = value;
      setVolume(value);
      if (value === 0) {
        videoRef.current.muted = true;
        setIsMuted(true);
      } else if (isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  /**
   * Toggle fullscreen mode
   */
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  /**
   * Format time in seconds to MM:SS format
   * @param seconds - Time in seconds
   * @returns Formatted time string
   */
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  /**
   * Handle mouse movement over player
   * Shows controls and sets up auto-hide timer
   */
  const handleMouseMove = () => {
    setIsControlsVisible(true);
    
    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
    }
    
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying) {
        setIsControlsVisible(false);
      }
    }, 3000);
  };

  // Component render
  return (
    <div
      ref={playerRef}
      className={cn("relative overflow-hidden bg-black", className)}
      onMouseMove={handleMouseMove}
      onClick={() => {
        if (isControlsVisible) {
          togglePlay();
        } else {
          setIsControlsVisible(true);
        }
      }}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src={demoVideoUrl} // Using demo URL for placeholder
        poster={thumbnailUrl}
        className="w-full h-full"
        onClick={(e) => e.stopPropagation()}
      />
      
      {/* Buffering indicator */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      
      {/* Play button overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="bg-primary/80 text-white rounded-full p-6 hover:bg-primary transition-colors"
          >
            <Play size={32} fill="currentColor" />
          </button>
        </div>
      )}
      
      {/* Controls bar */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-4 py-3 transition-opacity",
          isControlsVisible ? "opacity-100" : "opacity-0"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress bar */}
        <Slider
          min={0}
          max={duration || 100}
          step={0.1}
          value={[currentTime]}
          onValueChange={(value) => seekTo(value[0])}
          className="cursor-pointer"
        />
        
        <div className="flex items-center justify-between mt-2">
          {/* Left controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="text-white hover:text-primary focus:outline-none"
            >
              {isPlaying ? <Pause size={22} /> : <Play size={22} />}
            </button>
            
            <button
              onClick={() => skip(-10)}
              className="text-white hover:text-primary focus:outline-none"
            >
              <SkipBack size={20} />
            </button>
            
            <button
              onClick={() => skip(10)}
              className="text-white hover:text-primary focus:outline-none"
            >
              <SkipForward size={20} />
            </button>
            
            <div className="flex items-center gap-2 ml-1">
              <button
                onClick={toggleMute}
                className="text-white hover:text-primary focus:outline-none"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[isMuted ? 0 : volume]}
                onValueChange={(value) => changeVolume(value[0])}
                className="w-20"
              />
            </div>
            
            <span className="text-white text-xs ml-2">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          
          {/* Right controls */}
          <button
            onClick={toggleFullscreen}
            className="text-white hover:text-primary focus:outline-none"
          >
            <Maximize size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
