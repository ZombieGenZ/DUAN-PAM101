const dropdownElements = document.querySelectorAll('.main-container-center-top-type');

dropdownElements.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');

    select.addEventListener('click', () => {
    select.classList.toggle('select-clicked');
    caret.classList.toggle('caret-rotate');

    menu.classList.toggle('menu-open');
    });

    options.forEach(option => {
    option.addEventListener('click', () => {
        selected.textContent = option.textContent;
        select.classList.remove('select-clicked');
        caret.classList.remove('caret-rotate');
        menu.classList.remove('menu-open');

        options.forEach(option => option.classList.remove('active'));
        option.classList.add('active');
    });
    });
});

document.getElementById("selection_1").addEventListener("click", () => {
    document.getElementById("soC").readOnly = true;
    document.getElementById("soC").value = "";
});

document.getElementById("selection_2").addEventListener("click", () => {
    document.getElementById("soC").readOnly = false;
});    

let History_Calculator = [];

function GetHistory_Calculator() {
    const data = localStorage.getItem("solve_history_pam101_group1");
    if (data) {
        const ObjectData = JSON.parse(data);
        History_Calculator = ObjectData;
        LoadHistory();
    }
}

GetHistory_Calculator();

function LoadHistory() {
    const HISTORY_HTML = document.getElementById("history");

    HISTORY_HTML.innerHTML = "";
    for (let index = 0; index < History_Calculator.length; index++) {
        const element = History_Calculator[index];
        HISTORY_HTML.innerHTML += `<div class="main-container-center-bottom-history-items">
                                        <div class="main-container-center-bottom-history-items-left">
                                            ${element.display}
                                        </div>
                                        <div class="main-container-center-bottom-history-items-right">
                                            <button onclick="LoadMath('${element.a}', '${element.b}', '${element.c}', '${element.type}')"><i class="fa fa-refresh" aria-hidden="true"></i></button>
                                        </div>
                                    </div>`;
    }
}

function Tinh() {
    const SOUND = new Audio("../Sound/boom.mp3");
    SOUND.play();

    if (document.getElementById("from").textContent == "Phương trình bật 1") {
        let a = document.getElementById("soA").value;
        let b = document.getElementById("soB").value;
        const ketQua = document.getElementById("ketQua");

        if (a == "" || b == "") {
            return;
        }

        if (a == 0)
        {
            if (b == 0)
            {
                ketQua.innerHTML = "PT có vô số nghiệm";
            }
            else
            {
                ketQua.innerHTML = "PT vô nghiệm";
            }
        }
        else
        {
            let x = -b / a;
            ketQua.innerHTML = `Nghiệm của PT là:<br>x = ${x}`;
        }

        if (History_Calculator.length == 0) {
            History_Calculator.push({
                a: a,
                b: b,
                type: 1,
                display: `A: ${a}, B: ${b}`
            });

            localStorage.setItem("solve_history_pam101_group1", JSON.stringify(History_Calculator));

            LoadHistory();
        }
        else if (History_Calculator.length > 0 && History_Calculator[History_Calculator.length - 1].display != `A: ${a}, B: ${b}`) {
            if (History_Calculator.length >= 5) {
                History_Calculator.shift();
            }
            
            History_Calculator.push({
                a: a,
                b: b,
                type: 1,
                display: `A: ${a}, B: ${b}`
            });
            
            localStorage.setItem("solve_history_pam101_group1", JSON.stringify(History_Calculator));
            
            LoadHistory();
        }
    }
    else {
        let a = document.getElementById("soA").value;
        let b = document.getElementById("soB").value;
        let c = document.getElementById("soC").value;
        const ketQua = document.getElementById("ketQua");

        if (a == "" || b == "" || c == "") {
            return;
        }

        if (a == 0)
        {
            if (b == 0)
            {
                if (c == 0)
                {
                    ketQua.innerHTML = "PT có vô số nghiệm";
                }
                else
                {
                    ketQua.innerHTML = "PT vô nghiệm";
                }
            }
            else
            {
                let x = -c / b;
                ketQua.innerHTML = `Nghiệm của PT là:<br>x = ${x}`;
            }
        }
        else
        {
            let delta = b * b - 4 * a * c;
            if (delta < 0)
            {
                ketQua.innerHTML = "PT vô nghiệm";
            }
            else if (delta == 0)
            {
                let x = -b / (2 * a);
                ketQua.innerHTML = `PT có nghiệm kép:<br>x1 = x2 = ${x}`;
            }
            else
            {
                let x1 = (-b + Math.sqrt(delta)) / (2 * a);
                let x2 = (-b - Math.sqrt(delta)) / (2 * a);
                ketQua.innerHTML = `PT có 2 nghiệm phân biệt:<br>x1 = ${x1},<br>>x2 = ${x2}`;
            }
        }

        if (History_Calculator.length == 0 && mathString.length > 0) {
            History_Calculator.push({
                a: a,
                b: b,
                c: c,
                type: 2,
                display: `A: ${a}, B: ${b}, C: ${c}`
            });

            localStorage.setItem("solve_history_pam101_group1", JSON.stringify(History_Calculator));

            LoadHistory();
        }
        else if (History_Calculator.length > 0 && History_Calculator[History_Calculator.length - 1].display != `A: ${a}, B: ${b}, C: ${c}`) {
            if (History_Calculator.length >= 5) {
                History_Calculator.shift();
            }
            
            History_Calculator.push({
                a: a,
                b: b,
                c: c,
                type: 2,
                display: `A: ${a}, B: ${b}, C: ${c}`
            });

            localStorage.setItem("solve_history_pam101_group1", JSON.stringify(History_Calculator));

            LoadHistory();
        }
    }
}

function LoadMath(a, b, c, type) {
    const SOUND = new Audio("../Sound/hoituong.mp3");
    SOUND.play();

    let menu = document.getElementById("type");
    
    if (type == 1) {
        menu.innerHTML = `<div class="select">
                            <span class="selected" id="from">Phương trình bật 1</span>
                            <div class="caret"></div>
                        </div>
                        <ul class="menu" id="mni">
                            <li class="active" id="selection_1">Phương trình bật 1</li>
                            <li id="selection_2">Phương trình bật 2</li>
                        </ul>`;


        const dropdownElements = document.querySelectorAll('.main-container-center-top-type');

        dropdownElements.forEach(dropdown => {
            const select = dropdown.querySelector('.select');
            const caret = dropdown.querySelector('.caret');
            const menu = dropdown.querySelector('.menu');
            const options = dropdown.querySelectorAll('.menu li');
            const selected = dropdown.querySelector('.selected');

            select.addEventListener('click', () => {
            select.classList.toggle('select-clicked');
            caret.classList.toggle('caret-rotate');

            menu.classList.toggle('menu-open');
            });

            options.forEach(option => {
            option.addEventListener('click', () => {
                selected.textContent = option.textContent;
                select.classList.remove('select-clicked');
                caret.classList.remove('caret-rotate');
                menu.classList.remove('menu-open');

                options.forEach(option => option.classList.remove('active'));
                option.classList.add('active');
            });
            });
        });

        document.getElementById("selection_1").addEventListener("click", () => {
            document.getElementById("soC").readOnly = true;
            document.getElementById("soC").value = "";
        });
        
        document.getElementById("selection_2").addEventListener("click", () => {
            document.getElementById("soC").readOnly = false;
        });    

        document.getElementById("soC").readOnly = true;
        document.getElementById("soC").value = "";

        document.getElementById("soA").value = a;
        document.getElementById("soB").value = b;
    }
    else {
        menu.innerHTML = `<div class="select">
                            <span class="selected" id="from">Phương trình bật 2</span>
                            <div class="caret"></div>
                        </div>
                        <ul class="menu" id="mni">
                            <li id="selection_1">Phương trình bật 1</li>
                            <li class="active" id="selection_2">Phương trình bật 2</li>
                        </ul>`;

        const dropdownElements = document.querySelectorAll('.main-container-center-top-type');

        dropdownElements.forEach(dropdown => {
            const select = dropdown.querySelector('.select');
            const caret = dropdown.querySelector('.caret');
            const menu = dropdown.querySelector('.menu');
            const options = dropdown.querySelectorAll('.menu li');
            const selected = dropdown.querySelector('.selected');

            select.addEventListener('click', () => {
            select.classList.toggle('select-clicked');
            caret.classList.toggle('caret-rotate');

            menu.classList.toggle('menu-open');
            });

            options.forEach(option => {
            option.addEventListener('click', () => {
                selected.textContent = option.textContent;
                select.classList.remove('select-clicked');
                caret.classList.remove('caret-rotate');
                menu.classList.remove('menu-open');

                options.forEach(option => option.classList.remove('active'));
                option.classList.add('active');
            });
            });
        });

        document.getElementById("selection_1").addEventListener("click", () => {
            document.getElementById("soC").readOnly = true;
            document.getElementById("soC").value = "";
        });
        
        document.getElementById("selection_2").addEventListener("click", () => {
            document.getElementById("soC").readOnly = false;
        });    

        document.getElementById("soC").readOnly = false;

        document.getElementById("soA").value = a;
        document.getElementById("soB").value = b;
        document.getElementById("soC").value = c;
    }
}