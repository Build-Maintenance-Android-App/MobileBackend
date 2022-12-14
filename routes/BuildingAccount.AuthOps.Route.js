//create building account and assign the creator user as a manager of the building  account
const { User } = require("../models/User");
const { Building } = require("../models/Building");
const express = require("express");
const saltHashPassword = require("../utils/passwordUtils/saltHashPassword");
const router = express.Router();

// Endpoint:  "/registerBuilding"
router.post("/", async (req, res) => {

	// Building Manager Registration


	// the creator of the building account is automatically assigned as a manager of the building account
	const isManager = true; 
	
	
	const plaint_password = req.body.password;
	const hash_data =saltHashPassword(plaint_password);
	const save_password = hash_data.passwordHash;//save the hashed password
	var salt = hash_data.salt;//save the salt
	console.log(req.body.name);
	console.log(req.body);

	// check whether the user already exists

	
	let user = await User.findOne({email:req.body.email});
	User.findOne({email:req.body.email}, function(err, user) {
		if (err) throw err;
	  
	// object of the user
})
	
	
	if(user) return res.status(400).send("User already registered");
	// Generate a building ID
	let randomNum=Math.floor(100000 + Math.random() * 900000);
	const buildingId = randomNum.toString();

	let building = await Building.findOne({buildingId:buildingId});

	if(building) return res.status(400).send("Building account creation failed");
	
	
	
	// there is no user with the same email address
	const save_user = await new User({buildingId:buildingId,name:req.body.name, email:req.body.email, password:save_password,isManager:isManager,salt:salt});
	
	let save_userr = await save_user.save();

	
	//console.log(Math.floor(100000 + Math.random() * 900000));
	// save building information
	
	
	const save_building = await new Building({buildingId:buildingId,buildingName:req.body.buildingName,buildingAddress:req.body.buildingAddress}).save();

	console.log(save_building);

// json response .user and .building
	res.status(200).send({user:save_userr});

	console.log(" building account manager user registered successfully ");
});

module.exports = router;
