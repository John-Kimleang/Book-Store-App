import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Assets from '@/app/components/Assets';
import { useNavigation } from '@react-navigation/native';
import Header from '@/app/components/Header';
type BookCartItem = {
  id: number;
  title: string;
  author: string;
  coverImage: any;
  price: number;
  quantity: number;
};

const CartScreen = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState<BookCartItem[]>([
    {
      id: 1,
      title: 'Harry Potter',
      author: 'J.K. Rowling',
      coverImage: Assets.harryPotterBook,
      price: 3.59,
      quantity: 1,
    },
    {
      id: 2,
      title: 'The Art of War',
      author: 'Sun Tzu',
      coverImage: Assets.artofWarBook,
      price: 30.0,
      quantity: 1,
    },
  ]);

  const updateQuantity = (id: number, change: number) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
    <Header/>
    <ScrollView className="flex-1 bg-gray-50 px-4" showsVerticalScrollIndicator={false}>
      <View className="mb-6 pt-4">
        <Text className="text-lg font-semibold text-gray-800">Your Book Cart</Text>
      </View>

      <View className="gap-4 mb-6">
        {cartItems.map((item) => (
          <View key={item.id} className="bg-white rounded-xl p-4 shadow-sm">
            <View className="flex-row items-center space-x-4">
              <Image source={item.coverImage} className="w-16 h-24 rounded" />

              <View className="flex-1">
                <Text className="font-medium text-gray-800" numberOfLines={1}>{item.title}</Text>
                <Text className="text-sm text-gray-500 mb-2">by {item.author}</Text>

                <View className="flex-row items-center justify-between">
                  <Text className="text-lg font-semibold text-gray-800">${item.price}</Text>
                  <View className="flex-row items-center space-x-3">
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 rounded-full border border-gray-200 items-center justify-center"
                    >
                      <Ionicons name="remove" size={14} color="#666" />
                    </TouchableOpacity>
                    <Text className="w-8 text-center font-medium">{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 rounded-full border border-gray-200 items-center justify-center"
                    >
                      <Ionicons name="add" size={14} color="#666" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-3">
            <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center">
              <Ionicons name="cart" size={20} color="#3B82F6" />
            </View>
            <View>
              <Text className="font-semibold text-lg text-gray-800">Total: ${totalAmount.toFixed(2)}</Text>
              <Text className="text-sm text-gray-500">Taxes and shipping calculated at checkout</Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity className="w-full bg-blue-500 py-4 rounded-xl items-center justify-center mb-6">
        <Text className="text-white font-semibold text-lg">Checkout</Text>
      </TouchableOpacity>
    </ScrollView>
    </>

  );
};

export default CartScreen;
