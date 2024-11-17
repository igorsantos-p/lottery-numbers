const form = document.querySelector("form");
const logoHome = document.querySelector("header img");
const formContainer = document.querySelector(".form-container");
const resultsView = document.querySelector(".result-container");
const resultContainer = document.querySelector(".results");
const drawNumberView = document.querySelector(".draw-number");
const btnAgain = document.querySelector("[data-type='again']");
const quantity = document.getElementById("quantity");
const from = document.getElementById("from");
const to = document.getElementById("to");
const unique = document.getElementById("unique");

var fromNumber = 0;
var toNumber = 0;
var quantityNumber = 0;
var drawnNumber = 0
var isUnique = false;
const timeouts = [];

function drawnNumbers(min, max, quantity, isUnique) {
    const numbers = [];

    for (let i = 0; i < quantity; i++) {
        let num = Math.floor(Math.random() * (max - min + 1) + min)

        if (i == 0) {
            numbers.push(num);
        } else if (isUnique) {
            while (numbers.includes(num)) {
                num = Math.floor(Math.random() * (max - min + 1) + min)
            }
            numbers.push(num);

        } else {
            numbers.push(num);
        }
    }

    appendNewResult(numbers)
    drawnNumber++
}

function appendNewResult(numbers) {
    for (let i = 0; i < numbers.length; i++) {
        const timeOutId = setTimeout(() => {
            createElement(numbers[i])
        }, 2000 * i)

        timeouts.push(timeOutId)
    }
}

function createElement(number) {
    const span = document.createElement("span");
    span.textContent = number.toString().padStart(2, '0');
    resultContainer.appendChild(span);
    drawNumberView.textContent = `${drawnNumber}º resultado`
}

function clearResult() {
    while (resultContainer.firstChild) {
        resultContainer.removeChild(resultContainer.firstChild);
    }
}

function clearAllTimeouts() {
    for (const timeoutId of timeouts) {
        clearTimeout(timeoutId);
    } timeouts.length = 0;
}

quantity.oninput = () => {
    const value = quantity.value.replace(/\D/g, "")

    if (value.length > 5) {
        quantity.value = value.slice(0, 5)
    } else {
        quantity.value = value
    }

}

from.oninput = () => {
    const value = from.value.replace(/\D/g, "")

    if (value.length > 5) {
        from.value = value.slice(0, 5)
    } else {
        from.value = value
    }

}

to.oninput = () => {
    const value = to.value.replace(/\D/g, "")

    if (value.length > 5) {
        to.value = value.slice(0, 5)
    } else {
        to.value = value
    }

}

form.onsubmit = (e) => {
    e.preventDefault();
    fromNumber = Number(from.value)
    toNumber = Number(to.value)
    quantityNumber = Number(quantity.value)
    isUnique = unique.checked

    try {
        if (quantityNumber === "" || fromNumber === "" || toNumber === "") {
            throw new Error("Preencha todos os campos!")
        } else if (fromNumber >= toNumber) {
            from.value = ""
            to.value = ""
            from.focus()
            throw new Error("O intervalo não é válido!")
        } else if (quantity.value == 0) {
            quantity.value = ""
            quantity.focus()
            throw new Error("Quantidade de números a serem sorteados é inválida!")
        } else if (isUnique && quantityNumber > (toNumber - fromNumber + 1)) {
            from.value = ""
            to.value = ""
            quantity.value = ""
            quantity.focus()
            throw new Error(`Não é possível sortear ${quantityNumber} números sem repetição neste intervalo!`)
        }

        formContainer.classList.remove("active");
        resultsView.classList.add("active");

        drawnNumbers(fromNumber, toNumber, quantityNumber, isUnique)

        form.reset();

    } catch (error) {
        alert(error.message)
    }
}

btnAgain.onclick = () => {
    clearResult()
    clearAllTimeouts()
    drawnNumbers(fromNumber, toNumber, quantityNumber, isUnique)
}

logoHome.onclick = () => {
    formContainer.classList.add("active");
    resultsView.classList.remove("active");

    fromNumber = 0;
    toNumber = 0;
    quantityNumber = 0;
    drawnNumber = 0
    isUnique = false;


    form.reset()
    clearResult()
    clearAllTimeouts()
}

