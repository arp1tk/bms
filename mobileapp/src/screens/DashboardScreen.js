// This file is updated to handle logout navigation correctly.
"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native" // Import useNavigation

import Header from "../components/Header"
import CardDetailsModal from "../components/CardDetailsModal"
import AddAccountModal from "../components/AddAccountModal"
import BankCardCarousel from "../components/BankCardCarousel"

const DashboardScreen = () => {
  const [bankAccounts, setBankAccounts] = useState([])
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingAccount, setEditingAccount] = useState(null)
  const [username, setUsername] = useState("User")
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation() 

  useEffect(() => {
    const loadUserInfoAndAccounts = async () => {
      try {
        const userInfoString = await AsyncStorage.getItem("userInfo")
        const storedUserInfo = userInfoString ? JSON.parse(userInfoString) : { name: "User" }
        setUsername(storedUserInfo.name || "User")
        fetchBankAccounts()
      } catch (error) {
        console.error("Error loading user info from AsyncStorage:", error)
        setUsername("User")
        fetchBankAccounts()
      }
    }
    loadUserInfoAndAccounts()
  }, [])

  const getUserInfo = async () => {
    try {
      const userInfoString = await AsyncStorage.getItem("userInfo")
      return userInfoString ? JSON.parse(userInfoString) : { _id: "", name: "User" }
    } catch (error) {
      console.error("Error parsing userInfo from AsyncStorage:", error)
      return { _id: "", name: "User" }
    }
  }

  const fetchBankAccounts = async () => {
    try {
      setLoading(true)
      const userInfo = await getUserInfo()
      const userId = userInfo._id

      if (!userId) {
        console.error("No userId found in userInfo")
        return
      }

    
      const response = await fetch(`https://bms-t46x.onrender.com/api/users/getBank?userId=${userId}`)
      if (response.ok) {
        const data = await response.json()
        setBankAccounts(data)
      } else {
        Alert.alert("Error", "Failed to fetch bank accounts.")
      }
    } catch (error) {
      console.error("Error fetching bank accounts:", error)
      Alert.alert("Error", "Network error while fetching accounts.")
    } finally {
      setLoading(false)
    }
  }

  const handleCardClick = (account) => {
    setSelectedAccount(account)
    setShowDetailsModal(true)
  }

  const handleAddAccount = () => {
    setEditingAccount(null)
    setShowAddModal(true)
  }

  const handleEditAccount = (account) => {
    setEditingAccount(account)
    setShowDetailsModal(false)
    setShowAddModal(true)
  }

  const handleDeleteAccount = async (accountId) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this account?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
            setLoading(true)
          
            const response = await fetch(`https://bms-t46x.onrender.com/api/users/deleteBank/${accountId}`, {
              method: "DELETE",
            })

            if (response.ok) {
              await fetchBankAccounts()
              setShowDetailsModal(false)
            } else {
              Alert.alert("Error", "Failed to delete bank account.")
            }
          } catch (error) {
            console.error("Error deleting account:", error)
            Alert.alert("Error", "Network error while deleting account.")
          } finally {
            setLoading(false)
          }
        },
      },
    ])
  }

  const handleSubmitAccount = async (formData) => {
    try {
      setLoading(true)
      const userInfo = await getUserInfo()
      const userId = userInfo._id
      const payload = { userId, ...formData }

      let response
      if (editingAccount) {
     
        response = await fetch(`https://bms-t46x.onrender.com/api/users/updateBank/${editingAccount._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      } else {
      
        response = await fetch("https://bms-t46x.onrender.com/api/users/addBank", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      }

      if (response.ok) {
        await fetchBankAccounts()
        setShowAddModal(false)
        setEditingAccount(null)
      } else {
        Alert.alert("Error", "Failed to save bank account.")
      }
    } catch (error) {
      console.error("Error saving account:", error)
      Alert.alert("Error", "Network error while saving account.")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: async () => {
          try {
            await AsyncStorage.clear()
            navigation.replace("Login") 
          } catch (e) {
            console.error("Error clearing AsyncStorage:", e)
          }
        },
      },
    ])
  }

  return (
    <View style={styles.dashboard}>
      <Header username={username} onLogout={handleLogout} />

      <ScrollView style={styles.mainContent}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome back, {username}!</Text>
          <Text style={styles.welcomeText}>Manage your bank accounts with ease and security</Text>
        </View>

        <View style={styles.cardsSection}>
          <BankCardCarousel accounts={bankAccounts} onCardClick={handleCardClick} onAddCard={handleAddAccount} />
        </View>

        {loading && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingSpinner}>
              <ActivityIndicator size="large" color="#1a1a1a" />
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      <CardDetailsModal
        account={selectedAccount}
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        onEdit={handleEditAccount}
        onDelete={handleDeleteAccount}
      />

      <AddAccountModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleSubmitAccount}
        editingAccount={editingAccount}
        loading={loading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  welcomeSection: {
    marginBottom: 40,
    alignItems: "center",
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 5,
    color: "#1a1a1a",
    letterSpacing: -0.5,
    textAlign: "center",
  },
  welcomeText: {
    fontSize: 18,
    color: "#64748b",
    fontWeight: "400",
    textAlign: "center",
  },
  cardsSection: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 300,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  loadingSpinner: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    alignItems: "center",
    gap: 10,
  },
  loadingText: {
    fontWeight: "600",
    color: "#64748b",
  },
})

export default DashboardScreen
