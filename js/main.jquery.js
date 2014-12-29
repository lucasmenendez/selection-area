$(document).ready(function(){
	//Variables
		//ID's
		ul = $('ul#selectable');
		li = $('ul#selectable li');
		page = $(document);
		selection = $('div#selection_area');

		files = [];		//Array
		var countClicks=1, countHover=1; 	//Count of turns
	ul.on('click', function(){
		if(countClicks%2!==0){ //If the count is pair, clear the array and set initial count value (UNSELECT)
    		countClicks=1;
    		files = [];
	 		li.css({'background':'#fff'});
    	}else{			//Else count  increase and do the selection (SELECT)
    		countClicks++;
    	}
	});
    page.mousedown(function(e){
    	e.preventDefault();
    //Initial cursor position
		startX = e.pageX;
		startY = e.pageY;
	//New parameters when cursor is moved
		page.mousemove(function(e){
	//Save it
			currentX = e.pageX;
			currentY = e.pageY;
	//Calculet default dimensions and position
			height = currentY - startY;
			width = currentX - startX;
			selection.css({
				'top': startY+'px',
				'left': startX+'px',
			});
	//Calculate cases positions
			if(currentY < startY && currentX < startX){		//Top left
				selection.css({
					/*
						I need to set the top and left manualy, when i 
						did it with variables the dimensions isn't real.
					*/
					'top': currentY+'px',
					'left': currentX+'px',
				});
				height = startY - currentY;
				width = startX - currentX; 
			}else if(currentY < startY){					//Top
				selection.css({'top': currentY+'px'});
				height = startY - currentY;
			}else if(currentX < startX){					//Left
				selection.css({'left': currentX+'px'});
				width = startX - currentX; 
			}
	//Add dimensions
			selection.show().css({
				'width': width+'px',
				'height': height+'px',
			});	
	//Create an array to save the selectArea dimensions
			selectionPos = selection.position();
			selectedArea = {top: selectionPos.top, left: selectionPos.left, right: selectionPos.left+selection.width(), bottom: selectionPos.top+selection.height()};
	//Add the class of li's under the cursor on it's selecting to Array	
			li.each(function() {
		        // Get li position info
		        liPos = $(this).position();
		        liEndX = liPos.left + $(this).width();
		        liEndY = liPos.top + $(this).height();
		        listItemArea = {top: liPos.top, left: liPos.left, right: liEndX, bottom: liEndY};

		        var data = $(this).attr('class');
		        if(intersect(selectedArea, listItemArea)) { //If two boxes are in touch add the li to array
		          	$(this).css({'background':'#ccc'});
		          	if(jQuery.inArray(data, files) == -1) {
		            	files.push(data);
		          	}
	        	}else{										//Else delete from array the li's are out of the selectionArea
	        		$(this).css({'background':'transparent'});
	        		removeByData(files, data);
	        	}
		    });
			console.log(files);
		});	    
	}).mouseup(function(e){
		page.off('mousemove');
		li.off('mouseover');
        selection.hide();
    });
});
// Function to find the intersection of 2 blocks
function intersect(box1, box2) {
	return !(box2.left > box1.right || box2.right < box1.left || box2.top > box1.bottom || box2.bottom < box1.top);
}
function removeByData(array, data){
	for(var i=0; i<array.length; i++){
		if(array[i] == data){
			array.splice(i, 1);
		}
	}
}