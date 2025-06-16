import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Assets from '../../components/Assets';
import Header from "../../components/Header";

const AudioBookScreen = () => {
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', 'Comic', 'Business', 'Education', 'Literature', 'Science'];

  const books = [
    { id: 1, title: "Six Stories", author: "Matt Haper", rating: 4, reviews: 93, price: 12.99, image: Assets.artofWarBook, category: "Literature", duration: "1:30:20" },
    { id: 2, title: "Theory of Thing", author: "Miachel Roy", rating: 4, reviews: 250, price: 18.50, image: Assets.artofWarBook, category: "Science", duration: "2:15:45" },
    { id: 3, title: "Teaspoon of Earth", author: "Dina Nayeri", rating: 4, reviews: 47, price: 14.75, image: Assets.powerofHabitBook, category: "Literature", duration: "1:45:30" },
    { id: 4, title: "Gone Wild", author: "Mia George", rating: 3, reviews: 286, price: 11.99, image: Assets.powerofHabitBook, category: "Education", duration: "3:20:15" },
    { id: 5, title: "Business Mastery", author: "John Smith", rating: 5, reviews: 156, price: 24.99, image: Assets.harryPotterBook, category: "Business", duration: "2:45:30" },
    { id: 6, title: "Comic Adventures", author: "Jane Doe", rating: 4, reviews: 89, price: 9.99, image: Assets.harryPotterBook, category: "Comic", duration: "1:15:20" },
    { id: 7, title: "Learning Path", author: "Sarah Wilson", rating: 4, reviews: 234, price: 16.50, image: Assets.reactLogo, category: "Education", duration: "4:10:25" },
    { id: 8, title: "Hero's Journey", author: "Alex Marvel", rating: 5, reviews: 445, price: 13.25, image: Assets.powerofHabitBook, category: "Comic", duration: "2:30:40" }
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

  const renderBookItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      className="bg-white rounded-xl p-4 shadow-sm mb-4 mx-4 flex-row"
      onPress={() => handleBookPress(item.id)}
    >

      <Image
        source={item.image}
        className="w-20 h-28 rounded-lg mr-4"
        resizeMode="cover"
      />
      
      <View className="flex-1 justify-between">
        <View>
          <Text className="text-lg font-semibold text-gray-800 mb-1" numberOfLines={2}>
            {item.title}
          </Text>
          <Text className="text-sm text-gray-600 mb-2" numberOfLines={1}>
            by {item.author}
          </Text>
          
          {/* Duration */}
          <View className="flex-row items-center mb-2">
            <Ionicons name="time-outline" size={14} color="#666" style={{ marginRight: 4 }} />
            <Text className="text-xs text-gray-600">{item.duration}</Text>
          </View>
          
          {/* Star rating */}
          <View className="flex-row items-center mb-2">
            {renderStars(item.rating)}
            <Text className="text-xs text-gray-500 ml-2">({item.reviews})</Text>
          </View>
        </View>
        
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="play-circle" size={18} color="#3B82F6" style={{ marginRight: 6 }} />
            <Text className="text-sm text-blue-500 font-medium">Play Now</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="bookmark-outline" size={20} color="#3B82F6" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
        <Header/>
        <View className="flex-1 bg-gray-50">
            {/* Categories Section */}
            <View className="bg-white py-4 px-4 shadow-sm">
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 0 }}
                >
                    <View className="flex-row" style={{ gap: 12 }}>
                        {categories.map((category) => (
                            <TouchableOpacity
                                key={category}
                                className={`px-4 py-2 rounded-full ${activeTab === category ? 'bg-blue-500' : 'bg-gray-200'}`}
                                onPress={() => setActiveTab(category)}
                            >
                                <Text className={`text-sm ${
                                    activeTab === category 
                                    ? 'text-white font-semibold' 
                                    : 'text-gray-700'
                                }`}>
                                    {category}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
            
            {/* Books List */}
            <FlatList
                data={filteredBooks}
                renderItem={renderBookItem}
                contentContainerStyle={{
                    paddingTop: 16,
                    paddingBottom: 100,
                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    </>
  );
};

export default AudioBookScreen;