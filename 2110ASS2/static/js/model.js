export {Model};
import * as views from './views.js';
import * as util from './util.js';

/*
 * Model class to support the Citizen Science application
 * this class provides an interface to the web API and a local
 * store of data that the application can refer to.
 * The API generates two different events:
 *   "modelChanged" event when new data has been retrieved from the API
 *   "observationAdded" event when a request to add a new observation returns
*/

const Model = {

    observations_url: '/api/observations',
    users_url:  '/api/users',

    // this will hold the data stored in the model
    data: {
        observations: [],
        users: []
    },

    // update_users - retrieve the latest list of users
    //    from the server API
    // when the request is resolved, creates a "modelUpdated" event
    // with the model as the event detail
    update_users: function() {
      fetch(this.users_url)
      .then(
          function(response) {
              return response.json();
              console.log(response.json());
          }
      )
      .then(
          (data) => {
              this.data.users = data;

              let event = new CustomEvent("modelUpdated", {detail: this});
              window.dispatchEvent(event);

          }
      )


  },

    // update_observations - retrieve the latest list of observations
    //   from the server API
    // when the request is resolved, creates a "modelUpdated" event
    // with the model as the event detail
    update_observations: function() {
      fetch(this.observations_url)
      .then(
          function(response) {
              return response.json();
               console.log(response.json());
          }
      )
      .then(
          (data) => {
              this.data.observations = data;

              let event = new CustomEvent("modelUpdated", {detail: this});
              window.dispatchEvent(event);

          }
      )

    },

    // get_observations - return an array of observation objects
    get_observations: function() {
      return this.data.observations;


    },

    // get_observation - return a single observation given its id
    get_observation: function(observationid) {
        // return this.data.observations;

        let observation = this.get_observations();
        for(let i=0; i < observation.length; i++) {
          if(observation[i].id === observationid) {
            return observation[i];
          }
        }

    },

    set_observations: function(observations) {
        this.data.observations = observations;
    },

    // add_observation - add a new observation by submitting a request
    //   to the server API
    //   data contains all fields in the observation object
    // when the request is resolved, creates an "observationAdded" event
    //  with the response from the server as the detail
    add_observation: function(data) {


      fetch('/api/observations', {
        method: "POST", body: data
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.data.form = data;
        console.log(this.data.form);
        let event = new CustomEvent("observationAdded", {detail: data});
        window.dispatchEvent(event);

      })
    },

    // get_user_observations - return just the observations for
    //   one user as an array

    /*
    for all observations in which the participant matches the userid, add those
    observations to the new array and return it
    */
    get_user_observations: function(userid) {
      let observations = this.get_observations();

      let arr = [];

      let sorted = observations.sort(function(x, y) {
        let timestampA = new Date(x.timestamp);
        let timestampB = new Date(y.timestamp);
        return timestampB - timestampA;
      });


      for(let i=0; i < observations.length; i++) {
        if(observations[i].participant == userid) {
          arr.push(observations[i]);
        }
      }
      return arr;
    },

    // get_recent_observations - return the N most recent
    //  observations, ordered by timestamp, most recent first

    /*
    return a new array in which the observations are sorted by timestamp

    */
    get_recent_observations: function(N) {
      let observations = this.get_observations(); // get all Observations
      let arr = [];
      let sorted = observations.sort(function(x, y) {
        let timestampA = new Date(x.timestamp);
        let timestampB = new Date(y.timestamp);
        return timestampB - timestampA;
      });

      for(let i=0; i < N; i++) {
        arr.push(sorted[i]);
      }
      return arr;
    },

    /*
    * Users
    */
    // get_users - return the array of users
    get_users: function() {
        return this.data.users;
    },

    // set_users - set the array of users
    set_users: function(users) {
        this.data.users = users;
    },

    // get_user - return the details of a single user given
    //    the user id
    get_user: function(userid) {
      let user = this.get_users();
      for(let i=0; i < user.length; i++) {
        if(user[i].id === userid) {
          return user[i];
        }
      }
      return null;
    },

    //gets all observations by a userID and adds it to an array
    // sort that array by sub array length - most observations on top
    get_user_leaderboard: function(N) {
      let observations = this.get_observations();
      let users = this.get_users();
      let arr = [];
      let sortedArr = [];

      for(let i=0; i < users.length; i++) {
        let userObs = this.get_user_observations(users[i].id);
        arr.push(userObs);
      }
      //sorts based on sub array length 
      let sorted = arr.sort(function(x, y) {
        let firstArr = x.length;
        let secondArr = y.length;
        return secondArr - firstArr;
      })

      for(let i=0; i < N; i++) {

        sorted.push(arr);
      }

      return arr;
    }
};
