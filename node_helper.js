/* Magic Mirror
 * Node Helper: MMM-Deezer
 *
 * By 
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
	
	start: function(){
		console.log("Starting node helper: " + this.name);
		this.config = {};
	},

	// Override socketNotificationReceived method.

	/* socketNotificationReceived(notification, payload)
	 * This method is called when a socket notification arrives.
	 *
	 * argument notification string - The identifier of the noitication.
	 * argument payload mixed - The payload of the notification.
	 */
	socketNotificationReceived: function(notification, payload) {
		if (notification === "DOM_OBJECTS_CREATED") {
			console.log("DOM OK");
			}
	},

	// Example function send notification test
	sendNotificationTest: function(payload) {
		this.sendSocketNotification("MMM-Deezer-NOTIFICATION_TEST", payload);
	},

});
