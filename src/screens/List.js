import {
  View,
  StyleSheet,
  TextInput,
  Button,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../services/firebase.config";
import { addDoc, collection } from "firebase/firestore";

const List = () => {
  const collectionRef = collection(db, "todos");
  const [createdTodo, setCreatedTodo] = useState("");

  //create todo
  const addTodo = async () => {
    await addDoc(collectionRef, {
      todo: createdTodo,
      isChecked: false,
    });
    setCreatedTodo("");
  };

  return (
    <SafeAreaView>
      {/* CREATE TODO */}
      <View>
        <TextInput
          placeholder="Add new todo"
          onChangeText={(text) => setCreatedTodo(text)}
          value={createdTodo}
        />
        <Button
          onPress={addTodo}
          title="Add todo"
          disabled={createdTodo === ""}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
  },
});
export default List;
