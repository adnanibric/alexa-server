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
  res.say(prompt).reprompt(prompt).shouldEndSession(true);
});

app.intent('afirmatives', {
  'utterances': ['{yes|sure} {|please}']
},
  function(req, res) {
    switch (currentIntent.name) {
      case "mydisease":
        if (currentIntent.step == 1) {
          res.say('Refer to the following link on your phone. Would you like to book you an appointment with a genetic counselor at Veritas?').shouldEndSession(false).send();
          res.card("" , "http://qasecure.veritasgenetics.com/mygenome-reporting/#/dashboard/");
          currentIntent.step++;
        } else if (currentIntent.step == 2) {
          res.say('Done').shouldEndSession(true).send();
          currentIntent.step = 0;
        }
        break;

      case "prevent":
        if (currentIntent.step == 1) {
          res.say('Refer to the link on your phone').shouldEndSession(true).send();
          res.card("" , "http://qasecure.veritasgenetics.com/mygenome-reporting/#/dashboard");
          currentIntent.step = 0;
        }
        break;

      case "cholesterol":
        if (currentIntent.step == 1) {
          res.say('I will need to do research about restaurants. For now make sure to eat a lot of fruits and vegetables').shouldEndSession(true).send();
          currentIntent.step = 0;
        } else if (currentIntent.step == 2) {
          res.say('I am on it').shouldEndSession(true).send();
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

      case "mygenome":
        if (currentIntent.step == 1) {
          res.say('Scripps research published that recipients of stents may be at risk for sudden cardiac arrest if they have a mutation in CYP gene. You have this mutation and therefore should notify your doctor to include it in your medical record. Would you like me to do that?').shouldEndSession(false).send();
          currentIntent.step++;
        } else if (currentIntent.step == 2) {
          res.say('OK I will do that. Would you like to to read the other finding').shouldEndSession(false).send();
          currentIntent.step++;
        } else if (currentIntent.step == 3) {
          res.say('Researchers reported finding that individuals with mutations in the IRF4 gene are likely to have gray hair. Genes are not the only factor in 6,000 individuals they analyzed. You have this mutation. Would you like me to order you some “touch of gray product”').shouldEndSession(false).send();
          currentIntent.step++;
        } else if (currentIntent.step == 4) {
          res.say('Ok').shouldEndSession(true).send();
          currentIntent.step = 0;
        }
        break;

          case "report":
        if (currentIntent.step == 1) {
          res.say('You need to talk to your Doctor about your elevated risk of hereditary hemochromatosis, fanconi anemia, and BRIP1 cancer susceptibility. Would you like me to book you an appointment?').shouldEndSession(false).send();
          currentIntent.step++;
        } else if (currentIntent.step == 2) {
          res.say('OK I am on it').shouldEndSession(true).send();
          currentIntent.step = 0;
        }
        break;

    }
  });


app.intent('negatives', {
  'utterances': ['{no} {|thanks|thank you}']
},
  function(req, res) {
    switch (currentIntent.name) {
      case "mydisease":
        if (currentIntent.step == 1) {
          res.say("Ok").shouldEndSession(true).send();
          currentIntent.step = 0;
        } else if (currentIntent.step == 2) {
          res.say('Ok').shouldEndSession(true).send();
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

      case "mygenome":
        if (currentIntent.step == 1) {
          res.say('Ok').shouldEndSession(true).send();
          currentIntent.step = 0;
        } else if (currentIntent.step == 2) {
          res.say('Ok').shouldEndSession(true).send();
          currentIntent.step = 0;
        } else if (currentIntent.step == 3) {
          res.say('Ok').shouldEndSession(true).send();
          currentIntent.step = 0;
        } 
        break;

      case "report":
        if (currentIntent.step == 1) {
          res.say('OK, I have sent you an email with the highlights of your results so you can look at them later.').shouldEndSession(true).send();
          currentIntent.step = 0;
        } else if (currentIntent.step == 2) {
          res.say('OK, I have sent you an email with more detailed information so you can look at it later.').shouldEndSession(true).send();
          currentIntent.step = 0; }
        break;
    }
  });

app.intent('mydisease', {
   'slots': {
    'DISEASE': 'DISEASENAME'
   },
  'utterances': ['{if} {I} {am} {at risk} {for|at} {-|DISEASE}']
},
  function(req, res) {
    currentIntent.name = req.data.request.intent.name;
    currentIntent.step = 0;
    var disease = req.slot('DISEASE');
    var veritasHelper = new VeritasDataHelper();
      veritasHelper.requestDiseaseByName().then(function(response){
        var results = response;
        for (var i = results.length - 1; i >= 0; i--) {
          console.log(results[i].disease_name.toUpperCase() , disease.toUpperCase());
          if ( results[i].disease_name.toUpperCase() == disease.toUpperCase() ) {
            res.say("Yes, your genetic profile predisposes you to " + disease + ". Would you like to learn more").shouldEndSession(false).send();
            currentIntent.step++;
            return;
          } 
        }
        res.say("I am sorry, we don't have information about " + disease + " yet. I will let you know when we do.").shouldEndSession(true).send();
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
      veritasHelper.requestDiseaseByName().then(function(response){
        var results = response;
        for (var i = results.length - 1; i >= 0; i--) {
          console.log(results[i].disease_name.toUpperCase(),disease.toUpperCase())
          if ( results[i].disease_name.toUpperCase() == disease.toUpperCase() && results[i].lifestyle_action_and_prevention_manual !== null ) {
            res.say(results[i].lifestyle_action_and_prevention_manual + " Would you like to learn more?").shouldEndSession(false).send();
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

app.intent('cholesterol', {
  'utterances': ['{how is my cholesterol}']
},
  function(req, res) {
    currentIntent.name = req.data.request.intent.name;
    currentIntent.step = 0;
    res.say("In your last blood work your cholesterol levels were slightly elevated. You should also know you have a genetic variant that predisposes you to having high  cholesterol. Would you like me to recommend a restaurant for lunch with healthy food options?").shouldEndSession(false).send();
    currentIntent.step++;
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
    res.say("Based on your Veritas myGenome analysis you have a high risk of developing rheumatoid arthritis after 40. Veritas recommends you test your blood markers for inflammation at least once a year. Your last test was 6 months a go and it was in normal range. Would you like me to order you another test?").shouldEndSession(false).send();
    currentIntent.step++;
  }
);

app.intent('mygenome', {
  'utterances': ['{anything new in my genome}']
},
  function(req, res) {
    currentIntent.name = req.data.request.intent.name;
    currentIntent.step = 0;
    res.say("There are five new findings based on most recent publications. Would you like me to read them to you?").shouldEndSession(false).send();
    currentIntent.step++;
  }
);

app.intent('report', {
  'utterances': ['{if my report is ready}']
},
  function(req, res) {
    currentIntent.name = req.data.request.intent.name;
    currentIntent.step = 0;
    res.say("Yes, it is. Would you like me to give you the highlights?").shouldEndSession(false).send();
    currentIntent.step++;
  }
);

app.intent('AMAZON.StopIntent', {},
  function(req, res) {
    currentIntent.name = null;
    currentIntent.step = 0;
    res.say("Ok").shouldEndSession(true).send();
  }
);

app.intent('AMAZON.CancelIntent', {},
  function(req, res) {
    currentIntent.name = null;
    currentIntent.step = 0;
    res.say("Ok").shouldEndSession(true).send();
  }
);
app.intent('tylanol', {
  'utterances': ['{allergic to Tylenol}']
},
  function(req, res) {
    currentIntent.name = req.data.request.intent.name;
    res.say("You are a fast metabolizer of Tylenol, so you should talk to your doctor about adjusting your dosage.").shouldEndSession(true).send();
  }
);


//hack to support custom utterances in utterance expansion string
var utterancesMethod = app.utterances;
app.utterances = function() {
return utterancesMethod().replace(/\{\-\|/g, '{');
};

module.exports = app;
