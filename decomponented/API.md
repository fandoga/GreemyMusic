# Skypro.Music API

API для музыкального плеера, позволяет получает разные плейлисты с музыкой и управлять избранными треками пользователя.

Документация в swagger:
https://skypro-music-api.skyeng.tech/swagger/

## Пользователи и авторизация

- [Документация API «Пользователи и авторизация»](./docs/AuthAPI.md)

## Плейлисты и треки

Api для управления плейлистами пользователя и получения треков.

| Описание запроса                    | Тип запроса | Пример запроса                                                     |
| ----------------------------------- | ----------- | ------------------------------------------------------------------ |
| Получить все треки                  | GET         | https://skypro-music-api.skyeng.tech/catalog/track/all/            |
| Получить трек по id                 | GET         | https://skypro-music-api.skyeng.tech/catalog/track/<id\>           |
| Посмотреть подборки                 | GET         | https://skypro-music-api.skyeng.tech/catalog/selection/            |
| Посмотреть подборку по id           | GET         | https://skypro-music-api.skyeng.tech/catalog/selection/<id\>/      |
| Добавить трек в избранное по id \*  | POST        | https://skypro-music-api.skyeng.tech/catalog/track/<id\>/favorite/ |
| Удалить трек из избранного по id \* | DELETE      | https://skypro-music-api.skyeng.tech/catalog/track/<id\>/favorite/ |
| Получить все избранные треки \*     | GET         | https://skypro-music-api.skyeng.tech/catalog/track/favorite/all/   |

Запросы отмеченные \* требуют авторизацию.

## Подробнее про запросы с авторизацией

Некоторые API эндпоинты закрыты авторизацией.

Чтобы сделать авторизованный запрос, нужно передать в заголовке "Authorization" access токен пользователя.

Если не передать токен или передать "протухший" токен, то такие эндпоинты будут отвечать 401 кодом ответа.

Access токен можно получить в API "Пользователи и авторизация".

Пример запроса с авторизацией:

```js
// Сюда нужно подставить актуальный access токен, т.к. access токен живет только 200 секунд
const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkwOTcxMjcxLCJpYXQiOjE2OTA5NjAxMzEsImp0aSI6ImE4YzQ5NDNmOWNmNTRlZjI5NmFmNTMyOWUwODM4YWQ5IiwidXNlcl9pZCI6NzkyfQ.5n8YHTjsgAnYnc4gioyV1wPnxM2D16PS6c9kNhC-JoE";

fetch("https://skypro-music-api.skyeng.tech/catalog/track/favorite/all/", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
```
