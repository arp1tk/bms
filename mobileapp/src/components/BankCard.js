import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

const BankCard = ({ account, onPress, style }) => {
  const getCardColor = (bankName) => {
    const colors = {
      "State Bank of India": "#2d3748",
      "HDFC Bank": "#1a202c",
      "ICICI Bank": "#374151",
      "Axis Bank": "#111827",
      default: "#1f2937",
    }
    return colors[bankName] || colors.default
  }

  const maskAccountNumber = (number) => {
     if (!number) {
      return "";
    }
  
    return number.match(/.{1,4}/g)?.join(" ") || number;
  }

  return (
    <TouchableOpacity
      style={[styles.bankCard, { backgroundColor: getCardColor(account.bankName) }, style]}
      onPress={() => onPress(account)}
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <View style={styles.chip}></View>
        <Text style={styles.cardType}>DEBIT</Text>
      </View>

      <Text style={styles.cardNumber}>{maskAccountNumber(account.accountNumber)}</Text>

      <View style={styles.cardFooter}>
        <View style={styles.cardInfo}>
          <Text style={styles.cardLabel}>CARD HOLDER</Text>
          <Text style={styles.cardValue}>{account.accountHolderName.toUpperCase()}</Text>
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardLabel}>VALID THRU</Text>
          <Text style={styles.cardValue}>12/28</Text>
        </View>
        <View style={styles.bankLogo}>
          <Text style={styles.bankLogoText}>
            {account.bankName
              .split(" ")
              .map((word) => word.charAt(0))
              .join("")
              .toUpperCase()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  bankCard: {
    width: "100%",
    height: 220, // Adjusted for mobile
    borderRadius: 16,
    padding: 25,
    color: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 5,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  chip: {
    width: 45,
    height: 35,
    backgroundColor: "#ffd700", // Gold color
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardType: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.9)",
    letterSpacing: 1,
  },
  cardNumber: {
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 3,
    color: "white",
    textAlign: "center",
    marginVertical: 10,
    fontFamily: "monospace", // Use a monospace font if available
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  cardInfo: {
    flexDirection: "column",
    gap: 3,
  },
  cardLabel: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.8)",
    letterSpacing: 0.5,
    fontWeight: "500",
  },
  cardValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  bankLogo: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  bankLogoText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
})

export default BankCard
