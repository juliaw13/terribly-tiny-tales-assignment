const Express = require("express");
const Cors = require("cors");
const fetcher = require("fetcher");
const BodyParser = require("body-parser");
const axios = require("axios");

var app = Express();
app.use(Cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var roll_obj = new Object();

//connection start
app.listen(5000, () => {
  console.log("Server Running...");
});

// export data
app.post("/exportdata", async (req, res) => {
  var arr=[];
  var roll = req.body;
  for (i = 0; i < roll.length; i++) {
    await axios
      .post(`https://terriblytinytales.com/testapi?rollnumber=${roll[i]}`)
      .then(
        (response) => {
          roll_obj[roll[i]] = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  arr.push(roll_obj)
  await res.json(arr);
  console.log(arr);
});

