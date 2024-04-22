const chrome = require("selenium-webdriver/chrome");
const { By } = require("selenium-webdriver");

const run = async () => {
  let service = new chrome.ServiceBuilder()
    .loggingTo("./chromedriver.exe")
    .enableVerboseLogging()
    .build();
  let options = new chrome.Options();
  let driver = chrome.Driver.createSession(options, service);

  const url = "https://news.hada.io/";
  await driver.get(url);

  const geekRankingTop5 = (
    await driver.findElements(By.className("topic_row"))
  ).slice(0, 5);

  const result = await Promise.all(
    geekRankingTop5.map(async (element, index) => {
      const title = await element
        .findElement(By.className("topictitle"))
        .getText();
      const link = await element
        .findElement(By.className("topictitle"))
        .findElement(By.tagName("a"))
        .getAttribute("href");
      return { rank: index + 1, title, link };
    })
  );
  console.log(result);

  console.log("total count : " + result.length);
  driver.quit();
};

run();
