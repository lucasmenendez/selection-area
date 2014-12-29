//Variables
var selectable_container = document.querySelector('ul#selectable'),
	selectable_items = selectable_container.getElementsByTagName('li'),
	selection_area = document.querySelector('div#selection_area');
	selected_data = '',
	attr = "data",
	countClicks = 1;

//COUNT CLICKS
selectable_container.onclick = function(){
	if (countClicks % 2 !== 0) { 	//If the count is pair, clear the array and set initial count value (UNSELECT)
		countClicks = 1;
		selected_data = [];
 		for (var i = 0; i < selectable_items.length; i++) {
 			selectable_items[i].className = "";
 		}
	}else{		//Else count  increase and do the selection (SELECT)
		countClicks++;
	}
};


//MOUSE DOWN FUNCTION
mousedown = function(e){
	e.preventDefault();
	//Initial cursor position
	startX = e.pageX, startY = e.pageY;
	//New parameters when cursor is moved	
	document.addEventListener('mousemove', mousemove, false);
	document.addEventListener('mouseup', cancel_selection, false);
};

//MOUSE MOVE FUNCTION
mousemove = function(e){
	e.preventDefault();
	//Save it
	var currentX = e.pageX,
		currentY = e.pageY,
	//Calculet default dimensions and position
		height = currentY - startY,
		width = currentX - startX,
		top = startY,
		left = startX;

	//Calculate cases positions
	if(currentY < startY && currentX < startX){		//Top left
		top = currentY,
		left = currentX,
		height = startY - currentY,
		width = startX - currentX; 
	}else if(currentY < startY){	//Top
		top = currentY,
		height = startY - currentY;
	}else if(currentX < startX){	//Left
		left = currentX,
		width = startX - currentX; 
	}
	//Add dimensions
	selection_area.style.top = top+'px';
	selection_area.style.left = left+'px';
	selection_area.style.height = height+'px';
	selection_area.style.width = width+'px';
	selection_area.style.display = 'inline-block';
	//Create an array to save the selectArea dimensions
	selection_area.dimensions = {
		top: selection_area.getBoundingClientRect().top, 
		left: selection_area.getBoundingClientRect().left, 
		right: selection_area.getBoundingClientRect().left + selection_area.getBoundingClientRect().width, 
		bottom: selection_area.getBoundingClientRect().top + selection_area.getBoundingClientRect().height
	};
	//Add the class of li's under the cursor on it's selecting to Array	
	for (var i = 0; i < selectable_items.length; i++) {
        // Get li position info
        selectable_items[i].dimensions = {
        	top: selectable_items[i].getBoundingClientRect().top, 
			left: selectable_items[i].getBoundingClientRect().left, 
			right: selectable_items[i].getBoundingClientRect().left + selectable_items[i].getBoundingClientRect().width, 
			bottom: selectable_items[i].getBoundingClientRect().top + selectable_items[i].getBoundingClientRect().height
        };
        var data = selectable_items[i].getAttribute(attr) + ', ';
        if(intersect(selection_area.dimensions, selectable_items[i].dimensions)) {		//If two boxes are in touch add the li to array
          	selectable_items[i].className = 'selected';
          	if (selected_data.indexOf(data) == -1) {
          		selected_data += data;
          	}
    	}else{		//Else delete from array the li's are out of the selectionArea
    		selectable_items[i].className = '';
    		if(selected_data.indexOf(data)!=-1){
	    		selected_data = selected_data.slice(0, selected_data.indexOf(data)) + selected_data.slice(selected_data.indexOf(data)+data.length, selected_data.length-1);
	    	}
    	}
    };
	console.log(selected_data);
};

//CANCEL SELECTION FUNCTION
cancel_selection = function(e){
	document.removeEventListener('mousemove', mousemove, false);
	document.removeEventListener('mousedown', mousedown, false);
    selection_area.style.display = 'none';
    document.removeEventListener('mouseup', cancel_selection, false);
    document.addEventListener('mousedown', mousedown, false);
}

// Function to find the intersection of 2 blocks
function intersect(box1, box2) {
	return !(box2.left > box1.right || box2.right < box1.left || box2.top > box1.bottom || box2.bottom < box1.top);
}

//START SERVICE
document.addEventListener('mousedown', mousedown, false);