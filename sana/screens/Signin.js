import React, { useState } from "react";
import {StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

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
                <Image style={styles.cloudsTop} source={require('../images/sana-clouds.png')}/>
                <Image style={styles.logo} source={require('../images/sana-logo.png')}/>
                <Text style={{fontSize: 15, fontFamily: "Roboto"}}> Please sign in to continue </Text>
            </View>

            <View style={[styles.signInBigBox, {flex: 2}]}>
                <View style={styles.signInSmallBox}>
                    <SafeAreaView style={styles.form}>
                        
                        <Text style={{fontSize: 15, marginBottom: 10, fontFamily: 'Futura', marginTop: 100}}> User Name </Text>
                        
                        <TextInput style={[styles.input, {padding: 10}]}
                            autoCapitalize="none"
                            placeholder="Enter Email Address"
                            keyboardType = "email-address"
                            textContentType = "emailAddress"
                            autoFocus={true}
                            value={email}
                            onChangeText={(text) => setEmail(text)} 
                        />
                        
                        
                        
                            
                        <Text style={{fontSize: 15, marginBottom: 10, fontFamily: 'Futura', marginTop: 30}}> Password </Text>

                        <TextInput style={[styles.input, {padding: 10}]}
                            autoCapitalize="none"
                            placeholder="Enter Password"
                            autoCorrect={false}
                            secureTextEntry={true}
                            textContentType = "password"
                            value={password}
                            onChangeText={(text) => setPassword(text)} 
                        />
                        

                        <Text style={{color:"red", textAlign: "right", fontFamily: 'Futura', marginTop: 10}}onPress={() => navigation.navigate("ResetPassword")}> Forgot password? </Text>

                        <Text style={styles.or}> or </Text>

                        <Text style={{fontSize: 15, marginBottom: 10, fontFamily: 'Futura', marginTop: 15}}> User Code </Text>

                        <TextInput style={[styles.input, {padding: 10}]}
                            autoCapitalize="none"
                            placeholder="Enter User Code"
                            autoCorrect={false}
                            secureTextEntry={true}
                            textContentType = "password"
                            value={password}
                            onChangeText={(text) => setPassword(text)} 
                        />
                        
                        <TouchableOpacity style={styles.button} onPress={onHandleSignIn}>
                            <Text style={styles.buttonText}> Login </Text>
                        </TouchableOpacity>
                        
                        
                        
                        <Text style={{color:"red", textAlign: "center", fontFamily: 'Futura'}}onPress={() => navigation.navigate("Signup")}> New user? Sign Up here </Text>
                        

                    </SafeAreaView>
                    
                </View>
                
            </View>

            <View style={[styles.headerBigBox, {flex: 1}]}>
                <Image style={styles.cloudsBottom} source={require('../images/sana-clouds.png')}/>
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
        width: 200,
        height: 140,
        resizeMode: "contain",

    },
    signInBigBox:{
        alignItems: 'center',
        justifyContent: 'center',
        width: "100vw", 
    },
    signInSmallBox: {
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
        backgroundColor: '#ebf3ff',
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
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'black',
        width: 350,
        height: 60,
    },
    form: {
        flex:1,
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    button: {
        backgroundColor: "#6073b7",
        height: 50,
        width: 175,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 30,
        padding: 10,
        color: "white",
    },
    buttonText: {
        fontWeight: "bold",
        color: "white",
        fontSize: 18,
    },
    cloudsTop: {
        width: '75%',
        height: '75%',
        resizeMode: "contain",
        left: 175,
        top: 50,
        transform: [{ rotate: '180deg' }]
    },
    cloudsBottom: {
        width: "75%",
        height: "75%",
        resizeMode: "contain",
        top: 30,
        right: 200
    },
    or: {
        fontWeight: 'bold',
        fontSize: 30,
        alignSelf: 'center'
    }
});
