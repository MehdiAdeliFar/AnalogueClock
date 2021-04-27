var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var radius = canvas.height / 2;
//remap to center
context.translate(radius, radius);
radius *= 0.9;
setInterval(()=>drawClock(),1000);
drawClock();

function drawClock() {
    // context.arc(0,0,radius,0,2*Math.PI);
    // context.fillStyle="White"
    // context.fill();
    drawFace(context, radius);



    drawNumbers(context,radius);

    drawTime(context,radius);
}

function drawFace(ctx, radius) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    var ang,num;
    ctx.font=radius*0.15+"px arial";
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    for (let num = 1; num < 13; num++) {
        ang=num*Math.PI/6;
        ctx.rotate(ang);
        ctx.translate(0, -radius*0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(),0,0);
        ctx.rotate(ang);
        ctx.translate(0,radius*0.85);
        ctx.rotate(-ang);
    }
}



function drawTime(ctx,radius) {
    var now=new Date;
    let hour=now.getHours()%12;
    let minute=now.getMinutes();
    let second=now.getSeconds();
    hour=hour*Math.PI/6+
        minute*Math.PI/(6*60)+
        second*Math.PI/(6*60*60);
    drawHand(ctx,hour,radius*0.5,radius*0.07);
    minute=(minute*Math.PI/30)+
        second*Math.PI/(30*60);
    drawHand(ctx,minute,radius*0.8,radius*0.07);
    second=second*Math.PI/30;
    drawHand(ctx,second,radius*0.9,radius*0.02);

}

function drawHand(ctx, hand, length, width) {
ctx.beginPath();
ctx.lineWidth=width;
ctx.lineCap="round";
ctx.moveTo(0,0);
ctx.rotate(hand);
ctx.lineTo(0,-length);
ctx.stroke();
ctx.rotate(-hand);
}