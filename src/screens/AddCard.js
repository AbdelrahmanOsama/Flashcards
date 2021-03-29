import React,{ useState } from 'react';
import { SafeAreaView, View, Button, TouchableOpacity, StyleSheet, Alert, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { saveCardToDeck } from '../utility/_helper';


const AddCard = ({ navigation, route }) => {
  const [question, onChangeQuestion] = useState("");
  const [answer, onChangeAnswer] = useState("");

  const addNew = (e) => {
    e.preventDefault();
    if (!question || !answer) {
        Alert.alert(
            "Alert",
            "Please fill the fields before submitting",
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
        saveCardToDeck(route.params.cardId,{
            question,
            answer
          })
        .then(() => 
        navigation.navigate('Deck Information', {
            itemId: route.params.cardId,
            title: route.params.title,
        })
        )
        onChangeQuestion('');
        onChangeAnswer('');   
    }
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
            <TextInput
            style={styles.input}
            placeholder='Question'
            onChangeText={onChangeQuestion}
            value={question}
            />
            <TextInput
            style={styles.input}
            placeholder='Answer'
            onChangeText={onChangeAnswer}
            value={answer}
            />
       
          <View View style={styles.button}>
            <TouchableOpacity>
              <Button
                title="Add Card"
                color="tomato"
                marginHorizontal="10"
                onPress={addNew}
              />
            </TouchableOpacity>
          </View>
      
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
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
    flex:5,
    marginVertical:25,
    marginHorizontal:25
  },
  input: {
    height: 30,
    margin: 12,
    borderWidth: 1,
    borderRadius:5,
    paddingHorizontal:10,
    marginVertical:20,
    flex:1
  },
  icon:{
    flex:8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button:{
    flex:8,
    justifyContent: 'center',
  }
});

export default AddCard;