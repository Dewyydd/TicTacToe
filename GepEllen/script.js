let matrix = [
  [false, false, false],
  [false, false, false],
  [false, false, false],
];

let xKiiro = document.getElementById("xKiiro");
let dontetlenKiiro = document.getElementById("dontetlenKiiro");
let oKiiro = document.getElementById("oKiiro");

let resetGomb = document.getElementById("reset");

let xSzamlalo = 0;
let oSzamlalo = 0;
let dontetlenSzamlalo = 0;

let plyr1 = [];
let plyr2 = [];

let currentplayer = 1;
let win = false;
let turncounter = 0;

function removeOnclick() {
  let btns = document.querySelectorAll(".tictactoecontainer div button");
  btns.forEach((element) => {
    element.onclick = null;
  });
}
function oszlop(array) {
  count1 = 0;
  count2 = 0;
  count3 = 0;

  array.forEach((element) => {
    console.log(element[1]);
    if (element[1] == 0) {
      count1++;
    } else if (element[1] == 1) {
      count2++;
    } else if (element[1] == 2) {
      count3++;
    }
  });

  if (count1 == 3 || count2 == 3 || count3 == 3) {
    return true;
  } else {
    return false;
  }
}
function sor(array) {
  count1 = 0;
  count2 = 0;
  count3 = 0;

  array.forEach((element) => {
    console.log(element[0]);
    if (element[0] == 0) {
      count1++;
    } else if (element[0] == 1) {
      count2++;
    } else if (element[0] == 2) {
      count3++;
    }
  });

  if (count1 == 3 || count2 == 3 || count3 == 3) {
    return true;
  } else {
    return false;
  }
}
function keresztbe(array) {
  let t1 = false;
  let t2 = false;
  let t3 = false;

  array.forEach((element) => {
    if (element == "00") {
      t1 = true;
    } else if (element == "11") {
      t2 = true;
    } else if (element == "22") {
      t3 = true;
    }
  });

  if (t1 && t2 && t3) {
    return true;
  } else {
    t1 = false;
    t2 = false;
    t3 = false;

    array.forEach((element) => {
      if (element == "20") {
        t1 = true;
      } else if (element == "11") {
        t2 = true;
      } else if (element == "02") {
        t3 = true;
      }
    });

    if (t1 && t2 && t3) {
      return true;
    } else {
      return false;
    }
  }
}

function checkwin(player) {
  if (player == 1) {
    if (oszlop(plyr1) || sor(plyr1) || keresztbe(plyr1)) {
      xSzamlalo++;
      win = true;
      removeOnclick();
      resetGomb.style.display = "block";
      return true;
    }
  } else if (player == 2) {
    if (oszlop(plyr2) || sor(plyr2) || keresztbe(plyr2)) {
      oSzamlalo++;
      win = true;
      removeOnclick();
      resetGomb.style.display = "block";
      return true;
    }
  }
}

function geprobbantinnit() {
  while (true) {
    let random1 = Math.floor(Math.random() * 3);
    let random2 = Math.floor(Math.random() * 3);

    if (matrix[random1][random2] == false) {
      matrix[random1][random2] = true;
      console.log("gep: " + random1 + random2);
      let id = "" + random1 + random2;
      plyr2.push(id);

      let button = document.getElementById(id);
      button.classList.add("red");
      button.innerHTML = "O";

      if (checkwin(2)) {
        oKiiro.querySelector("p").innerHTML = oSzamlalo;
      } else {
        turncounter++;

        if (turncounter == 9 && !win) {
          removeOnclick();
          dontetlenSzamlalo++;
          dontetlenKiiro.querySelector("p").innerHTML = dontetlenSzamlalo;
          resetGomb.style.display = "block";
          return;
        }

        currentplayer = 1;
        xKiiro.classList.add("kovetkezik");
        oKiiro.classList.remove("kovetkezik");
      }

      break;
    }
  }
}

function gombkatt(event) {
  let x = event.target.id[0];
  let y = event.target.id[1];

  if (matrix[x][y] == false) {
    matrix[x][y] = true;
    if (currentplayer == 1) {
      console.log("plyr1: " + event.target.id);
      plyr1.push(event.target.id);

      let button = document.getElementById(event.target.id);
      button.classList.add("green");
      button.innerHTML = "X";

      if (checkwin(1)) {
        xKiiro.querySelector("p").innerHTML = xSzamlalo;
      } else {
        turncounter++;

        if (turncounter == 9 && !win) {
          removeOnclick();
          dontetlenSzamlalo++;
          dontetlenKiiro.querySelector("p").innerHTML = dontetlenSzamlalo;
          resetGomb.style.display = "block";
          return;
        }

        currentplayer = 2;
        xKiiro.classList.remove("kovetkezik");
        oKiiro.classList.add("kovetkezik");
        geprobbantinnit();
      }
    }
  } else {
    console.log(x + y + " false");
  }
}

function jatek() {
  let btns = document.querySelectorAll(".tictactoecontainer div button");
  btns.forEach((element) => {
    element.onclick = gombkatt;
  });
}

function reset() {
  matrix = [
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ];

  plyr1 = [];
  plyr2 = [];

  currentplayer = 1;
  win = false;
  turncounter = 0;

  let btns = document.querySelectorAll(".tictactoecontainer div button");
  btns.forEach((element) => {
    element.innerHTML = "";
    element.classList.remove("green");
    element.classList.remove("red");
  });

  xKiiro.classList.add("kovetkezik");
  oKiiro.classList.remove("kovetkezik");

  resetGomb.style.display = "none";

  jatek();
}

jatek();
