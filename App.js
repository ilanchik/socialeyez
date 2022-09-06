import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AuthStack, HomeStack } from "./navigation/NavStacks";

const Stack = createStackNavigator();

const App = () => {

  const [currentUser, setCurrentUser] = useState(null);

  // Check if user exists
  const userHandler = user => user ? setCurrentUser(user) : null;

  // Firebase listener
  useEffect(() => {
    return auth.onAuthStateChanged(user => userHandler(user));
  }, []);

  return (
    <>{currentUser ? <HomeStack /> : <AuthStack />}</>
  );
}

export default App;