if (typeof(arimaa) === 'undefined') {
    var arimaa = {};
    alert('requires arimaa.js');
}

if (typeof(arimaa.imageLoader) === 'undefined') {
    arimaa.imageLoader = {};
}

arimaa.imageLoader = (function(){

	var 

	loadImage = function (imageFilePath, success){
		var img = new Image();
		img.onload = function(){
				if(success !== null) {
					success(img);
				}
			};
		img.src = imageFilePath;
	};

	return {
		load: loadImage
	}
}());