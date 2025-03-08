import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, SafeAreaView, View, Text, Appearance } from 'react-native';
import { Link } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function TermsOfServiceScreen() {
    const colorScheme = Appearance.getColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const imgColor = colorScheme === 'dark' ? 'papayawhip' : '#333';
    const styles = createStyles(theme, colorScheme);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <View style={styles.imgContainer}>
                    <MaterialIcons name="gavel" size={100} color={imgColor} />
                </View>
                <Text style={styles.title}>Terms of Service</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.text}>📜 Platform Guidelines</Text>
                    <Text style={styles.text}>Last updated: March 2024</Text>
                    <Text style={styles.text}>By using Fiver, you agree to these terms that are designed to make our platform safe and effective for everyone.</Text>
                    <Text style={styles.text}>Key Terms:</Text>
                    <Text style={styles.text}>• User responsibilities</Text>
                    <Text style={styles.text}>• Service delivery standards</Text>
                    <Text style={styles.text}>• Payment and refund policies</Text>
                    <Text style={styles.text}>• Intellectual property rights</Text>
                    <Text style={styles.text}>
                        Questions about our terms?{' '}
                        <Link href="mailto:legal@fiver.com" style={styles.link}>Contact our legal team</Link>
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