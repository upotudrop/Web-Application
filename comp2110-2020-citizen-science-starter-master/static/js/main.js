import {Model} from './model.js';
import * as views from './views.js';
import * as util from './util.js';



window.addEventListener("modelUpdated", function(e){

    let users = Model.data.users;
    let observations = Model.data.observations;
    showUrl();

})

window.addEventListener("observationAdded", function(e) {
  bindings();
})

function showUrl() {

  let hash = util.split_hash(window.location.hash);

  let observations = Model.get_observations();
  let recentObservations = Model.get_recent_observations(10);
  let users = Model.get_users();
  let user = Model.get_user();



  if(hash.path === "users" && hash.id ===undefined) {
    views.listJsonData("target", users, "users");
  } else if(hash.path === "users" && hash.id != undefined) {
    let user = Model.get_user(parseInt(hash.id));

    let userRecent = Model.get_user_observations(parseInt(hash.id));
    views.listUser("target", user);

    views.listJsonData("space", userRecent, "observations");
  }

  if(hash.path === "observations" && hash.id === undefined) {
    views.listJsonData("target", observations, "observations");
  } else if(hash.path === "observations" && hash.id != undefined) {
    let observation = Model.get_observation(parseInt(hash.id));
    views.listObservation("target", observation);

  }
  if(hash.path === "submit") {
    views.form("target");
     bindings();

  }
    if(hash.path === "") {

      views.homePageData("target", recentObservations);
      views.listJsonData("space", users, "users");
    }
  }

  function person_form_handler() {

    console.log(this);

    let formdata = new FormData(this);

    Model.add_observation(formdata);
    //
    // fetch('/api/observations', {
    //   method: "POST", body: formdata
    // })
    // .then((response) => {
    //   return response.json();
    // })
    // .then((data) => {
    //   console.log(data);
    // })

    return false;
  }


  function bindings() {

    let form = document.getElementById("form");


    form.onsubmit = person_form_handler;



  }






window.onhashchange = showUrl;

window.addEventListener('load', function () {
  Model.update_observations();
  Model.update_users();

});





// window.addEventListener('load', function () {
//   let observations = Model.get_observations();
//   console.log(observations);
// });

// window.onload = function() {
//
//   console.log(event.target.readyState);
//   let observations = Model.get_observations();
//   console.log(observations);
//
//
//
// };
