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

function assertH1(target) {
    browser.findElement(By.css("h1")).then(function(element) {
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

        browser.get("https://listrom.me/");
        done();
    });

    afterEach(function(done) {
        browser.quit();
        done();
    });


    // Test case
    test.it("Test index", function(done) {
        let promise = browser.getTitle();

        promise.then(function(title) {
            assert.equal(title, "My me-page jsramverk");
        });

        browser.getTitle().then(function(title) {
            assert.equal(title, "My me-page jsramverk");
        });

        // assertH1("Home");
        // matchUrl("#!/");

        done();
    });



    test.it("Test go to Reports", function(done) {
        // try use nav link
        goToNavLink("Reports");

        // assertH1("Home");
        matchUrl("reports/" );

        done();
    });



    test.it("Test go to Login", function(done) {
        goToNavLink("Login");

        // get h1 text
        // assertH1("About");
        matchUrl("login/");

        done();
    });



    // test.it("Test go to Calculator", function(done) {
    //     goToNavLink("Calculator");
    //
    //     // get h1 text
    //     assertH1("Calculator");
    //     matchUrl("#!/calculator");
    //
    //     done();
    // });



    // test.it("Test color on Calculator", function(done) {
    //     goToNavLink("Calculator");
    //
    //     // display element background color
    //     browser.findElement(By.id("display")).then(function(displayElement) {
    //         displayElement.getCssValue("background-color").then(function(bgColor) {
    //             assert.equal(bgColor, "rgb(221, 221, 221)");
    //         });
    //     });
    //
    //     // operator buttons background color
    //     browser.findElements(By.className("operator")).then(function(operatorElements) {
    //         webdriver.promise.map(operatorElements, function(element) {
    //             return element.getCssValue('background-color');
    //         }).then(function(colors) {
    //             colors.forEach(function(color) {
    //                 assert.equal(color, "rgb(0, 31, 63)");
    //             });
    //         });
    //     });
    //
    //     done();
    // });


    //
    // test.it("Test an addition calculation", function(done) {
    //     goToNavLink("Calculator");
    //
    //     let promiseNumbers = browser.findElements(By.className("number"));
    //
    //     promiseNumbers.then(function(numberElements) {
    //         // press number 1
    //         numberElements[6].click();
    //         // press +
    //         browser.findElements(By.className("operator")).then(function(operatorElements) {
    //             operatorElements[3].click();
    //             // press number 5
    //             numberElements[4].click();
    //             // press =
    //             operatorElements[4].click();
    //         });
    //     });
    //
    //     // check sum
    //     browser.findElement(By.id("display")).then(function(displayElement) {
    //         displayElement.getText().then(function(value) {
    //             assert.equal(value, "6");
    //         });
    //     });
    //
    //     done();
    // });
});