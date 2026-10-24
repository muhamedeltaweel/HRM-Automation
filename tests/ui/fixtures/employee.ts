import {test as base } from "@playwright/test";
import { PomManager } from "../pages/pomManager";
import { EmployeePage } from "../pages/EmployeePage";

type fixtures ={
pomManager :  PomManager ;

employeePage : EmployeePage ;

} ;

export const test = base.extend<fixtures>({

pomManager : async ({page}, use ,testInfo) =>{
    
const pomManager = new PomManager (page);

await pomManager.getLoginPage().navigate_to();

console.log(`starting execute : ${testInfo.title}`);

await use (pomManager);
},

employeePage : async ({pomManager}, use)=> {

 await use (pomManager.getEmployeePage());

}


})