# Branded Food API

To be used with [backend-strecth](https://github.com/Sterling47/backend-stretch) repo

## Set Up

1. Clone down this repo. 

2. CD into this repo.

3. Run `npm install`.

4. Run `npm start` to start the server.

## Set Up SQL/Knex
1. Once you download your SQL (PostgreSQL, mySQL, SQLite3), configure the `knexfile.js` with your specific SQL connection configurations

2. Run `npm run dev` to migrate and seed tables

## Technologies Used
- Express.js, Knex.js, PostgreSQL on back-end
- Vite/React, Cypress, React Router on front-end

## Endpoints

***

### get food

URL: `http://localhost:3001/foodnames`


Sample response (200):

```js
 {
        "fdc_id": "344604",
        "brand_name": "",
        "ingredients": "Tomatoes, Tomato Juice, Less Than 2% Of: Salt, Dried Onion, Dried Garlic, Soybean Oil, Spices, Calcium Chloride, Natural Flavor, Olive Oil, Citric Acid.",
        "serving_size": 123,
        "serving_size_unit": "g",
        "branded_food_category": "",
        "description": "Tutturosso Green 14.5oz. NSA Italian Diced Tomatoes"
    }
```
Sample response (500): 

`Internal Server Response Error`
