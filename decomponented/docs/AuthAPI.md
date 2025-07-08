# Skypro.Music API Авторизции

Api для управления пользователями и авторизацией.

# Коротко

| Описание запроса   | Тип запроса | Пример запроса                                           |
| ------------------ | ----------- | -------------------------------------------------------- |
| Зарегистрироваться | POST        | https://skypro-music-api.skyeng.tech/user/signup/        |
| Войти              | POST        | https://skypro-music-api.skyeng.tech/user/login/         |
| Получить токен     | POST        | https://skypro-music-api.skyeng.tech/user/token/         |
| Обновить токен     | POST        | https://skypro-music-api.skyeng.tech/user/token/refresh/ |

# Подробно

## Зарегистрироваться

Адрес: https://skypro-music-api.skyeng.tech/user/signup/

Метод: POST

Создает нового пользователя в системе. В теле запроса принимает объект пользователя в формате JSON. Обязательные поля для нового пользвателя `email`, `password` и `username`.

Пример запроса:

```js
fetch("https://skypro-music-api.skyeng.tech/user/signup/", {
  method: "POST",
  body: JSON.stringify({
    email: "gleb@fokin.ru",
    password: "Aa12345!!",
    username: "gleb@fokin.ru",
  }),
  headers: {
    // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
    "content-type": "application/json",
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
```

#### 201 ответ

Пользователь успешно зарегистрирован, в теле ответа будет объект созданного пользователя:

```json
{
  "id": 666,
  "username": "gleb@fokin.ru",
  "first_name": "",
  "last_name": "",
  "email": "gleb@fokin.ru"
}
```

#### 400 ответ

Не получилось зарегистрировать пользователя с указанными данными, в теле ответа будет объект объект с ошибками регистрации:

```json
{
  "username": ["Пользователь с таким именем уже существует."],
  "email": ["Пользователь с таким адрес электронной почты уже существует."],
  "password": [
    "Введённый пароль слишком короткий. Он должен содержать как минимум 8 символов.",
    "Введённый пароль слишком широко распространён.",
    "Введённый пароль состоит только из цифр."
  ]
}
```

#### 500 ответ

Сервер сломался

## Войти

Адрес: https://skypro-music-api.skyeng.tech/user/login/

Метод: POST

Возвращает данные пользователя по почте и паролю. В теле запроса принимает объект пользователя в формате JSON, обязательные поля `email` и `password`.
Пример запроса:

```js
fetch("https://skypro-music-api.skyeng.tech/user/login/", {
  method: "POST",
  body: JSON.stringify({
    email: "gleb@fokin.ru",
    password: "gleb@fokin.ru",
  }),
  headers: {
    // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
    "content-type": "application/json",
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
```

#### 200 ответ

Пользователь успешно авторизован, в теле ответа будет объект авторизованного пользователя:

```json
{
  "id": 666,
  "username": "gleb@fokin.ru",
  "first_name": "",
  "last_name": "",
  "email": "gleb@fokin.ru"
}
```

#### 400 ответ

Запрос составлен некорректно, например не передан пароль, в теле ответа будет расшифровка проблем, такой же как в 400 ответе при регистрации.

#### 401 ответ

Запрос составлен корректно, но не получилось авторизовать пользователя, в теле ответа будет объект с причиной:

```json
{ "detail": "Пользователь с таким email или паролем не найден" }
```

#### 500 ответ

Сервер сломался

## Получить токен

Адрес: https://skypro-music-api.skyeng.tech/user/token/

Метод: POST

Эндпоинт создает _Access_ и _Refresh_ [JWT](https://jwt.io/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkwOTYwNDMxLCJpYXQiOjE2OTA5NjAxMzEsImp0aSI6ImE4NDAwZjRkNWUzMTQ4NGJiMzE4YzUzMjE3Y2NhNWZmIiwidXNlcl9pZCI6NzkyfQ.SfvLYWbz72DQqWK7SyF4Yx9Zxx8hGsNxHEcwOU0RTk4) токены для пользователя по email и паролю.

_Access_ токен нужен для того чтобы делать авторизованные запросы в апи (например запрос на добавление в "избранные треки"). Access токеном можно пользоваться 200 секунд, потом он "протухает".

_Refresh_ токен не протухает со временем, но может протухнуть если пользователь сменит пароль или нажмет кнопку "выйти на всех устройствах".

Новых _Access_ токен можно получить двумя способами

- (рекомендуемый) Сделать запрос на эндпоинт "Обновить токен", для этого потребуется _Refresh_ токен
- (нерекомендуемый из-за плохого UX и проблем с безопасностью) Сделать повторный запрос на этот эндпоинт, для этого потребуется логин и пароль пользователя

Пример запроса:

```js
fetch("https://skypro-music-api.skyeng.tech/user/token/", {
  method: "POST",
  body: JSON.stringify({
    email: "gleb@fokin.ru",
    password: "gleb@fokin.ru",
  }),
  headers: {
    // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
    "content-type": "application/json",
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
```

#### 200 ответ

Логин и пароль верные, сервер возвращает пару access и refresh токенов:

```json
{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY5MTA0NjUzMSwiaWF0IjoxNjkwOTYwMTMxLCJqdGkiOiI2YTFhODg4Zjg5NjY0NjgyYTBmYWYyNjk4ZjZiNjViZSIsInVzZXJfaWQiOjc5Mn0.idHYiVKZqSxPCpNIvYpFgEs6nRTJ3FuPS60RAKV8XC8",
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkwOTYwNDMxLCJpYXQiOjE2OTA5NjAxMzEsImp0aSI6ImE4NDAwZjRkNWUzMTQ4NGJiMzE4YzUzMjE3Y2NhNWZmIiwidXNlcl9pZCI6NzkyfQ.SfvLYWbz72DQqWK7SyF4Yx9Zxx8hGsNxHEcwOU0RTk4"
}
```

#### 400, 401 и 500 ответы

Такие же как в эндпоинте "Войти"

## Обновить токен

Адрес: https://skypro-music-api.skyeng.tech/user/token/refresh/

Метод: POST

Принимает refresh токен, возвращает "живой" acces токен.

Пример запроса:

```js
fetch("https://skypro-music-api.skyeng.tech/user/token/refresh/", {
  method: "POST",
  body: JSON.stringify({
    refresh:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY5MTA0NjUzMSwiaWF0IjoxNjkwOTYwMTMxLCJqdGkiOiI2YTFhODg4Zjg5NjY0NjgyYTBmYWYyNjk4ZjZiNjViZSIsInVzZXJfaWQiOjc5Mn0.idHYiVKZqSxPCpNIvYpFgEs6nRTJ3FuPS60RAKV8XC8",
  }),
  headers: {
    // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
    "content-type": "application/json",
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
```

#### 200 ответ

Refresh токен валидный, возвращает новый access токен

```json
{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkwOTcwNzcwLCJpYXQiOjE2OTA5NjAxMzEsImp0aSI6IjcxZjMyZjc5ZGRiMjRhNDE4MGQ5OGVjZTgzMWRkMmYyIiwidXNlcl9pZCI6NzkyfQ.E9SdHw1Aui5HkBIWmO_H0Ibv1-MOgqElLy-BCRiYrrU"
}
```

#### 401 ответ

Refresh токен невалидный, возвращает объект с ошибкой

```json
{
  "detail": "Токен недействителен или просрочен",
  "code": "token_not_valid"
}
```

#### 400 ответ

В теле запроса не передан refresh токен

#### 500 ответ

Сервер сломался
