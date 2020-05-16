/*
 1. 鼠标移入显示,移出隐藏
    目标: 手机京东, 客户服务, 网站导航, 我的京东, 去购物车结算, 全部商品
 2. 鼠标移动切换二级导航菜单的切换显示和隐藏
 3. 输入搜索关键字, 列表显示匹配的结果
 4. 点击显示或者隐藏更多的分享图标
 5. 鼠标移入移出切换地址的显示隐藏
 6. 点击切换地址tab

 7. 鼠标移入移出切换显示迷你购物车
 8. 点击切换产品选项 (商品详情等显示出来)

 9. 点击向右/左, 移动当前展示商品的小图片
 10. 当鼠标悬停在某个小图上,在上方显示对应的中图
 11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域
 */

$(function () {
	showHide()
	hoverSubMenu()
	search()
	share()
	address()
	clickTabs()
	hoverMiniCar()
	clickProductTabs()
	clickSlideImg()

	// 9. 点击向右/左, 移动当前展示商品的小图片
	function clickSlideImg() {
		var $bigImg = $('#mediumImg')
		var $ul = $('#icon_list')
		var $lis = $('#icon_list>li')
		var $forward = $('#preview>h1>a:last')
		var $backward = $('#preview>h1>a:first')

		var imgWidth = $lis.eq(1).width()
		console.log(imgWidth);

		var showCount = 5
		var moveCount = 0

		// 初始化 箭头是否可点击
		if ($lis.length > showCount) {
			$forward.attr('class', 'forward')
		}

		// 点击forward
		$forward.click(function () {
			if (moveCount === $lis.length - showCount) {
				return
			}
			moveCount++
			if (moveCount === $lis.length - showCount) {
				$forward.attr('class', 'forward_disabled')
			}
			$backward.attr('class', 'backward')

			console.log(-imgWidth * moveCount);

			$ul.css('left', -imgWidth * moveCount)

			// var newSrc = 'images/products/product-s' + (moveCount + 1) + '-m.jpg'
			// $bigImg.attr('src', newSrc)
		})

		// 点击 backward
		$backward.click(function () {
			if (moveCount === 0) {
				return
			}
			moveCount--
			if (moveCount === 0) {
				$backward.attr('class', 'backward_disabled')
			}
			$forward.attr('class', 'forward')

			$ul.css('left', -imgWidth * moveCount)

			// var newSrc = 'images/products/product-s' + (moveCount + 1) + '-m.jpg'
			// $bigImg.attr('src', newSrc)
		})

		var index = 0
		// 1.鼠标悬浮 显示共色框, 更换当前图片到大的图片框
		$lis.hover(function () {
			var targetIndex = $(this).index()
			console.log(targetIndex);
			$lis.eq(index).children('img').removeClass('hoveredThumb')
			$lis.eq(targetIndex).children('img').addClass('hoveredThumb')
			// $lis.children('img')[targetIndex].className = 'hoveredThumb'
			// this.children[0].className = 'hoveredThumb'

			// 显示当前图片 images/products/product-s1-m.jpg
			var newSrc = 'images/products/product-s' + (targetIndex + 1) + '-m.jpg'
			$bigImg.attr('src', newSrc)

			index = targetIndex
		}, function () {
			$lis.children('img').removeClass('hoveredThumb')
		})

		// 

	}

	// 8. 点击切换产品选项 (商品详情等显示出来)
	function clickProductTabs() {
		var index = 0
		var $lis = $('#product_detail>ul>li')

		var $divs = $('#product_detail').children('div:gt(0)')
		// $('#product_detail>ul').delegate('li', 'click', function () {
		$lis.click(function () {
			var targetIndex = $(this).index()

			$lis.removeClass('current')
			this.className = 'currrent'

			$divs.hide()
			$divs[targetIndex].style.display = 'block'
			$divs.eq(targetIndex).show()

			// $lis[index].className = ''
			// this.className = 'current'
			// $divs[index].style.display = 'none'
			// $divs[targetIndex].style.display = 'block'
			// index = targetIndex
		})
	}

	// 7. 鼠标移入移出切换显示迷你购物车
	function hoverMiniCar() {
		$('#minicart').hover(function () {
			$(this).children('div').show()
			$(this).addClass('minicart')
			// this.className = 'miniCar'
		}, function () {
			$(this).children('div').hide()
			$(this).removeClass('minicart')
			// this.className = ''
		})
	}

	// 6. 点击切换地址tab
	function clickTabs() {
		$('#store_tabs>li').click(function () {
			$('#store_tabs>li').removeClass('hover')
			// this.clasName = 'hover'
			$(this).addClass('hover')
		})
	}

	// 5. 鼠标移入移出切换地址的显示隐藏
	function address() {
		var $select = $('#store_select')
		$select.hover(function () {
				$(this).children(':gt(0)').show()
			}, function () {
				$(this).children(':gt(0)').hide()
			})
			.children(':last').click(function () {
				$select.children(':gt(0)').hide()
			})
	}

	// 4. 点击显示或者隐藏更多的分享图标
	function share() {
		var isOpen = false
		var $shareMore = $('#shareMore')
		var $parent = $shareMore.parent()
		var $as = $shareMore.prevAll('a:lt(2)')
		var $b = $shareMore.children()

		$shareMore.click(function () {
			if (isOpen) {
				// 去关闭
				$parent.css('width', 155)
				$as.hide()
				$b.removeClass('backword')
			} else {
				// 去打开
				$parent.css('width', 200)
				$as.show()
				$b.addClass('backward')
			}

			isOpen = !isOpen
		})
	}

	// 3. 输入搜索关键字, 列表显示匹配的结果
	function search() {
		$('#txtSearch')
			.on('keyup focus', function () {
				var txt = this.value.trim()

				if (txt) {
					$('#search_helper').show()
				}
			})
			.blur(function () {
				$('#search_helper').hide()
			})
	}

	// 2. 鼠标移动切换二级导航菜单的切换显示和隐藏
	function hoverSubMenu() {
		$('#category_items>div.cate_item').hover(
			function () {
				$(this).children('.sub_cate_box').show()
			},
			function () {
				$(this).children(':last').hide()
			}
		)
	}

	// 1. 鼠标移入显示,移出隐藏
	function showHide() {
		$('[name=show_hide]').hover(
			function () {
				var id = this.id + '_items'

				$('#' + id).show()
			},
			function () {
				var id = this.id + '_items'
				$('#' + id).hide()
			}
		)
	}
})