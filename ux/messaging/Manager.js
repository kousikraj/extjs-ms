/**
 * @author KousikRaj, Kousikraj@gmail.com
 * THIS JAVASCRIPT FILE IS FOR ADDING COMMON FUNCTIONALITIES THAT ARE 
 * USED ACROSS APPLICATION
 */
Ext.define('Ext.ux.messaging.Manager', {
    name: 'Manager',
    statics: {
        registeredComponents: new Ext.util.MixedCollection(),
        registerComponent: function (objectId, object) {
            if (Ext.isEmpty(objectId) == false && Ext.isEmpty(object) == false) {
                if (Ext.isEmpty(this.registeredComponents)) {
                    this.registeredComponents = new Ext.util.MixedCollection();
                }
                this.registeredComponents.add(objectId, object);
            }
        },
        deRegisterComponent: function (objectId) {
            if (Ext.isEmpty(objectId) == false) {
                if (Ext.isEmpty(this.registeredComponents)) {
                    this.registeredComponents = new Ext.util.MixedCollection();
                }
                if (this.registeredComponents.containsKey(objectId)) {
                    this.registeredComponents.removeAtKey(objectId);
                }
            }
        }
    }
});