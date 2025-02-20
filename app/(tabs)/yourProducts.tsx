// app/(tabs)/yourProducts.tsx
import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { getProducts } from "@/utils/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebaseConfig';
import ProductItem from "@/components/productItem";
import { useRouter, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function YourProductsScreen() {
    const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserId(parsedUser.uid);
      } else {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            await AsyncStorage.setItem("user", JSON.stringify(user));
            setUserId(user.uid);
          } else {
            router.push('/auth/login');
          }
        });
      }
    };
    checkUser();
  }, []);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
  
      const fetchUserProducts = async () => {
        if (!userId) return;
        
        try {
          const allProducts = await getProducts();
          const filtered = allProducts.filter((p: any) => p.userId === userId);
          if (isActive) setProducts(filtered);
        } catch (error) {
          console.error(error);
        } finally {
          if (isActive) setLoading(false);
        }
      };
  
      fetchUserProducts();
  
      return () => {
        isActive = false;
      };
    }, [userId])
  );
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => <ProductItem item={item}  />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No products found</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
});