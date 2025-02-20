import { collection, getDocs, addDoc, deleteDoc, updateDoc, query, where, doc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

// Add a new product
export async function addProduct(name: string, description: string, price: number, userId: string) {
  try {
    const docRef = await addDoc(collection(db, "products"), {
      name,
      description,
      price,
      userId, // Store the user who added the product
      createdAt: new Date(),
    });
    console.log("Product added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding product: ", error);
  }
}


// Fetch all products
export async function getProducts() {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching products: ", error);
      return [];
    }
  }

// Update a product
export async function updateProduct(productId: string, updatedData: { name?: string; description?: string; price?: number }) {
    try {
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, updatedData);
      console.log("Product updated successfully");
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  }

  // Delete a product
export async function deleteProduct(productId: string) {
    try {
      await deleteDoc(doc(db, "products", productId));
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  }
