'use strict';
module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('veritasAlexaApp');
var VeritasDataHelper = require('./veritas_data_helper');
var open = require('open');
var currentIntent = {'name' : null,'step' : 0};

app.launch(function(req, res) {
  var prompt = 'Welcome to Veritas App';
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('afirmatives', {
  'utterances': ['{yes|sure} {|please}']
},
  function(req, res) {
    console.log(currentIntent);
    switch (currentIntent.name) {
      case "mydisease":
        if (currentIntent.step == 1) {
          res.say('Refer to the following link on your phone').shouldEndSession(true).send();
          open("http://qasecure.veritasgenetics.com/mygenome-reporting/#/dashboard");
          currentIntent.step = 0;
        }
        break;

      case "prevent":
        if (currentIntent.step == 1) {
          res.say('Refer to the following link on your phone').shouldEndSession(true).send();
          open("http://qasecure.veritasgenetics.com/mygenome-reporting/#/dashboard");
          currentIntent.step = 0;
        }
        break;

      case "cholesterol":
        if (currentIntent.step == 1) {
          res.say('I will need to do reasearch about restourants. For now make sure to eat a lot vegetables and fruits').shouldEndSession(false).send();
          currentIntent.step = 0;
        } else if (currentIntent.step == 2) {
          res.say('OK I will work on that').shouldEndSession(true).send();
          currentIntent.step = 0;
        }
        break;

      case "prostate":
        if (currentIntent.step == 1) {
          res.say('Veritas recommendation based on American Urological Association is that you have your PSA exam at least once a year. Would you like me to schedule you an appointment?').shouldEndSession(false).send();
          currentIntent.step++;
        } else if (currentIntent.step == 2) {
          res.say('OK I will work on that').shouldEndSession(true).send();
          currentIntent.step = 0;
        }
        break;
        
      case "arthritis":
        if (currentIntent.step == 1) {
          res.say('OK I have placed the order with Veritas, your kit will arrive on Monday.  Would you like me to remind you when the results are back from the lab?').shouldEndSession(false).send();
          currentIntent.step++;
        } else if (currentIntent.step == 2) {
          res.say('OK will do').shouldEndSession(true).send();
          currentIntent.step = 0;
        }
        break;

      case "daredevil":
        if (currentIntent.step == 1) {
          res.say('OK I will add it to your reading list').shouldEndSession(true).send();
          open("https://well.blogs.nytimes.com/2014/02/19/the-genetics-of-being-a-daredevil/");
          currentIntent.step = 0;
        } 
        break;

      case "mygenome":
        if (currentIntent.step == 1) {
          res.say('Scripps research published that recipients of stents may be at risk for sudden cardiac arrest if they have a mutation in CYP gene. You have this mutation and therefore should be notify your doctor to include it in your medical record. Would you like me to do that?').shouldEndSession(false).send();
          currentIntent.step++;
        } else if (currentIntent.step == 2) {
          res.say('OK I will do that. Would you like to to read the other finding').shouldEndSession(false).send();
          currentIntent.step++;
        } else if (currentIntent.step == 3) {
          res.say('Researchers reported finding the gray hair gene, IRF4. Individual with mutations in this gene are likely to have gray hair. Genes are not the only factor in 6,000 individuals they analyzed. You do not have this mutation. Would you like me to order you some “touch of gray product”').shouldEndSession(false).send();
          currentIntent.step++;
        } else if (currentIntent.step == 4) {
          res.say('Ok').shouldEndSession(true).send();
          currentIntent.step = 0;
        }
        break;
    }
  });


app.intent('negatives', {
  'utterances': ['{no} {|thanks|thank you}']
},
  function(req, res) {
    console.log(currentIntent);
    switch (currentIntent.name) {
      case "mydisease":
        if (currentIntent.step == 1) {
          res.say("Ok").shouldEndSession(true).send();
          currentIntent.step = 0;
        }
        break;

      case "prevent":
        if (currentIntent.step == 1) {
          res.say("Ok").shouldEndSession(true).send();
          currentIntent.step = 0;
        }
        break;

      case "cholesterol":
        if (currentIntent.step == 1) {
          res.say('Would you like me to schedule you a test to check your levels ?').shouldEndSession(false).send();
          currentIntent.step++;
        } else if (currentIntent.step == 2) {
          res.say('Ok').shouldEndSession(true).send();
          currentIntent.step = 0;
        }
        break;

      case "prostate":
        if (currentIntent.step == 1) {
          res.say('Ok').shouldEndSession(true).send();
          currentIntent.step = 0;
        } else if (currentIntent.step == 2) {
          res.say('Ok').shouldEndSession(true).send();
          currentIntent.step = 0;
        }
        break;

      case "arthritis":
        if (currentIntent.step == 1) {
          res.say('Ok').shouldEndSession(true).send();
          currentIntent.step = 0;
        } 
        break;

      case "daredevil":
        if (currentIntent.step == 1) {
          res.say('Ok').shouldEndSession(true).send();
          currentIntent.step = 0;
        } 
        break;

      case "mygenome":
        if (currentIntent.step == 1) {
          res.say('Ok').shouldEndSession(false).send();
          currentIntent.step = 0;
        } else if (currentIntent.step == 2) {
          res.say('Ok').shouldEndSession(false).send();
          currentIntent.step = 0;
        } else if (currentIntent.step == 3) {
          res.say('Ok').shouldEndSession(true).send();
          currentIntent.step = 0;
        } 
        break;
    }
  });

app.intent('diseases', {
  'utterances': ['{what} {diseases} {I am at risk} {|for|at}']
},
  function(req, res) {
    console.log(req,res);
      var veritasHelper = new VeritasDataHelper();
      veritasHelper.requestDiseasesList().then(function(){
        var prompt = 'Refer to the following link on your phone';
        res.say(prompt).shouldEndSession(true).send();
        open("http://qasecure.veritasgenetics.com/mygenome-reporting/#/dashboard");
      }).catch(function(){
        var prompt = 'Sorry can you repeat the question';
        res.say(prompt).shouldEndSession(true).send();
      });
      return false;
  });

app.intent('mydisease', {
   'slots': {
    'DISEASE': 'DISEASENAME'
   },
  'utterances': ['{am} {I} {at risk} {for|at} {-|DISEASE}']
},
  function(req, res) {
    currentIntent.name = req.data.request.intent.name;
    currentIntent.step = 0;
    var disease = req.slot('DISEASE');
    var veritasHelper = new VeritasDataHelper();
      veritasHelper.requestDiseaseByName().then(function(response){
        var results = response;
        for (var i = results.length - 1; i >= 0; i--) {
          if ( results[i].disease_name.toUpperCase() == disease.toUpperCase() ) {
            res.say("You have potential risk of " + disease + ". Would you like to learn more").shouldEndSession(false).send();
            currentIntent.step++;
            return;
          } 
        }
        res.say("You are at low risk for " + disease).shouldEndSession(true).send();
      }).catch(function(error){
        var prompt = 'Sorry can you repeat the question';
        res.say(prompt).shouldEndSession(true).send();
      });
      return false;
  }
);

app.intent('prevent', {
   'slots': {
    'DISEASE': 'DISEASENAME'
   },
  'utterances': ['{what I can do to proactively prevent or treat|how can I proactively prevent or treat} {-|DISEASE}']
},
  function(req, res) {
    currentIntent.name = req.data.request.intent.name;
    currentIntent.step = 0;
    var disease = req.slot('DISEASE');
    var veritasHelper = new VeritasDataHelper();
      veritasHelper.requestDiseasesList().then(function(response){
        var results = response;
        for (var i = results.length - 1; i >= 0; i--) {
          console.log(results[i].node_title, disease,results[i].description !== null);
          if ( results[i].node_title.toUpperCase() == disease.toUpperCase() && results[i].description !== null ) {
            res.say(results[i].description + " Would you like to learn more?").shouldEndSession(false).send();
            currentIntent.step++;
            return;
          } 
        }
        res.say("I do not have any information about " + disease).shouldEndSession(true).send();
      }).catch(function(error){
        var prompt = 'Sorry can you repeat the question';
        res.say(prompt).shouldEndSession(true).send();
      });
      return false;
  }
);

/*app.intent('information', {
   'slots': {
    'DISEASE': 'DISEASENAME'
   },
  'utterances': ['{for more information on the} {-|DISEASE}']
},
  function(req, res) {
    currentIntent.name = req.data.request.intent.name;
    currentIntent.step = 0;
    var disease = req.slot('DISEASE');
    var veritasHelper = new VeritasDataHelper();
      veritasHelper.requestDiseasesList().then(function(response){
        var results = response;
        console.log(results);
        for (var i = results.length - 1; i >= 0; i--) {
          if ( results[i].disease_name == disease ) {
            res.say("This are more information about {{disease}}, would you like to learn more").shouldEndSession(false).send();
            currentIntent.step++;
            return;
          } 
        }
        res.say("I do not have any information about {{disease}}").shouldEndSession(false).send();
      }).catch(function(error){
        var prompt = 'Sorry can you repeat the question';
        res.say(prompt).shouldEndSession(false).send();
      });
      return false;
  }
);*/

app.intent('tylanol', {
  'utterances': ['{am I allergic to Tylenol}']
},
  function(req, res) {
    currentIntent.name = req.data.request.intent.name;
    res.say("Based on your Veritas myGenome you are a fast metabolizer of Tylenol which means you should not take high doses. You should consult a doctor about specifics.").shouldEndSession(true).send();
  }
);

app.intent('cholesterol', {
  'utterances': ['{how is my cholesterol}']
},
  function(req, res) {
    currentIntent.name = req.data.request.intent.name;
    currentIntent.step = 0;
    res.say("Your last cholesterol levels were slightly above normal range. You should also know that you have a genetic variant in your genome that pre disposes you to high cholesterol. Would you like me to recommend a restaurant for lunch with good food options that can help you lower your cholesterol ?").shouldEndSession(false).send();
    currentIntent.step++;
  }
);

app.intent('smartest', {
  'utterances': ['{who is the smartest man in the world|who is the smartest man alive}']
},
  function(req, res) {
    currentIntent.name = req.data.request.intent.name;
    res.say("Maybe Dr.George Church but Dr.Topol is in the top 10").shouldEndSession(true).send();
  }
);

app.intent('best', {
  'utterances': ['{who is the best genetics company in the world}']
},
  function(req, res) {
    currentIntent.name = req.data.request.intent.name;
    res.say("Veritas Genetics of course.").shouldEndSession(true).send();
  }
);

app.intent('prostate', {
  'utterances': ['{what is my risk of developing prostate cancer}']
},
  function(req, res) {
    currentIntent.name = req.data.request.intent.name;
    currentIntent.step = 0;
    res.say("Based on your Veritas myGenome you have an above average risk of developing prostate cancer based on your family history and mutations in your RNASEL gene. Would you like me to read you recommendations from Veritas how to manage the risk?").shouldEndSession(false).send();
    currentIntent.step++;
  }
);

app.intent('arthritis', {
  'utterances': ['{what is my risk of developing rheumatoid arthritis}']
},
  function(req, res) {
    currentIntent.name = req.data.request.intent.name;
    currentIntent.step = 0;
    res.say("Based on your Veritas myGenome analysis you have a high risk of developing rheumatoid arthritis in later year of your life, after 40. Veritas recommended you test your blood markers for inflammation at least once a year. Your last test was 6 months a go and it was in normal range. Would you like me to order you another test?").shouldEndSession(false).send();
    currentIntent.step++;
  }
);

app.intent('daredevil', {
  'utterances': ['{I read an article about genetics of being a daredevil, do I have those genes|do I have daredevil genes}']
},
  function(req, res) {
    currentIntent.name = req.data.request.intent.name;
    currentIntent.step = 0;
    res.say("It seems that you have a mutation in your DDR4 gene which affect the brain’s levels of or response to the neurotransmitter dopamine, a substance that is known to influence feelings of pleasure, reward and gratification, sometimes associated with being a risk taker. I can pull up the reference articles Veritas has for this genetic condition.").shouldEndSession(false).send();
    currentIntent.step++;
  }
);

app.intent('mygenome', {
  'utterances': ['{anything new in my genome}']
},
  function(req, res) {
    currentIntent.name = req.data.request.intent.name;
    currentIntent.step = 0;
    res.say("There are five new findings based on most recent publications. Would you like me to read the to you?").shouldEndSession(false).send();
    currentIntent.step++;
  }
);

//hack to support custom utterances in utterance expansion string
var utterancesMethod = app.utterances;
app.utterances = function() {
return utterancesMethod().replace(/\{\-\|/g, '{');
};

module.exports = app;
