import 'dotenv/config';
import app from './app.js';
import mongodb from './mongodb/index.js';

const port = process.env.PORT || 3001;

mongodb.init()
  .then(() => {
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`App listening on port ${port}`);
    });
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error(err);
    mongodb.close();
  });
