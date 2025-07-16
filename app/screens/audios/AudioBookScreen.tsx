import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Assets from '../../components/Assets';
import Header from "../../components/Header";
import MiniPlayer from '../../components/MiniPlayer';
import { useAudioPlayer } from '../../context/AudioPlayerContext';

const AudioBookScreen = () => {
  const [activeTab, setActiveTab] = useState('All');
  const { playBook } = useAudioPlayer();

  const categories = ['All', 'Comic', 'Business', 'Education', 'Literature', 'Science'];

  const books = [
    { id: "1", title: "The Let Them", author: "Mel Robbins", rating: 4, reviews: 250, price: 18.50, image: Assets.letThemBook, category: "Science", duration: "2:15:45" },
    { id: "2", title: "The Art of War", author: "Sun Tzu", rating: 4, reviews: 93, price: 12.99, image: Assets.artofWarBook, category: "Literature", duration: "1:30:20" },
    { id: "3", title: "Power of Habit", author: "Albert Johnson", rating: 4, reviews: 47, price: 14.75, image: Assets.powerofHabitBook, category: "Literature", duration: "1:45:30" },
    { id: "4", title: "Making Thing", author: "Mia George", rating: 3, reviews: 286, price: 11.99, image: Assets.makingThingHappenBook, category: "Education", duration: "3:20:15" },
    { id: "5", title: "The Power", author: "J.K Rowling", rating: 5, reviews: 156, price: 24.99, image: Assets.powerBook, category: "Business", duration: "2:45:30" },
    { id: "6", title: "Theory of Everything", author: "Jane Doe", rating: 4, reviews: 89, price: 9.99, image: Assets.theoryOfEverythingBook, category: "Comic", duration: "1:15:20" },
    { id: "7", title: "One Thing", author: "Sarah Wilson", rating: 4, reviews: 234, price: 16.50, image: Assets.oneThingBook, category: "Education", duration: "4:10:25" },
  ];

  const filteredBooks = activeTab === 'All' 
    ? books 
    : books.filter(book => book.category === activeTab);
 
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

  const handleBookPress = async (book: any) => {
    await playBook(book);
  };

  const renderBookItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      className="bg-white rounded-xl p-4 shadow-sm mb-4 mx-4 flex-row"
      onPress={() => handleBookPress(item)}
    >
      <Image
        source={item.image}
        className="w-20 h-28 rounded-lg mr-4"
        resizeMode="cover"
      />
      <View className="flex-1 justify-between">
        <View>
          <Text className="text-xl font-semibold text-gray-800 mb-1" numberOfLines={2}>
            {item.title}
          </Text>
          <Text className="text-md text-gray-600 mb-2" numberOfLines={1}>
            By {item.author}
          </Text>
          
          <View className="flex-row items-center mb-1">
            <Ionicons name="time-outline" size={18} color="#666" style={{ marginRight: 4 }} />
            <Text className="text-md text-gray-600">{item.duration}</Text>
          </View>
        </View>
        
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="play-circle" size={18} color="#3B82F6" style={{ marginRight: 6 }} />
            <Text className="text-md text-blue-500 font-medium">Play Now</Text>
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
        
        {/* Mini Player */}
        <MiniPlayer />
    </>
  );
};

export default AudioBookScreen;
