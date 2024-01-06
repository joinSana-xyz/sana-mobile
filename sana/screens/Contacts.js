import React, {useState, useEffect} from "react";
import {StyleSheet, Text, View, Image, TouchableOpacity, FlatList} from "react-native";
import {auth, database} from '../config/firebase';
import {collection, doc, query, onSnapshot, addDoc, where} from 'firebase/firestore';
import { Dimensions } from 'react-native'
import Verification from "./Verification.js"

const vh = Dimensions.get('window').height / 100;
const vw = Dimensions.get('window').width / 100;

class ContactClass {
    constructor (cid, username) {
        this.cid = cid;
        this.username = username;
    }
}

const addPerson = () => {
    const newConvo = addDoc(collection(database, "chat"), {
        uids:[auth?.currentUser?.uid, "HltL8GyfH7enbscAfsqtYyUDQ1A2"],
        groupName: "test", 
    })
    console.log("e  " + newConvo.id);
}

export default function Contact({navigation}) {

    const [contacts, setContacts] = useState([]);
    const [cids, setCids] = useState([]);

  //useEffect(() => {
  //  if (!auth?.currentUser?.emailVerified) {
  //    navigation.navigate("Verification")
  //  }
  //});
  
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(database, "users", auth?.currentUser?.uid), { includeMetadataChanges: true }, (doc) => {
        setCids(doc.data.cids);
    })
    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    const chatRef = collection(database, "chat")
    const q = query(chatRef, where("uids", "array-contains", auth?.currentUser?.uid));
 
      const unsubscribe = onSnapshot(q, 
    { includeMetadataChanges: true },
    (querySnapshot) => {
    //console.log(querySnapshot.docs);
    setContacts([]);
    querySnapshot.forEach((doc) => {
        const tempContact = new ContactClass(doc.id, doc.data().groupName);
        //const tempContacts = [...contacts, tempContact];
        setContacts(prevContacts => ([...prevContacts, tempContact]));
      })
    })
    return () => unsubscribe();
  }, []);

  return (
        <View style={[styles.container, {flexDirection:"column"}]}>

            <View style={styles.header}>
                <View style={{flexDirection:"row", display: "flex", alignItems: "stretch", width: "100vw", justifyContent: "space-evenly"}}>
                    
                    
                    <Image style={[styles.headerLogo, {marginTop: 50, right: 150}]} source={require('../images/sana-logo-2.png')}/>
                    
                    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                        <Image style={[styles.headerLogo, {marginTop: 50, left: 150}]} source={require('../images/settings.png')}/>
                    </TouchableOpacity>
                    
                </View>
            </View>

            <View style={styles.bottom}>
                <View style={styles.contactList}>
                    <TouchableOpacity style={[styles.item, {borderWidth: 1}]} onPress={() => addPerson()}>
                    
                      <Text style={{fontSize: 25}} >{"Add New Friend"}</Text>
                    
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={[styles.item, {backgroundColor: "rgba(0,0,0,0.2)"}]} onPress={() => navigation.navigate('Chat', {username: "Global Chat", cid: "hello"})}>
                        <Text>{"Global Chat"}</Text>
                    </TouchableOpacity>
                
                    <FlatList
                      keyExtractor={(item)=>item.cid}
                      data={contacts}
                      renderItem={({item}) => (
                        <View>
                            <TouchableOpacity style={[styles.item, {borderWidth: 3}]} onPress={() => navigation.navigate('Chat', {userName: item.username, cid: item.cid})}>
                                <Image style={styles.chatImage} source={require("../images/Chat_Icon.png")}/>
                                <Text style={{fontSize: 20, alignSelf: "center"}}>{item.username}</Text>
                            </TouchableOpacity>
                        </View>
                      )}
                    />
               
                </View>
            </View>
      </View>
    );
};


const styles = StyleSheet.create({

    header: {
        flex:2,
        width: "100vw",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        
    },
    bigText:{
        fontSize: 100,
        fontFamily: "Futara",
        fontWeight: "bold",
    },
    smallBigText:{
        fontSize: 40,
        fontFamily: "Futara",
    },
    headerLogo: {
      width: 40,
      height: 40,
      resizeMode: "contain",
    },
    bottom: {
        flex: 8,
        flexDirection: "row",
        width: "100vw",
        height: "80vh",
        borderRadius:9,
    },
    contactList: {
      flex:1,
      backgroundColor: "#ebf3ff",
    },
    homePart: {
      flex:3,
      backgroundColor: "#ebf3ff",
    },
    container: {
        flex:1,
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: "#ebf3ff"
    },
    title: {
        fontSize:36,
        fontWeight: 'bold',
        color: "orange",
    },
    input: {
        backgroundColor: "red",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
    },
    form: {
        flex:1,
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    card: {
        backgroundColor: "blue",
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    buttonText: {
        fontWeight: "bold",
        color: "black",
        fontSize: 18,
    },
    button: {
        backgroundColor: "blue",
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
  item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    width: 90 * vw,
    height: 10 * vh,
    marginHorizontal: 5 * vw,
    margin: 25
  },
  chatImage: {
    height: 50,
    width: 50,
    right: 125,
  },
});
/*

        <View style={styles.header}>
          <View style={{flexDirection:"row"}}>
            <View style={{flex:0.5}}/>
            <Image style={styles.headerLogo} source={require('../images/sana-logo-2.png')}/>
            <View style={{flex:6}}/>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Image style={styles.headerLogo} source={require('../images/settings.png')}/>
            </TouchableOpacity>
            <View style={{flex:0.5}}/>
            <TouchableOpacity onPress={() => auth.signOut()}>
            <Image style={styles.headerLogo} source={require('../images/default.svg') }/>
            </TouchableOpacity>
          </View>
        </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chat', {userName: "Global Chat", cid: "OgrB6M9OcEkMLLoyqbQ5"})}>
                <Text>{"Global Chat"}</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.homePart}>
            <Text style={styles.bigText}> Welcome! </Text>
            <Text style={styles.smallBigText}> Select a chat or icon to get started. </Text>
            </View>
            */
/*

                    <FlatList 
          data={contacts}
          keyExtractor={item=>item.cid}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chat', {userName: item.username, cid: item.cid})}>
                <Text>{item.username}</Text>
            </TouchableOpacity>
          )}
          */
 /*
    var [contacts, setContacts] = useState([]);
  var [contact, setContact] = useState([]);
  var [usernames, setUsernames] = useState([]);
  const 
  const user = auth.currentUser.uid;
  const docRef = doc(database, "users", user);
  getDoc(docRef).then(docSnap => {
    var data;
  if (docSnap.exists()) {
    data = docSnap.data();
  }
  var cids = data != null ? data.cids : [];
      for (let cid of cids) {
        const chatRef = doc(database, "chat", cid);
        getDoc(chatRef).then(chatSnap => {
          var uids;
        if (chatSnap.exists()) {
            const chatData = chatSnap.data();
            uids = chatData.uids;
            var index = uids.indexOf(user);
            if (index !== -1) {
              uids.splice(index, 1);
            }
            //contacts.push(tempContact);
        }
        for  (let uid of uids){
          const userRef = doc(database, "users", uid)
          getDoc(userRef).then(userSnap => {
            var username;
            if(userSnap.exists()) {
              const userData = userSnap.data();
              username = userData.fName + " " + userData.lName
            }
            setUsernames(username);
            //console.log(usernames)
          })
        }
        //var userNames = usernames.toString();
        const tempContact = new ContactClass(cid, "Neeraj Gogate");
        setContact(tempContact);
        setContacts(contact);
      })
      }
    }
  )
  */


  /*

        const unsub = onSnapshot(cidRef, 
    { includeMetadataChanges: true },
    (chatDoc) => {
          const uids = chatDoc.data().uids;
          for (const uid of uids) {
            console.log(uid);
          }
        })
        unsub();
        */
