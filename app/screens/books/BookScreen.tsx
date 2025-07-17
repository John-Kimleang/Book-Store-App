import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Assets from '../../components/Assets';
import Header from "../../components/Header";

const BookScreen = () => {
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', 'Comic', 'Business', 'Education', 'Literature', 'Science'];

  const books = [
    { id: 1, title: "The Let Them", author: "Mel Robbins", rating: 4, reviews: 250, price: 18.50, image: Assets.letThemBook, category: "Science" },
    { id: 2, title: "The Art of War", author: "Sun Tzu", rating: 4, reviews: 93, price: 12.99, image: Assets.artofWarBook, category: "Literature" },
    { id: 3, title: "Power of Habit", author: "Albert Johnson", rating: 4, reviews: 47, price: 14.75, image: Assets.powerofHabitBook, category: "Literature" },
    { id: 4, title: "Making Thing", author: "Mia George", rating: 3, reviews: 286, price: 11.99, image: Assets.makingThingHappenBook, category: "Education" },
    { id: 5, title: "The Power", author: "J.K Rowling", rating: 5, reviews: 156, price: 24.99, image: Assets.powerBook, category: "Business" },
    { id: 6, title: "Theory of Everything", author: "Jane Doe", rating: 4, reviews: 89, price: 9.99, image: Assets.theoryOfEverythingBook, category: "Comic" },
    { id: 7, title: "One Thing", author: "Sarah Wilson", rating: 4, reviews: 234, price: 16.50, image: Assets.oneThingBook, category: "Education" },
  ];

  const filteredBooks = activeTab === 'All' 
    ? books 
    : books.filter(book => book.category === activeTab);
 
  const handleBookPress = (bookId: number) => {
    router.push({ pathname: "/screens/books/[id]", params: { id: String(bookId) } });
  };
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? "star" : "star-outline"}
        size={12}
        color="#FFD700"
      />
    ));
  };

  const renderBookItem = ({ item, index }: { item: any, index: number }) => (
    <TouchableOpacity 
      className={`bg-white rounded-xl p-4 shadow-sm ${index % 2 === 0 ? 'mr-2' : 'ml-2'}`}
      style={{ width: '47%' }}
      onPress={() => handleBookPress(item.id)}
    >
      <Image
        source={item.image}
        className="w-full h-56 rounded-lg mb-3"
        resizeMode="cover"
      />
      <Text className="text-base font-semibold text-gray-800 mb-1" numberOfLines={1}>
        {item.title}
      </Text>
      <Text className="text-sm text-gray-600 mb-2" numberOfLines={1}>
        by {item.author}
      </Text>
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center">
          <View className="flex-row mr-2">
            {renderStars(item.rating)}
          </View>
          <Text className="text-xs text-gray-500">({item.reviews})</Text>
        </View>
      </View>
      <Text className="text-lg font-bold text-gray-800">
        ${item.price.toFixed(2)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
        <Header/>
        <View className="flex-1 bg-gray-50">
            <View className="bg-white py-4 px-4 shadow-sm">
                <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                className="flex-row"
                >
                {categories.map((category) => (
                    <TouchableOpacity
                    key={category}
                    className={`px-4 py-2 mx-1 rounded-full ${activeTab === category ? 'bg-blue-500' : 'bg-gray-200'}`}
                    onPress={() => setActiveTab(category)}
                    >
                    <Text className={`text-base ${
                        activeTab === category 
                        ? 'text-white font-semibold' 
                        : 'text-gray-700'
                    }`}>
                        {category}
                    </Text>
                    </TouchableOpacity>
                ))}
                </ScrollView>
            </View>
            <FlatList
                data={filteredBooks}
                renderItem={renderBookItem}
                numColumns={2}
                contentContainerStyle={{
                padding: 16,
                paddingBottom: 120, 
                }}
                columnWrapperStyle={{
                justifyContent: 'space-between',
                marginBottom: 16,
                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
        />
        </View>
    </>
  );
};

export default BookScreen;