const chrome = require("selenium-webdriver/chrome");
const { By, until } = require("selenium-webdriver");

const run = async () => {
  let service = new chrome.ServiceBuilder()
    .loggingTo("./chromedriver.exe")
    .enableVerboseLogging()
    .build();
  let options = new chrome.Options();
  let driver = chrome.Driver.createSession(options, service);

  const url = "https://disquiet.io/";
  await driver.get(url);

  await driver.wait(
    until.elementLocated(By.className("sc-eHVZpS eXozIH")),
    1000
  );

  // const disqRankingTop5 = (
  //   await driver.findElements(By.className("sc-eHVZpS eXozIH"))
  // ).slice(0, 5);
  const disqRankingTop5 = await driver
    .findElement(By.className("links-wrapper"))
    .findElements(By.xpath(".//a[starts-with(@href,'/product')]"));
  console.log(disqRankingTop5.length);
  const TitleAndLinks = await Promise.all(
    disqRankingTop5.map(async (tag, index) => {
      // const title = await tag.findElement(By.className("name")).getText();
      const title = await tag
        .findElement(By.xpath("./div[1]/div[3]/div[1]"))
        .getText();
      const link = await tag.getAttribute("href");
      return { rank: index + 1, title, link };
    })
  );
  console.log(TitleAndLinks);

  driver.quit();
};

run();

// 안 될 때가 있다 음 리액트라 그런가
