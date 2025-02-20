import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebaseConfig';

interface User {
  uid: string;
    email: string;
}

export default function SettingsScreen() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    loadUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('user');
      router.replace('/auth/login');
    } catch (error) {
      alert('Error signing out');
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <View>
          <Text style={styles.userText}>Logged in as: {user.uid}</Text>
          <Text style={styles.userText}>Logged in as: {user.email}</Text>
        </View>
      ) : (
        <Text style={styles.userText}>No user found</Text>
      )}

      <Pressable style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  userText: {
    fontSize: 18,
    marginBottom: 20,
  },
  signOutButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 8,
  },
  signOutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
