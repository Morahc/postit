# Postit Api

Postit (or Post-it) is a simple social media app. Post-it allows you to post
text on a single post-it. A post-it is a single post on the post-it app,
just like a tweet. Other users can reply to a post-it. Replying to a post-it is like adding a comment
to a post (post-it).

## Technologies Used

- Node js
- Express
- Typescript
- Mongoose
- Joi
- Bcrypt
- Jsonweboken

## Get Started

- Clone or download this repository.

- Run `yarn` or `yarn install` to install dependencies.

- Set up your .env in root according to the .env example file

- Run `yarn dev` to run in development mode.

- Run `yarn build` to build for production.
  
- **[Live URL](https://learnable-standard-test.onrender.com/api/v1/docs)**

## Data Schema

![Entity Relationship Diagram](/dbdesign.png)

### Soft Delete Implementation

Database resources have an isDeleted boolean value.
If true resource is not returned on request.
