cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
        "id": "cordova-plugin-camera.Camera",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "Camera"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
        "id": "cordova-plugin-camera.CameraPopoverOptions",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "CameraPopoverOptions"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/www/Camera.js",
        "id": "cordova-plugin-camera.camera",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "navigator.camera"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/src/browser/CameraProxy.js",
        "id": "cordova-plugin-camera.CameraProxy",
        "pluginId": "cordova-plugin-camera",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/src/browser/DeviceProxy.js",
        "id": "cordova-plugin-device.DeviceProxy",
        "pluginId": "cordova-plugin-device",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "id": "cordova-plugin-dialogs.notification",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/browser/notification.js",
        "id": "cordova-plugin-dialogs.notification_browser",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-vibration/www/vibration.js",
        "id": "cordova-plugin-vibration.notification",
        "pluginId": "cordova-plugin-vibration",
        "merges": [
            "navigator.notification",
            "navigator"
        ]
    },
    {
        "file": "plugins/cordova-plugin-vibration/src/browser/Vibration.js",
        "id": "cordova-plugin-vibration.Vibration",
        "pluginId": "cordova-plugin-vibration",
        "merges": [
            "navigator.notification",
            "navigator"
        ]
    },
    {
        "file": "plugins/flyacts-plugin-barcodescanner/www/barcodescanner.js",
        "id": "flyacts-plugin-barcodescanner.BarcodeScanner",
        "pluginId": "flyacts-plugin-barcodescanner",
        "clobbers": [
            "cordova.plugins.barcodeScanner"
        ]
    },
    {
        "file": "plugins/flyacts-plugin-barcodescanner/src/browser/BarcodeScannerProxy.js",
        "id": "flyacts-plugin-barcodescanner.BarcodeScannerProxy",
        "pluginId": "flyacts-plugin-barcodescanner",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-sqlite/www/SQLitePlugin.js",
        "id": "cordova-plugin-sqlite.SQLitePlugin",
        "pluginId": "cordova-plugin-sqlite",
        "clobbers": [
            "window.sqlitePlugin",
            "cordova.plugins.sqlitePlugin"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/src/browser/SplashScreenProxy.js",
        "id": "cordova-plugin-splashscreen.SplashScreenProxy",
        "pluginId": "cordova-plugin-splashscreen",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "id": "cordova-plugin-statusbar.statusbar",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/cordova-plugin-statusbar/src/browser/statusbar.js",
        "id": "cordova-plugin-statusbar.statusbar.Browser",
        "pluginId": "cordova-plugin-statusbar",
        "merges": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/cordova-plugin-barcodescanner/www/barcodescanner.js",
        "id": "cordova-plugin-barcodescanner.BarcodeScanner",
        "pluginId": "cordova-plugin-barcodescanner",
        "clobbers": [
            "cordova.plugins.barcodeScanner"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-camera": "2.1.1",
    "cordova-plugin-console": "1.0.2",
    "cordova-plugin-device": "1.1.1",
    "cordova-plugin-dialogs": "1.2.0",
    "cordova-plugin-vibration": "2.1.0",
    "cordova-plugin-whitelist": "1.2.1",
    "flyacts-plugin-barcodescanner": "4.1.3",
    "cordova-plugin-sqlite": "1.0.3",
    "cordova-plugin-splashscreen": "3.2.2",
    "cordova-plugin-statusbar": "2.1.3",
    "cordova-plugin-barcodescanner": "0.7.0"
}
// BOTTOM OF METADATA
});