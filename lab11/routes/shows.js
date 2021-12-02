const express = require("express");
const router = express.Router();

router.get("/allShows.html", function (request, response) {
    const allShows = todoData.makeToDo(
        xss(request.body.showsData._links.self.href),
        xss(request.body.showsData.name)
    );

    response.render("home", {layout: null, ...allShows});
});

router.get("/", async (req, res) => {
    try {
        res.render("users/index", {title: "User login page"});
    } catch (e) {
        res.render("users/error", {
            httpStatusCode: "500",
            errorMessage: "Internal Server Error:Page could not be loaded",
        });
    }
});

module.exports = router;
