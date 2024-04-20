const chrome = require("selenium-webdriver/chrome");
const { By } = require("selenium-webdriver");

const run = async () => {
  let service = new chrome.ServiceBuilder()
    .loggingTo("./chromedriver.exe")
    .enableVerboseLogging()
    .build();
  let options = new chrome.Options();
  let driver = chrome.Driver.createSession(options, service);

  const url = "https://eopla.net/";
  await driver.get(url);

  const EO컨테이너3개 = await driver
    .findElement(By.className("popular-article-container"))
    .findElements(By.className("swiper-slide"));
  const TL = [];
  for (let container of EO컨테이너3개) {
    // 각 컨테이너 당
    const 각탑3 = await container.findElements(
      By.className("simple-article-container")
    ); // 3개의 real 콘텐츠 추출

    await Promise.all(
      각탑3.map(async (content) => {
        const title = await content
          .findElement(By.className("title-container"))
          .getText();
        const link = await content
          .findElement(By.tagName("a"))
          .getAttribute("href");
        const con = {
          title,
          link,
        };
        TL.push(con);
      })
    );
  }
  console.log(TL);

  //   const TitleAndLinks = await Promise.all(
  //     EORankingTop5.map(async (tag) => {
  //       const title = await tag.findElement(By.className("topictitle")).getText();
  //       const link = await tag
  //         .findElement(By.className("topictitle"))
  //         .findElement(By.tagName("a"))
  //         .getAttribute("href");
  //       return { title, link };
  //     })
  //   );
  //   console.log(TitleAndLinks);

  //   console.log("total count : " + TitleAndLinks.length);
  driver.quit();
};

run();
