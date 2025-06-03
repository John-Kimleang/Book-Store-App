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
  const navigation = useNavigation();
  const [quantity, setQuantity] = React.useState(1);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const calculateTotalPrice = () => {
    const price = parseFloat(book.price.replace('$', ''));
    return (price * quantity).toFixed(2);
  };

  // Back button and title on header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: book.title,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="chevron-back" size={20} />
          <Text >Back</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, book.title]);

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

      <View className="absolute bottom-5 left-0 right-0 bg-white px-6 py-5 border-t border-gray-200 flex-row justify-between items-center">
        <View className="flex-row items-center bg-gray-100 px-4 py-2 rounded-lg">
          <Text className="text-gray-500 mr-4">QTY</Text>
          <TouchableOpacity onPress={decreaseQuantity} className="px-2">
            <Text className="text-lg font-bold">-</Text>
          </TouchableOpacity>
          <Text className="mx-2 text-lg font-semibold">{quantity}</Text>
          <TouchableOpacity onPress={increaseQuantity} className="px-2">
            <Text className="text-lg font-bold">+</Text>
          </TouchableOpacity>
        </View>
        <Text className="font-bold text-lg">Total: ${calculateTotalPrice()}</Text>
        <TouchableOpacity className="bg-orange-500 py-4 px-6 rounded-xl items-center">
          <Text className="text-white text-base font-semibold">Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}