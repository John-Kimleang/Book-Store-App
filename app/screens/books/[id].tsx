import Assets from '@/app/components/Assets';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { ImageSourcePropType } from 'react-native';

type Book = {
  id: number;
  title: string;
  subtitle: string;
  author: string;
  authorImage: ImageSourcePropType;
  coverImage: ImageSourcePropType;
  price: string;
  description: string;
  rating: number;
  reviews: number;
};


const bookData: Record<number, Book> = {
  1: {
    id: 1,
    title: "The Let Them Theory",
    subtitle: "Empowering Yourself to Say No",
    author: "Mel Robbins",
    authorImage: Assets.authorRobert,
    coverImage: Assets.letThemBook,
    price: "$18.50",
    description: "A motivational book that teaches you how to set boundaries and take control of your life.",
    rating: 4,
    reviews: 250,
  },
  2: {
    id: 2,
    title: "The Art of War",
    subtitle: "Ancient Wisdom for Modern Leaders",
    author: "Sun Tzu",
    authorImage: Assets.authorRobert,
    coverImage: Assets.artofWarBook,
    price: "$12.99",
    description: "An ancient Chinese military treatise attributed to Sun Tzu, a high-ranking military general, strategist, and tactician.",
    rating: 4,
    reviews: 93,
  },
  3: {
    id: 3,
    title: "Power of Habit",
    subtitle: "Why We Do What We Do in Life and Business",
    author: "Albert Johnson",
    authorImage: Assets.authorRobert,
    coverImage: Assets.powerofHabitBook,
    price: "$14.75",
    description: "A book that explores the science behind habit formation and how to change them.",
    rating: 4,
    reviews: 47,
  },
  4: {
    id: 4,
    title: "Making Thing Happen for you",
    subtitle: "Happen: Mastering Project Management",
    author: "Mia George",
    authorImage: Assets.authorRobert,
    coverImage: Assets.makingThingHappenBook,
    price: "$11.99",
    description: "A practical guide to project management and achieving goals.",
    rating: 3,
    reviews: 286,
  },
  5: {
    id: 5,
    title: "The Power",
    subtitle: "Unlocking Your Potential",
    author: "J.K Rowling",
    authorImage: Assets.authorRobert,
    coverImage: Assets.powerBook,
    price: "$24.99",
    description: "A book that inspires readers to harness their inner strength and achieve greatness.",
    rating: 5,
    reviews: 156,
  },
  6: {
    id: 6,
    title: "Theory of Everything",
    subtitle: "Exploring the Universe",
    author: "Jane Doe",
    authorImage: Assets.authorRobert,
    coverImage: Assets.theoryOfEverythingBook,
    price: "$9.99",
    description: "A fascinating look at the universe and the theories that explain it.",
    rating: 4,
    reviews: 89,
  },
  7: {
    id: 7,
    title: "One Thing That Matters",
    subtitle: "The Surprisingly Simple Truth Behind Extraordinary Results",
    author: "Sarah Wilson",
    authorImage: Assets.authorRobert,
    coverImage: Assets.oneThingBook,
    price: "$16.50",
    description: "A book that teaches you how to focus on what truly matters to achieve success.",
    rating: 4,
    reviews: 234,
  },
};

export default function BookDetail() {
  const { id } = useLocalSearchParams();
  const bookId = Number(id);
  const book = bookData[bookId] || bookData[1];
  const navigation = useNavigation();
  const [quantity, setQuantity] = React.useState(1);
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const calculateTotalPrice = () => {
    const price = parseFloat(book.price.replace('$', ''));
    return (price * quantity).toFixed(2);
  };

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  // Back button on header
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
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="items-center bg-white py-10">
          <Image 
            source={book.coverImage} 
            className="w-60 h-96 rounded-xl shadow-lg" 
          />
        </View>

        <View className="bg-white mt-2 rounded-t-3xl px-6 pt-8 pb-24">
          <View className="flex-row items-center mb-5">
            <Image 
              source={book.authorImage} 
              className="w-20 h-20 rounded-full mr-3" 
            />
            <Text className="text-2xl font-semibold text-gray-700">{book.author}</Text>
          </View>
          
          <Text className="text-2xl font-bold text-gray-800 mb-2 leading-8">{book.title}</Text> 
          <Text className="text-base text-gray-600 mb-5 leading-6">{book.subtitle}</Text>
          <Text className="text-sm text-gray-700 leading-6 mb-5">{book.description}</Text>

          <View className="flex-row items-center mb-8">
            <View className="flex-row mr-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name={star <= book.rating ? "star" : "star-outline"}
                  size={16}
                  color="#FFD700"
                />
              ))}
            </View>
            <Text className="text-sm text-gray-600">({book.reviews} reviews)</Text>
          </View>

          <Text className="text-sm text-gray-600 mb-1">Price</Text>
          <Text className="text-3xl font-bold text-green-600 mb-5">{book.price}</Text>

          <TouchableOpacity
            onPress={toggleBookmark}
            className="absolute top-5 right-5 p-2 shadow-sm"
          >
            <Ionicons
              name="bookmark"
              size={24}
              color={isBookmarked ? "blue" : "black"}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View className="absolute bottom-5 left-0 right-0 bg-white px-6 py-5 border-t border-gray-200 flex-row justify-between items-center">
        <View className="flex-row items-center bg-gray-100 px-4 py-2 rounded-lg">
          <Text className="text-gray-500 mr-4 font-medium">QTY</Text>
          <TouchableOpacity onPress={decreaseQuantity} className="px-3 py-1">
            <Text className="text-lg font-bold">-</Text>
          </TouchableOpacity>
          <Text className="mx-3 text-lg font-semibold text-gray-700">{quantity}</Text>
          <TouchableOpacity onPress={increaseQuantity} className="px-3 py-1">
            <Text className="text-lg font-bold">+</Text>
          </TouchableOpacity>
        </View>
        <Text className="font-bold text-lg text-gray-800">Total: ${calculateTotalPrice()}</Text>
        <TouchableOpacity className="bg-blue-500 p-3 rounded-full items-center justify-center">
          <Ionicons name="cart" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}