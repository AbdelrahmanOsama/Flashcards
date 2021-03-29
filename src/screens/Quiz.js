import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Button, StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native';
import { getDeck } from '../utility/_helper';
import { setLocalNotification, clearLocalNotification } from "../utility/notifications";

export default function Quiz({ navigation, route }) {
    const [deckInfo, setstate] = useState({title:null, questions:0, id:null})
    const [questionNum, setCurrentNum] = useState(1)
    const [currentQuestion, setCurrentQuestion] = useState({q:'',ans:''})
    const [result, setResult] = useState(0)
    const [showResult, setShowResult] = useState(false)
    const [showQuestion, setShow] = useState(false)
  
    let res = 0;
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setstate({title:null, questions:0, id:null})
            setCurrentQuestion({q:'',ans:''})
            setCurrentNum(1)
            setResult(0)
            setShowResult(false)
            setShow(false)
            fetchDa();
          });
        async function fetchDa() {
            await getDeck(route.params.cardId).then(data => 
            {
                setstate({ questions:data.questions, id:data.id});
                setCurrentQuestion({q:data.questions[questionNum - 1].question, ans:data.questions[questionNum - 1].answer});
            });
          }
          fetchDa();
          return unsubscribe;
    }, [questionNum,navigation])

  const NextQuestion = (response) => {
        response === 'correct' ? setResult(prevCount => prevCount + 1) : null
        setShow(false)
      if (questionNum === deckInfo.questions.length ) {
        setShowResult(true)
        clearLocalNotification().then(setLocalNotification)
      }else{
        setCurrentNum(questionNum + 1)
        setCurrentQuestion({
            q:deckInfo.questions[questionNum-1].question, 
            ans:deckInfo.questions[questionNum-1].answer
        })
      }
      
  }

  return (
    <SafeAreaView style={styles.container}> 
        <View style={styles.title}>
            <Text style={{fontSize:15}}> {` ${questionNum }/${deckInfo.questions.length}`} </Text>
        </View>
        <View style={styles.cards}>
            <Text style={{fontSize:14,color:'black',marginBottom:10,fontWeight:'500'}}> { showQuestion ? 'Answer' : 'Question' } </Text>
            <Text style={styles.question}> {showQuestion ? currentQuestion.ans : currentQuestion.q} </Text>
        </View>
        { !showResult ?
        <TouchableOpacity style={styles.cards} onPress={() => setShow(!showQuestion)}>
            <Text style={{fontSize:18,borderRadius:5,padding:10,backgroundColor:'tomato',color:'white'}}> 
                { showQuestion ? 'Question' : 'Answer' } 
            </Text>
        </TouchableOpacity> : null}
        <View>
       { !showResult ?
       <View >
        <TouchableOpacity 
                style ={{
                    height: 50,
                    borderRadius:10,
                    marginLeft :20,
                    marginRight:20,
                    marginTop :20
                }}>
                <Button
                title="Correct"
                color="green"
                borderRadius='20'
                onPress={() => NextQuestion('correct')}
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
                title="Incorrect"
                color="red"
                borderRadius='20'
                onPress={() => NextQuestion('incorrect')}
                />
            </TouchableOpacity>
          </View> : 
            <TouchableOpacity 
            style ={{
                height: 60,
                borderRadius:10,
                marginLeft :20,
                marginRight:20,
                marginTop :20
            }}>
                <Button
                title="Show Result"
                color="tomato"
                borderRadius='20'
                onPress={() => navigation.navigate('Result', {
                    info: deckInfo,
                    result: result,
                  })}
                />
            </TouchableOpacity>
           }
        
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
    },
    question:{
      fontSize:21,
      color:'#e5593f',
      borderColor:'darkgray',
      borderWidth:2,
      padding:15,
      borderRadius:5,
      backgroundColor:'white',
      width:'90%',
      textAlignVertical:'center',
      textAlign: 'center',
      height:'55%',
    }
  });
  