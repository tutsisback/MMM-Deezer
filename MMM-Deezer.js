/* global Module */

/* Magic Mirror
 * Module: MMM-Deezer
 *
 * By 
 * MIT Licensed.
 */

Module.register("MMM-Deezer", {
	defaults: {
		updateInterval: 60000,
		retryDelay: 5000
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
		
		var self = this;
		this.sendSocketNotification("START","starting");

		//Flag for check if module is loaded
		this.loaded = false;

		// Schedule update timer.
		setInterval(function() {
			self.updateDom();
		}, this.config.updateInterval);
	},

	/* scheduleUpdate()
	 * Schedule next update.
	 *
	 * argument delay number - Milliseconds before next update.
	 *  If empty, this.config.updateInterval is used.
	 */
	scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}
		nextLoad = nextLoad ;
		var self = this;
		setTimeout(function() {
			self.getData();
		}, nextLoad);
	},

	getDom: function() {
		var self = this;

		// create element wrapper for show into the module
		var wrapper = document.createElement("div");

		/*var corps = document.createElement("iframe");
		corps.scrolling = "no";
		corps.style.border = "0";
		corps.src = this.file("deezer.html");
		wrapper.appendChild(corps);*/
		
		var dzroot = document.createElement("div");
		dzroot.id = "dz-root";
		wrapper.appendChild(dzroot);
		var mod = document.createElement("div");
		mod.id = "main";
		var title = document.createElement("div");
		title.id = "title";
		title.innerHTML ="Loading";
		mod.appendChild(title);
		var mybr = document.createElement("br");
		mod.appendChild(mybr);
		var slider_seek = document.createElement("div");
		slider_seek.className = "progressbarplay";
		slider_seek.id = "slider_seek";
		var bar = document.createElement("div");
		bar.className ="bar";
		slider_seek.appendChild(bar);
		mod.appendChild(slider_seek);
		var mybr2 = document.createElement("br");
		mod.appendChild(mybr2);
		var controlers = document.createElement("div");
		controlers.id = "controlers";
		var pradio = document.createElement("input");
		pradio.type = "button";
		//pradio.setAttribute("onClick","DZ.player.playRadio(11114829, 'user'); return false;");
		pradio.addEventListener("click", function() {
			console.log("message1");
			console.log(DZ.player);
			DZ.player.playRadio(11114829, 'user');
			console.log("message2");
			return false;
			console.log("message3");
		});
		pradio.value = "Loved songs";
		controlers.appendChild(pradio);
		var mybr3 = document.createElement("br");
		controlers.appendChild(mybr3);


		mod.appendChild(controlers);
		wrapper.appendChild(mod);
  				

    		/*<input type="button" onclick="DZ.player.play(); return false;" value="play"/>
    		<input type="button" onclick="DZ.player.pause(); return false;" value="pause"/>
    		<input type="button" onclick="DZ.player.prev(); return false;" value="prev"/>
    		<input type="button" onclick="DZ.player.next(); return false;" value="next"/>
    		<br/>
    		<input type="button" onclick="DZ.player.setVolume(20); return false;" value="set Volume 20"/>
    		<input type="button" onclick="DZ.player.setVolume(80); return false;" value="set Volume 80"/>
  		</div>	*/
		return wrapper;
	},

	getScripts: function() {
		return [
			"https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js",
    			"https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js",
    			"https://e-cdns-files.dzcdn.net/js/min/dz.js"
		];
	},

	getStyles: function () {
		return [
			"MMM-Deezer.css",
			"font-awesome.css"
		];
	},

	// Load translations files
	getTranslations: function() {
		//FIXME: This can be load a one file javascript definition
		return {
			en: "translations/en.json",
			es: "translations/es.json"
		};
	},

	// socketNotificationReceived from helper
	notificationReceived: function (notification, payload, sender ) {
		if(notification === "DOM_OBJECTS_CREATED") {
			console.log("loaded");
			this.loaded = true;
			DZ.init({
            			appId  : '8',
            			channelUrl : 'https://developers.deezer.com/examples/channel.php',
            			player : {
                			onload : this.onPlayerLoaded
            			}
        		});
		}
		if(notification === "START") {
			console.log("starting");
		}
	},

	event_listener_append: function() {
        	var pre = document.getElementById('event_listener');
        	var line = [];
        	for (var i = 0; i < arguments.length; i++) {
            	line.push(arguments[i]);
        	}
        	pre.innerHTML += line.join(' ') + "\n";
    	},

    	onPlayerLoaded: function() {
        	$("#controlers input").attr('disabled', false);
        	//event_listener_append('player_loaded');
        	document.getElementById('title').innerHTML = "Ready to play !";
        	document.getElementById('dzplayer').style.width = "0px";
        	document.getElementById('dzplayer').style.height = "0px";
        	DZ.Event.subscribe('current_track', function(arg){
			console.log(" cur : " + arg.track.title);
            		//event_listener_append('current_track', arg.index, arg.track.title, arg.track.album.title);
            		document.getElementById('title').innerHTML = arg.track.title + " - " + arg.track.artist.name + " - " + arg.track.album.title;
		});
        	DZ.Event.subscribe('player_position', function(arg){
            		//event_listener_append('position', arg[0], arg[1]);
            		$("#slider_seek").find('.bar').css('width', (100*arg[0]/arg[1]) + '%');
        	});	
        	DZ.Event.subscribe('track_end', function() {
            		//event_listener_append('track_end');
        	});
    	}
});
