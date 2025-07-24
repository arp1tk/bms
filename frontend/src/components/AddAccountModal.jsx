"use client"

import { useState, useEffect } from "react"

const AddAccountModal = ({ isOpen, onClose, onSubmit, editingAccount, loading }) => {
  const [formData, setFormData] = useState({
    ifscCode: "",
    branchName: "",
    bankName: "",
    accountNumber: "",
    accountHolderName: "",
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editingAccount) {
      setFormData({
        ifscCode: editingAccount.ifscCode,
        branchName: editingAccount.branchName,
        bankName: editingAccount.bankName,
        accountNumber: editingAccount.accountNumber,
        accountHolderName: editingAccount.accountHolderName,
      })
    } else {
      setFormData({
        ifscCode: "",
        branchName: "",
        bankName: "",
        accountNumber: "",
        accountHolderName: "",
      })
    }
    setErrors({})
  }, [editingAccount, isOpen])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.ifscCode.trim()) {
      newErrors.ifscCode = "IFSC Code is required"
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
      newErrors.ifscCode = "Invalid IFSC Code format"
    }

    if (!formData.branchName.trim()) {
      newErrors.branchName = "Branch Name is required"
    }

    if (!formData.bankName.trim()) {
      newErrors.bankName = "Bank Name is required"
    }

    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = "Account Number is required"
    } else if (!/^\d{9,18}$/.test(formData.accountNumber)) {
      newErrors.accountNumber = "Account Number must be 9-18 digits"
    }

    if (!formData.accountHolderName.trim()) {
      newErrors.accountHolderName = "Account Holder Name is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="add-account-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            <span className="modal-icon">+</span>
            {editingAccount ? "Edit Account" : "Add New Account"}
          </h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-content">
          <div className="form-grid">
            <div className="form-group">
              <label>
                <span className="label-icon">🏦</span>
                Bank Name
              </label>
              <input
                type="text"
                value={formData.bankName}
                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                placeholder="e.g., State Bank of India"
                className={errors.bankName ? "error" : ""}
              />
              {errors.bankName && <span className="error-text">{errors.bankName}</span>}
            </div>

            <div className="form-group">
              <label>
                <span className="label-icon">📍</span>
                Branch Name
              </label>
              <input
                type="text"
                value={formData.branchName}
                onChange={(e) => setFormData({ ...formData, branchName: e.target.value })}
                placeholder="e.g., Connaught Place"
                className={errors.branchName ? "error" : ""}
              />
              {errors.branchName && <span className="error-text">{errors.branchName}</span>}
            </div>

            <div className="form-group">
              <label>
                <span className="label-icon">👤</span>
                Account Holder Name
              </label>
              <input
                type="text"
                value={formData.accountHolderName}
                onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
                placeholder="e.g., John Doe"
                className={errors.accountHolderName ? "error" : ""}
              />
              {errors.accountHolderName && <span className="error-text">{errors.accountHolderName}</span>}
            </div>

            <div className="form-group">
              <label>
                <span className="label-icon">#</span>
                Account Number
              </label>
              <input
                type="text"
                value={formData.accountNumber}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value.replace(/\D/g, "") })}
                placeholder="e.g., 123456789014"
                className={errors.accountNumber ? "error" : ""}
              />
              {errors.accountNumber && <span className="error-text">{errors.accountNumber}</span>}
            </div>

            <div className="form-group full-width">
              <label>
                <span className="label-icon">🔗</span>
                IFSC Code
              </label>
              <input
                type="text"
                value={formData.ifscCode}
                onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })}
                placeholder="e.g., SBIN0001236"
                className={errors.ifscCode ? "error" : ""}
              />
              {errors.ifscCode && <span className="error-text">{errors.ifscCode}</span>}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Saving..." : editingAccount ? "Update Account" : "Add Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddAccountModal
