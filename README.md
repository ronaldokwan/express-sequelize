# Project: Express-Sequelize

## End-point: Home

### Method: GET

> ```
> {{BaseUrl}}/
> ```

### Response: 200

```json
{
  "message": "Home"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Register

### Method: POST

> ```
> {{BaseUrl}}/register
> ```

### Body (**raw**)

```json
{
  "name": "user3",
  "age": 30,
  "email": "user@exampleCom",
  "password": "234567"
}
```

### Response: 201

```json
{
  "id": 3,
  "name": "user3",
  "age": 30,
  "email": "user3@example.com"
}
```

### Response: 400

```json
{
  "message": "Name is required"
}
```

### Response: 400

```json
{
  "message": "Age is required"
}
```

### Response: 400

```json
{
  "message": "Email is required"
}
```

### Response: 400

```json
{
  "message": "Password is required"
}
```

### Response: 400

```json
{
  "message": "Password at least 6 characters"
}
```

### Response: 401

```json
{
  "message": "Email already exist"
}
```

### Response: 400

```json
{
  "message": "Email format is not correct"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Login

### Method: POST

> ```
> {{BaseUrl}}/login
> ```

### Body (**raw**)

```json
{
  "email": "user1@example.com",
  "password": "123456"
}
```

### Response: 200

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE2MzcxMzIyfQ.Uoru0UmmP2DMnxZ7dyr-0ycOrRwxQwSVUCKiX6CCduI"
}
```

### Response: 200

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzE2MzcxMzU4fQ.GeISJVZjxmtJTXvhurNh9Mm_tyqC2qzJaQD2w_UQbic"
}
```

### Response: 400

```json
{
  "message": "Email is required"
}
```

### Response: 400

```json
{
  "message": "Password is required"
}
```

### Response: 401

```json
{
  "message": "Invalid email/password"
}
```

### Response: 401

```json
{
  "message": "Invalid email/password"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Add Note

### Method: POST

> ```
> {{BaseUrl}}/note
> ```

### Body (**raw**)

```json
{
  "title": "test_1",
  "description": "test_1"
}
```

### 🔑 Authentication bearer

| Param | value              | Type   |
| ----- | ------------------ | ------ |
| token | {{access_token_2}} | string |

### Response: 201

```json
{
  "message": "Note has been added"
}
```

### Response: 400

```json
{
  "message": "Title is required"
}
```

### Response: 401

```json
{
  "message": "Invalid token"
}
```

### Response: 401

```json
{
  "message": "Invalid token"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get Note

### Method: GET

> ```
> {{BaseUrl}}/note
> ```

### 🔑 Authentication bearer

| Param | value              | Type   |
| ----- | ------------------ | ------ |
| token | {{access_token_1}} | string |

### Response: 200

```json
[
  {
    "id": 1,
    "title": "Important Meeting Notes",
    "description": "Meeting with the team on [DATE]. Discussed project progress, deadlines, and next steps. Key takeaways: [list of key points]",
    "userId": 1,
    "createdAt": "2024-05-22T09:47:59.408Z",
    "updatedAt": "2024-05-22T09:47:59.408Z"
  },
  {
    "id": 2,
    "title": "Grocery List",
    "description": "* Milk\n* Bread\n* Eggs\n* Fruits and vegetables",
    "userId": 1,
    "createdAt": "2024-05-22T09:47:59.408Z",
    "updatedAt": "2024-05-22T09:47:59.408Z"
  },
  {
    "id": 3,
    "title": "Project Ideas",
    "description": "Brainstorming new project ideas. Some potential options include: [list of ideas]",
    "userId": 1,
    "createdAt": "2024-05-22T09:47:59.408Z",
    "updatedAt": "2024-05-22T09:47:59.408Z"
  },
  {
    "id": 7,
    "title": "test_1",
    "description": "test_1",
    "userId": 1,
    "createdAt": "2024-05-22T09:52:01.629Z",
    "updatedAt": "2024-05-22T09:52:01.629Z"
  }
]
```

### Response: 200

```json
[
  {
    "id": 4,
    "title": "Weekend Plans",
    "description": "Planning activities for the upcoming weekend. Considering [list of options]",
    "userId": 2,
    "createdAt": "2024-05-22T09:47:59.408Z",
    "updatedAt": "2024-05-22T09:47:59.408Z"
  },
  {
    "id": 5,
    "title": "Movie Recommendations",
    "description": "A list of movies to watch: [list of movie titles]",
    "userId": 2,
    "createdAt": "2024-05-22T09:47:59.408Z",
    "updatedAt": "2024-05-22T09:47:59.408Z"
  },
  {
    "id": 6,
    "title": "Book Wishlist",
    "description": "Books I'd like to read in the near future: [list of book titles]",
    "userId": 2,
    "createdAt": "2024-05-22T09:47:59.408Z",
    "updatedAt": "2024-05-22T09:47:59.408Z"
  }
]
```

### Response: 401

```json
{
  "message": "Invalid token"
}
```

### Response: 401

```json
{
  "message": "Invalid token"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Edit Description

### Method: PATCH

> ```
> {{BaseUrl}}/edit-description/:id
> ```

### Body (**raw**)

```json
{
  "description": "test3"
}
```

### 🔑 Authentication bearer

| Param | value              | Type   |
| ----- | ------------------ | ------ |
| token | {{access_token_1}} | string |

### Response: 200

```json
{
  "message": "Note has been updated"
}
```

### Response: 401

```json
{
  "message": "Invalid token"
}
```

### Response: 401

```json
{
  "message": "Invalid token"
}
```

### Response: 403

```json
{
  "message": "You're not authorized"
}
```

### Response: 404

```json
{
  "message": "Note not found"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Edit Note

### Method: PUT

> ```
> {{BaseUrl}}/edit-note/:id
> ```

### Body (**raw**)

```json
{
  "description": "test4"
}
```

### 🔑 Authentication bearer

| Param | value              | Type   |
| ----- | ------------------ | ------ |
| token | {{access_token_1}} | string |

### Response: 200

```json
{
  "message": "Note has been updated"
}
```

### Response: 400

```json
{
  "message": "Title is required"
}
```

### Response: 401

```json
{
  "message": "Invalid token"
}
```

### Response: 401

```json
{
  "message": "Invalid token"
}
```

### Response: 403

```json
{
  "message": "You're not authorized"
}
```

### Response: 404

```json
{
  "message": "Note not found"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Delete Note

### Method: DELETE

> ```
> {{BaseUrl}}/delete-note/:id
> ```

### Body (**raw**)

```json

```

### 🔑 Authentication bearer

| Param | value              | Type   |
| ----- | ------------------ | ------ |
| token | {{access_token_1}} | string |

### Response: 200

```json
{
  "message": "Note has been deleted"
}
```

### Response: 401

```json
{
  "message": "Invalid token"
}
```

### Response: 401

```json
{
  "message": "Invalid token"
}
```

### Response: 403

```json
{
  "message": "You're not authorized"
}
```

### Response: 404

```json
{
  "message": "Note not found"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

---

Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
