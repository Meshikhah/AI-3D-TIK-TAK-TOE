let board = [
    ['','','',''],
    ['','','',''],
    ['','','',''],
    ['','','',''],

    ['','','',''],
    ['','','',''],
    ['','','',''],
    ['','','',''],

    ['','','',''],
    ['','','',''],
    ['','','',''],
    ['','','',''],

    ['','','',''],
    ['','','',''],
    ['','','',''],
    ['','','','']


];

// let board1 = [
//     ['X', 'X', 'X' ,'X'],
//     ['X', 'X', 'X' ,'X'],
//     ['X', 'X', 'X' ,'X'],
//     ['O', 'O', 'O' ,'O'],

//     ['O', 'O', 'O' ,'O'],
//     ['X', 'X', 'X' ,'X'],
//     ['O', 'O', 'O' ,'O'],
//     ['O', 'O', 'O' ,'O'],

//     ['X', 'X', 'X' ,'X'],
//     ['X', 'X', 'X' ,'X'],
//     ['X', 'X', 'X' ,'X'],
//     ['X', 'X', 'X' ,'X'],

//     ['X', 'X', 'X' ,'X'],
//     ['X', 'X', 'X' ,'X'],
//     ['X', 'X', 'X' ,'X'],
//     ['X', 'X', 'X' ,'X'],
// ]



let w;
let h;
let ai = "X";
let human= "O";
let turn = 0;
let players = [ai, human];
let AIcurrrentPlayer = 0;
let currentPlayer = human;

function setup(){
    createCanvas(600, 2400);
    textSize(32);
    w = width / 4;
    h = height / 16;
    AIcurrentPlayer = floor(random(players.length));

    AIbestMove();
    // bestMove();
    // nextTurn();

    // Ai_vs_Rand();
}

// function mousePressed(){
//     if(currentPlayer == human){
//         let i = floor(mouseX / w);
//         let j = floor(mouseY / h);
//         if(board[j][i] ==''){
//             board[j][i] = human;
//             currentPlayer = ai;
//             bestMove();
//             // nextTurn();
//         }
//     }

// }

function equals2(a, b){
    return (a==b && a != '');
}

function equals3(a, b, c){
    return (a==b && b==c && a != '');
}


function equals4(a, b, c, d){
    return (a==b && b==c && c==d && a != '');
}

function utility1(board1){
    let winner = null;

    

    //HORIZONTAL
    for(let i = 0; i < 16; i++){
        if(equals4(board1[i][0], board1[i][1], board1[i][2], board1[i][3])){
            winner = board1[i][0]; 
        }
    }

    

    //VERTICALL
    for(let i = 0; i < 16; i = i + 4){
        for(let j = 0; j < 4; j++){
            if(equals4(board1[i][j], board1[i + 1][j], board1[i + 2][j], board1[i + 3][j])){
                winner = board1[i][j];
            }
        }
    }
    //DIAGONAL
    for(let i = 0 ; i < 16; i = i + 4){
        if(equals4(board1[i][0], board1[i + 1][1], board1[i + 2][2], board1[i + 3][3])){
            winner = board1[i][0];       
        }
    }

    for(let i = 0 ; i < 16; i = i + 4){
        if(equals4(board1[i][3], board1[i + 1][2], board1[i + 2][1], board1[i + 3][0])){
            winner = board1[i][3];
        }
    }
    
    //*3D vertical
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            if(equals4(board1[i][j], board1[i + 4][j], board1[i + 8][j], board1[i + 12][j])){
                winner = board1[i][j];
                
            }
        }
    }

    //*3D DIAGONAL
    if(equals4(board1[0][0], board1[5][1], board1[10][2], board1[15][3])){
        winner = board1[0][0];
        
        
    }

    if(equals4(board1[0][3], board1[5][2], board1[10][1], board1[15][0])){
        winner = board1[0][3];
        

    }
    
    if(equals4(board1[3][0], board1[6][1], board1[9][2], board1[12][3])){
        winner = board1[3][0];
        
    }

    if(equals4(board1[3][3], board1[6][2], board1[9][1], board1[12][0])){
        winner = board1[3][3];
        
    }

    //*

    for(let i = 0; i < 4; i++){
        if(equals4(board1[0][i], board1[5][i], board1[10][i], board1[15][i])){
            winner = board1[0][i];
            
        }
    }
    
    for(let i = 0; i < 4; i++){
        if(equals4(board1[3][i], board1[6][i], board1[9][i], board1[12][i])){
            winner = board1[3][i];
            
        }
    }

    for(let i = 0; i < 4; i++){
        if(equals4(board1[i][0], board1[i+4][1], board1[i+8][2], board1[i+12][3])){
            winner = board1[i][0];
        }
    }

    for(let i = 0; i < 4; i++){
        if(equals4(board1[i][3], board1[i+4][2], board1[i+8][1], board1[i+12][0])){
            winner = board1[i][3];  
        }
    } 

    let openSpots = 0;
    for(let i = 0; i < 16; i++){
        for(let j = 0; j < 4; j++){
            if(board1[i][j] == ''){
                openSpots++;
            }
        }
    }

    if(winner == null && openSpots == 0){
        return 'tie';
    }
    else {
        return winner;
    }

}

function utility(){
    
    let winner = null;

    

    //HORIZONTAL
    for(let i = 0; i < 16; i++){
        if(equals4(board[i][0], board[i][1], board[i][2], board[i][3])){
            winner = board[i][0]; 
        }
    }

    

    //VERTICALL
    for(let i = 0; i < 16; i = i + 4){
        for(let j = 0; j < 4; j++){
            if(equals4(board[i][j], board[i + 1][j], board[i + 2][j], board[i + 3][j])){
                winner = board[i][j];
            }
        }
    }
    //DIAGONAL
    for(let i = 0 ; i < 16; i = i + 4){
        if(equals4(board[i][0], board[i + 1][1], board[i + 2][2], board[i + 3][3])){
            winner = board[i][0];       
        }
    }

    for(let i = 0 ; i < 16; i = i + 4){
        if(equals4(board[i][3], board[i + 1][2], board[i + 2][1], board[i + 3][0])){
            winner = board[i][3];
        }
    }
    
    //*3D vertical
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            if(equals4(board[i][j], board[i + 4][j], board[i + 8][j], board[i + 12][j])){
                winner = board[i][j];
                
            }
        }
    }

    //*3D DIAGONAL
    if(equals4(board[0][0], board[5][1], board[10][2], board[15][3])){
        winner = board[0][0];
        
        
    }

    if(equals4(board[0][3], board[5][2], board[10][1], board[15][0])){
        winner = board[0][3];
        

    }
    
    if(equals4(board[3][0], board[6][1], board[9][2], board[12][3])){
        winner = board[3][0];
        
    }

    if(equals4(board[3][3], board[6][2], board[9][1], board[12][0])){
        winner = board[3][3];
        
    }

    //*

    for(let i = 0; i < 4; i++){
        if(equals4(board[0][i], board[5][i], board[10][i], board[15][i])){
            winner = board[0][i];
            
        }
    }
    
    for(let i = 0; i < 4; i++){
        if(equals4(board[3][i], board[6][i], board[9][i], board[12][i])){
            winner = board[3][i];
            
        }
    }

    for(let i = 0; i < 4; i++){
        if(equals4(board[i][0], board[i+4][1], board[i+8][2], board[i+12][3])){
            winner = board[i][0];
        }
    }

    for(let i = 0; i < 4; i++){
        if(equals4(board[i][3], board[i+4][2], board[i+8][1], board[i+12][0])){
            winner = board[i][3];  
        }
    } 

    let openSpots = 0;
    for(let i = 0; i < 16; i++){
        for(let j = 0; j < 4; j++){
            if(board[i][j] == ''){
                openSpots++;
            }
        }
    }

    if(winner == null && openSpots == 0){
        return 'tie';
    }
    else {
        return winner;
    }


}

function draw(){
    background(190);
    strokeWeight(4);
    
    //vertical lines
    for(let i = 1; i < 4; i++){
    
        line(w * i, 0, w * i, height);
    }

    //horizontal lines
    for(let i = 1; i < 16; i++){
        if(i == 4 || i == 8 || i == 12){
            stroke(255, 0, 0);
        }else{
            stroke(0);
        }
        line(0, h * i, width, h * i);
    }
    


    //drawing X and O
    for(let i = 0; i < 16; i++){
        for(let j = 0; j < 4; j++){
            
            let x = w * j + w/2;
            let y = h * i + w/2;
            let spot = board[i][j];
            let xr = w/4;
            if(human == spot){
                noFill();
                ellipse(x, y, xr * 2);
            }else if(spot == ai){
                line(x - xr, y - xr, x + xr, y + xr);
                line(x + xr, y - xr, x - xr, y + xr); 
            }
        }
    }

    let result = utility();
    // console.log(result);
    if (result != null){
        noLoop();
        console.log(result);
        console.log('wholeNodeExpands', wholeNodeExpands);
    }
    else{
        // Ai_vs_Rand();
        AIbestMove();
    }

}