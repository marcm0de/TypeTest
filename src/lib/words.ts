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

export const PROGRAMMING_WORDS = [
  "function", "const", "return", "import", "export", "class", "interface",
  "async", "await", "promise", "array", "object", "string", "number",
  "boolean", "null", "undefined", "typeof", "instanceof", "extends",
  "implements", "abstract", "static", "public", "private", "protected",
  "constructor", "module", "require", "package", "throw", "catch", "try",
  "finally", "switch", "case", "break", "continue", "default", "delete",
  "debugger", "enum", "super", "this", "void", "with", "yield", "let",
  "var", "while", "for", "if", "else", "do", "new", "in", "of",
  "template", "literal", "arrow", "spread", "destructure", "callback",
  "closure", "prototype", "iterator", "generator", "proxy", "reflect",
  "symbol", "bigint", "map", "set", "weakmap", "weakset", "buffer",
  "stream", "socket", "server", "client", "request", "response", "route",
  "middleware", "component", "render", "state", "props", "hook", "effect",
  "context", "reducer", "dispatch", "action", "store", "selector",
  "mutation", "query", "schema", "resolver", "fragment", "directive",
  "variable", "parameter", "argument", "operator", "expression", "statement",
];

export const NUMBER_WORDS = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",
  "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
  "sixteen", "seventeen", "eighteen", "nineteen", "twenty", "thirty",
  "forty", "fifty", "sixty", "seventy", "eighty", "ninety", "hundred",
  "thousand", "million", "billion", "first", "second", "third", "fourth",
  "fifth", "tenth", "half", "quarter", "double", "triple", "dozen",
  "pair", "single", "twice", "thrice", "percent", "decimal", "fraction",
  "ratio", "sum", "total", "average", "median", "prime", "even", "odd",
  "positive", "negative", "integer", "float", "pi", "infinity",
  "123", "456", "789", "1024", "2048", "3.14", "42", "100", "255", "404",
  "500", "8080", "3000", "443", "80", "22", "21", "25", "53", "110",
];

export type PracticeMode = "standard" | "programming" | "numbers";

export function generateText(wordCount: number = 30, mode: PracticeMode = "standard"): string {
  let bank: string[];
  switch (mode) {
    case "programming":
      bank = PROGRAMMING_WORDS;
      break;
    case "numbers":
      bank = NUMBER_WORDS;
      break;
    default:
      bank = WORD_BANK;
  }
  const words: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    words.push(bank[Math.floor(Math.random() * bank.length)]);
  }
  return words.join(" ");
}
