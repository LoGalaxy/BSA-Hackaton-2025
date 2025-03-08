import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [step, setStep] = useState(1);

    const handleLogIn = () => {
        if (email && password) {
            Alert.alert('Success', 'Log in successful!');
        } else {
            Alert.alert('Error', 'Please enter both email and password.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>

            <View style={styles.stepsContainer}>
                {[1, 2, 3].map((stepNum) => (
                    <Pressable
                        key={stepNum}
                        style={[styles.stepButton, step === stepNum && styles.activeStep]}
                        onPress={() => setStep(stepNum)}
                    >
                        <Text style={styles.stepButtonText}>{stepNum}</Text>
                    </Pressable>
                ))}
            </View>

            <Text style={styles.stepText}>
                {step === 1 ? 'Account Creation' : step === 2 ? 'Personal Data' : 'Account Type'}
            </Text>

            {step === 1 && (
                <View style={styles.formContainer}>
                    <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#aaa" />
                    <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholderTextColor="#aaa" />
                    <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry placeholderTextColor="#aaa" />
                    <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry placeholderTextColor="#aaa" />
                </View>
            )}

            {step === 2 && (
                <View style={styles.formContainer}>
                    <TextInput style={styles.input} placeholder="First Name" placeholderTextColor="#aaa" />
                    <TextInput style={styles.input} placeholder="Last Name" placeholderTextColor="#aaa" />
                    <form >
                        <input type="date" id="birthdate" name="birthdate" style={styles.date} />
                    </form>
                </View>
            )}

            {step === 3 && (
                <Text style={styles.stepText}>Choose Your Account Type</Text>
            )}

            <Pressable style={styles.button} onPress={handleLogIn}>
                <Text style={styles.buttonText}>Log In</Text>
            </Pressable>

            <Pressable style={styles.forgotPassword} onPress={() => Alert.alert('Reset Password', 'Redirecting...')}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </Pressable>
        </View>
    );
};

export default LogIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    date: {
        width: '100%',
        height: 50,
        borderColor: '#bdc3c7',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 20,
    },
    input: {
        width: '90%',
        height: 50,
        borderColor: '#bdc3c7',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#3498db',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '90%',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    forgotPassword: {
        marginTop: 15,
    },
    forgotPasswordText: {
        color: '#3498db',
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    stepsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    stepButton: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        backgroundColor: '#bdc3c7',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8,
    },
    activeStep: {
        backgroundColor: '#3498db',
    },
    stepButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    stepText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 15,
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
    },
});