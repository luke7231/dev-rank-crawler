const chrome = require("selenium-webdriver/chrome");
const { By } = require("selenium-webdriver");

const productHunt = async () => {
  let service = new chrome.ServiceBuilder()
    .loggingTo("./chromedriver.exe")
    .enableVerboseLogging()
    .build();
  let options = new chrome.Options();
  let driver = chrome.Driver.createSession(options, service);

  const url = "https://www.producthunt.com/";
  await driver.get(url);

  const productHuntTop20 = await driver.findElements(
    By.xpath("//div[starts-with(@class,'styles_titleContainer')]")
  );
  const productHuntThumbnails = await driver.findElements(
    By.xpath("//img[starts-with(@class, 'styles_mediaThumbnail')]")
  );
  //   console.log(careerlyTop5);
  const result = await Promise.all(
    productHuntTop20.slice(0, 20).map(async (tag, index) => {
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
  console.log(result);

  //   console.log("total count : " + result.length);
  driver.quit();
  return result;
};

module.exports = productHunt;
