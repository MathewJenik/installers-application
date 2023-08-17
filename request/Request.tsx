class Requests {

  login() {
    const loginReqOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: "test@gmail.com"})
    };

    return fetch("https://api.lymlive.com.au/v1/auth/check.iris/", loginReqOptions)
    .then(response => response.json())
      .then(json => {
        
        console.log(json.valid);
        return json.valid;
      })
      .catch(error => {
        
        console.error(error);
      });    
    }
}
const Req = new Requests();
export default Req;

