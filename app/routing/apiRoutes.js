const express = require("express");
const path = require('path');
const router = express.Router();
const fs = require("fs");
var friends = require("../data/friends.json");
router.get("/api/friends", function(req,res){
	res.send(friends)
});
router.post("/api/friends", function(req,res){
	var you = req.body;
	var compatibilityArray = [];
	for(var i=0;i<friends.length;i++){
		compatibilityArray.push(compare(you,friends[i]));
	};
	var best = compatibilityArray.reduce((iMin, x, i, arr) => x < arr[iMin] ? i : iMin, 0);
	var bestFriend = friends[best];
	console.log(compatibilityArray,best, bestFriend)
	if (best<15.3272){
		var statFlag = true;
	}
	else var statFlag=false;
	save(you);
	res.send([bestFriend,statFlag]);
})
function compare(you,friend){
	var difference=0.0;
	for (var i=0;i<you.scores.length;i++){
		difference += Math.pow(parseInt(you.scores[i])-parseInt(friend.scores[i]),2);
	}
	return difference;
}
function save(you){
	friends.push(you);
	fs.writeFileSync(__dirname+"/../data/friends.json",
		JSON.stringify(friends),"utf8");
	return true;
}
module.exports = router;
/*Statistical notes:
1: assume every person's answer to every question is independent of their other answers
2. every answer is an integer from 1 to 5
3. Since we add up 10 random variables, the distribution of compatibilities should be approximately normal
4. We can figure out its mean and variance by summing the means and variances of each event
5. doing the math shows that each question has a mean squared difference of 4 and a variance of 45/2
6. then the distribution of compatibilities should have a mean of 40 and a variance of 225
7. variance of 225 = standard deviation of 15
8. using this information we can do simple significance tests to determine whether someone is a statistically significant match
9. since we usually define significance at the 5% level, let's find out what 5% correlates to in our model
10. so someone whose compatibility score is 15 or less is a Statistically Significant Friend. We can display that information.*/
