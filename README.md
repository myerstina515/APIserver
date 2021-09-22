# APIserver

This is a multi use API server built with Node.js, Express.js, and utilizes a MongoDB database. Mongo URI is required to utilize API, which user can sign up for here:

[MongoDB](https://www.mongodb.com/)

## Created by: Tina Myers, Software Development Engineer

### Contact Tina

[email](mailto:myers.tina515@gmail.com)👩‍💻

[LinkedIn](https://www.linkedin.com/in/tinalmyers/)💻

[GitHub](https://github.com/myerstina515)

### Required .env variables:

```
PORT

MONGOOSE_URI
```

## Apps utilizing API

### Tedashi Trained client schema

schema is built with this object in mind

```
{
  name: {type: String, required: true},
  emailAddress: {type: String, required: false},
  newsletter: {type: String, required: false},
  phoneNumber: {type: String, required: false},
  trainingType:{type: String, required: false},
  injury: {type: String, required: false},
  goals: {type: String, required: false},
  message: {type: String, required: false},
  contacted: {type: String, require: false},
  routedFrom: {type: String, require: false}
}
```