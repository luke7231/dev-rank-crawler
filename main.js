const fs = require("fs");

const careerlyWeekly = require("./careerly-weekly");
const hakerNews = require("./haker-cr");
const geek = require("./geek-cr");
const disquiet = require("./disq-cr");
const careerlyMonthly = require("./careerly-monthly");
const productHunt = require("./product-hunt");
const eo = require("./eo-cr");

const combineAndSaveResults = async () => {
  // 결과를 모으는 작업
  const combinedResults = {
    careerlyWeekly: await careerlyWeekly(),
    hakerNews: await hakerNews(),
    geek: await geek(),
    disquiet: await disquiet(),
    careerlyMonthly: await careerlyMonthly(),
    productHunt: await productHunt(),
    eo: await eo(),
  };

  // 현재 날짜를 문자열로 만듭니다. (예: "2024-04-25")
  const currentDate = new Date().toISOString().slice(0, 10);

  // 파일 이름을 생성합니다. (예: "2024-04-25.json")
  const filename = `${currentDate}.json`;

  // 결과를 파일에 씁니다.
  fs.writeFileSync(filename, JSON.stringify(combinedResults));

  console.log(`Combined results saved to ${filename}`);
};

combineAndSaveResults();
