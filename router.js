/*
	路由模块
*/
const express = require('express');
const router = express.Router();
const service = require('./service.js');

// 提供所有的图书信息
router.get('/books', service.allBooks);

// 添加图书信息时提交数据
router.post('/books/book', service.addBook);

// 修改图书时，根据id查询相应信息
router.get('/books/book/:id', service.getBookById);

// 提交编辑的数据
router.put('/books/book', service.editBook);

// 删除图书的信息
router.delete('/books/book/:id', service.deleteBook);

module.exports = router;