import React, { useState, useEffect, useRef } from 'react';
import { 
  View, StyleSheet, Text, TextInput, TouchableOpacity, 
  ActivityIndicator, Dimensions, Alert, Keyboard 
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps'; 
import * as Location from 'expo-location'; 
import { Search, Navigation, MapPin, Clock } from 'lucide-react-native';
import { colors } from '../../constants/colors';
import { useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

export default function MapScreen() {
  const params = useLocalSearchParams(); 
  const mapRef = useRef<MapView>(null);
  
  const [origin, setOrigin] = useState<any>(null); 
  const [destination, setDestination] = useState<any>(null); 
  const [routeCoords, setRouteCoords] = useState<any[]>([]); 
  const [distance, setDistance] = useState<string | null>(null); 
  const [duration, setDuration] = useState<string | null>(null); 
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // FIX 1: isMounted flag + subscription ref for proper cleanup
    let isMounted = true;
    let locationSubscription: Location.LocationSubscription | null = null;

    (async () => {
      try {
        // 1. Request Permissions
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Location access is required to use the map.');
          if (isMounted) setLoading(false);
          return;
        }

        // 2. Get Location with Fallback
        let loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        }).catch(async () => {
          return await Location.getLastKnownPositionAsync({});
        });
        
        if (loc && isMounted) {
          const currentLoc = {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          };
          setOrigin(currentLoc);

          // 3. Handle Navigation Parameters Safely
          if (params?.destLat && params?.destLng) {
            const lat = parseFloat(Array.isArray(params.destLat) ? params.destLat[0] : params.destLat);
            const lng = parseFloat(Array.isArray(params.destLng) ? params.destLng[0] : params.destLng);
            
            if (!isNaN(lat) && !isNaN(lng)) {
              const dest = { latitude: lat, longitude: lng };
              if (isMounted) {
                setDestination(dest);
                setSearchQuery((params.destName as string) || "");
              }
              // FIX 2: setTimeout remove කරලා direct call - isMounted check 
              await getRoute(currentLoc, dest, isMounted);
            }
          }
        }
      } catch (err) {
        console.error("Map Setup Error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }

      // FIX 1: watchPositionAsync subscription save 
      if (isMounted) {
        locationSubscription = await Location.watchPositionAsync(
          { accuracy: Location.Accuracy.Balanced, distanceInterval: 15 },
          (newLoc) => {
            if (isMounted) {
              setOrigin({ 
                latitude: newLoc.coords.latitude, 
                longitude: newLoc.coords.longitude 
              });
            }
          }
        );
      }
    })();

    // FIX 1: Proper cleanup - subscription remove + isMounted false
    return () => { 
      isMounted = false;
      locationSubscription?.remove();
    };
  }, [params?.destLat, params?.destLng]);

  // FIX 2 & 3: isMounted parameter + mapRef null check
  const getRoute = async (start: any, end: any, isMounted = true) => {
    if (!start || !end) return;
    try {
      if (isMounted) setLoading(true);

      const url = `https://router.project-osrm.org/route/v1/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?overview=full&geometries=geojson`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes && data.routes.length > 0 && isMounted) {
        const coordinates = data.routes[0].geometry.coordinates.map((coord: any) => ({
          latitude: coord[1],
          longitude: coord[0],
        }));
        setRouteCoords(coordinates);
        setDistance((data.routes[0].distance / 1000).toFixed(2));
        setDuration((data.routes[0].duration / 60).toFixed(0));

        // FIX 3: mapRef null check - crash prevent
        if (mapRef.current && coordinates.length > 0) {
          mapRef.current.fitToCoordinates([start, end], {
            edgePadding: { top: 100, right: 50, bottom: 100, left: 50 },
            animated: true,
          });
        }
      }
    } catch (error) {
      console.log("Routing Error:", error);
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim() || !origin) return;
    try {
      setLoading(true);
      const result = await Location.geocodeAsync(searchQuery);
      if (result && result.length > 0) {
        const dest = { latitude: result[0].latitude, longitude: result[0].longitude };
        setDestination(dest);
        await getRoute(origin, dest);
        Keyboard.dismiss();
      } else {
        Alert.alert("Location Not Found", "Please try a more specific search term.");
      }
    } catch (e) {
      Alert.alert("Search Error", "Could not reach the geocoding service.");
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
    // FIX 4: flex:1 container + absoluteFillObject for map
    <View style={styles.container}>
      {/* Main Map Component */}
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: origin?.latitude || 7.8731, 
          longitude: origin?.longitude || 80.7718,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        }}
      >
        {destination && <Marker coordinate={destination} title={searchQuery} />}
        {routeCoords.length > 0 && (
          <Polyline 
            coordinates={routeCoords} 
            strokeWidth={5} 
            strokeColor={colors.primary} 
          />
        )}
      </MapView>

      {/* Top Search & Info UI - map  absolute */}
      <View style={styles.topContainer}>
        <View style={styles.topBar}>
          <Text style={styles.logoText}>Serendib Navigator</Text>
          <View style={styles.searchContainer}>
            <TextInput 
              placeholder="Search destination..." 
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity onPress={handleSearch}>
              <Search size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        
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

      {/* Recenter Button */}
      <TouchableOpacity 
        style={styles.locationBtn} 
        onPress={() => {
          if (origin && mapRef.current) {
            mapRef.current.animateToRegion({ 
              ...origin, 
              latitudeDelta: 0.01, 
              longitudeDelta: 0.01 
            });
          }
        }}
      >
        <Navigation size={26} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // FIX 4: flex:1 container, map absoluteFillObject
  container: { 
    flex: 1 
  },
  map: { 
    ...StyleSheet.absoluteFillObject  // ✅ Full screen, UI elements not crash 
  },
  centered: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  topContainer: { 
    position: 'absolute', 
    top: 50, 
    left: 20, 
    right: 20, 
    zIndex: 10 
  },
  topBar: { 
    backgroundColor: '#fff', 
    padding: 12, 
    borderRadius: 15, 
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  logoText: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: colors.primary, 
    marginBottom: 8, 
    textAlign: 'center' 
  },
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#f5f5f5', 
    borderRadius: 10, 
    paddingHorizontal: 10 
  },
  searchInput: { 
    flex: 1, 
    height: 40, 
    fontSize: 15 
  },
  infoRow: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    gap: 10, 
    marginTop: 10 
  },
  statCard: { 
    backgroundColor: '#fff', 
    padding: 10, 
    borderRadius: 12, 
    flexDirection: 'row', 
    alignItems: 'center', 
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statText: { 
    marginLeft: 5, 
    fontWeight: 'bold', 
    fontSize: 13, 
    color: '#333' 
  },
  locationBtn: { 
    position: 'absolute', 
    bottom: 110, 
    right: 20, 
    backgroundColor: colors.primary, 
    padding: 15, 
    borderRadius: 30, 
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
