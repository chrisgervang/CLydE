/*
 Dim_PSSR_ZC_Tail
 
 This sketch is a sample sketch using the ZeroCross Tail(ZCT)to generate a sync
 pulse to drive a PowerSSR Tail(PSSRT) for dimming ac lights.
 
 Connections to an Arduino Duemilanove:
 1. Connect the C terminal of the ZeroCross Tail to digital pin 2 with a 10K ohm pull up to Arduino 5V.
 2. Connect the E terminal of the ZeroCross Tail to Arduino Gnd.
 3. Connect the PowerSSR Tail +in terminal to digital pin 4 and the -in terminal to Gnd.
 
 
*/

#include <TimerOne.h>                    

volatile int i=0;               // Variable to use as a counter
volatile boolean zero_cross=0;  // Boolean to store a "switch" to tell us if we have crossed zero
int PSSR1 = 4;                  // PowerSSR Tail connected to digital pin 4

int dim = 32;                   // Default dimming level (0-128)  0 = on, 128 = off
int freqStep = 59;              // Set to 60hz mains

int LED = 13;                    // LED on Arduino board on digital pin 13
int Switch= 11;

int analogPin = 5;

void setup()
{
 pinMode(Switch, OUTPUT);
 pinMode(LED, OUTPUT);
 pinMode(4, OUTPUT);                // Set SSR1 pin as output
 attachInterrupt(0, zero_cross_detect, RISING);   // Attach an Interupt to digital pin 2 (interupt 0),
 Timer1.initialize(freqStep);
 Timer1.attachInterrupt(dim_check,freqStep);
 Serial.begin(9600);
}

/*
What works:
a. loop range
b. 1st delay
c. lower limit(hight number)
d. delay before off to on

1.
  a. <125 to >25
  b. 40
  c. 124
  d. 5
2.
  a. same except:
  b. 80
  
3. 
  a. <123 to >25
  b. 10
  c. 124
  d. 5 or whatever
4. 
  a. <123 to >25
  b. 4 (max strobe)
  c. 124
  d. NA
5.
  b. 200 (still looks smooth)
  
6. 
  b. 500 (looks smooth form ceiling, from lights it starts to be notciable. 
7.
*/
void loop()                        // Main loop
{
dim = floor(analogRead(analogPin)/8.25);
delay(20);
Serial.println(analogRead(analogPin));
//Serial.println("PEEP");
//for(int i = 123; i>25; i--) {
// dim = i;
// delay(40);
//}
//for(int i = 25; i<123; i++) {
// dim = i;
// delay(40);
//}
//delay(0);
//Serial.println("POOP");
//
////dim = 27;
}

// Functions

void dim_check() {                  // This function will fire the triac at the proper time
 if(dim >= 124) {
  digitalWrite(Switch, LOW);
} else {
  digitalWrite(Switch, HIGH);
   if(zero_cross == 1) {              // First check to make sure the zero-cross has happened else do nothing
     if(i>=dim) {
      delayMicroseconds(100);        //These values will fire the PSSR Tail.
      digitalWrite(PSSR1, HIGH);
      //digitalWrite(LED, HIGH);
      delayMicroseconds(50);
      digitalWrite(PSSR1, LOW);
      //digitalWrite(LED, LOW);
       i = 0;                         // Reset the accumulator
       zero_cross = 0;                // Reset the zero_cross so it may be turned on again at the next zero_cross_detect    
     } else {
       i++;                           // If the dimming value has not been reached, increment the counter
     }                                // End dim check
   } // End zero_cross check
  }
}

void zero_cross_detect() 
{
   zero_cross = 1;
   // set the boolean to true to tell our dimming function that a zero cross has occured
} 
