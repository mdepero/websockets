
var url = "ws://server.mattdepero.com:8000/"

var incomingData = "";
var userType = "";
function setGameUser(){
	userType = "game";
}
function setControllerUser(){
	userType = "controller";
}

  function init()
  {
	// document.myform.url.value = "ws://localhost:8000/"
	// document.myform.inputtext.value = "Hello World!"
	// document.myform.disconnectButton.disabled = true;
	started = true;
	doConnect();
  }

  function doConnect()
  {
    websocket = new WebSocket(url);
    websocket.onopen = function(evt) { onOpen(evt) };
    websocket.onclose = function(evt) { onClose(evt) };
    websocket.onmessage = function(evt) { onMessage(evt) };
    websocket.onerror = function(evt) { onError(evt) };

  }

  function onOpen(evt)
  {
 //    writeToScreen("connected\n");
	// document.myform.connectButton.disabled = true;
	// document.myform.disconnectButton.disabled = false;
	if(userType == "game"){
		startGame();
	}else{
		startSetter();
	}
	
  }

  function onClose(evt)
  {
 //    writeToScreen("disconnected\n");
	// document.myform.connectButton.disabled = false;
	// document.myform.disconnectButton.disabled = true;

  }

  function onMessage(evt)
  {
    // writeToScreen("response: " + evt.data + '\n');

    incomingData = evt.data;
  }

  function onError(evt)
  {
    //writeToScreen('error: ' + evt.data + '\n');

	websocket.close();

	// document.myform.connectButton.disabled = false;
	// document.myform.disconnectButton.disabled = true;

  }

  function doSend(message)
  {
    // writeToScreen("sent: " + message + '\n'); 
    websocket.send(message);
  }

  function writeConsol(message)
  {
    document.getElementById('consol').innerHTML = message;

  }


   function sendText() {
		doSend( document.myform.inputtext.value );
   }

  function clearText() {
		// document.myform.outputtext.value = "";
   }

   function doDisconnect() {
		websocket.close();
   }













// +----------------------------------------+
// |          Controller Methods            |
// +----------------------------------------+
var fps = 6;
var turnRadius = 40;//Bigger turn radius = wider turns

var ay=0;
var turnRadius = 1.0/turnRadius;
var started = false;

if (window.DeviceMotionEvent != undefined) {
	window.ondevicemotion = function(e) {


		ax = e.accelerationIncludingGravity.x;
		ay = e.accelerationIncludingGravity.y;

		if(!started){
			if(ax<4){
				writeConsol("Please turn your phone at least 180 degrees before starting! (into landscape mode)");
				document.getElementById('startButton').disabled = true;
			}else {
				writeConsol("Ready to start");
				document.getElementById('startButton').disabled = false;
			}
		}

		// az = e.accelerationIncludingGravity.z;
		if(ay == null && userType != "game"){
			doDisconnect();
			writeConsol("Sorry, your computer does not support the accelerometer.");
			document.getElementById('startButton').disabled = true;
		}

		// if ( e.rotationRate ) {
		// 	e.rotationRate.alpha;
		// 	b.rotationRate.beta;
		// 	e.rotationRate.gamma;
		// }		
	}
}

function runSetter(){
	getAndSendValues();
}

var data;
function getAndSendValues(){
	data = ay*turnRadius;
	writeConsol("Value Sent: "+data);
	doSend(data);
}

function startSetter(){
	window.setInterval(function () {runSetter();}, 1000/fps);
}











// +----------------------------------------+
// |              Game Methods              |
// +----------------------------------------+
var gfps = 24;

var numObjects = 0;


var gameArray = [];
function getData(){
	doSend("get");
	gameArray = incomingData.split("|");
}

function runGame(){
	getData();

	writeConsol(gameArray);


	draw();
}

function startGame(){
	window.setInterval(function () {runGame();}, 1000/gfps);
}

function draw(){

	$("#gameSpace").html("");


	for(var i = 0;i< gameArray.length;i++){

		gameObject = gameArray[i].split(",");

		$("#gameSpace").append('<div class="object" style="left:'+gameObject[0]+'vw;top:'+gameObject[1]+'vh;"></div>');

	}
}
