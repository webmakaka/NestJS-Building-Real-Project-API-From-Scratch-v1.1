# [Oleksandr Kocherhin] NestJS - пишем API для реального проекта с нуля [RUS, 2021]

<br/>

### Как запустить

    $ cd server
    $ yarn install
    $ docker-compose up
    $ yarn db:migrate
    $ yarn db:seed

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

```
$ export TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtYXJsZXkiLCJlbWFpbCI6Im1hcmxleUBleGFtcGxlLmNvbSIsImlhdCI6MTYyMzI5MjIxOH0.BS5JqBWn46QqAhFBAh7DEcfm9HL48s3jRp3dm08Gtk0
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

### [Development](./Development.md)

<br/><br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
