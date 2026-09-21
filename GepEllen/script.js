let matrix = [
  [false, false, false],
  [false, false, false],
  [false, false, false],
];

let kiiro = document.getElementById("kiiro");

let plyr1 = [];
let plyr2 = [];

let currentplayer = 1;
let win = false;
let turncounter = 0;

function removeOnclick() {
  let btns = document.querySelectorAll("button");
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
      win = true;
      removeOnclick();
      return true;
    }
  } else if (player == 2) {
    if (oszlop(plyr2) || sor(plyr2) || keresztbe(plyr2)) {
      win = true;
      removeOnclick();
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
        changestuff("GÉP NYERT");
      } else {
        turncounter++;

        if (turncounter == 9 && !win) {
          removeOnclick();
          changestuff("DÖNTETLEN");
          return;
        }

        currentplayer = 1;
        changestuff(currentplayer);
        changestuff(currentplayer);
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
        changestuff("JÁTÉKOS [1] NYERT");
      } else {
        turncounter++;

        if (turncounter == 9 && !win) {
          removeOnclick();
          changestuff("DÖNTETLEN");
          return;
        }

        currentplayer = 2;
        changestuff(currentplayer);
        geprobbantinnit();
      }
    }
  } else {
    console.log(x + y + " false");
  }
}

function changestuff(input) {
  if (input == 1) {
    kiiro.innerHTML = "JÁTÉKOS [1] KÖVETKEZIK";
  } else if (input == 2) {
    kiiro.innerHTML = "GÉP KÖVETKEZIK";
  } else {
    kiiro.innerHTML = input;
  }
}

function jatek() {
  let btns = document.querySelectorAll("button");
  btns.forEach((element) => {
    element.onclick = gombkatt;
  });
}

jatek();
