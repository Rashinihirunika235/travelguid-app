import { useEffect, useState } from 'react';
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator } from 'react-native';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Firebase & Auth
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

// Contexts
import { LanguageProvider } from "../contexts/LanguageContext";
import { FavoritesProvider } from "../contexts/FavoritesContext";
import { OfflineProvider } from "../contexts/OfflineContext";
import { UserProvider } from "../contexts/UserContext";
import { colors } from "../constants/colors";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Firebase Auth State එක වෙනස් වෙනවද බලනවා
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (initializing) return;

    // User ලොග් වෙලා ඉන්නවා නම් කෙළින්ම Tabs වලට යවනවා
    // නැත්නම් Splash/Index එකේ නවතිනවා (එතනින් Sign In එකට යන්න පුළුවන්)
    if (user) {
      router.replace("/(tabs)");
    } else {
      // User ලොග් වෙලා නැත්නම් index එකටම යවනවා (හෝ signin එකට)
      router.replace("/"); 
    }
  }, [user, initializing]);

  // Load වෙන වෙලාවට පෙන්නන ලස්සන Loading Screen එකක්
  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background || "#F8F9FA" }}>
        <ActivityIndicator size="large" color="#1a5f3f" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <OfflineProvider>
          <FavoritesProvider>
            <UserProvider>
              
              <StatusBar style="light" />

              <Stack
                screenOptions={{
                  headerShown: false,
                  animation: "fade_from_bottom",
                  contentStyle: {
                    backgroundColor: colors.background || "#F8F9FA",
                  },
                }}
              >
                {/* Splash / Landing Screen */}
                <Stack.Screen name="index" />

                {/* Authentication */}
                <Stack.Screen
                  name="auth/signin"
                  options={{ animation: "slide_from_right" }}
                />
                <Stack.Screen
                  name="auth/signup"
                  options={{ animation: "slide_from_right" }}
                />

                {/* Main Tabs */}
                <Stack.Screen
                  name="(tabs)"
                  options={{ gestureEnabled: false }}
                />

                {/* District Detail Screen */}
                <Stack.Screen
                  name="district"
                  options={{
                    presentation: "card",
                    animation: "slide_from_right",
                  }}
                />
              </Stack>

            </UserProvider>
          </FavoritesProvider>
        </OfflineProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}