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
        
        // const resume = document.querySelector('.resume');
        // const pause = document.querySelector('.menu');

        // const toggleTimer = (e) => {
        //     e.preventDefault();
        //     stopped = !stopped;
        //     if (stopped) {
        //         offset += (new Date()).getTime() - this.startTime;
        //     } else {
        //         time = new Date();
        //     }
        // }
        // resume.addEventListener('click', toggleTimer);
        this.stopped = false;
        this.startTime = (new Date()).getTime();
        this.timerInterval = setInterval(this.addTime, 10);
    }

    addTime() {

        let ms = 0, secs = 0, minutes = 0, hours = 0, currentTime = 0;
        
        if (!this.stopped) {
            let newTime = (new Date()).getTime();
            debugger;
            let totalTimePassed = this.offset + (newTime - this.startTime);
              
            secs = parseInt(totalTimePassed / 1000);
            ms = totalTimePassed % 1000;

            if (secs >= 3600) {
                hours = (secs / 3600).toFixed(0);
                secs = secs % 3600;
            }
            if (secs >= 60) {
                minutes = (secs / 60).toFixed();
                secs = secs % 60;
            }

            currentTime = parseFloat(secs / 60) + parseFloat(minutes) + parseFloat(hours * 60);
            // this.currentTime = currentTime;
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
        // clearInterval(this.timerInterval);
        //pause timer by toggling it
    }
}
