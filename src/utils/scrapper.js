const puppeteer = require("puppeteer");
const fs = require("fs");


const charactersArray = [];

const scrapper = async (url) => {
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1024 });

  await page.goto(url, { waitUntil: "load" });

  await page.$eval("[data-title='Characters']", (el) => el.click());

  await getAllCharacters(page, browser);
};

const getAllCharacters = async (page, browser) => {
  let isElementDisplayed = true; // Cambiado a let

  
  while (isElementDisplayed) {
    try {
      await page.waitForSelector(".show_more", { timeout: 30000 });
      await page.$eval(".show_more", (el) => el.click());
      // Actualiza la variable isElementDisplayed después de hacer clic en el botón
      isElementDisplayed = await page.evaluate(() => {
        const element = document.querySelector("div.show_more_container");
        const computedStyle = window.getComputedStyle(element);
        return computedStyle.getPropertyValue("display") !== "none";
      });
    } catch (error) {
      console.log(error);
      isElementDisplayed = false;
    }
  }


  console.log("aqui");

  await page.waitForSelector(".databank-content", { timeout: 100000 });
  const arrayDivsCharacters = await page.$$(".databank-content");

  for (const character of arrayDivsCharacters) {
    let name = await character.$eval(".long-title", (el) =>
      el.textContent.trim()
    );
    let img = await character.$eval("a img", (el) => el.dataset.src);
    const descriptionSelector = "p.desc";
    let description = await character.$eval(
      descriptionSelector,
      (el) => el.textContent
    );

    const objetCharacters = {
      name,
      img,
      description,
    };

    charactersArray.push(objetCharacters);
  }

  writeCharacters(charactersArray);

  await browser.close();
};

const writeCharacters = (charactersArray) => {
  fs.writeFile("characters.json", JSON.stringify(charactersArray), () => {
    console.log("escrito");
  });
};

module.exports = { scrapper };