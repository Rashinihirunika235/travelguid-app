import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  Dimensions,
  Alert, // Alert එකතු කළා
} from "react-native";
import { Link, router } from "expo-router";
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Check, MapPin } from "lucide-react-native";
import { colors } from "@/constants/colors";
import { useLanguage } from "@/contexts/LanguageContext";

// Firebase Imports
import { auth, db } from "@/config/firebase"; 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const { height } = Dimensions.get("window");

export default function RegisterScreen() {
  useLanguage();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
      Animated.spring(logoScale, { toValue: 1, friction: 8, tension: 40, useNativeDriver: true }),
    ]).start();
  }, [fadeAnim, logoScale, slideAnim]);

  const passwordsMatch = password === confirmPassword && password.length > 0;
  const isFormValid = fullName && email && password.length >= 6 && passwordsMatch && agreedToTerms;

  // ✅ Firebase Registration Logic
  const handleRegister = async () => {
    if (!isFormValid) return;
    
    setIsLoading(true);
    try {
      // 1. Firebase Auth හරහා user කෙනෙක් හදනවා
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. User ගේ Display Name එක update කරනවා
      await updateProfile(user, { displayName: fullName });

      // 3. Firestore එකේ "users" collection එකේ data save කරනවා
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: fullName,
        email: email,
        createdAt: new Date().toISOString(),
        location: "Sri Lanka"
      });

      // සාර්ථක නම් Tabs වලට යනවා (Layout redirect එක හරහා)
    } catch (error: any) {
      let errorMessage = "Registration failed. Please try again.";
      if (error.code === 'auth/email-already-in-use') errorMessage = "This email is already registered.";
      if (error.code === 'auth/invalid-email') errorMessage = "Invalid email format.";
      
      Alert.alert("Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        
        {/* Background Pattern */}
        <View style={styles.backgroundPattern}>
          <View style={styles.circle1} />
          <View style={styles.circle2} />
        </View>

        {/* Header Section */}
        <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.logoIcon}>
            <MapPin size={32} color={colors.white} />
          </View>
          <Text style={styles.appName}>Serendib</Text>
          <Text style={styles.appTagline}>Discover Sri Lanka</Text>
        </Animated.View>

        {/* Form Section */}
        <Animated.View style={[styles.formContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.welcomeText}>Create Account</Text>
          <Text style={styles.subtitleText}>Join us to explore Sri Lanka</Text>

          {/* Full Name */}
          <Text style={styles.inputLabel}>Full Name</Text>
          <View style={styles.inputContainer}>
            <User size={20} color={colors.textMuted} style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="Full name" value={fullName} onChangeText={setFullName} autoCapitalize="words" />
          </View>

          {/* Email */}
          <Text style={styles.inputLabel}>Email Address</Text>
          <View style={styles.inputContainer}>
            <Mail size={20} color={colors.textMuted} style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="Email address" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          </View>

          {/* Password */}
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputContainer}>
            <Lock size={20} color={colors.textMuted} style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="Password (min 6)" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} color={colors.textMuted} /> : <Eye size={20} color={colors.textMuted} />}
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <View style={[styles.inputContainer, confirmPassword.length > 0 && !passwordsMatch && styles.inputError]}>
            <Lock size={20} color={colors.textMuted} style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="Confirm password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={!showConfirmPassword} />
            {confirmPassword.length > 0 && passwordsMatch && <Check size={20} color={colors.success} style={styles.checkIcon} />}
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <EyeOff size={20} color={colors.textMuted} /> : <Eye size={20} color={colors.textMuted} />}
            </TouchableOpacity>
          </View>

          {/* Terms */}
          <TouchableOpacity style={styles.termsContainer} onPress={() => setAgreedToTerms(!agreedToTerms)}>
            <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
              {agreedToTerms && <Check size={14} color={colors.white} />}
            </View>
            <Text style={styles.termsText}>I agree to the <Text style={styles.termsLink}>Terms</Text> & <Text style={styles.termsLink}>Privacy Policy</Text></Text>
          </TouchableOpacity>

          {/* Register Button */}
          <TouchableOpacity
            style={[styles.registerButton, (!isFormValid || isLoading) && styles.registerButtonDisabled]}
            onPress={handleRegister}
            disabled={!isFormValid || isLoading}
          >
            <Text style={styles.registerButtonText}>{isLoading ? "Creating Account..." : "Create Account"}</Text>
            {!isLoading && <ArrowRight size={20} color={colors.white} style={styles.arrowIcon} />}
          </TouchableOpacity>
        </Animated.View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Link href="/auth/signin" asChild>
            <TouchableOpacity><Text style={styles.signInText}>Sign In</Text></TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 40, paddingBottom: 40 },
  backgroundPattern: { position: "absolute", top: 0, left: 0, right: 0, height: height * 0.4 },
  circle1: { position: "absolute", width: 300, height: 300, borderRadius: 150, backgroundColor: colors.primary, opacity: 0.05, top: -100, right: -80 },
  circle2: { position: "absolute", width: 200, height: 200, borderRadius: 100, backgroundColor: colors.accent, opacity: 0.08, top: 100, left: -60 },
  header: { alignItems: "center", marginBottom: 30 },
  logoIcon: { width: 64, height: 64, borderRadius: 18, backgroundColor: colors.primary, justifyContent: "center", alignItems: "center", marginBottom: 12 },
  appName: { fontSize: 28, fontWeight: "bold", color: colors.primary },
  appTagline: { fontSize: 13, color: colors.textMuted, marginTop: 2, letterSpacing: 1 },
  formContainer: { backgroundColor: colors.white, borderRadius: 24, padding: 24, elevation: 4 },
  welcomeText: { fontSize: 22, fontWeight: "bold", color: colors.text, marginBottom: 6 },
  subtitleText: { fontSize: 14, color: colors.textMuted, marginBottom: 20 },
  inputLabel: { fontSize: 14, fontWeight: "600", color: colors.text, marginBottom: 6, marginLeft: 2 },
  inputContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#F9FAFB", borderRadius: 12, marginBottom: 16, paddingHorizontal: 16, height: 54, borderWidth: 1, borderColor: colors.border },
  inputError: { borderColor: colors.error },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 15, color: colors.text },
  checkIcon: { marginRight: 8 },
  termsContainer: { flexDirection: "row", alignItems: "center", marginBottom: 24 },
  checkbox: { width: 20, height: 20, borderRadius: 6, borderWidth: 2, borderColor: colors.border, marginRight: 10, justifyContent: "center", alignItems: "center" },
  checkboxChecked: { backgroundColor: colors.primary, borderColor: colors.primary },
  termsText: { fontSize: 13, color: colors.textLight },
  termsLink: { color: colors.primary, fontWeight: "700" },
  registerButton: { backgroundColor: colors.primary, height: 56, borderRadius: 14, flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 10 },
  registerButtonDisabled: { opacity: 0.6 },
  registerButtonText: { color: colors.white, fontSize: 16, fontWeight: "bold" },
  arrowIcon: { marginLeft: 8 },
  footer: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 30 },
  footerText: { fontSize: 14, color: colors.textMuted },
  signInText: { fontSize: 14, color: colors.primary, fontWeight: "bold" },
});
