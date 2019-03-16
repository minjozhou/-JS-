(function () {
    window.Tool = function (game, idx) {
        this.game = game;
        this.arr = ["img/crossRemove.png", "img/rowRemove.png", "img/sameNumberRemove.png"];
        this.idx = idx;
        this.x = this.idx * 2 + 1;
        this.y = 7;

        this.init();
        this.bindEvent();
    }
    Tool.prototype.init = function () {
        this.img = document.createElement("img");
        this.img.src = this.arr[this.idx];
        this.img.style.left = this.x * 45 + "px"
        this.img.style.top = this.y * 45 + "px";
        document.getElementsByClassName('main')[0].appendChild(this.img);
    }

    Tool.prototype.bindEvent = function () {
        var self = this;
        this.tool1count = 2;
        this.tool2count = 2;
        this.tool3count = 2;
        this.img.onclick = function () {
            if (self.idx == 0) {
                self.tool1count --;
                //点两次变成不可点击状态
                if(self.tool1count==0){
                    self.img.onclick = null;
                    self.img.src ="img/disabled1.png";
                }
                //音效
                self.game.clearMusic();
                document.getElementsByClassName("crossRemove")[0].play();
                for (var i = 0; i < self.game.arrBlock.length; i++) {
                    if ((i > 20 && i < 28) || (i % 7 == 3 && i != 24)) {
                        self.game.arrBlock[i].goDie();
                    }
                }
            } else if (self.idx == 1) {
                self.tool2count --;
                if(self.tool2count==0){
                    self.img.onclick = null;
                    self.img.src ="img/disabled2.png";

                }
                self.game.clearMusic();
                document.getElementsByClassName("rowRemove")[0].play();
                var a = parseInt(Math.random()*8) *7;
                for (var i = 0; i < self.game.arrBlock.length; i++) {
                    if(i>=a && i< (a+7)){
                        self.game.arrBlock[i].goDie();
                    }
                }
            } else if (self.idx == 2) {
                self.tool3count --;
                if(self.tool3count==0){
                    self.img.onclick = null;
                    self.img.src ="img/disabled3.png";

                }
                self.game.clearMusic();
                document.getElementsByClassName("sameNumberRemove")[0].play();
                var b = parseInt(Math.random()*8);
                for (var i = 0; i < self.game.arrBlock.length; i++) {
                    if( self.game.arrBlock[i].number==b){
                        self.game.arrBlock[i].goDie();
                    }
                }
            }

            self.game.setTimer();
        }
    }
})()