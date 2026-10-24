import {type Page } from "@playwright/test";
import { LoginPage } from "./loginPage";
import { HomePage } from "./homePage";
import { EmployeePage } from "./EmployeePage";


export class PomManager {

private readonly page : Page;
private readonly  loginPage : LoginPage ;
private readonly homePage : HomePage;
private readonly employeePage :EmployeePage ;


//=========================Constructor=========================

constructor (page : Page) {
this.page =page ;
this.loginPage = new LoginPage (this.page) ;
this.homePage = new HomePage (this.page) ;
this.employeePage = new EmployeePage (this.page) ;

}

//=========================Methods=========================

getLoginPage(){

    return this.loginPage;
}
getHomePage(){

    return this.homePage;
}

getEmployeePage (){

    return this.employeePage ;
}

}