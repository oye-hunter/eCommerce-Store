import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { getProducts, deleteProduct } from "@/utils/firestore";
// import { Ionicons } from "@expo/vector-icons";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebaseConfig';
import { useFocusEffect } from 'expo-router';
import ProductItem from "@/components/productItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProductsScreen() {
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
  
      const fetchProducts = async () => {
        try {
          const data = await getProducts();
          if (isActive) setProducts(data);
        } catch (error) {
          console.error(error);
        } finally {
          if (isActive) setLoading(false);
        }
      };
  
      fetchProducts();
  
      return () => {
        isActive = false;
      };
    }, [])
  );

  // const handleUpdate = (productId: string) => {
  //   router.push(`/updateProduct/${productId}`);
  // };

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
        renderItem={({ item }) => <ProductItem item={item} />}
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
  productCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  productDescription: {
    fontSize: 12,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  }
});
