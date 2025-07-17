import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import { useAudioPlayer } from '../context/AudioPlayerContext';

const MiniPlayer: React.FC = () => {
  const { 
    currentBook, 
    isPlaying, 
    showMiniPlayer, 
    positionMillis, 
    durationMillis,
    pauseAudio, 
    resumeAudio, 
    skipForward, 
    skipBackward, 
    closeMiniPlayer 
  } = useAudioPlayer();
  
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (showMiniPlayer) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showMiniPlayer]);

  const handleMiniPlayerPress = () => {
    if (currentBook) {
      router.push({
        pathname: '/screens/audios/[id]',
        params: {
          id: currentBook.id,
          title: currentBook.title,
          author: currentBook.author,
          duration: currentBook.duration || '0:00:00',
          category: currentBook.category || 'Unknown',
          rating: currentBook.rating?.toString() || '0',
          reviews: currentBook.reviews?.toString() || '0',
          price: currentBook.price?.toString() || '0',
        },
      });
    }
  };

  const handlePlayPause = async () => {
    if (isPlaying) {
      await pauseAudio();
    } else {
      await resumeAudio();
    }
  };

  if (!showMiniPlayer || !currentBook) return null;

  const progress = durationMillis > 0 ? (positionMillis / durationMillis) * 100 : 0;

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        position: 'absolute',
        bottom: 80,
        left: 16,
        right: 16,
        zIndex: 1000,
      }}
    >
      <TouchableOpacity
        onPress={handleMiniPlayerPress}
        className="bg-white rounded-xl p-4 shadow-lg border border-gray-200"
      >
        <View className="flex-row items-center">
          <Image
            source={currentBook.image}
            className="w-12 h-12 rounded-lg mr-3"
            resizeMode="cover"
          />
          <View className="flex-1">
            <Text className="font-semibold text-gray-800 text-sm" numberOfLines={1}>
              {currentBook.title}
            </Text>
            <Text className="text-gray-500 text-xs" numberOfLines={1}>
              by {currentBook.author}
            </Text>
          </View>
          
          {/* Skip Backward Button */}
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              skipBackward();
            }}
            className="mr-2"
          >
            <Ionicons name="play-back" size={20} color="#6B7280" />
          </TouchableOpacity>
          
          {/* Play/Pause Button */}
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              handlePlayPause();
            }}
            className="mr-2"
          >
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={24}
              color="#3B82F6"
            />
          </TouchableOpacity>
          
          
          {/* Skip Forward Button */}
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              skipForward();
            }}
            className="mr-3"
          >
            <Ionicons name="play-forward" size={20} color="#6B7280" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={(e) => {
              e.stopPropagation();
              closeMiniPlayer();
            }}
          >
            <Ionicons name="close" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
        {/* Progress Bar */}
        <View className="w-full h-1 bg-gray-200 rounded-full mb-3 overflow-hidden">
            <View
            className="h-full bg-blue-500"
            style={{ width: `${progress}%` }}
            />
        </View>
      
    </Animated.View>
  );
};

export default MiniPlayer;
