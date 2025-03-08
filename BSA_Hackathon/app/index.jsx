import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable, Image, TextInput, ScrollView, SafeAreaView, FlatList, Linking } from 'react-native';
import { Link } from 'expo-router';
import facebookLogo from "@/assets/images/facebook.png";
import twitterLogo from "@/assets/images/twitter.png";
import instagramLogo from "@/assets/images/instagram.png";
import linkedinLogo from "@/assets/images/linkedin.png";
import fiverrLogo from "@/assets/images/fiver.png";
import backGroundImage from "@/assets/images/back.png";

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
      <HeaderButton href="/signIn" text="Sign Up" />
      <HeaderButton href="/logIn" text="Log In" />
    </View>
  </View>
);

// HeaderButton Component
const HeaderButton = ({ href, text }) => (
  <Link href={href} asChild>
    <Pressable style={styles.headerButton}>
      <Text style={styles.headerButtonText}>{text}</Text>
    </Pressable>
  </Link>
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
const ContentSection = ({ title, text, link }) => (
  <View style={styles.contentSection}>
    <View style={styles.contentSectionInner}>
      {link ? (
        <Pressable onPress={() => Linking.openURL(link)}>
          <Text style={styles.sectionTitle}>{title}</Text>
        </Pressable>
      ) : (
        <Text style={styles.sectionTitle}>{title}</Text>
      )}
      <Text style={styles.sectionText}>{text}</Text>
    </View>
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
    keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
    contentContainerStyle={styles.servicesContainer}
  />
);

// SideBlockContainer Component
const SideBlockContainer = ({ title, items, isSocial }) => {
  const socialIcons = {
    Facebook: facebookLogo,
    Twitter: twitterLogo,
    Instagram: instagramLogo,
    LinkedIn: linkedinLogo,
  };

  const socialColors = {
    Facebook: '#1877F2',
    Twitter: '#1DA1F2',
    Instagram: '#E4405F',
    LinkedIn: '#0A66C2',
  };

  return (
    <View style={styles.sideBlockContainer}>
      <Text style={styles.blockTitle}>{title}</Text>
      <View style={styles.blockGrid}>
        {items.map((item, index) => (
          <Pressable
            key={index}
            style={[
              styles.blockItem,
              isSocial && styles.socialItem,
              isSocial && { borderLeftColor: socialColors[item] || '#ddd' }
            ]}
          >
            {isSocial && socialIcons[item] && (
              <Image
                source={socialIcons[item]}
                style={styles.socialIconImage}
                resizeMode="contain"
              />
            )}
            <Text style={[
              styles.blockText,
              isSocial && { color: socialColors[item] || '#333', fontWeight: 'bold' }
            ]}>
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

// FullWidthContainer Component
const FullWidthContainer = () => {
  const items = [
    { text: 'Contact Us', link: '/contactus' },
    { text: 'About Us', link: '/aboutus' },
    { text: 'Security', link: '/security' },
    { text: 'Privacy Policy', link: '/privacypolicy' },
    { text: 'Terms of Service', link: '/termsofservice' }
  ];

  return (
    <View style={styles.fullWidthContainer}>
      <Text style={styles.fullWidthTitle}>Informations</Text>
      <View style={styles.scrollViewWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.linksContainer,
            { width: items.length <= 3 ? '100%' : 'auto' }
          ]}
          centerContent={true}
        >
          {items.map((item, index) => (
            <Link key={index} href={item.link} asChild>
              <Pressable style={styles.linkItem}>
                <Text style={styles.linkText}>{item.text}</Text>
              </Pressable>
            </Link>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

// App Component
const App = ({ externalAnnouncements = [] }) => {
  const [searchText, setSearchText] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header searchText={searchText} setSearchText={setSearchText} />
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <ImageBackground source={backGroundImage} resizeMode="cover" style={styles.imageBackground}>
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
              text="We offer a variety of services to help you achieve your goals."
            />
            <ContentSection
              title="Our Services"
              text="Explore our range of services designed to meet your needs. From design to development, we have you covered."
            />
            <ContentSection
              title="Contact Us"
              text="Have questions? Feel free to reach out to our support team."
              link="mailto:support@example.com"
            />
            <Announcements announcements={externalAnnouncements} />
          </ImageBackground>
          <View style={styles.divider} />
          <View style={styles.horizontalBlocksContainer}>
            <SideBlockContainer title="Categories" items={['Design', 'Development', 'Marketing', 'Writing']} />
            <SideBlockContainer title="Follow Us" items={['Facebook', 'Twitter', 'Instagram', 'LinkedIn']} isSocial />
          </View>
          <FullWidthContainer />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
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
    marginLeft: 15,
  },
  headerButtonText: {
    color: '#22780f',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  imageBackground: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  searchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    height: 40,
    width: '90%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  button: {
    height: 45,
    width: 140,
    borderRadius: 25,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 10,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentSection: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 15,
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  contentSectionInner: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  serviceCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  serviceImage: {
    width: '100%',
    height: 150,
    borderRadius: 15,
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 16,
    color: 'gold',
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
    marginTop: 10,
  },
  category: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  servicesContainer: {
    paddingVertical: 20,
  },
  sideBlockContainer: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 15,
    width: '35%',
    minHeight: 220,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  blockTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  blockGrid: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  blockItem: {
    width: '150%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  socialItem: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialIconImage: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  blockText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  fullWidthContainer: {
    marginVertical: 20,
    padding: 15,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  fullWidthTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  scrollViewWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linksContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkItem: {
    minWidth: 120,
    marginHorizontal: 8,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  linkText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    width: '90%',
    backgroundColor: '#e0e0e0',
    alignSelf: 'center',
    marginVertical: 20,
  },
  horizontalBlocksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    width: '100%',
    alignContent: 'center',
    alignSelf: 'center',
  },
});
