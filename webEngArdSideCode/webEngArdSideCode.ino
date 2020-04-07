
#include "RTClib.h"
#include <Wire.h>
#include <SPI.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BMP280.h>
#include <dht11.h>

#define DHT11PIN 10

dht11 DHT11;
Adafruit_BMP280 bme;
RTC_DS1307 rtc;
int last;
int flag;
String dataToSend="";

const int dc_offset = 520;          // DC Offset to be removed from incoming signal 
const int numberOfSamples = 64;    // Number of samples to read at a time
const float aref_voltage = 3.3;     // Reference voltage of the Arduino ADC
const float alpha = 0.95;           // smoothing value

int sample;           // individual reading
long signal;          
long averageReading;
long RMS;             // root mean squared calculation
unsigned long sumSound=0;
unsigned long avgSampler=0;
double maxSound=0;
double minSound=200;

float db;
long smoothedValue=0;

char daysOfTheWeek[7][12] = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};

void setup () {
  last=69;
  flag=0;
  while (!Serial); // for Leonardo/Micro/Zero

  Serial.begin(9600);
  if (! rtc.begin()) {
    Serial.println("Couldn't find RTC");
    while (1);
  }
    //rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
  if (! rtc.isrunning()) {
    Serial.println("RTC is NOT running!");
    // following line sets the RTC to the date & time this sketch was compiled
    rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
    // This line sets the RTC with an explicit date & time, for example to set
    // January 21, 2014 at 3am you would call:
    // rtc.adjust(DateTime(2014, 1, 21, 3, 0, 0));
  }
  
 // Serial.println(F("BMP280 test"));//sensor test
  
  if (!bme.begin()) {  
    Serial.println("Could not find a valid BMP280 sensor, check wiring!");
    while (1);
  }

  pinMode(2, INPUT_PULLUP);
}

void loop () {
    long sumOfSquares = 0;

    int state=digitalRead(2);
    if(state == 1){
      sensorValueCollector();
    }
    //sensorValueCollector();
    //sensorValueCollector();
    //DateTime now = rtc.now();//rtc code
    //int t=now.second();
    /*
    if(t%3 == 0 && flag == 0){
      Serial.println(dataToSend);
      flag=1;
      last=t+2;
      if(last == 62)
        last=2;
      if(last == 61)
        last=1;  
    } 
    if(t == last){
      flag=0;
    }  
    */
}

void sensorValueCollector(){
    dataToSend="";
    long sumOfSquares = 0;
    
    DateTime now = rtc.now();//rtc code
    dataToSend=dataToSend+now.day()+"/";
    dataToSend=dataToSend+now.month()+"/";
    dataToSend=dataToSend+now.year()+"$";
    
    dataToSend=dataToSend+daysOfTheWeek[now.dayOfTheWeek()]+"$";
    
    dataToSend=dataToSend+now.hour()+":";
    dataToSend=dataToSend+now.minute()+":";
    dataToSend=dataToSend+now.second()+"$";
    
    dataToSend=dataToSend+bme.readTemperature()+"$";
    
    dataToSend=dataToSend+bme.readPressure()+"$";

    dataToSend=dataToSend+bme.readAltitude(1011.25)+"$";
    
    int chk = DHT11.read(DHT11PIN); //dht11 code
    dataToSend=dataToSend+(float)DHT11.humidity+"$";
    
    dataToSend=dataToSend+(float)DHT11.temperature+"$";
    


   
    for (int i=0; i<numberOfSamples; i++){
    sample = analogRead(0);         // take a sample
    signal = (sample - dc_offset);  // subtract the dc offset to center the signal at 0
    signal *= signal;               // square the value to remove negative values
    sumOfSquares += signal;         // sum the values
  }
  
  // divide the sum of the squares to get the mean
  // and then take the square root of the mean
  RMS = (sumOfSquares / numberOfSamples);     
  
  // smoothing filter
  smoothedValue = (alpha * smoothedValue) + ((1-alpha) * RMS);
  
  // convert the RMS value back into a voltage and convert to db  
  db=20 * log10(smoothedValue * (5 / 1024.0)); 
  db=map(db,10,65,0,100);
  db=constrain(db, 0, 150);
  
  if(maxSound<db){
    maxSound=db; //default value 0
  }
  if(minSound>db){
    minSound=db; //default value 200
  }
  
  sumSound=sumSound+db;
  avgSampler++;
  
  dataToSend=dataToSend+db+"$";
    
    if(now.second()%10 == 0){
      double avgSound=(double)sumSound/avgSampler;
      dataToSend=dataToSend+avgSound;

      dataToSend=dataToSend+"$"+maxSound;
      dataToSend=dataToSend+"$"+minSound+"$";
      
      sumSound=0;  //resetting the values
      avgSampler=0;
      maxSound=0;
      minSound=200;
    }
    //Serial.println(dataToSend);
    if(digitalRead(2)){
      Serial.println(dataToSend);
    }
      
    //while(digitalRead(2)){
      
    //}
}
