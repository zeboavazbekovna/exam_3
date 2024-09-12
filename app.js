import express from 'express';
import bodyParser from 'body-parser';
import { appConfig } from './src/config/app.config.js';
import { sequelize } from './src/config/db.config.js';
import routes from './src/routes/index.js';
import errorHandleWare from './src/middlewares/errorHandle.middleware.js';


const app = express();

// Database connection
sequelize
  .sync({ force: false, logging: false })
  .then(() => {
    console.log("Db successfully connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandleWare);
// API routes
app.use("/api/v1", routes);

// 404 Error for undefined routes
app.all("*", (req, res) => {
  res.status(400).send({
    message: `Given url ${req.url} not found`,
  });
});

// Server start
app.listen(appConfig.port, appConfig.host, () => {
  console.log(`Listening on port ${appConfig.port}`);
});
