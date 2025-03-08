"use client"

import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Alert, ActivityIndicator } from "react-native";
import { ContractId } from "@hashgraph/sdk";

// Importation de la fonction addPosting depuis le module Hedera
const addPosting = require("@/utils/addPosting");

const CreateContent = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [postingResult, setPostingResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        };
    }, []);

    // Fonction pour gérer la création de contenu
    const handleCreateContent = async () => {
        if (title && price) {
            setIsLoading(true);
            setError(null);

            // Préparer les paramètres
            const contractId = ContractId.fromString("0.0.5673444");
            const priceNumber = Number.parseFloat(price);

            const result = await addPosting(contractId, title, priceNumber);
            setPostingResult(result);

            setIsLoading(false);
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Créer un nouveau contenu</Text>
            <Text style={styles.subtitle}>Publiez votre contenu sur la plateforme</Text>

            <TextInput
                style={styles.input}
                placeholder="Titre du contenu"
                value={title}
                onChangeText={setTitle}
                placeholderTextColor="#aaa"
            />
            <TextInput
                style={styles.input}
                placeholder="Prix (USD)"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                placeholderTextColor="#aaa"
            />

            <Pressable
                style={[styles.button, isLoading && styles.buttonDisabled]}
                onPress={handleCreateContent}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator color="#fff" size="small" />
                ) : (
                    <Text style={styles.buttonText}>Créer le contenu</Text>
                )}
            </Pressable>

            {error && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}

            {postingResult !== null && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultTitle}>Résultat de la transaction :</Text>
                    <Text style={styles.resultText}>Index du contenu : {postingResult.toString()}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f4f4f4",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "#777",
        marginBottom: 30,
        textAlign: "center",
    },
    input: {
        width: "80%",
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: "#fff",
        marginBottom: 15,
    },
    button: {
        backgroundColor: "#4CAF50",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: "center",
        width: "80%",
        marginTop: 10,
    },
    buttonDisabled: {
        backgroundColor: "#a5d6a7",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    resultContainer: {
        backgroundColor: "#e8f5e9",
        padding: 15,
        borderRadius: 10,
        width: "80%",
        marginTop: 20,
        borderWidth: 1,
        borderColor: "#4CAF50",
    },
    resultTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2e7d32",
        marginBottom: 10,
    },
    resultText: {
        fontSize: 14,
        color: "#333",
        marginBottom: 5,
    },
    errorContainer: {
        backgroundColor: "#ffebee",
        padding: 15,
        borderRadius: 10,
        width: "80%",
        marginTop: 20,
        borderWidth: 1,
        borderColor: "#f44336",
    },
    errorText: {
        fontSize: 14,
        color: "#d32f2f",
    },
});

export default CreateContent;
