/*
	@Author: 请叫我马哥
	@Time: 2017-04
	@Tittle: tab
	@Description: 点击对应按钮添加新窗口
*/
var navData;
layui.define(["element", "jquery"], function (exports) {
        var element = layui.element(),
            $ = layui.jquery,
            //获取top菜单数据
            Nav = function () {
                this.navConfig = {
                    initItem: 0,
                    layerNum: undefined,
                    navFilter: "topNav",
                    url: undefined,
                    data: undefined
                }
            };
        Nav.prototype.render = function () {
            var url = this.navConfig.url;
            $.get(url, function (data) {
                navData = data;
                $(".topNav").html(topNav(data));
                element.init();  //初始化页面元素
                // //渲染左侧菜单
                tab.render();
            })

        }

        //参数设置
        Nav.prototype.set = function (option) {
            var _this = this;
            $.extend(true, _this.navConfig, option);
            return _this;
        };
        //通过title获取children
        Nav.prototype.getChildren = function (title) {
            var children;

            function getChild(data, title) {
                if (data != undefined && data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].title == title) {
                            children = data[i].children;
                            return;
                        } else {
                            getChild(data[i].children, title)
                        }
                    }
                }
            }

            getChild(navData, title);
            return children;
        }
        //参数设置
        Nav.prototype.loadLeftNav = function (title) {
            var _this = this;
            var childData = _this.getChildren(title);
            tab.render(childData);
        };
        var bodyNav = new Nav();
        exports("bodyNav", function (option) {
            return bodyNav.set(option);
        });
    }
)
