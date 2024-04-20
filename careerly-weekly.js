const chrome = require("selenium-webdriver/chrome");
const { By } = require("selenium-webdriver");

const run = async () => {
  let service = new chrome.ServiceBuilder()
    .loggingTo("./chromedriver.exe")
    .enableVerboseLogging()
    .build();
  let options = new chrome.Options();
  let driver = chrome.Driver.createSession(options, service);

  const url = "https://careerly.co.kr/comments/1";
  await driver.get(url);

  const weeklyTop5 = await driver.findElements(
    By.xpath("//a[starts-with(@href, '/comments') and starts-with(@rel, 'no')]")
  );
  const TitleAndLinks = await Promise.all(
    weeklyTop5.slice(0, 5).map(async (tag, index) => {
      const title = await tag
        .findElement(By.xpath("./div[1]/div[2]/p"))
        .getText();
      const link = await tag.getAttribute("href");
      return { rank: index + 1, title, link };
    })
  );
  console.log(TitleAndLinks);
  driver.quit();
};

run();