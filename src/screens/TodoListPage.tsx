import React, {useState, useCallback} from "react";
import { View, Text, StyleSheet, TouchableOpacity, RefreshControl } from "react-native";
import CreateTodo from "../components/CreateTodo";
import { ScrollView } from "react-native-gesture-handler";
import { FIREBASE_AUTH } from "../services/firebase.config";
import { AntDesign } from '@expo/vector-icons';

const TodoListPage = () => {
  const [refresh, setRefresh] = useState(false);
  const onRefresh = useCallback(() => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  }, []);


  return (
    <ScrollView
    refreshControl={
      <RefreshControl 
        refreshing={refresh}
        onRefresh={onRefresh}
      />
    }
    >
      <View>
        <Text style={styles.title}>Todos</Text>
        <CreateTodo navigation={undefined} />
          <TouchableOpacity style={styles.logoutButton} onPress={() => FIREBASE_AUTH.signOut()}>
            <AntDesign name="logout" size={24} color="black" />
            <Text>Logout</Text>
          </TouchableOpacity> 
      </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  body:{
    backgroundColor: "#FAFBFF",
    flex:1
  },
  title:{
    fontSize: 60,
    marginTop: 50,
    marginVertical: 20,
    paddingLeft: 15,
    color: "#338BA8"

  },
  logoutButton: {
    alignSelf: "center",
    margin: 30
  }
})

export default TodoListPage;
