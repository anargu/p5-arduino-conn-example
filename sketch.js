var serial;

var polygonColor = 0;

function setup() {
    setupConnArduino();
    createCanvas(720, 400);
}

function setupConnArduino() {
    // Instantiate our SerialPort object
    serial = new p5.SerialPort();

    // Let's list the ports available
    var portlist = serial.list();

    // Assuming our Arduino is connected, let's open the connection to it
    // Change this to the name of your arduino's serial port
    serial.open("/dev/cu.usbserial-A50285BI");

    // Register some callbacks
    // When we connect to the underlying server
    serial.on('connected', serverConnected);
    // When we get a list of serial ports that are available
    serial.on('list', gotList);
    // When we some data from the serial port
    serial.on('data', gotData);
    // When or if we get an error
    serial.on('error', gotError);
}

// We are connected and ready to go
function serverConnected() {
    print("We are connected!");
}
// Got the list of ports
function gotList(thelist) {
    // theList is an array of their names
    for (var i = 0; i < thelist.length; i++) {
        // Display in the console
        console.log(i + " " + thelist[i]);
    }
}
// Ut oh, here is an error, let's log it
function gotError(theerror) {
    print(theerror);
}
  
// There is data available to work with from the serial port
function gotData() {
    var data = serial.readStringUntil("\r\n");
    // console.log('new data:', currentString);
    if (data === '0') {
        polygonColor = 0;
    } else if (data === '1') {
        polygonColor = 255;
    }
}



function draw() {
    // Polling method
    /*
    if (serial.available() > 0) {
        var data = serial.read();
        ellipse(50,50,data,data);
    }
    */
    background(102);

    push();
    fill(polygonColor);
    translate(width * 0.2, height * 0.5);
    rotate(frameCount / 200.0);
    polygon(0, 0, 82, 3);
    pop();
}


function polygon(x, y, radius, npoints) {
    let angle = TWO_PI / npoints;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius;
      let sy = y + sin(a) * radius;
      vertex(sx, sy);
    }
    endShape(CLOSE);
}

// function keyPressed() {
//     if (keyCode === LEFT_ARROW){
//         // digiValue.on();
//         const copyValue = digiValue.read();
//         console.log(copyValue);
//     } else if (keyCode === RIGHT_ARROW) {
//         // digiValue.off();
//     } else if (keyCode === UP_ARROW){
//         // digiValue.blink();
//         console.log('Hello, World!'); // <- here!
//     } else if (keyCode === DOWN_ARROW) {
//         // digiValue.noBlink();
//     }
// }