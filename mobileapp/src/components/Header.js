import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const Header = ({ username, onLogout }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <View style={styles.logoSection}>
            
            <Text style={styles.appTitle}>BMS</Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <View style={styles.userInfo}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>{username?.charAt(0)?.toUpperCase()}</Text>
            </View>
            <Text style={styles.usernameText}>{username}</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
            <Icon name="logout" size={20} color="white" style={styles.logoutIcon} />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3, 
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    minHeight: 70,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoIcon: {
    width: 48,
    height: 48,
    backgroundColor: "#1a1a1a", // Dark background for logo
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  logoText: {
    color: "white",
    fontWeight: "700",
    fontSize: 24,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  userAvatar: {
    width: 36,
    height: 36,
    backgroundColor: "#1a1a1a", // Dark background for avatar
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  userAvatarText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
  usernameText: {
    fontWeight: "600",
    color: "#1a1a1a",
    fontSize: 15,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#dc2626", // Red color for logout
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#dc2626",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  logoutIcon: {
    // Icon color is set directly in the component
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
  // Responsive styles
  "@media (max-width: 768px)": {
    headerContainer: {
      flexDirection: "column",
      alignItems: "stretch",
      padding: 10,
    },
    headerLeft: {
      justifyContent: "center",
      marginBottom: 10,
    },
    headerRight: {
      justifyContent: "space-between",
      width: "100%",
    },
    appTitle: {
      fontSize: 20,
      textAlign: "center",
    },
    logoIcon: {
      width: 40,
      height: 40,
      borderRadius: 10,
    },
    logoText: {
      fontSize: 20,
    },
    userInfo: {
      flex: 1,
      justifyContent: "center",
      marginRight: 10,
    },
    logoutButton: {
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
    logoutButtonText: {
      fontSize: 14,
    },
  },
  "@media (max-width: 480px)": {
    logoutButtonText: {
      display: "none", // Hide text on very small screens
    },
  },
})

export default Header
