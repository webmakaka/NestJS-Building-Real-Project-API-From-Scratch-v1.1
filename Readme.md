# [Oleksandr Kocherhin] NestJS - пишем API для реального проекта с нуля [RUS, 2021]

```
$ sudo apt install -y jq
```

<br/>

### Как запустить

    $ cd server
    $ yarn install
    $ docker-compose up
    $ yarn start:dev
    $ yarn db:migrate
    $ yarn db:seed

<br/>

```
// LOGIN USER
$ AUTH_TOKEN=$(curl \
    --data '{
        "user": {
            "email": "marley@example.com",
            "password": "pass123"}
    }' \
    --header "Content-Type: application/json" \
    --request POST http://localhost:3000/users/login \
    | jq -r '.user.token' )
```

<br/>

```
$ echo ${AUTH_TOKEN}
```


<br/>

```
// GET ALL ARTICLES
$ curl \
    --header "Content-Type: application/json" \
    --header "Authorization: Token ${AUTH_TOKEN}" \
    --request GET http://localhost:3000/articles \
    | jq
```

<br/>

**returns:**

```
{
    "articles": [
        {
            "author": {
                "bio": "",
                "email": "marley@example.com",
                "id": 1,
                "image": "",
                "username": "marley"
            },
            "body": "first article body",
            "createdAt": "2021-06-09T23:29:02.612Z",
            "description": "first article desc",
            "favorited": false,
            "favoritesCount": 0,
            "id": 1,
            "slug": "first-article",
            "tagList": [
                "coffee",
                " dragons"
            ],
            "title": "First article",
            "updatedAt": "2021-06-09T23:29:02.612Z"
        },
        {
            "author": {
                "bio": "",
                "email": "marley@example.com",
                "id": 1,
                "image": "",
                "username": "marley"
            },
            "body": "second article body",
            "createdAt": "2021-06-09T23:29:02.612Z",
            "description": "second article desc",
            "favorited": false,
            "favoritesCount": 0,
            "id": 2,
            "slug": "second-article",
            "tagList": [
                "coffee",
                " dragons"
            ],
            "title": "Second article",
            "updatedAt": "2021-06-09T23:29:02.612Z"
        }
    ],
    "articlesCount": 2
}

```

<br/>

Если подключить проект на angular:  
https://github.com/webmakaka/Angular-and-NgRx-Building-Real-Project-From-Scratch

<br/>

![Application](/img/pic01.png?raw=true)

<br/>

![Application](/img/pic02.png?raw=true)

<br/>

![Application](/img/pic03.png?raw=true)

<br/>

### [Development](./Development.md)

<br/><br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
