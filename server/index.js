require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');
const app = express();
const jsonMiddleware = express.json();
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
app.use(express.json());
app.use(staticMiddleware);
app.use(jsonMiddleware);

app.get('/api/cookbook/:recipeId', (req, res, next) => {
  const recipeId = parseInt(req.params.recipeId, 10);
  if (!Number.isInteger(recipeId) || recipeId <= 0) {
    res.status(400).json({
      error: '"recipeId" must be a positive integer'
    });
    return;
  }
  const sql = `
    select *
      from "cookbook"
     where "recipeId" = $1
  `;

  const params = [recipeId];

  db.query(sql, params)
    .then(result => {
      const recipe = result.rows[0];
      if (!recipe) {
        res.status(404).json({
          error: `Cannot find recipe with "recipeId" ${recipeId}`
        });
      } else {
        res.json(recipe);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.get('/api/cookbook/', (req, res, next) => {
  const sql = `
    select *
      from "cookbook"
  `;

  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.post('/api/cookbook/', (req, res, next) => {
  const { uri, label, image, calories, mealType } = req.body;

  if (!uri | !label | !image | !calories | !mealType) {
    res.status(400).json({
      error: 'Missing uri, label, calories, or mealType.'
    });
    return;
  }
  const sql = `
    insert into "cookbook" ("uri", "label", "image", "calories",  "mealType")
    values ($1, $2, $3, $4, $5)
     returning *
  `;

  const params = [uri, label, image, calories, mealType];

  db.query(sql, params)
    .then(result => {
      const [recipe] = result.rows;
      res.status(201).json(recipe);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.delete('/api/cookbook/:recipeId', (req, res, next) => {
  const recipeId = parseInt(req.params.recipeId, 10);
  const sql = `
    delete from "cookbook"
     where "recipeId" = $1
     returning *
  `;

  const params = [recipeId];

  db.query(sql, params)
    .then(result => {
      const recipe = result.rows[0];
      if (!recipe) {
        res.status(404).json({
          error: `Cannot find recipe with "recipeId" ${recipeId}`
        });
      } else {
        res.status(204).json(`${recipe} has been successfully deleted.`);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
