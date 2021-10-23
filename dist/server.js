import express from 'express';
import { botApp } from './index.js';
const app = express();
app.use('/odd-taxi', botApp);
app.listen(3010, () => {
    console.log('Success!');
});
