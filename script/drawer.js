function Drawer(cellArr, width, height, bombs) {
    this.cellSize = 30;
    this.winner = false;
    this.timerID = null;
    this.definedMine = 0;
    this.openObjStatus = 'open';
    this.mineObjStatus = 'mine';
    this.noClickHTMLClass = 'no-click';
    this.clickHTMLClass = 'click';
    this.mineHTMLClass = 'mine';
    this.bombHTMLClass = 'bomb';
    this.createGame({width: width, bombs: bombs});
    this.createMineTable({cellArr: cellArr, width: width, height: height, bombs: bombs});
    this.updateTime(false);
}


Drawer.prototype.createGame = function (option) {
    var divSapper = document.getElementById('sapper');
    divSapper.setAttribute('oncontextmenu', 'return false');
    divSapper.style.width = (this.cellSize + 5) * option.width + 'px';

    var divControl = document.createElement('DIV');
    divControl.id = 'control';

    var ulControl = document.createElement('UL');
    var liTime = document.createElement('LI');
    liTime.innerHTML = '0.0';
    liTime.id = 'time';
    ulControl.appendChild(liTime);

    var liMine = document.createElement('LI');
    liMine.innerHTML = this.definedMine + '/' + option.bombs;
    liMine.id = 'mine';
    ulControl.appendChild(liMine);

    var liNewGame = document.createElement('LI');
    liNewGame.id = 'new_game';
    liNewGame.addEventListener('click', function () {
        var divSapper = document.getElementById('sapper');
        var children = divSapper.childNodes;
        while (children.length) {
            divSapper.removeChild(children[0]);
        }
        var controller = new Controller();
    }.bind(window));

    liNewGame.innerHTML = '.';
    ulControl.appendChild(liNewGame);
    divControl.appendChild(ulControl);
    divSapper.appendChild(divControl);
};


Drawer.prototype.createMineTable = function (option) {
    var self = this;
    var divSapper = document.getElementById('sapper');
    var gameTable = document.createElement('TABLE');

    for (var i = 0; i < option.cellArr.length; i++) {
        var rowsElement = document.createElement('TR');
        gameTable.appendChild(rowsElement);
        for (var j = 0; j < option.cellArr[i].length; j++) {
            var colsElement = document.createElement('TD');
            colsElement.style.height = this.cellSize + 'px';
            colsElement.style.width = this.cellSize + 'px';
            colsElement.className = this.noClickHTMLClass;
            colsElement.addEventListener("mousedown", function (event) {
                var x = event.currentTarget.cellIndex;
                if (event.currentTarget.parentNode.sectionRowIndex >= 0) {
                    var y = event.currentTarget.parentNode.sectionRowIndex;
                }
                else {
                    y = event.currentTarget.parentNode.rowIndex;
                }
                if (event.button == 2) {
                    self.eventRightClick(event, option.cellArr, x, y, option.bombs);
                }
                else if (event.button == 0 && event.currentTarget.className != 'mine') {
                    self.eventLeftClick(event, option.cellArr, option.width, option.height, x, y, option.bombs);
                }
            });
            rowsElement.appendChild(colsElement);
        }
    }
    divSapper.appendChild(gameTable);
};


Drawer.prototype.updateTime = function (start) {
    if (start) {
        var liTime = document.getElementById('time');
        var timeSec = 0;
        var timeMin = 0;
        this.timerID = setInterval(function () {
            timeSec++;
            if (timeSec > 60) {
                timeMin++;
                timeSec = 0;
            }
            liTime.innerHTML = timeMin + '.' + timeSec;
        }, 1000);
    }
    else {
        clearInterval(this.timerID);
    }
};


Drawer.prototype.eventRightClick = function (event, cellArr, x, y, bombs) {
    var mineArr = document.getElementsByClassName(this.mineHTMLClass);
    if (cellArr[y][x].status != this.openObjStatus && cellArr[y][x].status != this.mineObjStatus && mineArr.length < bombs) {
        event.currentTarget.className = this.mineHTMLClass;
        cellArr[y][x].status = this.mineObjStatus;
    }
    else if (cellArr[y][x].status == this.mineObjStatus) {
        event.currentTarget.className = this.noClickHTMLClass;
        cellArr[y][x].status = '';
    }
    var liMine = document.getElementById('mine');
    this.definedMine = mineArr.length || 0;
    liMine.innerHTML = this.definedMine + '/' + bombs;
    this.checkWinner(cellArr, bombs);
};


Drawer.prototype.eventLeftClick = function (event, cellArr, width, height, x, y, bombs) {
    if (!this.timerID) {
        this.updateTime(true);
    }
    var table = document.getElementById('sapper').children[1];
    if (cellArr[y][x].danger != 0 && cellArr[y][x].danger != 10) {
        event.currentTarget.innerHTML = cellArr[y][x].danger;
        event.currentTarget.className = this.clickHTMLClass;
        cellArr[y][x].status = this.openObjStatus;
    }
    else if (cellArr[y][x].danger == 10) {
        for (var i = 0; i < cellArr.length; i++) {
            for (var j = 0; j < cellArr[i].length; j++) {
                table.children[i].children[j].className = this.clickHTMLClass;
                if (cellArr[i][j].danger != 0 && cellArr[i][j].danger != 10) {
                    table.children[i].children[j].innerHTML = cellArr[i][j].danger;
                }
                else if (cellArr[i][j].danger == 10) {
                    if (cellArr[i][j].status == this.mineObjStatus) {
                        table.children[i].children[j].className = 'find_bomb';
                    }
                    else {
                        table.children[i].children[j].className = this.bombHTMLClass;
                    }
                }
            }
        }
        this.updateTime(false);
        this.winner = false;
    }

    else if (cellArr[y][x].danger == 0) {
        var cell = [];
        cell.push(cellArr[y][x]);
        var self = this;

        function checkCellArr() {
            for (var i = 0; i < cell.length; i++) {
                x = cell[0].x;
                y = cell[0].y;
                for (var k = y - 1; k <= y + 1; k++) {
                    if (k < 0 || k > height - 1) {
                        continue;
                    }
                    for (var l = x - 1; l <= x + 1; l++) {
                        if (l < 0 || l > width - 1) {
                            continue;
                        }
                        else if (cellArr[k][l].status == self.openObjStatus || cellArr[k][l].status == self.mineObjStatus) {
                            continue;
                        }
                        else if (cellArr[k][l].danger != 0) {
                            table.children[cellArr[k][l].y].children[cellArr[k][l].x].className = self.clickHTMLClass;
                            table.children[cellArr[k][l].y].children[cellArr[k][l].x].innerHTML = cellArr[k][l].danger;
                            cellArr[k][l].status = self.openObjStatus;
                            continue;
                        }
                        cellArr[k][l].status = self.openObjStatus;
                        cell.push(cellArr[k][l]);
                    }
                }
                table.children[cell[0].y].children[cell[0].x].className = self.clickHTMLClass;
                cell.shift();
            }
            if (cell.length) {
                checkCellArr();
            }
        }

        checkCellArr();
    }
    this.checkWinner(cellArr, bombs);
};


Drawer.prototype.checkWinner = function (cellArr, bombs) {
    var findBombCount = bombs;
    var openCellCount = 0;
    for (var i = 0; i < cellArr.length; i++) {
        for (var j = 0; j < cellArr[i].length; j++) {
            if (cellArr[i][j].danger == 10 && cellArr[i][j].status == 'mine') {
                findBombCount--;
            }
            else if (cellArr[i][j].status == this.openObjStatus) {
                openCellCount++;
            }
            if (!findBombCount && (openCellCount + bombs) == cellArr.length * cellArr[0].length) {
                this.updateTime(false);
                this.winner = true;
                return;
            }
        }
    }
};