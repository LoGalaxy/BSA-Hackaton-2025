import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, SafeAreaView, FlatList, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

// Sample data - replace with your actual data source
const SAMPLE_ANNOUNCEMENTS = [
    {
        id: '1',
        imageSource: require('@/assets/images/service.png'),
        username: 'designer123',
        rating: 4.9,
        description: 'I will create a professional logo design for your business',
        price: 'From $50',
        category: 'Design'
    },
    {
        id: '2',
        imageSource: require('@/assets/images/service.png'),
        username: 'webdev_pro',
        rating: 4.8,
        description: 'I will develop a responsive website using React',
        price: 'From $120',
        category: 'Development'
    },
    {
        id: '3',
        imageSource: require('@/assets/images/service.png'),
        username: 'marketingexpert',
        rating: 4.7,
        description: 'I will create and manage your social media campaigns',
        price: 'From $80',
        category: 'Marketing'
    },
    {
        id: '4',
        imageSource: require('@/assets/images/service.png'),
        username: 'contentwriter',
        rating: 4.6,
        description: 'I will write SEO-optimized blog articles for your website',
        price: 'From $30',
        category: 'Writing'
    },
    {
        id: '5',
        imageSource: require('@/assets/images/service.png'),
        username: 'contentwriter',
        rating: 4.6,
        description: 'I will write SEO-optimized blog articles for your website',
        price: 'From $30',
        category: 'Writing'
    },
    // Add more sample announcements as needed
];

const AnnouncementsScreen = () => {
    const [announcements, setAnnouncements] = useState([]);
    const params = useLocalSearchParams();
    const { category } = params;
    const router = useRouter();

    useEffect(() => {
        // In a real app, you would fetch your data from an API here
        // For now, we'll filter the sample data based on category
        if (category) {
            const filteredAnnouncements = SAMPLE_ANNOUNCEMENTS.filter(
                item => item.category === category
            );
            setAnnouncements(filteredAnnouncements);
        } else {
            setAnnouncements(SAMPLE_ANNOUNCEMENTS);
        }
    }, [category]);

    const goBack = () => {
        router.back();
    };

    const renderItem = ({ item }) => (
        <Pressable
            style={styles.card}
            onPress={() => router.push({
                pathname: '/announcement-details',
                params: { id: item.id }
            })}
        >
            <Image source={item.imageSource} style={styles.image} />
            <View style={styles.cardContent}>
                <View style={styles.userInfo}>
                    <Text style={styles.username}>{item.username}</Text>
                    <Text style={styles.rating}>{item.rating}★</Text>
                </View>
                <Text
                    style={styles.description}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                >
                    {item.description}
                </Text>
                <Text style={styles.price}>{item.price}</Text>
                <Text style={styles.category}>{item.category}</Text>
            </View>
        </Pressable>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={goBack} style={styles.backButton}>
                    <Text style={styles.backButtonText}>← Back</Text>
                </Pressable>
                <Text style={styles.headerTitle}>
                    {category ? `${category} Services` : 'All Services'}
                </Text>
            </View>

            <FlatList
                data={announcements}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                contentContainerStyle={styles.list}
            />
        </SafeAreaView>
    );
};

// Now let's modify your existing SideBlockContainer component to make
// categories clickable and navigate to the announcements page

export const CategoryBlock = ({ title, items }) => {
    const router = useRouter();

    const navigateToCategory = (category) => {
        router.push({
            pathname: '/annonce',
            params: { category }
        });
    };

    return (
        <View style={styles.categoryBlockContainer}>
            <Text style={styles.blockTitle}>{title}</Text>
            <View style={styles.blockGrid}>
                {items.map((item, index) => (
                    <Pressable
                        key={index}
                        style={styles.categoryItem}
                        onPress={() => navigateToCategory(item)}
                    >
                        <Text style={styles.categoryText}>{item}</Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    backButton: {
        marginRight: 10,
    },
    backButtonText: {
        fontSize: 16,
        color: '#22780f',
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    list: {
        padding: 15,
    },
    card: {
        backgroundColor: 'white',
        width: '45%',
        marginHorizontal: 5,
        marginBottom: 15,
        borderRadius: 15,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    cardContent: {
        padding: 15,
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    rating: {
        fontSize: 16,
        color: 'gold',
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#22780f',
        marginBottom: 4,
    },
    category: {
        fontSize: 14,
        color: '#777',
    },
    // Category block styles
    categoryBlockContainer: {
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
    categoryItem: {
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
    categoryText: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '500',
    },
});

export default AnnouncementsScreen;
