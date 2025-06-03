import React, { useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Assets  from '../../components/Assets';
import Header from "../../components/Header";


const BookScreen = () => {
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', 'Comic', 'Business', 'Education', 'Literature', 'Science'];

  const books = [
    { id: 1, title: "Six Stories", author: "Matt Haper", rating: 4, reviews: 93, image: Assets.reactLogo, category: "Literature" },
    { id: 2, title: "Theory of Thing", author: "Miachel Roy", rating: 4, reviews: 250, image: Assets.reactLogo, category: "Science" },
    { id: 3, title: "Teaspoon of Earth", author: "Dina Nayeri", rating: 4, reviews: 47, image: require("../../../assets/images/favicon.png"), category: "Literature" },
    { id: 4, title: "Gone Wild", author: "Mia George", rating: 3, reviews: 286, image: require("../../../assets/images/favicon.png"), category: "Education" },
    { id: 5, title: "Business Mastery", author: "John Smith", rating: 5, reviews: 156, image: require("../../../assets/images/icon.png"), category: "Business" },
    { id: 6, title: "Comic Adventures", author: "Jane Doe", rating: 4, reviews: 89, image: require("../../../assets/images/icon.png"), category: "Comic" },
    { id: 7, title: "Learning Path", author: "Sarah Wilson", rating: 4, reviews: 234, image: Assets.reactLogo, category: "Education" },
    { id: 8, title: "Hero's Journey", author: "Alex Marvel", rating: 5, reviews: 445, image: require("../../../assets/images/favicon.png"), category: "Comic" }
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
        className="w-full h-40 rounded-lg mb-3"
        resizeMode="cover"
      />
      <Text className="text-base font-semibold text-gray-800 mb-1" numberOfLines={1}>
        {item.title}
      </Text>
      <Text className="text-sm text-gray-600 mb-2" numberOfLines={1}>
        by {item.author}
      </Text>
      <View className="flex-row items-center">
        <View className="flex-row mr-2">
          {renderStars(item.rating)}
        </View>
        <Text className="text-xs text-gray-500">({item.reviews})</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
        <Header/>
        <View className="flex-1 bg-gray-50">
            <View className="bg-white pt-12 pb-4 px-4 shadow-sm">
                <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                className="flex-row"
                >
                {categories.map((category) => (
                    <TouchableOpacity
                    key={category}
                    className={`mr-6 pb-2 ${activeTab === category ? 'border-b-2 border-blue-500' : ''}`}
                    onPress={() => setActiveTab(category)}
                    >
                    <Text className={`text-base ${
                        activeTab === category 
                        ? 'text-blue-500 font-semibold' 
                        : 'text-gray-500'
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
                paddingBottom: 100,
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