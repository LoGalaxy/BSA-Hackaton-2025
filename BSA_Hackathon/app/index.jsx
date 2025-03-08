import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable, Image, TextInput, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { Link } from 'expo-router';
import backGroundImage from "@/assets/images/back.png";
import fiverrLogo from "@/assets/images/fiver.png";

// Header Component
const Header = ({ searchText, setSearchText }) => (
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
);

// ServiceCard Component
const ServiceCard = ({ imageSource, username, rating, description, price, category }) => (
  <View style={styles.serviceCard}>
    <Image source={imageSource} style={styles.serviceImage} />
    <View style={styles.infoContainer}>
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.rating}>{rating}★</Text>
    </View>
    <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
      {description}
    </Text>
    <Text style={styles.price}>{price}</Text>
    <Text style={styles.category}>{category}</Text>
  </View>
);

// ContentSection Component
const ContentSection = ({ title, text }) => (
  <View style={styles.contentSection}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionText}>{text}</Text>
  </View>
);

// Announcements Component
const Announcements = ({ announcements = [] }) => (
  <FlatList
    data={announcements}
    renderItem={({ item }) => (
      <ServiceCard
        imageSource={item.imageSource}
        username={item.username}
        rating={item.rating}
        description={item.description}
        price={item.price}
        category={item.category}
      />
    )}
    keyExtractor={(item, index) => index.toString()}
    contentContainerStyle={styles.servicesContainer}
  />
);

// App Component
const App = ({ externalAnnouncements = [] }) => {
  const [searchText, setSearchText] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header searchText={searchText} setSearchText={setSearchText} />
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <ImageBackground source={backGroundImage} resizeMode="cover" style={styles.image}>
            <Link href="/menu" asChild>
              <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Fiver</Text>
              </Pressable>
            </Link>
            <ContentSection
              title="Welcome to Fiver"
              text="Your one-stop shop for all your digital needs."
            />
            <ContentSection
              title="About Us"
              text="Welcome to our platform. We offer a variety of services to help you achieve your goals."
            />
            <ContentSection
              title="Our Services"
              text="Explore our range of services designed to meet your needs. From design to development, we have you covered."
            />
            <ContentSection
              title="Contact Us"
              text="Have questions? Feel free to reach out to our support team."
            />
            <Announcements announcements={externalAnnouncements} />
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
    borderRadius: 20,
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
  serviceCard: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',

  },
  serviceImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 16,
    color: 'gold',
  },
  description: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  category: {
    fontSize: 14,
    color: 'gray',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 20,
  },
});
