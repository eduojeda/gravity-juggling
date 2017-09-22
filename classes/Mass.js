function Mass(x, y, mass) {

	this.pos = new Vector(x, y);
	this.vel = new Vector(0, 0);
	this.force = new Vector(0, 0);
	this.mass = mass;
	
	this.computeForces = function(masses) {
	    this.force = new Vector(0,0);
	
	    for(var m in masses) {
		    if(masses[m] == this || masses[m] == null) continue;
		
		    var distance = this.pos.distance(masses[m].pos);
		    if(distance < DISTANCE_THRESHOLD) distance = DISTANCE_THRESHOLD;

		    var gravity = this.pos.vectorTo(masses[m].pos).scalar(
			    G * (this.mass * masses[m].mass) / Math.pow(distance, 2)
		    );
		
		    if(DEBUG) gravity.draw(this.pos, "to"+m, "#0f0");

		    this.force = this.force.add(gravity);
	    }
    }
    
    this.move = function() {
        /*Most of the programmers do the gravity something like this:
        velocity = velocity + gravity*delta_time
        position = position + velocity*delta_time
        The algorithm above is ok but when delta_time changes or delta_time is too high, it causes many unwanted problems. Gravity adding should actually be done like this:
        velocity = velocity + gravity*delta_time/2
        position = position + velocity*delta_time
        velocity = velocity + gravity*delta_time/2*/

        var halfDeltaVel = this.force.scalar(1/this.mass * dt/1000 * 0.5);
	    this.vel = this.vel.add(halfDeltaVel);
	    this.pos = this.pos.add(this.vel.scalar(dt/1000));
        this.vel = this.vel.add(halfDeltaVel);
    }

}