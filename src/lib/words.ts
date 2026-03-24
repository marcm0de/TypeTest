export const WORD_BANK = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "i",
  "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
  "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
  "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
  "people", "into", "year", "your", "good", "some", "could", "them", "see", "other",
  "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
  "back", "after", "use", "two", "how", "our", "work", "first", "well", "way",
  "even", "new", "want", "because", "any", "these", "give", "day", "most", "us",
  "great", "between", "need", "large", "under", "never", "each", "right", "hand",
  "high", "place", "small", "found", "still", "here", "thing", "own", "point",
  "keep", "head", "long", "much", "before", "line", "turn", "move", "where",
  "same", "group", "while", "last", "might", "next", "world", "down", "start",
  "life", "city", "earth", "light", "write", "story", "left", "part", "read",
  "sound", "change", "help", "show", "play", "near", "number", "night", "live",
  "letter", "run", "book", "often", "different", "school", "should", "answer",
  "study", "learn", "plant", "cover", "food", "sun", "four", "thought", "let",
  "does", "close", "open", "seem", "together", "state", "set", "above", "end",
  "always", "began", "both", "paper", "hard", "water", "fish", "those", "car",
  "side", "been", "call", "stop", "being", "example", "name", "every", "family",
  "begin", "music", "river", "country", "body", "young", "house", "morning",
  "table", "system", "program", "question", "during", "computer", "order",
  "problem", "second", "power", "enough", "follow", "sure", "watch", "face",
  "area", "nothing", "children", "few", "building", "form", "real", "almost",
  "along", "important", "something", "north", "south", "east", "west", "talk",
  "money", "idea", "happen", "interest", "door", "simple", "field", "special",
  "develop", "road", "center", "room", "woman", "figure", "class", "anything",
  "within", "produce", "several", "better", "across", "early", "against",
  "possible", "present", "rather", "plan", "pattern", "strong", "voice",
  "perhaps", "nature", "travel", "language", "among", "horse", "white",
  "however", "whole", "island", "surface", "science", "hundred", "product",
  "common", "human", "record", "machine", "street", "picture", "appear",
  "contain", "bring", "explain", "office", "space", "million", "market",
  "force", "today", "measure", "direction", "visit", "level", "support"
];

export function generateText(wordCount: number = 30): string {
  const words: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    words.push(WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)]);
  }
  return words.join(" ");
}
