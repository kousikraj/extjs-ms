/**
 * @author KousikRaj
 * 
 * This is a interface like MIXIN created which has to be implemented as Mixin by
 * any notifier
 */
Ext.define('Ext.ux.messaging.AbstractMessenger', {
	alternateClassName	: 'Ext.ux.AbstractMessenger',
	
	uses				: ['Ext.ux.messaging.NotificationManager'],
	
	mixins				:{
		notifer			: 'Ext.ux.messaging.INotifier',
		notificationLsnr: 'Ext.ux.messaging.INotificationLsnr'
	},
	
	
	constructor			: function(){
		//REGISTERING MANDATORY SUBSCRIPTION TOPICS
		//Ext.ux.messaging.NotificationManager.registerNotificationLsnr([Ext.ux.messaging.Constants.topics.SHUTDOWN_HOOK, Ext.ux.messaging.Constants.topics.REFRESH_HOOK], this);
		this.mixins.notifer.constructor.call(this);
		this.mixins.notificationLsnr.constructor.call(this);
	},
	
	initComponent		: function(){
	},
	
	 notifyingTopics	: [],
	 subscriptionTopics	: [],
	
	initMessenger		: function(c){
		this.mixins.initNotifier(this);
		this.mixins.initNotificationLsnr(this);
	},
	
    notify				: function(notifierId, topicId, message) {
    	this.mixins.notifer.notify(notifierId, topicId, message);
    },
    
    notified			: function(notifierId, topicId, message) {
    	
    },
    
    getNotifierId		: function(){
    	if(!this.notifierId){
    		this.notifierId = Ext.id();
    	}
    	return this.notifierId;
    }
});
