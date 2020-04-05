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
    var variable = [];
    var tempHumidity, tempTime, tempTemperature, tempSound, tempAirPressure;

    var xAxisTime = [];

    var yAxisHumidity = [];
    var yAxisTemperature = [];
    var yAxisSound = [];
    var yAxisAirPressure = [];
    var yAxisAltitude = [];


    var oldTime = "sd";

    database.ref('Variable').on("value", function(snap) { //here change it to destination name in database
        fullStringData = snap.val().Value; //here change it to destination name in database
        //fullStringData has the main string of values
        async function slicer() {
            from = 0;
            for (i = 0; i < fullStringData.length; i++) { //seperates the values from a single '$' seperated string
                if (fullStringData.charAt(i) == '$') {
                    str1 = fullStringData.substring(from, i);
                    from = i + 1;
                    variable.push(str1);
                }
            }

          
            
           var slider=document.getElementById("soundRange");
           var output=document.getElementById("value");
           $(".sound").text("REALTIME SOUND: " + variable[8] + " dB ");    
           output.innerHTML=slider.value;
            
           slider.oninput=function(){
              output.innerHTML=this.value;    
            }
            
            if(variable[8]>=parseInt(slider.value))
               $(".alert").text("REMAIN SILENT!");
            else
                $(".alert").text("...");
            
            

            tempHumidity = variable[6]; //Humidity data is in variable indexed '6'
            tempTime = variable[2]; //time data
            tempTemperature = variable[3]; //temperature data
            tempAirPressure = variable[4]; //air pressure data
            tempSound = variable[8]; //sound data

            for (i = 1; i <= fullStringData.length; i++) { //empty the stack for new values
                variable.pop();
            }
        }


        if (oldTime != variable[2]) { //checks if new data is available
            func();
        }

        function func() {
            slicer();
            graph();
            
        }

        function graph() {
            //graph code goes here

            if (xAxisTime.length == 20) { //limits the graph size to 20 data entries
                xAxisTime.shift();

                yAxisHumidity.shift();
                yAxisTemperature.shift();
                yAxisAirPressure.shift();
                yAxisSound.shift();
            }
            xAxisTime.push(tempTime); //pushing data into the stack if there is new data avilable
            yAxisHumidity.push(tempHumidity);
            yAxisTemperature.push(tempTemperature);
            yAxisAirPressure.push(tempAirPressure);
            yAxisSound.push(tempSound);

            var ctx = document.getElementById('chartOfSound').getContext('2d');
            var myChart = new Chart(ctx, { //change should go here
                type: 'line',
                data: {
                    labels: xAxisTime, //x axis value
                    datasets: [{
                        label: 'SOUND SENSOR READINGS', //y axis value's label
                        data: yAxisSound, //y axis values [can be put an array]
                        backgroundColor: [
                            'rgba(7, 226, 3, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    animation: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
            //graph code goes here           
        }

    });
});