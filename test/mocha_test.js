/**
 * Test for getting started with Selenium.
 */
"use strict";



const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const firefox = require('selenium-webdriver/firefox');
const By = webdriver.By;

let browser;


function goToNavLink(target) {
    browser.findElement(By.linkText(target)).then(function(element) {
        element.click();
    });
}

function matchUrl(target) {
    browser.getCurrentUrl().then(function(url) {
        assert.ok(url.endsWith("/" + target));
    });
}


// Test suite
test.describe("Me-page", function() {

    this.timeout(0);

    beforeEach(function(done) {
        browser = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.firefox())
            .setFirefoxOptions(new firefox.Options().headless())
            .forBrowser('firefox')
            .build();

        // browser.get("https://listrom.me/");
        browser.get("http://localhost:3000/");
        done();
    });

    afterEach(function(done) {
        browser.quit();
        done();
    });


    // Test case
    test.it("Test index", function(done) {

        browser.getTitle().then(function(title) {
            assert.equal(title, "My me-page jsramverk");
        });

        done();
    });



    test.it("Test go to Reports", function(done) {
        // try use nav link
        goToNavLink("Reports");

        matchUrl("reports/" );

        done();
    });



    test.it("Test go to Login", function(done) {
        goToNavLink("Login");

        matchUrl("login/");

        done();
    });

});