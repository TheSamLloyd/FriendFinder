const express = require("express");
const path = require('path');
const router = express.Router();
router.get("/:path?", function(req,res){
	switch (req.params.path){
		case "survey":
			res.sendFile(path.join(__dirname,"../public","survey.html"));
			break;
		default:
			res.sendFile(path.join(__dirname,"../public","home.html"));
			break;
	}
});
module.exports = router;