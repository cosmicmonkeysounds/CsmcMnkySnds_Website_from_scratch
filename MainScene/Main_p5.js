let starSet = new Set();
let starArray = [];
let backgroundStars = []
let canvas, ctx, monkeyFace, monkeyBrain, monkeyFlame; 
let scrollPos;
let centerGravity, mouseGravity; 
let cosmicText;

function setup() 
{
    canvas = createCanvas( windowWidth, windowHeight );
   
    // attaches canvas to a .div in the HTML
    canvas.parent( 'cosmic-banner' );

    // monkeyFace = loadImage('Photos/MonkeyFace.png');
    // monkeyBrain = loadImage('Photos/MonkeyBrain.png');
    // monkeyFlame = loadImage('Photos/MonkeyFlame.png');

    mouseGravity  = new GravityMass(0.05, 0.05, mouseX, mouseY);

    cosmicText = new CosmicText;

    scrollPos = -1;

    for( let i = 0; i < 150; i++ )
    {
        starSet.add( new Star );
    }

    for( let i = 0; i < 1000; i++ )
    {
        backgroundStars[i] = new BG_Star();
    }

    sortStars();
}

// compares and sorts stars based on the magnitude of their distances,
// which is their brightness and diameter multiplied together. 
function sortStars()
{
    starArray = Array.from(starSet).sort( function(a, b)
    {
        return a.distance().mag() - b.distance().mag();
    });
}

// p5 function
function windowResized() 
{
    resizeCanvas( windowWidth, windowHeight );
}

// p5 function
function mouseWheel(event)
{
    if( scrollPos + event.deltaY < 0 || scrollPos + event.deltaY > 5000 )
    {
        scrollPos += event.deltaY;
        for( let s of starSet )
            s.velocity.y += event.deltaY / (s.distance().mag() * random(0, 10));
    }


    // this makes it so the window doesn't scroll, thus making sure only the scrollPos variable is updated.
    return false;
}

// p5 main loop
function draw() 
{
    background(10);

    for( let i = 0; i < backgroundStars.length; i++ )
    {
        backgroundStars[i].draw();
    }

    for( let i = 0; i < starArray.length; i++ ) 
    {
        starArray[i].drawShape();
    }

    mouseGravity.pos = createVector(mouseX, mouseY);

    // image( monkeyFace, (width/2) - 520, -45 );
    // image( monkeyBrain, (width/2) - 520, -45 );
    // image( monkeyFlame, (width/2) - 520, -44 );

    cosmicText.draw();

}