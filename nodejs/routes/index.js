

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var session_store;
var authentication = require('../middlewares/authentication');
var fs = require('fs');
var multer = require('multer');
var bcrypt = require('bcrypt');

var db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'employee'
});
//all get	
router.get('/', authentication.is_login, function (req, res, next) {
	db.getConnection(function (err, connection) {
		//run the query
		connection.query('select * from company', function (err, rows) {
			if (err) throw err;
			else {
				console.log(rows);
				res.json(rows)
			}
		});
		connection.release();//release the connection
	});
})//end get
//login
//router.get('/login',function(req,res,next){
//res.render('login',{title:"Login Page"});  
//});
router.post('/login', function (req, res, next) {
	console.log(req.session);
	//var session_store=req.session;
	db.getConnection(function (err, connection) {

		//console.log(connection.id);
		//	console.log(query);
		connection.query('select username, password from users where username="' + req.body.username + '" and password=("' + req.body.password + '")', function (err, rows)
		//	connection.query('select * from users',function(err,rows)
		{
			console.log(rows);

			if (err) {
				//var errornya  = ("Error Selecting : %s ",err.code );  
				//console.log(err.code);
				console.log('login err', err);//, errornya); 

			} else {
				if (rows.length <= 0) {
					console.log('msg_error', "Wrong email address or password. Try again.");
					res.send("INVALID USER NAME AND PASSWORD..");
				}
				else {
					req.session.is_login = true;

					res.send(rows);

				}
			}
		});
	})
})
router.get('/pass', authentication.is_login, function (req, res, next) {
	db.getConnection(function (err, connection) {
		//run the query
		connection.query('select password from users', function (err, rows) {
			if (err) throw err;
			else {
				console.log(rows);
				res.json(rows)
			}
		});
		connection.release();//release the connection
	});
})//end get
router.post('/cha_pass', authentication.is_login, function (req, res, next) {
	console.log(req.body.newpassword)
	console.log(req.body.password)
	db.getConnection(function (err, conn) {

		conn.query('UPDATE users SET password=? WHERE password='+req.body.password,[req.body.newpassword], function (err, result) {
			//if(err) throw err
			if (err) {
				//console.log('put conection error', err);
				return res.json({ 'error': false, "msg": "PLESE TRY AGAIN..." })
			} else {
				//console.log('success', 'Comapny Data Edit successfully!');
				return res.json({ 'result': true, "msg": "Update password SUCCESS FULLY.." });
			}
		})
	})
})
//logout
/*router.get('/logout',authentication.is_login,function(req, res)
{ 
	req.session.destroy(function(err)
	{ 
		if(err)
		{ 
			console.log('logout err',err); 
		} 
		else 
		{ 
			console.log('logout success');
			//res.redirect('/login'); 
		} 
	}); 
});*/
//add
router.post('/add', authentication.is_login, function (req, res, next) {
	console.log("body" + (JSON.stringify(req.body)));
	//var user = req.body
	db.getConnection(function (error, conn) {


		var sql = "INSERT INTO company (cmp_name,email,phone,address,state,country) VALUES ('" + req.body.name + "','" + req.body.email + "','" + req.body.phone + "','" + req.body.address + "','" + req.body.state + "','" + req.body.country + "')";
		conn.query(sql, function (err, result) {
			//if(err) throw err
			if (err) {
				console.log('post conection error', err);
				return res.json({ 'error': true, "msg": "PLESE TRY AGAIN..." })
			} else {
				console.log('success', 'Data added successfully!');
				return res.json({ 'result': false, "msg": "DATA ADDED SUCCESS FULLY.." });
			}
		})
	})
})
// SHOW EDIT EMPLOYEE FORM
router.get('/edit/:id', authentication.is_login, function (req, res, next) {
	db.getConnection(function (error, conn) {
		console.log("params", req.params.id);
		var sql = "SELECT * FROM  company where cmp_id = " + req.params.id;
		conn.query(sql, function (err, rows, fields) {
			if (err) {
				console.log('error', err)
			}
			else {
				console.log(rows)
				res.end(JSON.stringify(rows));
			}
		})
	})
})
//update
router.put('/edit/:id', authentication.is_login, function (req, res, next) {
	console.log("body" + (JSON.stringify(req.body)));
	//console.log(req.params.editEmployees);
	db.getConnection(function (error, conn) {


		conn.query('UPDATE company SET cmp_name=?, email=?, phone=? ,address=? ,state= ? ,country=? WHERE cmp_id = ' + req.params.id, [req.body.cmp_name, req.body.email, req.body.phone, req.body.address, req.body.state, req.body.country], function (err, result) {
			//if(err) throw err
			if (err) {
				//console.log('put conection error', err);
				return res.json({ 'error': false, "msg": "PLESE TRY AGAIN..." })
			} else {
				//console.log('success', 'Comapny Data Edit successfully!');
				return res.json({ 'result': true, "msg": "Update SUCCESS FULLY.." });
			}
		})
	})
})

router.delete('/delete/:id', authentication.is_login, function (req, res, next) {
	var user = { id: req.params.id }
	console.log("delete", req.params.id);
	db.getConnection(function (error, conn) {
		//var sql = "INSERT INTO users (name,age,email) VALUES ('"+req.body.name+"','"+req.body.age+"','"+req.body.email+"')";

		conn.query('DELETE FROM company WHERE cmp_id = ' + req.params.id, user, function (err, result) {
			//if(err) throw err
			if (err) {
				console.log('delete conection error', err);
				return res.json({ 'error': false, "msg": "PLESE TRY AGAIN..." })
			} else {
				console.log('success', 'User deleted successfully! id = ' + req.params.id)
				return res.json({ 'result': true, "msg": "DATA Deleted SUCCESS FULLY.." });
			}
		})
	})
})
//admin-add

router.get('/admindisplay', authentication.is_login, function (req, res, next) {
	db.getConnection(function (err, connection) {
		//run the query
		connection.query('select * from admin', function (err, rows) {
			if (err) throw err;
			else {
				console.log(rows);
				res.json(rows)
			}
		});
		connection.release();//release the connection
	});
})//end get
router.post('/adminadd', authentication.is_login, function (req, res, next) {
	console.log("body" + (JSON.stringify(req.body)));
	db.getConnection(function (error, conn) {
			let hash = bcrypt.hashSync('req.body.password',10);
		
		var sql = "INSERT INTO admin (cmp_name,name,email,mobile,gender,address,username,password) VALUES ('" + req.body.cmp_name + "','" + req.body.name + "','" + req.body.email + "','" + req.body.mobile + "','" + req.body.Gender + "','" + req.body.address + "','" + req.body.username + "','" + hash + "' )";
		conn.query(sql, function (err, result) {
			//if(err) throw err
			if (err) {
				console.log('post conection error', err);
				return res.json({ 'error': false, "msg": "PLESE TRY AGAIN..." })
			} else {
				console.log('success', 'Data added successfully!');
				return res.json({ 'result': true, "msg": "DATA ADDED SUCCESS FULLY.." });
			}
		})
	})
})
router.delete('/deleteAdmin/:id', authentication.is_login, function (req, res, next) {
	var user = { id: req.params.id }
	console.log("delete", req.params.id);
	db.getConnection(function (error, conn) {
		conn.query('DELETE FROM admin WHERE id = ' + req.params.id, user, function (err, result) {
			if (err) {
				console.log('delete conection error', err);
				return res.json({ 'error': false, "msg": "PLESE TRY AGAIN..." })
			} else {
				console.log('success', 'User deleted successfully! id = ' + req.params.id)
				return res.json({ 'result': true, "msg": "DATA Deleted SUCCESS FULLY.." });
			}
		})
	})
})
router.get('/editadmin/:id', authentication.is_login, function (req, res, next) {
	db.getConnection(function (error, conn) {
		conn.query('SELECT * FROM admin WHERE id = ' + req.params.id, function (err, rows, fields) {
			if (err) throw err

			// if user not found
			if (rows.length <= 0) {
				console.log('error', 'User not found with id = ' + req.params.id)
				//console.log(rows)
				res.end(JSON.stringify(rows));
			}
			else { // if user found
				// render to views/user/edit.ejs template file
				//console.log(rows)
				res.end(JSON.stringify(rows));

			}
		})
	})
})
router.put('/editadmin/:id', authentication.is_login, function (req, res, next) {
	console.log("body" + (JSON.stringify(req.body)));
	db.getConnection(function (error, conn) {
		conn.query('UPDATE admin SET name=?, email=?, mobile=?, gender=?, address=? ,username= ? WHERE id = ' + req.params.id, [req.body.name, req.body.email, req.body.mobile, req.body.gender, req.body.address, req.body.username], function (err, result) {
			//if(err) throw err
			if (err) {
				console.log('put conection error', err);
				return res.json({ 'error': false, "msg": "PLESE TRY AGAIN..." })
			} else {
				console.log('success', 'Admin Data Edit successfully!');
				return res.json({ 'result': true, "msg": "Update SUCCESS FULLY.." });
			}
		})
	})
})


//end connection


module.exports = router;
