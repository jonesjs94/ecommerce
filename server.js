const express = require("express"),
      app     = express();


app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile("/index.html")
})
      
app.listen(3000, () => console.log("Server online!"))
