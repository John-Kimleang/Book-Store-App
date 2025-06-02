import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 p-10">
      <Text className="text-3xl text-blue-500 text-bold">Welcome to React</Text>
      <Text className="text-2xl">This is a React Native app</Text>
      <TouchableOpacity className="bg-green-500 rounded-full p-4 my-8 items-center justify-center">
        <Text className="text-lg text-gray-500 font-bold ">
          Click Me!
        </Text>
      </TouchableOpacity>
      <Text></Text>

      <View style={{flex: 1, backgroundColor: 'powderblue'}}/>
      <View style={{flex: 2, backgroundColor: 'skyblue'}} />
      <View style={{flex: 3, backgroundColor: 'steelblue'}} />
    </View>
  );
}
 