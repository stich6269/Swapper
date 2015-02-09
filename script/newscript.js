function Controller(){
    this.field = new Field();
    this.drawer = new Drawer(this.field.cellArr, this.field.width, this.field.height, this.field.bombs);
}

function Field(){
    this.width = 10;
    this.height = 10;
    this.bombs = 10;
    this.cellArr = [];
    this.bombsCordArr = [];
    this.createCellArr();
    this.createBombArr();
    this.installDangerLevel();
}

function Cell(){
    this.danger = 0;
    this.status = null;
    this.x = null;
    this.y = null;
}

Field.prototype.createCellArr = function() {
    for (var y = 0; y < this.height; y++) {
        this.cellArr[y] = [];
        for (var x = 0; x < this.width; x++) {
            var cell = new Cell();
            cell.x = x;
            cell.y = y;
            this.cellArr[y][x] = cell;
        }
    }
};

Field.prototype.createBombArr = function(){
    for (var i = 0; i < this.bombs; i++) {
        var rndX = Math.floor(Math.random() * this.width);
        var rndY = Math.floor(Math.random() * this.height);
        var isInBombArr = false;
        for (var j = 0; j < this.bombsCordArr.length; j++) {
            if (this.bombsCordArr[j].x == rndX && this.bombsCordArr[j].y == rndY) {
                isInBombArr = true;
            }
        }
        if (isInBombArr) {
            i--;
            continue;
        }
        this.bombsCordArr.push({x: rndX, y: rndY});
        this.cellArr[rndY][rndX].danger = 10;
    }
};

Field.prototype.installDangerLevel = function(){
    for (var i = 0; i < this.cellArr.length; i++) {
        for (var j = 0; j < this.cellArr[i].length; j++) {
            var x = this.cellArr[i][j].x;
            var y = this.cellArr[i][j].y;
            if(this.cellArr[i][j].danger == 10){
                for (var k = y-1; k <= y+1; k++) {
                    if(k<0 || k>this.height-1){
                        continue;
                    }
                    for (var l = x-1; l <= x+1; l++) {
                        if(l<0 || l>this.width-1 || this.cellArr[k][l].danger==10){
                            continue;
                        }
                        this.cellArr[k][l].danger++;
                    }
                }
            }
        }
    }
};






