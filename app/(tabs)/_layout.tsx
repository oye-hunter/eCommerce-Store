// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: "#007AFF",
      tabBarLabelStyle: {
        display: 'none' // Hide all labels by default
      },
      tabBarStyle: {
        height: 55,
      }
    }}>
      <Tabs.Screen 
        name="products"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name="list" 
              size={focused ? 32 : 24} 
              color={color} 
              style={focused ? { transform: [{ translateY: 2.5 }] } : {}}
            />
          ),
          tabBarLabel: ({ focused }) => focused ? null : <Text style={{fontSize: 9}}>All Products</Text>,
        }}
      />
      <Tabs.Screen 
        name="addProduct"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name="add-circle" 
              size={focused ? 32 : 24} 
              color={color} 
              style={focused ? { transform: [{ translateY: 2.5 }] } : {}}
            />
          ),
          tabBarLabel: ({ focused }) => focused ? null : <Text style={{fontSize: 9}}>Add Product</Text>,
        }}
      />
      <Tabs.Screen 
        name="yourProducts"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name="person" 
              size={focused ? 32 : 24} 
              color={color} 
              style={focused ? { transform: [{ translateY: 2.5 }] } : {}}
            />
          ),
          tabBarLabel: ({ focused }) => focused ? null : <Text style={{fontSize: 9}}>My Products</Text>,
        }}
      />
      <Tabs.Screen 
        name="settings"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name="settings" 
              size={focused ? 32 : 24} 
              color={color} 
              style={focused ? { transform: [{ translateY: 2.5 }] } : {}}
            />
          ),
          tabBarLabel: ({ focused }) => focused ? null : <Text style={{fontSize: 9}}>Settings</Text>,
        }}
      />
      <Tabs.Screen 
        name="updateProduct/[id]"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name="create" 
              size={focused ? 32 : 24} 
              color={color} 
              style={focused ? { transform: [{ translateY: 2.5 }] } : {}}
            />
          ),
          tabBarLabel: ({ focused }) => focused ? null : <Text style={{fontSize: 9}}>Update Products</Text>,
        }}
      />
    </Tabs>
  );
}