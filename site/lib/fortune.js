const fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleaseant surprise",
    "Whenever possible, keep it simple."
];

function randomFortune() {
    return fortunes[Math.floor(Math.random() * fortunes.length)]
}
exports.randomFortune = randomFortune;
