import bodyParser from "body-parser";
import express from "express";
import axios from "axios";

const app = express();
const port =3000;

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

const apiKey = "dc08db6cfe7a3b9491b339dcef23aedd";

// profile page
app.get("/", (req, res) =>{
    res.render("profile.ejs")
})
// Skills page
app.get("/skills", (req, res) =>{
    res.render("skills.ejs")
})
//exprerience 

app.get("/experience", (req, res) =>{
    res.render("experience.ejs")
})

app.get("/project", (req, res) =>{
    res.render("project.ejs")
})


// education
app.get("/education", async(req, res) =>{
    let countryName = "Winnipeg";
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${apiKey}&units=metric`);
    const weather = response.data;
    const icon = weather.weather[0].icon
    const url = `https://openweathermap.org/img/wn/${icon}@2x.png`
    res.render("education.ejs",{
        temperature: Math.round(weather.main.temp),
        countryCode: weather.name,
        urlIcon: url
    })
 
})

// Post for get a new weather of the city
app.post("/weather", async(req, res) =>{
    const cityName = req.body.country;
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
    const weather = response.data;
    const icon = weather.weather[0].icon
    const url = `https://openweathermap.org/img/wn/${icon}@2x.png`
    res.render("education.ejs",{
        temperature: Math.round(weather.main.temp),
        countryCode: weather.name,
        urlIcon: url
    })
})
// contact
app.get("/contact", (req, res) =>{
    res.render("contact.ejs")
})
app.post("/contact", (req, res) =>{
    const fName = req.body.firstname;
    const lName = req.body.lastname;
    const country = req.body.country;
    const message = req.body.subject
    
    res.render("project.ejs", {
        nom: fName,
        prenom: lName,
        pays: country,
        lettre: message
    })
})


app.listen(port, () =>{
    console.log(`This server is running on port ${port}`);
})