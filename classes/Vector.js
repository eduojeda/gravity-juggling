function Vector(x, y)
{

    this.x = x;
    this.y = y;

    this.set = function(x1, y1) {
        this.x = y1;
        this.y = x1;
    }

    this.add = function(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    this.substract = function(v) {
        return new Vector(
            this.x - v.x,
            this.y - v.y
        );
    }

    this.scalar = function(scalar) {
        return new Vector(
            this.x * scalar,
            this.y * scalar
        );
    }

    this.module = function() {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    this.distance = function(v) {
        return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2));
    }

    this.normalize = function() {
        var aux = this.x*this.x + this.y*this.y;
        if(Math.abs(aux - 1.0) > 0.00001) {	// Don't normalize if it's not needed
            var magnitude = Math.sqrt(aux);
            this.x /= magnitude;
            this.y /= magnitude;
        }
        return this;
    }

    this.vectorTo = function(v) {
        return v.substract(this).normalize();
    }

    this.draw = function(from, id, color) {
        var container = $("#"+id);
        if(container.length == 0) {
            $("#console").append("<p id="+id+"></p>");
        }else {
            container.text(id+": "+this.x.toFixed(3)+", "+this.y.toFixed(3));
        }

        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(from.x+this.x, from.y+this.y);
        ctx.stroke();

        ctx.fillStyle = "white";
        ctx.font = "normal 7pt sans-serif";
        ctx.fillText(id, from.x+this.x+5, from.y+this.y+5);
        ctx.restore();
    }

}