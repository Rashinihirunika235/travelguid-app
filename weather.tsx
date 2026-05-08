import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, ActivityIndicator, 
  Image, TouchableOpacity, Dimensions, Alert 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Wind, Droplets, Thermometer, MapPin, RefreshCw } from 'lucide-react-native';
import { districts } from '../../data/districts'; 
import { colors } from '../../constants/colors';

const { width } = Dimensions.get('window');

// 🔑 Using your provided OpenWeatherMap API Key
const API_KEY = "e68c2556113f3fc5fba830f6b97cc3f6"; 

export default function WeatherScreen() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Colombo");

  // Fetch weather data from API
  const fetchWeather = async (city: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},LK&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      
      if (data.cod === 200) {
        setWeatherData(data);
      } else {
        Alert.alert("Error", "City not found or API issue.");
      }
    } catch (error) {
      console.error("Weather Fetch Error:", error);
      Alert.alert("Network Error", "Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedCity);
  }, [selectedCity]);

  // Dynamic Background Colors: Yellow for Hot (>28°C), Blue for Cold/Rain
  const getBGColors = () : readonly [string, string, ...string[]] => {
    if (!weatherData) return ['#4facfe', '#00f2fe']; // Default Blue

    const temp = weatherData.main.temp;
    const condition = weatherData.weather[0].main.toLowerCase();

    // Priority 1: Rain/Drizzle (Dark Blue)
    if (condition.includes('rain') || condition.includes('drizzle')) {
      return ['#4b6cb7', '#182848']; 
    }

    // Priority 2: Hot Weather (> 28°C) -> Yellow/Orange Gradient
    if (temp > 28) {
      return ['#fceabb', '#f8b500']; 
    }

    // Priority 3: Cool/Cold Weather (<= 28°C) -> Light Blue/Cyan Gradient
    return ['#70e1f5', '#4facfe']; 
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Weather Forecast</Text>
        <TouchableOpacity onPress={() => fetchWeather(selectedCity)}>
          <RefreshCw size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* City Horizontal Scrollbar */}
      <View style={styles.selectorWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cityList}>
          {districts.map((district) => (
            <TouchableOpacity 
              key={district.id} 
              onPress={() => setSelectedCity(district.name)}
              style={[
                styles.cityChip, 
                selectedCity === district.name && { backgroundColor: colors.primary, borderColor: colors.primary, elevation: 5 }
              ]}
            >
              <Text style={[
                styles.cityChipText, 
                selectedCity === district.name && { color: colors.white }
              ]}>
                {district.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Syncing with sky...</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          
          {/* Weather Hero Card with Dynamic Gradient */}
          <LinearGradient 
            colors={getBGColors()} 
            style={styles.heroCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.glassOverlay}>
                <View style={styles.locationTag}>
                  <MapPin size={14} color="rgba(255,255,255,0.8)" />
                  <Text style={styles.locationText}>{weatherData?.name}, Sri Lanka</Text>
                </View>
                
                {weatherData && (
                  <>
                    <Image 
                      source={{ uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png` }}
                      style={styles.mainIcon}
                    />
                    <Text style={styles.tempMain}>{Math.round(weatherData.main.temp)}°</Text>
                    <Text style={styles.description}>{weatherData.weather[0].description}</Text>
                    
                    <View style={styles.minMaxRow}>
                        <Text style={styles.minMaxText}>High: {Math.round(weatherData.main.temp_max)}°</Text>
                        <Text style={styles.minMaxText}>Low: {Math.round(weatherData.main.temp_min)}°</Text>
                    </View>
                  </>
                )}
            </View>
          </LinearGradient>

          <Text style={styles.sectionTitle}>Sky Conditions</Text>

          {/* Detailed Stats Grid */}
          <View style={styles.infoGrid}>
            <View style={styles.infoCard}>
              <View style={[styles.iconCircle, { backgroundColor: '#e3f2fd' }]}>
                <Droplets color="#2196f3" size={20} />
              </View>
              <Text style={styles.infoValue}>{weatherData?.main?.humidity}%</Text>
              <Text style={styles.infoLabel}>Humidity</Text>
            </View>
            
            <View style={styles.infoCard}>
              <View style={[styles.iconCircle, { backgroundColor: '#e8f5e9' }]}>
                <Wind color="#4caf50" size={20} />
              </View>
              <Text style={styles.infoValue}>{weatherData?.wind?.speed} m/s</Text>
              <Text style={styles.infoLabel}>Wind</Text>
            </View>
            
            <View style={styles.infoCard}>
              <View style={[styles.iconCircle, { backgroundColor: '#fff3e0' }]}>
                <Thermometer color="#ff9800" size={20} />
              </View>
              <Text style={styles.infoValue}>{Math.round(weatherData?.main?.feels_like)}°C</Text>
              <Text style={styles.infoLabel}>Feels Like</Text>
            </View>
          </View>

        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, paddingTop: 60, paddingBottom: 10 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#1a1a1a' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 15, fontSize: 14, color: '#888', fontWeight: '500' },
  selectorWrapper: { paddingVertical: 15 },
  cityList: { paddingHorizontal: 20 },
  cityChip: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 25, backgroundColor: 'white', marginRight: 12, borderWidth: 1, borderColor: '#eee' },
  cityChipText: { fontWeight: '700', color: '#666', fontSize: 13 },
  heroCard: { margin: 20, borderRadius: 35, overflow: 'hidden', elevation: 15 },
  glassOverlay: { padding: 30, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)' },
  locationTag: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 5 },
  locationText: { color: 'white', fontSize: 14, fontWeight: '600' },
  mainIcon: { width: 140, height: 140, marginBottom: -10 },
  tempMain: { color: 'white', fontSize: 85, fontWeight: '900', letterSpacing: -2 },
  description: { color: 'white', fontSize: 18, textTransform: 'capitalize', fontWeight: '600', opacity: 0.9 },
  minMaxRow: { flexDirection: 'row', gap: 15, marginTop: 10 },
  minMaxText: { color: 'white', fontSize: 14, fontWeight: '500', opacity: 0.8 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginLeft: 25, marginTop: 10, marginBottom: 15, color: '#333' },
  infoGrid: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 },
  infoCard: { backgroundColor: 'white', width: (width - 60) / 3, paddingVertical: 20, borderRadius: 25, alignItems: 'center', elevation: 4 },
  iconCircle: { padding: 10, borderRadius: 15, marginBottom: 10 },
  infoLabel: { fontSize: 11, color: '#999', fontWeight: '600' },
  infoValue: { fontSize: 17, fontWeight: '800', color: '#333' },
});