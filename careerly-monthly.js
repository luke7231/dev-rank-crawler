const chrome = require("selenium-webdriver/chrome");
const { By } = require("selenium-webdriver");

const run = async () => {
  let service = new chrome.ServiceBuilder()
    .loggingTo("./chromedriver.exe")
    .enableVerboseLogging()
    .build();
  let options = new chrome.Options();
  let driver = chrome.Driver.createSession(options, service);

  const url = "https://careerly.co.kr/trends";
  await driver.get(url);

  const careerlyTop5 = await driver.findElements(
    By.xpath("//a[starts-with(@href, '/comments')]")
  );

  const TitleAndLinks = await Promise.all(
    careerlyTop5.map(async (tag, index) => {
      const title = await tag
        .findElement(By.tagName("span")) // span이 잘 걸침.
        .getText();
      const link = await tag.getAttribute("href");
      return { rank: index + 1, title, link };
    })
  );
  console.log(TitleAndLinks);

  //   console.log("total count : " + TitleAndLinks.length);
  driver.quit();
};

run();
