/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add('cache-plugin', function(Y) {

/**
 * Provides support to use Cache as a Plugin to a Base-based class.
 *
 * @module cache
 * @submodule cache-plugin
 */

/**
 * Plugin.Cache adds pluginizability to Cache.
 * @class Plugin.Cache
 * @extends Cache
 * @uses Plugin.Base
 */
function CachePlugin(config) {
    var cache = config && config.cache ? config.cache : Y.Cache,
        tmpclass = Y.Base.create("dataSourceCache", cache, [Y.Plugin.Base]),
        tmpinstance = new tmpclass(config);
    tmpclass.NS = "tmpClass";
    return tmpinstance;
}

Y.mix(CachePlugin, {
    /**
     * The namespace for the plugin. This will be the property on the host which
     * references the plugin instance.
     *
     * @property NS
     * @type String
     * @static
     * @final
     * @value "cache"
     */
    NS: "cache",

    /**
     * Class name.
     *
     * @property NAME
     * @type String
     * @static
     * @final
     * @value "dataSourceCache"
     */
    NAME: "cachePlugin"
});


Y.namespace("Plugin").Cache = CachePlugin;


}, '3.4.0' ,{requires:['plugin','cache-base']});
