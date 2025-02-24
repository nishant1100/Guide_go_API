const express= require("express")
const connectDB=require("./config/db")
const UserRouter = require("./routes/UserRoute");
const PlaceRouter = require("./routes/PlaceRoute");
const HireRouter = require("./routes/HireRoute");
const AuthRouter = require("./routes/AuthRoute");
const GuideRouter = require("./routes/GuideRoute");


const app=express();

connectDB();


app.use(express.json());

app.use("/api/user",UserRouter );
app.use("/api/place",PlaceRouter );
app.use("/api/hire",HireRouter );
app.use("/api/auth",AuthRouter);
app.use("/api/guide",GuideRouter);


const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})