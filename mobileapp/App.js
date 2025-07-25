"use client"

import { useEffect, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ActivityIndicator, View, StyleSheet } from "react-native"

import LoginScreen from "./src/screens/LoginScreen"
import RegisterScreen from "./src/screens/RegisterScreen"
import DashboardScreen from "./src/screens/DashboardScreen"

const Stack = createNativeStackNavigator()

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [initialRouteName, setInitialRouteName] = useState("Login")

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userInfoString = await AsyncStorage.getItem("userInfo")
        if (userInfoString) {
          setInitialRouteName("Dashboard")
        }
      } catch (e) {
        console.error("Failed to load user info from AsyncStorage", e)
      } finally {
        setIsLoading(false)
      }
    }

    checkLoginStatus()
  }, [])

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1a1a1a" />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
})

export default App
