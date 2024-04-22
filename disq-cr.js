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
    2000
  );

  // const disqRankingTop5 = (
  //   await driver.findElements(By.className("sc-eHVZpS eXozIH"))
  // ).slice(0, 5);
  const disqRankingTop5 = await driver
    .findElement(By.className("links-wrapper"))
    .findElements(By.xpath(".//a[starts-with(@href,'/product')]"));

  const result = await Promise.all(
    disqRankingTop5.slice(0, 5).map(async (element, index) => {
      const imgProperty = await element
        .findElement(By.xpath("./div[1]/div[2]"))
        .getCssValue("background-image");
      const imgUrl = imgProperty.match(/\bhttps?:\/\/\S+/i)[0];
      const title = await element
        .findElement(By.xpath("./div[1]/div[3]/div[1]"))
        .getText();
      const link = await element.getAttribute("href");
      return { rank: index + 1, icon: imgUrl, title, link };
    })
  );
  console.log(result);

  driver.quit();
};

run();

// 안 될 때가 있다 음 리액트라 그런가
