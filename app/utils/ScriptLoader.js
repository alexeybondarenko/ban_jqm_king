/**
 * Class constructor for the script loader
 * this class loads the required script files synchronously 
 * singleton pattern
 * @param none
 */
function ScriptLoader() {
	if (ScriptLoader.SINGLETON) {
		throw "This class is a singleton, call getInstance() to retrieve the singleton instance.";
	}
}

//singleton instance
ScriptLoader.SINGLETON = new ScriptLoader();

/**
 * when object is printed out in the console
 */
ScriptLoader.prototype.toString = function() {
	return "[singleton ScriptLoader]";
}

/**
 * static function to retrieve the singleton instance
 * @param none
 */
ScriptLoader.getInstance = function() {
	return ScriptLoader.SINGLETON;
} 	

/**
 * load a script file synchronously
 * @param url, String path to the file
 */
ScriptLoader.prototype.loadScript = function(url)
{
	$.ajaxSetup({async: false});
	$.getScript(url);	
	$.ajaxSetup({async: true});
}





