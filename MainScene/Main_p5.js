let starSet = new Set();
let starArray = [];
let backgroundStars = []
let canvas, ctx, monkeyFace, monkeyBrain, monkeyFlame; 
let scrollPos;
let centerGravity, mouseGravity; 

function setup() 
{
    canvas = createCanvas( displayWidth, displayHeight );
   
    // attaches canvas to a .div in the HTML
    canvas.parent( 'cosmic-banner' );

    // monkeyFace = loadImage('Photos/MonkeyFace.png');
    // monkeyBrain = loadImage('Photos/MonkeyBrain.png');
    // monkeyFlame = loadImage('Photos/MonkeyFlame.png');

    mouseGravity  = new GravityMass(0.05, 0.1, mouseX, mouseY);

    scrollPos = 0;

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

function sortStars()
{
    starArray = Array.from(starSet).sort( function(a, b)
    {
        return a.distance().mag() - b.distance().mag();
    });
    //console.log(starArray);
}

function windowResized() 
{
    resizeCanvas( displayWidth, displayHeight );
}

function mouseWheel(event)
{
    if( scrollPos + event.deltaY < 0 || scrollPos + event.deltaY > 5000 ){
        scrollPos += event.deltaY;
        for( let s of starSet )
            s.velocity.y += event.deltaY / (s.distance().mag() * random(0, 10));
    }
}


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

    fill(255)
        .strokeWeight(10);
    textSize(150 / -scrollPos );
    textAlign(CENTER);
    textFont('Bebas Neue');
    textStyle(BOLD);
    //position(0,0);
    text('COSMIC MONKEY SOUNDS', width/2, 130);

}