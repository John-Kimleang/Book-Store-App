import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type Book = {
  id: number;
  title: string;
  subtitle: string;
  author: string;
  authorImage: string;
  coverImage: string;
  price: string;
  description: string;
  rating: number;
  reviews: number;
};


const bookData: Record<number, Book> = {
  1: {
    id: 1,
    title: "The Pioneers",
    subtitle: "The Heroic Story of the Settlers Who Brought the American Ideal West",
    author: "David McCullough",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
    price: "$3.59",
    description: "David McCullough is best known for most nonfiction for his popular biographies of 'Read More'",
    rating: 4.5,
    reviews: 1234,
  },
    2: {
    id: 2,
    title: "The Art of War",
    subtitle: "Ancient Wisdom for Modern Leaders",
    author: "Sun Tzu",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
    price: "$30.00",
    description: "An ancient Chinese military treatise attributed to Sun Tzu, a high-ranking military general, strategist, and tactician.",
    rating: 4.5,
    reviews: 532,
  },
};

export default function BookDetail() {
  const { id } = useLocalSearchParams();
  const bookId = Number(id);
  const book = bookData[bookId] || bookData[1]; // Fallback to first book

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
    
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="items-center">
          <Image 
            source={{ uri: book.coverImage }} 
            className="w-full h-72 rounded-xl shadow-lg" 
          />
        </View>

        <View className="bg-white -mt-5 rounded-t-3xl px-6 pt-8 pb-24">
          <View className="flex-row items-center mb-5">
            <Image 
              source={{ uri: book.authorImage }} 
              className="w-10 h-10 rounded-full mr-3" 
            />
            <Text className="text-base font-semibold text-gray-700">{book.author}</Text>
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
        </View>
      </ScrollView>

      {/* Buy Button */}
      <View className="absolute bottom-5 left-0 right-0 bg-white px-6 py-5 border-t border-gray-200">
        <TouchableOpacity className="bg-cyan-400 py-4 rounded-xl items-center">
          <Text className="text-white text-base font-semibold">Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}