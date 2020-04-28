export {listJsonData, homePageData, listUser, listObservation, form};


function apply_template(targetid, templateid, data, home_user_data) {

    let target = document.getElementById(targetid);

    let template = Handlebars.compile(
                        document.getElementById(templateid).textContent
                    )
    target.innerHTML = template(data);
}

function listJsonData(targetid, data, name) {
  if(name == "observations") {
    apply_template(targetid, "observations-template", {'observation': data});
  } else if(name == "users"){
    apply_template(targetid, "users-template", {'user': data});
  }
}

  function homePageData(targetid, data) {
    apply_template(targetid, "home-template", {'observation': data});
  }

  function listUser(targetid, data) {
    apply_template(targetid, "user-template", data);
  }

  function listObservation(targetid, data) {
    apply_template(targetid, "observation-template", data);
  }

  function home_user_data(targetid, data) {
    apply_template(targetid, "home-user-template", data);
  }

  function form(targetid) {
    let target = document.getElementById(targetid);
    let template = Handlebars.compile(document.getElementById("form-template").textContent)

    target.innerHTML = template();
  }
