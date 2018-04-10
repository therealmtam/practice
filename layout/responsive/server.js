const express = require ('express');
const app = express();


app.use(express.static(__dirname + '/client/dist'));


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Connected to ${port}`);
});