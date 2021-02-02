class CosmicText
{
    size = function() 
    { 
        let pageDepth = -scrollPos;

        return map( 150 / pageDepth,
                    150, 0,
                    150, 140 / map( pageDepth,
                                    1, 1000,
                                    1, 100 )  
                  );

    }
    
    draw()
    {
        if( -scrollPos < 450 )
        {
            fill(255)
            .strokeWeight(10);
            textSize( this.size() );
            textAlign(CENTER);
            textFont('Bebas Neue');
            textStyle(BOLD);
            //position(0,0);
            text('COSMIC MONKEY SOUNDS', width/2, 130);
        }

    }

}