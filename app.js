document.addEventListener('DOMContentLoaded', ()=>{
const squares = document.querySelectorAll('.grid div')
const scoreDisplay = document.querySelector('span')
const startBtn = document.querySelector('.start')

const width = 10
let currentIndex = 0
let appleIndex = 0
let currentSnake = [2,1,0] // head, body, tail

let direction = 1
let score = 0
let speed = 0.9

let intervalTime=0
let interval = 0

function startGame(){
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(interval) 
    score = 0
    //random apple
    direction = 1
    scoreDisplay.innerHTML = score
    intervalTime =1000
    currentSnake = [2,1,0]
    currentIndex = 0
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    interval = setInterval (moveOutcomes, intervalTime)
}


//function that deals with all outcomes of the snake
function moveOutcomes(){
    // deals with snake hitting border
    
    if( //al options that end the game
        (currentSnake[0] + width >= (width * width) && direction === width)||
        (currentSnake[0] % width === width - 1 && direction === 1)|| //hits right wall
        (currentSnake[0] % width === 0 && direction === -1)|| //hits left wall
        (currentSnake[0] - width < 0 && direction === -width)|| //hits top
        squares[currentSnake[0] +direction].classList.contains('snake') //if snake eats itself

    ){
        return clearInterval(interval) // stops calling function that is called with setinterval f-on


    } 
    const tail = currentSnake.pop() //on every intervalTime removes last bit of tail
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0] + direction)//gives direction to the head

    //deals with snake eating apple
    if(squares[currentSnake[0]].classList.contains('apple')){
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        randomApple()
        score++
        scoreDisplay.textContent = score
        clearInterval(interval)

        intervalTime = intervalTime * speed//speeds up the snake
        interval = setInterval(moveOutcomes,intervalTime)

    }
    squares[currentSnake[0]].classList.add('snake')
}


//generate new aplle when eaten
function randomApple(){
    do{
        appleIndex = Math.floor(Math.random()* squares.length)
    }
    while(squares[appleIndex].classList.contains('snake'))//snake ate apple

    squares[appleIndex].classList.add('apple')
}
//asign f-ons to keycodes

function control(e){
    squares[currentIndex].classList.remove('snake')

    if(e.keyCode === 39){ //case right arrow
        direction = 1
    }
    else if(e.keyCode === 38){ //case  arrow up snake goes ten divs appearing it goes up
        direction = -width
    }
    else if(e.keyCode === 37){ //case left arrow snake goes left one div
        direction= -1
    }
    else if(e.keyCode === 40){ //case down arrow snake appears 10 divs down from where you are now
        direction = +width
    }
    
}
document.addEventListener('keyup', control) // on every press, snake direction moves
startBtn.addEventListener('click', startGame)

})

