# Web-Development

This is the current version of the 2020 Web Application assignment, The Citizen Science Web Application. 
It contains a Python based web server that provides a JSON API to the data required for this application. 

**Installation**
```
python main.py or open project in visual code and run main.py 
```
**Required** 

This project requires Python 3 to be able to run and test this web application. While the bottle library is used within this project, note that it's already been included so you will not need to download it. 

To view the current state of the web application you can view it here: http://localhost:8010. 
If you notice something not updating, ensure you go into your browser with http://localhost:8010 open and press ``` ctrl + f5 ```

Everything available to change is located within the ``` static ``` folders, please note that you will not want to change the file names as the python server is specifically checking for the orginal names given. 

**Current Modules**

```main.js```referenced from the ```index.html``` file. 

```model.js``` contains the outline of the Model object and the current methods that use the JSON data.

```util.js```  provides a utility function used for page hashing 

```views.js``` contains methods used for displaying data onto the web application 

**Testing** 

All testing is done with use of the https://cypress.io/ testing tool. It is already included in the project files.

# The Current Methods/functions Per Module

## ```Current functions in main.js``` 

```showUrl``` Handles hashing the pages, and what to display on said hash urls. 

```person_form_handler``` Handles the Model.add_form that you will see below with a default of return false. 

```bindings``` Handles the form.onsubmit from the previous function.

```logSubmit(event)``` Handles all actions that occur on submitting the form. 

```leaderboard_helper``` will return with an array of userID's, sorted by how many Observations each ID have done. 

```user_leaderboard_helper(N)``` takes output from leaderboard_helper, finds its respective counterpart within ```all_users``` and creates a new array of all users sorted by how many observations they have done. It will then take that input and create a new array of size N in which the top N users will be pushed to that new array. 

```window.addEventListener('load', function()``` Updates all observations and all users when window loads. 

## ```Current functions in model.js```

```update_users``` Retrieves the latest list of users from the server API, -> creates a "modelUpdated" event. 

```update_observations``` Retrieves the latest list of observations from the server API, -> creates a "modelUpdated" event.

```get_observations``` return an array of observation objects.

```get_observation``` return a single observation given its id.

```add_observation``` adds a new observation by submitting a request to the server API. 

```get_user_observations``` returns a new array for all the observations in which match a particular userID also sorted by time

```get_recent_observations``` returns the N most recent observations, ordered by timestamp, most recent first. 

```get_users``` returns array of users.

```get_user``` returns the details of a single user based on useris parameter. 

```get_user_leaderboard``` gets all observations made by a userid and adds it to an array, then sorts said array by sub array length -> most observations on top 

## ```Current functions in util.js```

```split_hash(hash)``` given a hash path like "#!/observations/2, return an object with properties `path` ("observations") and `id` (2)

## ```Current functions in views.js```

```Note these all work using the handlebars library``` 

```apply_template``` Takes three parameters, targetid, templateid, and data. -> writes the data to the "target" aka div id in index.html. 

```listJsonData``` Takes three parameters, -> Lists Json Data using handlebars script, if name == "observations", it will display the JSON according to the observation list, if name == "users", it will display the JSON according to the users list.

```homePageData``` Takes three parameters, -> displays the homePageData showing the top 10 users based on observations and the 10 most recent observations.

```listUser``` Takes two parameters, -> displays data from a single user

```listObservation```Takes two parameters, -> displays data from a single observation

```userPageData```Takes three parameteres, -> displays the userPage data which includes one user based on id and all its observations.

```form``` Takes targetid has param, -> displays the form using the handlebars script. 

## The API Server

The Python API server provides the following URL's to use the JSON data:

```/api/users``` GET returns a JSON array containing user details 
```/api/users/<id>``` GET returns details of a single user
```/api/observations``` GET returns a JSON array containing observation records
```/api/observations/<id>``` GET returns details of a single observation 
```/api/observations``` POST adds a new observation record 
```/api/reset``` GET request resets the database 
