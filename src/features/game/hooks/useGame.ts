let userChoice  = 0;
let other = 0;
let score = 0;

export function setUserChoice(choice: number) {
    userChoice = choice;
}

export function getUserChoice() {
    return userChoice;
}

export function resetUserChoice() {
    userChoice = 0;
}

export function setOtherChoice(choice: number) {
    other = choice;
}

export function getOtherChoice() {
    return other;
}

export function getResultMessage() {
    if (userChoice > other) {
        return "Correct! You chose the higher rated anime.";
    } else if (userChoice < other) {
        return "Wrong! You chose the lower rated anime.";
    } else {
        return "It's a tie! Both anime have the same rating.";
    }
}

export function updateScore() {
    if (userChoice > other) {
        score++;
    } else {
        resetScore();
    }
}

export function getScore() {
    return score;
}

export function resetScore() {
    score = 0;
}
