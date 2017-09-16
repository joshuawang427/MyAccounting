
var fdb = new ForerunnerDB();
var db = fdb.db("accounting");
var accountingCollection = db.collection('accounting');
accountingCollection.load();

function createAccountingHTMLString(date, Category, Project, Money) {
    return "<tr><td>" + date + "</td><td>" + Category + "</td><td>" + Project + "</td><td>" + Money + "</td><td>"
}

setTimeout(function() {
    var accountings = accountingCollection.find (
        {}, {
            $orderBy: {
                date: -1
            },
            $limit: 10
        }
    );
    console.log(accountings)
    for (var i = 0; i < accountings.length; i++) {
        
        $("#accountingTable").append(createAccountingHTMLString(accountings[i].date, accountings[i].Category, accountings[i].Project, accountings[i].Money))


    };





}, 500);