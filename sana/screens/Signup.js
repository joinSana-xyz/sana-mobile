import React, {useState, useEffect, useLayoutEffect, useCallback} from "react";
import {StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert} from "react-native";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
//import DatePicker from 'react-native-date-picker'
import { auth, database} from "../config/firebase"
import {doc, setDoc, deleteDoc} from 'firebase/firestore';

import Signin from "./Signin"
export default function SignUp({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [code, setCode] = useState("");
    const [birthday, setBirthday] = useState(new Date())
    const cids = ["OgrB6M9OcEkMLLoyqbQ5"]; //conversation IDs
    const gids = [];
   const onHandleSignUp = () => {
        if (email !== "" && password !== "") {
            createUserWithEmailAndPassword(auth, email, password).then(cred => {
                setDoc(doc(database, "users", cred.user.uid), {
                    email: email,
                    fName: fName,
                    lName: lName,
                    cids: cids,
                });
                sendEmailVerification(cred.user);
                const codeRef = doc(database, "codes", code)
                deleteDoc(codeRef);
            })
                .catch((err) => Alert.alert("Sign Up error", err.message));
            };
    };
    return (
        <View style={[styles.container, {flexDirection:'column'}]}>
            <View style={[styles.headerBigBox, {flex:1}]}>
                <Image style={styles.cloudsTop} source={require('../images/sana-clouds.png')}/>
                <Image style={styles.logo} source={require('../images/sana-logo.png')}/>
            </View>
            <View style={[styles.signInBigBox, {flex:2}]}>
            <View style={styles.signInSmallBox}>
            <SafeAreaView style={styles.form}>
                <TextInput style={[styles.input, {marginTop: 125}]}
                    autoCapitalize="words"
                    placeholder="First Name"
                    autoFocus={true}
                    value={fName}
                    onChangeText={(text) => setFName(text)} 
                />
                
                <TextInput style={styles.input}
                    autoCapitalize="words"
                    placeholder="Last Name"
                    autoFocus={true}
                    value={lName}
                    onChangeText={(text) => setLName(text)} 
                />
                
                <TextInput style={styles.input}
                    autoCapitalize="none"
                    placeholder="Email Address"
                    keyboardType = "email-address"
                    textContentType = "emailAddress"
                    autoFocus={true}
                    value={email}
                    onChangeText={(text) => setEmail(text)} 
                />
                
                <TextInput style={styles.input}
                    autoCapitalize="none"
                    placeholder="Password"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType = "password"
                    value={password}
                    onChangeText={(text) => setPassword(text)} 
                />
                
                <TextInput style={styles.input}
                    autoCapitalize="none"
                    placeholder="Verification Code"
                    autoCorrect={false}
                    value={code}
                    onChangeText={(text) => setCode(text)} 
                />
                
                {
                //<Text style={styles.headerTitle}>Birthday</Text>
                //<DatePicker date={birthday} onDateChange={setBirthday} />
                }
                <TouchableOpacity style={styles.button} onPress={onHandleSignUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                
                <Text style={{color:"red", alignSelf: "center"}}onPress={() => navigation.navigate("Signin")}> Already have an account? Log In! </Text>

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
        fontSize: 10,
        fontFamily: "Futara",
        fontWeight: "bold",
    },
    smallBigText:{
        fontSize: 40,
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
    },
    title: {
        fontSize:36,
        fontWeight: 'bold',
        color: "black",
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
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
    cloudsTop: {
        width: '75%',
        height: '75%',
        resizeMode: "contain",
        left: 175,
        transform: [{ rotate: '180deg' }]
    },
    cloudsBottom: {
        width: "75%",
        height: "75%",
        resizeMode: "contain",
        top: 30,
        right: 200
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'black',
        width: 350,
        height: 60,
        fontSize: 15,
        margin: 10,
        padding: 5
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
});
