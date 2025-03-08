import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable, Image } from 'react-native';
import { Link } from 'expo-router';
import icedCoffeeImg from "@/assets/images/icon.png";
import fiverrLogo from "@/assets/images/fiver.png"; // Assurez-vous d'avoir le logo de Fiverr dans vos assets

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={fiverrLogo} style={styles.logo} />
        <View style={styles.headerButtons}>
          <Pressable style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Sign In</Text>
          </Pressable>
          <Pressable style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Join</Text>
          </Pressable>
        </View>
      </View>
      <ImageBackground
        source={icedCoffeeImg}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.title}>Hackathon</Text>

        <Link href="/menu" style={{ marginHorizontal: 'auto' }} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Fiver</Text>
          </Pressable>
        </Link>

        <Link href="/contact" style={{ marginHorizontal: 'auto' }} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Contact Us</Text>
          </Pressable>
        </Link>

      </ImageBackground>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
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
    width: 100,
    height: 30,
    resizeMode: 'contain',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 10,
  },
  headerButtonText: {
    color: 'green', // Couleur du texte des boutons
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 10,
    marginBottom: 40,
  },
  button: {
    height: 60,
    width: 150,
    borderRadius: 20,
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
    padding: 4,
  },
});
