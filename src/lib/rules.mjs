const bannedWords = [
  "katakotor", // For testing purpose
  "anjing",
  "babi",
  "kontol",
  "memek",
  "bangsat",
  "asu",
  "bangke",
  "bajingan",
  "asw",
  "bangke",
  "kampret",
  "kacau",
  "kontol",
  "memek",
  "taek",
  "pepek",
  "pepe",
  "pepega",
];

export const isContainingBannedWord = (message) => {
  for (const word of bannedWords) {
    if (message.includes(word)) {
      return true;
    }
  }
  return false;
};
