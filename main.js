nosex=0;
nosey=0;
rightwristx=0;
leftwristx=0;
difference=0; 

function setup()
{

canvas=createCanvas(500,400);
canvas.position(500,100);

video=createCapture(VIDEO);
video.size(400,450);
video.position(80,100);

poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);

}

function gotPoses(results)
{
    if(results.length >0 )
    {
        console.log(results);
        nosex=results[0].pose.nose.x;
        nosey=results[0].pose.nose.y;
        console.log("nosex = "+nosex+" and nosey = "+nosey);

        rightwristx=results[0].pose.rightWrist.x;
        leftwristx=results[0].pose.leftWrist.x;
        difference= floor(leftwristx-rightwristx);
        console.log("rightwristx = "+rightwristx+" and leftwristx = "+leftwristx+" difference = "+difference);
    }
}

function modelLoaded()
{
    console.log("posenet is initialized");
}

function draw()
{
    background('#32a852');
    document.getElementById("square_sides").innerHTML="width and height of a square will be = "+difference+"px";
    fill('#4287f5');
    stroke('#51f542');
    square(nosex,nosey,difference);
}