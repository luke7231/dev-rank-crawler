const chrome = require("selenium-webdriver/chrome");
const { By } = require("selenium-webdriver");

const run = async () => {
  let service = new chrome.ServiceBuilder()
    .loggingTo("./chromedriver.exe")
    .enableVerboseLogging()
    .build();
  let options = new chrome.Options();
  let driver = chrome.Driver.createSession(options, service);

  const url = "https://www.producthunt.com/";
  await driver.get(url);

  const productHuntTop5 = await driver.findElements(
    By.xpath("//div[starts-with(@class,'styles_titleContainer')]")
  );
  const productHuntThumbnails = await driver.findElements(
    By.xpath("//img[starts-with(@class, 'styles_mediaThumbnail')]")
  );
  //   console.log(careerlyTop5);
  const TitleAndLinks = await Promise.all(
    productHuntTop5.slice(0, 5).map(async (tag, index) => {
      const title = await tag
        .findElement(By.tagName("strong")) // strong 을 쓰더라.
        .getText();
      const icon = await productHuntThumbnails[index].getAttribute("src");
      const link = await tag.findElement(By.tagName("a")).getAttribute("href");
      // .findElement(By.xpath(".//a[starts-with(@href, '/posts')]")) // 이거 왜 안되지?
      return {
        rank: index + 1,
        icon,
        title,
        link,
      };
    })
  );
  console.log(TitleAndLinks);

  //   console.log("total count : " + TitleAndLinks.length);
  driver.quit();
};

run();
