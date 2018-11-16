function pocitej() {
  var vyraz = "";
  var zasobnik = [];
  var priklad = document.getElementById("dogram").value;

  for (var x = 0; x < priklad.length; x++) {
    if (!isNaN(priklad[x])) {
      vyraz += priklad[x];
    }
    if (
      priklad[x] === "+" ||
      priklad[x] === "-" ||
      priklad[x] === "/" ||
      priklad[x] === "*"
    ) {
      vyraz += " ";
      if (priority(zasobnik[zasobnik.length - 1]) == 2) {
        vyraz += zasobnik.pop() + " ";
      }
      if (priority(priklad[x]) == 1 && zasobnik.length == 1) {
        vyraz += zasobnik.pop() + " ";
        zasobnik.push(priklad[x]);
      }
      if (priority(priklad[x]) == 2) {
        zasobnik.push(priklad[x]);
      }
      if (priority(priklad[x]) == 1 && zasobnik.length == 0) {
        zasobnik.push(priklad[x]);
      }
    }
  }
  while (zasobnik.length != 1 && res == null) {
    vyraz += zasobnik.pop() + " ";
  }
  return (vyraz += " " + zasobnik.pop());
}
function priority(str) {
  switch (str) {
    case "+":
    case "-":
      return 1;
    case "*":
    case "/":
      return 2;
    default:
      return 0;
  }
}
function Postfix(vyraz) {
  var finalzasobnik = [];
  vyraz = vyraz.split(" ");
  for (var i = 0; i < vyraz.length; i++) {
    if (!isNaN(vyraz[i])) {
      finalzasobnik.push(vyraz[i]);
    } else {
      var a = finalzasobnik.pop();
      var b = finalzasobnik.pop();
      if (vyraz[i] === "+") {
        finalzasobnik.push(parseInt(a) + parseInt(b));
      } else if (vyraz[i] === "-") {
        finalzasobnik.push(parseInt(b) - parseInt(a));
      } else if (vyraz[i] === "*") {
        finalzasobnik.push(parseInt(a) * parseInt(b));
      } else if (vyraz[i] === "/") {
        finalzasobnik.push(parseInt(b) / parseInt(a));
      }
    }
  }
  if (finalzasobnik.length > 1) {
    return "error";
  } else {
    return finalzasobnik.pop();
  }
}
var str = "10+214";
var res = str.match(/^-?([0-9]+[-+/*]?)+[0-9]$/g);
var doit = document.getElementById("doit");
doit.onclick = function() {
  var result = Postfix(pocitej());
  console.log(result);
  if (result === undefined) {
    document.getElementById("answer").innerHTML = "Chybný výraz!";
  } else {
    document.getElementById("answer").innerHTML = result;
  }
};
