import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import { deleteProduct } from "@/utils/firestore";

interface ProductItemProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    userId?: string;
  };
  // isProductsRoute: boolean;
}

const ProductItem: React.FC<ProductItemProps> = ({ item }: { item: ProductItemProps['item'] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isProductsRoute = pathname.startsWith('/products');
  // const [isProductsRoute, setIsProductsRoute] = useState(false);

  const handleUpdate = () => {
    router.push(`/updateProduct/${item.id}`);
  };

  // useEffect(() => {
  //   setIsProductsRoute(pathname === "/products");
  // }, [pathname]);

  return (
    <View style={styles.productCard}>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
      </View>
      {!isProductsRoute && (
        <View style={styles.actions}>
          <Pressable onPress={handleUpdate}>
            <Ionicons name="create-outline" size={24} color="#007AFF" />
          </Pressable>
          <Pressable onPress={() => deleteProduct(item.id)}>
            <Ionicons name="trash-outline" size={24} color="red" />
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default ProductItem;