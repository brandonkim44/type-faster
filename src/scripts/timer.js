export default class Timer {
    constructor() {
        this.timerInterval = null;
        this.startTime = (new Date()).getTime();
        this.timer = document.getElementById('timer');
        this.startTimer = this.startTimer.bind(this);
        this.printTime = this.printTime.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.addTime = this.addTime.bind(this);
        this.stopped = false;
        this.offset = 0;
    }

    startTimer() {
        this.stopped = false;
        this.startTime = (new Date()).getTime();
        this.timerInterval = setInterval(this.addTime, 50);
    }

    addTime() {

        let ms = 0, secs = 0, minutes = 0, hours = 0, currentTime = 0;
        
        if (!this.stopped) {
            let newTime = (new Date()).getTime();
            let totalTimePassed = this.offset + (newTime - this.startTime);
            
            secs = parseInt(totalTimePassed / 1000);
            ms = totalTimePassed % 1000;
            
            
            if (secs >= 3600) {
                hours = Math.trunc(secs / 3600);
                secs = secs % 3600;
            }
            
            if (secs >= 60) {
                minutes = Math.trunc(secs / 60);
                secs = secs % 60;
            }
            currentTime = parseFloat(secs / 60) + parseInt(minutes) + parseInt(hours * 60);
            
            this.printTime(secs, minutes, hours, ms);
            this.updateTime(currentTime);
        }
    }

    printTime(secs, minutes, hours, ms) {
        this.timer.innerHTML = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (secs > 9 ? secs : "0" + secs) + ":" + ms;
    }

    updateTime(currentTime) {
        this.timer.dataset.time = currentTime;
    }

    stopTimer() {
        this.stopped = true;
        this.offset += (new Date()).getTime() - this.startTime;
    }
}