export default class Timer {
    constructor() {
        this.timerInterval = null;
        this.timer = document.getElementById('timer');
        this.startTimer = this.startTimer.bind(this);
        this.printTime = this.printTime.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
    }

    startTimer() {

        this.timerInterval = setInterval(addTime, 1000);

        let secs = 0, minutes = 0, hours = 0, currentTime = 0;

        const that = this;

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
            that.printTime(secs, minutes, hours);
            that.updateTime(currentTime);
        };
    }

    printTime(secs, minutes, hours) {
        this.timer.innerHTML = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (secs > 9 ? secs : "0" + secs);
    }

    updateTime(currentTime) {
        this.timer.dataset.time = currentTime;
    }

    stopTimer() {
        clearInterval(this.timerInterval);
    }
}
