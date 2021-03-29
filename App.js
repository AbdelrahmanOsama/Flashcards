import React, {useEffect} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigator } from "./src/routes/StackNavigator";
import { setLocalNotification } from "./src/utility/notifications";


 const App = () => {
   useEffect(() => {
    setLocalNotification()
   }, []);
  return (
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
  );
}
export default App;