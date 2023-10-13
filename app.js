const express = require("express");
const cors=require('cors')
const errorMiddleware = require("./middleware/error.js");
const userRoutes = require("./routes/UserRoutes.js");
const familyRoutes= require("./routes/FamilyRoutes.js");
const newsRoutes = require("./routes/NewsRoutes.js");
const marriageProfileRoutes = require("./routes/MarriageRoutes.js");
const parivarikNirdikshikaRoutes = require("./routes/ParivarikNirdikshikaRoutes.js");
const SagayiSapan = require("./routes/SagayiSanpanRoutes.js");
const SamajKiSansthaye = require("./routes/SamajKiSansthayeRoutes.js");
const SamajKiSeva = require("./routes/SamajKiSevaRoutes.js");
const SamajKaGaurav = require("./routes/SamajKeGauravRoutes");
const SamajikSevayenRoutes=require('./routes/SamajikSevayeroutes.js')
const Epatrika=require('./routes/EpatrikaRoutes.js')

const cookieparser = require("cookie-parser");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000/");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})
app.use(cors());

app.use(cookieparser());

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,  // Enable credentials (cookies, authorization headers, etc.)
};


app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));
// app.use(express.json({ limit: "1gb" }));
app.use(express.urlencoded({ limit: "1gb", extended: true }));

// Set up middleware
app.use("/api/v1", userRoutes);
app.use("/api/v1", familyRoutes);
app.use("/api/v1", marriageProfileRoutes);
app.use("/api/v1", SagayiSapan);
app.use("/api/v1", SamajKiSansthaye);
app.use("/api/v1", parivarikNirdikshikaRoutes);
app.use("/api/v1", SamajKiSeva);
app.use("/api/v1", SamajKaGaurav);
app.use("/api/v1", SamajikSevayenRoutes);
app.use("/api/v1", newsRoutes);
app.use("/api/v1", Epatrika);





// app.use("/api/v1", newsRoutes);

app.use(errorMiddleware);
module.exports = app;


