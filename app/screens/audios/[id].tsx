import { Ionicons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import { Audio } from 'expo-av';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Assets from '../../components/Assets';

const audioAsset = Asset.fromModule(
  require('../../../assets/audios/art_of_war_03-04_sun_tzu_64kb.mp3')
);

const AudioDetailScreen = () => {
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  const [sound, setSound] = React.useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [positionMillis, setPositionMillis] = React.useState(0);
  const [durationMillis, setDurationMillis] = React.useState(0);
  const [playbackRate, setPlaybackRate] = React.useState(1);

  const book = {
    id: params.id,
    title: params.title,
    author: params.author,
    duration: params.duration,
    category: params.category,
    rating: parseInt(params.rating as string) || 0,
    reviews: parseInt(params.reviews as string) || 0,
    price: parseFloat(params.price as string) || 0,
    image: getBookImage(params.id as string),
  };

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

  async function playAudio() {
    if (sound) {
      await sound.playAsync();
      setIsPlaying(true);
    } else {
      const { sound: newSound, status } = await Audio.Sound.createAsync(audioAsset);
      setSound(newSound);
      if ('isLoaded' in status && status.isLoaded) {
        setDurationMillis(status.durationMillis || 0);
      }
      await newSound.playAsync();
      setIsPlaying(true);
    }
  }

  async function pauseAudio() {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }

  async function skipForward() {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        await sound.setPositionAsync(status.positionMillis + 10000); 
      }
    }
  }

  async function skipBackward() {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        await sound.setPositionAsync(Math.max(status.positionMillis - 10000, 0)); 
      }
    }
  }

  async function changePlaybackRate(rate: number) {
    if (sound) {
      await sound.setRateAsync(rate, true);
      setPlaybackRate(rate);
    }
  }

  React.useEffect(() => {
    let interval: any;

    if (sound) {
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
  }, [sound]);

  React.useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  function formatTime(ms: number) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  const progress = durationMillis > 0 ? (positionMillis / durationMillis) * 100 : 0;

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
            className="bg-white"
            style={{ width: `${progress}%` }}
          />
        </View>
      
        {/* Time Display */}
        <View className="flex-row justify-between w-full px-2 mb-6">
          <Text className="text-white text-xs">{formatTime(positionMillis)}</Text>
          <Text className="text-white text-xs">{formatTime(durationMillis)}</Text>
        </View>

        {/* Controls */}
        <View className="flex-row justify-between items-center w-full px-8 mb-8">
          <TouchableOpacity onPress={skipBackward}>
            <Ionicons name="play-back" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={isPlaying ? pauseAudio : playAudio}>
            <Ionicons name={isPlaying ? 'pause' : 'play'} size={48} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipForward}>
            <Ionicons name="play-forward" size={32} color="white" />
          </TouchableOpacity>
        </View>
        
        {/* Playback Speed */}
        <View className="flex-row justify-center items-center w-full px-8 mt-4">
          {[0.9, 1, 1.5, 2].map((rate) => (
            <TouchableOpacity
              key={rate}
              onPress={() => changePlaybackRate(rate)}
              className={`px-4 py-2 rounded-full ${playbackRate === rate ? 'bg-gray-200' : 'bg-blue-500'}`}
            >
              <Text className={`text-sm ${playbackRate === rate ? 'text-gray-500' : 'text-white'}`}>{rate}x</Text>
            </TouchableOpacity>
          ))}
        </View>

      </View>
    </View>
  );
};

export default AudioDetailScreen;
