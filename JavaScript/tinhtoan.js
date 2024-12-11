let mathString = "";
const INPUT = document.getElementById("input");
const OUTPUT = document.getElementById("output");
const HISTORY_HTML = document.getElementById("history");

let History_Calculator = [];

GetHistory_Calculator();

function GetHistory_Calculator() {
    const data = localStorage.getItem("history_pam101_group1");
    if (data) {
        const ObjectData = JSON.parse(data);
        History_Calculator = ObjectData;
        LoadHistory();
    }
}

function LoadHistory() {
    HISTORY_HTML.innerHTML = "";
    for (let index = 0; index < History_Calculator.length; index++) {
        const element = History_Calculator[index];
        HISTORY_HTML.innerHTML += `<div class="main-container-center-buttom-right-1-items">
                                        <div class="main-container-center-buttom-right-1-items-left">
                                            <p>${element.display}</p>
                                        </div>
                                        <div class="main-container-center-buttom-right-1-items-right">
                                            <button onclick="LoadDisplay('${element.display}', '${element.mathString}')"><i class="fa fa-refresh" aria-hidden="true"></i></button>
                                        </div>
                                    </div>`;
    }
}

function LoadDisplay(dis, str) {
    const SOUND = new Audio("../Sound/hoituong.mp3");
    SOUND.play();

    INPUT.textContent = dis;
    mathString = str;
}

function AddMath(math) {
    const SOUND = new Audio("../Sound/duck.mp3");
    SOUND.play();

    INPUT.textContent += math;

    if (math == "Sin(") {
        mathString += "Math.sin(";
        return;
    }
    else if (math == "Cos(") {
        mathString += "Math.cos("
        return;
    }
    else if (math == "Tan(") {
        mathString += "Math.tan("
        return;
    }
    else if (math == "e") {
        mathString += "Math.E"
        return;
    }
    else if (math == "π") {
        mathString += "Math.PI"
        return;
    }
    else if (math == "√(") {
        mathString += "Math.sqrt("
        return;
    }
    else if (math == "log(") {
        mathString += "Math.log("
        return;
    }
    
    mathString += math;
}

function KetQua() {
    const SOUND = new Audio("../Sound/boom.mp3");
    SOUND.play();

    try {
        OUTPUT.textContent = eval(mathString);
        
        if (History_Calculator.length == 0 && mathString.length > 0) {
            History_Calculator.push({
                mathString: mathString,
                display: INPUT.textContent
            });

            localStorage.setItem("history_pam101_group1", JSON.stringify(History_Calculator));

            LoadHistory();
        }
        else if (History_Calculator.length > 0 && History_Calculator[History_Calculator.length - 1].mathString != mathString && mathString.length > 0) {
            if (History_Calculator.length >= 4) {
                History_Calculator.shift();
            }

            
            History_Calculator.push({
                mathString: mathString,
                display: INPUT.textContent
            });

            localStorage.setItem("history_pam101_group1", JSON.stringify(History_Calculator));

            LoadHistory();
        }
    }
    catch {
        mathString = "";
        INPUT.textContent = "Error";
        OUTPUT.textContent = "";
    }
}

function Remove1() {
    const SOUND = new Audio("../Sound/uh.mp3");
    SOUND.play();

    if (INPUT.textContent.substring(INPUT.textContent - 5) == "Error") {
        mathString = "";

        INPUT.textContent = "";
    }

    if (INPUT.textContent.endsWith(" + ") || INPUT.textContent.endsWith(" - ") || INPUT.textContent.endsWith(" * ") || INPUT.textContent.endsWith(" / ")) {
        mathString = mathString.slice(0, -3);

        INPUT.textContent = INPUT.textContent.slice(0, -3);
    }
    else if (INPUT.textContent.endsWith("Sin(") || INPUT.textContent.endsWith("Cos(") || INPUT.textContent.endsWith("Tan(")) {
        mathString = mathString.slice(0, -9);

        INPUT.textContent = INPUT.textContent.slice(0, -4);
    }
    else if (INPUT.textContent.endsWith("π")) {
        mathString = mathString.slice(0, -7);

        INPUT.textContent = INPUT.textContent.slice(0, -2);
    }
    else if (INPUT.textContent.endsWith("e")) {
        mathString = mathString.slice(0, -6);

        INPUT.textContent = INPUT.textContent.slice(0, -1);
    }
    else if (INPUT.textContent.endsWith("√(")) {
        mathString = mathString.slice(0, -12);

        INPUT.textContent = INPUT.textContent.slice(0, -2);
    }
    else if (INPUT.textContent.endsWith("log(")) {
        mathString = mathString.slice(0, -9);

        INPUT.textContent = INPUT.textContent.slice(0, -4);
    }
    else {
        mathString = mathString.slice(0, -1);

        INPUT.textContent = INPUT.textContent.slice(0, -1);
    }
}

function RemoveAll() {
    const SOUND = new Audio("../Sound/Amongus.mp3");
    SOUND.play();

    mathString = "";
    INPUT.textContent = "";
    OUTPUT.textContent = "";
}