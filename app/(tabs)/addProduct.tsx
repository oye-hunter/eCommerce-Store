// app/(tabs)/addProduct.tsx
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { addProduct } from "@/utils/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebaseConfig';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function AddProductScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);


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

  const handleAddProduct = async () => {
    setLoading(true);
    if (!name || !description || !price) return alert("Please fill all fields");
    if (!userId) return alert("Please login first");
    
    try {
      await addProduct(name, description, Number(price), userId);
      setName("");
      setDescription("");
      setPrice("");
      alert("Product added successfully!");
    } catch (error) {
      alert("Error adding product");
    }
      setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Product</Text>
      <TextInput
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        keyboardType="numeric"
      />
      <Pressable style={styles.button} onPress={handleAddProduct}>
        {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.buttonText}>Add Product</Text>
                )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});