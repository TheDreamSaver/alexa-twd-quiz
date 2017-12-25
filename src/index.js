"use strict";

var Alexa = require("alexa-sdk");
var APP_ID = "amzn1.ask.skill.0f1e7fba-e6ca-4a59-8adb-56bc3b1a7e05"

const twd = [
    {
        question: "Who said \"We are the walking dead\"?",
        answer: 'rick',
        death: "killed when your neck was snapped by shane"
    },
    {
        question: "What was the name of sasha's brother?",
        answer: 'tyrese',
        death: "killed by a zombified sasha"
    },
    {
        question: "Who out of the atlanta group gets on with the Governor?",
        answer: 'andrea',
        death: "executed by the governor"
    },
    {
        question: "What is the baby Lori gave birth to called?",
        answer: 'judith',
        death: "shot by rick grimes with a colt python"
    },
    {
        question: "Who is the voice on the radio in the tank in Season 1?",
        answer: 'glenn',
        death: "bludgeoned to death by negan"
    },
    {
        question: "Who shot Carl in the stomach?",
        answer: 'otis',
        death: "left to die as bait by shane"
    },
    {
        question: "What does Daryl name Judith?",
        answer: 'little ass kicker',
        death: "shot by daryl dixon with a crossbow"
    },
    {
        question: "Who killed and burned Karen and David in prison in season four?",
        answer: 'carol',
        death: "told to look at the flowers and shot by carol"
    },
    {
        question: "Who does the governor executes?",
        answer: 'hershel',
        death: "beheaded by the governor"
    },
    {
        question: "Who shoots Carl in the eye?",
        answer: 'ron',
        death: "mauled by zombified sam"
    },
    {
        question: "Who's the character that Tom Payne portrays?",
        answer: 'jesus',
        death: "kungfu kicked by Jesus"
    },
    {
        question: "What was Hershel's occupation before the zombie apocalypse?",
        answer: 'veterinarian',
        death: "shot by maggie without remorse"
    },
    {
        question: "Michonne saves whose life at the end of Season 2?",
        answer: 'andrea',
        death: "beheaded by michonne"
    },
    {
        question: "Who was the first person to call the zombies Walkers?",
        answer: 'morgan',
        death: "cleared by morgan"
    },
    {
        question: "What was Glenn's job before the outbreak?",
        answer: 'pizza delivery boy',
        death: "killed by t-dog"
    },
    {
        question: "In which US state do all the episodes take place?",
        answer: 'georgia',
        death: "killed by simon with a R.P.G."
    },
    {
        question: "What does Rick use to kill his first Walker?",
        answer: 'baseball bat',
        death: "killed by electrocution by eugene"
    },
    {
        question: "Whose boyfriend was Jimmy?",
        answer: 'beth',
        death: "abandoned to die by gabriel"
    },
    {
        question: "Who frees Daryl from The Sanctuary?",
        answer: 'sherry',
        death: "burned by negan"
    },
    {
        question: "What was Ezekiel's job before the outbreak?",
        answer: 'zookeeper',
        death: "cut in two halves by jerry"
    }
    
];

var i = 0;
var j = 0;
var handlers = {
   "quizIntent": function () {
       var mydecision = slotValue(this.event.request.intent.slots.decision);
       if(mydecision=='no'||mydecision=='nope'||mydecision=='naah'){
        this.response.speak("Well, pardon me young man, excuse the crap out of my godamn French, but did you just choose to not play the game!");
        this.emit(":responseReady");
       }
       
       if(i<=twd.length){
           var item = twd[i].question;
           if(i == 0){
                this.response.speak("Be attentive; just like negan, I won't repeat or give you a second chance. Say, The answer is, and the answer. Okay, Here you go; " + item).listen();
              this.emit(":responseReady");
           }
           else {
         this.response.speak(item).listen();
         this.emit(":responseReady");
           }
        }
   },
    
    "answerIntent": function () {  
          var myanswer = slotValue(this.event.request.intent.slots.answer);
           
          if(myanswer!=twd[i].answer){
              var x = twd[i].answer;
              var y = twd[i].death;
              var k = j;
              i=0; j=0;
              if(k==0){
                 this.response.speak("Wrong Answer. The correct answer is " + x + ". You were " + y + ". You perished in your first supply run itself without killing any of the cold and impolite.");
                 this.emit(':responseReady'); 
              }
              else if(k==1){
                 this.response.speak("Wrong Answer. The correct answer is " + x + ". You were " + y + ". You perished after " + k + " supply run and killed only a few walkers.");
                 this.emit(':responseReady'); 
              }
              else {
                  this.response.speak("Wrong Answer. The correct answer is " + x + ". You were " + y + ". You perished after " + k + " supply runs and killed a considerable number of walkers. If you enjoyed the game, please leave feedbacks and rate it on Amazon.");
                  this.emit(':responseReady');
              }
          }
          
          if(i==twd.length){
              i=0;
              j=0;
              this.response.speak("You survived the apocalypse and thrived to become the ultimate victor, getting them all right. If you enjoyed the game, please leave feedbacks and rate it on Amazon.");
              this.emit(':responseReady');
          }
          if(myanswer==twd[i].answer){
          i++;
          j++;
          this.response.speak("You survived supply run "+ j +". Say ready, when you are, for the next question!").listen();
          this.emit(':responseReady');
          }
          
    },
    'UnhandledIntent': function () {
        this.emit(':ask', 'I don\'t get it! Try saying Alexa, Open the walking dead quiz!', 'I don\'t get it! Try saying Alexa, Open the walking dead quiz!');
    },
   "LaunchRequest": function () {
    i=0; j=0;
    this.response.speak("Have you ever had to kill people because they had already killed your friends and were coming for you next? Have you ever done things that made you feel afraid of yourself afterward? Have you ever been covered in so much blood that you didn\'t know if it was yours or walkers\' or your friends\'?<break time='1000ms'/> Welcome to The Walking Dead Quiz. No one gets to clock out today. And hell, this is a quiz people are gonna talk about. So, would you like to go for a supply run of quiz?").listen("Ask for help if not sure what to do!"); 
    this.emit(":responseReady");
   },
    'AMAZON.HelpIntent': function () {
        this.response.speak('Welcome to The Walking Dead Quiz, where you have to answer some of the hardest Walking Dead Trivia in order to survive the apocalypse. Say, The answer is, and the answer. Say ready, when you are.').listen('Even Gabriel and Eugene do not clock out today! Say ready!');
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak('I may be the one walking away, but you\'re the one that\'s leaving. Goodbye!');
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak('I may be the one walking away, but you\'re the one that\'s leaving Goodbye!');
        this.emit(':responseReady');
    },

};

function slotValue(slot, useId){
    let value = slot.value;
    let resolution = (slot.resolutions && slot.resolutions.resolutionsPerAuthority && slot.resolutions.resolutionsPerAuthority.length > 0) ? slot.resolutions.resolutionsPerAuthority[0] : null;
    if(resolution && resolution.status.code == 'ER_SUCCESS_MATCH'){
        let resolutionValue = resolution.values[0].value;
        value = resolutionValue.id && useId ? resolutionValue.id : resolutionValue.name;
    }
    return value;
}


// This is the function that AWS Lambda calls every time Alexa uses your skill.
exports.handler = function(event, context, callback) {

// Set up the Alexa object
var alexa = Alexa.handler(event, context); 
alexa.appId = APP_ID;

// Register Handlers
alexa.registerHandlers(handlers); 

// Start our Alexa code
alexa.execute(); 
  
};
