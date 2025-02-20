import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useAuthRequest } from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import { auth } from '@/config/firebaseConfig';
import { emailSignIn, googleSignIn } from '@/services/auth';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Google auth setup
  const [request, response, promptAsync] = useAuthRequest({
    clientId: '27659315254-9dq7nh0dk2bkl83j2pnj4cae7ibl2k7p.apps.googleusercontent.com',
    redirectUri: makeRedirectUri({
      native: 'com.example.ecommercestore://redirect'
    }),
    scopes: ['openid', 'profile', 'email'],
  });

  // Handle auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) router.replace('/products');
    });
    return unsubscribe;
  }, []);

  // Handle Google auth response
  useEffect(() => {
    if (response?.type === 'success' && response.params.id_token) {
      handleSocialLogin(response.params.id_token);
    }
  }, [response]);

  const handleEmailLogin = async () => {
    setLoading(true);
    try {
      await emailSignIn(email, password);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (idToken: string) => {
    setLoading(true);
    try {
      await googleSignIn(idToken);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.title}>Welcome to eCommerce App</Text>

      <TextInput
        placeholder="Work Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <Pressable onPress={() => router.push('/auth/register')}>
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </Pressable>

      <Pressable 
        style={styles.primaryButton} 
        onPress={handleEmailLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.primaryButtonText}>Continue with Email</Text>
        )}
      </Pressable>

      <Text style={styles.orText}>OR</Text>

      <Pressable 
        style={styles.socialButton} 
        onPress={() => promptAsync()}
        disabled={!request || loading}
      >
        {loading ? (
          <ActivityIndicator color="black" />
        ) : (
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'white' },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 40, textAlign: 'center' },
  input: { 
    height: 50, 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 8, 
    paddingHorizontal: 15, 
    marginBottom: 8, 
    fontSize: 16 
  },
  primaryButton: { 
    backgroundColor: '#007AFF', 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginVertical: 7 
  },
  primaryButtonText: { 
    color: 'white', 
    fontSize: 16, 
    fontWeight: '500' 
  },
  socialButton: { 
    borderWidth: 1, 
    borderColor: '#ddd', 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginVertical: 5 
  },
  socialButtonText: { 
    color: 'black', 
    fontSize: 16, 
    fontWeight: '500' 
  },
  orText: { 
    textAlign: 'center', 
    marginVertical: 15, 
    color: '#666' 
  },
  linkText: { 
    color: '#007AFF', 
    textAlign: 'right', 
    marginBottom: 10, 
    fontSize: 14 
  },
});


// https://auth.expo.io/@hunter47/ecommerce-store
// exp://exp.host/@hunter47/ecommerce-store