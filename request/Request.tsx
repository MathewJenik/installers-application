import EncryptedStorage from "react-native-encrypted-storage";
import { Alert } from "react-native";


export enum AuthMethod {
  none = '',
  azure = 'azure',
  adhoc = 'iris'
}

export enum ScreenOrientation {
  none = '',
  normal = 'normal',
  right = 'right',
  inverted = 'inverted',
  left = 'left'
}

class Requests {

  /**
   * @returns {let} session (session id stored in Encrypted storage)
   */
  async GetSessionID() {
    let session = await EncryptedStorage.getItem("session_id");
    return session;
  }

  /**
   * Function that sends orientation request to the API and get handles a response 
   * @param {Number} playerID 
   * @param {Number} clientID 
   * @param {enum} orient 
   * @param {string} sessionID 
   * @returns json (json object)
   */
  displayCheckValid(playerID: Number, clientID: Number, orient: ScreenOrientation, sessionID: string) {
    const orientationReq = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          player__id: playerID,
          client__id: clientID,
          orientation: orient,
          session_id: sessionID
        })
    };

    return fetch("https:api.lymlive.com.au/v1/installers/actions/screen__rotate.iris", orientationReq)
      .then(response => response.json())
      .then(json => {

        console.log(json.valid);
        console.log("\nDisplay Request = \n", "Error: ", json.error, "\n ErrorMessage: ", json.errorMsg, "\n valid: ", json.loggedIn);
        return json;
      })
      .catch(error => {
        console.error(error);
      });
  }

  /**
   * Function that sends ping request to the API.
   * @param {number} mpID Media Player ID
   * @param {number} clientID Client ID
   * @param {string} sessionID Session ID
   * @returns json object.
   */
  pingMediaPlayer(mpID: Number, clientID: Number, sessionID: string) {
    const ReqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          mp__id: mpID,
          client__id: clientID,
          session_id: sessionID
        })
    };

    return fetch("https:api.lymlive.com.au/v1/admin/mediaplayer/ping.iris", ReqOptions)
      .then(response => response.json())
      .then(json => {

        // Logs all the variables and any errors
        console.log(mpID);
        console.log(clientID);
        console.log(sessionID);

        console.log("\nDisplay Request = \n", "Error: ", json.error, "\n ErrorMessage: ", json.errorMsg, "\n Result: ", json.result);
        return json;

      })
      .catch(error => {
        console.error(error);
      });
  }


  /**
   * Function that sends reboot request to the API. 
   * @param {number} mpID Media Player ID
   * @param {number} clientID Client ID
   * @param {string} sessionID Session ID
   * @returns json object.
   */
  rebootMediaPlayer(mpID: Number, clientID: Number, sessionID: string) {
    const ReqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          mp__id: mpID,
          client__id: clientID,
          session_id: sessionID
        })
    }

    return fetch("https:api.lymlive.com.au/v1/admin/mediaplayer/reboot.iris", ReqOptions)
      .then(response => response.json())
      .then(json => {

        // Logs all the variables and any errors
        console.log(mpID);
        console.log(clientID);
        console.log(sessionID);

        console.log(json.valid);
        console.log("\Reboot Request = \n", "Error: ", json.error, "\n ErrorMessage: ", json.errorMsg, "\n Logged in: ", json.loggedIn, "\n Result: ", json.result);
        return json;
      })
      .catch(error => {
        console.error(error);
      });
  }

  loginCheckValid(userEmail: string) {
    const loginReqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userEmail })
    };

    return fetch("https://api.lymlive.com.au/v1/auth/check.iris/", loginReqOptions)
      .then(response => response.json())
      .then(json => {

        console.log(json.valid);
        console.log("Error: ", json.error, "\n ErrorMessage: ", json.errorMsg, "\n valid: ", json.valid, "\n next: ", json.next, "\n Email: ", json.email);
        return json;
      })
      .catch(error => {
        console.error(error);
      });
  };

  loginAdhocAPI(userEmail: String, userPassword: String) {

    const loginReqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: userEmail,
        password: userPassword,
        saml: false,
        type: AuthMethod.adhoc,
        auth_token: ""

      })
    };

    return fetch("https://api.lymlive.com.au/v1/auth/login.iris/", loginReqOptions)
      .then(response => response.json())
      .then(json => {

        console.log(json.valid);
        console.log("Error: ", json.error, "\n ErrorMessage: ", json.errorMsg, "\n valid: ", json.valid, "\n next: ", json.next, "\n Email: ", json.email);
        return json;
      })
      .catch(error => {
        console.error(error);
      });
  };

  loginCheck(sessionID: string) {

    const loginCheckOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: sessionID,
      })
    };

    return fetch("https://api.lymlive.com.au/v1/auth/loginCheck.iris/", loginCheckOptions)
      .then(response => response.json())
      .then(json => {

        console.log(json.valid);
        console.log("Error: ", json.error, "\n ErrorMessage: ", json.errorMsg, "\n LoggedIN: ", json.loggedIn, "\n User: ", json.user);
        return json;
      })
      .catch(error => {
        console.error(error);
      });
  };


  /**
   * Function that checks if the user is logged in via their session ID
   *
   * @param {string} sessionID
   * @memberof Requests
   * @returns Boolean
   */
  async isUserLoggedIn(sessionID: string) {

    var results = await Req.loginCheck(sessionID);

    console.log("ADHOC RESTULTS: ", results);



    // if there isnt an error, store the required details
    if (results.error == false) {

      console.log("IS THE USER LOGGED IN: ", results.loggedIn);

    }
    return results.loggedIn;
  };


    /**
     *
     * Function that checks the login type, and returns the AuthMethod used
     * @param {*} nav
     * @param {string} userEmail
     * @param {boolean} showFields
     * @memberof Requests
     * @returns AuthMethod
     */
    loginTypeCheck = async (nav: any, userEmail: string, showFields: boolean) => {
      
      var results = await Req.loginCheckValid(userEmail);
      if (results.error == true) {
        Alert.alert(results.errorMsg);
        return false;

      } else {
        return results.next;
      }
    }
  
    /**
     * Function that logs the user in based off the provided email and password.
     * 
     *
     * @param {string} userEmail
     * @param {string} userPasword
     * @memberof Requests
     * @returns Boolean (True = successful login, False = Unseccessful login)
     */
    loginAdhoc = async (userEmail: string, userPasword: string) => {

      var results = await Req.loginAdhocAPI(userEmail, userPasword);

      console.log("EMAIL:", userEmail);

      console.log("Password:", userPasword);

      console.log("ADHOC RESTULTS: ", results);

      // if there isnt an error, store the required details
      if (results.error == false) {
        
        try {
          await EncryptedStorage.setItem(
            "session_id",
            results.session_id
          );
          await EncryptedStorage.setItem(
            "user_email",
            userEmail
          );
          await EncryptedStorage.setItem(
            "user_password",
            userPasword
          );
          await EncryptedStorage.setItem(
            "user_full_name",
            results.user.logins_actual_name
          );
          await EncryptedStorage.setItem(
            "user_phone_number",
            results.user.logins_contact_number
          )
        } catch (error) {
            // There was an error on the native side
        }
          return true;
        } else {
          return false;
        }

    }
  }

    /**
     * Function that marks the player as installed.
     * 
     * @param {number} deviceID : The ID of the device
     * @param {number} clientID : The ID of the client
     * @param {string} sessionID : The session ID of the user
     * @returns JSON response from the API
     */
    markAsInstalled(deviceID: number, clientID: number, sessionID: string) {
      // Set the request options
      const ReqOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({player_id: deviceID, 
        client_id: clientID, session_id: sessionID })
      };
      
      // Send the request to the Lymlive API and return the response as JSON
      return fetch("https://api.lymlive.com.au/v1/installers/actions/install__player.iris", ReqOptions)
      .then(response => response.json())
        .then(json => { 
          // Log the API response
          console.log("API DEVICE ID:", deviceID);
          console.log("API CLIENT ID:", clientID);
          console.log("API SESSION ID:", sessionID);
          console.log(json.valid);
          console.log("Error: ", json.error, "\n ErrorMessage: ", json.errorMsg, "\n valid: ", json.valid, "\n next: ", json.next, "\n Logged In: ", json.loggedIn);
          
          // Return the response
          return json;
        });
      };    


      /**
       * Function that resyncs the player to update details of the player
       * 
       * @param {number} deviceID : The ID of the device
       * @param {number} clientID : The ID of the client
       * @param {string} sessionID : The session ID of the user
       * @returns JSON response from the API
       */
      resyncDevice(deviceID: number, clientID: number, sessionID: string)  {
        // Set the request options
        const ReqOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({player_id: deviceID, 
          client_id: clientID, session_id: sessionID })
        };
        // Send the request to the Lymlive API and return the response as JSON
        return fetch("https:api.lymlive.com.au/v1/admin/mediaplayer/sync.iris", ReqOptions)
        .then(response => response.json())
          .then(json => { 
            // Log the API response
            console.log("API DEVICE ID:", deviceID);
            console.log("API CLIENT ID:", clientID);
            console.log("API SESSION ID:", sessionID);
            console.log(json.valid);
            console.log("Error: ", json.error, "\n ErrorMessage: ", json.errorMsg, "\n valid: ", json.valid, "\n next: ", json.next, "\n Result: ", json.result);
          
            // Return the response
            return json;
          });   
        };

    searchRequest(searchValue: string , sessionId: string)  {
      const ReqOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({search__value: searchValue, session_id:sessionId})
      };
  
      return fetch("https:api.lymlive.com.au/v1/installers/player/read.iris", ReqOptions)

      .then(response => response.json())
      .then(json => {
        console.log("API DEVICE ID:", deviceID);
        console.log("API CLIENT ID:", clientID);
        console.log("API SESSION ID:", sessionID);
        console.log(json.valid);
        console.log("Error: ", json.error, "\n ErrorMessage: ", json.errorMsg, "\n valid: ", json.valid, "\n next: ", json.next, "\n Result: ", json.result);

        return json;

      });
  };

  searchRequest(searchValue: string, sessionId: string) {
    const ReqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ search__value: searchValue, session_id: sessionId })
    };

    return fetch("https:api.lymlive.com.au/v1/installers/player/read.iris", ReqOptions)
      .then(response => response.json())
      .then(json => {

        console.log(searchValue);
        console.log("session ID:", sessionId);
        console.log("Error: ", json.error, "\n ErrorMessage: ", json.errorMsg, "\n valid: ", json.loggedIn, "\n next: ", json.client, "\n Search: ", json.player);

        return json;
      })
      .catch(error => {
        console.error(error);
      });
  };
};

const Req = new Requests();
export default Req;