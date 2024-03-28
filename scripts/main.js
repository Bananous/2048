class Coordinate {
    constructor(xbegin, ybegin, xend, yend, num) {
        this.xbegin = xbegin;
        this.ybegin = ybegin;
        this.xend = xend;
        this.yend = yend;
        this.num = num;
    }
}


function createTile(x, y, value, animation){
    let newTile = document.createElement("div");
    let newInnertile = document.createElement("div");
    document.querySelector(".tile-container").appendChild(newTile);
    newTile.appendChild(newInnertile);
    newInnertile.classList.add("tile-inner");
    newTile.classList.add("tile");
    newInnertile.innerHTML = value;
    newTile.style.transform = `translate(${x}px, ${y}px)`;
    if(animation == "nope") console.log("banana");
    else if(animation[2] === "s") newTile.style.animationName = animation;
    else newInnertile.style.animationName = animation;
    return newInnertile;
}

let board = [[0, 0, 0, 0],
             [0, 0, 0, 0],
             [0, 0, 0, 0],
             [0, 0, 0, 0]];

function createNew(x, y, value, animation){
    return createTile(arr[y], arr[x], value, animation);
}

let arr = [0, 123.75, 247.5, 371.25];
let x1;
let y1;
let x2;
let y2;
let start1 = Math.floor(Math.random() * 2);
let start2 = Math.floor(Math.random() * 2);
start1 = 4-start1*2;
start2 = 4-start2*2;

do{
    x1 = Math.floor(Math.random() * 4);
    y1 = Math.floor(Math.random() * 4);
    x2 = Math.floor(Math.random() * 4);
    y2 = Math.floor(Math.random() * 4);
}
while(x1==x2 && y1==y2)
//xr yd

board[x1][y1] = start1;
board[x2][y2] = start2;
createNew(x1, y1, start1, "appear");
createNew(x2, y2, start2, "appear");

console.log(board);

function move(){
    let currentTiles = document.querySelectorAll(".tile");
    currentTiles.forEach((element) => {element.parentNode.removeChild(element)});
    let query = [];
    let moveTile;
    for(let i = 0; i < 4; i++){
        let stackable = 0;
        let val = board[i][0];
        if(val !== 0){//first column
            moveTile = new Coordinate(i, 0, i, 0, val);
            query.push([moveTile, 0]);
        }
        for(let j = 1; j < 4; j++){
            if(board[i][j] == 0) continue;
            if(val == 0){//stack against merged
                val = board[i][j];
                board[i][stackable] = val;
                board[i][j] = 0;
                moveTile = new Coordinate(i, j, i, stackable, val);
                query.push([moveTile, 1]);
                continue;
            }
            if(board[i][j] == val){//merge
                board[i][stackable] = val+val;
                board[i][j] = 0;
                moveTile = new Coordinate(i, j, i, stackable, val);
                query.push([moveTile, 2]);
                val = 0;
                stackable++;
            }
            else{//stack against different
                val = board[i][j];
                stackable++;
                board[i][stackable] = board[i][j];
                if(j!=stackable){//positionchanged
                    board[i][j] = 0;
                    moveTile = new Coordinate(i, j, i, stackable, val);
                    query.push([moveTile, 1]);
                }
                else{//position unchanged
                    moveTile = new Coordinate(i, j, i, j, val);
                    query.push([moveTile, 0]);
                }
                
            }
        }
    }
    return query;
}

function moveLeft(){
    return move();
}

function moveRight(){
    board = board.map(row => row.reverse());
    let temp = move();
    for(let i = 0; i < temp.length; i++){
        temp[i][0].ybegin = 4-temp[i][0].ybegin;
        temp[i][0].yend = 4-temp[i][0].yend;
    }
    board = board.map(row => row.reverse());
    return temp;
}

function transpose(matrix) {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

function moveUp(){
    board = transpose(board);
    let temp = move();
    board = transpose(board);
    return temp;
}

function moveDown(){
    board = transpose(board);
    let temp = move();
    board = transpose(board);
    return temp;
}

document.addEventListener("keydown",  (event) => {
    if(event.key == "ArrowLeft"){

    }
    let process = moveLeft();
    let moved = [];
    let stay = [];
    let merged = [];
    for(let i = 0; i < process.length; i++){
        if(process[i][1] == 0) stay.push(process[i][0]);
        else if(process[i][1] == 2){
            moved.push(process[i][0]);
            merged.push(process[i][0]);
        }
        else moved.push(process[i][0]);
    }
    for(let i = 0; i < stay.length; i++){
        createNew(stay[i].xbegin, stay[i].ybegin, stay[i].num, "nope");
    }
    for(let i = 0; i < moved.length; i++){
        let position = 4 * moved[i].xend + moved[i].yend;
        createNew(moved[i].xbegin, moved[i].ybegin, moved[i].num, `pos${position}`);
    }
    for(let i = 0; i < merged.length; i++){
        let twice = merged[i].num * 2;
        createNew(merged[i].xend, merged[i].yend, twice, "pop");
    }
    console.log(board);
})

