

enum AuthMethod {
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
  loginCheck(userEmail: string)  {
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

    loginAdhoc(userEmail: String, userPassword: String) {
      
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
};

const Req = new Requests();
export default Req;

