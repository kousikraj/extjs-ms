/**
 * @author KousikRaj, Kousikraj@gmail.com
 * 
 * This is a interface like MIXIN created which has to be implemented as Mixin by
 * any notification listener
 */
Ext.define('Ext.ux.messaging.INotificationLsnr', {
	alternateClassName	: 'Ext.ux.INotificationLsnr',
	requires: ['Ext.ux.messaging.Constants'],
	
	//here we can include any mandated topics to be listened. For here, I assumed that SHUTDOWN_HOOK and REFRESH_HOOK may be a 
	//mandated topic to be listed by by any object
	mandatorySubscriptionTopics: [Ext.ux.messaging.Constants.topics.SHUTDOWN_HOOK, Ext.ux.messaging.Constants.topics.REFRESH_HOOK],
	
	constructor			: function(c){
		Ext.ux.messaging.NotificationManager.registerNotificationLsnr(this.mandatorySubscriptionTopics, this);
	},
    
	//this is the method where call from implemented classes to get initialized for subscribing to any topics
    initNotificationLsnr: function(c){
		if(c){
			Ext.ux.messaging.NotificationManager.registerNotificationLsnr(this.mandatorySubscriptionTopics, c);
			var subscriptionTopics = c.getSubscriptionTopics() || [];
			Ext.ux.messaging.NotificationManager.registerNotifier(subscriptionTopics, c);
		}
	},
	
	notified			: function(notifierId, topicId, message) {},
    subscribe			: function(subscriberObj){},
	
    destroyConstruction: function(c){
		if(c){
			var subscriptionTopics = c.getSubscriptionTopics() || [];
			Ext.ux.messaging.NotificationManager.destroyNotifier(subscriptionTopics, c);
		}
	}
});
