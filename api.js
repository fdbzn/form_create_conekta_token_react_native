const BASE_API = 'http://45.55.25.108:1337/';

class Api {
  
  
  add_card( token ) {
    return this.post(`${BASE_API}test/react_pay`, token);
  }
  

  async get(url){
      const query = await fetch( url,  {method: 'GET'} );
      return this.handleResponse(query);
  }

  async post(url, data){
      const query = await fetch(url,  {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      return this.handleResponse(query);
  }

  async handleResponse(query){
    console.log("apilog:",query)
    let response = {};
    if(query.status === 200 || query.status === 201){
      response = await query.json();
      response.success = true;
      
    }else{
      response = await query.json();
      response.success = false;
      response.error_desc = errorMessage[response.code];
    }
    console.log("apilog:",response)
    return response;
  }

  toParams(obj_data){
    return Object.entries(obj_data).map(e => e.join('=')).join('&')
  }
 
}

export default new Api();