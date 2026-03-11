import { Tabs } from 'expo-router';
import { Home, Heart, Map, User, Bell } from 'lucide-react-native'; // 👈 Map icon එක මෙතැන තියෙනවද බලන්න
import { colors } from '../../constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#8e8e93',
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 10,
          height: 60,
          paddingBottom: 10,
          backgroundColor: '#ffffff',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />

      {/* 🗺️ මෙන්න මේ Map පේජ් එකේ නම (map) සහ icon එක පරීක්ෂා කරන්න */}
      <Tabs.Screen
        name="map" // 👈 ඔයාගේ file එකේ නම map.tsx නම් මෙතැන "map" විය යුතුයි
        options={{
          title: 'Map',
          tabBarIcon: ({ color, size }) => <Map size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}