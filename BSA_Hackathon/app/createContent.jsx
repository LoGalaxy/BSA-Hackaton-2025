import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert, Image, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const BecomeSeller = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [annonces, setAnnonces] = useState([]); // Stocke les annonces créées

    const handleBecomeSeller = () => {
        if (title && description && price && image) {
            const newAnnonce = {
                id: Date.now().toString(), // Identifiant unique
                title,
                description,
                price,
                image,
            };
            setAnnonces([...annonces, newAnnonce]); // Ajoute l'annonce au tableau
            Alert.alert('Succès', 'Votre annonce a été créée avec succès!');

            // Réinitialiser les champs
            setTitle('');
            setDescription('');
            setPrice('');
            setImage(null);
        } else {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create a new offer</Text>
            <Text style={styles.subtitle}>Start selling your services on our platform.</Text>

            <TextInput
                style={styles.input}
                placeholder="Service Title"
                value={title}
                onChangeText={setTitle}
                placeholderTextColor="#aaa"
            />
            <TextInput
                style={styles.input}
                placeholder="Service Description"
                value={description}
                onChangeText={setDescription}
                placeholderTextColor="#aaa"
            />
            <TextInput
                style={styles.input}
                placeholder="Price (USD)"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                placeholderTextColor="#aaa"
            />

            <Pressable style={styles.imageButton} onPress={pickImage}>
                <Text style={styles.buttonText}>Importer une image</Text>
            </Pressable>

            {image && <Image source={{ uri: image }} style={styles.image} />}

            <Pressable style={styles.button} onPress={handleBecomeSeller}>
                <Text style={styles.buttonText}>Créer l'annonce</Text>
            </Pressable>

            <Text style={styles.annoncesTitle}>Annonces créées :</Text>

            <FlatList
                data={annonces}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.annonceCard}>
                        <Image source={{ uri: item.image }} style={styles.annonceImage} />
                        <View style={styles.annonceInfo}>
                            <Text style={styles.annonceTitle}>{item.title}</Text>
                            <Text>{item.description}</Text>
                            <Text style={styles.annoncePrice}>${item.price}</Text>
                        </View>
                    </View>
                )}
            />
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
    imageButton: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '80%',
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
    image: {
        width: 200,
        height: 200,
        marginTop: 10,
        borderRadius: 10,
    },
    annoncesTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#333',
    },
    annonceCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        width: '90%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    annonceImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    annonceInfo: {
        flex: 1,
    },
    annonceTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    annoncePrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginTop: 5,
    },
});
