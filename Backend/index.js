const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const Expense = require('./models/expense.model')
const Group = require('./models/group.model')
const Calendar = require('./models/calendar.model')
const Event = require('./models/event.model')
const Global = require('./models/globalEvents.model')
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const splitwise = require('./Functions/splitwise')

app.use(cors())
app.use(express.json())

const url = 'mongodb+srv://evensplit:SSgqUwzAYpbCadWf@evensplit.dsgcmp4.mongodb.net/Data?retryWrites=true&w=majority';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connection is Successfull!");
}).catch((err) => {
    console.log("Error :(");
    console.log(err);
});

function isValid(token){
	try{
		const decoded = jwt.verify(token, 'secret123');
		return {'valid': true, 'decoded': decoded}
	}catch(err){
		return {'valid': false}
	}
}

app.post('/api/register', async (req, res) => { //body = {name, email, password}
		const user = await User.findOne({email: req.body.email});
		if(!user){
			const str = req.body.email;
			var domain = str.substring(
				str.indexOf("@") + 1);
			if(domain!="iitk.ac.in"){
				res.json({ status: 'error', error: 'Wrong email' })
			}
			else{
				const newPassword = await bcrypt.hash(req.body.password, 10)
				await User.create({
					name: req.body.name,
					email: req.body.email,
					password: newPassword,
					isAdmin: false,
				}).then(Expense.create({email: req.body.email})).then(Calendar.create({email: req.body.email}));
				res.json({ status: 'ok' });
				console.log('User registered successfully!');
			}
		}
		else{
			console.log('User already registered');
			res.json({ status: 'error', error: 'Duplicate email' })
		}
	
})

app.post('/api/login', async (req, res) => {    //body = {email, password}
	const user = await User.findOne({
		email: req.body.email,
	})
    console.log('login api called');
	if (!user) {
		res.json({ status: 'error', error: 'Invalid Login', user: false })
	}
	else{
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
			console.log(user.email);	
			return res.json({ status: 'ok', user: token, email: user.email })
		} else {
			return res.json({ status: 'error', error: 'Invalid Login', user: false })
		}
	}
})

app.post('/api/addExpense', async (req,res) => {    //headers = {'x-access-token' : token}, body = {title, amount}
    const token = req.headers['x-access-token'];
	const userAuth = isValid(token);
    if(userAuth.valid == false){
		res.json({status: 'error', error: 'Invalid token'});
	}
	else{
		const decoded = userAuth.decoded;
        const email = decoded.email;
		const user = await User.findOne({email: email});
		if(!user){
			res.json({status: 'error', error: 'Invalid token'});
		}
		else{
			var title = req.body.title;
			const amount = req.body.amount;
			const filter = {email: email}; 
			const update = {$push: {personal: {'Title': title, 'Amount': Number(amount), 'Time': new Date()}}};
			if(amount != "₹"){
				await Expense.updateOne(filter,update);
				console.log('Personal Expense Added Successfully!')
			}
		}
	}      
})

app.get('/api/getPersonalExpenseHistory', async (req,res) => {  //headers = {'x-access-token' : token}
    console.log('personal history api called');
    const token = req.headers['x-access-token'];
    const userAuth = isValid(token);
	if(userAuth.valid == false){
		res.json({status: 'error', error: 'Invalid token'});
	}
	else{
		const decoded = userAuth.decoded;
        const email = decoded.email; 
		const user = await User.findOne({email:email});
		if(!user){
			res.json({status: 'error', error: 'Invalid token'});
		}
		else{
			const userExpense = await Expense.findOne({email: email},{personal: 1});
			res.json({status: 'ok', personalExpenseHistory: userExpense.personal});
		}    
	}       
})

app.post('/api/requestMoney', async (req,res) => {    //body = {friendEmail, amount, message}
	console.log('request money api called');
	const token = req.headers['x-access-token'];
    const userAuth = isValid(token);
	if(userAuth.valid == false){
		res.json({status: 'error', error: 'Invalid token'});
	}
	else{
		const decoded = userAuth.decoded;
        const email = decoded.email;
		const user = await User.findOne({email: email});
		const friend = await User.findOne({email: req.body.friendEmail});
		if(!user){
			res.json({status: 'error', error: 'Invalid token'});
		}
		else if(!friend){
			res.json({status: 'error', error: 'Invalid Friend Email'});
		}
		else{ 
			var friendEmail = req.body.friendEmail;
			var amount = req.body.amount;
			var message = req.body.message;
			const filter = {email: friendEmail};
			const update = {$push: {requests: {'amount': amount, 'message': message, 'senderEmail': email, 'senderName': user.name, 'resolved': false}}};
			Expense.updateOne(filter,update)
			.then(console.log('Request of Money to Friend Sent Successfully!'))
			.catch((err) => {
				console.log(err);
				console.log('Request Sending Failed!')
			});
			res.json({status: 'ok'});
		}
	}    
})

app.post('/api/addFriendTransaction', async (req,res) => {    //body = {friendEmail, amount, message}
	const token = req.headers['x-access-token'];
    const userAuth = isValid(token);
	if(userAuth.valid == false){
		res.json({status: 'error', error: 'Invalid token'});
	}
	else{
		const decoded = userAuth.decoded;
        const email = decoded.email;
		const user = await User.findOne({email: email});
		const friend = await User.findOne({email: req.body.friendEmail});
		const amount = req.body.amount;
		if(!user){
			res.json({status: 'error', error: 'Invalid token'});
		}
		else if(!friend || !amount){
			res.json({status: 'error'});
		}
		else{ 
			var friendEmail = req.body.friendEmail;
			var message = req.body.message;
			const filter = {email: friendEmail};
			const update = {$push: {friends: {'amount': amount, 'message': message, 'friendEmail': email, 'friendName': user.name}}};	//amount > 0 means friend sent us money
			const filter2 = {email: email};
			const update2 = {$push: {friends: {'amount': -amount, 'message': message, 'friendEmail': friendEmail, 'friendName': friend.name}}};	//amount < 0 means we sent money to friend
			const filter3 = {email: email};
			const update3 = {$push: {personal: {'Amount': -amount, 'Title': `You paid ${friend.name} (${friendEmail})`, 'Time' : new Date()}}};	//amount < 0 means we sent money to friend
			const filter4 = {email: friendEmail};
			const update4 = {$push: {personal: {'Amount': amount, 'Title': `You received from ${user.name} (${email})`, 'Time' : new Date()}}};	//amount < 0 means we sent money to friend
			await Expense.updateOne(filter,update)
			.then(console.log('Friend Transaction Added Successfully!'))
			.catch((err) => {
				console.log(err);
				console.log('Friend Transaction Adding Failed!')
			});
			await Expense.updateOne(filter2,update2)
			.then(console.log('Friend Transaction Added Successfully!'))
			.catch((err) => {
				console.log(err);
				console.log('Friend Transaction Adding Failed!')
			});
			await Expense.updateOne(filter3,update3)
			.then(console.log('Friend Transaction Added Successfully!'))
			.catch((err) => {
				console.log(err);
				console.log('Friend Transaction Adding Failed!')
			});
			await Expense.updateOne(filter4,update4)
			.then(console.log('Friend Transaction Added Successfully!'))
			.catch((err) => {
				console.log(err);
				console.log('Friend Transaction Adding Failed!')
			});
			res.json({status: 'ok'});
		}
	}    
})

app.get('/api/getFriendsHistory', async (req,res) => {
    console.log('friends history api called');
    const token = req.headers['x-access-token'];
    const userAuth = isValid(token);
	if(userAuth.valid == false){
		res.json({status: 'error', error: 'Invalid token'});
	}
	else{
		const decoded = userAuth.decoded;
        const email = decoded.email;
		const user = await User.findOne({email: email});
		if(!user){
			res.json({status: 'error', error: 'Invalid token'});
		}
		else{ 
			const userExpense = await Expense.findOne({email: email});
			res.json({status: 'ok', friendsHistory: userExpense.friends, requests: userExpense.requests});
		}
	}
    
})

app.get('/api/getUsers', async (req,res) => {
    console.log('get users api called');
    const token = req.headers['x-access-token'];
	const userAuth = isValid(token);
	if(userAuth.valid == false){
		res.json({status: 'error', error: 'Invalid token'});
	}
	else{
		const decoded = userAuth.decoded;
		const email = decoded.email;
		const user = await User.findOne({email: email});
		if(!user){
			res.json({status: 'error', error: 'Invalid token'});
		}
		else{ 
			const users = await User.find({},{name:1, email:1});
			res.json({status: 'ok', users: users});
		}
	}
    
})

app.post('/api/deleteRequest', async (req,res) => {    //body = {index, amount, message}
	const token = req.headers['x-access-token'];
    const userAuth = isValid(token);
	if(userAuth.valid == false){
		res.json({status: 'error', error: 'Invalid token'});
	}
	else{
		const decoded = userAuth.decoded;
        const email = decoded.email;
		const user = await User.findOne({email: email});
		if(!user){
			res.json({status: 'error', error: 'Invalid token'});
		}
		else{ 
			const index = req.body.index;
			const accepted = req.body.accepted;
			if(!index){
				res.json({status: 'ok'});
			}
			else{
				const userExpense = await Expense.findOne({email: email});
				const request = userExpense.requests[userExpense.requests.length-index.index-1];
				if(!request){
					res.redirect('http://localhost:3000/friend-finance');
				}
				else{
					console.log(request);
					const filter = {email: email};
					const update = {$pull: {requests: request}};
					await Expense.updateOne(filter,update)
					.then(console.log('Request deleted successfully'))
					.catch((err) => {
						console.log(err);
						console.log('Request deletion failed')
					});
					if(accepted){
						const filter = {email: request.senderEmail};
						const update = {$push: {friends: {'amount': request.amount, 'message': request.message, 'friendEmail': email, 'friendName': user.name}}};	//amount > 0 means friend sent us money
						const filter2 = {email: email};
						const update2 = {$push: {friends: {'amount': -request.amount, 'message': request.message, 'friendEmail': request.senderEmail, 'friendName': request.senderName}}};	//amount < 0 means we sent money to friend
						await Expense.updateOne(filter,update)
						.then(console.log('Friend Transaction Added Successfully!'))
						.catch((err) => {
							console.log(err);
							console.log('Friend Transaction Adding Failed!')
						});
						await Expense.updateOne(filter2,update2)
						.then(console.log('Friend Transaction Added Successfully!'))
						.catch((err) => {
							console.log(err);
							console.log('Friend Transaction Adding Failed!')
						});
					}
					res.redirect('http://localhost:3000/friend-finance');
				}
			}
		}
	}    
})

app.post('/api/createGroup', async (req,res) => {	//headers = {'x-access-token' : token}, body = {title, Array of emails}
	console.log('create group api called');
	const token = req.headers['x-access-token'];
    const userAuth = isValid(token);
	if(userAuth.valid == false){
		res.json({status: 'error', error: 'Invalid token'});
	}
	else{
		const decoded = userAuth.decoded;
        const email = decoded.email;
		const user = await User.findOne({email: email});
		if(!user){
			res.json({status: 'error', error: 'Invalid token'});
		}
		else{ 
			var i;
			const title = req.body.title;
			var members = req.body.members;
			members.push({email: email});
			var members_with_name = [];
			for(i=0;i<req.body.members.length;i++){
				var member = await User.findOne({email: req.body.members[i].email},{name:1});
				members_with_name.push({email: req.body.members[i].email, name: member.name})
			}
			const newGroup = await Group.create({
				title: title,
				members: members_with_name,
			})
			for(i=0;i<members.length;i++){
				await Expense.updateOne({email: members[i].email},{$push: {groups: {'groupID': newGroup._id}}})
			} 
			res.json({status: 'ok'});
		}
	}
      
})

app.post('/api/addExpenseToGroup', async (req,res) => {	//headers = {'x-access-token' : token}, body = {groupID, array of returners, amount, message, }
	console.log('add expense to group api called');
    const token = req.headers['x-access-token'];
    const userAuth = isValid(token);
	if(userAuth.valid == false){
		res.json({status: 'error', error: 'Invalid token'});
	}
	else{
		const decoded = userAuth.decoded;
        const email = decoded.email;
		const user = await User.findOne({email: email});
		if(!user){
			res.json({status: 'error', error: 'Invalid token'});
		} 
		else{
			const groupID = req.body.groupID;
			const amount = req.body.amount;
			var returners = [];
			const message = req.body.message;
			if(req.body.returners.length > 0){
				var i;
				for(i=0;i<req.body.returners.length;i++){
					const returner = await User.findOne({email: req.body.returners[i]}, {name:1, email:1});
					returners.push({email: returner.email, name: returner.name})
				}
				const filter = {_id: groupID};
				const update = {$push: {expenses : {'payer': {'email': email, 'name': user.name}, 'returners': returners,'Amount': amount, 'Message': message}}};
				await Group.updateOne(filter,update);
				res.json({status: 'ok'});
			}
			else res.json({status: 'error', error: 'No returners'});
		}
	}
        
})

app.get('/api/getGroups', async (req,res) => {	//headers = {'x-access-token' : token}
	console.log('get groups api called');
    const token = req.headers['x-access-token'];
	const userAuth = isValid(token);
	if(userAuth.valid == false){
		res.json({status: 'error', error: 'Invalid token'});
	}
	else{
		const decoded = userAuth.decoded;
        const email = decoded.email;
		const user = await User.findOne({email: email});
		if(!user){
			res.json({status: 'error', error: 'Invalid token'})
		}
		else{
			const groupIDs = await Expense.findOne({email: email},{groups: 1});
			var groups = [];
			var i;
			for(i=0;i<groupIDs.groups.length;i++){
				groups.push(await Group.findOne({_id: groupIDs.groups[i].groupID},{title:1}));
			}
			res.json({status: 'ok', groups: groups});
		}        
	}    
})

app.post('/api/getParticularGroup', async (req,res) => {
	console.log('get particular group api called');
    const token = req.headers['x-access-token'];
	const userAuth = isValid(token);
	if(userAuth.valid == false){
		res.json({status: 'error', error: 'Invalid token'});
	}
	else{
		const decoded = userAuth.decoded;
        const email = decoded.email;
		const user = await User.findOne({email: email});
		if(!user){
			res.json({status: 'error', error: 'Invalid token'})
			console.log('laksdjf')
		}
		else{ 
			const id = req.body.id;
			if(id == null){
				res.json({status: 'error'});
			}
			else{
				const group = await Group.findOne({_id: id});
				var transactionsArray = group.expenses;
				var simplifiedTransactions = await splitwise(transactionsArray);			
				res.json({status: 'ok', group: group, simplifiedTransactions: simplifiedTransactions});
			}
		}        
	}    
})

app.post('/api/addEvent', async (req,res) => {	//headers = {'x-access-token' : token}, body = {name, start_time, end_time, description, relevant_tags}
	console.log('add event api called');
	const token = req.headers['x-access-token'];
    const userAuth = isValid(token);
	if(userAuth.valid == false){
		res.json({status: 'error', error: 'Invalid token'});
	}
	else{
		const decoded = userAuth.decoded;
        const email = decoded.email;
		const user = await User.findOne({email: email});
		if(!user){
			res.json({status: 'error', error: 'Invalid token'});
		} 
		else{
			const name = req.body.name;
			const start_time = req.body.start_time;
			const end_time = req.body.end_time;
			const description = req.body.description;
			const relevant_tags = req.body.relevant_tags;

			const newEvent = await Event.create({
				name: name,
				start_time: start_time, 
				end_time: end_time, 
				description: description, 
				relevant_tags: relevant_tags
			})
			const user = await User.findOne({email: email});
			if(user.isAdmin == true){
				await Global.create({'eventID': newEvent._id});
			}
			else{
				console.log(email);
				const filter = {email: email}; 
				const update = {$push: {personal_events: {'eventID': newEvent._id}}};
				await Calendar.updateOne(filter,update);
			}		
			res.json({status: 'ok'});
		}
	}
     
})

app.post('/api/deleteEvent', async (req,res) => {	//headers = {'x-access-token' : token}, body = {eventId}
	console.log('delete event api called');
	const token = req.headers['x-access-token'];
    const userAuth = isValid(token);
	if(userAuth.valid == false){
		res.json({status: 'error', error: 'Invalid token'});
	}
	else{
		const decoded = userAuth.decoded;
        const email = decoded.email;
		const user = await User.findOne({email: email});
		if(!user){
			res.json({status: 'error', error: 'Invalid token'});
		} 
		else{
			const eventId = req.body.eventId;
			console.log('new ObjectId("'+eventId+'")');
			const user = await User.findOne({email: email});
			const userCalendar = await Calendar.findOne({email: email});
			console.log(userCalendar);
			var eventIDToCheck = new ObjectId(eventId.toString());
			if(userCalendar.personal_events.findIndex(event => event.eventID.equals(eventIDToCheck)) != -1){
				const filter = {email: email}; 
				const update = {$pull: {personal_events: {eventID: eventIDToCheck}}};
				await Calendar.updateOne(filter,update);
				await Event.deleteOne({_id: eventId});
				console.log('event deleted successfully')
				res.json({status: 'ok'});
			}
			else if(user.isAdmin == true){ 
				await Global.deleteOne({eventID: eventId});
				await Event.deleteOne({_id: eventId});
				console.log('event deleted successfully')
				res.json({status: 'ok'});
			}
			else{
				console.log('event deletion failed')
				res.json({status: 'error', error: 'unauthorized access'})
			}		
		}
	}
     
})

app.get('/api/getEvents', async (req,res) => {	//headers = {'x-access-token' : token}
	console.log('get events api called');
    const token = req.headers['x-access-token'];
    const userAuth = isValid(token);
	if(userAuth.valid == false){
		res.json({status: 'error', error: 'Invalid token'});
	}
	else{
		const decoded = userAuth.decoded;
        const email = decoded.email; 
        const user = await User.findOne({email: email});
		if(!user){
			res.json({status: 'error', error: 'Invalid token'});
		}
		else{
			var events = [];
			var global_events = await Global.find();
			var i;
			for(i=0;i<global_events.length;i++){
				events.push(await Event.findOne({_id: global_events[i].eventID}));
			}
			if(user.isAdmin == true){
				res.json({status: 'ok', events: events});	//events is array of events		
			}
			else{
				const userCalendar = await Calendar.findOne({email: email});
				for(i=0;i<userCalendar.personal_events.length;i++){
					events.push(await Event.findOne({_id: userCalendar.personal_events[i].eventID}));
				}
				res.json({status: 'ok', events: events});	//events is array of events
			}
		}
	}    
})

app.listen(1337, () => {
	console.log('Server started on 1337')
})
