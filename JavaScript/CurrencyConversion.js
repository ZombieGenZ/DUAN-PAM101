const MNI_1 = document.getElementById("mni-1");
const MNI_2 = document.getElementById("mni-2");

function LoadCurrency() {
    fetch('https://api.exchangerate-api.com/v4/latest/VND')
    .then(res => res.json())
    .then(data => {
        let html = "";

        for (const key in data.rates) {
            if (key == data.base) {
                html += `<li class="active">${key}</li>`;
            }
            else {
                html += `<li>${key}</li>`;
            }
        }

        MNI_1.innerHTML = html;
        MNI_2.innerHTML = html;

        const dropdownElements = document.querySelectorAll('.main-container-center-2-group-buttom-right');

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
    });
}

LoadCurrency();

function Conversion() {
  const SOUND = new Audio("../Sound/boom.mp3");
  SOUND.play();

  const from = document.getElementById("from").textContent;
  const fromNumber = document.getElementById("fromNumber").value;
  const to = document.getElementById("to").textContent;

  if (fromNumber == "") {
    return;
  }

  fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
  .then(res => res.json())
  .then(data => {
      let ketQua = 0;

      ketQua = fromNumber * data.rates[to];

      document.getElementById("toNumber").value = ketQua;
  });
}

function DeleteAll() {
  const SOUND = new Audio("../Sound/Amongus.mp3");
  SOUND.play();

  document.getElementById("fromNumber").value = "";
  document.getElementById("toNumber").value = "";
}