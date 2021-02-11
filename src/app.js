var CONST = {
    INTERVAL_TICK: 10,
    BUBBLE_COUNT: 10,
    MAX_SPEED: 10,
    BUBBLE_SIZE: 60
}

var content = document.getElementById("container");
var footer = document.getElementById("footer");

var Bubbles = function(bubbleCount){

    this.nbrOfBubbles = bubbleCount;
    this.bubbles = [];

    this.createBubbles = function(){
        var i;
        var bubbleId = 0;
        var svgElement;
        var circleElement;
        for ( i=0; i<this.nbrOfBubbles;i++)
        {
            bubbleId = i;
            svgElement = this.createSvg(bubbleId);
            circleElement = this.createCircle();
            
            svgElement.appendChild(circleElement);
            container.appendChild(svgElement);
        }
        
    }   

    this.createSvg = function(id){
        svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.style.height = CONST.BUBBLE_SIZE;
        svg.style.width = CONST.BUBBLE_SIZE;
        svg.style.top = Math.floor(Math.random()*(content.clientHeight-CONST.BUBBLE_SIZE));
        svg.style.left = Math.floor(Math.random()*(content.clientWidth-CONST.BUBBLE_SIZE));
        svg.style.overflow = "hidden";
        svg.style.position = "absolute";
        svg.id = "bubble-"+id;
        return svg;
    }
    
    this.createCircle = function(){
        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx",CONST.BUBBLE_SIZE/2);
        circle.setAttribute("cy",CONST.BUBBLE_SIZE/2);
        circle.setAttribute("r",CONST.BUBBLE_SIZE/2-1);
        circle.setAttribute("stroke","white");
        circle.setAttribute("stroke-width","1");
        circle.setAttribute("fill","green");
        return circle;
    }
    
    this.setEventListeners = function(){
        var i;
        var bubbleId;
    
        for(i=0; i<this.nbrOfBubbles; i++)
        {
            bubbleId = "bubble-"+i;
            this.bubbles[i] = new individualBubble(bubbleId);
            document.getElementById(bubbleId).addEventListener("click", this.bubbles[i].onClickHandeler);
        }
    }   
}

var individualBubble = function(id){
    var that = this;
    this.id = id;
    var bubble = document.getElementById(id);
    var bubblePos = bubble.getBoundingClientRect();
    var posX = bubblePos.left;
    var posY = bubblePos.top;
    var directionX = true;
    var directionY = true;
    var speedX = Math.floor(Math.random()*CONST.MAX_SPEED)+1;
    var speedY = Math.floor(Math.random()*CONST.MAX_SPEED)+1;


    this.onClickHandeler = function(){
        var id = that.id.substr(7);
        console.log("bubble-"+id+" pressed!");
    }

    setInterval(function Animation() {
        if(posX >= content.clientWidth-CONST.BUBBLE_SIZE)
        {
            directionX = false
            directionY = Math.random() >= 0.5;
            speedX = Math.floor(Math.random()*CONST.MAX_SPEED)+1;
            speedY = Math.floor(Math.random()*CONST.MAX_SPEED)+1;
        } 
        if(posX <= 0)
        {
            directionX = true;
            directionY = Math.random() >= 0.5;
            speedX = Math.floor(Math.random()*CONST.MAX_SPEED)+1;
            speedY = Math.floor(Math.random()*CONST.MAX_SPEED)+1;
        }  
        if(posY >= content.clientHeight-CONST.BUBBLE_SIZE)
        {
            directionY = false;
            directionX = Math.random() >= 0.5;
            speedX = Math.floor(Math.random()*CONST.MAX_SPEED)+1;
            speedY = Math.floor(Math.random()*CONST.MAX_SPEED)+1;
        }
        
        if(posY <= 0)
        {
            directionY = true;
            directionX = Math.random() >= 0.5;
            speedX = Math.floor(Math.random()*CONST.MAX_SPEED)+1;
            speedY = Math.floor(Math.random()*CONST.MAX_SPEED)+1;
        }
        
        if(directionX == true)
        posX = posX+speedX;
        else
        posX = posX-speedX;
        if(directionY == true)
        posY = posY+speedY;
        else
        posY = posY-speedY;
        bubble.style.top = posY + 'px'; 
        bubble.style.left = posX + 'px'; 
    }, CONST.INTERVAL_TICK);
}

var bubbles = new Bubbles(CONST.BUBBLE_COUNT);
bubbles.createBubbles();
bubbles.setEventListeners();
document.getElementById("info").innerHTML = "nbr of bubbles: "+CONST.BUBBLE_COUNT+" interval: "+CONST.INTERVAL_TICK/1000+"s speed: 1-"+CONST.MAX_SPEED;



