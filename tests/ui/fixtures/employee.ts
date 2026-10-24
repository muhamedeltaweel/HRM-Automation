import {test as base } from "@playwright/test";
import { PomManager } from "../pages/pomManager";
import { EmployeePage } from "../pages/EmployeePage";
import auth from "../../apis/endpoints/authEndPoints";
import userCredentials from "../../../testData/ui/userCredentials";

type fixtures ={
pomManager :  PomManager ;

employeePage : EmployeePage ;

} ;

export const test = base.extend<fixtures>({

pomManager : async ({page, request, baseURL}, use ,testInfo) =>{

// log in through the API and inject the session ID into the browser, so the test skips the UI login
const sessionId = await auth.login(request, userCredentials.username_input, userCredentials.password_input);

await page.context().addCookies([{ name: auth.sessionCookie, value: sessionId, url: baseURL! }]);

const pomManager = new PomManager (page);

await pomManager.getHomePage().navigate_to();

console.log(`starting execute : ${testInfo.title}`);

await use (pomManager);
},

employeePage : async ({pomManager}, use)=> {

 await use (pomManager.getEmployeePage());

}


})