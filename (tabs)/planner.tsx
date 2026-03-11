import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, 
  FlatList, ActivityIndicator, Image, Alert, Dimensions 
} from 'react-native';
import { Stack } from 'expo-router';
import { Search, MapPin, Star, Heart, ArrowRight, Info } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function GoLankaFinal() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // ⚠️ RapidAPI Key (පින්තූරයේ තිබුණු නිවැරදි Key එක)
  const RAPID_KEY = "1017bcec27msh4b93bae4edd4000p11cc31jsnfebcdc703731";

  const handleSearch = async () => {
    if (!query) {
      Alert.alert("Input Required", "Please enter a city name.");
      return;
    }
    
    setLoading(true);
    setResults([]);

    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': RAPID_KEY,
        'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
      }
    };

    try {
      // 1. Destination ID එක ලබාගැනීම
      const locUrl = `https://booking-com15.p.rapidapi.com/api/v1/hotels/getDestinationId?query=${encodeURIComponent(query + " Sri Lanka")}`;
      const locRes = await fetch(locUrl, options);
      const locJson = await locRes.json();

      if (locJson.status && locJson.data && locJson.data.length > 0) {
        const destId = locJson.data[0].dest_id;
        const sType = locJson.data[0].search_type || "city";

        // 2. හෝටල් ලැයිස්තුව ලබාගැනීම
        const hotelUrl = `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels?dest_id=${destId}&search_type=${sType}&arrival_date=2026-05-20&departure_date=2026-05-22&adults=1&room_qty=1&page_number=1&languagecode=en-us&currency_code=LKR`;
        
        const hotelRes = await fetch(hotelUrl, options);
        const hotelJson = await hotelRes.json();

        if (hotelJson.status && hotelJson.data && hotelJson.data.hotels) {
          setResults(hotelJson.data.hotels);
        } else {
          Alert.alert("Notice", "දැනට හෝටල් කිසිවක් සොයාගත නොහැක.");
        }
      } else {
        Alert.alert("Error", "නගරය සොයාගත නොහැක. නිවැරදි නමක් ලබා දෙන්න.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "සර්වර් සම්බන්ධතාවය බිඳ වැටුණි.");
    } finally {
      setLoading(false);
    }
  };

  const renderHotelItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.95}>
      <Image source={{ uri: item.main_photo_url }} style={styles.cardImg} />
      <LinearGradient colors={['transparent', 'rgba(0,0,0,0.85)']} style={styles.cardOverlay}>
        <View style={styles.cardInfo}>
          <Text style={styles.hotelTitle} numberOfLines={1}>{item.hotel_name}</Text>
          
          <View style={styles.locationRow}>
            <MapPin size={12} color="#FF8C00" />
            <Text style={styles.locationTxt} numberOfLines={1}>{item.address}</Text>
          </View>

          <View style={styles.priceRow}>
            <View>
               <Text style={styles.priceLabel}>Price / Night</Text>
               <Text style={styles.priceVal}>{item.price_breakdown?.gross_amount_per_night || '---'} LKR</Text>
            </View>
            <View style={styles.ratingBadge}>
               <Star size={12} color="#FFD700" fill="#FFD700" />
               <Text style={styles.ratingTxt}>{item.review_score || 'N/A'}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <Text style={styles.logo}>Go Lanka <Text style={{color: '#FF8C00'}}>PRO</Text></Text>
        <View style={styles.searchWrapper}>
          <Search size={18} color="#999" />
          <TextInput 
            style={styles.input}
            placeholder="Search Kandy, Ella, Galle..."
            placeholderTextColor="#999"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={styles.goBtn} onPress={handleSearch}>
             <ArrowRight size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#1a5f3f" />
          <Text style={styles.loadingTxt}>Discovering best stays for you...</Text>
        </View>
      ) : (
        <FlatList 
          data={results}
          renderItem={renderHotelItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
               <Info size={40} color="#ccc" />
               <Text style={styles.emptyTxt}>Start by searching a city in Sri Lanka.</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: { padding: 25, paddingTop: 60, backgroundColor: '#fff', borderBottomLeftRadius: 30, borderBottomRightRadius: 30, elevation: 5 },
  logo: { fontSize: 24, fontWeight: 'bold', color: '#1a5f3f', marginBottom: 15 },
  searchWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F2F5', borderRadius: 15, paddingHorizontal: 12 },
  input: { flex: 1, paddingVertical: 12, marginLeft: 8, fontSize: 16, color: '#333' },
  goBtn: { backgroundColor: '#1a5f3f', padding: 8, borderRadius: 10 },
  list: { padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingTxt: { marginTop: 10, color: '#666', fontStyle: 'italic' },
  card: { height: 260, borderRadius: 25, marginBottom: 20, overflow: 'hidden', elevation: 8, backgroundColor: '#000' },
  cardImg: { width: '100%', height: '100%', position: 'absolute' },
  cardOverlay: { flex: 1, justifyContent: 'flex-end' },
  cardInfo: { padding: 20 },
  hotelTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  locationTxt: { color: '#ccc', fontSize: 12, marginLeft: 5, flex: 1 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 },
  priceLabel: { color: '#aaa', fontSize: 10 },
  priceVal: { color: '#FF8C00', fontSize: 18, fontWeight: 'bold' },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12 },
  ratingTxt: { color: '#fff', fontWeight: 'bold', marginLeft: 5 },
  emptyContainer: { marginTop: 100, alignItems: 'center', opacity: 0.5 },
  emptyTxt: { marginTop: 10, color: '#666' }
});