var Drawer = (function() {
    function Drawer(canvasId) {
        if (!(this instanceof arguments.callee)) {
            return new Drawer(canvasId);
        }

        var self = this;
        var canvas = document.getElementById(canvasId);
        self._context = canvas.getContext('2d');
        self.fillColor = '#FFF';
        self.lineColor = '#000';
        self.lineSize = 1;
        return self;
    }

    Drawer.prototype = {
        rect: function(x, y, width, height, toFill) {
            this._context.beginPath();
            this._context.rect(x, y, width, height);
            this._context.strokeStyle = this.lineColor;
            this._context.lineWidth = this.lineSize;
            this._context.stroke();
            if (toFill){
                this._context.fillStyle = this.fillColor;
                this._context.fill();
            }
        },

        circle: function(x, y, radius, toFill) {
            this._context.beginPath();
            this._context.arc(x, y, radius, 0, 2 * Math.PI, false);
            this._context.strokeStyle = this.lineColor;
            this._context.lineWidth = this.lineSize;
            this._context.stroke();
            if (toFill){
                this._context.fillStyle = this.fillColor;
                this._context.fill();
            }
        },

        line: function(x1, y1, x2, y2) {
            if (!this.validCoordinates(x1, y1)){
                console.error('Line starting point is out of the canvas');
            }

            if (!this.validCoordinates(x2, y2)){
                console.error('Line ending point is out of the canvas');
            }

            this._context.beginPath();
            this._context.moveTo(x1, y1);
            this._context.lineTo(x2, y2);
            this._context.strokeStyle = this.lineColor;
            this._context.lineWidth = this.lineSize;
            this._context.stroke();
        },

        path: function(points){
            this._context.beginPath();
            this._context.moveTo(points[0].x, points[0].y);
            for (var i = 1; i < points.length; i++) {
                this._context.lineTo(points[i].x, points[i].y);
            }

            this._context.strokeStyle = this.lineColor;
            this._context.lineWidth = this.lineSize;
            this._context.stroke();
        },

        shape: function(points, toFill){
            this._context.beginPath();
            this._context.moveTo(points[0].x, points[0].y);
            for (var i = 1; i < points.length; i++) {
                this._context.lineTo(points[i].x, points[i].y);
            }

            this._context.strokeStyle = this.lineColor;
            this._context.lineWidth = this.lineSize;
            this._context.closePath();
            this._context.stroke();
            if (toFill){
                this._context.fillStyle = this.fillColor;
                this._context.fill();
            }
        },

        regularPolygon: function(x, y, radius, sides, toFill){
            this._context.beginPath();
            this._context.moveTo(x, y - radius);

            for(var n = 1; n < sides; n++) {
                var currX = radius * Math.sin(n * 2 * Math.PI / sides);
                var currY = -1 * radius * Math.cos(n * 2 * Math.PI / sides);
                this._context.lineTo(x + currX, y + currY);
            }

            this._context.closePath();
            this._context.strokeStyle = this.lineColor;
            this._context.stroke();
            if (toFill){
                this._context.fillStyle = this.fillColor;
                this._context.fill();
            }
        },

        validCoordinates: function(x, y){
            var isXValid = (0 <= x) && (x <= this._context.canvas.width);
            var isYValid = (0 <= y) && (y <= this._context.canvas.height);
            return isXValid && isYValid;
        }
    };

    return Drawer;
}());