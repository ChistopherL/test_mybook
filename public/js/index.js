/*
	前端js文件
*/
$(function() {
	// 渲染主页面
	function initList() {
		$.ajax({
			type: 'get',
			url: '/books',
			dataType: 'json',
			success: function(data) {
				// 1.渲染数据列表  data为后端数据库的数据
				var html = template('indexTpl', {list: data});
				$('#dataList').html(html);
				// 2.添加图书
				$('#toAddBook').click(function() {
					addBook();
				});
				// 3.删除图书
				$('.delBook').click(function() {
					var id = $(this).attr('id');
					deleteBook(id);
				});
				// 4.修改图书时，根据id查询相应信息
				$('.editBook').unbind('click').click(function() {
					var id = $(this).attr('id');
					editBook(id);
				});
			}
		});
	}
	initList();
	
	// 添加数据页面 
	function addBook() {
		// 添加图书弹框效果实现
		// 把表单中的元素重置为空
		$('form').find('input[type=text]').val('');
		$('.cover').show();
		$('.addBookForm').css({'display': 'block'});
		// 点击提交按钮
		// !!! unbind 规定从指定元素上删除的一个或多个事件处理程序。
		$('#addBookSubmit').unbind('click').click(function() {
			$.ajax({
				type: 'post',
				url: '/books/book',
				data: $('form').serialize(),
				dataType: 'json',
				success: function(data) {
					if (data.flag == 1) {
						// 添加成功后重新渲染数据列表
						$('.exit').click();
						initList();
					}
				},
				error: function(data) {
					$('#dataList').text('数据被狗狗叼走了,请和管理员联系！');
				}
			});
		});
	}
	
	// 删除数据
	function deleteBook(id) {
		$.ajax({
			type: 'delete',
			url: '/books/book/' + id,
			dataType: 'json',
			success: function(data) {
				if (data.flag == 1) {
					// 删除成功后重新渲染数据列表
					initList();
				}
			}
		});
	}
	
	// 修改数据
	function editBook(id) {
		$.ajax({
			type: 'get',
			url: '/books/book/' + id,
			dataType: 'json',
			success: function(data) {
				if (data) {
					// 查询成功后重新渲染数据列表
					$('.cover').show();
					$('.addBookForm').css({'display': 'block'});
					// 修改表单的内容
					$('form')[0].reset();
					var input = $('form').find('input[type=text]');
					$(input[0]).attr('value', data.name);	
					$(input[1]).attr('value', data.author);	
					$(input[2]).attr('value', data.category);	
					$(input[3]).attr('value', data.description);
					// 编辑后，点击提交按钮 修改图书内容
					$('#addBookSubmit').unbind('click').click(function() {
						$.ajax({
							type: 'put',
							url: '/books/book',
							data: $('form').serialize() + '&id=' + id,
							dataType: 'json',
							success: function(data) {
								if (data.flag == 1) {
									// 修改成功后重新渲染数据列表
									$('.exit').click();
									initList();
								}
							},
						});
					});
				}
			}
		});
	}

	// 关闭弹框按钮
	$('.exit').click(function() {
		// 关闭图书弹框效果实现
		$('.cover').hide();
		$('.addBookForm').css({'display': 'none'});
	});
});


