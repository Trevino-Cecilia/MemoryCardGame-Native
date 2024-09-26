import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { every, shuffle } from "lodash";
import { LinearGradient } from "expo-linear-gradient";

const animals = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯"];

// Constants
const PAIR_LENGTH = 2;

// Components
const Counter = ({ counter }) => (
  <View style={styles.counter}>
    <Text style={styles.counterText}>Counter: {counter}</Text>
  </View>
);

const Rules = () => (
  <View style={styles.rules}>
    <Text style={styles.rulesText}>
      Rules: Match all the animal pairs to win!
    </Text>
  </View>
);

// Main App
export default function MyApp() {
  const [game, setGame] = useState(shuffle([...animals, ...animals]));
  const [currentPair, setCurrentPair] = useState([]);
  const [counter, setCounter] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);

  const handleCardClick = useCallback(
    (index) => {
      // Check if the clicked card is already in the currentPair
      if (!currentPair.includes(index)) {
        setCurrentPair((prevPair) => [...prevPair, index]);

        // Check if the clicked card is already in the clickedCards
        if (!clickedCards.includes(index)) {
          setClickedCards((prevCards) => [...prevCards, index]);
        }
      }
    },
    [currentPair, clickedCards]
  );

  useEffect(() => {
    if (currentPair.length === PAIR_LENGTH) {
      // Check if the pair matches
      if (game[currentPair[0]] === game[currentPair[1]]) {
        setGame((prevGame) =>
          prevGame.map((item, i) =>
            i === currentPair[0] || i === currentPair[1] ? null : item
          )
        );
        // Increment the counter when a pair is found
        setCounter((prevCounter) => prevCounter + 1);
      }
      // Reset the currentPair
      setCurrentPair([]);
    }

    if (every(game, (item) => item === null)) {
      Alert.alert("Yay you won!");
    }
  }, [currentPair, game]);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handleCardClick(index)}
    >
      <Text style={styles.card}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={["rgba(34,193,195,1)", "rgba(253,187,45,1)"]}
      style={styles.app}
    >
      <View style={styles.app}>
        <Counter counter={counter} />
        <Rules />
        <View style={styles.listContainer}>
          <FlatList
            data={game}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={4}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginLeft: 70,
  },
  card: {
    fontSize: 30,
    margin: 10,
  },
  counter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: "absolute",
    top: 30,
    bottom: 0,
    left: 130,
    right: 0,
    backgroundColor: "#fdbb2d",
    alignItems: "center",
    justifyContent: "center",
  },
  counterText: {
    fontSize: 20,
  },
  rules: {
    width: 300,
    height: 100,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#49c0a8",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  rulesText: {
    fontSize: 20,
  },
});
