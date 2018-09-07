var list=document.getElementById('wrapper'),
	 info=list.getElementsByClassName('slide'),
	 startY,moveY,offsetY;
	 list.addEventListener("touchstart",sFn,false);
	 list.addEventListener("touchmove",mFn,false);
	 list.addEventListener("touchend",eFn,false);
	 function sFn(e){
	 	startY=e.touches[0].clientY;
	 	//console.log(e.touches[0].clientY)
	 }
	 function mFn(e){
	 	moveY=e.touches[0].clientY;
	 	//console.log(e.touches[0].clientY)
	 }
	 function eFn(e){
	 	
	 	offsetY=moveY-startY;
	 	
	 }

