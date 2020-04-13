window.addEventListener('load', start);

var inputYear = null;
var resultBox = null;
var animalImg = null;
var showYear = null;

function start() {
    preventSubmit();
    inputYear = document.querySelector('#year');
    inputYear.focus();

    animalImg = document.querySelector("#animalImage");
    resultBox  =  document.querySelector('.message');
    showYear = document.querySelector('#showYear');

    checkInput();
}

function preventSubmit() {
    function handleSubmit(event) {
        event.preventDefault();
    }

    var form = document.querySelector('form');
    form.addEventListener('submit', handleSubmit);
}

function checkInput() {

    function handleInput() {
        year = inputYear.value;
        if (isNaN(year) || year.length != 4) {
            clearInput();
            animalImg.src = '';
            resultBox.textContent = "Oops, please type a valid 4-digit year.";
            showYear.textContent = year;
            resultBox.classList.remove('box');
            return 1;
        }
        else {
            findZodiac(year);
        }
        
    }

    var button = document.querySelector('#button');
    button.addEventListener('click', handleInput);

}

function findZodiac(x) {
    var n = parseInt(x, 10);
    var zodiacNumber = n % 12;

    var chineseYear = n + 2698;
    
    // Chinese cycles: each cycle lasts 60 years; current cycle (78) started in 1984
    var cycleStart = 1984;
    var currentCycle = 78;
    

    // Handles values smaller or higher than the begin and end of the cycle
    if (n >= cycleStart + 60) {
        while (n >= cycleStart + 60) {
            cycleStart += 60;
            currentCycle++;
        }
    }
    else if (n < cycleStart) {
        while (n <= cycleStart) {
            cycleStart -= 60;
            currentCycle--;
        }
    }

    var currentYear = n - cycleStart + 1;

    switch (zodiacNumber) {
        case 0:
            zodiac = "Monkey";
            zodiacImg = 'macaco';
            break;
        case 1:
            zodiac = "Rooster";
            zodiacImg = 'galo';
            break;
        case 2:
            zodiac = "Dog";
            zodiacImg = 'cao';
            break;
        case 3:
            zodiac = "Pig";
            zodiacImg = 'porco';
            break;
        case 4:
            zodiac = "Rat";
            zodiacImg = 'rato';
            break;
        case 5:
            zodiac = "Ox";
            zodiacImg = 'boi';
            break;
        case 6:
            zodiac = "Tiger";
            zodiacImg = 'tigre';
            break;
        case 7:
            zodiac = "Rabbit";
            zodiacImg = 'coelho';
            break;
        case 8:
            zodiac = "Dragon";
            zodiacImg = 'dragao';
            break;
        case 9:
            zodiac = "Snake";
            zodiacImg = 'serpente';
            break;
        case 10:
            zodiac = "Horse";
            zodiacImg = 'cavalo';
            break;
        case 11:
            zodiac = "Goat";
            zodiacImg = 'carneiro';
            break;
    }

    renderResult(zodiac, zodiacImg, chineseYear, currentYear, currentCycle);
    
}

function renderResult(zodiac, zodiacImg, chineseYear, currentYear, currentCycle) {
    animalImg.src = 'https://www.horoscopovirtual.com.br/imagem/signos/horoscopo-chines/'+zodiacImg+'.jpg';
    showYear.textContent = inputYear.value;
    resultBox.textContent = 'Your chinese zodiac sign is ' + zodiac + " and you were born in the year " + chineseYear + " on the chinese calendar, which was the " + currentYear + "th year of the " + currentCycle + "th chinese cycle.";
    resultBox.classList.add('box');
    clearInput();
}

function clearInput() {
    inputYear.value = '';
    inputYear.focus();
}
