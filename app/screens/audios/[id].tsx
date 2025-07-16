import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Assets from '../../components/Assets';
import { useAudioPlayer } from '../../context/AudioPlayerContext';

const AudioDetailScreen = () => {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const { 
    currentBook,
    isPlaying, 
    positionMillis, 
    durationMillis, 
    playbackRate,
    pauseAudio, 
    resumeAudio, 
    skipForward, 
    skipBackward, 
    changePlaybackRate,
    playBook 
  } = useAudioPlayer();

  const book = {
    id: String(params.id),
    title: String(params.title),
    author: String(params.author),
    duration: String(params.duration),
    category: String(params.category),
    rating: parseInt(params.rating as string) || 0,
    reviews: parseInt(params.reviews as string) || 0,
    price: parseFloat(params.price as string) || 0,
    image: getBookImage(String(params.id)),
  };

  // Check if this is the currently playing book
  const isCurrentBook = currentBook?.id === book.id;

  function getBookImage(bookId: string) {
    const imageMap: { [key: string]: any } = {
      '1': Assets.letThemBook,
      '2': Assets.artofWarBook,
      '3': Assets.powerofHabitBook,
      '4': Assets.makingThingHappenBook,
      '5': Assets.powerBook,
      '6': Assets.theoryOfEverythingBook,
      '7': Assets.oneThingBook,
    };
    return imageMap[bookId] || Assets.artofWarBook;
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: book.title,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={20} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, book.title]);

  async function handlePlayPause() {
    if (isCurrentBook) {
      // If this is the current book, just toggle play/pause
      if (isPlaying) {
        await pauseAudio();
      } else {
        await resumeAudio();
      }
    } else {
      // If this is not the current book, start playing it
      await playBook(book);
    }
  }

  function formatTime(ms: number) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  // Use current playback progress if this is the current book, otherwise 0
  const currentPosition = isCurrentBook ? positionMillis : 0;
  const currentDuration = isCurrentBook ? durationMillis : 0;
  const progress = currentDuration > 0 ? (currentPosition / currentDuration) * 100 : 0;
  const showPlayingState = isCurrentBook && isPlaying;

  return (
    <View className="flex-1 bg-blue-500">
      <View className="items-center mt-20">
        <Image
          source={book.image}
          className="w-60 h-80 rounded-lg shadow-lg"
          resizeMode="cover"
        />
        <Text className="text-white text-2xl font-bold mt-4" numberOfLines={2}>
          {book.title}
        </Text>
        <Text className="text-white text-xl mt-2">by {book.author}</Text>
      </View>
      {/* Audio Controls */}
      <View className="flex-1 justify-center items-center px-6">
        <View className="w-full h-1 bg-gray-300 rounded-full mb-6 overflow-hidden">
          <View
            className="h-full bg-white"
            style={{ width: `${progress}%` }}
          />
        </View>
      
        {/* Time Display */}
        <View className="flex-row justify-between w-full px-2 mb-6">
          <Text className="text-white text-xs">{formatTime(currentPosition)}</Text>
          <Text className="text-white text-xs">{formatTime(currentDuration)}</Text>
        </View>

        {/* Controls */}
        <View className="flex-row justify-between items-center w-full px-8 mb-8">
          <TouchableOpacity onPress={skipBackward} disabled={!isCurrentBook}>
            <Ionicons name="play-back" size={32} color={isCurrentBook ? "white" : "gray"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePlayPause}>
            <Ionicons name={showPlayingState ? 'pause' : 'play'} size={48} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipForward} disabled={!isCurrentBook}>
            <Ionicons name="play-forward" size={32} color={isCurrentBook ? "white" : "gray"} />
          </TouchableOpacity>
        </View>
        
        {/* Playback Speed */}
        <View className="flex-row justify-center items-center w-full px-8 mt-4">
          {[0.9, 1, 1.5, 2].map((rate) => (
            <TouchableOpacity
              key={rate}
              onPress={() => changePlaybackRate(rate)}
              disabled={!isCurrentBook}
              className={`px-4 py-2 rounded-full ${playbackRate === rate && isCurrentBook ? 'bg-gray-200' : 'bg-blue-500'}`}
            >
              <Text className={`text-sm ${playbackRate === rate && isCurrentBook ? 'text-gray-500' : 'text-white'}`}>{rate}x</Text>
            </TouchableOpacity>
          ))}
        </View>

      </View>
    </View>
  );
};

export default AudioDetailScreen;
