# IOT based Environment Monitoring System
IOT based web project to monitor various environment data. The project consists of a hardware and a software part. Hardware part contains a bunch of sensors to monitor the environment, an arduino microcontroller has been used to process the sensor datas. And a nodeMCU acts as a network device to upload the information to the Firebase database. The software part has an IOT website, with which the information is represented both textually and graphically.

## Features
1. Live  Data Monitoring 
2. Easy track of sound pollution as, the Average, Minimum and Maximum sound data is recorded and stored. 
3. Virtual traffic light implemented, which turns red if people keep honking deliberately. This way sound pollution induced by vehicle horn can be reduced.
4. Live alert implemented, which can be used in classrooms or libraries. Basically an error can be generated if the sound reaches a particular threshold.
5. Temperature, Humidity, Air-Pressure can be monitored in real time.


#### Webpage: https://shaikh47.github.io/Environment-Monitor/
#### Video Demo: https://drive.google.com/file/d/1-hi5is2ZShqndMYyRtSFng3Wv95ed1cH/view?usp=sharing

## Hardware

![alt text](https://github.com/shaikh47/Environment-Monitor/blob/master/screenshot/hardware.jpg)


## Demo of the Webpage

Homepage of the IOT website. Sensor datas are displayed in text form, and Temperature, Humidity data also displayed graphically.

![alt text](https://github.com/shaikh47/Environment-Monitor/blob/master/screenshot/home%20page.PNG)


Live Data Monitoring using realtime line chart

![alt text](https://github.com/shaikh47/Environment-Monitor/blob/master/screenshot/live%20stat.PNG)

Live data monitoring using realtime Gauge

![alt text](https://github.com/shaikh47/Environment-Monitor/blob/master/screenshot/live%20stat%20gauge.PNG)

Average, Minimum and Maximum recorded Sound Data

![alt text](https://github.com/shaikh47/Environment-Monitor/blob/master/screenshot/dailystats.PNG)

Traffic Light Simulation Page

![alt text](https://github.com/shaikh47/Environment-Monitor/blob/master/screenshot/traffic.PNG)

Alert Page

![alt text](https://github.com/shaikh47/Environment-Monitor/blob/master/screenshot/alert.PNG)
