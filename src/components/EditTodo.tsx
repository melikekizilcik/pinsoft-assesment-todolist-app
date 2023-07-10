import { View, Text, Button, TextInput } from 'react-native'
import React , { useEffect, useState }from 'react'
import Modal from "react-native-modal";
import { db } from "../services/firebase.config";
import { addDoc, collection, onSnapshot, updateDoc, doc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { Todo } from './CreateTodo';
import { Firestore } from 'firebase/firestore';


const EditTodo = ({route, navigation}) => {
  const [todo, setTodo] = useState("")

  return (
    <View></View>
  )
}

export default EditTodo