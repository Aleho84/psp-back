const generateCode = (digitCount) => {
    let code = ''

    const generateDigit = () => {
        let digit = Math.floor(Math.random() * 10)
        return digit.toString()
    }    

    for (let index = 0; index < digitCount; index++) {
        code = code + generateDigit()
    }

    return code
}

const dateFixed = () => {
    let dateNow = new Date()
    let hourDelay = 2
    let hourDelayMiliseconds = 1000 * 60 * 60 * hourDelay

    let dateNew = new Date(dateNow.getTime() + hourDelayMiliseconds)
    return dateNew
}

console.log('fecha mod: ' + dateFixed())


let codeArray = []
let ocurrencyCount = 0

for (let index = 0; index < 1000; index++) {
    let code = generateCode(4)
    codeArray.push(code)
    if (code.search('9') != -1) {
        ocurrencyCount += 1
    }

}

console.log('codes: ' + codeArray)
console.log('ocurrencias del 9: ' + ocurrencyCount)

