#include <ESP8266WiFi.h>
#include <SoftwareSerial.h>
#include <FirebaseArduino.h>
#include <ArduinoJson.h>
#include <ESP8266HTTPClient.h>

// Set these to run example.
#define FIREBASE_HOST "iot-webapplication-47.firebaseio.com"
#define FIREBASE_AUTH "JLQ03kZO8ekFyVDwL6XNPxycMQDeEsEnEAWsHkxz"
#define WIFI_SSID "swn"
#define WIFI_PASSWORD "shaikhwifi123"

String arrayStr[15];
int flag = 0;
int prevTime = 66;
String myString;
int vr = A0; // variable resistor connected 
int sdata = 0; // The variable resistor value will be stored in sdata.

void setup() {
  // Debug console
  Serial.begin(9600);
  pinMode(vr, INPUT);
  pinMode(D8, OUTPUT);
  // connect to wifi.

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

  //Firebase.setString("Variable/Value","shaikh");
}

void loop() {

  //sdata = 120;
  //myString = String(sdata);    //sending data to firebase
  //Serial.println(myString); 
  //Firebase.setString("Variable/Value",myString);
  //Firebase.setString("Variable/AnotherValue","121");
  //String yourString="nothing";
  //yourString=Firebase.getString("Variable/AnotherValue");  //getting data from firebase 
  //Serial.println(yourString);

  String dataToSend[20];
  String tempTime, str1;
  digitalWrite(D8, HIGH);

  while (Serial.available()) {
    int arrayCounter = 0;
    String valueFromArduino = Serial.readStringUntil('\n');
    digitalWrite(D8, LOW);
    Firebase.setString("Variable/Value", valueFromArduino);
    //below here codes are modified
    int from = 0;
    for (int i = 0; i < valueFromArduino.length(); i++) { //seperates the values from a single '$' seperated string
      if (valueFromArduino.charAt(i) == '$') {
        str1 = valueFromArduino.substring(from, i);
        from = i + 1;
        arrayStr[arrayCounter++] = str1;
      }
    }
    str1 = arrayStr[2];  //has the time section from the whole string
    int counter = 0;
    int len = str1.length();
    String str2;
    for (int i = 0; i < len; i++) {  //extracts only second part from time data
      if (str1.charAt(i) == ':')
        counter++;
      if (counter == 2) {
        str2 = str1.substring(i + 1, len);
        //Serial.println(str2);
        break;
      }

    }
    int timeKeeper = str2.toInt();

    if (prevTime != str2.toInt())  //prevents duplication for a single second
      flag = 0;

    if (timeKeeper % 10 == 0 && flag == 0) {
      String temp=arrayStr[0] + "(" + arrayStr[2] + ")";
      Firebase.pushString("timeData", temp);  //pushes some data every 10 second
      Firebase.pushString("avgSoundData", arrayStr[9]);  //pushes some data every 10 second
      Firebase.pushString("maxSoundData", arrayStr[10]);  //pushes some data every 10 second
      Firebase.pushString("minSoundData", arrayStr[11]);  //pushes some data every 10 second
      prevTime = str2.toInt();
      flag = 1;
    }
    //above here codes are modified
  }

  /*while(Serial.available()) {  //original code block
  String valueFromArduino = Serial.readStringUntil('\n');
  Firebase.setString("Variable/Value",valueFromArduino);
  delay(1000);
  } */
}
