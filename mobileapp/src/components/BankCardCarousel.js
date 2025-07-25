
import { useState, useRef } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native"
import BankCard from "./BankCard"


const { width } = Dimensions.get("window")
const CARD_WIDTH = width * 0.8 
const CARD_SPACING = 20 

const BankCardCarousel = ({ accounts, onCardClick, onAddCard }) => {
  const scrollViewRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x
    const newIndex = Math.round(contentOffsetX / (CARD_WIDTH + CARD_SPACING))
    setCurrentIndex(newIndex)
  }

  const scrollToCard = (index) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * (CARD_WIDTH + CARD_SPACING),
        animated: true,
      })
    }
  }

  if (accounts.length === 0) {
    return (
      <TouchableOpacity style={styles.addCardPlaceholder} onPress={onAddCard}>
      

        <Text style={styles.addText}>Add Your First Bank Account</Text>
        <Text style={styles.addSubtitle}>Connect your bank account to get started</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.cardsScrollView}
      >
        {accounts.map((account, index) => (
          <BankCard key={account._id} account={account} onPress={onCardClick} style={styles.cardWrapper} />
        ))}
      </ScrollView>

      {accounts.length > 1 && (
        <View style={styles.carouselControls}>
          <TouchableOpacity
            style={styles.controlBtn}
            onPress={() => scrollToCard(currentIndex - 1)}
            disabled={currentIndex === 0}
          >
          <Text style={{ fontSize: 24, color: '#64748b' }}>{'\u25C0'}</Text>  // ◀
          </TouchableOpacity>
          <View style={styles.cardIndicators}>
            {accounts.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.indicator, index === currentIndex && styles.indicatorActive]}
                onPress={() => scrollToCard(index)}
              />
            ))}
          </View>
          <TouchableOpacity
            style={styles.controlBtn}
            onPress={() => scrollToCard(currentIndex + 1)}
            disabled={currentIndex === accounts.length - 1}
          >
      <Text style={{ fontSize: 24, color: '#64748b' }}>{'\u25B6'}</Text> 
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.cardInfoDisplay}>
        <Text style={styles.cardCounter}>
          {currentIndex + 1} of {accounts.length}
        </Text>
      </View>

      <TouchableOpacity style={styles.addCardBtn} onPress={onAddCard}>
       
        <Text style={styles.addCardBtnText}>Add New Account</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  carouselContainer: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  cardsScrollView: {
    paddingHorizontal: (width - CARD_WIDTH) / 6, 
    alignItems: "center", 
  },
  cardWrapper: {
    width: CARD_WIDTH,
    marginHorizontal: CARD_SPACING / 2,
  },
  carouselControls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    marginTop: 15,
  },
  controlBtn: {
    width: 44,
    height: 44,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardIndicators: {
    flexDirection: "row",
    gap: 5,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#cbd5e1",
  },
  indicatorActive: {
    backgroundColor: "#1a1a1a",
    transform: [{ scale: 1.2 }],
  },
  cardInfoDisplay: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  cardCounter: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  addCardBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#cbd5e1",
    borderStyle: "dashed",
    borderRadius: 12,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  addIconBtn: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#64748b",
  },
  addCardBtnText: {
    color: "#64748b",
    fontWeight: "600",
    fontSize: 15,
  },
  addCardPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: "100%",
    maxWidth: 400,
    height: 220,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#cbd5e1",
    borderStyle: "dashed",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    alignSelf: "center",
  },
  addIcon: {
    fontSize: 60,
    fontWeight: "300",
    color: "#cbd5e1",
  },
  addText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    textAlign: "center",
  },
  addSubtitle: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
  },
})

export default BankCardCarousel
