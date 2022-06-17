import express from "express";
import * as path from "path";

const browserAssetsPath = path.join("dist", "browser");
const rootHtmlFilePath = path.join(browserAssetsPath, "index.html");

const serveDist = express.static(browserAssetsPath, {
  maxAge: 60000,
});

const serveDefaultPage: express.RequestHandler = (_request, response) => {
  response.sendFile(path.resolve(rootHtmlFilePath));
};

export function serveProductionAssets() {
  return [serveDist, serveDefaultPage];
}
