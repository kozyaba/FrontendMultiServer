const express = require('express');
const httpProxy = require('http-proxy');
const cors = require('cors');
const config = require('./config');
const https = require('https');
const devcert = require('devcert');

const app = express();
const port = 8080;

const proxy = httpProxy.createProxyServer();

app.use(cors());

// генерируем роуты на основе конфигурации
config.proxySettings.forEach(({target}) => {

    const regex = /^https?:\/\/[^\/]+(\S*)$/;
    const match = target.match(regex);
    const baseUrl = match[1];

    app.use(baseUrl, (req, res) => {
        proxy.web(req, res, {target, changeOrigin: true});
    });
});

// роут для корневого пути
app.use('/', (req, res) => {
    const referer = req.headers.referer;

    // проверяем, есть ли в Referer соответствующий URL из proxySettings
    if (referer) {
        const refererUrl = new URL(referer);
        const refererPathname = refererUrl.pathname;

        const proxySetting = config.proxySettings.find(({ target }) => {
            const regex = /^https?:\/\/[^\/]+(\S*)$/;
            const match = target.match(regex);
            const baseUrl = match[1];
            return refererPathname.startsWith(baseUrl);
        });

        if (proxySetting) {
            // если находим соответствующий URL, изменяем targetUrl
            targetUrl = proxySetting.target;
        }
    }

    // проксируем запрос
    proxy.web(req, res, { target: targetUrl, changeOrigin: true });
});

(async () => {
    const sslOptions = await devcert.certificateFor('localhost');
    https.createServer(sslOptions, app).listen(port, () => {
        console.log(`Proxy server listening at https://localhost:${port}`);
    });
})();
