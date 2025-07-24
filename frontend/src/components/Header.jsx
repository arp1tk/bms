"use client"

const Header = ({ username, onLogout }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo">
            <div className="logo-icon">B</div>
            <span className="logo-text">BankPro</span>
          </div>
          <nav className="nav-tabs">
            <button className="nav-tab active">
              <span className="nav-icon">■</span>
              Dashboard
            </button>
            <button className="nav-tab">
              <span className="nav-icon">⊞</span>
              Accounts
            </button>
            <button className="nav-tab">
              <span className="nav-icon">↗</span>
              Transfers
            </button>
            <button className="nav-tab">
              <span className="nav-icon">📊</span>
              Analytics
            </button>
            <button className="nav-tab">
              <span className="nav-icon">⚙</span>
              Settings
            </button>
          </nav>
        </div>
        <div className="header-right">
          <button className="notification-btn">
            <span className="notification-icon">🔔</span>
          </button>
          <div className="user-menu">
            <div className="user-avatar">{username?.charAt(0)?.toUpperCase()}</div>
            <button className="logout-btn" onClick={onLogout}>
              <span className="logout-icon">→</span>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
