import bodyParser from "body-parser";
import express from "express";
import axios from "axios";

const app = express();
const port =3000;

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

const apiKey = "dc08db6cfe7a3b9491b339dcef23aedd";
let countryName = "FR";


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

// poster the contry choice

app.post("/weather", (req, res) =>{
    let nameCountry = req.body.country
    countryName += nameCountry
    res.redirect("/education")
})

// education
app.get("/education", (req, res) =>{
    async function getData (){
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${countryName}&appid=${apiKey}`);
        let temperature = response.data.main.temp;
        let humidity = response.data.main.humidity;
        let country = response.data.sys.country;
        res.render("education.ejs", {
            tem: temperature,
            hum: humidity,
            count: country
        })
    }
    getData();

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