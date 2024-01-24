/**
 * @license
 * Copyright 2020 Sébastien CANET
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * @fileoverview Helper functions for selecting and changing boards.
 * @author scanet@libreduc.cc (Sébastien CANET)
 */

'use strict';

goog.provide('Blockly.Boards');

//set default profile
profile.default = profile["none"][0];

/**
 * Set board when click in board modal
 */
Code.setBoard = function (boardId) {
	if (boardId == undefined) {
		boardId = Code.getStringParamFromUrl('board', '');
	}
    if (!boardId) {
        boardId = "none";
    }
    document.getElementById('boardMenu').value = boardId;
    profile.default = profile[boardId][0];
};

/**
 * Set board throught URL or directly
 * 
 * allowed values for boardId:
 * 
 * - undefined
 * - "arduino_leonardo"
 * - "arduino_mega"
 * - "arduino_micro"
 * - "arduino_nano"
 * - "arduino_pro8"
 * - "arduino_pro16"
 * - "arduino_uno"
 * - "arduino_yun"
 * - "lilypad"
 * 
 * @param {string} boardId 
 */
Code.changeBoard = function (boardId) {
	var newBoard = boardId;

	if (boardId == undefined) {
		
		var boardMenu = document.getElementById('boardDescriptionSelector');


		newBoard = encodeURIComponent(boardMenu.options[boardMenu.selectedIndex].value);
		var search = window.location.search;
		if (search.length <= 1) {
			search = '?board=' + newBoard;
		} else if (search.match(/[?&]board=[^&]*/)) {
			search = search.replace(/([?&]board=)[^&]*/, '$1' + newBoard);
		} else {
			search = search.replace(/\?/, '?board=' + newBoard + '&');
		}
		profile["default"] = profile[newBoard][0];
		document.getElementById("boardDescriptionSelector").selectedIndex = newBoard;
		document.getElementById("boardDescriptionSelector").value = newBoard;
		document.getElementById("boardSelected_span").textContent = profile["default"].description;
		document.getElementById("portSelected_span").textContent = ' : ' + document.getElementById('serialMenu').options[document.getElementById('serialMenu').selectedIndex].value;
		window.history.pushState({}, "blocklyduino", window.location.host + window.location.pathname + search);
		// "reboot" elements
		document.getElementById('overlayForModals').style.display = "none";
		document.getElementById('boardListModal').classList.remove('show');
	}
	
	Code.setBoard(boardId);
	Code.buildToolbox();
	var xml = Blockly.Xml.workspaceToDom(Code.workspace);
	Blockly.Xml.domToWorkspace(xml, Code.workspace);
}
;

/**
 * Set COM port
 */
Code.setPort = function ()  {
    var serialPortMenu = document.getElementById('serialMenu');
    var newPort = encodeURIComponent(serialPortMenu.options[serialPortMenu.selectedIndex].value);
	document.getElementById('overlayForModals').style.display = "none";
	document.getElementById('portListModal').classList.remove('show');
	document.getElementById("portSelected_span").textContent = ' : ' + newPort;
	/*
	if (newPort != 'none') {
		document.getElementById('serialButton').classList.add('active');
		document.getElementById('serialButton').title = newPort;
		document.getElementById('serialButton').onmouseover = function () {
			document.getElementById("content_hoverButton").textContent = newPort;
		};
		document.getElementById('serialButton').onmouseout = function () {
			document.getElementById("content_hoverButton").textContent = "";
		}
	}
		else {
			document.getElementById('serialButton').classList.remove('active');
			document.getElementById('serialButton').title = MSG['serialButtonSpan'];
			document.getElementById('serialButton').onmouseover = function () {
				document.getElementById("content_hoverButton").textContent = MSG['serialButtonSpan'];
			};
			document.getElementById('serialButton').onmouseout = function () {
				document.getElementById("content_hoverButton").textContent = "";
			};
		}
	*/
}
;