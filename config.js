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

