function StopWatch() {
    let self = this;
    let t = null;

    //! Start stopwatch
    this.start = function () {
        self.t = Date.now();
    }

    //! Get the time from start
    this.get = function () {
        return Date.now() - self.t;
    }

}