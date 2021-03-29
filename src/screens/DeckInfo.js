import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Button, StyleSheet, Text, TouchableOpacity,Alert, StatusBar } from 'react-native';
import { getDeck } from '../utility/_helper';

export default function DeckInfo({ navigation, route}) {
    const [deckInfo, setstate] = useState({title:null, questions:0, id:null})
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setstate('')
      fetchDa();
    });
    async function fetchDa() {
      await getDeck(route.params.itemId).then(data => 
      {
        setstate({title:data.title, questions:data.questions.length, id:data.id})
      });
    }
    fetchDa();
    return unsubscribe;
  }, [navigation,deckInfo])

  const goToQuiz = () => {
    console.log(deckInfo.questions === 0)
    if (deckInfo.questions === 0) {
      Alert.alert(
        "Alert",
        "Please fill the deck with cards first",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }else{
      navigation.navigate('Quiz', {
        cardId: deckInfo.id,
        title:deckInfo.title
      })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.title}>
            <Text style={{fontSize:30}}> {deckInfo.title} </Text>
        </View>
        <View style={styles.cards}>
            <Text style={{fontSize:20}}> {deckInfo.questions}  Cards </Text>
        </View>
        <View>
        <TouchableOpacity 
                style ={{
                    height: 50,
                    borderRadius:10,
                    marginLeft :20,
                    marginRight:20,
                    marginTop :20
                }}>
            <Button
              title="Add Card"
              color="gray"
              borderRadius='20'
              onPress={() =>  navigation.navigate('Add Card', {
                cardId: deckInfo.id,
                title:deckInfo.title
              })}
            />
          </TouchableOpacity> 
        
        </View>
        <View>
        <TouchableOpacity 
                style ={{
                    height: 50,
                    borderRadius:10,
                    marginLeft :20,
                    marginRight:20,
                    marginTop :10
                }}>
           <Button
              title="Start Quiz"
              color="tomato"
              onPress={goToQuiz}
            />
          </TouchableOpacity> 
        
        </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      justifyContent: 'center',
      marginHorizontal: 10,
      marginBottom:20
  
    },
    title:{
      fontSize:24,
      color:'#e5593f',
      fontWeight:'bold',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical:10,
      fontSize:30,
      fontWeight:'bold',
    },
    cards:{
      fontSize:24,
      color:'#e5593f',
      fontWeight:'bold',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical:30,
      fontSize:30,
      fontWeight:'bold',

    }
  });
  