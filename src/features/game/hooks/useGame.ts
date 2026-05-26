export function isCorrectChoice(userChoice: number, other: number) {
    return userChoice > other;
}

export function getResultMessage(userChoice: number, other: number) {
    if (userChoice > other) {
        return "Correct! You chose the higher rated anime.";
    } else if (userChoice < other) {
        return "Wrong! You chose the lower rated anime.";
    } else {
        return "It's a tie! Both anime have the same rating.";
    }
}

export function getNextScore(currentScore: number, userChoice: number, other: number) {
    return isCorrectChoice(userChoice, other) ? currentScore + 1 : currentScore;
}
