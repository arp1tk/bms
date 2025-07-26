
import { useState, useEffect } from "react"
import "./adminDashboard.css"
import Header from "../components/Header"

const AdminDashboard = () => {
  const [allAccounts, setAllAccounts] = useState([])
  const [filteredAccounts, setFilteredAccounts] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // Search state
  const [searchQuery, setSearchQuery] = useState("")
  const [searchBy, setSearchBy] = useState("username")

  const searchOptions = [
    { value: "username", label: "Username" },
    { value: "bankName", label: "Bank Name" },
    { value: "ifscCode", label: "IFSC Code" },
    { value: "accountHolderName", label: "Account Holder" },
    { value: "branchName", label: "Branch Name" },
  ]

  useEffect(() => {
    fetchAllAccounts()
  }, [])

  const fetchAllAccounts = async () => {
    try {
      setLoading(true)
      const response = await fetch("https://bms-t46x.onrender.com/api/users/all")
      if (response.ok) {
        const data = await response.json()
        setAllAccounts(data.accounts)
      }
    } catch (error) {
      console.error("Error fetching accounts:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    try {
      setSearchLoading(true)
      const queryParams = new URLSearchParams()
      queryParams.append(searchBy, searchQuery.trim())

      const response = await fetch(`https://bms-t46x.onrender.com/api/users/search?${queryParams.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setFilteredAccounts(data.accounts)
        setShowResults(true)
      }
    } catch (error) {
      console.error("Error searching accounts:", error)
    } finally {
      setSearchLoading(false)
    }
  }

  const handleShowAll = () => {
    setFilteredAccounts(allAccounts)
    setShowResults(true)
    setSearchQuery("")
  }

  const handleAccountClick = (account) => {
    setSelectedAccount(account)
    setShowDetailsModal(true)
  }

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = "/"
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

   const formatAccountNumber = (number) => {
    if (!number) {
      return "";
    }
  
    return number.match(/.{1,4}/g)?.join(" ") || number;
  };
    const storedUsernameInfo = JSON.parse(localStorage.getItem("userInfo") || "User")
    const storedUsername = storedUsernameInfo.name;
  return (
    <div className="admin-dashboard">
   <Header username={storedUsername} onLogout={handleLogout} />
     

      <main className="admin-main">
        {/* Stats */}
        <div className="stats-section">
          <div className="stat-card">
            <h3>Total Accounts</h3>
            <p className="stat-number">{allAccounts.length}</p>
          </div>
        
        </div>

        {/* Search Section */}
        <div className="search-section">
          <h2>Search Bank Accounts</h2>
          <div className="search-controls">
            <div className="search-input-group">
              <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)} className="search-dropdown">
                {searchOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search by ${searchOptions.find((opt) => opt.value === searchBy)?.label.toLowerCase()}...`}
                className="search-input"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <div className="search-buttons">
              <button className="search-btn" onClick={handleSearch} disabled={searchLoading || !searchQuery.trim()}>
                {searchLoading ? "Searching..." : "Search"}
              </button>
              <button className="show-all-btn" onClick={handleShowAll} disabled={loading}>
                Show All
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {showResults && (
          <div className="results-section">
            <div className="results-header">
              <h2>Results ({filteredAccounts.length} accounts)</h2>
            </div>

            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <span>Loading accounts...</span>
              </div>
            ) : filteredAccounts.length === 0 ? (
              <div className="empty-state">
                <h3>No accounts found</h3>
                <p>Try a different search term</p>
              </div>
            ) : (
              <div className="accounts-grid">
                {filteredAccounts.map((account) => (
                  <div key={account._id} className="account-card" onClick={() => handleAccountClick(account)}>
                    <div className="card-header">
                      <div className="user-info">
                        <div className="user-avatar">
                          {account.user ? account.user.name.charAt(0).toUpperCase() : "?"}
                        </div>
                        <div className="user-details">
                          <div className="user-name">{account.user ? account.user.name : "Unknown User"}</div>
                          <div className="user-email">{account.user ? account.user.email : "No email"}</div>
                        </div>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="bank-info">
                        <div className="bank-name">{account.bankName}</div>
                        <div className="branch-name">{account.branchName}</div>
                      </div>
                      <div className="account-info">
                        <div className="account-holder">{account.accountHolderName}</div>
                        <div className="account-number">{formatAccountNumber(account.accountNumber)}</div>
                        <div className="ifsc-code">{account.ifscCode}</div>
                      </div>
                      <div className="card-footer">
                        <div className="created-date">Created: {formatDate(account.createdAt)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Account Details Modal */}
      {showDetailsModal && selectedAccount && (
        <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
          <div className="account-details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Account Details</h2>
              <button className="close-btn" onClick={() => setShowDetailsModal(false)}>
                ×
              </button>
            </div>

            <div className="modal-content">
              <div className="detail-section">
                <h3>User Information</h3>
                <div className="detail-item">
                  <span className="detail-label">Name</span>
                  <span className="detail-value">
                    {selectedAccount.user ? selectedAccount.user.name : "Unknown User"}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email</span>
                  <span className="detail-value">{selectedAccount.user ? selectedAccount.user.email : "No email"}</span>
                </div>
              </div>

              <div className="detail-section">
                <h3>Bank Information</h3>
                <div className="detail-item">
                  <span className="detail-label">Bank Name</span>
                  <span className="detail-value">{selectedAccount.bankName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Branch Name</span>
                  <span className="detail-value">{selectedAccount.branchName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">IFSC Code</span>
                  <span className="detail-value">{selectedAccount.ifscCode}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Account Holder</span>
                  <span className="detail-value">{selectedAccount.accountHolderName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Account Number</span>
                  <span className="detail-value">{selectedAccount.accountNumber}</span>
                </div>
              </div>

              <div className="detail-section">
                <h3>Timestamps</h3>
                <div className="detail-item">
                  <span className="detail-label">Created At</span>
                  <span className="detail-value">{formatDate(selectedAccount.createdAt)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Updated At</span>
                  <span className="detail-value">{formatDate(selectedAccount.updatedAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
