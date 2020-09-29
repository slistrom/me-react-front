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

function assertH3(target) {
    browser.findElement(By.css("h3")).then(function(element) {
        element.getText().then(function(text) {
            assert.equal(text, target);
        });
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


    // Usecase 1
    test.it("Test index", function(done) {

        browser.getTitle().then(function(title) {
            assert.equal(title, "My me-page jsramverk");
        });

        done();
    });


    // Usecase 2
    test.it("Test go to Reports", function(done) {
        // try use nav link
        goToNavLink("Reports");
        goToNavLink("Kmom 1");

        matchUrl("reports/week/1" );
        assertH3("Kmom 1");

        done();
    });


    // Usecase 3
    test.it("Test go to Login", function(done) {
        goToNavLink("Login");

        matchUrl("login/");
        assertH3("Login");

        done();
    });

});