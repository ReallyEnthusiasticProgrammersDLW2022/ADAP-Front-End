
const { Blob } = require('buffer')
const fs = require('fs')

const readFile = () => {
    let buffer = fs.readFileSync("../assets/adaptive-icon.png");
    let blob = new Blob([buffer]);
}

readFile()