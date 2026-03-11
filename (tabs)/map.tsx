import React, { useState, useEffect, useRef } from 'react';
import { 
  View, StyleSheet, Text, TextInput, TouchableOpacity, 
  ActivityIndicator, Dimensions, Platform, Alert, Keyboard 
} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location'; 
import { Search, Navigation, MapPin, Clock } from 'lucide-react-native';
import { colors } from '../../constants/colors';

const { width, height } = Dimensions.get('window');

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const [origin, setOrigin] = useState<any>(null); // මම ඉන්න තැන
  const [destination, setDestination] = useState<any>(null); // යන තැන
  const [routeCoords, setRouteCoords] = useState<any[]>([]); // පාරේ ඉර (Line)
  const [distance, setDistance] = useState<string | null>(null); // දුර
  const [duration, setDuration] = useState<string | null>(null); // ගතවන කාලය
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // 🛰️ මුලින්ම ඉන්න තැන (GPS) ලබා ගැනීම
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location access is required for GPS');
        setLoading(false);
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setOrigin({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      setLoading(false);

      // Real-time tracking
      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 10 },
        (newLoc) => setOrigin({ latitude: newLoc.coords.latitude, longitude: newLoc.coords.longitude })
      );
    })();
  }, []);

  // 🗺️ OSRM හරහා පාර සහ දුර ලබාගන්නා හැටි (No API Key Required)
  const getRoute = async (destCoords: any) => {
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${destCoords.longitude},${destCoords.latitude}?overview=full&geometries=geojson`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        // 1. පාර අඳින්න ඕන Coordinates ටික ලබාගන්නවා
        const coordinates = data.routes[0].geometry.coordinates.map((coord: any) => ({
          latitude: coord[1],
          longitude: coord[0],
        }));
        setRouteCoords(coordinates);

        // 2. දුර (Distance) සහ කාලය (Duration) ලබාගන්නවා
        const distKm = (data.routes[0].distance / 1000).toFixed(2);
        const timeMin = (data.routes[0].duration / 60).toFixed(0);
        setDistance(distKm);
        setDuration(timeMin);

        // 3. සිතියම යන තැනට Fit කරනවා
        mapRef.current?.fitToCoordinates([origin, destCoords], {
          edgePadding: { top: 100, right: 50, bottom: 100, left: 50 },
          animated: true,
        });
      }
    } catch (error) {
      console.error("Routing Error:", error);
      Alert.alert("Error", "Could not calculate the route.");
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim() || !origin) return;
    try {
      setLoading(true);
      const result = await Location.geocodeAsync(searchQuery);
      if (result.length > 0) {
        const destCoords = { latitude: result[0].latitude, longitude: result[0].longitude };
        setDestination(destCoords);
        await getRoute(destCoords); // පාර හොයනවා
        Keyboard.dismiss();
      } else {
        Alert.alert("Location Not Found", "කරුණාකර නිවැරදි ස්ථානයක් ඇතුළත් කරන්න.");
      }
    } catch (e) {
      Alert.alert("Search Error", "Search failed.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !origin) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 🔍 Search & Stats Panel */}
      <View style={styles.topContainer}>
        <View style={styles.topBar}>
          <Text style={styles.logoText}>Serendib</Text>
          <View style={styles.searchContainer}>
            <TextInput 
              placeholder="Search destination..." 
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity onPress={handleSearch}><Search size={20} color={colors.primary} /></TouchableOpacity>
          </View>
        </View>

        {/* 📊 දුර පෙන්වන Card එක */}
        {distance && (
          <View style={styles.infoRow}>
            <View style={styles.statCard}>
              <MapPin size={16} color={colors.primary} />
              <Text style={styles.statText}>{distance} km</Text>
            </View>
            <View style={styles.statCard}>
              <Clock size={16} color={colors.primary} />
              <Text style={styles.statText}>{duration} mins</Text>
            </View>
          </View>
        )}
      </View>

      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={origin ? { ...origin, latitudeDelta: 0.05, longitudeDelta: 0.05 } : undefined}
      >
        {/* යන තැන ලකුණු කිරීම */}
        {destination && <Marker coordinate={destination} title="Destination" />}

        {/* 🛣️ පාර ඇඳීම (Polyline) */}
        {routeCoords.length > 0 && (
          <Polyline
            coordinates={routeCoords}
            strokeWidth={5}
            strokeColor={colors.primary} // ඇප් එකේ තද කොළ පාට
          />
        )}
      </MapView>

      <TouchableOpacity style={styles.locationBtn} onPress={() => mapRef.current?.animateToRegion(origin)}>
        <Navigation size={26} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: width, height: height },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  topContainer: { position: 'absolute', top: 50, left: 20, right: 20, zIndex: 10 },
  topBar: { backgroundColor: '#fff', padding: 12, borderRadius: 15, elevation: 5 },
  logoText: { fontSize: 16, fontWeight: 'bold', color: colors.primary, marginBottom: 8, textAlign: 'center' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 10, paddingHorizontal: 10 },
  searchInput: { flex: 1, height: 40, fontSize: 15 },
  infoRow: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 10 },
  statCard: { 
    backgroundColor: '#fff', padding: 10, borderRadius: 12, 
    flexDirection: 'row', alignItems: 'center', elevation: 3 
  },
  statText: { marginLeft: 5, fontWeight: 'bold', fontSize: 13, color: '#333' },
  locationBtn: { 
    position: 'absolute', bottom: 110, right: 20, 
    backgroundColor: colors.primary, padding: 15, borderRadius: 30, elevation: 8 
  }
});