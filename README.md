
# Frontend MultiServer

Данный проект представляет собой прокси-сервер на основе Node.js и библиотеки http-proxy, который позволяет перенаправлять HTTP-запросы на различные адреса в зависимости от URL, на который был отправлен запрос.

## Установка
1. Клонируйте репозиторий на свой компьютер:

```
git clone https://github.com/kozyaba/FrontendMultiServer.git
```

2. Установите зависимости:

```
npm install
```

3. Запустите сервер:
```
node server.js
```

## Конфигурация
В файле ```config.js``` можно задать список адресов,
на которые должны быть перенаправлены запросы. 
Каждый адрес должен быть описан в виде объекта 
со свойством target, которое содержит адрес, 
на который будет отправлен запрос.

Пример:
```javascript
module.exports = {
    proxySettings: [
        {
            target: "http://localhost:3000/admin/",
        },
        {
            target: "http://localhost:5173/profile/",
        },
        // Добавьте дополнительные настройки прокси по мере необходимости
    ],
};
```

## Использование
После запуска сервера можно отправлять HTTP-запросы на любой адрес, на котором запущен сервер. Проксирование запросов происходит автоматически в зависимости от URL, на который был отправлен запрос.

Например, если в config.js заданы следующие настройки:
```javascript
module.exports = {
    proxySettings: [
        {
            target: "http://localhost:3000/admin/",
        },
        {
            target: "http://localhost:5173/profile/",
        },
    ],
};
```

то запросы по адресу \
http://localhost:8080/admin/ \
будут перенаправлены на \
http://localhost:3000/admin/, \
а запросы по адресу \
http://localhost:8080/profile/ \
будут перенаправлены на \
http://localhost:5173/profile/.

Если адрес, на который был отправлен запрос,
не соответствует ни одному из адресов, 
заданных в ```config.js```, то запрос будет перенаправлен 
на тот же адрес, но уже без изменений.



