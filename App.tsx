import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import TodoListPage from "./src/screens/TodoListPage";
import EditTodo from "./src/components/EditTodo";
import CreateTodo from "./src/components/CreateTodo";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TodoListPage" screenOptions={{headerShown: false}}>
        <Stack.Screen name="TodoListPage" component={TodoListPage}/>
        <Stack.Screen name="EditTodoPage" component={EditTodo} />
        <Stack.Screen name="CreateTodoPage" component={EditTodo} />
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
