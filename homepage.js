var firebaseConfig = { //firebase cdn code
    apiKey: "AIzaSyDLEco45i2BszWHJb67eAc7qx8OZ-d9vC8",
    authDomain: "iot-webapplication-47.firebaseapp.com",
    databaseURL: "https://iot-webapplication-47.firebaseio.com",
    projectId: "iot-webapplication-47",
    storageBucket: "iot-webapplication-47.appspot.com",
    messagingSenderId: "639567912933",
    appId: "1:639567912933:web:e8140919d9641904e2590c"
};
firebase.initializeApp(firebaseConfig);






$(document).ready(function() {
    var database = firebase.database();
    var fullStringData;
    var str1 = "default";
    var str2 = "off";
    var from = 0;
    var i;
    var valueSound;
    var variable = [];
    var tempHumidity, tempTime, tempTemperature, tempSound, tempAirPressure;
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var temp_var = 0

    var oldTime = "sd";

    database.ref('Variable').on("value", function(snap) { //here change it to destination name in database
        fullStringData = snap.val().Value; //here change it to destination name in database

        var len = fullStringData.length;
        
        variable=[]
        from = 0;
            for (i = 0; i < fullStringData.length; i++) { //seperates the values from a single '$' seperated string
                if (fullStringData.charAt(i) == '$') {
                    str1 = fullStringData.substring(from, i);
                    from = i + 1;
                    variable.push(str1);
                }
            }
        
        sound = parseInt(fullStringData.substring(len - 7, len - 2));
        
            $(".date").text("DATE:  " + variable[0]);
            $(".day").text("DAY:  " + variable[1]);
            $(".time").text("TIME:  " + variable[2]);
            $(".tempOne").text("TEMPERATURE ONE:  " + variable[3] + " °C");
            $(".pressure").text("PRESSURE:  " + variable[4] + " Pa");
            $(".altitude").text("ALTITUDE:  " + variable[5] + " m");
            $(".humidity").text("HUMIDITY:  " + variable[6] + " %");
            $(".tempTwo").text("TEMPERATURE TWO:  " + variable[7] + " °C");
            $(".sound").text("SOUND:  " + variable[8]+" dB");
        

        //below code for thermometer animation
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        
        ctx.beginPath();
        ctx.rect(10, 0, 16, 220); //x coordinate, y coordinate, width, height
        //ctx.fillStyle = "white";
        ctx.fill();
        ctx.stroke();
        //ctx.strokeStyle = "black";
        
        
        ctx.font = "12px century gothic"; //text
        ctx.fillText(" 0", 30, 215);
        ctx.fillText(" 10", 30, 194.5);
        ctx.fillText(" 20", 30, 174);
        ctx.fillText(" 30", 30, 153.5);
        ctx.fillText(" 40", 30, 133);
        ctx.fillText(" 50", 30, 112.5);
        ctx.fillText(" 60", 30, 92);
        ctx.fillText(" 70", 30, 71.5);
        ctx.fillText(" 80", 30, 51);
        ctx.fillText(" 90", 30, 30.5);
        ctx.fillText("100", 30, 10);
        
        ctx.clearRect(225, 5, 50, 40);  //clear the sensor value from the canvas
        ctx.clearRect(180, 15, 50, 40);  //clear the sensor value from the canvas
        //ctx.clearRect(20, 20, 100, 50);
   
        
        
        ctx.font = "18px century gothic";
        var temperatureString="TEMPERATURE: "+parseInt(variable[3])+"°C";
        var humidityString="HUMIDITY: "+parseInt(variable[6])+"%";
        
        ctx.fillText(temperatureString, 100, 20);
        ctx.fontStyle="red";
        
        ctx.fillText(humidityString, 100, 50);

        ctx.beginPath(); //drawing the circle
        ctx.arc(18, 226, 14, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();

        var tempTemperature = map(parseInt(variable[3]), 100, 0, 0, 210);
        ctx.rect(15, 2 + tempTemperature, 6, 210 - tempTemperature); //x coordinate, y coordinate, width, height
        ctx.fillStyle = "red"; //300
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = "black";
        //above code for thermometer animation
        
        
        //below code for doughnut meter  
        clearArc(ctx,200,200,50);
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.arc(200, 200, 70, Math.PI, 0);   //x,y,r,sAngle,eAngle,counterclockwise
        ctx.lineWidth = 18;
        ctx.stroke();
        
        
        ctx.beginPath();
        ctx.strokeStyle = "#02eb8a";
        humiDoughnut=map(parseInt(variable[6]), 0, 100, 179, 0);
        ctx.arc(200, 200, 70, Math.PI, degreeToRadian(humiDoughnut),0);   //x,y,r,sAngle,eAngle,counterclockwise
        ctx.lineWidth = 12;     //at "eAngle" Math.PI is the lowest value and 0 is the highest
        ctx.stroke();
        
        ctx.strokeStyle="white";
        var centreText=ctx.measureText(parseInt(variable[6])+" %").width/2;
        ctx.fillStyle = "white";
        ctx.fillText(parseInt(variable[6])+" %", 200-centreText, 200);
        //above code for doughnut meter

    });
});


function map(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min; //max=480 min=0
}

function degreeToRadian(degree){
    return -degree*(Math.PI/180.0);
}
    
    
function clearArc(context, x, y, radius) {
  context.save();
  context.globalCompositeOperation = 'destination-out';
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fill();
  context.restore();
}    
    