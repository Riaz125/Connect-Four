document.querySelector(".board").addEventListener("click", renderClick);

let c1 = [1,2,3,4,5,6]

function renderClick(e) {
    let column = e.target.className;
    console.log([column].shift());
    let rowNum = [column].shift();
    let row = document.getElementsByClassName(`r${rowNum}`);
    let cell = row.getElementsByClassName(`${column}`);
    cell.innerText = "player";
}