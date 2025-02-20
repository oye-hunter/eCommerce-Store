// app/updateProduct/[id].tsx
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

export default function UpdateProductScreen() {
  const { id } = useLocalSearchParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price.toString());
      }
    };
    fetchProduct();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const docRef = doc(db, "products", id as string);
      await updateDoc(docRef, {
        name,
        description,
        price: Number(price),
      });
      alert("Product updated successfully!");
    } catch (error) {
      alert("Error updating product");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Product</Text>
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
      <Pressable style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Product</Text>
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