class GravityMass
{
    constructor( mass, constant, posX, posY )
    {
        this.mass     = mass;
        this.constant = constant;
        this.pos      = createVector( posX, posY );

        this.normal = function()
        {
            return this.pos.copy().normalize();
        }
    }

    createForceVector( otherMass )
    {
        let dx = this.pos.copy().sub( otherMass.currentCoords );
        return dx.normalize().mult( (this.constant * otherMass.mass * this.mass) / Math.pow(dx.mag(), 2) );
    }
}