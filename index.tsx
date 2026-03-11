import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { MapPin } from "lucide-react-native";
import { colors } from "../constants/colors";

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // සරල Animation එකක් (අවශ්‍ය නම් පමණක් පාවිච්චි කරන්න)
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // ✅ තත්පර 3ක් පෙන්වා ස්වයංක්‍රීයව Sign In පිටුවට මාරු වේ
    const timer = setTimeout(() => {
      router.replace("/auth/signin");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient 
        colors={[colors.primary || "#1a5f3f", "#2e8b57"]} 
        style={styles.gradient}
      >
        <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
          <View style={styles.logoCircle}>
            <MapPin size={50} color="#fff" />
          </View>
          <Text style={styles.title}>Serendib</Text>
          <Text style={styles.subtitle}>DISCOVER SRI LANKA</Text>
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  gradient: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  title: { 
    fontSize: 42, 
    fontWeight: "bold", 
    color: "#fff",
    letterSpacing: 1
  },
  subtitle: { 
    fontSize: 14, 
    color: "rgba(255,255,255,0.8)", 
    marginTop: 10, 
    letterSpacing: 3,
    fontWeight: '500'
  },
});