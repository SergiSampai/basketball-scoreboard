const [
    elTotalCountdown,
    elPeriodNum,
    elPeriodCountdown,
    elHomeOffCountdown,
    elGuestOffCountdown,
    elHomeScore,
    elGuestScore,
    btnStartStop,
    btnP1,
    btnP2,
    btnP3,
    btnChangeOff,
    btnResetOff,
    btnResetGame] = [
        document.querySelector('.scoreboard__total-time'),
        document.querySelector('.scoreboard__period-num'),
        document.querySelector('.scoreboard__period-time'),
        document.querySelector('.scoreboard__home-offence-time'),
        document.querySelector('.scoreboard__guest-offence-time'),
        document.querySelector('.scoreboard__home-score'),
        document.querySelector('.scoreboard__guest-score'),
        document.querySelector('.scoreboard__controls__start-stop'),
        document.querySelector('.scoreboard__controls__point-1'),
        document.querySelector('.scoreboard__controls__point-2'),
        document.querySelector('.scoreboard__controls__point-3'),
        document.querySelector('.scoreboard__controls__change-active-offence'),
        document.querySelector('.scoreboard__controls__reset-offence'),
        document.querySelector('.scoreboard__controls__reset-game')
    ];

btnStartStop.addEventListener('click', startStopCountdown);
btnP1.addEventListener('click', addPointsToOff.bind(this, 1));
btnP2.addEventListener('click', addPointsToOff.bind(this, 2));
btnP3.addEventListener('click', addPointsToOff.bind(this, 3));
btnChangeOff.addEventListener('click', changeOffTeam);
btnResetOff.addEventListener('click', resetOffCountdown);
btnResetGame.addEventListener('click', resetGameCountdown);

document.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'Space': {
            console.log(`${e.code} pressed`);
            startStopCountdown();
            break;
        }
        case 'KeyH': {
            console.log(`${e.code} pressed`);
            changeOffTeam('home');
            break;
        }
        case 'KeyG': {
            console.log(`${e.code} pressed`);
            changeOffTeam('guest');
            break;
        }
        case 'Digit1': {
            console.log(`${e.code} pressed`);
            addPointsToOff(1);
            break;
        }
        case 'Digit2': {
            console.log(`${e.code} pressed`);
            addPointsToOff(2);
            break;
        }
        case 'Digit3': {
            console.log(`${e.code} pressed`);
            addPointsToOff(3);
            break;
        }
        case 'Numpad1': {
            console.log(`${e.code} pressed`);
            addPointsToOff(1);
            break;
        }
        case 'Numpad2': {
            console.log(`${e.code} pressed`);
            addPointsToOff(2);
            break;
        }
        case 'Numpad3': {
            console.log(`${e.code} pressed`);
            addPointsToOff(3);
            break;
        }
        case 'KeyR': {
            console.log(`${e.code} pressed`);
            resetOffCountdown();
            break;
        }
        case 'Escape': {
            console.log(`${e.code} pressed`);
            resetGameCountdown();
            break;
        }
        default: {
            console.log(`Sorry no keyboard shortcut for ${e.code}`);
            break;
        }
    }
});

const [totalCountdownMax, periodCountdownMax, offCountdownMax] = [2400, 600, 24];

let totalCountdown = totalCountdownMax;
let periodCountdown = periodCountdownMax;
let offCountdown = offCountdownMax;

let period = 1;
let homeIsOnOffence = true;
let homeScore = 0;
let guestScore = 0;

let timeCounting = false;

let countdownInterval = null;

function startStopCountdown() {
    if (timeCounting) {
        stopCountdown();

        return;
    }
    countdownInterval = setInterval(() => {
        startCountdown();
    }, 1000);
}

function startCountdown() {
    if (!checkCountdownEnd()) {
        console.log('moving the time');
        timeCounting = true;
        offCountdown--;
        periodCountdown--;
        totalCountdown--;
    }
    display();
}

function stopCountdown() {
    console.log('stoppin the time');
    timeCounting = false;
    clearInterval(countdownInterval);
}

function display() {
    elTotalCountdown.innerHTML = secondsToMinutesSeconds(totalCountdown);
    elPeriodCountdown.innerHTML = secondsToMinutesSeconds(periodCountdown);
    if (homeIsOnOffence) {
        elHomeOffCountdown.innerHTML = timeToTwoDigitString(offCountdown);
    } else {
        elGuestOffCountdown.innerHTML = timeToTwoDigitString(offCountdown);
    }
    elHomeScore.innerHTML = homeScore;
    elGuestScore.innerHTML = guestScore;
    elPeriodNum.innerHTML = period;
}

function secondsToMinutesSeconds(secs) {
    return `${timeToTwoDigitString(Math.floor(secs / 60))}:${timeToTwoDigitString(secs)}`;
}

function timeToTwoDigitString(time) {
    return ((time % 60).toString().length === 1) ? '0' + String(time % 60) : String(time % 60);
}

function changeOffTeam(team) {
    stopCountdown();
    if (team === 'home') {
        homeIsOnOffence = false;
    }
    if (team === 'guest') {
        homeIsOnOffence = true;
    }
    if (homeIsOnOffence) {
        elHomeOffCountdown.innerHTML = '00';
        elGuestOffCountdown.innerHTML = timeToTwoDigitString(offCountdownMax);
        homeIsOnOffence = false;
    } else {
        elGuestOffCountdown.innerHTML = '00';
        elHomeOffCountdown.innerHTML = timeToTwoDigitString(offCountdownMax);
        homeIsOnOffence = true;
    }
    offCountdown = offCountdownMax;
}

function addPointsToOff(points) {
    stopCountdown();
    (homeIsOnOffence) ? homeScore += points : guestScore += points;
    changeOffTeam();
    display();
}

function resetOffCountdown() {
    stopCountdown();
    offCountdown = offCountdownMax;
    display();

}

function resetGameCountdown() {
    stopCountdown();
    totalCountdown = totalCountdownMax;
    periodCountdown = periodCountdownMax;
    offCountdown = offCountdownMax;
    period = 1;
    homeIsOnOffence = true;
    homeScore = 0;
    guestScore = 0;
    elGuestOffCountdown.innerHTML = '00';
    display();
}

function checkCountdownEnd() {
    if (totalCountdown === 0) {
        stopCountdown();

        return true;
    }
    if (periodCountdown === 0) {
        stopCountdown();
        periodChangeToNext();
        resetOffCountdown();

        return true;
    }
    if (offCountdown === 0) {
        stopCountdown();
        changeOffTeam();
        display();

        return true;
    }

    return false;
}

function periodChangeToNext() {
    period += 1;
    periodCountdown = periodCountdownMax;
    resetOffCountdown();
    display();
};

