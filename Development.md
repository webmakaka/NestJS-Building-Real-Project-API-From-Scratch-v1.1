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

<br/><br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
