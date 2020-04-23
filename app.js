// const puppeteer = require("puppeteer");

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(
//     "https://gall.dcinside.com/board/view/?id=frozen&no=3774825&exception_mode=recommend&page=1"
//   );
//   await page.screenshot({
//     path: "example.png"
//   });

//   await browser.close();
// })();
/*
갤러리 입력
갤러리 이름으로 갤러리 개념글 마지막 페이지 번호 가져오기

페이지 0
개념글 갯수 계산
개념글 갯수 첫번째 0,1 번은 설문, 이슈로 제외
2번푸터 개념글 갯수 계산된 글 파싱
*/
const puppeteer = require("puppeteer");
const fs = require('fs');

let galleryName = "frozen"; // Enter gallery name

(async () => {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0)
  // Adjustments particular to this page to ensure we hit desktop breakpoint.
  page.setViewport({
    width: 1000,
    height: 10000000,
    deviceScaleFactor: 1
  });
  fs.readFile('data.txt', async function (err, data) {
    if (err) throw err;
    let array = data.toString().split("\n");
    for (i in array) {
      if (array[i].charAt(0) === '*') {
        // console.log('YES');
        console.log(`Now Processing : ${array[i]} | ${array.length - i -1} items left`);
        //
        // SOME JOBS
        //

        let newValue = array.map(function (line) {
          return line.replace('*', '');;
        }).join("\n")
        // let newValue = array[i].replace('*', '');
        // console.log(newValue)
        // // newValue = newValue + '\n';

        await fs.writeFile('data.txt', newValue, 'utf-8', async function (err, data) {
          if (err) throw err;
          // console.log('Done!');
        })

      } else {
        console.log(`${array[i]} Already Captured`)
      }
    }
  });
  // fs.readFile('data.txt', async function (err, data) {
  //   if (err) throw err;
  //   let array = data.toString().split("\n");
  //   for (i in array) {
  //     if (array[i].charAt(0) === '*') {
  //       console.log(`Now Processing : ${array[i]} | ${array.length - i -1} items left`);
  //       await page.goto(`https://gall.dcinside.com/${galleryName}/${array[i]}`), {
  //         waitUntil: "networkidle0",
  //         // timeout: 0
  //       };
  //       await page.waitForSelector(".view_content_wrap"), {
  //         waitUntil: 'networkidle0'
  //       }
  //       /* ScreenShot Functions */
  //       async function screenshotDOMElement(opts = {}) {
  //         const padding = "padding" in opts ? opts.padding : 0;
  //         const path = "path" in opts ? opts.path : null;
  //         const selector = opts.selector;

  //         if (!selector) throw Error("Please provide a selector.");

  //         const rect = await page.evaluate(selector => {
  //           const element = document.querySelector(selector);
  //           if (!element) return null;
  //           const {
  //             x,
  //             y,
  //             width,
  //             height
  //           } = element.getBoundingClientRect();
  //           return {
  //             left: x,
  //             top: y,
  //             width,
  //             height,
  //             id: element.id
  //           };
  //         }, selector);

  //         if (!rect)
  //           throw Error(
  //             `Could not find element that matches selector: ${selector}.`
  //           );
  //         return await page.screenshot({
  //           path,
  //           clip: {
  //             x: rect.left - padding,
  //             y: rect.top - padding,
  //             width: rect.width,
  //             height: rect.height + padding * 2
  //           }
  //         });
  //       }
  //       let newValue = array[i].replace('*', '');

  //       fs.writeFile('data.txt', newValue, 'utf-8', function (err, data) {
  //         if (err) throw err;
  //         console.log('Done!');
  //       })

  //     } else {
  //       console.log(`${array[i]} Already Captured`)
  //     }
  //       await screenshotDOMElement({
  //         path: `./result/${array[i]}.png`,
  //         selector: ".view_content_wrap",
  //         padding: 10
  //       });
  //   }
  // });
  // await browser.close();
})();