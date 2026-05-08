import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  Settings,
  Bell,
  Shield,
  HelpCircle,
  ChevronRight,
  LogOut,
  Heart,
  MapPin,
  Star,
} from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

// Firebase & Contexts
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useUser } from "@/contexts/UserContext";

// මෙහිදී කොළ පැහැති වර්ණ (Green Colors) කෙළින්ම ලබා දී ඇත
const THEME_GREEN = {
  primary: "#1A5F3F", // තද කොළ
  secondary: "#2ED573", // ලා කොළ
  background: "#F0F5F2", // ඉතා ලා කොළ/අළු පසුබිම
  surface: "#FFFFFF",
  text: "#1A1A1A",
  textSecondary: "#707B7C",
  error: "#FF4757",
};

const SETTINGS_ITEMS = [
  { id: "settings", icon: Settings, label: "Settings" },
  { id: "notifications", icon: Bell, label: "Notifications" },
  { id: "privacy", icon: Shield, label: "Privacy & Security" },
  { id: "help", icon: HelpCircle, label: "Help & Support" },
];

export default function GoLankaProfile() {
  const router = useRouter();
  const { favorites } = useFavorites();
  const { user } = useUser();

  const handleSignOut = () => {
    // UPDATED: Notification changed
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Sign Out", 
        style: "destructive", 
        onPress: async () => {
          try {
            await signOut(auth);
            router.replace("/auth/signin");
          } catch (error) {
            // UPDATED: Error message changed to English
            Alert.alert("Error", "Could not sign out. Please try again.");
          }
        } 
      },
    ]);
  };

  if (!user) {
    return (
      <View style={profileStyles.centered}>
        <Text style={profileStyles.avatarEmoji}>🧳</Text>
        <Text style={profileStyles.guestText}>Join Go Lanka to explore!</Text>
        <TouchableOpacity 
          style={[profileStyles.loginBtn, { backgroundColor: THEME_GREEN.primary }]} 
          onPress={() => router.push('/auth/signin')}
        >
          <Text style={profileStyles.loginBtnText}>Sign In / Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={[profileStyles.screen, { backgroundColor: THEME_GREEN.background }]} edges={["top"]}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={profileStyles.header}>
          <Text style={[profileStyles.headerTitle, { color: THEME_GREEN.text }]}>Profile</Text>
          <TouchableOpacity style={profileStyles.settingsBtn}>
            <Settings size={24} color={THEME_GREEN.text} />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={profileStyles.profileCard}>
          <View style={profileStyles.avatarWrap}>
            <View style={[profileStyles.avatar, { borderColor: THEME_GREEN.primary }]}>
              <Text style={profileStyles.avatarEmoji}>🧔</Text>
            </View>
            <View style={[profileStyles.statusBadge, { borderColor: THEME_GREEN.background }]}>
              <Text style={profileStyles.statusEmoji}>🌴</Text>
            </View>
          </View>
          <Text style={profileStyles.userName}>{user.name || "Traveler"}</Text>
          <Text style={profileStyles.userEmail}>{user.email}</Text>
          <View style={[profileStyles.locationChip, { backgroundColor: `${THEME_GREEN.primary}15` }]}>
            <MapPin size={14} color={THEME_GREEN.primary} />
            <Text style={[profileStyles.locationText, { color: THEME_GREEN.primary }]}>Sri Lanka</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={profileStyles.statsRow}>
          <View style={profileStyles.statBox}>
            <View style={[profileStyles.statIcon, { backgroundColor: `${THEME_GREEN.primary}15` }]}>
              <Heart size={24} color={THEME_GREEN.primary} />
            </View>
            <Text style={profileStyles.statNum}>{favorites.length}</Text>
            <Text style={profileStyles.statLabel}>Favorites</Text>
          </View>
          
          <View style={profileStyles.statBox}>
            <View style={[profileStyles.statIcon, { backgroundColor: `${THEME_GREEN.secondary}15` }]}>
              <MapPin size={24} color={THEME_GREEN.secondary} />
            </View>
            <Text style={profileStyles.statNum}>3</Text>
            <Text style={profileStyles.statLabel}>Visited</Text>
          </View>

          <View style={profileStyles.statBox}>
            <View style={[profileStyles.statIcon, { backgroundColor: "#FFB30020" }]}>
              <Star size={24} color="#FFB300" />
            </View>
            <Text style={profileStyles.statNum}>12</Text>
            <Text style={profileStyles.statLabel}>Reviews</Text>
          </View>
        </View>

        {/* Menu Section */}
        <View style={profileStyles.section}>
          <Text style={profileStyles.sectionTitle}>Menu</Text>
          <View style={profileStyles.menuCard}>
            {SETTINGS_ITEMS.map((item, idx) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  profileStyles.menuItem,
                  idx === SETTINGS_ITEMS.length - 1 && profileStyles.menuItemLast,
                ]}
              >
                <View style={profileStyles.menuLeft}>
                  <View style={[profileStyles.menuIconBox, { backgroundColor: THEME_GREEN.background }]}>
                    <item.icon size={20} color={THEME_GREEN.primary} />
                  </View>
                  <Text style={profileStyles.menuLabel}>{item.label}</Text>
                </View>
                <ChevronRight size={20} color="#CCC" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity 
          style={profileStyles.logoutBtn} 
          onPress={handleSignOut}
        >
          <LogOut size={20} color={THEME_GREEN.error} />
          <Text style={[profileStyles.logoutText, { color: THEME_GREEN.error }]}>Sign Out</Text>
        </TouchableOpacity>

        <View style={profileStyles.bottomPad} />
      </ScrollView>
    </SafeAreaView>
  );
}

const profileStyles = StyleSheet.create({
  screen: { flex: 1 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
  headerTitle: { fontSize: 34, fontWeight: "800", letterSpacing: -0.5 },
  settingsBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#FFF", justifyContent: "center", alignItems: "center", elevation: 4 },
  profileCard: { marginHorizontal: 20, backgroundColor: "#FFF", borderRadius: 24, padding: 24, alignItems: "center", elevation: 8 },
  avatarWrap: { position: "relative", marginBottom: 16 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: "#F0F0F0", justifyContent: "center", alignItems: "center", borderWidth: 4 },
  avatarEmoji: { fontSize: 48 },
  statusBadge: { position: "absolute", bottom: 0, right: 0, width: 36, height: 36, borderRadius: 18, backgroundColor: "#FFF", justifyContent: "center", alignItems: "center", borderWidth: 3 },
  statusEmoji: { fontSize: 18 },
  userName: { fontSize: 24, fontWeight: "800", color: "#1A1A1A", marginBottom: 4 },
  userEmail: { fontSize: 15, color: "#707B7C", marginBottom: 12 },
  locationChip: { flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, gap: 6 },
  locationText: { fontSize: 14, fontWeight: "600" },
  statsRow: { flexDirection: "row", marginHorizontal: 20, marginTop: 20, gap: 12 },
  statBox: { flex: 1, backgroundColor: "#FFF", borderRadius: 20, padding: 16, alignItems: "center", elevation: 4 },
  statIcon: { width: 48, height: 48, borderRadius: 24, justifyContent: "center", alignItems: "center", marginBottom: 12 },
  statNum: { fontSize: 24, fontWeight: "800", color: "#1A1A1A", marginBottom: 4 },
  statLabel: { fontSize: 13, color: "#707B7C", fontWeight: "500" },
  section: { marginTop: 28, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 20, fontWeight: "700", color: "#1A1A1A", marginBottom: 16 },
  menuCard: { backgroundColor: "#FFF", borderRadius: 20, overflow: "hidden", elevation: 4 },
  menuItem: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: "#F0F0F0" },
  menuItemLast: { borderBottomWidth: 0 },
  menuLeft: { flexDirection: "row", alignItems: "center", gap: 14 },
  menuIconBox: { width: 40, height: 40, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  menuLabel: { fontSize: 16, fontWeight: "600", color: "#1A1A1A" },
  logoutBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginHorizontal: 20, marginTop: 28, backgroundColor: "rgba(255, 71, 87, 0.1)", paddingVertical: 16, borderRadius: 16, gap: 10 },
  logoutText: { fontSize: 16, fontWeight: "700" },
  loginBtn: { paddingHorizontal: 30, paddingVertical: 12, borderRadius: 15, marginTop: 10 },
  loginBtnText: { color: '#FFF', fontWeight: 'bold' },
  guestText: { fontSize: 18, marginBottom: 10, fontWeight: '600', color: '#333' },
  bottomPad: { height: 40 },
});
