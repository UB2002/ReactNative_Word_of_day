// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useEffect, useState } from "react";
// import { FlatList, Pressable, StyleSheet } from "react-native";
// import { ThemedText } from "../../components/ThemedText";
// import { ThemedView } from "../../components/ThemedView";

// // Constants for AsyncStorage keys
// const STORAGE_KEY = "word_of_day_data";
// const HISTORY_KEY = "word_of_day_history";

// export default function HistoryScreen({ navigation }) {
//   const [wordHistory, setWordHistory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadWordHistory();
//   }, []);

//   // Load word history from AsyncStorage
//   const loadWordHistory = async () => {
//     try {
//       setLoading(true);

//       // Get the current word
//       const currentWordData = await AsyncStorage.getItem(STORAGE_KEY);
//       let currentWord = currentWordData ? JSON.parse(currentWordData) : null;

//       // Get the history array
//       const historyData = await AsyncStorage.getItem(HISTORY_KEY);
//       let historyArray = historyData ? JSON.parse(historyData) : [];

//       // Log all words to the console
//       console.log("Current Word in AsyncStorage (STORAGE_KEY):", currentWord);
//       console.log("Word History in AsyncStorage (HISTORY_KEY):", historyArray);

//       // Add current word to top of history if available and not already there
//       if (currentWord) {
//         const isAlreadyInHistory = historyArray.some(
//           (item) => item.word === currentWord.word
//         );

//         if (!isAlreadyInHistory) {
//           // Add timestamp to track when the word was viewed
//           currentWord.timestamp = new Date().toISOString();
//           historyArray.unshift(currentWord);

//           // Save the updated history
//           await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(historyArray));
//         }
//       }

//       setWordHistory(historyArray);
//     } catch (error) {
//       console.error("Error loading word history:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Clear all history
//   const clearHistory = async () => {
//     try {
//       await AsyncStorage.removeItem(HISTORY_KEY);
//       setWordHistory([]);
//     } catch (error) {
//       console.error("Error clearing history:", error);
//     }
//   };

//   // Format the date for display
//   const formatDate = (dateString) => {
//     if (!dateString) return "Unknown date";

//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   // Render a single word item
//   const renderWordItem = ({ item, index }) => (
//     <ThemedView style={styles.wordCard}>
//       <ThemedView style={styles.wordHeader}>
//         <ThemedText type="default" style={styles.wordText}>
//           {item.word}
//         </ThemedText>
//         <ThemedText type="default" style={styles.partOfSpeech}>
//           {item.partOfSpeech}
//         </ThemedText>
//       </ThemedView>

//       <ThemedView style={styles.divider} />

//       <ThemedText type="default" style={styles.definition}>
//         {item.definition}
//       </ThemedText>

//       <ThemedText type="default" style={styles.example}>
//         "{item.example}"
//       </ThemedText>

//       {item.timestamp && (
//         <ThemedText type="default" style={styles.timestamp}>
//           Viewed on {formatDate(item.timestamp)}
//         </ThemedText>
//       )}
//     </ThemedView>
//   );

//   return (
//     <ThemedView style={styles.container}>
//       <ThemedView style={styles.header}>
//         <ThemedText type="title" style={styles.headerText}>
//           Word History
//         </ThemedText>
//       </ThemedView>

//       {loading ? (
//         <ThemedView style={styles.loadingContainer}>
//           <ThemedText type="default">Loading word history...</ThemedText>
//         </ThemedView>
//       ) : wordHistory.length === 0 ? (
//         <ThemedView style={styles.emptyContainer}>
//           <ThemedText type="default" style={styles.emptyText}>
//             No word history found.
//           </ThemedText>
//           <ThemedText type="default" style={styles.emptySubText}>
//             Words will appear here once you've viewed them.
//           </ThemedText>
//         </ThemedView>
//       ) : (
//         <>
//           <FlatList
//             data={wordHistory}
//             renderItem={renderWordItem}
//             keyExtractor={(item, index) => `${item.word}-${index}`}
//             contentContainerStyle={styles.listContainer}
//             showsVerticalScrollIndicator={false}
//           />

//           <ThemedView style={styles.buttonContainer}>
//             <Pressable style={styles.clearButton} onPress={clearHistory}>
//               <ThemedText type="default" style={styles.clearButtonText}>
//                 Clear History
//               </ThemedText>
//             </Pressable>
//           </ThemedView>
//         </>
//       )}
//     </ThemedView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   header: {
//     marginBottom: 16,
//     alignItems: "center",
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#E1E1E1",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   emptyText: {
//     fontSize: 18,
//     color: "#E1E1E1",
//     marginBottom: 8,
//   },
//   emptySubText: {
//     fontSize: 14,
//     color: "#888888",
//     textAlign: "center",
//   },
//   listContainer: {
//     paddingBottom: 80,
//   },
//   wordCard: {
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//     borderColor: "gray",
//     borderWidth: 0.1,
//   },
//   wordHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   wordText: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#8B5CF6",
//   },
//   partOfSpeech: {
//     fontSize: 14,
//     fontStyle: "italic",
//     color: "#8B5CF6",
//     opacity: 0.9,
//   },
//   divider: {
//     height: 1,
//     width: "100%",
//     backgroundColor: "#333",
//     marginVertical: 12,
//   },
//   definition: {
//     fontSize: 16,
//     color: "#CCCCCC",
//     marginBottom: 12,
//     lineHeight: 22,
//   },
//   example: {
//     fontSize: 14,
//     fontStyle: "italic",
//     color: "#AAAAAA",
//     marginBottom: 12,
//     lineHeight: 20,
//   },
//   timestamp: {
//     fontSize: 12,
//     color: "#666666",
//     textAlign: "right",
//     marginTop: 8,
//   },
//   buttonContainer: {
//     position: "absolute",
//     bottom: 24,
//     left: 0,
//     right: 0,
//     alignItems: "center",
//   },
//   clearButton: {
//     backgroundColor: "#6B46C1",
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     width: "50%",
//     alignItems: "center",
//   },
//   clearButtonText: {
//     color: "#FFFFFF",
//     fontWeight: "bold",
//   },
// });

// HistoryScreen.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";

// Constants for AsyncStorage keys
const HISTORY_KEY = "word_of_day_history";

export default function HistoryScreen() {
  const [wordHistory, setWordHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWordHistory();
  }, []);

  const loadWordHistory = async () => {
    try {
      setLoading(true);
      const historyData = await AsyncStorage.getItem(HISTORY_KEY);
      const historyArray = historyData ? JSON.parse(historyData) : [];
      setWordHistory(historyArray);
    } catch (error) {
      console.error("Error loading word history:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem(HISTORY_KEY);
      setWordHistory([]);
    } catch (error) {
      console.error("Error clearing history:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderWordItem = ({ item }) => (
    <ThemedView style={styles.wordCard}>
      <ThemedView style={styles.wordHeader}>
        <ThemedText type="default" style={styles.wordText}>
          {item.word}
        </ThemedText>
        <ThemedText type="default" style={styles.partOfSpeech}>
          {item.partOfSpeech}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.divider} />
      <ThemedText type="default" style={styles.definition}>
        {item.definition}
      </ThemedText>
      <ThemedText type="default" style={styles.example}>
        "{item.example}"
      </ThemedText>
      {item.timestamp && (
        <ThemedText type="default" style={styles.timestamp}>
          Viewed on {formatDate(item.timestamp)}
        </ThemedText>
      )}
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerText}>
          Word History
        </ThemedText>
      </ThemedView>

      {loading ? (
        <ThemedView style={styles.loadingContainer}>
          <ThemedText type="default">Loading word history...</ThemedText>
        </ThemedView>
      ) : wordHistory.length === 0 ? (
        <ThemedView style={styles.emptyContainer}>
          <ThemedText type="default" style={styles.emptyText}>
            No word history found.
          </ThemedText>
          <ThemedText type="default" style={styles.emptySubText}>
            Words will appear here once you've viewed them.
          </ThemedText>
        </ThemedView>
      ) : (
        <>
          <FlatList
            data={wordHistory}
            renderItem={renderWordItem}
            keyExtractor={(item, index) => `${item.word}-${index}`}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
          <ThemedView style={styles.buttonContainer}>
            <Pressable style={styles.clearButton} onPress={clearHistory}>
              <ThemedText type="default" style={styles.clearButtonText}>
                Clear History
              </ThemedText>
            </Pressable>
          </ThemedView>
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { marginBottom: 16, alignItems: "center" },
  headerText: { fontSize: 24, fontWeight: "bold", color: "#E1E1E1" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 18, color: "#E1E1E1", marginBottom: 8 },
  emptySubText: { fontSize: 14, color: "#888888", textAlign: "center" },
  listContainer: { paddingBottom: 80 },
  wordCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    borderColor: "gray",
    borderWidth: 0.1,
  },
  wordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  wordText: { fontSize: 22, fontWeight: "bold", color: "#8B5CF6" },
  partOfSpeech: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#8B5CF6",
    opacity: 0.9,
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "#333",
    marginVertical: 12,
  },
  definition: {
    fontSize: 16,
    color: "#CCCCCC",
    marginBottom: 12,
    lineHeight: 22,
  },
  example: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#AAAAAA",
    marginBottom: 12,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 12,
    color: "#666666",
    textAlign: "right",
    marginTop: 8,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  clearButton: {
    backgroundColor: "#6B46C1",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "50%",
    alignItems: "center",
  },
  clearButtonText: { color: "#FFFFFF", fontWeight: "bold" },
});
