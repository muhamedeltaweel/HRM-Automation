import { type Locator , type Page } from "@playwright/test";

export class HomePage {

//=========================Locators=========================

readonly page : Page;
readonly user_img : Locator
readonly pim_btn : Locator ;
//=========================Variables=========================


//=========================Constructor=========================

constructor (page : Page) {
this.page =page ;
this.user_img = page.locator(".oxd-userdropdown-img");
this.pim_btn = page.locator (".oxd-main-menu-item", { hasText: "PIM" });
}
//=========================Methods=========================

//=========================Actions=========================
async clicking(element : Locator) {

    await element.click();

}


}