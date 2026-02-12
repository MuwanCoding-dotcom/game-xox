document.addEventListener("DOMContentLoaded", () => {

const boardElement = document.getElementById("board");
const turnInfo = document.getElementById("turnInfo");
const popup = document.getElementById("popup");
const winnerText = document.getElementById("winnerText");
const resultText = document.getElementById("resultText");

// AUDIO
const bgm = document.getElementById("bgm");
const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");
const loseSound = document.getElementById("loseSound");
const nameIncorrect = document.getElementById("nameIncorrect");
const seriSound = document.getElementById("seriSound")

let board = Array(9).fill("");
let gameOver = false;
let playerName = "";

const user = "O";
const computer = "X";

const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

// ===== MULAI GAME =====
window.startGame = function () {
// FIX 
    const input = document.getElementById("playerName").value;

    if (input === "") {
        // Nambah sendiri
        nameIncorrect.currentTime = 7.9;
        nameIncorrect.play();

        setTimeout(() => {
            alert("NAMA LU MANA???");
        }, 100);
        // sampe sini
        return;
    }

    playerName = input;
    document.getElementById("landing").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");

    bgm.volume = 1;
    bgm.play();

    createBoard();
};

// ===== BUAT PAPAN =====
function createBoard() {
    boardElement.innerHTML = "";
    board.fill("");
    gameOver = false;
    turnInfo.innerText = "Giliran Lu Nieh";

    board.forEach((_, i) => {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.addEventListener("click", () => userMove(i));
        boardElement.appendChild(cell);
    });
}

// ===== USER MOVE =====
function userMove(i) {
    if (board[i] !== "" || gameOver) return;

    clickSound.currentTime = 0;
    clickSound.play();

    board[i] = user;
    updateBoard();

    if (checkWinner(user)) {
        winSound.volume = 1;
        winSound.play();
        showPopup(playerName);
        return;
    }

    if (isDraw()) {
        showDraw();
        return;
    }

    turnInfo.innerText = "Giliran Bot";
    setTimeout(computerMove, 500);
}

// ===== KOMPUTER MOVE =====
function computerMove() {
    if (gameOver) return;

    const empty = board
        .map((v, i) => v === "" ? i : null)
        .filter(v => v !== null);

    if (empty.length === 0) return;

    const pick = empty[Math.floor(Math.random() * empty.length)];
    board[pick] = computer;
    updateBoard();

    if (checkWinner(computer)) {
        // nambah sendiri
        loseSound.volume = 1;
        loseSound.currentTime = 1;
        loseSound.play();
        // nambah sendiri
        showPopup("Komputer");
        return;
    }

    if (isDraw()) {
        showDraw();
        return;
    }

    turnInfo.innerText = "Giliran Lu Nieh";
}

// ===== UPDATE BOARD =====
function updateBoard() {
    document.querySelectorAll(".cell").forEach((cell, i) => {
        cell.innerText = board[i];
    });
}

// ===== CEK MENANG =====
function checkWinner(p) {
    return winPatterns.some(pattern =>
        pattern.every(i => board[i] === p)
    );
}

// ======== CEK SERI========
function isDraw() {
    return board.every(cell => cell !== "")
}

// ===== POPUP MENANG / KALAH =====
function showPopup(winner) {
    // bagian yg ditambah sendiri
    bgm.pause();
    // ...
    gameOver = true;
    popup.classList.remove("hidden");

    if (winner === playerName) {
        winnerText.innerText = `🎉 ${playerName} MENANG!`;
        resultText.innerText = "Silahkan Ambil MBG";
        winSound.currentTime = 3;
        winSound.play();
    } else {
        winnerText.innerText = "YAHAHAHAA KALAH";
        resultText.innerText = "COBA LAGI DEK🤪🤪🤪"
    }
}

// ===== POPUP SERI ======
function showDraw() {
    // nambah sendiri
    bgm.pause();
    // sampe sini
    gameOver = true;
    popup.classList.remove("hidden");
    winnerText.innerText = "SERI BOY";
    resultText.innerText = "Gada yang menang"
    seriSound.currentTime = 0;
    seriSound.play();
}

window.closePopup = function () {
    // Bagian yg ditambah sendiri
    winSound.pause();
    loseSound.pause();
    seriSound.pause();
    bgm.play();
    // sampe sini 
    popup.classList.add("hidden");
};

// ===== RESET =====
window.resetGame = function () {
    createBoard();
};

});
