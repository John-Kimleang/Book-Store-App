import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Assets from "../../components/Assets";
import Header from "../../components/Header";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const newReleases = [
    { id: 1, title: "The Pioneer", price: "$11.99", image: Assets.artofWarBook },
    { id: 2, title: "The Art of War", price: "$30.00", image: Assets.artofWarBook },
    { id: 3, title: "The Subtle Art", price: "$20.00", image: Assets.artofWarBook },
    { id: 4, title: "Harry Potter", price: "$5.00", image: Assets.artofWarBook },
  ];

  const youMayAlsoLike = [
    { id: 5, title: "Arena of Justice", reviews: "34 reviews", stars: 4, image: Assets.artofWarBook },
    { id: 6, title: "Summer Camp", reviews: "12 reviews", stars: 3, image: Assets.artofWarBook },
    { id: 7, title: "Medium Raw", reviews: "45 reviews", stars: 5, image: Assets.artofWarBook },
  ];

  //Book navigation
  const handleBookPress = (bookId: number) => {
    router.push({ pathname: "/screens/books/[id]", params: { id: String(bookId) } });
  };

  return (
    <>
        <Header />
        <ScrollView className="flex-1 bg-white px-4">
        <View className="mt-4 relative">
            <Image
            source={Assets.icon}
            className="w-full h-40 rounded-lg"
            />
            <Text className="absolute top-10 left-4 text-gray-500 text-lg font-bold">
                Discover New Books with Latest Collection
            </Text>
            <Text className="absolute top-20 left-20 text-gray-500">
                The Law of Power available now!
            </Text>
        </View>

        <View className="mt-6">
            <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold">New Releases</Text>
            <TouchableOpacity>
                <Text className="text-blue-500">View all</Text>
            </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {newReleases.map((book) => (
                <TouchableOpacity 
                key={book.id} 
                className="mr-4"
                onPress={() => handleBookPress(book.id)}
                >
                <Image
                    source={book.image}
                    className="w-32 h-46 rounded-lg"
                />
                <Text className="text-sm mt-2">{book.title}</Text>
                <Text className="text-gray-500 text-sm">{book.price}</Text>
                </TouchableOpacity>
            ))}
            </ScrollView>
        </View>

        <View className="mt-6">
            <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold">You may also like</Text>
            <TouchableOpacity>
                <Text className="text-blue-500">View all</Text>
            </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
            {youMayAlsoLike.map((book) => (
                <TouchableOpacity 
                key={book.id} 
                className="flex-row mb-2 p-4 rounded-lg gap-4 border border-gray-200"
                onPress={() => handleBookPress(book.id)}
                >
                <Image
                    source={book.image}
                    className="w-28 h-24 rounded-lg"
                />
                <View className="flex-1">
                    <Text className="text-lg font-bold">{book.title}</Text>
                    <Text className="text-gray-500">{book.reviews}</Text>
                    <View className="flex-row items-center mt-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Ionicons
                        key={index}
                        name={index < book.stars ? "star" : "star-outline"}
                        size={16}
                        color="gold"
                        className="mr-1"
                        />
                    ))}
                    </View>
                </View>
                </TouchableOpacity>
            ))}
            </ScrollView>
        </View>
        </ScrollView>
    </>

  );
};

export default HomeScreen;