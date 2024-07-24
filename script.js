// ====================== Variables ========================
let firstOperand =''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false

// ====================== Retrieve HTML elements ========================
const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.getElementById('equalsBtn')
const clearButton = document.getElementById('clearBtn')
const deleteButton = document.getElementById('deleteBtn')
const pointButton = document.getElementById('pointBtn')
const percentButton = document.getElementById('percentBtn')
const lastOperationScreen = document.getElementById('lastOperationScreen')
const currentOperationScreen = document.getElementById('currentOperationScreen')

// ====================== Event handlers ========================
window.addEventListener('keydown', handleKeboardInput) // Keyboard Support
equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click',clear)
deleteButton.addEventListener('click',deleteNumber)
pointButton.addEventListener('click', appendPoint)
percentButton.addEventListener('click', divideByOneHundred)

numberButtons.forEach((button)=>
    button.addEventListener('click', ()=> appendNumber(button.textContent))
)

operatorButtons.forEach((button)=>
    button.addEventListener('click', ()=> setOperation(button.textContent))
)

// ====================== Functions ========================
function appendNumber(number){
    if(currentOperationScreen.textContent == '0' || shouldResetScreen)
        resetScreen()
    currentOperationScreen.textContent += number
}

function resetScreen(){
    currentOperationScreen.textContent = ''
    shouldResetScreen = false
}

function clear(){
    currentOperationScreen.textContent ='0'
    lastOperationScreen.textContent =''
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
}

function appendPoint(){
    if(shouldResetScreen) resetScreen()
    if(currentOperationScreen.textContent==='')
        currentOperationScreen.textContent = '0'
    if(currentOperationScreen.textContent.includes('.')) return
    currentOperationScreen.textContent +='.'
}

function divideByOneHundred(){
    if(currentOperationScreen.textContent==='' || currentOperationScreen.textContent==='0')
        return
    currentOperationScreen.textContent = operate('÷', currentOperationScreen.textContent, '100')
}

function deleteNumber(){
    currentOperationScreen.textContent = currentOperationScreen.textContent.toString().slice(0,-1)
}

function setOperation(operator){
    if(currentOperation !==null) 
        evaluate()
    firstOperand = currentOperationScreen.textContent
    currentOperation = operator
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`
    shouldResetScreen = true
}

function evaluate(){
    // If operator or second operand not provided
    if(currentOperation === null || shouldResetScreen) return
    if(currentOperation === '÷' && currentOperationScreen.textContent==='0'){
        alert("You can't divide by 0!")
        return
    }
    secondOperand = currentOperationScreen.textContent
    currentOperationScreen.textContent = roundResult(operate(currentOperation, firstOperand, secondOperand))
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand}`
    currentOperation = null
}

function roundResult(number){
    return Math.round(number*1000)/1000
}

function handleKeboardInput(e){
    if(e.key >=0 && e.key<=9) appendNumber(e.key)
    if(e.key ==='.') appendPoint()
    if(e.key ==='%') divideByOneHundred()
    if(e.key ==='=' || e.key === 'Enter') evaluate()
    if(e.key ==='Backspace') deleteNumber()
    if(e.key ==='Escape') clear()
    if(e.key ==='+'|| e.key==='-' || e.key==='*'|| e.key==='/')
        setOperation(convertOperator(e.key))
}

function convertOperator(keyboardOperator){
    if(keyboardOperator ==='/') return '÷'
    if(keyboardOperator ==='*') return '×'
    if(keyboardOperator ==='-') return '-'
    if(keyboardOperator ==='+') return '+'
}

function operate(operator, a, b){
    a = Number(a)
    b = Number(b)
    switch(operator){
        case '+':
            return (a + b)
        case '-':
            return (a - b)
        case '×':
            return (a * b)
        case '÷':
            if(b===0) return null
            else return (a / b)
        default:
            return null
    }
}