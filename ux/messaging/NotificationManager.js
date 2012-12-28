/**
 * @author KousikRaj, Kousikraj@gmail.com
 * 
 * This class is used for managing all Notification Services
 * This is where we register all our Notifiers and Notification Listneres
 * 
 */
Ext.Loader.setPath({'Ext.app' : '/works/extjs-ms/portal/classes', 'Ext.ux.messaging' : '/works/extjs-ms/ux/messaging'});
Ext.define('Ext.ux.messaging.NotificationManager',{

	singleton			: true,
	
	requires			: ['Ext.ux.messaging.Manager', 'Ext.ux.messaging.NotifierMap'],
	uses				: ['Ext.ux.messaging.NotifierMap', 'Ext.ux.messaging.Logger'],

	appName				: 'NotificationManager',
	alternateClassName	: 'Ext.ux.NotificationManager',
	
	mixins				: {
        observable		: 'Ext.util.Observable'
    },
	
	constructor			: function(config){
		Ext.ux.messaging.Manager.registerComponent(this.applName, this);
	},
	
	/**
	 * @private
	 * This object is placed for storing all the notifiers registered
	 * with notifiers
	 */
	mapOfNotifiers			: new Ext.ux.messaging.NotifierMap(),
	mapOfNotificationLsnrs	: new Ext.ux.messaging.NotifierMap(),
	mapOfRegisterdTopics	: new Ext.ux.messaging.NotifierMap(),
	mapOfPublishedMessage	: new Ext.util.MixedCollection(),

	/**
	 * This method is for registering notifiers(Producers) for any given topic
	 * @param topicId
	 * @param notifierObj
	 */
	registerNotifier		: function(topicIds, notifierObj){
		if(Ext.isEmpty(topicIds) == false){
			Ext.ux.messaging.Logger.log(this,'registerNotifier','Registering Notifier for ' + topicIds + ' with ' + Ext.getClassName(notifierObj));
			this.mapOfNotifiers.add(topicIds, notifierObj);
		}
	},
	
	
	/**
	 * This method is for registering all the notificationLsnr with the topics they like 
	 * to get notified
	 * 
	 * @param topicId
	 * @param notificationLsnrObj
	 */
	registerNotificationLsnr: function(topicIds, notificationLsnrObj){
		if(Ext.isEmpty(topicIds) == false){
			this.mapOfNotificationLsnrs.add(topicIds, notificationLsnrObj);
			Ext.ux.messaging.Logger.log(this,'registerNotify Listener','Registered Notification Listener for ' + topicIds+ ' with ' + Ext.getClassName(notificationLsnrObj));
		}
	},
	
	/**
	 * This method is for registering all the last messages with the topics they like 
	 * to get notified
	 * 
	 * @param topicId
	 * @param notificationLsnrObj
	 */
	registerPublishedMessage: function(topicIds, message){
		if(Ext.isEmpty(topicIds) == false){
			var map=this.mapOfPublishedMessage;
			map.add(topicIds, message);
			Ext.ux.messaging.Logger.log(this,'registerNotified Message','Registered messages for ' + topicIds);
		}
	},
	
	
	getPublishedMessage: function(topicId){
		if(Ext.isEmpty(topicId) == false){
			return this.mapOfPublishedMessage.getByKey(topicId);
		}
	},
	
	/**
	 * This method is used for notifying to any registered Notifier Lsnr for given topic,
	 * The message will be publised to any internal Subscribers
	 * @param notifierId
	 * @param topicId
	 * @param message
	 */
	notify					: function(notifierId, topicId, message){
		if(notifierId && topicId){
			this.registerPublishedMessage(topicId,message);
			this.mapOfNotificationLsnrs.notify(notifierId, topicId, message);
		}
	},
	
	clearNotificationManager: function(){
		delete this.mapOfNotifiers;
		delete this.mapOfNotificationLsnrs;
		delete this.mapOfRegisterdTopics;
		
		this.mapOfNotifiers = new Ext.ux.messaging.NotifierMap();
		this.mapOfNotificationLsnrs = new Ext.ux.messaging.NotifierMap();
		this.mapOfRegisterdTopics = new Ext.ux.messaging.NotifierMap();
		return true;
	},
	/**
	 * This method is for removing notifiers(Producers) for any given topic
	 * @param topicId
	 * @param notifierObj
	 */
	destroyNotifier		: function(topicIds, notifierObj){
		if(Ext.isEmpty(topicIds) == false){
			Ext.ux.messaging.Logger.log(this,'destroyNotifier','Destorying Notification Listener for ' + topicIds + ' with ' + Ext.getClassName(notifierObj));
			this.mapOfNotifiers.remove(topicIds, notifierObj);
		}
	}
	
	
});