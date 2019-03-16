(function () {
    window.Block = function (game, idx) {
        this.game = game;
        this.idx = idx;//独立编号
        this.arr = ["img/兔子.png", "img/小鸡.png", "img/熊.png", "img/狐狸.png", "img/狗.png", "img/猫.png", "img/熊猫.png"];
        this.number = parseInt(Math.random() * this.arr.length);

        this.x = this.idx % 7;
        this.y = parseInt(this.idx / 7);

        this.init();
        this.exchange();

        game.arrBlock.push(this);
    }

    Block.prototype.init = function () {
        this.img = document.createElement("img");
        this.img.src = this.arr[this.number];
        this.img.style.left = this.x * 45 + "px"
        this.img.style.top = this.y * 45 + "px";
        document.getElementsByClassName('main')[0].appendChild(this.img);
    }

    Block.prototype.scan = function (i) {
        if ((this.idx > 0 && this.idx < 6) || (this.idx > 42 && this.idx < 48)) {
            if ((this.number == this.game.arrBlock[i - 1].number) && (this.number == this.game.arrBlock[i + 1].number)) {
                this.game.dieList.push(this.idx - 1);
                this.game.dieList.push(this.idx);
                this.game.dieList.push(this.idx + 1);
            }
        } else if ((this.idx > 0 && this.idx < 42 && this.idx % 7 == 0) || (this.idx > 6 && this.idx < 48 && this.idx % 7 == 6)) {
            if ((this.number == this.game.arrBlock[i - 7].number) && (this.number == this.game.arrBlock[i + 7].number)) {
                this.game.dieList.push(this.idx - 7);
                this.game.dieList.push(this.idx);
                this.game.dieList.push(this.idx + 7);

            }
        } else if (this.idx > 7 && this.idx < 41 && (this.idx % 7 != 0) && (this.idx % 7 != 6)) {
            if ((this.number == this.game.arrBlock[i - 1].number) && (this.number == this.game.arrBlock[i + 1].number)) {
                this.game.dieList.push(this.idx - 1);
                this.game.dieList.push(this.idx);
                this.game.dieList.push(this.idx + 1);
            } else if ((this.number == this.game.arrBlock[i - 7].number) && (this.number == this.game.arrBlock[i + 7].number)) {
                this.game.dieList.push(this.idx - 7);
                this.game.dieList.push(this.idx);
                this.game.dieList.push(this.idx + 7);
            }
        }

    }

    Block.prototype.goDie = function () {
        this.game.score++
        this.number = parseInt(Math.random() * this.arr.length);
        this.img.src = this.arr[this.number];
    }

    Block.prototype.exchange = function () {
        var self = this;
        this.img.onclick = function () {
            document.getElementsByClassName("click")[0].play();

            self.game.clearArr();
            if (self.game.count >= 2) {
                self.game.count = 0;
                self.game.imgExchange.splice(1, 1);
            }
            self.game.imgExchange[self.game.count] = self;
            self.game.count++;

            if (self.game.imgExchange.length == 2) {

                var number1 = self.game.imgExchange[0].number;//点击的第一个对象
                var number2 = self.game.imgExchange[1].number;//点击的第二个对象

                var idx1 = self.game.imgExchange[0].idx;
                var idx2 = self.game.imgExchange[1].idx;

                var src1 = self.game.imgExchange[0].img.src;
                var src2 = self.game.imgExchange[1].img.src;

                //距离判断
                if (idx1 == idx2) {
                    document.getElementsByClassName("falsemove")[0].play();
                    alert("点的是同一个哦");
                    return;
                } else if (idx1 % 7 == 0 && idx2 != idx1 - 7 && idx2 != idx1 + 1 && idx2 != idx1 + 7) {
                    document.getElementsByClassName("falsemove")[0].play();
                    alert("太远了，无法消除");
                    return;
                } else if (idx1 % 7 == 6 && idx2 != idx1 - 1 && idx2 != idx1 - 7 && idx2 != idx1 + 7) {
                    document.getElementsByClassName("falsemove")[0].play();
                    alert("太远了，无法消除");
                    return;
                } else if (idx1 > 0 && idx1 < 6 && idx2 != idx1 - 1 && idx2 != idx1 + 1 && idx2 != idx1 + 7) {
                    document.getElementsByClassName("falsemove")[0].play();
                    alert("太远了，无法消除");
                    return;
                } else if (idx1 > 42 && idx1 < 48 && idx2 != idx1 - 1 && idx2 != idx1 + 1 && idx2 != idx1 - 7) {
                    document.getElementsByClassName("falsemove")[0].play();
                    alert("太远了，无法消除");
                    return;
                } else if (idx1 > 7 && idx1 < 41 && (idx1 % 7 != 0) && (idx1 % 7 != 6) && idx2 != idx1 - 1 && idx2 != idx1 + 1 && idx2 != idx1 - 7 && idx2 != idx1 + 7) {
                    document.getElementsByClassName("falsemove")[0].play();
                    alert("太远了，无法消除");
                    return;
                }

                self.game.arrBlock[idx1].number = number2;
                self.game.arrBlock[idx2].number = number1;//改变了两个对象的number

                self.game.arrBlock[idx1].img.src = src2;
                self.game.arrBlock[idx2].img.src = src1;

                //第一次扫描消除
                for (var i = 0; i < self.game.arrBlock.length; i++) {
                    self.game.arrBlock[i].scan(i);
                }

                if (self.game.dieList.length > 0) {
                    self.game.dieList2 = self.game.uniq(self.game.dieList);
                    self.game.finalList = self.game.dieList2.sort(function (a, b) {
                        return b - a;
                    });

                    for (var j = 0; j < self.game.finalList.length; j++) {
                        self.game.arrBlock[self.game.finalList[j]].goDie();

                    }

                    //音效播放
                    if (self.game.finalList.length == 3) {
                        self.game.clearMusic();
                        document.getElementsByClassName("remove3")[0].play();
                    } else if (self.game.finalList.length == 4) {
                        self.game.clearMusic();
                        document.getElementsByClassName("remove4")[0].play();
                    }
                    else if (self.game.finalList.length >= 5) {
                        self.game.clearMusic();
                        document.getElementsByClassName("remove5")[0].play();
                    }

                } else {
                    document.getElementsByClassName("falsemove")[0].play();

                    alert("不能消除");
                    self.game.arrBlock[idx1].number = number1;
                    self.game.arrBlock[idx2].number = number2;
                    self.game.arrBlock[idx1].img.src = src1;
                    self.game.arrBlock[idx2].img.src = src2;
                }

                //第二次及之后的扫描消除
                self.game.setTimer();

            }
        }
    }
})()