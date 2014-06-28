var Coordinates = (function(){
    function Coordinates(x, y){
        this.x = x;
        this.y = y;
    }

    return Coordinates;
}());

var SnakePart = (function(){
    function SnakePart(x, y, dirX, dirY, drawer){
        var self = this;
        Coordinates.call(self, x, y);
        self.dirX = dirX;
        self.dirY = dirY;
        self.drawer = drawer;
    }

    SnakePart.prototype = {
        move: function(speed){
            this.clear();
            this.x += this.dirX * speed;
            this.y += this.dirY * speed;
            this.draw();
        },

        draw: function(){
            this.drawer.fillColor = '#A8CA01';
            this.drawer.lineColor = '#1C270C';
            this.drawer.circle(this.x, this.y, 5, true);
        },

        clear: function(){
            this.drawer._context.clearRect(this.x - 6, this.y - 6, 10, 12);
        }
    };

    return SnakePart;
}());

var SnakeHead = (function(){
    function SnakeHead(x, y, dirX, dirY, drawer){
        SnakePart.call(this, x, y, dirX, dirY, drawer);
    }

    SnakeHead.prototype = new SnakePart();
    SnakeHead.prototype.constructor = SnakeHead;
    SnakeHead.prototype.draw = function(){
        this.drawer.fillColor = '#A8CA01';
        this.drawer.lineColor = '#1C270C';
        this.drawer.circle(this.x, this.y, 5, true);
    };

    return SnakeHead;
}());

//Here I use module because i use only one instance and
//to keep the performance
var Snake = (function(drawer){
    var self;
    var elementSize = 11;
    var speed = 1;
    //initial
    var snakeParts = [
        new SnakeHead(elementSize * 3 , elementSize , 1, 0, drawer),
        new SnakePart(elementSize * 2, elementSize, 1, 0, drawer),
        new SnakePart(elementSize, elementSize, 1, 0, drawer)
    ];

    function addPart(){
        var lastPart = snakeParts[snakeParts.length - 1];
        var lastX = lastPart.x;
        var lastY = lastPart.y;
        var lastDirX = lastPart.dirX;
        var lastDirY = lastPart.dirY;
        var nX, nY;

        if (lastDirX == 0){
            nX = lastX;

            if (lastY == 1){
                nY = lastY - elementSize;
            }
            else{
                nY = lastY + elementSize;
            }
        }
        else if(lastDirX == 1){
            nX = lastX - elementSize;
            nY = lastY
        }
        else{
            nX = lastX + elementSize;
            nY = lastY;
        }

        var newPart = new SnakePart(nX, nY, lastDirX, lastDirY, drawer);
        snakeParts.push(newPart);
    }

    function moveSnake(){
        snakeParts[0].move(speed);
        for (var i = 1; i < snakeParts.length; i++) {
            getPartDirection(snakeParts[i], snakeParts[i-1]);
            snakeParts[i].move(speed);
        }
    }

    function getPartDirection(currPart, prevPart){
        if(prevPart.dirX != currPart.dirX){
            if(prevPart.dirY != 0){
                if(currPart.dirX == 1){
                    if(currPart.x >= prevPart.x){
                        currPart.x = prevPart.x;
                        currPart.dirX = prevPart.dirX;
                        currPart.dirY = prevPart.dirY;
                    }
                }
                else{
                    if(currPart.x <= prevPart.x){
                        currPart.x = prevPart.x;
                        currPart.dirX = prevPart.dirX;
                        currPart.dirY = prevPart.dirY;
                    }
                }
            }
            else{
                if(currPart.dirY == 1){
                    if(currPart.y >= prevPart.y){
                        currPart.y = prevPart.y;
                        currPart.dirX = prevPart.dirX;
                        currPart.dirY = prevPart.dirY;
                    }
                }
                else{
                    if(currPart.y <= prevPart.y){
                        currPart.y = prevPart.y;
                        currPart.dirX = prevPart.dirX;
                        currPart.dirY = prevPart.dirY;
                    }
                }
            }
        }
        else if( prevPart.dirY != currPart.dirY){

        }
    }

    function setHeadDirection(x, y){
        snakeParts[0].dirX = x;
        snakeParts[0].dirY = y;
    }

    function setSpeed(num){
        speed = num;
    }

    function getDirX(){
        return snakeParts[0].dirX;
    }

    function getDirY(){
        return snakeParts[0].dirY;
    }

    self = {
        move: moveSnake,
        setSpeed: setSpeed,
        addPart: addPart,
        setDirection: setHeadDirection,
        getDirX: getDirX,
        getDirY: getDirY
    };

    return self;
});

var Bonus = (function(x, y){
    var self;
    var bx = x;
    var by = y;
    var size = 10;
    var draw = function(drawer){
        drawer.fillColor = '#f00';
        drawer.rect(bx, by, size, size, true);
    };

    self = {
        bonusX: bx,
        bonusY: by,
        draw: draw
    };

    return self;
});

var Rock = (function(){
    function Rock(x, y){
        var self = this;
        Coordinates.call(self, x, y);
    }

    Rock.prototype = {
        draw: function(drawer){
           drawer.fillColor = '#AA34F4';
           drawer.lineColor = '#382627';
           drawer.regularPolygon(this.x, this.y, 8, 3, true);
        }
    };

    return Rock;
}());