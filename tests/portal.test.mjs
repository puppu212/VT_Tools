import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
const css = fs.readFileSync(new URL("../styles.css", import.meta.url), "utf8");
const app = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8");

test("portal links to all VT applications", () => {
  assert.match(html, /https:\/\/puppu212\.github\.io\/VT_MapMaker\//);
  assert.match(html, /https:\/\/puppu212\.github\.io\/VT_ImageMaker\//);
  assert.match(html, /https:\/\/puppu212\.github\.io\/VT_SpotMaker\//);
  const launchLinks = [...html.matchAll(/<a class="button primary launch-link"[^>]+>/g)];
  assert.equal(launchLinks.length, 3);
  for (const [link] of launchLinks) {
    assert.match(link, /target="_blank"/);
    assert.match(link, /rel="noreferrer"/);
  }
});

test("portal uses the shared VT visual theme", () => {
  assert.match(css, /--bg:\s*#101319/);
  assert.match(css, /--accent:\s*#ef9f43/);
  assert.match(css, /grid-template-columns:\s*repeat\(3,/);
  assert.match(html, /rel="icon" href="\.\/icons\/vt-tools\.svg"/);
  assert.doesNotMatch(html, /rel="icon" href="\.\/icons\/mapmaker\.svg"/);
});

test("portal remembers the last launched application locally", () => {
  assert.match(app, /vt-tools:last-opened/);
  assert.match(app, /localStorage\.setItem/);
});

test("portal copy describes user goals without implementation details", () => {
  assert.match(html, /マップ作成、画像素材の管理、スポット設定を支援する/);
  assert.match(html, /制作したい内容に合わせてツールを選べます。/);
  assert.doesNotMatch(html, /独立して/);
});

test("footer credits the creator", () => {
  assert.match(html, /© 2026 <a href="https:\/\/github\.com\/puppu212"[^>]*>puppu212<\/a>/);
});
