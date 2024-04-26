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
  const combinedResults = [
    {
      key: "careerly-w",
      title: "Careerly TOP5 (Weekly)",
      img: "/careerly.png",
      link: "https://careerly.co.kr/",
      contents: await careerlyWeekly(),
    },
    {
      key: "hakerNews",
      title: "HakerNews TOP5",
      img: "/y-combinator.png",
      link: "https://news.ycombinator.com/",
      contents: await hakerNews(),
    },
    {
      key: "geekNews",
      title: "GeekNews TOP5",
      img: "/geeknews.png",
      link: "https://news.hada.io/",
      contents: await geek(),
    },
    {
      key: "disquiet",
      title: "Trending product TOP5 (국내)",
      img: "/disquiet.jpeg",
      link: "https://disquiet.io/",
      contents: await disquiet(),
    },
    {
      key: "careerly-m",
      title: "Careerly Top5 (Monthly)",
      img: "/careerly.png",
      link: "https://careerly.co.kr/",
      contents: await careerlyMonthly(),
    },
    {
      key: "productHunt",
      title: "Trending Product TOP5 (글로벌)",
      img: "/product-hunt.png",
      link: "https://www.producthunt.com/",
      contents: await productHunt(),
    },
    {
      key: "server",
      title: "오늘의 SERVER",
      contents: [
        {
          title: "[SaaS] 시간여행이 가능한 시스템 아키텍처",
          link: "https://blog.gangnamunni.com/post/saas-event-sourcing/",
        },
        {
          title:
            "[신청 시작] 4월 우아한테크세미나: Java의 미래, Virtual Thread",
          link: "https://techblog.woowahan.com/17163/?utm_source=oneoneone",
        },
        {
          title: "개발자를 잠 못 들게 만드는 코드",
          link: "https://dev.gmarket.com/103",
        },
        {
          title: "설계란 고민의 연속이다 1편",
          link: "https://dev.gmarket.com/104",
        },
        {
          title: "개발자가 손수 대규모 Cassandra를 신규 클러스터로 이전하기",
          link: "https://techblog.lycorp.co.jp/ko/moving-large-scale-cassandra-to-a-new-cluster",
        },
      ],
    },
    {
      key: "web",
      title: "오늘의 WEB",
      contents: [
        {
          title: "크로스 플랫폼 디자인 시스템, 1.5년의 기록 (2)",
          link: "https://yozm.wishket.com/magazine/detail/2538/",
        },
        {
          title: "2024 프론트엔드 기술스택 이야기",
          link: "https://velog.io/@teo/2024-frontend-techstack",
        },
        {
          title: "[번역] 재미와 이익을 위한 자바스크립트 최적화",
          link: "https://velog.io/@surim014/optimizing-javascript-for-fun-and-for-profit",
        },
        {
          title: "(번역) 자바스크립트 시각화하기 : 프로미스 실행",
          link: "https://velog.io/@sehyunny/js-visualized-promise-execution",
        },
        {
          title: "지금 당장 pnpm으로 넘어가야 하는 이유",
          link: "https://lasbe.tistory.com/200?utm_source=oneoneone",
        },
      ],
    },
  ];

  // 현재 날짜를 문자열로 만듭니다. (예: "2024-04-25")
  const currentDate = new Date().toISOString().slice(0, 10);

  // 파일 이름을 생성합니다. (예: "2024-04-25.json")
  const filename = `${currentDate}.json`;

  // 결과를 파일에 씁니다.
  fs.writeFileSync(filename, JSON.stringify(combinedResults));

  console.log(`Combined results saved to ${filename}`);
};

combineAndSaveResults();
