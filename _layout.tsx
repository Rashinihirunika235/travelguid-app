import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "../contexts/LanguageContext";
import { FavoritesProvider } from "../contexts/FavoritesContext";
import { OfflineProvider } from "../contexts/OfflineContext";
import { UserProvider } from "../contexts/UserContext";
import { colors } from "../constants/colors";

const queryClient = new QueryClient();

export default function RootLayout() {
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
                {/* Splash Screen */}
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
                  name="district/index"
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