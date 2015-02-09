(function(){

    var bombAmount = 5;
    var gameColumn = 5;
    var gameRows = 5;
    var gameWidth = 300;
    var gameHeight = 300;
    var CellArr = [];
    var bombXYArr = [];

    /*
    function Cell(){
        this.mine = false;
        this.DangerLevel = 0;
    }

    function createCellArr(rows, column){
        var arr = [];
        for (var i = 0; i < column; i++) {
            arr[i] = [];
            for (var j = 0; j < rows; j++) {
                var CellObj = new CellSettings();
                arr[i][j] = CellObj;
                if (checkBomb(i, j)) CellObj.mine = true;
            }
        }
        return arr;
    }





    function getRandomCell(bombAmount){
       var arr = [];
       for (var i = 0; i < bombAmount; i++) {
            var rndNumberXY = Math.floor(Math.random()*gameRows)+ '-'+Math.floor(Math.random()*gameColumn);
            if( ~arr.indexOf(rndNumberXY)){
                i--;
                continue;
            }
           bombXYArr[i] = rndNumberXY.split('-');
       }
    }








    function checkBomb(x, y){

    }





    getRandomCell(bombAmount);
    CellArr = matrixArray(gameRows, gameColumn);
    console.log(CellArr);
    console.log(bombXYArr);




























  function CellSettings(id, mine){
        this.id = id;
        this.mine = mine || false;
        this.DangerLevel = 0;
    }

    function getRandomCell(){
        for (var i = 0; i < bombAmount; i++) {
            bombIdArr[i] = Math.floor(Math.random()*gameRows)+
            '-'+Math.floor(Math.random()*gameCols);
        }
    }

    function createCellArr(){
        for (var i = 0; i < gameRows; i++) {
            for (var j = 0; j < gameCols; j++) {
                CellArr[j+(i*gameCols)] = new CellSettings(i+'-'+j);
            }
        }
    }

    function addBomb(){
        for (var i = 0; i < CellArr.length; i++) {
            if (~bombIdArr.indexOf(CellArr[i].id)) {
                CellArr[i].mine = true;
            }
        }
    }

    function installDangerLevel(bombIdArr){
        for (var i = 0; i < bombIdArr.length; i++) {
            var oneIdArr = bombIdArr[i].split('-');
            NearbyCellArr = getNearbyCellArr(+oneIdArr[1], +oneIdArr[0]);
            for (var j = 0; j < NearbyCellArr.length; j++) {
                if(isNaN(NearbyCellArr[j])) continue;
                CellArr[NearbyCellArr[j]].DangerLevel++;
            }
            console.log(NearbyCellArr.length);
            console.log(NearbyCellArr);
        }
    }

    function getNearbyCellArr(bombX, bombY){
        var NearbyCellArr = [];
        NearbyCellArr.push(bombX+(checkMaxCellNumber(bombY, 1)*gameCols));
        NearbyCellArr.push(bombX+(checkMaxCellNumber(bombY, -1)*gameCols));
        NearbyCellArr.push(checkMaxCellNumber(bombX,-1)+(bombY*gameCols));
        NearbyCellArr.push(checkMaxCellNumber(bombX, 1)+(bombY*gameCols));
        NearbyCellArr.push(checkMaxCellNumber(bombX, 1)+(checkMaxCellNumber(bombY, 1)*gameCols));
        NearbyCellArr.push(checkMaxCellNumber(bombX, -1)+(checkMaxCellNumber(bombY, -1)*gameCols));
        NearbyCellArr.push(checkMaxCellNumber(bombX, 1)+(checkMaxCellNumber(bombY, -1)*gameCols));
        NearbyCellArr.push(checkMaxCellNumber(bombX,-1)+(checkMaxCellNumber(bombY, 1)*gameCols));
        function checkMaxCellNumber(cordsCell, nearby) {
            if (0<=cordsCell+nearby && cordsCell+nearby<=14 ){
                return cordsCell+nearby;
            }
        }
        return NearbyCellArr;
    }






    function createGameTable() {
        var divGameContainer = document.getElementById('sapper');
        var GameTable = document.createElement('TABLE');
        GameTable.id = 'SapperTable';
        divGameContainer.appendChild(GameTable);
    }

    function createTableCell(){
        var divGameTable = document.getElementById('SapperTable');
        for (var i = 0; i < gameRows; i++) {
            var rowsElement = document.createElement('TR');
            divGameTable.appendChild(rowsElement);
            for (var j = 0; j < gameCols; j++) {
                var colsElement = document.createElement('TD');

                colsElement.innerHTML = checkDangLevel(CellArr[j+(i*gameCols)]);
                rowsElement.appendChild(colsElement);
            }
        }
    }

    function installBomb(colsElement ,cellSettingsObj) {
        if (cellSettingsObj.mine == true) {
            cellSettingsObj.DangerLevel = 10;
            colsElement.className ='bomb';
        }
    }
    function checkDangLevel(cellSettingsObj){
        if (cellSettingsObj.DangerLevel!=0 ) return cellSettingsObj.DangerLevel;
        else return null;
    }












    getRandomCell();
    createCellArr();
    addBomb();
    installDangerLevel(bombIdArr);
    window.onload = function() {
        createGameTable();
        createTableCell();
    }







*/

})();



