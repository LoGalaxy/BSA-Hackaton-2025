import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, SafeAreaView, View, Text, Appearance } from 'react-native';
import { Link } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function SecurityScreen() {
    const colorScheme = Appearance.getColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const imgColor = colorScheme === 'dark' ? 'papayawhip' : '#333';
    const styles = createStyles(theme, colorScheme);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <View style={styles.imgContainer}>
                    <MaterialCommunityIcons name="security" size={100} color={imgColor} />
                </View>
                <Text style={styles.title}>Security at Fiver</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.text}>🔒 Your Security is Our Priority</Text>
                    <Text style={styles.text}>We employ industry-leading encryption and security measures to protect your data and transactions.</Text>
                    <Text style={styles.text}>🛡️ Features:</Text>
                    <Text style={styles.text}>• Two-factor authentication</Text>
                    <Text style={styles.text}>• Secure payment processing</Text>
                    <Text style={styles.text}>• 24/7 fraud monitoring</Text>
                    <Text style={styles.text}>• Regular security audits</Text>
                    <Text style={styles.text}>
                        Report a security concern?{' '}
                        <Link href="mailto:security@fiver.com" style={styles.link}>Contact our security team</Link>
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