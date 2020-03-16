# 🍽️ The Johnson Family Cookbook 🍽️
A web and mobile app for all of my family's recipes. 

## 🥞 Stack

### Front End
- React & React Native
  - (One of the primary goals of this project is to practice sharing as much logic between both Front Ends as possible)
  - Redux
- Apollo Client
- Sass
  - CSS Modules

### Back End
- Node.js
- Express.js
- GraphQL

### Principles
- Test Driven Development
  - Jest
  - Cypress

## 🥅 Goals
### Core
- Searchable database of recipes
  - Sort by category
  - Rating system
- User profiles
  - Two factor authentication
  - Persistent login token
  - Shareable favorites
  - Ability to add new recipes (pending admin approval)
- Recipe pages
  - Comments
  - Ability to add personal changes/ versions
- Admin roles
  - Ability to approve new recipes
- Theme
  - Light/ Dark

### Stretch
- Ability to generate shopping cart for ingredients
- Holiday Theme/ Suggested Recipes
- Connect account to Facebook/ Instagram/ Twitter and share to social media directly from app
- Suggest favorite recipes that haven't been used after X amount of time
- Suggest recipes based on time of day
- Build menu plans with multiple recipes
- Direct message system

## 🗺️ Roadmap
- v0.0 Set up environment (CircleCI, ESLint, Cypress, Jest, Prettier)
- v0.1 Server
- v0.2 Database- Recipes (initial seed, 2 recipes per category)
- v0.3 GraphQL API- Recipes
- v0.4 Database- Users (initial seed, 1 admin 2 other uses)
- v0.5 GraphQL API- Users
- v0.6 GrahQL API- Comments
- v0.7 Web Client- Static pages (landing, about, contact, bug report)
- v0.8 Web Client- Prepare interactions (Redux, Router)
- v0.9 Web Client- Recipe pages
- v0.10 Web Client- User pages
- v0.11 Web Client- Admin dashboard
