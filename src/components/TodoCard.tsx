import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'

const TodoCard = ({todo}:any) => {
 
  return (
    <View>
      <View style={styles.checkbox}>{todo.isChecked}</View>
      <Text style={styles.text}>{todo.todo}</Text>
    </View>
  )
}

export default TodoCard

const styles = StyleSheet.create({
  container:{},
  text:{
      fontSize: 16,
  },
  checkbox:{},
  itemContainer: {}
})