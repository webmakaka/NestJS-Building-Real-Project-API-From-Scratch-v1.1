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

<br/><br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
