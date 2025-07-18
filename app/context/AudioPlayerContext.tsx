import { Asset } from 'expo-asset';
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface Book {
  id: string;
  title: string;
  author: string;
  image: any;
  duration?: string;
  category?: string;
  rating?: number;
  reviews?: number;
  price?: number;
}

interface AudioPlayerContextType {
  currentBook: Book | null;
  isPlaying: boolean;
  sound: Audio.Sound | null;
  showMiniPlayer: boolean;
  positionMillis: number;
  durationMillis: number;
  playbackRate: number;
  playBook: (book: Book) => Promise<void>;
  pauseAudio: () => Promise<void>;
  resumeAudio: () => Promise<void>;
  skipForward: () => Promise<void>;
  skipBackward: () => Promise<void>;
  changePlaybackRate: (rate: number) => Promise<void>;
  closeMiniPlayer: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

interface AudioPlayerProviderProps {
  children: ReactNode;
}

const audioAssets: { [key: string]: Asset } = {
  '1': Asset.fromModule(require('../../assets/audios/sevenwoods_01_yeats_64kb.mp3')), 
  '2': Asset.fromModule(require('../../assets/audios/art_of_war_03-04_sun_tzu_64kb.mp3')),
};

export const AudioPlayerProvider: React.FC<AudioPlayerProviderProps> = ({ children }) => {
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const [positionMillis, setPositionMillis] = useState(0);
  const [durationMillis, setDurationMillis] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  // Configure audio session for background playback
  React.useEffect(() => {
    const configureAudioSession = async () => {
      try {
        // Set audio mode for background playback
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true, // Key: enables background audio
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          playsInSilentModeIOS: true, // Plays even when phone is in silent mode
          shouldDuckAndroid: true,
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
          playThroughEarpieceAndroid: false,
        });
        
        console.log('Audio session configured for background playback');
      } catch (error) {
        console.error('Error configuring audio session:', error);
      }
    };

    configureAudioSession();
  }, []);

  // Update position every 500ms when playing
  React.useEffect(() => {
    let interval: any;

    if (sound && isPlaying) {
      interval = setInterval(async () => {
        const status = await sound.getStatusAsync();
        if (status.isLoaded && status.positionMillis !== undefined) {
          setPositionMillis(status.positionMillis);
          setDurationMillis(status.durationMillis || 0);
        }
      }, 500);
    }

    return () => {
      clearInterval(interval);
    };
  }, [sound, isPlaying]);

  const playBook = async (book: Book) => {
    try {
      // Stop current audio if playing
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      // Get the correct audio asset for this book
      const audioAsset = audioAssets[book.id] || audioAssets['2']; // Default to Art of War if book ID not found

      // Create new sound with background audio enabled
      const { sound: newSound, status } = await Audio.Sound.createAsync(
        audioAsset,
        {
          shouldPlay: true,
          isLooping: false,
        }
      );
      
      // Enable background audio notifications/control center
      await newSound.setStatusAsync({
        shouldPlay: true,
        isLooping: false,
      });
      
      setSound(newSound);
      
      // Set initial duration
      if ('isLoaded' in status && status.isLoaded) {
        setDurationMillis(status.durationMillis || 0);
      }
      
      setCurrentBook(book);
      setIsPlaying(true);
      setShowMiniPlayer(true);
      setPositionMillis(0);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const pauseAudio = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  const resumeAudio = async () => {
    if (sound) {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  const skipForward = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        const newPosition = status.positionMillis + 10000;
        await sound.setPositionAsync(newPosition); 
        setPositionMillis(newPosition);
      }
    }
  };

  const skipBackward = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        const newPosition = Math.max(status.positionMillis - 10000, 0);
        await sound.setPositionAsync(newPosition); 
        setPositionMillis(newPosition);
      }
    }
  };

  const changePlaybackRate = async (rate: number) => {
    if (sound) {
      await sound.setRateAsync(rate, true);
      setPlaybackRate(rate);
    }
  };

  const closeMiniPlayer = () => {
    setShowMiniPlayer(false);
    if (sound) {
      sound.unloadAsync();
      setSound(null);
    }
    setIsPlaying(false);
    setCurrentBook(null);
    setPositionMillis(0);
    setDurationMillis(0);
    setPlaybackRate(1);
  };

  // Cleanup when component unmounts
  React.useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const value = {
    currentBook,
    isPlaying,
    sound,
    showMiniPlayer,
    positionMillis,
    durationMillis,
    playbackRate,
    playBook,
    pauseAudio,
    resumeAudio,
    skipForward,
    skipBackward,
    changePlaybackRate,
    closeMiniPlayer,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
};
