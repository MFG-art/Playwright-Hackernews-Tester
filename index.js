// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { Agent } = require("https");
const { chromium } = require("playwright");
const { test, expect } = require('playwright/test');

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  var numberCompared = 1;
  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");

  // find all 30 locators on the page
  var age_arr = await page.locator('.age').all();
  var more_link = await page.locator('.morelink').first();

  await more_link.click();


  var lastComparedDate;

  // Test every date consecutively, ensuring that each date timestamp is older than the previous one
  while (numberCompared < 99){
  for (let i=0; i < age_arr.length-1; i++){
    if (numberCompared == 99){
      break;
    }
    var locator = age_arr[i];
    var nextLocator = age_arr[i+1];
    var title = await locator.getAttribute('title');
    var nextTitle = await nextLocator.getAttribute('title');
    let dateObj = new Date(title);
    let nextDateObj = new Date(nextTitle);
    await expect(dateObj.getTime()).toBeGreaterThanOrEqual(nextDateObj.getTime());
    numberCompared = numberCompared + 1;
    lastComparedDate = nextDateObj;
  }

if (numberCompared < 90){
// opening next page
  var more_link = await page.locator('.morelink').first();
  await more_link.click();
// on new page, get new age links
  var age_arr = await page.locator('.age').all();

  title = await age_arr[0].getAttribute('title');
  let dateObj = new Date(title);
  await expect(lastComparedDate.getTime()).toBeGreaterThanOrEqual(dateObj.getTime());
  numberCompared = numberCompared + 1;
}
}
console.log("Link 100 age: ",lastComparedDate);




}

(async () => {
  await sortHackerNewsArticles();
})();
