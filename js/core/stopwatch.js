function StopWatch() {
    let self = this;
    let t = null;

    this.start = function() {
        self.t =  Date.now();
    }

    this.stop = function() {
        return Date.now() - self.t;
    }

}