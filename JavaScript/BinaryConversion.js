const dropdownElements = document.querySelectorAll('.main-container-center-top-group-top');

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

function CheckSelect_mni_1() {
    const currnt = document.getElementById("from");
    const next = document.getElementById("to");

    const select_1 = document.createElement("mni-2-select-1");
    const select_2 = document.createElement("mni-2-select-2");

    if (currnt.textContent == "Text") {
        select_1.classList.toggle("active");
        select_2.classList.toggle("active");
        next.textContent = "Text";
    }
    else {
        select_1.classList.toggle("active");
        select_2.classList.toggle("active");
        next.textContent = "Binary";
    }
}

function CheckSelect_mni_2() {
    const currnt = document.getElementById("to");
    const next = document.getElementById("from");

    const select_1 = document.createElement("mni-1-select-1");
    const select_2 = document.createElement("mni-1-select-2");

    if (currnt.textContent == "Text") {
        select_1.classList.toggle("active");
        select_2.classList.toggle("active");
        next.textContent = "Text";
    }
    else {
        select_1.classList.toggle("active");
        select_2.classList.toggle("active");
        next.textContent = "Binary";
    }
}

function stringToBinary(str) {
    return str.split('').map(char => {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join(' ');
}

function binaryToString(binary) {
    return binary.split(' ').map(binaryChar => {
        return String.fromCharCode(parseInt(binaryChar, 2));
    }).join('');
}

function Conversion() {
    const SOUND = new Audio("../Sound/boom.mp3");
    SOUND.play();

    const start = document.getElementById("start").value;
    const end = document.getElementById("end");

    if (document.getElementById("from").textContent == "Text") {
        end.textContent = stringToBinary(start);
    }
    else {
        end.textContent = binaryToString(start);
    }
}