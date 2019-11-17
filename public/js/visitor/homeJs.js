var Sel = {
    carousel: document.getElementById('carousel'),
    container: document.getElementById('container'),
    carObj: document.getElementsByClassName('car_obj'),
    pauseButt: document.getElementById('pause_butt'),
    lefArr: document.getElementById('lef_arr'),
    rigArr: document.getElementById('rig_arr')
}

var Carousel = {

    intNb: 7000,
    transNb: 0,
    carIntMv: null,

    carAutoMvFn: function() {
        if (Carousel.transNb == -87.5) {
             Sel.container.style.transform = "translateX(0%)";
             Carousel.transNb = 0;
        } else {
            Carousel.transNb = Carousel.transNb - 12.5;
            Sel.container.style.transform = "translateX(" + Carousel.transNb + "%)";
        }            
    },

    carIntFn: function () {
        this.carIntMv = setInterval(this.carAutoMvFn, this.intNb);
    },

    carPause: function() {
        if(!Sel.pauseButt.classList.contains('active')) {
            Sel.pauseButt.classList.add('active');
            clearInterval(Carousel.carIntMv);
        } else {
            Sel.pauseButt.classList.remove('active');
            Carousel.carIntMv = setInterval(Carousel.carAutoMvFn, Carousel.intNb);
        }
    },

    carPauseEvt: function() {
        Sel.pauseButt.addEventListener('click', this.carPause);
    },

    carMvWithArr: function(isTransNb, chgSideNb, transBoundNb) {
        if(Carousel.transNb == isTransNb) {
            Sel.container.style.transform = "translateX(" + chgSideNb + "%)";
            Carousel.transNb = chgSideNb;
        } else {
            Carousel.transNb = Carousel.transNb + transBoundNb;
            Sel.container.style.transform = "translateX(" + Carousel.transNb + "%)";
        }
    },

    carStopIntAndMv: function(isTransNb, chgSideNb, transBoundNb) {
        if(!Sel.pauseButt.classList.contains('active')) {
            clearInterval(Carousel.carIntMv);
            Carousel.carMvWithArr(isTransNb, chgSideNb, transBoundNb);
            Carousel.carIntMv = setInterval(Carousel.carAutoMvFn, Carousel.intNb);
        }
        else {
            Carousel.carMvWithArr(isTransNb, chgSideNb, transBoundNb);
        }
    },

    carMvLefEvt: function() {
        Sel.lefArr.addEventListener('click', function() {
            Carousel.carStopIntAndMv(0, -87.5, 12.5);
        })
    },

    carMvRigEvt: function() {
        Sel.rigArr.addEventListener('click', function() {
            Carousel.carStopIntAndMv(-87.5, 0, -12.5);
        })
    },

    carWithKeys: function() {
        window.addEventListener("keydown", function(e) {
            if(e.keyCode === 37) {
                Sel.lefArr.classList.add("active");
                Carousel.carStopIntAndMv(0, -87.5, 12.5);
                setTimeout(function() {
                    Sel.lefArr.classList.remove("active");
                }, 200);
            }
            if(e.keyCode === 32) {
                e.preventDefault();
                Carousel.carPause();
            }
            if(e.keyCode === 39) {
                Sel.rigArr.classList.add("active");
                Carousel.carStopIntAndMv(-87.5, 0, -12.5);
                setTimeout(function() {
                    Sel.rigArr.classList.remove("active");
                }, 200);
            }
        });
    },

    carEvtLis: function() {
        this.carPauseEvt();
        this.carMvLefEvt();
        this.carMvRigEvt();
        this.carWithKeys();
    }
}

function HomeJs() {

    this.init = function() {
        Carousel.carIntFn();
        Carousel.carEvtLis();
    }
}

var homeJs = new HomeJs;

homeJs.init();

