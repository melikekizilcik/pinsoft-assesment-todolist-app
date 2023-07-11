import {
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FIREBASE_AUTH, db } from "../services/firebase.config";
import { addDoc, collection, onSnapshot, updateDoc, doc, deleteDoc, serverTimestamp, getDocs, DocumentData, FieldPath, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import TodoCard from "./TodoCard";
import { AntDesign, Entypo, Feather, FontAwesome } from '@expo/vector-icons'; 
import { NativeStackNavigationProp } from "@react-navigation/native-stack";





//Todo interface
export interface Todo{
  id: string,
  todo: string,
  isChecked: boolean,
  createdAt: string,
  uid: string
}

//navigation
interface RouterProps{
  navigation: NativeStackNavigationProp<any,any>;
  //navigation.navigate("başkasayfa") kullanılabilir
}

//PAGE
const CreateTodo = ({navigation}: RouterProps) => {
  const collectionRef = collection(db, "todos");
  const [createdTodo, setCreatedTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [updatedTodo, setUpdatedTodo] = useState();
  const [loadingTodos, setLoadingTodos] = useState(true);

//create todo function
const addTodo = async () => {
  await addDoc(collectionRef, {
    todo: createdTodo,
    isChecked: false,
    createdAt: serverTimestamp(),
    uid: FIREBASE_AUTH.currentUser.uid,
  });
  setCreatedTodo("");
  getTodos();
};

  
  //verileri çeker ve kodda olan değişiklikleri veritabanına iletir
 {/*} useEffect(() => {
    const listener = onSnapshot(collectionRef, {
      next: (snapshot) => {
        snapshot.docs.filter((doc) =>
          todos.push({
            id: doc.id,
            ...doc.data(),
          } as Todo)
        );
        setTodos(todos);
      },
    });
  }, []); */}

  async function getTodos() {
    await getDocs(collectionRef)
    .then((todo) => {
      let filteredTodos = todo.docs.filter(
        (todo) => todo.data().uid === FIREBASE_AUTH.currentUser.uid
      );
      let todosData = filteredTodos.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const sortedTodosData = todosData.sort((a :any, b : any) => {
        return b.createdAt - a.createdAt;
      });
      setTodos(sortedTodosData);
      setLoadingTodos(false);
    })
  } 
  
  useEffect(() => {
    getTodos();
  }, [])

  const renderTodo = ({item}: any) => {
    const idRef = doc(db, `todos/${item.id}`);

    //toggle done
    const toggleDone =async () => {
     updateDoc(idRef, {isChecked: !item.isChecked});
     getTodos();
    }

    //delete
    const deleteTodo = async () =>{
      deleteDoc(idRef);
      getTodos();
    }  

    return(
      <View style={styles.todosContainer}>
        <TouchableOpacity onPress={toggleDone} style={styles.toggleIcon}>
          {item.isChecked && <AntDesign name="checkcircleo" size={24} color="black" />}
          {!item.isChecked && <Entypo name="circle" size={24} color="black" />}
        </TouchableOpacity>
        <TodoCard todo={item}/>
        {/* ICONS */}
        <TouchableOpacity onPress={() => navigation.navigate("EditTodoPage")} style={styles.editIcons}>
          <FontAwesome name="edit" size={24} color="black" />
        </TouchableOpacity> 
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
      <View>
        <FlatList nestedScrollEnabled 
          data={todos}
          renderItem={(item) => renderTodo(item)}
          keyExtractor={(todo: Todo) => todo.id}
          scrollEnabled={false}
        />
      </View>

      {/* LOG OUT
      <View>
      <TouchableOpacity style={styles.logoutButton} onPress={() => FIREBASE_AUTH.signOut()}>
            <AntDesign name="logout" size={24} color="black" />
            <Text>Logout</Text>
          </TouchableOpacity> 
      </View> */}
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
  flatlist:{
    flex:1
  },
  logoutButton: {
    alignSelf: "center",
    margin: 30
  }
});
export default CreateTodo;
