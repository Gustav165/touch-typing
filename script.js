const startBtn = document.getElementById('start-btn');
const gameDiv = document.getElementById('game');
const promptP = document.getElementById('prompt');
const userInput = document.getElementById('user-input');
const submitBtn = document.getElementById('submit-btn');
const resultP = document.getElementById('result');

let words = [];
let currentWord = "";

// Загружаем слова из JSON
fetch('words.json')
    .then(response => response.json())
    .then(data => {
        words = data;
        console.log("Слова загружены:", words);
    })
    .catch(err => console.error("Ошибка загрузки слов:", err));

function speakWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'ru-RU';
    speechSynthesis.speak(word);
}

function nextWord() {
    if (words.length === 0) return;
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex];
    speakWord(currentWord);
    userInput.value = "";
    userInput.focus();
    resultP.textContent = "";
}

function checkInput() {
    if (userInput.value.trim() === currentWord) {
        resultP.textContent = "Верно!";
    } else {
        resultP.textContent = `Неверно. Правильно: ${currentWord}`;
    }
    setTimeout(nextWord, 1500);
}

startBtn.addEventListener('click', () => {
    if (words.length === 0) {
        alert("Слова ещё не загружены, подождите...");
        return;
    }
    startBtn.style.display = 'none';
    gameDiv.style.display = 'block';
    nextWord();
});

// Кнопка "Отправить"
submitBtn.addEventListener('click', checkInput);

// Отправка через Enter
userInput.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        checkInput();
        e.preventDefault(); // чтобы форма не отправлялась
    }
});
