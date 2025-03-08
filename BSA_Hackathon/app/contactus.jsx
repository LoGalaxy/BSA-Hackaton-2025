import { Fontisto } from '@expo/vector-icons';
import { StyleSheet, SafeAreaView, View, Text, Appearance } from 'react-native';
import { Link } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function ContactScreen() {
    const colorScheme = Appearance.getColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const imgColor = colorScheme === 'dark' ? 'papayawhip' : '#333';
    const styles = createStyles(theme, colorScheme);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <View style={styles.imgContainer}>
                    <Fontisto name="phone" size={100} color={imgColor} />
                </View>
                <Text style={styles.title}>Fiver</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.text}>📍 8 chemin des meuniers 69270 Fontaines-sur-Saône</Text>
                    <Text style={styles.text}>📞 Phone:{' '}
                        <Link href="tel:0623698483" style={styles.link}>06 23 69 84 83</Link>
                        or{' '}
                        <Link href="sms:0623698483" style={styles.link}>Click Here to Text!</Link>
                    </Text>
                    <Text style={styles.text}>🕒 Hours: Open 6am to 4pm daily.</Text>
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