/**
 * Created by sudeep on 2/5/16.
 */
(function() {
    $(init);
    var $movieTitleText;
    var $searchBtn;
    var $searchResults = $("#searchResults tbody");
    var SEARCH_URL = "http://www.omdbapi.com/?s=TITLE&t=movie";
    var DETAILS_URL = "http://www.omdbapi.com/?i=IMDBID";
    var $plot;
    var $actors;
    var $poster;
    var $director;
    var $title;
    function init() {
        $movieTitleText = $("#movieTitleText");
        $searchBtn = $("#searchBtn");
        var $plot = $("#plot");
        var $actors = $("#actors");
        var $poster = $("#poster");
        var $director = $("#director");
        var $title = $("#title");

        $searchBtn.click(function() {
            var title = $movieTitleText.val();
            var url = SEARCH_URL.replace("TITLE", title);
            console.log(url);
            $.ajax({
                url: url,
                success: function (data) {
                    console.log(data);

                    var movies = data.Search;

                    for(var m=0;m<movies.length;m++) {
                        var movie = movies[m];
                        var posterUrl = movie.Poster;
                        var title = movie.Title;
                        var year = movie.Year;
                        var imdb = movie.imdbID;

                        var $tr = $("<tr>")
                            .attr("id", imdb)
                            .click(function () {
                                var imdb = $(this).attr("id");
                                var url = DETAILS_URL.replace("IMDBID", imdb);

                                $.ajax({
                                    url: url,
                                    success: function (data) {
                                        var actors = data.Actors;
                                        var title = data.Title;
                                        var director = data.Director;
                                        var plot = data.Plot;
                                        var poster = data.Poster;

                                        $title.html(title);
                                        $plot.html(plot);
                                        $director.html(director);
                                        $poster.attr("src", poster);

                                        $actors.empty();

                                        var actorArray = actors.split(",");
                                        for (var a in actorArray) {
                                            var actor = actorArray[a];
                                            $li = $("<li>").append(actor).appendTo($actors);
                                        }
                                    }
                                });

                            });

                        var $img = $("<img>")
                            .attr("src",posterUrl)
                            .addClass("posterThumb");

                        var $td = $("<td>")
                            .append($img)
                            .appendTo($tr);

                        var $td = $("<td>")
                            .append(title)
                            .appendTo($tr);

                        var $td = $("<td>")
                            .append(year)
                            .appendTo($tr);

                        var $td = $("<td>")
                            .append(imdb)
                            .appendTo($tr);

                        $searchResults.append($tr);
                    }
                }
            });
        });
    }
})();