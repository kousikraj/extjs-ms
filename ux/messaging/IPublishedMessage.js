/**
 * @author KousikRaj, Kousikraj@gmail.com
 * 
 * This is a interface like MIXIN created which has to be implemented as Mixin by
 * any notification listener
 */

Ext.define('Ext.ux.messaging.IPublishedMessage', {
	alternateClassName	: 'Ext.ux.IPublishedMessage',
	
	getPublishedMessage : function(topicid){
		return Ext.ux.messaging.NotificationManager.getPublishedMessage(topicid);
	}
});

