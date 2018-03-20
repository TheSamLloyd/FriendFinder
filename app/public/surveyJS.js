var questions = ["I love trying new things.",
 "I try to follow the trends.", 
 "Others see me as a natural leader.",
 "I'm fine letting others be the center of attention.",
 "I don't get jealous very easily.",
 "I tend to wait and see rather than charging in right away.",
 "I can admit when I've made a mistake.",
 "It's important to treat everyone fairly, not just those we're close to.",
 "I love getting my adrenaline pumping.",
 "I'm more of a night owl than an early bird."];
var answers = ["5: Strongly Agree", "4", "3", "2", "1: Strongly Disagree"];
$(document).ready(function(){
	writeQuestions($("#questions"));
})
function writeQuestions(obj){
	questions.forEach(function(question, qIndex){
		var newDiv = $("<div>").attr("class","form-group");
		var newQ = $("<label>").text(question).attr("for",
			"question"+qIndex);
		var qSelect = $("<select>").attr("id","question"+(qIndex))
		answers.forEach(function(answer, index){
			var option = $("<option>").text(answer).attr("value",5-index);
			qSelect.append(option)
		})
		newDiv.append(newQ);
		newDiv.append($("<br>"));
		newDiv.append(qSelect);
		newDiv.append($("<br>"));
		obj.append(newDiv)
	})
	var submit = $("<button>").text("Submit").attr("id","submit").attr("type","button");
	obj.append(submit)
	return
}
$("form").on("click","#submit",function(event){
	var name = $("#name").val();
	var imgSrc = $("#imgSrc").val();
	var valArray = [];
	for (var i=0;i<questions.length;i++){
		console.log(i)
		valArray.push(parseInt($("#question"+i).val()));
	}
	var obj = {
		"name":name,
		"picURL":imgSrc,
		"scores":valArray
	};
	$.post("/api/friends",obj,function(data){
		console.log(data);
		var newJumbo = $("<div>").attr("class","jumbotron");
		newJumbo.append($("<h3>").attr("class","display-3").text("Your new best friend is: "+data.name))
		newJumbo.append($("<img>").attr("src",data.picURL));
		$("maincon").empty();
		$("#maincon").append(newJumbo);
	})
})