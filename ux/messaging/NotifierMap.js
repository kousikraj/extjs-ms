/**
 * @author KousikRaj, Kousikraj@gmail.com
 * This class is an extended Ext.util.MixedCollection which the data by default will be an Array
 * instead of a data.
 */
Ext.Loader.setPath({'Ext.app' : '/works/extjs-ms/portal/classes', 'Ext.ux.messaging' : '/works/extjs-ms/ux/messaging'});
Ext.define('Ext.ux.messaging.NotifierMap',{
	requires		: ['Ext.util.MixedCollection'],
	name			: 'notifierMap',
	uses			:['Ext.ux.messaging.Logger'],
	alternateClassName: 'Ext.ux.messaging.NotifierMap',
	
	mixins: {
        observable: 'Ext.util.Observable'
    },
   
    map: new Ext.util.MixedCollection(),
    
    /**
	 * This is a constructor defined for this method
	 * @param config
	 */
    constructor: function(config) {
    	if(!this.map){
    		this.map = this.getNewDataCollection();
    	}
    },
	
    /**
	 * This method used to create new MixedCollectoin
	 * and return the newly created object
	 */
	getNewDataCollection: function(){
		return new Ext.util.MixedCollection();
	},
	
	/**
	 * This method is used to return a new Array Object that
	 * is data value of this key value pair structure
	 * @returns {Array}
	 */
	getNewDataArray: function(){
		return [];
	},
	
	/**
	 * This method is for creating new array for new key
	 * as new array and push a data and return the array
	 * @param obj
	 * @returns
	 */
	createData: function(obj){
		var newArray = this.getNewDataArray();
		newArray.push(obj);
		return newArray;
	},
	
	/**
	 * this method is for appending a data in to the array 
	 * already added for any MixedCollection for the given 
	 * key value
	 * @param arr
	 * @param obj
	 * @returns
	 */
	appendData: function(arr, obj){
		if(Ext.typeOf(arr || '') != 'array'){
			return this.createData(obj);
		}
		arr.push(obj);
		return arr;
	},
	
	/**
	 * This method is used for removing the data from the data part 
	 * of the MixedCollection Object
	 * @param arr
	 * @param obj
	 */
	removeData: function(arr, obj){
		if(Ext.Array.contains(arr, obj)){
			return Ext.Array.remove(arr, obj);
		}
		return arr;
	},
	
	/**
	 * This is for extended functionality of adding an array as object 
	 * value instead 
	 * @param key
	 * @param obj
	 * @returns
	 */
	add : function(key, obj){
		var me = this;
		if(Ext.typeOf(key) == 'array'){
			Ext.each(key, function(keyObj, index, array){
				me.add(keyObj, obj);
			});
		}else{
			var array = this.map.getByKey(key);
			this.map.removeAtKey(key);
			array = this.appendData(array, obj);
			this.map.add(key, array);
			//Ext.ux.messaging.Logger.log(this,'add','Added ' + key + ' with ' + Ext.getClassName(obj) + ' in Notification Map');
			return array;
		}
		return obj;
    },
    
    /**
	 * This is for extended functionality of adding an array as object value instead 
	 * @param key
	 * @param obj
	 * @returns
	 */
	notify : function(notifierId, topicId, message){
		 var array = this.map.getByKey(topicId);
		 if(array && Ext.typeOf(array) == 'array'){
			 Ext.each(array, function(notificationLsnr, index, dataItself){
				 notificationLsnr.notified(notifierId, topicId, message);
				 Ext.ux.messaging.Logger.log(this, 'notify','Notified: '+Ext.getClassName(notificationLsnr) + ' for ' + topicId + ' with ' + message + ' -BY: ' + Ext.getClassName(notifierId));
			 });
		 }
		 return true;
    },
    
    /**
	 * This is for extended functionality of removing an array as object value 
	 * @param key
	 * @param obj
	 * @returns
	 */
	remove : function(key, obj){
        //check map for new key
		if(!key){
			Ext.ux.messaging.Logger.error(this, 'remove',{name: 'Invalid Key', message: 'Key is Undefined'});
			return;
		}
		if(!obj){
			Ext.ux.messaging.Logger.error(this, 'remove',{name: 'Invalid Object', message: 'Object is Undefined'});
			return;
		}
		
		var me = this;
		if(Ext.typeOf(key) == 'array'){
			Ext.each(key, function(keyObj, index, array){
				var array = me.map.getByKey(keyObj);
				me.map.removeAtKey(keyObj);
				array = me.removeData(array, obj);
				me.map.add(keyObj, array);
				Ext.ux.messaging.Logger.log(this,'remove','Removed ' + keyObj + ' with ' + Ext.getClassName(obj) + ' in Notification Map');
			});
		} else{
			var array = this.map.getByKey(key);
			this.map.removeAtKey(key);
			array = this.removeData(array, obj);
			 this.map.add(key, array);
			Ext.ux.messaging.Logger.log(this,'remove','Removed ' + key + ' with ' + Ext.getClassName(obj) + ' in Notification Map');
			
		}
		return obj;
    },
    
    /**
	 * This is for extended functionality of adding an array as object value instead 
	 * @param key
	 * @param obj
	 * @returns
	 */
	removeKey : function(key){
		return this.map.removeAtKey(key);
    }
    
});