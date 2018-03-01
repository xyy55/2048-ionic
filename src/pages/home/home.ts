import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import $ from 'jquery';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  gameTable: number[][] = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  score = 0;
  bscore = 0;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    this.start();
  }

  createDiv(x, y, num, type) {
    var box = document.createElement("div");
    box.className = "box value-" + num + " " + type;
    box.id = "" + x + y;
    var para = document.createElement("p");
    var text = document.createTextNode(num);
    para.appendChild(text);
    box.appendChild(para);
    box.style.top = x * 80 + "px";
    box.style.left = y * 80 + "px";
    document.getElementById("container").appendChild(box);
  }

  //游戏开始
  start() {
    $(".end").slideUp("slow");
    this.gameTable = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    this.score = 0;
    $(".score").text(this.score);
    var x1 = Math.floor(Math.random() * 4);
    var y1 = Math.floor(Math.random() * 4);
    var x2 = Math.floor(Math.random() * 4);
    var y2 = Math.floor(Math.random() * 4);
    var num1 = Math.random() < 0.9 ? 2 : 4;
    var num2 = Math.random() < 0.9 ? 2 : 4;
    while (x1 == x2 && y1 == y2) {
      x2 = Math.floor(Math.random() * 4);
      y2 = Math.floor(Math.random() * 4);
    }
    this.gameTable[x1][y1] = num1;
    this.gameTable[x2][y2] = num2;
    $(".box").remove();
    this.createDiv(x1, y1, num1, "new");
    this.createDiv(x2, y2, num2, "new");
  }

  //合并特效
  merge(new_x, new_y, dlt_x1, dlt_y1, dlt_x2, dlt_y2, value) {
    $("#" + dlt_x1 + dlt_y1).remove();
    $("#" + dlt_x2 + dlt_y2).remove();
    this.createDiv(new_x, new_y, value, "merge");
  }
  //平移特效
  move(old_x, old_y, toLeft, toUp) {
    $("#" + old_x + old_y).animate({ left: toLeft * 80 + "px", top: toUp * 80 + "px" }, 150);
    $("#" + old_x + old_y).attr("id", "" + toUp + toLeft);
  }

  swipeLeft() {
    var f = [0, 0];//用来记录目前的数字和位置
    var n = 0;
    var i = 0;
    var j = 0;
    var tempList = [0, 0, 0, 0];//用来记录某一行或某一列的数值
    for (i = 0; i <= 3; i++) {
      tempList = [0, 0, 0, 0];
      for (j = 0; j <= 3; j++) {
        if (this.gameTable[i][j] == 0) {
          continue;
        }
        if (f[0] == 0) {
          f[0] = this.gameTable[i][j];
          f[1] = j;
          continue;
        }
        if (f[0] == this.gameTable[i][j]) {
          f[0] = f[0] * 2;
          this.score += f[0];
          tempList[n] = f[0];
          this.merge(i, n, i, f[1], i, j, f[0]);
          f[0] = 0;
          f[1] = 0;
          n = n + 1;
        } else {
          tempList[n] = f[0];
          this.move(i, f[1], n, i);
          f[0] = this.gameTable[i][j];
          f[1] = j;
          n = n + 1;
        }
      }
      if (f[0] != 0) {
        tempList[n] = f[0];
        this.move(i, f[1], n, i);
        f[0] = 0;
        f[1] = 0;
      }
      n = 0;
      for (j = 0; j <= 3; j++) {
        this.gameTable[i][j] = tempList[j];
      }
    }
    this.updata();
    this.updata_score();
  }
  swipeRight() {
    var f = [0, 0];//用来记录目前的数字和位置
    var n = 3;
    var i = 0;
    var j = 0;
    var tempList = [0, 0, 0, 0];//用来记录某一行或某一列的数值
    for (i = 0; i <= 3; i++) {
      tempList = [0, 0, 0, 0];
      for (j = 3; j >= 0; j--) {
        if (this.gameTable[i][j] == 0) {
          continue;
        }
        if (f[0] == 0) {
          f[0] = this.gameTable[i][j];
          f[1] = j;
          continue;
        }
        if (f[0] == this.gameTable[i][j]) {
          f[0] = f[0] * 2;
          this.score += f[0];
          tempList[n] = f[0];
          this.merge(i, n, i, f[1], i, j, f[0]);
          f[0] = 0;
          f[1] = 0;
          n--;
        } else {
          tempList[n] = f[0];
          this.move(i, f[1], n, i);
          f[0] = this.gameTable[i][j];
          f[1] = j;
          n--;
        }
      }
      if (f[0] != 0) {
        tempList[n] = f[0];
        this.move(i, f[1], n, i);
        f[0] = 0;
        f[1] = 0;
      }
      n = 3;
      for (j = 0; j <= 3; j++) {
        this.gameTable[i][j] = tempList[j];
      }
    }
    this.updata();
    this.updata_score();
  }
  swipeUp(){
    var f = [0,0];//用来记录目前的数字和位置
    var n = 0;
    var i = 0;
    var j = 0;
    var tempList = [0,0,0,0];//用来记录某一行或某一列的数值
    for(j=0;j<=3;j++){
        tempList = [0,0,0,0];
        for(i = 0;i<=3;i++){
            if(this.gameTable[i][j]==0){
                continue;
            }
            if(f[0] == 0){
                f[0] = this.gameTable[i][j];
                f[1] = i;
                continue;
            }
            if(f[0] == this.gameTable[i][j]){
                f[0] = f[0] * 2;
                this.score += f[0];
                tempList[n] = f[0];
                this.merge(n,j,f[1],j,i,j,f[0]);
                f[0] = 0;
                f[1] = 0;
                n = n + 1;
            }else{
                tempList[n] = f[0];
                f[0] = this.gameTable[i][j];
                this.move(f[1],j,j,n);
                f[0] = this.gameTable[i][j];
                f[1] = i;
                n = n + 1;
            }
        }
        if(f[0]!=0){
            tempList[n] = f[0];
            this.move(f[1],j,j,n);
            f[0] = 0;
            f[1] = 0;
        }
        n = 0;
        for(i = 0;i<=3;i++){
          this.gameTable[i][j] = tempList[i];
        }
    }
    this.updata();
    this.updata_score();
  }
  swipeDown(){
    var f = [0,0];//用来记录目前的数字和位置
    var n = 3;
    var i = 0;
    var j = 0;
    var tempList = [0,0,0,0];//用来记录某一行或某一列的数值
    for(j=3;j>=0;j--){
        tempList = [0,0,0,0];
        for(i = 3;i>=0;i--){
            if(this.gameTable[i][j]==0){
                continue;
            }
            if(f[0] == 0){
                f[0] = this.gameTable[i][j];
                f[1] = i;
                continue;
            }
            if(f[0] == this.gameTable[i][j]){
                f[0] = f[0] * 2;
                this.score += f[0];
                tempList[n] = f[0];
                this.merge(n,j,f[1],j,i,j,f[0]);
                f[0] = 0;
                f[1] = 0;
                n--;
            }else{
                tempList[n] = f[0];
                f[0] = this.gameTable[i][j];
                this.move(f[1],j,j,n);
                f[0] = this.gameTable[i][j];
                f[1] = i;
                n--;
            }
        }
        if(f[0]!=0){
            tempList[n] = f[0];
            this.move(f[1],j,j,n);
            f[0] = 0;
            f[1] = 0;
        }
        n = 3;
        for(i = 0;i<=3;i++){
          this.gameTable[i][j] = tempList[i];
        }
    }
    this.updata();
    this.updata_score();
  }
  //对整个游戏界面进行更新操作
  updata() {
    var e = true;
    var f = true;
    for (var i = 0; i <= 3; i++) {
      if ($.inArray(0, this.gameTable[i]) != -1) {
        while (true) {
          var x = Math.floor(Math.random() * 4);
          var y = Math.floor(Math.random() * 4);
          if (this.gameTable[x][y] == 0) {
            var num = Math.random() < 0.9 ? 2 : 4;
            this.createDiv(x, y, num, "new");
            this.gameTable[x][y] = num;
            e = false;
            break;
          }
        }
        break;
      }
    }
    if (e) {
      this.isEnd();
    } else {
      for (i = 0; i <= 3; i++) {
        if ($.inArray(0, this.gameTable[i]) != -1) {
          f = false;
          break;
        }
      }
      if (f) {
        this.isEnd();
      }
    }
  }
  //判断游戏是否结束
  isEnd() {
    var end = true;
    var i = 0;
    var j = 0;
    for (i = 0; i <= 3; i++) {
      for (j = 0; j <= 2; j++) {
        if (this.gameTable[i][j] == this.gameTable[i][j + 1]) {
          end = false;
        }
      }
    }
    for (j = 0; j <= 3; j++) {
      for (i = 0; i <= 2; i++) {
        if (this.gameTable[i][j] == this.gameTable[i + 1][j]) {
          end = false;
        }
      }
    }
    if (end) {
      $(".end").slideDown("slow");
    }
  }

  updata_score() {
    $(".score").text(this.score);
    if(this.score>this.bscore){
        $(".best").text(this.score);
        this.bscore = this.score;
    }
  }


}
