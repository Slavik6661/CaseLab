function censor() {
  const knowledge = new Map();
  function setKnowledge(key, value) {
    knowledge.set(key, value);
  }
  function censorFormatText(text) {
    if (!text) return "";
    knowledge.forEach((wordToReplace, replacement) => {
      let regex = new RegExp(replacement, "gi");
      text = text.replace(regex, wordToReplace);
    });
    return text;
  }
  return function (...args) {
    if (args.length === 2) {
      const [wordToReplace, replacement] = args;
      setKnowledge(wordToReplace, replacement);
    } else if (args.length === 1) {
      const [text] = args;
      return censorFormatText(text);
    }
  };
}
const changeScene = censor();
changeScene("PHP", "JS");
changeScene("backend", "Frontend");
let result = changeScene(
  "PHP is the most popular programming language for backend web-development"
);
console.log(result);
let text = document.getElementById("text");
text.innerHTML = result;
