// Notify IndexNow search engines (Bing, Yandex, Seznam, Naver, ...) about every
// URL in the sitemap. Run after a production deploy: the key file must already
// be live at https://weraisetech.com/<key>.txt for the submission to be accepted.
import { readFile } from "node:fs/promises";

const HOST = "weraisetech.com";
const KEY = "3417d26fcd1b08d2e6128418cfa78e83";

const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
const urlList = [...sitemap.matchAll(/<loc>(https:\/\/weraisetech\.com[^<]*)<\/loc>/g)]
  .map((match) => match[1])
  .filter((url) => !/\.(?:png|jpe?g|webp|svg)$/i.test(url));

const keyCheck = await fetch(`https://${HOST}/${KEY}.txt`);
if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) {
  console.error(`IndexNow key file is not live at https://${HOST}/${KEY}.txt — deploy first.`);
  process.exit(1);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: submitted ${urlList.length} URLs -> HTTP ${response.status}`);
if (!response.ok && response.status !== 202) process.exitCode = 1;
