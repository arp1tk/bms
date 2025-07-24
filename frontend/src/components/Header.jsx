import { use } from "react"

const Header = ({ username, onLogout }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo">
           
            <span className="logo-text">Bank Management System</span>
          </div>
         
        </div>
        <div className="header-right">
         
          <div className="user-menu">
           <h1 >{username}</h1>
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
