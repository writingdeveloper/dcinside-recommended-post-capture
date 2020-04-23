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
var fs = require('fs');

let galleryName = "frozen";
let firstPage = `https://gall.dcinside.com/board/lists/?id=${galleryName}&list_num=100&sort_type=N&exception_mode=recommend&search_head=&page=1`;

(async () => {
    const browser = await puppeteer.launch({
        // headless: false
    });
    const page = await browser.newPage();
    // Adjustments particular to this page to ensure we hit desktop breakpoint.
    page.setViewport({
        width: 1000,
        height: 10000,
        deviceScaleFactor: 1
    });

    let lastPage;
    let lastPageUrl;
    let finalPageNumArray = [];
    // console.log(parseUrl);

    await page.goto(firstPage, {
        waitUntil: 'networkidle2',
        timeout: 0
    });
    lastPageUrl = await page.evaluate(
        () => document.getElementsByClassName("page_end")[0].attributes[0].value
    );
    console.log(lastPageUrl);
    await page.goto(`https://gall.dcinside.com${lastPageUrl}`, {
        waitUntil: "networkidle2",
        timeout: 0
        // timeout: 3000000
    });

    lastPage = await page.evaluate(
        () => document.getElementsByClassName('bottom_paging_box')[0].lastElementChild.innerText
    )
    console.log(lastPage)

    // arrayLength = await page.evaluate(
    //   () => document.getElementsByClassName("ub-content us-post").length
    // );

    // for (var i = 10; i > 0; i--) {
    //     console.log(i);
    // }

    for (let i = lastPage; i > 0; i--) {
        console.log(`PAGE NUM : ${i}`)
        let pageNumArray = [];
        await page.goto(`https://gall.dcinside.com/board/lists/?id=frozen&page=${i}&exception_mode=recommend&list_num=100`, {
            waitUntil: "networkidle2",
            timeout: 0
        });

        pageNumArray = await page.$$eval(".us-post", divs =>
            divs.map(div => div.dataset.no)
        );

        finalPageNumArray = finalPageNumArray.concat(pageNumArray);
        // console.log(pageNumArray);
        console.log(`Page Array Length : ${pageNumArray.length}`);
        console.log('-------------------------------------------------------------')
        // finalPageNumArray.sort((a, b) => a - b).forEach(e => console.log(e)) // LOG FULL ARRAY

    }
    // console.log(finalPageNumArray.sort((a, b) => a - b))
    finalPageNumArray.sort((a, b) => a - b).forEach(e => console.log(e))
    let file = fs.createWriteStream('data.txt');
    file.on('error', function (err) {
        /* error handling */
    });
    finalPageNumArray.sort((a, b) => a - b).forEach(function (v) {
        file.write('*' + v + '\n');
    });
    file.end();
    console.log('Recommended Post URL data collection completed')



    // for (let i in pageNumArray.reverse()) {
    //     // console.log(pageNumArray[i])
    //     let processNow = `https://gall.dcinside.com/board/view/?id=frozen&no=${pageNumArray[i]}&exception_mode=recommend&list_num=100&page=379`;
    //     console.log(`Now Processing : ${processNow}`);
    //     await page.goto(processNow), {
    //         waitUntil: "networkidle2",
    //         timeout: 0
    //         // timeout: 3000000
    //     };

    //     /**
    //      * Takes a screenshot of a DOM element on the page, with optional padding.
    //      *
    //      * @param {!{path:string, selector:string, padding:(number|undefined)}=} opts
    //      * @return {!Promise<!Buffer>}
    //      */
    //     async function screenshotDOMElement(opts = {}) {
    //         const padding = "padding" in opts ? opts.padding : 0;
    //         const path = "path" in opts ? opts.path : null;
    //         const selector = opts.selector;

    //         if (!selector) throw Error("Please provide a selector.");

    //         const rect = await page.evaluate(selector => {
    //             const element = document.querySelector(selector);
    //             if (!element) return null;
    //             const {
    //                 x,
    //                 y,
    //                 width,
    //                 height
    //             } = element.getBoundingClientRect();
    //             return {
    //                 left: x,
    //                 top: y,
    //                 width,
    //                 height,
    //                 id: element.id
    //             };
    //         }, selector);

    //         if (!rect)
    //             throw Error(
    //                 `Could not find element that matches selector: ${selector}.`
    //             );

    //         return await page.screenshot({
    //             path,
    //             clip: {
    //                 x: rect.left - padding,
    //                 y: rect.top - padding,
    //                 width: rect.width,
    //                 height: rect.height + padding * 2
    //             }
    //         });
    //     }

    //     await screenshotDOMElement({
    //         path: `./result/${pageNumArray[i]}.png`,
    //         selector: ".view_content_wrap",
    //         padding: 10
    //     });
    // }

    // await browser.close();
})();

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   // Adjustments particular to this page to ensure we hit desktop breakpoint.
//   page.setViewport({ width: 1000, height: 10000, deviceScaleFactor: 1 });

//   await page.goto(
//     "https://gall.dcinside.com/board/view/?id=frozen&no=3775421&exception_mode=recommend&page=1",
//     {
//       waitUntil: "networkidle2"
//     }
//   );

//   /**
//    * Takes a screenshot of a DOM element on the page, with optional padding.
//    *
//    * @param {!{path:string, selector:string, padding:(number|undefined)}=} opts
//    * @return {!Promise<!Buffer>}
//    */
//   async function screenshotDOMElement(opts = {}) {
//     const padding = "padding" in opts ? opts.padding : 0;
//     const path = "path" in opts ? opts.path : null;
//     const selector = opts.selector;

//     if (!selector) throw Error("Please provide a selector.");

//     const rect = await page.evaluate(selector => {
//       const element = document.querySelector(selector);
//       if (!element) return null;
//       const { x, y, width, height } = element.getBoundingClientRect();
//       return { left: x, top: y, width, height, id: element.id };
//     }, selector);

//     if (!rect)
//       throw Error(`Could not find element that matches selector: ${selector}.`);

//     return await page.screenshot({
//       path,
//       clip: {
//         x: rect.left - padding,
//         y: rect.top - padding,
//         width: rect.width + padding * 2,
//         height: rect.height + padding * 2
//       }
//     });
//   }

//   await screenshotDOMElement({
//     path: "element.png",
//     selector: ".view_content_wrap",
//     padding: 10
//   });

//   browser.close();
// })();