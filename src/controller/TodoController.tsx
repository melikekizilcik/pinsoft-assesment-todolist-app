import React, { useEffect, useState } from "react";
import { db } from "../services/firebase.config";
import { addDoc, collection, onSnapshot, updateDoc, doc, deleteDoc, serverTimestamp } from "firebase/firestore";

//Todo interface
export interface Todo{
    id: string,
    todo: string,
    isChecked: boolean
}

const collectionRef = collection(db, "todos");
const [createdTodo, setCreatedTodo] = useState("");
const [todos, setTodos] = useState<Todo[]>([]);

//CREATE TODO
export async function addTodo() {
    
    await addDoc(collectionRef, {
    todo: createdTodo,
    isChecked: false,
    createdAt: serverTimestamp(),
    });
    setCreatedTodo("");
}

//GET TODOS
export async function getTodos() {
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
}

//DELETE TODO
export async function deleteTodo(todos) {
    
}