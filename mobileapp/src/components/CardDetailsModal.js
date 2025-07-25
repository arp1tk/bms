import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native"


const CardDetailsModal = ({ account, isOpen, onClose, onEdit, onDelete }) => {
  if (!isOpen || !account) return null

  const maskAccountNumber = (number) => {
    if (!number || number.length < 4) return number
    return number.slice(0, 4) + " •••• •••• " + number.slice(-4)
  }

  return (
    <Modal animationType="fade" transparent={true} visible={isOpen} onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.cardDetailsModal} onStartShouldSetResponder={() => true}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Account Details</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeBtnText}>×</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <View style={styles.detailSection}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>
                  Bank Name
                </Text>
                <Text style={styles.detailValue}>{account.bankName}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>
                  Branch Name
                </Text>
                <Text style={styles.detailValue}>{account.branchName}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>
                   Account Holder
                </Text>
                <Text style={styles.detailValue}>{account.accountHolderName}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>
                   Account Number
                </Text>
                <Text style={styles.detailValue}>{account.accountNumber}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>
                 IFSC Code
                </Text>
                <Text style={styles.detailValue}>{account.ifscCode}</Text>
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.editBtn} onPress={() => onEdit(account)}>
               
                <Text style={styles.btnText}>Edit Account</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(account._id)}>
               
                <Text style={styles.btnText}>Delete Account</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  cardDetailsModal: {
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
  detailSection: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fafafa",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#f1f5f9",
    marginBottom: 10,
  },
  detailLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    fontWeight: "600",
    color: "#64748b",
    fontSize: 14,
  },
  detailValue: {
    fontWeight: "600",
    color: "#1a1a1a",
    fontSize: 15,
  },
  modalActions: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "flex-end",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#1a1a1a",
  },
  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#ef4444",
  },
  btnText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
})

export default CardDetailsModal
