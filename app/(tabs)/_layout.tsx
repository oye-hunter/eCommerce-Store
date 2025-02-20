// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#007AFF" }}>
      <Tabs.Screen 
        name="products"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="list" size={24} color={color} />,
          tabBarLabel: "All Products"
        }}
      />
      <Tabs.Screen 
        name="addProduct"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="add-circle" size={24} color={color} />,
          tabBarLabel: "Add Product"
        }}
      />
      <Tabs.Screen 
        name="yourProducts"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
          tabBarLabel: "Your Products"
        }}
      />
        <Tabs.Screen 
          name="updateProduct/[id]"
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <Ionicons name="create" size={24} color={color} />,
            tabBarLabel: "Update Product"
          }}
        />
      <Tabs.Screen 
        name="settings"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />,
          tabBarLabel: "Settings"
        }}
      />
    </Tabs>
  );
}