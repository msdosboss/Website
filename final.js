let letter = 'x';
const usedids = [];
let movesmade = 0;

document.getElementById("0").onclick = function() {squareclicked(this.id)};
document.getElementById("3").onclick = function() {squareclicked(this.id)};
document.getElementById("6").onclick = function() {squareclicked(this.id)};
document.getElementById("1").onclick = function() {squareclicked(this.id)};
document.getElementById("4").onclick = function() {squareclicked(this.id)};
document.getElementById("7").onclick = function() {squareclicked(this.id)};
document.getElementById("2").onclick = function() {squareclicked(this.id)};
document.getElementById("5").onclick = function() {squareclicked(this.id)};
document.getElementById("8").onclick = function() {squareclicked(this.id)};


document.getElementById("reset").onclick = function() {reset()};




const board = []

for(let i = 0; i < 9; i++){
    board[i] = 'n';
}


function squareclicked(iden){
    for(let i = 0; i < movesmade; i++){
        if(usedids[i] == iden){
            alert("square already used");
            return 1;
        }
    }
    board[iden] = letter;
    if(letter == 'x'){
        document.getElementById(iden).innerHTML = "<img src='images/x.png'>";
        letter = 'o';
        usedids[movesmade] = iden;
        movesmade = movesmade + 1;
    }
    else{
        document.getElementById(iden).innerHTML = "<img src='images/o.png'>";
        letter = 'x';
        usedids[movesmade] = iden;
        movesmade = movesmade + 1;
    }
    if(wincon(board) == 1){
        alert(letter + " Loses");
        reset();
    }
    else{
        if(movesmade == 9){
            alert("Draw human");
            reset();
        }
        else{
            computermove();
        }
    }
}
function wincon(boardcheck){
    for(let i = 0; i < 3; i++){                                     //testing the vert wins 
        if(boardcheck[i] == boardcheck[i + 3] && boardcheck[i] == boardcheck[i + 6] && boardcheck[i] != 'n'){
            return 1;
        }
    }
    for(let i = 0; i < 9; i = i + 3){                               //testing the hor wins
        if(boardcheck[i] == boardcheck[i + 1] && boardcheck[i] == boardcheck[i + 2] && boardcheck[i] != 'n'){
            return 1;
        }
    }
    if(boardcheck[0] == boardcheck[4] && boardcheck[0] == boardcheck[8] && boardcheck[0] != 'n'){                //left the right diagnol win
        return 1;
    }
    if(boardcheck[2] == boardcheck[4] && boardcheck[2] == boardcheck[6] && boardcheck[2] != 'n'){
        return 1;
    }
    return 0;
}

function reset(){
    for(let i = 0; i < 9; i++){
        document.getElementById(i).innerHTML = "<img src='images/whitesquare.png'>";
        board[i] = 'n';
        usedids[i] = null;
    }
    letter = 'x';
    movesmade = 0;
}

function computermove(){
    let flag = 0;
    let move = Math.floor(Math.random() * 9);
    let tries = 0;
    while(true){
        flag = 0;
        for(let i = 0; i < movesmade; i++){
            if(usedids[i] == move){
                flag = 1;
                move = Math.floor(Math.random() * 9);
                break;
            }
        }
        if(flag == 0){
                try{
                    if(calculate(move) == 1 || tries > 100) throw "valid";
                }
                catch{
                    break;
                }
                    tries = tries + 1
                    move = Math.floor(Math.random() * 9);
                    continue;
        }
    }
    board[move] = letter;
    if(letter == 'x'){
        document.getElementById(move).innerHTML = "<img src='images/x.png'>";
        letter = 'o';
        usedids[movesmade] = move;
        movesmade = movesmade + 1;
    }
    else{
        document.getElementById(move).innerHTML = "<img src='images/o.png'>";
        letter = 'x';
        usedids[movesmade] = move;
        movesmade = movesmade + 1;
    }
    if(wincon(board) == 1){
        alert(letter + " Loses");
        reset();
    }
    else{
        if(movesmade == 9){
            alert("Draw engine");
            reset();
        }
    }

   
}

function calculate(move){
    const calcboard = [];    
    const calcboard2 = [];
    for(let i = 0; i < 9; i++){
        calcboard[i] = board[i];
    }
    calcboard[move] = letter;
    let calcletter = ''; 
    if(letter == 'x'){
        calcletter = 'o';
    }
    else{
        calcletter = 'x';
    }
    if(wincon(calcboard) == 1){
        alert("engine win");
        return 1;
    }
    let flag = 0;
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            calcboard2[j] = calcboard[j];
        }
        if(i == move){
            continue;
        }
        flag = 0;
        for(let j = 0; j < movesmade; j++){
            if(usedids[j] == i){
                flag = 1;
            }
        }
        if(flag == 1){          //skip calculating this square if piece has already moved to it 
            continue;
        }
        calcboard2[i] = calcletter;
        if(wincon(calcboard2) == 1){
            return 0;
        }

    }
    return 1;
}
