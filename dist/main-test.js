"use strict";

window.$ = document.querySelector.bind(document);
window.$$ = document.querySelectorAll.bind(document);

if (!Array.prototype['includes']) {
  Array.prototype.includes = function (e) {
    return this.indexOf(e) >= 0;
  };
}

HTMLElement.prototype.appendNChildren = function (numElems, className) {
  var _this = this;

  var reverseNumbering = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
  var callback = arguments[3];

  Utils.repeatNTimes(numElems, function (n) {
    var div = document.createElement("div");
    div.className = className + " " + className + "-" + (reverseNumbering ? numElems - 1 - n : n);
    _this.appendChild(div);
    if (callback) callback(div, n);
  });
};

HTMLElement.prototype.css = function (map) {
  var _this2 = this;

  Object.keys(map).forEach(function (key) {
    _this2.style[key] = map[key];
  });
};
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LegoSpace = function () {
  function LegoSpace() {
    _classCallCheck(this, LegoSpace);

    this.elem = $("#lego-space");
    this.xPlane;
    this.yPlane;
    this.zPlane;

    // Transform styles are set here so they can be modified from this.elem.style.transform
    this.elem.style.transform = "rotateX(-10deg) rotateY(-3deg)";
  }

  // Rotate the lego space


  _createClass(LegoSpace, [{
    key: "orbit",
    value: function orbit(startCoords, endCoords) {
      var t = new Transform($("#lego-space").style.transform);
      var magicNumber = .2; //how much should the axis rotate for a given distance mouse movement
      var existingDegX = t.getPropValueInDegree("rotateX");
      var existingDegY = t.getPropValueInDegree("rotateY");
      var xDeg = Math.round((endCoords[0] - startCoords[0]) * magicNumber) + existingDegY;
      var yDeg = Math.round((endCoords[1] - startCoords[1]) * -1 * magicNumber) + existingDegX;
      t.transform["rotateX"] = yDeg + "deg";
      t.transform["rotateY"] = xDeg + "deg";
      $("#lego-space").style.transform = t.toString();
    }
  }, {
    key: "pan",
    value: function pan(startCoords, endCoords) {
      var t = new Transform($("#lego-space").style.transform);
      var magicNumber = 1;
      var translateY = parseInt(t.transform.translateY || 0, 10);
      var translateX = parseInt(t.transform.translateX || 0, 10);
      var xDist = Math.round((endCoords[0] - startCoords[0]) * magicNumber) + translateX;
      var yDist = Math.round((endCoords[1] - startCoords[1]) * magicNumber) + translateY;
      t.transform["translateX"] = xDist + "px";
      t.transform["translateY"] = yDist + "px";
      $("#lego-space").style.transform = t.toString();
    }
  }, {
    key: "zoom",
    value: function zoom(zoomAmt) {
      var t = new Transform($("#lego-space").style.transform);
      var magicNumber = .001; //amount to increase scale by
      var baseScale = 1;

      if (t.transform["scale3d"]) {
        baseScale = t.transform["scale3d"];
        baseScale = baseScale.split(",")[0].trim();
        baseScale = parseFloat(baseScale);
      }

      var newScale = magicNumber * zoomAmt + baseScale;
      t.transform["scale3d"] = newScale + ", " + newScale + ", " + newScale;
      $("#lego-space").style.transform = t.toString();
    }
  }]);

  return LegoSpace;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Plane = function () {
  function Plane(legoSpace, planeDimension) {
    _classCallCheck(this, Plane);

    // Create the dom nodes for the plane
    this.planeDimension = planeDimension;
    this.elem = document.createElement("div");
    this.elem.className = "plane plane-" + this.planeDimension;
    $("#lego-space").appendChild(this.elem);

    //add axis line
    this.axis = document.createElement("hr");
    this.axis.className = "axis axis-" + planeDimension;
    this.elem.appendChild(this.axis);

    //add cols, rows
    this.elem.appendNChildren(10, "row", true, function (parent) {
      parent.appendNChildren(10, "cell");
    });

    //position at origin
    // this.elem.style.top = legoSpace.origin.y + "px";
    // this.elem.style.left = legoSpace.origin.x + "px";

    this.rotateAboutOrigin();
  }

  //subclass


  _createClass(Plane, [{
    key: "rotateAboutOrigin",
    value: function rotateAboutOrigin() {}
  }]);

  return Plane;
}();

var YPlane = function (_Plane) {
  _inherits(YPlane, _Plane);

  function YPlane(legoSpace) {
    _classCallCheck(this, YPlane);

    return _possibleConstructorReturn(this, (YPlane.__proto__ || Object.getPrototypeOf(YPlane)).call(this, legoSpace, "y"));
  }

  _createClass(YPlane, [{
    key: "rotateAboutOrigin",
    value: function rotateAboutOrigin() {
      this.axis.style.transform = "rotate(-90deg)";
    }
  }]);

  return YPlane;
}(Plane);

var XPlane = function (_Plane2) {
  _inherits(XPlane, _Plane2);

  function XPlane(legoSpace) {
    _classCallCheck(this, XPlane);

    return _possibleConstructorReturn(this, (XPlane.__proto__ || Object.getPrototypeOf(XPlane)).call(this, legoSpace, "x"));
  }

  _createClass(XPlane, [{
    key: "rotateAboutOrigin",
    value: function rotateAboutOrigin() {
      this.elem.style.transform = "rotateX(-90deg)";
    }
  }]);

  return XPlane;
}(Plane);

var ZPlane = function (_Plane3) {
  _inherits(ZPlane, _Plane3);

  function ZPlane(legoSpace) {
    _classCallCheck(this, ZPlane);

    return _possibleConstructorReturn(this, (ZPlane.__proto__ || Object.getPrototypeOf(ZPlane)).call(this, legoSpace, "z"));
  }

  _createClass(ZPlane, [{
    key: "rotateAboutOrigin",
    value: function rotateAboutOrigin() {
      this.elem.style.transform = "rotateY(-90deg)";
    }
  }]);

  return ZPlane;
}(Plane);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Lego = function () {
  function Lego(sourceLegoPile, startClientX, startClientY) {
    _classCallCheck(this, Lego);

    this.xPlaneRow = 0;
    this.xPlaneCell = 0;
    this.xPlaneHeight = 0;

    this.offsetY = 0;
    this.mousePath = new MousePath(startClientX, startClientY);

    var legoTemplate = $("#lego-template");
    this.elem = document.importNode(legoTemplate.content, true).children[0];
    $(".plane-x").appendChild(this.elem);

    //set the color
    this.elem.classList.add(sourceLegoPile.classList[1]);
  }

  _createClass(Lego, [{
    key: "getCell",
    value: function getCell() {
      return $(".plane-x .row-" + this.xPlaneRow + " .cell-" + this.xPlaneCell);
    }
  }, {
    key: "drag",
    value: function drag(eventX, eventY) {
      eventY += this.offsetY;

      var that = this;
      function updateLocation(styleProp, styleVal, coord) {
        if (that.isCollision()) {
          console.log("collision!");
        } else {
          that.elem.style[styleProp] = styleVal;
          $$('.plane-x .cell.active').forEach(function (cell) {
            cell.classList.remove("active");
          });
          that.getCell().classList.add("active");
          console.log("drag " + coord + "rem " + styleProp);
        }
      }

      //console.log("event: " + eventX + " " + eventY);
      var xPlaneRect = $(".plane-x").getBoundingClientRect();
      // console.log(`drag x:${eventX} y:${eventY} lego x:${this.elem.style.left} y:${this.elem.style.top}`);

      var styleProp, style, coord;

      // can only move [y] or [x,z] dimensions at a time!
      var axis = this.mousePath.onDragGetAxes(eventX, eventY);
      // console.log(`axes to update: ${axis}`);

      // Z
      if (axis.includes('z')) {
        try {
          coord = this.mousePath.getCoordForAxis2('z', eventX, eventY, "top", this.getYHeight());
          this.xPlaneRow = 9 - coord;
          updateLocation("top", coord + "rem", coord);
        } catch (ex) {
          return;
        }
      }

      // X
      if (axis.includes('x')) {
        try {
          coord = this.mousePath.getCoordForAxis2('x', eventX, eventY, "left", this.getYHeight());
          this.xPlaneCell = coord;
          updateLocation("left", coord + "rem", coord);
        } catch (ex) {
          return;
        }
      }

      // Y //TODO update this to use getCoordForAxis
      if (axis.includes('y')) {
        var yPlaneRect = $(".plane-y").getBoundingClientRect();
        var xPlaneCell = this.getCell();
        var xPlaneCellBottom = xPlaneCell.getBoundingClientRect().bottom;
        var yPlaneHeight = yPlaneRect.bottom - yPlaneRect.top;

        var legoZxy;
        if (eventY < xPlaneCellBottom - yPlaneHeight) {
          legoZxy = "9";
        } else if (eventY > xPlaneCellBottom) {
          legoZxy = "0";
        } else {
          legoZxy = (xPlaneCellBottom - eventY) / yPlaneHeight;
          legoZxy = Math.floor(legoZxy * 10);
        }

        // console.log(`y axis: ${legoZxy} cellBottom: ${xPlaneCellBottom} eventY: ${eventY}`);
        this.xPlaneHeight = legoZxy;
        updateLocation("transform", "translateZ(" + legoZxy * -1 + "rem)", legoZxy * -1);
      }

      // console.log(`coords: ${this.xPlaneCell}, ${this.xPlaneRow}`);
    }

    //return the height of this lego, in px, above the x plane

  }, {
    key: "getYHeight",
    value: function getYHeight() {
      var yPlaneRect = $(".plane-y").getBoundingClientRect();
      var yPlaneHeight = yPlaneRect.bottom - yPlaneRect.top;
      return this.xPlaneHeight * .1 * yPlaneHeight;
    }
  }, {
    key: "place",
    value: function place() {
      try {
        var landingCell = this.getCell();
        var currStackSize = landingCell['currStackSize'] || 0;

        landingCell['currStackSize'] = currStackSize + 1;
        lego.elem.style.transform = "translateZ(" + currStackSize * -1 + "rem)";

        this.elem.legoObj = this;
        this.elem.addEventListener("dragstart", onDragStartExistingLego);
        this.elem.addEventListener("drag", onDrag);
        this.elem.addEventListener("dragend", onDragEnd);
      } catch (ex) {
        console.log("looing for " + (".plane-x .row-" + this.xPlaneRow + " .cell-" + this.xPlaneCell));
        consoel.err(ex);
      }
    }
  }, {
    key: "unplace",
    value: function unplace() {
      var landingCell = this.getCell();
      if (landingCell['currStackSize']) {
        landingCell['currStackSize'] = landingCell['currStackSize'] - 1;
      }
    }
  }, {
    key: "isCollision",
    value: function isCollision() {
      var landingCell = this.getCell();
      var currStackSize = landingCell['currStackSize'] || 0;
      return currStackSize > this.xPlaneHeight;
    }
  }]);

  return Lego;
}();
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Responsible for determining the axis the mouse is moving along
var MousePath = function () {
  function MousePath(startClientX, startClientY) {
    _classCallCheck(this, MousePath);

    this.lastClientX = startClientX;
    this.lastClientY = startClientY;
    this.isInitialDrag = true;
  }

  // returns lr or tb, depending if the orientation is primarily left-right or up-down


  _createClass(MousePath, [{
    key: 'getAxisClosestsToMovement',


    // Try to figure out which axis the user is moving the lego along
    // this is done by getting the angle of movement of the mouse,
    // the angles of the 3 axes, and returning the axis with the angle
    // closest to the mouse movement
    value: function getAxisClosestsToMovement(eventX, eventY) {

      var mouseAngle = Utils.calculateAngle(eventX - this.lastClientX, eventY - this.lastClientY);
      var closest = [];

      //get the axis angles
      $$(".axis").forEach(function (axis) {
        var rect = axis.getBoundingClientRect();
        var angle = Utils.calculateAngle(rect.right - rect.left, rect.bottom - rect.top);
        var axisName = axis.className.match(/axis-([xyz])/i)[1];
        // console.log(`axis: ${axisName} angle: ${angle} top: ${rect.top} bottom: ${rect.bottom} left: ${rect.left} right: ${rect.right}`);
        closest.push([axisName, angle, Math.abs(mouseAngle - angle)]);
      });

      closest.sort(function (a, b) {
        return a[2] - b[2];
      });

      // var log = `mouse angle: ${mouseAngle} -> ${Math.abs(eventX - this.lastClientX)} x ${Math.abs(eventY - this.lastClientY)}\n`;
      // closest.forEach( e => {log += `${e[0]}: ${e[1]}\n`});
      // console.log(log);

      return closest.map(function (ar) {
        return ar[0];
      })[0];
    }
  }, {
    key: 'onDragGetAxes',
    value: function onDragGetAxes(eventX, eventY) {
      var axis = this.getAxisClosestsToMovement(eventX, eventY);
      //x,z can be updated at the same time
      //y only updated by itself for now
      if (axis[0] == 'y' && !this.isInitialDrag) {
        axis = ['y'];
      } else {
        axis = ['x', 'z'];
      }

      //update last xy
      this.lastClientX = eventX;
      this.lastClientY = eventY;
      this.isInitialDrag = false;

      return axis;
    }
  }, {
    key: 'getCoordForAxis2',
    value: function getCoordForAxis2(axis, eventXScreen, eventYScreen, positioningProperty, xPlaneHeight) {
      var startCellPlane, endCellPlane, startEdgePositioning;
      console.log("axis: " + axis);
      eventYScreen = eventYScreen + xPlaneHeight;

      var _Utils$getCellAtCoord = Utils.getCellAtCoords(eventXScreen, eventYScreen);

      var _Utils$getCellAtCoord2 = _slicedToArray(_Utils$getCellAtCoord, 3);

      var currCell = _Utils$getCellAtCoord2[0];
      var xPlaneCell = _Utils$getCellAtCoord2[1];
      var xPlaneRow = _Utils$getCellAtCoord2[2];

      // Get the cells at the start and end of the line the lego is moving along

      if (axis == "z") {
        startCellPlane = $('.plane-x .row-9 .cell-' + xPlaneCell);
        endCellPlane = $('.plane-x .row-0 .cell-' + xPlaneCell);
      } else {
        startCellPlane = $('.plane-x .row-' + xPlaneRow + ' .cell-0');
        endCellPlane = $('.plane-x .row-' + xPlaneRow + ' .cell-9');
      }

      // Place a dot at the point where the leangth measurements should be made from (top|left|bottom|right middle)
      var startPoint = this.placePointOnCell(startCellPlane, positioningProperty);
      var endPoint = this.placePointOnCell(endCellPlane, Utils.getOpposingPosition(positioningProperty));
      var mousePoint = this.placePoint(document.body, { left: eventXScreen + "px", top: eventYScreen + "px", position: 'fixed' });

      // Calculate the distance of the line, from start to finish
      var startRect = startPoint.getBoundingClientRect();
      var endRect = endPoint.getBoundingClientRect();

      // Calculate distance between end and mouse coords
      var totalLineDist = Utils.calcDistance(startRect.left, startRect.top, endRect.right, endRect.bottom);
      var partialLineDist = Utils.calcDistance(eventXScreen, eventYScreen, startRect.left, startRect.top);
      var coordDist = partialLineDist / totalLineDist;
      coordDist = Math.floor(coordDist * 10);

      // delete points
      startPoint.remove();
      endPoint.remove();
      mousePoint.remove();

      if (coordDist < 0) coordDist = 0;
      if (coordDist > 9) coordDist = 9;

      return coordDist;
    }
  }, {
    key: 'placePointOnCell',
    value: function placePointOnCell(cell, positioningProperty) {
      var css = {};
      css[positioningProperty] = "0";
      css[Utils.getAdjacentPosition(positioningProperty)] = "50%";
      return this.placePoint(cell, css);
    }
  }, {
    key: 'placePoint',
    value: function placePoint(parent, css) {
      var div = document.createElement("div");
      div.className = "point";
      div.css(css);
      parent.appendChild(div);
      return div;
    }

    // Given the axis and mouse pos., get the coordinate the lego should be placed at for the given axis

  }, {
    key: 'getCoordForAxis',
    value: function getCoordForAxis(axis, eventXScreen, eventYScreen, positioningProperty) {
      // vars ending in Screen are on the screen (xy) coordinate system
      // vars ending in Plane are along the plane's coordinate system
      var startEdgeScreen, endEdgeScreen, mousePosScreen, startEdgePositioning;
      // var planeRectScreen = $(`.plane-${axis}`).getBoundingClientRect();
      var xPlaneRectScreen = $('.plane-x').getBoundingClientRect();
      var orientation = MousePath.getAxisOrientation(axis);
      console.log("orientation: " + orientation + " eventX: " + eventXScreen + " eventY: " + eventYScreen);

      // yHieght = the height above the floor the lego is
      // adding yHeight to eventY will give the y coord as if the lego was on the plane
      // TODO this is probably broken
      var yHeight = 0;
      // if (axis == 'y' && orienataion == 'tb') {
      //   let yPlaneTop = $(`.plane-y .row-${this.xPlaneHeight}`).getBoundingClientRect().top;
      //   let yPlaneBottom = $(`.plane-y .row-0`).getBoundingClientRect().top;
      //   yHeight =  Math.floor(yPlaneBottom - yPlaneTop);
      // }

      if (orientation == 'lr') {
        startEdgeScreen = xPlaneRectScreen.left;
        endEdgeScreen = xPlaneRectScreen.right;
        mousePosScreen = eventXScreen;
        startEdgePositioning = 'left';
      } else {
        startEdgeScreen = xPlaneRectScreen.top;
        endEdgeScreen = xPlaneRectScreen.bottom;
        mousePosScreen = eventYScreen;
        startEdgePositioning = 'top';
      }

      var reverse = this._shouldReverse('.plane-x', startEdgeScreen, startEdgePositioning, positioningProperty);

      // If reverse, then 9 is the start coord, and 0 is the end coord
      var startEdgePlane = 0,
          endEdgePlane = 9;
      if (reverse) {
        var _ref = [endEdgePlane, startEdgePlane];
        startEdgePlane = _ref[0];
        endEdgePlane = _ref[1];
      }

      // width of the axis on the plane, on the screen (in the given orienataion)
      var planeWidthScreen = endEdgeScreen - startEdgeScreen;
      var mouseDistFromStartEdgeScreen = mousePosScreen - startEdgeScreen;
      var coordOnAxis;
      if (mousePosScreen + yHeight < startEdgeScreen) {
        coordOnAxis = startEdgePlane;
      } else if (mousePosScreen + yHeight > endEdgeScreen) {
        coordOnAxis = endEdgePlane;
      } else {
        coordOnAxis = (mouseDistFromStartEdgeScreen + yHeight) / planeWidthScreen;
        coordOnAxis = Math.floor(coordOnAxis * 10);
        if (reverse) coordOnAxis = startEdgePlane - coordOnAxis;
      }

      return coordOnAxis;
    }

    // When the coordinate plane start (top/left) and the startEdgeScreen are not on the same
    // the coordinates have to reversed (0 becomes 9, 9 becomes 0)
    // startEdge - px value of the startEdge
    // startEdgePos - the position property used (left or top)
    // positioningProperty - the style the plane uses to place the lego (top or left)

  }, {
    key: '_shouldReverse',
    value: function _shouldReverse(planeId, startEdge, startEdgePos, positioningProperty) {
      // To figure out if startEdgeScreen is the same edge as the plane starting edge:
      var planeElem = $(planeId);

      // place a 1x100% div at the top of the plane (plane coords)
      var styles = { position: 'absolute', top: '0', left: '0' };
      if (positioningProperty == "top") {
        styles['height'] = '1px';
        styles['width'] = '100%';
      } else {
        styles['width'] = '1px';
        styles['height'] = '100%';
      }

      var div = document.createElement("div");
      div.css(styles);
      planeElem.appendChild(div);

      //getRect on the div (screen coords)
      var divRectScreen = div.getBoundingClientRect();

      //get the startEdgePos property of getRect
      var divStartEdge = divRectScreen[startEdgePos];

      //it should match startEdge - if within 50px probably the same edge
      var diff = Math.abs(divStartEdge - startEdge);
      div.remove();

      return diff > 50;
    }
  }], [{
    key: 'getAxisOrientation',
    value: function getAxisOrientation(axis) {
      var axisElem = $('.axis-' + axis);
      var rect = axisElem.getBoundingClientRect();
      var angle = Utils.calculateAngle(rect.right - rect.left, rect.bottom - rect.top);
      console.log("angle: " + angle);
      return angle > 45 ? 'tb' : 'lr';
    }
  }]);

  return MousePath;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: "repeatNTimes",
    value: function repeatNTimes(n, callback) {
      for (var i = 0; i < n; i++) {
        callback(i);
      }
    }
  }, {
    key: "addHandlers",
    value: function addHandlers(selector, eventType, eventHandler) {
      $$(selector).forEach(function (elem) {
        elem.addEventListener(eventType, eventHandler);
      });
    }

    /*------- Mouse ---------*/

    // Given a callback, and x, y coordinates, only execute the callback if the coordinates have changed
    // by more than minPointerDifference

  }, {
    key: "executeOnGreatEnoughChange",
    value: function executeOnGreatEnoughChange(x, y, minPointerDifference, name, callback) {

      if (!window['lastPointers']) {
        window.lastPointers = {};
      }

      var lastPointer = window.lastPointers[name];

      if (!lastPointer) {
        window.lastPointers[name] = [x, y];
        return callback(0);
      }

      var diff = Math.abs(x - lastPointer[0]) + Math.abs(y - lastPointer[1]);
      if (diff > minPointerDifference) {
        window.lastPointers[name] = [x, y];
        return callback(diff);
      }
    }
  }, {
    key: "calcDistance",
    value: function calcDistance(startX, startY, endX, endY) {
      var xDist = Math.abs(endX - startX);
      var yDist = Math.abs(endY - startY);
      return Math.floor(Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2)));
    }

    // return the angle, between 0-90

  }, {
    key: "calculateAngle",
    value: function calculateAngle(xDist, yDist) {
      var rad2deg = 180 / Math.PI;
      var x = Math.abs(xDist);
      var y = Math.abs(yDist);
      var degrees = Math.atan(y / x) * rad2deg;
      return degrees % 90;
    }

    /*------- CSS ---------*/

  }, {
    key: "setCursorStyle",
    value: function setCursorStyle(styleVal) {
      document.body.style.cursor = styleVal;
    }
  }, {
    key: "getOpposingPosition",
    value: function getOpposingPosition(position) {
      var opposingPositions = _defineProperty({ top: "bottom", bottom: "top", left: "right" }, "left", "right");
      return opposingPositions[position];
    }
  }, {
    key: "getAdjacentPosition",
    value: function getAdjacentPosition(position) {
      var adjacentPositions = { top: "left", bottom: "left", left: "top", right: "top" };
      return adjacentPositions[position];
    }

    /*------- Screen ---------*/
    //returns the cell, cell id, row id

  }, {
    key: "getCellAtCoords",
    value: function getCellAtCoords(eventXScreen, eventYScreen) {
      var currCell = document.elementFromPoint(eventXScreen, eventYScreen);

      if (!currCell) throw new Error("Unable to locate cell");

      //sometimes gets rows or legospace
      for (var i = 0; i < 10; i++) {
        if (!currCell.className.match(/cell/)) {
          eventYScreen -= i * 5; // - some amount from y to avoid landing on the row border, or lego face
          currCell = document.elementFromPoint(eventXScreen, eventYScreen);
        } else {
          break;
        }
      }

      //verify a cell //would be better to use jquery's parents()
      if (!currCell.className.match(/cell/) || !currCell.parentNode.parentNode.className.match(/plane-x/)) {
        console.log("not at cell");
        console.dir(currCell);
        throw new Error("Unable to find cell");
      }

      // currCell.style.backgroundColor = "yellow";
      var xPlaneCell = currCell.className.match(/cell-(\d+)/)[1];
      var xPlaneRow = currCell.parentNode.className.match(/row-(\d+)/)[1];
      return [currCell, xPlaneCell, xPlaneRow];
    }
  }]);

  return Utils;
}();
"use strict";

var ctrlKeyDown = false;
var shiftKeyDown = false;
var mouseBtnDown = false;
var mouseMiddleBtnDown = false;
var lastMouseCoords = [];

//---------- Pointer State ------------

function updatePointerState() {
  if (ctrlKeyDown || shiftKeyDown) {

    if (mouseBtnDown) {
      Utils.setCursorStyle("grabbing");
    } else {
      Utils.setCursorStyle("grab");
    }
  } else if (mouseMiddleBtnDown) {
    Utils.setCursorStyle("grabbing");
  } else {
    // default
    document.body.style.cursor = "default";
  }
}

//---------- Key events ------------
function keyDown(event) {
  // console.log("keyCode: " + event.keyCode);
  switch (event.keyCode) {
    case 17:
      ctrlKeyDown = true;
      break;
    case 16:
      shiftKeyDown = true;
      break;
    case 187: //+ Zoom In
    case 61:
      legoSpace.zoom(120);
      break;
    case 189: //- Zoom Out
    case 173:
      legoSpace.zoom(-120);
      break;
  }

  updatePointerState();
}

function keyUp(event) {
  if (event.keyCode === 17) ctrlKeyDown = false;
  if (event.keyCode == 16) shiftKeyDown = false;
  updatePointerState();
}

function mouseDown(event) {
  if (event.button === 0) mouseBtnDown = true;
  if (event.button === 1) mouseMiddleBtnDown = true;
  if (ctrlKeyDown || shiftKeyDown || mouseMiddleBtnDown) {
    lastMouseCoords = [event.clientX, event.clientY];
    event.preventDefault();
    updatePointerState();
  }
}

function mouseUp(event) {
  mouseBtnDown = false;
  mouseMiddleBtnDown = false;
  if (ctrlKeyDown || shiftKeyDown || event.button === 1) {
    updatePointerState();
    event.preventDefault();
  }
}

function mouseMove(event) {
  var action;
  // orbit
  if (ctrlKeyDown && mouseBtnDown || mouseMiddleBtnDown) action = legoSpace.orbit;
  // pan
  if (shiftKeyDown && mouseBtnDown) action = legoSpace.pan;

  if (action) {
    var currMouseCoords = [event.clientX, event.clientY];
    Utils.executeOnGreatEnoughChange(event.clientX, event.clientY, 10, 'mouseMove', function () {
      action(lastMouseCoords, currMouseCoords);
      lastMouseCoords = currMouseCoords;
    });
    event.preventDefault();
  }
}

function wheelMove(event) {
  legoSpace.zoom(event.deltaY);
  event.preventDefault();
}

function onMouseOver(event) {
  event.target.style.backgroundColor = "yellow";
}

//---------- Assign Event Handlers ------------
function initEventHandlers() {
  window.addEventListener("keydown", keyDown);
  window.addEventListener("keyup", keyUp);
  window.addEventListener("mousedown", mouseDown);
  window.addEventListener("mouseup", mouseUp);
  window.addEventListener("mousemove", mouseMove);
  $("#lego-space").addEventListener("wheel", wheelMove);
  initializeDrag();
  // Utils.addHandlers(".plane-x .cell", "mouseover", onMouseOver);

  //---------- Mobile --------------------------
  var hammertime = new Hammer($("#lego-space"), {});
  hammertime.get('pinch').set({ enable: true });
  hammertime.get('rotate').set({ enable: true });
  hammertime.on('pinchin', function (ev) {
    legoSpace.zoom(-10);
  });
  hammertime.on('pinchout', function (ev) {
    legoSpace.zoom(10);
  });
  hammertime.on('rotate', function (ev) {
    legoSpace.orbit([0, 0], [ev.deltaX * 0.1, ev.deltaY * 0.1]);
  });
}
"use strict";

var lego, currClientX, currClientY;

function onDragStart(event) {
  console.log("start drag!");
  //create a new lego
  lego = new Lego(event.target, event.clientX, event.clientY);
  _onDragStartCommon(event);
}

function onDragStartExistingLego(event) {
  console.log("start drag w/existing lego! ");
  lego = event.target.legoObj;
  lego.offsetY = event.offsetY;
  lego.unplace();
  _onDragStartCommon(event);
}

function _onDragStartCommon(event) {
  event.dataTransfer.setData('text/plain', null); //required for FF
  event.dataTransfer.dropEffect = "copy";
  event.dataTransfer.setDragImage($("#empty"), 0, 0);
}

function onDrag(event) {
  var clientX = event.clientX || currClientX || 0;
  var clientY = event.clientY || currClientY || 0;
  Utils.executeOnGreatEnoughChange(clientX, clientY, 30, 'dragLego', function (mouseChangeAmount) {
    // At mouse end mouse coords go off to the side
    if (mouseChangeAmount < 200) {
      //console.log(`at drag: x: ${clientX} y: ${clientY} yOffset: ${lego.offsetY}`);
      lego.drag(clientX, clientY);
    }
  });
}

function onDragEnd(event) {
  console.log("at drag end");
  lego.place();
}

function initializeDrag() {
  Utils.addHandlers(".lego-pile", "dragstart", onDragStart);
  Utils.addHandlers(".lego-pile", "drag", onDrag);
  Utils.addHandlers(".lego-pile", "dragend", onDragEnd);
  //Hack for FF
  document.addEventListener("dragover", function (event) {
    currClientX = event.clientX;
    currClientY = event.clientY;
  });
}
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Transform = function () {
  function Transform(transformStr) {
    _classCallCheck(this, Transform);

    this.transformStr = transformStr;
    this.transform = {};
    this._addProps();
  }

  _createClass(Transform, [{
    key: "_addProps",
    value: function _addProps() {
      var _this = this;

      var parts = this.transformStr.match(/[^\s]+?\([^\)]+?\)/g);
      parts.forEach(function (part) {
        var r = new RegExp("(.+?)\\((.+?)\\)", 'g').exec(part);
        if (r && r.length > 1) _this.transform[r[1]] = r[2];
      });
    }
  }, {
    key: "getPropValueInDegree",
    value: function getPropValueInDegree(prop) {
      var result = this.transform[prop];
      result = result.replace("deg", "");
      result = parseInt(result, 10);
      return result;
    }
  }, {
    key: "toString",
    value: function toString() {
      var _this2 = this;

      var tmpArray = [];
      Object.keys(this.transform).forEach(function (key) {
        tmpArray.push(key + "(" + _this2.transform[key] + ")");
      });
      return tmpArray.join(" ");
    }
  }]);

  return Transform;
}();