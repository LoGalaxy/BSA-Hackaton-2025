import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, SafeAreaView, View, Text, Appearance } from 'react-native';
import { Link } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function PrivacyPolicyScreen() {
    const colorScheme = Appearance.getColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const imgColor = colorScheme === 'dark' ? 'papayawhip' : '#333';
    const styles = createStyles(theme, colorScheme);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <View style={styles.imgContainer}>
                    <MaterialIcons name="privacy-tip" size={100} color={imgColor} />
                </View>
                <Text style={styles.title}>Privacy Policy</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.text}>🔐 Your Privacy Matters</Text>
                    <Text style={styles.text}>Last updated: March 2024</Text>
                    <Text style={styles.text}>We are committed to protecting your personal information and your right to privacy.</Text>
                    <Text style={styles.text}>Key Points:</Text>
                    <Text style={styles.text}>• We only collect essential information</Text>
                    <Text style={styles.text}>• Your data is never sold to third parties</Text>
                    <Text style={styles.text}>• You control your data sharing preferences</Text>
                    <Text style={styles.text}>• GDPR and CCPA compliant</Text>
                    <Text style={styles.text}>
                        Questions about your privacy?{' '}
                        <Link href="mailto:privacy@fiver.com" style={styles.link}>Contact our privacy team</Link>
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