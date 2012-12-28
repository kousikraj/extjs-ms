/**
 * @author KousikRaj, Kousikraj@gmail.com
 * 
 */
Ext.define('Ext.ux.messaging.Logger', {

    uses: ['Ext.Date'],
    singleton: true,

    getTimeString: function () {
        return Ext.Date.format(new Date(), 'H:i:s:u');
    },

    log: function (className, method, message) {
        try {
            className = Ext.getClassName(className);
            message = Ext.typeOf(message) == 'array' ? message.join(',') : message;
            className = Ext.typeOf(className) == 'array' ? className.join(',') : className;
            console.log(this.getTimeString() + '[' + className + '][' + method + ']' + message);
        } catch (e) {}
    },

    error: function (className, method, error) {
        try {
            className = Ext.getClassName(className);
            message = Ext.typeOf(message) == 'array' ? message.join(',') : message;
            className = Ext.typeOf(className) == 'array' ? className.join(',') : className;
            console.log(this.getTimeString() + '[' + className + '][' + method + ']' + error.name + ': ' + error.message);
        } catch (e) {}
    }

});
