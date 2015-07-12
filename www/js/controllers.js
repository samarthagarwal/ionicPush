angular.module('starter.controllers', [])

.controller('DashCtrl', function($window, $rootScope, $scope, $ionicPlatform, $rootScope, $cordovaPush, $ionicUser, $ionicPush, $ionicLoading) {

  $ionicPlatform.ready(function(){
    Parse.initialize("eWhdkaASJ2BVx7oFd0o5fBk6ZtBZ3KVRXduOH1D7", "cPH2rkZ1hrFjPbF8qNjwIYATrV3CXWdKUWlC40ro");

    $ionicUser.identify({
      user_id: $ionicUser.generateGUID(),

    // OR, user the device's UUID
    //user_id: device.uuid
    });

    alert($ionicUser.user_id);

    $ionicPush.register({
      canShowAlert: true, //Should new pushes show an alert on your screen?
      canSetBadge: true, //Should new pushes be allowed to update app icon badges?
      canPlaySound: true, //Should notifications be allowed to play a sound?
      canRunActionsOnWake: true, // Whether to run auto actions outside the app,
      onNotification: function(notification) {
        alert("Notification aaya hai!\n"+JSON.stringify(notification))
      }
    })
    //success
    
    $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
      alert('Got token '+ data.token +'  Platform: '+ data.platform);
      // Do something with the token
      var newFriend = Parse.Object.extend('userListTutorial');
      alert("Parse extended");
      var friend = new newFriend();
      alert("friend created, now saving");
      friend.save({regid: data.token}).then(function(object){
        alert("Saved to Parse!");
      },function(obj, err){
        alert("err");
      });
    });
  })
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

$scope.chats = Chats.all();
$scope.remove = function(chat) {
  Chats.remove(chat);
}
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
