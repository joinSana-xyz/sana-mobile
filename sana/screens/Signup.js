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
                <Image style={styles.logo} source={require('../images/sana-logo.png')}/>
            </View>
            <View style={[styles.signInBigBox, {flex:2}]}>
            <View style={styles.signInSmallBox}>
            <SafeAreaView style={styles.form}>
                <TextInput style={styles.input}
                    autoCapitalize="word"
                    placeholder="first name"
                    autoFocus={true}
                    value={fName}
                    onChangeText={(text) => setFName(text)} 
                />
                <View style={styles.hairline} />
                <TextInput style={styles.input}
                    autoCapitalize="word"
                    placeholder="last name"
                    autoFocus={true}
                    value={lName}
                    onChangeText={(text) => setLName(text)} 
                />
                <View style={styles.hairline} />
                <TextInput style={styles.input}
                    autoCapitalize="none"
                    placeholder="Email Address"
                    keyboardType = "email-address"
                    textContentType = "emailAddress"
                    autoFocus={true}
                    value={email}
                    onChangeText={(text) => setEmail(text)} 
                />
                <View style={styles.hairline} />
                <TextInput style={styles.input}
                    autoCapitalize="none"
                    placeholder="password"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType = "password"
                    value={password}
                    onChangeText={(text) => setPassword(text)} 
                />
                <View style={styles.hairline} />
                <TextInput style={styles.input}
                    autoCapitalize="none"
                    placeholder="Verification Code"
                    autoCorrect={false}
                    value={code}
                    onChangeText={(text) => setCode(text)} 
                />
                <View style={styles.hairline} />
                {
                //<Text style={styles.headerTitle}>Birthday</Text>
                //<DatePicker date={birthday} onDateChange={setBirthday} />
                }
                <TouchableOpacity style={styles.button} onPress={onHandleSignUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                         <Text>Already have an account? 
                <Text style={{color:"red"}}onPress={() => navigation.navigate("Signin")}> Log In! </Text>
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
    hairline: {
        backgroundColor: '#c3cfe1',
        height: 2,
        width: 200,
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
});
