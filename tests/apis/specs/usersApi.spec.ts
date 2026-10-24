import { test , expect  } from "@playwright/test";
import users from "../endpoints/usersEndPoints";

let response ;

let jsonResponse ;

test.describe ( "Users Api" , () => {

  test ("Get All Avalibale Users " , async ({request}) => {
 
   response = await users.getAllUsers(request);

   expect(response.status()).toBe(200);

  });


  test ("Get Specific User " , async ({request}) => {
 
   response = await users.getspecificUser(request);

   expect(response.status()).toBe(200);
   const responseBody = await response.json();
   expect (responseBody.data.id).toBe(3);

  });



  test ("Get Specific page with Query param " , async ({request}) => {
 
   response = await users.getspecificPage(request);

   expect(response.status()).toBe(200);
   const responseBody = await response.json();
   expect (responseBody.page).toBe(2);

  });

  test ("Create user " , async ({request}) => {
 
   response = await users.createuser(request);

   expect(response.status()).toBe(201);
   const responseBody = await response.json();
   console.log(responseBody);
   
   expect (responseBody.job).toBe("tester");

  });





});