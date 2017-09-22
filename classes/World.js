function World()
{
    this.player = null;
    this.entities = [];
    this.intervalID = null;

    this.last_tick = get_tick();

    var self = this;
    $(canvas).mouseenter(function(e) {
        self.player = new Player(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top);
    });

    $(canvas).mouseleave(function(e) {
        self.player = null;
    });

    $(canvas).mousedown(function(e) {
        e.preventDefault(); // Or the text selection cursor will show up on click-and-drag in Chrome
        self.player.mass *= BOOST_FACTOR;
        self.player.r += 1;
    });

    $(canvas).mouseup(function(e) {
        self.player.mass /= BOOST_FACTOR;
        self.player.r -= 1;
    });

    this.populate = function(num) {
        for(var i = 0 ; i < num ; i++) {
            var ball = new Ball(
                canvas.width/8 + Math.floor(Math.random()*canvas.width*0.75),
                canvas.height/8 + Math.floor(Math.random()*canvas.height*0.75),
                2); //@todo calcular esto dinamicamente

            this.entities.push(ball);
        }
    }

    this.step = function() {
        var tick = get_tick();
        dt = (tick - this.last_tick) * TIMESCALE;
        this.last_tick = tick;

        clear();

        for(var e in this.entities) {
            this.entities[e].computeForces(this.entities.concat([this.player]));
        }

        for(var e in this.entities) {
            this.entities[e].move();
            this.entities[e].collideEdges(canvas.width, canvas.height);
            this.entities[e].draw();

            if(DEBUG) {
                this.entities[e].vel.draw(this.entities[e].pos, "vel"+m, '#fff');
                this.entities[e].force.draw(this.entities[e].pos, "force"+m, '#f00');
            }
        }

        if(this.player != null) {
            this.player.draw();
        }
    }

    this.start = function()	{
        var that = this;
        this.intervalID = window.setInterval(function(){
            that.step();
        }, INTERVAL);
    }

    this.stop = function() {
        window.clearInterval(this.intervalID);
    }

    function clear() {
        if(MOTION_BLUR) {
            ctx.save();
            ctx.fillStyle = "rgba(0, 0, 0, .05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.restore();
        }else {
            canvas.width = canvas.width;
        }
    }

    function get_tick() {
        return new Date().getTime();
    }

}
