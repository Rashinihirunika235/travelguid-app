import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Heart, MapPin, Download, Check, Utensils, History, Navigation } from "lucide-react-native";
import { getDistrictById } from "../../data/districts"; 
import { useFavorites } from "../../contexts/FavoritesContext";
import { useOffline } from "../../contexts/OfflineContext";
import { colors } from "../../constants/colors";
import { useMemo, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";

interface Place {
  name: string;
  description: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
}

const { width } = Dimensions.get("window");
const DEFAULT_COORDS = { latitude: 7.8731, longitude: 80.7718 };

export default function DistrictDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const mapRef = useRef<MapView>(null);
  
  const { toggleFavorite, isFavorite } = useFavorites();
  const { downloadDistrict, removeDownload, isDownloaded } = useOffline();

  const district = useMemo(() => getDistrictById(id), [id]);

  // FIX 1: useState hook එක district null check කලින් call කරන්න
  // කලින්: district null නම් hook order break වෙලා crash
  // දැන්: hooks සෑම විටම same order එකට call වෙනවා
  const [activeCoords, setActiveCoords] = useState<{ latitude: number; longitude: number } | null>(null);

  // Early return 
  if (!district) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>District not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.errorBackText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // FIX 2: handleOpenMapTap — camelCase නිවැරදි කළා
  const handleOpenMapTap = (place: Place) => {
    router.push({
      pathname: "/(tabs)/map",
      params: {
        destLat: place.latitude,
        destLng: place.longitude,
        destName: place.name,
      },
    });
  };

  const handlePlacePress = (place: Place) => {
    const targetCoords = {
      latitude: place.latitude,
      longitude: place.longitude,
    };
    setActiveCoords(targetCoords);
    
    mapRef.current?.animateToRegion({
      ...targetCoords,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    }, 1000);
  };

  const handleDownloadToggle = () => {
    if (isDownloaded(district.id)) {
      removeDownload(district.id);
    } else {
      downloadDistrict(district.id);
    }
  };

  // FIX 3: coordinates null check — safe fallback
  const districtCoords = district?.coordinates ?? DEFAULT_COORDS;
  const markerCoords = activeCoords ?? districtCoords;

  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        // FIX 4: MapView scroll conflict — scrollEnabled false map area එකෙන් පිටත
        nestedScrollEnabled={true}
      >
        {/* Hero Header Section */}
        <View style={styles.headerImageContainer}>
          <Image source={{ uri: district.imageUrl }} style={styles.headerImage} />
          <View style={styles.overlay} />

          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>

          <View style={styles.rightButtons}>
            <TouchableOpacity style={styles.iconButton} onPress={handleDownloadToggle}>
              {isDownloaded(district.id) ? (
                <Check size={22} color="#2ecc71" />
              ) : (
                <Download size={22} color="#fff" />
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton} onPress={() => toggleFavorite(district.id)}>
              <Heart
                size={22}
                color={isFavorite(district.id) ? "#ff4757" : "#fff"}
                fill={isFavorite(district.id) ? "#ff4757" : "transparent"}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.headerContent}>
            <Text style={styles.name}>{district.name}</Text>
            <View style={styles.locationRow}>
              <MapPin size={16} color="#fff" />
              <Text style={styles.province}>{district.province} Province</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.description}>{district.description}</Text>

          {/* Location & Navigation Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MapPin size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>Location & Navigation</Text>
            </View>
            <View style={styles.mapContainer}>
              <MapView
                ref={mapRef}
                style={styles.map}
                scrollEnabled={true}
                zoomEnabled={true}
                initialRegion={{
                  ...districtCoords,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
                }}
              >
                {/* FIX 3: safe coords use */}
                <Marker coordinate={markerCoords} title={district.name} />
              </MapView>
              
              <TouchableOpacity 
                style={styles.mapOverlayButton} 
                onPress={() => handleOpenMapTap({ 
                  name: district.name, 
                  latitude: districtCoords.latitude,
                  longitude: districtCoords.longitude,
                  description: "", 
                  imageUrl: "" 
                })}
              >
                <Navigation size={18} color="#fff" />
                <Text style={styles.mapButtonText}>Get Directions</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Top Attractions Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MapPin size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>Top Attractions</Text>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={{ gap: 12 }}
            >
              {district.topPlaces.map((place: Place, index: number) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.placeCard}
                  onPress={() => handleOpenMapTap(place)}
                  onLongPress={() => handlePlacePress(place)}
                > 
                  <Image source={{ uri: place.imageUrl }} style={styles.placeImage} />
                  <View style={styles.placeOverlay} />
                  <View style={styles.placeContent}>
                    <Text style={styles.placeName}>{place.name}</Text>
                    <Text style={styles.tapToView}>Tap for Route · Hold to Preview</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* History Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <History size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>Historical Significance</Text>
            </View>
            <Text style={styles.infoText}>{district.historicalSignificance}</Text>
          </View>

          {/* Food Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Utensils size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>Must Try Food</Text>
            </View>
            <View style={styles.foodGrid}>
              {district.mustTryFood.map((food: string, index: number) => (
                <View key={index} style={styles.foodChip}>
                  <Text style={styles.foodText}>{food}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  errorContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  errorText: { fontSize: 18, color: 'red', marginBottom: 10 },
  errorBackText: { color: colors.primary, fontWeight: 'bold' },
  headerImageContainer: { height: 350, position: "relative" },
  headerImage: { width: "100%", height: "100%" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.3)" },
  backButton: { position: "absolute", top: 50, left: 20, backgroundColor: "rgba(0,0,0,0.5)", padding: 10, borderRadius: 12, zIndex: 10 },
  rightButtons: { position: "absolute", top: 50, right: 20, flexDirection: 'row', gap: 10, zIndex: 10 },
  iconButton: { backgroundColor: "rgba(0,0,0,0.5)", padding: 10, borderRadius: 12 },
  headerContent: { position: "absolute", bottom: 25, left: 20 },
  name: { fontSize: 34, fontWeight: "bold", color: "#fff" },
  locationRow: { flexDirection: "row", alignItems: "center", marginTop: 5, gap: 5 },
  province: { fontSize: 16, color: "#fff", opacity: 0.9 },
  content: { padding: 20 },
  description: { fontSize: 16, color: '#444', lineHeight: 24, marginBottom: 25 },
  section: { marginBottom: 30 },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 15 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", color: '#333' },
  mapContainer: { height: 250, borderRadius: 20, overflow: 'hidden', position: 'relative' },
  map: { ...StyleSheet.absoluteFillObject },
  mapOverlayButton: { 
    position: 'absolute', 
    bottom: 15, 
    alignSelf: 'center', 
    backgroundColor: colors.primary, 
    flexDirection: 'row', 
    paddingHorizontal: 20, 
    paddingVertical: 12, 
    borderRadius: 25, 
    gap: 8, 
    alignItems: 'center',
    elevation: 5
  },
  mapButtonText: { color: '#fff', fontWeight: 'bold' },
  placeCard: { width: 160, height: 120, borderRadius: 15, overflow: 'hidden', marginRight: 12 },
  placeImage: { width: '100%', height: '100%', position: 'absolute' },
  placeOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' },
  placeContent: { flex: 1, justifyContent: 'flex-end', padding: 10 },
  placeName: { fontSize: 14, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  tapToView: { fontSize: 10, color: '#eee', textAlign: 'center', marginTop: 2 },
  infoText: { fontSize: 15, color: '#555', lineHeight: 22 },
  foodGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  foodChip: { backgroundColor: '#f0f0f0', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  foodText: { fontSize: 14, color: '#333', fontWeight: '500' },
});