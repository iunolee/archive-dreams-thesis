// Menu selection
$(document).ready(function() {

  $("section").not("#login_page").hide();
  // $("section").not( "#archive_page" ).hide();
  // $("section").not("#record_page").hide();
  // $("section").not("#read_page").hide();

  $("#signin_button").click(function() {
    $("section").not("#login_page").hide();
    $("#login_page").show();

    // hide expanded navbar
    $('.navbar-collapse').collapse('hide');
  })

  $("#archive_page_button").click(function() {
    $("section").not("#archive_page").hide();
    $("#archive_page").show();
    gotData();

    // hide expanded navbar
    $('.navbar-collapse').collapse('hide');
  })

  $("#record_page_button").click(function() {

    $("section").not("#record_page").hide();
    $("#record_page").show();

    $("#record_title").val("")
    $("#record_body").val("")
    $("#record_tag").val("")

    // hide expanded navbar
    $('.navbar-collapse').collapse('hide');


  })

  $("#gallery_page_button").click(function() {
    $("section").not("#gallery_page").hide();
    $("#gallery_page").show();

    //gotData();

    // hide expanded navbar
    //$('.navbar-collapse').collapse('hide');
  })


});


//Button function
$("#saveButton").click(saveDreams);

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCCMRS8jPtvNUy_w5dRqn2xsMZsOmP5SK4",
  authDomain: "dreamarchive-a89e5.firebaseapp.com",
  databaseURL: "https://dreamarchive-a89e5.firebaseio.com",
  projectId: "dreamarchive-a89e5",
  storageBucket: "dreamarchive-a89e5.appspot.com",
  messagingSenderId: "138872739434"
};
firebase.initializeApp(config);
database = firebase.database();
// let ref = database.ref('newUserDreamsDB');
const ref = database.ref('testDB');

// ref.on('value', gotData, errData);

function errData(err) {
  console.log("error!");
  console.log(err);
}

function gotData() {
  // var userId = firebase.auth().currentUser.uid;

  // clear before loading the page
  $("#archive_page_content").children().remove();


  ref.once('value').then(function(snapshot) {
    let value = snapshot.val();
    let key = Object.keys(snapshot.val());

    let tagList = [];
    // Add card element
    key.forEach(function(d) {
      let content = value[d];
      // console.log(content)
      let dt = new Date(content.date);
      let dt_final = (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();
      let body = content.body.replace(/^(.{130}[^\s]*).*/, "$1") // show only 130 letters
      let title = content.title;
      let tag = content.tag;


      // put adding tag function here
      for (let i = 0; i < tag.length; i++) {
        tagList.push(tag[i])
        // console.log(tag[i])
      }

      $("#archive_page_content").prepend($('<div/>', {
          'class': 'row'
        })
        .append($('<div/>', {
            'class': 'col-lg-7 colum-sizing'
          })
          .append($('<div/>', {
              'class': 'card h-100 custom-card'
            })
            .append($('<div/>', {
                'class': 'card-body'
              })
              .append([
                $('<h4/>', {
                  'class': 'card-title titleFont'
                }).append($('<a/>').text(title).attr("href", "#").click(function() {
                  readDream(title, body, tag, dt_final);
                })),
                $('<blockquote/>', {
                  'class': 'blockquote'
                }).append($('<footer/>', {
                  'class': 'blockquote-footer'
                }).text(dt_final)),
                $('<p/>', {
                  'class': 'card-text bodyFont'
                }).text(body).css("color", "#afafaf")
              ])))))
    });

    //  Show all tags
    $("#tagList").children().remove();
    tagList.forEach(function(d) {
        $("#tagList").append($('<p>', {
          'class': 'eachTag'
        }).text(d))
      })

  });

}


// ref.remove();

function saveDreams() {
  let data = {
    title: $("#record_title").val(),
    body: $("#record_body").val(),
    tag: $("#record_tag").val().split(" "),
    date: new Date().toString()
  }
  ref.push(data);
}


function readDream(title, body, tag, date) {
  //

  // clear before loading the page
  $("#read_title").remove();
  $("#read_body").remove();
  $("#read_date").remove();
  $("#read_tag").remove();


  $("#read_page")
    .prepend($('<div/>', {
        'class': 'row justify-content-center'
      })
      .append($('<div/>', {
        'class': 'mt-2 w-75',
        'id': 'read_tag'
      })))
    .prepend($('<div/>', {
        'class': 'row justify-content-center'
      })
      .append($('<div/>', {
        'class': 'mt-2 w-75 read_tag'
      })))
    .prepend($('<div/>', {
        'class': 'row mt-2 justify-content-center'
      })
      .append($('<p/>', {
        'class': 'mt-2 w-75 bodyFont',
        'id': 'read_body'
      }).text(body)))
    .prepend($('<div/>', {
        'class': 'row mt-2 justify-content-center'
      })
      .append($('<p/>', {
        'class': 'mt-2 w-75 bodyFont',
        'id': 'read_date'
      }).text(date)))
    .prepend($('<div/>', {
        'class': 'row justify-content-center'
      })
      .append($('<h1/>', {
        'class': 'mt-4 w-75 titleFont',
        'id': "read_title"
      }).text(title)))

  tag.forEach(function(d) {
    $("#read_tag").append($('<p/>', {
      'class': 'mr-1 bodyFont d-inline-block'
    }).text(d))
  })

  $("section").not("#read_page").hide();
  $("#read_page").show();

}


document.getElementById("searchButtonArchive").addEventListener("click", function() {
  // clear before loading the page
  $("#archive_page_content").children().remove();

  var searchArchiveValue = document.getElementById("searchInputArchive").value
  // console.log(searchArchiveValue)

  ref.once('value').then(function(snapshot) {
    let value = snapshot.val();
    let key = Object.keys(snapshot.val());

    let tagList=[];
    // Add card element
    key.forEach(function(d) {
      let content = value[d];
      // console.log(content)


              let dt = new Date(content.date);
              let dt_final = (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();
              let body = content.body.replace(/^(.{130}[^\s]*).*/, "$1") // show only 130 letters
              let title = content.title;
              let tag = content.tag;


              // put adding tag function here
              for (let i = 0; i < tag.length; i++) {
                tagList.push(tag[i])
                // console.log(tag[i])
              }

      if (content.body.indexOf(searchArchiveValue) != -1) {

    

        $("#archive_page_content").prepend($('<div/>', {
            'class': 'row'
          })
          .append($('<div/>', {
              'class': 'col-lg-7 colum-sizing'
            })
            .append($('<div/>', {
                'class': 'card h-100 custom-card'
              })
              .append($('<div/>', {
                  'class': 'card-body'
                })
                .append([
                  $('<h4/>', {
                    'class': 'card-title titleFont'
                  }).append($('<a/>').text(title).attr("href", "#").click(function() {
                    readDream(title, body, tag, dt_final);
                  })),
                  $('<blockquote/>', {
                    'class': 'blockquote'
                  }).append($('<footer/>', {
                    'class': 'blockquote-footer'
                  }).text(dt_final)),
                  $('<p/>', {
                    'class': 'card-text bodyFont'
                  }).text(body).css("color", "#afafaf")
                ])))))
      }
    });
    //  Show all tags
    $("#tagList").children().remove();
    tagList.forEach(function(d) {
        $("#tagList").append($('<p>', {
          'class': 'eachTag'
        }).text(d))
      })
  });

})




//function searcherInput jquery

// (function ($) {
// 	  jQuery.expr[':'].Contains = function(a,i,m){
// 		  return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
// 	  };
//
// 	  function listFilter(header, list) {
//     //create a var with all the words of the dreams
//     var list ="var to create"
// 		var form = $("<form>").attr({"class":"filterform","action":"#"}),
// 			input = $("<input>").attr({"class":"filterinput","type":"text"});
// 		$(form).append(input).appendTo(header);
//
// 		$(input)
// 		  .change( function () {
// 			var filter = $(this).val();
// 			if(filter) {
// 			  $(list).find("a:not(:Contains(" + filter + "))").parent().slideUp();
// 			  $(list).find("a:Contains(" + filter + ")").parent().slideDown();
// 			} else {
// 			  $(list).find("li").slideDown();
// 			}
// 			return false;
// 		  })
// 		.keyup( function () {
// 			$(this).change();
// 		});
// 	  }
//
// 	  $(function () {
// 		listFilter($("#header"), $("#list"));
// 	  });
// 	}(jQuery));

//end of Jquery function





// function mySearcher()    {
//
//   //storing the input Word from user
//   let filteredDreams =[];
//   let myWord = searcherInput.value();
//   console.log(myWord);
//
//   for (let i=0; i<keys.length; i++) {
//   let k= keys[i];
//   let dream=archivedDreams[k].dream;
//   let title=archivedDreams[k].title;
//
//
//   // console.log(dream);
//   if (dream && dream.includes(myWord) ) {
//     //regular expresion or
//     // dream.includes("word".value)
//     filteredDreams.push(dream);
//     console.log(dream);
//     showFilteredDream(filteredDreams);
//     archive_Complete_List = document.getElementById("listOfDreams")
//     archive_Complete_List.style.display = "none";
//
//
//     }
//   }
//
// }
//   //end of mySearcherfunction
//


//
//
// //library to work with strings
// //import rita.
// // var for the temporary logo of the page
//   let logoImage;
// // var for user input
//   let userNewDreamInput;
// // var for the button
//   let sendDreamButton;
//   //variable for the json file that archive the dreams
//   let newDream=[];
//
//   //isthis array necesarry?
//   let singleDream=[];
// // var for an array (json file) of dreams that will be use to archive newdreams
//   let TheArchive;
// // variable to a record button to record voice.
//  //let= recordVoiceButton;
//  //variable to creat new json file (still need to work on this)
//  let json;
//  let database;
//  let theDreams;
//  let theTitles;
//  let titlesList;
//  let keys;
//  let k;
//  //variable for the date
//  let today;
//  //variables for the archived dreams in firebase
//  let archivedDreams;
//  let ArchivedDreamsList;
//  let toArchiveButton;
//  let archive_Complete_List
//
//   //variables to make the sound recording system workvar recordDream;
// let stopRecording;
// let mic;
// let recorder;
// let soundFile;
// let state = 0;
// //let timeInMs = Date.now();
//
//
// // var foo = new P5.SpeechRec(); // speech recognition object (will prompt for mic access)
// // foo.onResult = showResult; // bind callback function to trigger when speech is recognized
// // foo.start(); // start listening
// //
// // function showResult()
// // {
// //    console.log(foo.resultString); // log the result
// // }
//
//
//
//   function preload() {
//  //loading the json file / still not using it.
//  //this file has some dreams of classmates/ then i should be replace by newDream[] in the future.
//   TheArchive=loadJSON("DreamsArchive.json");
//
//   }
//
// function setup() {
//   noCanvas();
//   json = {}; // new JSON Object
//   //transform html in js.
//   //selecting html input and buttoms into p5js
//
//
//   //console.log(timeInMs);
//
//   //page 1
//   userNewDreamInput= select("#userDreamInput");
//   sendDreamButton= select("#sendDream");
//   recordVoiceButton=select("dreamRecorderImage");
//   ArchivedDreamsList=select("#listOfDreams");
//   FilteredDreamsList=select("#listOfFilteredDreams");
//   toArchiveButton=select("#Archive");
//
//   //page2_searcher function buttons and spaces
//    searcherInput= select("#toSearchInput");
//    searcherButton= select("#sendSearch");
//   //  // //dreamsOutput= select("#output");
//   searcherButton.mousePressed(mySearcher);
//
//   //activating function that save the send new dream
//   //sendDreamButton.mousePressed(saveDreams);
//   sendDreamButton.mousePressed(submitDream);
//   toArchiveButton.mousePressed(goToPage2);
//   toArchiveButton.mousePressed(displayArchivedTitles);
//   //document.write(dreamDate);
//
//   // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyCCMRS8jPtvNUy_w5dRqn2xsMZsOmP5SK4",
//     authDomain: "dreamarchive-a89e5.firebaseapp.com",
//     databaseURL: "https://dreamarchive-a89e5.firebaseio.com",
//     projectId: "dreamarchive-a89e5",
//     storageBucket: "dreamarchive-a89e5.appspot.com",
//     messagingSenderId: "138872739434"
//   };
//   firebase.initializeApp(config);
//   console.log(firebase);
//   database = firebase.database();
//   let ref = database.ref('newUserDreamsDB');
//   ref.on('value', gotData, errData);
//
//   //Activating button TO RECORD DREAMS
//   /*recordVoiceButton.mousePressed(startRec);
//      mic = new p5.AudioIn();
//    // prompts user to enable their browser mic
//      mic.start();
//
//    // create a sound recorder
//     recorder = new p5.SoundRecorder();
//    // connect the mic to the recorder
//     recorder.setInput(mic);
//    // this sound file will be used to
//    // playback & save the recording
//     soundFile = new p5.SoundFile(); */
//
// }
//
//   //here is my customize function to save files in the array after send button is pressed
//
// function saveDreams () {
//     let userDream= userNewDreamInput.value();
//     //document.getElementById('writeInput').value = "I dream d in a dream I saw a city invincible to the attacks of the
// //whole of the rest of the earth.";
//     console.log (userDream);
//         json.id = 0;
//         json.dream = userDream;
//         //let keywordsOfDream= keywords.value();
//         //json.keywords = keywordsOfDream;
//         //json.keywords = 'keywordsInput';
//         //console.log ("are you checking keywords input?");
//
//     saveJSON(userDream,'newDream.json');
//     console.log ("newDream[0]");
//
//
//   }
//
// //this is the submitt function to send the dreams to Firebase database
//   function submitDream () {
//   //dreamDate()
//   console.log(today);
//   console.log('is the date displaying?');
//     let data = {
//       dream: userNewDreamInput.value(),
//       title: userNewDreamInput.value(),
//       date: today
//     }
//     userNewDreamInput.value("write dream here");
//     console.log(data);
//     let ref = database.ref('newUserDreamsDB');
//     //var result is to have the key number of each submitterd dream?
//     let result= ref.push(data);
//     console.log(result.key);
//   }
//
//   function gotData (data) {
//     //console.log(data.val());
//     // let archivedDreams =data.val();
//     // let dreamsArray = Object.dreamsArray(archivedDreams);
//     // console.log(dreamsArray);
//     //for (let i=0; i<dreamsArray.length; i++) {
//       //let dArray= dreamsArray[i];
//       //let dreamsContent=archivedDreams[dArray].dreamsContent;
//       //let li=createElement();
//
//       // let dreamsListings= selectAll("dreamsListing");
//       // for (var i=0; i<dreamsListings.length; i++) {
//       //   dreamsListings[i].remove();
//       //   console.log(dreamsListing);
//       // }
//       archivedDreams =data.val();
//       //why I cant change the name of the variable keys?
//       keys = Object.keys(archivedDreams);
//       console.log(keys);
//       //for (let i=0; i<keys.length; i++) {
//       //let k= keys[i];
//
//       //var archDreams= archivedDreams[k].archDreams;
//       //console.log(theDreams,theTitles);
//       //var li = var ArchivedDreamsList
//       //ArchivedDreamsList = createElement('ArchivedDreamsList', theTitles + ': '+ theDreams + ' - ');
//       //let dreamsListing;
//       //ArchivedDreamsList.class("dreamsListing");
//       //ArchivedDreamsList.parent('titlesList');
//       //ArchivedDreamsList.parent('theTitles');
//   //}
// }
//
//   function errData(err) {
//     //console.log("error!");
//     //console.log(err);
//   }
//
//   function goToPage2() {
// 	document.getElementById("page-1").style.display = 'none';
//   document.getElementById("page-2").style.display = 'block';
//   document.getElementById("page-3").style.display = 'none';
//   displayArchivedTitles();
// }
//
//   function goToPage3(){
// 	document.getElementById("page-1").style.display = 'none';
//   document.getElementById("page-2").style.display = 'none';
//   document.getElementById("page-3").style.display = 'block';
//   //displayArchivedDreams();
//   //showHoleDream()
//   console.log("hola");
// }
// //check if this is ok
// function displayArchivedTitles() {
//
//   for (let i=0; i<keys.length; i++) {
//   k= keys[i];
//   theDreams=archivedDreams[k].dream;
//   theTitles=archivedDreams[k].title;
//   theDates=archivedDreams[k].date;
//   //ArchivedDreamsList = createElement('ArchivedDreamsList', theTitles + ': '+ theDreams + ' - ');
//   ArchivedDreamsList = createElement('li', ' ');
//   //var ahref= createA("#",theTitles);
//   var ahref= createA("#", theTitles + ' '+ theDates);
//   //WHY THIS IS NOT WORKING?
//   //ahref.attribute("onclick", "goToPage3")
//   //ahref.attribute("onclick", "goToPage3()")
//   ahref.mousePressed(showHoleDream);
//   ahref.key = k;
//   ahref.parent(ArchivedDreamsList)
//   ArchivedDreamsList.parent('listOfDreams')
//   console.log(ArchivedDreamsList);
//   //var archDreams= archivedDreams[k].archDreams;
//   //console.log(theDreams,theTitles);
//   //var li = var ArchivedDreamsList
//   //ArchivedDreamsList = createElement('ArchivedDreamsList', theTitles + ': '+ theDreams + ' - ');
//   //let dreamsListing;
//   //ArchivedDreamsList.class("dreamsListing");
//   //ArchivedDreamsList.parent('titlesList');
//   //ArchivedDreamsList.parent('theTitles');
//   }
// }
// // CHECK THIS, SEE IF IT SHOULD SAY THE TITLES OR KEY???? ITS FROM LAS EXAMPLE OF SHIFFMAN, FIREBASE TUTORIAL
// function showHoleDream() {
//   let key = this.key;
//   console.log(key);
//   let ref = database.ref("newUserDreamsDB/" + key);
//   ref.on('value', eachDream, errData);
//
//
//   function eachDream(data) {
//   let  singleDream= data.val();
//   console.log(singleDream);
//   let titleElt = select('#dream-content');
//   titleElt.html(singleDream.dream);
//   goToPage3();
//   }
//
//   //end of eachdream function
// }
// //end of showHoleDream function
//
//
// //TEST TO DISPLAY THE DREAMS
// // function displayArchivedDreams() {
// //
// //   for (let i=0; i<keys.length; i++) {
// //   k= keys[i];
// //   theDreams=archivedDreams[k].dream;
// //   theTitles=archivedDreams[k].title;
// //   //ArchivedDreamsList = createElement('ArchivedDreamsList', theTitles + ': '+ theDreams + ' - ');
// //   ArchivedDreamsList = createElement('li', '');
// //   var ahref= createA("#",theDreams);
// //   ahref.attribute("onclick", "goToPage3")
// //   ahref.mousePressed(showHoleDream);
// //   ahref.parent(ArchivedDreamsList)
// //   ArchivedDreamsList.parent('listOfDreams')
// //   console.log(ArchivedDreamsList);
// //   //var archDreams= archivedDreams[k].archDreams;
// //   //console.log(theDreams,theTitles);
// //   //var li = var ArchivedDreamsList
// //   //ArchivedDreamsList = createElement('ArchivedDreamsList', theTitles + ': '+ theDreams + ' - ');
// //   //let dreamsListing;
// //   //ArchivedDreamsList.class("dreamsListing");
// //   //ArchivedDreamsList.parent('titlesList');
// //   //ArchivedDreamsList.parent('theTitles');
// //   }
// // }
//
// //Page 2_ searcher function
//
//
//
//
//
// //Creating a function to make the record button work
// /*function startRec(){
//
//   if (state === 0 && mic.enabled) {
//
//     // record to our p5.SoundFile
//     recorder.record(soundFile);
//
//     //background(255,0,0);
//     //text('Recording!', 20, 20);
//     state++;
//   }
//   else if (state === 1) {
//     //background(0,255,0);
//
//     // stop recorder and
//     // send result to soundFile
//     recorder.stop();
//
//     //text('Stopped', 20, 20);
//     state++;
//   }
//
//   else if (state === 2) {
//     soundFile.play(); // play the result!
//     save(soundFile, 'mySound.wav');
//     state++;
//   }
// }
// */
// //createTitle()
//
// // function createTitle() {
// // let highest= 0;
// // for (let i=0; i<keys.length; i++) {
// // if keys[i]> keys[highest]
// // { highest=i }
// // else {   }
// // console.log(highest);
// // }
//

//
//   function showFilteredDream(dreams)
//   {
//     //ArchivedDreamsList.hide();
//     for(let i =0;i<dreams.length;i++) {
//         let a =createElement('li');
//         a.html(dreams[i]);
//         FilteredDreamsList.child(a);
//     }
//   }
//   //end showFilteredDream function
//
// dreamDate()
// function dreamDate() {
//
//   today = new Date();
//   let dd = today.getDate();
//   let mm = today.getMonth()+1; //January is 0!
//   let yyyy = today.getFullYear();
//
//   if(dd<10) {
//     dd = '0'+dd
//   }
//
//   if(mm<10) {
//     mm = '0'+mm
//   }
//
//   today = mm + '/' + dd + '/' + yyyy;
//   //document.write(today);
//
//
//
// }
