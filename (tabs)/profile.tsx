import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Mail, 
  Heart, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Bell, 
  ShieldCheck, 
  Globe 
} from 'lucide-react-native';
import { colors } from '../../constants/colors';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useUser } from '../../contexts/UserContext'; // 👈 වැදගත්

export default function ProfileScreen() {
  const router = useRouter();
  const { favorites } = useFavorites();
  const { language, setLanguage } = useLanguage();
  const { user, setUser } = useUser(); // 👈 Context එකෙන් දත්ත ගන්නවා

  const handleLogout = () => {
    setUser(null); // Logout වෙනවිට දත්ත Clear කරයි
    router.replace('/auth/signin');
  };

  // User ලොග් වී නැතිනම් පෙන්වන UI එක
  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.userName}>Please Sign In</Text>
        <TouchableOpacity 
          style={[styles.loginBtn, {marginTop: 20}]} 
          onPress={() => router.replace('/auth/signin')}
        >
          <Text style={{color: '#fff', fontWeight: 'bold'}}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* User Info Card - 🚀 Auto Update වන කොටස */}
      <View style={styles.profileCard}>
        <Image 
          source={{ uri: user.profilePic || "https://images.unsplash.com/photo-1633332755192-727a05c4013d" }} 
          style={styles.avatar} 
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <View style={styles.emailRow}>
            <Mail size={14} color={colors.textLight} />
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editBtn}>
          <Settings size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{favorites.length}</Text>
          <Text style={styles.statLabel}>Favorites</Text>
        </View>
        <View style={[styles.statBox, styles.statBorder]}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Places Visited</Text>
        </View>
      </View>

      {/* Settings Menu */}
      <View style={styles.menuSection}>
        <Text style={styles.menuTitle}>Account Settings</Text>
        
        <MenuOption 
          icon={<Heart size={22} color="#ff4757" />} 
          title="My Favorites" 
          onPress={() => router.push('/(tabs)/favorites')} 
        />
        
        <MenuOption 
          icon={<Bell size={22} color="#ffa502" />} 
          title="Notifications" 
          onPress={() => {}} 
        />

        <View style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <Globe size={22} color={colors.primary} />
            <Text style={styles.menuText}>Language ({language.toUpperCase()})</Text>
          </View>
          <TouchableOpacity 
            onPress={() => setLanguage(language === 'en' ? 'si' : 'en')}
            style={styles.langToggle}
          >
            <Text style={styles.langText}>{language === 'en' ? 'සිංහල' : 'English'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.menuTitle}>Support & Legal</Text>
        <MenuOption icon={<ShieldCheck size={22} color="#2ed573" />} title="Privacy Policy" onPress={() => {}} />
        
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <LogOut size={22} color="#ff4757" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.versionText}>Serendib v1.0.0</Text>
    </ScrollView>
  );
}

const MenuOption = ({ icon, title, onPress }: any) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuLeft}>
      {icon}
      <Text style={styles.menuText}>{title}</Text>
    </View>
    <ChevronRight size={20} color={colors.textLight} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { padding: 20, paddingTop: 60, backgroundColor: colors.white },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: colors.text },
  profileCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white,
    margin: 20, padding: 20, borderRadius: 20, elevation: 4,
  },
  avatar: { width: 70, height: 70, borderRadius: 35 },
  userInfo: { flex: 1, marginLeft: 15 },
  userName: { fontSize: 18, fontWeight: 'bold', color: colors.text },
  emailRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 },
  userEmail: { fontSize: 14, color: colors.textLight },
  editBtn: { padding: 10, backgroundColor: colors.background, borderRadius: 12 },
  statsContainer: {
    flexDirection: 'row', backgroundColor: colors.white,
    marginHorizontal: 20, borderRadius: 15, padding: 15,
  },
  statBox: { flex: 1, alignItems: 'center' },
  statBorder: { borderLeftWidth: 1, borderLeftColor: colors.border },
  statNumber: { fontSize: 20, fontWeight: 'bold', color: colors.primary },
  statLabel: { fontSize: 12, color: colors.textLight, marginTop: 4 },
  menuSection: { marginTop: 25, paddingHorizontal: 20 },
  menuTitle: { fontSize: 14, fontWeight: 'bold', color: colors.textLight, marginBottom: 10, textTransform: 'uppercase' },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: colors.white, padding: 15, borderRadius: 12, marginBottom: 8,
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuText: { fontSize: 16, color: colors.text, fontWeight: '500' },
  langToggle: { backgroundColor: colors.primary + '15', padding: 6, borderRadius: 8 },
  langText: { color: colors.primary, fontWeight: 'bold', fontSize: 12 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 15, marginTop: 10 },
  logoutText: { color: '#ff4757', fontSize: 16, fontWeight: 'bold' },
  versionText: { textAlign: 'center', color: colors.textMuted, fontSize: 12, marginVertical: 30 },
  loginBtn: { backgroundColor: colors.primary, padding: 15, borderRadius: 10 },
});