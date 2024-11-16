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

function drawnNumbers(min, max, quantity) {
    const numbers = [];

    for (let i = 0; i < quantity; i++) {
        const num = Math.floor(Math.random() * (max - min + 1) + min)

        if (i == 0) {
            numbers.push(num);
        } else if (unique.checked) {
            while (numbers.includes(num)) {
                const num = Math.floor(Math.random() * (max - min + 1) + min)
                numbers.push(num);
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
        setTimeout(() => {
            createElement(numbers[i])
        }, 2000 * i)
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

quantity.oninput = () => {
    const value = quantity.value.replace(/\D/g, "")

    quantity.value = value
}

from.oninput = () => {
    const value = from.value.replace(/\D/g, "")

    from.value = value
}

to.oninput = () => {
    const value = to.value.replace(/\D/g, "")

    to.value = value
}

form.onsubmit = (e) => {
    e.preventDefault();
    fromNumber = Number(from.value)
    toNumber = Number(to.value)
    quantityNumber = Number(quantity.value)

    try {
        if (quantityNumber === "" || fromNumber === "" || toNumber === "") {
            throw new Error("Preencha todos os campos!")
        } else if (fromNumber >= toNumber) {
            from.value = ""
            to.value = ""
            throw new Error("O intervalo não é válido!")
        } else if (quantity.value == 0) {
            quantity.value = ""
            throw new Error("Quantidade de números a serem sorteados é inválida!")
        } else if (unique.checked && quantityNumber > (toNumber - fromNumber + 1)) {
            from.value = ""
            to.value = ""
            quantity.value = ""
            throw new Error(`Não é possível sortear ${quantityNumber} números sem repetição neste intervalo!`)
        }

        formContainer.classList.remove("active");
        resultsView.classList.add("active");

        drawnNumbers(fromNumber, toNumber, quantityNumber, unique.checked)

        form.reset();

    } catch (error) {
        alert(error.message)
    }
}

btnAgain.onclick = () => {
    clearResult()
    drawnNumbers(fromNumber, toNumber, quantityNumber)
}

logoHome.onclick = () => {
    formContainer.classList.add("active");
    resultsView.classList.remove("active");
    drawnNumber = 0
    clearResult()
}

