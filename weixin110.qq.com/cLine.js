var exploded = true,
    networkCircleZoomOut = true,
    circleSpace = 4,
    currentIndex = 0,
    circleRadius = 40,
    nodeMoveSpeed = 40,

    zoomOutNodeSpeed = view.size.width / 1.5,
    showOnePartLinePercent = 0,
    showTwoPartLinePercent = 0;

var networkCircleOut = new Shape.Circle({
    center: view.center,
    radius: circleRadius,
    strokeColor: 'rgba(255, 255, 255, 1)',
    strokeWidth: 1
});
networkCircleOut.strokeColor.alpha = 0;

var networkCircleIn = new Shape.Circle({
    center: view.center,
    radius: circleRadius - circleSpace,
    fillColor: 'rgba(0, 0, 0, .1)'
});


var Line = function () {
    this.line = new Path({
        segments: [[0, 0], [0, 0]],
        strokeColor: 'rgba(255,255,255,.1)',
        strokeWidth: 1
    });
};
Line.prototype.draw = function (startPoint, endPoint, percent) {
    this.line.segments[0].point = startPoint;
    if(percent !== undefined){
        this.line.segments[1].point = (endPoint - startPoint) * percent / 100 + startPoint;
    }else{
        this.line.segments[1].point = endPoint;
    }
};

var Node = function (point) {
    var color = "rgba(163, 255, 243, " + Math.random() + ")";
    var node = new Path.Circle({
        center: point,
        radius: 1,
        fillColor: color
    });

    this.point = point; 
    this.color = color;
    this.dest = getDestinationInCircle(); 
    this.width = node.bounds.width;
    this.node = node;
};
Node.prototype.move = function () {
    var vector = this.dest - this.node.position;
    if (vector.length < 10) {
        this.dest = getDestinationInCircle();
        vector = this.dest - this.node.position;
    }

    this.node.position += vector * nodeMoveSpeed / 1000;
};

var font = new Raster('slogan');
font.scale(.5);
font.position = view.center;
font.opacity = 0;


function getDestinationInCircle() {
    var posX = (Math.random() * 2 - 1) * circleRadius;
    var ylim = Math.sqrt(circleRadius * circleRadius - posX * posX);
    var posY = (Math.random() * 2 - 1) * ylim;

    return new Point(posX + view.center.x, posY + view.center.y);
}
function onResize(event) {
    font.position = view.center;
    networkCircleOut.position = view.center;
    networkCircleIn.position = view.center;
}
function onFrame(event) {
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].move(i);
    }

    switch(currentIndex){
        case 0: 
            if(circleRadius < 60){
                var step = 30 / circleRadius;
                networkCircleOut.radius += step;
                networkCircleIn.radius += step;
                circleRadius += step;
            }else{
                var outR = networkCircleOut.radius;
                outR = networkCircleZoomOut ? outR + .2 : outR - .2;
                networkCircleZoomOut = outR >= 65 ? false : outR <= 60 ? true : networkCircleZoomOut;

                networkCircleOut.radius = outR;
                networkCircleIn.radius = outR - circleSpace;

                next(900);
            }
            if(networkCircleOut.strokeColor.alpha < 0.2)
                networkCircleOut.strokeColor.alpha += .03; 
            break;
        case 1: 
            var viewW = view.size.width;
            networkCircleOut.visible = false;
            if(exploded && networkCircleOut.radius > 40){
                networkCircleOut.radius -= 4;
                networkCircleIn.radius = networkCircleOut.radius - circleSpace;
            }else{
                exploded = false;
                if (networkCircleOut.radius < viewW / 2 + 100) { 
                    networkCircleOut.radius += viewW / 30;
                }
                networkCircleIn.radius = networkCircleOut.radius - circleSpace;

                if (circleRadius < viewW / 1.5) {
                    circleRadius += 35;
                }

                if(zoomOutNodeSpeed > 10){ 
                    zoomOutNodeSpeed -= zoomOutNodeSpeed * .08;
                    nodeMoveSpeed = zoomOutNodeSpeed;
                }else{
                    zoomOutNodeSpeed = nodeMoveSpeed = 10;
                    next(800);
                }
            }
            break;
        case 2: 
            showOnePartLinePercent = showOnePartLinePercent < 100 ? showOnePartLinePercent + 3 : 100;
            for (var i = 0, len = nodes.length; i < len; ++i) {
                if (i < lineCount - 1 && i % 5 == 0) {
                    lines[i].draw(nodes[i].node.position, nodes[i + 1].node.position, showOnePartLinePercent);
                }
            }

            if(showOnePartLinePercent >= 100){
                if(showTwoPartLinePercent < 100){
                    showTwoPartLinePercent += 2;
                }else{
                    showTwoPartLinePercent = 100;
                    next(300);
                }
                for (var i = 0, len = nodes.length; i < len; ++i) {
                    if (i < lineCount - 1 && i % 5 != 0) {
                        lines[i].draw(nodes[i].node.position, nodes[i + 1].node.position, showTwoPartLinePercent);
                    }
                }
            }
            break;
        case 3: 
            if (font.opacity < 1) {
                font.opacity += .03;
            }

            for (var i = 0, len = nodes.length; i < len; ++i) {
                if (i < lineCount - 1) {
                    lines[i].draw(nodes[i].node.position, nodes[i + 1].node.position);
                }
            }
            break;
    }
}


var nodes = [],
    lines = [],
    size = view.size,
    nodeCount = lineCount = Math.round(size.width / 60);
for (var i = 0; i < nodeCount; i++) {
    var node = new Node(getDestinationInCircle());
    nodes.push(node);
}
for (i = 0; i < lineCount; i++) {
    var line = new Line();
    lines.push(line);
}

var animationStartTime;
function next(waitTime){
    if(animationStartTime){
        if (+new Date() - animationStartTime > (waitTime || 0)) {
            animationStartTime = null;
            currentIndex++;
        }
    }else{
        animationStartTime = +new Date();
    }
}

var tool = new Tool();
tool.onMouseDown = function(e){
    if(currentIndex != 3) return;

    var i = Math.round(Math.random() * nodes.length - 1);
    nodes[i].node.remove();
    nodes[i] = new Node(e.point);
};