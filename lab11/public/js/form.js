(function ($) {
    var search_form = $("#search-form"),
        searchTermInput = $("#search_term"),
        showElement = $("show"),
        showList = $("#showList"),
        h1 = $("#Heading");

    $(document).ready(function () {
        let endpoint = "http://api.tvmaze.com/shows";
        $.ajax({
            url: endpoint,
            dataType: "json",
            success: function (result) {
                for (const show in result) {
                    let hrefLink = result[show]._links.self.href;
                    let name = result[show].name;
                    let listToAdd =
                        "<li><a class='showsELement' href=" +
                        hrefLink +
                        ">" +
                        name +
                        "</a></li>";
                    showList.append(listToAdd);
                }
                // showarea.append(showList);
                // showarea.children().each(function (index, element) {
                //     bindEventsToShowsItem($(element));
                // });
                bindEventsToShowsItem(showList);
                showList.show();
            },
        });
    });

    function bindEventsToShowsItem(showsItem) {
        $(document).on("click", ".showsELement", function (event) {
            // $("#showsELement").on("click", function (event) {
            event.preventDefault();
            var showsLink = $(this)[0].href;
            showList.hide();
            showElement.empty();
            $.ajax({
                url: showsLink,
                dataType: "json",
                success: function (result) {
                    var img = $(document.createElement("img"));
                    img.attr("src", result.image.medium);
                    var newDl = $("<dl></dl>");
                    var languagedt = $("<dt>Language</dt>");
                    var languageDd = $("<dd>result.language</dd>");
                    newDl.append(languagedt);
                    newDl.append(languageDd);
                    var genredt = $("<dt>Genre</dt>");
                    var genredd = $("<dd></dd>");
                    var undefList = $("<ul></ul>");
                    for (const genre in result.genres) {
                        var li = $("<li>genre</li>");
                        undefList.append(li);
                    }
                    genredd.append(undefList);
                    var ratingdt = $("<dt>rating.average</dt>");
                    var ratingdd = $("<dd>result.rating.average</dd>");
                    var networkdt = $("<dt>network.name</dt>");
                    var networkdd = $("<dd>result.network.name</dd>");
                    var summarydt = $("<dt>summary</dt>");
                    var summarydd = $("<dd>result.summary</dd>");
                    showElement.append(newDl);
                    showElement.show();
                },
            });
        });
    }
    bindEventsToShowsItem(showList);
    // search_form.children().each(function (index, element) {
    //     bindEventsToShowsItem($(element));
    // });
    // showarea.children().each(function (index, element) {
    //     bindEventsToShowsItem($(element));
    // });

    search_form.submit(function (event) {
        event.preventDefault();

        var searchTerm = searchTermInput.val();

        if (searchTerm) {
            showList.hide();
            showList.empty();
            let endpoint = "http://api.tvmaze.com/search/shows?q=" + searchTerm;
            $.ajax({
                url: endpoint,
                dataType: "json",
                success: function (result) {
                    for (const show in result) {
                        let hrefLink = result[show].show._links.self.href;
                        let name = result[show].show.name;
                        let listToAdd =
                            "<li><a class='showsELement' href=" +
                            hrefLink +
                            ">" +
                            name +
                            "</a></li>";
                        showList.append(listToAdd);
                        // showarea.append(showList);
                    }
                    bindEventsToShowsItem(showList);
                    showList.show();
                },
            });
        }
    });
})(window.jQuery);
