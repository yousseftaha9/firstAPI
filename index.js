import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
    res.render("index.ejs");
});

app.post("/submit", async (req, res)=>{
    var city = req.body["city"];
    console.log(city);
    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: {q: city},
        headers: {
          'X-RapidAPI-Key': '1e61eb2b48msh51352b9e7b26486p1fdd97jsnee4bc992a82c',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };
      try {
        const response = await axios.request(options);
        console.log(response.data);
        console.log(response.data.location.name)
        var country = response.data.location.country;
        var lastUpdated = response.data.current.last_updated;
        var temp = response.data.current.temp_c;
        var condition = response.data.current.condition.text;
        var imgURL = response.data.current.condition.icon;
        var humidity = response.data.current.humidity;
        res.render("index.ejs", {cityName: city, countryName: country, timeUpdated: lastUpdated,
        temprature: temp, weatherCondition: condition, imageURL: imgURL, weatherHumidity: humidity});
    } catch (error) {
        console.error(error);
        var cityNotFound = "Not found!"
        res.render("index.ejs", {notFound: cityNotFound});
    }
});




app.listen(port, ()=> {
    console.log(`server running on port ${port}`);
});