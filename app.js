// catch all the variable in gloabal
//1) timer variables
// work time
var work_hours = document.querySelector(".work_hours");
var work_minutes = document.querySelector(".work_minutes");
var work_seconds = document.querySelector(".work_seconds");

//2) break time
var break_hours = document.querySelector(".break_hours");
var break_minutes = document.querySelector(".break_minutes");
var break_seconds = document.querySelector(".break_seconds");

//3) the id of the timer
var work_timer_id;
var break_timer_id;
//4) the controllers
var controler = document.querySelector(".controllers");
var start_work = document.querySelector(".start_work");
var start_break = document.querySelector(".start_break");
var resume_work = document.querySelector(".resume_work");
var end_work = document.querySelector(".end_work");

// global seconds , minutes , hours
var hours = 0,
    minutes = 0,
    seconds = 0;

function renderZeroes(num) {
    return num < 9 ? "0" + num : num;
}

function timer(hours, minutes, seconds) {
    // start timer

    var _hours = parseInt(hours.innerText);
    var _minutes = parseInt(minutes.innerText);
    var _seconds = parseInt(seconds.innerText);
    _seconds++;

    if (_seconds > 59) {
        _seconds = 0;
        _minutes++;
    }
    if (_minutes > 59) {
        _minutes = 0;
        _hours++;
    }

    // set the work for the default

    hours.innerText = _hours;
    minutes.innerText = renderZeroes(_minutes);
    seconds.innerText = renderZeroes(_seconds);
}

// catch the start button to add event listenter multiple event listener on start

function reset() {
    work_hours.innerText = 0;
    work_minutes.innerText = renderZeroes(0);
    work_seconds.innerText = renderZeroes(0);
    break_hours.innerText = 0;
    break_minutes.innerText = renderZeroes(0);
    break_seconds.innerText = renderZeroes(0);
    init();
    clearInterval(break_timer_id);
    clearInterval(work_timer_id);
}

function choice() {
    clearInterval(break_timer_id);
    work_timer_id = setInterval(function() {
        timer(work_hours, work_minutes, work_seconds);
    }, 1000);
}

start_work.addEventListener("click", function(e) {
    choice();
    start_work.disabled = true;
    start_break.disabled = false;
    end_work.disabled = false;
    clearInterval(break_timer_id);
});

function init() {
    Array.from(controler.children).forEach(function(ele, index) {
        if (index != 0) {
            ele.disabled = true;
        } else {
            ele.disabled = false;
        }
    });
}

start_break.addEventListener("click", function(e) {
    // disable start

    start_break.disabled = true;
    resume_work.disabled = false;
    clearInterval(work_timer_id);
    break_timer_id = setInterval(function() {
        timer(break_hours, break_minutes, break_seconds);
    }, 1000);
});

init();

resume_work.addEventListener("click", function(e) {
    if (start_break.disabled) {
        choice();
        start_break.disabled = false;
        start_work.disabled = true;
        resume_work.disabled = true;
    }
});

end_work.addEventListener("click", function() {
    alert(
        "you spend " +
        work_hours.innerText +
        "Hours" +
        "," +
        work_minutes.innerText +
        " Minutes ,  " +
        work_seconds.innerText +
        "Seconds" +
        " Studying"
    );

    reset();
});