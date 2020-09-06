

export function timer() {

    setInterval(addTime, 1000);

    let secs = 0, minutes = 0, hours = 0, currentTime = 0;

    function addTime() {
        secs++;
        if (secs >= 60) {
            secs = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }

        currentTime = (secs / 60) + minutes + (hours * 60);
        
        const timer = document.getElementById('timer')
        timer.innerHTML = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (secs > 9 ? secs : "0" + secs);

        timer.dataset.time = currentTime;
    };
};
