
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
        if (document.getElementById(match)) {
            console.log(document.getElementById(match).innerHTML)
            if (document.getElementById(match).innerHTML === 'O') {
                document.getElementById(match).innerHTML = 'X'
            } else {
                document.getElementById(match).innerHTML = 'O'
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

    const glyphElement = document.getElementById(pos.toString());
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