let userChoice  = 0;

export function setUserChoice(choice: number) {
    userChoice = choice;
}

export function getUserChoice() {
    return userChoice;
}

export function resetUserChoice() {
    userChoice = 0;
}