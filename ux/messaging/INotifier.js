/**
 * @author KousikRaj, Kousikraj@gmail.com
 * 
 * This is a interface like MIXIN created which has to be implemented as Mixin by
 * any notifier
 */
Ext.define('Ext.ux.messaging.INotifier', {
	alternateClassName	: 'Ext.ux.INotifier',
	mandatoryNotifierTopics: [],
	
	constructor			: function(){
		Ext.ux.messaging.NotificationManager.registerNotifier([Ext.ux.messaging.Constants.topics.SHUTDOWN_HOOK, Ext.ux.messaging.Constants.topics.REFRESH_HOOK], this);
	},
	
	initNotifier: function(c){
		if(c){
			this.notifyingTopics = c.notifyingTopics || [];
		}
		Ext.ux.messaging.NotificationManager.registerNotifier([Ext.ux.messaging.Constants.topics.SHUTDOWN_HOOK, Ext.ux.messaging.Constants.topics.REFRESH_HOOK], this);
	},
	
    notify				: function(notifierId, topicId, message) {
    	Ext.ux.messaging.NotificationManager.notify(notifierId || Ext.getClassName(this), topicId, message);
    },
        
    getNotifierId		: function(){}
});
