
var myCartApp = angular.module('cartApp',[]);

myCartApp.controller('cartCtrl',function ($scope) {

    $scope.cart = [
        {
            id:1000,
            name:'iphone5S',
            quantity:10,
            price:4300
        },
        {
            id:1002,
            name:'iphone5',
            quantity:25,
            price:3500
        },
        {
            id:2002,
            name:'iphone6S',
            quantity:30,
            price:5800
        },
        {
            id:3003,
            name:'Mac',
            quantity:3,
            price:7800
        }

    ];


    /**
     * 删除当前行记录
     *
     * @param id
     */
    $scope.remove = function (id) {
        //以ng 开头的命令都会自动触发脏检查
        var index = findByID(id);

        if(index!==-1){
            $scope.cart.splice(index,1);
        }

        //自动触发脏检查
    }


    /**
     * 根据id查找数组元素的索引
     *
     * @param id
     * @returns {number}
     */
    var findByID = function(id){
        var index = -1;
        angular.forEach($scope.cart,function (item,key) {
            //key 为索引值
            if(item.id===id){
                index = key;
                return;
            }
        });
        return index;
    };


    /**
     * 减少商品的数量
     *
     * @param id
     */
    $scope.reduce = function(id){


        var index = findByID(id);
        if(index!==-1){
           var item =  $scope.cart[index];
            if(item.quantity>1){
                -- item.quantity;
            }
        }
    };

    /**
     * 增加商品的数量
     *
     * @param id
     */
    $scope.add  = function(id){
        var index = findByID(id);
        ++ $scope.cart[index].quantity;
    };


    /**
     * 计算购买的总数量
     */
    $scope.totalCount = function () {
        var count = 0;
        angular.forEach($scope.cart,function (item) {

            count += parseInt(item.quantity);
        });
        return count;
    };

    /**
     * 计算订单总价
     */
    $scope.totalPrice = function () {
        var totalPrice = 0;
        angular.forEach($scope.cart,function (item) {
            totalPrice += parseInt(item.quantity) * item.price;
        });
        return totalPrice;
    };



    /**
     * 清空购物车
     */
    $scope.clear = function () {
        $scope.cart = [];
    };


    /**
     * 监听cart变化
     */
    $scope.$watch('cart',function (newValue,oldValue) {
        angular.forEach(newValue,function (item,key) {
          var reg = /^[0-9]*$/;
            if(!reg.test(item.quantity)){
                alert('输入非法!请重新输入');
                item.quantity = oldValue[key].quantity;  //第key个的值还原为原来的值
            }
        });

    },true);

});