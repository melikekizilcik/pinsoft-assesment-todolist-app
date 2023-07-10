import {
  View,
  StyleSheet,
  TextInput,
  Button,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions
} from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../services/firebase.config";
import { addDoc, collection, onSnapshot, updateDoc, doc, deleteDoc, serverTimestamp } from "firebase/firestore";
import TodoCard from "./TodoCard";
import { AntDesign, Entypo, Feather, FontAwesome } from '@expo/vector-icons'; 


//Todo interface
export interface Todo{
  id: string,
  todo: string,
  isChecked: boolean
}

//Page
const CreateTodo = ({navigation}) => {
  const collectionRef = collection(db, "todos");
  const [createdTodo, setCreatedTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [updatedTodo, setUpdatedTodo] = useState();


//create todo function
const addTodo = async () => {
  await addDoc(collectionRef, {
    todo: createdTodo,
    isChecked: false,
    createdAt: serverTimestamp(),
  });
  setCreatedTodo("");
};

  
  //verileri çeker ve kodda olan değişiklikleri veritabanına iletir
  useEffect(() => {
    const listener = onSnapshot(collectionRef, {
      next: (snapshot) => {
        const todos: Todo[] = [];
        snapshot.docs.forEach((doc) =>
          todos.push({
            id: doc.id,
            ...doc.data(),
          } as Todo)
        );
        setTodos(todos);
      },
    });
  }, []); 


  const renderTodo = ({item}: any) => {
    const idRef = doc(db, `todos/${item.id}`);

    //toggle done
    const toggleDone =async () => {
     updateDoc(idRef, {isChecked: !item.isChecked});
    }

    //delete
    const deleteTodo = async () =>{
      deleteDoc(idRef);
    }  

    return(
      <View style={styles.todosContainer}>
        <TouchableOpacity onPress={toggleDone} style={styles.toggleIcon}>
          {item.isChecked && <AntDesign name="checkcircleo" size={24} color="black" />}
          {!item.isChecked && <Entypo name="circle" size={24} color="black" />}
        </TouchableOpacity>
        <TodoCard todo={item}/>
        {/* ICONS 
        <TouchableOpacity onPress={toggleModal} style={styles.editIcons}>
          <FontAwesome name="edit" size={24} color="black" />
        </TouchableOpacity> */}
      <TouchableOpacity onPress={deleteTodo} style={styles.deleteIcons}>
          <Feather name="trash-2" size={24} color="black" />
    </TouchableOpacity> 
      </View>
    )
  }

  return (
    <SafeAreaView>
      {/* CREATE TODO */}
      <View style={styles.addTodo}>
        <TextInput
          placeholder="Add new todo"
          onChangeText={(text : string) => setCreatedTodo(text)}
          value={createdTodo}
          style={styles.addInput}
        />
        <TouchableOpacity onPress={addTodo} disabled={createdTodo === ""} style={styles.addButton}>
          <Text style={styles.buttonText}>Add Todo</Text>
        </TouchableOpacity>
      </View>

     {/* GET TODOS */}
      <View >
        <FlatList nestedScrollEnabled 
          data={todos}
          renderItem={(item) => renderTodo(item)}
          keyExtractor={(todo: Todo) => todo.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addTodo: {
    width: 100,
  },
  addInput:{
    margin: 10,
    padding: 5,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#338BA8",
    width: '350%',
    height: 50,
    marginLeft: 30,
    backgroundColor: "white"
  },
  addButton: {
    width: 100,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#67B7D1",
    alignItems: "center",
    marginHorizontal: 150,
    marginVertical: 10
  },
  buttonText: {
    alignSelf: "center",
    padding: 5,
    color: "white",
    fontSize: 17
  },
  todosContainer:{
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 5,
    marginVertical:10,
    width: '90%',
    height: 50,
    //Shadow for ios
    shadowOpacity: 0.08,
    shadowOffset:{
      width:0,
      height: 20,
    },

  },
  toggleIcon:{
    margin: 5,
    marginRight: 10
  },
  editIcons: {
   
  },
  deleteIcons: {
    flex:1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
 
});
export default CreateTodo;
