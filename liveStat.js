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

            //$(".fullString").text("FullString: " + fullStringData); //print all the values seperately in headers
            $(".date").text("DATE: " + variable[0]);
            $(".day").text("DAY: " + variable[1]);
            $(".time").text("TIME: " + variable[2]);
            $(".tempOne").text("TEMPERATURE ONE: " + variable[3] + " °C");
            $(".pressure").text("PRESSURE: " + variable[4] + " Pa");
            $(".altitude").text("ALTITUDE: " + variable[5] + " m");
            $(".humidity").text("HUMIDITY: " + variable[6] + " %");
            $(".tempTwo").text("TEMPERATURE TWO: " + variable[7] + " °C");
            $(".sound").text("SOUND" + variable[8]);
            
            

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

            var ctx = document.getElementById('chartOfHumidity').getContext('2d');
            var myChart = new Chart(ctx, { //change should go here
                type: 'line',
                data: {
                    labels: xAxisTime, //x axis value
                    datasets: [{
                        label: 'HUMIDITY SENSOR READINGS', //y axis value's label
                        data: yAxisHumidity, //y axis values [can be put an array]
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


            //graph code goes here  

            var ctx = document.getElementById('chartOfSound').getContext('2d');
            var myChart = new Chart(ctx, { //change should go here
                type: 'line',
                data: {
                    labels: xAxisTime, //x axis value
                    datasets: [{
                        label: 'SOUND SENSOR READINGS', //y axis value's label
                        data: yAxisSound, //y axis values [can be put an array]
                        backgroundColor: [
                            'rgba(251, 251, 23, 0.2)',
                            'rgba(255, 99, 132, 0.2)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 162, 235, 1)',
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


            //graph code goes here  

            var ctx = document.getElementById('chartOfAirPressure').getContext('2d');
            var myChart = new Chart(ctx, { //change should go here
                type: 'line',
                data: {
                    labels: xAxisTime, //x axis value
                    datasets: [{
                        label: 'AIR PRESSURE SENSOR READINGS', //y axis value's label
                        data: yAxisAirPressure, //y axis values [can be put an array]
                        backgroundColor: [
                            'rgba(251, 251, 23, 0.2)',
                            'rgba(255, 99, 132, 0.2)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 162, 235, 1)',
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


            //graph code goes here  

            var ctx = document.getElementById('chartOfTemperature').getContext('2d');
            var myChart = new Chart(ctx, { //change should go here
                type: 'line',
                data: {
                    labels: xAxisTime, //x axis value
                    datasets: [{
                        label: 'TEMPERATURE SENSOR READINGS', //y axis value's label
                        data: yAxisTemperature, //y axis values [can be put an array]
                        backgroundColor: [
                            'rgba(251, 251, 23, 0.2)',
                            'rgba(255, 99, 132, 0.2)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 162, 235, 1)',
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
            
            
            //gauge code
            var data = [
              {
                type: "indicator",
                mode: "gauge+number",
                value: tempSound, // main data
                title: { text: "SOUND(dB)", font: { size: 24 } },
                //delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
                gauge: {
                  axis: { range: [null, 100], tickwidth: 3, tickcolor: "#34eb4f" },
                  bar: { color: "#212b2a" },
                  bgcolor: "white",
                  borderwidth: 3,
                  bordercolor: "#00ffd9",  //gauge border
                  steps: [
                    { range: [0, 20], color: "#00ff5c" },
                    { range: [20, 40], color: "#00de50" },
                    { range: [40, 60], color: "#02cc4b" },
                    { range: [60, 80], color: "#00b341" },
                    { range: [80, 100], color: "#0e8238" }  
                    
                  ],
                  threshold: {
                    line: { color: "red", width: 4 },
                    thickness: 0.75,
                    value: 80
                  }
                }
              }
            ];
        
           var layout = {
              width: 600,
              height: 250,
              margin: { t: 60, r: 25, l: 25, b: 25 },
              paper_bgcolor: "#252b33",
              font: { color: "cyan", family: "Arial" } //font design
            };

            Plotly.newPlot('soundGauge', data, layout);  
           //gauge code
            
            
            //gauge code
            var data = [
              {
                type: "indicator",
                mode: "gauge+number",
                value: tempTemperature, // main data
                title: { text: "TEMPERATURE(°C)", font: { size: 24 } },
                //delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
                gauge: {
                  axis: { range: [null, 100], tickwidth: 3, tickcolor: "#34eb4f" },
                  bar: { color: "darkblue" },
                  bgcolor: "white",
                  borderwidth: 2,
                  bordercolor: "#34eb4f",  //gauge border
                  steps: [
                    { range: [0, 20], color: "#00ff5c" },
                    { range: [20, 40], color: "#00de50" },
                    { range: [40, 60], color: "#02cc4b" },
                    { range: [60, 80], color: "#00b341" },
                    { range: [80, 100], color: "#0e8238" }
                    
                  ],
                  threshold: {
                    line: { color: "red", width: 4 },
                    thickness: 0.75,
                    value: 100
                  }
                }
              }
            ];
        
           var layout = {
              width: 600,
              height: 250,
              margin: { t: 60, r: 25, l: 25, b: 25 },
              paper_bgcolor: "#252b33",
              font: { color: "cyan", family: "Arial" } //font design
            };

            Plotly.newPlot('tempGauge', data, layout);  
           //gauge code
            
            
            
            //gauge code
            var data = [
              {
                type: "indicator",
                mode: "gauge+number",
                value: tempHumidity, // main data
                title: { text: "HUMIDITY(%)", font: { size: 24 } },
                //delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
                gauge: {
                  axis: { range: [null, 100], tickwidth: 3, tickcolor: "#34eb4f" },
                  bar: { color: "darkblue" },
                  bgcolor: "white",
                  borderwidth: 2,
                  bordercolor: "#34eb4f",  //gauge border
                  steps: [
                    { range: [0, 20], color: "#00ff5c" },
                    { range: [20, 40], color: "#00de50" },
                    { range: [40, 60], color: "#02cc4b" },
                    { range: [60, 80], color: "#00b341" },
                    { range: [80, 100], color: "#0e8238" }
                    
                  ],
                  threshold: {
                    line: { color: "red", width: 4 },
                    thickness: 0.75,
                    value: 100
                  }
                }
              }
            ];
        
           var layout = {
              width: 600,
              height: 250,
              margin: { t: 60, r: 25, l: 25, b: 25 },
              paper_bgcolor: "#252b33",
              font: { color: "cyan", family: "Arial" } //font design
            };

            Plotly.newPlot('humGauge', data, layout);  
           //gauge code
            
            
            
            //gauge code
            var data = [
              {
                type: "indicator",
                mode: "gauge+number",
                value: tempAirPressure/100.0, // main data
                title: { text: "AIR PRESSURE(hPa)", font: { size: 24 } },
                //delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
                gauge: {
                  axis: { range: [950, 1100], tickwidth: 3, tickcolor: "#34eb4f" },
                  bar: { color: "darkblue" },
                  bgcolor: "white",
                  borderwidth: 2,
                  bordercolor: "#34eb4f",  //gauge border
                  steps: [
                    { range: [0, 980], color: "#00ff5c" },
                    { range: [980, 1000], color: "#00de50" },
                    { range: [1000, 1020], color: "#02cc4b" },
                    { range: [1020, 1040], color: "#00b341" },
                    { range: [1040, 1100], color: "#0e8238" }
                    
                  ],
                  threshold: {
                    line: { color: "red", width: 4 },
                    thickness: 0.75,
                    value: 100
                  }
                }
              }
            ];
        
           var layout = {
              width: 600,
              height: 250,
              margin: { t: 60, r: 25, l: 25, b: 25 },
              paper_bgcolor: "#252b33",
              font: { color: "cyan", family: "Arial" } //font design
            };

            Plotly.newPlot('airGauge', data, layout);  
           //gauge code

        }

    });
});
