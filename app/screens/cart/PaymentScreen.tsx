import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

type PaymentScreenRouteParams = {
  total?: number;
};

type PaymentScreenParamList = {
  Payment: PaymentScreenRouteParams;
};

import type { RouteProp } from '@react-navigation/native';

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<PaymentScreenParamList, 'Payment'>>();
  const total = route.params?.total || 45.00;

  return (
    <ScrollView className="flex-1 bg-gray-50 px-4 mt-10" showsVerticalScrollIndicator={false}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="flex-row items-center mb-6 pt-4"
      >
        <Ionicons name="chevron-back" size={24}/>
        <Text className="text-base font-medium ml-2">Back to Cart</Text>
      </TouchableOpacity>

      <View className="bg-white rounded-xl p-4 mb-6 shadow-sm">
        <View className="flex-row items-center mb-3 gap-3">
          <View className="w-10 h-10 bg-indigo-100 rounded-lg items-center justify-center">
            <Ionicons name="book" size={20} />
          </View>
          <View>
            <Text className="font-semibold text-gray-800">My Bookstore</Text>
            <Text className="text-sm text-gray-500">Delivery in 3-5 days</Text>
          </View>
        </View>

        <View className="flex-row items-start gap-3">
          <View className="w-10 h-10 bg-gray-100 rounded items-center justify-center mt-1">
            <Text className="text-xl">📍</Text>
          </View>
          <View className="flex-1">
            <Text className="font-medium text-gray-800">Delivery Address</Text>
            <Text className="text-sm text-gray-500 mt-1">
              2972 Westheimer Rd. Santa Ana, Illinois 85486
            </Text>
          </View>
        </View>
      </View>

      {/* Card Section */}
      <View className="bg-white rounded-xl p-4 mb-6 shadow-sm">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="font-semibold text-gray-800">Saved Card</Text>
          <TouchableOpacity>
            {/* <Text className="text-indigo-500 text-sm font-medium">ADD NEW</Text> */}
          </TouchableOpacity>
        </View>

        <View className="p-3 border border-gray-200 rounded-lg">
          <View className="flex-row items-center gap-3">
            <View className="w-4 h-4 rounded-full border-2 border-blue-500 items-center justify-center">
              <View className="w-2 h-2 bg-blue-500 rounded-full" />
            </View>
            <View className="flex-1">
              <Text className="text-sm text-gray-600">•••• •••• •••• 8295</Text>
              <Text className="text-xs text-gray-400 mt-1">Visa - saved securely</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="bg-white rounded-xl p-4 mb-6 shadow-sm">
        <Text className="font-semibold text-gray-800 mb-4">Other Payment Methods</Text>

        <View className="space-y-3">
          <TouchableOpacity className="flex-row items-center gap-3 p-3 rounded-lg border border-gray-200">
            <View className="w-10 h-10 bg-blue-100 rounded-lg items-center justify-center">
              <Ionicons name="logo-apple" size={20} />
            </View>
            <Text className="font-medium text-gray-800">Apple Pay</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center gap-3 p-3 rounded-lg border border-gray-200">
            <View className="w-10 h-10 bg-blue-100 rounded-lg items-center justify-center">
              <Ionicons name="logo-paypal" size={20} />
            </View>
            <Text className="font-medium text-gray-800">PayPal</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Total + Pay Now */}
      <View className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-lg font-semibold text-gray-800">Total</Text>
          <Text className="text-lg font-semibold text-blue-600">${total.toFixed(2)}</Text>
        </View>
        <Text className="text-sm text-gray-500">Includes all taxes and discounts</Text>
      </View>

      <TouchableOpacity className="w-full bg-blue-500 py-4 rounded-xl items-center justify-center mb-10">
        <Text className="text-white font-semibold text-lg">PAY NOW</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PaymentScreen;
