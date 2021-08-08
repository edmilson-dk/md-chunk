import express from "express";
import cors from "cors";
import chalk from "chalk";
import MarkdownIt from "markdown-it";
import fs from "fs";
import path from "path";
import hljs from "highlight.js";

import { renderHtmlBaseTemplate } from "../helpers";

const md: MarkdownIt = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  quotes: '“”‘’',
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const htmlCode = `
        <pre class="hljs"><code class="language-sh">
          ${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}
        </code></pre>
        `;

        return htmlCode;
      } catch (__) { }
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});


const app = express();

app.use(cors());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('pages/index');
});

export function startServer() {
  app.listen(3000, () => {
    console.log(chalk.greenBright(`Server is running on: http://localhost:${chalk.blueBright(3000)}`));
  });
}