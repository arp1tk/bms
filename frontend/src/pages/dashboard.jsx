

import { useState, useEffect } from "react"
import Header from "../components/Header"
import CardCarousel from "../components/CardCarousel"
import CardDetailsModal from "../components/CardDetailsModal"
import AddAccountModal from "../components/AddAccountModal"
import "./Dashboard.css"

const Dashboard = () => {
  const [bankAccounts, setBankAccounts] = useState([])
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingAccount, setEditingAccount] = useState(null)
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const storedUsernameInfo = JSON.parse(localStorage.getItem("userInfo") || "User")
    const storedUsername = storedUsernameInfo.name;
    setUsername(storedUsername)
    fetchBankAccounts()
  }, [])
  const userInfoString =JSON.parse(localStorage.getItem("userInfo") || "User")
  const fetchBankAccounts = async () => {
    try {
      setLoading(true)
    
      const userId = userInfoString._id;
      if (!userId) return

      const response = await fetch(`http://localhost:5000/api/users/getBank?userId=${userId}`)
      if (response.ok) {
        const data = await response.json()
        setBankAccounts(data)
      }
    } catch (error) {
      console.error("Error fetching bank accounts:", error)
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
    if (window.confirm("Are you sure you want to delete this account?")) {
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:5000/api/users/deleteBank/${accountId}`, {
          method: "DELETE",
        })

        if (response.ok) {
          await fetchBankAccounts()
          setShowDetailsModal(false)
        }
      } catch (error) {
        console.error("Error deleting account:", error)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleSubmitAccount = async (formData) => {
    try {
      setLoading(true)
      const userId = userInfoString._id;
      const payload = { userId, ...formData }

      let response
      if (editingAccount) {
        response = await fetch(`http://localhost:5000/api/users/updateBank/${editingAccount._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      } else {
        response = await fetch("http://localhost:5000/api/users/addBank", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      }

      if (response.ok) {
        await fetchBankAccounts()
        setShowAddModal(false)
        setEditingAccount(null)
      }
    } catch (error) {
      console.error("Error saving account:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = "/login"
  }

  return (
    <div className="dashboard">
     <div style={{
        display: "flex"
     }}>
        <h1>Bank Management System</h1>
         <button className="logout-btn" onClick={handleLogout}>
              <span className="logout-icon">→</span>
              Logout
            </button>
     </div>

      <main className="main-content">
        <div className="welcome-section">
          <h1>Welcome back, {username}</h1>
          <p>Manage your bank accounts with ease and security</p>
        </div>

        <div className="cards-section">
          <CardCarousel accounts={bankAccounts} onCardClick={handleCardClick} onAddCard={handleAddAccount} />
        </div>

        {loading && (
          <div className="loading-overlay">
            <div className="loading-spinner">
              <div className="spinner"></div>
              <span>Loading...</span>
            </div>
          </div>
        )}
      </main>

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
    </div>
  )
}

export default Dashboard
