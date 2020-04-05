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

            //gauge code goes here
            var opts = {
                angle: 0, // The span of the gauge arc
                lineWidth: 0.1, // The line thickness
                radiusScale: 0.89, // Relative radius
                pointer: {
                    length: 0.54, // // Relative to gauge radius
                    strokeWidth: 0.053, // The thickness
                    color: '#0da394' // Fill color
                },
                limitMax: false, // If false, max value increases automatically if value > maxValue
                limitMin: false, // If true, the min value of the gauge will be fixed
                colorStart: '#6FADCF', // Colors
                colorStop: '#65fc00', // just experiment with them
                strokeColor: '#2E5053', // to see which ones work best for you
                generateGradient: true,
                highDpiSupport: true, // High resolution support
                staticLabels: {
                    font: "12px sans-serif", // Specifies font
                    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], // Print labels at these values
                    color: "#48f542", // Optional: Label text color
                    fractionDigits: 0 // Optional: Numerical precision. 0=round off.
                },
                staticZones: [{
                        strokeStyle: "#00FF00",
                        min: 0,
                        max: 10
                    },
                    {
                        strokeStyle: "#0000FF",
                        min: 10,
                        max: 30
                    },
                    {
                        strokeStyle: "#00FFFF",
                        min: 30,
                        max: 50
                    },
                    {
                        strokeStyle: "#FFDD00",
                        min: 50,
                        max: 80
                    },
                    {
                        strokeStyle: "#FF0000",
                        min: 80,
                        max: 100
                    }
                ],

            };
            var target = document.getElementById('soundGauge'); // your canvas element
            var gauge = new Gauge(target).setOptions(opts); // create gauge
            gauge.maxValue = 100; // set max gauge value
            gauge.setMinValue(0); // Prefer setter over gauge.minValue = 0
            gauge.animationSpeed = 1; // set animation speed (32 is default value)
            gauge.set(tempHumidity); // set actual value
            //gauge code goes here
            
            
            //gauge code goes here
            var opts = {
                angle: 0, // The span of the gauge arc
                lineWidth: 0.1, // The line thickness
                radiusScale: 0.89, // Relative radius
                pointer: {
                    length: 0.54, // // Relative to gauge radius
                    strokeWidth: 0.053, // The thickness
                    color: '#0da394' // Fill color
                },
                limitMax: false, // If false, max value increases automatically if value > maxValue
                limitMin: false, // If true, the min value of the gauge will be fixed
                colorStart: '#6FADCF', // Colors
                colorStop: '#65fc00', // just experiment with them
                strokeColor: '#2E5053', // to see which ones work best for you
                generateGradient: true,
                highDpiSupport: true, // High resolution support
                staticLabels: {
                    font: "12px sans-serif", // Specifies font
                    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], // Print labels at these values
                    color: "#48f542", // Optional: Label text color
                    fractionDigits: 0 // Optional: Numerical precision. 0=round off.
                },
                staticZones: [{
                        strokeStyle: "#00FF00",
                        min: 0,
                        max: 10
                    },
                    {
                        strokeStyle: "#0000FF",
                        min: 10,
                        max: 30
                    },
                    {
                        strokeStyle: "#00FFFF",
                        min: 30,
                        max: 50
                    },
                    {
                        strokeStyle: "#FFDD00",
                        min: 50,
                        max: 80
                    },
                    {
                        strokeStyle: "#FF0000",
                        min: 80,
                        max: 100
                    }
                ],

            };
            var target = document.getElementById('humidityGauge'); // your canvas element
            var gauge = new Gauge(target).setOptions(opts); // create gauge
            gauge.maxValue = 100; // set max gauge value
            gauge.setMinValue(0); // Prefer setter over gauge.minValue = 0
            gauge.animationSpeed = 1; // set animation speed (32 is default value)
            gauge.set(tempSound); // set actual value
            //gauge code goes here
            
            
            //gauge code goes here
            var opts = {
                angle: 0, // The span of the gauge arc
                lineWidth: 0.1, // The line thickness
                radiusScale: 0.89, // Relative radius
                pointer: {
                    length: 0.54, // // Relative to gauge radius
                    strokeWidth: 0.053, // The thickness
                    color: '#0da394' // Fill color
                },
                limitMax: false, // If false, max value increases automatically if value > maxValue
                limitMin: false, // If true, the min value of the gauge will be fixed
                colorStart: '#6FADCF', // Colors
                colorStop: '#65fc00', // just experiment with them
                strokeColor: '#2E5053', // to see which ones work best for you
                generateGradient: true,
                highDpiSupport: true, // High resolution support
                staticLabels: {
                    font: "12px sans-serif", // Specifies font
                    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 110], // Print labels at these values
                    color: "#48f542", // Optional: Label text color
                    fractionDigits: 0 // Optional: Numerical precision. 0=round off.
                },
                staticZones: [{
                        strokeStyle: "#00FF00",
                        min: 0,
                        max: 10
                    },
                    {
                        strokeStyle: "#0000FF",
                        min: 10,
                        max: 30
                    },
                    {
                        strokeStyle: "#00FFFF",
                        min: 30,
                        max: 50
                    },
                    {
                        strokeStyle: "#FFDD00",
                        min: 50,
                        max: 80
                    },
                    {
                        strokeStyle: "#FF0000",
                        min: 80,
                        max: 110
                    }
                ],

            };
            var target = document.getElementById('pressureGauge'); // your canvas element
            var gauge = new Gauge(target).setOptions(opts); // create gauge
            gauge.maxValue = 110; // set max gauge value
            gauge.setMinValue(0); // Prefer setter over gauge.minValue = 0
            gauge.animationSpeed = 1; // set animation speed (32 is default value)
            gauge.set(tempAirPressure/1000); // set actual value
            //gauge code goes here
            
            
            //gauge code goes here
            var opts = {
                angle: 0, // The span of the gauge arc
                lineWidth: 0.1, // The line thickness
                radiusScale: 0.89, // Relative radius
                pointer: {
                    length: 0.54, // // Relative to gauge radius
                    strokeWidth: 0.053, // The thickness
                    color: '#0da394' // Fill color
                },
                limitMax: false, // If false, max value increases automatically if value > maxValue
                limitMin: false, // If true, the min value of the gauge will be fixed
                colorStart: '#6FADCF', // Colors
                colorStop: '#65fc00', // just experiment with them
                strokeColor: '#2E5053', // to see which ones work best for you
                generateGradient: true,
                highDpiSupport: true, // High resolution support
                staticLabels: {
                    font: "12px sans-serif", // Specifies font
                    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], // Print labels at these values
                    color: "#48f542", // Optional: Label text color
                    fractionDigits: 0 // Optional: Numerical precision. 0=round off.
                },
                staticZones: [{
                        strokeStyle: "#00FF00",
                        min: 0,
                        max: 10
                    },
                    {
                        strokeStyle: "#0000FF",
                        min: 10,
                        max: 30
                    },
                    {
                        strokeStyle: "#00FFFF",
                        min: 30,
                        max: 50
                    },
                    {
                        strokeStyle: "#FFDD00",
                        min: 50,
                        max: 80
                    },
                    {
                        strokeStyle: "#FF0000",
                        min: 80,
                        max: 100
                    }
                ],

            };
            var target = document.getElementById('temperatureGauge'); // your canvas element
            var gauge = new Gauge(target).setOptions(opts); // create gauge
            gauge.maxValue = 100; // set max gauge value
            gauge.setMinValue(0); // Prefer setter over gauge.minValue = 0
            gauge.animationSpeed = 1; // set animation speed (32 is default value)
            gauge.set(tempTemperature); // set actual value
            //gauge code goes here
        }

    });
});