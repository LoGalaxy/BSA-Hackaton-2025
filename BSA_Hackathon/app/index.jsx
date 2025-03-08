import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable, Image, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';
import backGroundImage from "@/assets/images/back.png";
import fiverrLogo from "@/assets/images/fiver.png"; // Assurez-vous d'avoir le logo de Fiverr dans vos assets

const App = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={fiverrLogo} style={styles.logo} />
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search..."
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <Link href="/becomeSeller" asChild>
            <Text style={styles.headerButtonText}>Become a seller</Text>
          </Link>
          <View style={styles.headerButtons}>
            <Link href="/signIn" asChild>
              <Pressable style={styles.headerButton}>
                <Text style={styles.headerButtonText}>Sign Up</Text>
              </Pressable>
            </Link>
            <Link href="/logIn" asChild>
              <Pressable style={styles.headerButton}>
                <Text style={styles.headerButtonText}>Log In</Text>
              </Pressable>
            </Link>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <ImageBackground source={backGroundImage} resizeMode="cover" style={styles.image}>
            <Link href="/menu" asChild>
              <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Fiver</Text>
              </Pressable>
            </Link>
            <View style={styles.contentSection}>
              <Text style={styles.sectionTitle}>About Us</Text>
              <Text style={styles.sectionText}>Welcome to our platform. We offer a variety of services to help you achieve your goals.</Text>
            </View>
            <View style={styles.contentSection}>
              <Text style={styles.sectionTitle}>Our Services</Text>
              <Text style={styles.sectionText}>Explore our range of services designed to meet your needs. From design to development, we have you covered.</Text>
            </View>
            <View style={styles.contentSection}>
              <Link href="/contact" asChild>
                <Text style={styles.sectionTitle}>Contact Us</Text>
              </Link>
              <Text style={styles.sectionText}>Have questions? Feel free to reach out to our support team.</Text>
            </View>
          </ImageBackground>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 10,
  },
  headerButtonText: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  image: {
    width: '100%',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  button: {
    height: 50,
    width: 140,
    borderRadius: 25,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    padding: 6,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentSection: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    width: '85%',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: 'gray',
  },
});
