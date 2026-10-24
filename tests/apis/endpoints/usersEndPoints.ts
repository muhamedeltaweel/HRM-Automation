
const baseUrl = "https://reqres.in/api"; 
const usersEndpoint = "/users/" ;
const queryParam = "?page=2"
const specificUser = 3 ;
const requestBody = {
  "name": "Test",
  "job": "tester"
} 

async function getAllUsers(request) {
    
  const response = request.get(baseUrl+usersEndpoint);

  return response ;

}

async function  getspecificUser(request) {

  const response = request.get(baseUrl+usersEndpoint+specificUser);

  return response ;

  
}


async function  getspecificPage(request) {

  const response = request.get(baseUrl+usersEndpoint+queryParam);

  return response ;

  
}

async function  createuser(request) {

  const response = request.post(baseUrl+usersEndpoint,{data :requestBody});

  return response ;

  
}

export default {getAllUsers , getspecificUser, getspecificPage , createuser} ;

