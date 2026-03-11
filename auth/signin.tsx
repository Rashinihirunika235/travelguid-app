import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, 
  Image, KeyboardAvoidingView, Platform, ScrollView, Alert 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors } from '../../constants/colors';

// Context Import එක අමතක කරන්න එපා 👈
import { useUser } from '../../contexts/UserContext'; 

import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 👈 User Context එකෙන් setUser function එක ගන්නවා
  const { setUser } = useUser();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "557515126315-n2ne54b3v78m0m8v5q3r8p9p7p8p9p.apps.googleusercontent.com", 
    webClientId: "557515126315-63bf2dn26qhfltdainvfe1g9i97mh5b9.apps.googleusercontent.com",
    redirectUri: AuthSession.makeRedirectUri({
      scheme: 'travel-guide-app', 
      path: 'auth/signin',
    }),
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      
      // ✅ Google හරහා එන විට Profile එක Update කිරීම
      setUser({
        name: "Google User", // පසුව Google API එකෙන් නම ගත හැක
        email: email || "googleuser@gmail.com",
        profilePic: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      });
      

      router.replace('/(tabs)');
    } else if (response?.type === 'error') {
      Alert.alert("Login Error", "Google Sign-In failed.");
    }
  }, [response]);

  const handleManualSignIn = () => {
    if (email && password) {
      // ✅ මෙතැනදී තමයි නම සහ ඊමේල් එක Profile එකට යවන්නේ
      // දැනට නම විදිහට Email එකේ මුල් කොටස ගනිමු
      const userName = email.split('@')[0]; 
      
      setUser({
        name: userName.charAt(0).toUpperCase() + userName.slice(1),
        email: email,
        profilePic: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000"
      });
      
      

      router.replace('/(tabs)');
    } else {
      Alert.alert("Error", "Please enter email and password");
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        <LinearGradient colors={[colors.primary || '#1a5f3f', '#2e8b57']} style={styles.header}>
          <View style={styles.logoCircle}>
            <Image 
              source={require('../../assets/image/icon.png')} 
              style={styles.logo} 
              resizeMode="contain" 
            />
          </View>
          <Text style={styles.appName}>Serendib</Text>
          <Text style={styles.tagline}>DISCOVER SRI LANKA</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}><Text style={styles.statNum}>25</Text><Text style={styles.statLab}>Districts</Text></View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}><Text style={styles.statNum}>500+</Text><Text style={styles.statLab}>Places</Text></View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}><Text style={styles.statNum}>∞</Text><Text style={styles.statLab}>Memories</Text></View>
          </View>
        </LinearGradient>

        <View style={styles.formContainer}>
          <Text style={styles.welcomeTitle}>Welcome Back</Text>
          <Text style={styles.welcomeSub}>Sign in to continue your journey</Text>

          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <Mail size={20} color="#666" style={styles.inputIcon} />
              <TextInput 
                placeholder="Email address" 
                style={styles.input} 
                keyboardType="email-address" 
                autoCapitalize="none" 
                value={email} 
                onChangeText={setEmail} 
              />
            </View>

            <View style={styles.inputWrapper}>
              <Lock size={20} color="#666" style={styles.inputIcon} />
              <TextInput 
                placeholder="Password" 
                style={styles.input} 
                secureTextEntry={!showPassword} 
                value={password} 
                onChangeText={setPassword} 
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} color="#666" /> : <Eye size={20} color="#666" />}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={() => router.push('/auth/forgot-password')}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signInButton} onPress={handleManualSignIn}>
            <Text style={styles.signInButtonText}>Sign In</Text>
            <ArrowRight size={20} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.orText}>Or continue with</Text>

          <View style={styles.socialContainer}>
             <TouchableOpacity 
                style={styles.socialCircle} 
                onPress={() => promptAsync()} 
                disabled={!request}
              >
                <FontAwesome name="google" size={24} color="#DB4437" />
             </TouchableOpacity>
             <TouchableOpacity style={styles.socialCircle}>
                <FontAwesome name="facebook" size={24} color="#4267B2" />
             </TouchableOpacity>
             <TouchableOpacity style={styles.socialCircle}>
                <FontAwesome name="apple" size={24} color="#000" />
             </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/signup')}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { flexGrow: 1 },
  header: { paddingTop: 60, paddingBottom: 50, alignItems: 'center', borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
  logoCircle: { width: 80, height: 80, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  logo: { width: 60, height: 60 },
  appName: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginTop: 10 },
  tagline: { fontSize: 12, color: 'rgba(255,255,255,0.8)', letterSpacing: 2 },
  statsContainer: { flexDirection: 'row', marginTop: 25, width: '100%', justifyContent: 'center' },
  statItem: { alignItems: 'center', paddingHorizontal: 15 },
  statNum: { fontSize: 18, fontWeight: 'bold', color: '#FF8C00' },
  statLab: { fontSize: 10, color: '#fff' },
  statDivider: { width: 1, height: 20, backgroundColor: 'rgba(255,255,255,0.3)', alignSelf: 'center' },
  formContainer: { padding: 30, marginTop: -30, backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, flex: 1 },
  welcomeTitle: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  welcomeSub: { fontSize: 14, color: '#666', marginBottom: 25 },
  inputGroup: { marginBottom: 10, width: '100%' },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 15, paddingHorizontal: 15, marginBottom: 15, height: 55 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: '#333' },
  forgotText: { textAlign: 'right', color: '#1a5f3f', fontWeight: '600', marginBottom: 25 },
  signInButton: { backgroundColor: '#1a5f3f', borderRadius: 15, height: 55, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  signInButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginRight: 10 },
  orText: { textAlign: 'center', color: '#999', marginVertical: 20, fontSize: 12 },
  socialContainer: { flexDirection: 'row', justifyContent: 'center', gap: 20 },
  socialCircle: { width: 50, height: 50, borderRadius: 15, borderWidth: 1, borderColor: '#eee', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30, marginBottom: 20 },
  footerText: { color: '#666' },
  signUpLink: { color: '#1a5f3f', fontWeight: 'bold' }
});