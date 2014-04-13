Events = new Meteor.Collection("events");
EventsFeed = new Meteor.Collection("eventsFeed");

Meteor.startup(function () {
    // code to run on server at startup
});
 
Meteor.methods({
  addEvent : function(EventName){

    var eventId = Events.insert({
          'eventName' : EventName,
          'submittedOn': new Date(),
          'submittedById' : Meteor.userId(),
          'submittedByName' : Meteor.user().profile.name
      });
    return eventId;
  },

  removeEvent : function(eventID){
    try
    {
	    Events.remove({
	          'eventID' : eventID
	      });
	    return true;
	}
	catch(e)
	{
		return false;
	}
  },
  addFeedMsg : function(data){
  	var msgId = EventsFeed.insert({
          'eventId' : data.eventId,
          'submittedOn': new Date(),
          'message' : data.feedMsg,
          'submittedById' : Meteor.userId(),
          'submittedByName' : Meteor.user().profile.name
      });
    return msgId;
  }

});