import {Model} from './model.js';
import * as views from './views.js';
import * as util from './util.js';



window.addEventListener("modelUpdated", function(e){
    let users = Model.data.users; //all users after onload
    let observations = Model.data.observations; //all observations after onlaod
    showUrl(); //showUrl hash change

})

window.addEventListener("observationAdded", function(e) {
  bindings();

  logSubmit();
})



function showUrl() {

  let hash = util.split_hash(window.location.hash);

  let observations = Model.get_observations(); //gets all observations
  let recentObservations = Model.get_recent_observations(10); //gets the latest 10 observations
  let users = Model.get_users(); //gets all users
  let leaderboardUsers = user_leaderboard_helper(10); //gets the current top 10 users on observations added
  let user = Model.get_user(); //gets a single user

//if hash path is only users and doesn't contain any userID's
//display all users
  if(hash.path === "users" && hash.id ===undefined) {
    views.listJsonData("target", users, "users");

    //if user.id != undefined it will redirect to the hash with the id
    //displaying the single user alongside its observations
  } else if(hash.path === "users" && hash.id != undefined) {
    let user = Model.get_user(parseInt(hash.id));
    let userRecent = Model.get_user_observations(parseInt(hash.id));
     views.userPageData("target", user);
      views.listJsonData("user-observations", userRecent, "observations");
  }
  //if the hash path is only observations display all observations
  if(hash.path === "observations" && hash.id === undefined) {
    views.listJsonData("target", observations, "observations");

    //if hash path contains a observationid it will redirect it to the
    //place displaying only that observation
  } else if(hash.path === "observations" && hash.id != undefined) {
    let observation = Model.get_observation(parseInt(hash.id));
    views.listObservation("target", observation);

  }
  //handles redirects when u submit form
  if(hash.path === "submit") {
    views.form("target");
     bindings();
  }
  //If the home path is home, display the top 10 users with 10 recent observations
    if(hash.path === "") {
      views.homePageData("target", leaderboardUsers, recentObservations);

    }
  }

  //Handles the Model.add_form with a default of return false

  function person_form_handler() {

    let formdata = new FormData(this);
    Model.add_observation(formdata);
    return false;
  }

  function bindings() {

    let form = document.getElementById("form");
    let log = document.getElementById("log");

    form.onsubmit = person_form_handler;

}

//Handles all actions that occur on submitting the form

function logSubmit(event) {
  let error = Model.data.form;
    if(error.status === "failed") {
      log.innerText = " " + error.errors;
    }
    if(error.status === "success") {
      //If form is a success change location to user/0 as by default that is us
      window.location.hash = "#!/users/0";
      // window.location.hash = "#!/users/0";
      window.location.reload(true);
    }
    }

//Leaderboard helper function that will end off with an array of userIDs
//Sorted by how many observations each ID has done
function leaderboard_helper() {
  let users = Model.get_users(); //gets all users
  let sortedLeaderboard = []; //Will contain all the observations sorted by amount of observations
  let sortedUsers = []; //Will contain the previous arrays userIDs sorted by amount of observations
  let leaderboard = Model.get_user_leaderboard();

  for(let i=0; i < leaderboard.length; i++) {
    if(leaderboard[i].participant === users.id) {
      sortedLeaderboard.push(leaderboard[i][0]);
    }
  }
try{
  for(let i=0; i < sortedLeaderboard.length; i++) {
    sortedUsers.push(sortedLeaderboard[i].participant);
  }

}catch(err) {
  console.log("Array hasn't been found yet");
}
  return sortedUsers;
}


// final leaderboard helper, takes output from leaderboard_helper and
// finds its respective counterpart within all users and creates a new array
// of all users sorted by how many observations have been done
// then takes that input and creates a new array of size N in which the top N
// users will be pushed to that new array
function user_leaderboard_helper(N) {
  let userID = leaderboard_helper();
  let users = Model.get_users();
  let firstSort = [];
  let lastSort = [];

  for(let i=0; i < userID.length; i++) {
    for(let n=0; n < users.length; n++) {
      if(users[n].id === userID[i]) {
          firstSort.push(users[n]);
      }
    }
  }

  for(let i=0; i < N; i++) {
    lastSort.push(firstSort[i]);
  }

  return lastSort;
}



window.onhashchange = showUrl;

window.addEventListener('load', function () {
  Model.update_observations(); //updates all observations when window loads
  Model.update_users(); //updates all users when window loads

});
