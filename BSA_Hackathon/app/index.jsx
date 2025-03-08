import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable, Image, TextInput, ScrollView, SafeAreaView, FlatList, Linking } from 'react-native';
import { Link } from 'expo-router';
import facebookLogo from "@/assets/images/facebook.png";
import twitterLogo from "@/assets/images/twitter.png";
import instagramLogo from "@/assets/images/instagram.png";
import linkedinLogo from "@/assets/images/linkedin.png";
import fiverrLogo from "@/assets/images/fiver.png";
import backGroundImage from "@/assets/images/back.png";
import fiverrLogo from "@/assets/images/fiver.png"; // Assurez-vous d'avoir le logo de Fiverr dans vos assets

import walletConnect from "../utils/walletConnect.js";

const App = () => {
  const [searchText, setSearchText] = useState('');


  const [walletData, setWalletData] = useState();
	const [accountId, setAccountId] = useState();
	
	const [connectTextSt, setConnectTextSt] = useState("Connect here...");
	const [createTextSt, setCreateTextSt] = useState("");
	

	const [connectLinkSt, setConnectLinkSt] = useState("");

  async function connectWallet() {

    if (accountId !== undefined) {
      setConnectTextSt(`Account ${accountId} is connected`);
    } else {
      const walletData = await walletConnect();
      walletData[0].pairingEvent.once((pairingData) => {
        pairingData.accountIds.forEach((id) => {
          setAccountId(id);
          console.log(`- Paired account id: ${id}`);
          setConnectTextSt(`Account ${id} has been connected`);
          setConnectLinkSt(`https://hashscan.io/#/testnet/account/${id}`);
        });
      });
      console.log(`- Wallet data:`, walletData);
      setWalletData(walletData);
      setCreateTextSt();
    }
  }

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
          <ImageBackground source={backGroundImage} resizeMode="cover" style={styles.backgroundContainer}>
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
              link="mailto:support@example.com"
            />
            <Announcements announcements={externalAnnouncements} />
          </ImageBackground>
          <View style={styles.divider} />
          <View style={styles.horizontalBlocksContainer}>
            <SideBlockContainer title="Categories" items={['Design', 'Development', 'Marketing', 'Writing']} />
            <SideBlockContainer title="Suivez-nous" items={['Facebook', 'Twitter', 'Instagram', 'LinkedIn']} isSocial />
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
  backgroundContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    backgroundColor: 'white',
    borderRadius: 20,
    width: '85%',
    borderWidth: 1,
    borderColor: '#eaeaea',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
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
