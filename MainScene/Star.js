class Star 
{
    constructor()
    {
        this.currentCoords     = createVector( random(0, width), random(0, height) );
        this.velocity          = createVector( random(-2, 2), random(-2, 2) );
        this.acceleration      = createVector( random(-1, 1), random(-1, 1) );
        this.speedScaler       = random( 1, 20 );

        this.numberOfPoints    = int( random(1, 50 / this.funMagnitude()) );
        this.diameter          = random( 5, 22 );

        // this.rotationDirection  = function(){ return Math.floor(random(2)) == 1 ? 1 : -1; }
        // console.log("rotation:", this.rotationDirection);

        this.alpha             = ( random(65, 90) * this.diameter ) / this.numberOfPoints;
        this.colour            = color( random(50, 200), random(20, 150), random(50, 255), this.alpha );

        this.distance = function()
        {
            return createVector( this.diameter, this.alpha );
        }

        this.rotationAngle     = random( 0.1, 10 );
        this.rotationIncrement = random(100, 1000);

        this.framesAlive       = 0;

        this.supernovaIncrement = 10;
        this.alive = false;

        for( let i = 0; i < 10; i++ )
        {
            this.supernova();
        }

    }

    funMagnitude(){
        return this.velocity.mag() / this.acceleration.mag();
    }

    starShape() 
    {
        let angle = TWO_PI / this.numberOfPoints;
        let halfAngle = angle / 2.0;
        beginShape();
        for (let a = 0; a < TWO_PI; a += angle) 
        {
            let x = 0;
            let y = 0;

            let sx = x + cos(a) * this.diameter * random(0.7, 1);
            let sy = y + sin(a) * this.diameter * random(1, 1.3);
            vertex(sx, sy);
            sx = x + cos(a + halfAngle) * this.rotationAngle;
            sy = y + sin(a + halfAngle) * this.rotationAngle;
            vertex(sx, sy);
        }
        endShape(CLOSE);
    }

    supernova()
    {
        noStroke();
        fill(255, 255, 255, this.supernovaIncrement );
        ellipse(this.currentCoords.x, this.currentCoords.y, this.diameter / this.supernovaIncrement, this.diameter / this.supernovaIncrement );
        this.supernovaIncrement--;

        if( this.supernovaIncrement == 0 )
        {
            this.alive = !this.alive;
        }
    }

    drawShape() 
    {
        //translate(p5.Vector.fromAngle(millis() / 1000, 1));
        push();
        translate( this.currentCoords.x, this.currentCoords.y );
        rotate( (frameCount * this.diameter) /  this.rotationIncrement );

        //console.log(this.alive);

        if( this.alive = false )
        {
            for( let i = 10; i < 0; i-- )
            {
                this.supernova();
            }
        }

        else
        {
            noStroke();
            fill( this.colour );
            this.starShape();
        }

        pop();

        this.framesAlive++;

        this.calculateNextPosition();
        //console.log(mouseX, mouseY);
    }

    calculateNextPosition()
    {   
        // makes the starts rotate slowly 
        let newCoord = p5.Vector.fromAngle(millis() / 1000, 1 * this.distance );

        // add velocity and curve to position vector
        this.currentCoords.add(this.velocity.div(1.007)).add(newCoord);

        // calculate vector distance from star to mouse
        let dx = mouseGravity.pos.copy().sub( this.currentCoords );

        // Newton's gravitational equation
        newCoord = dx.normalize().mult( (mouseGravity.constant * this.diameter * mouseGravity.mass) / Math.pow(dx.mag(), 2) );
        
        // Apply result to velocity
        this.velocity.add( newCoord.mult(random(-1, 3)) );

        this.checkBounds();
    }

    checkBounds() 
    {

        // check if x-axis is out of bounds
        let outOfBounds = boolean( this.currentCoords.x > width || this.currentCoords.x < 0 );

        // check if y-axis is out of bounds as well
        outOfBounds = outOfBounds || boolean( this.currentCoords.y > height || this.currentCoords.y < 0 );

        if( outOfBounds ) 
        {
            starSet.delete(this);
            starSet.add( new Star );

            // this function makes a copies a whole new array from StarSet, 
            // which is probably a terrible solution. 
            // should write a new function to just place the new Star into the right sorted place
            sortStars();
        }
    }

}