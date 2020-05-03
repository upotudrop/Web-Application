export {listJsonData, homePageData, listUser, listObservation, form, userPageData};

function apply_template(targetid, templateid, data) {

    let target = document.getElementById(targetid);

    let template = Handlebars.compile(
                        document.getElementById(templateid).textContent
                    )
    target.innerHTML = template(data);
}

//Lists Json Data using handlebars script
//if name == "observations", it will display the JSON according to the observation list
//if name == "users", it will display the JSON according to the users list
function listJsonData(targetid, data, name) {
  if(name == "observations") {
    apply_template(targetid, "observations-template", {'observation': data});
  } else if(name == "users"){
    apply_template(targetid, "users-template", {'user': data});
  }
}

// displays the homePageData showing the top 10 users based on observations
// and the 10 most recent observations
  function homePageData(targetid, users, observations) {
    apply_template(targetid, "home-template", {'user': users, 'observation': observations});
  }
//displays data from a single user
  function listUser(targetid, data) {
    apply_template(targetid, "user-template", data);
  }
//displays data from a single observation
  function listObservation(targetid, data) {
    apply_template(targetid, "observation-template", data);
  }
//displays the userPage data which includes one user based on id
// and all its observations
function userPageData(targetid, users, observations) {
  apply_template(targetid, "user-page-template", users, observations);
}
//displays the form using the handlebars script
  function form(targetid) {
    let target = document.getElementById(targetid);
    let template = Handlebars.compile(document.getElementById("form-template").textContent)

    target.innerHTML = template();
  }
