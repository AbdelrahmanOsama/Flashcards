import React, { useState } from 'react'
import { SafeAreaView, View, Button, StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native';
import { setLocalNotification, clearLocalNotification } from "../utility/notifications";

export default function Result({ navigation, route }) {
  const startQuiz = () => {
    navigation.navigate('Quiz', {
      cardId: route.params.info.id,
    })
    clearLocalNotification().then(setLocalNotification);
  }
  
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.title}>
            <Text style={{fontSize:20,marginBottom:10,color:'tomato'}}>Quiz Completed</Text>
            <Text style={{fontSize:20,color:'black',marginBottom:10,fontWeight:'500'}}> {route.params.result + ' / ' + route.params.info.questions.length} </Text>
        </View>
        <View style={styles.title}>
            <Text style={{fontSize:20,marginBottom:10,color:'black',fontWeight:'500',color:'tomato'}}>Your Precentage is</Text>
            <Text style={{fontSize:20,color:'black',marginBottom:10,fontWeight:'500'}}> {((route.params.result / route.params.info.questions.length) * 100).toFixed() + '%'} </Text>
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
              title="Back to Deck"
              color="gray"
              borderRadius='20'
              onPress={() => navigation.navigate('Deck Information', {
                cardId: route.params.info.id,
              })
            }
            />
          </TouchableOpacity> 
          <TouchableOpacity 
                style ={{
                    height: 50,
                    borderRadius:10,
                    marginLeft :20,
                    marginRight:20,
                    marginTop :20
                }}>
            <Button
              title="Start Quiz"
              color="tomato"
              borderRadius='20'
              onPress={startQuiz}
            />
          </TouchableOpacity> 
        
        </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
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
  });
  