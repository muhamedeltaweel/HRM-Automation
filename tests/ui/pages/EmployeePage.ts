import { type Locator , type Page } from "@playwright/test";

export type EmployeeData = {
    frst_name : string ;
    md_name : string ;
    lst_name : string ;
    employee_tb : string ;
    user_name : string ;
    ps : string ;
    conf_ps : string ;
};

export class EmployeePage {

//=========================Locators=========================

readonly page : Page;
readonly add_employee_btn : Locator ;
readonly frst_name_tb :Locator ;
readonly md_name_tb :Locator ;
readonly lst_name_tb :Locator ;
readonly employee_tb :Locator ;
readonly create_login_det_btn : Locator ;
readonly user_name_tb : Locator ;
readonly password_tb : Locator ;
readonly confrm_password_tb : Locator ;
readonly status_btn : Locator ;
readonly save_btn :Locator ;
readonly sucss_msg : Locator ;
readonly error_msg : Locator ;



//=========================Variables=========================

//=========================Constructor=========================

constructor (page : Page) {
this.page =page ;
this.add_employee_btn =page.locator("//a[normalize-space()='Add Employee']");
this.frst_name_tb =page.locator("input[placeholder='First Name']");
this.md_name_tb =page.locator("input[placeholder='Middle Name']");
this.lst_name_tb =page.locator("input[placeholder='Last Name']");
this.employee_tb = page.locator("(//input[@class='oxd-input oxd-input--active'])[2]");
this.create_login_det_btn =page.locator(".oxd-switch-input.oxd-switch-input--active.--label-right");
this.user_name_tb =page.locator("(//input[@class='oxd-input oxd-input--active'])[3]");
this.status_btn =page.locator("//label[normalize-space()='Enabled']");
this.password_tb =page.locator("(//input[@type='password'])[1]");
this.confrm_password_tb =page.locator("(//input[@type='password'])[2]");
this.save_btn =page.locator("button[type='submit']");
this.sucss_msg = page.locator(".oxd-toast-content.oxd-toast-content--success");
this.error_msg =page.locator(".oxd-input-field-error-message");


}

//=========================Methods=========================

//=========================Actions=========================
async fillingData(data : EmployeeData) {

    await this.frst_name_tb.fill(data.frst_name);
    await this.md_name_tb.fill(data.md_name);
    await this.lst_name_tb.fill(data.lst_name);
    await this.employee_tb.fill(data.employee_tb);
    await this.create_login_det_btn.click();
    await this.user_name_tb.fill(data.user_name);
    await this.status_btn.click();
    await this.password_tb.fill(data.ps);
    await this.confrm_password_tb.fill(data.conf_ps);

}
async clicking(element : Locator) {

    await element.click();

}


}