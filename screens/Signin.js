import React, { useState } from "react";
import {StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth} from "../config/firebase"

export default function SignIn({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onHandleSignIn = () => {
        if (email !== "" && password !== "") {
            signInWithEmailAndPassword(auth, email, password)
                .then(cred => {
                    if (!cred.user.emailVerified){
                        console.log("hellpo");
                    }
                }
                )
                .catch((err) => Alert.alert("Login error", err.message));
        }
    };
    return (
        <View style={[styles.container, {flexDirection:'column'}]}>

            <View style={[styles.headerBigBox, {flex: 1}]}>
                <Image style={styles.logo} source={require('../images/sana-logo.png')}/>
            </View>

            <View style={[styles.signInBigBox, {flex: 2}]}>
                <View style={styles.signInSmallBox}>
                    <SafeAreaView style={styles.form}>
                        
                        
                        <TextInput style={[styles.input, {textAlign: "center"}]}
                            autoCapitalize="none"
                            placeholder="Enter Email Address"
                            keyboardType = "email-address"
                            textContentType = "emailAddress"
                            autoFocus={true}
                            value={email}
                            onChangeText={(text) => setEmail(text)} 
                        />
                        
                        <View style={styles.hairline} />
                        
                            
                        <TextInput style={[styles.input, {textAlign: "center"}]}
                            autoCapitalize="none"
                            placeholder="Enter Password"
                            autoCorrect={false}
                            secureTextEntry={true}
                            textContentType = "password"
                            value={password}
                            onChangeText={(text) => setPassword(text)} 
                        />
                        <View style={styles.hairline} />
                        
                        <TouchableOpacity style={styles.button} onPress={onHandleSignIn}>
                            <Text style={styles.buttonText}>Sign In</Text>
                        </TouchableOpacity>
                        
                            <Text style={{color:"red", textAlign: "center"}}onPress={() => navigation.navigate("ResetPassword")}> Reset password </Text>
                        
                        <Text> New User? 
                            <Text style={{color:"red", textAlign: "center"}}onPress={() => navigation.navigate("Signup")}> Sign Up </Text>
                        </Text>
                    </SafeAreaView>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    headerBigBox:{
        alignItems: "center",
        justifyContent: "flex-end",
    },
    bigText:{
        fontSize: 30,
        fontFamily: "Futara",
        fontWeight: "bold",
    },
    smallBigText:{
        fontSize: 20,
        fontFamily: "Futara",
    },
    logo: {
        width: 160,
        height: 100,
        resizeMode: "contain",

    },
    signInBigBox:{
        alignItems: 'center',
        justifyContent: 'center',
        width: "100vw", 
    },
    hairline: {
        backgroundColor: '#c3cfe1',
        height: 2,
        marginBottom: 15,
    },
    signInSmallBox: {
        backgroundColor: "white",
        padding:40,
        borderRadius: 10,
        alignItems: 'start',
        justifyContent: 'left',
    },
    headerTitle: {
        marginBottom:10,
    },
    container: {
        flex:1,
        backgroundColor: "white",
        width:"100vw",
    },
    title: {
        fontSize:36,
        fontWeight: 'bold',
        color: "black",
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },
    input: {
    },
    form: {
        flex:1,
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    button: {
        backgroundColor: "#6073b7",
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        color: "white",
    },
    buttonText: {
        fontWeight: "bold",
        color: "white",
        fontSize: 18,
    },
});
