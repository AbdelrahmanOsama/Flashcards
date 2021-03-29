import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity, StatusBar, Animated } from 'react-native';
import { getDecks } from '../utility/_helper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Item = ({ title,questions,onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.item}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="cards" size={30} color="#00a5b5" style={styles.icon} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.title}>Cards:{questions}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const Decks = ({ navigation }) => {
  const [decks, setstate] = useState('')
  const [animate, setAnimate] = useState({ indexToAnimate:null, fadeAnim: new Animated.Value(1) })
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setstate('')
      fetchDa();
    });
    async function fetchDa() {
      await getDecks().then(data => 
      {
        setstate([...Object.values(data).map(dat => (dat))]);
      });
    }
    fetchDa();
    return unsubscribe;
  }, [decks,navigation])

  const renderItem = ({ item }) => (
    <Animated.View 
    style={[
      styles.animatedview,
      {
        opacity:
          item.id == animate.indexToAnimate
            ? animate.fadeAnim
            : 1
      }
    ]}>
      <Item title={item.title} questions={item.questions.length} onPress={() => _onPress(item)} />
    </Animated.View>
  );
  
  const _onPress = (item) => {
    setAnimate({...animate,indexToAnimate:0})
    navigation.navigate('Deck Information', {
      itemId: item.id,
      title: item.title,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={decks}
        onPress={() =>  _onPress(item)}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    flexDirection:'row'
  },
  item: {
    flexDirection:'row',
    backgroundColor: '#fcfcfc',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor:'#00a5b5',
    borderRadius:5,
    borderStyle:'solid',
    flex:1
  },
  title: {
    flex:1,
    fontSize: 20,
    color: '#0a5c63',
    fontWeight: 'bold',
  }, 
  titleContainer: {
    flex:4,
  },  
  iconContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },  
  icon: {
    flex:3,
    borderRightColor:'#00a5b5',
    borderRightWidth:2,
    paddingRight:15,
    marginRight:10,
    textAlignVertical: 'center'
  },
});

export default Decks;