class Coordinate {
    constructor(x, y, co, num) {
        this.x = x;
        this.y = y;
        this.co = co;
        this.num = num;
    }
}

function createTile(x, y, value, animation){
    let newTile = document.createElement("div");
    document.querySelector(".tile-container").appendChild(newTile);
    newTile.classList.add("tile");
    newTile.innerHTML = value;
    // newTile.style.top = x+"px";
    // newTile.style.left = y+"px";
    newTile.style.transform = `translate(${x}px, ${y}px)`;
    // if(animation !== "nope")
    // newTile.style.animationName = "pos4";
    //wtf appear
    // if(animation === "appear")newTile.style.animationName = "appear";
    return newTile;
}

let board = [[0, 0, 0, 0],
             [0, 0, 0, 0],
             [0, 0, 0, 0],
             [0, 0, 0, 0]];

let arr = [0, 123.75, 247.5, 371.25];
let x1 = Math.floor(Math.random() * 4);
let y1 = Math.floor(Math.random() * 4);

let x2 = Math.floor(Math.random() * 4);
let y2 = Math.floor(Math.random() * 3);

if(x1 === x2 && y1 === y2){
    y2++;
}

board[x1][y1] = 2;
board[x2][y2] = 2;
createTile(arr[x1], arr[y1], 2, "pos1");
createTile(arr[x2], arr[y2], 2, "appear");
// console.log(board);
// document.addEventListener("keydown",  (event) => {
//     let currentTiles = document.querySelectorAll(".tile");
//     currentTiles.forEach((element) => {element.parentNode.removeChild(element)});
//     let query = [];
//     for(let i = 0; i < 4; i++){
//         let stackable = 0;
//         let val = board[i][0];
//         if(val !== 0) createTile(arr[i], arr[0], val);
//         for(let j = 1; j < 4; j++){
//             if(board[i][j] == 0) continue;
//             if(val == 0){//stack against merged
//                 val = board[i][j];
//                 board[i][stackable] = val;
//                 board[i][j] = 0;
//                 let number = 4*i+stackable;
//                 const moveTile = new Coordinate(i, j, number, val);
//                 query.push([moveTile, 0]);
//                 continue;
//             }
//             if(board[i][j] == val){//merge
//                 board[i][stackable] = val+val;
//                 board[i][j] = 0;
//                 val = 0;
//                 let number = 4*i+stackable;
//                 const moveTile = new Coordinate(i, j, number, val);
//                 query.push([moveTile, 1]);
//                 stackable++;
//             }
//             else{//stack against different
//                 val = board[i][j];
//                 stackable++;
//                 board[i][stackable] = board[i][j];
//                 if(j!=stackable){
//                     board[i][j] = 0;
//                     let number = 4*i+stackable
//                     const moveTile = new Coordinate(i, j, number, val);
//                     query.push([moveTile, 0]);
//                 }
//                 else{
//                     createTile(arr[i], arr[j], val);
//                 }
                
//             }
//         }
//     }
//     console.log(board);
//     // console.log(query);
//     let animate = [];
//     let deletion = [];
//     if(query.length != 0){
//         query.forEach((item) => {
//             let move = item[0];
//             changeAnimation(createTile(arr[move.x], arr[move.y], move.num), `pos${move.co}`);
//             changeAnimation(createTile(2, 2, item[0].num), `pos2`);
//             console.log(item[0].num);
//         })
//     }
// })

