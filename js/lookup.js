var fdb = new ForerunnerDB();
var db = fdb.db("accounting");
var accountingCollection = db.collection('accounting');
accountingCollection.load();


function createAccountingHTMLString(date, Category, Project, Money) {
    return "<tr><td>" + date + "</td><td>" + Category + "</td><td>" + Project + "</td><td>" + Money + "</td><td>"
}

$("#lookup").click(function() {
    $("#accountingTable").find("tr").remove();
    if ($('input[name=method]:checked').val() == "curmonth") {

        var date = new Date();
        var year = date.getUTCFullYear();
        var month = date.getUTCMonth() + 1;
        if (month < 10) {
            month = "0" + month;



        }
        var datestring = year + "-" + month + "-" + "01";
        console.log(datestring)
        var accountings = accountingCollection.find({
            date: {
                $gte: datestring
            }
        });
        for (var i = 0; i < accountings.length; i++) {
            $("#accountingTable").append(createAccountingHTMLString(accountings[i].date, accountings[i].Category, accountings[i].Project, accountings[i].Money))
        }




        var eatCost = 0;
        var wearCost = 0;
        var liveCost = 0;
        var transCost = 0;
        var teachCost = 0;
        var playCost = 0;
        var otherCost = 0;




        for (var i = 0; i < accountings.length; i++) {
        	console.log(accountings[i])
            if (accountings[i].Category == "食") {
            	console.log(accountings[i].cost/1)
                eatCost += accountings[i].Money/1;




            } else if (accountings[i].Category == "衣") {
                wearCost += accountings[i].Money/1;

            } else if (accountings[i].Category == "住") {
                liveCost += accountings[i].Money/1;

            } else if (accountings[i].Category == "行") {
                transCost += accountings[i].Money/1;
            }else if (accountings[i].Category == "育") {
                teachCost += accountings[i].Money/1;
            }else if (accountings[i].Category == "樂") {
                playCost += accountings[i].Money/1;
            }else if (accountings[i].Category == "其他") {
                otherCost += accountings[i].cMoney/1;
            }




        }
        var totalCost = eatCost + playCost + otherCost;
        var eatproportion = Math.round((eatCost / totalCost)*100)+"%";
        var wearproportion = wearCost / totalCost
        var liveproportion = liveCost / totalCost
        var transproportion = transCost / totalCost
        var teachproportion = teachCost / totalCost
        var playproportion = playCost / totalCost
        var otherproportion = otherCost / totalCost
        $("#eatCost").text(eatCost);
        $("#eatproportion").text(eatproportion);
        $("#wearCost").text(wearCost);
        $("#wearproportion").text(wearproportion);
        $("#liveCost").text(liveCost);
        $("#liveproportion").text(liveproportion);
        $("#transCost").text(transCost);
        $("#transproportion").text(transproportion);
        $("#teachCost").text(teachCost);
        $("#teachproportion").text(teachproportion);
        $("#playCost").text(playCost);
        $("#playproportion").text(playproportion);
        $("#otherCost").text(otherCost);
        $("#otherproportion").text(otherproportion);
        
    } else {
        var fromtime = $("#fromtime").val();
        var totime = $("#totime").val();
        var accountings = accountingCollection.find({
            date: {
                $gte: fromtime,
                $lte: totime
            }
        });
        for (var i = 0; i < accountings.length; i++) {
            $("#accountingTable").append(createAccountingHTMLString(accountings[i].date, accountings[i].Category, accountings[i].Project, accountings[i].Money))
        }
    }
});