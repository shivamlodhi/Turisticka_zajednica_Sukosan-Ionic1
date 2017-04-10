
angular.module('Sukosan')
.controller('SettingsCtrl', function($scope,$stateParams,$http,$cordovaDatePicker) { 
   
    if(window.localStorage.getItem("notifications")==null  ){
        $scope.click = 'red';  
        window.localStorage.setItem("notifications","red"); 
    }else{
         
      
        
        $scope.click =window.localStorage.getItem("notifications"); 
      
    } 
$scope.clickNotifications = function(){
     if(window.localStorage.getItem("notifications")=="red"){
          window.localStorage.setItem("notifications","green"); 
           $scope.click="green"; 
    }else{
         window.localStorage.setItem("notifications","red"); 
           $scope.click="red";  
     }
}

});