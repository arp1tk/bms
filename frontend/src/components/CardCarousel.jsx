"use client"

import { useState } from "react"
import BankCard from "./BankCard"

const CardCarousel = ({ accounts, onCardClick, onAddCard }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % accounts.length)
  }

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + accounts.length) % accounts.length)
  }

  if (accounts.length === 0) {
    return (
      <div className="empty-cards">
        <div className="add-card-placeholder" onClick={onAddCard}>
          <div className="add-icon">+</div>
          <div className="add-text">Add Your First Bank Account</div>
          <div className="add-subtitle">Connect your bank account to get started</div>
        </div>
      </div>
    )
  }

  return (
    <div className="card-carousel">
      <div className="cards-stack">
        {accounts.map((account, index) => {
          if (index !== currentIndex) return null

          return (
            <BankCard
              key={account._id}
              account={account}
              index={index}
              isActive={true}
              onClick={() => onCardClick(account)}
              style={{
                transform: `scale(1)`,
                opacity: 1,
                zIndex: 100,
                pointerEvents: "auto",
                display: "flex",
              }}
            />
          )
        })}
      </div>

      {accounts.length > 1 && (
        <div className="carousel-controls">
          <button className="control-btn" onClick={prevCard}>
            ‹
          </button>
          <div className="card-indicators">
            {accounts.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
          <button className="control-btn" onClick={nextCard}>
            ›
          </button>
        </div>
      )}

      <div className="card-info-display">
        <div className="card-counter">
          {currentIndex + 1} of {accounts.length}
        </div>
      </div>

      <button className="add-card-btn" onClick={onAddCard}>
        <span className="add-icon">+</span>
        Add New Account
      </button>
    </div>
  )
}

export default CardCarousel
