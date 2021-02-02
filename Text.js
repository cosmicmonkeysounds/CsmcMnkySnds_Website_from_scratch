class Text
{

    constructor()
    {
        this.size   = 50;
        this.align  = CENTER;
        this.font   = 'Bebas Neue';
        this.style  = BOLD;
        this.text   = ''; 
        this.xPos   = windowWidth/2;
        this.yPos   = windowHeight/2;
        this.colour = 255;
        this.weight = 10;
    }

    setText(t)
    {
        this.text = t;
    }

    top    = function(){ return this.yPos - this.size; }
    bottom = function(){ return this.yPos + this.size; }
    left   = function(){ return this.xPos - this.size; }
    right  = function(){ return this.xPos + this.size; }

    pressed()
    {
        // console.log( "TOP: ", this.top(), "BOTTOM: ", this.bottom(), "MouseY: ", mouseY );
        // console.log( "RIGHT: ", this.right(), "LEFT: ", this.left(), "MouseX: ", mouseX );

        if( (mouseY >= this.top() && mouseY <= this.bottom()) 
            && (mouseX <= this.right() && mouseX >= this.left()) )
        { 
            console.log("Hi");
            window.open("./plugins.html");
        }
    }

    hover()
    {
        if( (mouseY >= this.top() && mouseY <= this.bottom()) 
        && (mouseX <= this.right() && mouseX >= this.left()) )
        {
            this.colour = color(255, 255, 0);
        }
        else
        {
            this.colour = color(255);
        }
    }

    draw()
    {
        fill(this.colour).strokeWeight(this.weight);
        textSize(this.size);
        textAlign(this.align);
        textFont(this.font);
        textStyle(this.style);
        text(this.text, this.xPos, this.yPos);
    }
}