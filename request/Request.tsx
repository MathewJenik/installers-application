import { ToastAndroid } from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";


export enum AuthMethod {
  none = '',
  azure = 'azure',
  adhoc = 'iris'
}

class Requests {


  /**
   *
   * @param {string} userEmail
   * @return {*} 
   * @memberof Requests
   */
  loginCheckValid(userEmail: string)  {
    const loginReqOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: userEmail})
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
        headers: {'Content-Type': 'application/json'},
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
        headers: {'Content-Type': 'application/json'},
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
    isUserLoggedIn = async (sessionID: string) => {

      var results = await Req.loginCheck(sessionID);

      console.log("ADHOC RESTULTS: ", results);


      // if there isnt an error, store the required details
      if (results.error == false) {

          console.log("IS THE USER LOGGED IN: ", results.loggedIn);
          
      }

      return results.loggedIn;
    }

    
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
        ToastAndroid.showWithGravity(results.errorMsg, ToastAndroid.LONG, ToastAndroid.CENTER);
        return false;
      } else {
        if (results.valid == true) {
          // return the login type
          return results.next;
        } else {
          return AuthMethod.none;
        }
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

          // Congrats! You've just stored your first value!
          } catch (error) {
              // There was an error on the native side
          }

          return true;
        } else {
          return false;
        }
    }

    markAsInstalled = async (deviceID: number, clientID: number, sessionID: string) => {
      const loginReqOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({player_id: deviceID, 
        client_id: clientID, session_id: sessionID })
      };
      
      return fetch("https://api.lymlive.com.au/v1/installers/actions/install__player.iris", loginReqOptions)
      .then(response => response.json())
        .then(json => { 
          
          console.log(json.valid);
          console.log("Error: ", json.error, "\n ErrorMessage: ", json.errorMsg, "\n valid: ", json.valid, "\n next: ", json.next, "\n Logged In: ", json.loggedIn);

    searchRequest(searchValue: string , sessionId: string)  {
      const loginReqOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({search__value: searchValue, session_id:sessionId})
      };
  
      return fetch("https:api.lymlive.com.au/v1/installers/player/read.iris", loginReqOptions)
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