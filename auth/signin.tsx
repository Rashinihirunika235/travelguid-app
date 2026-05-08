import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, 
  Image, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react-native';
import { router } from 'expo-router';
import { colors } from '../../constants/colors';
import { useUser } from '../../contexts/UserContext'; 

// Path updated based on your 'config' folder and 'firebase.js' file
import { auth } from '../../config/firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Input Error", "Please provide both an email address and a password.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      setUser({
        name: user.displayName || email.split('@')[0],
        // Fixed TypeScript null error using ?? operator
        email: user.email ?? "", 
        profilePic: user.photoURL || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000"
      });

      setLoading(false);
      router.replace('/(tabs)');

    } catch (error: any) {
      setLoading(false);
      let errorMessage = "An unexpected error occurred.";
      
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        errorMessage = "Incorrect credentials. Please try again.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Please enter a valid email address.";
      }

      Alert.alert("Access Denied", errorMessage);
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
                editable={!loading}
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
                editable={!loading}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} color="#666" /> : <Eye size={20} color="#666" />}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={() => router.push('/auth/forgot-password')} disabled={loading}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.signInButton, loading && { opacity: 0.8 }]} 
            onPress={handleSignIn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Text style={styles.signInButtonText}>Sign In</Text>
                <ArrowRight size={20} color="#fff" />
              </>
            )}
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/signup')} disabled={loading}>
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
  signInButton: { backgroundColor: '#1a5f3f', borderRadius: 15, height: 55, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', elevation: 5 },
  signInButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginRight: 10 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 40, marginBottom: 20 },
  footerText: { color: '#666' },
  signUpLink: { color: '#1a5f3f', fontWeight: 'bold' }
});