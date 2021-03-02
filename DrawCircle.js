//Set Point and Color
function setPoint(x, y, w, setColor){
	var canvas = document.getElementById("can");
	var context = canvas.getContext("2d");
	var imgData = context.createImageData(w, w);
	var i;
	for (i = 0; i < imgData.data.length; i += 4) {		
		if (setColor == "1"){
			imgData.data[i+0] = 0;
			imgData.data[i+1] = 0;
			imgData.data[i+2] = 0;
			imgData.data[i+3] = 255;
		}
		else if (setColor == "2"){
			imgData.data[i+0] = 255;
			imgData.data[i+1] = 0;
			imgData.data[i+2] = 0;
			imgData.data[i+3] = 255;
		}
		else if (setColor == "3"){
			imgData.data[i+0] = 0;
			imgData.data[i+1] = 255;
			imgData.data[i+2] = 0;
			imgData.data[i+3] = 255;
		}
		else if (setColor == "4"){
			imgData.data[i+0] = 0;
			imgData.data[i+1] = 0;
			imgData.data[i+2] = 255;
			imgData.data[i+3] = 255;
		}
		else if (setColor == "5"){
			imgData.data[i+0] = 245;
			imgData.data[i+1] = 120;
			imgData.data[i+2] = 0;
			imgData.data[i+3] = 255;
		}
		else if (setColor == "6"){
			imgData.data[i+0] = 140;
			imgData.data[i+1] = 0;
			imgData.data[i+2] = 255;
			imgData.data[i+3] = 255;
		}
		else if (setColor == "7"){
			imgData.data[i+0] = 255;
			imgData.data[i+1] = 255;
			imgData.data[i+2] = 0;
			imgData.data[i+3] = 255;
		}
		else if (setColor == "8"){
			imgData.data[i+0] = 255;
			imgData.data[i+1] = 255;
			imgData.data[i+2] = 255;
			imgData.data[i+3] = 255;
		}
	} 
	context.putImageData(imgData, x, y);
}

//Draw Circle
function drawCircle(xc, yc, r, w, c) {

	var canvas = document.getElementById("can");
	var context = canvas.getContext("2d");
	var x, y, d, dR, dDR;

	x=0;
	y=r;
	d=1-r;
	dR=3;
	dDR=-r-r+5;

	while(y>x){
		setPoint(xc+x, yc+y, w, c);
		setPoint(xc+x, yc-y, w, c);
		setPoint(xc-x, yc+y, w, c);
		setPoint(xc-x, yc-y, w, c);
		setPoint(xc+y, yc+x, w, c);
		setPoint(xc+y, yc-x, w, c);
		setPoint(xc-y, yc+x, w, c);
		setPoint(xc-y, yc-x, w, c);

		if (d<0){
			d=d+dR;
			dR=dR+2;
			dDR=dDR+2;
		}
		else if (d>=0) {
			d=d+dDR;
			dR=dR+2;
			dDR=dDR+4;
			y--;
		}
		x++;
	}
}

//Draw Ellipse	
function drawEllipse(xc, yc, a, b, w, c) {
	var canvas = document.getElementById("can");
	var context = canvas.getContext("2d");
	var x, y, d, asq, bsq, v1, v2, dR, dD, dDR;

	x=0;
	y=b;
	asq=a*a;
	bsq=b*b;
	v1=4*x*x+4*x+1; //(2x+1)^2
	v2=y*y-2*y+1;	//(y-1)^2
	d=4*bsq-4*asq*b+asq;
	dR=12*bsq;
	dDR=12*bsq+8*asq-8*asq*b;
			//region 1 
			while(asq*(2*y-1)>2*bsq*(x+1)){
				setPoint(xc+x, yc+y, w, c);
				setPoint(xc+x, yc-y, w, c);
				setPoint(xc-x, yc+y, w, c);
				setPoint(xc-x, yc-y, w, c);
				if (d>0){
					d=d+dDR;
					dR=dR+bsq*8;
					dDR=dDR+bsq*8+asq*8;
					y--;
				}
				else {
					d=d+dR;
					dR=dR+bsq*8;
					dDR=dDR+bsq*8;
				}
				x++;
			}
			//region 2 
			d=bsq*v1+4*asq*v2-4*asq*bsq;
			while(y>=0){
				setPoint(xc+x, yc+y, w, c);
				setPoint(xc+x, yc-y, w, c);
				setPoint(xc-x, yc+y, w, c);
				setPoint(xc-x, yc-y, w, c);
				if (d<0) {
					d=d+bsq*(8*x+8)+asq*(12-8*y);
					x++;
				} 
				else {
					d=d+asq*(12-8*y);
				}
				y--;
			}
		}

//Clear Screen 
function clearScreen(){
	var canvas = document.getElementById("can");
	var context = canvas.getContext("2d");
	var setColor="8";
	setPoint(0, 0, canvas.width);
	document.getElementById('list1').innerHTML="";
	document.getElementById('list2').innerHTML="";
	circle.num.length=0;
	circle.value.length=0;
	ellipse.num.length=0;
	ellipse.value.length=0;
}

//Draw Generator
function drawGen(){
	var selectopt = document.getElementById("opt").value;
	if (selectopt == '1') {
		var xc = Number(document.getElementById("Xc").value);
		var yc = Number(document.getElementById("Yc").value);
		var r = Number(document.getElementById("r").value);
		var w = Number(document.getElementById("w").value);
		var setColor=document.getElementById("setcol").value;

		const lastItem = circle.num.length;
		var last= String(lastItem+1);

		drawCircle(xc,yc,r,w,setColor);
		var opt = "Circle";
		var node = document.createElement("li");
		var textnode = document.createTextNode(opt+" "+last);
		node.appendChild(textnode)
		document.getElementById("list1").appendChild(node); 

		circle.num.push(last);
		var arr=[xc,yc,r,w,setColor];
		circle.value.push({"param":arr});

	}
	else if (selectopt == '2'){
		var xc = Number(document.getElementById("Xc").value);
		var yc = Number(document.getElementById("Yc").value);
		var a = Number(document.getElementById("a").value);			
		var b = Number(document.getElementById("b").value);
		var w = Number(document.getElementById("w").value);
		var setColor=document.getElementById("setcol").value;

		const lastItem = ellipse.num.length;
		var last= String(lastItem+1);

		drawEllipse(xc,yc,a,b,w,setColor);
		var opt = "Ellipse";
		var node = document.createElement("li");
		var textnode = document.createTextNode(opt+" "+last);
		node.appendChild(textnode);
		document.getElementById("list2").appendChild(node);

		ellipse.num.push(last);
		var arr=[xc,yc,a,b,w,setColor];
		ellipse.value.push({"param":arr});
	}
	else{
		window.alert("Input Option");
	}
}

var circle = {
	"name":"Circle",
	"num":[],
	"value":[]
}

var ellipse={
	"name":"Ellipse",
	"num":[],
	"value":[]
}

function refresh(){

	for(i in circle.value){
		drawCircle(circle.value[i].param[0],circle.value[i].param[1],circle.value[i].param[2],circle.value[i].param[3], circle.value[i].param[4]);
	}
	for(i in ellipse.value){
		drawEllipse(ellipse.value[i].param[0],ellipse.value[i].param[1],ellipse.value[i].param[2], ellipse.value[i].param[3],ellipse.value[i].param[4],ellipse.value[i].param[5]);
	}
	
}

function saveCircle() {
	var blob= new Blob([JSON.stringify(circle)], {type: "text/plain"});
	saveAs(blob,"circle.txt");
}

function saveEllipse() {
	var blob= new Blob([JSON.stringify(ellipse)], {type: "text/plain"});
	saveAs(blob,"ellipse.txt");
}

function save(){
	saveCircle();
	saveEllipse();
}
