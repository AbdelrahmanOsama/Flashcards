import React,{ useState } from 'react';
import { SafeAreaView, View, Button, TouchableOpacity, StyleSheet, Text, StatusBar, TouchableWithoutFeedback, Keyboard,Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { saveDeckTitle } from '../utility/_helper';


const AddDecks = ({ navigation }) => {
  const [text, onChangeText] = useState("");

  const addNew = (e) => {
    e.preventDefault();

    if (!text) {
      Alert.alert(
        "Alert",
        "Please add your title first",
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
      saveDeckTitle(text)
      .then((data) => 
        navigation.navigate('Home')
      )
      onChangeText('');
    }
    
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <Text  style={styles.title}> What is the title of new 
          deck?
        </Text>
        <View style={styles.icon}>
          <MaterialCommunityIcons name="cards" size={80} color="tomato" style={styles.icon} />
        </View>
        <TextInput
          style={styles.input}
          placeholder='Title'
          onChangeText={onChangeText}
          value={text}
        />
          <View View style={styles.button}>
            <TouchableOpacity>
              <Button
                title="Create Deck"
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
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius:5,
    paddingHorizontal:10,
    flex:2
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

export default AddDecks;