

import { useState, useEffect } from "react"
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native"


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

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData)
    } else {
      Alert.alert("Validation Error", "Please correct the errors in the form.")
    }
  }

  if (!isOpen) return null

  return (
    <Modal animationType="fade" transparent={true} visible={isOpen} onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.addAccountModal} onStartShouldSetResponder={() => true}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {editingAccount ? "Edit Account" : "Add New Account"}
            </Text>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeBtnText}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>
               Bank Name
              </Text>
              <TextInput
                style={[styles.input, errors.bankName && styles.inputError]}
                value={formData.bankName}
                onChangeText={(text) => setFormData({ ...formData, bankName: text })}
                placeholder="e.g., State Bank of India"
              />
              {errors.bankName && <Text style={styles.errorText}>{errors.bankName}</Text>}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>
                Branch Name
              </Text>
              <TextInput
                style={[styles.input, errors.branchName && styles.inputError]}
                value={formData.branchName}
                onChangeText={(text) => setFormData({ ...formData, branchName: text })}
                placeholder="e.g., Connaught Place"
              />
              {errors.branchName && <Text style={styles.errorText}>{errors.branchName}</Text>}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>
               Account Holder Name
              </Text>
              <TextInput
                style={[styles.input, errors.accountHolderName && styles.inputError]}
                value={formData.accountHolderName}
                onChangeText={(text) => setFormData({ ...formData, accountHolderName: text })}
                placeholder="e.g., John Doe"
              />
              {errors.accountHolderName && <Text style={styles.errorText}>{errors.accountHolderName}</Text>}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>
               Account Number
              </Text>
              <TextInput
                style={[styles.input, errors.accountNumber && styles.inputError]}
                value={formData.accountNumber}
                onChangeText={(text) => setFormData({ ...formData, accountNumber: text.replace(/\D/g, "") })}
                placeholder="e.g., 123456789014"
                keyboardType="numeric"
              />
              {errors.accountNumber && <Text style={styles.errorText}>{errors.accountNumber}</Text>}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>
               IFSC Code
              </Text>
              <TextInput
                style={[styles.input, errors.ifscCode && styles.inputError]}
                value={formData.ifscCode}
                onChangeText={(text) => setFormData({ ...formData, ifscCode: text.toUpperCase() })}
                placeholder="e.g., SBIN0001236"
                autoCapitalize="characters"
              />
              {errors.ifscCode && <Text style={styles.errorText}>{errors.ifscCode}</Text>}
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} disabled={loading}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.submitBtnText}>{editingAccount ? "Update Account" : "Add Account"}</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  addAccountModal: {
    backgroundColor: "white",
    borderRadius: 16,
    width: "100%",
    maxWidth: 500,
    maxHeight: "90%",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 60,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    backgroundColor: "#fafafa",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  closeBtn: {
    width: 32,
    height: 32,
    backgroundColor: "#f1f5f9",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  closeBtnText: {
    fontSize: 20,
    color: "#64748b",
  },
  modalContent: {
    padding: 25,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    fontWeight: "600",
    color: "#374151",
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: "#f1f5f9",
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#fafafa",
    color: "#1a1a1a",
  },
  inputError: {
    borderColor: "#ef4444",
    backgroundColor: "#fef2f2",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: 4,
  },
  modalActions: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "flex-end",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  cancelBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: "#e2e8f0",
    backgroundColor: "white",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelBtnText: {
    color: "#374151",
    fontWeight: "600",
    fontSize: 14,
  },
  submitBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  submitBtnText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
})

export default AddAccountModal
