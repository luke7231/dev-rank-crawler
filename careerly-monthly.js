const chrome = require("selenium-webdriver/chrome");
const { By } = require("selenium-webdriver");

const careerlyMonthly = async () => {
  let service = new chrome.ServiceBuilder()
    .loggingTo("./chromedriver.exe")
    .enableVerboseLogging()
    .build();
  let options = new chrome.Options();
  let driver = chrome.Driver.createSession(options, service);

  const url = "https://careerly.co.kr/trends";
  await driver.get(url);

  const careerlyTop20 = await driver.findElements(
    By.xpath("//a[starts-with(@href, '/comments')]")
  );

  const result = await Promise.all(
    careerlyTop20.map(async (element, index) => {
      const title = await element
        .findElement(By.tagName("span")) // span이 잘 걸침.
        .getText();
      const link = await element.getAttribute("href");
      return { rank: index + 1, title, link };
    })
  );

  console.log("careerly-monthly complete");
  driver.quit();

  return result;
};
module.exports = careerlyMonthly;
