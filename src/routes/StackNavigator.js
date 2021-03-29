import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import BottomTabNavigator from './TabNavigator'
import DeckInfo from "../screens/DeckInfo";
import AddCard from "../screens/AddCard";
import Quiz from "../screens/Quiz";
import Result from "../screens/Result";


const Stack = createStackNavigator();
const screenOptionStyle = {
    headerStyle: {
      backgroundColor: "tomato",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
  };

  function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
  
    switch (routeName) {
      case 'AddDecks':
        return 'Add Deck';
      case 'Decks':
        return 'Home';
    }
  }

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={BottomTabNavigator} options={({ route }) => ({
        headerTitle: getHeaderTitle(route),
      })} 
      />
      <Stack.Screen name="Add Card" component={AddCard} navigationOptions={{title: 'Add Card'}}/>
      <Stack.Screen name="Deck Information" component={DeckInfo} />
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen name="Result" component={Result} />
    </Stack.Navigator>
  );
}

