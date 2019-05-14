/*
	业务模块
*/
const db = require('./db.js');

// 提供所有的图书信息
exports.allBooks = (req, res) => {
	let sql = 'select * from book';
	db.base(sql, null, (results) => {
		// 返回给前端json格式的数据
		res.json(results);
	});
};

// 添加图书信息时提交数据
exports.addBook = (req, res) => {
	let data = req.body;
	let sql = 'insert into book set ?';
	db.base(sql, data, (results) => {
		if (results.affectedRows == 1) {
			// 添加成功 返回1
			res.json({flag: 1});
		} else {
			// 添加失败 返回2
			res.json({flag: 2});
		}
	});
};

// 修改图书时，根据id查询相应信息
exports.getBookById = (req, res) => {
	let id = req.params.id;
	let sql = 'select * from book where id = ?';
	let data = [id];
	db.base(sql, data, (results) => {
		res.json(results[0]);
	});
};

// 提交编辑的数据
exports.editBook = (req, res) => {
	let info = req.body;
	let sql = 'update book set name=?,author=?,category=?,description=? where id=?';
	let data = [info.name, info.author, info.category, info.description, info.id];
	db.base(sql, data, (results) => {
		if (results.affectedRows == 1) {
			// 修改成功 返回1
			res.json({flag: 1});
		} else {
			// 修改失败 返回2
			res.json({flag: 2});
		}
	});	
};

// 删除图书的信息
exports.deleteBook = (req, res) => {
	let id = req.params.id;
	let sql = 'delete from book where id=?';
	let data = [id, id];
	db.base(sql, data, (results) => {
		if (results.affectedRows == 1) {
			// 删除成功 返回1
			res.json({flag: 1});
		} else {
			// 删除失败 返回2
			res.json({flag: 2});
		}
	});
};