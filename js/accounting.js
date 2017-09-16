var fdb = new ForerunnerDB();
var db = fdb.db("accounting");
var accountingCollection = db.collection('accounting');
accountingCollection.load();

$("#submit").click(function(){
	var date = $("#date").val()
	var Category = $("#Category").val()
	var Project = $("#Project").val()
	var Money = $("#Money").val()
	
	var newAccounting = {
		date: date,
		Category: Category,
		Project: Project,
		Money: Money
	}
	accountingCollection.insert(newAccounting);
	accountingCollection.save()

	var date = $("#date").val("")
	var Category = $("#Category").val("")
	var Project = $("#Project").val("")
	var Money = $("#Money").val("")
	alert("儲存成功")
})
