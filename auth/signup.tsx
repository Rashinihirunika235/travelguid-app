import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { colors } from '../../constants/colors';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.primary} />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join with Serendib to explore the beauty of Sri Lanka</Text>

          {/* Input Section */}
          <View style={styles.inputGroup}>
            
            {/* Full Name */}
            <View style={styles.inputWrapper}>
              <User size={20} color="#666" style={styles.icon} />
              <TextInput 
                placeholder="Full Name" 
                style={styles.input} 
                autoCapitalize="words"
              />
            </View>

            {/* Email */}
            <View style={styles.inputWrapper}>
              <Mail size={20} color="#666" style={styles.icon} />
              <TextInput 
                placeholder="Email Address" 
                style={styles.input} 
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password */}
            <View style={styles.inputWrapper}>
              <Lock size={20} color="#666" style={styles.icon} />
              <TextInput 
                placeholder="Password" 
                style={styles.input} 
                secureTextEntry={!showPassword} 
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} color="#666" /> : <Eye size={20} color="#666" />}
              </TouchableOpacity>
            </View>

          </View>

          {/* Sign Up Button */}
          <TouchableOpacity style={styles.button} onPress={() => router.replace('/(tabs)')}>
            <LinearGradient 
              colors={['#1a5f3f', '#2e8b57']} 
              style={styles.gradientBtn}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/signin')}>
              <Text style={styles.link}>Sign In</Text>
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
  backButton: { marginTop: 50, marginLeft: 20, width: 40, height: 40, justifyContent: 'center' },
  content: { padding: 30 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 30, marginTop: 10 },
  inputGroup: { marginBottom: 20 },
  inputWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#f5f5f5', 
    borderRadius: 15, 
    paddingHorizontal: 15, 
    marginBottom: 15, 
    height: 55 
  },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: '#333' },
  button: { marginTop: 10, borderRadius: 15, overflow: 'hidden' },
  gradientBtn: { height: 55, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30, marginBottom: 20 },
  footerText: { color: '#666' },
  link: { color: '#1a5f3f', fontWeight: 'bold' }
});