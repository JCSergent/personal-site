
var scale = 100

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

for (const elem of document.getElementsByClassName("match-icon")) {
    elem.addEventListener("click", matchClick);
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

resetMatch()