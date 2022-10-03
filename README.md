# CAPS-delivery-service

## Code 401d48 lab 11

## Author: Robert Ball

---

### Problem Domain

* In this first phase, our goal is to setup a pool of events and handler functions, with the intent being to refactor parts of the system throughout the week, but keep the handlers themselves largely the same. The task of “delivering a package” doesn’t change (the handler), even if the mechanism for triggering that task (the event) does.

<!-- Deployed production server: [Heroku - rb-ac lab09 API](https://rb-ac-lab-09.herokuapp.com/) -->

---
Requirements:

* The following user/developer stories detail the major functionality for this phase of the project.

  * As a vendor, I want to alert the system when I have a package to be picked up.
  * As a driver, I want to be notified when there is a package to be delivered.
  * As a driver, I want to alert the system when I have picked up a package and it is in transit.
  * As a driver, I want to alert the system when a package has been delivered.
  * As a vendor, I want to be notified when my package has been delivered.
* And as developers, here are some of the development stories that are relevant to the above.

  * As a developer, I want to use industry standards for managing the state of each package.
  * As a developer, I want to create an event driven system so that I can write code that happens in response to events, in real time.

---

Documentation:

![UML lab11](src/assets/lab11uml.jpg)

Dependencies

```JSON
{
  "base-64": "^1.0.0",
  "bcrypt": "^5.0.1",
  "cors": "^2.8.5",
  "dotenv": "^16.0.2",
  "eslint": "^8.24.0",
  "express": "^4.18.1",
  "jest": "^29.0.3",
  "jsonwebtoken": "^8.5.1",
  "morgan": "^1.10.0",
  "nodemon": "^2.0.20",
  "pg": "^8.8.0",
  "sequelize": "^6.23.1",
  "sequelize-cli": "^6.4.1",
  "sqlite3": "^5.1.1",
  "supertest": "^6.2.4"
}
```

Setup

1. Create repo or fork this repo
2. Add README
3. Add .gitignore for Node
4. Add the license of your choice
5. Clone repo to your local system
6. with the repo open in your editor of choice, run:

```code
npm init -y
install dependencies
```
