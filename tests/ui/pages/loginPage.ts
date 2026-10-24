import { type Locator , type Page } from "@playwright/test";

export class LoginPage {

//=========================Locators=========================

readonly page : Page;
readonly username : Locator ;
readonly password : Locator ;
readonly login_btn : Locator ;
readonly error_msg :Locator ;

//=========================Variables=========================

readonly error_msg_text : string = "Invalid credentials";

//=========================Constructor=========================

constructor (page : Page) {
this.page =page ;
this.username = page.locator("input[placeholder='Username']");
this.password = page.locator("input[placeholder='Password']");
this.login_btn = page.locator ("button[type='submit']");
this.error_msg = page.locator(".oxd-text.oxd-text--p.oxd-alert-content-text");
}

//=========================Methods=========================

//=========================Actions=========================

async navigate_to(){

    await this.page.goto('/');
}

async login(username_input: string, password_input: string) {

    await this.username.fill(username_input);
    await this.password.fill(password_input);
    await this.login_btn.click();

}



}