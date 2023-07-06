import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import CreateTodo from "../components/CreateTodo";

const TodoListPage = () => {
  return (
    <SafeAreaView>
      <View>
        <CreateTodo />
        <Text>List</Text>
      </View>
    </SafeAreaView>
  );
};

export default TodoListPage;
