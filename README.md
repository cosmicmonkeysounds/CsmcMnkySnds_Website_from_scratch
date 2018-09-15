# CsmcMnkySnds_Website_from_scratch

0.2 (Current upload):

Basic responsive layout and working prototype of
my custom app using JavaScript and HTML5 Canvas.

~~~~ Things to improve ~~~~~~
~~~~ for next iteration ~~~~~~

Layout with the app needs work.
i.e.: Image overlapping table, behaving weird.

    Things to fix this:

        ~ Knob detection in main.js so the canvas will be
            scalable and responsive.

        ~ Fixing the "floating" to the left problem with the two pieces of content.
            Something to do with W3.css.....

More images and content would be nice, too.....

~~~ Things for the future ~~~

A Django backend!

A much more robust, OOP design of the JS app,
restructuring it's entire design so that,
from start up on the client side,
the program goes as follows:

1. Read what pedal we want to demo
2. Start downloading all non-default .png and .mp3 files
   in the background

3. Load and construct default background, collision,
   and audio clip objects based on
   what pedal is being demoed

4. Listen for input
5. Load and construct relevant objects
6. GO TO 4

As for how to create these objects,
The program should create all the objects 
based on input from the dev, 
and store them in a simple database.

i.e.: creating a interactive, animating knob object

    function  Vol.potentiometer = (controlName, x, y, radius, type,
                                   rotation, numberOfSteps, imageFolder) 
    =>  {
            this.name = controlName;
            this.x = x;
            this.y = y;
            this.r = radius;
            this.steps = numberOfSteps;
            this.imageFolder = imageFolder;

            this.background = this.imageFolder + 'background.png';

            for (let i = 0; i < this.steps; i++)
            {
                this.knobImage[i] = this.imageFolder + this.name + Str(i) + ".png";
            }
        }
