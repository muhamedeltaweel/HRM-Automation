import {test } from "../fixtures/employee.ts";
import { expect } from "@playwright/test";
import validEmployeeData from "../../../testData/ui/validEmployeeData.ts";
import inValidEmployeeData from "../../../testData/ui/inValidEmployeeData.ts";

test ("Valid add employee", async  ({pomManager ,employeePage}) => {

// 1- already logged in through the API (pomManager fixture)
await expect (pomManager.getHomePage().user_img).toBeVisible ();

// 2- click pim from side bar in home page
const homePage = pomManager.getHomePage();
await homePage.clicking(homePage.pim_btn);

// 3- click add employee from head bar 

await employeePage.clicking(employeePage.add_employee_btn);

// 4- filling all data
const id = Date.now().toString().slice(-2);
const employee = { ...validEmployeeData, employee_tb: `E${id}`, user_name: `user_${id}` };
await employeePage.fillingData(employee);

//5- Click save

await employeePage.clicking(employeePage.save_btn);

// 6- Asserting 

await expect (employeePage.sucss_msg).toBeVisible();


});

inValidEmployeeData.forEach((data) => {

test (`Invalid add employee ${data.testType}` , async  ({pomManager ,employeePage}) => {

// 1- already logged in through the API (pomManager fixture)
await expect (pomManager.getHomePage().user_img).toBeVisible ();

// 2- click pim from side bar in home page
const homePage = pomManager.getHomePage();
await homePage.clicking(homePage.pim_btn);

// 3- click add employee from head bar 

await employeePage.clicking(employeePage.add_employee_btn);

// 4- filling with different data

await employeePage.fillingData(data);

//5- Click save

await employeePage.clicking(employeePage.save_btn);

// 6- Asserting 

await expect (employeePage.error_msg.filter({ hasText: data.testType })).toBeVisible();

});
    
});

