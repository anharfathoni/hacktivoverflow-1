# hacktivoverflow

LINK DEPLOY
<br>
[http://overflow.anharfathoni.site/](http://overflow.anharfathoni.site/)

<br><br><br>

# REST-API 🔥
***
## Register
***
sign up with new user info
1. URL  `http://localhost:3000/register`
2. Method `POST`
3. URL Param `not required`
4. Data Param
```javascript
{
	"name": "anhar",
	"email": "anhar@mail.com",
	"password": "1234",
}

```
5. Success Response
```javascript
CODE : 201 (Created)

CONTENT :
{
  message: "success register, please login to continue"
}
```
6. Error Response
```javascript
CODE: 400

CONTENT:
{
  message: "error message"
}
```
***
## Sign In Using Email
***
sign in while get an access token based on credentials
1. URL  `localhost:3000/login`
2. Method `POST`
3. URL Param `not required`
4. Data Param
```javascript
{
	"email": "yourmail@mail.com",
	"password": "yourpassword",
}

```
5. Success Response
```javascript
CODE : 200

CONTENT :
{
  message: "success login"
}
```
6. Error Response
```javascript
CODE: 400

CONTENT:
{
  message: 'error message'
}
```

***
## Get All Question
***

1. URL  `http://localhost:3000/questions`
2. Method `GET`
3. URL Param `not required`
4. Data Param
```javascript


```
5. Success Response
```javascript
CODE : 200

CONTENT :
{
    "questions": [
        {
            "voteUp": [],
            "voteDown": [],
            "createdAt": "2019-01-30T16:26:58.899Z",
            "updatedAt": "2019-01-30T16:30:17.178Z",
            "tags": [
                "aaa"
            ],
            "answerId": [],
            "_id": "5c51d0d11db72829dc98791b",
            "title": "tanya dong ?",
            "body": "SAS",
            "userId": {},
            "__v": 0
        }
    ]
}
```
6. Error Response
```javascript
CODE: 400

CONTENT:
{
  message: 'error message'
}
```

***
## Post Question
***

1. URL  `http://localhost:3000/questions`
2. Method `POST`
3. URL Param `not required`
4. Data Param
```javascript
headers: {
  token: <token>
},

data: {
  title: '',
  body: '',
  tags: []
}

```
5. Success Response
```javascript
CODE : 200

CONTENT :
{
    "question": {
        "voteUp": [],
        "voteDown": [],
        "createdAt": "2019-01-30T16:58:28.062Z",
        "updatedAt": "2019-01-30T16:58:28.062Z",
        "tags": [
            ""
        ],
        "answerId": [],
        "_id": "5c51d7ebf6c64434ef24c893",
        "title": "title1",
        "body": "body1",
        "userId": { ... },
        "__v": 0
    },
    "message": "success post question"
}
```
6. Error Response
```javascript
CODE: 400

CONTENT:
{
  message: 'error message'
}
```


***
## Get Answer
***

1. URL  `http://localhost:3000/answers/`
2. Method `POST`
3. URL Param `:questionId`
4. Data Param
```javascript
headers: {
  token: <token>
}
```
5. Success Response
```javascript
CODE : 200

CONTENT :
{
  answer: [{
    content: '',
    userId: {},
    questionId: {},
    voteUp: [],
    voteDown: [],
    createdAt: Date,
    updatedAt: Date
  }]
}
```
6. Error Response
```javascript
CODE: 400

CONTENT:
{
  message: 'error message'
}
```

***
## Post Answer
***

1. URL  `http://localhost:3000/answers/`
2. Method `POST`
3. URL Param `:questionId`
4. Data Param
```javascript
headers: {
  token: <token>
},
data: {
  content: 'your answer'
}
```
5. Success Response
```javascript
CODE : 200

CONTENT :
{
    "answer": {
        "voteUp": [],
        "voteDown": [],
        "createdAt": "2019-01-30T16:58:28.067Z",
        "updatedAt": "2019-01-30T16:58:28.067Z",
        "_id": "5c51d99bf6c64434ef24c894",
        "content": "your answer",
        "questionId": "5c51d7ebf6c64434ef24c893",
        "userId": "5c51d7ccf6c64434ef24c892",
        "__v": 0
    },
    "message": "success post answer"
}
```
6. Error Response
```javascript
CODE: 400

CONTENT:
{
  message: 'error message'
}
```