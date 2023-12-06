const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");
const https = require("https");
const sharp = require("sharp");
const { Builder, By, Key, until } = require("selenium-webdriver");

const run = async (dirName, keywords, scroll) => {
  let count = 0;

  let service = new chrome.ServiceBuilder()
    .loggingTo("./chromedriver.exe")
    .enableVerboseLogging()
    .build();

  let options = new chrome.Options();
  let driver = chrome.Driver.createSession(options, service);

  for (let key of keywords) {
    const url = "https://www.google.com/search?q=";
    const imageTab = "&source=lnms&tbm=isch";
    await driver.get(url + key + imageTab);

    const firstImage = await driver.findElement(By.className("rg_i Q4LuWd"));
    await firstImage.click();

    let img;

    try {
      img = await driver.wait(
        until.elementLocated(By.className("sFlh5c pT0Scc iPVvYb")),
        1000
      );
    } catch (error) {
      if (error.name === "TimeoutError") {
        console.log("원본❌ -> BASE64 서칭..");

        // Retry locating the element with a different class name
        img = await driver.wait(
          until.elementLocated(By.className("sFlh5c pT0Scc")),
          1000
        );
      } else {
        // Handle other errors
        console.error("An error occurred:", error);
      }
    }

    const links = [];

    // create directory
    !fs.existsSync(dirName) && fs.mkdirSync(dirName);

    let imgurl = await img.getAttribute("src");
    if (imgurl != null) {
      links.push(imgurl);
      // Folder Path
      // Image Download
      if (imgurl != null && imgurl.includes("data:image", 0)) {
        // Base64 image
        let base64 = imgurl.split(",");
        let decode = Buffer.from(base64[1], "base64");

        // 이미지를 리사이징하여 원하는 크기로 저장
        const resizedImageBuffer = await sharp(decode)
          // .resize(imgWidth, imgHeight)
          .resize({ width: 600 })
          .toBuffer();

        // Folder Path
        let dir = `./${dirName}/${key}.png`;

        // 리사이징된 이미지 저장
        fs.writeFileSync(dir, resizedImageBuffer);
        fs.appendFileSync("keys.txt", `${key}\n`, "utf-8");

        console.log(`${count + 1}. (BASE64)${key} Download Completed. 🚀`);
      } else if (imgurl != null) {
        https.get(imgurl, async (res) => {
          const chunks = [];
          res.on("data", (chunk) => chunks.push(chunk));
          res.on("end", async () => {
            // 이미지를 리사이징하여 원하는 크기로 저장
            const resizedImageBuffer = await sharp(Buffer.concat(chunks))
              .resize({ width: 600 })
              .toBuffer();
            // Folder Path
            let dir = `./${dirName}/${key}.png`;

            // 리사이징된 이미지 저장
            fs.writeFileSync(dir, resizedImageBuffer);

            console.log(`${count}. ${key} Download Completed 🚀`);
          });
        });
      } else {
        console.log(`Can't find url`);
      }
      count++;
    }
  }
  // Get image url and download
  driver.quit();
};

// First variable : search word
// Second variable : num of scroll (I think 250 is enough.)
const keywords = [
  "주의 말씀 앞에 선 악보",
  "하나님 사랑 노래 악보",
  "하나님의 사랑이 악보",
  "기대 악보",
  "당신은 하나님의 언약 안에 악보",
  "야곱의 축복 악보",
  "나의 예수님 악보",
  "내 진정 사모하는 + 좋으신 하나님 악보",
  "소원 악보",
  "감사와 찬양드리며 악보",
  "선한 목자 되신 우리 주 악보",
  "다윗의 노래 악보",
  "주께 붙들립니다 악보",
  "내 마음 다해 악보",
  "나의 부르심 악보",
  "내 모든 삶의 행동 악보",
  "빛 되신 주 악보",
  "내 영혼에 햇빛 비치니 악보",
  "내 마음을 가득 채운 악보",
  "목마른 사슴이 악보",
  "하나님의 음성을 악보",
  "위대하신 주 악보",
  "영광의 주님 찬양하세 악보",
  "찬양하세 악보",
  "하늘 위에 주님 밖에 악보",
  "경배하리 악보",
  "하나님의 세계 악보",
  "시편 139편 악보",
];
run("악보", keywords, 0);

// "손을 높이 들고
// +
// 위대하고 강하신 주님"
