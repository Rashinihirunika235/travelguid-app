import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, Linking, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Heart, MapPin, Clock, Download, Check, ExternalLink, Utensils, History, Car } from "lucide-react-native";
import { getDistrictById } from "../../data/districts"; // 🚀 Path corrected
import { useFavorites } from "../../contexts/FavoritesContext";
import { useOffline } from "../../contexts/OfflineContext";
import { colors } from "../../constants/colors";
import { useMemo } from "react";
import MapView, { Marker } from "react-native-maps";

const { width } = Dimensions.get("window");

export default function DistrictDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { downloadDistrict, removeDownload, isDownloaded } = useOffline();

  const district = useMemo(() => getDistrictById(id), [id]);

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

  const handleOpenMaps = () => {
    const { latitude, longitude } = district.coordinates;
    const url = Platform.select({
      ios: `maps:0,0?q=${latitude},${longitude}`,
      android: `geo:0,0?q=${latitude},${longitude}`,
    });
    if (url) {
      void Linking.openURL(url);
    }
  };

  const handleBookHotel = (hotelName: string) => {
    const query = encodeURIComponent(`${hotelName} ${district.name} Sri Lanka`);
    const url = `https://www.google.com/search?q=${query}`;
    void Linking.openURL(url);
  };

  const handleDownloadToggle = () => {
    if (isDownloaded(district.id)) {
      removeDownload(district.id);
    } else {
      downloadDistrict(district.id);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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

          {/* Interactive Map Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MapPin size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>Location</Text>
            </View>
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                scrollEnabled={false}
                zoomEnabled={false}
                initialRegion={{
                  latitude: district.coordinates.latitude,
                  longitude: district.coordinates.longitude,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
                }}
              >
                <Marker coordinate={district.coordinates} />
              </MapView>
              <TouchableOpacity style={styles.mapOverlayButton} onPress={handleOpenMaps}>
                <Text style={styles.mapButtonText}>View on Google Maps</Text>
                <ExternalLink size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Top Places Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MapPin size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>Top Attractions</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
              {district.topPlaces.map((place: any, index: number) => (
                <View key={index} style={styles.placeCard}>
                  <Image source={{ uri: place.imageUrl }} style={styles.placeImage} />
                  <View style={styles.placeContent}>
                    <Text style={styles.placeName}>{place.name}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Hotels Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Clock size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>Where to Stay</Text>
            </View>
            {district.hotels.map((hotel: any, index: number) => (
              <TouchableOpacity key={index} style={styles.hotelCard} onPress={() => handleBookHotel(hotel.name)}>
                <View style={styles.hotelHeader}>
                  <Text style={styles.hotelName}>{hotel.name}</Text>
                  <Text style={[styles.priceTag, { color: colors.primary }]}>{hotel.priceRange}</Text>
                </View>
                <Text style={styles.hotelDescription}>{hotel.description}</Text>
              </TouchableOpacity>
            ))}
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
  backButton: { position: "absolute", top: 50, left: 20, backgroundColor: "rgba(0,0,0,0.5)", padding: 10, borderRadius: 12 },
  rightButtons: { position: "absolute", top: 50, right: 20, flexDirection: 'row', gap: 10 },
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
  mapContainer: { height: 200, borderRadius: 20, overflow: 'hidden', position: 'relative' },
  map: { ...StyleSheet.absoluteFillObject },
  mapOverlayButton: { position: 'absolute', bottom: 10, alignSelf: 'center', backgroundColor: colors.primary, flexDirection: 'row', padding: 12, borderRadius: 12, gap: 8, alignItems: 'center' },
  mapButtonText: { color: '#fff', fontWeight: 'bold' },
  placeCard: { width: 160, borderRadius: 15, overflow: 'hidden', backgroundColor: '#f8f8f8' },
  placeImage: { width: '100%', height: 100 },
  placeContent: { padding: 10 },
  placeName: { fontSize: 14, fontWeight: 'bold', textAlign: 'center' },
  hotelCard: { backgroundColor: '#f9f9f9', padding: 15, borderRadius: 15, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: colors.primary },
  hotelHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  hotelName: { fontSize: 16, fontWeight: 'bold' },
  priceTag: { fontSize: 14, fontWeight: 'bold' },
  hotelDescription: { fontSize: 14, color: '#666' },
  infoText: { fontSize: 15, color: '#555', lineHeight: 22 },
  foodGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  foodChip: { backgroundColor: '#f0f0f0', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  foodText: { fontSize: 14, color: '#333', fontWeight: '500' },
});
