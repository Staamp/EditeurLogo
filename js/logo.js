class command{
	constructor(){
		this.buttonLeftPressed = false;
		this.x = 0;
		this.y = 0;
		this.lastX = 0;
		this.lastY = 0;
		this.ancreX = 0;
		this.ancreY = 0;
	}
	getButtonPressed(){
		return this.buttonLeftPressed;
	}
	setButtonPressed(state){
		this.buttonLeftPressed = state;
	}
	setX(x){
		this.x = x;
	}
	setY(y){
		this.y = y;
	}
	getX(){
		return this.x;
	}
	getY(){
		return this.y;
	}
	setLastX(x){
		this.lastX = x;
	}
	setLastY(y){
		this.lastY = y;
	}
	getLastX(){
		return this.lastX;
	}
	getLastY(){
		return this.lastY;
	}
	setAncreX(x){
		this.ancreX = x;
	}
	setAncreY(y){
		this.ancreY = y;
	}
	getAncreX(){
		return this.ancreX;
	}
	getAncreY(){
		return this.ancreY;
	}
}
var xCanvas = 500;
var yCanvas = 500;
var commande = new command();
var mode = "";
var taille = 5;

document.addEventListener("DOMContentLoaded",function(e){
	var overlay = document.getElementById('overlay');
	overlay.addEventListener('mouseover',afficheCurseur);
	overlay.addEventListener('mouseout',sortieCanvas);
	overlay.addEventListener('mousemove',getCoord);
	overlay.addEventListener('mouseup',release);
	overlay.addEventListener('mousedown',click);
	document.getElementById('new').addEventListener('click',clearCanvas);
});

function clearCanvas(){
	var dessin = document.getElementById('dessin');
	var cvsDessin = dessin.getContext('2d');
	cvsDessin.clearRect(0,0,xCanvas,yCanvas);
}

function afficheCurseur(){
	var input = document.getElementsByTagName('input');
	taille = document.getElementById('size').value;
	for(var i in input){
		if(input[i].checked){
			mode = input[i].id;
		}
	}
	switch(mode){
		case "rectangle":{
			var overlay = document.getElementById('overlay');
			var cvsOverlay = overlay.getContext('2d');
			cvsOverlay.clearRect(0,0,xCanvas,yCanvas);
			cvsOverlay.fillStyle = 'RGBa(255,255,255,1)';
			cvsOverlay.fillRect(commande.getX(),commande.getY(),15,15);
		}
		break;
		case "gommer":{
			var overlay = document.getElementById('overlay');
			var cvsOverlay = overlay.getContext('2d');
			cvsOverlay.clearRect(0,0,xCanvas,yCanvas);
			cvsOverlay.lineWidth = '2';
			cvsOverlay.strokeStyle = 'RGBa(100,100,100,1)';
			cvsOverlay.strokeRect(commande.getX(),commande.getY(), taille, taille);
		}
		break;
		case "ligne":
		case "tracer":{
			var overlay = document.getElementById('overlay');
			var cvsOverlay = overlay.getContext('2d');
			cvsOverlay.clearRect(0,0,xCanvas,yCanvas);
			cvsOverlay.beginPath();
			cvsOverlay.lineWidth = '1';
			cvsOverlay.fillStyle = 'RGBa(255,255,255,1)';
			cvsOverlay.arc(commande.getX(),commande.getY(),taille/2,0,2*Math.PI);
			cvsOverlay.fill();
		}
		break;
	}
}

function sortieCanvas(){
	effaceCurseur();
	if(commande.getButtonPressed()) {
		switch (mode) {
			case "rectangle": {
				var longueur = commande.getX() - commande.getAncreX();
				var largeur = commande.getY() - commande.getAncreY();
				afficheRectangle(commande.getAncreX(), commande.getAncreY(), longueur, largeur);
			}
			break;
			case "ligne":{
				var dessin = document.getElementById('dessin');
				var cvsDessin = dessin.getContext('2d');
				cvsDessin.beginPath();
				cvsDessin.strokeStyle = 'RGBa(255,255,255,1)';
				cvsDessin.lineWidth = taille;
				cvsDessin.moveTo(commande.getAncreX(),commande.getAncreY());
				cvsDessin.lineTo(commande.getX(),commande.getY());
				cvsDessin.stroke();
			}
			break;
		}
	}
	commande.setButtonPressed(false);
	afficheInformation();
}

function effaceCurseur(){
	var overlay = document.getElementById('overlay');
	var cvsOverlay = overlay.getContext('2d');
	cvsOverlay.clearRect(0,0,xCanvas,yCanvas);
}

function getCoord(e){
	var rect = e.target.getBoundingClientRect();
	var x = e.clientX - rect.left;
	var y = e.clientY - rect.top;
	commande.setX(x);
	commande.setY(y);
	afficheInformation();
	afficheCurseur();
	if (commande.getButtonPressed()) {
		switch (mode) {
			case "gommer": {
				gommer();
			}
			break;
			case "tracer": {
				var dessin = document.getElementById('dessin');
				var cvsDessin = dessin.getContext('2d');
				cvsDessin.beginPath();
				cvsDessin.lineWidth = '1';
				cvsDessin.fillStyle = 'RGBa(255,255,255,1)';
				cvsDessin.arc(commande.getX(), commande.getY(), taille / 2, 0, 2 * Math.PI);
				cvsDessin.fill();
			}
			break;
			case "rectangle": {
				effaceCurseur();
				var longueur = commande.getX() - commande.getAncreX();
				var largeur = commande.getY() - commande.getAncreY();
				var last_longueur = commande.getLastX() - commande.getAncreX();
				var last_largeur = commande.getLastY() - commande.getAncreY();
				var overlay = document.getElementById('overlay');
				var cvsOverlay = overlay.getContext('2d');
				cvsOverlay.clearRect(commande.getAncreX(),commande.getAncreY(),last_longueur,last_largeur);
				cvsOverlay.fillStyle = 'RGBa(255,255,255,0.7)';
				cvsOverlay.fillRect(commande.getAncreX(),commande.getAncreY(), longueur, largeur);
			}
			break;
			case "ligne":{
				var overlay = document.getElementById('overlay');
				var cvsOverlay = overlay.getContext('2d');
				cvsOverlay.strokeStyle = 'RGBa(255,255,255,1)';
				cvsOverlay.lineWidth = taille;
				cvsOverlay.moveTo(commande.getAncreX(),commande.getAncreY());
				cvsOverlay.lineTo(commande.getX(),commande.getY());
				cvsOverlay.stroke();
			}
			break;
			default :
			break;
		}
	}
	commande.setLastX(x);
	commande.setLastY(y);
}

function afficheInformation(){
	var div = document.getElementById('test');
	div.innerHTML = "screen("+commande.getX()+","+commande.getY()+")\n"+commande.getButtonPressed()+"screen Last("+commande.getLastX()+","+commande.getY()+")";
}

function gommer(){
	effaceRectangle(commande.getX(),commande.getY(),taille,taille);
}

function click(e) {
	if (e.buttons === 1) {
		commande.setButtonPressed(true);
	} else {
		commande.setButtonPressed(false);
	}
	if (commande.getButtonPressed()) {
		switch(mode) {
			case "gommer": {
					gommer();
			}
			break;
			case "rectangle": {
				effaceCurseur();
				commande.setAncreX(commande.getX());
				commande.setAncreY(commande.getY());
			}
			break;
			case "tracer":{
				var dessin = document.getElementById('dessin');
				var cvsDessin = dessin.getContext('2d');
				cvsDessin.beginPath();
				cvsDessin.lineWidth = '1';
				cvsDessin.fillStyle = 'RGBa(255,255,255,1)';
				cvsDessin.arc(commande.getX(), commande.getY(), taille / 2, 0, 2 * Math.PI);
				cvsDessin.fill();
			}
			break;
			case "ligne":{
				commande.setAncreX(commande.getX());
				commande.setAncreY(commande.getY());
			}
			break;
			default :
			break;
		}
	}
	afficheInformation();
}

function release(e){
	if(commande.getButtonPressed()) {
		switch (mode) {
			case "rectangle": {
				var longueur = commande.getX() - commande.getAncreX();
				var largeur = commande.getY() - commande.getAncreY();
				afficheRectangle(commande.getAncreX(), commande.getAncreY(), longueur, largeur);
			}
				break;
				case "ligne":{
					var dessin = document.getElementById('dessin');
					var cvsDessin = dessin.getContext('2d');
					cvsDessin.beginPath();
					cvsDessin.strokeStyle = 'RGBa(255,255,255,1)';
					cvsDessin.lineWidth = taille;
					cvsDessin.moveTo(commande.getAncreX(),commande.getAncreY());
					cvsDessin.lineTo(commande.getX(),commande.getY());
					cvsDessin.stroke();
			}
			break;
		}
	}
	commande.setButtonPressed(false);
	afficheInformation();
}

function afficheRectangle(x,y,xd,yd){
	var dessin = document.getElementById('dessin');
	var cvsDessin = dessin.getContext('2d');
	cvsDessin.fillStyle = 'RGB(255,255,255)';
	cvsDessin.fillRect(x, y, xd, yd);
}

function effaceRectangle(x,y,xc,yc){
	var dessin = document.getElementById('dessin');
	var cvsDessin = dessin.getContext('2d');
	cvsDessin.clearRect(x,y,xc,yc);
}



document.addEventListener("DOMContentLoaded",function(e){
	var overlay = document.getElementById('overlay');
	overlay.addEventListener('mouseover',afficheCurseur);
	overlay.addEventListener('mouseout',sortieCanvas);
	overlay.addEventListener('mousemove',getCoord);
	overlay.addEventListener('mouseup',release);
	overlay.addEventListener('mousedown',click);
	document.getElementById('save').addEventListener('click',save);
});

function save() {
	if (localStorage) {
		var nomImage = "";
		var msgErreur = "";
		var dejaSave = false;
		var nbModeleDansLocalStorage = localStorage.length;
		do {
			if (dejaSave) {
				nomImage = prompt(msgErreur);
			} else {
				nomImage = prompt("Donnez un nom à l'image");
			}
			if (nomImage === null) {
				return;
			}
			dejaSave = false;
			for(var noms in localStorage){
				if (nomImage === noms.toString()) {
					msgErreur = "Ce nom de table est déjà sauvegardé, saisir un nom différent : ";
					dejaSave = true;
					break;
				}
			}
			if (nomImage === "") {
				msgErreur = "Le nom du modèle ne peut pas être vide.";
				dejaSave= true;
			}
			var regex2Blanc = /\s/;
			if (nomImage.match(regex2Blanc)) {
				msgErreur = "Le nom du modèle ne peut pas être composé d'espaces ou saut de ligne.";
				dejaSave = true;
			}
		}while(dejaSave === true);
		
		var canvas = document.getElementById('dessin');
		canvas.width = 500;
		canvas.height = 500;
		
		var ctx = canvas.getContext("2d");
		ctx.drawImage(canvas,0,0);
		
		var dataURL = canvas.toDataURL("image/png");
		
		var Emplacement = document.getElementById('dessin');
		var dataImage = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
		localStorage.setItem(nomImage, dataImage);
	} else {
		alert("Sorry, your browser does not support Web Storage...");
	}
}



document.addEventListener("DOMContentLoaded",function(e){
	var overlay = document.getElementById('overlay');
	overlay.addEventListener('mouseover',afficheCurseur);
	overlay.addEventListener('mouseout',sortieCanvas);
	overlay.addEventListener('mousemove',getCoord);
	overlay.addEventListener('mouseup',release);
	overlay.addEventListener('mousedown',click);
	document.getElementById('open').addEventListener('click',open);
});

function open(){
	console.log("testopen");
	var dataImage = localStorage.getItem('imgData');
	var Emplacement = document.getElementById('dessin');
	Emplacement.src = "data:image/png;base64,"+dataImage;
}

































