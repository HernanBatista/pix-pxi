window.onload = function(){
 document.getElementById("distorcao").style.transform =  "translate(-50%,-50%) rotateX(0deg) rotateY(0deg) translateZ(0)";
}
document.onmousemove = function(e){
 x = e.pageX, y = e.pageY;
 limite = 35;
 
 var ww = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
 var wh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
 
 rotx = y*100/wh;
 rotx = 180*rotx/100;
 rotx = rotx-90;
 rotx *= -1;
 
 roty = x*100/ww;
 roty = 180*roty/100;
 roty = roty-90;

 if (roty < -4){
	 document.getElementById("distorcao").style.transform =  "translate(-50%,-50%) rotateX("+(rotx*limite/100)+"deg) rotateY("+(roty*limite/100)+"deg) translateZ(0)";
	 document.getElementById("dist").style.transform =  "scaleX(1)";
	 
 }else if(roty > 4){
	 document.getElementById("distorcao").style.transform =  "translate(-50%,-50%) rotateX("+(rotx*limite/100)+"deg) rotateY("+(roty*limite/100)+"deg) translateZ(0)";
	 document.getElementById("dist").style.transform =  "scaleX(-1)";
 }

};