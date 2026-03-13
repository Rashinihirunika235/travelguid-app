import { ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity, Image, FlatList, Dimensions } from "react-native";
import { useState, useMemo } from "react";
import { Link } from "expo-router";
import { Search, MapPin, Heart } from "lucide-react-native";
import { districts, provinces } from "../../data/districts"; 
import { useFavorites } from "../../contexts/FavoritesContext";
import { colors } from "../../constants/colors";

const { width } = Dimensions.get("window");
const COLUMN_WIDTH = (width - 48) / 2; // Screen එකේ පළල අනුව cards බෙදා ගැනීම

const FEATURED_DISTRICTS = ["colombo", "kandy", "galle", "sigiriya", "nuwara-eliya"];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const { toggleFavorite, isFavorite } = useFavorites();

  const featuredDistricts = useMemo(() => 
    districts.filter((d) => FEATURED_DISTRICTS.includes(d.id)),
    []
  );

  const filteredDistricts = useMemo(() => {
    let result = districts;
    if (selectedProvince) {
      result = result.filter((d) => d.province === selectedProvince);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((d) => d.name.toLowerCase().includes(query));
    }
    return result;
  }, [searchQuery, selectedProvince]);

  // ප්ලෑන් එකට ගැලපෙන විදිහට Card එක නිර්මාණය කිරීම
  const DistrictCard = ({ item, isFullWidth = false }: { item: any, isFullWidth?: boolean }) => (
    <View style={[styles.card, isFullWidth ? { width: 280 } : { width: COLUMN_WIDTH }]}>
      <Link href={`/district/${item.id}`} asChild>
        <TouchableOpacity activeOpacity={0.9}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          <View style={styles.overlay} />
          <View style={styles.cardContent}>
            <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
            <View style={styles.locationRow}>
              <MapPin size={12} color="#fff" />
              <Text style={styles.provinceText} numberOfLines={1}>{item.province}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
      <TouchableOpacity
        style={styles.heartButton}
        onPress={() => toggleFavorite(item.id)}
      >
        <Heart
          size={18}
          color={isFavorite(item.id) ? "#ff4757" : "#fff"}
          fill={isFavorite(item.id) ? "#ff4757" : "transparent"}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Custom Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Travel Sri Lanka</Text>
        <Text style={styles.subtitle}>Let's explore the island</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search your destination..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Provinces Chips */}
      <View style={styles.chipSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipScroll}>
          <TouchableOpacity 
            style={[styles.chip, !selectedProvince && styles.chipActive]}
            onPress={() => setSelectedProvince(null)}
          >
            <Text style={[styles.chipText, !selectedProvince && styles.chipTextActive]}>All</Text>
          </TouchableOpacity>
          {provinces.map((p) => (
            <TouchableOpacity 
              key={p}
              style={[styles.chip, selectedProvince === p && styles.chipActive]}
              onPress={() => setSelectedProvince(p)}
            >
              <Text style={[styles.chipText, selectedProvince === p && styles.chipTextActive]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Featured Section */}
      {!searchQuery && !selectedProvince && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Destinations</Text>
          <FlatList
            data={featuredDistricts}
            renderItem={({ item }) => <DistrictCard item={item} isFullWidth={true} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>
      )}

      {/* Grid Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {searchQuery || selectedProvince ? "Search Results" : "All Districts"}
        </Text>
        <View style={styles.grid}>
          {filteredDistricts.map((district) => (
            <DistrictCard key={district.id} item={district} />
          ))}
        </View>
      </View>
      
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { backgroundColor: colors.primary || '#007AFF', padding: 25, paddingTop: 60, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 16, color: 'rgba(255,255,255,0.8)', marginTop: 5 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 20, marginTop: -25, borderRadius: 15, paddingHorizontal: 15, height: 55, elevation: 5, shadowOpacity: 0.1, shadowRadius: 10 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },
  chipSection: { marginTop: 20 },
  chipScroll: { paddingHorizontal: 20 },
  chip: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20, backgroundColor: '#fff', marginRight: 10, borderWidth: 1, borderColor: '#E9ECEF' },
  chipActive: { backgroundColor: colors.primary || '#007AFF', borderColor: colors.primary || '#007AFF' },
  chipText: { color: '#6C757D', fontWeight: '500' },
  chipTextActive: { color: '#fff' },
  section: { marginTop: 25 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginHorizontal: 20, marginBottom: 15, color: '#212529' },
  horizontalList: { paddingHorizontal: 20, gap: 15 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, justifyContent: 'space-between' },
  card: { height: 180, borderRadius: 20, overflow: 'hidden', marginBottom: 15, backgroundColor: '#fff', elevation: 3 },
  image: { width: '100%', height: '100%' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' },
  cardContent: { position: 'absolute', bottom: 12, left: 12 },
  name: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  provinceText: { color: '#fff', fontSize: 12, marginLeft: 4, opacity: 0.9 },
  heartButton: { position: 'absolute', top: 12, right: 12, backgroundColor: 'rgba(0,0,0,0.2)', padding: 6, borderRadius: 15 },
});