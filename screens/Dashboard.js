// import React from 'react';
// import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
// import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
// import { StatusBar } from 'expo-status-bar';

// export default function Dashboard() {
//   return (
//     <View className="flex-1 bg-white">
//       <StatusBar style="dark" />

//       {/* Header */}
//       <View className="px-4 pt-10 flex-row items-center justify-between">
//         <Text className="text-lg font-bold">12:46</Text>
//         <TouchableOpacity>
//           <Text className="text-gray-600 font-semibold">Log out</Text>
//         </TouchableOpacity>
//       </View>

//       {/* User Info */}
//       <View className="px-4 mt-4 flex-row items-center justify-between">
//         <View className="flex-row items-center space-x-3">
//           <View className="w-12 h-12 rounded-full bg-pink-700 items-center justify-center">
//             <Text className="text-white font-bold">NN</Text>
//           </View>
//           <View>
//             <Text className="text-black font-semibold text-base">Network Navigators</Text>
//             <Text className="text-gray-600 text-sm">Business Bank Account</Text>
//           </View>
//         </View>
//         <TouchableOpacity>
//           <Ionicons name="chatbubble-ellipses-outline" size={24} color="crimson" />
//         </TouchableOpacity>
//       </View>

//       {/* Action Buttons */}
//       <View className="flex-row justify-around mt-6">
//         <ActionButton label="Pay" icon="wallet" />
//         <ActionButton label="Buy Airtime" icon="mobile-alt" />
//         <ActionButton label="Transfer" icon="swap-horizontal" isIonicon />
//         <ActionButton label="CashSend" icon="credit-card" />
//       </View>

//       {/* Scrollable section */}
//       <ScrollView className="px-4 mt-6" showsVerticalScrollIndicator={false}>
//         {/* Current Account */}
//         <View className="bg-red-600 rounded-xl p-4 mb-4">
//           <Text className="text-white font-semibold">Current account</Text>
//           <Text className="text-white text-lg font-bold mt-1">4118 7499 74</Text>
//           <Text className="text-white text-right font-bold text-xl mt-2">R 0.00</Text>
//           <Text className="text-white text-right">Available balance</Text>
//         </View>

//         {/* Advantage */}
//         <View className="bg-purple-800 rounded-xl p-4 mb-4">
//           <Text className="text-white font-semibold mb-2">Advantage</Text>
//           <TouchableOpacity className="bg-white rounded-full px-3 py-1 self-start">
//             <Text className="text-red-700 font-semibold">New challenge available</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Insurance Hub */}
//         <View className="bg-red-600 rounded-xl p-4 flex-row items-center justify-between">
//           <View>
//             <Text className="text-white font-bold text-lg">Insurance hub</Text>
//           </View>
//           {/* <Image
//             source={require('./assets/transaction.png')}
//             style={{ width: 80, height: 80 }}
//             resizeMode="contain"
//           /> */}
//         </View>
//       </ScrollView>

//       {/* Bottom Navigation */}
//       <View className="absolute bottom-0 w-full flex-row justify-around items-center bg-white py-3 border-t border-gray-200">
//         <NavIcon label="Home" icon="home" active />
//         <NavIcon label="Cards" icon="credit-card" />
//         <NavIcon label="Offers" icon="local-offer" />
//         <NavIcon label="Notifications" icon="notifications" dot />
//         <NavIcon label="Menu" icon="menu" />
//       </View>
//     </View>
//   );
// }

// function ActionButton({ label, icon, isIonicon }) {
//   const IconComp = isIonicon ? Ionicons : FontAwesome5;
//   return (
//     <TouchableOpacity className="items-center">
//       <View className="bg-pink-600 rounded-full p-4 mb-1">
//         <IconComp name={icon} size={20} color="white" />
//       </View>
//       <Text className="text-sm font-medium text-gray-800 text-center w-16">{label}</Text>
//     </TouchableOpacity>
//   );
// }

// function NavIcon({ label, icon, active, dot }) {
//   return (
//     <TouchableOpacity className="items-center">
//       <View className="relative">
//         <MaterialIcons name={icon} size={24} color={active ? 'crimson' : 'gray'} />
//         {dot && <View className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full" />}
//       </View>
//       <Text className={`text-xs ${active ? 'text-red-600' : 'text-gray-500'}`}>{label}</Text>
//     </TouchableOpacity>
//   );
// }
