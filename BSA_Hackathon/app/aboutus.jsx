import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, SafeAreaView, View, Text, Appearance } from 'react-native';
import { Link } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function AboutScreen() {
    const colorScheme = Appearance.getColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const imgColor = colorScheme === 'dark' ? 'papayawhip' : '#333';
    const styles = createStyles(theme, colorScheme);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <View style={styles.imgContainer}>
                    <AntDesign name="team" size={100} color={imgColor} />
                </View>
                <Text style={styles.title}>About Fiver</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.text}>🌟 Your Premier Freelance Marketplace</Text>
                    <Text style={styles.text}>Founded in 2024, Fiver has become a leading platform connecting talented freelancers with clients worldwide.</Text>
                    <Text style={styles.text}>💼 Our mission is to empower freelancers and businesses to achieve their goals through meaningful collaboration.</Text>
                    <Text style={styles.text}>🌍 Join our growing community of over 1000+ professionals from around the globe.</Text>
                    <Text style={styles.text}>
                        Want to learn more?{' '}
                        <Link href="mailto:info@fiver.com" style={styles.link}>Contact our team</Link>
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

function createStyles(theme, colorScheme) {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.background,
            padding: 16,
        },
        card: {
            backgroundColor: theme.card,
            borderRadius: 15,
            padding: 20,
            width: '90%',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
        },
        imgContainer: {
            backgroundColor: colorScheme === 'dark' ? '#555' : '#E0E0E0',
            borderRadius: 50,
            padding: 20,
            marginBottom: 15,
        },
        title: {
            color: theme.text,
            fontSize: 26,
            fontWeight: 'bold',
            marginBottom: 15,
        },
        infoContainer: {
            alignItems: 'center',
            gap: 10,
        },
        text: {
            color: theme.text,
            fontSize: 16,
            textAlign: 'center',
        },
        link: {
            textDecorationLine: 'underline',
            color: theme.primary,
            fontWeight: 'bold',
        },
    });
} 