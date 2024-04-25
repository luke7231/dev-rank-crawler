const chrome = require("selenium-webdriver/chrome");
const { By } = require("selenium-webdriver");

const hakerNews = async () => {
  let service = new chrome.ServiceBuilder()
    .loggingTo("./chromedriver.exe")
    .enableVerboseLogging()
    .build();
  let options = new chrome.Options();
  let driver = chrome.Driver.createSession(options, service);

  const url = "https://news.ycombinator.com/";
  await driver.get(url);

  const hakerRankingTop5 = (
    await driver.findElements(By.className("athing"))
  ).slice(0, 5);

  const result = await Promise.all(
    hakerRankingTop5.map(async (element, index) => {
      const title = await element
        .findElement(By.className("titleline"))
        .getText();
      const link = await element
        .findElement(By.className("titleline"))
        .findElement(By.tagName("a"))
        .getAttribute("href");
      return { rank: index + 1, title, link };
    })
  );

  // driver.quit();
  return result;
};
module.exports = hakerNews;
