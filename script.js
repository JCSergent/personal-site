
// GAME CHANGER
let currentGame = 0;

function changeGame(pos) {
    currentGame += pos;

    const games = document.getElementsByClassName("game");
    if (currentGame > games.length - 1) {
        currentGame = 0;
    } else if(currentGame < 0) {
        currentGame = games.length - 1
    }

    let name = '';
    for (let i = 0; i < games.length; i++) {
        if (currentGame === i) {
            games[i].style.display = 'block';
            name = games[i].id
        } else {
            games[i].style.display = 'none';
        }
    }

    document.getElementById('game-id').innerHTML = name +' Game'
}

changeGame(0);


// MATCH GAME
function matchClick(event) {
    const pos = event.target.id;

    const left = (parseInt(pos[0]) - 1).toString() + pos[1]
    const right = (parseInt(pos[0]) + 1).toString() + pos[1]
    const up = pos[0] + (parseInt(pos[1]).toString() - 1)
    const down = pos[0] + (parseInt(pos[1]) + 1).toString()

    for (const match of [pos, left, right, up, down]) {
        const element = document.getElementsByClassName("match-icon").namedItem(match);

        if (element) {
            if (element.innerHTML === 'O') {
                element.innerHTML = 'X'
            } else {
                element.innerHTML = 'O'
            }
        }
    }
}

function resetMatch() {
    for (const elem of document.getElementsByClassName("match-icon")) {
        if (Math.floor(Math.random() * 3)  === 0) {
            elem.innerHTML = 'X'
        } else {
            elem.innerHTML = 'O'
        }
    }
}

resetMatch();

for (const elem of document.getElementsByClassName("match-icon")) {
    elem.addEventListener("click", matchClick);
}

// GLYPH GAME
const GLYPHS = ['*', '÷', 'ø', 'Ý', 'ħ', '‡', 'œ']

function glyphClick(event) {
    const glyph = event.target.innerHTML;
    const id = parseInt(event.target.id);

    if (glyph === GLYPHS[0]) {
        shiftGlyph(id - 2, -1);
        shiftGlyph(id + 2, -1);    
    } else if(glyph === GLYPHS[1]) {
        shiftGlyph(id - 1, -1);
        shiftGlyph(id - 0, -1);
        shiftGlyph(id + 1, -1);
    } else if(glyph === GLYPHS[2]) {
        shiftGlyph(id - 3, -1);
        shiftGlyph(id - 2, -1);
        shiftGlyph(id + 2, 1);
        shiftGlyph(id + 3, 1);
    } else if(glyph === GLYPHS[3]) {
        shiftGlyph(id - 3, 1);
        shiftGlyph(id + 3, 1);
    } else if(glyph === GLYPHS[4]) {
        shiftGlyph(id - 1, 1);
        shiftGlyph(id + 1, 1);
    } else if(glyph === GLYPHS[5]) {
        shiftGlyph(id - 2, 1); 
        shiftGlyph(id - 1, 2);
        shiftGlyph(id + 1, 2);
        shiftGlyph(id + 2, 2);
    } else if(glyph === GLYPHS[6]) {
        shiftGlyph(id + 1, 2);
        shiftGlyph(id + 2, 2);
    }
}

function shiftGlyph(pos, shift) {
    pos = clampGlyph(pos);

    const glyphElement = document.getElementsByClassName("glyph-icon").namedItem(pos.toString());
    const glyph = glyphElement.innerHTML;
    const newGlyph = GLYPHS.findIndex((g) => g === glyph);
    const i = clampGlyph(newGlyph + shift);
    glyphElement.innerHTML = GLYPHS[i];
}

function clampGlyph(i) {
    if (i < 0) {
        i += GLYPHS.length;
    } else if (i > GLYPHS.length - 1) {
        i -= GLYPHS.length;
    }

    return i;
}

function resetGylph() {
    const glyphElements = document.getElementsByClassName("glyph-icon");
    for (let i=0; i<glyphElements.length;i++) {
        glyphElements[i].innerHTML = GLYPHS[i];
    }
}

resetGylph();

for (const elem of document.getElementsByClassName("glyph-icon")) {
    elem.addEventListener("click", glyphClick);
}

// MEMORY GAME

let isAwaitingInput = false;
let highScore = 0;
let score = 0;
let currIndex = 0;
let sequence = [];
const startMemoryButton = '<div class="game-actions" id="start-memory"><button tooltip="Start" onclick="playMemoryTurn()">Start</button></div>'
const centerGrid = document.getElementsByClassName("memory-icon").namedItem('11');

async function memoryClick(event) {
    if (!isAwaitingInput) {
        return;
    }
    isAwaitingInput = false;
    for (const elem of document.getElementsByClassName("memory-icon")) {
        elem.classList.remove('styled-hover');
    }
    if (event.target.id === sequence[currIndex]) { //correct
        currIndex += 1;
        event.target.innerHTML = '!';
        await new Promise(resolve => setTimeout(resolve, 800));
        event.target.innerHTML = '&nbsp;';
        if (currIndex > sequence.length - 1) {
            console.log('finish turn')
            score += 1;
            document.getElementById('memory-score').innerHTML = score;
            document.getElementsByClassName("memory-icon").namedItem('00').innerHTML = '!';
            document.getElementsByClassName("memory-icon").namedItem('01').innerHTML = '!';
            document.getElementsByClassName("memory-icon").namedItem('02').innerHTML = '!';
            document.getElementsByClassName("memory-icon").namedItem('10').innerHTML = '!';
            document.getElementsByClassName("memory-icon").namedItem('11').innerHTML = 'NICE';
            document.getElementsByClassName("memory-icon").namedItem('12').innerHTML = '!';
            document.getElementsByClassName("memory-icon").namedItem('20').innerHTML = '!';
            document.getElementsByClassName("memory-icon").namedItem('21').innerHTML = '!';
            document.getElementsByClassName("memory-icon").namedItem('22').innerHTML = '!';
            await new Promise(resolve => setTimeout(resolve, 800));
            for (const elem of document.getElementsByClassName("memory-icon")) {
                elem.innerHTML = '&nbsp;';
            }
            await new Promise(resolve => setTimeout(resolve, 800));
            playMemoryTurn();

        } else {
            for (const elem of document.getElementsByClassName("memory-icon")) {
                elem.classList.add('styled-hover');
            }
            isAwaitingInput = true;
        }

    } else { //incorrect
        for (const elem of document.getElementsByClassName("memory-icon")) {
            elem.innerHTML = 'X';
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        document.getElementsByClassName("memory-icon").namedItem('00').innerHTML = '!';
        document.getElementsByClassName("memory-icon").namedItem('01').innerHTML = 'FINAL';
        document.getElementsByClassName("memory-icon").namedItem('02').innerHTML = '!';
        document.getElementsByClassName("memory-icon").namedItem('10').innerHTML = '!';
        document.getElementsByClassName("memory-icon").namedItem('11').innerHTML = 'SCORE';
        document.getElementsByClassName("memory-icon").namedItem('12').innerHTML = '!';
        document.getElementsByClassName("memory-icon").namedItem('20').innerHTML = '!';
        document.getElementsByClassName("memory-icon").namedItem('21').innerHTML = score;
        document.getElementsByClassName("memory-icon").namedItem('22').innerHTML = '!';
        await new Promise(resolve => setTimeout(resolve, 2000));
        if (score > highScore) {
            document.getElementsByClassName("memory-icon").namedItem('00').innerHTML = '!';
            document.getElementsByClassName("memory-icon").namedItem('01').innerHTML = 'NEW';
            document.getElementsByClassName("memory-icon").namedItem('02').innerHTML = '!';
            document.getElementsByClassName("memory-icon").namedItem('10').innerHTML = '!';
            document.getElementsByClassName("memory-icon").namedItem('11').innerHTML = 'HIGH';
            document.getElementsByClassName("memory-icon").namedItem('12').innerHTML = '!';
            document.getElementsByClassName("memory-icon").namedItem('20').innerHTML = '!';
            document.getElementsByClassName("memory-icon").namedItem('21').innerHTML = 'SCORE';
            document.getElementsByClassName("memory-icon").namedItem('22').innerHTML = '!';
            await new Promise(resolve => setTimeout(resolve, 2000));
            highScore = score;
            document.getElementById('memory-highscore').innerHTML = highScore;
        }

        resetMemoryGame();
    }
}

async function playMemoryTurn() {
    const newPos = Math.floor(Math.random() * 2).toString() + Math.floor(Math.random() * 2).toString()
    sequence.push(newPos);

    centerGrid.innerHTML = '3';
    await new Promise(resolve => setTimeout(resolve, 800));
    centerGrid.innerHTML = '2';
    await new Promise(resolve => setTimeout(resolve, 800));
    centerGrid.innerHTML = '1';
    await new Promise(resolve => setTimeout(resolve, 800));
    centerGrid.innerHTML = '&nbsp;';
    await new Promise(resolve => setTimeout(resolve, 800));

    for (const pos of sequence) {
        const element = document.getElementsByClassName("memory-icon").namedItem(pos);
        element.innerHTML = '!';
        await new Promise(resolve => setTimeout(resolve, 800));
        element.innerHTML = '&nbsp;';
        await new Promise(resolve => setTimeout(resolve, 500)); // half second
    }
    
    for (const elem of document.getElementsByClassName("memory-icon")) {
        elem.classList.add('styled-hover');
    }
    currIndex = 0;
    isAwaitingInput = true;
}


function resetMemoryGame() {
    for (const elem of document.getElementsByClassName("memory-icon")) {
        elem.innerHTML = '&nbsp;';
        elem.classList.remove('styled-hover');
    }
    
    sequence = [];
    currIndex = 0;
    score = 0;
    document.getElementById('memory-score').innerHTML = score;
    isAwaitingInput = false;
    centerGrid.style.opacity = '100%';
    centerGrid.innerHTML = startMemoryButton;
}

resetMemoryGame();

for (const elem of document.getElementsByClassName("memory-icon")) {
    elem.addEventListener("click", memoryClick);
}