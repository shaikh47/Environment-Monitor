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
var values=[];
var maxValues=[];
var minValues=[];
var avgValues=[];
var variable=[];
var timeValues=[];
var from;
var counter=0;


$(document).ready(function() {
    var database = firebase.database();
    
var rootRef=firebase.database().ref().child("timeData");
    rootRef.on("child_added", snap => {
        var childData = snap.val();
        //console.log(name);
        timeValues.push(childData);
        //$(".max").text("max: " + maxValues);
    });  

var rootRef=firebase.database().ref().child("maxSoundData");
    rootRef.on("child_added", snap => {
        var childData = snap.val();
        //console.log(name);
        maxValues.push(childData);
        //$(".max").text("max: " + maxValues);
    });  
    
var rootRef=firebase.database().ref().child("minSoundData");
    rootRef.on("child_added", snap => {
        var childData = snap.val();
        //console.log(name);
        minValues.push(childData);
       // $(".min").text("min: " + minValues);
        
    });  
var rootRef=firebase.database().ref().child("avgSoundData");
    rootRef.on("child_added", snap => {
        var childData = snap.val();
        //console.log(name);
        avgValues.push(childData);
        //$(".avg").text("avg: " + avgValues);
        
        var ctx = document.getElementById('foo').getContext('2d');
            var myChart = new Chart(ctx, { //change should go here
                type: 'line',
                data: {
                    labels: timeValues, //x axis value
                    datasets: [{
                        label: 'min values', //y axis value's label
                        data: minValues, //y axis values [can be put an array]
                        backgroundColor: [
                            'rgba(251, 251, 23, 0.2)',   //color of min curve
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
                    },
                        {
                           label: 'max values', //y axis value's label
                        data: maxValues, //y axis values [can be put an array]
                        backgroundColor: [
                            'rgba(251, 251, 23, 0.2)',   //color of max curve
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
                        },
                        {
                           label: 'avg values', //y axis value's label
                        data: avgValues, //y axis values [can be put an array]
                        backgroundColor: [
                            'rgba(251, 251, 23, 0.2)',    //color of avg curve
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
                        }       
                              ]
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
        
    }); 
});

 

