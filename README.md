# CookBook

## Live app: https://cookbook-app.now.sh/

### What is CookBook?

CookBook was built to make your life easier in the kitchen. Create a profile and have access to thousands of other recipes from people just like you. Save recipes you've tried and loved, or save them to try later. Post your own recipe and share it with the world. Have your cookbook, and everyone else's, right in your hand.

#### Technologies used:

HTML, CSS, JavaScript, React, Node, Express, PostgreSQL

#### Api Documentation

##### Overview - /api

```
.
├── /user
│   └── GET
│     ├── /
│     ├── /:user_id
│
│   └── POST
│     ├── /
│     ├── /login
│
│   └── DELETE
│     ├── /:user_id
│
│   └── PATCH
│     ├── /:user_id
│
├── /recipe
│   └── GET
│     ├── /
│     ├── /:recipe_id
│
│   └── POST
│     ├── /
│
│   └── DELETE
│     ├── /:recipe_id
│
│   └── PATCH
│     ├── /:recipe_id
│
├── /savedrecipe
│   └── GET
│     ├── /
│     ├── /:user_saved
│
│   └── POST
│     ├── /
│     ├── /:user_saved
│
│   └── DELETE
│     ├── /:recipe_id/:user_saved
```

##### User Endpoints - /api/user

###### GET /

Gets all users in the database

```javascript
//req.body - none
//res.body
[
  {
    id: Number,
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    profilepicture: String,
    profilebio: String,
  },
];
```

###### POST /

Create a new user

```javascript
//req.body
  {
    firstname: String,
    lastname: String,
    username, String,
    password: String,
    profilepicture: String,
    profilebio: String
  }
//res.body
  {
    id: Number,
    firstname: String,
    lastname: String,
    username, String,
    password: String,
    profilepicture: String,
    profilebio: String
  }
```

###### POST /login

Authenticate user at log in

```javascript
//req.body
  {
    username: String,
    password: String
  }
//res.body {
  "OK"
}
```

###### GET /:user_id

Gets a user's info by their user ID

```javascript
//req.params
  {
    user_id: Number
  }
//req.body - none
//res.body
  {
    id: Number,
    firstname: String,
    lastname: String,
    username, String,
    password: String,
    profilepicture: String,
    profilebio: String
  }
```

###### DELETE /:user_id

Delete a user from the database

```javascript
//req.params
{
  user_id: Number;
}
//req.body - none
//res.body - none
```

###### PATCH /:user_id

Edit a user's profile info

```javascript
//req.params
  {
    user_id: Number
  }
//req.body
  {
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    profilepicture: String,
    profilebio: String
  }
//res.body - none
```

##### Recipe Endpoints - /api/recipe

###### GET /

```javascript
//req.body - none
//res.body
[
  {
    id: Number,
    username: String,
    recipename: String,
    recipephoto: String,
    ingredients: Array,
    steps: Array,
  },
];
```

###### POST /

Create a new recipe

```javascript
//req.body
  {
    username: String,
    recipename: String,
    recipephoto: String,
    ingredients: Array,
    steps: Array
  }
//res.body
  {
    id: Number,
    username: String,
    recipename: String,
    recipephoto: String,
    ingredients: Array,
    steps: Array
  }
```

###### GET /:recipe_id

Get info for a specific recipe

```javascript
//req.params
  {
    recipe_id: Number
  }
//req.body - none
//res.body
  {
    id: Number,
    username: String,
    recipename: String,
    recipephoto: String,
    ingredients: Array,
    steps: Array
  }
```

###### DELETE /:recipe_id

Delete a recipe

```javascript
//req.params
{
  recipe_id: Number;
}
//req.body - none
//res.body - none
```

###### PATCH /:recipe_id

Edit a recipe's info

```javascript
//req.params
  {
    recipe_id: Number
  }
//req.body
  {
    recipename: String,
    recipephoto: String,
    ingredients: Array,
    instructions: Array
  }
```

##### Saved Recipe Endpoints - /api/savedrecipe

###### GET /

Retrieve all recipes saved by users

```javascript
//req.body - none
//res.body
[
  {
    recipe_id: Number,
    user_saved: String,
  },
];
```

###### POST /

User saves a recipe to their profile

```javascript
//req.body
  {
    recipe_id: Number,
    user_saved: String
  }
//res.body
  {
    recipe_id: Number,
    user_saved: String
  }
```

###### GET /:user_saved

Get all recipes a user has saved to their profile

```javascript
//req.params
{
  user_saved: String;
}
//req.body - none
//res.body
[
  {
    recipe_id: Number,
    user_saved: String,
  },
];
```

###### DELETE /:recipe_id/:user_saved

Unsave a recipe

```javascript
//req.params
  {
    recipe_id: Number,
    user_saved: String
  }
//req.body - none;
//res.body - none
```

#### Screenshots

<img width="651" alt="Screenshot of Home Page" src="https://user-images.githubusercontent.com/52179940/88744305-f3ea6f80-d114-11ea-88a1-4e704b83fa32.png">
Home Page

<img width="653" alt="Log In Screen" src="https://user-images.githubusercontent.com/52179940/88744359-18dee280-d115-11ea-8c78-07203289140f.png">
Log In

<img width="1263" alt="Create Account Screen" src="https://user-images.githubusercontent.com/52179940/88744361-1a100f80-d115-11ea-8175-513fc50ccc8e.png">
Create Account

<img width="782" alt="Activity Feed" src="https://user-images.githubusercontent.com/52179940/88744386-2eeca300-d115-11ea-8267-424af8b7148f.png">
Activity Feed

<img width="782" alt="Screen Shot 2020-07-28 at 7 43 27 PM" src="https://user-images.githubusercontent.com/52179940/88744399-3c099200-d115-11ea-9879-94953d9e6116.png">
<img width="780" alt="Screen Shot 2020-07-28 at 7 43 37 PM" src="https://user-images.githubusercontent.com/52179940/88744409-4592fa00-d115-11ea-8407-2562ec23b467.png">
Test User Profile

<img width="783" alt="Screen Shot 2020-07-28 at 7 43 56 PM" src="https://user-images.githubusercontent.com/52179940/88744429-55aad980-d115-11ea-9dae-ec7e9902cbae.png">
<img width="785" alt="Screen Shot 2020-07-28 at 7 44 02 PM" src="https://user-images.githubusercontent.com/52179940/88744442-60656e80-d115-11ea-9926-502a19da580b.png">
View User Recipe

<img width="740" alt="Screen Shot 2020-07-28 at 8 01 00 PM" src="https://user-images.githubusercontent.com/52179940/88744475-770bc580-d115-11ea-8d15-0012c631a1cc.png">
Add New Recipe
