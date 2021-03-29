import AsyncStorage from '@react-native-community/async-storage'

const FLASHCARDS_KEY = "MY_FLASHCARDS";

export function generateUID() {
    return (
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)
    );
  }

function initialData() {
    return {
        "632mgp7hm68vzvg2amz111": {
            id: "632mgp7hm68vzvg2amz111",
            title: "React",
            questions: [{
                question: "What is ReactJS?",
                answer: "ReactJS is an open-source frontend JavaScript library which is used for building user interfaces, specifically for single page applications."
            }]
        },
        "632mgp7hm68vzvg2amz133": {
            id: "632mgp7hm68vzvg2amz133",
            title: 'JavaScript',
            questions: [{
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }]
        }
    };
}

export async function getDecks() {
  try {
    const results = await AsyncStorage.getItem(FLASHCARDS_KEY);
    if (results) {
      const data = JSON.parse(results);
      return data;
    } else {
      await AsyncStorage.setItem(
        FLASHCARDS_KEY,
        JSON.stringify(initialData())
      );
      return initialData();
    }
  } catch (error) {
    await AsyncStorage.setItem(
      FLASHCARDS_KEY,
      JSON.stringify(initialData())
    );
    return initialData();
  }
}

export async function saveDeckTitle(title) {
  const id = generateUID();
  const deck = {
    id: id,
    title: title,
    questions: []
  };

  await AsyncStorage.mergeItem(
    FLASHCARDS_KEY,
    JSON.stringify({
      [id]: deck
    })
  );
  return deck;
}

export async function saveCardToDeck(deckId, card) {
  const results = await AsyncStorage.getItem(FLASHCARDS_KEY);
  if (results) {
    const data = JSON.parse(results);
    const deck = data[deckId];
    deck.questions = deck.questions.concat([card]);
    await AsyncStorage.mergeItem(
      FLASHCARDS_KEY,
      JSON.stringify({
        [deckId]: deck
      })
    );
    return card;
  }
}

export async function getDeck(deckId) {
  const results = await AsyncStorage.getItem(FLASHCARDS_KEY);
  if (results) {
    const data = JSON.parse(results);
    return data[deckId];
  }
  return {};
}
