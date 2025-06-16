import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Assets from '../../components/Assets';

const AudioDetailScreen = () => {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const book = {
    id: params.id,
    title: params.title,
    author: params.author,
    duration: params.duration,
    category: params.category,
    rating: parseInt(params.rating as string) || 0,
    reviews: parseInt(params.reviews as string) || 0,
    price: parseFloat(params.price as string) || 0,
    image: getBookImage(params.id as string)
  };

  function getBookImage(bookId: string) {
    const imageMap: { [key: string]: any } = {
      '1': Assets.artofWarBook,
      '2': Assets.artofWarBook,
      '3': Assets.powerofHabitBook,
      '4': Assets.powerofHabitBook,
      '5': Assets.harryPotterBook,
      '6': Assets.harryPotterBook,
      '7': Assets.reactLogo,
      '8': Assets.powerofHabitBook,
    };
    return imageMap[bookId] || Assets.artofWarBook;
  }
    // Back button and title on header
    React.useLayoutEffect(() => {
        navigation.setOptions({
        title: book.title,
        headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons name="chevron-back" size={20} />
            </TouchableOpacity>
        ),
        });
    }, [navigation, book.title]);

  return (
    <View className="flex-1 bg-teal-500">
      <View className="items-center mt-20">
        <Image
          source={book.image}
          className="w-60 h-80 rounded-lg shadow-lg"
          resizeMode="cover"
        />
        <Text className="text-white text-xl font-bold mt-4" numberOfLines={2}>
          {book.title}
        </Text>
        <Text className="text-white text-sm mt-2">by {book.author}</Text>
      </View>

      {/* Audio Controls */}
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-white text-lg font-semibold mb-4">Chapter 1: Part 2</Text>
        <Text className="text-white text-sm mb-6">{book.duration}</Text>

        {/* Progress Bar */}
        <View className="w-full h-1 bg-gray-300 rounded-full mb-6">
          <View className="w-1/3 h-full bg-white rounded-full" />
        </View>

        {/* Time Display */}
        <View className="flex-row justify-between w-full px-2 mb-6">
          <Text className="text-white text-xs">00:25:30</Text>
          <Text className="text-white text-xs">{book.duration}</Text>
        </View>

        {/* Controls */}
        <View className="flex-row justify-between items-center w-full px-8 mb-8">
          <TouchableOpacity>
            <Ionicons name="play-back" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="play" size={48} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="play-forward" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AudioDetailScreen;