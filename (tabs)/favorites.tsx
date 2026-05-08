import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Heart, MapPin, ChevronRight } from 'lucide-react-native';
import { useFavorites } from '../../contexts/FavoritesContext'; // Context correct
import { districts } from '../../data/districts'; //data file
import { colors } from '../../constants/colors';

const { width } = Dimensions.get('window');

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, toggleFavorite } = useFavorites();

  // get complete district details related to favorites id here
  const favoriteDistricts = useMemo(() => {
    return districts.filter(d => favorites.includes(d.id));
  }, [favorites]);

  const renderFavoriteItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => router.push(`/district/${item.id}`)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{item.name}</Text>
          <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
            <Heart size={20} color="#ff4757" fill="#ff4757" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.locationRow}>
          <MapPin size={14} color="#666" />
          <Text style={styles.province}>{item.province} Province</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.exploreText}>View Details</Text>
          <ChevronRight size={16} color={colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Favorites</Text>
        <Text style={styles.subtitle}>Places you've loved</Text>
      </View>

      {favoriteDistricts.length > 0 ? (
        <FlatList
          data={favoriteDistricts}
          keyExtractor={(item) => item.id}
          renderItem={renderFavoriteItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Heart size={60} color="#ddd" />
          <Text style={styles.emptyText}>No favorites yet!</Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.browseButtonText}>Browse Places</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { padding: 25, paddingTop: 60, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 16, color: '#666', marginTop: 5 },
  listContainer: { padding: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    flexDirection: 'row',
  },
  image: { width: 100, height: 120 },
  content: { flex: 1, padding: 12, justifyContent: 'space-between' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  province: { fontSize: 14, color: '#666' },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 10 },
  exploreText: { fontSize: 14, color: colors.primary, fontWeight: '600', marginRight: 4 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyText: { fontSize: 18, color: '#999', marginTop: 15, marginBottom: 20 },
  browseButton: { backgroundColor: colors.primary, paddingHorizontal: 25, paddingVertical: 12, borderRadius: 25 },
  browseButtonText: { color: '#fff', fontWeight: 'bold' },
});