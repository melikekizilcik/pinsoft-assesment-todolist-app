import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import CreateTodo from "../components/CreateTodo";
import { ScrollView } from "react-native-gesture-handler";

const TodoListPage = () => {
  return (
    <ScrollView nestedScrollEnabled={true}>
      <View>
        <Text style={styles.title}>Todos</Text>
        <CreateTodo navigation={undefined} />
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

  }
})

export default TodoListPage;
