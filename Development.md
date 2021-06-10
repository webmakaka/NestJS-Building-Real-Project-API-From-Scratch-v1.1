# [Oleksandr Kocherhin] NestJS - пишем API для реального проекта с нуля [RUS, 2021]

<br/>

## 01 Подготавливаем инструменты

**RealWorld API Spec:**  
https://github.com/gothinkster/realworld/tree/master/api

<br/>

<br/>

    $ npm install -g @nestjs/cli
    $ npm install -g typescript

<br/>

    $ cd app/server
    $ nest new .

[yarn]

    $ yarn run start

<br/>

http://localhost:3000/

<br/>

## 02 Модуль тегов

<br/>

### 004 Создаем модуль и контроллер тегов

    $ yarn run start:dev

http://localhost:3000/tags

<br/>

### 005 Создаем сервис для тегов

http://localhost:3000/tags

<br/>

### 006 Настраиваем абсолютные пути

Пропустил. Думаю, можно намного проще.

<br/>

### 007 Устанавливаем Postgres

Буду использовать базу с помощью docker.

<br/>

### 008 Конфигурируем базу данных

    $ yarn add typeorm
    $ yarn add @nestjs/typeorm
    $ yarn add pg

<br/>

### 009 Создаем сущность тега

<br/>

### 010 Начинаем работать с репозиторием тегов

<br/>

```
INSERT INTO tags (name) VALUES ('dragons');
INSERT INTO tags (name) VALUES ('coffee');
SELECT * FROM tags;
```

<br/>

http://localhost:3000/tags

<br/>

## 03 Модуль авторизации

<br/>

### 011 Знакомимся с миграциями

    $ yarn db:drop
    $ yarn db:create CreateTags
    $ yarn db:migrate

<br/>

```
SELECT * FROM migrations;
```

<br/>

### 012 Подготавливаем запрос для регистрации

```
// CREATE USER
$ curl \
    --header "Content-Type: application/json" \
    --request POST http://localhost:3000/users
```

<br/>

### 012 Подготавливаем запрос для регистрации

<br/>

### 013 Что такое DTO?

```
// CREATE USER
$ curl \
    --data '{
        "user": {
            "username": "marley",
            "email": "marley@example.com",
            "password": "pass123"}
    }' \
    --header "Content-Type: application/json" \
    --request POST http://localhost:3000/users \
    | python -m json.tool
```

<br/>

### 014 Создаем сущность пользователя

<br/>

    $ yarn add bcrypt

<br/>

    $ yarn db:create CreateUsers
    $ yarn db:migrate

<br/>

```
// CREATE USER
```

<br/>

**returns:**

```
{
    "bio": "",
    "email": "marley@example.com",
    "id": 1,
    "image": "",
    "password": "$2b$10$lxE257OTu1LWPSOkiGa3.OqZWkUb6gBlKiJRK1SL4euAasWYORmxC",
    "username": "marley"
}
```

<br/>

### 015 Генерируем JWT токен

<br/>

    $ yarn add jsonwebtoken
    $ yarn add -D @types/jsonwebtoken

<br/>

    $ yarn db:create AddUsernameToUsers
    $ yarn db:drop
    $ yarn db:migrate

<br/>

```
// CREATE USER
```

<br/>

**returns:**

```
{
    "user": {
        "bio": "",
        "email": "marley@example.com",
        "id": 1,
        "image": "",
        "password": "$2b$10$gGSVcQMM0ENYxhGOinnnze95Qg1iGOAHy1LwOkQAv4hMe5L3d.OkC",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtYXJsZXkiLCJlbWFpbCI6Im1hcmxleUBleGFtcGxlLmNvbSIsImlhdCI6MTYyMjk4NTYwMX0.ohzN4L5ggtgIiIFgQ9idMTGuv0hfHcTuVpTRx04_vCA",
        "username": "marley"
    }
}
```

<br/>

### 016 Знакомимся с валидацией

<br/>

    $ yarn add class-validator
    $ yarn add class-transformer

<br/>

```
// CREATE USER
```

<br/>

**returns:**

```
{
    "message": "Email or username are taken",
    "statusCode": 422
}
```

<br/>

### 017 Реализуем логин запрос

```
// LOGIN USER
$ curl \
    --data '{
        "user": {
            "email": "marley@example.com",
            "password": "pass123"}
    }' \
    --header "Content-Type: application/json" \
    --request POST http://localhost:3000/users/login \
    | python -m json.tool
```

<br/>

**returns:**

```
{
    "user": {
        "bio": "",
        "email": "marley@example.com",
        "id": 1,
        "image": "",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtYXJsZXkiLCJlbWFpbCI6Im1hcmxleUBleGFtcGxlLmNvbSIsImlhdCI6MTYyMzAzMzg2Nn0.99n8EpwQW8TZM0KP3gz85VY1lkCTaXboxUC7AM6AX4k",
        "username": "marley"
    }
}
```

<br/>

### 018 Middleware авторизации

```
$ export TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtYXJsZXkiLCJlbWFpbCI6Im1hcmxleUBleGFtcGxlLmNvbSIsImlhdCI6MTYyMzA0NDIyNX0.5cUoFz-R8b77gJVv60PaLu8-wmgLtwkfqOWXYQYfFpg
```

<br/>

```
// LOGIN USER
$ curl \
    --data '{
        "user": {
            "email": "marley@example.com",
            "password": "pass123"}
    }' \
    --header "Content-Type: application/json" \
    --request POST http://localhost:3000/users/login \
    | python -m json.tool
```

<br/>

### 019 Создаем декоратор для пользователя

<br/>

```
// GET CURRENT USER
$ curl \
    --header "Content-Type: application/json" \
    --header "Authorization: Token ${TOKEN}" \
    --request GET http://localhost:3000/user \
    | python -m json.tool
```

<br/>

### 020 Guard для авторизации

<br/>

### 021 Обновление текущего пользователя

```
// UPDATE CURRENT USER
$ curl \
    --data '{
        "user": {
            "email": "marley@example.com",
            "password": "pass123",
            "bio": "This is my BIO"}
    }' \
    --header "Content-Type: application/json" \
    --header "Authorization: Token ${TOKEN}" \
    --request PUT http://localhost:3000/user \
    | python -m json.tool
```

<br/>

## 04 Модуль статьи

<br/>

### 022 Создание модуля статьи

<br/>

    $ yarn db:create CreateArticles
    $ yarn db:drop
    $ yarn db:migrate

<br/>

### 023 Создание метода статьи (Продолжение)

<br/>

    $ yarn db:create AddRelationsBetweenArticleAndUser
    $ yarn db:migrate

<br/>

```
// CREATE ARTICLE
$ curl \
    --data '{
        "article": {
            "title": "How to train your dragon",
            "description": "Ever wonder how?",
            "body": "You have to believe",
            "tagList": ["reactjs", "angularjs", "dragons"]
        }
    }' \
    --header "Content-Type: application/json" \
    --header "Authorization: Token ${TOKEN}" \
    --request POST http://localhost:3000/articles \
    | python -m json.tool
```

<br/>

**returns:**

```
{
    "author": {
        "bio": "",
        "email": "marley@example.com",
        "id": 1,
        "image": "",
        "username": "marley"
    },
    "body": "You have to believe",
    "createdAt": "2021-06-08T01:03:13.388Z",
    "description": "Ever wonder how?",
    "favoritesCount": 0,
    "id": 1,
    "slug": "foo",
    "tagList": [
        "reactjs",
        "angularjs",
        "dragons"
    ],
    "title": "How to train your dragon",
    "updatedAt": "2021-06-08T01:03:13.388Z"
}
```

<br/>

### 024 Заканчиваем создание статьи

<br/>

    $ yarn add slugify

<br/>

**returns (slug):**

<br/>

```
{
    "article": {
        "author": {
            "bio": "",
            "email": "marley@example.com",
            "id": 1,
            "image": "",
            "username": "marley"
        },
        "body": "You have to believe",
        "createdAt": "2021-06-08T01:21:58.186Z",
        "description": "Ever wonder how?",
        "favoritesCount": 0,
        "id": 2,
        "slug": "how-to-train-your-dragon-17mw6c",
        "tagList": [
            "reactjs",
            "angularjs",
            "dragons"
        ],
        "title": "How to train your dragon",
        "updatedAt": "2021-06-08T01:21:58.186Z"
    }
}
```

<br/>

### 025 Реализуем получение статьи по слагу

```
// GET ARTICLE BY SLUG
$ curl \
    --header "Content-Type: application/json" \
    --request GET http://localhost:3000/articles/how-to-train-your-dragon-17mw6c \
    | python -m json.tool
```

<br/>

### 026 Имплементируем удаление статьи

```
// DELETE ARTICLE BY SLUG
$ curl \
    --header "Content-Type: application/json" \
    --header "Authorization: Token ${TOKEN}" \
    --request DELETE http://localhost:3000/articles/how-to-train-your-dragon-17mw6c \
    | python -m json.tool
```

<br/>

### 027 Создаем обновление статьи

```
// UPDATE ARTICLE
$ curl \
    --data '{
        "article": {
            "title": "Updated Title",
            "description": "Updated description",
            "body": "Updated body"
        }
    }' \
    --header "Content-Type: application/json" \
    --header "Authorization: Token ${TOKEN}" \
    --request PUT http://localhost:3000/articles/how-to-train-your-dragon-3xtce8 \
    | python -m json.tool
```

<br/>

**returns:**

```
{
    "article": {
        "author": {
            "bio": "",
            "email": "marley@example.com",
            "id": 1,
            "image": "",
            "username": "marley"
        },
        "body": "Updated body",
        "createdAt": "2021-06-08T02:27:21.691Z",
        "description": "Updated description",
        "favoritesCount": 0,
        "id": 3,
        "slug": "how-to-train-your-dragon-3xtce8",
        "tagList": [
            "reactjs",
            "angularjs",
            "dragons"
        ],
        "title": "Updated Title",
        "updatedAt": "2021-06-08T05:33:24.906Z"
    }
}
```

<br/>

### 028 Создаем фид

https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md

<br/>

```
// GET ALL ARTICLES
$ curl \
    --header "Content-Type: application/json" \
    --request GET http://localhost:3000/articles \
    | python -m json.tool
```

<br/>

```
// GET ALL ARTICLES WITH LIMIT AND OFFSET
$ curl \
    --header "Content-Type: application/json" \
    --request GET "http://localhost:3000/articles?limit=2&offset=0" \
    | python -m json.tool
```

<br/>

```
// GET ALL ARTICLES BY AUTHOR
$ curl \
    --header "Content-Type: application/json" \
    --request GET "http://localhost:3000/articles?author=marley" \
    | python -m json.tool
```

<br/>

```
// GET ALL ARTICLES WITH TAG
$ curl \
    --header "Content-Type: application/json" \
    --request GET "http://localhost:3000/articles?tag=dragons" \
    | python -m json.tool
```

<br/>

### 029 Реализуем лайк статей

<br/>

    $ yarn db:create AddFavoritesRelationsBetweenArticleAndUser
    $ yarn db:migrate

<br/>

```
// LIKE ARTICLE
$ curl \
    --header "Content-Type: application/json" \
    --header "Authorization: Token ${TOKEN}" \
    --request POST "http://localhost:3000/articles/how-to-train-your-dragon-3ptf9i/favorite" \
    | python -m json.tool
```

<br/>

**returns:**

Смотрим: "favoritesCount": 1,

```
{
    "article": {
        "author": {
            "bio": "",
            "email": "marley@example.com",
            "id": 1,
            "image": "",
            "username": "marley"
        },
        "body": "Updated body",
        "createdAt": "2021-06-08T02:27:21.691Z",
        "description": "Updated description",
        "favoritesCount": 1,
        "id": 3,
        "slug": "how-to-train-your-dragon-3xtce8",
        "tagList": [
            "reactjs",
            "angularjs",
            "dragons"
        ],
        "title": "Updated Title",
        "updatedAt": "2021-06-09T04:54:21.494Z"
    }
}
```

<br/>

### 030 Реализуем дизлайк статей

<br/>

```
// GET LIKED ARTICLE BY USER
$ curl \
    --header "Content-Type: application/json" \
    --request GET "http://localhost:3000/articles?favorited=marley" \
    | python -m json.tool
```

<br/>

```
// DISLIKE ARTICLE
$ curl \
    --header "Content-Type: application/json" \
    --header "Authorization: Token ${TOKEN}" \
    --request DELETE "http://localhost:3000/articles/how-to-train-your-dragon-3xtce8/favorite" \
    | python -m json.tool
```

<br/>

```
// GET ALL ARTICLES
$ curl \
    --header "Content-Type: application/json" \
    --header "Authorization: Token ${TOKEN}" \
    --request GET http://localhost:3000/articles \
    | python -m json.tool
```

<br/>

## 05 Модуль профиля

<br/>

### 031 Готовим сид данные для нашей базы

    $ yarn db:drop
    $ yarn db:migrate
    $ yarn db:seed

<br/>

### 032 Реализуем получение профиля

<br/>

```
// GET PROFILE
$ curl \
    --header "Content-Type: application/json" \
    --header "Authorization: Token ${TOKEN}" \
    --request GET "http://localhost:3000/profiles/marley" \
    | python -m json.tool
```

<br/>

**returns:**

```
{
    "profile": {
        "bio": "",
        "following": false,
        "id": 1,
        "image": "",
        "username": "marley"
    }
}
```

<br/>

### 033 Имплементируем фоллоу пользователей

Решили делать в ручную

    $ yarn db:create CreateFollows
    $ yarn db:migrate

<br/>

```
// FOLLOW USER
$ curl \
    --header "Content-Type: application/json" \
    --header "Authorization: Token ${TOKEN}" \
    --request POST "http://localhost:3000/profiles/webmakaka/follow" \
    | python -m json.tool
```

<br/>

**returns:**

```
{
    "profile": {
        "bio": "",
        "following": true,
        "id": 2,
        "image": "",
        "username": "webmakaka"
    }
}
```

<br/>

### 034 Реализуем анфоллоу пользователей

<br/>

```
// UNFOLLOW USER
$ curl \
    --header "Content-Type: application/json" \
    --header "Authorization: Token ${TOKEN}" \
    --request DELETE "http://localhost:3000/profiles/webmakaka/follow" \
    | python -m json.tool
```

<br/>

**returns:**

```
{
    "profile": {
        "bio": "",
        "following": false,
        "id": 2,
        "image": "",
        "username": "webmakaka"
    }
}

```

<br/>

### 035 Создаем фид текущего пользователя

<br/>

```
// LOGIN AS WEBMAKAKA
```

<br/>

```
// WEBMAKAKA CREATE A NEW POST
$ curl \
    --data '{
        "article": {
            "title": "WebMakaka Super Ape",
            "description": "WebMakaka a Long Story about Apes Planet",
            "body": "Super cinema i think",
            "tagList": ["monkeys", "animals", "cinema"]
        }
    }' \
    --header "Content-Type: application/json" \
    --header "Authorization: Token ${TOKEN}" \
    --request POST http://localhost:3000/articles \
    | python -m json.tool
```

```
// MARLEY FOLLOW WEBMAKAKA
```

<br/>

```
// MARLEY GET FEED
$ curl \
    --header "Content-Type: application/json" \
    --header "Authorization: Token ${TOKEN}" \
    --request GET "http://localhost:3000/articles/feed" \
    | python -m json.tool
```

<br/>

**returns:**

```
{
    "articles": [
        {
            "author": {
                "bio": "",
                "email": "webmakaka@example.com",
                "id": 2,
                "image": "",
                "username": "webmakaka"
            },
            "body": "Super cinema i think",
            "createdAt": "2021-06-10T02:37:59.373Z",
            "description": "WebMakaka a Long Story about Apes Planet",
            "favoritesCount": 0,
            "id": 3,
            "slug": "webmakaka-super-ape-h0qdmm",
            "tagList": [
                "monkeys",
                "animals",
                "cinema"
            ],
            "title": "WebMakaka Super Ape",
            "updatedAt": "2021-06-10T02:37:59.373Z"
        }
    ],
    "articlesCount": 1
}
```

<br/><br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
