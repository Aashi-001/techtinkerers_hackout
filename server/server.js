const express = require('express');
const app = express();
const port = 8000;
const mongoose = require('mongoose');

app.listen(port, (err) => {
    if (err) {
      console.log(err);
    }
    console.log('Listening on port http://localhost:' + port);
  });
  