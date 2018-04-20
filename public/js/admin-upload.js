/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 379);
/******/ })
/************************************************************************/
/******/ ({

/***/ 3:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 379:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(380);


/***/ }),

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__plugins_slim_slim_min_js__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__plugins_slim_slim_min_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__plugins_slim_slim_min_js__);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



var ss = __webpack_require__(381);
console.log(__WEBPACK_IMPORTED_MODULE_0__plugins_slim_slim_min_js___default.a);
console.log(ss);

__webpack_require__(382);

console.log(window.Slim);

Slim.prototype._upload = function (requestdata, e) {
    console.log(requestdata);

    var file = dataURLtoFile(requestdata.output.image, requestdata.input.name);
    var formdata = new FormData();
    formdata.append(this._output.name, file);

    var o = this._element.querySelector(".slim-upload-status");
    var a = this._options.willRequest;
    var i = this;

    m(this._options.service, formdata, a, function (t, e) {
        i._updateProgress(t / e);
    }, function (t) {
        setTimeout(function () {
            o.innerHTML = i._options.statusUploadSuccess, o.setAttribute("data-state", "success"), o.style.opacity = 1, setTimeout(function () {
                o.style.opacity = 0;
            }, 2e3);
        }, 250), e(null, t);
    }, function (t) {
        var n = "";
        n = "file-too-big" === t ? i._options.statusContentLength : i._options.statusUnknownResponse, setTimeout(function () {
            o.innerHTML = n, o.setAttribute("data-state", "error"), o.style.opacity = 1;
        }, 250), e(t);
    });
};

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
}

var d = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
    return typeof t === 'undefined' ? 'undefined' : _typeof(t);
} : function (t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t === 'undefined' ? 'undefined' : _typeof(t);
};

function m(t, e, i, n, o, a) {
    var r = new XMLHttpRequest();
    n && r.upload.addEventListener("progress", function (t) {
        n(t.loaded, t.total);
    }), r.open("POST", t, !0), i && i(r), r.onreadystatechange = function () {
        if (4 === r.readyState && 200 === r.status) {
            var t = r.responseText;
            if (!t.length) return void o();
            if (t.indexOf("Content-Length") !== -1) return void a("file-too-big");
            var e = void 0;
            try {
                e = JSON.parse(r.responseText);
            } catch (i) {}

            console.log(e);

            if ("object" === ("undefined" == typeof e ? "undefined" : d(e)) && "failure" === e.status) return void a(e.message);
            o(e || t);
        } else 4 === r.readyState && a("fail");
    }, r.send(e);
}

/***/ }),

/***/ 381:
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (t, e) {
  function i() {
    t.Slim.parse(document);
  }t && t.addEventListener && (t.Slim = function () {
    function t(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }function i(t) {
      return y[t ? t.toLowerCase() : t] || "unknown";
    }function n(t, e) {
      if (!(e >= 1)) {
        for (var i = Math.round(t.width * e), n = Math.round(t.height * e), o = Y(t), a = void 0, r = t.width, s = t.height; r > i && (r *= .5, s *= .5, !(r < i));) {
          o = k("canvas"), o.width = r, o.height = s, a = o.getContext("2d"), a.drawImage(t, 0, 0, r, s);
        }t.width = i, t.height = n, a = t.getContext("2d"), a.drawImage(o, 0, 0, i, n);
      }
    }!function () {
      function t(t, i) {
        i = i || { bubbles: !1, cancelable: !1, detail: e };var n = document.createEvent("CustomEvent");return n.initCustomEvent(t, i.bubbles, i.cancelable, i.detail), n;
      }t.prototype = window.CustomEvent.prototype, window.CustomEvent = t;
    }();var o = function o(t, e, i) {
      var n,
          a,
          r = document.createElement("img");if (r.onerror = e, r.onload = function () {
        !a || i && i.noRevoke || o.revokeObjectURL(a), e && e(o.scale(r, i));
      }, o.isInstanceOf("Blob", t) || o.isInstanceOf("File", t)) n = a = o.createObjectURL(t), r._type = t.type;else {
        if ("string" != typeof t) return !1;n = t, i && i.crossOrigin && (r.crossOrigin = i.crossOrigin);
      }return n ? (r.src = n, r) : o.readFile(t, function (t) {
        var i = t.target;i && i.result ? r.src = i.result : e && e(t);
      });
    },
        a = window.createObjectURL && window || window.URL && URL.revokeObjectURL && URL || window.webkitURL && webkitURL;o.isInstanceOf = function (t, e) {
      return Object.prototype.toString.call(e) === "[object " + t + "]";
    }, o.transformCoordinates = function () {}, o.getTransformedOptions = function (t, e) {
      var i,
          n,
          o,
          a,
          r = e.aspectRatio;if (!r) return e;i = {};for (n in e) {
        e.hasOwnProperty(n) && (i[n] = e[n]);
      }return i.crop = !0, o = t.naturalWidth || t.width, a = t.naturalHeight || t.height, o / a > r ? (i.maxWidth = a * r, i.maxHeight = a) : (i.maxWidth = o, i.maxHeight = o / r), i;
    }, o.renderImageToCanvas = function (t, e, i, n, o, a, r, s, h, u) {
      return t.getContext("2d").drawImage(e, i, n, o, a, r, s, h, u), t;
    }, o.hasCanvasOption = function (t) {
      return t.canvas || t.crop || !!t.aspectRatio;
    }, o.scale = function (t, i) {
      function n() {
        var t = Math.max((h || b) / b, (u || k) / k);t > 1 && (b *= t, k *= t);
      }function a() {
        var t = Math.min((r || b) / b, (s || k) / k);t < 1 && (b *= t, k *= t);
      }i = i || {};var r,
          s,
          h,
          u,
          l,
          c,
          p,
          d,
          f,
          m,
          _,
          g = document.createElement("canvas"),
          v = t.getContext || o.hasCanvasOption(i) && g.getContext,
          y = t.naturalWidth || t.width,
          w = t.naturalHeight || t.height,
          b = y,
          k = w;if (v && (i = o.getTransformedOptions(t, i), p = i.left || 0, d = i.top || 0, i.sourceWidth ? (l = i.sourceWidth, i.right !== e && i.left === e && (p = y - l - i.right)) : l = y - p - (i.right || 0), i.sourceHeight ? (c = i.sourceHeight, i.bottom !== e && i.top === e && (d = w - c - i.bottom)) : c = w - d - (i.bottom || 0), b = l, k = c), r = i.maxWidth, s = i.maxHeight, h = i.minWidth, u = i.minHeight, v && r && s && i.crop ? (b = r, k = s, _ = l / c - r / s, _ < 0 ? (c = s * l / r, i.top === e && i.bottom === e && (d = (w - c) / 2)) : _ > 0 && (l = r * c / s, i.left === e && i.right === e && (p = (y - l) / 2))) : ((i.contain || i.cover) && (h = r = r || h, u = s = s || u), i.cover ? (a(), n()) : (n(), a())), v) {
        if (f = i.pixelRatio, f > 1 && (g.style.width = b + "px", g.style.height = k + "px", b *= f, k *= f, g.getContext("2d").scale(f, f)), m = i.downsamplingRatio, m > 0 && m < 1 && b < l && k < c) for (; l * m > b;) {
          g.width = l * m, g.height = c * m, o.renderImageToCanvas(g, t, p, d, l, c, 0, 0, g.width, g.height), l = g.width, c = g.height, t = document.createElement("canvas"), t.width = l, t.height = c, o.renderImageToCanvas(t, g, 0, 0, l, c, 0, 0, l, c);
        }return g.width = b, g.height = k, o.transformCoordinates(g, i), o.renderImageToCanvas(g, t, p, d, l, c, 0, 0, b, k);
      }return t.width = b, t.height = k, t;
    }, o.createObjectURL = function (t) {
      return !!a && a.createObjectURL(t);
    }, o.revokeObjectURL = function (t) {
      return !!a && a.revokeObjectURL(t);
    }, o.readFile = function (t, e, i) {
      if (window.FileReader) {
        var n = new FileReader();if (n.onload = n.onerror = e, i = i || "readAsDataURL", n[i]) return n[i](t), n;
      }return !1;
    };var r = o.hasCanvasOption,
        s = o.transformCoordinates,
        h = o.getTransformedOptions;o.hasCanvasOption = function (t) {
      return !!t.orientation || r.call(o, t);
    }, o.transformCoordinates = function (t, e) {
      s.call(o, t, e);var i = t.getContext("2d"),
          n = t.width,
          a = t.height,
          r = t.style.width,
          h = t.style.height,
          u = e.orientation;if (u && !(u > 8)) switch (u > 4 && (t.width = a, t.height = n, t.style.width = h, t.style.height = r), u) {case 2:
          i.translate(n, 0), i.scale(-1, 1);break;case 3:
          i.translate(n, a), i.rotate(Math.PI);break;case 4:
          i.translate(0, a), i.scale(1, -1);break;case 5:
          i.rotate(.5 * Math.PI), i.scale(1, -1);break;case 6:
          i.rotate(.5 * Math.PI), i.translate(0, -a);break;case 7:
          i.rotate(.5 * Math.PI), i.translate(n, -a), i.scale(-1, 1);break;case 8:
          i.rotate(-.5 * Math.PI), i.translate(-n, 0);}
    }, o.getTransformedOptions = function (t, e) {
      var i,
          n,
          a = h.call(o, t, e),
          r = a.orientation;if (!r || r > 8 || 1 === r) return a;i = {};for (n in a) {
        a.hasOwnProperty(n) && (i[n] = a[n]);
      }switch (a.orientation) {case 2:
          i.left = a.right, i.right = a.left;break;case 3:
          i.left = a.right, i.top = a.bottom, i.right = a.left, i.bottom = a.top;break;case 4:
          i.top = a.bottom, i.bottom = a.top;break;case 5:
          i.left = a.top, i.top = a.left, i.right = a.bottom, i.bottom = a.right;break;case 6:
          i.left = a.top, i.top = a.right, i.right = a.bottom, i.bottom = a.left;break;case 7:
          i.left = a.bottom, i.top = a.right, i.right = a.top, i.bottom = a.left;break;case 8:
          i.left = a.bottom, i.top = a.left, i.right = a.top, i.bottom = a.right;}return a.orientation > 4 && (i.maxWidth = a.maxHeight, i.maxHeight = a.maxWidth, i.minWidth = a.minHeight, i.minHeight = a.minWidth, i.sourceWidth = a.sourceHeight, i.sourceHeight = a.sourceWidth), i;
    };var u = window.Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice);o.blobSlice = u && function () {
      var t = this.slice || this.webkitSlice || this.mozSlice;return t.apply(this, arguments);
    }, o.metaDataParsers = { jpeg: { 65505: [] } }, o.parseMetaData = function (t, e, i) {
      i = i || {};var n = this,
          a = i.maxMetaDataSize || 262144,
          r = {},
          s = !(window.DataView && t && t.size >= 12 && "image/jpeg" === t.type && o.blobSlice);!s && o.readFile(o.blobSlice.call(t, 0, a), function (t) {
        if (t.target.error) return void e(r);var a,
            s,
            h,
            u,
            l = t.target.result,
            c = new DataView(l),
            p = 2,
            d = c.byteLength - 4,
            f = p;if (65496 === c.getUint16(0)) {
          for (; p < d && (a = c.getUint16(p), a >= 65504 && a <= 65519 || 65534 === a) && (s = c.getUint16(p + 2) + 2, !(p + s > c.byteLength));) {
            if (h = o.metaDataParsers.jpeg[a]) for (u = 0; u < h.length; u += 1) {
              h[u].call(n, c, p, s, r, i);
            }p += s, f = p;
          }!i.disableImageHead && f > 6 && (l.slice ? r.imageHead = l.slice(0, f) : r.imageHead = new Uint8Array(l).subarray(0, f));
        }e(r);
      }, "readAsArrayBuffer") || e(r);
    }, o.ExifMap = function () {
      return this;
    }, o.ExifMap.prototype.map = { Orientation: 274 }, o.ExifMap.prototype.get = function (t) {
      return this[t] || this[this.map[t]];
    }, o.getExifThumbnail = function (t, e, i) {
      var n, o, a;if (i && !(e + i > t.byteLength)) {
        for (n = [], o = 0; o < i; o += 1) {
          a = t.getUint8(e + o), n.push((a < 16 ? "0" : "") + a.toString(16));
        }return "data:image/jpeg,%" + n.join("%");
      }
    }, o.exifTagTypes = { 1: { getValue: function getValue(t, e) {
          return t.getUint8(e);
        }, size: 1 }, 2: { getValue: function getValue(t, e) {
          return String.fromCharCode(t.getUint8(e));
        }, size: 1, ascii: !0 }, 3: { getValue: function getValue(t, e, i) {
          return t.getUint16(e, i);
        }, size: 2 }, 4: { getValue: function getValue(t, e, i) {
          return t.getUint32(e, i);
        }, size: 4 }, 5: { getValue: function getValue(t, e, i) {
          return t.getUint32(e, i) / t.getUint32(e + 4, i);
        }, size: 8 }, 9: { getValue: function getValue(t, e, i) {
          return t.getInt32(e, i);
        }, size: 4 }, 10: { getValue: function getValue(t, e, i) {
          return t.getInt32(e, i) / t.getInt32(e + 4, i);
        }, size: 8 } }, o.exifTagTypes[7] = o.exifTagTypes[1], o.getExifValue = function (t, e, i, n, a, r) {
      var s,
          h,
          u,
          l,
          c,
          p,
          d = o.exifTagTypes[n];if (d && (s = d.size * a, h = s > 4 ? e + t.getUint32(i + 8, r) : i + 8, !(h + s > t.byteLength))) {
        if (1 === a) return d.getValue(t, h, r);for (u = [], l = 0; l < a; l += 1) {
          u[l] = d.getValue(t, h + l * d.size, r);
        }if (d.ascii) {
          for (c = "", l = 0; l < u.length && (p = u[l], "\0" !== p); l += 1) {
            c += p;
          }return c;
        }return u;
      }
    }, o.parseExifTag = function (t, e, i, n, a) {
      var r = t.getUint16(i, n);a.exif[r] = o.getExifValue(t, e, i, t.getUint16(i + 2, n), t.getUint32(i + 4, n), n);
    }, o.parseExifTags = function (t, e, i, n, o) {
      var a, r, s;if (!(i + 6 > t.byteLength || (a = t.getUint16(i, n), r = i + 2 + 12 * a, r + 4 > t.byteLength))) {
        for (s = 0; s < a; s += 1) {
          this.parseExifTag(t, e, i + 2 + 12 * s, n, o);
        }return t.getUint32(r, n);
      }
    }, o.parseExifData = function (t, e, i, n, a) {
      if (!a.disableExif) {
        var r,
            s,
            h,
            u = e + 10;if (1165519206 === t.getUint32(e + 4) && !(u + 8 > t.byteLength) && 0 === t.getUint16(e + 8)) {
          switch (t.getUint16(u)) {case 18761:
              r = !0;break;case 19789:
              r = !1;break;default:
              return;}42 === t.getUint16(u + 2, r) && (s = t.getUint32(u + 4, r), n.exif = new o.ExifMap(), s = o.parseExifTags(t, u, u + s, r, n), s && !a.disableExifThumbnail && (h = { exif: {} }, s = o.parseExifTags(t, u, u + s, r, h), h.exif[513] && (n.exif.Thumbnail = o.getExifThumbnail(t, u + h.exif[513], h.exif[514]))), n.exif[34665] && !a.disableExifSub && o.parseExifTags(t, u, u + n.exif[34665], r, n), n.exif[34853] && !a.disableExifGps && o.parseExifTags(t, u, u + n.exif[34853], r, n));
        }
      }
    }, o.metaDataParsers.jpeg[65505].push(o.parseExifData);var l = function () {
      var t = [],
          i = [],
          n = [],
          o = "transform",
          a = window.getComputedStyle(document.documentElement, ""),
          r = (Array.prototype.slice.call(a).join("").match(/-(moz|webkit|ms)-/) || "" === a.OLink && ["", "o"])[1];"webkit" === r && (o = "webkitTransform");var s = function s(t, i, n) {
        var o = t;if (o.length !== e) {
          for (var a = { chainers: [], then: function then(t) {
              return this.snabbt(t);
            }, snabbt: function snabbt(t) {
              var e = this.chainers.length;return this.chainers.forEach(function (i, n) {
                i.snabbt(h(t, n, e));
              }), a;
            }, setValue: function setValue(t) {
              return this.chainers.forEach(function (e) {
                e.setValue(t);
              }), a;
            }, finish: function finish() {
              return this.chainers.forEach(function (t) {
                t.finish();
              }), a;
            }, rollback: function rollback() {
              return this.chainers.forEach(function (t) {
                t.rollback();
              }), a;
            } }, r = 0, s = o.length; r < s; ++r) {
            "string" == typeof i ? a.chainers.push(u(o[r], i, h(n, r, s))) : a.chainers.push(u(o[r], h(i, r, s), n));
          }return a;
        }return "string" == typeof i ? u(o, i, h(n, 0, 1)) : u(o, h(i, 0, 1), n);
      },
          h = function h(t, e, i) {
        if (!t) return t;var n = X(t);G(t.delay) && (n.delay = t.delay(e, i)), G(t.callback) && (n.complete = function () {
          t.callback.call(this, e, i);
        });var o = G(t.allDone),
            a = G(t.complete);(a || o) && (n.complete = function () {
          a && t.complete.call(this, e, i), o && e == i - 1 && t.allDone();
        }), G(t.valueFeeder) && (n.valueFeeder = function (n, o) {
          return t.valueFeeder(n, o, e, i);
        }), G(t.easing) && (n.easing = function (n) {
          return t.easing(n, e, i);
        });var r = ["position", "rotation", "skew", "rotationPost", "scale", "width", "height", "opacity", "fromPosition", "fromRotation", "fromSkew", "fromRotationPost", "fromScale", "fromWidth", "fromHeight", "fromOpacity", "transformOrigin", "duration", "delay"];return r.forEach(function (o) {
          G(t[o]) && (n[o] = t[o](e, i));
        }), n;
      },
          u = function u(t, e, n) {
        function o(e) {
          if (f.tick(e), f.updateElement(t), !f.isStopped()) return f.completed() ? void (a.loop > 1 && !f.isStopped() ? (a.loop -= 1, f.restart(), y(o)) : (a.complete && a.complete.call(t), v.length && (a = v.pop(), s = _(a, u, !0), u = _(a, X(u)), a = g(s, u, a), f = b(a), i.push([t, f]), f.tick(e), y(o)))) : y(o);
        }if ("attention" === e) return l(t, n);if ("stop" === e) return c(t);var a = e;d();var r = m(t),
            s = r;s = _(a, s, !0);var u = X(r);u = _(a, u);var p = g(s, u, a),
            f = b(p);i.push([t, f]), f.updateElement(t, !0);var v = [],
            w = { snabbt: function snabbt(t) {
            return v.unshift(h(t, 0, 1)), w;
          }, then: function then(t) {
            return this.snabbt(t);
          } };return y(o), a.manual ? f : w;
      },
          l = function l(t, e) {
        function n(i) {
          a.tick(i), a.updateElement(t), a.completed() ? (e.callback && e.callback(t), e.loop && e.loop > 1 && (e.loop--, a.restart(), y(n))) : y(n);
        }var o = _(e, H({}));e.movement = o;var a = k(e);i.push([t, a]), y(n);
      },
          c = function c(t) {
        for (var e = 0, n = i.length; e < n; ++e) {
          var o = i[e],
              a = o[0],
              r = o[1];a === t && r.stop();
        }
      },
          p = function p(t, e) {
        for (var i = 0, n = t.length; i < n; ++i) {
          var o = t[i],
              a = o[0],
              r = o[1];if (a === e) {
            var s = r.getCurrentState();return r.stop(), s;
          }
        }
      },
          d = function d() {
        n = n.filter(function (t) {
          return f(t[0]).body;
        });
      },
          f = function f(t) {
        for (var e = t; e.parentNode;) {
          e = e.parentNode;
        }return e;
      },
          m = function m(t) {
        var e = p(i, t);return e ? e : p(n, t);
      },
          _ = function _(t, e, i) {
        e || (e = H({ position: [0, 0, 0], rotation: [0, 0, 0], rotationPost: [0, 0, 0], scale: [1, 1], skew: [0, 0] }));var n = "position",
            o = "rotation",
            a = "skew",
            r = "rotationPost",
            s = "scale",
            h = "scalePost",
            u = "width",
            l = "height",
            c = "opacity";return i && (n = "fromPosition", o = "fromRotation", a = "fromSkew", r = "fromRotationPost", s = "fromScale", h = "fromScalePost", u = "fromWidth", l = "fromHeight", c = "fromOpacity"), e.position = j(t[n], e.position), e.rotation = j(t[o], e.rotation), e.rotationPost = j(t[r], e.rotationPost), e.skew = j(t[a], e.skew), e.scale = j(t[s], e.scale), e.scalePost = j(t[h], e.scalePost), e.opacity = t[c], e.width = t[u], e.height = t[l], e;
      },
          g = function g(t, e, i) {
        return i.startState = t, i.endState = e, i;
      },
          v = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
        return setTimeout(t, 1e3 / 60);
      },
          y = function y(e) {
        0 === t.length && v(w), t.push(e);
      },
          w = function w(e) {
        for (var o = t.length, a = 0; a < o; ++a) {
          t[a](e);
        }t.splice(0, o);var r = i.filter(function (t) {
          return t[1].completed();
        });n = n.filter(function (t) {
          for (var e = 0, i = r.length; e < i; ++e) {
            if (t[0] === r[e][0]) return !1;
          }return !0;
        }), n = n.concat(r), i = i.filter(function (t) {
          return !t[1].completed();
        }), 0 !== t.length && v(w);
      },
          b = function b(t) {
        var i = t.startState,
            n = t.endState,
            o = j(t.duration, 500),
            a = j(t.delay, 0),
            r = t.perspective,
            s = O(j(t.easing, "linear"), t),
            h = 0 === o ? n.clone() : i.clone();t.transformOrigin;h.transformOrigin = t.transformOrigin;var u,
            l,
            c = 0,
            p = 0,
            d = !1,
            f = !1,
            m = t.manual,
            _ = 0,
            g = a / o;return l = t.valueFeeder ? B(t.valueFeeder, i, n, h) : W(i, n, h), { stop: function stop() {
            d = !0;
          }, isStopped: function isStopped() {
            return d;
          }, finish: function finish(t) {
            m = !1;var e = o * _;c = p - e, u = t, s.resetFrom = _;
          }, rollback: function rollback(t) {
            m = !1, l.setReverse();var e = o * (1 - _);c = p - e, u = t, s.resetFrom = _;
          }, restart: function restart() {
            c = e, s.resetFrom(0);
          }, tick: function tick(t) {
            if (!d) {
              if (m) return p = t, void this.updateCurrentTransform();if (c || (c = t), t - c > a) {
                f = !0, p = t - a;var e = Math.min(Math.max(0, p - c), o);s.tick(e / o), this.updateCurrentTransform(), this.completed() && u && u();
              }
            }
          }, getCurrentState: function getCurrentState() {
            return h;
          }, setValue: function setValue(t) {
            f = !0, _ = Math.min(Math.max(t, 1e-4), 1 + g);
          }, updateCurrentTransform: function updateCurrentTransform() {
            var t = s.getValue();if (m) {
              var e = Math.max(1e-5, _ - g);s.tick(e), t = s.getValue();
            }l.tween(t);
          }, completed: function completed() {
            return !!d || 0 !== c && s.completed();
          }, updateElement: function updateElement(t, e) {
            if (f || e) {
              var i = l.asMatrix(),
                  n = l.getProperties();q(t, i, r), V(t, n);
            }
          } };
      },
          k = function k(t) {
        var i = t.movement;t.initialVelocity = .1, t.equilibriumPosition = 0;var n = P(t),
            o = !1,
            a = i.position,
            r = i.rotation,
            s = i.rotationPost,
            h = i.scale,
            u = i.skew,
            l = H({ position: a ? [0, 0, 0] : e, rotation: r ? [0, 0, 0] : e, rotationPost: s ? [0, 0, 0] : e, scale: h ? [0, 0] : e, skew: u ? [0, 0] : e });return { stop: function stop() {
            o = !0;
          }, isStopped: function isStopped(t) {
            return o;
          }, tick: function tick(t) {
            o || n.equilibrium || (n.tick(), this.updateMovement());
          }, updateMovement: function updateMovement() {
            var t = n.getValue();a && (l.position[0] = i.position[0] * t, l.position[1] = i.position[1] * t, l.position[2] = i.position[2] * t), r && (l.rotation[0] = i.rotation[0] * t, l.rotation[1] = i.rotation[1] * t, l.rotation[2] = i.rotation[2] * t), s && (l.rotationPost[0] = i.rotationPost[0] * t, l.rotationPost[1] = i.rotationPost[1] * t, l.rotationPost[2] = i.rotationPost[2] * t), h && (l.scale[0] = 1 + i.scale[0] * t, l.scale[1] = 1 + i.scale[1] * t), u && (l.skew[0] = i.skew[0] * t, l.skew[1] = i.skew[1] * t);
          }, updateElement: function updateElement(t) {
            q(t, l.asMatrix()), V(t, l.getProperties());
          }, getCurrentState: function getCurrentState() {
            return l;
          }, completed: function completed() {
            return n.equilibrium || o;
          }, restart: function restart() {
            n = P(t);
          } };
      },
          x = function x(t) {
        return t;
      },
          E = function E(t) {
        return (Math.cos(t * Math.PI + Math.PI) + 1) / 2;
      },
          C = function C(t) {
        return t * t;
      },
          S = function S(t) {
        return -Math.pow(t - 1, 2) + 1;
      },
          P = function P(t) {
        var e = j(t.startPosition, 0),
            i = j(t.equilibriumPosition, 1),
            n = j(t.initialVelocity, 0),
            o = j(t.springConstant, .8),
            a = j(t.springDeceleration, .9),
            r = j(t.springMass, 10),
            s = !1;return { tick: function tick(t) {
            if (0 !== t && !s) {
              var h = -(e - i) * o,
                  u = h / r;n += u, e += n, n *= a, Math.abs(e - i) < .001 && Math.abs(n) < .001 && (s = !0);
            }
          }, resetFrom: function resetFrom(t) {
            e = t, n = 0;
          }, getValue: function getValue() {
            return s ? i : e;
          }, completed: function completed() {
            return s;
          } };
      },
          I = { linear: x, ease: E, easeIn: C, easeOut: S },
          O = function O(t, e) {
        if ("spring" == t) return P(e);var i = t;G(t) || (i = I[t]);var n,
            o = i,
            a = 0;return { tick: function tick(t) {
            a = o(t), n = t;
          }, resetFrom: function resetFrom(t) {
            n = 0;
          }, getValue: function getValue() {
            return a;
          }, completed: function completed() {
            return n >= 1 && n;
          } };
      },
          T = function T(t, e, i, n) {
        t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = e, t[13] = i, t[14] = n, t[15] = 1;
      },
          L = function L(t, e) {
        t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = Math.cos(e), t[6] = -Math.sin(e), t[7] = 0, t[8] = 0, t[9] = Math.sin(e), t[10] = Math.cos(e), t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1;
      },
          M = function M(t, e) {
        t[0] = Math.cos(e), t[1] = 0, t[2] = Math.sin(e), t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = -Math.sin(e), t[9] = 0, t[10] = Math.cos(e), t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1;
      },
          R = function R(t, e) {
        t[0] = Math.cos(e), t[1] = -Math.sin(e), t[2] = 0, t[3] = 0, t[4] = Math.sin(e), t[5] = Math.cos(e), t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1;
      },
          D = function D(t, e, i) {
        t[0] = 1, t[1] = Math.tan(e), t[2] = 0, t[3] = 0, t[4] = Math.tan(i), t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1;
      },
          A = function A(t, e, i) {
        t[0] = e, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = i, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1;
      },
          N = function N(t) {
        t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1;
      },
          z = function z(t, e) {
        e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15];
      },
          F = function F() {
        var t = new Float32Array(16),
            e = new Float32Array(16),
            i = new Float32Array(16);return N(t), { data: t, asCSS: function asCSS() {
            for (var e = "matrix3d(", i = 0; i < 15; ++i) {
              e += Math.abs(t[i]) < 1e-4 ? "0," : t[i].toFixed(10) + ",";
            }return e += Math.abs(t[15]) < 1e-4 ? "0)" : t[15].toFixed(10) + ")";
          }, clear: function clear() {
            N(t);
          }, translate: function translate(n, o, a) {
            return z(t, e), T(i, n, o, a), U(e, i, t), this;
          }, rotateX: function rotateX(n) {
            return z(t, e), L(i, n), U(e, i, t), this;
          }, rotateY: function rotateY(n) {
            return z(t, e), M(i, n), U(e, i, t), this;
          }, rotateZ: function rotateZ(n) {
            return z(t, e), R(i, n), U(e, i, t), this;
          }, scale: function scale(n, o) {
            return z(t, e), A(i, n, o), U(e, i, t), this;
          }, skew: function skew(n, o) {
            return z(t, e), D(i, n, o), U(e, i, t), this;
          } };
      },
          U = function U(t, e, i) {
        return i[0] = t[0] * e[0] + t[1] * e[4] + t[2] * e[8] + t[3] * e[12], i[1] = t[0] * e[1] + t[1] * e[5] + t[2] * e[9] + t[3] * e[13], i[2] = t[0] * e[2] + t[1] * e[6] + t[2] * e[10] + t[3] * e[14], i[3] = t[0] * e[3] + t[1] * e[7] + t[2] * e[11] + t[3] * e[15], i[4] = t[4] * e[0] + t[5] * e[4] + t[6] * e[8] + t[7] * e[12], i[5] = t[4] * e[1] + t[5] * e[5] + t[6] * e[9] + t[7] * e[13], i[6] = t[4] * e[2] + t[5] * e[6] + t[6] * e[10] + t[7] * e[14], i[7] = t[4] * e[3] + t[5] * e[7] + t[6] * e[11] + t[7] * e[15], i[8] = t[8] * e[0] + t[9] * e[4] + t[10] * e[8] + t[11] * e[12], i[9] = t[8] * e[1] + t[9] * e[5] + t[10] * e[9] + t[11] * e[13], i[10] = t[8] * e[2] + t[9] * e[6] + t[10] * e[10] + t[11] * e[14], i[11] = t[8] * e[3] + t[9] * e[7] + t[10] * e[11] + t[11] * e[15], i[12] = t[12] * e[0] + t[13] * e[4] + t[14] * e[8] + t[15] * e[12], i[13] = t[12] * e[1] + t[13] * e[5] + t[14] * e[9] + t[15] * e[13], i[14] = t[12] * e[2] + t[13] * e[6] + t[14] * e[10] + t[15] * e[14], i[15] = t[12] * e[3] + t[13] * e[7] + t[14] * e[11] + t[15] * e[15], i;
      },
          H = function H(t) {
        var i = F(),
            n = { opacity: e, width: e, height: e };return { position: t.position, rotation: t.rotation, rotationPost: t.rotationPost, skew: t.skew, scale: t.scale, scalePost: t.scalePost, opacity: t.opacity, width: t.width, height: t.height, clone: function clone() {
            return H({ position: this.position ? this.position.slice(0) : e, rotation: this.rotation ? this.rotation.slice(0) : e, rotationPost: this.rotationPost ? this.rotationPost.slice(0) : e, skew: this.skew ? this.skew.slice(0) : e, scale: this.scale ? this.scale.slice(0) : e, scalePost: this.scalePost ? this.scalePost.slice(0) : e, height: this.height, width: this.width, opacity: this.opacity });
          }, asMatrix: function asMatrix() {
            var t = i;return t.clear(), this.transformOrigin && t.translate(-this.transformOrigin[0], -this.transformOrigin[1], -this.transformOrigin[2]), this.scale && t.scale(this.scale[0], this.scale[1]), this.skew && t.skew(this.skew[0], this.skew[1]), this.rotation && (t.rotateX(this.rotation[0]), t.rotateY(this.rotation[1]), t.rotateZ(this.rotation[2])), this.position && t.translate(this.position[0], this.position[1], this.position[2]), this.rotationPost && (t.rotateX(this.rotationPost[0]), t.rotateY(this.rotationPost[1]), t.rotateZ(this.rotationPost[2])), this.scalePost && t.scale(this.scalePost[0], this.scalePost[1]), this.transformOrigin && t.translate(this.transformOrigin[0], this.transformOrigin[1], this.transformOrigin[2]), t;
          }, getProperties: function getProperties() {
            return n.opacity = this.opacity, n.width = this.width + "px", n.height = this.height + "px", n;
          } };
      },
          W = function W(t, i, n) {
        var o = t,
            a = i,
            r = n,
            s = a.position !== e,
            h = a.rotation !== e,
            u = a.rotationPost !== e,
            l = a.scale !== e,
            c = a.skew !== e,
            p = a.width !== e,
            d = a.height !== e,
            f = a.opacity !== e;return { tween: function tween(t) {
            if (s) {
              var e = a.position[0] - o.position[0],
                  i = a.position[1] - o.position[1],
                  n = a.position[2] - o.position[2];r.position[0] = o.position[0] + t * e, r.position[1] = o.position[1] + t * i, r.position[2] = o.position[2] + t * n;
            }if (h) {
              var m = a.rotation[0] - o.rotation[0],
                  _ = a.rotation[1] - o.rotation[1],
                  g = a.rotation[2] - o.rotation[2];r.rotation[0] = o.rotation[0] + t * m, r.rotation[1] = o.rotation[1] + t * _, r.rotation[2] = o.rotation[2] + t * g;
            }if (u) {
              var v = a.rotationPost[0] - o.rotationPost[0],
                  y = a.rotationPost[1] - o.rotationPost[1],
                  w = a.rotationPost[2] - o.rotationPost[2];r.rotationPost[0] = o.rotationPost[0] + t * v, r.rotationPost[1] = o.rotationPost[1] + t * y, r.rotationPost[2] = o.rotationPost[2] + t * w;
            }if (c) {
              var b = a.scale[0] - o.scale[0],
                  k = a.scale[1] - o.scale[1];r.scale[0] = o.scale[0] + t * b, r.scale[1] = o.scale[1] + t * k;
            }if (l) {
              var x = a.skew[0] - o.skew[0],
                  E = a.skew[1] - o.skew[1];r.skew[0] = o.skew[0] + t * x, r.skew[1] = o.skew[1] + t * E;
            }if (p) {
              var C = a.width - o.width;r.width = o.width + t * C;
            }if (d) {
              var S = a.height - o.height;r.height = o.height + t * S;
            }if (f) {
              var P = a.opacity - o.opacity;r.opacity = o.opacity + t * P;
            }
          }, asMatrix: function asMatrix() {
            return r.asMatrix();
          }, getProperties: function getProperties() {
            return r.getProperties();
          }, setReverse: function setReverse() {
            var t = o;o = a, a = t;
          } };
      },
          B = function B(t, i, n, o) {
        var a = t(0, F()),
            r = i,
            s = n,
            h = o,
            u = !1;return { tween: function tween(i) {
            u && (i = 1 - i), a.clear(), a = t(i, a);var n = s.width - r.width,
                o = s.height - r.height,
                l = s.opacity - r.opacity;s.width !== e && (h.width = r.width + i * n), s.height !== e && (h.height = r.height + i * o), s.opacity !== e && (h.opacity = r.opacity + i * l);
          }, asMatrix: function asMatrix() {
            return a;
          }, getProperties: function getProperties() {
            return h.getProperties();
          }, setReverse: function setReverse() {
            u = !0;
          } };
      },
          j = function j(t, e) {
        return "undefined" == typeof t ? e : t;
      },
          q = function q(t, e, i) {
        var n = "";i && (n = "perspective(" + i + "px) ");var a = e.asCSS();t.style[o] = n + a;
      },
          V = function V(t, e) {
        for (var i in e) {
          t.style[i] = e[i];
        }
      },
          G = function G(t) {
        return "function" == typeof t;
      },
          X = function X(t) {
        if (!t) return t;var e = {};for (var i in t) {
          e[i] = t[i];
        }return e;
      };return s.createMatrix = F, s.setElementTransform = q, s;
    }(),
        c = function () {
      function t(t, e, i, n, o) {
        if ("string" == typeof t) t = document.getElementById(t);else if (!t instanceof HTMLCanvasElement) return;var a,
            r = t.getContext("2d");try {
          try {
            a = r.getImageData(e, i, n, o);
          } catch (s) {
            throw new Error("unable to access local image data: " + s);
          }
        } catch (s) {
          throw new Error("unable to access image data: " + s);
        }return a;
      }function e(e, n, o, a, r, s) {
        if (!(isNaN(s) || s < 1)) {
          s |= 0;var h = t(e, n, o, a, r);h = i(h, n, o, a, r, s), e.getContext("2d").putImageData(h, n, o);
        }
      }function i(t, e, i, r, s, h) {
        var u,
            l,
            c,
            p,
            d,
            f,
            m,
            _,
            g,
            v,
            y,
            w,
            b,
            k,
            x,
            E,
            C,
            S,
            P,
            I,
            O,
            T,
            L,
            M,
            R = t.data,
            D = h + h + 1,
            A = r - 1,
            N = s - 1,
            z = h + 1,
            F = z * (z + 1) / 2,
            U = new n(),
            H = U;for (c = 1; c < D; c++) {
          if (H = H.next = new n(), c == z) var W = H;
        }H.next = U;var B = null,
            j = null;m = f = 0;var q = o[h],
            V = a[h];for (l = 0; l < s; l++) {
          for (E = C = S = P = _ = g = v = y = 0, w = z * (I = R[f]), b = z * (O = R[f + 1]), k = z * (T = R[f + 2]), x = z * (L = R[f + 3]), _ += F * I, g += F * O, v += F * T, y += F * L, H = U, c = 0; c < z; c++) {
            H.r = I, H.g = O, H.b = T, H.a = L, H = H.next;
          }for (c = 1; c < z; c++) {
            p = f + ((A < c ? A : c) << 2), _ += (H.r = I = R[p]) * (M = z - c), g += (H.g = O = R[p + 1]) * M, v += (H.b = T = R[p + 2]) * M, y += (H.a = L = R[p + 3]) * M, E += I, C += O, S += T, P += L, H = H.next;
          }for (B = U, j = W, u = 0; u < r; u++) {
            R[f + 3] = L = y * q >> V, 0 != L ? (L = 255 / L, R[f] = (_ * q >> V) * L, R[f + 1] = (g * q >> V) * L, R[f + 2] = (v * q >> V) * L) : R[f] = R[f + 1] = R[f + 2] = 0, _ -= w, g -= b, v -= k, y -= x, w -= B.r, b -= B.g, k -= B.b, x -= B.a, p = m + ((p = u + h + 1) < A ? p : A) << 2, E += B.r = R[p], C += B.g = R[p + 1], S += B.b = R[p + 2], P += B.a = R[p + 3], _ += E, g += C, v += S, y += P, B = B.next, w += I = j.r, b += O = j.g, k += T = j.b, x += L = j.a, E -= I, C -= O, S -= T, P -= L, j = j.next, f += 4;
          }m += r;
        }for (u = 0; u < r; u++) {
          for (C = S = P = E = g = v = y = _ = 0, f = u << 2, w = z * (I = R[f]), b = z * (O = R[f + 1]), k = z * (T = R[f + 2]), x = z * (L = R[f + 3]), _ += F * I, g += F * O, v += F * T, y += F * L, H = U, c = 0; c < z; c++) {
            H.r = I, H.g = O, H.b = T, H.a = L, H = H.next;
          }for (d = r, c = 1; c <= h; c++) {
            f = d + u << 2, _ += (H.r = I = R[f]) * (M = z - c), g += (H.g = O = R[f + 1]) * M, v += (H.b = T = R[f + 2]) * M, y += (H.a = L = R[f + 3]) * M, E += I, C += O, S += T, P += L, H = H.next, c < N && (d += r);
          }for (f = u, B = U, j = W, l = 0; l < s; l++) {
            p = f << 2, R[p + 3] = L = y * q >> V, L > 0 ? (L = 255 / L, R[p] = (_ * q >> V) * L, R[p + 1] = (g * q >> V) * L, R[p + 2] = (v * q >> V) * L) : R[p] = R[p + 1] = R[p + 2] = 0, _ -= w, g -= b, v -= k, y -= x, w -= B.r, b -= B.g, k -= B.b, x -= B.a, p = u + ((p = l + z) < N ? p : N) * r << 2, _ += E += B.r = R[p], g += C += B.g = R[p + 1], v += S += B.b = R[p + 2], y += P += B.a = R[p + 3], B = B.next, w += I = j.r, b += O = j.g, k += T = j.b, x += L = j.a, E -= I, C -= O, S -= T, P -= L, j = j.next, f += r;
          }
        }return t;
      }function n() {
        this.r = 0, this.g = 0, this.b = 0, this.a = 0, this.next = null;
      }var o = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259],
          a = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];return e;
    }();HTMLCanvasElement.prototype.toBlob || Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", { value: function value(t, e, i) {
        for (var n = atob(this.toDataURL(e, i).split(",")[1]), o = n.length, a = new Uint8Array(o), r = 0; r < o; r++) {
          a[r] = n.charCodeAt(r);
        }t(new Blob([a], { type: e || "image/png" }));
      } });var p = function () {
      function t(t, e) {
        for (var i = 0; i < e.length; i++) {
          var n = e[i];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
        }
      }return function (e, i, n) {
        return i && t(e.prototype, i), n && t(e, n), e;
      };
    }(),
        d = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
      return typeof t === "undefined" ? "undefined" : _typeof(t);
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t === "undefined" ? "undefined" : _typeof(t);
    },
        f = function f(t) {
      return Array.prototype.slice.call(t.attributes).map(function (t) {
        return { name: t.name, value: t.value };
      });
    },
        m = function m(t) {
      return { x: "undefined" == typeof t.offsetX ? t.layerX : t.offsetX, y: "undefined" == typeof t.offsetY ? t.layerY : t.offsetY };
    },
        _ = function _(t, e) {
      var i,
          n = {},
          o = e || {};for (i in t) {
        t.hasOwnProperty(i) && (n[i] = "undefined" == typeof o[i] ? t[i] : o[i]);
      }return n;
    },
        g = { ESC: 27, RETURN: 13 },
        v = { DOWN: ["touchstart", "pointerdown", "mousedown"], MOVE: ["touchmove", "pointermove", "mousemove"], UP: ["touchend", "touchcancel", "pointerup", "mouseup"] },
        y = { jpeg: "image/jpeg", jpg: "image/jpeg", jpe: "image/jpeg", png: "image/png", gif: "image/gif", bmp: "image/bmp" },
        w = /(\.png|\.bmp|\.gif|\.jpg|\.jpe|\.jpg|\.jpeg)$/,
        b = /(jpe|jpg|jpeg|png)/,
        k = function k(t, e) {
      var i = document.createElement(t);return e && (i.className = e), i;
    },
        x = function x(t, e, i) {
      e.forEach(function (e) {
        t.addEventListener(e, i, !1);
      });
    },
        E = function E(t, e, i) {
      e.forEach(function (e) {
        t.removeEventListener(e, i, !1);
      });
    },
        C = function C(t) {
      var e = t.changedTouches ? t.changedTouches[0] : t;if (e) return { x: e.pageX, y: e.pageY };
    },
        S = function S(t, e) {
      var i = C(t),
          n = e.getBoundingClientRect(),
          o = window.pageYOffset || document.documentElement.scrollTop,
          a = window.pageXOffset || document.documentElement.scrollLeft;return { x: i.x - n.left - a, y: i.y - n.top - o };
    },
        P = function P(t) {
      return t.charAt(0).toLowerCase() + t.slice(1);
    },
        I = function I(t) {
      return t.charAt(0).toUpperCase() + t.slice(1);
    },
        O = function O(t) {
      return t[t.length - 1];
    },
        T = function T(t, e, i) {
      return Math.max(e, Math.min(i, t));
    },
        L = function L(t, e) {
      return e.indexOf(t) !== -1;
    },
        M = function M(t, e, i, n, o, a) {
      var r = new XMLHttpRequest();n && r.upload.addEventListener("progress", function (t) {
        n(t.loaded, t.total);
      }), r.open("POST", t, !0), i && i(r), r.onreadystatechange = function () {
        if (4 === r.readyState && 200 === r.status) {
          var t = r.responseText;if (!t.length) return void o();if (t.indexOf("Content-Length") !== -1) return void a("file-too-big");var e = void 0;try {
            e = JSON.parse(r.responseText);
          } catch (i) {}if ("object" === ("undefined" == typeof e ? "undefined" : d(e)) && "failure" === e.status) return void a(e.message);o(e || t);
        } else 4 === r.readyState && a("fail");
      }, r.send(e);
    },
        R = function R(t) {
      t.style.webkitTransform = "", t.style.transform = "";
    },
        D = function D(t) {
      return t / 1e6;
    },
        A = function A() {
      var t = [],
          e = void 0,
          i = void 0;for (e in y) {
        y.hasOwnProperty(e) && (i = y[e], t.indexOf(i) == -1 && t.push(i));
      }return t;
    },
        N = function N(t) {
      return "image/jpeg" === t;
    },
        z = function z(t) {
      var e = void 0;for (e in y) {
        if (y.hasOwnProperty(e) && y[e] === t) return e;
      }return t;
    },
        F = function F(t) {
      return t.split("/").pop().split("?").shift();
    },
        U = function U(t) {
      if ("string" != typeof t) return "unknown";var e = F(t);return e.split(".").shift();
    },
        H = function H(t) {
      var e = st(t),
          i = z(e),
          n = "unknown." + i;return { name: n, type: e, size: Math.floor(.73 * t.length) };
    },
        W = function W(t) {
      var e = F(t),
          n = i(e.split(".").pop());return { name: e, type: n, size: null };
    },
        B = function B(t) {
      return { name: t.name, type: t.type, size: t.size };
    },
        j = function j(t) {
      return "string" == typeof t ? /^data:image/.test(t) ? H(t) : W(t) : B(t);
    },
        q = function q(t) {
      var i = arguments.length <= 1 || arguments[1] === e ? "" : arguments[1],
          n = ot(t);return i = i.replace(/\./, ""), b.test(i) || (i = "png"), w.test(n.name) ? n.name = n.name.replace(/\.[a-z]+$/, "." + i) : n.name += "." + i, n.type = y[i], n;
    },
        V = function V(t, e) {
      var i = "string" != typeof t || 0 !== t.indexOf("data:image");o.parseMetaData(t, function (n) {
        var a = { canvas: !0, crossOrigin: i };n.exif && (a.orientation = n.exif.get("Orientation")), o(t, function (t) {
          return "error" === t.type ? void e() : void e(t, n);
        }, a);
      });
    },
        G = function G(t, e, i) {
      var n,
          o,
          a,
          r,
          s = e / t;return s < i ? (r = e, a = r / i, n = .5 * (t - a), o = 0) : (a = t, r = a * i, n = 0, o = .5 * (e - r)), { x: n, y: o, height: r, width: a };
    },
        X = function X(t) {
      var i = arguments.length <= 1 || arguments[1] === e ? {} : arguments[1],
          o = arguments[2],
          a = k("canvas"),
          r = i.rotation,
          s = i.crop,
          h = i.size;if (s) {
        var u = r % 180 !== 0,
            l = { width: u ? t.height : t.width, height: u ? t.width : t.height },
            c = s.x / l.width,
            p = s.y / l.height,
            d = s.width / l.width,
            f = s.height / l.height;s.y + s.height > l.height && (s.y = Math.max(0, l.height - s.height)), s.x + s.width > l.width && (s.x = Math.max(0, l.width - s.width)), a.width = s.width, a.height = s.height;var m = a.getContext("2d");90 === r ? (m.translate(.5 * a.width, .5 * a.height), m.rotate(-90 * Math.PI / 180), m.drawImage(t, (1 - p) * t.width - t.width * f, s.x, s.height, s.width, .5 * -a.height, .5 * -a.width, a.height, a.width)) : 180 === r ? (m.translate(.5 * a.width, .5 * a.height), m.rotate(-180 * Math.PI / 180), m.drawImage(t, (1 - (c + d)) * l.width, (1 - (p + f)) * l.height, d * l.width, f * l.height, .5 * -a.width, .5 * -a.height, a.width, a.height)) : 270 === r ? (m.translate(.5 * a.width, .5 * a.height), m.rotate(-270 * Math.PI / 180), m.drawImage(t, s.y, (1 - c) * t.height - t.height * d, s.height, s.width, .5 * -a.height, .5 * -a.width, a.height, a.width)) : m.drawImage(t, s.x, s.y, s.width, s.height, 0, 0, a.width, a.height);
      }if (h) {
        var _ = h.width / a.width,
            g = h.height / a.height,
            v = Math.min(_, g);n(a, v);
      }o(a);
    },
        Y = function Y(t) {
      return $(t, 1);
    },
        $ = function $(t, e) {
      if (!t) return null;var i = document.createElement("canvas");i.setAttribute("data-file", t.getAttribute("data-file"));var o = i.getContext("2d");return i.width = t.width, i.height = t.height, o.drawImage(t, 0, 0), e > 0 && 1 != e && n(i, e), i;
    },
        J = function J(t) {
      return t.width && t.height;
    },
        Z = function Z(t, e) {
      var i = e.getContext("2d");J(e) ? i.drawImage(t, 0, 0, e.width, e.height) : (e.width = t.width, e.height = t.height, i.drawImage(t, 0, 0));
    },
        K = function K(t) {
      c(t, 0, 0, t.width, t.height, 3);
    },
        Q = function Q(t, e, i) {
      t.toBlob(function (t) {
        if ("msSaveBlob" in window.navigator) return void window.navigator.msSaveBlob(t, e);var i = URL.createObjectURL(t),
            n = k("a");n.style.display = "none", n.download = e, n.href = i, document.body.appendChild(n), n.click(), setTimeout(function () {
          document.body.removeChild(n), URL.revokeObjectURL(i);
        }, 0);
      }, i);
    },
        tt = function tt(t, e) {
      return parseInt(t.width, 10) >= e.width && parseInt(t.height, 10) >= e.height;
    },
        et = function et(t, e, i) {
      return { x: t.x * e, y: t.y * i, width: t.width * e, height: t.height * i };
    },
        it = function it(t, e, i) {
      return { x: t.x / e, y: t.y / i, width: t.width / e, height: t.height / i };
    },
        nt = function nt(t) {
      if (t && "" !== t.value) {
        try {
          t.value = "";
        } catch (e) {}if (t.value) {
          var i = document.createElement("form"),
              n = t.parentNode,
              o = t.nextSibling;i.appendChild(t), i.reset(), o ? n.insertBefore(t, o) : n.appendChild(t);
        }
      }
    },
        ot = function ot(t) {
      return "object" === ("undefined" == typeof value ? "undefined" : d(value)) && null !== value ? JSON.parse(JSON.stringify(t)) : t;
    },
        at = function at(t) {
      var e = Y(t.input.image),
          i = Y(t.output.image),
          n = ot(t);return n.input.image = e, n.output.image = i, n;
    },
        rt = function rt(t, i, n) {
      return t && i ? t.toDataURL(i, N(i) && "number" == typeof n ? n / 100 : e) : null;
    },
        st = function st(t) {
      if (!t) return null;var e = t.substr(0, 16).match(/^.+;/);return e.length ? e[0].substring(5, e[0].length - 1) : null;
    },
        ht = function ht(t) {
      var i = arguments.length <= 1 || arguments[1] === e ? [] : arguments[1],
          n = arguments[2],
          o = { server: ot(t.server), meta: ot(t.meta), input: { name: t.input.name, type: t.input.type, size: t.input.size, width: t.input.width, height: t.input.height }, output: { width: t.output.width, height: t.output.height } };L("input", i) && (o.input.image = rt(t.input.image, t.input.type)), L("output", i) && (o.output.image = rt(t.output.image, t.input.type, n)), L("actions", i) && (o.actions = ot(t.actions));var a = st(o.output.image || o.input.image);return "image/png" === a && (o.input.name = U(o.input.name) + ".png", o.input.type = a), o;
    },
        ut = function ut(t, e, i) {
      var n = i.querySelector(t);n && (n.style.display = e ? "" : "none");
    },
        lt = function lt(t) {
      return Array.prototype.slice.call(t);
    },
        ct = function ct(t) {
      t.parentNode.removeChild(t);
    },
        pt = function pt(t) {
      var e = k("div");return t.parentNode && (t.nextSibling ? t.parentNode.insertBefore(e, t.nextSibling) : t.parentNode.appendChild(e)), e.appendChild(t), e;
    },
        dt = function dt(t, e, i, n) {
      var o = (n - 90) * Math.PI / 180;return { x: t + i * Math.cos(o), y: e + i * Math.sin(o) };
    },
        ft = function ft(t, e, i, n, o) {
      var a = dt(t, e, i, o),
          r = dt(t, e, i, n),
          s = o - n <= 180 ? "0" : "1",
          h = ["M", a.x, a.y, "A", i, i, 0, s, 0, r.x, r.y].join(" ");return h;
    },
        mt = function mt(t, e, i, n) {
      return ft(t, e, i, 0, 360 * n);
    },
        _t = function () {
      var i = { n: function n(t, e, i, _n) {
          var o, a, r, s, h, u, l, c;return r = t.y + t.height, o = T(e.y, 0, r), r - o < i.min.height && (o = r - i.min.height), h = _n ? (r - o) / _n : t.width, h < i.min.width && (h = i.min.width, o = r - h * _n), l = .5 * (h - t.width), s = t.x - l, a = t.x + t.width + l, (s < 0 || a > i.width) && (c = Math.min(t.x, i.width - (t.x + t.width)), s = t.x - c, a = t.x + t.width + c, h = a - s, u = h * _n, o = r - u), { x: s, y: o, width: a - s, height: r - o };
        }, s: function s(t, e, i, n) {
          var o, a, r, s, h, u, l, c;return o = t.y, r = T(e.y, o, i.height), r - o < i.min.height && (r = o + i.min.height), h = n ? (r - o) / n : t.width, h < i.min.width && (h = i.min.width, r = o + h * n), l = .5 * (h - t.width), s = t.x - l, a = t.x + t.width + l, (s < 0 || a > i.width) && (c = Math.min(t.x, i.width - (t.x + t.width)), s = t.x - c, a = t.x + t.width + c, h = a - s, u = h * n, r = o + u), { x: s, y: o, width: a - s, height: r - o };
        }, e: function e(t, _e, i, n) {
          var o, a, r, s, h, u, l, c;return s = t.x, a = T(_e.x, s, i.width), a - s < i.min.width && (a = s + i.min.width), u = n ? (a - s) * n : t.height, u < i.min.height && (u = i.min.height, a = s + u / n), l = .5 * (u - t.height), o = t.y - l, r = t.y + t.height + l, (o < 0 || r > i.height) && (c = Math.min(t.y, i.height - (t.y + t.height)), o = t.y - c, r = t.y + t.height + c, u = r - o, h = u / n, a = s + h), { x: s, y: o, width: a - s, height: r - o };
        }, w: function n(t, e, i, o) {
          var a, r, s, h, n, u, l, c;return r = t.x + t.width, h = T(e.x, 0, r), r - h < i.min.width && (h = r - i.min.width), u = o ? (r - h) * o : t.height, u < i.min.height && (u = i.min.height, h = r - u / o), l = .5 * (u - t.height), a = t.y - l, s = t.y + t.height + l, (a < 0 || s > i.height) && (c = Math.min(t.y, i.height - (t.y + t.height)), a = t.y - c, s = t.y + t.height + c, u = s - a, n = u / o, h = r - n), { x: h, y: a, width: r - h, height: s - a };
        }, ne: function ne(t, e, i, n) {
          var o, a, r, s, h, u, l;return s = t.x, r = t.y + t.height, a = T(e.x, s, i.width), a - s < i.min.width && (a = s + i.min.width), u = n ? (a - s) * n : T(r - e.y, i.min.height, r), u < i.min.height && (u = i.min.height, a = s + u / n), o = t.y - (u - t.height), (o < 0 || r > i.height) && (l = Math.min(t.y, i.height - (t.y + t.height)), o = t.y - l, u = r - o, h = u / n, a = s + h), { x: s, y: o, width: a - s, height: r - o };
        }, se: function se(t, e, i, n) {
          var o, a, r, s, h, u, l;return s = t.x, o = t.y, a = T(e.x, s, i.width), a - s < i.min.width && (a = s + i.min.width), u = n ? (a - s) * n : T(e.y - t.y, i.min.height, i.height - o), u < i.min.height && (u = i.min.height, a = s + u / n), r = t.y + t.height + (u - t.height), (o < 0 || r > i.height) && (l = Math.min(t.y, i.height - (t.y + t.height)), r = t.y + t.height + l, u = r - o, h = u / n, a = s + h), { x: s, y: o, width: a - s, height: r - o };
        }, sw: function sw(t, e, i, n) {
          var o, a, r, s, h, u, l;return a = t.x + t.width, o = t.y, s = T(e.x, 0, a), a - s < i.min.width && (s = a - i.min.width), u = n ? (a - s) * n : T(e.y - t.y, i.min.height, i.height - o), u < i.min.height && (u = i.min.height, s = a - u / n), r = t.y + t.height + (u - t.height), (o < 0 || r > i.height) && (l = Math.min(t.y, i.height - (t.y + t.height)), r = t.y + t.height + l, u = r - o, h = u / n, s = a - h), { x: s, y: o, width: a - s, height: r - o };
        }, nw: function nw(t, e, i, n) {
          var o, a, r, s, h, u, l;return a = t.x + t.width, r = t.y + t.height, s = T(e.x, 0, a), a - s < i.min.width && (s = a - i.min.width), u = n ? (a - s) * n : T(r - e.y, i.min.height, r), u < i.min.height && (u = i.min.height, s = a - u / n), o = t.y - (u - t.height), (o < 0 || r > i.height) && (l = Math.min(t.y, i.height - (t.y + t.height)), o = t.y - l, u = r - o, h = u / n, s = a - h), { x: s, y: o, width: a - s, height: r - o };
        } };return function () {
        function n() {
          var i = arguments.length <= 0 || arguments[0] === e ? document.createElement("div") : arguments[0];t(this, n), this._element = i, this._interaction = null, this._minWidth = 0, this._minHeight = 0, this._ratio = null, this._rect = { x: 0, y: 0, width: 0, height: 0 }, this._space = { width: 0, height: 0 }, this._rectChanged = !1, this._init();
        }return p(n, [{ key: "_init", value: function value() {
            this._element.className = "slim-crop-area";var t = k("div", "grid");this._element.appendChild(t);for (var e in i) {
              if (i.hasOwnProperty(e)) {
                var n = k("button", e);this._element.appendChild(n);
              }
            }var o = k("button", "c");this._element.appendChild(o), x(document, v.DOWN, this);
          } }, { key: "reset", value: function value() {
            this._interaction = null, this._rect = { x: 0, y: 0, width: 0, height: 0 }, this._rectChanged = !0, this._redraw(), this._element.dispatchEvent(new CustomEvent("change"));
          } }, { key: "rescale", value: function value(t) {
            1 !== t && (this._interaction = null, this._rectChanged = !0, this._rect.x *= t, this._rect.y *= t, this._rect.width *= t, this._rect.height *= t, this._redraw(), this._element.dispatchEvent(new CustomEvent("change")));
          } }, { key: "limit", value: function value(t, e) {
            this._space = { width: t, height: e };
          } }, { key: "resize", value: function value(t, e, i, n) {
            this._interaction = null, this._rect = { x: T(t, 0, this._space.width - this._minWidth), y: T(e, 0, this._space.height - this._minHeight), width: T(i, this._minWidth, this._space.width), height: T(n, this._minHeight, this._space.height) }, this._rectChanged = !0, this._redraw(), this._element.dispatchEvent(new CustomEvent("change"));
          } }, { key: "handleEvent", value: function value(t) {
            switch (t.type) {case "touchstart":case "pointerdown":case "mousedown":
                this._onStartDrag(t);break;case "touchmove":case "pointermove":case "mousemove":
                this._onDrag(t);break;case "touchend":case "touchcancel":case "pointerup":case "mouseup":
                this._onStopDrag(t);}
          } }, { key: "_onStartDrag", value: function value(t) {
            this._element.contains(t.target) && (t.preventDefault(), x(document, v.MOVE, this), x(document, v.UP, this), this._interaction = { type: t.target.className, offset: S(t, this._element) }, this._element.setAttribute("data-dragging", "true"), this._redraw());
          } }, { key: "_onDrag", value: function value(t) {
            t.preventDefault();var e = S(t, this._element.parentNode),
                n = this._interaction.type;"c" === n ? (this._rect.x = T(e.x - this._interaction.offset.x, 0, this._space.width - this._rect.width), this._rect.y = T(e.y - this._interaction.offset.y, 0, this._space.height - this._rect.height)) : i[n] && (this._rect = i[n](this._rect, e, { x: 0, y: 0, width: this._space.width, height: this._space.height, min: { width: this._minWidth, height: this._minHeight } }, this._ratio)), this._rectChanged = !0, this._element.dispatchEvent(new CustomEvent("input"));
          } }, { key: "_onStopDrag", value: function value(t) {
            t.preventDefault(), E(document, v.MOVE, this), E(document, v.UP, this), this._interaction = null, this._element.setAttribute("data-dragging", "false"), this._element.dispatchEvent(new CustomEvent("change"));
          } }, { key: "_redraw", value: function value() {
            var t = this;this._rectChanged && (this._element.style.cssText = "\n\t\t\t\t\tleft:" + this._rect.x + "px;\n\t\t\t\t\ttop:" + this._rect.y + "px;\n\t\t\t\t\twidth:" + this._rect.width + "px;\n\t\t\t\t\theight:" + this._rect.height + "px;\n\t\t\t\t", this._rectChanged = !1), this._interaction && requestAnimationFrame(function () {
              return t._redraw();
            });
          } }, { key: "destroy", value: function value() {
            this._interaction = !1, this._rectChanged = !1, E(document, v.DOWN, this), E(document, v.MOVE, this), E(document, v.UP, this), ct(this._element);
          } }, { key: "element", get: function get() {
            return this._element;
          } }, { key: "space", get: function get() {
            return this._space;
          } }, { key: "area", get: function get() {
            var t = this._rect.x / this._space.width,
                e = this._rect.y / this._space.height,
                i = this._rect.width / this._space.width,
                n = this._rect.height / this._space.height;return { x: t, y: e, width: i, height: n };
          } }, { key: "dirty", get: function get() {
            return 0 !== this._rect.x || 0 !== this._rect.y || 0 !== this._rect.width || 0 !== this._rect.height;
          } }, { key: "minWidth", set: function set(t) {
            this._minWidth = t;
          } }, { key: "minHeight", set: function set(t) {
            this._minHeight = t;
          } }, { key: "ratio", set: function set(t) {
            this._ratio = t;
          } }]), n;
      }();
    }(),
        gt = function () {
      var i = ["input", "change"],
          n = function () {
        function n() {
          var i = arguments.length <= 0 || arguments[0] === e ? document.createElement("div") : arguments[0],
              o = arguments.length <= 1 || arguments[1] === e ? {} : arguments[1];t(this, n), this._element = i, this._options = _(n.options(), o), this._ratio = null, this._output = null, this._input = null, this._preview = null, this._previewBlurred = null, this._blurredPreview = !1, this._cropper = null, this._previewWrapper = null, this._currentWindowSize = {}, this._btnGroup = null, this._dirty = !1, this._wrapperRotation = 0, this._wrapperScale = 1, this._init();
        }return p(n, [{ key: "_init", value: function value() {
            var t = this;this._element.className = "slim-image-editor", this._container = k("div", "slim-container"), this._wrapper = k("div", "slim-wrapper"), this._stage = k("div", "slim-stage"), this._container.appendChild(this._stage), this._cropper = new _t(), i.forEach(function (e) {
              t._cropper.element.addEventListener(e, t);
            }), this._stage.appendChild(this._cropper.element), this._previewWrapper = k("div", "slim-image-editor-preview slim-crop-preview"), this._previewBlurred = k("canvas", "slim-crop-blur"), this._previewWrapper.appendChild(this._previewBlurred), this._wrapper.appendChild(this._previewWrapper), this._preview = k("img", "slim-crop"), this._previewWrapper.appendChild(this._preview), this._btnGroup = k("div", "slim-editor-btn-group"), n.Buttons.forEach(function (e) {
              var i = I(e),
                  n = t._options["button" + i + "Label"],
                  o = t._options["button" + i + "Title"],
                  a = t._options["button" + i + "ClassName"],
                  r = k("button", "slim-editor-btn slim-btn-" + e + (a ? " " + a : ""));r.innerHTML = n, r.title = o || n, r.type = "button", r.setAttribute("data-action", e), r.addEventListener("click", t), t._btnGroup.appendChild(r);
            }), this._utilsGroup = k("div", "slim-editor-utils-group");var e = k("button", "slim-editor-utils-btn slim-btn-rotate" + (this._options.buttonRotateClassName ? " " + this._options.buttonRotateClassName : ""));e.setAttribute("data-action", "rotate"), e.addEventListener("click", this), e.title = this._options.buttonRotateTitle, this._utilsGroup.appendChild(e), this._container.appendChild(this._wrapper), this._element.appendChild(this._container), this._element.appendChild(this._utilsGroup), this._element.appendChild(this._btnGroup);
          } }, { key: "dirty", value: function value() {
            this._dirty = !0;
          } }, { key: "handleEvent", value: function value(t) {
            switch (t.type) {case "click":
                this._onClick(t);break;case "change":
                this._onGridChange(t);break;case "input":
                this._onGridInput(t);break;case "keydown":
                this._onKeyDown(t);break;case "resize":
                this._onResize(t);}
          } }, { key: "_onKeyDown", value: function value(t) {
            switch (t.keyCode) {case g.RETURN:
                this._confirm();break;case g.ESC:
                this._cancel();}
          } }, { key: "_onClick", value: function value(t) {
            t.target.classList.contains("slim-btn-cancel") && this._cancel(), t.target.classList.contains("slim-btn-confirm") && this._confirm(), t.target.classList.contains("slim-btn-rotate") && this._rotate();
          } }, { key: "_onResize", value: function value() {
            this._currentWindowSize = { width: window.innerWidth, height: window.innerHeight }, this._redraw(), this._redrawCropper(this._cropper.area), this._updateWrapperScale(), this._redrawWrapper();
          } }, { key: "_redrawWrapper", value: function value() {
            var t = l.createMatrix();t.scale(this._wrapperScale, this._wrapperScale), t.rotateZ(this._wrapperRotation * (Math.PI / 180)), l.setElementTransform(this._previewWrapper, t);
          } }, { key: "_onGridInput", value: function value() {
            this._redrawCropMask();
          } }, { key: "_onGridChange", value: function value() {
            this._redrawCropMask();
          } }, { key: "_updateWrapperRotation", value: function value() {
            this._options.minSize.width > this._input.height || this._options.minSize.height > this._input.width ? this._wrapperRotation += 180 : this._wrapperRotation += 90;
          } }, { key: "_updateWrapperScale", value: function value() {
            var t = this._wrapperRotation % 180 !== 0;if (t) {
              var e = this._container.offsetWidth,
                  i = this._container.offsetHeight,
                  n = this._wrapper.offsetHeight,
                  o = this._wrapper.offsetWidth,
                  a = e / n;a * o > i && (a = i / o), this._wrapperScale = a;
            } else this._wrapperScale = 1;
          } }, { key: "_cancel", value: function value() {
            this._element.dispatchEvent(new CustomEvent("cancel"));
          } }, { key: "_confirm", value: function value() {
            var t = this._wrapperRotation % 180 !== 0,
                e = this._cropper.area,
                i = et(e, t ? this._input.height : this._input.width, t ? this._input.width : this._input.height);this._element.dispatchEvent(new CustomEvent("confirm", { detail: { rotation: this._wrapperRotation % 360, crop: i } }));
          } }, { key: "_rotate", value: function value() {
            var t = this;this._updateWrapperRotation(), this._updateWrapperScale(), this._clearCropMask(), this._hideCropper(), l(this._previewWrapper, { rotation: [0, 0, this._wrapperRotation * (Math.PI / 180)], scale: [this._wrapperScale, this._wrapperScale], easing: "spring", springConstant: .8, springDeceleration: .65, complete: function complete() {
                t._redrawCropper(), t._showCropper();
              } });
          } }, { key: "_showCropper", value: function value() {
            l(this._stage, { easing: "ease", duration: 250, fromOpacity: 0, opacity: 1 });
          } }, { key: "_hideCropper", value: function value() {
            l(this._stage, { duration: 0, fromOpacity: 0, opacity: 0 });
          } }, { key: "_clearCropMask", value: function value() {
            this._preview.style.clip = "";
          } }, { key: "_redrawCropMask", value: function value() {
            var t = this,
                e = this._wrapperRotation % 360,
                i = { width: this._wrapper.offsetWidth, height: this._wrapper.offsetHeight },
                n = this._cropper.area,
                o = n.x,
                a = n.y,
                r = n.width,
                s = n.height;90 === e ? (n.x = 1 - a - s, n.y = o, n.width = s, n.height = r) : 180 === e ? (n.x = 1 - (o + r), n.y = 1 - (a + s), n.width = r, n.height = s) : 270 === e && (n.x = a, n.y = 1 - o - r, n.width = s, n.height = r), n = et(n, i.width, i.height), requestAnimationFrame(function () {
              t._preview.style.clip = "rect(\n\t\t\t\t\t" + n.y + "px,\n\t\t\t\t\t" + (n.x + n.width) + "px,\n\t\t\t\t\t" + (n.y + n.height) + "px,\n\t\t\t\t\t" + n.x + "px)\n\t\t\t\t";
            });
          } }, { key: "open", value: function value(t, e, i, n, o) {
            var a = this;if (this._input && !this._dirty) return void o();this._dirty = !1, this._wrapperRotation = n || 0, this._blurredPreview = !1, this._ratio = e, this._element.style.opacity = "0", this._input = t;var r = n % 180 !== 0,
                s = it(i, r ? t.height : t.width, r ? t.width : t.height);this._preview.onload = function () {
              a._preview.onload = null, a._cropper.ratio = a.ratio, a._redraw(), a._redrawCropper(s), o(), a._element.style.opacity = "";
            }, this._preview.src = $(this._input, Math.min(this._container.offsetWidth / this._input.width, this._container.offsetHeight / this._input.height)).toDataURL();
          } }, { key: "_redrawCropper", value: function value(t) {
            var e = this._wrapperRotation % 180 !== 0,
                i = e ? this._input.height / this._input.width : this._input.width / this._input.height,
                n = this._wrapper.offsetWidth,
                o = this._wrapper.offsetHeight,
                a = this._container.offsetWidth,
                r = this._container.offsetHeight;this._updateWrapperScale();var s = this._wrapperScale * (e ? o : n),
                h = this._wrapperScale * (e ? n : o),
                u = e ? .5 * (a - s) : this._wrapper.offsetLeft,
                l = e ? .5 * (r - h) : this._wrapper.offsetTop;this._stage.style.cssText = "\n\t\t\t\tleft:" + u + "px;\n\t\t\t\ttop:" + l + "px;\n\t\t\t\twidth:" + s + "px;\n\t\t\t\theight:" + h + "px;\n\t\t\t", this._cropper.limit(s, s / i), this._cropper.minWidth = this._wrapperScale * this._options.minSize.width * this.scalar, this._cropper.minHeight = this._wrapperScale * this._options.minSize.height * this.scalar;var c = null;c = t ? { x: t.x * s, y: t.y * h, width: t.width * s, height: t.height * h } : G(s, h, this._ratio || h / s), this._cropper.resize(c.x, c.y, c.width, c.height);
          } }, { key: "_redraw", value: function value() {
            var t = this._input.height / this._input.width,
                e = this._container.clientWidth,
                i = this._container.clientHeight,
                n = e,
                o = n * t;o > i && (o = i, n = o / t), n = Math.round(n), o = Math.round(o);var a = (e - n) / 2,
                r = (i - o) / 2;this._wrapper.style.cssText = "\n\t\t\t\tleft:" + a + "px;\n\t\t\t\ttop:" + r + "px;\n\t\t\t\twidth:" + n + "px;\n\t\t\t\theight:" + o + "px;\n\t\t\t", this._previewBlurred.style.cssText = "\n\t\t\t\twidth:" + n + "px;\n\t\t\t\theight:" + o + "px;\n\t\t\t", this._preview.width = n, this._preview.height = o, this._blurredPreview || (this._previewBlurred.width = 300, this._previewBlurred.height = this._previewBlurred.width * t, Z(this._input, this._previewBlurred), K(this._previewBlurred, 3), this._blurredPreview = !0);
          } }, { key: "show", value: function value() {
            var t = arguments.length <= 0 || arguments[0] === e ? function () {} : arguments[0];this._currentWindowSize.width === window.innerWidth && this._currentWindowSize.height === window.innerHeight || (this._redraw(), this._redrawCropper(this._cropper.area)), document.addEventListener("keydown", this), window.addEventListener("resize", this);var i = this._wrapperRotation * (Math.PI / 180);l(this._previewWrapper, { fromRotation: [0, 0, i], rotation: [0, 0, i], fromPosition: [0, 0, 0], position: [0, 0, 0], fromOpacity: 0, opacity: .9999, fromScale: [this._wrapperScale - .02, this._wrapperScale - .02], scale: [this._wrapperScale, this._wrapperScale], easing: "spring", springConstant: .3, springDeceleration: .85, delay: 450, complete: function complete() {} }), this._cropper.dirty ? l(this._stage, { fromPosition: [0, 0, 0], position: [0, 0, 0], fromOpacity: 0, opacity: 1, duration: 250, delay: 550, complete: function complete() {
                R(this), t();
              } }) : l(this._stage, { fromPosition: [0, 0, 0], position: [0, 0, 0], fromOpacity: 0, opacity: 1, duration: 250, delay: 1e3, complete: function complete() {
                R(this);
              } }), l(this._btnGroup.childNodes, { fromScale: [.9, .9], scale: [1, 1], fromOpacity: 0, opacity: 1, delay: function delay(t) {
                return 1e3 + 100 * t;
              }, easing: "spring", springConstant: .3, springDeceleration: .85, complete: function complete() {
                R(this);
              } }), l(this._utilsGroup.childNodes, { fromScale: [.9, .9], scale: [1, 1], fromOpacity: 0, opacity: 1, easing: "spring", springConstant: .3, springDeceleration: .85, delay: 1250, complete: function complete() {
                R(this);
              } });
          } }, { key: "hide", value: function value() {
            var t = arguments.length <= 0 || arguments[0] === e ? function () {} : arguments[0];document.removeEventListener("keydown", this), window.removeEventListener("resize", this), l(this._utilsGroup.childNodes, { fromOpacity: 1, opacity: 0, duration: 250 }), l(this._btnGroup.childNodes, { fromOpacity: 1, opacity: 0, delay: 200, duration: 350 }), l([this._stage, this._previewWrapper], { fromPosition: [0, 0, 0], position: [0, -250, 0], fromOpacity: 1, opacity: 0, easing: "spring", springConstant: .3, springDeceleration: .75, delay: 250, allDone: function allDone() {
                t();
              } });
          } }, { key: "destroy", value: function value() {
            var t = this;lt(this._btnGroup.children).forEach(function (e) {
              e.removeEventListener("click", t);
            }), i.forEach(function (e) {
              t._cropper.element.removeEventListener(e, t);
            }), this._cropper.destroy(), ct(this._element);
          } }, { key: "element", get: function get() {
            return this._element;
          } }, { key: "ratio", get: function get() {
            return "input" === this._ratio ? this._input.height / this._input.width : this._ratio;
          } }, { key: "offset", get: function get() {
            return this._element.getBoundingClientRect();
          } }, { key: "original", get: function get() {
            return this._input;
          } }, { key: "scalar", get: function get() {
            return this._preview.width / this._input.width;
          } }], [{ key: "options", value: function value() {
            return { buttonCancelClassName: null, buttonConfirmClassName: null, buttonCancelLabel: "Cancel", buttonConfirmLabel: "Confirm", buttonCancelTitle: null, buttonConfirmTitle: null, buttonRotateTitle: "Rotate", buttonRotateClassName: null, minSize: { width: 0, height: 0 } };
          } }]), n;
      }();return n.Buttons = ["cancel", "confirm"], n;
    }(_t),
        vt = function () {
      var i = ["dragover", "dragleave", "drop"];return function () {
        function n() {
          var i = arguments.length <= 0 || arguments[0] === e ? document.createElement("div") : arguments[0];t(this, n), this._element = i, this._accept = [], this._dragPath = null, this._init();
        }return p(n, [{ key: "areValidFiles", value: function value(t) {
            return !this._accept.length || !t || this._accept.indexOf(t[0].type) != -1;
          } }, { key: "reset", value: function value() {
            this._element.files = null;
          } }, { key: "_init", value: function value() {
            var t = this;this._element.className = "slim-file-hopper", i.forEach(function (e) {
              t._element.addEventListener(e, t);
            });
          } }, { key: "handleEvent", value: function value(t) {
            switch (t.type) {case "dragover":
                this._onDragOver(t);break;case "dragleave":
                this._onDragLeave(t);break;case "drop":
                this._onDrop(t);}
          } }, { key: "_onDrop", value: function value(t) {
            return t.preventDefault(), this.areValidFiles(t.dataTransfer.files) ? (this._element.files = t.dataTransfer.files, this._element.dispatchEvent(new CustomEvent("file-drop", { detail: m(t) })), this._element.dispatchEvent(new CustomEvent("change")), void (this._dragPath = null)) : (this._element.dispatchEvent(new CustomEvent("file-invalid-drop")), void (this._dragPath = null));
          } }, { key: "_onDragOver", value: function value(t) {
            return t.preventDefault(), t.dataTransfer.dropEffect = "copy", this.areValidFiles(t.dataTransfer.items) ? (this._dragPath || (this._dragPath = []), this._dragPath.push(m(t)), void this._element.dispatchEvent(new CustomEvent("file-over", { detail: { x: O(this._dragPath).x, y: O(this._dragPath).y } }))) : (t.dataTransfer.dropEffect = "none", void this._element.dispatchEvent(new CustomEvent("file-invalid")));
          } }, { key: "_onDragLeave", value: function value(t) {
            this._element.dispatchEvent(new CustomEvent("file-out", { detail: m(t) })), this._dragPath = null;
          } }, { key: "destroy", value: function value() {
            var t = this;i.forEach(function (e) {
              t._element.removeEventListener(e, t);
            }), ct(this._element);
          } }, { key: "element", get: function get() {
            return this._element;
          } }, { key: "dragPath", get: function get() {
            return this._dragPath;
          } }, { key: "enabled", get: function get() {
            return "" === this._element.style.display;
          }, set: function set(t) {
            this._element.style.display = t ? "" : "none";
          } }, { key: "accept", set: function set(t) {
            this._accept = t;
          }, get: function get() {
            return this._accept;
          } }]), n;
      }();
    }(),
        yt = function () {
      return function () {
        function i() {
          t(this, i), this._element = null, this._inner = null, this._init();
        }return p(i, [{ key: "_init", value: function value() {
            this._element = k("div", "slim-popover"), this._element.setAttribute("data-state", "off"), document.body.appendChild(this._element);
          } }, { key: "show", value: function value() {
            var t = this,
                i = arguments.length <= 0 || arguments[0] === e ? function () {} : arguments[0];this._element.setAttribute("data-state", "on"), l(this._element, { fromOpacity: 0, opacity: 1, duration: 350, complete: function complete() {
                R(t._element), i();
              } });
          } }, { key: "hide", value: function value() {
            var t = this,
                i = arguments.length <= 0 || arguments[0] === e ? function () {} : arguments[0];l(this._element, { fromOpacity: 1, opacity: 0, duration: 500, complete: function complete() {
                R(t._element), t._element.setAttribute("data-state", "off"), i();
              } });
          } }, { key: "destroy", value: function value() {
            this._element.parentNode && this._element.parentNode.removeChild(this._element);
          } }, { key: "inner", set: function set(t) {
            this._inner = t, this._element.firstChild && this._element.removeChild(this._element.firstChild), this._element.appendChild(this._inner);
          } }]), i;
      }();
    }(),
        wt = function wt(t, e) {
      return t.split(e).map(function (t) {
        return parseInt(t, 10);
      });
    },
        bt = function bt(t) {
      return "DIV" === t.nodeName;
    },
        kt = { AUTO: "auto", INITIAL: "initial", MANUAL: "manual" },
        xt = ["x", "y", "width", "height"],
        Et = ["file-invalid-drop", "file-invalid", "file-drop", "file-over", "file-out", "click"],
        Ct = ["cancel", "confirm"],
        St = ["remove", "edit", "download", "upload"],
        Pt = null,
        It = 0,
        Ot = '\n<div class="slim-loader">\n\t<svg>\n\t\t<path class="slim-loader-background" fill="none" stroke-width="3" />\n\t\t<path class="slim-loader-foreground" fill="none" stroke-width="3" />\n\t</svg>\n</div>\n',
        Tt = '\n<div class="slim-upload-status"></div>\n',
        Lt = function () {
      function i(n) {
        var o = arguments.length <= 1 || arguments[1] === e ? {} : arguments[1];t(this, i), Pt || (Pt = new yt()), It++, this._options = _(i.options(), o), this._originalElement = n, this._originalElementInner = n.innerHTML, this._originalElementAttributes = f(n), bt(n) ? this._element = n : (this._element = pt(n), this._element.className = n.className, n.className = "", this._element.setAttribute("data-ratio", this._options.ratio)), this._element.classList.add("slim"), this._element.setAttribute("data-state", "init"), this._input = null, this._output = null, this._ratio = null, this._isRequired = !1, this._imageHopper = null, this._imageEditor = null, this._progressEnabled = !0, this._data = {}, this._resetData(), this._state = [], this._drip = null, this._hasInitialImage = !1, this._initialCrop = this._options.crop, this._isBeingDestroyed = !1, i.supported ? this._init() : this._fallback();
      }return p(i, [{ key: "isAttachedTo", value: function value(t) {
          return this._element === t || this._originalElement === t;
        } }, { key: "isDetached", value: function value() {
          return null === this._element.parentNode;
        } }, { key: "load", value: function value(t) {
          var i = arguments.length <= 1 || arguments[1] === e ? {} : arguments[1],
              n = arguments[2];"function" == typeof i ? n = i : (this._options.crop = i.crop, this._initialCrop = this._options.crop), this._load(t, n);
        } }, { key: "upload", value: function value(t) {
          this._doUpload(t);
        } }, { key: "download", value: function value() {
          this._doDownload();
        } }, { key: "remove", value: function value() {
          return this._doRemove();
        } }, { key: "destroy", value: function value() {
          this._doDestroy();
        } }, { key: "edit", value: function value() {
          this._doEdit();
        } }, { key: "crop", value: function value(t, e) {
          this._crop(t.x, t.y, t.width, t.height, e);
        } }, { key: "_canInstantEdit", value: function value() {
          return this._options.instantEdit && !this._isInitialising;
        } }, { key: "_getFileInput", value: function value() {
          return this._element.querySelector("input[type=file]");
        } }, { key: "_getInitialImage", value: function value() {
          return this._element.querySelector("img");
        } }, { key: "_getInputElement", value: function value() {
          return this._getFileInput() || this._getInitialImage();
        } }, { key: "_getRatioSpacerElement", value: function value() {
          return this._element.children[0];
        } }, { key: "_isImageOnly", value: function value() {
          return "INPUT" !== this._input.nodeName;
        } }, { key: "_isFixedRatio", value: function value() {
          return this._options.ratio.indexOf(":") !== -1;
        } }, { key: "_toggleButton", value: function value(t, e) {
          ut('.slim-btn[data-action="' + t + '"]', e, this._element);
        } }, { key: "_clearState", value: function value() {
          this._state = [], this._updateState();
        } }, { key: "_removeState", value: function value(t) {
          this._state = this._state.filter(function (e) {
            return e !== t;
          }), this._updateState();
        } }, { key: "_addState", value: function value(t) {
          L(t, this._state) || (this._state.push(t), this._updateState());
        } }, { key: "_updateState", value: function value() {
          this._element.setAttribute("data-state", this._state.join(","));
        } }, { key: "_resetData", value: function value() {
          this._data = { server: null, meta: ot(this._options.meta), input: { image: null, name: null, type: null, width: 0, height: 0 }, output: { image: null, width: 0, height: 0 }, actions: { rotation: null, crop: null, size: null } }, this._output && (this._output.value = ""), nt(this._getFileInput());
        } }, { key: "_init", value: function value() {
          var t = this;this._isInitialising = !0, this._addState("empty"), this._input = this._getInputElement(), this._input || (this._input = k("input"), this._input.type = "file", this._element.appendChild(this._input)), this._isRequired = this._input.required === !0, this._output = this._element.querySelector("input[type=hidden]"), this._output || (this._output = k("input"), this._output.type = "hidden", this._output.name = this._input.name || this._options.defaultInputName, this._element.appendChild(this._output)), this._input.removeAttribute("name");var e = k("div", "slim-area"),
              i = this._getInitialImage(),
              n = (i || {}).src;n ? this._hasInitialImage = !0 : this._initialCrop = null;var o = '\n\t\t<div class="slim-result">\n\t\t\t<img class="in" style="opacity:0" ' + (n ? 'src="' + n + '"' : "") + '><img><img style="opacity:0">\n\t\t</div>';if (this._isImageOnly()) e.innerHTML = "\n\t\t\t\t" + Ot + "\n\t\t\t\t" + Tt + "\n\t\t\t\t" + o + "\n\t\t\t";else {
            var a = void 0;this._input.hasAttribute("accept") && "image/*" !== this._input.getAttribute("accept") ? a = this._input.accept.split(",").map(function (t) {
              return t.trim();
            }).filter(function (t) {
              return t.length > 0;
            }) : (a = A(), this._input.setAttribute("accept", a.join(","))), this._imageHopper = new vt(), this._imageHopper.accept = a, this._element.appendChild(this._imageHopper.element), Et.forEach(function (e) {
              t._imageHopper.element.addEventListener(e, t);
            }), e.innerHTML = "\n\t\t\t\t" + Ot + "\n\t\t\t\t" + Tt + '\n\t\t\t\t<div class="slim-drip"><span><span></span></span></div>\n\t\t\t\t<div class="slim-status"><div class="slim-label">' + (this._options.label || "") + "</div></div>\n\t\t\t\t" + o + "\n\t\t\t", this._input.addEventListener("change", this);
          }if (this._element.appendChild(e), this._btnGroup = k("div", "slim-btn-group"), this._btnGroup.style.display = "none", this._element.appendChild(this._btnGroup), St.filter(function (e) {
            return t._isButtonAllowed(e);
          }).forEach(function (e) {
            var i = I(e),
                n = t._options["button" + i + "Label"],
                o = t._options["button" + i + "Title"] || n,
                a = t._options["button" + i + "ClassName"],
                r = k("button", "slim-btn slim-btn-" + e + (a ? " " + a : ""));r.innerHTML = n, r.title = o, r.type = "button", r.addEventListener("click", t), r.setAttribute("data-action", e), t._btnGroup.appendChild(r);
          }), this._isFixedRatio()) {
            var r = wt(this._options.ratio, ":");this._ratio = r[1] / r[0], this._scaleDropArea(this._ratio);
          }this._updateProgress(.5), n ? this._load(n, function () {
            t._onInit();
          }) : this._onInit();
        } }, { key: "_onInit", value: function value() {
          var t = this;this._isInitialising = !1;var e = function e() {
            setTimeout(function () {
              t._options.didInit.apply(t, [t.data]);
            }, 0);
          };this._options.saveInitialImage ? this._save(function () {
            e();
          }, !1) : e();
        } }, { key: "_updateProgress", value: function value(t) {
          if (this._progressEnabled) {
            var e = this._element.querySelector(".slim-loader");if (e) {
              var i = e.getBoundingClientRect(),
                  n = e.querySelectorAll("path"),
                  o = parseInt(n[0].getAttribute("stroke-width"), 10);n[0].setAttribute("d", mt(.5 * i.width, .5 * i.height, .5 * i.width - o, .9999)), n[1].setAttribute("d", mt(.5 * i.width, .5 * i.height, .5 * i.width - o, t));
            }
          }
        } }, { key: "_startProgress", value: function value() {
          var t = this;this._progressEnabled = !1;var e = this._element.querySelector(".slim-loader");if (e) {
            var i = e.children[0];this._stopProgressLoop(function () {
              e.removeAttribute("style"), i.removeAttribute("style"), t._progressEnabled = !0, t._updateProgress(0), t._progressEnabled = !1, l(i, { fromOpacity: 0, opacity: 1, duration: 250, complete: function complete() {
                  t._progressEnabled = !0;
                } });
            });
          }
        } }, { key: "_stopProgress", value: function value() {
          var t = this,
              e = this._element.querySelector(".slim-loader");if (e) {
            var i = e.children[0];this._updateProgress(1), l(i, { fromOpacity: 1, opacity: 0, duration: 250, complete: function complete() {
                e.removeAttribute("style"), i.removeAttribute("style"), t._updateProgress(.5), t._progressEnabled = !1;
              } });
          }
        } }, { key: "_startProgressLoop", value: function value() {
          var t = this._element.querySelector(".slim-loader");if (t) {
            var e = t.children[0];t.removeAttribute("style"), e.removeAttribute("style"), this._updateProgress(.5);var i = 1e3;l(t, { rotation: [0, 0, -(2 * Math.PI) * i], easing: "linear", duration: 1e3 * i }), l(e, { fromOpacity: 0, opacity: 1, duration: 250 });
          }
        } }, { key: "_stopProgressLoop", value: function value(t) {
          var e = this._element.querySelector(".slim-loader");if (e) {
            var i = e.children[0];l(i, { fromOpacity: parseFloat(i.style.opacity), opacity: 0, duration: 250, complete: function complete() {
                l(e, "stop"), t && t();
              } });
          }
        } }, { key: "_isButtonAllowed", value: function value(t) {
          return "edit" === t ? this._options.edit : "download" === t ? this._options.download : "upload" === t ? !!this._options.service && !this._options.push : "remove" !== t || !this._isImageOnly();
        } }, { key: "_fallback", value: function value() {
          this._removeState("init");var t = k("div", "slim-area");t.innerHTML = '\n\t\t\t<div class="slim-status"><div class="slim-label">' + (this._options.label || "") + "</div></div>\n\t\t", this._element.appendChild(t), this._throwError(this._options.statusNoSupport);
        } }, { key: "handleEvent", value: function value(t) {
          switch (t.type) {case "click":
              this._onClick(t);break;case "change":
              this._onChange(t);break;case "cancel":
              this._onCancel(t);break;case "confirm":
              this._onConfirm(t);break;case "file-over":
              this._onFileOver(t);break;case "file-out":
              this._onFileOut(t);break;case "file-drop":
              this._onDropFile(t);break;case "file-invalid":
              this._onInvalidFile(t);break;case "file-invalid-drop":
              this._onInvalidFileDrop(t);}
        } }, { key: "_getIntro", value: function value() {
          return this._element.querySelector(".slim-result .in");
        } }, { key: "_getOutro", value: function value() {
          return this._element.querySelector(".slim-result .out");
        } }, { key: "_getInOut", value: function value() {
          return this._element.querySelectorAll(".slim-result img");
        } }, { key: "_getDrip", value: function value() {
          return this._drip || (this._drip = this._element.querySelector(".slim-drip > span")), this._drip;
        } }, { key: "_throwError", value: function value(t) {
          this._addState("error"), this._element.querySelector(".slim-label").style.display = "none";var e = this._element.querySelector(".slim-error");e || (e = k("div", "slim-error"), this._element.querySelector(".slim-status").appendChild(e)), e.innerHTML = t;
        } }, { key: "_removeError", value: function value() {
          this._removeState("error"), this._element.querySelector(".slim-label").style.display = "";var t = this._element.querySelector(".slim-error");t && t.parentNode.removeChild(t);
        } }, { key: "_openFileDialog", value: function value() {
          this._removeError(), this._input.click();
        } }, { key: "_onClick", value: function value(t) {
          var e = this,
              i = t.target.classList,
              n = t.target;if (i.contains("slim-file-hopper")) return void this._openFileDialog();switch (n.getAttribute("data-action")) {case "remove":
              this._options.willRemove.apply(this, [this.data, function () {
                e._doRemove();
              }]);break;case "edit":
              this._doEdit();break;case "download":
              this._doDownload();break;case "upload":
              this._doUpload();}
        } }, { key: "_onInvalidFileDrop", value: function value() {
          this._onInvalidFile(), this._removeState("file-over");var t = this._getDrip();l(t.firstChild, { fromScale: [.5, .5], scale: [0, 0], fromOpacity: .5, opacity: 0, duration: 150, complete: function complete() {
              R(t.firstChild);
            } });
        } }, { key: "_onInvalidFile", value: function value() {
          var t = this._imageHopper.accept.map(z),
              e = this._options.statusFileType.replace("$0", t.join(", "));this._throwError(e);
        } }, { key: "_onImageTooSmall",
        value: function value() {
          var t = this._options.statusImageTooSmall.replace("$0", this._options.minSize.width + " × " + this._options.minSize.height);this._throwError(t);
        } }, { key: "_onOverWeightFile", value: function value() {
          var t = this._options.statusFileSize.replace("$0", this._options.maxFileSize);this._throwError(t);
        } }, { key: "_onFileOver", value: function value(t) {
          this._addState("file-over"), this._removeError();var e = this._getDrip(),
              i = l.createMatrix();i.translate(t.detail.x, t.detail.y, 0), l.setElementTransform(e, i), 1 == this._imageHopper.dragPath.length && (e.style.opacity = 1, l(e.firstChild, { fromOpacity: 0, opacity: .5, fromScale: [0, 0], scale: [.5, .5], duration: 150 }));
        } }, { key: "_onFileOut", value: function value(t) {
          this._removeState("file-over"), this._removeState("file-invalid"), this._removeError();var e = this._getDrip(),
              i = l.createMatrix();i.translate(t.detail.x, t.detail.y, 0), l.setElementTransform(e, i), l(e.firstChild, { fromScale: [.5, .5], scale: [0, 0], fromOpacity: .5, opacity: 0, duration: 150, complete: function complete() {
              R(e.firstChild);
            } });
        } }, { key: "_onDropFile", value: function value(t) {
          var e = this;this._removeState("file-over");var i = this._getDrip(),
              n = l.createMatrix();n.translate(t.detail.x, t.detail.y, 0), l.setElementTransform(i, n);var o = this._imageHopper.dragPath.length,
              a = this._imageHopper.dragPath[o - Math.min(10, o)],
              r = t.detail.x - a.x,
              s = t.detail.y - a.y;l(i, { fromPosition: [t.detail.x, t.detail.y, 0], position: [t.detail.x + r, t.detail.y + s, 0], duration: 200 }), l(i.firstChild, { fromScale: [.5, .5], scale: [2, 2], fromOpacity: 1, opacity: 0, duration: 200, complete: function complete() {
              R(i.firstChild), e._load(t.target.files[0]);
            } });
        } }, { key: "_onChange", value: function value(t) {
          this._load(t.target.files[0]);
        } }, { key: "_load", value: function value(t, e) {
          var i = this;if (!this._isBeingDestroyed) {
            var n = j(t);if (("unknown" === n.type || this._options.forceType) && (n = q(n, this._options.forceType || "png")), this._imageHopper && this._imageHopper.accept.indexOf(n.type) === -1) return this._onInvalidFile(), void (e && e.apply(this, ["file-invalid"]));if (n.size && this._options.maxFileSize && D(n.size) > this._options.maxFileSize) return this._onOverWeightFile(), void (e && e.apply(this, ["file-too-big"]));this._removeState("empty"), this._imageHopper && (this._imageHopper.enabled = !1), this._imageEditor && this._imageEditor.dirty(), this._data.input.name = n.name, this._data.input.type = n.type, this._data.input.size = n.size, this._startProgressLoop(), this._addState("busy"), V(t, function (t, o) {
              var a = function a() {
                i._imageHopper && (i._imageHopper.enabled = !0), i._removeState("busy"), i._stopProgressLoop(), i._resetData();
              };if (!t) return a(), void (e && e.apply(i, ["file-not-found"]));if (!tt(t, i._options.minSize)) return a(), i._onImageTooSmall(), void (e && e.apply(i, ["image-too-small"]));var r = i._options.didLoad.apply(i, [n, t, o]);return r !== !0 ? (a(), r !== !1 && i._throwError(r), void (e && e.apply(i, [r]))) : void i._loadCanvas(t, function () {
                var t = i._getIntro(),
                    n = { fromScale: [1.25, 1.25], scale: [1, 1], fromOpacity: 0, opacity: 1, complete: function complete() {
                    R(t), t.style.opacity = 1, i._canInstantEdit() || i._showButtons(), i._stopProgressLoop(), i._removeState("busy"), i._addState("preview"), e && e.apply(i, [null, i.data]);
                  } };i.isDetached() ? n.duration = 1 : (n.easing = "spring", n.springConstant = .3, n.springDeceleration = .7), i._canInstantEdit() && (n.delay = 500, n.duration = 1, i._doEdit()), l(t, n);
              });
            });
          }
        } }, { key: "_loadCanvas", value: function value(t, e) {
          var i = this;this._isBeingDestroyed || (this._isFixedRatio() || (this._ratio = t.height / t.width, this._scaleDropArea(this._ratio)), this._data.input.image = t, this._data.input.width = t.width, this._data.input.height = t.height, this._initialCrop ? (this._data.actions.crop = ot(this._initialCrop), this._data.actions.crop.type = kt.INITIAL, this._initialCrop = null) : (this._data.actions.crop = G(t.width, t.height, this._ratio), this._data.actions.crop.type = kt.AUTO), this._options.size && (this._data.actions.size = { width: this._options.size.width, height: this._options.size.height }), this._applyTransforms(t, function (t) {
            var n = i._getIntro(),
                o = n.offsetWidth / t.width,
                a = !1;i._options.service && i._options.push && (i._hasInitialImage || (a = !0)), i._save(function () {}, a), n.src = "", n.src = $(t, o).toDataURL(), n.onload = function () {
              n.onload = null, i._isBeingDestroyed || e && e();
            };
          }));
        } }, { key: "_applyTransforms", value: function value(t, e) {
          var i = this;X(t, this._data.actions, function (t) {
            i._data.output.width = t.width, i._data.output.height = t.height, i._data.output.image = t, i._onTransformCanvas(function (t) {
              i._data = t, i._options.didTransform.apply(i, [i.data]), e(i._data.output.image);
            });
          });
        } }, { key: "_onTransformCanvas", value: function value(t) {
          this._options.willTransform.apply(this, [this.data, t]);
        } }, { key: "_appendEditor", value: function value() {
          var t = this;this._imageEditor || (this._imageEditor = new gt(k("div"), { minSize: this._options.minSize, buttonConfirmClassName: this._options.buttonConfirmClassName, buttonCancelClassName: this._options.buttonCancelClassName, buttonRotateClassName: this._options.buttonRotateClassName, buttonConfirmLabel: this._options.buttonConfirmLabel, buttonCancelLabel: this._options.buttonCancelLabel, buttonRotateLabel: this._options.buttonRotateLabel, buttonConfirmTitle: this._options.buttonConfirmTitle, buttonCancelTitle: this._options.buttonCancelTitle, buttonRotateTitle: this._options.buttonRotateTitle }), Ct.forEach(function (e) {
            t._imageEditor.element.addEventListener(e, t);
          }));
        } }, { key: "_scaleDropArea", value: function value(t) {
          var e = this._getRatioSpacerElement();e && this._element && (e.style.marginBottom = 100 * t + "%", this._element.setAttribute("data-ratio", "1:" + t));
        } }, { key: "_onCancel", value: function value(t) {
          this._removeState("editor"), this._showButtons(), this._hideEditor();
        } }, { key: "_onConfirm", value: function value(t) {
          var e = this;this._removeState("editor"), this._startProgressLoop(), this._addState("busy"), this._output.value = "", this._data.actions.rotation = t.detail.rotation, this._data.actions.crop = t.detail.crop, this._data.actions.crop.type = kt.MANUAL, this._applyTransforms(this._data.input.image, function (t) {
            var i = e._getInOut(),
                n = "out" === i[0].className ? i[0] : i[1],
                o = n === i[0] ? i[1] : i[0];n.className = "in", n.style.opacity = "0", n.style.zIndex = "2", o.className = "out", o.style.zIndex = "1", n.src = "", n.src = $(t, n.offsetWidth / t.width).toDataURL(), n.onload = function () {
              n.onload = null, "free" === e._options.ratio && (e._ratio = n.naturalHeight / n.naturalWidth, e._scaleDropArea(e._ratio)), e._hideEditor(), setTimeout(function () {
                e._showPreview(n, function () {
                  var t = e._options.service && e._options.push;e._save(function (t, i, n) {
                    e._toggleButton("upload", !0), e._stopProgressLoop(), e._removeState("busy"), e._showButtons();
                  }, t);
                });
              }, 250);
            };
          });
        } }, { key: "_crop", value: function value(t, i, n, o) {
          var a = this,
              r = arguments.length <= 4 || arguments[4] === e ? function () {} : arguments[4];this._startProgressLoop(), this._addState("busy"), this._output.value = "", this._data.actions.crop = { x: t, y: i, width: n, height: o }, this._data.actions.crop.type = kt.MANUAL, this._applyTransforms(this._data.input.image, function (t) {
            var e = a._getInOut(),
                i = "out" === e[0].className ? e[0] : e[1],
                n = i === e[0] ? e[1] : e[0];i.className = "in", i.style.opacity = "1", i.style.zIndex = "2", n.className = "out", n.style.zIndex = "0", i.src = "", i.src = $(t, i.offsetWidth / t.width).toDataURL(), i.onload = function () {
              i.onload = null, "free" === a._options.ratio && (a._ratio = i.naturalHeight / i.naturalWidth, a._scaleDropArea(a._ratio));var t = a._options.service && a._options.push;a._save(function (t, e, i) {
                a._stopProgressLoop(), a._removeState("busy"), r.apply(a, [a.data]);
              }, t);
            };
          });
        } }, { key: "_save", value: function value() {
          var t = this,
              i = arguments.length <= 0 || arguments[0] === e ? function () {} : arguments[0],
              n = arguments.length <= 1 || arguments[1] === e || arguments[1],
              o = this.dataBase64;this._options.service || this._isInitialising && !this._isImageOnly() || this._options.willSave.apply(this, [o, function (e) {
            t._store(e), t._options.didSave.apply(t, [e]);
          }]), this._options.service && n && this._options.willSave.apply(this, [o, function (e) {
            t._upload(e, function (n, o) {
              n || t._storeServerResponse(o), t._options.didUpload.apply(t, [n, e, o]), i(n, e, o);
            });
          }]), this._options.service && n || i();
        } }, { key: "_storeServerResponse", value: function value(t) {
          this._isRequired && (this._input.required = !1), this._data.server = t, this._output.value = "object" === ("undefined" == typeof t ? "undefined" : d(t)) ? JSON.stringify(this._data.server) : t;
        } }, { key: "_store", value: function value(t) {
          this._isRequired && (this._input.required = !1), this._output.value = JSON.stringify(t);
        } }, { key: "_upload", value: function value(t, e) {
          var i = this,
              n = new FormData();n.append(this._output.name, JSON.stringify(t));var o = this._element.querySelector(".slim-upload-status"),
              a = this._options.willRequest;M(this._options.service, n, a, function (t, e) {
            i._updateProgress(t / e);
          }, function (t) {
            setTimeout(function () {
              o.innerHTML = i._options.statusUploadSuccess, o.setAttribute("data-state", "success"), o.style.opacity = 1, setTimeout(function () {
                o.style.opacity = 0;
              }, 2e3);
            }, 250), e(null, t);
          }, function (t) {
            var n = "";n = "file-too-big" === t ? i._options.statusContentLength : i._options.statusUnknownResponse, setTimeout(function () {
              o.innerHTML = n, o.setAttribute("data-state", "error"), o.style.opacity = 1;
            }, 250), e(t);
          });
        } }, { key: "_showEditor", value: function value() {
          Pt.show(), this._imageEditor.show();
        } }, { key: "_hideEditor", value: function value() {
          this._imageEditor.hide(), setTimeout(function () {
            Pt.hide();
          }, 250);
        } }, { key: "_showPreview", value: function value(t, e) {
          l(t, { fromPosition: [0, 50, 0], position: [0, 0, 0], fromScale: [1.5, 1.5], scale: [1, 1], fromOpacity: 0, opacity: 1, easing: "spring", springConstant: .3, springDeceleration: .7, complete: function complete() {
              R(t), e && e();
            } });
        } }, { key: "_hideResult", value: function value(t) {
          var e = this._getIntro();e && l(e, { fromScale: [1, 1], scale: [.5, .5], fromOpacity: 1, opacity: 0, easing: "spring", springConstant: .3, springDeceleration: .75, complete: function complete() {
              R(e), t && t();
            } });
        } }, { key: "_showButtons", value: function value(t) {
          this._btnGroup.style.display = "";var e = { fromScale: [.5, .5], scale: [1, 1], fromPosition: [0, 10, 0], position: [0, 0, 0], fromOpacity: 0, opacity: 1, complete: function complete() {
              R(this);
            }, allDone: function allDone() {
              t && t();
            } };this.isDetached() ? e.duration = 1 : (e.delay = function (t) {
            return 250 + 50 * t;
          }, e.easing = "spring", e.springConstant = .3, e.springDeceleration = .85), l(this._btnGroup.childNodes, e);
        } }, { key: "_hideButtons", value: function value(t) {
          var e = this,
              i = { fromScale: [1, 1], scale: [.85, .85], fromOpacity: 1, opacity: 0, allDone: function allDone() {
              e._btnGroup.style.display = "none", t && t();
            } };this.isDetached() ? i.duration = 1 : (i.easing = "spring", i.springConstant = .3, i.springDeceleration = .75), l(this._btnGroup.childNodes, i);
        } }, { key: "_hideStatus", value: function value() {
          var t = this._element.querySelector(".slim-upload-status");t.style.opacity = 0;
        } }, { key: "_doEdit", value: function value() {
          var t = this;this._data.input.image && (this._addState("editor"), this._imageEditor || this._appendEditor(), Pt.inner = this._imageEditor.element, this._imageEditor.open(Y(this._data.input.image), "free" === this._options.ratio ? null : this._ratio, this._data.actions.crop, this._data.actions.rotation, function () {
            t._showEditor(), t._hideButtons(), t._hideStatus();
          }));
        } }, { key: "_doRemove", value: function value() {
          var t = this;if (!this._isImageOnly()) {
            this._clearState(), this._addState("empty"), this._hasInitialImage = !1, this._imageHopper.enabled = !0, this._isRequired && (this._input.required = !0);var e = this._getOutro();e && (e.style.opacity = "0");var i = this.data;return this._resetData(), setTimeout(function () {
              t._isBeingDestroyed || (t._hideButtons(function () {
                t._toggleButton("upload", !0);
              }), t._hideStatus(), t._hideResult(), t._options.didRemove.apply(t, [i]));
            }, this.isDetached() ? 0 : 250), i;
          }
        } }, { key: "_doUpload", value: function value(t) {
          var e = this;this._data.input.image && (this._addState("upload"), this._startProgress(), this._hideButtons(function () {
            e._toggleButton("upload", !1), e._save(function (i, n, o) {
              e._removeState("upload"), e._stopProgress(), t && t.apply(e, [i, n, o]), i && e._toggleButton("upload", !0), e._showButtons();
            });
          }));
        } }, { key: "_doDownload", value: function value() {
          var t = this._data.output.image;t && Q(t, this._data.input.name, this._data.input.type);
        } }, { key: "_doDestroy", value: function value() {
          function t(t, e) {
            return 0 !== e.filter(function (e) {
              return t.name === e.name && t.value === e.value;
            }).length;
          }var e = this;this._isBeingDestroyed = !0, this._imageHopper && (Et.forEach(function (t) {
            e._imageHopper.element.removeEventListener(t, e);
          }), this._imageHopper.destroy()), this._imageEditor && (Ct.forEach(function (t) {
            e._imageEditor.element.removeEventListener(t, e);
          }), this._imageEditor.destroy()), lt(this._btnGroup.children).forEach(function (t) {
            t.removeEventListener("click", e);
          }), this._input.removeEventListener("change", this), this._element !== this._originalElement && this._element.parentNode && this._element.parentNode.replaceChild(this._originalElement, this._element), this._originalElement.innerHTML = this._originalElementInner;var i = f(this._originalElement);i.forEach(function (i) {
            t(i, e._originalElementAttributes) || e._originalElement.removeAttribute(i.name);
          }), this._originalElementAttributes.forEach(function (n) {
            t(n, i) || e._originalElement.setAttribute(n.name, n.value);
          }), It = Math.max(0, It - 1), Pt && 0 === It && (Pt.destroy(), Pt = null);
        } }, { key: "dataBase64", get: function get() {
          return ht(this._data, this._options.post, this._options.jpegCompression);
        } }, { key: "data", get: function get() {
          return at(this._data);
        } }, { key: "element", get: function get() {
          return this._element;
        } }, { key: "size", set: function set(t) {
          t && t.width && t.height && (this._options.size = ot(t), this._data.actions.size = ot(t));
        } }, { key: "ratio", set: function set(t) {
          if (t && "string" == typeof t && (this._options.ratio = t, this._isFixedRatio())) {
            var e = wt(this._options.ratio, ":");this._ratio = e[1] / e[0], this._scaleDropArea(this._ratio);
          }
        } }], [{ key: "options", value: function value() {
          var t = { edit: !0, instantEdit: !1, meta: {}, ratio: "free", size: null, crop: null, post: ["output", "actions"], service: null, push: !1, defaultInputName: "slim[]", minSize: { width: 100, height: 100 }, maxFileSize: null, jpegCompression: null, download: !1, saveInitialImage: !1, forceType: !1, label: "<p>Drop your image here</p>", statusFileType: "<p>Invalid file type, expects: $0.</p>", statusFileSize: "<p>File is too big, maximum file size: $0 MB.</p>", statusNoSupport: "<p>Your browser does not support image cropping.</p>", statusImageTooSmall: "<p>Image is too small, minimum size is: $0 pixels.</p>", statusContentLength: '<span class="slim-upload-status-icon"></span> The file is probably too big', statusUnknownResponse: '<span class="slim-upload-status-icon"></span> An unknown error occurred', statusUploadSuccess: '<span class="slim-upload-status-icon"></span> Saved', didInit: function didInit(t) {}, didLoad: function didLoad(t, e, i) {
              return !0;
            }, didSave: function didSave(t) {}, didUpload: function didUpload(t, e, i) {}, didRemove: function didRemove(t) {}, didTransform: function didTransform(t) {}, willTransform: function willTransform(t, e) {
              e(t);
            }, willSave: function willSave(t, e) {
              e(t);
            }, willRemove: function willRemove(t, e) {
              e();
            }, willRequest: function willRequest(t) {} };return St.concat(gt.Buttons).concat("rotate").forEach(function (e) {
            var i = I(e);t["button" + i + "ClassName"] = null, t["button" + i + "Label"] = i, t["button" + i + "Title"] = i;
          }), t;
        } }]), i;
    }();return function () {
      function t(t) {
        return t ? "<p>" + t + "</p>" : null;
      }function e(t) {
        var e = window,
            i = t.split(".");return i.forEach(function (t, n) {
          e[i[n]] && (e = e[i[n]]);
        }), e !== window ? e : null;
      }var i = [],
          n = function n(t) {
        for (var e = 0, n = i.length; e < n; e++) {
          if (i[e].isAttachedTo(t)) return e;
        }return -1;
      },
          o = function o(t) {
        return t;
      },
          a = function a(t) {
        return "true" === t;
      },
          r = function r(t) {
        return !t || "true" === t;
      },
          s = function s(e) {
        return t(e);
      },
          h = function h(t) {
        return t ? e(t) : null;
      },
          u = function u(t) {
        if (!t) return null;var e = wt(t, ",");return { width: e[0], height: e[1] };
      },
          l = function l(t) {
        return t ? parseFloat(t) : null;
      },
          c = function c(t) {
        return t ? parseInt(t, 10) : null;
      },
          p = function p(t) {
        if (!t) return null;var e = {};return t.split(",").map(function (t) {
          return parseInt(t, 10);
        }).forEach(function (t, i) {
          e[xt[i]] = t;
        }), e;
      },
          d = { download: a, edit: r, instantEdit: a, minSize: u, size: u, service: function service(t) {
          return "undefined" == typeof t ? null : t;
        }, push: a, crop: p, post: function post(t) {
          return t ? t.split(",").map(function (t) {
            return t.trim();
          }) : null;
        }, defaultInputName: o, ratio: function ratio(t) {
          return t ? t : null;
        }, maxFileSize: l, jpegCompression: c, forceType: o, saveInitialImage: a, label: s };["FileSize", "FileType", "NoSupport", "ImageTooSmall"].forEach(function (t) {
        d["status" + t] = s;
      }), ["ContentLength", "UnknownResponse", "UploadSuccess"].forEach(function (t) {
        d["status" + t] = o;
      }), ["Init", "Load", "Save", "Upload", "Remove", "Transform"].forEach(function (t) {
        d["did" + t] = h;
      }), ["Transform", "Save", "Remove", "Request"].forEach(function (t) {
        d["will" + t] = h;
      });var f = ["ClassName", "Label", "Title"];St.concat(gt.Buttons).concat("rotate").forEach(function (t) {
        var e = I(t);f.forEach(function (t) {
          d["button" + e + t] = o;
        });
      }), Lt.supported = function () {
        return "undefined" != typeof window.FileReader;
      }(), Lt.parse = function (t) {
        var e,
            i,
            n,
            o = [];for (e = t.querySelectorAll(".slim:not([data-state])"), n = e.length; n--;) {
          i = e[n], o.push(Lt.create(i, Lt.getOptionsFromAttributes(i)));
        }return o;
      }, Lt.getOptionsFromAttributes = function (t) {
        var e = t.dataset,
            i = { meta: {} };for (var n in e) {
          var o = d[n],
              a = e[n];o ? (a = o(a), a = null === a ? ot(Lt.options()[n]) : a, i[n] = a) : 0 === n.indexOf("meta") && (i.meta[P(n.substr(4))] = a);
        }return i;
      }, Lt.find = function (t) {
        var e = i.filter(function (e) {
          return e.isAttachedTo(t);
        });return e ? e[0] : null;
      }, Lt.create = function (t, e) {
        if (!Lt.find(t)) {
          e || (e = Lt.getOptionsFromAttributes(t));var n = new Lt(t, e);return i.push(n), n;
        }
      }, Lt.destroy = function (t) {
        var e = n(t);return !(e < 0) && (i[e].destroy(), i[e] = null, i.splice(e, 1), !0);
      };
    }(), Lt;
  }(), "loading" !== document.readyState ? i() : document.addEventListener("DOMContentLoaded", i));
}(this);

/***/ }),

/***/ 382:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(383);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(7)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js!./slim.min.css", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js!./slim.min.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 383:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "/*\n * Slim v3.3.2 - Image Cropping Made Easy\n * Copyright (c) 2016 Rik Schennink - http://slimimagecropper.com\n */\n.slim-file-hopper{position:absolute;left:0;top:0;right:0;bottom:0;cursor:pointer}.slim-image-editor{position:relative;height:100%;text-align:left;z-index:1}.slim-image-editor .slim-container{position:relative;height:calc(100% - 8em);width:100%;z-index:2}.slim-image-editor .slim-editor-btn-group,.slim-image-editor .slim-editor-utils-group{-ms-flex-negative:0;flex-shrink:0}.slim-image-editor,.slim-image-editor .slim-crop-preview,.slim-image-editor .slim-stage{-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-perspective:1000;perspective:1000}.slim-image-editor .slim-stage{position:absolute;line-height:0}.slim-image-editor .slim-wrapper{position:absolute;z-index:2}.slim-image-editor .slim-crop-preview{position:absolute;left:0;top:0;right:0;bottom:0;line-height:0}.slim-image-editor .slim-stage{z-index:4}.slim-image-editor .slim-crop-preview{z-index:3;border-radius:4px}.slim-image-editor .slim-crop-preview:after,.slim-image-editor .slim-crop-preview canvas,.slim-image-editor .slim-crop-preview img{position:absolute;display:block;border-radius:inherit;left:0;top:0}.slim-image-editor .slim-crop-preview .slim-crop{z-index:3}.slim-image-editor .slim-crop-preview:after{z-index:2;right:0;bottom:0;content:''}.slim-image-editor .slim-crop-preview .slim-crop-blur{-webkit-filter:contrast(.7);-moz-filter:contrast(.7);filter:contrast(.7);z-index:1}.slim-image-editor .slim-editor-utils-group{text-align:center;z-index:3}.slim-image-editor .slim-editor-utils-group button{width:2.5em;height:2.5em;padding:0;cursor:pointer;outline:none;box-shadow:inset 0 -1px 2px rgba(0,0,0,.1),inset 0 1px 0 0 hsla(0,0%,100%,.15);background-color:transparent;background-size:50% 50%;background-position:50%;background-repeat:no-repeat}.slim-image-editor .slim-editor-utils-group button:active{background-color:rgba(0,0,0,.1);box-shadow:inset 0 1px 2px rgba(0,0,0,.15)}.slim-image-editor .slim-editor-btn-group{position:relative;z-index:3;text-align:center}.slim-image-editor .slim-editor-btn-group button{position:relative;display:inline-block;vertical-align:top;font-size:1em;margin:0 .75em;padding:.75em 1.5em .875em;cursor:pointer;overflow:hidden;-webkit-transition:color .25s,box-shadow .25s,background-color .25s;transition:color .25s,box-shadow .25s,background-color .25s;box-shadow:inset 0 -1px 2px rgba(0,0,0,.1),inset 0 1px 0 0 hsla(0,0%,100%,.15);background-color:transparent;outline:none}.slim-image-editor .slim-editor-btn-group button:active{padding:.875em 1.5em .75em;background-color:rgba(0,0,0,.1);box-shadow:inset 0 1px 2px rgba(0,0,0,.15)}.slim-editor-btn,.slim-editor-utils-btn{color:hsla(0,0%,100%,.75);border:2px solid rgba(0,0,0,.25)}.slim-editor-btn:focus,.slim-editor-btn:hover,.slim-editor-utils-btn:focus,.slim-editor-utils-btn:hover{color:hsla(0,0%,100%,.9)}.slim-editor-utils-btn{border-radius:.6875em}.slim-editor-btn{border-radius:.5em}.slim-image-editor-preview:after{background-color:rgba(244,250,255,.4);box-shadow:inset 0 0 0 1px hsla(0,0%,100%,.07),0 1px 5px rgba(0,0,0,.3)}.slim-btn-rotate{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='252' height='287' viewBox='0 0 252 287' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M134.762.626v36.15c65.016 4.594 116.34 58.75 116.34 124.936 0 69.198-56.09 125.288-125.29 125.288C56.616 287 .525 230.91.525 161.71c0-30.036 10.592-57.59 28.215-79.17l31.934 31.934C51.03 127.75 45.27 144.04 45.27 161.71c0 44.485 36.06 80.544 80.544 80.544 44.484 0 80.544-36.058 80.544-80.543 0-41.454-31.327-75.56-71.594-80.017v35.272l-62.646-57.89L134.762.625zm-8.95 196.883c-19.77 0-35.796-16.028-35.796-35.798 0-19.77 16.027-35.796 35.797-35.796 19.77 0 35.797 16.026 35.797 35.796s-16.027 35.797-35.797 35.797z' fill='rgba(255,255,255,.8)' fill-rule='evenodd'/%3E%3C/svg%3E\")}.slim-editor-btn-group,.slim-editor-utils-group{padding:1em 0 0}@media (min-width:40em){.slim-btn-group{padding-top:2em}}.slim-crop-area{position:absolute;-webkit-transition:background-color .125s ease-in-out;transition:background-color .125s ease-in-out;box-shadow:inset 0 0 0 1px hsla(0,0%,100%,.75),0 0 0 1px hsla(0,0%,100%,.75)}.slim-crop-area .grid{overflow:hidden}.slim-crop-area .grid:after,.slim-crop-area .grid:before{position:absolute;content:'';opacity:0;-webkit-transition:opacity .5s;transition:opacity .5s}.slim-crop-area .grid:before{top:33.333%;bottom:33.333%;left:1px;right:1px;box-shadow:inset 0 -1px 0 0 hsla(0,0%,100%,.35),inset 0 1px 0 0 hsla(0,0%,100%,.35)}.slim-crop-area .grid:after{top:1px;bottom:1px;left:33.333%;right:33.333%;box-shadow:inset -1px 0 0 0 hsla(0,0%,100%,.35),inset 1px 0 0 0 hsla(0,0%,100%,.35)}.slim-crop-area button{position:absolute;background:#fafafa;box-shadow:inset 0 1px 0 0 #fff,0 1px 1px rgba(0,0,0,.15);border:none;padding:0;margin:0;width:16px;height:16px;margin-top:-8px;margin-left:-8px;border-radius:8px;z-index:2}.slim-crop-area [class*=n]{top:0}.slim-crop-area [class*=s]{top:100%}.slim-crop-area [class*=w]{left:0}.slim-crop-area [class*=e]{left:100%}.slim-crop-area .e,.slim-crop-area .w{top:50%;cursor:ew-resize;height:30px;margin-top:-15px}.slim-crop-area .n,.slim-crop-area .s{left:50%;cursor:ns-resize;width:30px;margin-left:-15px}.slim-crop-area .ne,.slim-crop-area .sw{cursor:nesw-resize}.slim-crop-area .nw,.slim-crop-area .se{cursor:nwse-resize}.slim-crop-area .c{top:10px;left:10px;width:calc(100% - 20px);height:calc(100% - 20px);margin:0;border-radius:0;border:none;z-index:1;box-shadow:none;opacity:0;cursor:move}.slim-crop-area button:not(.c):after{content:'';position:absolute;left:-12px;right:-12px;top:-12px;bottom:-12px}.slim-crop-area[data-dragging=true] .grid:after,.slim-crop-area[data-dragging=true] .grid:before{opacity:1}.slim-popover{position:fixed;left:0;top:0;width:100%;height:100%;padding:1em;font-size:16px;background:rgba(25,27,29,.99);z-index:2147483647}.slim-popover[data-state=off]{left:-100%}.slim-popover:after{position:absolute;left:0;top:0;right:0;bottom:0;content:'';background:-webkit-radial-gradient(center ellipse,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,0) 80%);background:radial-gradient(ellipse at center,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,0) 80%)}@media (min-width:40em){.slim-popover{padding:2em}}.slim,.slim-crop-area,.slim-image-editor,.slim-popover{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;box-sizing:border-box}.slim-crop-area button,.slim-image-editor button,.slim-popover button,.slim button{-webkit-highlight:none;-webkit-tap-highlight-color:transparent}.slim *,.slim-crop-area *,.slim-image-editor *,.slim-popover *{box-sizing:inherit}.slim-crop-area img,.slim-image-editor img,.slim-popover img,.slim img{width:100%;height:auto;background-color:#eee;background-image:-webkit-linear-gradient(45deg,rgba(0,0,0,.1) 25%,transparent 0,transparent 75%,rgba(0,0,0,.1) 0,rgba(0,0,0,.1)),-webkit-linear-gradient(45deg,rgba(0,0,0,.1) 25%,transparent 0,transparent 75%,rgba(0,0,0,.1) 0,rgba(0,0,0,.1));background-image:linear-gradient(45deg,rgba(0,0,0,.1) 25%,transparent 0,transparent 75%,rgba(0,0,0,.1) 0,rgba(0,0,0,.1)),linear-gradient(45deg,rgba(0,0,0,.1) 25%,transparent 0,transparent 75%,rgba(0,0,0,.1) 0,rgba(0,0,0,.1));background-size:20px 20px;background-position:0 0,10px 10px}.slim{position:relative;font-size:inherit;background-color:#eee;-webkit-transition:background-color .25s;transition:background-color .25s;padding-bottom:.025px}@-webkit-keyframes rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.slim[data-state*=empty]:hover{background-color:#ddd}.slim[data-state*=error]{background-color:#e8a69f!important;color:#702010}.slim>img,.slim>input[type=file]{display:block!important;opacity:0!important;width:0!important;height:0!important;padding:0!important;margin-left:0!important;margin-right:0!important;margin-top:0!important;border:0!important}.slim>img+input[type=file],.slim>input[type=file]+img{margin-bottom:0!important}.slim>input[type=hidden]{position:absolute;width:1px;height:1px;margin:-1px;opacity:0}.slim .slim-file-hopper{z-index:3;background:rgba(0,0,0,.0001)}.slim .slim-area,.slim .slim-drip,.slim .slim-ratio,.slim .slim-result,.slim .slim-status{border-radius:inherit}.slim .slim-area{width:100%;color:inherit;overflow:hidden}.slim .slim-area :only-of-type{margin:0}.slim .slim-area .slim-loader{pointer-events:none;position:absolute;right:.875em;top:.875em;width:23px;height:23px;z-index:1}.slim .slim-area .slim-loader svg{display:block;width:100%;height:100%;opacity:0}.slim .slim-area .slim-upload-status{position:absolute;right:1em;top:1em;z-index:1;opacity:0;-webkit-transition:opacity .25s;transition:opacity .25s;white-space:nowrap;line-height:1.65;font-weight:400}.slim .slim-area .slim-upload-status-icon{display:inline-block;opacity:.9}.slim .slim-area .slim-drip,.slim .slim-area .slim-result,.slim .slim-area .slim-status{left:0;top:0;right:0;bottom:0}.slim .slim-area .slim-drip,.slim .slim-area .slim-result{position:absolute}.slim .slim-area .slim-status{padding:3em 1.5em;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;text-align:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;pointer-events:none}.slim .slim-area .slim-drip{overflow:hidden}.slim .slim-area .slim-drip>span{position:absolute;left:0;top:0;opacity:0;margin-left:-25%;margin-top:-25%;width:50%;padding-bottom:50%}.slim .slim-area .slim-drip>span>span{position:absolute;width:100%;height:100%;background-color:rgba(0,0,0,.25);border-radius:50%;opacity:.5;left:0;top:0}.slim .slim-area .slim-result{overflow:hidden;-webkit-perspective:1px}.slim .slim-area .slim-result img{display:block;width:100%;position:absolute;left:0;top:0}.slim .slim-area .slim-result img:not([src]),.slim .slim-area .slim-result img[src='']{visibility:hidden}.slim .slim-btn-group{position:absolute;right:0;bottom:0;left:0;z-index:2;overflow:hidden}.slim .slim-btn-group button{cursor:pointer}.slim[data-ratio*=':']{min-height:0}.slim[data-ratio*=':'] .slim-status{position:absolute;padding:0 1.5em}.slim[data-ratio='16:10']>img,.slim[data-ratio='16:10']>input[type=file]{margin-bottom:62.5%}.slim[data-ratio='10:16']>img,.slim[data-ratio='10:16']>input[type=file]{margin-bottom:160%}.slim[data-ratio='16:9']>img,.slim[data-ratio='16:9']>input[type=file]{margin-bottom:56.25%}.slim[data-ratio='9:16']>img,.slim[data-ratio='9:16']>input[type=file]{margin-bottom:177.77778%}.slim[data-ratio='5:3']>img,.slim[data-ratio='5:3']>input[type=file]{margin-bottom:60%}.slim[data-ratio='3:5']>img,.slim[data-ratio='3:5']>input[type=file]{margin-bottom:166.66667%}.slim[data-ratio='5:4']>img,.slim[data-ratio='5:4']>input[type=file]{margin-bottom:80%}.slim[data-ratio='4:5']>img,.slim[data-ratio='4:5']>input[type=file]{margin-bottom:125%}.slim[data-ratio='4:3']>img,.slim[data-ratio='4:3']>input[type=file]{margin-bottom:75%}.slim[data-ratio='3:4']>img,.slim[data-ratio='3:4']>input[type=file]{margin-bottom:133.33333%}.slim[data-ratio='3:2']>img,.slim[data-ratio='3:2']>input[type=file]{margin-bottom:66.66667%}.slim[data-ratio='2:3']>img,.slim[data-ratio='2:3']>input[type=file]{margin-bottom:150%}.slim[data-ratio='1:1']>img,.slim[data-ratio='1:1']>input[type=file]{margin-bottom:100%}.slim-btn-group{padding:1.5em 0;text-align:center}.slim-btn{position:relative;padding:0;margin:0 7.2px;font-size:0;outline:none;width:36px;height:36px;border:none;color:#fff;background-color:rgba(0,0,0,.7);background-repeat:no-repeat;background-size:50% 50%;background-position:50%;border-radius:50%}.slim-btn:before{border-radius:inherit;position:absolute;box-sizing:border-box;left:-3px;right:-3px;bottom:-3px;top:-3px;border:3px solid #fff;content:'';-webkit-transform:scale(.95);transform:scale(.95);opacity:0;-webkit-transition:all .25s;transition:all .25s;z-index:-1;pointer-events:none}.slim-btn:focus:before,.slim-btn:hover:before{opacity:1;-webkit-transform:scale(1);transform:scale(1)}.slim-btn *{pointer-events:none}.slim-btn-remove{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 269 269' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd' stroke-linejoin='round' stroke-miterlimit='1.414'%3E%3Cpath d='M63.12 250.254s3.998 18.222 24.582 18.222h93.072c20.583 0 24.582-18.222 24.582-18.222l18.374-178.66H44.746l18.373 178.66zM170.034 98.442a8.95 8.95 0 0 1 17.9 0l-8.95 134.238a8.95 8.95 0 0 1-17.9 0l8.95-134.238zm-44.746 0a8.949 8.949 0 1 1 17.898 0V232.68a8.95 8.95 0 1 1-17.9 0V98.442zm-35.798-8.95a8.95 8.95 0 0 1 8.95 8.95l8.95 134.237c0 4.942-4.008 8.948-8.95 8.948a8.95 8.95 0 0 1-8.95-8.95L80.54 98.441a8.95 8.95 0 0 1 8.95-8.95zm128.868-53.68h-39.376V17.898c0-13.578-4.39-17.9-17.898-17.9H107.39C95 0 89.492 6 89.492 17.9v17.91H50.116c-7.914 0-14.32 6.007-14.32 13.43 0 7.424 6.406 13.43 14.32 13.43H218.36c7.914 0 14.32-6.006 14.32-13.43 0-7.423-6.406-13.43-14.32-13.43zm-57.274 0H107.39l.002-17.914h53.695V35.81z' fill='%23fff'/%3E%3C/svg%3E\")}.slim-btn-download{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 269 269' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd' stroke-linejoin='round' stroke-miterlimit='1.414'%3E%3Cpath d='M232.943 223.73H35.533c-12.21 0-22.11 10.017-22.11 22.373 0 12.356 9.9 22.373 22.11 22.373h197.41c12.21 0 22.11-10.017 22.11-22.373 0-12.356-9.9-22.373-22.11-22.373zM117.88 199.136c4.035 4.04 9.216 6.147 14.492 6.508.626.053 1.227.188 1.866.188.633 0 1.228-.135 1.847-.186 5.284-.357 10.473-2.464 14.512-6.51l70.763-70.967c8.86-8.876 8.86-23.268 0-32.143-8.86-8.876-23.225-8.876-32.086 0l-32.662 32.756V22.373C156.612 10.017 146.596 0 134.238 0c-12.356 0-22.372 10.017-22.372 22.373v106.41L79.204 96.027c-8.86-8.876-23.226-8.876-32.086 0-8.86 8.875-8.86 23.267 0 32.142l70.763 70.966z' fill='%23fff'/%3E%3C/svg%3E\")}.slim-btn-upload{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='243' height='269' viewBox='0 0 243 269' xmlns='http://www.w3.org/2000/svg'%3E%3Ctitle%3EDownload%3C/title%3E%3Cpath d='M219.943 223.73H22.533c-12.21 0-22.11 10.017-22.11 22.373 0 12.356 9.9 22.373 22.11 22.373h197.41c12.21 0 22.11-10.017 22.11-22.373 0-12.356-9.9-22.373-22.11-22.373zM104.88 6.696c4.035-4.04 9.216-6.147 14.492-6.508C119.998.135 120.6 0 121.238 0c.633 0 1.228.135 1.847.186 5.284.357 10.473 2.464 14.512 6.51l70.763 70.967c8.86 8.875 8.86 23.267 0 32.142-8.86 8.876-23.225 8.876-32.086 0L143.612 77.05v106.41c0 12.355-10.016 22.372-22.374 22.372-12.356 0-22.372-10.017-22.372-22.373V77.05l-32.662 32.755c-8.86 8.876-23.226 8.876-32.086 0-8.86-8.875-8.86-23.267 0-32.142L104.88 6.696z' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E\")}.slim-btn-edit{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 269 269' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd' stroke-linejoin='round' stroke-miterlimit='1.414'%3E%3Cpath d='M161.36 56.337c-7.042-7.05-18.46-7.05-25.5 0l-6.373 6.38-89.243 89.338.023.023-2.812 2.82s-8.968 9.032-29.216 74.4c-.143.456-.284.91-.427 1.373-.36 1.172-.726 2.362-1.094 3.568a785.126 785.126 0 0 0-.988 3.25c-.28.922-.556 1.835-.84 2.778-.64 2.14-1.29 4.318-1.954 6.567-1.455 4.937-5.01 16.07-.99 20.1 3.87 3.882 15.12.467 20.043-.993a1275.615 1275.615 0 0 0 9.41-2.83c1.032-.314 2.058-.626 3.063-.935 1.27-.39 2.52-.775 3.75-1.157l1.09-.34c62.193-19.365 73.358-28.453 74.286-29.284l.01-.01.067-.06 2.88-2.886.192.193 89.244-89.336 6.373-6.382c7.04-7.048 7.04-18.476 0-25.525l-50.998-51.05zM103.4 219.782c-.08.053-.185.122-.297.193l-.21.133c-.076.047-.158.098-.245.15l-.243.148c-2.97 1.777-11.682 6.362-32.828 14.017-2.47.894-5.162 1.842-7.98 2.82l-30.06-30.092c.98-2.84 1.928-5.55 2.825-8.04 7.638-21.235 12.22-29.974 13.986-32.94l.12-.2c.063-.1.12-.196.175-.283l.126-.2c.07-.11.14-.217.192-.296l2.2-2.205 54.485 54.542-2.248 2.255zM263.35 56.337l-50.996-51.05c-7.04-7.048-18.456-7.048-25.498 0L174.108 18.05c-7.04 7.048-7.04 18.476 0 25.524l50.996 51.05c7.04 7.048 18.457 7.048 25.498 0l12.75-12.762c7.04-7.05 7.04-18.477 0-25.525z' fill='%23fff'/%3E%3C/svg%3E\")}.slim-loader-background{stroke:hsla(0,0%,100%,.25)}.slim-loader-foreground{stroke:#fff}.slim-upload-status{padding:0 .5em;border-radius:.3125em;font-size:.75em;box-shadow:0 .125em .25em rgba(0,0,0,.25)}.slim-upload-status[data-state=success]{background-color:#d1ed8f;color:#323e15}.slim-upload-status[data-state=success] .slim-upload-status-icon{width:.5em;height:.75em;-webkit-transform:rotate(45deg);transform:rotate(45deg);border:.1875em solid currentColor;border-left:none;border-top:none;margin-right:.325em;margin-left:.25em;margin-bottom:.0625em}.slim-upload-status[data-state=error]{background:#efd472;color:#574016}.slim-upload-status[data-state=error] .slim-upload-status-icon{margin-left:-.125em;margin-right:.5em;width:.5625em;height:1em;position:relative;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.slim-upload-status[data-state=error] .slim-upload-status-icon:after,.slim-upload-status[data-state=error] .slim-upload-status-icon:before{content:'';position:absolute;box-sizing:content-box;width:0;height:0;border:.09em solid currentColor;background-color:currentColor;-webkit-transform:translate(-50%,-50%) translate(.5em,.5em);transform:translate(-50%,-50%) translate(.5em,.5em)}.slim-upload-status[data-state=error] .slim-upload-status-icon:before{width:.66666666667em}.slim-upload-status[data-state=error] .slim-upload-status-icon:after{height:.66666666667em}", ""]);

// exports


/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(8);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 8:
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })

/******/ });