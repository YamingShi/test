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