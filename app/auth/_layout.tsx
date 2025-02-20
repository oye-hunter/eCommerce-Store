// import React from "react";
// // import HomeScreen from "./index";
// import { Stack } from "expo-router";

// export default function RootLayout() {
//     return (
//         <Stack>
//             <Stack.Screen name="login" />
//             <Stack.Screen name="register"/>
//         </Stack>
//     )
// }

import { Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
