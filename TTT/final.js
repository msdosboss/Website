class PostionNode{
	constructor(postion, parent = null, letter = 'n', engineTurn = false){
		this.postion = postion;
		this.parent = parent
		this.moveJustMade = -1;
		this.children = [];
		this.letter = letter;
		this.engineTurn = engineTurn;
	}
	get isLeaf(){
		return this.children.length === 0;
	}
	get hasChildren(){
		return !this.isLeaf();
	}
}

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

//root = new PostionNode(board);

//createGameTree(root);

//printGameTree(root, 0);

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
    /*while(true){
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
    }*/
	let move
 	if(movesmade == 1 && board[4] === 'x'){	//for some reason the engine thinks all moves all losing if it sees a board on turn 1 with an x in the center only on turn 1 tho
		move = 0
	}
	else{
		move = treeCalculate(board, letter)
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
    tempUsedId = [];
    for(let i = 0; i < 9; i++){
        tempUsedId[i] = usedids[i]; 
    }
    tempUsedId[movesmade] = move;
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
        tempUsedId[movesmade + 1] = i 
        if(wincon(calcboard2) == 1){
            return 0;
        }
        let movesNotPlayed = 0;
        let winningMoves
        for(let i = 0; i < 9; i++){
            flag = 0;
            for(let j = 0; j < movesmade + 2; j++){
                if(tempUsedId[j] == i){
                    movesNotPlayed++;
                    flag = 1;
                }
            }
            if(flag == 1){
                continue;
            }
            calcboard2[i] = letter;
            tempUsedId[movesmade + 2] = i;
            if(wincon(calcboard2) == 1){
                winningMoves++;
            } 
        }
        if(winningMoves == 9 - movesNotPlayed){
            return 1;
       	}
    }
    
    return 1;
}

function newWinCon(postionNode){
	for(let i = 0; i < 3; i++){                                     //testing the vert wins 
		if(postionNode.postion[i] == postionNode.postion[i + 3] && postionNode.postion[i] == postionNode.postion[i + 6] && postionNode.postion[i] != 'n'){
			if(postionNode.postion[i] = 'x'){
				return 1
			}
			return -1 
		}
	}
	for(let i = 0; i < 9; i = i + 3){                               //testing the hor wins
		if(postionNode.postion[i] == postionNode.postion[i + 1] && postionNode.postion[i] == postionNode.postion[i + 2] && postionNode.postion[i] != 'n'){
			if(postionNode.postion[i] == 'x'){
				return 1;
			}
			return -1
		}
	}
	if(postionNode.postion[0] == postionNode.postion[4] && postionNode.postion[0] == postionNode.postion[8] && postionNode.postion[0] != 'n'){                //left the right diagnol win
		if(postionNode.postion[0] === 'x'){
			return 1;
		}
		return -1
	}
	if(postionNode.postion[2] == postionNode.postion[4] && postionNode.postion[2] == postionNode.postion[6] && postionNode.postion[2] != 'n'){ 
		if(postionNode.postion[2] === 'x'){
			return 1;
		}
		return -1;
	}
	for(let i = 0; i < 9; i++){
		if(postionNode.postion[i] == 'n'){
			return 0;
		}
	}
	return 2;
}


function createGameTree(currentNode, pieceTurnState, mover){		
	//add a wincon check at the top to stop the function from continuing even after the game has been won
	if(newWinCon(currentNode) != 0){
		return
	}
	let avaliableMoves = [];
	
	for(let i = 0; i < 9; i++){
		if(currentNode.postion[i] == 'n'){
			avaliableMoves.push(i);
		}
	}
	
		
	for(let i = 0; i < avaliableMoves.length; i++){
		let newPostion = currentNode.postion.slice();
		newPostion[avaliableMoves[i]] = pieceTurnState;
		if(pieceTurnState == 'x'){
			let childNode = new PostionNode(newPostion, currentNode, 'o', !mover);
			childNode.moveJustMade = avaliableMoves[i]
			currentNode.children.push(childNode);
			createGameTree(childNode, 'o', !mover);
		}
		else{
			let childNode = new PostionNode(newPostion, currentNode, 'x', !mover);
			childNode.moveJustMade = avaliableMoves[i]
			currentNode.children.push(childNode);
			createGameTree(childNode, 'x', !mover);

		}
	}


}


function printGameTree(root, n){
	//console.log(n);
	//console.log(root.children.length);
	for(let i = 0; i < root.children.length; i++){
		printGameTree(root.children[i], n + 1);
	}	
}

function treeCalculateHelper(current){	
	let returnVal = new Array(current.children.length);
	for(let i = 0; i < current.children.length; i++){
		returnVal[i] = treeCalculateHelper(current.children[i])
		if(current.engineTurn == true){ //this deals with player layer
			if(returnVal[i] == -1){
				return -1
			}
		}
	}
	if(current.engineTurn == false && current.children.length != 0){ //this deals with engine layer
		let flag = 'l'
		for(let i = 0; i < current.children.length; i++){
			if(returnVal[i] == 0 || returnVal[i] == 1){
				flag = 'w'
				break
			}
		}
		if(flag == 'l'){
			return -1
		}
	
	}
	let winState = newWinCon(current)
	if(winState == 1){
		return -1;
	}
	if(winState == -1){
		return 1;
	}
	return 0
}

function treeCalculate(postion, pieceTurnState){
	let rooty = new PostionNode(postion);
	createGameTree(rooty, pieceTurnState, false);
	let indexToLastDrawingMove = -1;
	for(let i = 0; i < rooty.children.length; i++){
		let returnVal = treeCalculateHelper(rooty.children[i])
		if(returnVal == 1){
			return rooty.children[i].moveJustMade
		}
		if(returnVal == 0){
			indexToLastDrawingMove = i
		}
	}
	console.log(indexToLastDrawingMove)
	return rooty.children[indexToLastDrawingMove].moveJustMade


}

