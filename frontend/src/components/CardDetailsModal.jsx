"use client"

const CardDetailsModal = ({ account, isOpen, onClose, onEdit, onDelete }) => {
  if (!isOpen || !account) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="card-details-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Account Details</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-content">
          <div className="detail-section">
            <div className="detail-row">
              <span className="detail-label">
                <span className="detail-icon">🏦</span>
                Bank Name
              </span>
              <span className="detail-value">{account.bankName}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">
                <span className="detail-icon">📍</span>
                Branch Name
              </span>
              <span className="detail-value">{account.branchName}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">
                <span className="detail-icon">👤</span>
                Account Holder
              </span>
              <span className="detail-value">{account.accountHolderName}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">
                <span className="detail-icon">#</span>
                Account Number
              </span>
              <span className="detail-value">{account.accountNumber}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">
                <span className="detail-icon">🔗</span>
                IFSC Code
              </span>
              <span className="detail-value">{account.ifscCode}</span>
            </div>
          </div>

          <div className="modal-actions">
            <button className="edit-btn" onClick={() => onEdit(account)}>
              <span className="btn-icon">✏</span>
              Edit Account
            </button>
            <button className="delete-btn" onClick={() => onDelete(account._id)}>
              <span className="btn-icon">🗑</span>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardDetailsModal
