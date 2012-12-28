/**
 * @author KousikRaj, Kousikraj@gmail.com
 * This class is a container that contains all the static constants
 * required for this application
 */

Ext.define('Ext.ux.messaging.Constants', {
	name				: 'constants',
	singleton			: true,
	topics: {
		/*for notification*/
		SHUTDOWN_HOOK		: 'SHUTDOWN_HOOK',
		REFRESH_HOOK		: 'REFRESH_HOOK',
		RELOAD				: 'RELOAD'
	}
});