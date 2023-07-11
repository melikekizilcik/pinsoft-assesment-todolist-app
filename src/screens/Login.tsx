import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView, TouchableOpacity} from 'react-native'
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
            alert("check your emails");
        } catch (error) {
            console.log(error);
            alert("sign in failed");
        } finally {
            setLoading(false);
        }
    }

    const signIn =async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log(error);
            alert("Sign in failed: "+ error.message);
        } finally {
            setLoading(false);
        }
    }

  return (
    <View style={styles.container}>
    <KeyboardAvoidingView behavior="padding">
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
        secureTextEntry={true}
        placeholder='password'
        autoCapitalize='none'
        onChangeText={(text) => setPassword(text)}
        />
        {loading ? <ActivityIndicator size="large" color="#0000ff"/> : <>
        <View style={styles.buttonView}>
        <TouchableOpacity onPress={signIn} style={styles.button}>
            <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={signUp} style={styles.buttonRegister}>
            <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>
        </View>
        </>}
    </KeyboardAvoidingView>
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
        borderWidth: 2,
        borderRadius: 8,
        borderColor: "#ADD8E6",
        padding: 10,
        backgroundColor: "#fff",
    },
    button:{
        borderRadius: 8,
        backgroundColor: "#8AC7DB",
        height: 35,
        width: 120,
        alignSelf: 'center',
        alignItems: 'center',
        margin: 5
    },
    buttonRegister:{
        borderRadius: 8,
        backgroundColor: "#ADD8E6",
        height: 35,
        width: 120,
        alignSelf: 'center',
        alignItems: 'center',
        margin: 5
    },
    buttonText:{
        fontSize: 15,
        padding: 8,
        color: "white",
        fontWeight: '600'
    },
    buttonView:{
        marginTop: 20
    }
})
export default Login