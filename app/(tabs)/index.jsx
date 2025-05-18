// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useEffect, useState } from "react";
// import { Pressable, StyleSheet } from "react-native";
// import { ThemedText } from "../../components/ThemedText";
// import { ThemedView } from "../../components/ThemedView";

// // Import the JSON file
// import words from "../../word_of_day_1000.json";

// // Constants for AsyncStorage keys
// const STORAGE_KEY = "word_of_day_data";

// export default function HomeScreen() {
//   const [word, setWord] = useState(null);
//   const [fadeIn, setFadeIn] = useState(false);

//   // Load word from AsyncStorage or select a new one if not available
//   useEffect(() => {
//     const loadWord = async () => {
//       try {
//         // Try to get the stored word first
//         const storedWordData = await AsyncStorage.getItem(STORAGE_KEY);

//         if (storedWordData) {
//           // If we have a stored word, parse and use it
//           const parsedData = JSON.parse(storedWordData);
//           setWord(parsedData);
//         } else {
//           // Otherwise select a new random word
//           getNewWord();
//         }

//         // Add a small delay before fading in content for a nice effect
//         const timer = setTimeout(() => {
//           setFadeIn(true);
//         }, 300);

//         return () => clearTimeout(timer);
//       } catch (error) {
//         console.error("Error loading word from AsyncStorage:", error);
//         // Fallback to random word if loading fails
//         getNewWord();
//       }
//     };

//     loadWord();
//   }, []);

//   // Function to save word to AsyncStorage
//   const saveWordToStorage = async (wordData) => {
//     try {
//       await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(wordData));
//     } catch (error) {
//       console.error("Error saving word to AsyncStorage:", error);
//     }
//   };

//   // Function to get a new random word
//   const getNewWord = () => {
//     setFadeIn(false);

//     setTimeout(() => {
//       const randomWord = words[Math.floor(Math.random() * words.length)];
//       setWord(randomWord);
//       // Save the new word to AsyncStorage
//       saveWordToStorage(randomWord);
//       setFadeIn(true);
//     }, 300);
//   };

//   return (
//     <ThemedView style={styles.container}>
//       {/* Header */}
//       <ThemedView style={styles.header}>
//         <ThemedText type="title" style={styles.headerText}>
//           Word of the Day
//         </ThemedText>
//       </ThemedView>

//       {/* Card Content */}
//       {word && (
//         <ThemedView
//           style={[styles.card, fadeIn ? styles.fadeIn : styles.fadeOut]}
//         >
//           {/* Word */}
//           <ThemedView style={styles.wordContainer}>
//             <ThemedText type="default" style={styles.word}>
//               {word.word}
//             </ThemedText>
//             <ThemedText type="default" style={styles.partOfSpeech}>
//               {word.partOfSpeech}
//             </ThemedText>
//           </ThemedView>

//           {/* Divider */}
//           <ThemedView style={styles.divider} />

//           {/* Definition */}
//           <ThemedView style={styles.section}>
//             <ThemedText type="default" style={styles.sectionTitle}>
//               📚 Definition
//             </ThemedText>
//             <ThemedText type="default" style={styles.definition}>
//               {word.definition}
//             </ThemedText>
//           </ThemedView>

//           {/* Example */}
//           <ThemedView style={styles.section}>
//             <ThemedText type="default" style={styles.sectionTitle}>
//               ✍️ Example
//             </ThemedText>
//             <ThemedText type="default" style={styles.example}>
//               "{word.example}"
//             </ThemedText>
//           </ThemedView>
//         </ThemedView>
//       )}

//       {/* New Word Button */}
//       <ThemedView style={styles.buttonContainer}>
//         <Pressable style={styles.button} onPress={getNewWord}>
//           <ThemedText type="default" style={styles.buttonText}>
//             New Word
//           </ThemedText>
//         </Pressable>
//       </ThemedView>
//     </ThemedView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   header: {
//     marginBottom: 24,
//     width: "100%",
//   },
//   headerText: {
//     fontSize: 28,
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "#E1E1E1",
//   },
//   card: {
//     width: "100%",
//     maxWidth: 500,
//     borderRadius: 16,
//     padding: 24,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   wordContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   word: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "#8B5CF6", // Purple for emphasis
//     marginBottom: 5,
//   },
//   partOfSpeech: {
//     fontSize: 16,
//     color: "#8B5CF6", // Match the word color
//     fontStyle: "italic",
//     opacity: 0.9,
//   },
//   // divider: {
//   //   height: 1,
//   //   width: "100%",
//   //   backgroundColor: "#333",
//   //   marginVertical: 16,
//   // },
//   section: {
//     marginBottom: 16,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 8,
//     color: "#E1E1E1",
//   },
//   definition: {
//     fontSize: 18,
//     lineHeight: 24,
//     color: "#CCCCCC",
//   },
//   example: {
//     fontSize: 16,
//     fontStyle: "italic",
//     lineHeight: 22,
//     color: "#AAAAAA",
//   },
//   buttonContainer: {
//     marginTop: 24,
//     width: "100%",
//     maxWidth: 500,
//     alignItems: "center",
//   },
//   button: {
//     backgroundColor: "#8B5CF6", // Purple to match word color
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     alignItems: "center",
//     width: "50%",
//   },
//   buttonText: {
//     color: "#FFFFFF",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   fadeIn: {
//     opacity: 1,
//   },
//   fadeOut: {
//     opacity: 0,
//   },
// });

// HomeScreen.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";

// Import the JSON file
import words from "../../word_of_day_1000.json";

// Constants for AsyncStorage keys
const STORAGE_KEY = "word_of_day_data";
const HISTORY_KEY = "word_of_day_history";

export default function HomeScreen() {
  const [word, setWord] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const loadWord = async () => {
      try {
        const storedWordData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedWordData) {
          setWord(JSON.parse(storedWordData));
        } else {
          getNewWord();
        }
        const timer = setTimeout(() => setFadeIn(true), 300);
        return () => clearTimeout(timer);
      } catch (error) {
        console.error("Error loading word from AsyncStorage:", error);
        getNewWord();
      }
    };
    loadWord();
  }, []);

  // Save word to AsyncStorage and update history only if unique
  const saveWordToStorage = async (wordData) => {
    try {
      // Save current word
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(wordData));

      // Load existing history
      const historyData = await AsyncStorage.getItem(HISTORY_KEY);
      const historyArray = historyData ? JSON.parse(historyData) : [];

      // Check uniqueness by word
      const exists = historyArray.some((item) => item.word === wordData.word);
      if (!exists) {
        const entry = { ...wordData, timestamp: new Date().toISOString() };
        historyArray.unshift(entry);
        await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(historyArray));
      }
    } catch (error) {
      console.error("Error saving word or updating history:", error);
    }
  };

  // Function to get a new random word
  const getNewWord = () => {
    setFadeIn(false);
    setTimeout(() => {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setWord(randomWord);
      saveWordToStorage(randomWord);
      setFadeIn(true);
    }, 300);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerText}>
          Word of the Day
        </ThemedText>
      </ThemedView>

      {word && (
        <ThemedView
          style={[styles.card, fadeIn ? styles.fadeIn : styles.fadeOut]}
        >
          <ThemedView style={styles.wordContainer}>
            <ThemedText type="default" style={styles.word}>
              {word.word}
            </ThemedText>
            <ThemedText type="default" style={styles.partOfSpeech}>
              {word.partOfSpeech}
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.divider} />

          <ThemedView style={styles.section}>
            <ThemedText type="default" style={styles.sectionTitle}>
              📚 Definition
            </ThemedText>
            <ThemedText type="default" style={styles.definition}>
              {word.definition}
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.section}>
            <ThemedText type="default" style={styles.sectionTitle}>
              ✍️ Example
            </ThemedText>
            <ThemedText type="default" style={styles.example}>
              "{word.example}"
            </ThemedText>
          </ThemedView>
        </ThemedView>
      )}

      <ThemedView style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={getNewWord}>
          <ThemedText type="default" style={styles.buttonText}>
            New Word
          </ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: { marginBottom: 24, width: "100%" },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#E1E1E1",
  },
  card: {
    width: "100%",
    maxWidth: 500,
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: "gray",
  },
  wordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  word: { fontSize: 32, fontWeight: "bold", color: "#8B5CF6", marginBottom: 5 },
  partOfSpeech: {
    fontSize: 16,
    color: "#8B5CF6",
    fontStyle: "italic",
    opacity: 0.9,
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "#333",
    marginVertical: 16,
  },
  section: { marginBottom: 16 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#E1E1E1",
  },
  definition: { fontSize: 18, lineHeight: 24, color: "#CCCCCC" },
  example: {
    fontSize: 16,
    fontStyle: "italic",
    lineHeight: 22,
    color: "#AAAAAA",
  },
  buttonContainer: {
    marginTop: 24,
    width: "100%",
    maxWidth: 500,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#8B5CF6",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    width: "50%",
  },
  buttonText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 16 },
  fadeIn: { opacity: 1 },
  fadeOut: { opacity: 0 },
});
