const showsRoutes = require("./shows");
const showsData = require("../data/shows");
const path = require("path");

const constructorMethod = (app) => {
    app.use("/shows", showsRoutes);
    app.get("^/$", (req, res) => {
        res.sendFile(path.resolve("static/about.html"));
    });
    app.use("*", (req, res) => {
        res.render("users/error", {
            httpStatusCode: "404",
            errorMessage: "page not found",
        });
    });
};

module.exports = constructorMethod;
