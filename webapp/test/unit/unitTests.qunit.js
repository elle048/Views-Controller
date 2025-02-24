/* global QUnit */
// https://api.qunitjs.com/config/autostart/
QUnit.config.autostart = false;

sap.ui.require([
	"comtraining/day3exer1_baranco/test/unit/AllTests"
], function (Controller) {
	"use strict";
	QUnit.start();
});