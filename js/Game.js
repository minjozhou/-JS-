(function () {
    window.Game = function () {
        this.arrBlock = [];

        this.imgExchange = [];
        this.count = 0;

        this.init();
        this.start();
        this.setTimer();

    }

    Game.prototype.init = function () {
        this.dom = document.createElement("div");
        this.dom.className = "main";
        document.getElementById("app").appendChild(this.dom);
        for (var i = 0; i < 49; i++) {
            new Block(this, i)
        }
        for(var j=0;j<3;j++){
            new Tool(this,j)
        }
    }
    Game.prototype.uniq = function (array) {
        var temp = []; //一个新的临时数组
        for (var i = 0; i < array.length; i++) {
            if (temp.indexOf(array[i]) == -1) {
                temp.push(array[i]);
            }
        }
        return temp;
    }
    Game.prototype.clearArr = function () {//清空数组方法
        this.dieList = [];
        this.dieList2 = [];
        this.finalList = [];
    }
    Game.prototype.clearMusic = function(){
        document.getElementsByClassName("remove3")[0].load();
        document.getElementsByClassName("remove4")[0].load();
        document.getElementsByClassName("remove5")[0].load();
        document.getElementsByClassName("crossRemove")[0].load();
        document.getElementsByClassName("rowRemove")[0].load();
        document.getElementsByClassName("sameNumberRemove")[0].load();
    }

    Game.prototype.start = function () {
        var self = this;
        // 游戏一开始就检测是否能够消除
        this.timer = setInterval(function () {
            self.clearArr();
        
            for (var i = 0; i < self.arrBlock.length; i++) {
                self.arrBlock[i].scan(i);
            }
        
            if (self.dieList.length > 0) {
                self.dieList2 = self.uniq(self.dieList);
                self.finalList = self.dieList2.sort(function (a, b) {
                    return b - a;
                });
        
                for (var j = 0; j < self.finalList.length; j++) {
                    self.arrBlock[self.finalList[j]].goDie();
                }
                //音效播放
                if (self.finalList.length == 3) {
                    self.clearMusic();
                    document.getElementsByClassName("remove3")[0].play();
                } else if (self.finalList.length == 4) {
                    self.clearMusic();
                    document.getElementsByClassName("remove4")[0].play();
                }
                else if (self.finalList.length >= 5) {
                    self.clearMusic();
                    document.getElementsByClassName("remove5")[0].play();
                }
        
            } else if (self.dieList.length == 0) {
                clearInterval(self.timer)
            }
        }, 700);


        this.time = 60;
        this.score = 0;
        this.f = 0

        this.timer2 = setInterval(function () {
            if(self.time<=0){
                clearInterval(self.timer2);
                document.getElementsByClassName("bgm")[0].pause();
                document.getElementsByClassName("timeover")[0].play();
                alert("游戏结束，总得分为" + self.score);
            }

            self.f++;
            self.f % 2 == 0 && self.time--;
            
            document.getElementById("score").innerHTML = "总分数：" + self.score;
            document.getElementById("time").innerHTML = "倒计时：" + self.time;
        },500)
    }

    Game.prototype.setTimer = function(){
        var self = this;
        self.timer = setInterval(function () {
            self.clearArr();
        
            for (var i = 0; i < self.arrBlock.length; i++) {
                self.arrBlock[i].scan(i);
            }
        
            if (self.dieList.length > 0) {
                self.dieList2 = self.uniq(self.dieList);
                self.finalList = self.dieList2.sort(function (a, b) {
                    return b - a;
                });
        
                for (var j = 0; j < self.finalList.length; j++) {
                    self.arrBlock[self.finalList[j]].goDie();
                }
                //音效播放
                if (self.finalList.length == 3) {
                    self.clearMusic();
                    document.getElementsByClassName("remove3")[0].play();
                } else if (self.finalList.length == 4) {
                    self.clearMusic();
                    document.getElementsByClassName("remove4")[0].play();
                }
                else if (self.finalList.length >= 5) {
                    self.clearMusic();
                    document.getElementsByClassName("remove5")[0].play();
                }
        
            } else if (self.dieList.length == 0) {
                clearInterval(self.timer)
            }
        }, 700);
    }








})()