const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const Expense = require('./models/expense.model')
const Group = require('./models/group.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

app.use(cors())
app.use(express.json())

const url = 'mongodb+srv://antriksh:KQk7D9ac@cluster0.bncmyew.mongodb.net/testing?retryWrites=true&w=majority';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connection is Successfull!");
}).catch((err) => {
    console.log("Error :(");
    console.log(err);
});

app.post('/api/register', async (req, res) => { //body = {name, email, password}
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			name: req.body.name,
			email: req.body.email,
			password: newPassword,
		}).then(Expense.create({email: req.body.email}));
		res.json({ status: 'ok' });
        console.log('User registered successfully!');
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

app.post('/api/login', async (req, res) => {    //body = {email, password}
	const user = await User.findOne({
		email: req.body.email,
	})
    console.log('login api called');
	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'secret123'
		)
		console.log('Login Successful!')	
		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})

app.post('/api/addExpense', async (req,res) => {    //headers = {'x-access-token' : token}, body = {title, amount}
    const token = req.headers['x-access-token'];
    try{
        const decoded = jwt.verify(token,'secret123');
        const email = decoded.email;
        var title = req.body.title;
        var amount = req.body.amount;
        const filter = {email: email}; 
        const update = {$push: {personal: {'Title': title, 'Amount': amount}}};
        await Expense.updateOne(filter,update);
        console.log('Personal Expense Added Successfully!')
    }catch(err){
        console.log(err);
        res.json({status: 'error', error: 'Invalid token'});
    }
})

app.get('/api/getPersonalExpenseHistory', async (req,res) => {  //headers = {'x-access-token' : token}
    console.log('personal history api called');
    const token = req.headers['x-access-token'];
    console.log(token);
    try{
        const decoded = jwt.verify(token,'secret123');
        const email = decoded.email; 
        const userExpense = await Expense.findOne({email: email},{personal: 1});
        res.json({status: 'ok', personalExpenseHistory: userExpense.personal});
    }catch(err){
        console.log(err);
        res.json({status: 'error', error: 'Invalid token'})
    }    
})

app.post('/api/requestMoney', async (req,res) => {    //body = {friendEmail, amount, message}
	const token = req.headers['x-access-token'];
    console.log(token);
    try{
        const decoded = jwt.verify(token,'secret123');
        const email = decoded.email; 
        var friendEmail = req.body.friendEmail;
		var amount = req.body.amount;
		var message = req.body.message;
		const filter = {email: friendEmail};
		const filter2 = {email: email};
		const update = {$push: {friends: {'amount': amount, 'message': message, 'sender': email, 'receiver': friendEmail}}};
		const update2 = {$push: {friends: {'amount': -amount, 'message': message, 'sender': email, 'receiver': friendEmail}}};
		Expense.updateOne(filter,update)
		.then(console.log('Request of Money to Friend Sent Successfully!'))
		.catch((err) => {
			console.log(err);
			console.log('Request Sending Failed!')
		});
		Expense.updateOne(filter2,update2)
		.then(console.log('Request of Money to Friend Sent Successfully!'))
		.catch((err) => {
			console.log(err);
			console.log('Request Sending Failed!')
		});
        res.json({status: 'ok'});
    }catch(err){
        console.log(err);
        res.json({status: 'error', error: 'Invalid token'})
    } 
    
})

app.get('/api/getFriendsHistory', async (req,res) => {
    console.log('history api called');
    const token = req.headers['x-access-token'];
    try{
        const decoded = jwt.verify(token,'secret123');
        const email = decoded.email; 
        const userExpense = await Expense.findOne({email: email},{friends: 1});
    	res.json({status: 'ok', friendHistory: userExpense.friends});
    }catch(err){
        console.log(err);
        res.json({status: 'error', error: 'Invalid token'})
    }
})

app.post('/api/createGroup', async (req,res) => {	//headers = {'x-access-token' : token}, body = {title, Array of emails}
	console.log('create group api called');
	const token = req.headers['x-access-token'];
    console.log(token);
    try{
        const decoded = jwt.verify(token,'secret123');
        const email = decoded.email; 
        var i;
		console.log(req.body.members);
		const title = req.body.title;
		var members = req.body.members;
		members.push({email: email});
		console.log(members);
		const newGroup = await Group.create({
			title: title,
			members: members,
		})
		console.log(newGroup);
		for(i=0;i<members.length;i++){
			await Expense.updateOne({email: members[i].email},{$push: {groups: {'groupID': newGroup._id}}})
		} 
        res.json({status: 'ok'});
    }catch(err){
        console.log(err);
        res.json({status: 'error', error: 'Invalid token'})
    }  
})

app.post('/api/addExpenseToGroup', async (req,res) => {	//headers = {'x-access-token' : token}, body = {groupID, amount, message}
	console.log('add expense to group api called');
    const token = req.headers['x-access-token'];
    try{
        const decoded = jwt.verify(token,'secret123');
        const email = decoded.email; 
        const groupID = req.body.groupID;
		const amount = req.body.amount;
		const message = req.body.message;
		const filter = {_id: groupID};
		const update = {$push: {expenses : {'email': email, 'Amount': amount, 'Message': message}}};
		await Group.updateOne(filter,update);
        res.json({status: 'ok'});
    }catch(err){
        console.log(err);
        res.json({status: 'error', error: 'Invalid token'})
    }    
})

app.get('/api/getGroups', async (req,res) => {	//headers = {'x-access-token' : token}
	console.log('personal history api called');
    const token = req.headers['x-access-token'];
    try{
        const decoded = jwt.verify(token,'secret123');
        const email = decoded.email; 
        const groupIDs = await Expense.findOne({email: email},{groups: 1});
		var groups = [];
		var i;
		console.log(groupIDs);
		for(i=0;i<groupIDs.groups.length;i++){
			groups.push(await Group.findOne({_id: groupIDs.groups[i].groupID}));
		}
		console.log(groups);
        res.json({status: 'ok', groups: groups});
    }catch(err){
        console.log(err);
        res.json({status: 'error', error: 'Invalid token'})
    }
})

app.listen(1337, () => {
	console.log('Server started on 1337')
})
