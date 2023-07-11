import React, {useState, useEffect} from "react";
import TodoListPage from "./src/screens/TodoListPage";
import EditTodo from "./src/components/EditTodo";
import CreateTodo from "./src/components/CreateTodo";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./src/screens/Login";
import {User, onAuthStateChanged} from "firebase/auth";
import { FIREBASE_AUTH } from "./src/services/firebase.config";


export default function App() {
  const Stack = createNativeStackNavigator();
  const InsideStack = createNativeStackNavigator();
  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user' , user);
      setUser(user);
    });
  }, [])



  function InsideLayout(){
    return(
      <InsideStack.Navigator>
        <InsideStack.Screen name="TodoListPage" component={TodoListPage} options={{headerShown: false}}/>
        <InsideStack.Screen name="EditTodoPage" component={EditTodo} options={{headerShown: false}}/>
        <InsideStack.Screen name="CreateTodoPage" component={CreateTodo} options={{headerShown: false}}/>
      </InsideStack.Navigator>
    )
  }


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        {user ? (<Stack.Screen name="Inside" component={InsideLayout} options={{headerShown: false}}/>) : (<Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>)}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
}); */
