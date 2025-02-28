import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { auth } from '@/config/firebaseConfig';
import { emailSignIn, googleSignIn } from '@/services/auth';
import { GoogleAuthProvider, signInWithCredential, User } from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '27659315254-umb74fcgshtoo7j5bhs88egecfe7j737.apps.googleusercontent.com',
    redirectUri: 'https://auth.expo.io/@hunter47/ecommerce-store',
    // redirectUri: makeRedirectUri({ scheme: 'com.hunter47.ecommercestore' }),
    scopes: ['openid', 'email'],
  });

  // Handle Firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        router.replace('/products');
      }
    });
    return unsubscribe;
  }, []);

  // Handle Google Auth response
  useEffect(() => {
    if (response?.type === 'success' && response.params.id_token) {
      handleGoogleLogin(response.params.id_token);
    }
  }, [response]);

  const handleEmailLogin = async () => {
    setLoading(true);
    try {
      await emailSignIn(email, password);
      router.replace('/products');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (idToken: string) => {
    setLoading(true);
    try {
      const credential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(auth, credential);
      setUser(userCredential.user);

      // Store user data locally
      await AsyncStorage.setItem('user', JSON.stringify({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      }));

      router.replace('/products');
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





// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
// import { Stack, useRouter } from 'expo-router';
// import { auth } from '@/config/firebaseConfig';
// // import { emailSignIn, googleSignIn } from '@/services/auth';
// import { emailSignIn, googleSignIn } from '@/services/auth';
// // import googleAuth from '@react-native-firebase/auth';
// import { GoogleAuthProvider, signInWithCredential, signInWithPopup, User } from 'firebase/auth';
// import * as Google from 'expo-auth-session/providers/google';
// import * as WebBrowser from 'expo-web-browser';
// import * as AuthSession from 'expo-auth-session';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// import { makeRedirectUri } from 'expo-auth-session';

// // Complete any pending auth session
// WebBrowser.maybeCompleteAuthSession();

// export default function LoginScreen() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   // Set an initializing state whilst Firebase connects
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState<User | null>(null);

//   // // Configure Google login
//   // const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
//   //   clientId: '27659315254-umb74fcgshtoo7j5bhs88egecfe7j737.apps.googleusercontent.com',
//   //   redirectUri: 'https://auth.expo.io/@hunter47/ecommerce-store',
//   //   scopes: ['email', 'openid'],
//   // });
//   // console.log('Request:', request);
//   // console.log('Response:', response);

//   // useEffect(() => {
//   //   if (response?.type === 'success') {
//   //     const { id_token } = response.params;
//   //     const credential = GoogleAuthProvider.credential(id_token);
      
//   //     signInWithCredential(auth, credential)
//   //       .then((userCredential) => {
//   //         const user = userCredential.user;
//   //         setUser(user);
  
//   //         // Store Google user info in AsyncStorage
//   //         const userData = {
//   //           uid: user.uid,
//   //           email: user.email,
//   //           // Add any other relevant user data you want to store
//   //         };
  
//   //         // Save to AsyncStorage
//   //         ReactNativeAsyncStorage.setItem('user', JSON.stringify(userData))
//   //           .then(() => {
//   //             console.log('Google user data stored in AsyncStorage');
//   //           })
//   //           .catch((error) => {
//   //             console.error('Error storing user data:', error);
//   //           });
  
//   //         // Navigate to the next screen (e.g., products)
//   //         router.replace('/products');
//   //       })
//   //       .catch((error) => {
//   //         console.error('Login error:', error);
//   //         alert('Google sign-in failed: ' + error.message);
//   //       });
//   //   }
//   // }, [response]);



//   // ////////// Google Sign-In //////////


//   // useEffect(() => {
//   //   if (response?.type === 'success') {
//   //     const { id_token } = response.params;
//   //     const credential = GoogleAuthProvider.credential(id_token);
//   //     console.log('Google Sign-In Credential:', credential);
      
//   //     setLoading(true);
//   //     signInWithCredential(auth, credential)
//   //       .then((userCredential) => {
//   //         console.log('Google Sign-In Success:', userCredential.user);
//   //         router.replace('/products');
//   //       })
//   //       .catch((error) => {
//   //         console.error('Google Sign-In Error:', error);
//   //         alert(`Google sign-in failed: ${error.message}`);
//   //       })
//   //       .finally(() => setLoading(false));
//   //   }
//   // }, [response]);

  
//   // useEffect(() => {
//   //   if (response?.type === 'success') {
//   //     const { id_token } = response.params;
//   //     const credential = GoogleAuthProvider.credential(id_token);
//   //     console.log('Google Sign-In Credential:', credential);
      
//   //     setLoading(true);
//   //     signInWithPopup(auth, credential)
//   //       .then((userCredential) => {
//   //         console.log('Google Sign-In Success:', userCredential.user);
//   //         router.replace('/products');
//   //       })
//   //       .catch((error) => {
//   //         console.error('Google Sign-In Error:', error);
//   //         alert(`Google sign-in failed: ${error.message}`);
//   //       })
//   //       .finally(() => setLoading(false));
//   //   }
//   // }, [response]);







  

//   // GoogleSignin.configure({
//   //   // Use ANDROID client ID (from google-services.json)
//   //   webClientId: '27659315254-u7f0o7vp829ik7b9ae2fa4qbenlgars8.apps.googleusercontent.com',
//   // });

// // const googleSignIn = async (idToken: string | null) => {
// //   try {
// //     // Check if your device supports Google Play
// //   await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

// //   if (!idToken) {
// //     throw new Error('No ID token found');
// //   }

// //   // Create a Google credential with the token
// //   const googleCredential = googleAuth.GoogleAuthProvider.credential(idToken);

// //   // Sign-in the user with the credential
// //   return googleAuth().signInWithCredential(googleCredential);

// //   } catch (error) {
// //     if (isErrorWithCode(error)) {
// //       switch (error.code) {
// //         case statusCodes.IN_PROGRESS:
// //           // operation (eg. sign in) already in progress
// //           break;
// //         case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
// //           // Android only, play services not available or outdated
// //           break;
// //         default:
// //         // some other error happened
// //       }
// //     } else {
// //       // an error that's not related to google sign in occurred
// //     }
// //   }
// // };
// // function isErrorWithCode(error: unknown): error is { code: string } {
// //   return typeof error === 'object' && error !== null && 'code' in error;
// // }

// // Handle user state changes
// interface User {
//   uid: string;
//   email: string | null;
//   displayName: string | null;
//   photoURL: string | null;
// }

// function onAuthStateChanged(user: User | null) {
//   setUser(user);
//   if (initializing) setInitializing(false);
// }

// useEffect(() => {
//   const subscriber = googleAuth().onAuthStateChanged(onAuthStateChanged);
//   return subscriber; // unsubscribe on unmount
// }, []);



//   // Google auth setup
//   const [request, response, promptAsync] = useAuthRequest({
//     clientId: '27659315254-9onhkj02n95mffns72dnjpsb0pwcepf.apps.googleusercontent.com', // Web Client ID
//     redirectUri: makeRedirectUri({
//       scheme: 'com.hunter47.ecommercestore',
//       path: 'oauthredirect'
//     }),
//     // redirectUri: makeRedirectUri({
//     //   native: 'com.hunter47.ecommercestore://oauthredirect'
//     // }),
//     // responseType: 'token',
//     scopes: ['openid', 'profile', 'email'],
//   });

//   // Handle auth state changes
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(user => {
//       if (user) router.replace('/products');
//     });
//     return unsubscribe;
//   }, []);

//   // Handle Google auth response
//   useEffect(() => {
//     if (response?.type === 'success' && response.params.id_token) {
//       handleSocialLogin(response.params.id_token);
//     }
//   }, [response]);

//   const handleEmailLogin = async () => {
//     setLoading(true);
//     try {
//       await emailSignIn(email, password);
//     } catch (error: any) {
//       alert(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSocialLogin = async (idToken: string) => {
//     setLoading(true);
//     try {
//       await googleSignIn(idToken);
//     } catch (error: any) {
//       alert(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Stack.Screen options={{ headerShown: false }} />
//       <Text style={styles.title}>Welcome to eCommerce App</Text>

//       <TextInput
//         placeholder="Work Email"
//         value={email}
//         onChangeText={setEmail}
//         style={styles.input}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />

//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         style={styles.input}
//         secureTextEntry
//       />

//       <Pressable onPress={() => router.push('/auth/register')}>
//         <Text style={styles.linkText}>Don't have an account? Register</Text>
//       </Pressable>

//       <Pressable 
//         style={styles.primaryButton} 
//         onPress={handleEmailLogin}
//         disabled={loading}
//       >
//         {loading ? (
//           <ActivityIndicator color="white" />
//         ) : (
//           <Text style={styles.primaryButtonText}>Continue with Email</Text>
//         )}
//       </Pressable>

//       <Text style={styles.orText}>OR</Text>

//       <Pressable 
//         style={styles.socialButton} 
//         onPress={() => promptAsync()}
//         disabled={!request || loading}
//       >
//         {loading ? (
//           <ActivityIndicator color="black" />
//         ) : (
//           <Text style={styles.socialButtonText}>Continue with Google</Text>
//         )}
//       </Pressable>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'white' },
//   title: { fontSize: 24, fontWeight: '600', marginBottom: 40, textAlign: 'center' },
//   input: { 
//     height: 50, 
//     borderWidth: 1, 
//     borderColor: '#ddd', 
//     borderRadius: 8, 
//     paddingHorizontal: 15, 
//     marginBottom: 8, 
//     fontSize: 16 
//   },
//   primaryButton: { 
//     backgroundColor: '#007AFF', 
//     padding: 15, 
//     borderRadius: 8, 
//     alignItems: 'center', 
//     marginVertical: 7 
//   },
//   primaryButtonText: { 
//     color: 'white', 
//     fontSize: 16, 
//     fontWeight: '500' 
//   },
//   socialButton: { 
//     borderWidth: 1, 
//     borderColor: '#ddd', 
//     padding: 15, 
//     borderRadius: 8, 
//     alignItems: 'center', 
//     marginVertical: 5 
//   },
//   socialButtonText: { 
//     color: 'black', 
//     fontSize: 16, 
//     fontWeight: '500' 
//   },
//   orText: { 
//     textAlign: 'center', 
//     marginVertical: 15, 
//     color: '#666' 
//   },
//   linkText: { 
//     color: '#007AFF', 
//     textAlign: 'right', 
//     marginBottom: 10, 
//     fontSize: 14 
//   },
// });
// function googleAuth() {
//   throw new Error('Function not implemented.');
// }

