// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function (req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        // req.body is available since we're using the body-parser middleware
        var match = 
        {
            image: "",
            name: "",
            friendDifference: 1000
        };

        var userInfo = req.body;
        var userName = userInfo.name;
        var userImage = userInfo.image;
        var userScore = userInfo.score;
        
        var scoreGap = 0;// gap in score between active user and stored user

        for (let j=0; j< friends.length; j++)
        {
            console.log(friends[j].name);
            scoreGap = 0;

            for (let n=0; n< friends[j].score[n]; n++)
            {
                scoreGap += Math.abs(parseInt(userScore[n]) -parseInt(friends[j].score[n]));
                if (scoreGap <= match.friendDifference)
                {
                    match.name = friends[j].name;
                    match.image = friends[j].image;
                    match.friendDifference = scoreGap;
                }
            }
        }
                friends.push(userInfo);
                res.json(match);
    });


}