function setup() {
    canvas=createCanvas(380,380);
    canvas.center();
    
    video=createCapture(VIDEO);
    video.hide();

    objDetect=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="status: detecting Objects";

} 

img="";
status="";
objects=[];



function preload() {
img=loadImage("dog_cat.jpg");

}

function modelLoaded() {
    console.log("modelLoaded");
    status=true;
    objDetect.detect(video,gotResult);
   }


function draw() {
    image(video,0,0,380,380);
    /*stroke("red");
    noFill();
    rect(30,60,450,350);
    text("dog",45,75);

    stroke("red");
    noFill();
    rect(300,90,270,320);
    text("cat",320,120);*/
    if(status!="") {
        r=random(255);
        g=random(255);
        b=random(255);
        objDetect.detect(video,gotResult);
        for(i=0; i<objects.length; i++) {
            document.getElementById("status").innerHTML="status:object Detected  ";
            document.getElementById("number_of_obj").innerHTML="number of object detect  : "+objects.length ;
            per=floor(objects[i].confidence*100);
            text(objects[i].label+" "+per+"%",objects[i].x,objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
    }
}




function gotResult(error,results) {
if (error) {
    console.error(error);
}
else {
    console.log(results);
    objects=results;
}
}

