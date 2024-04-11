// DrawRectangle.js
function main() {

    // Retrieve <canvas> element <- (1)
    var canvas = document.getElementById('example');
    
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    // Get the rendering context for 2DCG <- (2)
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(0,0,0,1.0)';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // Draw start vector
    var v1 = new Vector3([2.25,2.25,0]);

    drawVector(v1,"red");

} 

// Draw our vector
function drawVector(v, color){

    // Get data
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');

    // Set style
    ctx.lineWidth = 4;
    ctx.strokeStyle = color;

    // Draw Vector in center of 400x400 canvas
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.lineTo(200+v.elements[0]*20, 200-v.elements[1]*20);
    ctx.stroke();
}

// Runs when user presses "draw" button
function handleDrawEvent(){
    
    // Get Data
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');

    // Clear rectangle
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw base
    ctx.fillStyle = 'rgba(0,0,0,1.0)';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // Draw V1 using users v1 inputs
    var x1 = document.getElementById('x1').value;
    var y1 = document.getElementById('y1').value;

    var v1 = new Vector3([x1,y1,0]);

    drawVector(v1,"red");

    // Draw V2 using users v2 inputs
    var x2 = document.getElementById('x2').value;
    var y2 = document.getElementById('y2').value;

    var v2 = new Vector3([x2,y2,0]);

    drawVector(v2,"blue");
}

function handleDrawOperationEvent(){
    
    // Get Data
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');

    // Clear rectangle
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw base
    ctx.fillStyle = 'rgba(0,0,0,1.0)';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // Draw V1 using users v1 inputs
    var x1 = document.getElementById('x1').value;
    var y1 = document.getElementById('y1').value;

    var v1 = new Vector3([x1,y1,0]);

    // Draw V2 using users v2 inputs
    var x2 = document.getElementById('x2').value;
    var y2 = document.getElementById('y2').value;

    var v2 = new Vector3([x2,y2,0]);

    var scalar = document.getElementById('scalar').value;

    var mode = document.getElementById('operator_select').value;

    var v3;
    var v4;
    drawVector(v1,"red");
    drawVector(v2,"blue");
    switch(mode){
        case "Add":
            v3 = v1;
            v3.add(v2);
            drawVector(v3,"green");
            break;
        case "Sub":
            v3 = v1;
            v3.sub(v2);
            drawVector(v3,"green");
            break;
        case "Multiply":
            v3 = v1;
            v3.mul(scalar);
            v4 = v2;
            v4.mul(scalar);
            drawVector(v3,"green");
            drawVector(v4,"green");
            break;
        case "Divide":
            v3 = v1;
            v3.div(scalar);
            v4 = v2;
            v4.div(scalar);
            drawVector(v3,"green");
            drawVector(v4,"green");
            break;
        case "Magnitude":
            console.log("Magnitude V1: " + v1.magnitude());
            console.log("Magnitude V2: " + v2.magnitude());
            break;
        case "Normalize":
            v3 = v1;
            v3.normalize();
            v4 = v2;
            v4.normalize();
            drawVector(v3,"green");
            drawVector(v4,"green");
            console.log("tried");
            break;
        case "Angle between":
            console.log("Angle: " + angleBetween(v1,v2) * (180/Math.PI));
            break;
        case "Area":
            console.log("Area: " + areaTriangle(v1,v2));
            break;
    }
    
}

function angleBetween(v1, v2){
    //dot(v1, v2) = ||v1|| * ||v2|| * cos(alpha).
    v1.normalize();
    v2.normalize();
    return Math.acos(Vector3.dot(v1,v2));
}

function areaTriangle(v1, v2){
    return Vector3.cross(v1,v2).magnitude() / 2;
}