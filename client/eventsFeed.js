Events = new Meteor.Collection("events");
EventsFeed = new Meteor.Collection("eventsFeed");

Handlebars.registerHelper("prettifyDate", function(timestamp) {
    return moment(new Date(timestamp)).fromNow();
}); 

Handlebars.registerHelper('active', function(path) {
    return location.pathname.split('/')[location.pathname.split('/').length -1] === path ? 'active' : '';
});

Router.map(function() {
  this.route('home', {path: '/'});
  this.route('newEvent', {path: '/newEvent'});
  this.route('eventFeed', {
    path: 'eventFeed/:id',
    onAfterAction: function () {
        setTimeout(function () {
          var $chat = $(".chat");
          $chat.css({
              'height' : screen.height/2,
              'overflow' : 'auto'
            });
          $chat.animate({ scrollTop: $chat[0].scrollHeight}, 1000);
        }, 1);
           
        }});
});

Template.Events.items = function(){
    return Events.find({},{sort:{'submittedOn':-1}});
};

Template.eventFeed.feeds = function(){
    return EventsFeed.find({eventId : location.pathname.split('/')[location.pathname.split('/').length -1]},{sort:{'submittedOn':1}});
};

Template.newEvent.events({
    'click input#create' : function(event){
        event.preventDefault();
        var eventName = $("#evName").val().trim();
        Meteor.call("addEvent",eventName,function(error , eventId){
          //console.log('added event with Id .. '+eventId);
          Router.go('home'); 
        });
        $("#evName").val("");
    
    }
});

Template.eventFeed.events({
    'keydown input#fdMsg' : function(event){
        if (event.which == 13) { // 13 is the enter key event
        var feedMsg = $("#fdMsg").val().trim();
        var data = {
          feedMsg : feedMsg,
          eventId : location.pathname.split('/')[location.pathname.split('/').length -1]
        }
        Meteor.call("addFeedMsg",data,function(error , msgid){
          //console.log('added message with Id .. '+msgid);  
          var $chat = $(".chat"); 
          $chat.animate({ scrollTop: $chat[0].scrollHeight}, 1000);
        });
        $("#fdMsg").val("");
      }
    }
});