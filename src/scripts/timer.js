export default class Timer {
    constructor() {
        this.timerInterval = null;
        this.timer = document.getElementById('timer');
        this.startTimer = this.startTimer.bind(this);
        this.printTime = this.printTime.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.addTime = this.addTime.bind(this);
    }

    // startTimer() {

    //     this.timerInterval = setInterval(addTime, 1000);

    //     let secs = 0, minutes = 0, hours = 0, currentTime = 0;

    //     let isPaused = false;
    //     let time = new Date();
    //     let offset = 0;

    //     const that = this;

    //     function addTime() {
    //         if (!isPaused) {
    //             let ms = offset + (new Date()).getTime() - time.getTime();

    //         }
    //         secs++;
    //         if (secs >= 60) {
    //             secs = 0;
    //             minutes++;
    //             if (minutes >= 60) {
    //                 minutes = 0;
    //                 hours++;
    //             }
    //         }
    //         currentTime = (secs / 60) + minutes + (hours * 60);
    //         that.printTime(secs, minutes, hours);
    //         that.updateTime(currentTime);
    //     };
    // }

    startTimer() {
        
        const resume = document.querySelector('.resume');
        const pause = document.querySelector('.menu');

        const toggleTimer = (e) => {
            e.preventDefault();
            stopped = !stopped;
            if (stopped) {
                offset += (new Date()).getTime() - time.getTime();
            } else {
                time = new Date();
            }
        }
        resume.addEventListener('click', toggleTimer);
        this.timerInterval = setInterval(this.addTime, 10);
    }

    addTime() {

        let secs = 0, minutes = 0, hours = 0, currentTime = 0;
        let stopped = false;
        let time = new Date();
        let offset = 0;
        
        if (!stopped) {
            let ms = offset + (new Date()).getTime() - time.getTime();
            secs = (ms / 1000);
            if (secs >= 60) {
                secs = 0;
                minutes++;
                if (minutes >= 60) {
                    minutes = 0;
                    hours++;
                }
            }
            currentTime = (secs / 60) + minutes + (hours * 60);
            this.printTime(secs, minutes, hours);
            this.updateTime(currentTime);
        }
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
