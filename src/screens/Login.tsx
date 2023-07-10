import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button} from 'react-native'
import React, {useState} from 'react'
import { FIREBASE_AUTH } from '../services/firebase.config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signUp =async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const signIn =async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert("Check yout emails!");
        } catch (error) {
            console.log(error);
            alert("Sign in failed: "+ error.message);
        } finally {
            setLoading(false);
        }
    }

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        value={email}
        placeholder='Email'
        autoCapitalize='none'
        onChangeText={(text) => setEmail(text)}
        />
        <TextInput 
        style={styles.input}
        value={password}
        placeholder='password'
        autoCapitalize='none'
        onChangeText={(text) => setPassword(text)}
        />
        {loading ? <ActivityIndicator size="large" color="#0000ff"/> : <>
        <Button title="Login" onPress={() => {}} /></>}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 20,
        flex:1,
        justifyContent: 'center'
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: "#fff"
    }
})
export default Login