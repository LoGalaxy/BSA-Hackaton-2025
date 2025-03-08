import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';

const BecomeSeller = () => {
    const [storeName, setStoreName] = useState('');

    const handleBecomeSeller = () => {
        if (storeName) {
            Alert.alert('Succès', 'Votre demande pour devenir vendeur a été envoyée avec succès!');
        } else {
            Alert.alert('Erreur', 'Veuillez entrer le nom de votre magasin.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Devenez Vendeur!</Text>
            <Text style={styles.subtitle}>Complétez votre demande et commencez à vendre vos produits sur notre plateforme.</Text>

            <TextInput
                style={styles.input}
                placeholder="Nom du magasin"
                value={storeName}
                onChangeText={setStoreName}
                placeholderTextColor="#aaa"
            />

            <Pressable style={styles.button} onPress={handleBecomeSeller}>
                <Text style={styles.buttonText}>Devenir Vendeur</Text>
            </Pressable>
        </View>
    );
};

export default BecomeSeller;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#777',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        width: '80%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#fff',
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '80%',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
