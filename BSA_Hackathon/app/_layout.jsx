import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Appearance } from 'react-native';

import { Colors } from '@/constants/Colors';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = Appearance.getColorScheme()

  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: theme.headerBackground }, headerTintColor: theme.text, headerShadowVisible: false }}>
      <Stack.Screen name="index" options={{ headerShown: false, title: 'Home' }} />
      <Stack.Screen name="menu" options={{ headerShown: true, title: 'Menu', headerTitle: 'Fiver Menu' }} />
      <Stack.Screen name="signIn" options={{ headerShown: true, title: 'signIn', headerTitle: 'Fiver Sign' }} />
      <Stack.Screen name="contactus" options={{ headerShown: true, title: 'Contact', headerTitle: 'Contact Us' }} />
      <Stack.Screen name="aboutus" options={{ headerShown: true, title: 'About', headerTitle: 'About Us' }} />
      <Stack.Screen name="security" options={{ headerShown: true, title: 'Security', headerTitle: 'Security' }} />
      <Stack.Screen name="privacypolicy" options={{ headerShown: true, title: 'Privacy', headerTitle: 'Privacy Policy' }} />
      <Stack.Screen name="termsofservice" options={{ headerShown: true, title: 'Terms', headerTitle: 'Terms of Service' }} />
      <Stack.Screen name="+not-found" options={{ headerShown: false }} />
    </Stack>
  );
}