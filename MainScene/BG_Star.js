class BG_Star 
{
    constructor() 
    {
		this.x = random(width);
		this.y = random(height);
		this.size = random(0.25, 3);
		this.t = random(TAU);
	}
	
    draw() 
    {
		this.t += 0.1;
        var scale = this.size + sin(this.t) * 2;
        noStroke();
        fill( color(255, 255, 255, 100) );
		ellipse(this.x, this.y, scale, scale);
	}
}