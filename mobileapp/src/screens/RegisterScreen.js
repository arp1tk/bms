"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"

const RegisterScreen = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch("https://bms-t46x.onrender.com/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        await AsyncStorage.setItem("userInfo", JSON.stringify(data))
        Alert.alert("Success", "Registration successful! Redirecting to dashboard.")
        navigation.replace("Dashboard")
      } else {
        Alert.alert("Registration Failed", data.message || "Something went wrong.")
      }
    } catch (error) {
      console.error("Registration error:", error)
      Alert.alert("Error", "Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Your Account</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          autoCapitalize="words"
          placeholder="Enter your name"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Enter your email"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          placeholder="Enter your password"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Register</Text>}
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Already have an account?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          Log in
        </Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 32,
    backgroundColor: "#f8fafc",
  },
  heading: {
    textAlign: "center",
    marginBottom: 25,
    fontSize: 28,
    fontWeight: "600",
    color: "#007bff",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    display: "flex",
    marginBottom: 8,
    fontWeight: "500",
    fontSize: 15,
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    fontSize: 14,
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  button: {
    width: "100%",
    padding: 12,
    backgroundColor: "#007bff",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  footerText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
    color: "#555",
  },
  link: {
    color: "#007bff",
    fontWeight: "500",
  },
})

export default RegisterScreen
