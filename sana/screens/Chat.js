import React, {useState, useEffect, useLayoutEffect, useCallback} from "react";
import {StyleSheet, Text, View, Button, TouchableOpacity} from "react-native";
import { GiftedChat, Send } from "react-native-gifted-chat";
import {auth, database} from '../config/firebase';
import {useRoute } from "@react-navigation/native";
import { Icon } from 'react-native-elements';
import {collection, setDoc, getDoc, addDoc, doc, updateDoc, orderBy, query, onSnapshot, increment} from 'firebase/firestore';

import ReplyMessageBar from '../components/ReplyMessageBar';

export default function Chat({navigation}) {
    const route = useRoute()
    
    const [someoneElseTyping, setSomeoneElseTyping] = useState(0);
    const [messages, setMessages] = useState([]);
    const [replyMessage, setReplyMessage] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const clearReplyMessage = () => setReplyMessage(null);
    const cid = route.params?.cid;
    


    const renderReplyMessageView = (props) => {
        if (typeof props.currentMessage.replyMessage == 'string'){
          return (
              <View style={styles.replyMessageContainer}>
                <Text>{props.currentMessage.replyMessage}</Text>
                <View style={styles.replyMessageDivider} />
              </View>
            );
        }
    }

    const renderAccessory = () => (
        <ReplyMessageBar message = {{text:replyMessage}} clearReply={clearReplyMessage}/>
    );
    
    /* 
     * Retreives the messages for this chat everytime someone sends one 
     * */

    useLayoutEffect(() => {
        const collectionRef = collection(database, "chat", cid, "chat");
        const quer = query(collectionRef, orderBy('createdAt', 'desc'));
            
        const unsubscribe = onSnapshot(quer, snapshot => {
        setMessages(
            snapshot.docs.map(doc => ({
                _id: doc.id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user,
                replyMessage: doc.data().replyMessage,
            }))
        )
        });

        return () => unsubscribe();
    }, []);

    /*
     * Receive data on who is typing
     */

    useLayoutEffect(() => {
        const collectionRef = collection(database, "chat", cid, "typers");
        const quer = query(collectionRef);

        const unsubscribe = onSnapshot(quer, snapshot => {
            var isSomeoneElseTyping = false; 
            snapshot.docs.forEach(doc => {
                console.log(doc.data().isTyping + " " + doc.id); 
                isSomeoneElseTyping |= (doc.data().isTyping && doc.id != auth?.currentUser?.uid)
            });
            setSomeoneElseTyping(isSomeoneElseTyping);
        });
        
        return unsubscribe;
    }, []);
        
    /* 
     * update database when a message is sent
     * */

    const onSend = useCallback((messages= []) => {
        if (replyMessage){
            messages[0].replyMessage = replyMessage;
        }
        
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        const {_id, createdAt, text, user} = messages[0];

        addDoc(collection(database, 'chat', cid, "chat"), {
            _id, createdAt, text, user, replyMessage
        });
    });
        
    /* 
     * update database when someone you typing
     * */

    const notifyTyping = args => {
        const docRef = doc(database, "chat", cid, "typers", auth?.currentUser?.uid);
        if (args != "") 
            setDoc(docRef, {
                isTyping: 1,
            });
        else 
            setDoc(docRef, { 
            isTyping: 0 
            });
    }

    async function testo() {
        const docSnap = await getDoc(typerRef);
         
        if (docSnap.exists()) {
        }
    }

    const renderSend = (props) => {
      return (
            <View style={{flexDirection: 'row'}}>
                <Send {...props}>
                <View style={styles.sendContainer}>
                  <Icon
                    type="font-awesome"
                    name="send"
                    size={28}
                    color='orange'
                  />
                </View>
                </Send>

                <TouchableOpacity onPress={() => setShowEmojiPicker((value) => value)}>
                    <Icon
                      type="font-awesome"
                      name="smile-o"
                      size={28}
                      color='gray'/>
                </TouchableOpacity>
            </View>
        );
    }; 
       

    return (
        <>
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                name:auth?.currentUser?.email,
            }}
            renderUsernameOnMessage={true}
            renderSend={renderSend}
            onPress = {(_, message) => setReplyMessage(message.text)}
            renderAccessory = {renderAccessory}
            renderCustomView={renderReplyMessageView}
            isTyping={someoneElseTyping}
            onInputTextChanged={notifyTyping}
        />
        <Button title="" onPress={testo}> </Button>
        </>
        
    )
        }

const styles = StyleSheet.create({
    
  inputContainer: {
    position: 'relative',
    flexDirection: 'column-reverse',
  },
  replyBarContainer: {
    height: 'auto',
  },
  messagesContainer: {
    flex: 1,
  },
  replyMessageContainer: {
    padding: 8,
    paddingBottom: 0,
  },
  replyMessageDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    paddingTop: 6,
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
    contactListContainer:{
        position: 'absolute',
        bottom: 0,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor:'red',
        width: 200 // add width 
    },
    container: {
        flex:1,
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: "purple"
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
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

/*

        <TouchableOpacity onPress={() => setShowEmojiPicker((value) => !value)}>
          <Icon
          type="font-awesome"
          name="smile-o"
          size={28}
          color='gray'/>
          </TouchableOpacity>
          */
