/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_sheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/sheet */ "./node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Tokenizer.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Utility.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Serializer.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Middleware.js");
/* harmony import */ var stylis__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! stylis */ "./node_modules/stylis/src/Parser.js");
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js");
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js");





var identifierWithPointTracking = function identifierWithPointTracking(begin, points, index) {
  var previous = 0;
  var character = 0;

  while (true) {
    previous = character;
    character = (0,stylis__WEBPACK_IMPORTED_MODULE_3__.peek)(); // &\f

    if (previous === 38 && character === 12) {
      points[index] = 1;
    }

    if ((0,stylis__WEBPACK_IMPORTED_MODULE_3__.token)(character)) {
      break;
    }

    (0,stylis__WEBPACK_IMPORTED_MODULE_3__.next)();
  }

  return (0,stylis__WEBPACK_IMPORTED_MODULE_3__.slice)(begin, stylis__WEBPACK_IMPORTED_MODULE_3__.position);
};

var toRules = function toRules(parsed, points) {
  // pretend we've started with a comma
  var index = -1;
  var character = 44;

  do {
    switch ((0,stylis__WEBPACK_IMPORTED_MODULE_3__.token)(character)) {
      case 0:
        // &\f
        if (character === 38 && (0,stylis__WEBPACK_IMPORTED_MODULE_3__.peek)() === 12) {
          // this is not 100% correct, we don't account for literal sequences here - like for example quoted strings
          // stylis inserts \f after & to know when & where it should replace this sequence with the context selector
          // and when it should just concatenate the outer and inner selectors
          // it's very unlikely for this sequence to actually appear in a different context, so we just leverage this fact here
          points[index] = 1;
        }

        parsed[index] += identifierWithPointTracking(stylis__WEBPACK_IMPORTED_MODULE_3__.position - 1, points, index);
        break;

      case 2:
        parsed[index] += (0,stylis__WEBPACK_IMPORTED_MODULE_3__.delimit)(character);
        break;

      case 4:
        // comma
        if (character === 44) {
          // colon
          parsed[++index] = (0,stylis__WEBPACK_IMPORTED_MODULE_3__.peek)() === 58 ? '&\f' : '';
          points[index] = parsed[index].length;
          break;
        }

      // fallthrough

      default:
        parsed[index] += (0,stylis__WEBPACK_IMPORTED_MODULE_4__.from)(character);
    }
  } while (character = (0,stylis__WEBPACK_IMPORTED_MODULE_3__.next)());

  return parsed;
};

var getRules = function getRules(value, points) {
  return (0,stylis__WEBPACK_IMPORTED_MODULE_3__.dealloc)(toRules((0,stylis__WEBPACK_IMPORTED_MODULE_3__.alloc)(value), points));
}; // WeakSet would be more appropriate, but only WeakMap is supported in IE11


var fixedElements = /* #__PURE__ */new WeakMap();
var compat = function compat(element) {
  if (element.type !== 'rule' || !element.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  element.length < 1) {
    return;
  }

  var value = element.value,
      parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;

  while (parent.type !== 'rule') {
    parent = parent.parent;
    if (!parent) return;
  } // short-circuit for the simplest case


  if (element.props.length === 1 && value.charCodeAt(0) !== 58
  /* colon */
  && !fixedElements.get(parent)) {
    return;
  } // if this is an implicitly inserted rule (the one eagerly inserted at the each new nested level)
  // then the props has already been manipulated beforehand as they that array is shared between it and its "rule parent"


  if (isImplicitRule) {
    return;
  }

  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;

  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel(element) {
  if (element.type === 'decl') {
    var value = element.value;

    if ( // charcode for l
    value.charCodeAt(0) === 108 && // charcode for b
    value.charCodeAt(2) === 98) {
      // this ignores label
      element["return"] = '';
      element.value = '';
    }
  }
};
var ignoreFlag = 'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason';

var isIgnoringComment = function isIgnoringComment(element) {
  return element.type === 'comm' && element.children.indexOf(ignoreFlag) > -1;
};

var createUnsafeSelectorsAlarm = function createUnsafeSelectorsAlarm(cache) {
  return function (element, index, children) {
    if (element.type !== 'rule' || cache.compat) return;
    var unsafePseudoClasses = element.value.match(/(:first|:nth|:nth-last)-child/g);

    if (unsafePseudoClasses) {
      var isNested = element.parent === children[0]; // in nested rules comments become children of the "auto-inserted" rule
      //
      // considering this input:
      // .a {
      //   .b /* comm */ {}
      //   color: hotpink;
      // }
      // we get output corresponding to this:
      // .a {
      //   & {
      //     /* comm */
      //     color: hotpink;
      //   }
      //   .b {}
      // }

      var commentContainer = isNested ? children[0].children : // global rule at the root level
      children;

      for (var i = commentContainer.length - 1; i >= 0; i--) {
        var node = commentContainer[i];

        if (node.line < element.line) {
          break;
        } // it is quite weird but comments are *usually* put at `column: element.column - 1`
        // so we seek *from the end* for the node that is earlier than the rule's `element` and check that
        // this will also match inputs like this:
        // .a {
        //   /* comm */
        //   .b {}
        // }
        //
        // but that is fine
        //
        // it would be the easiest to change the placement of the comment to be the first child of the rule:
        // .a {
        //   .b { /* comm */ }
        // }
        // with such inputs we wouldn't have to search for the comment at all
        // TODO: consider changing this comment placement in the next major version


        if (node.column < element.column) {
          if (isIgnoringComment(node)) {
            return;
          }

          break;
        }
      }

      unsafePseudoClasses.forEach(function (unsafePseudoClass) {
        console.error("The pseudo class \"" + unsafePseudoClass + "\" is potentially unsafe when doing server-side rendering. Try changing it to \"" + unsafePseudoClass.split('-child')[0] + "-of-type\".");
      });
    }
  };
};

var isImportRule = function isImportRule(element) {
  return element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64;
};

var isPrependedWithRegularRules = function isPrependedWithRegularRules(index, children) {
  for (var i = index - 1; i >= 0; i--) {
    if (!isImportRule(children[i])) {
      return true;
    }
  }

  return false;
}; // use this to remove incorrect elements from further processing
// so they don't get handed to the `sheet` (or anything else)
// as that could potentially lead to additional logs which in turn could be overhelming to the user


var nullifyElement = function nullifyElement(element) {
  element.type = '';
  element.value = '';
  element["return"] = '';
  element.children = '';
  element.props = '';
};

var incorrectImportAlarm = function incorrectImportAlarm(element, index, children) {
  if (!isImportRule(element)) {
    return;
  }

  if (element.parent) {
    console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.");
    nullifyElement(element);
  } else if (isPrependedWithRegularRules(index, children)) {
    console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.");
    nullifyElement(element);
  }
};

/* eslint-disable no-fallthrough */

function prefix(value, length) {
  switch ((0,stylis__WEBPACK_IMPORTED_MODULE_4__.hash)(value, length)) {
    // color-adjust
    case 5103:
      return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + 'print-' + value + value;
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)

    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921: // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break

    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005: // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,

    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855: // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)

    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + value + value;
    // appearance, user-select, transform, hyphens, text-size-adjust

    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_5__.MOZ + value + stylis__WEBPACK_IMPORTED_MODULE_5__.MS + value + value;
    // flex, flex-direction

    case 6828:
    case 4268:
      return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_5__.MS + value + value;
    // order

    case 6165:
      return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_5__.MS + 'flex-' + value + value;
    // align-items

    case 5187:
      return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + value + (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /(\w+).+(:[^]+)/, stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + 'box-$1$2' + stylis__WEBPACK_IMPORTED_MODULE_5__.MS + 'flex-$1$2') + value;
    // align-self

    case 5443:
      return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_5__.MS + 'flex-item-' + (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /flex-|-self/, '') + value;
    // align-content

    case 4675:
      return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_5__.MS + 'flex-line-pack' + (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /align-content|flex-|-self/, '') + value;
    // flex-shrink

    case 5548:
      return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_5__.MS + (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, 'shrink', 'negative') + value;
    // flex-basis

    case 5292:
      return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_5__.MS + (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, 'basis', 'preferred-size') + value;
    // flex-grow

    case 6060:
      return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + 'box-' + (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, '-grow', '') + stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_5__.MS + (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, 'grow', 'positive') + value;
    // transition

    case 4554:
      return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /([^-])(transform)/g, '$1' + stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + '$2') + value;
    // cursor

    case 6187:
      return (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)((0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)((0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /(zoom-|grab)/, stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + '$1'), /(image-set)/, stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + '$1'), value, '') + value;
    // background, background-image

    case 5495:
    case 3959:
      return (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /(image-set\([^]*)/, stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + '$1' + '$`$1');
    // justify-content

    case 4968:
      return (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)((0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /(.+:)(flex-)?(.*)/, stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + 'box-pack:$3' + stylis__WEBPACK_IMPORTED_MODULE_5__.MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + value + value;
    // (margin|padding)-inline-(start|end)

    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /(.+)-inline(.+)/, stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + '$1$2') + value;
    // (min|max)?(width|height|inline-size|block-size)

    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      // stretch, max-content, min-content, fill-available
      if ((0,stylis__WEBPACK_IMPORTED_MODULE_4__.strlen)(value) - 1 - length > 6) switch ((0,stylis__WEBPACK_IMPORTED_MODULE_4__.charat)(value, length + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          // -
          if ((0,stylis__WEBPACK_IMPORTED_MODULE_4__.charat)(value, length + 4) !== 45) break;
        // (f)ill-available, (f)it-content

        case 102:
          return (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /(.+:)(.+)-([^]+)/, '$1' + stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + '$2-$3' + '$1' + stylis__WEBPACK_IMPORTED_MODULE_5__.MOZ + ((0,stylis__WEBPACK_IMPORTED_MODULE_4__.charat)(value, length + 3) == 108 ? '$3' : '$2-$3')) + value;
        // (s)tretch

        case 115:
          return ~(0,stylis__WEBPACK_IMPORTED_MODULE_4__.indexof)(value, 'stretch') ? prefix((0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, 'stretch', 'fill-available'), length) + value : value;
      }
      break;
    // position: sticky

    case 4949:
      // (s)ticky?
      if ((0,stylis__WEBPACK_IMPORTED_MODULE_4__.charat)(value, length + 1) !== 115) break;
    // display: (flex|inline-flex)

    case 6444:
      switch ((0,stylis__WEBPACK_IMPORTED_MODULE_4__.charat)(value, (0,stylis__WEBPACK_IMPORTED_MODULE_4__.strlen)(value) - 3 - (~(0,stylis__WEBPACK_IMPORTED_MODULE_4__.indexof)(value, '!important') && 10))) {
        // stic(k)y
        case 107:
          return (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, ':', ':' + stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT) + value;
        // (inline-)?fl(e)x

        case 101:
          return (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /(.+:)([^;!]+)(;|!.+)?/, '$1' + stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + ((0,stylis__WEBPACK_IMPORTED_MODULE_4__.charat)(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + '$2$3' + '$1' + stylis__WEBPACK_IMPORTED_MODULE_5__.MS + '$2box$3') + value;
      }

      break;
    // writing-mode

    case 5936:
      switch ((0,stylis__WEBPACK_IMPORTED_MODULE_4__.charat)(value, length + 11)) {
        // vertical-l(r)
        case 114:
          return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_5__.MS + (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /[svh]\w+-[tblr]{2}/, 'tb') + value;
        // vertical-r(l)

        case 108:
          return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_5__.MS + (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value;
        // horizontal(-)tb

        case 45:
          return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_5__.MS + (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /[svh]\w+-[tblr]{2}/, 'lr') + value;
      }

      return stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + value + stylis__WEBPACK_IMPORTED_MODULE_5__.MS + value + value;
  }

  return value;
}

var prefixer = function prefixer(element, index, children, callback) {
  if (element.length > -1) if (!element["return"]) switch (element.type) {
    case stylis__WEBPACK_IMPORTED_MODULE_5__.DECLARATION:
      element["return"] = prefix(element.value, element.length);
      break;

    case stylis__WEBPACK_IMPORTED_MODULE_5__.KEYFRAMES:
      return (0,stylis__WEBPACK_IMPORTED_MODULE_6__.serialize)([(0,stylis__WEBPACK_IMPORTED_MODULE_3__.copy)(element, {
        value: (0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(element.value, '@', '@' + stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT)
      })], callback);

    case stylis__WEBPACK_IMPORTED_MODULE_5__.RULESET:
      if (element.length) return (0,stylis__WEBPACK_IMPORTED_MODULE_4__.combine)(element.props, function (value) {
        switch ((0,stylis__WEBPACK_IMPORTED_MODULE_4__.match)(value, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ':read-only':
          case ':read-write':
            return (0,stylis__WEBPACK_IMPORTED_MODULE_6__.serialize)([(0,stylis__WEBPACK_IMPORTED_MODULE_3__.copy)(element, {
              props: [(0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /:(read-\w+)/, ':' + stylis__WEBPACK_IMPORTED_MODULE_5__.MOZ + '$1')]
            })], callback);
          // :placeholder

          case '::placeholder':
            return (0,stylis__WEBPACK_IMPORTED_MODULE_6__.serialize)([(0,stylis__WEBPACK_IMPORTED_MODULE_3__.copy)(element, {
              props: [(0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /:(plac\w+)/, ':' + stylis__WEBPACK_IMPORTED_MODULE_5__.WEBKIT + 'input-$1')]
            }), (0,stylis__WEBPACK_IMPORTED_MODULE_3__.copy)(element, {
              props: [(0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /:(plac\w+)/, ':' + stylis__WEBPACK_IMPORTED_MODULE_5__.MOZ + '$1')]
            }), (0,stylis__WEBPACK_IMPORTED_MODULE_3__.copy)(element, {
              props: [(0,stylis__WEBPACK_IMPORTED_MODULE_4__.replace)(value, /:(plac\w+)/, stylis__WEBPACK_IMPORTED_MODULE_5__.MS + 'input-$1')]
            })], callback);
        }

        return '';
      });
  }
};

var defaultStylisPlugins = [prefixer];

var createCache = function createCache(options) {
  var key = options.key;

  if ( true && !key) {
    throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\n" + "If multiple caches share the same key they might \"fight\" for each other's style elements.");
  }

  if ( key === 'css') {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])"); // get SSRed styles out of the way of React's hydration
    // document.head is a safe place to move them to(though note document.head is not necessarily the last place they will be)
    // note this very very intentionally targets all style elements regardless of the key to ensure
    // that creating a cache works inside of render of a React component

    Array.prototype.forEach.call(ssrStyles, function (node) {
      // we want to only move elements which have a space in the data-emotion attribute value
      // because that indicates that it is an Emotion 11 server-side rendered style elements
      // while we will already ignore Emotion 11 client-side inserted styles because of the :not([data-s]) part in the selector
      // Emotion 10 client-side inserted styles did not have data-s (but importantly did not have a space in their data-emotion attributes)
      // so checking for the space ensures that loading Emotion 11 after Emotion 10 has inserted some styles
      // will not result in the Emotion 10 styles being destroyed
      var dataEmotionAttribute = node.getAttribute('data-emotion');

      if (dataEmotionAttribute.indexOf(' ') === -1) {
        return;
      }
      document.head.appendChild(node);
      node.setAttribute('data-s', '');
    });
  }

  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;

  if (true) {
    // $FlowFixMe
    if (/[^a-z-]/.test(key)) {
      throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
    }
  }

  var inserted = {};
  var container;
  var nodesToHydrate = [];

  {
    container = options.container || document.head;
    Array.prototype.forEach.call( // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll("style[data-emotion^=\"" + key + " \"]"), function (node) {
      var attrib = node.getAttribute("data-emotion").split(' '); // $FlowFixMe

      for (var i = 1; i < attrib.length; i++) {
        inserted[attrib[i]] = true;
      }

      nodesToHydrate.push(node);
    });
  }

  var _insert;

  var omnipresentPlugins = [compat, removeLabel];

  if (true) {
    omnipresentPlugins.push(createUnsafeSelectorsAlarm({
      get compat() {
        return cache.compat;
      }

    }), incorrectImportAlarm);
  }

  {
    var currentSheet;
    var finalizingPlugins = [stylis__WEBPACK_IMPORTED_MODULE_6__.stringify,  true ? function (element) {
      if (!element.root) {
        if (element["return"]) {
          currentSheet.insert(element["return"]);
        } else if (element.value && element.type !== stylis__WEBPACK_IMPORTED_MODULE_5__.COMMENT) {
          // insert empty rule in non-production environments
          // so @emotion/jest can grab `key` from the (JS)DOM for caches without any rules inserted yet
          currentSheet.insert(element.value + "{}");
        }
      }
    } : 0];
    var serializer = (0,stylis__WEBPACK_IMPORTED_MODULE_7__.middleware)(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));

    var stylis = function stylis(styles) {
      return (0,stylis__WEBPACK_IMPORTED_MODULE_6__.serialize)((0,stylis__WEBPACK_IMPORTED_MODULE_8__.compile)(styles), serializer);
    };

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;

      if ( true && serialized.map !== undefined) {
        currentSheet = {
          insert: function insert(rule) {
            sheet.insert(rule + serialized.map);
          }
        };
      }

      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);

      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  }

  var cache = {
    key: key,
    sheet: new _emotion_sheet__WEBPACK_IMPORTED_MODULE_0__.StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend,
      insertionPoint: options.insertionPoint
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createCache);


/***/ }),

/***/ "./node_modules/@emotion/hash/dist/emotion-hash.esm.js":
/*!*************************************************************!*\
  !*** ./node_modules/@emotion/hash/dist/emotion-hash.esm.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (murmur2);


/***/ }),

/***/ "./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function memoize(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (memoize);


/***/ }),

/***/ "./node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hoist-non-react-statics */ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0__);


// this file isolates this package that is not tree-shakeable
// and if this module doesn't actually contain any logic of its own
// then Rollup just use 'hoist-non-react-statics' directly in other chunks

var hoistNonReactStatics = (function (targetComponent, sourceComponent) {
  return hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_0___default()(targetComponent, sourceComponent);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hoistNonReactStatics);


/***/ }),

/***/ "./node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "C": () => (/* binding */ CacheProvider),
/* harmony export */   "E": () => (/* binding */ Emotion),
/* harmony export */   "T": () => (/* binding */ ThemeContext),
/* harmony export */   "_": () => (/* binding */ __unsafe_useEmotionCache),
/* harmony export */   "a": () => (/* binding */ ThemeProvider),
/* harmony export */   "b": () => (/* binding */ withTheme),
/* harmony export */   "c": () => (/* binding */ createEmotionProps),
/* harmony export */   "h": () => (/* binding */ hasOwnProperty),
/* harmony export */   "u": () => (/* binding */ useTheme),
/* harmony export */   "w": () => (/* binding */ withEmotionCache)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js");
/* harmony import */ var _isolated_hnrs_dist_emotion_react_isolated_hnrs_browser_esm_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js */ "./node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js");
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js");
/* harmony import */ var _emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/use-insertion-effect-with-fallbacks */ "./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js");









var hasOwnProperty = {}.hasOwnProperty;

var EmotionCacheContext = /* #__PURE__ */(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)( // we're doing this to avoid preconstruct's dead code elimination in this one case
// because this module is primarily intended for the browser and node
// but it's also required in react native and similar environments sometimes
// and we could have a special build just for that
// but this is much easier and the native packages
// might use a different theme context in the future anyway
typeof HTMLElement !== 'undefined' ? /* #__PURE__ */(0,_emotion_cache__WEBPACK_IMPORTED_MODULE_1__["default"])({
  key: 'css'
}) : null);

if (true) {
  EmotionCacheContext.displayName = 'EmotionCacheContext';
}

var CacheProvider = EmotionCacheContext.Provider;
var __unsafe_useEmotionCache = function useEmotionCache() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(EmotionCacheContext);
};

var withEmotionCache = function withEmotionCache(func) {
  // $FlowFixMe
  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function (props, ref) {
    // the cache will never be null in the browser
    var cache = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(EmotionCacheContext);
    return func(props, cache, ref);
  });
};

var ThemeContext = /* #__PURE__ */(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});

if (true) {
  ThemeContext.displayName = 'EmotionThemeContext';
}

var useTheme = function useTheme() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext);
};

var getTheme = function getTheme(outerTheme, theme) {
  if (typeof theme === 'function') {
    var mergedTheme = theme(outerTheme);

    if ( true && (mergedTheme == null || typeof mergedTheme !== 'object' || Array.isArray(mergedTheme))) {
      throw new Error('[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!');
    }

    return mergedTheme;
  }

  if ( true && (theme == null || typeof theme !== 'object' || Array.isArray(theme))) {
    throw new Error('[ThemeProvider] Please make your theme prop a plain object');
  }

  return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({}, outerTheme, theme);
};

var createCacheWithTheme = /* #__PURE__ */(0,_emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_3__["default"])(function (outerTheme) {
  return (0,_emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_3__["default"])(function (theme) {
    return getTheme(outerTheme, theme);
  });
});
var ThemeProvider = function ThemeProvider(props) {
  var theme = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext);

  if (props.theme !== theme) {
    theme = createCacheWithTheme(theme)(props.theme);
  }

  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ThemeContext.Provider, {
    value: theme
  }, props.children);
};
function withTheme(Component) {
  var componentName = Component.displayName || Component.name || 'Component';

  var render = function render(props, ref) {
    var theme = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext);
    return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Component, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({
      theme: theme,
      ref: ref
    }, props));
  }; // $FlowFixMe


  var WithTheme = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(render);
  WithTheme.displayName = "WithTheme(" + componentName + ")";
  return (0,_isolated_hnrs_dist_emotion_react_isolated_hnrs_browser_esm_js__WEBPACK_IMPORTED_MODULE_7__["default"])(WithTheme, Component);
}

var getLastPart = function getLastPart(functionName) {
  // The match may be something like 'Object.createEmotionProps' or
  // 'Loader.prototype.render'
  var parts = functionName.split('.');
  return parts[parts.length - 1];
};

var getFunctionNameFromStackTraceLine = function getFunctionNameFromStackTraceLine(line) {
  // V8
  var match = /^\s+at\s+([A-Za-z0-9$.]+)\s/.exec(line);
  if (match) return getLastPart(match[1]); // Safari / Firefox

  match = /^([A-Za-z0-9$.]+)@/.exec(line);
  if (match) return getLastPart(match[1]);
  return undefined;
};

var internalReactFunctionNames = /* #__PURE__ */new Set(['renderWithHooks', 'processChild', 'finishClassComponent', 'renderToString']); // These identifiers come from error stacks, so they have to be valid JS
// identifiers, thus we only need to replace what is a valid character for JS,
// but not for CSS.

var sanitizeIdentifier = function sanitizeIdentifier(identifier) {
  return identifier.replace(/\$/g, '-');
};

var getLabelFromStackTrace = function getLabelFromStackTrace(stackTrace) {
  if (!stackTrace) return undefined;
  var lines = stackTrace.split('\n');

  for (var i = 0; i < lines.length; i++) {
    var functionName = getFunctionNameFromStackTraceLine(lines[i]); // The first line of V8 stack traces is just "Error"

    if (!functionName) continue; // If we reach one of these, we have gone too far and should quit

    if (internalReactFunctionNames.has(functionName)) break; // The component name is the first function in the stack that starts with an
    // uppercase letter

    if (/^[A-Z]/.test(functionName)) return sanitizeIdentifier(functionName);
  }

  return undefined;
};

var typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__';
var labelPropName = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__';
var createEmotionProps = function createEmotionProps(type, props) {
  if ( true && typeof props.css === 'string' && // check if there is a css declaration
  props.css.indexOf(':') !== -1) {
    throw new Error("Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/react' like this: css`" + props.css + "`");
  }

  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key)) {
      newProps[key] = props[key];
    }
  }

  newProps[typePropName] = type; // For performance, only call getLabelFromStackTrace in development and when
  // the label hasn't already been computed

  if ( true && !!props.css && (typeof props.css !== 'object' || typeof props.css.name !== 'string' || props.css.name.indexOf('-') === -1)) {
    var label = getLabelFromStackTrace(new Error().stack);
    if (label) newProps[labelPropName] = label;
  }

  return newProps;
};

var Insertion = function Insertion(_ref) {
  var cache = _ref.cache,
      serialized = _ref.serialized,
      isStringTag = _ref.isStringTag;
  (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_4__.registerStyles)(cache, serialized, isStringTag);
  var rules = (0,_emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_6__.useInsertionEffectAlwaysWithSyncFallback)(function () {
    return (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_4__.insertStyles)(cache, serialized, isStringTag);
  });

  return null;
};

var Emotion = /* #__PURE__ */withEmotionCache(function (props, cache, ref) {
  var cssProp = props.css; // so that using `css` from `emotion` and passing the result to the css prop works
  // not passing the registered cache to serializeStyles because it would
  // make certain babel optimisations not possible

  if (typeof cssProp === 'string' && cache.registered[cssProp] !== undefined) {
    cssProp = cache.registered[cssProp];
  }

  var WrappedComponent = props[typePropName];
  var registeredStyles = [cssProp];
  var className = '';

  if (typeof props.className === 'string') {
    className = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_4__.getRegisteredStyles)(cache.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }

  var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_5__.serializeStyles)(registeredStyles, undefined, (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ThemeContext));

  if ( true && serialized.name.indexOf('-') === -1) {
    var labelFromStack = props[labelPropName];

    if (labelFromStack) {
      serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_5__.serializeStyles)([serialized, 'label:' + labelFromStack + ';']);
    }
  }

  className += cache.key + "-" + serialized.name;
  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key) && key !== 'css' && key !== typePropName && ( false || key !== labelPropName)) {
      newProps[key] = props[key];
    }
  }

  newProps.ref = ref;
  newProps.className = className;
  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Insertion, {
    cache: cache,
    serialized: serialized,
    isStringTag: typeof WrappedComponent === 'string'
  }), /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(WrappedComponent, newProps));
});

if (true) {
  Emotion.displayName = 'EmotionCssPropInternal';
}




/***/ }),

/***/ "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/react/dist/emotion-react.browser.esm.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CacheProvider": () => (/* reexport safe */ _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.C),
/* harmony export */   "ClassNames": () => (/* binding */ ClassNames),
/* harmony export */   "Global": () => (/* binding */ Global),
/* harmony export */   "ThemeContext": () => (/* reexport safe */ _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.T),
/* harmony export */   "ThemeProvider": () => (/* reexport safe */ _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.a),
/* harmony export */   "__unsafe_useEmotionCache": () => (/* reexport safe */ _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__._),
/* harmony export */   "createElement": () => (/* binding */ jsx),
/* harmony export */   "css": () => (/* binding */ css),
/* harmony export */   "jsx": () => (/* binding */ jsx),
/* harmony export */   "keyframes": () => (/* binding */ keyframes),
/* harmony export */   "useTheme": () => (/* reexport safe */ _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.u),
/* harmony export */   "withEmotionCache": () => (/* reexport safe */ _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.w),
/* harmony export */   "withTheme": () => (/* reexport safe */ _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.b)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js");
/* harmony import */ var _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./emotion-element-6a883da9.browser.esm.js */ "./node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! hoist-non-react-statics */ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js");
/* harmony import */ var _emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @emotion/use-insertion-effect-with-fallbacks */ "./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js");












var pkg = {
	name: "@emotion/react",
	version: "11.10.5",
	main: "dist/emotion-react.cjs.js",
	module: "dist/emotion-react.esm.js",
	browser: {
		"./dist/emotion-react.esm.js": "./dist/emotion-react.browser.esm.js"
	},
	exports: {
		".": {
			module: {
				worker: "./dist/emotion-react.worker.esm.js",
				browser: "./dist/emotion-react.browser.esm.js",
				"default": "./dist/emotion-react.esm.js"
			},
			"default": "./dist/emotion-react.cjs.js"
		},
		"./jsx-runtime": {
			module: {
				worker: "./jsx-runtime/dist/emotion-react-jsx-runtime.worker.esm.js",
				browser: "./jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js",
				"default": "./jsx-runtime/dist/emotion-react-jsx-runtime.esm.js"
			},
			"default": "./jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js"
		},
		"./_isolated-hnrs": {
			module: {
				worker: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.worker.esm.js",
				browser: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js",
				"default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.esm.js"
			},
			"default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js"
		},
		"./jsx-dev-runtime": {
			module: {
				worker: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.worker.esm.js",
				browser: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.esm.js",
				"default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.esm.js"
			},
			"default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.js"
		},
		"./package.json": "./package.json",
		"./types/css-prop": "./types/css-prop.d.ts",
		"./macro": "./macro.js"
	},
	types: "types/index.d.ts",
	files: [
		"src",
		"dist",
		"jsx-runtime",
		"jsx-dev-runtime",
		"_isolated-hnrs",
		"types/*.d.ts",
		"macro.js",
		"macro.d.ts",
		"macro.js.flow"
	],
	sideEffects: false,
	author: "Emotion Contributors",
	license: "MIT",
	scripts: {
		"test:typescript": "dtslint types"
	},
	dependencies: {
		"@babel/runtime": "^7.18.3",
		"@emotion/babel-plugin": "^11.10.5",
		"@emotion/cache": "^11.10.5",
		"@emotion/serialize": "^1.1.1",
		"@emotion/use-insertion-effect-with-fallbacks": "^1.0.0",
		"@emotion/utils": "^1.2.0",
		"@emotion/weak-memoize": "^0.3.0",
		"hoist-non-react-statics": "^3.3.1"
	},
	peerDependencies: {
		"@babel/core": "^7.0.0",
		react: ">=16.8.0"
	},
	peerDependenciesMeta: {
		"@babel/core": {
			optional: true
		},
		"@types/react": {
			optional: true
		}
	},
	devDependencies: {
		"@babel/core": "^7.18.5",
		"@definitelytyped/dtslint": "0.0.112",
		"@emotion/css": "11.10.5",
		"@emotion/css-prettifier": "1.1.1",
		"@emotion/server": "11.10.0",
		"@emotion/styled": "11.10.5",
		"html-tag-names": "^1.1.2",
		react: "16.14.0",
		"svg-tag-names": "^1.1.1",
		typescript: "^4.5.5"
	},
	repository: "https://github.com/emotion-js/emotion/tree/main/packages/react",
	publishConfig: {
		access: "public"
	},
	"umd:main": "dist/emotion-react.umd.min.js",
	preconstruct: {
		entrypoints: [
			"./index.js",
			"./jsx-runtime.js",
			"./jsx-dev-runtime.js",
			"./_isolated-hnrs.js"
		],
		umdName: "emotionReact",
		exports: {
			envConditions: [
				"browser",
				"worker"
			],
			extra: {
				"./types/css-prop": "./types/css-prop.d.ts",
				"./macro": "./macro.js"
			}
		}
	}
};

var jsx = function jsx(type, props) {
  var args = arguments;

  if (props == null || !_emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.h.call(props, 'css')) {
    // $FlowFixMe
    return react__WEBPACK_IMPORTED_MODULE_0__.createElement.apply(undefined, args);
  }

  var argsLength = args.length;
  var createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = _emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.E;
  createElementArgArray[1] = (0,_emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.c)(type, props);

  for (var i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i];
  } // $FlowFixMe


  return react__WEBPACK_IMPORTED_MODULE_0__.createElement.apply(null, createElementArgArray);
};

var warnedAboutCssPropForGlobal = false; // maintain place over rerenders.
// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag

var Global = /* #__PURE__ */(0,_emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.w)(function (props, cache) {
  if ( true && !warnedAboutCssPropForGlobal && ( // check for className as well since the user is
  // probably using the custom createElement which
  // means it will be turned into a className prop
  // $FlowFixMe I don't really want to add it to the type since it shouldn't be used
  props.className || props.css)) {
    console.error("It looks like you're using the css prop on Global, did you mean to use the styles prop instead?");
    warnedAboutCssPropForGlobal = true;
  }

  var styles = props.styles;
  var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_7__.serializeStyles)([styles], undefined, (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.T));
  // but it is based on a constant that will never change at runtime
  // it's effectively like having two implementations and switching them out
  // so it's not actually breaking anything


  var sheetRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,_emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_8__.useInsertionEffectWithLayoutFallback)(function () {
    var key = cache.key + "-global"; // use case of https://github.com/emotion-js/emotion/issues/2675

    var sheet = new cache.sheet.constructor({
      key: key,
      nonce: cache.sheet.nonce,
      container: cache.sheet.container,
      speedy: cache.sheet.isSpeedy
    });
    var rehydrating = false; // $FlowFixMe

    var node = document.querySelector("style[data-emotion=\"" + key + " " + serialized.name + "\"]");

    if (cache.sheet.tags.length) {
      sheet.before = cache.sheet.tags[0];
    }

    if (node !== null) {
      rehydrating = true; // clear the hash so this node won't be recognizable as rehydratable by other <Global/>s

      node.setAttribute('data-emotion', key);
      sheet.hydrate([node]);
    }

    sheetRef.current = [sheet, rehydrating];
    return function () {
      sheet.flush();
    };
  }, [cache]);
  (0,_emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_8__.useInsertionEffectWithLayoutFallback)(function () {
    var sheetRefCurrent = sheetRef.current;
    var sheet = sheetRefCurrent[0],
        rehydrating = sheetRefCurrent[1];

    if (rehydrating) {
      sheetRefCurrent[1] = false;
      return;
    }

    if (serialized.next !== undefined) {
      // insert keyframes
      (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_6__.insertStyles)(cache, serialized.next, true);
    }

    if (sheet.tags.length) {
      // if this doesn't exist then it will be null so the style element will be appended
      var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
      sheet.before = element;
      sheet.flush();
    }

    cache.insert("", serialized, sheet, false);
  }, [cache, serialized.name]);
  return null;
});

if (true) {
  Global.displayName = 'EmotionGlobal';
}

function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_7__.serializeStyles)(args);
}

var keyframes = function keyframes() {
  var insertable = css.apply(void 0, arguments);
  var name = "animation-" + insertable.name; // $FlowFixMe

  return {
    name: name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
};

var classnames = function classnames(args) {
  var len = args.length;
  var i = 0;
  var cls = '';

  for (; i < len; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {
            if ( true && arg.styles !== undefined && arg.name !== undefined) {
              console.error('You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n' + '`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component.');
            }

            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};

function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_6__.getRegisteredStyles)(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var Insertion = function Insertion(_ref) {
  var cache = _ref.cache,
      serializedArr = _ref.serializedArr;
  var rules = (0,_emotion_use_insertion_effect_with_fallbacks__WEBPACK_IMPORTED_MODULE_8__.useInsertionEffectAlwaysWithSyncFallback)(function () {

    for (var i = 0; i < serializedArr.length; i++) {
      var res = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_6__.insertStyles)(cache, serializedArr[i], false);
    }
  });

  return null;
};

var ClassNames = /* #__PURE__ */(0,_emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.w)(function (props, cache) {
  var hasRendered = false;
  var serializedArr = [];

  var css = function css() {
    if (hasRendered && "development" !== 'production') {
      throw new Error('css can only be used during render');
    }

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_7__.serializeStyles)(args, cache.registered);
    serializedArr.push(serialized); // registration has to happen here as the result of this might get consumed by `cx`

    (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_6__.registerStyles)(cache, serialized, false);
    return cache.key + "-" + serialized.name;
  };

  var cx = function cx() {
    if (hasRendered && "development" !== 'production') {
      throw new Error('cx can only be used during render');
    }

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return merge(cache.registered, css, classnames(args));
  };

  var content = {
    css: css,
    cx: cx,
    theme: (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_emotion_element_6a883da9_browser_esm_js__WEBPACK_IMPORTED_MODULE_2__.T)
  };
  var ele = props.children(content);
  hasRendered = true;
  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Insertion, {
    cache: cache,
    serializedArr: serializedArr
  }), ele);
});

if (true) {
  ClassNames.displayName = 'EmotionClassNames';
}

if (true) {
  var isBrowser = "object" !== 'undefined'; // #1727, #2905 for some reason Jest and Vitest evaluate modules twice if some consuming module gets mocked

  var isTestEnv = typeof jest !== 'undefined' || typeof vi !== 'undefined';

  if (isBrowser && !isTestEnv) {
    // globalThis has wide browser support - https://caniuse.com/?search=globalThis, Node.js 12 and later
    var globalContext = // $FlowIgnore
    typeof globalThis !== 'undefined' ? globalThis // eslint-disable-line no-undef
    : isBrowser ? window : __webpack_require__.g;
    var globalKey = "__EMOTION_REACT_" + pkg.version.split('.')[0] + "__";

    if (globalContext[globalKey]) {
      console.warn('You are loading @emotion/react when it is already loaded. Running ' + 'multiple instances may cause problems. This can happen if multiple ' + 'versions are used, or if multiple builds of the same version are ' + 'used.');
    }

    globalContext[globalKey] = true;
  }
}




/***/ }),

/***/ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "serializeStyles": () => (/* binding */ serializeStyles)
/* harmony export */ });
/* harmony import */ var _emotion_hash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/hash */ "./node_modules/@emotion/hash/dist/emotion-hash.esm.js");
/* harmony import */ var _emotion_unitless__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/unitless */ "./node_modules/@emotion/unitless/dist/emotion-unitless.esm.js");
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js");




var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";
var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = /* #__PURE__ */(0,_emotion_memoize__WEBPACK_IMPORTED_MODULE_2__["default"])(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (_emotion_unitless__WEBPACK_IMPORTED_MODULE_1__["default"][key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

if (true) {
  var contentValuePattern = /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
  var contentValues = ['normal', 'none', 'initial', 'inherit', 'unset'];
  var oldProcessStyleValue = processStyleValue;
  var msPattern = /^-ms-/;
  var hyphenPattern = /-(.)/g;
  var hyphenatedCache = {};

  processStyleValue = function processStyleValue(key, value) {
    if (key === 'content') {
      if (typeof value !== 'string' || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
        throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
      }
    }

    var processed = oldProcessStyleValue(key, value);

    if (processed !== '' && !isCustomProperty(key) && key.indexOf('-') !== -1 && hyphenatedCache[key] === undefined) {
      hyphenatedCache[key] = true;
      console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, 'ms-').replace(hyphenPattern, function (str, _char) {
        return _char.toUpperCase();
      }) + "?");
    }

    return processed;
  };
}

var noComponentSelectorMessage = 'Component selectors can only be used in conjunction with ' + '@emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware ' + 'compiler transform.';

function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return '';
  }

  if (interpolation.__emotion_styles !== undefined) {
    if ( true && interpolation.toString() === 'NO_COMPONENT_SELECTOR') {
      throw new Error(noComponentSelectorMessage);
    }

    return interpolation;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }

        if (interpolation.styles !== undefined) {
          var next = interpolation.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = interpolation.styles + ";";

          if ( true && interpolation.map !== undefined) {
            styles += interpolation.map;
          }

          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result);
        } else if (true) {
          console.error('Functions that are interpolated in css calls will be stringified.\n' + 'If you want to have a css call based on props, create a function that returns a css call like this\n' + 'let dynamicStyle = (props) => css`color: ${props.color}`\n' + 'It can be called directly with props or interpolated in a styled call like this\n' + "let SomeComponent = styled('div')`${dynamicStyle}`");
        }

        break;
      }

    case 'string':
      if (true) {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function (match, p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, '') + "`");
          return "${" + fakeVarName + "}";
        });

        if (matched.length) {
          console.error('`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\n' + 'Instead of doing this:\n\n' + [].concat(matched, ["`" + replaced + "`"]).join('\n') + '\n\nYou should wrap it with `css` like this:\n\n' + ("css`" + replaced + "`"));
        }
      }

      break;
  } // finalize string values (regular strings and functions interpolated into css calls)


  if (registered == null) {
    return interpolation;
  }

  var cached = registered[interpolation];
  return cached !== undefined ? cached : interpolation;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];

      if (typeof value !== 'object') {
        if (registered != null && registered[value] !== undefined) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && "development" !== 'production') {
          throw new Error(noComponentSelectorMessage);
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);

          switch (_key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }

            default:
              {
                if ( true && _key === 'undefined') {
                  console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
                }

                string += _key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
var sourceMapPattern;

if (true) {
  sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
} // this is the cursor for keyframes
// keyframes are stored on the SerializedStyles object as a linked list


var cursor;
var serializeStyles = function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {
    if ( true && strings[0] === undefined) {
      console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
    }

    styles += strings[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i]);

    if (stringMode) {
      if ( true && strings[i] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }

      styles += strings[i];
    }
  }

  var sourceMap;

  if (true) {
    styles = styles.replace(sourceMapPattern, function (match) {
      sourceMap = match;
      return '';
    });
  } // using a global regex with .exec is stateful so lastIndex has to be reset each time


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + // $FlowFixMe we know it's not null
    match[1];
  }

  var name = (0,_emotion_hash__WEBPACK_IMPORTED_MODULE_0__["default"])(styles) + identifierName;

  if (true) {
    // $FlowFixMe SerializedStyles type doesn't have toString property (and we don't want to add it)
    return {
      name: name,
      styles: styles,
      map: sourceMap,
      next: cursor,
      toString: function toString() {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      }
    };
  }

  return {
    name: name,
    styles: styles,
    next: cursor
  };
};




/***/ }),

/***/ "./node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/sheet/dist/emotion-sheet.browser.esm.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StyleSheet": () => (/* binding */ StyleSheet)
/* harmony export */ });
/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  tag.setAttribute('data-s', '');
  return tag;
}

var StyleSheet = /*#__PURE__*/function () {
  // Using Node instead of HTMLElement since container may be a ShadowRoot
  function StyleSheet(options) {
    var _this = this;

    this._insertTag = function (tag) {
      var before;

      if (_this.tags.length === 0) {
        if (_this.insertionPoint) {
          before = _this.insertionPoint.nextSibling;
        } else if (_this.prepend) {
          before = _this.container.firstChild;
        } else {
          before = _this.before;
        }
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }

      _this.container.insertBefore(tag, before);

      _this.tags.push(tag);
    };

    this.isSpeedy = options.speedy === undefined ? "development" === 'production' : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.insertionPoint = options.insertionPoint;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }

    var tag = this.tags[this.tags.length - 1];

    if (true) {
      var isImportRule = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;

      if (isImportRule && this._alreadyInsertedOrderInsensitiveRule) {
        // this would only cause problem in speedy mode
        // but we don't want enabling speedy to affect the observable behavior
        // so we report this error at all times
        console.error("You're attempting to insert the following rule:\n" + rule + '\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.');
      }
      this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule;
    }

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
        if ( true && !/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear|-ms-expand|-ms-reveal){/.test(rule)) {
          console.error("There was a problem inserting the following rule: \"" + rule + "\"", e);
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    // $FlowFixMe
    this.tags.forEach(function (tag) {
      return tag.parentNode && tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;

    if (true) {
      this._alreadyInsertedOrderInsensitiveRule = false;
    }
  };

  return StyleSheet;
}();




/***/ }),

/***/ "./node_modules/@emotion/unitless/dist/emotion-unitless.esm.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@emotion/unitless/dist/emotion-unitless.esm.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (unitlessKeys);


/***/ }),

/***/ "./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useInsertionEffectAlwaysWithSyncFallback": () => (/* binding */ useInsertionEffectAlwaysWithSyncFallback),
/* harmony export */   "useInsertionEffectWithLayoutFallback": () => (/* binding */ useInsertionEffectWithLayoutFallback)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);



var syncFallback = function syncFallback(create) {
  return create();
};

var useInsertionEffect = react__WEBPACK_IMPORTED_MODULE_0__['useInsertion' + 'Effect'] ? react__WEBPACK_IMPORTED_MODULE_0__['useInsertion' + 'Effect'] : false;
var useInsertionEffectAlwaysWithSyncFallback =  useInsertionEffect || syncFallback;
var useInsertionEffectWithLayoutFallback = useInsertionEffect || react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect;




/***/ }),

/***/ "./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRegisteredStyles": () => (/* binding */ getRegisteredStyles),
/* harmony export */   "insertStyles": () => (/* binding */ insertStyles),
/* harmony export */   "registerStyles": () => (/* binding */ registerStyles)
/* harmony export */ });
var isBrowser = "object" !== 'undefined';
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var registerStyles = function registerStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser === false ) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }
};
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  registerStyles(cache, serialized, isStringTag);
  var className = cache.key + "-" + serialized.name;

  if (cache.inserted[serialized.name] === undefined) {
    var current = serialized;

    do {
      var maybeStyles = cache.insert(serialized === current ? "." + className : '', current, cache.sheet, true);

      current = current.next;
    } while (current !== undefined);
  }
};




/***/ }),

/***/ "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var weakMemoize = function weakMemoize(func) {
  // $FlowFixMe flow doesn't include all non-primitive types as allowed for weakmaps
  var cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      // $FlowFixMe
      return cache.get(arg);
    }

    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (weakMemoize);


/***/ }),

/***/ "./node_modules/@mantine/core/esm/ActionIcon/ActionIcon.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@mantine/core/esm/ActionIcon/ActionIcon.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ActionIcon": () => (/* binding */ ActionIcon),
/* harmony export */   "_ActionIcon": () => (/* binding */ _ActionIcon)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mantine_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mantine/styles */ "./node_modules/@mantine/styles/esm/theme/MantineProvider.js");
/* harmony import */ var _mantine_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mantine/utils */ "./node_modules/@mantine/utils/esm/create-polymorphic-component/create-polymorphic-component.js");
/* harmony import */ var _ActionIcon_styles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ActionIcon.styles.js */ "./node_modules/@mantine/core/esm/ActionIcon/ActionIcon.styles.js");
/* harmony import */ var _Loader_Loader_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Loader/Loader.js */ "./node_modules/@mantine/core/esm/Loader/Loader.js");
/* harmony import */ var _UnstyledButton_UnstyledButton_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../UnstyledButton/UnstyledButton.js */ "./node_modules/@mantine/core/esm/UnstyledButton/UnstyledButton.js");







var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const defaultProps = {
  color: "gray",
  size: "md",
  variant: "subtle",
  loading: false
};
const _ActionIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((props, ref) => {
  const _a = (0,_mantine_styles__WEBPACK_IMPORTED_MODULE_1__.useComponentDefaultProps)("ActionIcon", defaultProps, props), {
    className,
    color,
    children,
    radius,
    size,
    variant,
    gradient,
    disabled,
    loaderProps,
    loading,
    unstyled
  } = _a, others = __objRest(_a, [
    "className",
    "color",
    "children",
    "radius",
    "size",
    "variant",
    "gradient",
    "disabled",
    "loaderProps",
    "loading",
    "unstyled"
  ]);
  const { classes, cx, theme } = (0,_ActionIcon_styles_js__WEBPACK_IMPORTED_MODULE_2__["default"])({ size, radius, color, variant, gradient }, { name: "ActionIcon", unstyled });
  const colors = theme.fn.variant({ color, variant });
  const loader = /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Loader_Loader_js__WEBPACK_IMPORTED_MODULE_3__.Loader, __spreadValues({
    color: colors.color,
    size: theme.fn.size({ size, sizes: _ActionIcon_styles_js__WEBPACK_IMPORTED_MODULE_2__.sizes }) - 12
  }, loaderProps));
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_UnstyledButton_UnstyledButton_js__WEBPACK_IMPORTED_MODULE_4__.UnstyledButton, __spreadValues({
    className: cx(classes.root, className),
    ref,
    disabled,
    "data-disabled": disabled || void 0,
    "data-loading": loading || void 0,
    unstyled
  }, others), loading ? loader : children);
});
_ActionIcon.displayName = "@mantine/core/ActionIcon";
const ActionIcon = (0,_mantine_utils__WEBPACK_IMPORTED_MODULE_5__.createPolymorphicComponent)(_ActionIcon);


//# sourceMappingURL=ActionIcon.js.map


/***/ }),

/***/ "./node_modules/@mantine/core/esm/ActionIcon/ActionIcon.styles.js":
/*!************************************************************************!*\
  !*** ./node_modules/@mantine/core/esm/ActionIcon/ActionIcon.styles.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "sizes": () => (/* binding */ sizes)
/* harmony export */ });
/* harmony import */ var _mantine_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mantine/styles */ "./node_modules/@mantine/styles/esm/tss/create-styles.js");


var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const sizes = {
  xs: 18,
  sm: 22,
  md: 28,
  lg: 34,
  xl: 44
};
function getVariantStyles({ variant, theme, color, gradient }) {
  const colors = theme.fn.variant({ color, variant, gradient });
  if (variant === "gradient") {
    return {
      border: 0,
      backgroundImage: colors.background,
      color: colors.color,
      "&:hover": theme.fn.hover({
        backgroundSize: "200%"
      })
    };
  }
  return __spreadValues({
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.background,
    color: colors.color
  }, theme.fn.hover({
    backgroundColor: colors.hover
  }));
}
var useStyles = (0,_mantine_styles__WEBPACK_IMPORTED_MODULE_0__.createStyles)((theme, { color, size, radius, variant, gradient }) => ({
  root: __spreadProps(__spreadValues({}, getVariantStyles({ variant, theme, color, gradient })), {
    position: "relative",
    height: theme.fn.size({ size, sizes }),
    minHeight: theme.fn.size({ size, sizes }),
    width: theme.fn.size({ size, sizes }),
    minWidth: theme.fn.size({ size, sizes }),
    borderRadius: theme.fn.radius(radius),
    padding: 0,
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:active": theme.activeStyles,
    "&:disabled, &[data-disabled]": {
      color: theme.colors.gray[theme.colorScheme === "dark" ? 6 : 4],
      cursor: "not-allowed",
      backgroundColor: variant === "transparent" ? void 0 : theme.fn.themeColor("gray", theme.colorScheme === "dark" ? 8 : 1),
      borderColor: variant === "transparent" ? void 0 : theme.fn.themeColor("gray", theme.colorScheme === "dark" ? 8 : 1),
      backgroundImage: "none",
      pointerEvents: "none",
      "&:active": {
        transform: "none"
      }
    },
    "&[data-loading]": {
      pointerEvents: "none",
      "&::before": {
        content: '""',
        position: "absolute",
        top: -1,
        left: -1,
        right: -1,
        bottom: -1,
        backgroundColor: theme.colorScheme === "dark" ? theme.fn.rgba(theme.colors.dark[7], 0.5) : "rgba(255, 255, 255, .5)",
        borderRadius: theme.fn.radius(radius),
        cursor: "not-allowed"
      }
    }
  })
}));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useStyles);

//# sourceMappingURL=ActionIcon.styles.js.map


/***/ }),

/***/ "./node_modules/@mantine/core/esm/Box/Box.js":
/*!***************************************************!*\
  !*** ./node_modules/@mantine/core/esm/Box/Box.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Box": () => (/* binding */ Box),
/* harmony export */   "_Box": () => (/* binding */ _Box)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mantine_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mantine/utils */ "./node_modules/@mantine/utils/esm/create-polymorphic-component/create-polymorphic-component.js");
/* harmony import */ var _style_system_props_extract_system_styles_extract_system_styles_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style-system-props/extract-system-styles/extract-system-styles.js */ "./node_modules/@mantine/core/esm/Box/style-system-props/extract-system-styles/extract-system-styles.js");
/* harmony import */ var _use_sx_use_sx_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./use-sx/use-sx.js */ "./node_modules/@mantine/core/esm/Box/use-sx/use-sx.js");





var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const _Box = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((_a, ref) => {
  var _b = _a, { className, component, style, sx } = _b, others = __objRest(_b, ["className", "component", "style", "sx"]);
  const { systemStyles, rest } = (0,_style_system_props_extract_system_styles_extract_system_styles_js__WEBPACK_IMPORTED_MODULE_1__.extractSystemStyles)(others);
  const Element = component || "div";
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Element, __spreadValues({
    ref,
    className: (0,_use_sx_use_sx_js__WEBPACK_IMPORTED_MODULE_2__.useSx)(sx, systemStyles, className),
    style
  }, rest));
});
_Box.displayName = "@mantine/core/Box";
const Box = (0,_mantine_utils__WEBPACK_IMPORTED_MODULE_3__.createPolymorphicComponent)(_Box);


//# sourceMappingURL=Box.js.map


/***/ }),

/***/ "./node_modules/@mantine/core/esm/Box/style-system-props/extract-system-styles/extract-system-styles.js":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/@mantine/core/esm/Box/style-system-props/extract-system-styles/extract-system-styles.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "extractSystemStyles": () => (/* binding */ extractSystemStyles)
/* harmony export */ });
/* harmony import */ var _mantine_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mantine/styles */ "./node_modules/@mantine/styles/esm/theme/utils/filter-props/filter-props.js");


var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function extractSystemStyles(others) {
  const _a = others, {
    m,
    mx,
    my,
    mt,
    mb,
    ml,
    mr,
    p,
    px,
    py,
    pt,
    pb,
    pl,
    pr,
    bg,
    c,
    opacity,
    ff,
    fz,
    fw,
    lts,
    ta,
    lh,
    fs,
    tt,
    td,
    w,
    miw,
    maw,
    h,
    mih,
    mah,
    bgsz,
    bgp,
    bgr,
    bga,
    pos,
    top,
    left,
    bottom,
    right,
    inset,
    display
  } = _a, rest = __objRest(_a, [
    "m",
    "mx",
    "my",
    "mt",
    "mb",
    "ml",
    "mr",
    "p",
    "px",
    "py",
    "pt",
    "pb",
    "pl",
    "pr",
    "bg",
    "c",
    "opacity",
    "ff",
    "fz",
    "fw",
    "lts",
    "ta",
    "lh",
    "fs",
    "tt",
    "td",
    "w",
    "miw",
    "maw",
    "h",
    "mih",
    "mah",
    "bgsz",
    "bgp",
    "bgr",
    "bga",
    "pos",
    "top",
    "left",
    "bottom",
    "right",
    "inset",
    "display"
  ]);
  const systemStyles = (0,_mantine_styles__WEBPACK_IMPORTED_MODULE_0__.filterProps)({
    m,
    mx,
    my,
    mt,
    mb,
    ml,
    mr,
    p,
    px,
    py,
    pt,
    pb,
    pl,
    pr,
    bg,
    c,
    opacity,
    ff,
    fz,
    fw,
    lts,
    ta,
    lh,
    fs,
    tt,
    td,
    w,
    miw,
    maw,
    h,
    mih,
    mah,
    bgsz,
    bgp,
    bgr,
    bga,
    pos,
    top,
    left,
    bottom,
    right,
    inset,
    display
  });
  return { systemStyles, rest };
}


//# sourceMappingURL=extract-system-styles.js.map


/***/ }),

/***/ "./node_modules/@mantine/core/esm/Box/style-system-props/get-responsive-value/get-responsive-value.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/@mantine/core/esm/Box/style-system-props/get-responsive-value/get-responsive-value.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResponsiveValue": () => (/* binding */ getResponsiveValue)
/* harmony export */ });
function getSortedKeys(value, theme) {
  const sorted = Object.keys(value).filter((breakpoint) => breakpoint !== "base").sort((a, b) => theme.fn.size({ size: a, sizes: theme.breakpoints }) - theme.fn.size({ size: b, sizes: theme.breakpoints }));
  return "base" in value ? ["base", ...sorted] : sorted;
}
function getResponsiveValue({ value, theme, getValue, property }) {
  if (value == null) {
    return void 0;
  }
  if (typeof value === "object") {
    const result = getSortedKeys(value, theme).reduce((acc, breakpointKey) => {
      if (breakpointKey === "base" && value.base !== void 0) {
        const baseValue = getValue(value.base, theme);
        if (Array.isArray(property)) {
          property.forEach((prop) => {
            acc[prop] = baseValue;
          });
          return acc;
        }
        acc[property] = baseValue;
        return acc;
      }
      const breakpointValue = getValue(value[breakpointKey], theme);
      if (Array.isArray(property)) {
        acc[theme.fn.largerThan(breakpointKey)] = {};
        property.forEach((prop) => {
          acc[theme.fn.largerThan(breakpointKey)][prop] = breakpointValue;
        });
        return acc;
      }
      acc[theme.fn.largerThan(breakpointKey)] = {
        [property]: breakpointValue
      };
      return acc;
    }, {});
    return result;
  }
  const cssValue = getValue(value, theme);
  if (Array.isArray(property)) {
    return property.reduce((acc, prop) => {
      acc[prop] = cssValue;
      return acc;
    }, {});
  }
  return { [property]: cssValue };
}


//# sourceMappingURL=get-responsive-value.js.map


/***/ }),

/***/ "./node_modules/@mantine/core/esm/Box/style-system-props/get-system-styles/get-system-styles.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@mantine/core/esm/Box/style-system-props/get-system-styles/get-system-styles.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getSystemStyles": () => (/* binding */ getSystemStyles)
/* harmony export */ });
/* harmony import */ var _get_responsive_value_get_responsive_value_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../get-responsive-value/get-responsive-value.js */ "./node_modules/@mantine/core/esm/Box/style-system-props/get-responsive-value/get-responsive-value.js");
/* harmony import */ var _value_getters_value_getters_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../value-getters/value-getters.js */ "./node_modules/@mantine/core/esm/Box/style-system-props/value-getters/value-getters.js");
/* harmony import */ var _system_props_system_props_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../system-props/system-props.js */ "./node_modules/@mantine/core/esm/Box/style-system-props/system-props/system-props.js");




var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
function getSystemStyles(systemStyles, theme, systemProps = _system_props_system_props_js__WEBPACK_IMPORTED_MODULE_0__.SYSTEM_PROPS) {
  const styles = Object.keys(systemProps).reduce((acc, systemProp) => {
    if (systemProp in systemStyles && systemStyles[systemProp] !== void 0) {
      acc.push((0,_get_responsive_value_get_responsive_value_js__WEBPACK_IMPORTED_MODULE_1__.getResponsiveValue)({
        value: systemStyles[systemProp],
        getValue: _value_getters_value_getters_js__WEBPACK_IMPORTED_MODULE_2__.valueGetters[systemProps[systemProp].type],
        property: systemProps[systemProp].property,
        theme
      }));
    }
    return acc;
  }, []);
  return styles.reduce((acc, stylesPartial) => {
    Object.keys(stylesPartial).forEach((property) => {
      if (typeof stylesPartial[property] === "object" && stylesPartial[property] !== null) {
        if (!(property in acc)) {
          acc[property] = stylesPartial[property];
        } else {
          acc[property] = __spreadValues(__spreadValues({}, acc[property]), stylesPartial[property]);
        }
      } else {
        acc[property] = stylesPartial[property];
      }
    });
    return acc;
  }, {});
}


//# sourceMappingURL=get-system-styles.js.map


/***/ }),

/***/ "./node_modules/@mantine/core/esm/Box/style-system-props/system-props/system-props.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@mantine/core/esm/Box/style-system-props/system-props/system-props.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SYSTEM_PROPS": () => (/* binding */ SYSTEM_PROPS)
/* harmony export */ });
const SYSTEM_PROPS = {
  m: { type: "spacing", property: "margin" },
  mt: { type: "spacing", property: "marginTop" },
  mb: { type: "spacing", property: "marginBottom" },
  ml: { type: "spacing", property: "marginLeft" },
  mr: { type: "spacing", property: "marginRight" },
  mx: { type: "spacing", property: ["marginRight", "marginLeft"] },
  my: { type: "spacing", property: ["marginTop", "marginBottom"] },
  p: { type: "spacing", property: "padding" },
  pt: { type: "spacing", property: "paddingTop" },
  pb: { type: "spacing", property: "paddingBottom" },
  pl: { type: "spacing", property: "paddingLeft" },
  pr: { type: "spacing", property: "paddingRight" },
  px: { type: "spacing", property: ["paddingRight", "paddingLeft"] },
  py: { type: "spacing", property: ["paddingTop", "paddingBottom"] },
  bg: { type: "color", property: "background" },
  c: { type: "color", property: "color" },
  opacity: { type: "default", property: "opacity" },
  ff: { type: "default", property: "fontFamily" },
  fz: { type: "fontSize", property: "fontSize" },
  fw: { type: "default", property: "fontWeight" },
  lts: { type: "default", property: "letterSpacing" },
  ta: { type: "default", property: "textAlign" },
  lh: { type: "default", property: "lineHeight" },
  fs: { type: "default", property: "fontStyle" },
  tt: { type: "default", property: "textTransform" },
  td: { type: "default", property: "textDecoration" },
  w: { type: "spacing", property: "width" },
  miw: { type: "spacing", property: "minWidth" },
  maw: { type: "spacing", property: "maxWidth" },
  h: { type: "spacing", property: "height" },
  mih: { type: "spacing", property: "minHeight" },
  mah: { type: "spacing", property: "maxHeight" },
  bgsz: { type: "default", property: "background-size" },
  bgp: { type: "default", property: "background-position" },
  bgr: { type: "default", property: "background-repeat" },
  bga: { type: "default", property: "background-attachment" },
  pos: { type: "default", property: "position" },
  top: { type: "default", property: "top" },
  left: { type: "default", property: "left" },
  bottom: { type: "default", property: "bottom" },
  right: { type: "default", property: "right" },
  inset: { type: "default", property: "inset" },
  display: { type: "default", property: "display" }
};


//# sourceMappingURL=system-props.js.map


/***/ }),

/***/ "./node_modules/@mantine/core/esm/Box/style-system-props/value-getters/get-color-value.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@mantine/core/esm/Box/style-system-props/value-getters/get-color-value.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getColorValue": () => (/* binding */ getColorValue)
/* harmony export */ });
function getColorValue(color, theme) {
  if (color === "dimmed") {
    return theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6];
  }
  return theme.fn.variant({ variant: "filled", color, primaryFallback: false }).background;
}


//# sourceMappingURL=get-color-value.js.map


/***/ }),

/***/ "./node_modules/@mantine/core/esm/Box/style-system-props/value-getters/get-default-value.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@mantine/core/esm/Box/style-system-props/value-getters/get-default-value.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDefaultValue": () => (/* binding */ getDefaultValue)
/* harmony export */ });
function getDefaultValue(value) {
  return value;
}


//# sourceMappingURL=get-default-value.js.map


/***/ }),

/***/ "./node_modules/@mantine/core/esm/Box/style-system-props/value-getters/get-font-size-value.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/@mantine/core/esm/Box/style-system-props/value-getters/get-font-size-value.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getFontSizeValue": () => (/* binding */ getFontSizeValue)
/* harmony export */ });
function getFontSizeValue(size, theme) {
  return theme.fn.size({ size, sizes: theme.fontSizes });
}


//# sourceMappingURL=get-font-size-value.js.map


/***/ }),

/***/ "./node_modules/@mantine/core/esm/Box/style-system-props/value-getters/get-spacing-value.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@mantine/core/esm/Box/style-system-props/value-getters/get-spacing-value.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getSpacingValue": () => (/* binding */ getSpacingValue)
/* harmony export */ });
const NEGATIVE_VALUES = ["-xs", "-sm", "-md", "-lg", "-xl"];
function getSpacingValue(size, theme) {
  if (NEGATIVE_VALUES.includes(size)) {
    return theme.fn.size({ size: size.replace("-", ""), sizes: theme.spacing }) * -1;
  }
  return theme.fn.size({ size, sizes: theme.spacing });
}


//# sourceMappingURL=get-spacing-value.js.map


/***/ }),

/***/ "./node_modules/@mantine/core/esm/Box/style-system-props/value-getters/value-getters.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@mantine/core/esm/Box/style-system-props/value-getters/value-getters.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "valueGetters": () => (/* binding */ valueGetters)
/* harmony export */ });
/* harmony import */ var _get_color_value_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-color-value.js */ "./node_modules/@mantine/core/esm/Box/style-system-props/value-getters/get-color-value.js");
/* harmony import */ var _get_default_value_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get-default-value.js */ "./node_modules/@mantine/core/esm/Box/style-system-props/value-getters/get-default-value.js");
/* harmony import */ var _get_font_size_value_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./get-font-size-value.js */ "./node_modules/@mantine/core/esm/Box/style-system-props/value-getters/get-font-size-value.js");
/* harmony import */ var _get_spacing_value_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./get-spacing-value.js */ "./node_modules/@mantine/core/esm/Box/style-system-props/value-getters/get-spacing-value.js");





const valueGetters = {
  color: _get_color_value_js__WEBPACK_IMPORTED_MODULE_0__.getColorValue,
  default: _get_default_value_js__WEBPACK_IMPORTED_MODULE_1__.getDefaultValue,
  fontSize: _get_font_size_value_js__WEBPACK_IMPORTED_MODULE_2__.getFontSizeValue,
  spacing: _get_spacing_value_js__WEBPACK_IMPORTED_MODULE_3__.getSpacingValue
};


//# sourceMappingURL=value-getters.js.map


/***/ }),

/***/ "./node_modules/@mantine/core/esm/Box/use-sx/use-sx.js":
/*!*************************************************************!*\
  !*** ./node_modules/@mantine/core/esm/Box/use-sx/use-sx.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useSx": () => (/* binding */ useSx)
/* harmony export */ });
/* harmony import */ var _mantine_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mantine/styles */ "./node_modules/@mantine/styles/esm/theme/MantineProvider.js");
/* harmony import */ var _mantine_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mantine/styles */ "./node_modules/@mantine/styles/esm/tss/use-css.js");
/* harmony import */ var _style_system_props_get_system_styles_get_system_styles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style-system-props/get-system-styles/get-system-styles.js */ "./node_modules/@mantine/core/esm/Box/style-system-props/get-system-styles/get-system-styles.js");



function extractSx(sx, theme) {
  return typeof sx === "function" ? sx(theme) : sx;
}
function useSx(sx, systemProps, className) {
  const theme = (0,_mantine_styles__WEBPACK_IMPORTED_MODULE_0__.useMantineTheme)();
  const { css, cx } = (0,_mantine_styles__WEBPACK_IMPORTED_MODULE_1__.useCss)();
  if (Array.isArray(sx)) {
    return cx(className, css((0,_style_system_props_get_system_styles_get_system_styles_js__WEBPACK_IMPORTED_MODULE_2__.getSystemStyles)(systemProps, theme)), sx.map((partial) => css(extractSx(partial, theme))));
  }
  return cx(className, css(extractSx(sx, theme)), css((0,_style_system_props_get_system_styles_get_system_styles_js__WEBPACK_IMPORTED_MODULE_2__.getSystemStyles)(systemProps, theme)));
}


//# sourceMappingURL=use-sx.js.map


/***/ }),

/***/ "./node_modules/@mantine/core/esm/CloseButton/CloseButton.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@mantine/core/esm/CloseButton/CloseButton.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CloseButton": () => (/* binding */ CloseButton),
/* harmony export */   "_CloseButton": () => (/* binding */ _CloseButton)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mantine_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mantine/styles */ "./node_modules/@mantine/styles/esm/theme/MantineProvider.js");
/* harmony import */ var _mantine_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mantine/utils */ "./node_modules/@mantine/utils/esm/create-polymorphic-component/create-polymorphic-component.js");
/* harmony import */ var _ActionIcon_ActionIcon_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ActionIcon/ActionIcon.js */ "./node_modules/@mantine/core/esm/ActionIcon/ActionIcon.js");
/* harmony import */ var _CloseIcon_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CloseIcon.js */ "./node_modules/@mantine/core/esm/CloseButton/CloseIcon.js");






var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const iconSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24
};
const defaultProps = {
  size: "md"
};
const _CloseButton = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((props, ref) => {
  const _a = (0,_mantine_styles__WEBPACK_IMPORTED_MODULE_1__.useComponentDefaultProps)("CloseButton", defaultProps, props), {
    iconSize,
    size = "md"
  } = _a, others = __objRest(_a, [
    "iconSize",
    "size"
  ]);
  const theme = (0,_mantine_styles__WEBPACK_IMPORTED_MODULE_1__.useMantineTheme)();
  const _iconSize = iconSize || theme.fn.size({ size, sizes: iconSizes });
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ActionIcon_ActionIcon_js__WEBPACK_IMPORTED_MODULE_2__.ActionIcon, __spreadValues({
    size,
    ref
  }, others), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_CloseIcon_js__WEBPACK_IMPORTED_MODULE_3__.CloseIcon, {
    width: _iconSize,
    height: _iconSize
  }));
});
_CloseButton.displayName = "@mantine/core/CloseButton";
const CloseButton = (0,_mantine_utils__WEBPACK_IMPORTED_MODULE_4__.createPolymorphicComponent)(_CloseButton);


//# sourceMappingURL=CloseButton.js.map


/***/ }),

/***/ "./node_modules/@mantine/core/esm/CloseButton/CloseIcon.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@mantine/core/esm/CloseButton/CloseIcon.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CloseIcon": () => (/* binding */ CloseIcon)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
function CloseIcon(props) {
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", __spreadValues({
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
    fill: "currentColor",
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
}
CloseIcon.displayName = "@mantine/core/CloseIcon";


//# sourceMappingURL=CloseIcon.js.map


/***/ }),

/***/ "./node_modules/@mantine/core/esm/Loader/Loader.js":
/*!*********************************************************!*\
  !*** ./node_modules/@mantine/core/esm/Loader/Loader.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Loader": () => (/* binding */ Loader)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mantine_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mantine/styles */ "./node_modules/@mantine/styles/esm/theme/MantineProvider.js");
/* harmony import */ var _loaders_Bars_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loaders/Bars.js */ "./node_modules/@mantine/core/esm/Loader/loaders/Bars.js");
/* harmony import */ var _loaders_Oval_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loaders/Oval.js */ "./node_modules/@mantine/core/esm/Loader/loaders/Oval.js");
/* harmony import */ var _loaders_Dots_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./loaders/Dots.js */ "./node_modules/@mantine/core/esm/Loader/loaders/Dots.js");
/* harmony import */ var _Box_Box_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Box/Box.js */ "./node_modules/@mantine/core/esm/Box/Box.js");







var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const LOADERS = {
  bars: _loaders_Bars_js__WEBPACK_IMPORTED_MODULE_1__.Bars,
  oval: _loaders_Oval_js__WEBPACK_IMPORTED_MODULE_2__.Oval,
  dots: _loaders_Dots_js__WEBPACK_IMPORTED_MODULE_3__.Dots
};
const sizes = {
  xs: 18,
  sm: 22,
  md: 36,
  lg: 44,
  xl: 58
};
const defaultProps = {
  size: "md"
};
function Loader(props) {
  const _a = (0,_mantine_styles__WEBPACK_IMPORTED_MODULE_4__.useComponentDefaultProps)("Loader", defaultProps, props), { size, color, variant } = _a, others = __objRest(_a, ["size", "color", "variant"]);
  const theme = (0,_mantine_styles__WEBPACK_IMPORTED_MODULE_4__.useMantineTheme)();
  const defaultLoader = variant in LOADERS ? variant : theme.loader;
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Box_Box_js__WEBPACK_IMPORTED_MODULE_5__.Box, __spreadValues({
    role: "presentation",
    component: LOADERS[defaultLoader] || LOADERS.bars,
    size: theme.fn.size({ size, sizes }),
    color: theme.fn.variant({
      variant: "filled",
      primaryFallback: false,
      color: color || theme.primaryColor
    }).background
  }, others));
}
Loader.displayName = "@mantine/core/Loader";


//# sourceMappingURL=Loader.js.map


/***/ }),

/***/ "./node_modules/@mantine/core/esm/Loader/loaders/Bars.js":
/*!***************************************************************!*\
  !*** ./node_modules/@mantine/core/esm/Loader/loaders/Bars.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Bars": () => (/* binding */ Bars)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function Bars(_a) {
  var _b = _a, { size, color } = _b, others = __objRest(_b, ["size", "color"]);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", __spreadValues({
    viewBox: "0 0 135 140",
    xmlns: "http://www.w3.org/2000/svg",
    fill: color,
    width: `${size}px`
  }, others), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    y: "10",
    width: "15",
    height: "120",
    rx: "6"
  }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("animate", {
    attributeName: "height",
    begin: "0.5s",
    dur: "1s",
    values: "120;110;100;90;80;70;60;50;40;140;120",
    calcMode: "linear",
    repeatCount: "indefinite"
  }), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("animate", {
    attributeName: "y",
    begin: "0.5s",
    dur: "1s",
    values: "10;15;20;25;30;35;40;45;50;0;10",
    calcMode: "linear",
    repeatCount: "indefinite"
  })), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    x: "30",
    y: "10",
    width: "15",
    height: "120",
    rx: "6"
  }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("animate", {
    attributeName: "height",
    begin: "0.25s",
    dur: "1s",
    values: "120;110;100;90;80;70;60;50;40;140;120",
    calcMode: "linear",
    repeatCount: "indefinite"
  }), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("animate", {
    attributeName: "y",
    begin: "0.25s",
    dur: "1s",
    values: "10;15;20;25;30;35;40;45;50;0;10",
    calcMode: "linear",
    repeatCount: "indefinite"
  })), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    x: "60",
    width: "15",
    height: "140",
    rx: "6"
  }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("animate", {
    attributeName: "height",
    begin: "0s",
    dur: "1s",
    values: "120;110;100;90;80;70;60;50;40;140;120",
    calcMode: "linear",
    repeatCount: "indefinite"
  }), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("animate", {
    attributeName: "y",
    begin: "0s",
    dur: "1s",
    values: "10;15;20;25;30;35;40;45;50;0;10",
    calcMode: "linear",
    repeatCount: "indefinite"
  })), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    x: "90",
    y: "10",
    width: "15",
    height: "120",
    rx: "6"
  }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("animate", {
    attributeName: "height",
    begin: "0.25s",
    dur: "1s",
    values: "120;110;100;90;80;70;60;50;40;140;120",
    calcMode: "linear",
    repeatCount: "indefinite"
  }), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("animate", {
    attributeName: "y",
    begin: "0.25s",
    dur: "1s",
    values: "10;15;20;25;30;35;40;45;50;0;10",
    calcMode: "linear",
    repeatCount: "indefinite"
  })), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    x: "120",
    y: "10",
    width: "15",
    height: "120",
    rx: "6"
  }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("animate", {
    attributeName: "height",
    begin: "0.5s",
    dur: "1s",
    values: "120;110;100;90;80;70;60;50;40;140;120",
    calcMode: "linear",
    repeatCount: "indefinite"
  }), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("animate", {
    attributeName: "y",
    begin: "0.5s",
    dur: "1s",
    values: "10;15;20;25;30;35;40;45;50;0;10",
    calcMode: "linear",
    repeatCount: "indefinite"
  })));
}


//# sourceMappingURL=Bars.js.map


/***/ }),

/***/ "./node_modules/@mantine/core/esm/Loader/loaders/Dots.js":
/*!***************************************************************!*\
  !*** ./node_modules/@mantine/core/esm/Loader/loaders/Dots.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Dots": () => (/* binding */ Dots)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function Dots(_a) {
  var _b = _a, { size, color } = _b, others = __objRest(_b, ["size", "color"]);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", __spreadValues({
    width: `${size}px`,
    height: `${size / 4}px`,
    viewBox: "0 0 120 30",
    xmlns: "http://www.w3.org/2000/svg",
    fill: color
  }, others), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("circle", {
    cx: "15",
    cy: "15",
    r: "15"
  }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("animate", {
    attributeName: "r",
    from: "15",
    to: "15",
    begin: "0s",
    dur: "0.8s",
    values: "15;9;15",
    calcMode: "linear",
    repeatCount: "indefinite"
  }), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("animate", {
    attributeName: "fill-opacity",
    from: "1",
    to: "1",
    begin: "0s",
    dur: "0.8s",
    values: "1;.5;1",
    calcMode: "linear",
    repeatCount: "indefinite"
  })), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("circle", {
    cx: "60",
    cy: "15",
    r: "9",
    fillOpacity: "0.3"
  }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("animate", {
    attributeName: "r",
    from: "9",
    to: "9",
    begin: "0s",
    dur: "0.8s",
    values: "9;15;9",
    calcMode: "linear",
    repeatCount: "indefinite"
  }), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("animate", {
    attributeName: "fill-opacity",
    from: "0.5",
    to: "0.5",
    begin: "0s",
    dur: "0.8s",
    values: ".5;1;.5",
    calcMode: "linear",
    repeatCount: "indefinite"
  })), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("circle", {
    cx: "105",
    cy: "15",
    r: "15"
  }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("animate", {
    attributeName: "r",
    from: "15",
    to: "15",
    begin: "0s",
    dur: "0.8s",
    values: "15;9;15",
    calcMode: "linear",
    repeatCount: "indefinite"
  }), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("animate", {
    attributeName: "fill-opacity",
    from: "1",
    to: "1",
    begin: "0s",
    dur: "0.8s",
    values: "1;.5;1",
    calcMode: "linear",
    repeatCount: "indefinite"
  })));
}


//# sourceMappingURL=Dots.js.map


/***/ }),

/***/ "./node_modules/@mantine/core/esm/Loader/loaders/Oval.js":
/*!***************************************************************!*\
  !*** ./node_modules/@mantine/core/esm/Loader/loaders/Oval.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Oval": () => (/* binding */ Oval)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function Oval(_a) {
  var _b = _a, { size, color } = _b, others = __objRest(_b, ["size", "color"]);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", __spreadValues({
    width: `${size}px`,
    height: `${size}px`,
    viewBox: "0 0 38 38",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: color
  }, others), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", {
    transform: "translate(2.5 2.5)",
    strokeWidth: "5"
  }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("circle", {
    strokeOpacity: ".5",
    cx: "16",
    cy: "16",
    r: "16"
  }), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M32 16c0-9.94-8.06-16-16-16"
  }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("animateTransform", {
    attributeName: "transform",
    type: "rotate",
    from: "0 16 16",
    to: "360 16 16",
    dur: "1s",
    repeatCount: "indefinite"
  })))));
}


//# sourceMappingURL=Oval.js.map


/***/ }),

/***/ "./node_modules/@mantine/core/esm/Notification/Notification.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@mantine/core/esm/Notification/Notification.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Notification": () => (/* binding */ Notification)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mantine_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mantine/styles */ "./node_modules/@mantine/styles/esm/theme/MantineProvider.js");
/* harmony import */ var _Notification_styles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Notification.styles.js */ "./node_modules/@mantine/core/esm/Notification/Notification.styles.js");
/* harmony import */ var _Box_Box_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Box/Box.js */ "./node_modules/@mantine/core/esm/Box/Box.js");
/* harmony import */ var _Loader_Loader_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Loader/Loader.js */ "./node_modules/@mantine/core/esm/Loader/Loader.js");
/* harmony import */ var _Text_Text_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Text/Text.js */ "./node_modules/@mantine/core/esm/Text/Text.js");
/* harmony import */ var _CloseButton_CloseButton_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../CloseButton/CloseButton.js */ "./node_modules/@mantine/core/esm/CloseButton/CloseButton.js");








var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const Notification = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((props, ref) => {
  const _a = (0,_mantine_styles__WEBPACK_IMPORTED_MODULE_1__.useComponentDefaultProps)("Notification", {}, props), {
    className,
    color,
    radius,
    loading,
    disallowClose,
    title,
    icon,
    children,
    onClose,
    closeButtonProps,
    classNames,
    styles,
    unstyled
  } = _a, others = __objRest(_a, [
    "className",
    "color",
    "radius",
    "loading",
    "disallowClose",
    "title",
    "icon",
    "children",
    "onClose",
    "closeButtonProps",
    "classNames",
    "styles",
    "unstyled"
  ]);
  const { classes, cx } = (0,_Notification_styles_js__WEBPACK_IMPORTED_MODULE_2__["default"])({ color, radius, withTitle: !!title }, { classNames, styles, unstyled, name: "Notification" });
  const withIcon = icon || loading;
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Box_Box_js__WEBPACK_IMPORTED_MODULE_3__.Box, __spreadValues({
    className: cx(classes.root, { [classes.withIcon]: withIcon }, className),
    role: "alert",
    ref
  }, others), icon && !loading && /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: classes.icon
  }, icon), loading && /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Loader_Loader_js__WEBPACK_IMPORTED_MODULE_4__.Loader, {
    size: 28,
    color,
    className: classes.loader
  }), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: classes.body
  }, title && /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Text_Text_js__WEBPACK_IMPORTED_MODULE_5__.Text, {
    className: classes.title,
    size: "sm",
    weight: 500
  }, title), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Text_Text_js__WEBPACK_IMPORTED_MODULE_5__.Text, {
    color: "dimmed",
    className: classes.description,
    size: "sm"
  }, children)), !disallowClose && /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_CloseButton_CloseButton_js__WEBPACK_IMPORTED_MODULE_6__.CloseButton, __spreadProps(__spreadValues({
    iconSize: 16,
    color: "gray"
  }, closeButtonProps), {
    onClick: onClose,
    className: classes.closeButton
  })));
});
Notification.displayName = "@mantine/core/Notification";


//# sourceMappingURL=Notification.js.map


/***/ }),

/***/ "./node_modules/@mantine/core/esm/Notification/Notification.styles.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@mantine/core/esm/Notification/Notification.styles.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mantine_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mantine/styles */ "./node_modules/@mantine/styles/esm/tss/create-styles.js");


var useStyles = (0,_mantine_styles__WEBPACK_IMPORTED_MODULE_0__.createStyles)((theme, { color, radius, withTitle }, getRef) => {
  const _radius = theme.fn.radius(radius);
  const topBottom = Math.min(Math.max(_radius / 1.2, 4), 30);
  const colors = theme.fn.variant({ variant: "filled", color });
  return {
    closeButton: theme.fn.hover({
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0]
    }),
    icon: {
      ref: getRef("icon"),
      boxSizing: "border-box",
      marginRight: theme.spacing.md,
      width: 28,
      height: 28,
      borderRadius: 28,
      display: "flex",
      flex: "none",
      alignItems: "center",
      justifyContent: "center",
      color: theme.white
    },
    withIcon: {
      paddingLeft: theme.spacing.xs,
      "&::before": {
        display: "none"
      }
    },
    root: {
      boxSizing: "border-box",
      position: "relative",
      display: "flex",
      alignItems: "center",
      paddingLeft: 22,
      paddingRight: 5,
      paddingTop: theme.spacing.xs,
      paddingBottom: theme.spacing.xs,
      borderRadius: _radius,
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
      boxShadow: theme.shadows.lg,
      border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2]}`,
      "&::before": {
        content: '""',
        display: "block",
        position: "absolute",
        width: 6,
        top: topBottom,
        bottom: topBottom,
        left: 4,
        borderRadius: _radius,
        backgroundColor: colors.background
      },
      [`& .${getRef("icon")}`]: {
        backgroundColor: colors.background,
        color: theme.white
      }
    },
    body: {
      flex: 1,
      overflow: "hidden",
      marginRight: 10
    },
    loader: {
      marginRight: theme.spacing.md
    },
    title: {
      lineHeight: 1.4,
      marginBottom: 2,
      overflow: "hidden",
      textOverflow: "ellipsis",
      color: theme.colorScheme === "dark" ? theme.white : theme.colors.gray[9]
    },
    description: {
      color: withTitle ? theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6] : theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
      lineHeight: 1.4,
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  };
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useStyles);
//# sourceMappingURL=Notification.styles.js.map


/***/ }),

/***/ "./node_modules/@mantine/core/esm/Portal/Portal.js":
/*!*********************************************************!*\
  !*** ./node_modules/@mantine/core/esm/Portal/Portal.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Portal": () => (/* binding */ Portal)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mantine_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mantine/hooks */ "./node_modules/@mantine/hooks/esm/use-isomorphic-effect/use-isomorphic-effect.js");
/* harmony import */ var _mantine_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mantine/styles */ "./node_modules/@mantine/styles/esm/theme/MantineProvider.js");





function Portal(props) {
  const { children, target, className } = (0,_mantine_styles__WEBPACK_IMPORTED_MODULE_2__.useComponentDefaultProps)("Portal", {}, props);
  const theme = (0,_mantine_styles__WEBPACK_IMPORTED_MODULE_2__.useMantineTheme)();
  const [mounted, setMounted] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_3__.useIsomorphicEffect)(() => {
    setMounted(true);
    ref.current = !target ? document.createElement("div") : typeof target === "string" ? document.querySelector(target) : target;
    if (!target) {
      document.body.appendChild(ref.current);
    }
    return () => {
      !target && document.body.removeChild(ref.current);
    };
  }, [target]);
  if (!mounted) {
    return null;
  }
  return (0,react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal)(/* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className,
    dir: theme.dir
  }, children), ref.current);
}
Portal.displayName = "@mantine/core/Portal";


//# sourceMappingURL=Portal.js.map


/***/ }),

/***/ "./node_modules/@mantine/core/esm/Text/Text.js":
/*!*****************************************************!*\
  !*** ./node_modules/@mantine/core/esm/Text/Text.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Text": () => (/* binding */ Text),
/* harmony export */   "_Text": () => (/* binding */ _Text)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mantine_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mantine/styles */ "./node_modules/@mantine/styles/esm/theme/MantineProvider.js");
/* harmony import */ var _mantine_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mantine/utils */ "./node_modules/@mantine/utils/esm/create-polymorphic-component/create-polymorphic-component.js");
/* harmony import */ var _Text_styles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Text.styles.js */ "./node_modules/@mantine/core/esm/Text/Text.styles.js");
/* harmony import */ var _Box_Box_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Box/Box.js */ "./node_modules/@mantine/core/esm/Box/Box.js");






var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const defaultProps = {
  variant: "text"
};
const _Text = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((props, ref) => {
  const _a = (0,_mantine_styles__WEBPACK_IMPORTED_MODULE_1__.useComponentDefaultProps)("Text", defaultProps, props), {
    className,
    size,
    weight,
    transform,
    color,
    align,
    variant,
    lineClamp,
    gradient,
    inline,
    inherit,
    underline,
    strikethrough,
    italic,
    classNames,
    styles,
    unstyled,
    span
  } = _a, others = __objRest(_a, [
    "className",
    "size",
    "weight",
    "transform",
    "color",
    "align",
    "variant",
    "lineClamp",
    "gradient",
    "inline",
    "inherit",
    "underline",
    "strikethrough",
    "italic",
    "classNames",
    "styles",
    "unstyled",
    "span"
  ]);
  const { classes, cx } = (0,_Text_styles_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
    variant,
    color,
    size,
    lineClamp,
    inline,
    inherit,
    underline,
    strikethrough,
    italic,
    weight,
    transform,
    align,
    gradient
  }, { unstyled, name: "Text" });
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Box_Box_js__WEBPACK_IMPORTED_MODULE_3__.Box, __spreadValues({
    ref,
    className: cx(classes.root, { [classes.gradient]: variant === "gradient" }, className),
    component: span ? "span" : "div"
  }, others));
});
_Text.displayName = "@mantine/core/Text";
const Text = (0,_mantine_utils__WEBPACK_IMPORTED_MODULE_4__.createPolymorphicComponent)(_Text);


//# sourceMappingURL=Text.js.map


/***/ }),

/***/ "./node_modules/@mantine/core/esm/Text/Text.styles.js":
/*!************************************************************!*\
  !*** ./node_modules/@mantine/core/esm/Text/Text.styles.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mantine_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mantine/styles */ "./node_modules/@mantine/styles/esm/tss/create-styles.js");


var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
function getTextDecoration({
  underline,
  strikethrough
}) {
  const styles = [];
  if (underline) {
    styles.push("underline");
  }
  if (strikethrough) {
    styles.push("line-through");
  }
  return styles.length > 0 ? styles.join(" ") : "none";
}
function getTextColor({ theme, color, variant }) {
  if (color === "dimmed") {
    return theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6];
  }
  return typeof color === "string" && (color in theme.colors || color.split(".")[0] in theme.colors) ? theme.fn.variant({ variant: "filled", color }).background : variant === "link" ? theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 7] : color || "inherit";
}
function getLineClamp(lineClamp) {
  if (typeof lineClamp === "number") {
    return {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: lineClamp,
      WebkitBoxOrient: "vertical"
    };
  }
  return null;
}
var useStyles = (0,_mantine_styles__WEBPACK_IMPORTED_MODULE_0__.createStyles)((theme, {
  color,
  variant,
  size,
  lineClamp,
  inline,
  inherit,
  underline,
  gradient,
  weight,
  transform,
  align,
  strikethrough,
  italic
}) => {
  const colors = theme.fn.variant({ variant: "gradient", gradient });
  return {
    root: __spreadValues(__spreadProps(__spreadValues(__spreadValues(__spreadValues({}, theme.fn.fontStyles()), theme.fn.focusStyles()), getLineClamp(lineClamp)), {
      color: getTextColor({ color, theme, variant }),
      fontFamily: inherit ? "inherit" : theme.fontFamily,
      fontSize: inherit || size === void 0 ? "inherit" : theme.fn.size({ size, sizes: theme.fontSizes }),
      lineHeight: inherit ? "inherit" : inline ? 1 : theme.lineHeight,
      textDecoration: getTextDecoration({ underline, strikethrough }),
      WebkitTapHighlightColor: "transparent",
      fontWeight: inherit ? "inherit" : weight,
      textTransform: transform,
      textAlign: align,
      fontStyle: italic ? "italic" : void 0
    }), theme.fn.hover(variant === "link" && underline === void 0 ? {
      textDecoration: "underline"
    } : void 0)),
    gradient: {
      backgroundImage: colors.background,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    }
  };
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useStyles);
//# sourceMappingURL=Text.styles.js.map


/***/ }),

/***/ "./node_modules/@mantine/core/esm/UnstyledButton/UnstyledButton.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@mantine/core/esm/UnstyledButton/UnstyledButton.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UnstyledButton": () => (/* binding */ UnstyledButton),
/* harmony export */   "_UnstyledButton": () => (/* binding */ _UnstyledButton)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mantine_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mantine/styles */ "./node_modules/@mantine/styles/esm/theme/MantineProvider.js");
/* harmony import */ var _mantine_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mantine/utils */ "./node_modules/@mantine/utils/esm/create-polymorphic-component/create-polymorphic-component.js");
/* harmony import */ var _UnstyledButton_styles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UnstyledButton.styles.js */ "./node_modules/@mantine/core/esm/UnstyledButton/UnstyledButton.styles.js");
/* harmony import */ var _Box_Box_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Box/Box.js */ "./node_modules/@mantine/core/esm/Box/Box.js");






var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const _UnstyledButton = (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((props, ref) => {
  const _a = (0,_mantine_styles__WEBPACK_IMPORTED_MODULE_1__.useComponentDefaultProps)("UnstyledButton", {}, props), {
    className,
    component = "button",
    unstyled
  } = _a, others = __objRest(_a, [
    "className",
    "component",
    "unstyled"
  ]);
  const { classes, cx } = (0,_UnstyledButton_styles_js__WEBPACK_IMPORTED_MODULE_2__["default"])(null, { name: "UnstyledButton", unstyled });
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Box_Box_js__WEBPACK_IMPORTED_MODULE_3__.Box, __spreadValues({
    component,
    ref,
    className: cx(classes.root, className),
    type: component === "button" ? "button" : void 0
  }, others));
});
_UnstyledButton.displayName = "@mantine/core/UnstyledButton";
const UnstyledButton = (0,_mantine_utils__WEBPACK_IMPORTED_MODULE_4__.createPolymorphicComponent)(_UnstyledButton);


//# sourceMappingURL=UnstyledButton.js.map


/***/ }),

/***/ "./node_modules/@mantine/core/esm/UnstyledButton/UnstyledButton.styles.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@mantine/core/esm/UnstyledButton/UnstyledButton.styles.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mantine_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mantine/styles */ "./node_modules/@mantine/styles/esm/tss/create-styles.js");


var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var useStyles = (0,_mantine_styles__WEBPACK_IMPORTED_MODULE_0__.createStyles)((theme) => ({
  root: __spreadProps(__spreadValues(__spreadValues({}, theme.fn.focusStyles()), theme.fn.fontStyles()), {
    cursor: "pointer",
    border: 0,
    padding: 0,
    appearance: "none",
    fontSize: theme.fontSizes.md,
    backgroundColor: "transparent",
    textAlign: "left",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    textDecoration: "none",
    boxSizing: "border-box"
  })
}));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useStyles);
//# sourceMappingURL=UnstyledButton.styles.js.map


/***/ }),

/***/ "./node_modules/@mantine/hooks/esm/use-did-update/use-did-update.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@mantine/hooks/esm/use-did-update/use-did-update.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useDidUpdate": () => (/* binding */ useDidUpdate)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function useDidUpdate(fn, dependencies) {
  const mounted = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => () => {
    mounted.current = false;
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (mounted.current) {
      return fn();
    }
    mounted.current = true;
    return void 0;
  }, dependencies);
}


//# sourceMappingURL=use-did-update.js.map


/***/ }),

/***/ "./node_modules/@mantine/hooks/esm/use-force-update/use-force-update.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@mantine/hooks/esm/use-force-update/use-force-update.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useForceUpdate": () => (/* binding */ useForceUpdate)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const reducer = (value) => (value + 1) % 1e6;
function useForceUpdate() {
  const [, update] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)(reducer, 0);
  return update;
}


//# sourceMappingURL=use-force-update.js.map


/***/ }),

/***/ "./node_modules/@mantine/hooks/esm/use-isomorphic-effect/use-isomorphic-effect.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@mantine/hooks/esm/use-isomorphic-effect/use-isomorphic-effect.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useIsomorphicEffect": () => (/* binding */ useIsomorphicEffect)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const useIsomorphicEffect = typeof document !== "undefined" ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;


//# sourceMappingURL=use-isomorphic-effect.js.map


/***/ }),

/***/ "./node_modules/@mantine/hooks/esm/use-media-query/use-media-query.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@mantine/hooks/esm/use-media-query/use-media-query.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useMediaQuery": () => (/* binding */ useMediaQuery)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function attachMediaListener(query, callback) {
  try {
    query.addEventListener("change", callback);
    return () => query.removeEventListener("change", callback);
  } catch (e) {
    query.addListener(callback);
    return () => query.removeListener(callback);
  }
}
function getInitialValue(query, initialValue) {
  if (typeof initialValue === "boolean") {
    return initialValue;
  }
  if (typeof window !== "undefined" && "matchMedia" in window) {
    return window.matchMedia(query).matches;
  }
  return false;
}
function useMediaQuery(query, initialValue, { getInitialValueInEffect } = {
  getInitialValueInEffect: true
}) {
  const [matches, setMatches] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(getInitialValueInEffect ? initialValue : getInitialValue(query, initialValue));
  const queryRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if ("matchMedia" in window) {
      queryRef.current = window.matchMedia(query);
      setMatches(queryRef.current.matches);
      return attachMediaListener(queryRef.current, (event) => setMatches(event.matches));
    }
    return void 0;
  }, [query]);
  return matches;
}


//# sourceMappingURL=use-media-query.js.map


/***/ }),

/***/ "./node_modules/@mantine/hooks/esm/use-queue/use-queue.js":
/*!****************************************************************!*\
  !*** ./node_modules/@mantine/hooks/esm/use-queue/use-queue.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useQueue": () => (/* binding */ useQueue)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function useQueue({ initialValues = [], limit }) {
  const [{ state, queue }, setState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    state: initialValues.slice(0, limit),
    queue: initialValues.slice(limit)
  });
  const add = (...items) => setState((current) => {
    const results = [...current.state, ...current.queue, ...items];
    return {
      state: results.slice(0, limit),
      queue: results.slice(limit)
    };
  });
  const update = (fn) => setState((current) => {
    const results = fn([...current.state, ...current.queue]);
    return {
      state: results.slice(0, limit),
      queue: results.slice(limit)
    };
  });
  const cleanQueue = () => setState((current) => ({ state: current.state, queue: [] }));
  return {
    state,
    queue,
    add,
    update,
    cleanQueue
  };
}


//# sourceMappingURL=use-queue.js.map


/***/ }),

/***/ "./node_modules/@mantine/hooks/esm/use-reduced-motion/use-reduced-motion.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@mantine/hooks/esm/use-reduced-motion/use-reduced-motion.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useReducedMotion": () => (/* binding */ useReducedMotion)
/* harmony export */ });
/* harmony import */ var _use_media_query_use_media_query_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../use-media-query/use-media-query.js */ "./node_modules/@mantine/hooks/esm/use-media-query/use-media-query.js");


function useReducedMotion(initialValue, options) {
  return (0,_use_media_query_use_media_query_js__WEBPACK_IMPORTED_MODULE_0__.useMediaQuery)("(prefers-reduced-motion: reduce)", initialValue, options);
}


//# sourceMappingURL=use-reduced-motion.js.map


/***/ }),

/***/ "./node_modules/@mantine/hooks/esm/utils/random-id/random-id.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@mantine/hooks/esm/utils/random-id/random-id.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "randomId": () => (/* binding */ randomId)
/* harmony export */ });
function randomId() {
  return `mantine-${Math.random().toString(36).slice(2, 11)}`;
}


//# sourceMappingURL=random-id.js.map


/***/ }),

/***/ "./node_modules/@mantine/notifications/esm/NotificationContainer/NotificationContainer.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@mantine/notifications/esm/NotificationContainer/NotificationContainer.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mantine/core */ "./node_modules/@mantine/core/esm/Notification/Notification.js");
/* harmony import */ var _get_auto_close_get_auto_close_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get-auto-close/get-auto-close.js */ "./node_modules/@mantine/notifications/esm/NotificationContainer/get-auto-close/get-auto-close.js");




var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function NotificationContainer(_a) {
  var _b = _a, {
    notification,
    autoClose,
    onHide,
    innerRef
  } = _b, others = __objRest(_b, [
    "notification",
    "autoClose",
    "onHide",
    "innerRef"
  ]);
  const _a2 = notification, { autoClose: notificationAutoClose, message } = _a2, notificationProps = __objRest(_a2, ["autoClose", "message"]);
  const autoCloseTimeout = (0,_get_auto_close_get_auto_close_js__WEBPACK_IMPORTED_MODULE_1__["default"])(autoClose, notificationAutoClose);
  const hideTimeout = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const handleHide = () => {
    onHide(notification.id);
    window.clearTimeout(hideTimeout.current);
  };
  const cancelDelayedHide = () => {
    clearTimeout(hideTimeout.current);
  };
  const handleDelayedHide = () => {
    if (typeof autoCloseTimeout === "number") {
      hideTimeout.current = window.setTimeout(handleHide, autoCloseTimeout);
    }
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (typeof notification.onOpen === "function") {
      notification.onOpen(notification);
    }
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    handleDelayedHide();
    return cancelDelayedHide;
  }, [autoClose, notification.autoClose]);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_2__.Notification, __spreadProps(__spreadValues(__spreadValues({}, notificationProps), others), {
    onClose: handleHide,
    onMouseEnter: cancelDelayedHide,
    onMouseLeave: handleDelayedHide,
    ref: innerRef
  }), message);
}
NotificationContainer.displayName = "@mantine/notifications/NotificationContainer";

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NotificationContainer);
//# sourceMappingURL=NotificationContainer.js.map


/***/ }),

/***/ "./node_modules/@mantine/notifications/esm/NotificationContainer/get-auto-close/get-auto-close.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@mantine/notifications/esm/NotificationContainer/get-auto-close/get-auto-close.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function getAutoClose(autoClose, notificationAutoClose) {
  if (typeof notificationAutoClose === "number") {
    return notificationAutoClose;
  }
  if (notificationAutoClose === false || autoClose === false) {
    return false;
  }
  return autoClose;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getAutoClose);
//# sourceMappingURL=get-auto-close.js.map


/***/ }),

/***/ "./node_modules/@mantine/notifications/esm/Notifications.context.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@mantine/notifications/esm/Notifications.context.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotificationsContext": () => (/* binding */ NotificationsContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const NotificationsContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
NotificationsContext.displayName = "@mantine/notifications/NotificationsContext";


//# sourceMappingURL=Notifications.context.js.map


/***/ }),

/***/ "./node_modules/@mantine/notifications/esm/NotificationsProvider/NotificationsProvider.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@mantine/notifications/esm/NotificationsProvider/NotificationsProvider.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotificationsProvider": () => (/* binding */ NotificationsProvider)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-transition-group */ "./node_modules/react-transition-group/esm/Transition.js");
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react-transition-group */ "./node_modules/react-transition-group/esm/TransitionGroup.js");
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mantine/core */ "./node_modules/@mantine/styles/esm/theme/utils/get-default-z-index/get-default-z-index.js");
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mantine/core */ "./node_modules/@mantine/core/esm/Portal/Portal.js");
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mantine/core */ "./node_modules/@mantine/core/esm/Box/Box.js");
/* harmony import */ var _mantine_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mantine/hooks */ "./node_modules/@mantine/hooks/esm/use-force-update/use-force-update.js");
/* harmony import */ var _mantine_hooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mantine/hooks */ "./node_modules/@mantine/hooks/esm/use-reduced-motion/use-reduced-motion.js");
/* harmony import */ var _mantine_hooks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mantine/hooks */ "./node_modules/@mantine/hooks/esm/use-did-update/use-did-update.js");
/* harmony import */ var _Notifications_context_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Notifications.context.js */ "./node_modules/@mantine/notifications/esm/Notifications.context.js");
/* harmony import */ var _events_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../events.js */ "./node_modules/@mantine/notifications/esm/events.js");
/* harmony import */ var _get_position_styles_get_position_styles_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./get-position-styles/get-position-styles.js */ "./node_modules/@mantine/notifications/esm/NotificationsProvider/get-position-styles/get-position-styles.js");
/* harmony import */ var _get_notification_state_styles_get_notification_state_styles_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./get-notification-state-styles/get-notification-state-styles.js */ "./node_modules/@mantine/notifications/esm/NotificationsProvider/get-notification-state-styles/get-notification-state-styles.js");
/* harmony import */ var _NotificationContainer_NotificationContainer_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../NotificationContainer/NotificationContainer.js */ "./node_modules/@mantine/notifications/esm/NotificationContainer/NotificationContainer.js");
/* harmony import */ var _NotificationsProvider_styles_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NotificationsProvider.styles.js */ "./node_modules/@mantine/notifications/esm/NotificationsProvider/NotificationsProvider.styles.js");
/* harmony import */ var _use_notifications_state_use_notifications_state_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./use-notifications-state/use-notifications-state.js */ "./node_modules/@mantine/notifications/esm/NotificationsProvider/use-notifications-state/use-notifications-state.js");












var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const POSITIONS = [
  "top-left",
  "top-right",
  "top-center",
  "bottom-left",
  "bottom-right",
  "bottom-center"
];
function NotificationsProvider(_a) {
  var _b = _a, {
    className,
    position = "bottom-right",
    autoClose = 4e3,
    transitionDuration = 250,
    containerWidth = 440,
    notificationMaxHeight = 200,
    limit = 5,
    zIndex = (0,_mantine_core__WEBPACK_IMPORTED_MODULE_1__.getDefaultZIndex)("overlay"),
    style,
    children,
    target
  } = _b, others = __objRest(_b, [
    "className",
    "position",
    "autoClose",
    "transitionDuration",
    "containerWidth",
    "notificationMaxHeight",
    "limit",
    "zIndex",
    "style",
    "children",
    "target"
  ]);
  const forceUpdate = (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_2__.useForceUpdate)();
  const refs = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({});
  const previousLength = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);
  const {
    notifications,
    queue,
    showNotification,
    updateNotification,
    hideNotification,
    clean,
    cleanQueue
  } = (0,_use_notifications_state_use_notifications_state_js__WEBPACK_IMPORTED_MODULE_3__["default"])({ limit });
  const { classes, cx, theme } = (0,_NotificationsProvider_styles_js__WEBPACK_IMPORTED_MODULE_4__["default"])({ zIndex });
  const shouldReduceMotion = (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_5__.useReducedMotion)();
  const reduceMotion = theme.respectReducedMotion ? shouldReduceMotion : false;
  const duration = reduceMotion ? 1 : transitionDuration;
  const positioning = (POSITIONS.includes(position) ? position : "bottom-right").split("-");
  (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_6__.useDidUpdate)(() => {
    if (notifications.length > previousLength.current) {
      setTimeout(() => forceUpdate(), 0);
    }
    previousLength.current = notifications.length;
  }, [notifications]);
  (0,_events_js__WEBPACK_IMPORTED_MODULE_7__.useNotificationsEvents)({
    show: showNotification,
    hide: hideNotification,
    update: updateNotification,
    clean,
    cleanQueue
  });
  const items = notifications.map((notification) => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_transition_group__WEBPACK_IMPORTED_MODULE_8__["default"], {
    key: notification.id,
    timeout: duration,
    onEnter: () => refs.current[notification.id].offsetHeight,
    nodeRef: { current: refs.current[notification.id] }
  }, (state) => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_NotificationContainer_NotificationContainer_js__WEBPACK_IMPORTED_MODULE_9__["default"], {
    innerRef: (node) => {
      refs.current[notification.id] = node;
    },
    notification,
    onHide: hideNotification,
    className: classes.notification,
    autoClose,
    sx: [
      __spreadValues({}, (0,_get_notification_state_styles_get_notification_state_styles_js__WEBPACK_IMPORTED_MODULE_10__["default"])({
        state,
        positioning,
        transitionDuration: duration,
        maxHeight: notificationMaxHeight
      })),
      ...Array.isArray(notification.sx) ? notification.sx : [notification.sx]
    ]
  })));
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Notifications_context_js__WEBPACK_IMPORTED_MODULE_11__.NotificationsContext.Provider, {
    value: { notifications, queue }
  }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_12__.Portal, {
    target
  }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mantine_core__WEBPACK_IMPORTED_MODULE_13__.Box, __spreadValues({
    className: cx(classes.notifications, className),
    style,
    sx: __spreadValues({
      maxWidth: containerWidth
    }, (0,_get_position_styles_get_position_styles_js__WEBPACK_IMPORTED_MODULE_14__["default"])(positioning, theme.spacing.md))
  }, others), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_transition_group__WEBPACK_IMPORTED_MODULE_15__["default"], null, items))), children);
}
NotificationsProvider.displayName = "@mantine/notifications/NotificationsProvider";


//# sourceMappingURL=NotificationsProvider.js.map


/***/ }),

/***/ "./node_modules/@mantine/notifications/esm/NotificationsProvider/NotificationsProvider.styles.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/@mantine/notifications/esm/NotificationsProvider/NotificationsProvider.styles.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mantine/core */ "./node_modules/@mantine/styles/esm/tss/create-styles.js");


var useStyles = (0,_mantine_core__WEBPACK_IMPORTED_MODULE_0__.createStyles)((theme, { zIndex }) => ({
  notifications: {
    width: `calc(100% - ${theme.spacing.md * 2}px)`,
    boxSizing: "border-box",
    position: "fixed",
    zIndex
  },
  notification: {
    "&:not(:first-of-type)": {
      marginTop: theme.spacing.sm
    }
  }
}));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useStyles);
//# sourceMappingURL=NotificationsProvider.styles.js.map


/***/ }),

/***/ "./node_modules/@mantine/notifications/esm/NotificationsProvider/get-notification-state-styles/get-notification-state-styles.js":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/@mantine/notifications/esm/NotificationsProvider/get-notification-state-styles/get-notification-state-styles.js ***!
  \**************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const transforms = {
  left: "translateX(-100%)",
  right: "translateX(100%)",
  "top-center": "translateY(-100%)",
  "bottom-center": "translateY(100%)"
};
const noTransform = {
  left: "translateX(0)",
  right: "translateX(0)",
  "top-center": "translateY(0)",
  "bottom-center": "translateY(0)"
};
function getNotificationStateStyles({
  state,
  maxHeight,
  positioning,
  transitionDuration
}) {
  const [vertical, horizontal] = positioning;
  const property = horizontal === "center" ? `${vertical}-center` : horizontal;
  const commonStyles = {
    opacity: 0,
    maxHeight,
    transform: transforms[property],
    transitionDuration: `${transitionDuration}ms, ${transitionDuration}ms, ${transitionDuration}ms`,
    transitionTimingFunction: "cubic-bezier(.51,.3,0,1.21), cubic-bezier(.51,.3,0,1.21), linear",
    transitionProperty: "opacity, transform, max-height"
  };
  const inState = {
    opacity: 1,
    transform: noTransform[property]
  };
  const outState = {
    opacity: 0,
    maxHeight: 0,
    transform: transforms[property]
  };
  const transitionStyles = {
    entering: inState,
    entered: inState,
    exiting: outState,
    exited: outState
  };
  return __spreadValues(__spreadValues({}, commonStyles), transitionStyles[state]);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getNotificationStateStyles);
//# sourceMappingURL=get-notification-state-styles.js.map


/***/ }),

/***/ "./node_modules/@mantine/notifications/esm/NotificationsProvider/get-position-styles/get-position-styles.js":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/@mantine/notifications/esm/NotificationsProvider/get-position-styles/get-position-styles.js ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function getPositionStyles([vertical, horizontal], spacing) {
  const styles = {};
  vertical === "top" && (styles.top = spacing);
  vertical === "bottom" && (styles.bottom = spacing);
  horizontal === "left" && (styles.left = spacing);
  horizontal === "right" && (styles.right = spacing);
  horizontal === "center" && (styles.left = "50%", styles.transform = "translateX(-50%)");
  return styles;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getPositionStyles);
//# sourceMappingURL=get-position-styles.js.map


/***/ }),

/***/ "./node_modules/@mantine/notifications/esm/NotificationsProvider/use-notifications-state/use-notifications-state.js":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/@mantine/notifications/esm/NotificationsProvider/use-notifications-state/use-notifications-state.js ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mantine_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mantine/hooks */ "./node_modules/@mantine/hooks/esm/use-queue/use-queue.js");
/* harmony import */ var _mantine_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mantine/hooks */ "./node_modules/@mantine/hooks/esm/utils/random-id/random-id.js");


var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
function useNotificationsState({ limit }) {
  const { state, queue, update, cleanQueue } = (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_0__.useQueue)({
    initialValues: [],
    limit
  });
  const showNotification = (notification) => {
    const id = notification.id || (0,_mantine_hooks__WEBPACK_IMPORTED_MODULE_1__.randomId)();
    update((notifications) => {
      if (notification.id && notifications.some((n) => n.id === notification.id)) {
        return notifications;
      }
      return [...notifications, __spreadProps(__spreadValues({}, notification), { id })];
    });
    return id;
  };
  const updateNotification = (notification) => update((notifications) => {
    const index = notifications.findIndex((n) => n.id === notification.id);
    if (index === -1) {
      return notifications;
    }
    const newNotifications = [...notifications];
    newNotifications[index] = notification;
    return newNotifications;
  });
  const hideNotification = (id) => update((notifications) => notifications.filter((notification) => {
    if (notification.id === id) {
      typeof notification.onClose === "function" && notification.onClose(notification);
      return false;
    }
    return true;
  }));
  const clean = () => update(() => []);
  return {
    notifications: state,
    queue,
    showNotification,
    updateNotification,
    hideNotification,
    cleanQueue,
    clean
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useNotificationsState);
//# sourceMappingURL=use-notifications-state.js.map


/***/ }),

/***/ "./node_modules/@mantine/notifications/esm/events.js":
/*!***********************************************************!*\
  !*** ./node_modules/@mantine/notifications/esm/events.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cleanNotifications": () => (/* binding */ cleanNotifications),
/* harmony export */   "cleanNotificationsQueue": () => (/* binding */ cleanNotificationsQueue),
/* harmony export */   "createEvent": () => (/* binding */ createEvent),
/* harmony export */   "hideNotification": () => (/* binding */ hideNotification),
/* harmony export */   "showNotification": () => (/* binding */ showNotification),
/* harmony export */   "updateNotification": () => (/* binding */ updateNotification),
/* harmony export */   "useNotificationsEvents": () => (/* binding */ useNotificationsEvents)
/* harmony export */ });
/* harmony import */ var _mantine_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mantine/utils */ "./node_modules/@mantine/utils/esm/create-use-external-events/create-use-external-events.js");


const [useNotificationsEvents, createEvent] = (0,_mantine_utils__WEBPACK_IMPORTED_MODULE_0__.createUseExternalEvents)("mantine-notifications");
const showNotification = createEvent("show");
const hideNotification = createEvent("hide");
const cleanNotifications = createEvent("clean");
const cleanNotificationsQueue = createEvent("cleanQueue");
const updateNotification = createEvent("update");


//# sourceMappingURL=events.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/theme/GlobalStyles.js":
/*!****************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/theme/GlobalStyles.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GlobalStyles": () => (/* binding */ GlobalStyles)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js");



var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
function GlobalStyles({ theme }) {
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_emotion_react__WEBPACK_IMPORTED_MODULE_1__.Global, {
    styles: {
      "*, *::before, *::after": {
        boxSizing: "border-box"
      },
      html: {
        colorScheme: theme.colorScheme === "dark" ? "dark" : "light"
      },
      body: __spreadProps(__spreadValues({}, theme.fn.fontStyles()), {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        lineHeight: theme.lineHeight,
        fontSize: theme.fontSizes.md,
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale"
      })
    }
  });
}


//# sourceMappingURL=GlobalStyles.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/theme/MantineCssVariables.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/theme/MantineCssVariables.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MantineCssVariables": () => (/* binding */ MantineCssVariables)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js");



function assignSizeVariables(variables, sizes, name) {
  Object.keys(sizes).forEach((size) => {
    variables[`--mantine-${name}-${size}`] = typeof sizes[size] === "number" ? `${sizes[size]}px` : sizes[size];
  });
}
function MantineCssVariables({ theme }) {
  const variables = {
    "--mantine-color-white": theme.white,
    "--mantine-color-black": theme.black,
    "--mantine-transition-timing-function": theme.transitionTimingFunction,
    "--mantine-line-height": `${theme.lineHeight}`,
    "--mantine-font-family": theme.fontFamily,
    "--mantine-font-family-monospace": theme.fontFamilyMonospace,
    "--mantine-font-family-headings": theme.headings.fontFamily,
    "--mantine-heading-font-weight": `${theme.headings.fontWeight}`
  };
  assignSizeVariables(variables, theme.shadows, "shadow");
  assignSizeVariables(variables, theme.fontSizes, "font-size");
  assignSizeVariables(variables, theme.radius, "radius");
  assignSizeVariables(variables, theme.spacing, "spacing");
  Object.keys(theme.colors).forEach((color) => {
    theme.colors[color].forEach((shade, index) => {
      variables[`--mantine-color-${color}-${index}`] = shade;
    });
  });
  const headings = theme.headings.sizes;
  Object.keys(headings).forEach((heading) => {
    variables[`--mantine-${heading}-font-size`] = `${headings[heading].fontSize}px`;
    variables[`--mantine-${heading}-line-height`] = `${headings[heading].lineHeight}`;
  });
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_emotion_react__WEBPACK_IMPORTED_MODULE_1__.Global, {
    styles: {
      ":root": variables
    }
  });
}


//# sourceMappingURL=MantineCssVariables.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/theme/MantineProvider.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/theme/MantineProvider.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MantineProvider": () => (/* binding */ MantineProvider),
/* harmony export */   "useComponentDefaultProps": () => (/* binding */ useComponentDefaultProps),
/* harmony export */   "useMantineEmotionCache": () => (/* binding */ useMantineEmotionCache),
/* harmony export */   "useMantineProviderStyles": () => (/* binding */ useMantineProviderStyles),
/* harmony export */   "useMantineTheme": () => (/* binding */ useMantineTheme)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js");
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js");
/* harmony import */ var _default_theme_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./default-theme.js */ "./node_modules/@mantine/styles/esm/theme/default-theme.js");
/* harmony import */ var _GlobalStyles_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./GlobalStyles.js */ "./node_modules/@mantine/styles/esm/theme/GlobalStyles.js");
/* harmony import */ var _MantineCssVariables_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./MantineCssVariables.js */ "./node_modules/@mantine/styles/esm/theme/MantineCssVariables.js");
/* harmony import */ var _utils_merge_theme_merge_theme_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/merge-theme/merge-theme.js */ "./node_modules/@mantine/styles/esm/theme/utils/merge-theme/merge-theme.js");
/* harmony import */ var _utils_filter_props_filter_props_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/filter-props/filter-props.js */ "./node_modules/@mantine/styles/esm/theme/utils/filter-props/filter-props.js");
/* harmony import */ var _NormalizeCSS_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NormalizeCSS.js */ "./node_modules/@mantine/styles/esm/theme/NormalizeCSS.js");









var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const MantineProviderContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({
  theme: _default_theme_js__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_THEME
});
function useMantineTheme() {
  var _a;
  return ((_a = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(MantineProviderContext)) == null ? void 0 : _a.theme) || _default_theme_js__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_THEME;
}
function useMantineProviderStyles(component) {
  const theme = useMantineTheme();
  const getStyles = (name) => {
    var _a, _b;
    return {
      styles: ((_a = theme.components[name]) == null ? void 0 : _a.styles) || {},
      classNames: ((_b = theme.components[name]) == null ? void 0 : _b.classNames) || {}
    };
  };
  if (Array.isArray(component)) {
    return component.map(getStyles);
  }
  return [getStyles(component)];
}
function useMantineEmotionCache() {
  var _a;
  return (_a = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(MantineProviderContext)) == null ? void 0 : _a.emotionCache;
}
function useComponentDefaultProps(component, defaultProps, props) {
  var _a;
  const theme = useMantineTheme();
  const contextPropsPayload = (_a = theme.components[component]) == null ? void 0 : _a.defaultProps;
  const contextProps = typeof contextPropsPayload === "function" ? contextPropsPayload(theme) : contextPropsPayload;
  return __spreadValues(__spreadValues(__spreadValues({}, defaultProps), contextProps), (0,_utils_filter_props_filter_props_js__WEBPACK_IMPORTED_MODULE_2__.filterProps)(props));
}
function MantineProvider({
  theme,
  emotionCache,
  withNormalizeCSS = false,
  withGlobalStyles = false,
  withCSSVariables = false,
  inherit = false,
  children
}) {
  const ctx = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(MantineProviderContext);
  const mergedTheme = (0,_utils_merge_theme_merge_theme_js__WEBPACK_IMPORTED_MODULE_3__.mergeThemeWithFunctions)(_default_theme_js__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_THEME, inherit ? __spreadValues(__spreadValues({}, ctx.theme), theme) : theme);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_emotion_react__WEBPACK_IMPORTED_MODULE_4__.a, {
    theme: mergedTheme
  }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(MantineProviderContext.Provider, {
    value: { theme: mergedTheme, emotionCache }
  }, withNormalizeCSS && /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_NormalizeCSS_js__WEBPACK_IMPORTED_MODULE_5__.NormalizeCSS, null), withGlobalStyles && /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_GlobalStyles_js__WEBPACK_IMPORTED_MODULE_6__.GlobalStyles, {
    theme: mergedTheme
  }), withCSSVariables && /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_MantineCssVariables_js__WEBPACK_IMPORTED_MODULE_7__.MantineCssVariables, {
    theme: mergedTheme
  }), typeof mergedTheme.globalStyles === "function" && /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_emotion_react__WEBPACK_IMPORTED_MODULE_8__.Global, {
    styles: mergedTheme.globalStyles(mergedTheme)
  }), children));
}
MantineProvider.displayName = "@mantine/core/MantineProvider";


//# sourceMappingURL=MantineProvider.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/theme/NormalizeCSS.js":
/*!****************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/theme/NormalizeCSS.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NormalizeCSS": () => (/* binding */ NormalizeCSS)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/react */ "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js");



const styles = {
  html: {
    fontFamily: "sans-serif",
    lineHeight: "1.15",
    textSizeAdjust: "100%"
  },
  body: {
    margin: 0
  },
  "article, aside, footer, header, nav, section, figcaption, figure, main": {
    display: "block"
  },
  h1: {
    fontSize: "2em"
  },
  hr: {
    boxSizing: "content-box",
    height: 0,
    overflow: "visible"
  },
  pre: {
    fontFamily: "monospace, monospace",
    fontSize: "1em"
  },
  a: {
    background: "transparent",
    textDecorationSkip: "objects"
  },
  "a:active, a:hover": {
    outlineWidth: 0
  },
  "abbr[title]": {
    borderBottom: "none",
    textDecoration: "underline"
  },
  "b, strong": {
    fontWeight: "bolder"
  },
  "code, kbp, samp": {
    fontFamily: "monospace, monospace",
    fontSize: "1em"
  },
  dfn: {
    fontStyle: "italic"
  },
  mark: {
    backgroundColor: "#ff0",
    color: "#000"
  },
  small: {
    fontSize: "80%"
  },
  "sub, sup": {
    fontSize: "75%",
    lineHeight: 0,
    position: "relative",
    verticalAlign: "baseline"
  },
  sup: {
    top: "-0.5em"
  },
  sub: {
    bottom: "-0.25em"
  },
  "audio, video": {
    display: "inline-block"
  },
  "audio:not([controls])": {
    display: "none",
    height: 0
  },
  img: {
    borderStyle: "none",
    verticalAlign: "middle"
  },
  "svg:not(:root)": {
    overflow: "hidden"
  },
  "button, input, optgroup, select, textarea": {
    fontFamily: "sans-serif",
    fontSize: "100%",
    lineHeight: "1.15",
    margin: 0
  },
  "button, input": {
    overflow: "visible"
  },
  "button, select": {
    textTransform: "none"
  },
  "button, [type=reset], [type=submit]": {
    WebkitAppearance: "button"
  },
  "button::-moz-focus-inner, [type=button]::-moz-focus-inner, [type=reset]::-moz-focus-inner, [type=submit]::-moz-focus-inner": {
    borderStyle: "none",
    padding: 0
  },
  "button:-moz-focusring, [type=button]:-moz-focusring, [type=reset]:-moz-focusring, [type=submit]:-moz-focusring": {
    outline: "1px dotted ButtonText"
  },
  legend: {
    boxSizing: "border-box",
    color: "inherit",
    display: "table",
    maxWidth: "100%",
    padding: 0,
    whiteSpace: "normal"
  },
  progress: {
    display: "inline-block",
    verticalAlign: "baseline"
  },
  textarea: {
    overflow: "auto"
  },
  "[type=checkbox], [type=radio]": {
    boxSizing: "border-box",
    padding: 0
  },
  "[type=number]::-webkit-inner-spin-button, [type=number]::-webkit-outer-spin-button": {
    height: "auto"
  },
  "[type=search]": {
    appearance: "none"
  },
  "[type=search]::-webkit-search-cancel-button, [type=search]::-webkit-search-decoration": {
    appearance: "none"
  },
  "::-webkit-file-upload-button": {
    appearance: "button",
    font: "inherit"
  },
  "details, menu": {
    display: "block"
  },
  summary: {
    display: "list-item"
  },
  canvas: {
    display: "inline-block"
  },
  template: {
    display: "none"
  },
  "[hidden]": {
    display: "none"
  }
};
function NormalizeCSS() {
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_emotion_react__WEBPACK_IMPORTED_MODULE_1__.Global, {
    styles
  });
}


//# sourceMappingURL=NormalizeCSS.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/theme/default-colors.js":
/*!******************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/theme/default-colors.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_COLORS": () => (/* binding */ DEFAULT_COLORS)
/* harmony export */ });
const DEFAULT_COLORS = {
  dark: [
    "#C1C2C5",
    "#A6A7AB",
    "#909296",
    "#5c5f66",
    "#373A40",
    "#2C2E33",
    "#25262b",
    "#1A1B1E",
    "#141517",
    "#101113"
  ],
  gray: [
    "#f8f9fa",
    "#f1f3f5",
    "#e9ecef",
    "#dee2e6",
    "#ced4da",
    "#adb5bd",
    "#868e96",
    "#495057",
    "#343a40",
    "#212529"
  ],
  red: [
    "#fff5f5",
    "#ffe3e3",
    "#ffc9c9",
    "#ffa8a8",
    "#ff8787",
    "#ff6b6b",
    "#fa5252",
    "#f03e3e",
    "#e03131",
    "#c92a2a"
  ],
  pink: [
    "#fff0f6",
    "#ffdeeb",
    "#fcc2d7",
    "#faa2c1",
    "#f783ac",
    "#f06595",
    "#e64980",
    "#d6336c",
    "#c2255c",
    "#a61e4d"
  ],
  grape: [
    "#f8f0fc",
    "#f3d9fa",
    "#eebefa",
    "#e599f7",
    "#da77f2",
    "#cc5de8",
    "#be4bdb",
    "#ae3ec9",
    "#9c36b5",
    "#862e9c"
  ],
  violet: [
    "#f3f0ff",
    "#e5dbff",
    "#d0bfff",
    "#b197fc",
    "#9775fa",
    "#845ef7",
    "#7950f2",
    "#7048e8",
    "#6741d9",
    "#5f3dc4"
  ],
  indigo: [
    "#edf2ff",
    "#dbe4ff",
    "#bac8ff",
    "#91a7ff",
    "#748ffc",
    "#5c7cfa",
    "#4c6ef5",
    "#4263eb",
    "#3b5bdb",
    "#364fc7"
  ],
  blue: [
    "#e7f5ff",
    "#d0ebff",
    "#a5d8ff",
    "#74c0fc",
    "#4dabf7",
    "#339af0",
    "#228be6",
    "#1c7ed6",
    "#1971c2",
    "#1864ab"
  ],
  cyan: [
    "#e3fafc",
    "#c5f6fa",
    "#99e9f2",
    "#66d9e8",
    "#3bc9db",
    "#22b8cf",
    "#15aabf",
    "#1098ad",
    "#0c8599",
    "#0b7285"
  ],
  teal: [
    "#e6fcf5",
    "#c3fae8",
    "#96f2d7",
    "#63e6be",
    "#38d9a9",
    "#20c997",
    "#12b886",
    "#0ca678",
    "#099268",
    "#087f5b"
  ],
  green: [
    "#ebfbee",
    "#d3f9d8",
    "#b2f2bb",
    "#8ce99a",
    "#69db7c",
    "#51cf66",
    "#40c057",
    "#37b24d",
    "#2f9e44",
    "#2b8a3e"
  ],
  lime: [
    "#f4fce3",
    "#e9fac8",
    "#d8f5a2",
    "#c0eb75",
    "#a9e34b",
    "#94d82d",
    "#82c91e",
    "#74b816",
    "#66a80f",
    "#5c940d"
  ],
  yellow: [
    "#fff9db",
    "#fff3bf",
    "#ffec99",
    "#ffe066",
    "#ffd43b",
    "#fcc419",
    "#fab005",
    "#f59f00",
    "#f08c00",
    "#e67700"
  ],
  orange: [
    "#fff4e6",
    "#ffe8cc",
    "#ffd8a8",
    "#ffc078",
    "#ffa94d",
    "#ff922b",
    "#fd7e14",
    "#f76707",
    "#e8590c",
    "#d9480f"
  ]
};


//# sourceMappingURL=default-colors.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/theme/default-theme.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/theme/default-theme.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_THEME": () => (/* binding */ DEFAULT_THEME),
/* harmony export */   "MANTINE_COLORS": () => (/* binding */ MANTINE_COLORS),
/* harmony export */   "MANTINE_SIZES": () => (/* binding */ MANTINE_SIZES),
/* harmony export */   "_DEFAULT_THEME": () => (/* binding */ _DEFAULT_THEME)
/* harmony export */ });
/* harmony import */ var _default_colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./default-colors.js */ "./node_modules/@mantine/styles/esm/theme/default-colors.js");
/* harmony import */ var _functions_attach_functions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functions/attach-functions.js */ "./node_modules/@mantine/styles/esm/theme/functions/attach-functions.js");



const MANTINE_COLORS = Object.keys(_default_colors_js__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_COLORS);
const MANTINE_SIZES = ["xs", "sm", "md", "lg", "xl"];
const _DEFAULT_THEME = {
  dir: "ltr",
  primaryShade: {
    light: 6,
    dark: 8
  },
  focusRing: "auto",
  loader: "oval",
  dateFormat: "MMMM D, YYYY",
  colorScheme: "light",
  white: "#fff",
  black: "#000",
  defaultRadius: "sm",
  transitionTimingFunction: "ease",
  colors: _default_colors_js__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_COLORS,
  lineHeight: 1.55,
  fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
  fontFamilyMonospace: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
  primaryColor: "blue",
  respectReducedMotion: true,
  cursorType: "default",
  defaultGradient: {
    from: "indigo",
    to: "cyan",
    deg: 45
  },
  shadows: {
    xs: "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)",
    sm: "0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 10px 15px -5px, rgba(0, 0, 0, 0.04) 0px 7px 7px -5px",
    md: "0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
    lg: "0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 28px 23px -7px, rgba(0, 0, 0, 0.04) 0px 12px 12px -7px",
    xl: "0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 36px 28px -7px, rgba(0, 0, 0, 0.04) 0px 17px 17px -7px"
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20
  },
  radius: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 32
  },
  spacing: {
    xs: 10,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24
  },
  breakpoints: {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1400
  },
  headings: {
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
    fontWeight: 700,
    sizes: {
      h1: { fontSize: 34, lineHeight: 1.3, fontWeight: void 0 },
      h2: { fontSize: 26, lineHeight: 1.35, fontWeight: void 0 },
      h3: { fontSize: 22, lineHeight: 1.4, fontWeight: void 0 },
      h4: { fontSize: 18, lineHeight: 1.45, fontWeight: void 0 },
      h5: { fontSize: 16, lineHeight: 1.5, fontWeight: void 0 },
      h6: { fontSize: 14, lineHeight: 1.5, fontWeight: void 0 }
    }
  },
  other: {},
  components: {},
  activeStyles: { transform: "translateY(1px)" },
  datesLocale: "en",
  globalStyles: void 0,
  focusRingStyles: {
    styles: (theme) => ({
      outlineOffset: 2,
      outline: `2px solid ${theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 7 : 5]}`
    }),
    resetStyles: () => ({ outline: "none" }),
    inputStyles: (theme) => ({
      outline: "none",
      borderColor: theme.colors[theme.primaryColor][typeof theme.primaryShade === "object" ? theme.primaryShade[theme.colorScheme] : theme.primaryShade]
    })
  }
};
const DEFAULT_THEME = (0,_functions_attach_functions_js__WEBPACK_IMPORTED_MODULE_1__.attachFunctions)(_DEFAULT_THEME);


//# sourceMappingURL=default-theme.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/theme/functions/attach-functions.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/theme/functions/attach-functions.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "attachFunctions": () => (/* binding */ attachFunctions)
/* harmony export */ });
/* harmony import */ var _fns_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fns/index.js */ "./node_modules/@mantine/styles/esm/theme/functions/fns/index.js");


var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
function attachFunctions(themeBase) {
  return __spreadProps(__spreadValues({}, themeBase), {
    fn: {
      fontStyles: _fns_index_js__WEBPACK_IMPORTED_MODULE_0__.fns.fontStyles(themeBase),
      themeColor: _fns_index_js__WEBPACK_IMPORTED_MODULE_0__.fns.themeColor(themeBase),
      focusStyles: _fns_index_js__WEBPACK_IMPORTED_MODULE_0__.fns.focusStyles(themeBase),
      largerThan: _fns_index_js__WEBPACK_IMPORTED_MODULE_0__.fns.largerThan(themeBase),
      smallerThan: _fns_index_js__WEBPACK_IMPORTED_MODULE_0__.fns.smallerThan(themeBase),
      radialGradient: _fns_index_js__WEBPACK_IMPORTED_MODULE_0__.fns.radialGradient,
      linearGradient: _fns_index_js__WEBPACK_IMPORTED_MODULE_0__.fns.linearGradient,
      gradient: _fns_index_js__WEBPACK_IMPORTED_MODULE_0__.fns.gradient(themeBase),
      rgba: _fns_index_js__WEBPACK_IMPORTED_MODULE_0__.fns.rgba,
      size: _fns_index_js__WEBPACK_IMPORTED_MODULE_0__.fns.size,
      cover: _fns_index_js__WEBPACK_IMPORTED_MODULE_0__.fns.cover,
      lighten: _fns_index_js__WEBPACK_IMPORTED_MODULE_0__.fns.lighten,
      darken: _fns_index_js__WEBPACK_IMPORTED_MODULE_0__.fns.darken,
      primaryShade: _fns_index_js__WEBPACK_IMPORTED_MODULE_0__.fns.primaryShade(themeBase),
      radius: _fns_index_js__WEBPACK_IMPORTED_MODULE_0__.fns.radius(themeBase),
      variant: _fns_index_js__WEBPACK_IMPORTED_MODULE_0__.fns.variant(themeBase),
      hover: _fns_index_js__WEBPACK_IMPORTED_MODULE_0__.fns.hover,
      primaryColor: _fns_index_js__WEBPACK_IMPORTED_MODULE_0__.fns.primaryColor(themeBase),
      placeholderStyles: _fns_index_js__WEBPACK_IMPORTED_MODULE_0__.fns.placeholderStyles(themeBase)
    }
  });
}


//# sourceMappingURL=attach-functions.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/theme/functions/fns/breakpoints/breakpoints.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/theme/functions/fns/breakpoints/breakpoints.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "largerThan": () => (/* binding */ largerThan),
/* harmony export */   "smallerThan": () => (/* binding */ smallerThan)
/* harmony export */ });
/* harmony import */ var _size_size_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../size/size.js */ "./node_modules/@mantine/styles/esm/theme/functions/fns/size/size.js");


function largerThan(theme) {
  return (breakpoint) => `@media (min-width: ${(0,_size_size_js__WEBPACK_IMPORTED_MODULE_0__.size)({ size: breakpoint, sizes: theme.breakpoints })}px)`;
}
function smallerThan(theme) {
  return (breakpoint) => `@media (max-width: ${(0,_size_size_js__WEBPACK_IMPORTED_MODULE_0__.size)({ size: breakpoint, sizes: theme.breakpoints }) - 1}px)`;
}


//# sourceMappingURL=breakpoints.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/theme/functions/fns/cover/cover.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/theme/functions/fns/cover/cover.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cover": () => (/* binding */ cover)
/* harmony export */ });
function cover(offset = 0) {
  return {
    position: "absolute",
    top: offset,
    right: offset,
    left: offset,
    bottom: offset
  };
}


//# sourceMappingURL=cover.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/theme/functions/fns/darken/darken.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/theme/functions/fns/darken/darken.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "darken": () => (/* binding */ darken)
/* harmony export */ });
/* harmony import */ var _utils_to_rgba_to_rgba_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/to-rgba/to-rgba.js */ "./node_modules/@mantine/styles/esm/theme/utils/to-rgba/to-rgba.js");


function darken(color, alpha) {
  const { r, g, b, a } = (0,_utils_to_rgba_to_rgba_js__WEBPACK_IMPORTED_MODULE_0__.toRgba)(color);
  const f = 1 - alpha;
  const dark = (input) => Math.round(input * f);
  return `rgba(${dark(r)}, ${dark(g)}, ${dark(b)}, ${a})`;
}


//# sourceMappingURL=darken.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/theme/functions/fns/focus-styles/focus-styles.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/theme/functions/fns/focus-styles/focus-styles.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "focusStyles": () => (/* binding */ focusStyles)
/* harmony export */ });
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
function focusStyles(theme) {
  return (selector) => ({
    WebkitTapHighlightColor: "transparent",
    [selector || "&:focus"]: __spreadValues({}, theme.focusRing === "always" || theme.focusRing === "auto" ? theme.focusRingStyles.styles(theme) : theme.focusRingStyles.resetStyles(theme)),
    [selector ? selector.replace(":focus", ":focus:not(:focus-visible)") : "&:focus:not(:focus-visible)"]: __spreadValues({}, theme.focusRing === "auto" || theme.focusRing === "never" ? theme.focusRingStyles.resetStyles(theme) : null)
  });
}


//# sourceMappingURL=focus-styles.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/theme/functions/fns/font-styles/font-styles.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/theme/functions/fns/font-styles/font-styles.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fontStyles": () => (/* binding */ fontStyles)
/* harmony export */ });
function fontStyles(theme) {
  return () => ({ fontFamily: theme.fontFamily || "sans-serif" });
}


//# sourceMappingURL=font-styles.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/theme/functions/fns/gradient/get-gradient-color-stops/get-gradient-color-stops.js":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/theme/functions/fns/gradient/get-gradient-color-stops/get-gradient-color-stops.js ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getGradientColorStops": () => (/* binding */ getGradientColorStops)
/* harmony export */ });
function getGradientColorStops(colors) {
  let stops = "";
  for (let i = 1; i < colors.length - 1; i += 1) {
    stops += `${colors[i]} ${i / (colors.length - 1) * 100}%, `;
  }
  return `${colors[0]} 0%, ${stops}${colors[colors.length - 1]} 100%`;
}


//# sourceMappingURL=get-gradient-color-stops.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/theme/functions/fns/gradient/gradient.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/theme/functions/fns/gradient/gradient.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gradient": () => (/* binding */ gradient),
/* harmony export */   "linearGradient": () => (/* binding */ linearGradient),
/* harmony export */   "radialGradient": () => (/* binding */ radialGradient)
/* harmony export */ });
/* harmony import */ var _theme_color_theme_color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../theme-color/theme-color.js */ "./node_modules/@mantine/styles/esm/theme/functions/fns/theme-color/theme-color.js");
/* harmony import */ var _primary_shade_primary_shade_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../primary-shade/primary-shade.js */ "./node_modules/@mantine/styles/esm/theme/functions/fns/primary-shade/primary-shade.js");
/* harmony import */ var _get_gradient_color_stops_get_gradient_color_stops_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-gradient-color-stops/get-gradient-color-stops.js */ "./node_modules/@mantine/styles/esm/theme/functions/fns/gradient/get-gradient-color-stops/get-gradient-color-stops.js");




function linearGradient(deg, ...colors) {
  return `linear-gradient(${deg}deg, ${(0,_get_gradient_color_stops_get_gradient_color_stops_js__WEBPACK_IMPORTED_MODULE_0__.getGradientColorStops)(colors)})`;
}
function radialGradient(...colors) {
  return `radial-gradient(circle, ${(0,_get_gradient_color_stops_get_gradient_color_stops_js__WEBPACK_IMPORTED_MODULE_0__.getGradientColorStops)(colors)})`;
}
function gradient(theme) {
  const getThemeColor = (0,_theme_color_theme_color_js__WEBPACK_IMPORTED_MODULE_1__.themeColor)(theme);
  const getPrimaryShade = (0,_primary_shade_primary_shade_js__WEBPACK_IMPORTED_MODULE_2__.primaryShade)(theme);
  return (payload) => {
    const merged = {
      from: (payload == null ? void 0 : payload.from) || theme.defaultGradient.from,
      to: (payload == null ? void 0 : payload.to) || theme.defaultGradient.to,
      deg: (payload == null ? void 0 : payload.deg) || theme.defaultGradient.deg
    };
    return `linear-gradient(${merged.deg}deg, ${getThemeColor(merged.from, getPrimaryShade(), false)} 0%, ${getThemeColor(merged.to, getPrimaryShade(), false)} 100%)`;
  };
}


//# sourceMappingURL=gradient.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/theme/functions/fns/hover/hover.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/theme/functions/fns/hover/hover.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hover": () => (/* binding */ hover)
/* harmony export */ });
function hover(hoverStyle) {
  return {
    "@media (hover: hover)": {
      "&:hover": hoverStyle
    },
    "@media (hover: none)": {
      "&:active": hoverStyle
    }
  };
}


//# sourceMappingURL=hover.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/theme/functions/fns/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/theme/functions/fns/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fns": () => (/* binding */ fns)
/* harmony export */ });
/* harmony import */ var _font_styles_font_styles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./font-styles/font-styles.js */ "./node_modules/@mantine/styles/esm/theme/functions/fns/font-styles/font-styles.js");
/* harmony import */ var _focus_styles_focus_styles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./focus-styles/focus-styles.js */ "./node_modules/@mantine/styles/esm/theme/functions/fns/focus-styles/focus-styles.js");
/* harmony import */ var _theme_color_theme_color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./theme-color/theme-color.js */ "./node_modules/@mantine/styles/esm/theme/functions/fns/theme-color/theme-color.js");
/* harmony import */ var _gradient_gradient_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gradient/gradient.js */ "./node_modules/@mantine/styles/esm/theme/functions/fns/gradient/gradient.js");
/* harmony import */ var _breakpoints_breakpoints_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./breakpoints/breakpoints.js */ "./node_modules/@mantine/styles/esm/theme/functions/fns/breakpoints/breakpoints.js");
/* harmony import */ var _rgba_rgba_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rgba/rgba.js */ "./node_modules/@mantine/styles/esm/theme/functions/fns/rgba/rgba.js");
/* harmony import */ var _size_size_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./size/size.js */ "./node_modules/@mantine/styles/esm/theme/functions/fns/size/size.js");
/* harmony import */ var _cover_cover_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cover/cover.js */ "./node_modules/@mantine/styles/esm/theme/functions/fns/cover/cover.js");
/* harmony import */ var _darken_darken_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./darken/darken.js */ "./node_modules/@mantine/styles/esm/theme/functions/fns/darken/darken.js");
/* harmony import */ var _lighten_lighten_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lighten/lighten.js */ "./node_modules/@mantine/styles/esm/theme/functions/fns/lighten/lighten.js");
/* harmony import */ var _radius_radius_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./radius/radius.js */ "./node_modules/@mantine/styles/esm/theme/functions/fns/radius/radius.js");
/* harmony import */ var _variant_variant_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./variant/variant.js */ "./node_modules/@mantine/styles/esm/theme/functions/fns/variant/variant.js");
/* harmony import */ var _primary_shade_primary_shade_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./primary-shade/primary-shade.js */ "./node_modules/@mantine/styles/esm/theme/functions/fns/primary-shade/primary-shade.js");
/* harmony import */ var _primary_color_primary_color_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./primary-color/primary-color.js */ "./node_modules/@mantine/styles/esm/theme/functions/fns/primary-color/primary-color.js");
/* harmony import */ var _hover_hover_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./hover/hover.js */ "./node_modules/@mantine/styles/esm/theme/functions/fns/hover/hover.js");
/* harmony import */ var _placeholder_styles_placeholder_styles_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./placeholder-styles/placeholder-styles.js */ "./node_modules/@mantine/styles/esm/theme/functions/fns/placeholder-styles/placeholder-styles.js");

















const fns = {
  fontStyles: _font_styles_font_styles_js__WEBPACK_IMPORTED_MODULE_0__.fontStyles,
  themeColor: _theme_color_theme_color_js__WEBPACK_IMPORTED_MODULE_1__.themeColor,
  focusStyles: _focus_styles_focus_styles_js__WEBPACK_IMPORTED_MODULE_2__.focusStyles,
  linearGradient: _gradient_gradient_js__WEBPACK_IMPORTED_MODULE_3__.linearGradient,
  radialGradient: _gradient_gradient_js__WEBPACK_IMPORTED_MODULE_3__.radialGradient,
  smallerThan: _breakpoints_breakpoints_js__WEBPACK_IMPORTED_MODULE_4__.smallerThan,
  largerThan: _breakpoints_breakpoints_js__WEBPACK_IMPORTED_MODULE_4__.largerThan,
  rgba: _rgba_rgba_js__WEBPACK_IMPORTED_MODULE_5__.rgba,
  size: _size_size_js__WEBPACK_IMPORTED_MODULE_6__.size,
  cover: _cover_cover_js__WEBPACK_IMPORTED_MODULE_7__.cover,
  darken: _darken_darken_js__WEBPACK_IMPORTED_MODULE_8__.darken,
  lighten: _lighten_lighten_js__WEBPACK_IMPORTED_MODULE_9__.lighten,
  radius: _radius_radius_js__WEBPACK_IMPORTED_MODULE_10__.radius,
  variant: _variant_variant_js__WEBPACK_IMPORTED_MODULE_11__.variant,
  primaryShade: _primary_shade_primary_shade_js__WEBPACK_IMPORTED_MODULE_12__.primaryShade,
  hover: _hover_hover_js__WEBPACK_IMPORTED_MODULE_13__.hover,
  gradient: _gradient_gradient_js__WEBPACK_IMPORTED_MODULE_3__.gradient,
  primaryColor: _primary_color_primary_color_js__WEBPACK_IMPORTED_MODULE_14__.primaryColor,
  placeholderStyles: _placeholder_styles_placeholder_styles_js__WEBPACK_IMPORTED_MODULE_15__.placeholderStyles
};


//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/theme/functions/fns/lighten/lighten.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/theme/functions/fns/lighten/lighten.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lighten": () => (/* binding */ lighten)
/* harmony export */ });
/* harmony import */ var _utils_to_rgba_to_rgba_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/to-rgba/to-rgba.js */ "./node_modules/@mantine/styles/esm/theme/utils/to-rgba/to-rgba.js");


function lighten(color, alpha) {
  const { r, g, b, a } = (0,_utils_to_rgba_to_rgba_js__WEBPACK_IMPORTED_MODULE_0__.toRgba)(color);
  const light = (input) => Math.round(input + (255 - input) * alpha);
  return `rgba(${light(r)}, ${light(g)}, ${light(b)}, ${a})`;
}


//# sourceMappingURL=lighten.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/theme/functions/fns/placeholder-styles/placeholder-styles.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/theme/functions/fns/placeholder-styles/placeholder-styles.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "placeholderStyles": () => (/* binding */ placeholderStyles)
/* harmony export */ });
function placeholderStyles(theme) {
  return () => ({
    userSelect: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[5]
  });
}


//# sourceMappingURL=placeholder-styles.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/theme/functions/fns/primary-color/primary-color.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/theme/functions/fns/primary-color/primary-color.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "primaryColor": () => (/* binding */ primaryColor)
/* harmony export */ });
/* harmony import */ var _primary_shade_primary_shade_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../primary-shade/primary-shade.js */ "./node_modules/@mantine/styles/esm/theme/functions/fns/primary-shade/primary-shade.js");


function primaryColor(theme) {
  return (colorScheme) => {
    const shade = (0,_primary_shade_primary_shade_js__WEBPACK_IMPORTED_MODULE_0__.primaryShade)(theme)(colorScheme);
    return theme.colors[theme.primaryColor][shade];
  };
}


//# sourceMappingURL=primary-color.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/theme/functions/fns/primary-shade/primary-shade.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/theme/functions/fns/primary-shade/primary-shade.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "primaryShade": () => (/* binding */ primaryShade)
/* harmony export */ });
function primaryShade(theme) {
  return (colorScheme) => {
    if (typeof theme.primaryShade === "number") {
      return theme.primaryShade;
    }
    return theme.primaryShade[colorScheme || theme.colorScheme];
  };
}


//# sourceMappingURL=primary-shade.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/theme/functions/fns/radius/radius.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/theme/functions/fns/radius/radius.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "radius": () => (/* binding */ radius)
/* harmony export */ });
function radius(theme) {
  return (size) => {
    if (typeof size === "number") {
      return size;
    }
    const defaultRadius = typeof theme.defaultRadius === "number" ? theme.defaultRadius : theme.radius[theme.defaultRadius] || theme.defaultRadius;
    return theme.radius[size] || size || defaultRadius;
  };
}


//# sourceMappingURL=radius.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/theme/functions/fns/rgba/rgba.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/theme/functions/fns/rgba/rgba.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "rgba": () => (/* binding */ rgba)
/* harmony export */ });
/* harmony import */ var _utils_to_rgba_to_rgba_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/to-rgba/to-rgba.js */ "./node_modules/@mantine/styles/esm/theme/utils/to-rgba/to-rgba.js");


function rgba(color, alpha) {
  if (typeof color !== "string" || alpha > 1 || alpha < 0) {
    return "rgba(0, 0, 0, 1)";
  }
  const { r, g, b } = (0,_utils_to_rgba_to_rgba_js__WEBPACK_IMPORTED_MODULE_0__.toRgba)(color);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}


//# sourceMappingURL=rgba.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/theme/functions/fns/size/size.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/theme/functions/fns/size/size.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "size": () => (/* binding */ size)
/* harmony export */ });
function size(props) {
  if (typeof props.size === "number") {
    return props.size;
  }
  const computedSize = props.sizes[props.size];
  return computedSize !== void 0 ? computedSize : props.size || props.sizes.md;
}


//# sourceMappingURL=size.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/theme/functions/fns/theme-color/theme-color.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/theme/functions/fns/theme-color/theme-color.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "themeColor": () => (/* binding */ themeColor)
/* harmony export */ });
/* harmony import */ var _primary_shade_primary_shade_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../primary-shade/primary-shade.js */ "./node_modules/@mantine/styles/esm/theme/functions/fns/primary-shade/primary-shade.js");


function themeColor(theme) {
  const getPrimaryShade = (0,_primary_shade_primary_shade_js__WEBPACK_IMPORTED_MODULE_0__.primaryShade)(theme);
  return (color, shade, primaryFallback = true, useSplittedShade = true) => {
    if (typeof color === "string" && color.includes(".")) {
      const [splitterColor, _splittedShade] = color.split(".");
      const splittedShade = parseInt(_splittedShade, 10);
      if (splitterColor in theme.colors && splittedShade >= 0 && splittedShade < 10) {
        return theme.colors[splitterColor][typeof shade === "number" && !useSplittedShade ? shade : splittedShade];
      }
    }
    const _shade = typeof shade === "number" ? shade : getPrimaryShade();
    return color in theme.colors ? theme.colors[color][_shade] : primaryFallback ? theme.colors[theme.primaryColor][_shade] : color;
  };
}


//# sourceMappingURL=theme-color.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/theme/functions/fns/variant/variant.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/theme/functions/fns/variant/variant.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "variant": () => (/* binding */ variant)
/* harmony export */ });
/* harmony import */ var _rgba_rgba_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../rgba/rgba.js */ "./node_modules/@mantine/styles/esm/theme/functions/fns/rgba/rgba.js");
/* harmony import */ var _theme_color_theme_color_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../theme-color/theme-color.js */ "./node_modules/@mantine/styles/esm/theme/functions/fns/theme-color/theme-color.js");
/* harmony import */ var _primary_shade_primary_shade_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../primary-shade/primary-shade.js */ "./node_modules/@mantine/styles/esm/theme/functions/fns/primary-shade/primary-shade.js");
/* harmony import */ var _gradient_gradient_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../gradient/gradient.js */ "./node_modules/@mantine/styles/esm/theme/functions/fns/gradient/gradient.js");





function getColorIndexInfo(color, theme) {
  if (typeof color === "string" && color.includes(".")) {
    const [splittedColor, _splittedShade] = color.split(".");
    const splittedShade = parseInt(_splittedShade, 10);
    if (splittedColor in theme.colors && splittedShade >= 0 && splittedShade < 10) {
      return { isSplittedColor: true, key: splittedColor, shade: splittedShade };
    }
  }
  return { isSplittedColor: false };
}
function variant(theme) {
  const getThemeColor = (0,_theme_color_theme_color_js__WEBPACK_IMPORTED_MODULE_0__.themeColor)(theme);
  const getPrimaryShade = (0,_primary_shade_primary_shade_js__WEBPACK_IMPORTED_MODULE_1__.primaryShade)(theme);
  const getGradient = (0,_gradient_gradient_js__WEBPACK_IMPORTED_MODULE_2__.gradient)(theme);
  return ({ variant: variant2, color, gradient: gradient2, primaryFallback }) => {
    const colorInfo = getColorIndexInfo(color, theme);
    switch (variant2) {
      case "light": {
        return {
          border: "transparent",
          background: (0,_rgba_rgba_js__WEBPACK_IMPORTED_MODULE_3__.rgba)(getThemeColor(color, theme.colorScheme === "dark" ? 8 : 0, primaryFallback, false), theme.colorScheme === "dark" ? 0.2 : 1),
          color: color === "dark" ? theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.dark[9] : getThemeColor(color, theme.colorScheme === "dark" ? 2 : getPrimaryShade("light")),
          hover: (0,_rgba_rgba_js__WEBPACK_IMPORTED_MODULE_3__.rgba)(getThemeColor(color, theme.colorScheme === "dark" ? 7 : 1, primaryFallback, false), theme.colorScheme === "dark" ? 0.25 : 0.65)
        };
      }
      case "subtle": {
        return {
          border: "transparent",
          background: "transparent",
          color: color === "dark" ? theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.dark[9] : getThemeColor(color, theme.colorScheme === "dark" ? 2 : getPrimaryShade("light")),
          hover: (0,_rgba_rgba_js__WEBPACK_IMPORTED_MODULE_3__.rgba)(getThemeColor(color, theme.colorScheme === "dark" ? 8 : 0, primaryFallback, false), theme.colorScheme === "dark" ? 0.2 : 1)
        };
      }
      case "outline": {
        return {
          border: getThemeColor(color, theme.colorScheme === "dark" ? 5 : getPrimaryShade("light")),
          background: "transparent",
          color: getThemeColor(color, theme.colorScheme === "dark" ? 5 : getPrimaryShade("light")),
          hover: theme.colorScheme === "dark" ? (0,_rgba_rgba_js__WEBPACK_IMPORTED_MODULE_3__.rgba)(getThemeColor(color, 5, primaryFallback, false), 0.05) : (0,_rgba_rgba_js__WEBPACK_IMPORTED_MODULE_3__.rgba)(getThemeColor(color, 0, primaryFallback, false), 0.35)
        };
      }
      case "default": {
        return {
          border: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4],
          background: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
          hover: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[0]
        };
      }
      case "white": {
        return {
          border: "transparent",
          background: theme.white,
          color: getThemeColor(color, getPrimaryShade()),
          hover: null
        };
      }
      case "transparent": {
        return {
          border: "transparent",
          color: color === "dark" ? theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.dark[9] : getThemeColor(color, theme.colorScheme === "dark" ? 2 : getPrimaryShade("light")),
          background: "transparent",
          hover: null
        };
      }
      case "gradient": {
        return {
          background: getGradient(gradient2),
          color: theme.white,
          border: "transparent",
          hover: null
        };
      }
      default: {
        const _primaryShade = getPrimaryShade();
        const _shade = colorInfo.isSplittedColor ? colorInfo.shade : _primaryShade;
        const _color = colorInfo.isSplittedColor ? colorInfo.key : color;
        return {
          border: "transparent",
          background: getThemeColor(_color, _shade, primaryFallback),
          color: theme.white,
          hover: getThemeColor(_color, _shade === 9 ? 8 : _shade + 1)
        };
      }
    }
  };
}


//# sourceMappingURL=variant.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/theme/utils/filter-props/filter-props.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/theme/utils/filter-props/filter-props.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "filterProps": () => (/* binding */ filterProps)
/* harmony export */ });
function filterProps(props) {
  return Object.keys(props).reduce((acc, key) => {
    if (props[key] !== void 0) {
      acc[key] = props[key];
    }
    return acc;
  }, {});
}


//# sourceMappingURL=filter-props.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/theme/utils/get-default-z-index/get-default-z-index.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/theme/utils/get-default-z-index/get-default-z-index.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDefaultZIndex": () => (/* binding */ getDefaultZIndex)
/* harmony export */ });
const elevations = {
  app: 100,
  modal: 200,
  popover: 300,
  overlay: 400,
  max: 9999
};
function getDefaultZIndex(level) {
  return elevations[level];
}


//# sourceMappingURL=get-default-z-index.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/theme/utils/merge-theme/merge-theme.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/theme/utils/merge-theme/merge-theme.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mergeTheme": () => (/* binding */ mergeTheme),
/* harmony export */   "mergeThemeWithFunctions": () => (/* binding */ mergeThemeWithFunctions)
/* harmony export */ });
/* harmony import */ var _functions_attach_functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../functions/attach-functions.js */ "./node_modules/@mantine/styles/esm/theme/functions/attach-functions.js");


var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
function mergeTheme(currentTheme, themeOverride) {
  if (!themeOverride) {
    return currentTheme;
  }
  const result = Object.keys(currentTheme).reduce((acc, key) => {
    if (key === "headings" && themeOverride.headings) {
      const sizes = themeOverride.headings.sizes ? Object.keys(currentTheme.headings.sizes).reduce((headingsAcc, h) => {
        headingsAcc[h] = __spreadValues(__spreadValues({}, currentTheme.headings.sizes[h]), themeOverride.headings.sizes[h]);
        return headingsAcc;
      }, {}) : currentTheme.headings.sizes;
      return __spreadProps(__spreadValues({}, acc), {
        headings: __spreadProps(__spreadValues(__spreadValues({}, currentTheme.headings), themeOverride.headings), {
          sizes
        })
      });
    }
    acc[key] = typeof themeOverride[key] === "object" ? __spreadValues(__spreadValues({}, currentTheme[key]), themeOverride[key]) : typeof themeOverride[key] === "number" || typeof themeOverride[key] === "boolean" || typeof themeOverride[key] === "function" ? themeOverride[key] : themeOverride[key] || currentTheme[key];
    return acc;
  }, {});
  if (!(result.primaryColor in result.colors)) {
    throw new Error("MantineProvider: Invalid theme.primaryColor, it accepts only key of theme.colors, learn more \u2013 https://mantine.dev/theming/colors/#primary-color");
  }
  return result;
}
function mergeThemeWithFunctions(currentTheme, themeOverride) {
  return (0,_functions_attach_functions_js__WEBPACK_IMPORTED_MODULE_0__.attachFunctions)(mergeTheme(currentTheme, themeOverride));
}


//# sourceMappingURL=merge-theme.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/theme/utils/to-rgba/to-rgba.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/theme/utils/to-rgba/to-rgba.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toRgba": () => (/* binding */ toRgba)
/* harmony export */ });
function isHexColor(hex) {
  const HEX_REGEXP = /^#?([0-9A-F]{3}){1,2}$/i;
  return HEX_REGEXP.test(hex);
}
function hexToRgba(color) {
  let hexString = color.replace("#", "");
  if (hexString.length === 3) {
    const shorthandHex = hexString.split("");
    hexString = [
      shorthandHex[0],
      shorthandHex[0],
      shorthandHex[1],
      shorthandHex[1],
      shorthandHex[2],
      shorthandHex[2]
    ].join("");
  }
  const parsed = parseInt(hexString, 16);
  const r = parsed >> 16 & 255;
  const g = parsed >> 8 & 255;
  const b = parsed & 255;
  return {
    r,
    g,
    b,
    a: 1
  };
}
function rgbStringToRgba(color) {
  const [r, g, b, a] = color.replace(/[^0-9,.]/g, "").split(",").map(Number);
  return { r, g, b, a: a || 1 };
}
function toRgba(color) {
  if (isHexColor(color)) {
    return hexToRgba(color);
  }
  if (color.startsWith("rgb")) {
    return rgbStringToRgba(color);
  }
  return {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  };
}


//# sourceMappingURL=to-rgba.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/tss/create-styles.js":
/*!***************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/tss/create-styles.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createStyles": () => (/* binding */ createStyles)
/* harmony export */ });
/* harmony import */ var _use_css_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-css.js */ "./node_modules/@mantine/styles/esm/tss/use-css.js");
/* harmony import */ var _theme_MantineProvider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../theme/MantineProvider.js */ "./node_modules/@mantine/styles/esm/theme/MantineProvider.js");
/* harmony import */ var _utils_merge_class_names_merge_class_names_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/merge-class-names/merge-class-names.js */ "./node_modules/@mantine/styles/esm/tss/utils/merge-class-names/merge-class-names.js");




var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
function createRef(refName) {
  return `__mantine-ref-${refName || ""}`;
}
function getStyles(styles, theme, params) {
  const extractStyles = (stylesPartial) => typeof stylesPartial === "function" ? stylesPartial(theme, params || {}) : stylesPartial || {};
  if (Array.isArray(styles)) {
    return styles.map((item) => extractStyles(item.styles)).reduce((acc, item) => {
      Object.keys(item).forEach((key) => {
        if (!acc[key]) {
          acc[key] = __spreadValues({}, item[key]);
        } else {
          acc[key] = __spreadValues(__spreadValues({}, acc[key]), item[key]);
        }
      });
      return acc;
    }, {});
  }
  return extractStyles(styles);
}
function createStyles(input) {
  const getCssObject = typeof input === "function" ? input : () => input;
  function useStyles(params, options) {
    const theme = (0,_theme_MantineProvider_js__WEBPACK_IMPORTED_MODULE_0__.useMantineTheme)();
    const context = (0,_theme_MantineProvider_js__WEBPACK_IMPORTED_MODULE_0__.useMantineProviderStyles)(options == null ? void 0 : options.name);
    const cache = (0,_theme_MantineProvider_js__WEBPACK_IMPORTED_MODULE_0__.useMantineEmotionCache)();
    const { css, cx } = (0,_use_css_js__WEBPACK_IMPORTED_MODULE_1__.useCss)();
    const cssObject = getCssObject(theme, params, createRef);
    const componentStyles = getStyles(options == null ? void 0 : options.styles, theme, params);
    const providerStyles = getStyles(context, theme, params);
    const classes = Object.fromEntries(Object.keys(cssObject).map((key) => {
      const mergedStyles = cx({ [css(cssObject[key])]: !(options == null ? void 0 : options.unstyled) }, css(providerStyles[key]), css(componentStyles[key]));
      return [key, mergedStyles];
    }));
    return {
      classes: (0,_utils_merge_class_names_merge_class_names_js__WEBPACK_IMPORTED_MODULE_2__.mergeClassNames)({
        cx,
        classes,
        context,
        classNames: options == null ? void 0 : options.classNames,
        name: options == null ? void 0 : options.name,
        cache
      }),
      cx,
      theme
    };
  }
  return useStyles;
}


//# sourceMappingURL=create-styles.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/tss/default-emotion-cache.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/tss/default-emotion-cache.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultMantineEmotionCache": () => (/* binding */ defaultMantineEmotionCache)
/* harmony export */ });
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js");


const defaultMantineEmotionCache = (0,_emotion_cache__WEBPACK_IMPORTED_MODULE_0__["default"])({ key: "mantine", prepend: true });


//# sourceMappingURL=default-emotion-cache.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/tss/use-css.js":
/*!*********************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/tss/use-css.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cssFactory": () => (/* binding */ cssFactory),
/* harmony export */   "useCss": () => (/* binding */ useCss)
/* harmony export */ });
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js");
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js");
/* harmony import */ var _utils_use_guaranteed_memo_use_guaranteed_memo_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/use-guaranteed-memo/use-guaranteed-memo.js */ "./node_modules/@mantine/styles/esm/tss/utils/use-guaranteed-memo/use-guaranteed-memo.js");
/* harmony import */ var _use_emotion_cache_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./use-emotion-cache.js */ "./node_modules/@mantine/styles/esm/tss/use-emotion-cache.js");






var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const refPropertyName = "ref";
function getRef(args) {
  let ref;
  if (args.length !== 1) {
    return { args, ref };
  }
  const [arg] = args;
  if (!(arg instanceof Object)) {
    return { args, ref };
  }
  if (!(refPropertyName in arg)) {
    return { args, ref };
  }
  ref = arg[refPropertyName];
  const argCopy = __spreadValues({}, arg);
  delete argCopy[refPropertyName];
  return { args: [argCopy], ref };
}
const { cssFactory } = (() => {
  function merge(registered, css, className) {
    const registeredStyles = [];
    const rawClassName = (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_2__.getRegisteredStyles)(registered, registeredStyles, className);
    if (registeredStyles.length < 2) {
      return className;
    }
    return rawClassName + css(registeredStyles);
  }
  function _cssFactory(params) {
    const { cache } = params;
    const css = (...styles) => {
      const { ref, args } = getRef(styles);
      const serialized = (0,_emotion_serialize__WEBPACK_IMPORTED_MODULE_1__.serializeStyles)(args, cache.registered);
      (0,_emotion_utils__WEBPACK_IMPORTED_MODULE_2__.insertStyles)(cache, serialized, false);
      return `${cache.key}-${serialized.name}${ref === void 0 ? "" : ` ${ref}`}`;
    };
    const cx = (...args) => merge(cache.registered, css, (0,clsx__WEBPACK_IMPORTED_MODULE_0__["default"])(args));
    return { css, cx };
  }
  return { cssFactory: _cssFactory };
})();
function useCss() {
  const cache = (0,_use_emotion_cache_js__WEBPACK_IMPORTED_MODULE_3__.useEmotionCache)();
  return (0,_utils_use_guaranteed_memo_use_guaranteed_memo_js__WEBPACK_IMPORTED_MODULE_4__.useGuaranteedMemo)(() => cssFactory({ cache }), [cache]);
}


//# sourceMappingURL=use-css.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/tss/use-emotion-cache.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/tss/use-emotion-cache.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useEmotionCache": () => (/* binding */ useEmotionCache)
/* harmony export */ });
/* harmony import */ var _default_emotion_cache_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./default-emotion-cache.js */ "./node_modules/@mantine/styles/esm/tss/default-emotion-cache.js");
/* harmony import */ var _theme_MantineProvider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../theme/MantineProvider.js */ "./node_modules/@mantine/styles/esm/theme/MantineProvider.js");



function useEmotionCache() {
  const cache = (0,_theme_MantineProvider_js__WEBPACK_IMPORTED_MODULE_0__.useMantineEmotionCache)();
  return cache || _default_emotion_cache_js__WEBPACK_IMPORTED_MODULE_1__.defaultMantineEmotionCache;
}


//# sourceMappingURL=use-emotion-cache.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/tss/utils/merge-class-names/merge-class-names.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/tss/utils/merge-class-names/merge-class-names.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mergeClassNames": () => (/* binding */ mergeClassNames)
/* harmony export */ });
function mergeClassNames({
  cx,
  classes,
  context,
  classNames,
  name,
  cache
}) {
  const contextClassNames = context.reduce((acc, item) => {
    Object.keys(item.classNames).forEach((key) => {
      if (typeof acc[key] !== "string") {
        acc[key] = `${item.classNames[key]}`;
      } else {
        acc[key] = `${acc[key]} ${item.classNames[key]}`;
      }
    });
    return acc;
  }, {});
  return Object.keys(classes).reduce((acc, className) => {
    acc[className] = cx(classes[className], contextClassNames[className], classNames != null && classNames[className], Array.isArray(name) ? name.filter(Boolean).map((part) => `${(cache == null ? void 0 : cache.key) || "mantine"}-${part}-${className}`).join(" ") : name ? `${(cache == null ? void 0 : cache.key) || "mantine"}-${name}-${className}` : null);
    return acc;
  }, {});
}


//# sourceMappingURL=merge-class-names.js.map


/***/ }),

/***/ "./node_modules/@mantine/styles/esm/tss/utils/use-guaranteed-memo/use-guaranteed-memo.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@mantine/styles/esm/tss/utils/use-guaranteed-memo/use-guaranteed-memo.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useGuaranteedMemo": () => (/* binding */ useGuaranteedMemo)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function useGuaranteedMemo(fn, deps) {
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  if (!ref.current || deps.length !== ref.current.prevDeps.length || ref.current.prevDeps.map((v, i) => v === deps[i]).indexOf(false) >= 0) {
    ref.current = {
      v: fn(),
      prevDeps: [...deps]
    };
  }
  return ref.current.v;
}


//# sourceMappingURL=use-guaranteed-memo.js.map


/***/ }),

/***/ "./node_modules/@mantine/utils/esm/create-polymorphic-component/create-polymorphic-component.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@mantine/utils/esm/create-polymorphic-component/create-polymorphic-component.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPolymorphicComponent": () => (/* binding */ createPolymorphicComponent)
/* harmony export */ });
function createPolymorphicComponent(component) {
  return component;
}


//# sourceMappingURL=create-polymorphic-component.js.map


/***/ }),

/***/ "./node_modules/@mantine/utils/esm/create-use-external-events/create-use-external-events.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@mantine/utils/esm/create-use-external-events/create-use-external-events.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createUseExternalEvents": () => (/* binding */ createUseExternalEvents)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function dispatchEvent(type, detail) {
  window.dispatchEvent(new CustomEvent(type, { detail }));
}
const useIsomorphicEffect = typeof window !== "undefined" ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;
function createUseExternalEvents(prefix) {
  function _useExternalEvents(events) {
    const handlers = Object.keys(events).reduce((acc, eventKey) => {
      acc[`${prefix}:${eventKey}`] = (event) => events[eventKey](event.detail);
      return acc;
    }, {});
    useIsomorphicEffect(() => {
      Object.keys(handlers).forEach((eventKey) => {
        window.removeEventListener(eventKey, handlers[eventKey]);
        window.addEventListener(eventKey, handlers[eventKey]);
      });
      return () => Object.keys(handlers).forEach((eventKey) => {
        window.removeEventListener(eventKey, handlers[eventKey]);
      });
    }, [handlers]);
  }
  function createEvent(event) {
    return (...payload) => dispatchEvent(`${prefix}:${String(event)}`, payload[0]);
  }
  return [_useExternalEvents, createEvent];
}


//# sourceMappingURL=create-use-external-events.js.map


/***/ }),

/***/ "./src/comps/_layout/logo.svg":
/*!************************************!*\
  !*** ./src/comps/_layout/logo.svg ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReactComponent": () => (/* binding */ SvgLogo),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _style, _path, _circle;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SvgLogo = function SvgLogo(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    id: "logo_svg__Layer_1",
    xmlns: "http://www.w3.org/2000/svg",
    x: 0,
    y: 0,
    viewBox: "0 0 490.6 436.9",
    style: {
      enableBackground: "new 0 0 490.6 436.9"
    },
    xmlSpace: "preserve"
  }, props), _style || (_style = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("style", null, ".logo_svg__st0{fill:#fff}")), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "currentcolor",
    className: "logo_svg__st0",
    d: "M490.6 218.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V0c-27.5 0-63.5 19.6-99.9 53.6C208.7 19.8 172.7.4 145.2.4v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1C40.5 155.4 0 186.1 0 218.5c0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM245.5 352c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24s9.5 15.8 14.4 23.4zM245 85c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zM80.5 269.1c-35.4-15.1-58.3-34.9-58.3-50.6s22.9-35.6 58.3-50.6c8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM134.3 412c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6z"
  })), _circle || (_circle = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", {
    fill: "currentcolor",
    className: "logo_svg__st0",
    cx: 245.2,
    cy: 218.5,
    r: 45.7
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjAiIHk9IjAiIHZpZXdCb3g9IjAgMCA0OTAuNiA0MzYuOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDkwLjYgNDM2LjkiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogICAgPHN0eWxlPgogICAgICAgIC8qIC5zdDB7ZmlsbDojRTBFN0ZGfSAqLwogICAgICAgIC5zdDB7ZmlsbDojRkZGRkZGfQogICAgPC9zdHlsZT4KCiAgICA8cGF0aCBmaWxsPSJjdXJyZW50Y29sb3IiIGNsYXNzPSJzdDAiIGQ9Ik00OTAuNiAyMTguNWMwLTMyLjUtNDAuNy02My4zLTEwMy4xLTgyLjQgMTQuNC02My42IDgtMTE0LjItMjAuMi0xMzAuNC02LjUtMy44LTE0LjEtNS42LTIyLjQtNS42djIyLjNjNC42IDAgOC4zLjkgMTEuNCAyLjYgMTMuNiA3LjggMTkuNSAzNy41IDE0LjkgNzUuNy0xLjEgOS40LTIuOSAxOS4zLTUuMSAyOS40LTE5LjYtNC44LTQxLTguNS02My41LTEwLjktMTMuNS0xOC41LTI3LjUtMzUuMy00MS42LTUwIDMyLjYtMzAuMyA2My4yLTQ2LjkgODQtNDYuOVYwYy0yNy41IDAtNjMuNSAxOS42LTk5LjkgNTMuNkMyMDguNyAxOS44IDE3Mi43LjQgMTQ1LjIuNHYyMi4zYzIwLjcgMCA1MS40IDE2LjUgODQgNDYuNi0xNCAxNC43LTI4IDMxLjQtNDEuMyA0OS45LTIyLjYgMi40LTQ0IDYuMS02My42IDExLTIuMy0xMC00LTE5LjctNS4yLTI5LTQuNy0zOC4yIDEuMS02Ny45IDE0LjYtNzUuOCAzLTEuOCA2LjktMi42IDExLjUtMi42Vi41Yy04LjQgMC0xNiAxLjgtMjIuNiA1LjYtMjguMSAxNi4yLTM0LjQgNjYuNy0xOS45IDEzMC4xQzQwLjUgMTU1LjQgMCAxODYuMSAwIDIxOC41YzAgMzIuNSA0MC43IDYzLjMgMTAzLjEgODIuNC0xNC40IDYzLjYtOCAxMTQuMiAyMC4yIDEzMC40IDYuNSAzLjggMTQuMSA1LjYgMjIuNSA1LjYgMjcuNSAwIDYzLjUtMTkuNiA5OS45LTUzLjYgMzYuNCAzMy44IDcyLjQgNTMuMiA5OS45IDUzLjIgOC40IDAgMTYtMS44IDIyLjYtNS42IDI4LjEtMTYuMiAzNC40LTY2LjcgMTkuOS0xMzAuMSA2Mi0xOS4xIDEwMi41LTQ5LjkgMTAyLjUtODIuM3ptLTEzMC4yLTY2LjdjLTMuNyAxMi45LTguMyAyNi4yLTEzLjUgMzkuNS00LjEtOC04LjQtMTYtMTMuMS0yNC00LjYtOC05LjUtMTUuOC0xNC40LTIzLjQgMTQuMiAyLjEgMjcuOSA0LjcgNDEgNy45em0tNDUuOCAxMDYuNWMtNy44IDEzLjUtMTUuOCAyNi4zLTI0LjEgMzguMi0xNC45IDEuMy0zMCAyLTQ1LjIgMi0xNS4xIDAtMzAuMi0uNy00NS0xLjktOC4zLTExLjktMTYuNC0yNC42LTI0LjItMzgtNy42LTEzLjEtMTQuNS0yNi40LTIwLjgtMzkuOCA2LjItMTMuNCAxMy4yLTI2LjggMjAuNy0zOS45IDcuOC0xMy41IDE1LjgtMjYuMyAyNC4xLTM4LjIgMTQuOS0xLjMgMzAtMiA0NS4yLTIgMTUuMSAwIDMwLjIuNyA0NSAxLjkgOC4zIDExLjkgMTYuNCAyNC42IDI0LjIgMzggNy42IDEzLjEgMTQuNSAyNi40IDIwLjggMzkuOC02LjMgMTMuNC0xMy4yIDI2LjgtMjAuNyAzOS45em0zMi4zLTEzYzUuNCAxMy40IDEwIDI2LjggMTMuOCAzOS44LTEzLjEgMy4yLTI2LjkgNS45LTQxLjIgOCA0LjktNy43IDkuOC0xNS42IDE0LjQtMjMuNyA0LjYtOCA4LjktMTYuMSAxMy0yNC4xek0yNDUuNSAzNTJjLTkuMy05LjYtMTguNi0yMC4zLTI3LjgtMzIgOSAuNCAxOC4yLjcgMjcuNS43IDkuNCAwIDE4LjctLjIgMjcuOC0uNy05IDExLjctMTguMyAyMi40LTI3LjUgMzJ6bS03NC40LTU4LjljLTE0LjItMi4xLTI3LjktNC43LTQxLTcuOSAzLjctMTIuOSA4LjMtMjYuMiAxMy41LTM5LjUgNC4xIDggOC40IDE2IDEzLjEgMjRzOS41IDE1LjggMTQuNCAyMy40ek0yNDUgODVjOS4zIDkuNiAxOC42IDIwLjMgMjcuOCAzMi05LS40LTE4LjItLjctMjcuNS0uNy05LjQgMC0xOC43LjItMjcuOC43IDktMTEuNyAxOC4zLTIyLjQgMjcuNS0zMnptLTc0IDU4LjljLTQuOSA3LjctOS44IDE1LjYtMTQuNCAyMy43LTQuNiA4LTguOSAxNi0xMyAyNC01LjQtMTMuNC0xMC0yNi44LTEzLjgtMzkuOCAxMy4xLTMuMSAyNi45LTUuOCA0MS4yLTcuOXpNODAuNSAyNjkuMWMtMzUuNC0xNS4xLTU4LjMtMzQuOS01OC4zLTUwLjZzMjIuOS0zNS42IDU4LjMtNTAuNmM4LjYtMy43IDE4LTcgMjcuNy0xMC4xIDUuNyAxOS42IDEzLjIgNDAgMjIuNSA2MC45LTkuMiAyMC44LTE2LjYgNDEuMS0yMi4yIDYwLjYtOS45LTMuMS0xOS4zLTYuNS0yOC0xMC4yek0xMzQuMyA0MTJjLTEzLjYtNy44LTE5LjUtMzcuNS0xNC45LTc1LjcgMS4xLTkuNCAyLjktMTkuMyA1LjEtMjkuNCAxOS42IDQuOCA0MSA4LjUgNjMuNSAxMC45IDEzLjUgMTguNSAyNy41IDM1LjMgNDEuNiA1MC0zMi42IDMwLjMtNjMuMiA0Ni45LTg0IDQ2LjktNC41LS4xLTguMy0xLTExLjMtMi43em0yMzcuMi03Ni4yYzQuNyAzOC4yLTEuMSA2Ny45LTE0LjYgNzUuOC0zIDEuOC02LjkgMi42LTExLjUgMi42LTIwLjcgMC01MS40LTE2LjUtODQtNDYuNiAxNC0xNC43IDI4LTMxLjQgNDEuMy00OS45IDIyLjYtMi40IDQ0LTYuMSA2My42LTExIDIuMyAxMC4xIDQuMSAxOS44IDUuMiAyOS4xem0zOC41LTY2LjdjLTguNiAzLjctMTggNy0yNy43IDEwLjEtNS43LTE5LjYtMTMuMi00MC0yMi41LTYwLjkgOS4yLTIwLjggMTYuNi00MS4xIDIyLjItNjAuNiA5LjkgMy4xIDE5LjMgNi41IDI4LjEgMTAuMiAzNS40IDE1LjEgNTguMyAzNC45IDU4LjMgNTAuNi0uMSAxNS43LTIzIDM1LjYtNTguNCA1MC42eiIvPgogICAgPGNpcmNsZSBmaWxsPSJjdXJyZW50Y29sb3IiIGNsYXNzPSJzdDAiIGN4PSIyNDUuMiIgY3k9IjIxOC41IiByPSI0NS43Ii8+Cjwvc3ZnPgo=");

/***/ }),

/***/ "./src/comps/_layout/_layout.jsx":
/*!***************************************!*\
  !*** ./src/comps/_layout/_layout.jsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Layout)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
/* harmony import */ var _context_auth_ctx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/context/auth-ctx */ "./src/context/auth-ctx.jsx");
/* harmony import */ var _context_cart_ctx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/context/cart-ctx */ "./src/context/cart-ctx/index.jsx");
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./header */ "./src/comps/_layout/header.jsx");
/* harmony import */ var _layout_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_layout.scss */ "./src/comps/_layout/_layout.scss");








// ==============================================

function Layout(_ref) {
  let {
    children,
    name,
    restrict
  } = _ref;
  // --------------------------------------------

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_context_auth_ctx__WEBPACK_IMPORTED_MODULE_2__.AuthContextProvider, {
    restrict
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_context_cart_ctx__WEBPACK_IMPORTED_MODULE_3__.CartContextProvider, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_header__WEBPACK_IMPORTED_MODULE_4__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("main", {
    id: "page",
    className: `${name}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gutter"
  }, children)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("footer", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "footer"))));

  // --------------------------------------------
}

// ==============================================

const getElem = str => document.querySelector(str);
const getHeight = el => el.offsetHeight;
const setStyle = (el, _ref2) => {
  let {
    property,
    value
  } = _ref2;
  return el.style[property] = value;
};

// ==========================================

const pageLoadAnim = () => {
  const body = getElem('body');
  gsap__WEBPACK_IMPORTED_MODULE_6__.gsap.to(body, {
    opacity: 1
  });
};
pageLoadAnim();

// ==========================================

/***/ }),

/***/ "./src/comps/_layout/drawer-cart.jsx":
/*!*******************************************!*\
  !*** ./src/comps/_layout/drawer-cart.jsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cart),
/* harmony export */   "openCart": () => (/* binding */ openCart)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-uuid */ "./node_modules/react-uuid/uuid.js");
/* harmony import */ var react_uuid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_uuid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
/* harmony import */ var gsap_Flip__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! gsap/Flip */ "./node_modules/gsap/Flip.js");
/* harmony import */ var _comps_button_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/comps/button/button */ "./src/comps/button/button.jsx");
/* harmony import */ var _util_log__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/util/log */ "./src/util/log.js");
/* harmony import */ var _util_fetch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/util/fetch */ "./src/util/fetch.js");
/* harmony import */ var _context_cart_ctx_cart_fn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/context/cart-ctx/cart-fn */ "./src/context/cart-ctx/cart-fn.js");
/* harmony import */ var _util_local_storage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/util/local-storage */ "./src/util/local-storage.js");











gsap__WEBPACK_IMPORTED_MODULE_9__.gsap.registerPlugin(gsap_Flip__WEBPACK_IMPORTED_MODULE_10__.Flip);

// ==============================================

let openCart;

// ==============================================

const Ellipsis = _ref => {
  let {
    children,
    name,
    classes,
    color,
    fontSize,
    fontWeight
  } = _ref;
  const ellipsis = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: `
        ${name}
        ${classes}
        w-[130px] md:w-[145px]
      `,
    style: {
      color,
      fontSize,
      fontWeight,
      ...ellipsis
    }
  }, children);
};

// ==============================================

function Cart() {
  // --------------------------------------------

  const black = 'black';
  const light = '#757575';
  const green = '#41A139';

  // --------------------------------------------

  const portal_root = document.querySelector('#portal-cart');

  // --------------------------------------------983230

  const submit = () => {
    // - - - - - - - - - - - - - - - - - - - - - 

    const submitOrderToNode = () => {
      console.clear();
      (0,_util_log__WEBPACK_IMPORTED_MODULE_5__.lr)('submitOrderToNode()');

      // const url = `${process.env.NEXT_PUBLIC_API_URL}/api/checkout/stripe-checkout-node`;
      const url = `${API_URL_NODE}/api/checkout/php`;
      console.log('url: ', url);
      const cart = (0,_context_cart_ctx_cart_fn__WEBPACK_IMPORTED_MODULE_7__.getCartLS)();
      const user = (0,_util_local_storage__WEBPACK_IMPORTED_MODULE_8__.getLS)('user');
      console.log('user: ', user);
      if (!user) {
        alert('please login to checkout.');
        window.location = '/auth/login';
      } else {
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            cart,
            user
          })
        }).then(res => {
          if (res.ok) return res.json();
          return res.json().then(json => Promise.reject(json));
        }).then(data => {
          console.log('fetch().then().then() -- data: ', data);
          const {
            url
          } = data;
          window.location = url;
        }).catch(e => {
          console.error(e.error);
        });
      }
    };
    submitOrderToNode();

    // - - - - - - - - - - - - - - - - - - - - - 

    const insertOrderInDB = async () => {
      const cart = (0,_context_cart_ctx_cart_fn__WEBPACK_IMPORTED_MODULE_7__.getCartLS)();

      // const url = `${process.env.NEXT_PUBLIC_API_URL}/api/orders`;
      const url = `/api/orders`;
      const [data, error] = await (0,_util_fetch__WEBPACK_IMPORTED_MODULE_6__.authFetch)({
        url: url,
        method: 'POST',
        body: {
          cart
        }
      });
      if (error) {
        // alert('TODO: Unauthorization Notification...');
        (0,_util_log__WEBPACK_IMPORTED_MODULE_5__.lr)('FAIL');
        console.log('error: ', error);
      }
      if (!error) {
        (0,_util_log__WEBPACK_IMPORTED_MODULE_5__.lg)('SUCCESS');
        console.log('data: ', data);
        // resetCart();
      }
    };

    // insertOrderInDB();

    // - - - - - - - - - - - - - - - - - - - - - 
  };

  // --------------------------------------------

  openCart = _ref2 => {
    let {
      onComplete = null
    } = _ref2;
    showOverlay();
    const container = container_ref?.current;
    if (tl_ref.current)
      // if cart is still open then reset timeline before opening. Fixes bug where timeline is overwritten with no animation if cart is already open and added to. Cart should always be closed when adding new item, but just in case this ensures the cart is closable if added to when already open if app is in some unforseen state.
      tl_ref.current.revert();
    tl_ref.current = gsap__WEBPACK_IMPORTED_MODULE_9__.gsap.to(container, {
      x: 0,
      duration: 0.3,
      onComplete // used in adding item to cart
    });
  };

  // --------------------------------------------

  const closeCart = () => {
    hideOverlay();
    tl_ref.current?.reverse();
  };

  // --------------------------------------------

  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    // Initialize num items in cart synchronized with local-state:
    (0,_context_cart_ctx_cart_fn__WEBPACK_IMPORTED_MODULE_7__.updateNumCartItems)();

    // Callback from 'add-cart' event:
    const addItem = () => {
      // open cart:
      openCart({
        onComplete: () => {
          setLayout(prev_layout => {
            const cart = (0,_context_cart_ctx_cart_fn__WEBPACK_IMPORTED_MODULE_7__.getCartLS)();
            const prev_items = prev_layout.items;
            let items;
            if (cart?.length === prev_items?.length) {
              // duplicate item => only increase quantity (already updated)
              items = cart.map(_ref3 => {
                let {
                  product,
                  variant,
                  qty
                } = _ref3;
                return {
                  id: variant.id,
                  status: 'entered',
                  product,
                  variant,
                  qty
                };
              });
            } else {
              // new item => add to cart
              const {
                product,
                variant,
                qty
              } = cart.at(-1);
              const new_item = {
                id: variant.id,
                status: 'entered',
                product,
                variant,
                qty
              };
              items = [new_item, ...prev_items];
            }
            const state = gsap_Flip__WEBPACK_IMPORTED_MODULE_10__.Flip.getState(q(".line-item"));
            return {
              items,
              state
            };
          });
        }
      });
    };
    window.addEventListener('cart-add', addItem);
    return () => window.removeEventListener('cart-add', addItem);
  }, []);

  // --------------------------------------------

  const tl_ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const container_ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const q = gsap__WEBPACK_IMPORTED_MODULE_9__.gsap.utils.selector(container_ref); // Returns a selector function that's scoped to a particular Element, meaning it'll only find descendants of that Element .

  // --------------------------------------------

  const [layout, setLayout] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(() => {
    const cart = (0,_context_cart_ctx_cart_fn__WEBPACK_IMPORTED_MODULE_7__.getCartLS)();
    // console.log('cart: ', cart);

    let init_items = [];
    if (cart?.length > 0) init_items = cart.map(_ref4 => {
      let {
        product,
        variant,
        qty
      } = _ref4;
      return {
        id: variant.id,
        status: 'entered',
        product,
        variant,
        qty
      };
    });
    return {
      items: init_items.reverse(),
      state: undefined
    };
  });

  // --------------------------------------------

  // Create the context
  //  -Add to it later via ctx.add(() => {...})
  const [ctx] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(() => gsap__WEBPACK_IMPORTED_MODULE_9__.gsap.context(() => {}));

  // --------------------------------------------

  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    return () => ctx.revert();
  }, []);

  // --------------------------------------------

  // --------------------------------------------

  const remove = item => {
    const {
      variant: {
        id: variant_id
      }
    } = item;
    (0,_context_cart_ctx_cart_fn__WEBPACK_IMPORTED_MODULE_7__.removeFromCartLS)(variant_id);

    // set the item as exiting which will add a CSS class for display: none;
    item.status = "exiting"; // NOTE:This mutates the state!!!!

    setLayout(prev_layout => {
      // Update state without mutation:

      const {
        items: prev_items
      } = prev_layout;
      const row_index = prev_items.findIndex(r => r.id === item.id);

      // Update the row
      const clone = [...prev_items];
      clone[row_index].status = 'exiting';
      return {
        items: clone,
        state: gsap_Flip__WEBPACK_IMPORTED_MODULE_10__.Flip.getState(q(".line-item"))
      };
    });
  };

  // --------------------------------------------

  const removeItems = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(exiting_items => {
    if (!exiting_items.length) return;
    setLayout(prev => {
      {
        const non_exiting_items = prev.items.filter(item => {
          return !exiting_items.includes(item);
        });
        return {
          state: gsap_Flip__WEBPACK_IMPORTED_MODULE_10__.Flip.getState(q(".line-item")),
          items: non_exiting_items // this removes one item from the array => remove corresponding item from DOM
        };
      }
    });
  }, [q]);

  // --------------------------------------------

  (0,react__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(() => {
    if (!layout.state) return;
    const duration = 0.3;

    // get the items that are exiting in this batch
    const exiting = layout.items.filter(item => item.status === "exiting");
    ctx.add(() => {
      // Flip.from returns a timeline
      const timeline = gsap_Flip__WEBPACK_IMPORTED_MODULE_10__.Flip.from(layout.state, {
        absolute: true,
        ease: "power1.inOut",
        targets: q(".line-item"),
        scale: true,
        simple: true,
        onEnter: elements => {
          return gsap__WEBPACK_IMPORTED_MODULE_9__.gsap.fromTo(elements, {
            opacity: 0,
            scale: 0,
            duration
          }, {
            opacity: 1,
            scale: 1,
            delay: 0.2,
            duration
          });
        },
        onLeave: elements => {
          return gsap__WEBPACK_IMPORTED_MODULE_9__.gsap.to(elements, {
            opacity: 0,
            scale: 0,
            duration
          });
        },
        duration
      });

      // remove the exiting items from the DOM after the animation is done
      timeline.add(() => removeItems(exiting));
    });
  }, [ctx, layout, q, removeItems]);

  // --------------------------------------------

  const overlay_ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);

  // --------------------------------------------

  const showOverlay = () => {
    const ref = overlay_ref.current;
    ref.style.display = 'block';
    gsap__WEBPACK_IMPORTED_MODULE_9__.gsap.to(ref, {
      opacity: 1,
      duration: 0.3,
      onStart: () => {
        document.body.style.overflow = "hidden"; // don't scroll stuff underneath the modal
      }
    });
  };

  // --------------------------------------------

  const hideOverlay = () => {
    // fireEvent('cart-close');
    // setDrawerCartOpen(false);
    const ref = overlay_ref.current;
    gsap__WEBPACK_IMPORTED_MODULE_9__.gsap.to(ref, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        ref.style.display = 'none';
        document.body.style.overflow = "overlay"; // custom scrollbar overlay
      }
    });
  };

  // --------------------------------------------

  const [line_items_window_height, setLineItemsWindowHeight] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(() => {
    const container = container_ref.current;
    const cart_title = container.querySelector('#cart-title');
    const cart_btn_container = container.querySelector('#cart-btn-container');
    const getHeight = elem => elem.offsetHeight;
    setLineItemsWindowHeight(getHeight(cart_title) + getHeight(cart_btn_container));
  }, []);

  // --------------------------------------------

  return (0,react_dom__WEBPACK_IMPORTED_MODULE_2__.createPortal)((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    // Blur Overlay
    ref: overlay_ref,
    className: "pointer-events-auto fixed inset-0",
    style: {
      display: 'none',
      opacity: 0,
      background: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(5px)',
      // I think this is not animating the blur!  I think a single blur is computed and then the opacity on it is animated - which is efficient.  I think animating a blur causes a diffrent blur to be computed for each frame of the animation with each one slightly more blurred than the previous.
      WebkitBackdropFilter: 'blur(5px)',
      zIndex: '99'
    },
    onClick: () => closeCart()
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("aside", {
    id: "cart",
    ref: container_ref,
    className: " w-[300px] md:w-[350px] ",
    style: {
      position: 'fixed',
      top: 0,
      right: 0,
      background: 'white',
      height: '100vh',
      zIndex: 100,
      transform: 'translate(100%)'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: "cart-title",
    className: "ml-4 mr-6 pt-8 pb-4",
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
      // background: 'lightgreen'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Shopping Cart"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    onClick: closeCart,
    xmlns: "http://www.w3.org/2000/svg",
    width: "26",
    height: "26",
    fill: "currentColor",
    className: "bi bi-x  cursor-pointer",
    viewBox: "0 0 16 16"
    // style={{ background: 'red' }}
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: "cart-line-items-window",
    style: {
      // outline: 'solid black 20px',
      height: `calc(100vh - ${line_items_window_height}px)`,
      overflowY: 'scroll'
    }
  }, layout.items.map((item, idx) => {
    const {
      status,
      product: {
        title,
        sub_title,
        body,
        price,
        category
      },
      variant: {
        id,
        img,
        color,
        size,
        qty
      }
    } = item;
    const key = `line-item-${id}`;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      id: key,
      key: key,
      "data-flip-id": key,
      className: `line-item
              ml-4 mr-6 py-4
              ${idx !== layout.items.length - 1 ? 'border-b border-gray-200' : ''}
              `,
      style: {
        display: status === 'exiting' ? 'none' : 'flex'
        // padding: '1rem',
        // outline: 'dashed yellow 1px',
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      className: "rounded-md border border-gray-200",
      src: img,
      style: {
        height: '75px'
        // width: '75px' 
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        // background: 'rgba(255, 0, 0, 0.2)',
        flexGrow: 1,
        // outline: 'dashed hotpink 2px',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '1rem'
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      // className="mb-1"
      style: {
        // background: 'yellow',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
        // marginBottom: '0.1rem'
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Ellipsis, {
      color: "black",
      fontSize: "0.9rem",
      fontWeight: "500",
      classes: "text-left"
    }, title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "",
      style: {
        // background: 'red',
        fontSize: '0.9rem'
      }
    }, "$", price / 100)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Ellipsis, {
      color: light,
      fontSize: "0.8rem",
      fontWeight: "400",
      classes: "mb-2"
    }, sub_title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        // alignItems: 'center',
        marginTop: 'auto',
        position: 'relative',
        // background: 'lightgreen',
        height: '16px'
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      style: {
        fontSize: '0.8rem'
      }
    }, "Qty: ", item.qty), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      onClick: () => remove(item),
      className: "bi bi-trash  cursor-pointer",
      xmlns: "http://www.w3.org/2000/svg"
      // width="16" 
      // height="16" 
      ,
      fill: "currentColor",
      viewBox: "0 0 16 16",
      style: {
        // increase size to make easier to click on mobile
        // background: 'red', 
        position: 'absolute',
        height: '32px',
        right: 0,
        padding: '8px',
        top: '-8px'
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      fillRule: "evenodd",
      d: "M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
    })))));
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: "cart-btn-container",
    className: "border-t border-gray-200",
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      paddingTop: '2rem',
      paddingBottom: '2rem',
      paddingLeft: '1rem',
      paddingRight: '1.5rem',
      background: 'white'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '0.125rem'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Subtotal"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "$", layout.items.reduce((accumulator, currentValue) => accumulator + currentValue.product.price, 0) / 100)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      marginBottom: '2rem'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    style: {
      fontSize: '0.8rem',
      color: light,
      fontWeight: '400'
    }
  }, "Shipping and taxes calculated at checkout")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_comps_button_button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    disabled: layout.items.length === 0,
    onClick: () => {
      layout.items.map(item => remove(item));
      setTimeout(closeCart, 200);
    },
    classes: "mb-4"
  }, "Clear"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_comps_button_button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    disabled: layout.items.length === 0,
    onClick: () => {
      submit();
    }
  }, "Checkout"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "font-medium text-indigo-600 hover:text-indigo-500 mt-8",
    onClick: () => closeCart()
  }, "Continue Shopping", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    "aria-hidden": "true"
  }, " \u2192")))))), portal_root);

  // --------------------------------------------
}
;

// ==============================================



/***/ }),

/***/ "./src/comps/_layout/drawer-nav.jsx":
/*!******************************************!*\
  !*** ./src/comps/_layout/drawer-nav.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeDrawer": () => (/* binding */ closeDrawer),
/* harmony export */   "default": () => (/* binding */ NavDrawer),
/* harmony export */   "openDrawer": () => (/* binding */ openDrawer)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
/* harmony import */ var _util_transition__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/util/transition */ "./src/util/transition.js");
/* harmony import */ var _util_log__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/util/log */ "./src/util/log.js");
/* harmony import */ var _util_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/util/dom */ "./src/util/dom.js");
/* harmony import */ var _maps_img_map__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/maps/img-map */ "./src/maps/img-map.js");
/* harmony import */ var util_local_storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! util/local-storage */ "./src/util/local-storage.js");










// ==============================================

let openDrawer, closeDrawer;

// ==============================================

const Card = _ref => {
  let {
    title,
    img,
    classes,
    category,
    gender,
    tag
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "/store",
    className: `
      cursor-pointer
      ${classes}
    `,
    onClick: () => {
      (0,util_local_storage__WEBPACK_IMPORTED_MODULE_7__.setLS)('filters', {
        category,
        gender,
        tag
      });
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: img,
    className: "rounded-md overflow-hidden mb-4"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", {
    className: "text-sm font-medium text-gray-900"
  }, title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "text-sm text-gray-500"
  }, "Shop now"));
};

// ==============================================

const DrawerContents = () => {
  // --------------------------------------------

  const [active_panel, setActivePanel] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  const panel_refs = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)([]);

  // --------------------------------------------

  const clickHandler = idx => {
    (0,_util_dom__WEBPACK_IMPORTED_MODULE_5__.disableClick)();
    setActivePanel(idx);
    const duration = 0.3;
    panel_refs.current.forEach((ref, i) => {
      if (i !== idx) {
        gsap__WEBPACK_IMPORTED_MODULE_8__.gsap.to(ref, {
          opacity: 0,
          onStart: () => ref.style.pointEvents = 'none',
          duration
        });
      }
    });
    const ref = panel_refs.current[idx];
    gsap__WEBPACK_IMPORTED_MODULE_8__.gsap.to(ref, {
      opacity: 1,
      onStart: () => ref.style.display = 'grid',
      onComplete: () => (0,_util_dom__WEBPACK_IMPORTED_MODULE_5__.enableClick)(),
      duration
    });
  };

  // --------------------------------------------

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex justify-evenly border-b border-gray-200"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    onClick: () => clickHandler(0),
    className: `
              pb-4 w-[100px] text-center border-b-2
              ${(0,_util_transition__WEBPACK_IMPORTED_MODULE_3__.transitionTextColor)(active_panel === 0, 'text-indigo-600 border-indigo-600', 'text-gray-900 border-transparent')}
              cursor-pointer
              text-base font-medium
            `
  }, "Women"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    onClick: () => clickHandler(1),
    className: `
              pb-4 w-[100px] text-center border-b-2
              ${(0,_util_transition__WEBPACK_IMPORTED_MODULE_3__.transitionTextColor)(active_panel === 1, 'text-indigo-600 border-indigo-600', 'text-gray-900 border-transparent')}
              cursor-pointer
              text-base font-medium
            `
  }, "Men")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "relative px-4 py-6 border-b border-gray-200 "
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    // HIDDEN (for height)
    className: "grid grid-cols-2 gap-[1rem]"
    // -use this one to set the height on the section 
    //  since the others are removed from document flow
    ,
    style: {
      visibility: 'hidden'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, {
    title: "Shoes",
    classes: "mb-4",
    img: _maps_img_map__WEBPACK_IMPORTED_MODULE_6__.img_map.women.shoes.img
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, {
    title: "Pants",
    classes: "mb-4",
    img: _maps_img_map__WEBPACK_IMPORTED_MODULE_6__.img_map.women.clothes.img
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, {
    title: "Accessories",
    img: _maps_img_map__WEBPACK_IMPORTED_MODULE_6__.img_map.women.accessories.img
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, {
    title: "Equipment",
    img: _maps_img_map__WEBPACK_IMPORTED_MODULE_6__.img_map.women.equipment.img
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: el => panel_refs.current[0] = el,
    className: "grid grid-cols-2 gap-[1rem] mx-4 absolute  left-0  top-6 ",
    style: {
      opacity: 1,
      display: 'grid'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, {
    title: "Shoes",
    classes: "mb-4",
    img: _maps_img_map__WEBPACK_IMPORTED_MODULE_6__.img_map.women.shoes.img,
    category: "shoes",
    gender: "women",
    tag: "all"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, {
    title: "Clothes",
    classes: "mb-4",
    img: _maps_img_map__WEBPACK_IMPORTED_MODULE_6__.img_map.women.clothes.img,
    category: "clothes",
    gender: "women",
    tag: "all"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, {
    title: "Accessories",
    img: _maps_img_map__WEBPACK_IMPORTED_MODULE_6__.img_map.women.accessories.img,
    category: "accessories",
    gender: "women",
    tag: "all"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, {
    title: "Equipment",
    img: _maps_img_map__WEBPACK_IMPORTED_MODULE_6__.img_map.women.equipment.img,
    category: "equipment",
    gender: "women",
    tag: "all"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: el => panel_refs.current[1] = el,
    className: "grid grid-cols-2 gap-[1rem] mx-4 absolute  left-0  top-6 ",
    style: {
      opacity: 0,
      display: 'none'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, {
    title: "Shoes",
    classes: "mb-4",
    img: _maps_img_map__WEBPACK_IMPORTED_MODULE_6__.img_map.men.shoes.img,
    category: "shoes",
    gender: "men",
    tag: "all"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, {
    title: "Clothes",
    classes: "mb-4",
    img: _maps_img_map__WEBPACK_IMPORTED_MODULE_6__.img_map.men.clothes.img,
    category: "clothes",
    gender: "men",
    tag: "all"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, {
    title: "Accessories",
    img: _maps_img_map__WEBPACK_IMPORTED_MODULE_6__.img_map.men.accessories.img,
    category: "accessories",
    gender: "men",
    tag: "all"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, {
    title: "Equipment",
    img: _maps_img_map__WEBPACK_IMPORTED_MODULE_6__.img_map.men.equipment.img,
    category: "equipment",
    gender: "men",
    tag: "all"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "px-4 py-6 border-b border-gray-200"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: ""
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "/store"
  }, "Store"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "px-4 py-6 border-b border-gray-200"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "mb-6 "
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "/auth/login"
  }, "Register")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "     "
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "/auth/register"
  }, "Sign in"), " ")));
};

// ==============================================

function NavDrawer(_ref2) {
  let {
    title,
    position,
    classes
  } = _ref2;
  // --------------------------------------------

  // -<children /> needs to have either margin or padding of 1rem 
  //  to match the padding in the title

  // --------------------------------------------

  const portal_root = document.querySelector('#portal-nav-drawer');

  // --------------------------------------------

  openDrawer = () => {
    console.log('openDrawer()');
    showOverlay();
    const container = container_ref?.current;
    (0,_util_log__WEBPACK_IMPORTED_MODULE_4__.lr)(tl_ref.current);
    if (tl_ref.current)
      // if cart is still open then reset timeline before opening. Fixes bug where timeline is overwritten with no animation if cart is already open and added to. Cart should always be closed when adding new item, but just in case this ensures the cart is closable if added to when already open if app is in some unforseen state.
      tl_ref.current.revert();
    tl_ref.current = gsap__WEBPACK_IMPORTED_MODULE_8__.gsap.to(container, {
      x: 0,
      duration: 0.3
    });
  };

  // --------------------------------------------

  closeDrawer = () => {
    hideOverlay();
    tl_ref.current?.reverse();
  };

  // --------------------------------------------

  const tl_ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const container_ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);

  // --------------------------------------------

  const overlay_ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);

  // --------------------------------------------

  const showOverlay = () => {
    (0,_util_log__WEBPACK_IMPORTED_MODULE_4__.lr)('opening cart drawer');
    const ref = overlay_ref.current;
    ref.style.display = 'block';
    gsap__WEBPACK_IMPORTED_MODULE_8__.gsap.to(ref, {
      opacity: 1,
      duration: 0.3,
      onStart: () => {
        document.body.style.overflow = "hidden"; // don't scroll stuff underneath the modal
      }
    });
  };

  // --------------------------------------------

  const hideOverlay = () => {
    // fireEvent('cart-close');
    // setDrawerCartOpen(false);
    const ref = overlay_ref.current;
    gsap__WEBPACK_IMPORTED_MODULE_8__.gsap.to(ref, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        ref.style.display = 'none';
        document.body.style.overflow = "overlay"; // custom scrollbar overlay
      }
    });
  };

  // --------------------------------------------

  let translate;
  if (position === 'left') {
    translate = {
      left: 0,
      transform: 'translateX(-100%)'
    };
  } else {
    translate = {
      right: 0,
      transform: 'translateX(100%)'
    };
  }

  // --------------------------------------------

  return (0,react_dom__WEBPACK_IMPORTED_MODULE_2__.createPortal)((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "md:hidden"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    // Blur Overlay
    ref: overlay_ref,
    className: "pointer-events-auto fixed inset-0",
    style: {
      display: 'none',
      opacity: 0,
      background: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(5px)',
      // I think this is not animating the blur!  I think a single blur is computed and then the opacity on it is animated - which is efficient.  I think animating a blur causes a diffrent blur to be computed for each frame of the animation with each one slightly more blurred than the previous.
      WebkitBackdropFilter: 'blur(5px)',
      zIndex: '99'
    },
    onClick: () => closeDrawer()
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("aside", {
    ref: container_ref,
    className: `
          z-100
          ${classes}
        `,
    style: {
      position: 'fixed',
      top: 0,
      background: 'white',
      height: '100vh',
      zIndex: 100,
      padding: 0,
      margin: 0,
      ...translate,
      overflowY: 'scroll'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: "cart-title",
    className: `
            ml-4 
            ${position === 'right' ? 'mr-6' : 'mr-4'} 
            py-6 
          `,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      // background: 'lightgreen'
      flexDirection: position === 'left' ? 'row-reverse' : 'row'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    onClick: closeDrawer,
    xmlns: "http://www.w3.org/2000/svg",
    width: "26",
    height: "26",
    fill: "currentColor",
    className: "bi bi-x  cursor-pointer",
    viewBox: "0 0 16 16"
    // style={{ background: 'red' }}
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(DrawerContents, null))), portal_root);

  // --------------------------------------------
}
;

// ==============================================

 // NOTE: Need to pass these in as props like: () => openDrawer();

/***/ }),

/***/ "./src/comps/_layout/drawer-navbar-flyout.jsx":
/*!****************************************************!*\
  !*** ./src/comps/_layout/drawer-navbar-flyout.jsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeDrawer": () => (/* binding */ closeDrawer),
/* harmony export */   "default": () => (/* binding */ NavbarFlyoutDrawer),
/* harmony export */   "openDrawer": () => (/* binding */ openDrawer)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
/* harmony import */ var _util_transition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/util/transition */ "./src/util/transition.js");
/* harmony import */ var _util_log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/util/log */ "./src/util/log.js");
/* harmony import */ var _util_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/util/dom */ "./src/util/dom.js");
/* harmony import */ var _maps_img_map__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/maps/img-map */ "./src/maps/img-map.js");
/* harmony import */ var _util_local_storage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/util/local-storage */ "./src/util/local-storage.js");


// import { createPortal } from 'react-dom';







// ==============================================

let openDrawer, closeDrawer;
const navbar_top_height = '50px';
const navbar_bottom_height = '70px';
const header_height = '120px';
const flyout_height = '300px';
const flyout_height_minus_translation = `${300 - 120}px`; // flyout - header

// ==============================================

const Card = _ref => {
  let {
    jdx,
    title,
    img,
    classes,
    onHover,
    offHover,
    active_hovered,
    category,
    gender,
    tag
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "/store",
    className: `
      cursor-pointer
      ${classes}
    `,
    onMouseEnter: () => onHover(jdx),
    onMouseLeave: offHover,
    onClick: () => {
      (0,_util_local_storage__WEBPACK_IMPORTED_MODULE_6__.setLS)('filters', {
        category,
        gender,
        tag
      });
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: img,
    className: `rounded-md overflow-hidden mb-4 w-full ${active_hovered === jdx ? 'opacity-80' : 'opacity-100'}`
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", {
    className: `text-sm font-medium ${active_hovered === jdx ? 'text-indigo-600' : 'text-gray-900'}`
  }, title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "text-sm text-gray-500"
  }, "Shop now"));
};

// ==============================================

const Panel = _ref2 => {
  let {
    idx,
    panel_refs,
    imgs,
    gender,
    tag
  } = _ref2;
  // --------------------------------------------

  const [active_hovered, setActiveHovered] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();

  // --------------------------------------------

  const onHover = jdx => {
    console.log('idx: ', idx, '\tjdx: ', jdx);
    setActiveHovered(jdx);
  };

  // --------------------------------------------

  const offHover = () => {
    setActiveHovered(null);
  };

  // --------------------------------------------

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: el => panel_refs.current[idx] = el,
    className: "absolute  left-0  top-0",
    style: {
      opacity: 0,
      display: 'none',
      left: '50%',
      top: '41.5%',
      transform: 'translateX(-50%) translateY(-50%)',
      height: flyout_height_minus_translation,
      gridTemplateColumns: 'repeat(4, 180px)',
      gap: '1rem'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, {
    jdx: 0,
    title: "Shoes",
    category: "shoes",
    classes: "",
    img: imgs['shoes'].img,
    onHover,
    offHover,
    active_hovered,
    gender,
    tag
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, {
    jdx: 1,
    title: "Clothes",
    category: "clothes",
    classes: "",
    img: imgs['clothes'].img,
    onHover,
    offHover,
    active_hovered,
    gender,
    tag
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, {
    jdx: 2,
    title: "Accessories",
    category: "accessories",
    classes: "",
    img: imgs['accessories'].img,
    onHover,
    offHover,
    active_hovered,
    gender,
    tag
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, {
    jdx: 3,
    title: "Equipment",
    category: "equipment",
    classes: "",
    img: imgs['equipment'].img,
    onHover,
    offHover,
    active_hovered,
    gender,
    tag
  }));
};

// ==============================================

const DrawerContents = _ref3 => {
  let {
    panel_refs,
    active_panel
  } = _ref3;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      // border: 'dashed hotpink 2px',
      height: '100%',
      position: 'relative'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Panel, {
    idx: 0,
    imgs: _maps_img_map__WEBPACK_IMPORTED_MODULE_5__.img_map["new"],
    gender: "all",
    tag: "new",
    panel_refs,
    active_panel
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Panel, {
    idx: 1,
    imgs: _maps_img_map__WEBPACK_IMPORTED_MODULE_5__.img_map.men,
    gender: "men",
    tag: "all",
    panel_refs,
    active_panel
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Panel, {
    idx: 2,
    imgs: _maps_img_map__WEBPACK_IMPORTED_MODULE_5__.img_map.women,
    gender: "women",
    tag: "all",
    panel_refs,
    active_panel
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Panel, {
    idx: 3,
    imgs: _maps_img_map__WEBPACK_IMPORTED_MODULE_5__.img_map.sale,
    gender: "all",
    tag: "sale",
    panel_refs,
    active_panel
  }));
};

// ==============================================

function NavbarFlyoutDrawer(_ref4) {
  let {
    active_panel,
    setActivePanel,
    drawer_open,
    setDrawerOpen
  } = _ref4;
  // --------------------------------------------

  // -used to not open twice if already open and user clicks another navlink
  const panel_refs = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)([]);

  // --------------------------------------------

  const changePanel = idx => {
    (0,_util_dom__WEBPACK_IMPORTED_MODULE_4__.disableClick)();
    setActivePanel(idx);
    const duration = 0.2;
    panel_refs.current.forEach((ref, i) => {
      if (i !== idx) {
        // place all other panels in back
        gsap__WEBPACK_IMPORTED_MODULE_7__.gsap.to(ref, {
          opacity: 0,
          onStart: () => ref.style.display = 'none',
          duration
        });
      }
    });
    const ref = panel_refs.current[idx];
    gsap__WEBPACK_IMPORTED_MODULE_7__.gsap.to(ref, {
      // bring current panel to front
      opacity: 1,
      onStart: () => ref.style.display = 'grid',
      onComplete: () => {
        (0,_util_dom__WEBPACK_IMPORTED_MODULE_4__.enableClick)();
      },
      duration
    });
  };

  // --------------------------------------------

  openDrawer = idx => {
    console.log('openDrawer()');

    // if (active_panel !== idx) // Panel other than currently active panel clicked => set active_panel = idx
    changePanel(idx);
    if (!drawer_open) {
      // drawer is not open => open it

      setDrawerOpen(true);
      showOverlay();
      if (tl_ref.current)
        // if still open then reset timeline before opening.
        tl_ref.current.revert();
      const container = container_ref?.current;
      const container_container = container.parentNode;
      container_container.style.display = 'block';
      tl_ref.current = gsap__WEBPACK_IMPORTED_MODULE_7__.gsap.to(container, {
        y: 0,
        duration: 0.2,
        onReverseComplete: () => container_container.style.display = 'none'
      });
    }
  };

  // --------------------------------------------

  closeDrawer = () => {
    setDrawerOpen(false);
    hideOverlay();
    tl_ref.current?.reverse();
  };

  // --------------------------------------------

  const tl_ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const container_ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const q = gsap__WEBPACK_IMPORTED_MODULE_7__.gsap.utils.selector(container_ref); // Returns a selector function that's scoped to a particular Element, meaning it'll only find descendants of that Element .

  // --------------------------------------------

  // const { overlay_ref } = useContext(CartContext);
  const overlay_ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);

  // --------------------------------------------

  const showOverlay = () => {
    (0,_util_log__WEBPACK_IMPORTED_MODULE_3__.lr)('opening cart drawer');
    const ref = overlay_ref.current;
    ref.style.display = 'block';
    gsap__WEBPACK_IMPORTED_MODULE_7__.gsap.to(ref, {
      opacity: 1,
      duration: 0.3,
      onStart: () => {
        document.body.style.overflow = "hidden"; // don't scroll stuff underneath the modal
      }
    });
  };

  // --------------------------------------------

  const hideOverlay = () => {
    // fireEvent('cart-close');
    // setDrawerCartOpen(false);
    const ref = overlay_ref.current;
    gsap__WEBPACK_IMPORTED_MODULE_7__.gsap.to(ref, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        ref.style.display = 'none';
        document.body.style.overflow = "overlay"; // custom scrollbar overlay
      }
    });
  };

  // --------------------------------------------

  const translate = {
    // top: 0,
    transform: `translateY(-${flyout_height})`
    // --navbar-top-height: 50px;
    // --navbar-bottom-height: 70px;
  };

  // --------------------------------------------

  return (
    // createPortal(
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "hidden md:block",
      style: {
        position: 'absolute',
        // border: 'dashed hotpink 1px',
        height: flyout_height,
        width: '100vw',
        // top: '200px',
        top: header_height,
        overflow: 'hidden',
        display: 'none'
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      // Blur Overlay
      ref: overlay_ref,
      className: "pointer-events-auto fixed inset-0",
      style: {
        display: 'none',
        opacity: 0,
        background: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        // zIndex: '99'
        top: header_height
      },
      onClick: () => closeDrawer()
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("aside", {
      ref: container_ref,
      style: {
        background: 'white',
        height: flyout_height,
        width: '100vw',
        padding: 0,
        margin: 0,
        ...translate
      },
      className: "hidden md:block"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(DrawerContents, {
      active_panel,
      panel_refs
    })))
    // ,
    // portal_root
  );

  // --------------------------------------------
}
;

// ==============================================

 // NOTE: Need to pass these in as props like: () => openDrawer();

/***/ }),

/***/ "./src/comps/_layout/header-button-cart.jsx":
/*!**************************************************!*\
  !*** ./src/comps/_layout/header-button-cart.jsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CartButton)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);



// ==============================================

function CartButton(_ref) {
  let {
    cart_btn_ref,
    cart_count_ref,
    cart_icon_target_ref,
    onClick
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    id: "cart-btn",
    ref: cart_btn_ref,
    onClick: onClick
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: cart_icon_target_ref,
    id: "hidden-target"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg"
    // width="16" height="16" 
    ,
    fill: "currentColor",
    className: "bi bi-bag",
    viewBox: "0 0 16 16"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: cart_count_ref,
    id: "cart-count",
    style: {
      opacity: 0
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null)));
}

/***/ }),

/***/ "./src/comps/_layout/header-button-hamburger.jsx":
/*!*******************************************************!*\
  !*** ./src/comps/_layout/header-button-hamburger.jsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HamburgerButton)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);



// ==============================================

function HamburgerButton(_ref) {
  let {
    onClick
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    id: "hamburger-btn",
    className: "w-[30px] md:hidden",
    onClick: () => onClick()
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "currentColor",
    className: "bi bi-list",
    viewBox: "0 0 16 16"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    fillRule: "evenodd",
    d: "M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
  })));
}

/***/ }),

/***/ "./src/comps/_layout/header-navbar-bottom.jsx":
/*!****************************************************!*\
  !*** ./src/comps/_layout/header-navbar-bottom.jsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavbarBottom)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _header_button_hamburger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./header-button-hamburger */ "./src/comps/_layout/header-button-hamburger.jsx");
/* harmony import */ var _header_button_cart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./header-button-cart */ "./src/comps/_layout/header-button-cart.jsx");
/* harmony import */ var _drawer_navbar_flyout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./drawer-navbar-flyout */ "./src/comps/_layout/drawer-navbar-flyout.jsx");
/* harmony import */ var _context_cart_ctx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/context/cart-ctx */ "./src/context/cart-ctx/index.jsx");
/* harmony import */ var _drawer_cart__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./drawer-cart */ "./src/comps/_layout/drawer-cart.jsx");
/* harmony import */ var _drawer_nav__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./drawer-nav */ "./src/comps/_layout/drawer-nav.jsx");
/* harmony import */ var _util_transition__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/util/transition */ "./src/util/transition.js");
/* harmony import */ var _logo_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./logo.svg */ "./src/comps/_layout/logo.svg");


// import { gsap } from 'gsap';

// import Notifications from './notify/notify';




// import AuthContext from '@/context/auth-ctx';






// ==============================================

function NavbarBottom() {
  // --------------------------------------------

  // const { logged_in, user, logOut } = useContext(AuthContext);

  const [active_panel, setActivePanel] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  const [drawer_open, setDrawerOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);

  // --------------------------------------------

  const {
    cart_btn_ref,
    cart_icon_target_ref,
    cart_count_ref
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_cart_ctx__WEBPACK_IMPORTED_MODULE_5__["default"]);

  // --------------------------------------------

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_drawer_navbar_flyout__WEBPACK_IMPORTED_MODULE_4__["default"], {
    active_panel,
    setActivePanel,
    drawer_open,
    setDrawerOpen
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("nav", {
    id: "bottom"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gutter"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "/"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    className: "h-8 w-auto",
    src: _logo_svg__WEBPACK_IMPORTED_MODULE_9__["default"],
    alt: "Logo"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    // navlinks
    className: "hidden md:flex"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: `pt-[2px] mr-8            ${(0,_util_transition__WEBPACK_IMPORTED_MODULE_8__.transitionTextColor)(active_panel === 0 && drawer_open, 'border-b-2', 'border-b-2 border-transparent')}`,
    onClick: () => (0,_drawer_navbar_flyout__WEBPACK_IMPORTED_MODULE_4__.openDrawer)(0)
  }, "New & Featured"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: `pt-[2px] mr-8            ${(0,_util_transition__WEBPACK_IMPORTED_MODULE_8__.transitionTextColor)(active_panel === 1 && drawer_open, 'border-b-2', 'border-b-2 border-transparent')}`,
    onClick: () => (0,_drawer_navbar_flyout__WEBPACK_IMPORTED_MODULE_4__.openDrawer)(1)
  }, "Men"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: `pt-[2px] lg:mr-8         ${(0,_util_transition__WEBPACK_IMPORTED_MODULE_8__.transitionTextColor)(active_panel === 2 && drawer_open, 'border-b-2', 'border-b-2 border-transparent')}`,
    onClick: () => (0,_drawer_navbar_flyout__WEBPACK_IMPORTED_MODULE_4__.openDrawer)(2)
  }, "Women"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: `pt-[2px] hidden lg:block ${(0,_util_transition__WEBPACK_IMPORTED_MODULE_8__.transitionTextColor)(active_panel === 3 && drawer_open, 'border-b-2', 'border-b-2 border-transparent')}`,
    onClick: () => (0,_drawer_navbar_flyout__WEBPACK_IMPORTED_MODULE_4__.openDrawer)(3)
  }, "Sale")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    // buttons container
    className: "flex  justify-between  w-[110px]  md:w-fit"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_header_button_cart__WEBPACK_IMPORTED_MODULE_3__["default"], {
    onClick: () => (0,_drawer_cart__WEBPACK_IMPORTED_MODULE_6__.openCart)({}),
    cart_btn_ref,
    cart_count_ref,
    cart_icon_target_ref
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_header_button_hamburger__WEBPACK_IMPORTED_MODULE_2__["default"], {
    onClick: () => (0,_drawer_nav__WEBPACK_IMPORTED_MODULE_7__.openDrawer)()
  })))));
}

// ==============================================

/***/ }),

/***/ "./src/comps/_layout/header-navbar-top.jsx":
/*!*************************************************!*\
  !*** ./src/comps/_layout/header-navbar-top.jsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavbarTop)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_auth_ctx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/context/auth-ctx */ "./src/context/auth-ctx.jsx");


// import { gsap } from 'gsap';

// import Notifications from './notify/notify';
// import HamburgerButton from './header-button-hamburger';
// import CartButton from './header-button-cart';


// import CartContext from '@/context/cart-ctx';

// import NavbarBottom from './header-navbar-bottom';
// import Cart, { openCart } from './cart';
// import NavDrawer, { openDrawer as openNavDrawer } from './header-drawer-nav';

// ==============================================

function NavbarTop() {
  // --------------------------------------------

  const {
    logged_in,
    user,
    logOut
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_auth_ctx__WEBPACK_IMPORTED_MODULE_2__["default"]);

  // --------------------------------------------

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("nav", {
    id: "top"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gutter"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    id: "logo-text",
    href: "/"
  }, "React"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    id: "nav-links"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: "nav-link hidden md:inline"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "/store"
  }, "Store")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "hidden md:inline mx-2"
  }, "\u2502"), logged_in ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: "nav-link inline",
    onClick: logOut
  }, "Log out"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "mx-2"
  }, "\u2502"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: "nav-link inline"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "/admin-dashboard"
  }, user?.email))) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: "nav-link inline"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "/auth/register"
  }, "Register")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "mx-2"
  }, "\u2502"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: "nav-link inline"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "/auth/login"
  }, "Log in"))))));
}

// ==============================================

/***/ }),

/***/ "./src/comps/_layout/header.jsx":
/*!**************************************!*\
  !*** ./src/comps/_layout/header.jsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Header)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _notify_notify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notify/notify */ "./src/comps/_layout/notify/notify.jsx");
/* harmony import */ var _header_button_hamburger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./header-button-hamburger */ "./src/comps/_layout/header-button-hamburger.jsx");
/* harmony import */ var _header_button_cart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./header-button-cart */ "./src/comps/_layout/header-button-cart.jsx");
/* harmony import */ var _context_auth_ctx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/context/auth-ctx */ "./src/context/auth-ctx.jsx");
/* harmony import */ var _context_cart_ctx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/context/cart-ctx */ "./src/context/cart-ctx/index.jsx");
/* harmony import */ var _header_navbar_bottom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./header-navbar-bottom */ "./src/comps/_layout/header-navbar-bottom.jsx");
/* harmony import */ var _header_navbar_top__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./header-navbar-top */ "./src/comps/_layout/header-navbar-top.jsx");
/* harmony import */ var _drawer_cart__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./drawer-cart */ "./src/comps/_layout/drawer-cart.jsx");
/* harmony import */ var _drawer_nav__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./drawer-nav */ "./src/comps/_layout/drawer-nav.jsx");
/* harmony import */ var _header_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./header.scss */ "./src/comps/_layout/header.scss");














// ==============================================

function Header() {
  // --------------------------------------------

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_drawer_cart__WEBPACK_IMPORTED_MODULE_9__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_drawer_nav__WEBPACK_IMPORTED_MODULE_10__["default"], {
    title: "",
    position: "left",
    classes: "w-[300px]"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    id: "navbar",
    style: {
      position: 'fixed'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_header_navbar_top__WEBPACK_IMPORTED_MODULE_8__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_header_navbar_bottom__WEBPACK_IMPORTED_MODULE_7__["default"], null)));
}

// ==============================================

/***/ }),

/***/ "./src/comps/_layout/notify/notify.jsx":
/*!*********************************************!*\
  !*** ./src/comps/_layout/notify/notify.jsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Notify)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mantine_notifications__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mantine/notifications */ "./node_modules/@mantine/notifications/esm/NotificationsProvider/NotificationsProvider.js");
/* harmony import */ var _mantine_notifications__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mantine/notifications */ "./node_modules/@mantine/notifications/esm/events.js");
/* harmony import */ var _comps_button_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/comps/button/button */ "./src/comps/button/button.jsx");






// ==============================================

function Notify() {
  // --------------------------------------------

  // --------------------------------------------

  // --------------------------------------------

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_mantine_notifications__WEBPACK_IMPORTED_MODULE_3__.NotificationsProvider, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      position: 'absolute',
      bottom: '0',
      left: '0'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_comps_button_button__WEBPACK_IMPORTED_MODULE_2__["default"], {
    onClick: () => {
      (0,_mantine_notifications__WEBPACK_IMPORTED_MODULE_4__.showNotification)({
        id: 'load-data',
        loading: true,
        title: 'Authenticating...',
        message: 'Logging you in',
        autoClose: false,
        disallowClose: true
      });
    }
  }, "Raise Notification"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_comps_button_button__WEBPACK_IMPORTED_MODULE_2__["default"], {
    classes: "ml-4",
    onClick: () => {
      (0,_mantine_notifications__WEBPACK_IMPORTED_MODULE_4__.updateNotification)({
        id: 'load-data',
        color: 'teal',
        title: 'Success!',
        message: 'You are now logged in',
        // icon: <IconCheck size={16} />,
        autoClose: 1000,
        onClose: () => {
          console.log('close');
        }
      });
    }
  }, "(Update) Success Notification"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_comps_button_button__WEBPACK_IMPORTED_MODULE_2__["default"], {
    classes: "ml-4",
    onClick: () => {
      (0,_mantine_notifications__WEBPACK_IMPORTED_MODULE_4__.updateNotification)({
        id: 'load-data',
        color: 'red',
        title: 'Error!',
        message: 'TODO: List error message returned from backend',
        // icon: <IconX size={16} />,
        autoClose: 2000
      });
    }
  }, "(Update) Fail Notification")));
}

/***/ }),

/***/ "./src/comps/button/button.jsx":
/*!*************************************!*\
  !*** ./src/comps/button/button.jsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Button)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);



// ==============================================

function Button(_ref) {
  let {
    children,
    onClick,
    disabled = false,
    classes,
    width = null,
    translucent = false,
    bg_color = 'black',
    text_color = 'white'
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    onClick: onClick
    // className={`
    //   inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm 
    //   ${disabled ? 'opacity-50' : 'hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'}
    //   ${classes}
    // `}
    ,

    className: `
        ${disabled ? 'opacity-50' : ''}
        ${classes}
        text-sm md:text-md
        p-2 md:p-3
      `,
    style: {
      background: translucent ? 'rgba(0, 0, 0, 0.85)' : bg_color,
      backdropFilter: translucent ? 'blur(2px)' : '',
      WebkitBackdropFilter: translucent ? 'blur(2px)' : '',
      border: translucent ? '1px solid rgba( 255, 255, 255, 0.1)' : '',
      color: text_color,
      // padding: '0.75rem',
      width: '100%',
      borderRadius: '100vmax',
      fontWeight: '500'
    },
    disabled: disabled
  }, children);
}
;

// ==============================================

/***/ }),

/***/ "./src/context/auth-ctx.jsx":
/*!**********************************!*\
  !*** ./src/context/auth-ctx.jsx ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthContextProvider": () => (/* binding */ AuthContextProvider),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _util_local_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/util/local-storage */ "./src/util/local-storage.js");
/* harmony import */ var _util_routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/util/routes */ "./src/util/routes.js");





// ==============================================

const AuthContext = (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
  user: {},
  setUser: () => {},
  token: '',
  setToken: () => {},
  logged_in: false,
  logOut: () => {},
  logIn: () => {}
});

// ==============================================

function AuthContextProvider(_ref) {
  let {
    children,
    restrict
  } = _ref;
  // --------------------------------------------

  // const router = useRouter();

  // --------------------------------------------

  const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
  const [token, setToken] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [logged_in, setLoggedIn] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);

  // --------------------------------------------

  // -Load data from LS on page load
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    // -We want to get all of these here to invalidate their data in LS if TTL has expired.
    const logged_in = (0,_util_local_storage__WEBPACK_IMPORTED_MODULE_2__.getLS)('logged_in');
    const user = (0,_util_local_storage__WEBPACK_IMPORTED_MODULE_2__.getLS)('user');
    const token = (0,_util_local_storage__WEBPACK_IMPORTED_MODULE_2__.getLS)('token');
    if (logged_in) {
      setLoggedIn(logged_in);
      setToken(token);
      setUser(user);
    }
    if (restrict) {
      console.log('auth-ctx -- useEffect(, []) -- restrict: ', restrict);
      console.log('user?.is_admin: ', user?.is_admin);
      if (restrict === 'admin' && user?.is_admin !== true) {
        // router.replace('/auth/login');
        // debugger;
        (0,_util_routes__WEBPACK_IMPORTED_MODULE_3__.redirect)('/auth/login');
      }
      if (restrict === 'user' && !user) {
        // router.replace('/auth/login'); 
        // debugger;
        (0,_util_routes__WEBPACK_IMPORTED_MODULE_3__.redirect)('/auth/login');
      }
    }
  }, []);

  // --------------------------------------------

  const logIn = _ref2 => {
    let {
      token,
      user
    } = _ref2;
    console.log('logging user in (auth-ctx)');
    console.log('user: ', user);
    console.log('token: ', token);
    setToken(token);
    (0,_util_local_storage__WEBPACK_IMPORTED_MODULE_2__.setLS)('token', token);
    setUser(user);
    (0,_util_local_storage__WEBPACK_IMPORTED_MODULE_2__.setLS)('user', {
      ...user,
      is_admin: !!user?.is_admin
    }); // mysql 1 => true

    setLoggedIn(true);
    (0,_util_local_storage__WEBPACK_IMPORTED_MODULE_2__.setLS)('logged_in', true);
    if (user?.is_admin) {
      // router.push('/admin');
      (0,_util_routes__WEBPACK_IMPORTED_MODULE_3__.redirect)('/admin');
    } else {
      // router.push('/user');
      (0,_util_routes__WEBPACK_IMPORTED_MODULE_3__.redirect)('/user');
    }
  };

  // --------------------------------------------

  const logOut = () => {
    setToken(null);
    (0,_util_local_storage__WEBPACK_IMPORTED_MODULE_2__.removeLS)('token');
    setUser(user);
    (0,_util_local_storage__WEBPACK_IMPORTED_MODULE_2__.removeLS)('user');
    setLoggedIn(false);
    (0,_util_local_storage__WEBPACK_IMPORTED_MODULE_2__.removeLS)('logged_in');

    // router.replace('/');
    (0,_util_routes__WEBPACK_IMPORTED_MODULE_3__.redirect)('/');
  };

  // --------------------------------------------

  const context = {
    user,
    token,
    logged_in,
    logIn,
    logOut
  };

  // --------------------------------------------

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(AuthContext.Provider, {
    value: context
  }, children);

  // --------------------------------------------
}

// ==============================================

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthContext);


/***/ }),

/***/ "./src/context/cart-ctx/cart-fn.js":
/*!*****************************************!*\
  !*** ./src/context/cart-ctx/cart-fn.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addToCartLS": () => (/* binding */ addToCartLS),
/* harmony export */   "clearCartLS": () => (/* binding */ clearCartLS),
/* harmony export */   "getCartLS": () => (/* binding */ getCartLS),
/* harmony export */   "removeFromCartLS": () => (/* binding */ removeFromCartLS),
/* harmony export */   "updateNumCartItems": () => (/* binding */ updateNumCartItems)
/* harmony export */ });
/* harmony import */ var _util_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/util/events */ "./src/util/events.js");
/* harmony import */ var _util_local_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/util/local-storage */ "./src/util/local-storage.js");



// ==============================================

const getCartLS = () => (0,_util_local_storage__WEBPACK_IMPORTED_MODULE_1__.getLS)('cart');
const setCartLS = cart => (0,_util_local_storage__WEBPACK_IMPORTED_MODULE_1__.setLS)('cart', cart);

// ==============================================

const addToCartLS = _ref => {
  let {
    product,
    variant,
    fire = false
  } = _ref;
  const {
    id: variant_id
  } = variant;

  // -Step 1: get cart from LS:
  // -Step 2: add item to local cart
  //  --2.1: If item is in already in cart then increment count.
  // -Step 3: update cart LS
  // -Step 4: fire event
  // -Step 5: listen for event and handle in <Cart />

  // Step 1:
  const prev_cart = getCartLS();
  // -if cart-ls not set then prev_cart === null  =>  idx===undefined

  // Step 2:
  const idx = prev_cart?.findIndex(line => line?.variant.id === variant_id);
  let new_cart;
  if (idx === undefined) {
    new_cart = [{
      product,
      variant,
      qty: 1
    }];
  } else if (idx < 0) {
    // lo('addToCart() - new line item');
    new_cart = [...prev_cart, {
      product,
      variant,
      qty: 1
    }];
  } else {
    // ly('addToCart() - updating quantity');
    new_cart = [...prev_cart]; // clone local cart state via deep copy.
    new_cart[idx] = {
      ...prev_cart[idx],
      qty: prev_cart[idx].qty + 1
    }; // update specific item's quantity in the cloned cart array.        
  }

  // Step 3:
  setCartLS(new_cart);

  // Step 4:
  if (fire) (0,_util_events__WEBPACK_IMPORTED_MODULE_0__.fireEvent)('cart-add');
};

// ==============================================

const removeFromCartLS = variant_id => {
  // lg('removeFromCart()');

  const prev_cart = getCartLS();
  // console.log('prev_cart: ', prev_cart);

  const new_cart = prev_cart.filter(line => line.variant.id !== variant_id);
  setCartLS(new_cart);
  updateNumCartItems();
  // fireEvent('cart-remove');

  // if (new_cart.length < 1) {
  //   closeCart();
  // }
};

// ==============================================

const updateNumCartItems = () => {
  const cart_count = document.querySelector('header#navbar #cart-count');
  const cart = getCartLS();
  const num_items_in_cart = cart?.length;
  const cart_count_span = cart_count.querySelector('span');
  cart_count_span.textContent = num_items_in_cart;
  if (num_items_in_cart > 0) {
    cart_count.style.opacity = 1;
  } else {
    cart_count.style.opacity = 0;
  }
};

// ==============================================

const clearCartLS = () => {
  setCartLS([]);
};

// ==============================================



/***/ }),

/***/ "./src/context/cart-ctx/index.jsx":
/*!****************************************!*\
  !*** ./src/context/cart-ctx/index.jsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CartContextProvider": () => (/* binding */ CartContextProvider),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-uuid */ "./node_modules/react-uuid/uuid.js");
/* harmony import */ var react_uuid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_uuid__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _util_log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/util/log */ "./src/util/log.js");





// import { 
//   getCartLS,
//   addToCartLS, removeFromCartLS
//  } from './cart-fn';

// ==============================================

const CartContext = (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
  cart: [],
  setCart: function () {}
});

// ==============================================

const CartContextProvider = _ref => {
  let {
    children
  } = _ref;
  // --------------------------------------------

  // const [num_cart_items, setNumCartItems] = useState(0);
  const cart_btn_ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null); // cartBtn = cart.querySelector(".btn-cart");
  const cart_icon_target_ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null); // cartItems = cart.querySelector(".items");
  const cart_count_ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null); // cartCount = cart.querySelector(".count");

  const overlay_ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);

  // --------------------------------------------

  const context = {
    // num_cart_items,
    // setNumCartItems,
    cart_btn_ref,
    cart_icon_target_ref,
    cart_count_ref,
    // cart_open,
    overlay_ref
  };

  // --------------------------------------------

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CartContext.Provider, {
    value: context
  }, children);
};

// ==============================================

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CartContext);


/***/ }),

/***/ "./src/maps/img-map.js":
/*!*****************************!*\
  !*** ./src/maps/img-map.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "img_map": () => (/* binding */ img_map)
/* harmony export */ });
const img_map = {
  'men': {
    'shoes': {
      title: 'Vaporfly 2',
      img: '/img/products/shoes/men/Vaporfly-2-1.webp'
    },
    'clothes': {
      title: 'Cargo Pants',
      img: '/img/products/clothes/men/cargo-pants-green.webp'
    },
    'accessories': {
      title: 'Backpack',
      img: '/img/products/accessories/men/backpack.webp'
    },
    // hats / glasses / bags
    'equipment': {
      title: 'TODO',
      img: '/img/products/clothes/men/Dri-FIT-DNA-shorts-blue.webp'
    } // workout gear,  men: balls, women: yoga-mats,  (Nike: accessories -> gear by sport)
  },

  'women': {
    'shoes': {
      title: 'Infinity React 3',
      img: '/img/products/shoes/women/Infinity-React-3-white.webp'
    },
    'clothes': {
      title: 'Dri Fit One',
      img: '/img/products/clothes/women/Dri-FIT-One-blue.webp'
    },
    'accessories': {
      title: 'Nike Swoosh Green',
      img: '/img/products/clothes/women/Nike-Swoosh-green.webp'
    },
    'equipment': {
      title: 'Nike Swoosh Green',
      img: '/img/products/clothes/women/Nike-Swoosh-green.webp'
    }
  },
  'new': {
    'shoes': {
      title: 'Infinity React 3',
      img: '/img/products/shoes/women/Infinity-React-3-white.webp'
    },
    'clothes': {
      title: 'Dri Fit One',
      img: '/img/products/clothes/women/Dri-FIT-One-blue.webp'
    },
    'accessories': {
      title: 'Nike Swoosh Green',
      img: '/img/products/clothes/women/Nike-Swoosh-green.webp'
    },
    'equipment': {
      title: 'Nike Swoosh Green',
      img: '/img/products/clothes/women/Nike-Swoosh-green.webp'
    }
  },
  'sale': {
    'shoes': {
      title: 'Infinity React 3',
      img: '/img/products/shoes/women/Infinity-React-3-white.webp'
    },
    'clothes': {
      title: 'Dri Fit One',
      img: '/img/products/clothes/women/Dri-FIT-One-blue.webp'
    },
    'accessories': {
      title: 'Nike Swoosh Green',
      img: '/img/products/clothes/women/Nike-Swoosh-green.webp'
    },
    'equipment': {
      title: 'Nike Swoosh Green',
      img: '/img/products/clothes/women/Nike-Swoosh-green.webp'
    }
  }
};

// ==============================================

// const imgMappingKey2Index = ({ category, gender }) => {
//   const idx = ['new', 'men', 'women', 'sale'].indexOf(category);
//   const jdx = ['shoes', 'clothes', 'accessories', 'equipment'].indexOf(gender);
//   return { idx, jdx };
// };

// ==============================================

// const imgMappingIndex2key = ({ idx, jdx }) => {
//   const category = ['new', 'men', 'women', 'sale'][jdx];
//   const gender = ['shoes', 'clothes', 'accessories', 'equipment'][idx];
//   return { category, gender };
// };

// ==============================================



/***/ }),

/***/ "./src/pages/page-store/__store.jsx":
/*!******************************************!*\
  !*** ./src/pages/page-store/__store.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _comps_layout_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/comps/_layout/_layout */ "./src/comps/_layout/_layout.jsx");


// import { createRoot } from 'react-dom/client';


// import Page from './_store';

// import './__store.scss';

// ==============================================

const main_root = document.querySelector('#react-root-store');
if (main_root) {
  // console.log('main_root.dataset: ', main_root.dataset);
  // console.log('main_root.dataset.products: ', main_root.dataset.products);

  // const API_URL_NODE = main_root.dataset.apiUrlNode;
  // console.log('API_URL_NODE: ', API_URL_NODE);

  // window.API_URL_NODE      = main_root.dataset.apiUrlNode;
  // window.API_URL_LARAVEL   = main_root.dataset.apiUrlLaravel;
  // window.PRODUCTS_PER_PAGE = 6;
  // const products_SSR       = JSON.parse(main_root.dataset.products); // encodes variants
  // console.log('products_SSR: ', products_SSR);

  // main_root.removeAttribute('data-products');
  // const num_products_SSR = main_root.dataset.numProducts;

  // <Layout name="store">
  // <Page {...{products_SSR, num_products_SSR}} />
  // </Layout>

  react_dom__WEBPACK_IMPORTED_MODULE_2___default().render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      marginTop: '200px',
      background: 'red'
    }
  }, "Page Store"), main_root);
}

// ==============================================

/***/ }),

/***/ "./src/util/dom.js":
/*!*************************!*\
  !*** ./src/util/dom.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createElement": () => (/* binding */ createElement),
/* harmony export */   "disableClick": () => (/* binding */ disableClick),
/* harmony export */   "enableClick": () => (/* binding */ enableClick),
/* harmony export */   "listen": () => (/* binding */ listen),
/* harmony export */   "listenAll": () => (/* binding */ listenAll),
/* harmony export */   "qs": () => (/* binding */ qs),
/* harmony export */   "qsAll": () => (/* binding */ qsAll),
/* harmony export */   "resetElement": () => (/* binding */ resetElement)
/* harmony export */ });
const listen = _ref => {
  let {
    selector,
    event = 'click',
    callback,
    options = {
      capture: false
    },
    elem = null
  } = _ref;
  // -Add event listener.
  // -Query for the element via querySelector if selector is provided.
  // -Else, use reference to elem passed in.

  if (elem) {
    elem.addEventListener(event, callback, options);
    return () => elem.removeEventListener(event, callback, options);
  } else {
    // -query for the element
    const element = qs(selector);
    element.addEventListener(event, callback, options);
    return () => element.removeEventListener(event, callback, options);
  }
};

// ==============================================

const listenAll = _ref2 => {
  let {
    selector,
    event = 'click',
    callback,
    options = {
      capture: false
    }
  } = _ref2;
  const elems = qsAll(selector);
  console.log('elems: ', elems);
  elems.forEach(elem => {
    elem.addEventListener(event, callback, options);
  });
  return () => {
    elems.forEach(elem => {
      elem.removeEventListener(event, callback, options);
    });
  };
};

// ==============================================

const resetElement = elem => elem.textContent = '';
const createElement = str => document.createElement(str);

// ==============================================

const qs = selector => document.querySelector(selector);
const qsAll = selector => document.querySelectorAll(selector);

// ==============================================

const disableClickCallback = e => {
  e.stopPropagation();
  e.preventDefault();
};

// ==============================================

const disableClick = () => {
  document.querySelector('body').style.pointerEvents = 'none'; // disable even hover events -- WAIT, THIS DOESN'T CAPTURE EVENTS => only applies directly to body, yes?
  document.addEventListener('click', disableClickCallback, true);
};

// ==============================================

const enableClick = () => {
  document.querySelector('body').style.pointerEvents = 'auto';
  document.removeEventListener('click', disableClickCallback, true);
};

// ==============================================



/***/ }),

/***/ "./src/util/events.js":
/*!****************************!*\
  !*** ./src/util/events.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fireEvent": () => (/* binding */ fireEvent)
/* harmony export */ });
// ==============================================

const fireEvent = x => dispatchEvent(new Event(x));

// ==============================================



/***/ }),

/***/ "./src/util/fetch.js":
/*!***************************!*\
  !*** ./src/util/fetch.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "authFetch": () => (/* binding */ authFetch),
/* harmony export */   "fetchGET": () => (/* binding */ fetchGET),
/* harmony export */   "fetchGET2": () => (/* binding */ fetchGET2),
/* harmony export */   "fetchPOST": () => (/* binding */ fetchPOST),
/* harmony export */   "fetchPOST2": () => (/* binding */ fetchPOST2)
/* harmony export */ });
/* harmony import */ var _local_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./local-storage */ "./src/util/local-storage.js");


// ==============================================

const fetchGET = async url => {
  const resp = await fetch(url);
  const data = await resp.json();
  return data;
};

// ==============================================

const fetchGET2 = async _ref => {
  let {
    url,
    token = ''
  } = _ref;
  // console.log('fetchGET2');
  // console.log('url: ', url);
  // console.log('token: ', token);

  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": 'application/json',
        // Authorization: token // NEXT
        Authorization: `Bearer ${token}` // LARAVEL
      }
    });

    // -Get status off of response
    // -My API sends status code 401 for auth failure
    // -If status 401, then we want to notify the user via <Notification />.
    const status = res.status;

    // -Get message from data:
    const data = await res.json();

    // -My API's success status is 201 for auth protected endpoints.
    if (!res.ok) {
      // Not in 200 range
      return [null, data.message];
    }

    // status in 200 range (My API set's status to 201, but shows up as 200)
    return [data, null];
  } catch (e) {
    // NOTE: Not positive this catch is working with async code above.
    //  -fetchGET3 below definetely works with catching as expectd.
    //  -For now I will only handle the error case where the token auth failed.
    //  -So assume this is not hit for now and if auth token failed
    //   then the if statement in the try{} block already handled 
    //   the error with a return statement.
    console.error(e);
    return [null, e];
  }
};

// ==============================================

const fetchPOST = async _ref2 => {
  let {
    url,
    body = {},
    method = 'POST'
  } = _ref2;
  console.log('url: ', url);
  console.log('method: ', method);
  console.log('body: ', body);
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": 'application/json'
      // "X-WP-Nonce": PHP.nonce,
    },

    body: JSON.stringify(body)
  });
  const data = await res.json();
  return data;
};

// ==============================================

const fetchPOST2 = async _ref3 => {
  let {
    url,
    body = {},
    method = 'POST',
    response_type = 'json',
    token
  } = _ref3;
  // console.log('url: ', url);
  // console.log('method: ', method);
  // console.log('body: ', body);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  if (token) {
    // myHeaders.append("Authorization", token); // NEXT
    myHeaders.append("Authorization", `Bearer ${token}`); // LARAVEL
  }

  const options = {
    method,
    headers: myHeaders,
    body: JSON.stringify(body)
    // redirect: 'follow'
  };

  try {
    const resp = await fetch(url, options);
    if (!resp.ok) {
      console.warn('response not okay');
      throw new Error('Response status not in 200 range');
    }
    let data;
    if (response_type === 'text') {
      data = await resp.text();
    } else if (response_type === 'json') {
      data = await resp.json();
      // console.log('data: ', data);
    } else {
      console.log('invalid response type: ');
      throw new Error('invalid response type');
    }

    // console.log(data);
    return [data, null];
  } catch (e) {
    console.error('error: ', e);
    return [null, e];
  }
};

// ==============================================

const authFetch = async _ref4 => {
  let {
    url,
    body = {},
    method = 'GET'
  } = _ref4;
  console.log('authFetch');

  // const url = `${process.env.NEXT_PUBLIC_API_URL}/api/orders`;
  // const url = `${API_URL_LARAVEL}/api/products`;
  // const url = `${process.env.NEXT_PUBLIC_API_URL}${url}`;
  const url_full = `${API_URL_LARAVEL}${url}`;
  console.log('url_full: ', url_full);
  const token = (0,_local_storage__WEBPACK_IMPORTED_MODULE_0__.getLS)('token'); // null if not found
  console.log('token: ', token);
  if (method === 'GET') {
    return await fetchGET2({
      url: url_full,
      token
    });
  } else {
    return await fetchPOST2({
      url: url_full,
      token,
      body,
      method
    });
  }
};

// ==============================================



/***/ }),

/***/ "./src/util/local-storage.js":
/*!***********************************!*\
  !*** ./src/util/local-storage.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getLS": () => (/* binding */ getLS),
/* harmony export */   "removeLS": () => (/* binding */ removeLS),
/* harmony export */   "setLS": () => (/* binding */ setLS)
/* harmony export */ });
// ==============================================

function setWithExpiry(_ref) {
  let {
    key,
    value,
    ttl
  } = _ref;
  const now = new Date();

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: value,
    expiry: now.getTime() + ttl
  };
  localStorage.setItem(key, JSON.stringify(item));
}

// ==============================================

function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  // if the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}

// ==============================================

// const getLS = (key /*: string */) => JSON.parse(localStorage.getItem(key));
const getLS = (key /*: string */) => getWithExpiry(key);

// ==============================================

// const setLS = (key, value /*: string, object */) => localStorage.setItem(key, JSON.stringify(value));
// const setLS = (key, value /*: string, object */) => setWithExpiry({ key, value, ttl: 1e3 * 60**2 * 24}); // 1day = (1000ms./s.  *  60s./min.  *  60min./hr.  *  24hr./day) ms./day
const setLS = (key, value /*: string, object */) => setWithExpiry({
  key,
  value,
  ttl: 1e3 * 60 ** 2 * 1
}); // 1hr = (1000ms./s.  *  60s./min.  *  60min./hr.) ms./hr.

// ==============================================

const removeLS = (key /*: string */) => localStorage.removeItem(key);

// ==============================================



/***/ }),

/***/ "./src/util/log.js":
/*!*************************!*\
  !*** ./src/util/log.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lb": () => (/* binding */ lb),
/* harmony export */   "lc": () => (/* binding */ lc),
/* harmony export */   "lg": () => (/* binding */ lg),
/* harmony export */   "lo": () => (/* binding */ lo),
/* harmony export */   "log": () => (/* binding */ log),
/* harmony export */   "lp": () => (/* binding */ lp),
/* harmony export */   "lr": () => (/* binding */ lr),
/* harmony export */   "ly": () => (/* binding */ ly)
/* harmony export */ });
// Debugging:
const lc = x => {
  console.log('%c' + x, 'color: cyan');
};
const lg = x => {
  console.log('%c' + x, 'color: lightgreen');
};
const lo = x => {
  console.log('%c' + x, 'color: darkorange');
};
const lp = x => {
  console.log('%c' + x, 'color: hotpink');
};
const lb = x => {
  console.log('%c' + x, 'color: deepskyblue');
};
const lr = x => {
  console.log('%c' + x, 'color: red');
};
const ly = x => {
  console.log('%c' + x, 'color: yellow');
};

// ==============================================

const log = function (x, color) {
  let title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  console.log(`%c ${title}:
    ${JSON.stringify(x, undefined, 2)}`, `
      color: ${color}; 
      background: black;
    `);
};

// ==============================================



/***/ }),

/***/ "./src/util/routes.js":
/*!****************************!*\
  !*** ./src/util/routes.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "redirect": () => (/* binding */ redirect)
/* harmony export */ });
const redirect = href => window.location.href = href;


/***/ }),

/***/ "./src/util/transition.js":
/*!********************************!*\
  !*** ./src/util/transition.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "transition": () => (/* binding */ transition),
/* harmony export */   "transitionTextColor": () => (/* binding */ transitionTextColor)
/* harmony export */ });
const transition = function (condition, classes_if, classes_else) {
  let ease = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  // ex: 
  //  transition(panel === 1, 'translate-x-full', 'translate-x-0')
  //  transition(open, 'translate-x-0 opacity-100 scale-100','translate-x-0 transform opacity-0 scale-95', 'ease-in-out duration-300')
  return `${condition ? classes_if : classes_else} ${ease}`;
};
const transitionTextColor = function (condition, classes_if, classes_else) {
  let ease = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  // ex: 
  // class={
  //   `
  //     ${transitionTextColor(active_panel === idx, 'text-gray-900  bg-blue-500', 'text-gray-400  bg-red-500')}
  //   `
  // }
  return `
    transition  ease-in-out  duration-300
    ${condition ? classes_if : classes_else} 
  `;
};


/***/ }),

/***/ "./node_modules/clsx/dist/clsx.m.js":
/*!******************************************!*\
  !*** ./node_modules/clsx/dist/clsx.m.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function toVal(mix) {
	var k, y, str='';

	if (typeof mix === 'string' || typeof mix === 'number') {
		str += mix;
	} else if (typeof mix === 'object') {
		if (Array.isArray(mix)) {
			for (k=0; k < mix.length; k++) {
				if (mix[k]) {
					if (y = toVal(mix[k])) {
						str && (str += ' ');
						str += y;
					}
				}
			}
		} else {
			for (k in mix) {
				if (mix[k]) {
					str && (str += ' ');
					str += k;
				}
			}
		}
	}

	return str;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
	var i=0, tmp, x, str='';
	while (i < arguments.length) {
		if (tmp = arguments[i++]) {
			if (x = toVal(tmp)) {
				str && (str += ' ');
				str += x
			}
		}
	}
	return str;
}


/***/ }),

/***/ "./node_modules/gsap/CSSPlugin.js":
/*!****************************************!*\
  !*** ./node_modules/gsap/CSSPlugin.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CSSPlugin": () => (/* binding */ CSSPlugin),
/* harmony export */   "_createElement": () => (/* binding */ _createElement),
/* harmony export */   "_getBBox": () => (/* binding */ _getBBox),
/* harmony export */   "checkPrefix": () => (/* binding */ _checkPropPrefix),
/* harmony export */   "default": () => (/* binding */ CSSPlugin)
/* harmony export */ });
/* harmony import */ var _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gsap-core.js */ "./node_modules/gsap/gsap-core.js");
/*!
 * CSSPlugin 3.11.3
 * https://greensock.com
 *
 * Copyright 2008-2022, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */


var _win,
    _doc,
    _docElement,
    _pluginInitted,
    _tempDiv,
    _tempDivStyler,
    _recentSetterPlugin,
    _reverting,
    _windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _transformProps = {},
    _RAD2DEG = 180 / Math.PI,
    _DEG2RAD = Math.PI / 180,
    _atan2 = Math.atan2,
    _bigNum = 1e8,
    _capsExp = /([A-Z])/g,
    _horizontalExp = /(left|right|width|margin|padding|x)/i,
    _complexExp = /[\s,\(]\S/,
    _propertyAliases = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
},
    _renderCSSProp = function _renderCSSProp(ratio, data) {
  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
},
    _renderPropWithEnd = function _renderPropWithEnd(ratio, data) {
  return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
},
    _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning(ratio, data) {
  return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u : data.b, data);
},
    //if units change, we need a way to render the original unit/value when the tween goes all the way back to the beginning (ratio:0)
_renderRoundedCSSProp = function _renderRoundedCSSProp(ratio, data) {
  var value = data.s + data.c * ratio;
  data.set(data.t, data.p, ~~(value + (value < 0 ? -.5 : .5)) + data.u, data);
},
    _renderNonTweeningValue = function _renderNonTweeningValue(ratio, data) {
  return data.set(data.t, data.p, ratio ? data.e : data.b, data);
},
    _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd(ratio, data) {
  return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
},
    _setterCSSStyle = function _setterCSSStyle(target, property, value) {
  return target.style[property] = value;
},
    _setterCSSProp = function _setterCSSProp(target, property, value) {
  return target.style.setProperty(property, value);
},
    _setterTransform = function _setterTransform(target, property, value) {
  return target._gsap[property] = value;
},
    _setterScale = function _setterScale(target, property, value) {
  return target._gsap.scaleX = target._gsap.scaleY = value;
},
    _setterScaleWithRender = function _setterScaleWithRender(target, property, value, data, ratio) {
  var cache = target._gsap;
  cache.scaleX = cache.scaleY = value;
  cache.renderTransform(ratio, cache);
},
    _setterTransformWithRender = function _setterTransformWithRender(target, property, value, data, ratio) {
  var cache = target._gsap;
  cache[property] = value;
  cache.renderTransform(ratio, cache);
},
    _transformProp = "transform",
    _transformOriginProp = _transformProp + "Origin",
    _saveStyle = function _saveStyle(property, isNotCSS) {
  var _this = this;

  var target = this.target,
      style = target.style;

  if (property in _transformProps) {
    this.tfm = this.tfm || {};

    if (property !== "transform") {
      property = _propertyAliases[property] || property;
      ~property.indexOf(",") ? property.split(",").forEach(function (a) {
        return _this.tfm[a] = _get(target, a);
      }) : this.tfm[property] = target._gsap.x ? target._gsap[property] : _get(target, property); // note: scale would map to "scaleX,scaleY", thus we loop and apply them both.
    }

    if (this.props.indexOf(_transformProp) >= 0) {
      return;
    }

    if (target._gsap.svg) {
      this.svgo = target.getAttribute("data-svg-origin");
      this.props.push(_transformOriginProp, isNotCSS, "");
    }

    property = _transformProp;
  }

  (style || isNotCSS) && this.props.push(property, isNotCSS, style[property]);
},
    _removeIndependentTransforms = function _removeIndependentTransforms(style) {
  if (style.translate) {
    style.removeProperty("translate");
    style.removeProperty("scale");
    style.removeProperty("rotate");
  }
},
    _revertStyle = function _revertStyle() {
  var props = this.props,
      target = this.target,
      style = target.style,
      cache = target._gsap,
      i,
      p;

  for (i = 0; i < props.length; i += 3) {
    // stored like this: property, isNotCSS, value
    props[i + 1] ? target[props[i]] = props[i + 2] : props[i + 2] ? style[props[i]] = props[i + 2] : style.removeProperty(props[i].replace(_capsExp, "-$1").toLowerCase());
  }

  if (this.tfm) {
    for (p in this.tfm) {
      cache[p] = this.tfm[p];
    }

    if (cache.svg) {
      cache.renderTransform();
      target.setAttribute("data-svg-origin", this.svgo || "");
    }

    i = _reverting();

    if (i && !i.isStart && !style[_transformProp]) {
      _removeIndependentTransforms(style);

      cache.uncache = 1; // if it's a startAt that's being reverted in the _initTween() of the core, we don't need to uncache transforms. This is purely a performance optimization.
    }
  }
},
    _getStyleSaver = function _getStyleSaver(target, properties) {
  var saver = {
    target: target,
    props: [],
    revert: _revertStyle,
    save: _saveStyle
  };
  properties && properties.split(",").forEach(function (p) {
    return saver.save(p);
  });
  return saver;
},
    _supports3D,
    _createElement = function _createElement(type, ns) {
  var e = _doc.createElementNS ? _doc.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc.createElement(type); //some servers swap in https for http in the namespace which can break things, making "style" inaccessible.

  return e.style ? e : _doc.createElement(type); //some environments won't allow access to the element's style when created with a namespace in which case we default to the standard createElement() to work around the issue. Also note that when GSAP is embedded directly inside an SVG file, createElement() won't allow access to the style object in Firefox (see https://greensock.com/forums/topic/20215-problem-using-tweenmax-in-standalone-self-containing-svg-file-err-cannot-set-property-csstext-of-undefined/).
},
    _getComputedProperty = function _getComputedProperty(target, property, skipPrefixFallback) {
  var cs = getComputedStyle(target);
  return cs[property] || cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty(target, _checkPropPrefix(property) || property, 1) || ""; //css variables may not need caps swapped out for dashes and lowercase.
},
    _prefixes = "O,Moz,ms,Ms,Webkit".split(","),
    _checkPropPrefix = function _checkPropPrefix(property, element, preferPrefix) {
  var e = element || _tempDiv,
      s = e.style,
      i = 5;

  if (property in s && !preferPrefix) {
    return property;
  }

  property = property.charAt(0).toUpperCase() + property.substr(1);

  while (i-- && !(_prefixes[i] + property in s)) {}

  return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
},
    _initCore = function _initCore() {
  if (_windowExists() && window.document) {
    _win = window;
    _doc = _win.document;
    _docElement = _doc.documentElement;
    _tempDiv = _createElement("div") || {
      style: {}
    };
    _tempDivStyler = _createElement("div");
    _transformProp = _checkPropPrefix(_transformProp);
    _transformOriginProp = _transformProp + "Origin";
    _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0"; //make sure to override certain properties that may contaminate measurements, in case the user has overreaching style sheets.

    _supports3D = !!_checkPropPrefix("perspective");
    _reverting = _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.gsap.core.reverting;
    _pluginInitted = 1;
  }
},
    _getBBoxHack = function _getBBoxHack(swapIfPossible) {
  //works around issues in some browsers (like Firefox) that don't correctly report getBBox() on SVG elements inside a <defs> element and/or <mask>. We try creating an SVG, adding it to the documentElement and toss the element in there so that it's definitely part of the rendering tree, then grab the bbox and if it works, we actually swap out the original getBBox() method for our own that does these extra steps whenever getBBox is needed. This helps ensure that performance is optimal (only do all these extra steps when absolutely necessary...most elements don't need it).
  var svg = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
      oldParent = this.parentNode,
      oldSibling = this.nextSibling,
      oldCSS = this.style.cssText,
      bbox;

  _docElement.appendChild(svg);

  svg.appendChild(this);
  this.style.display = "block";

  if (swapIfPossible) {
    try {
      bbox = this.getBBox();
      this._gsapBBox = this.getBBox; //store the original

      this.getBBox = _getBBoxHack;
    } catch (e) {}
  } else if (this._gsapBBox) {
    bbox = this._gsapBBox();
  }

  if (oldParent) {
    if (oldSibling) {
      oldParent.insertBefore(this, oldSibling);
    } else {
      oldParent.appendChild(this);
    }
  }

  _docElement.removeChild(svg);

  this.style.cssText = oldCSS;
  return bbox;
},
    _getAttributeFallbacks = function _getAttributeFallbacks(target, attributesArray) {
  var i = attributesArray.length;

  while (i--) {
    if (target.hasAttribute(attributesArray[i])) {
      return target.getAttribute(attributesArray[i]);
    }
  }
},
    _getBBox = function _getBBox(target) {
  var bounds;

  try {
    bounds = target.getBBox(); //Firefox throws errors if you try calling getBBox() on an SVG element that's not rendered (like in a <symbol> or <defs>). https://bugzilla.mozilla.org/show_bug.cgi?id=612118
  } catch (error) {
    bounds = _getBBoxHack.call(target, true);
  }

  bounds && (bounds.width || bounds.height) || target.getBBox === _getBBoxHack || (bounds = _getBBoxHack.call(target, true)); //some browsers (like Firefox) misreport the bounds if the element has zero width and height (it just assumes it's at x:0, y:0), thus we need to manually grab the position in that case.

  return bounds && !bounds.width && !bounds.x && !bounds.y ? {
    x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
    y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : bounds;
},
    _isSVG = function _isSVG(e) {
  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
},
    //reports if the element is an SVG on which getBBox() actually works
_removeProperty = function _removeProperty(target, property) {
  if (property) {
    var style = target.style;

    if (property in _transformProps && property !== _transformOriginProp) {
      property = _transformProp;
    }

    if (style.removeProperty) {
      if (property.substr(0, 2) === "ms" || property.substr(0, 6) === "webkit") {
        //Microsoft and some Webkit browsers don't conform to the standard of capitalizing the first prefix character, so we adjust so that when we prefix the caps with a dash, it's correct (otherwise it'd be "ms-transform" instead of "-ms-transform" for IE9, for example)
        property = "-" + property;
      }

      style.removeProperty(property.replace(_capsExp, "-$1").toLowerCase());
    } else {
      //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
      style.removeAttribute(property);
    }
  }
},
    _addNonTweeningPT = function _addNonTweeningPT(plugin, target, property, beginning, end, onlySetAtEnd) {
  var pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
  plugin._pt = pt;
  pt.b = beginning;
  pt.e = end;

  plugin._props.push(property);

  return pt;
},
    _nonConvertibleUnits = {
  deg: 1,
  rad: 1,
  turn: 1
},
    _nonStandardLayouts = {
  grid: 1,
  flex: 1
},
    //takes a single value like 20px and converts it to the unit specified, like "%", returning only the numeric amount.
_convertToUnit = function _convertToUnit(target, property, value, unit) {
  var curValue = parseFloat(value) || 0,
      curUnit = (value + "").trim().substr((curValue + "").length) || "px",
      // some browsers leave extra whitespace at the beginning of CSS variables, hence the need to trim()
  style = _tempDiv.style,
      horizontal = _horizontalExp.test(property),
      isRootSVG = target.tagName.toLowerCase() === "svg",
      measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"),
      amount = 100,
      toPixels = unit === "px",
      toPercent = unit === "%",
      px,
      parent,
      cache,
      isSVG;

  if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
    return curValue;
  }

  curUnit !== "px" && !toPixels && (curValue = _convertToUnit(target, property, value, "px"));
  isSVG = target.getCTM && _isSVG(target);

  if ((toPercent || curUnit === "%") && (_transformProps[property] || ~property.indexOf("adius"))) {
    px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
    return (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(toPercent ? curValue / px * amount : curValue / 100 * px);
  }

  style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
  parent = ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;

  if (isSVG) {
    parent = (target.ownerSVGElement || {}).parentNode;
  }

  if (!parent || parent === _doc || !parent.appendChild) {
    parent = _doc.body;
  }

  cache = parent._gsap;

  if (cache && toPercent && cache.width && horizontal && cache.time === _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._ticker.time && !cache.uncache) {
    return (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(curValue / cache.width * amount);
  } else {
    (toPercent || curUnit === "%") && !_nonStandardLayouts[_getComputedProperty(parent, "display")] && (style.position = _getComputedProperty(target, "position"));
    parent === target && (style.position = "static"); // like for borderRadius, if it's a % we must have it relative to the target itself but that may not have position: relative or position: absolute in which case it'd go up the chain until it finds its offsetParent (bad). position: static protects against that.

    parent.appendChild(_tempDiv);
    px = _tempDiv[measureProperty];
    parent.removeChild(_tempDiv);
    style.position = "absolute";

    if (horizontal && toPercent) {
      cache = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._getCache)(parent);
      cache.time = _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._ticker.time;
      cache.width = parent[measureProperty];
    }
  }

  return (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
},
    _get = function _get(target, property, unit, uncache) {
  var value;
  _pluginInitted || _initCore();

  if (property in _propertyAliases && property !== "transform") {
    property = _propertyAliases[property];

    if (~property.indexOf(",")) {
      property = property.split(",")[0];
    }
  }

  if (_transformProps[property] && property !== "transform") {
    value = _parseTransform(target, uncache);
    value = property !== "transformOrigin" ? value[property] : value.svg ? value.origin : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
  } else {
    value = target.style[property];

    if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
      value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._getProperty)(target, property) || (property === "opacity" ? 1 : 0); // note: some browsers, like Firefox, don't report borderRadius correctly! Instead, it only reports every corner like  borderTopLeftRadius
    }
  }

  return unit && !~(value + "").trim().indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
},
    _tweenComplexCSSString = function _tweenComplexCSSString(target, prop, start, end) {
  // note: we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
  if (!start || start === "none") {
    // some browsers like Safari actually PREFER the prefixed property and mis-report the unprefixed value like clipPath (BUG). In other words, even though clipPath exists in the style ("clipPath" in target.style) and it's set in the CSS properly (along with -webkit-clip-path), Safari reports clipPath as "none" whereas WebkitClipPath reports accurately like "ellipse(100% 0% at 50% 0%)", so in this case we must SWITCH to using the prefixed property instead. See https://greensock.com/forums/topic/18310-clippath-doesnt-work-on-ios/
    var p = _checkPropPrefix(prop, target, 1),
        s = p && _getComputedProperty(target, p, 1);

    if (s && s !== start) {
      prop = p;
      start = s;
    } else if (prop === "borderColor") {
      start = _getComputedProperty(target, "borderTopColor"); // Firefox bug: always reports "borderColor" as "", so we must fall back to borderTopColor. See https://greensock.com/forums/topic/24583-how-to-return-colors-that-i-had-after-reverse/
    }
  }

  var pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.PropTween(this._pt, target.style, prop, 0, 1, _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._renderComplexString),
      index = 0,
      matchIndex = 0,
      a,
      result,
      startValues,
      startNum,
      color,
      startValue,
      endValue,
      endNum,
      chunk,
      endUnit,
      startUnit,
      endValues;
  pt.b = start;
  pt.e = end;
  start += ""; // ensure values are strings

  end += "";

  if (end === "auto") {
    target.style[prop] = end;
    end = _getComputedProperty(target, prop) || end;
    target.style[prop] = start;
  }

  a = [start, end];

  (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._colorStringFilter)(a); // pass an array with the starting and ending values and let the filter do whatever it needs to the values. If colors are found, it returns true and then we must match where the color shows up order-wise because for things like boxShadow, sometimes the browser provides the computed values with the color FIRST, but the user provides it with the color LAST, so flip them if necessary. Same for drop-shadow().


  start = a[0];
  end = a[1];
  startValues = start.match(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._numWithUnitExp) || [];
  endValues = end.match(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._numWithUnitExp) || [];

  if (endValues.length) {
    while (result = _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._numWithUnitExp.exec(end)) {
      endValue = result[0];
      chunk = end.substring(index, result.index);

      if (color) {
        color = (color + 1) % 5;
      } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
        color = 1;
      }

      if (endValue !== (startValue = startValues[matchIndex++] || "")) {
        startNum = parseFloat(startValue) || 0;
        startUnit = startValue.substr((startNum + "").length);
        endValue.charAt(1) === "=" && (endValue = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._parseRelative)(startNum, endValue) + startUnit);
        endNum = parseFloat(endValue);
        endUnit = endValue.substr((endNum + "").length);
        index = _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._numWithUnitExp.lastIndex - endUnit.length;

        if (!endUnit) {
          //if something like "perspective:300" is passed in and we must add a unit to the end
          endUnit = endUnit || _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._config.units[prop] || startUnit;

          if (index === end.length) {
            end += endUnit;
            pt.e += endUnit;
          }
        }

        if (startUnit !== endUnit) {
          startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
        } // these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.


        pt._pt = {
          _next: pt._pt,
          p: chunk || matchIndex === 1 ? chunk : ",",
          //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
          s: startNum,
          c: endNum - startNum,
          m: color && color < 4 || prop === "zIndex" ? Math.round : 0
        };
      }
    }

    pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)
  } else {
    pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
  }

  _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._relExp.test(end) && (pt.e = 0); //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).

  this._pt = pt; //start the linked list with this new PropTween. Remember, we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within another plugin too, thus "this" would refer to the plugin.

  return pt;
},
    _keywordToPercent = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
},
    _convertKeywordsToPercentages = function _convertKeywordsToPercentages(value) {
  var split = value.split(" "),
      x = split[0],
      y = split[1] || "50%";

  if (x === "top" || x === "bottom" || y === "left" || y === "right") {
    //the user provided them in the wrong order, so flip them
    value = x;
    x = y;
    y = value;
  }

  split[0] = _keywordToPercent[x] || x;
  split[1] = _keywordToPercent[y] || y;
  return split.join(" ");
},
    _renderClearProps = function _renderClearProps(ratio, data) {
  if (data.tween && data.tween._time === data.tween._dur) {
    var target = data.t,
        style = target.style,
        props = data.u,
        cache = target._gsap,
        prop,
        clearTransforms,
        i;

    if (props === "all" || props === true) {
      style.cssText = "";
      clearTransforms = 1;
    } else {
      props = props.split(",");
      i = props.length;

      while (--i > -1) {
        prop = props[i];

        if (_transformProps[prop]) {
          clearTransforms = 1;
          prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp;
        }

        _removeProperty(target, prop);
      }
    }

    if (clearTransforms) {
      _removeProperty(target, _transformProp);

      if (cache) {
        cache.svg && target.removeAttribute("transform");

        _parseTransform(target, 1); // force all the cached values back to "normal"/identity, otherwise if there's another tween that's already set to render transforms on this element, it could display the wrong values.


        cache.uncache = 1;

        _removeIndependentTransforms(style);
      }
    }
  }
},
    // note: specialProps should return 1 if (and only if) they have a non-zero priority. It indicates we need to sort the linked list.
_specialProps = {
  clearProps: function clearProps(plugin, target, property, endValue, tween) {
    if (tween.data !== "isFromStart") {
      var pt = plugin._pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
      pt.u = endValue;
      pt.pr = -10;
      pt.tween = tween;

      plugin._props.push(property);

      return 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://greensock.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */

},

/*
 * --------------------------------------------------------------------------------------
 * TRANSFORMS
 * --------------------------------------------------------------------------------------
 */
_identity2DMatrix = [1, 0, 0, 1, 0, 0],
    _rotationalProperties = {},
    _isNullTransform = function _isNullTransform(value) {
  return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
},
    _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray(target) {
  var matrixString = _getComputedProperty(target, _transformProp);

  return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._numExp).map(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round);
},
    _getMatrix = function _getMatrix(target, force2D) {
  var cache = target._gsap || (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._getCache)(target),
      style = target.style,
      matrix = _getComputedTransformMatrixAsArray(target),
      parent,
      nextSibling,
      temp,
      addedToDOM;

  if (cache.svg && target.getAttribute("transform")) {
    temp = target.transform.baseVal.consolidate().matrix; //ensures that even complex values like "translate(50,60) rotate(135,0,0)" are parsed because it mashes it into a matrix.

    matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
    return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
  } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
    //note: if offsetParent is null, that means the element isn't in the normal document flow, like if it has display:none or one of its ancestors has display:none). Firefox returns null for getComputedStyle() if the element is in an iframe that has display:none. https://bugzilla.mozilla.org/show_bug.cgi?id=548397
    //browsers don't report transforms accurately unless the element is in the DOM and has a display value that's not "none". Firefox and Microsoft browsers have a partial bug where they'll report transforms even if display:none BUT not any percentage-based values like translate(-50%, 8px) will be reported as if it's translate(0, 8px).
    temp = style.display;
    style.display = "block";
    parent = target.parentNode;

    if (!parent || !target.offsetParent) {
      // note: in 3.3.0 we switched target.offsetParent to _doc.body.contains(target) to avoid [sometimes unnecessary] MutationObserver calls but that wasn't adequate because there are edge cases where nested position: fixed elements need to get reparented to accurately sense transforms. See https://github.com/greensock/GSAP/issues/388 and https://github.com/greensock/GSAP/issues/375
      addedToDOM = 1; //flag

      nextSibling = target.nextElementSibling;

      _docElement.appendChild(target); //we must add it to the DOM in order to get values properly

    }

    matrix = _getComputedTransformMatrixAsArray(target);
    temp ? style.display = temp : _removeProperty(target, "display");

    if (addedToDOM) {
      nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
    }
  }

  return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
},
    _applySVGOrigin = function _applySVGOrigin(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
  var cache = target._gsap,
      matrix = matrixArray || _getMatrix(target, true),
      xOriginOld = cache.xOrigin || 0,
      yOriginOld = cache.yOrigin || 0,
      xOffsetOld = cache.xOffset || 0,
      yOffsetOld = cache.yOffset || 0,
      a = matrix[0],
      b = matrix[1],
      c = matrix[2],
      d = matrix[3],
      tx = matrix[4],
      ty = matrix[5],
      originSplit = origin.split(" "),
      xOrigin = parseFloat(originSplit[0]) || 0,
      yOrigin = parseFloat(originSplit[1]) || 0,
      bounds,
      determinant,
      x,
      y;

  if (!originIsAbsolute) {
    bounds = _getBBox(target);
    xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
    yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
  } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
    //if it's zero (like if scaleX and scaleY are zero), skip it to avoid errors with dividing by zero.
    x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
    y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
    xOrigin = x;
    yOrigin = y;
  }

  if (smooth || smooth !== false && cache.smooth) {
    tx = xOrigin - xOriginOld;
    ty = yOrigin - yOriginOld;
    cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
    cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
  } else {
    cache.xOffset = cache.yOffset = 0;
  }

  cache.xOrigin = xOrigin;
  cache.yOrigin = yOrigin;
  cache.smooth = !!smooth;
  cache.origin = origin;
  cache.originIsAbsolute = !!originIsAbsolute;
  target.style[_transformOriginProp] = "0px 0px"; //otherwise, if someone sets  an origin via CSS, it will likely interfere with the SVG transform attribute ones (because remember, we're baking the origin into the matrix() value).

  if (pluginToAddPropTweensTo) {
    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);

    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);

    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);

    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
  }

  target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
},
    _parseTransform = function _parseTransform(target, uncache) {
  var cache = target._gsap || new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.GSCache(target);

  if ("x" in cache && !uncache && !cache.uncache) {
    return cache;
  }

  var style = target.style,
      invertedScaleX = cache.scaleX < 0,
      px = "px",
      deg = "deg",
      cs = getComputedStyle(target),
      origin = _getComputedProperty(target, _transformOriginProp) || "0",
      x,
      y,
      z,
      scaleX,
      scaleY,
      rotation,
      rotationX,
      rotationY,
      skewX,
      skewY,
      perspective,
      xOrigin,
      yOrigin,
      matrix,
      angle,
      cos,
      sin,
      a,
      b,
      c,
      d,
      a12,
      a22,
      t1,
      t2,
      t3,
      a13,
      a23,
      a33,
      a42,
      a43,
      a32;
  x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
  scaleX = scaleY = 1;
  cache.svg = !!(target.getCTM && _isSVG(target));

  if (cs.translate) {
    // accommodate independent transforms by combining them into normal ones.
    if (cs.translate !== "none" || cs.scale !== "none" || cs.rotate !== "none") {
      style[_transformProp] = (cs.translate !== "none" ? "translate3d(" + (cs.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (cs.rotate !== "none" ? "rotate(" + cs.rotate + ") " : "") + (cs.scale !== "none" ? "scale(" + cs.scale.split(" ").join(",") + ") " : "") + (cs[_transformProp] !== "none" ? cs[_transformProp] : "");
    }

    style.scale = style.rotate = style.translate = "none";
  }

  matrix = _getMatrix(target, cache.svg);

  if (cache.svg) {
    if (cache.uncache) {
      // if cache.uncache is true (and maybe if origin is 0,0), we need to set element.style.transformOrigin = (cache.xOrigin - bbox.x) + "px " + (cache.yOrigin - bbox.y) + "px". Previously we let the data-svg-origin stay instead, but when introducing revert(), it complicated things.
      t2 = target.getBBox();
      origin = cache.xOrigin - t2.x + "px " + (cache.yOrigin - t2.y) + "px";
      t1 = "";
    } else {
      t1 = !uncache && target.getAttribute("data-svg-origin"); //  Remember, to work around browser inconsistencies we always force SVG elements' transformOrigin to 0,0 and offset the translation accordingly.
    }

    _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
  }

  xOrigin = cache.xOrigin || 0;
  yOrigin = cache.yOrigin || 0;

  if (matrix !== _identity2DMatrix) {
    a = matrix[0]; //a11

    b = matrix[1]; //a21

    c = matrix[2]; //a31

    d = matrix[3]; //a41

    x = a12 = matrix[4];
    y = a22 = matrix[5]; //2D matrix

    if (matrix.length === 6) {
      scaleX = Math.sqrt(a * a + b * b);
      scaleY = Math.sqrt(d * d + c * c);
      rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).

      skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
      skewX && (scaleY *= Math.abs(Math.cos(skewX * _DEG2RAD)));

      if (cache.svg) {
        x -= xOrigin - (xOrigin * a + yOrigin * c);
        y -= yOrigin - (xOrigin * b + yOrigin * d);
      } //3D matrix

    } else {
      a32 = matrix[6];
      a42 = matrix[7];
      a13 = matrix[8];
      a23 = matrix[9];
      a33 = matrix[10];
      a43 = matrix[11];
      x = matrix[12];
      y = matrix[13];
      z = matrix[14];
      angle = _atan2(a32, a33);
      rotationX = angle * _RAD2DEG; //rotationX

      if (angle) {
        cos = Math.cos(-angle);
        sin = Math.sin(-angle);
        t1 = a12 * cos + a13 * sin;
        t2 = a22 * cos + a23 * sin;
        t3 = a32 * cos + a33 * sin;
        a13 = a12 * -sin + a13 * cos;
        a23 = a22 * -sin + a23 * cos;
        a33 = a32 * -sin + a33 * cos;
        a43 = a42 * -sin + a43 * cos;
        a12 = t1;
        a22 = t2;
        a32 = t3;
      } //rotationY


      angle = _atan2(-c, a33);
      rotationY = angle * _RAD2DEG;

      if (angle) {
        cos = Math.cos(-angle);
        sin = Math.sin(-angle);
        t1 = a * cos - a13 * sin;
        t2 = b * cos - a23 * sin;
        t3 = c * cos - a33 * sin;
        a43 = d * sin + a43 * cos;
        a = t1;
        b = t2;
        c = t3;
      } //rotationZ


      angle = _atan2(b, a);
      rotation = angle * _RAD2DEG;

      if (angle) {
        cos = Math.cos(angle);
        sin = Math.sin(angle);
        t1 = a * cos + b * sin;
        t2 = a12 * cos + a22 * sin;
        b = b * cos - a * sin;
        a22 = a22 * cos - a12 * sin;
        a = t1;
        a12 = t2;
      }

      if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
        //when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
        rotationX = rotation = 0;
        rotationY = 180 - rotationY;
      }

      scaleX = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(Math.sqrt(a * a + b * b + c * c));
      scaleY = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(Math.sqrt(a22 * a22 + a32 * a32));
      angle = _atan2(a12, a22);
      skewX = Math.abs(angle) > 0.0002 ? angle * _RAD2DEG : 0;
      perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
    }

    if (cache.svg) {
      //sense if there are CSS transforms applied on an SVG element in which case we must overwrite them when rendering. The transform attribute is more reliable cross-browser, but we can't just remove the CSS ones because they may be applied in a CSS rule somewhere (not just inline).
      t1 = target.getAttribute("transform");
      cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
      t1 && target.setAttribute("transform", t1);
    }
  }

  if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
    if (invertedScaleX) {
      scaleX *= -1;
      skewX += rotation <= 0 ? 180 : -180;
      rotation += rotation <= 0 ? 180 : -180;
    } else {
      scaleY *= -1;
      skewX += skewX <= 0 ? 180 : -180;
    }
  }

  uncache = uncache || cache.uncache;
  cache.x = x - ((cache.xPercent = x && (!uncache && cache.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache.xPercent / 100 : 0) + px;
  cache.y = y - ((cache.yPercent = y && (!uncache && cache.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0))) ? target.offsetHeight * cache.yPercent / 100 : 0) + px;
  cache.z = z + px;
  cache.scaleX = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(scaleX);
  cache.scaleY = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(scaleY);
  cache.rotation = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(rotation) + deg;
  cache.rotationX = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(rotationX) + deg;
  cache.rotationY = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(rotationY) + deg;
  cache.skewX = skewX + deg;
  cache.skewY = skewY + deg;
  cache.transformPerspective = perspective + px;

  if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || 0) {
    style[_transformOriginProp] = _firstTwoOnly(origin);
  }

  cache.xOffset = cache.yOffset = 0;
  cache.force3D = _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._config.force3D;
  cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
  cache.uncache = 0;
  return cache;
},
    _firstTwoOnly = function _firstTwoOnly(value) {
  return (value = value.split(" "))[0] + " " + value[1];
},
    //for handling transformOrigin values, stripping out the 3rd dimension
_addPxTranslate = function _addPxTranslate(target, start, value) {
  var unit = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.getUnit)(start);
  return (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
},
    _renderNon3DTransforms = function _renderNon3DTransforms(ratio, cache) {
  cache.z = "0px";
  cache.rotationY = cache.rotationX = "0deg";
  cache.force3D = 0;

  _renderCSSTransforms(ratio, cache);
},
    _zeroDeg = "0deg",
    _zeroPx = "0px",
    _endParenthesis = ") ",
    _renderCSSTransforms = function _renderCSSTransforms(ratio, cache) {
  var _ref = cache || this,
      xPercent = _ref.xPercent,
      yPercent = _ref.yPercent,
      x = _ref.x,
      y = _ref.y,
      z = _ref.z,
      rotation = _ref.rotation,
      rotationY = _ref.rotationY,
      rotationX = _ref.rotationX,
      skewX = _ref.skewX,
      skewY = _ref.skewY,
      scaleX = _ref.scaleX,
      scaleY = _ref.scaleY,
      transformPerspective = _ref.transformPerspective,
      force3D = _ref.force3D,
      target = _ref.target,
      zOrigin = _ref.zOrigin,
      transforms = "",
      use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true; // Safari has a bug that causes it not to render 3D transform-origin values properly, so we force the z origin to 0, record it in the cache, and then do the math here to offset the translate values accordingly (basically do the 3D transform-origin part manually)


  if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
    var angle = parseFloat(rotationY) * _DEG2RAD,
        a13 = Math.sin(angle),
        a33 = Math.cos(angle),
        cos;

    angle = parseFloat(rotationX) * _DEG2RAD;
    cos = Math.cos(angle);
    x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
    y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
    z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
  }

  if (transformPerspective !== _zeroPx) {
    transforms += "perspective(" + transformPerspective + _endParenthesis;
  }

  if (xPercent || yPercent) {
    transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
  }

  if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
    transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
  }

  if (rotation !== _zeroDeg) {
    transforms += "rotate(" + rotation + _endParenthesis;
  }

  if (rotationY !== _zeroDeg) {
    transforms += "rotateY(" + rotationY + _endParenthesis;
  }

  if (rotationX !== _zeroDeg) {
    transforms += "rotateX(" + rotationX + _endParenthesis;
  }

  if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
    transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
  }

  if (scaleX !== 1 || scaleY !== 1) {
    transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
  }

  target.style[_transformProp] = transforms || "translate(0, 0)";
},
    _renderSVGTransforms = function _renderSVGTransforms(ratio, cache) {
  var _ref2 = cache || this,
      xPercent = _ref2.xPercent,
      yPercent = _ref2.yPercent,
      x = _ref2.x,
      y = _ref2.y,
      rotation = _ref2.rotation,
      skewX = _ref2.skewX,
      skewY = _ref2.skewY,
      scaleX = _ref2.scaleX,
      scaleY = _ref2.scaleY,
      target = _ref2.target,
      xOrigin = _ref2.xOrigin,
      yOrigin = _ref2.yOrigin,
      xOffset = _ref2.xOffset,
      yOffset = _ref2.yOffset,
      forceCSS = _ref2.forceCSS,
      tx = parseFloat(x),
      ty = parseFloat(y),
      a11,
      a21,
      a12,
      a22,
      temp;

  rotation = parseFloat(rotation);
  skewX = parseFloat(skewX);
  skewY = parseFloat(skewY);

  if (skewY) {
    //for performance reasons, we combine all skewing into the skewX and rotation values. Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of 10 degrees.
    skewY = parseFloat(skewY);
    skewX += skewY;
    rotation += skewY;
  }

  if (rotation || skewX) {
    rotation *= _DEG2RAD;
    skewX *= _DEG2RAD;
    a11 = Math.cos(rotation) * scaleX;
    a21 = Math.sin(rotation) * scaleX;
    a12 = Math.sin(rotation - skewX) * -scaleY;
    a22 = Math.cos(rotation - skewX) * scaleY;

    if (skewX) {
      skewY *= _DEG2RAD;
      temp = Math.tan(skewX - skewY);
      temp = Math.sqrt(1 + temp * temp);
      a12 *= temp;
      a22 *= temp;

      if (skewY) {
        temp = Math.tan(skewY);
        temp = Math.sqrt(1 + temp * temp);
        a11 *= temp;
        a21 *= temp;
      }
    }

    a11 = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(a11);
    a21 = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(a21);
    a12 = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(a12);
    a22 = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(a22);
  } else {
    a11 = scaleX;
    a22 = scaleY;
    a21 = a12 = 0;
  }

  if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
    tx = _convertToUnit(target, "x", x, "px");
    ty = _convertToUnit(target, "y", y, "px");
  }

  if (xOrigin || yOrigin || xOffset || yOffset) {
    tx = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
    ty = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
  }

  if (xPercent || yPercent) {
    //The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the translation to simulate it.
    temp = target.getBBox();
    tx = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(tx + xPercent / 100 * temp.width);
    ty = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(ty + yPercent / 100 * temp.height);
  }

  temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
  target.setAttribute("transform", temp);
  forceCSS && (target.style[_transformProp] = temp); //some browsers prioritize CSS transforms over the transform attribute. When we sense that the user has CSS transforms applied, we must overwrite them this way (otherwise some browser simply won't render the transform attribute changes!)
},
    _addRotationalPropTween = function _addRotationalPropTween(plugin, target, property, startNum, endValue) {
  var cap = 360,
      isString = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._isString)(endValue),
      endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1),
      change = endNum - startNum,
      finalValue = startNum + change + "deg",
      direction,
      pt;

  if (isString) {
    direction = endValue.split("_")[1];

    if (direction === "short") {
      change %= cap;

      if (change !== change % (cap / 2)) {
        change += change < 0 ? cap : -cap;
      }
    }

    if (direction === "cw" && change < 0) {
      change = (change + cap * _bigNum) % cap - ~~(change / cap) * cap;
    } else if (direction === "ccw" && change > 0) {
      change = (change - cap * _bigNum) % cap - ~~(change / cap) * cap;
    }
  }

  plugin._pt = pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
  pt.e = finalValue;
  pt.u = "deg";

  plugin._props.push(property);

  return pt;
},
    _assign = function _assign(target, source) {
  // Internet Explorer doesn't have Object.assign(), so we recreate it here.
  for (var p in source) {
    target[p] = source[p];
  }

  return target;
},
    _addRawTransformPTs = function _addRawTransformPTs(plugin, transforms, target) {
  //for handling cases where someone passes in a whole transform string, like transform: "scale(2, 3) rotate(20deg) translateY(30em)"
  var startCache = _assign({}, target._gsap),
      exclude = "perspective,force3D,transformOrigin,svgOrigin",
      style = target.style,
      endCache,
      p,
      startValue,
      endValue,
      startNum,
      endNum,
      startUnit,
      endUnit;

  if (startCache.svg) {
    startValue = target.getAttribute("transform");
    target.setAttribute("transform", "");
    style[_transformProp] = transforms;
    endCache = _parseTransform(target, 1);

    _removeProperty(target, _transformProp);

    target.setAttribute("transform", startValue);
  } else {
    startValue = getComputedStyle(target)[_transformProp];
    style[_transformProp] = transforms;
    endCache = _parseTransform(target, 1);
    style[_transformProp] = startValue;
  }

  for (p in _transformProps) {
    startValue = startCache[p];
    endValue = endCache[p];

    if (startValue !== endValue && exclude.indexOf(p) < 0) {
      //tweening to no perspective gives very unintuitive results - just keep the same perspective in that case.
      startUnit = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.getUnit)(startValue);
      endUnit = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.getUnit)(endValue);
      startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
      endNum = parseFloat(endValue);
      plugin._pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.PropTween(plugin._pt, endCache, p, startNum, endNum - startNum, _renderCSSProp);
      plugin._pt.u = endUnit || 0;

      plugin._props.push(p);
    }
  }

  _assign(endCache, startCache);
}; // handle splitting apart padding, margin, borderWidth, and borderRadius into their 4 components. Firefox, for example, won't report borderRadius correctly - it will only do borderTopLeftRadius and the other corners. We also want to handle paddingTop, marginLeft, borderRightWidth, etc.


(0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._forEachName)("padding,margin,Width,Radius", function (name, index) {
  var t = "Top",
      r = "Right",
      b = "Bottom",
      l = "Left",
      props = (index < 3 ? [t, r, b, l] : [t + l, t + r, b + r, b + l]).map(function (side) {
    return index < 2 ? name + side : "border" + side + name;
  });

  _specialProps[index > 1 ? "border" + name : name] = function (plugin, target, property, endValue, tween) {
    var a, vars;

    if (arguments.length < 4) {
      // getter, passed target, property, and unit (from _get())
      a = props.map(function (prop) {
        return _get(plugin, prop, property);
      });
      vars = a.join(" ");
      return vars.split(a[0]).length === 5 ? a[0] : vars;
    }

    a = (endValue + "").split(" ");
    vars = {};
    props.forEach(function (prop, i) {
      return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
    });
    plugin.init(target, vars, tween);
  };
});

var CSSPlugin = {
  name: "css",
  register: _initCore,
  targetTest: function targetTest(target) {
    return target.style && target.nodeType;
  },
  init: function init(target, vars, tween, index, targets) {
    var props = this._props,
        style = target.style,
        startAt = tween.vars.startAt,
        startValue,
        endValue,
        endNum,
        startNum,
        type,
        specialProp,
        p,
        startUnit,
        endUnit,
        relative,
        isTransformRelated,
        transformPropTween,
        cache,
        smooth,
        hasPriority,
        inlineProps;
    _pluginInitted || _initCore(); // we may call init() multiple times on the same plugin instance, like when adding special properties, so make sure we don't overwrite the revert data or inlineProps

    this.styles = this.styles || _getStyleSaver(target);
    inlineProps = this.styles.props;
    this.tween = tween;

    for (p in vars) {
      if (p === "autoRound") {
        continue;
      }

      endValue = vars[p];

      if (_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._plugins[p] && (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._checkPlugin)(p, vars, tween, index, target, targets)) {
        // plugins
        continue;
      }

      type = typeof endValue;
      specialProp = _specialProps[p];

      if (type === "function") {
        endValue = endValue.call(tween, index, target, targets);
        type = typeof endValue;
      }

      if (type === "string" && ~endValue.indexOf("random(")) {
        endValue = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._replaceRandom)(endValue);
      }

      if (specialProp) {
        specialProp(this, target, p, endValue, tween) && (hasPriority = 1);
      } else if (p.substr(0, 2) === "--") {
        //CSS variable
        startValue = (getComputedStyle(target).getPropertyValue(p) + "").trim();
        endValue += "";
        _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._colorExp.lastIndex = 0;

        if (!_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._colorExp.test(startValue)) {
          // colors don't have units
          startUnit = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.getUnit)(startValue);
          endUnit = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.getUnit)(endValue);
        }

        endUnit ? startUnit !== endUnit && (startValue = _convertToUnit(target, p, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
        this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p);
        props.push(p);
        inlineProps.push(p, 0, style[p]);
      } else if (type !== "undefined") {
        if (startAt && p in startAt) {
          // in case someone hard-codes a complex value as the start, like top: "calc(2vh / 2)". Without this, it'd use the computed value (always in px)
          startValue = typeof startAt[p] === "function" ? startAt[p].call(tween, index, target, targets) : startAt[p];
          (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._isString)(startValue) && ~startValue.indexOf("random(") && (startValue = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._replaceRandom)(startValue));
          (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.getUnit)(startValue + "") || (startValue += _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._config.units[p] || (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.getUnit)(_get(target, p)) || ""); // for cases when someone passes in a unitless value like {x: 100}; if we try setting translate(100, 0px) it won't work.

          (startValue + "").charAt(1) === "=" && (startValue = _get(target, p)); // can't work with relative values
        } else {
          startValue = _get(target, p);
        }

        startNum = parseFloat(startValue);
        relative = type === "string" && endValue.charAt(1) === "=" && endValue.substr(0, 2);
        relative && (endValue = endValue.substr(2));
        endNum = parseFloat(endValue);

        if (p in _propertyAliases) {
          if (p === "autoAlpha") {
            //special case where we control the visibility along with opacity. We still allow the opacity value to pass through and get tweened.
            if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
              //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
              startNum = 0;
            }

            inlineProps.push("visibility", 0, style.visibility);

            _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
          }

          if (p !== "scale" && p !== "transform") {
            p = _propertyAliases[p];
            ~p.indexOf(",") && (p = p.split(",")[0]);
          }
        }

        isTransformRelated = p in _transformProps; //--- TRANSFORM-RELATED ---

        if (isTransformRelated) {
          this.styles.save(p);

          if (!transformPropTween) {
            cache = target._gsap;
            cache.renderTransform && !vars.parseTransform || _parseTransform(target, vars.parseTransform); // if, for example, gsap.set(... {transform:"translateX(50vw)"}), the _get() call doesn't parse the transform, thus cache.renderTransform won't be set yet so force the parsing of the transform here.

            smooth = vars.smoothOrigin !== false && cache.smooth;
            transformPropTween = this._pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.PropTween(this._pt, style, _transformProp, 0, 1, cache.renderTransform, cache, 0, -1); //the first time through, create the rendering PropTween so that it runs LAST (in the linked list, we keep adding to the beginning)

            transformPropTween.dep = 1; //flag it as dependent so that if things get killed/overwritten and this is the only PropTween left, we can safely kill the whole tween.
          }

          if (p === "scale") {
            this._pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.PropTween(this._pt, cache, "scaleY", startNum, (relative ? (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._parseRelative)(startNum, relative + endNum) : endNum) - startNum || 0, _renderCSSProp);
            this._pt.u = 0;
            props.push("scaleY", p);
            p += "X";
          } else if (p === "transformOrigin") {
            inlineProps.push(_transformOriginProp, 0, style[_transformOriginProp]);
            endValue = _convertKeywordsToPercentages(endValue); //in case something like "left top" or "bottom right" is passed in. Convert to percentages.

            if (cache.svg) {
              _applySVGOrigin(target, endValue, 0, smooth, 0, this);
            } else {
              endUnit = parseFloat(endValue.split(" ")[2]) || 0; //handle the zOrigin separately!

              endUnit !== cache.zOrigin && _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);

              _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
            }

            continue;
          } else if (p === "svgOrigin") {
            _applySVGOrigin(target, endValue, 1, smooth, 0, this);

            continue;
          } else if (p in _rotationalProperties) {
            _addRotationalPropTween(this, cache, p, startNum, relative ? (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._parseRelative)(startNum, relative + endValue) : endValue);

            continue;
          } else if (p === "smoothOrigin") {
            _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);

            continue;
          } else if (p === "force3D") {
            cache[p] = endValue;
            continue;
          } else if (p === "transform") {
            _addRawTransformPTs(this, endValue, target);

            continue;
          }
        } else if (!(p in style)) {
          p = _checkPropPrefix(p) || p;
        }

        if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p in style) {
          startUnit = (startValue + "").substr((startNum + "").length);
          endNum || (endNum = 0); // protect against NaN

          endUnit = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.getUnit)(endValue) || (p in _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._config.units ? _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._config.units[p] : startUnit);
          startUnit !== endUnit && (startNum = _convertToUnit(target, p, startValue, endUnit));
          this._pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.PropTween(this._pt, isTransformRelated ? cache : style, p, startNum, (relative ? (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._parseRelative)(startNum, relative + endNum) : endNum) - startNum, !isTransformRelated && (endUnit === "px" || p === "zIndex") && vars.autoRound !== false ? _renderRoundedCSSProp : _renderCSSProp);
          this._pt.u = endUnit || 0;

          if (startUnit !== endUnit && endUnit !== "%") {
            //when the tween goes all the way back to the beginning, we need to revert it to the OLD/ORIGINAL value (with those units). We record that as a "b" (beginning) property and point to a render method that handles that. (performance optimization)
            this._pt.b = startValue;
            this._pt.r = _renderCSSPropWithBeginning;
          }
        } else if (!(p in style)) {
          if (p in target) {
            //maybe it's not a style - it could be a property added directly to an element in which case we'll try to animate that.
            this.add(target, p, startValue || target[p], relative ? relative + endValue : endValue, index, targets);
          } else {
            (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._missingPlugin)(p, endValue);

            continue;
          }
        } else {
          _tweenComplexCSSString.call(this, target, p, startValue, relative ? relative + endValue : endValue);
        }

        isTransformRelated || (p in style ? inlineProps.push(p, 0, style[p]) : inlineProps.push(p, 1, startValue || target[p]));
        props.push(p);
      }
    }

    hasPriority && (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._sortPropTweensByPriority)(this);
  },
  render: function render(ratio, data) {
    if (data.tween._time || !_reverting()) {
      var pt = data._pt;

      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }
    } else {
      data.styles.revert();
    }
  },
  get: _get,
  aliases: _propertyAliases,
  getSetter: function getSetter(target, property, plugin) {
    //returns a setter function that accepts target, property, value and applies it accordingly. Remember, properties like "x" aren't as simple as target.style.property = value because they've got to be applied to a proxy object and then merged into a transform string in a renderer.
    var p = _propertyAliases[property];
    p && p.indexOf(",") < 0 && (property = p);
    return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !(0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._isUndefined)(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._getSetter)(target, property);
  },
  core: {
    _removeProperty: _removeProperty,
    _getMatrix: _getMatrix
  }
};
_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.gsap.utils.checkPrefix = _checkPropPrefix;
_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.gsap.core.getStyleSaver = _getStyleSaver;

(function (positionAndScale, rotation, others, aliases) {
  var all = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._forEachName)(positionAndScale + "," + rotation + "," + others, function (name) {
    _transformProps[name] = 1;
  });

  (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._forEachName)(rotation, function (name) {
    _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._config.units[name] = "deg";
    _rotationalProperties[name] = 1;
  });

  _propertyAliases[all[13]] = positionAndScale + "," + rotation;

  (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._forEachName)(aliases, function (name) {
    var split = name.split(":");
    _propertyAliases[split[1]] = all[split[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");

(0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._forEachName)("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (name) {
  _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._config.units[name] = "px";
});

_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.gsap.registerPlugin(CSSPlugin);


/***/ }),

/***/ "./node_modules/gsap/Flip.js":
/*!***********************************!*\
  !*** ./node_modules/gsap/Flip.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Flip": () => (/* binding */ Flip),
/* harmony export */   "default": () => (/* binding */ Flip)
/* harmony export */ });
/* harmony import */ var _utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/matrix.js */ "./node_modules/gsap/utils/matrix.js");
/*!
 * Flip 3.11.3
 * https://greensock.com
 *
 * @license Copyright 2008-2022, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */


var _id = 1,
    _toArray,
    gsap,
    _batch,
    _batchAction,
    _body,
    _closestTenth,
    _forEachBatch = function _forEachBatch(batch, name) {
  return batch.actions.forEach(function (a) {
    return a.vars[name] && a.vars[name](a);
  });
},
    _batchLookup = {},
    _RAD2DEG = 180 / Math.PI,
    _DEG2RAD = Math.PI / 180,
    _emptyObj = {},
    _dashedNameLookup = {},
    _memoizedRemoveProps = {},
    _listToArray = function _listToArray(list) {
  return typeof list === "string" ? list.split(" ").join("").split(",") : list;
},
    // removes extra spaces contaminating the names, returns an Array.
_callbacks = _listToArray("onStart,onUpdate,onComplete,onReverseComplete,onInterrupt"),
    _removeProps = _listToArray("transform,transformOrigin,width,height,position,top,left,opacity,zIndex,maxWidth,maxHeight,minWidth,minHeight"),
    _getEl = function _getEl(target) {
  return _toArray(target)[0] || console.warn("Element not found:", target);
},
    _round = function _round(value) {
  return Math.round(value * 10000) / 10000 || 0;
},
    _toggleClass = function _toggleClass(targets, className, action) {
  return targets.forEach(function (el) {
    return el.classList[action](className);
  });
},
    _reserved = {
  zIndex: 1,
  kill: 1,
  simple: 1,
  spin: 1,
  clearProps: 1,
  targets: 1,
  toggleClass: 1,
  onComplete: 1,
  onUpdate: 1,
  onInterrupt: 1,
  onStart: 1,
  delay: 1,
  repeat: 1,
  repeatDelay: 1,
  yoyo: 1,
  scale: 1,
  fade: 1,
  absolute: 1,
  props: 1,
  onEnter: 1,
  onLeave: 1,
  custom: 1,
  paused: 1,
  nested: 1,
  prune: 1,
  absoluteOnLeave: 1
},
    _fitReserved = {
  zIndex: 1,
  simple: 1,
  clearProps: 1,
  scale: 1,
  absolute: 1,
  fitChild: 1,
  getVars: 1,
  props: 1
},
    _camelToDashed = function _camelToDashed(p) {
  return p.replace(/([A-Z])/g, "-$1").toLowerCase();
},
    _copy = function _copy(obj, exclude) {
  var result = {},
      p;

  for (p in obj) {
    exclude[p] || (result[p] = obj[p]);
  }

  return result;
},
    _memoizedProps = {},
    _memoizeProps = function _memoizeProps(props) {
  var p = _memoizedProps[props] = _listToArray(props);

  _memoizedRemoveProps[props] = p.concat(_removeProps);
  return p;
},
    _getInverseGlobalMatrix = function _getInverseGlobalMatrix(el) {
  // integrates caching for improved performance
  var cache = el._gsap || gsap.core.getCache(el);

  if (cache.gmCache === gsap.ticker.frame) {
    return cache.gMatrix;
  }

  cache.gmCache = gsap.ticker.frame;
  return cache.gMatrix = (0,_utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__.getGlobalMatrix)(el, true, false, true);
},
    _getDOMDepth = function _getDOMDepth(el, invert, level) {
  if (level === void 0) {
    level = 0;
  }

  // In invert is true, the sibling depth is increments of 1, and parent/nesting depth is increments of 1000. This lets us order elements in an Array to reflect document flow.
  var parent = el.parentNode,
      inc = 1000 * Math.pow(10, level) * (invert ? -1 : 1),
      l = invert ? -inc * 900 : 0;

  while (el) {
    l += inc;
    el = el.previousSibling;
  }

  return parent ? l + _getDOMDepth(parent, invert, level + 1) : l;
},
    _orderByDOMDepth = function _orderByDOMDepth(comps, invert, isElStates) {
  comps.forEach(function (comp) {
    return comp.d = _getDOMDepth(isElStates ? comp.element : comp.t, invert);
  });
  comps.sort(function (c1, c2) {
    return c1.d - c2.d;
  });
  return comps;
},
    _recordInlineStyles = function _recordInlineStyles(elState, props) {
  // records the current inline CSS properties into an Array in alternating name/value pairs that's stored in a "css" property on the state object so that we can revert later.
  var style = elState.element.style,
      a = elState.css = elState.css || [],
      i = props.length,
      p,
      v;

  while (i--) {
    p = props[i];
    v = style[p] || style.getPropertyValue(p);
    a.push(v ? p : _dashedNameLookup[p] || (_dashedNameLookup[p] = _camelToDashed(p)), v);
  }

  return style;
},
    _applyInlineStyles = function _applyInlineStyles(state) {
  var css = state.css,
      style = state.element.style,
      i = 0;
  state.cache.uncache = 1;

  for (; i < css.length; i += 2) {
    css[i + 1] ? style[css[i]] = css[i + 1] : style.removeProperty(css[i]);
  }
},
    _setFinalStates = function _setFinalStates(comps, onlyTransforms) {
  comps.forEach(function (c) {
    return c.a.cache.uncache = 1;
  });
  onlyTransforms || comps.finalStates.forEach(_applyInlineStyles);
},
    _absoluteProps = "paddingTop,paddingRight,paddingBottom,paddingLeft,gridArea,transition".split(","),
    // properties that we must record just
_makeAbsolute = function _makeAbsolute(elState, fallbackNode, ignoreBatch) {
  var element = elState.element,
      width = elState.width,
      height = elState.height,
      uncache = elState.uncache,
      getProp = elState.getProp,
      style = element.style,
      i = 4,
      result,
      displayIsNone,
      cs;
  typeof fallbackNode !== "object" && (fallbackNode = elState);

  if (_batch && ignoreBatch !== 1) {
    _batch._abs.push({
      t: element,
      b: elState,
      a: elState,
      sd: 0
    });

    _batch._final.push(function () {
      return (elState.cache.uncache = 1) && _applyInlineStyles(elState);
    });

    return element;
  }

  displayIsNone = getProp("display") === "none";

  if (!elState.isVisible || displayIsNone) {
    displayIsNone && (_recordInlineStyles(elState, ["display"]).display = fallbackNode.display);
    elState.matrix = fallbackNode.matrix;
    elState.width = width = elState.width || fallbackNode.width;
    elState.height = height = elState.height || fallbackNode.height;
  }

  _recordInlineStyles(elState, _absoluteProps);

  cs = window.getComputedStyle(element);

  while (i--) {
    style[_absoluteProps[i]] = cs[_absoluteProps[i]]; // record paddings as px-based because if removed from grid, percentage-based ones could be altered.
  }

  style.gridArea = "1 / 1 / 1 / 1";
  style.transition = "none";
  style.position = "absolute";
  style.width = width + "px";
  style.height = height + "px";
  style.top || (style.top = "0px");
  style.left || (style.left = "0px");

  if (uncache) {
    result = new ElementState(element);
  } else {
    // better performance
    result = _copy(elState, _emptyObj);
    result.position = "absolute";

    if (elState.simple) {
      var bounds = element.getBoundingClientRect();
      result.matrix = new _utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__.Matrix2D(1, 0, 0, 1, bounds.left + (0,_utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__._getDocScrollLeft)(), bounds.top + (0,_utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__._getDocScrollTop)());
    } else {
      result.matrix = (0,_utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__.getGlobalMatrix)(element, false, false, true);
    }
  }

  result = _fit(result, elState, true);
  elState.x = _closestTenth(result.x, 0.01);
  elState.y = _closestTenth(result.y, 0.01);
  return element;
},
    _filterComps = function _filterComps(comps, targets) {
  if (targets !== true) {
    targets = _toArray(targets);
    comps = comps.filter(function (c) {
      if (targets.indexOf((c.sd < 0 ? c.b : c.a).element) !== -1) {
        return true;
      } else {
        c.t._gsap.renderTransform(1); // we must force transforms to render on anything that isn't being made position: absolute, otherwise the absolute position happens and then when animation begins it applies transforms which can create a new stacking context, throwing off positioning!


        if (c.b.isVisible) {
          c.t.style.width = c.b.width + "px"; // otherwise things can collapse when contents are made position: absolute.

          c.t.style.height = c.b.height + "px";
        }
      }
    });
  }

  return comps;
},
    _makeCompsAbsolute = function _makeCompsAbsolute(comps) {
  return _orderByDOMDepth(comps, true).forEach(function (c) {
    return (c.a.isVisible || c.b.isVisible) && _makeAbsolute(c.sd < 0 ? c.b : c.a, c.b, 1);
  });
},
    _findElStateInState = function _findElStateInState(state, other) {
  return other && state.idLookup[_parseElementState(other).id] || state.elementStates[0];
},
    _parseElementState = function _parseElementState(elOrNode, props, simple, other) {
  return elOrNode instanceof ElementState ? elOrNode : elOrNode instanceof FlipState ? _findElStateInState(elOrNode, other) : new ElementState(typeof elOrNode === "string" ? _getEl(elOrNode) || console.warn(elOrNode + " not found") : elOrNode, props, simple);
},
    _recordProps = function _recordProps(elState, props) {
  var getProp = gsap.getProperty(elState.element, null, "native"),
      obj = elState.props = {},
      i = props.length;

  while (i--) {
    obj[props[i]] = (getProp(props[i]) + "").trim();
  }

  obj.zIndex && (obj.zIndex = parseFloat(obj.zIndex) || 0);
  return elState;
},
    _applyProps = function _applyProps(element, props) {
  var style = element.style || element,
      // could pass in a vars object.
  p;

  for (p in props) {
    style[p] = props[p];
  }
},
    _getID = function _getID(el) {
  var id = el.getAttribute("data-flip-id");
  id || el.setAttribute("data-flip-id", id = "auto-" + _id++);
  return id;
},
    _elementsFromElementStates = function _elementsFromElementStates(elStates) {
  return elStates.map(function (elState) {
    return elState.element;
  });
},
    _handleCallback = function _handleCallback(callback, elStates, tl) {
  return callback && elStates.length && tl.add(callback(_elementsFromElementStates(elStates), tl, new FlipState(elStates, 0, true)), 0);
},
    _fit = function _fit(fromState, toState, scale, applyProps, fitChild, vars) {
  var element = fromState.element,
      cache = fromState.cache,
      parent = fromState.parent,
      x = fromState.x,
      y = fromState.y,
      width = toState.width,
      height = toState.height,
      scaleX = toState.scaleX,
      scaleY = toState.scaleY,
      rotation = toState.rotation,
      bounds = toState.bounds,
      cssText = vars && element.style.cssText,
      transform = vars && element.getBBox && element.getAttribute("transform"),
      dimensionState = fromState,
      _toState$matrix = toState.matrix,
      e = _toState$matrix.e,
      f = _toState$matrix.f,
      deep = fromState.bounds.width !== bounds.width || fromState.bounds.height !== bounds.height || fromState.scaleX !== scaleX || fromState.scaleY !== scaleY || fromState.rotation !== rotation,
      simple = !deep && fromState.simple && toState.simple && !fitChild,
      skewX,
      fromPoint,
      toPoint,
      getProp,
      parentMatrix,
      matrix,
      bbox;

  if (simple || !parent) {
    scaleX = scaleY = 1;
    rotation = skewX = 0;
  } else {
    parentMatrix = _getInverseGlobalMatrix(parent);
    matrix = parentMatrix.clone().multiply(toState.ctm ? toState.matrix.clone().multiply(toState.ctm) : toState.matrix); // root SVG elements have a ctm that we must factor out (for example, viewBox:"0 0 94 94" with a width of 200px would scale the internals by 2.127 but when we're matching the size of the root <svg> element itself, that scaling shouldn't factor in!)

    rotation = _round(Math.atan2(matrix.b, matrix.a) * _RAD2DEG);
    skewX = _round(Math.atan2(matrix.c, matrix.d) * _RAD2DEG + rotation) % 360; // in very rare cases, minor rounding might end up with 360 which should be 0.

    scaleX = Math.sqrt(Math.pow(matrix.a, 2) + Math.pow(matrix.b, 2));
    scaleY = Math.sqrt(Math.pow(matrix.c, 2) + Math.pow(matrix.d, 2)) * Math.cos(skewX * _DEG2RAD);

    if (fitChild) {
      fitChild = _toArray(fitChild)[0];
      getProp = gsap.getProperty(fitChild);
      bbox = fitChild.getBBox && typeof fitChild.getBBox === "function" && fitChild.getBBox();
      dimensionState = {
        scaleX: getProp("scaleX"),
        scaleY: getProp("scaleY"),
        width: bbox ? bbox.width : Math.ceil(parseFloat(getProp("width", "px"))),
        height: bbox ? bbox.height : parseFloat(getProp("height", "px"))
      };
    }

    cache.rotation = rotation + "deg";
    cache.skewX = skewX + "deg";
  }

  if (scale) {
    scaleX *= width === dimensionState.width || !dimensionState.width ? 1 : width / dimensionState.width; // note if widths are both 0, we should make scaleX 1 - some elements have box-sizing that incorporates padding, etc. and we don't want it to collapse in that case.

    scaleY *= height === dimensionState.height || !dimensionState.height ? 1 : height / dimensionState.height;
    cache.scaleX = scaleX;
    cache.scaleY = scaleY;
  } else {
    width = _closestTenth(width * scaleX / dimensionState.scaleX, 0);
    height = _closestTenth(height * scaleY / dimensionState.scaleY, 0);
    element.style.width = width + "px";
    element.style.height = height + "px";
  } // if (fromState.isFixed) { // commented out because it's now taken care of in getGlobalMatrix() with a flag at the end.
  // 	e -= _getDocScrollLeft();
  // 	f -= _getDocScrollTop();
  // }


  applyProps && _applyProps(element, toState.props);

  if (simple || !parent) {
    x += e - fromState.matrix.e;
    y += f - fromState.matrix.f;
  } else if (deep || parent !== toState.parent) {
    cache.renderTransform(1, cache);
    matrix = (0,_utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__.getGlobalMatrix)(fitChild || element, false, false, true);
    fromPoint = parentMatrix.apply({
      x: matrix.e,
      y: matrix.f
    });
    toPoint = parentMatrix.apply({
      x: e,
      y: f
    });
    x += toPoint.x - fromPoint.x;
    y += toPoint.y - fromPoint.y;
  } else {
    // use a faster/cheaper algorithm if we're just moving x/y
    parentMatrix.e = parentMatrix.f = 0;
    toPoint = parentMatrix.apply({
      x: e - fromState.matrix.e,
      y: f - fromState.matrix.f
    });
    x += toPoint.x;
    y += toPoint.y;
  }

  x = _closestTenth(x, 0.02);
  y = _closestTenth(y, 0.02);

  if (vars && !(vars instanceof ElementState)) {
    // revert
    element.style.cssText = cssText;
    element.getBBox && element.setAttribute("transform", transform || "");
    cache.uncache = 1;
  } else {
    // or apply the transform immediately
    cache.x = x + "px";
    cache.y = y + "px";
    cache.renderTransform(1, cache);
  }

  if (vars) {
    vars.x = x;
    vars.y = y;
    vars.rotation = rotation;
    vars.skewX = skewX;

    if (scale) {
      vars.scaleX = scaleX;
      vars.scaleY = scaleY;
    } else {
      vars.width = width;
      vars.height = height;
    }
  }

  return vars || cache;
},
    _parseState = function _parseState(targetsOrState, vars) {
  return targetsOrState instanceof FlipState ? targetsOrState : new FlipState(targetsOrState, vars);
},
    _getChangingElState = function _getChangingElState(toState, fromState, id) {
  var to1 = toState.idLookup[id],
      to2 = toState.alt[id];
  return to2.isVisible && (!(fromState.getElementState(to2.element) || to2).isVisible || !to1.isVisible) ? to2 : to1;
},
    _bodyMetrics = [],
    _bodyProps = "width,height,overflowX,overflowY".split(","),
    _bodyLocked,
    _lockBodyScroll = function _lockBodyScroll(lock) {
  // if there's no scrollbar, we should lock that so that measurements don't get affected by temporary repositioning, like if something is centered in the window.
  if (lock !== _bodyLocked) {
    var s = _body.style,
        w = _body.clientWidth === window.outerWidth,
        h = _body.clientHeight === window.outerHeight,
        i = 4;

    if (lock && (w || h)) {
      while (i--) {
        _bodyMetrics[i] = s[_bodyProps[i]];
      }

      if (w) {
        s.width = _body.clientWidth + "px";
        s.overflowY = "hidden";
      }

      if (h) {
        s.height = _body.clientHeight + "px";
        s.overflowX = "hidden";
      }

      _bodyLocked = lock;
    } else if (_bodyLocked) {
      while (i--) {
        _bodyMetrics[i] ? s[_bodyProps[i]] = _bodyMetrics[i] : s.removeProperty(_camelToDashed(_bodyProps[i]));
      }

      _bodyLocked = lock;
    }
  }
},
    _fromTo = function _fromTo(fromState, toState, vars, relative) {
  // relative is -1 if "from()", and 1 if "to()"
  fromState instanceof FlipState && toState instanceof FlipState || console.warn("Not a valid state object.");
  vars = vars || {};

  var _vars = vars,
      clearProps = _vars.clearProps,
      onEnter = _vars.onEnter,
      onLeave = _vars.onLeave,
      absolute = _vars.absolute,
      absoluteOnLeave = _vars.absoluteOnLeave,
      custom = _vars.custom,
      delay = _vars.delay,
      paused = _vars.paused,
      repeat = _vars.repeat,
      repeatDelay = _vars.repeatDelay,
      yoyo = _vars.yoyo,
      toggleClass = _vars.toggleClass,
      nested = _vars.nested,
      _zIndex = _vars.zIndex,
      scale = _vars.scale,
      fade = _vars.fade,
      stagger = _vars.stagger,
      spin = _vars.spin,
      prune = _vars.prune,
      props = ("props" in vars ? vars : fromState).props,
      tweenVars = _copy(vars, _reserved),
      animation = gsap.timeline({
    delay: delay,
    paused: paused,
    repeat: repeat,
    repeatDelay: repeatDelay,
    yoyo: yoyo,
    data: "isFlip"
  }),
      remainingProps = tweenVars,
      entering = [],
      leaving = [],
      comps = [],
      swapOutTargets = [],
      spinNum = spin === true ? 1 : spin || 0,
      spinFunc = typeof spin === "function" ? spin : function () {
    return spinNum;
  },
      interrupted = fromState.interrupted || toState.interrupted,
      addFunc = animation[relative !== 1 ? "to" : "from"],
      v,
      p,
      endTime,
      i,
      el,
      comp,
      state,
      targets,
      finalStates,
      fromNode,
      toNode,
      run,
      a,
      b; //relative || (toState = (new FlipState(toState.targets, {props: props})).fit(toState, scale));


  for (p in toState.idLookup) {
    toNode = !toState.alt[p] ? toState.idLookup[p] : _getChangingElState(toState, fromState, p);
    el = toNode.element;
    fromNode = fromState.idLookup[p];
    fromState.alt[p] && el === fromNode.element && (fromState.alt[p].isVisible || !toNode.isVisible) && (fromNode = fromState.alt[p]);

    if (fromNode) {
      comp = {
        t: el,
        b: fromNode,
        a: toNode,
        sd: fromNode.element === el ? 0 : toNode.isVisible ? 1 : -1
      };
      comps.push(comp);

      if (comp.sd) {
        if (comp.sd < 0) {
          comp.b = toNode;
          comp.a = fromNode;
        } // for swapping elements that got interrupted, we must re-record the inline styles to ensure they're not tainted. Remember, .batch() permits getState() not to force in-progress flips to their end state.


        interrupted && _recordInlineStyles(comp.b, props ? _memoizedRemoveProps[props] : _removeProps);
        fade && comps.push(comp.swap = {
          t: fromNode.element,
          b: comp.b,
          a: comp.a,
          sd: -comp.sd,
          swap: comp
        });
      }

      el._flip = fromNode.element._flip = _batch ? _batch.timeline : animation;
    } else if (toNode.isVisible) {
      comps.push({
        t: el,
        b: _copy(toNode, {
          isVisible: 1
        }),
        a: toNode,
        sd: 0,
        entering: 1
      }); // to include it in the "entering" Array and do absolute positioning if necessary

      el._flip = _batch ? _batch.timeline : animation;
    }
  }

  props && (_memoizedProps[props] || _memoizeProps(props)).forEach(function (p) {
    return tweenVars[p] = function (i) {
      return comps[i].a.props[p];
    };
  });
  comps.finalStates = finalStates = [];

  run = function run() {
    _orderByDOMDepth(comps);

    _lockBodyScroll(true); // otherwise, measurements may get thrown off when things get fit.
    // TODO: cache the matrix, especially for parent because it'll probably get reused quite a bit, but lock it to a particular cycle(?).


    for (i = 0; i < comps.length; i++) {
      comp = comps[i];
      a = comp.a;
      b = comp.b;

      if (prune && !a.isDifferent(b) && !comp.entering) {
        // only flip if things changed! Don't omit it from comps initially because that'd prevent the element from being positioned absolutely (if necessary)
        comps.splice(i--, 1);
      } else {
        el = comp.t;
        nested && !(comp.sd < 0) && i && (a.matrix = (0,_utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__.getGlobalMatrix)(el, false, false, true)); // moving a parent affects the position of children

        if (b.isVisible && a.isVisible) {
          if (comp.sd < 0) {
            // swapping OUT (swap direction of -1 is out)
            state = new ElementState(el, props, fromState.simple);

            _fit(state, a, scale, 0, 0, state);

            state.matrix = (0,_utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__.getGlobalMatrix)(el, false, false, true);
            state.css = comp.b.css;
            comp.a = a = state;
            fade && (el.style.opacity = interrupted ? b.opacity : a.opacity);
            stagger && swapOutTargets.push(el);
          } else if (comp.sd > 0 && fade) {
            // swapping IN (swap direction of 1 is in)
            el.style.opacity = interrupted ? a.opacity - b.opacity : "0";
          }

          _fit(a, b, scale, props);
        } else if (b.isVisible !== a.isVisible) {
          // either entering or leaving (one side is invisible)
          if (!b.isVisible) {
            // entering
            a.isVisible && entering.push(a);
            comps.splice(i--, 1);
          } else if (!a.isVisible) {
            // leaving
            b.css = a.css;
            leaving.push(b);
            comps.splice(i--, 1);
            absolute && nested && _fit(a, b, scale, props);
          }
        }

        if (!scale) {
          el.style.maxWidth = Math.max(a.width, b.width) + "px";
          el.style.maxHeight = Math.max(a.height, b.height) + "px";
          el.style.minWidth = Math.min(a.width, b.width) + "px";
          el.style.minHeight = Math.min(a.height, b.height) + "px";
        }

        nested && toggleClass && el.classList.add(toggleClass);
      }

      finalStates.push(a);
    }

    var classTargets;

    if (toggleClass) {
      classTargets = finalStates.map(function (s) {
        return s.element;
      });
      nested && classTargets.forEach(function (e) {
        return e.classList.remove(toggleClass);
      }); // there could be a delay, so don't leave the classes applied (we'll do it in a timeline callback)
    }

    _lockBodyScroll(false);

    if (scale) {
      tweenVars.scaleX = function (i) {
        return comps[i].a.scaleX;
      };

      tweenVars.scaleY = function (i) {
        return comps[i].a.scaleY;
      };
    } else {
      tweenVars.width = function (i) {
        return comps[i].a.width + "px";
      };

      tweenVars.height = function (i) {
        return comps[i].a.height + "px";
      };

      tweenVars.autoRound = vars.autoRound || false;
    }

    tweenVars.x = function (i) {
      return comps[i].a.x + "px";
    };

    tweenVars.y = function (i) {
      return comps[i].a.y + "px";
    };

    tweenVars.rotation = function (i) {
      return comps[i].a.rotation + (spin ? spinFunc(i, targets[i], targets) * 360 : 0);
    };

    tweenVars.skewX = function (i) {
      return comps[i].a.skewX;
    };

    targets = comps.map(function (c) {
      return c.t;
    });

    if (_zIndex || _zIndex === 0) {
      tweenVars.modifiers = {
        zIndex: function zIndex() {
          return _zIndex;
        }
      };
      tweenVars.zIndex = _zIndex;
      tweenVars.immediateRender = vars.immediateRender !== false;
    }

    fade && (tweenVars.opacity = function (i) {
      return comps[i].sd < 0 ? 0 : comps[i].sd > 0 ? comps[i].a.opacity : "+=0";
    });

    if (swapOutTargets.length) {
      stagger = gsap.utils.distribute(stagger);
      var dummyArray = targets.slice(swapOutTargets.length);

      tweenVars.stagger = function (i, el) {
        return stagger(~swapOutTargets.indexOf(el) ? targets.indexOf(comps[i].swap.t) : i, el, dummyArray);
      };
    } // // for testing...
    // gsap.delayedCall(vars.data ? 50 : 1, function() {
    // 	animation.eventCallback("onComplete", () => _setFinalStates(comps, !clearProps));
    // 	addFunc.call(animation, targets, tweenVars, 0).play();
    // });
    // return;


    _callbacks.forEach(function (name) {
      return vars[name] && animation.eventCallback(name, vars[name], vars[name + "Params"]);
    }); // apply callbacks to the timeline, not tweens (because "custom" timing can make multiple tweens)


    if (custom && targets.length) {
      // bust out the custom properties as their own tweens so they can use different eases, durations, etc.
      remainingProps = _copy(tweenVars, _reserved);

      if ("scale" in custom) {
        custom.scaleX = custom.scaleY = custom.scale;
        delete custom.scale;
      }

      for (p in custom) {
        v = _copy(custom[p], _fitReserved);
        v[p] = tweenVars[p];
        !("duration" in v) && "duration" in tweenVars && (v.duration = tweenVars.duration);
        v.stagger = tweenVars.stagger;
        addFunc.call(animation, targets, v, 0);
        delete remainingProps[p];
      }
    }

    if (targets.length || leaving.length || entering.length) {
      toggleClass && animation.add(function () {
        return _toggleClass(classTargets, toggleClass, animation._zTime < 0 ? "remove" : "add");
      }, 0) && !paused && _toggleClass(classTargets, toggleClass, "add");
      targets.length && addFunc.call(animation, targets, remainingProps, 0);
    }

    _handleCallback(onEnter, entering, animation);

    _handleCallback(onLeave, leaving, animation);

    var batchTl = _batch && _batch.timeline;

    if (batchTl) {
      batchTl.add(animation, 0);

      _batch._final.push(function () {
        return _setFinalStates(comps, !clearProps);
      });
    }

    endTime = animation.duration();
    animation.call(function () {
      var forward = animation.time() >= endTime;
      forward && !batchTl && _setFinalStates(comps, !clearProps);
      toggleClass && _toggleClass(classTargets, toggleClass, forward ? "remove" : "add");
    });
  };

  absoluteOnLeave && (absolute = comps.filter(function (comp) {
    return !comp.sd && !comp.a.isVisible && comp.b.isVisible;
  }).map(function (comp) {
    return comp.a.element;
  }));

  if (_batch) {
    var _batch$_abs;

    absolute && (_batch$_abs = _batch._abs).push.apply(_batch$_abs, _filterComps(comps, absolute));

    _batch._run.push(run);
  } else {
    absolute && _makeCompsAbsolute(_filterComps(comps, absolute)); // when making absolute, we must go in a very particular order so that document flow changes don't affect things. Don't make it visible if both the before and after states are invisible! There's no point, and it could make things appear visible during the flip that shouldn't be.

    run();
  }

  var anim = _batch ? _batch.timeline : animation;

  anim.revert = function () {
    return _killFlip(anim, 1);
  }; // a Flip timeline should behave very different when reverting - it should actually jump to the end so that styles get cleared out.


  return anim;
},
    _interrupt = function _interrupt(tl) {
  tl.vars.onInterrupt && tl.vars.onInterrupt.apply(tl, tl.vars.onInterruptParams || []);
  tl.getChildren(true, false, true).forEach(_interrupt);
},
    _killFlip = function _killFlip(tl, action) {
  // action: 0 = nothing, 1 = complete, 2 = only kill (don't complete)
  if (tl && tl.progress() < 1 && !tl.paused()) {
    if (action) {
      _interrupt(tl);

      action < 2 && tl.progress(1); // we should also kill it in case it was added to a parent timeline.

      tl.kill();
    }

    return true;
  }
},
    _createLookup = function _createLookup(state) {
  var lookup = state.idLookup = {},
      alt = state.alt = {},
      elStates = state.elementStates,
      i = elStates.length,
      elState;

  while (i--) {
    elState = elStates[i];
    lookup[elState.id] ? alt[elState.id] = elState : lookup[elState.id] = elState;
  }
};

var FlipState = /*#__PURE__*/function () {
  function FlipState(targets, vars, targetsAreElementStates) {
    this.props = vars && vars.props;
    this.simple = !!(vars && vars.simple);

    if (targetsAreElementStates) {
      this.targets = _elementsFromElementStates(targets);
      this.elementStates = targets;

      _createLookup(this);
    } else {
      this.targets = _toArray(targets);
      var soft = vars && (vars.kill === false || vars.batch && !vars.kill);
      _batch && !soft && _batch._kill.push(this);
      this.update(soft || !!_batch); // when batching, don't force in-progress flips to their end; we need to do that AFTER all getStates() are called.
    }
  }

  var _proto = FlipState.prototype;

  _proto.update = function update(soft) {
    var _this = this;

    this.elementStates = this.targets.map(function (el) {
      return new ElementState(el, _this.props, _this.simple);
    });

    _createLookup(this);

    this.interrupt(soft);
    this.recordInlineStyles();
    return this;
  };

  _proto.clear = function clear() {
    this.targets.length = this.elementStates.length = 0;

    _createLookup(this);

    return this;
  };

  _proto.fit = function fit(state, scale, nested) {
    var elStatesInOrder = _orderByDOMDepth(this.elementStates.slice(0), false, true),
        toElStates = (state || this).idLookup,
        i = 0,
        fromNode,
        toNode;

    for (; i < elStatesInOrder.length; i++) {
      fromNode = elStatesInOrder[i];
      nested && (fromNode.matrix = (0,_utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__.getGlobalMatrix)(fromNode.element, false, false, true)); // moving a parent affects the position of children

      toNode = toElStates[fromNode.id];
      toNode && _fit(fromNode, toNode, scale, true, 0, fromNode);
      fromNode.matrix = (0,_utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__.getGlobalMatrix)(fromNode.element, false, false, true);
    }

    return this;
  };

  _proto.getProperty = function getProperty(element, property) {
    var es = this.getElementState(element) || _emptyObj;

    return (property in es ? es : es.props || _emptyObj)[property];
  };

  _proto.add = function add(state) {
    var i = state.targets.length,
        lookup = this.idLookup,
        alt = this.alt,
        index,
        es,
        es2;

    while (i--) {
      es = state.elementStates[i];
      es2 = lookup[es.id];

      if (es2 && (es.element === es2.element || alt[es.id] && alt[es.id].element === es.element)) {
        // if the flip id is already in this FlipState, replace it!
        index = this.elementStates.indexOf(es.element === es2.element ? es2 : alt[es.id]);
        this.targets.splice(index, 1, state.targets[i]);
        this.elementStates.splice(index, 1, es);
      } else {
        this.targets.push(state.targets[i]);
        this.elementStates.push(es);
      }
    }

    state.interrupted && (this.interrupted = true);
    state.simple || (this.simple = false);

    _createLookup(this);

    return this;
  };

  _proto.compare = function compare(state) {
    var l1 = state.idLookup,
        l2 = this.idLookup,
        unchanged = [],
        changed = [],
        enter = [],
        leave = [],
        targets = [],
        a1 = state.alt,
        a2 = this.alt,
        place = function place(s1, s2, el) {
      return (s1.isVisible !== s2.isVisible ? s1.isVisible ? enter : leave : s1.isVisible ? changed : unchanged).push(el) && targets.push(el);
    },
        placeIfDoesNotExist = function placeIfDoesNotExist(s1, s2, el) {
      return targets.indexOf(el) < 0 && place(s1, s2, el);
    },
        s1,
        s2,
        p,
        el,
        s1Alt,
        s2Alt,
        c1,
        c2;

    for (p in l1) {
      s1Alt = a1[p];
      s2Alt = a2[p];
      s1 = !s1Alt ? l1[p] : _getChangingElState(state, this, p);
      el = s1.element;
      s2 = l2[p];

      if (s2Alt) {
        c2 = s2.isVisible || !s2Alt.isVisible && el === s2.element ? s2 : s2Alt;
        c1 = s1Alt && !s1.isVisible && !s1Alt.isVisible && c2.element === s1Alt.element ? s1Alt : s1; //c1.element !== c2.element && c1.element === s2.element && (c2 = s2);

        if (c1.isVisible && c2.isVisible && c1.element !== c2.element) {
          // swapping, so force into "changed" array
          (c1.isDifferent(c2) ? changed : unchanged).push(c1.element, c2.element);
          targets.push(c1.element, c2.element);
        } else {
          place(c1, c2, c1.element);
        }

        s1Alt && c1.element === s1Alt.element && (s1Alt = l1[p]);
        placeIfDoesNotExist(c1.element !== s2.element && s1Alt ? s1Alt : c1, s2, s2.element);
        placeIfDoesNotExist(s1Alt && s1Alt.element === s2Alt.element ? s1Alt : c1, s2Alt, s2Alt.element);
        s1Alt && placeIfDoesNotExist(s1Alt, s2Alt.element === s1Alt.element ? s2Alt : s2, s1Alt.element);
      } else {
        !s2 ? enter.push(el) : !s2.isDifferent(s1) ? unchanged.push(el) : place(s1, s2, el);
        s1Alt && placeIfDoesNotExist(s1Alt, s2, s1Alt.element);
      }
    }

    for (p in l2) {
      if (!l1[p]) {
        leave.push(l2[p].element);
        a2[p] && leave.push(a2[p].element);
      }
    }

    return {
      changed: changed,
      unchanged: unchanged,
      enter: enter,
      leave: leave
    };
  };

  _proto.recordInlineStyles = function recordInlineStyles() {
    var props = _memoizedRemoveProps[this.props] || _removeProps,
        i = this.elementStates.length;

    while (i--) {
      _recordInlineStyles(this.elementStates[i], props);
    }
  };

  _proto.interrupt = function interrupt(soft) {
    var _this2 = this;

    // soft = DON'T force in-progress flip animations to completion (like when running a batch, we can't immediately kill flips when getting states because it could contaminate positioning and other .getState() calls that will run in the batch (we kill AFTER all the .getState() calls complete).
    var timelines = [];
    this.targets.forEach(function (t) {
      var tl = t._flip,
          foundInProgress = _killFlip(tl, soft ? 0 : 1);

      soft && foundInProgress && timelines.indexOf(tl) < 0 && tl.add(function () {
        return _this2.updateVisibility();
      });
      foundInProgress && timelines.push(tl);
    });
    !soft && timelines.length && this.updateVisibility(); // if we found an in-progress Flip animation, we must record all the values in their current state at that point BUT we should update the isVisible value AFTER pushing that flip to completion so that elements that are entering or leaving will populate those Arrays properly.

    this.interrupted || (this.interrupted = !!timelines.length);
  };

  _proto.updateVisibility = function updateVisibility() {
    this.elementStates.forEach(function (es) {
      var b = es.element.getBoundingClientRect();
      es.isVisible = !!(b.width || b.height || b.top || b.left);
      es.uncache = 1;
    });
  };

  _proto.getElementState = function getElementState(element) {
    return this.elementStates[this.targets.indexOf(_getEl(element))];
  };

  _proto.makeAbsolute = function makeAbsolute() {
    return _orderByDOMDepth(this.elementStates.slice(0), true, true).map(_makeAbsolute);
  };

  return FlipState;
}();

var ElementState = /*#__PURE__*/function () {
  function ElementState(element, props, simple) {
    this.element = element;
    this.update(props, simple);
  }

  var _proto2 = ElementState.prototype;

  _proto2.isDifferent = function isDifferent(state) {
    var b1 = this.bounds,
        b2 = state.bounds;
    return b1.top !== b2.top || b1.left !== b2.left || b1.width !== b2.width || b1.height !== b2.height || !this.matrix.equals(state.matrix) || this.opacity !== state.opacity || this.props && state.props && JSON.stringify(this.props) !== JSON.stringify(state.props);
  };

  _proto2.update = function update(props, simple) {
    var self = this,
        element = self.element,
        getProp = gsap.getProperty(element),
        cache = gsap.core.getCache(element),
        bounds = element.getBoundingClientRect(),
        bbox = element.getBBox && typeof element.getBBox === "function" && element.nodeName.toLowerCase() !== "svg" && element.getBBox(),
        m = simple ? new _utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__.Matrix2D(1, 0, 0, 1, bounds.left + (0,_utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__._getDocScrollLeft)(), bounds.top + (0,_utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__._getDocScrollTop)()) : (0,_utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__.getGlobalMatrix)(element, false, false, true);
    self.getProp = getProp;
    self.element = element;
    self.id = _getID(element);
    self.matrix = m;
    self.cache = cache;
    self.bounds = bounds;
    self.isVisible = !!(bounds.width || bounds.height || bounds.left || bounds.top);
    self.display = getProp("display");
    self.position = getProp("position");
    self.parent = element.parentNode;
    self.x = getProp("x");
    self.y = getProp("y");
    self.scaleX = cache.scaleX;
    self.scaleY = cache.scaleY;
    self.rotation = getProp("rotation");
    self.skewX = getProp("skewX");
    self.opacity = getProp("opacity");
    self.width = bbox ? bbox.width : _closestTenth(getProp("width", "px"), 0.04); // round up to the closest 0.1 so that text doesn't wrap.

    self.height = bbox ? bbox.height : _closestTenth(getProp("height", "px"), 0.04);
    props && _recordProps(self, _memoizedProps[props] || _memoizeProps(props));
    self.ctm = element.getCTM && element.nodeName.toLowerCase() === "svg" && (0,_utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__._getCTM)(element).inverse();
    self.simple = simple || _round(m.a) === 1 && !_round(m.b) && !_round(m.c) && _round(m.d) === 1; // allows us to speed through some other tasks if it's not scale/rotated

    self.uncache = 0;
  };

  return ElementState;
}();

var FlipAction = /*#__PURE__*/function () {
  function FlipAction(vars, batch) {
    this.vars = vars;
    this.batch = batch;
    this.states = [];
    this.timeline = batch.timeline;
  }

  var _proto3 = FlipAction.prototype;

  _proto3.getStateById = function getStateById(id) {
    var i = this.states.length;

    while (i--) {
      if (this.states[i].idLookup[id]) {
        return this.states[i];
      }
    }
  };

  _proto3.kill = function kill() {
    this.batch.remove(this);
  };

  return FlipAction;
}();

var FlipBatch = /*#__PURE__*/function () {
  function FlipBatch(id) {
    this.id = id;
    this.actions = [];
    this._kill = [];
    this._final = [];
    this._abs = [];
    this._run = [];
    this.data = {};
    this.state = new FlipState();
    this.timeline = gsap.timeline();
  }

  var _proto4 = FlipBatch.prototype;

  _proto4.add = function add(config) {
    var result = this.actions.filter(function (action) {
      return action.vars === config;
    });

    if (result.length) {
      return result[0];
    }

    result = new FlipAction(typeof config === "function" ? {
      animate: config
    } : config, this);
    this.actions.push(result);
    return result;
  };

  _proto4.remove = function remove(action) {
    var i = this.actions.indexOf(action);
    i >= 0 && this.actions.splice(i, 1);
    return this;
  };

  _proto4.getState = function getState(merge) {
    var _this3 = this;

    var prevBatch = _batch,
        prevAction = _batchAction;
    _batch = this;
    this.state.clear();
    this._kill.length = 0;
    this.actions.forEach(function (action) {
      if (action.vars.getState) {
        action.states.length = 0;
        _batchAction = action;
        action.state = action.vars.getState(action);
      }

      merge && action.states.forEach(function (s) {
        return _this3.state.add(s);
      });
    });
    _batchAction = prevAction;
    _batch = prevBatch;
    this.killConflicts();
    return this;
  };

  _proto4.animate = function animate() {
    var _this4 = this;

    var prevBatch = _batch,
        tl = this.timeline,
        i = this.actions.length,
        finalStates,
        endTime;
    _batch = this;
    tl.clear();
    this._abs.length = this._final.length = this._run.length = 0;
    this.actions.forEach(function (a) {
      a.vars.animate && a.vars.animate(a);
      var onEnter = a.vars.onEnter,
          onLeave = a.vars.onLeave,
          targets = a.targets,
          s,
          result;

      if (targets && targets.length && (onEnter || onLeave)) {
        s = new FlipState();
        a.states.forEach(function (state) {
          return s.add(state);
        });
        result = s.compare(Flip.getState(targets));
        result.enter.length && onEnter && onEnter(result.enter);
        result.leave.length && onLeave && onLeave(result.leave);
      }
    });

    _makeCompsAbsolute(this._abs);

    this._run.forEach(function (f) {
      return f();
    });

    endTime = tl.duration();
    finalStates = this._final.slice(0);
    tl.add(function () {
      if (endTime <= tl.time()) {
        // only call if moving forward in the timeline (in case it's nested in a timeline that gets reversed)
        finalStates.forEach(function (f) {
          return f();
        });

        _forEachBatch(_this4, "onComplete");
      }
    });
    _batch = prevBatch;

    while (i--) {
      this.actions[i].vars.once && this.actions[i].kill();
    }

    _forEachBatch(this, "onStart");

    tl.restart();
    return this;
  };

  _proto4.loadState = function loadState(done) {
    done || (done = function done() {
      return 0;
    });
    var queue = [];
    this.actions.forEach(function (c) {
      if (c.vars.loadState) {
        var i,
            f = function f(targets) {
          targets && (c.targets = targets);
          i = queue.indexOf(f);

          if (~i) {
            queue.splice(i, 1);
            queue.length || done();
          }
        };

        queue.push(f);
        c.vars.loadState(f);
      }
    });
    queue.length || done();
    return this;
  };

  _proto4.setState = function setState() {
    this.actions.forEach(function (c) {
      return c.targets = c.vars.setState && c.vars.setState(c);
    });
    return this;
  };

  _proto4.killConflicts = function killConflicts(soft) {
    this.state.interrupt(soft);

    this._kill.forEach(function (state) {
      return state.interrupt(soft);
    });

    return this;
  };

  _proto4.run = function run(skipGetState, merge) {
    var _this5 = this;

    if (this !== _batch) {
      skipGetState || this.getState(merge);
      this.loadState(function () {
        if (!_this5._killed) {
          _this5.setState();

          _this5.animate();
        }
      });
    }

    return this;
  };

  _proto4.clear = function clear(stateOnly) {
    this.state.clear();
    stateOnly || (this.actions.length = 0);
  };

  _proto4.getStateById = function getStateById(id) {
    var i = this.actions.length,
        s;

    while (i--) {
      s = this.actions[i].getStateById(id);

      if (s) {
        return s;
      }
    }

    return this.state.idLookup[id] && this.state;
  };

  _proto4.kill = function kill() {
    this._killed = 1;
    this.clear();
    delete _batchLookup[this.id];
  };

  return FlipBatch;
}();

var Flip = /*#__PURE__*/function () {
  function Flip() {}

  Flip.getState = function getState(targets, vars) {
    var state = _parseState(targets, vars);

    _batchAction && _batchAction.states.push(state);
    vars && vars.batch && Flip.batch(vars.batch).state.add(state);
    return state;
  };

  Flip.from = function from(state, vars) {
    vars = vars || {};
    "clearProps" in vars || (vars.clearProps = true);
    return _fromTo(state, _parseState(vars.targets || state.targets, {
      props: vars.props || state.props,
      simple: vars.simple,
      kill: !!vars.kill
    }), vars, -1);
  };

  Flip.to = function to(state, vars) {
    return _fromTo(state, _parseState(vars.targets || state.targets, {
      props: vars.props || state.props,
      simple: vars.simple,
      kill: !!vars.kill
    }), vars, 1);
  };

  Flip.fromTo = function fromTo(fromState, toState, vars) {
    return _fromTo(fromState, toState, vars);
  };

  Flip.fit = function fit(fromEl, toEl, vars) {
    var v = vars ? _copy(vars, _fitReserved) : {},
        _ref = vars || v,
        absolute = _ref.absolute,
        scale = _ref.scale,
        getVars = _ref.getVars,
        props = _ref.props,
        runBackwards = _ref.runBackwards,
        onComplete = _ref.onComplete,
        simple = _ref.simple,
        fitChild = vars && vars.fitChild && _getEl(vars.fitChild),
        before = _parseElementState(toEl, props, simple, fromEl),
        after = _parseElementState(fromEl, 0, simple, before),
        inlineProps = props ? _memoizedRemoveProps[props] : _removeProps;

    props && _applyProps(v, before.props);

    if (runBackwards) {
      _recordInlineStyles(after, inlineProps);

      "immediateRender" in v || (v.immediateRender = true);

      v.onComplete = function () {
        _applyInlineStyles(after);

        onComplete && onComplete.apply(this, arguments);
      };
    }

    absolute && _makeAbsolute(after, before);
    v = _fit(after, before, scale || fitChild, props, fitChild, v.duration || getVars ? v : 0);
    return getVars ? v : v.duration ? gsap.to(after.element, v) : null;
  };

  Flip.makeAbsolute = function makeAbsolute(targetsOrStates, vars) {
    return (targetsOrStates instanceof FlipState ? targetsOrStates : new FlipState(targetsOrStates, vars)).makeAbsolute();
  };

  Flip.batch = function batch(id) {
    id || (id = "default");
    return _batchLookup[id] || (_batchLookup[id] = new FlipBatch(id));
  };

  Flip.killFlipsOf = function killFlipsOf(targets, complete) {
    (targets instanceof FlipState ? targets.targets : _toArray(targets)).forEach(function (t) {
      return t && _killFlip(t._flip, complete !== false ? 1 : 2);
    });
  };

  Flip.isFlipping = function isFlipping(target) {
    var f = Flip.getByTarget(target);
    return !!f && f.isActive();
  };

  Flip.getByTarget = function getByTarget(target) {
    return (_getEl(target) || _emptyObj)._flip;
  };

  Flip.getElementState = function getElementState(target, props) {
    return new ElementState(_getEl(target), props);
  };

  Flip.convertCoordinates = function convertCoordinates(fromElement, toElement, point) {
    var m = (0,_utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__.getGlobalMatrix)(toElement, true, true).multiply((0,_utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__.getGlobalMatrix)(fromElement));
    return point ? m.apply(point) : m;
  };

  Flip.register = function register(core) {
    _body = typeof document !== "undefined" && document.body;

    if (_body) {
      gsap = core;

      (0,_utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__._setDoc)(_body);

      _toArray = gsap.utils.toArray;
      var snap = gsap.utils.snap(0.1);

      _closestTenth = function _closestTenth(value, add) {
        return snap(parseFloat(value) + add);
      };
    }
  };

  return Flip;
}();
Flip.version = "3.11.3"; // function whenImagesLoad(el, func) {
// 	let pending = [],
// 		onLoad = e => {
// 			pending.splice(pending.indexOf(e.target), 1);
// 			e.target.removeEventListener("load", onLoad);
// 			pending.length || func();
// 		};
// 	gsap.utils.toArray(el.tagName.toLowerCase() === "img" ? el : el.querySelectorAll("img")).forEach(img => img.complete || img.addEventListener("load", onLoad) || pending.push(img));
// 	pending.length || func();
// }

typeof window !== "undefined" && window.gsap && window.gsap.registerPlugin(Flip);


/***/ }),

/***/ "./node_modules/gsap/gsap-core.js":
/*!****************************************!*\
  !*** ./node_modules/gsap/gsap-core.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Animation": () => (/* binding */ Animation),
/* harmony export */   "Back": () => (/* binding */ Back),
/* harmony export */   "Bounce": () => (/* binding */ Bounce),
/* harmony export */   "Circ": () => (/* binding */ Circ),
/* harmony export */   "Cubic": () => (/* binding */ Cubic),
/* harmony export */   "Elastic": () => (/* binding */ Elastic),
/* harmony export */   "Expo": () => (/* binding */ Expo),
/* harmony export */   "GSCache": () => (/* binding */ GSCache),
/* harmony export */   "Linear": () => (/* binding */ Linear),
/* harmony export */   "Power0": () => (/* binding */ Power0),
/* harmony export */   "Power1": () => (/* binding */ Power1),
/* harmony export */   "Power2": () => (/* binding */ Power2),
/* harmony export */   "Power3": () => (/* binding */ Power3),
/* harmony export */   "Power4": () => (/* binding */ Power4),
/* harmony export */   "PropTween": () => (/* binding */ PropTween),
/* harmony export */   "Quad": () => (/* binding */ Quad),
/* harmony export */   "Quart": () => (/* binding */ Quart),
/* harmony export */   "Quint": () => (/* binding */ Quint),
/* harmony export */   "Sine": () => (/* binding */ Sine),
/* harmony export */   "SteppedEase": () => (/* binding */ SteppedEase),
/* harmony export */   "Strong": () => (/* binding */ Strong),
/* harmony export */   "Timeline": () => (/* binding */ Timeline),
/* harmony export */   "TimelineLite": () => (/* binding */ Timeline),
/* harmony export */   "TimelineMax": () => (/* binding */ Timeline),
/* harmony export */   "Tween": () => (/* binding */ Tween),
/* harmony export */   "TweenLite": () => (/* binding */ Tween),
/* harmony export */   "TweenMax": () => (/* binding */ Tween),
/* harmony export */   "_checkPlugin": () => (/* binding */ _checkPlugin),
/* harmony export */   "_colorExp": () => (/* binding */ _colorExp),
/* harmony export */   "_colorStringFilter": () => (/* binding */ _colorStringFilter),
/* harmony export */   "_config": () => (/* binding */ _config),
/* harmony export */   "_forEachName": () => (/* binding */ _forEachName),
/* harmony export */   "_getCache": () => (/* binding */ _getCache),
/* harmony export */   "_getProperty": () => (/* binding */ _getProperty),
/* harmony export */   "_getSetter": () => (/* binding */ _getSetter),
/* harmony export */   "_isString": () => (/* binding */ _isString),
/* harmony export */   "_isUndefined": () => (/* binding */ _isUndefined),
/* harmony export */   "_missingPlugin": () => (/* binding */ _missingPlugin),
/* harmony export */   "_numExp": () => (/* binding */ _numExp),
/* harmony export */   "_numWithUnitExp": () => (/* binding */ _numWithUnitExp),
/* harmony export */   "_parseRelative": () => (/* binding */ _parseRelative),
/* harmony export */   "_plugins": () => (/* binding */ _plugins),
/* harmony export */   "_relExp": () => (/* binding */ _relExp),
/* harmony export */   "_removeLinkedListItem": () => (/* binding */ _removeLinkedListItem),
/* harmony export */   "_renderComplexString": () => (/* binding */ _renderComplexString),
/* harmony export */   "_replaceRandom": () => (/* binding */ _replaceRandom),
/* harmony export */   "_round": () => (/* binding */ _round),
/* harmony export */   "_roundModifier": () => (/* binding */ _roundModifier),
/* harmony export */   "_setDefaults": () => (/* binding */ _setDefaults),
/* harmony export */   "_sortPropTweensByPriority": () => (/* binding */ _sortPropTweensByPriority),
/* harmony export */   "_ticker": () => (/* binding */ _ticker),
/* harmony export */   "clamp": () => (/* binding */ clamp),
/* harmony export */   "default": () => (/* binding */ gsap),
/* harmony export */   "distribute": () => (/* binding */ distribute),
/* harmony export */   "getUnit": () => (/* binding */ getUnit),
/* harmony export */   "gsap": () => (/* binding */ gsap),
/* harmony export */   "interpolate": () => (/* binding */ interpolate),
/* harmony export */   "mapRange": () => (/* binding */ mapRange),
/* harmony export */   "normalize": () => (/* binding */ normalize),
/* harmony export */   "pipe": () => (/* binding */ pipe),
/* harmony export */   "random": () => (/* binding */ random),
/* harmony export */   "selector": () => (/* binding */ selector),
/* harmony export */   "shuffle": () => (/* binding */ shuffle),
/* harmony export */   "snap": () => (/* binding */ snap),
/* harmony export */   "splitColor": () => (/* binding */ splitColor),
/* harmony export */   "toArray": () => (/* binding */ toArray),
/* harmony export */   "unitize": () => (/* binding */ unitize),
/* harmony export */   "wrap": () => (/* binding */ wrap),
/* harmony export */   "wrapYoyo": () => (/* binding */ wrapYoyo)
/* harmony export */ });
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*!
 * GSAP 3.11.3
 * https://greensock.com
 *
 * @license Copyright 2008-2022, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var _config = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
},
    _defaults = {
  duration: .5,
  overwrite: false,
  delay: 0
},
    _suppressOverwrites,
    _reverting,
    _context,
    _bigNum = 1e8,
    _tinyNum = 1 / _bigNum,
    _2PI = Math.PI * 2,
    _HALF_PI = _2PI / 4,
    _gsID = 0,
    _sqrt = Math.sqrt,
    _cos = Math.cos,
    _sin = Math.sin,
    _isString = function _isString(value) {
  return typeof value === "string";
},
    _isFunction = function _isFunction(value) {
  return typeof value === "function";
},
    _isNumber = function _isNumber(value) {
  return typeof value === "number";
},
    _isUndefined = function _isUndefined(value) {
  return typeof value === "undefined";
},
    _isObject = function _isObject(value) {
  return typeof value === "object";
},
    _isNotFalse = function _isNotFalse(value) {
  return value !== false;
},
    _windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _isFuncOrString = function _isFuncOrString(value) {
  return _isFunction(value) || _isString(value);
},
    _isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function () {},
    // note: IE10 has ArrayBuffer, but NOT ArrayBuffer.isView().
_isArray = Array.isArray,
    _strictNumExp = /(?:-?\.?\d|\.)+/gi,
    //only numbers (including negatives and decimals) but NOT relative values.
_numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
    //finds any numbers, including ones that start with += or -=, negative numbers, and ones in scientific notation like 1e-8.
_numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
    _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
    //duplicate so that while we're looping through matches from exec(), it doesn't contaminate the lastIndex of _numExp which we use to search for colors too.
_relExp = /[+-]=-?[.\d]+/,
    _delimitedValueExp = /[^,'"\[\]\s]+/gi,
    // previously /[#\-+.]*\b[a-z\d\-=+%.]+/gi but didn't catch special characters.
_unitExp = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
    _globalTimeline,
    _win,
    _coreInitted,
    _doc,
    _globals = {},
    _installScope = {},
    _coreReady,
    _install = function _install(scope) {
  return (_installScope = _merge(scope, _globals)) && gsap;
},
    _missingPlugin = function _missingPlugin(property, value) {
  return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
},
    _warn = function _warn(message, suppress) {
  return !suppress && console.warn(message);
},
    _addGlobal = function _addGlobal(name, obj) {
  return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
},
    _emptyFunc = function _emptyFunc() {
  return 0;
},
    _startAtRevertConfig = {
  suppressEvents: true,
  isStart: true,
  kill: false
},
    _revertConfigNoKill = {
  suppressEvents: true,
  kill: false
},
    _revertConfig = {
  suppressEvents: true
},
    _reservedProps = {},
    _lazyTweens = [],
    _lazyLookup = {},
    _lastRenderedFrame,
    _plugins = {},
    _effects = {},
    _nextGCFrame = 30,
    _harnessPlugins = [],
    _callbackNames = "",
    _harness = function _harness(targets) {
  var target = targets[0],
      harnessPlugin,
      i;
  _isObject(target) || _isFunction(target) || (targets = [targets]);

  if (!(harnessPlugin = (target._gsap || {}).harness)) {
    // find the first target with a harness. We assume targets passed into an animation will be of similar type, meaning the same kind of harness can be used for them all (performance optimization)
    i = _harnessPlugins.length;

    while (i-- && !_harnessPlugins[i].targetTest(target)) {}

    harnessPlugin = _harnessPlugins[i];
  }

  i = targets.length;

  while (i--) {
    targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
  }

  return targets;
},
    _getCache = function _getCache(target) {
  return target._gsap || _harness(toArray(target))[0]._gsap;
},
    _getProperty = function _getProperty(target, property, v) {
  return (v = target[property]) && _isFunction(v) ? target[property]() : _isUndefined(v) && target.getAttribute && target.getAttribute(property) || v;
},
    _forEachName = function _forEachName(names, func) {
  return (names = names.split(",")).forEach(func) || names;
},
    //split a comma-delimited list of names into an array, then run a forEach() function and return the split array (this is just a way to consolidate/shorten some code).
_round = function _round(value) {
  return Math.round(value * 100000) / 100000 || 0;
},
    _roundPrecise = function _roundPrecise(value) {
  return Math.round(value * 10000000) / 10000000 || 0;
},
    // increased precision mostly for timing values.
_parseRelative = function _parseRelative(start, value) {
  var operator = value.charAt(0),
      end = parseFloat(value.substr(2));
  start = parseFloat(start);
  return operator === "+" ? start + end : operator === "-" ? start - end : operator === "*" ? start * end : start / end;
},
    _arrayContainsAny = function _arrayContainsAny(toSearch, toFind) {
  //searches one array to find matches for any of the items in the toFind array. As soon as one is found, it returns true. It does NOT return all the matches; it's simply a boolean search.
  var l = toFind.length,
      i = 0;

  for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l;) {}

  return i < l;
},
    _lazyRender = function _lazyRender() {
  var l = _lazyTweens.length,
      a = _lazyTweens.slice(0),
      i,
      tween;

  _lazyLookup = {};
  _lazyTweens.length = 0;

  for (i = 0; i < l; i++) {
    tween = a[i];
    tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
  }
},
    _lazySafeRender = function _lazySafeRender(animation, time, suppressEvents, force) {
  _lazyTweens.length && _lazyRender();
  animation.render(time, suppressEvents, force || _reverting && time < 0 && (animation._initted || animation._startAt));
  _lazyTweens.length && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
},
    _numericIfPossible = function _numericIfPossible(value) {
  var n = parseFloat(value);
  return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString(value) ? value.trim() : value;
},
    _passThrough = function _passThrough(p) {
  return p;
},
    _setDefaults = function _setDefaults(obj, defaults) {
  for (var p in defaults) {
    p in obj || (obj[p] = defaults[p]);
  }

  return obj;
},
    _setKeyframeDefaults = function _setKeyframeDefaults(excludeDuration) {
  return function (obj, defaults) {
    for (var p in defaults) {
      p in obj || p === "duration" && excludeDuration || p === "ease" || (obj[p] = defaults[p]);
    }
  };
},
    _merge = function _merge(base, toMerge) {
  for (var p in toMerge) {
    base[p] = toMerge[p];
  }

  return base;
},
    _mergeDeep = function _mergeDeep(base, toMerge) {
  for (var p in toMerge) {
    p !== "__proto__" && p !== "constructor" && p !== "prototype" && (base[p] = _isObject(toMerge[p]) ? _mergeDeep(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p]);
  }

  return base;
},
    _copyExcluding = function _copyExcluding(obj, excluding) {
  var copy = {},
      p;

  for (p in obj) {
    p in excluding || (copy[p] = obj[p]);
  }

  return copy;
},
    _inheritDefaults = function _inheritDefaults(vars) {
  var parent = vars.parent || _globalTimeline,
      func = vars.keyframes ? _setKeyframeDefaults(_isArray(vars.keyframes)) : _setDefaults;

  if (_isNotFalse(vars.inherit)) {
    while (parent) {
      func(vars, parent.vars.defaults);
      parent = parent.parent || parent._dp;
    }
  }

  return vars;
},
    _arraysMatch = function _arraysMatch(a1, a2) {
  var i = a1.length,
      match = i === a2.length;

  while (match && i-- && a1[i] === a2[i]) {}

  return i < 0;
},
    _addLinkedListItem = function _addLinkedListItem(parent, child, firstProp, lastProp, sortBy) {
  if (firstProp === void 0) {
    firstProp = "_first";
  }

  if (lastProp === void 0) {
    lastProp = "_last";
  }

  var prev = parent[lastProp],
      t;

  if (sortBy) {
    t = child[sortBy];

    while (prev && prev[sortBy] > t) {
      prev = prev._prev;
    }
  }

  if (prev) {
    child._next = prev._next;
    prev._next = child;
  } else {
    child._next = parent[firstProp];
    parent[firstProp] = child;
  }

  if (child._next) {
    child._next._prev = child;
  } else {
    parent[lastProp] = child;
  }

  child._prev = prev;
  child.parent = child._dp = parent;
  return child;
},
    _removeLinkedListItem = function _removeLinkedListItem(parent, child, firstProp, lastProp) {
  if (firstProp === void 0) {
    firstProp = "_first";
  }

  if (lastProp === void 0) {
    lastProp = "_last";
  }

  var prev = child._prev,
      next = child._next;

  if (prev) {
    prev._next = next;
  } else if (parent[firstProp] === child) {
    parent[firstProp] = next;
  }

  if (next) {
    next._prev = prev;
  } else if (parent[lastProp] === child) {
    parent[lastProp] = prev;
  }

  child._next = child._prev = child.parent = null; // don't delete the _dp just so we can revert if necessary. But parent should be null to indicate the item isn't in a linked list.
},
    _removeFromParent = function _removeFromParent(child, onlyIfParentHasAutoRemove) {
  child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove(child);
  child._act = 0;
},
    _uncache = function _uncache(animation, child) {
  if (animation && (!child || child._end > animation._dur || child._start < 0)) {
    // performance optimization: if a child animation is passed in we should only uncache if that child EXTENDS the animation (its end time is beyond the end)
    var a = animation;

    while (a) {
      a._dirty = 1;
      a = a.parent;
    }
  }

  return animation;
},
    _recacheAncestors = function _recacheAncestors(animation) {
  var parent = animation.parent;

  while (parent && parent.parent) {
    //sometimes we must force a re-sort of all children and update the duration/totalDuration of all ancestor timelines immediately in case, for example, in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
    parent._dirty = 1;
    parent.totalDuration();
    parent = parent.parent;
  }

  return animation;
},
    _rewindStartAt = function _rewindStartAt(tween, totalTime, suppressEvents, force) {
  return tween._startAt && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween.vars.immediateRender && !tween.vars.autoRevert || tween._startAt.render(totalTime, true, force));
},
    _hasNoPausedAncestors = function _hasNoPausedAncestors(animation) {
  return !animation || animation._ts && _hasNoPausedAncestors(animation.parent);
},
    _elapsedCycleDuration = function _elapsedCycleDuration(animation) {
  return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
},
    // feed in the totalTime and cycleDuration and it'll return the cycle (iteration minus 1) and if the playhead is exactly at the very END, it will NOT bump up to the next cycle.
_animationCycle = function _animationCycle(tTime, cycleDuration) {
  var whole = Math.floor(tTime /= cycleDuration);
  return tTime && whole === tTime ? whole - 1 : whole;
},
    _parentToChildTotalTime = function _parentToChildTotalTime(parentTime, child) {
  return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
},
    _setEnd = function _setEnd(animation) {
  return animation._end = _roundPrecise(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
},
    _alignPlayhead = function _alignPlayhead(animation, totalTime) {
  // adjusts the animation's _start and _end according to the provided totalTime (only if the parent's smoothChildTiming is true and the animation isn't paused). It doesn't do any rendering or forcing things back into parent timelines, etc. - that's what totalTime() is for.
  var parent = animation._dp;

  if (parent && parent.smoothChildTiming && animation._ts) {
    animation._start = _roundPrecise(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));

    _setEnd(animation);

    parent._dirty || _uncache(parent, animation); //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
  }

  return animation;
},

/*
_totalTimeToTime = (clampedTotalTime, duration, repeat, repeatDelay, yoyo) => {
	let cycleDuration = duration + repeatDelay,
		time = _round(clampedTotalTime % cycleDuration);
	if (time > duration) {
		time = duration;
	}
	return (yoyo && (~~(clampedTotalTime / cycleDuration) & 1)) ? duration - time : time;
},
*/
_postAddChecks = function _postAddChecks(timeline, child) {
  var t;

  if (child._time || child._initted && !child._dur) {
    //in case, for example, the _start is moved on a tween that has already rendered. Imagine it's at its end state, then the startTime is moved WAY later (after the end of this timeline), it should render at its beginning.
    t = _parentToChildTotalTime(timeline.rawTime(), child);

    if (!child._dur || _clamp(0, child.totalDuration(), t) - child._tTime > _tinyNum) {
      child.render(t, true);
    }
  } //if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.


  if (_uncache(timeline, child)._dp && timeline._initted && timeline._time >= timeline._dur && timeline._ts) {
    //in case any of the ancestors had completed but should now be enabled...
    if (timeline._dur < timeline.duration()) {
      t = timeline;

      while (t._dp) {
        t.rawTime() >= 0 && t.totalTime(t._tTime); //moves the timeline (shifts its startTime) if necessary, and also enables it. If it's currently zero, though, it may not be scheduled to render until later so there's no need to force it to align with the current playhead position. Only move to catch up with the playhead.

        t = t._dp;
      }
    }

    timeline._zTime = -_tinyNum; // helps ensure that the next render() will be forced (crossingStart = true in render()), even if the duration hasn't changed (we're adding a child which would need to get rendered). Definitely an edge case. Note: we MUST do this AFTER the loop above where the totalTime() might trigger a render() because this _addToTimeline() method gets called from the Animation constructor, BEFORE tweens even record their targets, etc. so we wouldn't want things to get triggered in the wrong order.
  }
},
    _addToTimeline = function _addToTimeline(timeline, child, position, skipChecks) {
  child.parent && _removeFromParent(child);
  child._start = _roundPrecise((_isNumber(position) ? position : position || timeline !== _globalTimeline ? _parsePosition(timeline, position, child) : timeline._time) + child._delay);
  child._end = _roundPrecise(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));

  _addLinkedListItem(timeline, child, "_first", "_last", timeline._sort ? "_start" : 0);

  _isFromOrFromStart(child) || (timeline._recent = child);
  skipChecks || _postAddChecks(timeline, child);
  timeline._ts < 0 && _alignPlayhead(timeline, timeline._tTime); // if the timeline is reversed and the new child makes it longer, we may need to adjust the parent's _start (push it back)

  return timeline;
},
    _scrollTrigger = function _scrollTrigger(animation, trigger) {
  return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
},
    _attemptInitTween = function _attemptInitTween(tween, time, force, suppressEvents, tTime) {
  _initTween(tween, time, tTime);

  if (!tween._initted) {
    return 1;
  }

  if (!force && tween._pt && !_reverting && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
    _lazyTweens.push(tween);

    tween._lazy = [tTime, suppressEvents];
    return 1;
  }
},
    _parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart(_ref) {
  var parent = _ref.parent;
  return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart(parent));
},
    // check parent's _lock because when a timeline repeats/yoyos and does its artificial wrapping, we shouldn't force the ratio back to 0
_isFromOrFromStart = function _isFromOrFromStart(_ref2) {
  var data = _ref2.data;
  return data === "isFromStart" || data === "isStart";
},
    _renderZeroDurationTween = function _renderZeroDurationTween(tween, totalTime, suppressEvents, force) {
  var prevRatio = tween.ratio,
      ratio = totalTime < 0 || !totalTime && (!tween._start && _parentPlayheadIsBeforeStart(tween) && !(!tween._initted && _isFromOrFromStart(tween)) || (tween._ts < 0 || tween._dp._ts < 0) && !_isFromOrFromStart(tween)) ? 0 : 1,
      // if the tween or its parent is reversed and the totalTime is 0, we should go to a ratio of 0. Edge case: if a from() or fromTo() stagger tween is placed later in a timeline, the "startAt" zero-duration tween could initially render at a time when the parent timeline's playhead is technically BEFORE where this tween is, so make sure that any "from" and "fromTo" startAt tweens are rendered the first time at a ratio of 1.
  repeatDelay = tween._rDelay,
      tTime = 0,
      pt,
      iteration,
      prevIteration;

  if (repeatDelay && tween._repeat) {
    // in case there's a zero-duration tween that has a repeat with a repeatDelay
    tTime = _clamp(0, tween._tDur, totalTime);
    iteration = _animationCycle(tTime, repeatDelay);
    tween._yoyo && iteration & 1 && (ratio = 1 - ratio);

    if (iteration !== _animationCycle(tween._tTime, repeatDelay)) {
      // if iteration changed
      prevRatio = 1 - ratio;
      tween.vars.repeatRefresh && tween._initted && tween.invalidate();
    }
  }

  if (ratio !== prevRatio || _reverting || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
    if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents, tTime)) {
      // if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
      return;
    }

    prevIteration = tween._zTime;
    tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0); // when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

    suppressEvents || (suppressEvents = totalTime && !prevIteration); // if it was rendered previously at exactly 0 (_zTime) and now the playhead is moving away, DON'T fire callbacks otherwise they'll seem like duplicates.

    tween.ratio = ratio;
    tween._from && (ratio = 1 - ratio);
    tween._time = 0;
    tween._tTime = tTime;
    pt = tween._pt;

    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }

    totalTime < 0 && _rewindStartAt(tween, totalTime, suppressEvents, true);
    tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
    tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");

    if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
      ratio && _removeFromParent(tween, 1);

      if (!suppressEvents && !_reverting) {
        _callback(tween, ratio ? "onComplete" : "onReverseComplete", true);

        tween._prom && tween._prom();
      }
    }
  } else if (!tween._zTime) {
    tween._zTime = totalTime;
  }
},
    _findNextPauseTween = function _findNextPauseTween(animation, prevTime, time) {
  var child;

  if (time > prevTime) {
    child = animation._first;

    while (child && child._start <= time) {
      if (child.data === "isPause" && child._start > prevTime) {
        return child;
      }

      child = child._next;
    }
  } else {
    child = animation._last;

    while (child && child._start >= time) {
      if (child.data === "isPause" && child._start < prevTime) {
        return child;
      }

      child = child._prev;
    }
  }
},
    _setDuration = function _setDuration(animation, duration, skipUncache, leavePlayhead) {
  var repeat = animation._repeat,
      dur = _roundPrecise(duration) || 0,
      totalProgress = animation._tTime / animation._tDur;
  totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
  animation._dur = dur;
  animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _roundPrecise(dur * (repeat + 1) + animation._rDelay * repeat);
  totalProgress > 0 && !leavePlayhead && _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress);
  animation.parent && _setEnd(animation);
  skipUncache || _uncache(animation.parent, animation);
  return animation;
},
    _onUpdateTotalDuration = function _onUpdateTotalDuration(animation) {
  return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
},
    _zeroPosition = {
  _start: 0,
  endTime: _emptyFunc,
  totalDuration: _emptyFunc
},
    _parsePosition = function _parsePosition(animation, position, percentAnimation) {
  var labels = animation.labels,
      recent = animation._recent || _zeroPosition,
      clippedDuration = animation.duration() >= _bigNum ? recent.endTime(false) : animation._dur,
      //in case there's a child that infinitely repeats, users almost never intend for the insertion point of a new child to be based on a SUPER long value like that so we clip it and assume the most recently-added child's endTime should be used instead.
  i,
      offset,
      isPercent;

  if (_isString(position) && (isNaN(position) || position in labels)) {
    //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
    offset = position.charAt(0);
    isPercent = position.substr(-1) === "%";
    i = position.indexOf("=");

    if (offset === "<" || offset === ">") {
      i >= 0 && (position = position.replace(/=/, ""));
      return (offset === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0) * (isPercent ? (i < 0 ? recent : percentAnimation).totalDuration() / 100 : 1);
    }

    if (i < 0) {
      position in labels || (labels[position] = clippedDuration);
      return labels[position];
    }

    offset = parseFloat(position.charAt(i - 1) + position.substr(i + 1));

    if (isPercent && percentAnimation) {
      offset = offset / 100 * (_isArray(percentAnimation) ? percentAnimation[0] : percentAnimation).totalDuration();
    }

    return i > 1 ? _parsePosition(animation, position.substr(0, i - 1), percentAnimation) + offset : clippedDuration + offset;
  }

  return position == null ? clippedDuration : +position;
},
    _createTweenType = function _createTweenType(type, params, timeline) {
  var isLegacy = _isNumber(params[1]),
      varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1),
      vars = params[varsIndex],
      irVars,
      parent;

  isLegacy && (vars.duration = params[1]);
  vars.parent = timeline;

  if (type) {
    irVars = vars;
    parent = timeline;

    while (parent && !("immediateRender" in irVars)) {
      // inheritance hasn't happened yet, but someone may have set a default in an ancestor timeline. We could do vars.immediateRender = _isNotFalse(_inheritDefaults(vars).immediateRender) but that'd exact a slight performance penalty because _inheritDefaults() also runs in the Tween constructor. We're paying a small kb price here to gain speed.
      irVars = parent.vars.defaults || {};
      parent = _isNotFalse(parent.vars.inherit) && parent.parent;
    }

    vars.immediateRender = _isNotFalse(irVars.immediateRender);
    type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1]; // "from" vars
  }

  return new Tween(params[0], vars, params[varsIndex + 1]);
},
    _conditionalReturn = function _conditionalReturn(value, func) {
  return value || value === 0 ? func(value) : func;
},
    _clamp = function _clamp(min, max, value) {
  return value < min ? min : value > max ? max : value;
},
    getUnit = function getUnit(value, v) {
  return !_isString(value) || !(v = _unitExp.exec(value)) ? "" : v[1];
},
    // note: protect against padded numbers as strings, like "100.100". That shouldn't return "00" as the unit. If it's numeric, return no unit.
clamp = function clamp(min, max, value) {
  return _conditionalReturn(value, function (v) {
    return _clamp(min, max, v);
  });
},
    _slice = [].slice,
    _isArrayLike = function _isArrayLike(value, nonEmpty) {
  return value && _isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject(value[0])) && !value.nodeType && value !== _win;
},
    _flatten = function _flatten(ar, leaveStrings, accumulator) {
  if (accumulator === void 0) {
    accumulator = [];
  }

  return ar.forEach(function (value) {
    var _accumulator;

    return _isString(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
  }) || accumulator;
},
    //takes any value and returns an array. If it's a string (and leaveStrings isn't true), it'll use document.querySelectorAll() and convert that to an array. It'll also accept iterables like jQuery objects.
toArray = function toArray(value, scope, leaveStrings) {
  return _context && !scope && _context.selector ? _context.selector(value) : _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call((scope || _doc).querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
},
    selector = function selector(value) {
  value = toArray(value)[0] || _warn("Invalid scope") || {};
  return function (v) {
    var el = value.current || value.nativeElement || value;
    return toArray(v, el.querySelectorAll ? el : el === value ? _warn("Invalid scope") || _doc.createElement("div") : value);
  };
},
    shuffle = function shuffle(a) {
  return a.sort(function () {
    return .5 - Math.random();
  });
},
    // alternative that's a bit faster and more reliably diverse but bigger:   for (let j, v, i = a.length; i; j = Math.floor(Math.random() * i), v = a[--i], a[i] = a[j], a[j] = v); return a;
//for distributing values across an array. Can accept a number, a function or (most commonly) a function which can contain the following properties: {base, amount, from, ease, grid, axis, length, each}. Returns a function that expects the following parameters: index, target, array. Recognizes the following
distribute = function distribute(v) {
  if (_isFunction(v)) {
    return v;
  }

  var vars = _isObject(v) ? v : {
    each: v
  },
      //n:1 is just to indicate v was a number; we leverage that later to set v according to the length we get. If a number is passed in, we treat it like the old stagger value where 0.1, for example, would mean that things would be distributed with 0.1 between each element in the array rather than a total "amount" that's chunked out among them all.
  ease = _parseEase(vars.ease),
      from = vars.from || 0,
      base = parseFloat(vars.base) || 0,
      cache = {},
      isDecimal = from > 0 && from < 1,
      ratios = isNaN(from) || isDecimal,
      axis = vars.axis,
      ratioX = from,
      ratioY = from;

  if (_isString(from)) {
    ratioX = ratioY = {
      center: .5,
      edges: .5,
      end: 1
    }[from] || 0;
  } else if (!isDecimal && ratios) {
    ratioX = from[0];
    ratioY = from[1];
  }

  return function (i, target, a) {
    var l = (a || vars).length,
        distances = cache[l],
        originX,
        originY,
        x,
        y,
        d,
        j,
        max,
        min,
        wrapAt;

    if (!distances) {
      wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum])[1];

      if (!wrapAt) {
        max = -_bigNum;

        while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {}

        wrapAt--;
      }

      distances = cache[l] = [];
      originX = ratios ? Math.min(wrapAt, l) * ratioX - .5 : from % wrapAt;
      originY = wrapAt === _bigNum ? 0 : ratios ? l * ratioY / wrapAt - .5 : from / wrapAt | 0;
      max = 0;
      min = _bigNum;

      for (j = 0; j < l; j++) {
        x = j % wrapAt - originX;
        y = originY - (j / wrapAt | 0);
        distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
        d > max && (max = d);
        d < min && (min = d);
      }

      from === "random" && shuffle(distances);
      distances.max = max - min;
      distances.min = min;
      distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
      distances.b = l < 0 ? base - l : base;
      distances.u = getUnit(vars.amount || vars.each) || 0; //unit

      ease = ease && l < 0 ? _invertEase(ease) : ease;
    }

    l = (distances[i] - distances.min) / distances.max || 0;
    return _roundPrecise(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u; //round in order to work around floating point errors
  };
},
    _roundModifier = function _roundModifier(v) {
  //pass in 0.1 get a function that'll round to the nearest tenth, or 5 to round to the closest 5, or 0.001 to the closest 1000th, etc.
  var p = Math.pow(10, ((v + "").split(".")[1] || "").length); //to avoid floating point math errors (like 24 * 0.1 == 2.4000000000000004), we chop off at a specific number of decimal places (much faster than toFixed())

  return function (raw) {
    var n = _roundPrecise(Math.round(parseFloat(raw) / v) * v * p);

    return (n - n % 1) / p + (_isNumber(raw) ? 0 : getUnit(raw)); // n - n % 1 replaces Math.floor() in order to handle negative values properly. For example, Math.floor(-150.00000000000003) is 151!
  };
},
    snap = function snap(snapTo, value) {
  var isArray = _isArray(snapTo),
      radius,
      is2D;

  if (!isArray && _isObject(snapTo)) {
    radius = isArray = snapTo.radius || _bigNum;

    if (snapTo.values) {
      snapTo = toArray(snapTo.values);

      if (is2D = !_isNumber(snapTo[0])) {
        radius *= radius; //performance optimization so we don't have to Math.sqrt() in the loop.
      }
    } else {
      snapTo = _roundModifier(snapTo.increment);
    }
  }

  return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction(snapTo) ? function (raw) {
    is2D = snapTo(raw);
    return Math.abs(is2D - raw) <= radius ? is2D : raw;
  } : function (raw) {
    var x = parseFloat(is2D ? raw.x : raw),
        y = parseFloat(is2D ? raw.y : 0),
        min = _bigNum,
        closest = 0,
        i = snapTo.length,
        dx,
        dy;

    while (i--) {
      if (is2D) {
        dx = snapTo[i].x - x;
        dy = snapTo[i].y - y;
        dx = dx * dx + dy * dy;
      } else {
        dx = Math.abs(snapTo[i] - x);
      }

      if (dx < min) {
        min = dx;
        closest = i;
      }
    }

    closest = !radius || min <= radius ? snapTo[closest] : raw;
    return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
  });
},
    random = function random(min, max, roundingIncrement, returnFunction) {
  return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function () {
    return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + roundingIncrement * .99)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
  });
},
    pipe = function pipe() {
  for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  return function (value) {
    return functions.reduce(function (v, f) {
      return f(v);
    }, value);
  };
},
    unitize = function unitize(func, unit) {
  return function (value) {
    return func(parseFloat(value)) + (unit || getUnit(value));
  };
},
    normalize = function normalize(min, max, value) {
  return mapRange(min, max, 0, 1, value);
},
    _wrapArray = function _wrapArray(a, wrapper, value) {
  return _conditionalReturn(value, function (index) {
    return a[~~wrapper(index)];
  });
},
    wrap = function wrap(min, max, value) {
  // NOTE: wrap() CANNOT be an arrow function! A very odd compiling bug causes problems (unrelated to GSAP).
  var range = max - min;
  return _isArray(min) ? _wrapArray(min, wrap(0, min.length), max) : _conditionalReturn(value, function (value) {
    return (range + (value - min) % range) % range + min;
  });
},
    wrapYoyo = function wrapYoyo(min, max, value) {
  var range = max - min,
      total = range * 2;
  return _isArray(min) ? _wrapArray(min, wrapYoyo(0, min.length - 1), max) : _conditionalReturn(value, function (value) {
    value = (total + (value - min) % total) % total || 0;
    return min + (value > range ? total - value : value);
  });
},
    _replaceRandom = function _replaceRandom(value) {
  //replaces all occurrences of random(...) in a string with the calculated random value. can be a range like random(-100, 100, 5) or an array like random([0, 100, 500])
  var prev = 0,
      s = "",
      i,
      nums,
      end,
      isArray;

  while (~(i = value.indexOf("random(", prev))) {
    end = value.indexOf(")", i);
    isArray = value.charAt(i + 7) === "[";
    nums = value.substr(i + 7, end - i - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
    s += value.substr(prev, i - prev) + random(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 1e-5);
    prev = end + 1;
  }

  return s + value.substr(prev, value.length - prev);
},
    mapRange = function mapRange(inMin, inMax, outMin, outMax, value) {
  var inRange = inMax - inMin,
      outRange = outMax - outMin;
  return _conditionalReturn(value, function (value) {
    return outMin + ((value - inMin) / inRange * outRange || 0);
  });
},
    interpolate = function interpolate(start, end, progress, mutate) {
  var func = isNaN(start + end) ? 0 : function (p) {
    return (1 - p) * start + p * end;
  };

  if (!func) {
    var isString = _isString(start),
        master = {},
        p,
        i,
        interpolators,
        l,
        il;

    progress === true && (mutate = 1) && (progress = null);

    if (isString) {
      start = {
        p: start
      };
      end = {
        p: end
      };
    } else if (_isArray(start) && !_isArray(end)) {
      interpolators = [];
      l = start.length;
      il = l - 2;

      for (i = 1; i < l; i++) {
        interpolators.push(interpolate(start[i - 1], start[i])); //build the interpolators up front as a performance optimization so that when the function is called many times, it can just reuse them.
      }

      l--;

      func = function func(p) {
        p *= l;
        var i = Math.min(il, ~~p);
        return interpolators[i](p - i);
      };

      progress = end;
    } else if (!mutate) {
      start = _merge(_isArray(start) ? [] : {}, start);
    }

    if (!interpolators) {
      for (p in end) {
        _addPropTween.call(master, start, p, "get", end[p]);
      }

      func = function func(p) {
        return _renderPropTweens(p, master) || (isString ? start.p : start);
      };
    }
  }

  return _conditionalReturn(progress, func);
},
    _getLabelInDirection = function _getLabelInDirection(timeline, fromTime, backward) {
  //used for nextLabel() and previousLabel()
  var labels = timeline.labels,
      min = _bigNum,
      p,
      distance,
      label;

  for (p in labels) {
    distance = labels[p] - fromTime;

    if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
      label = p;
      min = distance;
    }
  }

  return label;
},
    _callback = function _callback(animation, type, executeLazyFirst) {
  var v = animation.vars,
      callback = v[type],
      prevContext = _context,
      context = animation._ctx,
      params,
      scope,
      result;

  if (!callback) {
    return;
  }

  params = v[type + "Params"];
  scope = v.callbackScope || animation;
  executeLazyFirst && _lazyTweens.length && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.

  context && (_context = context);
  result = params ? callback.apply(scope, params) : callback.call(scope);
  _context = prevContext;
  return result;
},
    _interrupt = function _interrupt(animation) {
  _removeFromParent(animation);

  animation.scrollTrigger && animation.scrollTrigger.kill(!!_reverting);
  animation.progress() < 1 && _callback(animation, "onInterrupt");
  return animation;
},
    _quickTween,
    _createPlugin = function _createPlugin(config) {
  config = !config.name && config["default"] || config; //UMD packaging wraps things oddly, so for example MotionPathHelper becomes {MotionPathHelper:MotionPathHelper, default:MotionPathHelper}.

  var name = config.name,
      isFunc = _isFunction(config),
      Plugin = name && !isFunc && config.init ? function () {
    this._props = [];
  } : config,
      //in case someone passes in an object that's not a plugin, like CustomEase
  instanceDefaults = {
    init: _emptyFunc,
    render: _renderPropTweens,
    add: _addPropTween,
    kill: _killPropTweensOf,
    modifier: _addPluginModifier,
    rawVars: 0
  },
      statics = {
    targetTest: 0,
    get: 0,
    getSetter: _getSetter,
    aliases: {},
    register: 0
  };

  _wake();

  if (config !== Plugin) {
    if (_plugins[name]) {
      return;
    }

    _setDefaults(Plugin, _setDefaults(_copyExcluding(config, instanceDefaults), statics)); //static methods


    _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config, statics))); //instance methods


    _plugins[Plugin.prop = name] = Plugin;

    if (config.targetTest) {
      _harnessPlugins.push(Plugin);

      _reservedProps[name] = 1;
    }

    name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin"; //for the global name. "motionPath" should become MotionPathPlugin
  }

  _addGlobal(name, Plugin);

  config.register && config.register(gsap, Plugin, PropTween);
},

/*
 * --------------------------------------------------------------------------------------
 * COLORS
 * --------------------------------------------------------------------------------------
 */
_255 = 255,
    _colorLookup = {
  aqua: [0, _255, _255],
  lime: [0, _255, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, _255],
  navy: [0, 0, 128],
  white: [_255, _255, _255],
  olive: [128, 128, 0],
  yellow: [_255, _255, 0],
  orange: [_255, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [_255, 0, 0],
  pink: [_255, 192, 203],
  cyan: [0, _255, _255],
  transparent: [_255, _255, _255, 0]
},
    // possible future idea to replace the hard-coded color name values - put this in the ticker.wake() where we set the _doc:
// let ctx = _doc.createElement("canvas").getContext("2d");
// _forEachName("aqua,lime,silver,black,maroon,teal,blue,navy,white,olive,yellow,orange,gray,purple,green,red,pink,cyan", color => {ctx.fillStyle = color; _colorLookup[color] = splitColor(ctx.fillStyle)});
_hue = function _hue(h, m1, m2) {
  h += h < 0 ? 1 : h > 1 ? -1 : 0;
  return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < .5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + .5 | 0;
},
    splitColor = function splitColor(v, toHSL, forceAlpha) {
  var a = !v ? _colorLookup.black : _isNumber(v) ? [v >> 16, v >> 8 & _255, v & _255] : 0,
      r,
      g,
      b,
      h,
      s,
      l,
      max,
      min,
      d,
      wasHSL;

  if (!a) {
    if (v.substr(-1) === ",") {
      //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
      v = v.substr(0, v.length - 1);
    }

    if (_colorLookup[v]) {
      a = _colorLookup[v];
    } else if (v.charAt(0) === "#") {
      if (v.length < 6) {
        //for shorthand like #9F0 or #9F0F (could have alpha)
        r = v.charAt(1);
        g = v.charAt(2);
        b = v.charAt(3);
        v = "#" + r + r + g + g + b + b + (v.length === 5 ? v.charAt(4) + v.charAt(4) : "");
      }

      if (v.length === 9) {
        // hex with alpha, like #fd5e53ff
        a = parseInt(v.substr(1, 6), 16);
        return [a >> 16, a >> 8 & _255, a & _255, parseInt(v.substr(7), 16) / 255];
      }

      v = parseInt(v.substr(1), 16);
      a = [v >> 16, v >> 8 & _255, v & _255];
    } else if (v.substr(0, 3) === "hsl") {
      a = wasHSL = v.match(_strictNumExp);

      if (!toHSL) {
        h = +a[0] % 360 / 360;
        s = +a[1] / 100;
        l = +a[2] / 100;
        g = l <= .5 ? l * (s + 1) : l + s - l * s;
        r = l * 2 - g;
        a.length > 3 && (a[3] *= 1); //cast as number

        a[0] = _hue(h + 1 / 3, r, g);
        a[1] = _hue(h, r, g);
        a[2] = _hue(h - 1 / 3, r, g);
      } else if (~v.indexOf("=")) {
        //if relative values are found, just return the raw strings with the relative prefixes in place.
        a = v.match(_numExp);
        forceAlpha && a.length < 4 && (a[3] = 1);
        return a;
      }
    } else {
      a = v.match(_strictNumExp) || _colorLookup.transparent;
    }

    a = a.map(Number);
  }

  if (toHSL && !wasHSL) {
    r = a[0] / _255;
    g = a[1] / _255;
    b = a[2] / _255;
    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h *= 60;
    }

    a[0] = ~~(h + .5);
    a[1] = ~~(s * 100 + .5);
    a[2] = ~~(l * 100 + .5);
  }

  forceAlpha && a.length < 4 && (a[3] = 1);
  return a;
},
    _colorOrderData = function _colorOrderData(v) {
  // strips out the colors from the string, finds all the numeric slots (with units) and returns an array of those. The Array also has a "c" property which is an Array of the index values where the colors belong. This is to help work around issues where there's a mis-matched order of color/numeric data like drop-shadow(#f00 0px 1px 2px) and drop-shadow(0x 1px 2px #f00). This is basically a helper function used in _formatColors()
  var values = [],
      c = [],
      i = -1;
  v.split(_colorExp).forEach(function (v) {
    var a = v.match(_numWithUnitExp) || [];
    values.push.apply(values, a);
    c.push(i += a.length + 1);
  });
  values.c = c;
  return values;
},
    _formatColors = function _formatColors(s, toHSL, orderMatchData) {
  var result = "",
      colors = (s + result).match(_colorExp),
      type = toHSL ? "hsla(" : "rgba(",
      i = 0,
      c,
      shell,
      d,
      l;

  if (!colors) {
    return s;
  }

  colors = colors.map(function (color) {
    return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
  });

  if (orderMatchData) {
    d = _colorOrderData(s);
    c = orderMatchData.c;

    if (c.join(result) !== d.c.join(result)) {
      shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
      l = shell.length - 1;

      for (; i < l; i++) {
        result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
      }
    }
  }

  if (!shell) {
    shell = s.split(_colorExp);
    l = shell.length - 1;

    for (; i < l; i++) {
      result += shell[i] + colors[i];
    }
  }

  return result + shell[l];
},
    _colorExp = function () {
  var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",
      //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.,
  p;

  for (p in _colorLookup) {
    s += "|" + p + "\\b";
  }

  return new RegExp(s + ")", "gi");
}(),
    _hslExp = /hsl[a]?\(/,
    _colorStringFilter = function _colorStringFilter(a) {
  var combined = a.join(" "),
      toHSL;
  _colorExp.lastIndex = 0;

  if (_colorExp.test(combined)) {
    toHSL = _hslExp.test(combined);
    a[1] = _formatColors(a[1], toHSL);
    a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1])); // make sure the order of numbers/colors match with the END value.

    return true;
  }
},

/*
 * --------------------------------------------------------------------------------------
 * TICKER
 * --------------------------------------------------------------------------------------
 */
_tickerActive,
    _ticker = function () {
  var _getTime = Date.now,
      _lagThreshold = 500,
      _adjustedLag = 33,
      _startTime = _getTime(),
      _lastUpdate = _startTime,
      _gap = 1000 / 240,
      _nextTime = _gap,
      _listeners = [],
      _id,
      _req,
      _raf,
      _self,
      _delta,
      _i,
      _tick = function _tick(v) {
    var elapsed = _getTime() - _lastUpdate,
        manual = v === true,
        overlap,
        dispatch,
        time,
        frame;

    elapsed > _lagThreshold && (_startTime += elapsed - _adjustedLag);
    _lastUpdate += elapsed;
    time = _lastUpdate - _startTime;
    overlap = time - _nextTime;

    if (overlap > 0 || manual) {
      frame = ++_self.frame;
      _delta = time - _self.time * 1000;
      _self.time = time = time / 1000;
      _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
      dispatch = 1;
    }

    manual || (_id = _req(_tick)); //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.

    if (dispatch) {
      for (_i = 0; _i < _listeners.length; _i++) {
        // use _i and check _listeners.length instead of a variable because a listener could get removed during the loop, and if that happens to an element less than the current index, it'd throw things off in the loop.
        _listeners[_i](time, _delta, frame, v);
      }
    }
  };

  _self = {
    time: 0,
    frame: 0,
    tick: function tick() {
      _tick(true);
    },
    deltaRatio: function deltaRatio(fps) {
      return _delta / (1000 / (fps || 60));
    },
    wake: function wake() {
      if (_coreReady) {
        if (!_coreInitted && _windowExists()) {
          _win = _coreInitted = window;
          _doc = _win.document || {};
          _globals.gsap = gsap;
          (_win.gsapVersions || (_win.gsapVersions = [])).push(gsap.version);

          _install(_installScope || _win.GreenSockGlobals || !_win.gsap && _win || {});

          _raf = _win.requestAnimationFrame;
        }

        _id && _self.sleep();

        _req = _raf || function (f) {
          return setTimeout(f, _nextTime - _self.time * 1000 + 1 | 0);
        };

        _tickerActive = 1;

        _tick(2);
      }
    },
    sleep: function sleep() {
      (_raf ? _win.cancelAnimationFrame : clearTimeout)(_id);
      _tickerActive = 0;
      _req = _emptyFunc;
    },
    lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
      _lagThreshold = threshold || 1 / _tinyNum; //zero should be interpreted as basically unlimited

      _adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
    },
    fps: function fps(_fps) {
      _gap = 1000 / (_fps || 240);
      _nextTime = _self.time * 1000 + _gap;
    },
    add: function add(callback, once, prioritize) {
      var func = once ? function (t, d, f, v) {
        callback(t, d, f, v);

        _self.remove(func);
      } : callback;

      _self.remove(callback);

      _listeners[prioritize ? "unshift" : "push"](func);

      _wake();

      return func;
    },
    remove: function remove(callback, i) {
      ~(i = _listeners.indexOf(callback)) && _listeners.splice(i, 1) && _i >= i && _i--;
    },
    _listeners: _listeners
  };
  return _self;
}(),
    _wake = function _wake() {
  return !_tickerActive && _ticker.wake();
},
    //also ensures the core classes are initialized.

/*
* -------------------------------------------------
* EASING
* -------------------------------------------------
*/
_easeMap = {},
    _customEaseExp = /^[\d.\-M][\d.\-,\s]/,
    _quotesExp = /["']/g,
    _parseObjectInString = function _parseObjectInString(value) {
  //takes a string like "{wiggles:10, type:anticipate})" and turns it into a real object. Notice it ends in ")" and includes the {} wrappers. This is because we only use this function for parsing ease configs and prioritized optimization rather than reusability.
  var obj = {},
      split = value.substr(1, value.length - 3).split(":"),
      key = split[0],
      i = 1,
      l = split.length,
      index,
      val,
      parsedVal;

  for (; i < l; i++) {
    val = split[i];
    index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
    parsedVal = val.substr(0, index);
    obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
    key = val.substr(index + 1).trim();
  }

  return obj;
},
    _valueInParentheses = function _valueInParentheses(value) {
  var open = value.indexOf("(") + 1,
      close = value.indexOf(")"),
      nested = value.indexOf("(", open);
  return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
},
    _configEaseFromString = function _configEaseFromString(name) {
  //name can be a string like "elastic.out(1,0.5)", and pass in _easeMap as obj and it'll parse it out and call the actual function like _easeMap.Elastic.easeOut.config(1,0.5). It will also parse custom ease strings as long as CustomEase is loaded and registered (internally as _easeMap._CE).
  var split = (name + "").split("("),
      ease = _easeMap[split[0]];
  return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split[1])] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
},
    _invertEase = function _invertEase(ease) {
  return function (p) {
    return 1 - ease(1 - p);
  };
},
    // allow yoyoEase to be set in children and have those affected when the parent/ancestor timeline yoyos.
_propagateYoyoEase = function _propagateYoyoEase(timeline, isYoyo) {
  var child = timeline._first,
      ease;

  while (child) {
    if (child instanceof Timeline) {
      _propagateYoyoEase(child, isYoyo);
    } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
      if (child.timeline) {
        _propagateYoyoEase(child.timeline, isYoyo);
      } else {
        ease = child._ease;
        child._ease = child._yEase;
        child._yEase = ease;
        child._yoyo = isYoyo;
      }
    }

    child = child._next;
  }
},
    _parseEase = function _parseEase(ease, defaultEase) {
  return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
},
    _insertEase = function _insertEase(names, easeIn, easeOut, easeInOut) {
  if (easeOut === void 0) {
    easeOut = function easeOut(p) {
      return 1 - easeIn(1 - p);
    };
  }

  if (easeInOut === void 0) {
    easeInOut = function easeInOut(p) {
      return p < .5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
    };
  }

  var ease = {
    easeIn: easeIn,
    easeOut: easeOut,
    easeInOut: easeInOut
  },
      lowercaseName;

  _forEachName(names, function (name) {
    _easeMap[name] = _globals[name] = ease;
    _easeMap[lowercaseName = name.toLowerCase()] = easeOut;

    for (var p in ease) {
      _easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
    }
  });

  return ease;
},
    _easeInOutFromOut = function _easeInOutFromOut(easeOut) {
  return function (p) {
    return p < .5 ? (1 - easeOut(1 - p * 2)) / 2 : .5 + easeOut((p - .5) * 2) / 2;
  };
},
    _configElastic = function _configElastic(type, amplitude, period) {
  var p1 = amplitude >= 1 ? amplitude : 1,
      //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
  p2 = (period || (type ? .3 : .45)) / (amplitude < 1 ? amplitude : 1),
      p3 = p2 / _2PI * (Math.asin(1 / p1) || 0),
      easeOut = function easeOut(p) {
    return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
  },
      ease = type === "out" ? easeOut : type === "in" ? function (p) {
    return 1 - easeOut(1 - p);
  } : _easeInOutFromOut(easeOut);

  p2 = _2PI / p2; //precalculate to optimize

  ease.config = function (amplitude, period) {
    return _configElastic(type, amplitude, period);
  };

  return ease;
},
    _configBack = function _configBack(type, overshoot) {
  if (overshoot === void 0) {
    overshoot = 1.70158;
  }

  var easeOut = function easeOut(p) {
    return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
  },
      ease = type === "out" ? easeOut : type === "in" ? function (p) {
    return 1 - easeOut(1 - p);
  } : _easeInOutFromOut(easeOut);

  ease.config = function (overshoot) {
    return _configBack(type, overshoot);
  };

  return ease;
}; // a cheaper (kb and cpu) but more mild way to get a parameterized weighted ease by feeding in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
// _weightedEase = ratio => {
// 	let y = 0.5 + ratio / 2;
// 	return p => (2 * (1 - p) * p * y + p * p);
// },
// a stronger (but more expensive kb/cpu) parameterized weighted ease that lets you feed in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
// _weightedEaseStrong = ratio => {
// 	ratio = .5 + ratio / 2;
// 	let o = 1 / 3 * (ratio < .5 ? ratio : 1 - ratio),
// 		b = ratio - o,
// 		c = ratio + o;
// 	return p => p === 1 ? p : 3 * b * (1 - p) * (1 - p) * p + 3 * c * (1 - p) * p * p + p * p * p;
// };


_forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function (name, i) {
  var power = i < 5 ? i + 1 : i;

  _insertEase(name + ",Power" + (power - 1), i ? function (p) {
    return Math.pow(p, power);
  } : function (p) {
    return p;
  }, function (p) {
    return 1 - Math.pow(1 - p, power);
  }, function (p) {
    return p < .5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
  });
});

_easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;

_insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());

(function (n, c) {
  var n1 = 1 / c,
      n2 = 2 * n1,
      n3 = 2.5 * n1,
      easeOut = function easeOut(p) {
    return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + .75 : p < n3 ? n * (p -= 2.25 / c) * p + .9375 : n * Math.pow(p - 2.625 / c, 2) + .984375;
  };

  _insertEase("Bounce", function (p) {
    return 1 - easeOut(1 - p);
  }, easeOut);
})(7.5625, 2.75);

_insertEase("Expo", function (p) {
  return p ? Math.pow(2, 10 * (p - 1)) : 0;
});

_insertEase("Circ", function (p) {
  return -(_sqrt(1 - p * p) - 1);
});

_insertEase("Sine", function (p) {
  return p === 1 ? 1 : -_cos(p * _HALF_PI) + 1;
});

_insertEase("Back", _configBack("in"), _configBack("out"), _configBack());

_easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
  config: function config(steps, immediateStart) {
    if (steps === void 0) {
      steps = 1;
    }

    var p1 = 1 / steps,
        p2 = steps + (immediateStart ? 0 : 1),
        p3 = immediateStart ? 1 : 0,
        max = 1 - _tinyNum;
    return function (p) {
      return ((p2 * _clamp(0, max, p) | 0) + p3) * p1;
    };
  }
};
_defaults.ease = _easeMap["quad.out"];

_forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (name) {
  return _callbackNames += name + "," + name + "Params,";
});
/*
 * --------------------------------------------------------------------------------------
 * CACHE
 * --------------------------------------------------------------------------------------
 */


var GSCache = function GSCache(target, harness) {
  this.id = _gsID++;
  target._gsap = this;
  this.target = target;
  this.harness = harness;
  this.get = harness ? harness.get : _getProperty;
  this.set = harness ? harness.getSetter : _getSetter;
};
/*
 * --------------------------------------------------------------------------------------
 * ANIMATION
 * --------------------------------------------------------------------------------------
 */

var Animation = /*#__PURE__*/function () {
  function Animation(vars) {
    this.vars = vars;
    this._delay = +vars.delay || 0;

    if (this._repeat = vars.repeat === Infinity ? -2 : vars.repeat || 0) {
      // TODO: repeat: Infinity on a timeline's children must flag that timeline internally and affect its totalDuration, otherwise it'll stop in the negative direction when reaching the start.
      this._rDelay = vars.repeatDelay || 0;
      this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
    }

    this._ts = 1;

    _setDuration(this, +vars.duration, 1, 1);

    this.data = vars.data;

    if (_context) {
      this._ctx = _context;

      _context.data.push(this);
    }

    _tickerActive || _ticker.wake();
  }

  var _proto = Animation.prototype;

  _proto.delay = function delay(value) {
    if (value || value === 0) {
      this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
      this._delay = value;
      return this;
    }

    return this._delay;
  };

  _proto.duration = function duration(value) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
  };

  _proto.totalDuration = function totalDuration(value) {
    if (!arguments.length) {
      return this._tDur;
    }

    this._dirty = 0;
    return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
  };

  _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
    _wake();

    if (!arguments.length) {
      return this._tTime;
    }

    var parent = this._dp;

    if (parent && parent.smoothChildTiming && this._ts) {
      _alignPlayhead(this, _totalTime);

      !parent._dp || parent.parent || _postAddChecks(parent, this); // edge case: if this is a child of a timeline that already completed, for example, we must re-activate the parent.
      //in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The start of that child would get pushed out, but one of the ancestors may have completed.

      while (parent && parent.parent) {
        if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
          parent.totalTime(parent._tTime, true);
        }

        parent = parent.parent;
      }

      if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) {
        //if the animation doesn't have a parent, put it back into its last parent (recorded as _dp for exactly cases like this). Limit to parents with autoRemoveChildren (like globalTimeline) so that if the user manually removes an animation from a timeline and then alters its playhead, it doesn't get added back in.
        _addToTimeline(this._dp, this, this._start - this._delay);
      }
    }

    if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
      // check for _ptLookup on a Tween instance to ensure it has actually finished being instantiated, otherwise if this.reverse() gets called in the Animation constructor, it could trigger a render() here even though the _targets weren't populated, thus when _init() is called there won't be any PropTweens (it'll act like the tween is non-functional)
      this._ts || (this._pTime = _totalTime); // otherwise, if an animation is paused, then the playhead is moved back to zero, then resumed, it'd revert back to the original time at the pause
      //if (!this._lock) { // avoid endless recursion (not sure we need this yet or if it's worth the performance hit)
      //   this._lock = 1;

      _lazySafeRender(this, _totalTime, suppressEvents); //   this._lock = 0;
      //}

    }

    return this;
  };

  _proto.time = function time(value, suppressEvents) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % (this._dur + this._rDelay) || (value ? this._dur : 0), suppressEvents) : this._time; // note: if the modulus results in 0, the playhead could be exactly at the end or the beginning, and we always defer to the END with a non-zero value, otherwise if you set the time() to the very end (duration()), it would render at the START!
  };

  _proto.totalProgress = function totalProgress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
  };

  _proto.progress = function progress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
  };

  _proto.iteration = function iteration(value, suppressEvents) {
    var cycleDuration = this.duration() + this._rDelay;

    return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
  } // potential future addition:
  // isPlayingBackwards() {
  // 	let animation = this,
  // 		orientation = 1; // 1 = forward, -1 = backward
  // 	while (animation) {
  // 		orientation *= animation.reversed() || (animation.repeat() && !(animation.iteration() & 1)) ? -1 : 1;
  // 		animation = animation.parent;
  // 	}
  // 	return orientation < 0;
  // }
  ;

  _proto.timeScale = function timeScale(value) {
    if (!arguments.length) {
      return this._rts === -_tinyNum ? 0 : this._rts; // recorded timeScale. Special case: if someone calls reverse() on an animation with timeScale of 0, we assign it -_tinyNum to remember it's reversed.
    }

    if (this._rts === value) {
      return this;
    }

    var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime; // make sure to do the parentToChildTotalTime() BEFORE setting the new _ts because the old one must be used in that calculation.
    // future addition? Up side: fast and minimal file size. Down side: only works on this animation; if a timeline is reversed, for example, its childrens' onReverse wouldn't get called.
    //(+value < 0 && this._rts >= 0) && _callback(this, "onReverse", true);
    // prioritize rendering where the parent's playhead lines up instead of this._tTime because there could be a tween that's animating another tween's timeScale in the same rendering loop (same parent), thus if the timeScale tween renders first, it would alter _start BEFORE _tTime was set on that tick (in the rendering loop), effectively freezing it until the timeScale tween finishes.

    this._rts = +value || 0;
    this._ts = this._ps || value === -_tinyNum ? 0 : this._rts; // _ts is the functional timeScale which would be 0 if the animation is paused.

    this.totalTime(_clamp(-this._delay, this._tDur, tTime), true);

    _setEnd(this); // if parent.smoothChildTiming was false, the end time didn't get updated in the _alignPlayhead() method, so do it here.


    return _recacheAncestors(this);
  };

  _proto.paused = function paused(value) {
    if (!arguments.length) {
      return this._ps;
    }

    if (this._ps !== value) {
      this._ps = value;

      if (value) {
        this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()); // if the pause occurs during the delay phase, make sure that's factored in when resuming.

        this._ts = this._act = 0; // _ts is the functional timeScale, so a paused tween would effectively have a timeScale of 0. We record the "real" timeScale as _rts (recorded time scale)
      } else {
        _wake();

        this._ts = this._rts; //only defer to _pTime (pauseTime) if tTime is zero. Remember, someone could pause() an animation, then scrub the playhead and resume(). If the parent doesn't have smoothChildTiming, we render at the rawTime() because the startTime won't get updated.

        this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== _tinyNum && (this._tTime -= _tinyNum)); // edge case: animation.progress(1).pause().play() wouldn't render again because the playhead is already at the end, but the call to totalTime() below will add it back to its parent...and not remove it again (since removing only happens upon rendering at a new time). Offsetting the _tTime slightly is done simply to cause the final render in totalTime() that'll pop it off its timeline (if autoRemoveChildren is true, of course). Check to make sure _zTime isn't -_tinyNum to avoid an edge case where the playhead is pushed to the end but INSIDE a tween/callback, the timeline itself is paused thus halting rendering and leaving a few unrendered. When resuming, it wouldn't render those otherwise.
      }
    }

    return this;
  };

  _proto.startTime = function startTime(value) {
    if (arguments.length) {
      this._start = value;
      var parent = this.parent || this._dp;
      parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
      return this;
    }

    return this._start;
  };

  _proto.endTime = function endTime(includeRepeats) {
    return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  };

  _proto.rawTime = function rawTime(wrapRepeats) {
    var parent = this.parent || this._dp; // _dp = detached parent

    return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
  };

  _proto.revert = function revert(config) {
    if (config === void 0) {
      config = _revertConfig;
    }

    var prevIsReverting = _reverting;
    _reverting = config;

    if (this._initted || this._startAt) {
      this.timeline && this.timeline.revert(config);
      this.totalTime(-0.01, config.suppressEvents);
    }

    this.data !== "nested" && config.kill !== false && this.kill();
    _reverting = prevIsReverting;
    return this;
  };

  _proto.globalTime = function globalTime(rawTime) {
    var animation = this,
        time = arguments.length ? rawTime : animation.rawTime();

    while (animation) {
      time = animation._start + time / (animation._ts || 1);
      animation = animation._dp;
    }

    return !this.parent && this.vars.immediateRender ? -1 : time; // the _startAt tweens for .fromTo() and .from() that have immediateRender should always be FIRST in the timeline (important for Recording.revert())
  };

  _proto.repeat = function repeat(value) {
    if (arguments.length) {
      this._repeat = value === Infinity ? -2 : value;
      return _onUpdateTotalDuration(this);
    }

    return this._repeat === -2 ? Infinity : this._repeat;
  };

  _proto.repeatDelay = function repeatDelay(value) {
    if (arguments.length) {
      var time = this._time;
      this._rDelay = value;

      _onUpdateTotalDuration(this);

      return time ? this.time(time) : this;
    }

    return this._rDelay;
  };

  _proto.yoyo = function yoyo(value) {
    if (arguments.length) {
      this._yoyo = value;
      return this;
    }

    return this._yoyo;
  };

  _proto.seek = function seek(position, suppressEvents) {
    return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
  };

  _proto.restart = function restart(includeDelay, suppressEvents) {
    return this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
  };

  _proto.play = function play(from, suppressEvents) {
    from != null && this.seek(from, suppressEvents);
    return this.reversed(false).paused(false);
  };

  _proto.reverse = function reverse(from, suppressEvents) {
    from != null && this.seek(from || this.totalDuration(), suppressEvents);
    return this.reversed(true).paused(false);
  };

  _proto.pause = function pause(atTime, suppressEvents) {
    atTime != null && this.seek(atTime, suppressEvents);
    return this.paused(true);
  };

  _proto.resume = function resume() {
    return this.paused(false);
  };

  _proto.reversed = function reversed(value) {
    if (arguments.length) {
      !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0)); // in case timeScale is zero, reversing would have no effect so we use _tinyNum.

      return this;
    }

    return this._rts < 0;
  };

  _proto.invalidate = function invalidate() {
    this._initted = this._act = 0;
    this._zTime = -_tinyNum;
    return this;
  };

  _proto.isActive = function isActive() {
    var parent = this.parent || this._dp,
        start = this._start,
        rawTime;
    return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
  };

  _proto.eventCallback = function eventCallback(type, callback, params) {
    var vars = this.vars;

    if (arguments.length > 1) {
      if (!callback) {
        delete vars[type];
      } else {
        vars[type] = callback;
        params && (vars[type + "Params"] = params);
        type === "onUpdate" && (this._onUpdate = callback);
      }

      return this;
    }

    return vars[type];
  };

  _proto.then = function then(onFulfilled) {
    var self = this;
    return new Promise(function (resolve) {
      var f = _isFunction(onFulfilled) ? onFulfilled : _passThrough,
          _resolve = function _resolve() {
        var _then = self.then;
        self.then = null; // temporarily null the then() method to avoid an infinite loop (see https://github.com/greensock/GSAP/issues/322)

        _isFunction(f) && (f = f(self)) && (f.then || f === self) && (self.then = _then);
        resolve(f);
        self.then = _then;
      };

      if (self._initted && self.totalProgress() === 1 && self._ts >= 0 || !self._tTime && self._ts < 0) {
        _resolve();
      } else {
        self._prom = _resolve;
      }
    });
  };

  _proto.kill = function kill() {
    _interrupt(this);
  };

  return Animation;
}();

_setDefaults(Animation.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: false,
  parent: null,
  _initted: false,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -_tinyNum,
  _prom: 0,
  _ps: false,
  _rts: 1
});
/*
 * -------------------------------------------------
 * TIMELINE
 * -------------------------------------------------
 */


var Timeline = /*#__PURE__*/function (_Animation) {
  _inheritsLoose(Timeline, _Animation);

  function Timeline(vars, position) {
    var _this;

    if (vars === void 0) {
      vars = {};
    }

    _this = _Animation.call(this, vars) || this;
    _this.labels = {};
    _this.smoothChildTiming = !!vars.smoothChildTiming;
    _this.autoRemoveChildren = !!vars.autoRemoveChildren;
    _this._sort = _isNotFalse(vars.sortChildren);
    _globalTimeline && _addToTimeline(vars.parent || _globalTimeline, _assertThisInitialized(_this), position);
    vars.reversed && _this.reverse();
    vars.paused && _this.paused(true);
    vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
    return _this;
  }

  var _proto2 = Timeline.prototype;

  _proto2.to = function to(targets, vars, position) {
    _createTweenType(0, arguments, this);

    return this;
  };

  _proto2.from = function from(targets, vars, position) {
    _createTweenType(1, arguments, this);

    return this;
  };

  _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
    _createTweenType(2, arguments, this);

    return this;
  };

  _proto2.set = function set(targets, vars, position) {
    vars.duration = 0;
    vars.parent = this;
    _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
    vars.immediateRender = !!vars.immediateRender;
    new Tween(targets, vars, _parsePosition(this, position), 1);
    return this;
  };

  _proto2.call = function call(callback, params, position) {
    return _addToTimeline(this, Tween.delayedCall(0, callback, params), position);
  } //ONLY for backward compatibility! Maybe delete?
  ;

  _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.duration = duration;
    vars.stagger = vars.stagger || stagger;
    vars.onComplete = onCompleteAll;
    vars.onCompleteParams = onCompleteAllParams;
    vars.parent = this;
    new Tween(targets, vars, _parsePosition(this, position));
    return this;
  };

  _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.runBackwards = 1;
    _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
    return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
  };

  _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
    toVars.startAt = fromVars;
    _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
    return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
  };

  _proto2.render = function render(totalTime, suppressEvents, force) {
    var prevTime = this._time,
        tDur = this._dirty ? this.totalDuration() : this._tDur,
        dur = this._dur,
        tTime = totalTime <= 0 ? 0 : _roundPrecise(totalTime),
        // if a paused timeline is resumed (or its _start is updated for another reason...which rounds it), that could result in the playhead shifting a **tiny** amount and a zero-duration child at that spot may get rendered at a different ratio, like its totalTime in render() may be 1e-17 instead of 0, for example.
    crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur),
        time,
        child,
        next,
        iteration,
        cycleDuration,
        prevPaused,
        pauseTween,
        timeScale,
        prevStart,
        prevIteration,
        yoyo,
        isYoyo;
    this !== _globalTimeline && tTime > tDur && totalTime >= 0 && (tTime = tDur);

    if (tTime !== this._tTime || force || crossingStart) {
      if (prevTime !== this._time && dur) {
        //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
        tTime += this._time - prevTime;
        totalTime += this._time - prevTime;
      }

      time = tTime;
      prevStart = this._start;
      timeScale = this._ts;
      prevPaused = !timeScale;

      if (crossingStart) {
        dur || (prevTime = this._zTime); //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

        (totalTime || !suppressEvents) && (this._zTime = totalTime);
      }

      if (this._repeat) {
        //adjust the time for repeats and yoyos
        yoyo = this._yoyo;
        cycleDuration = dur + this._rDelay;

        if (this._repeat < -1 && totalTime < 0) {
          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
        }

        time = _roundPrecise(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

        if (tTime === tDur) {
          // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
          iteration = this._repeat;
          time = dur;
        } else {
          iteration = ~~(tTime / cycleDuration);

          if (iteration && iteration === tTime / cycleDuration) {
            time = dur;
            iteration--;
          }

          time > dur && (time = dur);
        }

        prevIteration = _animationCycle(this._tTime, cycleDuration);
        !prevTime && this._tTime && prevIteration !== iteration && (prevIteration = iteration); // edge case - if someone does addPause() at the very beginning of a repeating timeline, that pause is technically at the same spot as the end which causes this._time to get set to 0 when the totalTime would normally place the playhead at the end. See https://greensock.com/forums/topic/23823-closing-nav-animation-not-working-on-ie-and-iphone-6-maybe-other-older-browser/?tab=comments#comment-113005

        if (yoyo && iteration & 1) {
          time = dur - time;
          isYoyo = 1;
        }
        /*
        make sure children at the end/beginning of the timeline are rendered properly. If, for example,
        a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
        would get translated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
        could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So
        we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
        ensure that zero-duration tweens at the very beginning or end of the Timeline work.
        */


        if (iteration !== prevIteration && !this._lock) {
          var rewinding = yoyo && prevIteration & 1,
              doesWrap = rewinding === (yoyo && iteration & 1);
          iteration < prevIteration && (rewinding = !rewinding);
          prevTime = rewinding ? 0 : dur;
          this._lock = 1;
          this.render(prevTime || (isYoyo ? 0 : _roundPrecise(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
          this._tTime = tTime; // if a user gets the iteration() inside the onRepeat, for example, it should be accurate.

          !suppressEvents && this.parent && _callback(this, "onRepeat");
          this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);

          if (prevTime && prevTime !== this._time || prevPaused !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) {
            // if prevTime is 0 and we render at the very end, _time will be the end, thus won't match. So in this edge case, prevTime won't match _time but that's okay. If it gets killed in the onRepeat, eject as well.
            return this;
          }

          dur = this._dur; // in case the duration changed in the onRepeat

          tDur = this._tDur;

          if (doesWrap) {
            this._lock = 2;
            prevTime = rewinding ? dur : -0.0001;
            this.render(prevTime, true);
            this.vars.repeatRefresh && !isYoyo && this.invalidate();
          }

          this._lock = 0;

          if (!this._ts && !prevPaused) {
            return this;
          } //in order for yoyoEase to work properly when there's a stagger, we must swap out the ease in each sub-tween.


          _propagateYoyoEase(this, isYoyo);
        }
      }

      if (this._hasPause && !this._forcing && this._lock < 2) {
        pauseTween = _findNextPauseTween(this, _roundPrecise(prevTime), _roundPrecise(time));

        if (pauseTween) {
          tTime -= time - (time = pauseTween._start);
        }
      }

      this._tTime = tTime;
      this._time = time;
      this._act = !timeScale; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

      if (!this._initted) {
        this._onUpdate = this.vars.onUpdate;
        this._initted = 1;
        this._zTime = totalTime;
        prevTime = 0; // upon init, the playhead should always go forward; someone could invalidate() a completed timeline and then if they restart(), that would make child tweens render in reverse order which could lock in the wrong starting values if they build on each other, like tl.to(obj, {x: 100}).to(obj, {x: 0}).
      }

      if (!prevTime && time && !suppressEvents) {
        _callback(this, "onStart");

        if (this._tTime !== tTime) {
          // in case the onStart triggered a render at a different spot, eject. Like if someone did animation.pause(0.5) or something inside the onStart.
          return this;
        }
      }

      if (time >= prevTime && totalTime >= 0) {
        child = this._first;

        while (child) {
          next = child._next;

          if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
              return this.render(totalTime, suppressEvents, force);
            }

            child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);

            if (time !== this._time || !this._ts && !prevPaused) {
              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
              pauseTween = 0;
              next && (tTime += this._zTime = -_tinyNum); // it didn't finish rendering, so flag zTime as negative so that so that the next time render() is called it'll be forced (to render any remaining children)

              break;
            }
          }

          child = next;
        }
      } else {
        child = this._last;
        var adjustedTime = totalTime < 0 ? totalTime : time; //when the playhead goes backward beyond the start of this timeline, we must pass that information down to the child animations so that zero-duration tweens know whether to render their starting or ending values.

        while (child) {
          next = child._prev;

          if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
              return this.render(totalTime, suppressEvents, force);
            }

            child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force || _reverting && (child._initted || child._startAt)); // if reverting, we should always force renders of initted tweens (but remember that .fromTo() or .from() may have a _startAt but not _initted yet). If, for example, a .fromTo() tween with a stagger (which creates an internal timeline) gets reverted BEFORE some of its child tweens render for the first time, it may not properly trigger them to revert.

            if (time !== this._time || !this._ts && !prevPaused) {
              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
              pauseTween = 0;
              next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum); // it didn't finish rendering, so adjust zTime so that so that the next time render() is called it'll be forced (to render any remaining children)

              break;
            }
          }

          child = next;
        }
      }

      if (pauseTween && !suppressEvents) {
        this.pause();
        pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;

        if (this._ts) {
          //the callback resumed playback! So since we may have held back the playhead due to where the pause is positioned, go ahead and jump to where it's SUPPOSED to be (if no pause happened).
          this._start = prevStart; //if the pause was at an earlier time and the user resumed in the callback, it could reposition the timeline (changing its startTime), throwing things off slightly, so we make sure the _start doesn't shift.

          _setEnd(this);

          return this.render(totalTime, suppressEvents, force);
        }
      }

      this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
      if (tTime === tDur && this._tTime >= this.totalDuration() || !tTime && prevTime) if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) if (!this._lock) {
        // remember, a child's callback may alter this timeline's playhead or timeScale which is why we need to add some of these checks.
        (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

        if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime || !tDur)) {
          _callback(this, tTime === tDur && totalTime >= 0 ? "onComplete" : "onReverseComplete", true);

          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
        }
      }
    }

    return this;
  };

  _proto2.add = function add(child, position) {
    var _this2 = this;

    _isNumber(position) || (position = _parsePosition(this, position, child));

    if (!(child instanceof Animation)) {
      if (_isArray(child)) {
        child.forEach(function (obj) {
          return _this2.add(obj, position);
        });
        return this;
      }

      if (_isString(child)) {
        return this.addLabel(child, position);
      }

      if (_isFunction(child)) {
        child = Tween.delayedCall(0, child);
      } else {
        return this;
      }
    }

    return this !== child ? _addToTimeline(this, child, position) : this; //don't allow a timeline to be added to itself as a child!
  };

  _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
    if (nested === void 0) {
      nested = true;
    }

    if (tweens === void 0) {
      tweens = true;
    }

    if (timelines === void 0) {
      timelines = true;
    }

    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = -_bigNum;
    }

    var a = [],
        child = this._first;

    while (child) {
      if (child._start >= ignoreBeforeTime) {
        if (child instanceof Tween) {
          tweens && a.push(child);
        } else {
          timelines && a.push(child);
          nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
        }
      }

      child = child._next;
    }

    return a;
  };

  _proto2.getById = function getById(id) {
    var animations = this.getChildren(1, 1, 1),
        i = animations.length;

    while (i--) {
      if (animations[i].vars.id === id) {
        return animations[i];
      }
    }
  };

  _proto2.remove = function remove(child) {
    if (_isString(child)) {
      return this.removeLabel(child);
    }

    if (_isFunction(child)) {
      return this.killTweensOf(child);
    }

    _removeLinkedListItem(this, child);

    if (child === this._recent) {
      this._recent = this._last;
    }

    return _uncache(this);
  };

  _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
    if (!arguments.length) {
      return this._tTime;
    }

    this._forcing = 1;

    if (!this._dp && this._ts) {
      //special case for the global timeline (or any other that has no parent or detached parent).
      this._start = _roundPrecise(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
    }

    _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);

    this._forcing = 0;
    return this;
  };

  _proto2.addLabel = function addLabel(label, position) {
    this.labels[label] = _parsePosition(this, position);
    return this;
  };

  _proto2.removeLabel = function removeLabel(label) {
    delete this.labels[label];
    return this;
  };

  _proto2.addPause = function addPause(position, callback, params) {
    var t = Tween.delayedCall(0, callback || _emptyFunc, params);
    t.data = "isPause";
    this._hasPause = 1;
    return _addToTimeline(this, t, _parsePosition(this, position));
  };

  _proto2.removePause = function removePause(position) {
    var child = this._first;
    position = _parsePosition(this, position);

    while (child) {
      if (child._start === position && child.data === "isPause") {
        _removeFromParent(child);
      }

      child = child._next;
    }
  };

  _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    var tweens = this.getTweensOf(targets, onlyActive),
        i = tweens.length;

    while (i--) {
      _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
    }

    return this;
  };

  _proto2.getTweensOf = function getTweensOf(targets, onlyActive) {
    var a = [],
        parsedTargets = toArray(targets),
        child = this._first,
        isGlobalTime = _isNumber(onlyActive),
        // a number is interpreted as a global time. If the animation spans
    children;

    while (child) {
      if (child instanceof Tween) {
        if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) {
          // note: if this is for overwriting, it should only be for tweens that aren't paused and are initted.
          a.push(child);
        }
      } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
        a.push.apply(a, children);
      }

      child = child._next;
    }

    return a;
  } // potential future feature - targets() on timelines
  // targets() {
  // 	let result = [];
  // 	this.getChildren(true, true, false).forEach(t => result.push(...t.targets()));
  // 	return result.filter((v, i) => result.indexOf(v) === i);
  // }
  ;

  _proto2.tweenTo = function tweenTo(position, vars) {
    vars = vars || {};

    var tl = this,
        endTime = _parsePosition(tl, position),
        _vars = vars,
        startAt = _vars.startAt,
        _onStart = _vars.onStart,
        onStartParams = _vars.onStartParams,
        immediateRender = _vars.immediateRender,
        initted,
        tween = Tween.to(tl, _setDefaults({
      ease: vars.ease || "none",
      lazy: false,
      immediateRender: false,
      time: endTime,
      overwrite: "auto",
      duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
      onStart: function onStart() {
        tl.pause();

        if (!initted) {
          var duration = vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale());
          tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
          initted = 1;
        }

        _onStart && _onStart.apply(tween, onStartParams || []); //in case the user had an onStart in the vars - we don't want to overwrite it.
      }
    }, vars));

    return immediateRender ? tween.render(0) : tween;
  };

  _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
    return this.tweenTo(toPosition, _setDefaults({
      startAt: {
        time: _parsePosition(this, fromPosition)
      }
    }, vars));
  };

  _proto2.recent = function recent() {
    return this._recent;
  };

  _proto2.nextLabel = function nextLabel(afterTime) {
    if (afterTime === void 0) {
      afterTime = this._time;
    }

    return _getLabelInDirection(this, _parsePosition(this, afterTime));
  };

  _proto2.previousLabel = function previousLabel(beforeTime) {
    if (beforeTime === void 0) {
      beforeTime = this._time;
    }

    return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
  };

  _proto2.currentLabel = function currentLabel(value) {
    return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
  };

  _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = 0;
    }

    var child = this._first,
        labels = this.labels,
        p;

    while (child) {
      if (child._start >= ignoreBeforeTime) {
        child._start += amount;
        child._end += amount;
      }

      child = child._next;
    }

    if (adjustLabels) {
      for (p in labels) {
        if (labels[p] >= ignoreBeforeTime) {
          labels[p] += amount;
        }
      }
    }

    return _uncache(this);
  };

  _proto2.invalidate = function invalidate(soft) {
    var child = this._first;
    this._lock = 0;

    while (child) {
      child.invalidate(soft);
      child = child._next;
    }

    return _Animation.prototype.invalidate.call(this, soft);
  };

  _proto2.clear = function clear(includeLabels) {
    if (includeLabels === void 0) {
      includeLabels = true;
    }

    var child = this._first,
        next;

    while (child) {
      next = child._next;
      this.remove(child);
      child = next;
    }

    this._dp && (this._time = this._tTime = this._pTime = 0);
    includeLabels && (this.labels = {});
    return _uncache(this);
  };

  _proto2.totalDuration = function totalDuration(value) {
    var max = 0,
        self = this,
        child = self._last,
        prevStart = _bigNum,
        prev,
        start,
        parent;

    if (arguments.length) {
      return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
    }

    if (self._dirty) {
      parent = self.parent;

      while (child) {
        prev = child._prev; //record it here in case the tween changes position in the sequence...

        child._dirty && child.totalDuration(); //could change the tween._startTime, so make sure the animation's cache is clean before analyzing it.

        start = child._start;

        if (start > prevStart && self._sort && child._ts && !self._lock) {
          //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
          self._lock = 1; //prevent endless recursive calls - there are methods that get triggered that check duration/totalDuration when we add().

          _addToTimeline(self, child, start - child._delay, 1)._lock = 0;
        } else {
          prevStart = start;
        }

        if (start < 0 && child._ts) {
          //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
          max -= start;

          if (!parent && !self._dp || parent && parent.smoothChildTiming) {
            self._start += start / self._ts;
            self._time -= start;
            self._tTime -= start;
          }

          self.shiftChildren(-start, false, -1e999);
          prevStart = 0;
        }

        child._end > max && child._ts && (max = child._end);
        child = prev;
      }

      _setDuration(self, self === _globalTimeline && self._time > max ? self._time : max, 1, 1);

      self._dirty = 0;
    }

    return self._tDur;
  };

  Timeline.updateRoot = function updateRoot(time) {
    if (_globalTimeline._ts) {
      _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));

      _lastRenderedFrame = _ticker.frame;
    }

    if (_ticker.frame >= _nextGCFrame) {
      _nextGCFrame += _config.autoSleep || 120;
      var child = _globalTimeline._first;
      if (!child || !child._ts) if (_config.autoSleep && _ticker._listeners.length < 2) {
        while (child && !child._ts) {
          child = child._next;
        }

        child || _ticker.sleep();
      }
    }
  };

  return Timeline;
}(Animation);

_setDefaults(Timeline.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});

var _addComplexStringPropTween = function _addComplexStringPropTween(target, prop, start, end, setter, stringFilter, funcParam) {
  //note: we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
  var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter),
      index = 0,
      matchIndex = 0,
      result,
      startNums,
      color,
      endNum,
      chunk,
      startNum,
      hasRandom,
      a;
  pt.b = start;
  pt.e = end;
  start += ""; //ensure values are strings

  end += "";

  if (hasRandom = ~end.indexOf("random(")) {
    end = _replaceRandom(end);
  }

  if (stringFilter) {
    a = [start, end];
    stringFilter(a, target, prop); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.

    start = a[0];
    end = a[1];
  }

  startNums = start.match(_complexStringNumExp) || [];

  while (result = _complexStringNumExp.exec(end)) {
    endNum = result[0];
    chunk = end.substring(index, result.index);

    if (color) {
      color = (color + 1) % 5;
    } else if (chunk.substr(-5) === "rgba(") {
      color = 1;
    }

    if (endNum !== startNums[matchIndex++]) {
      startNum = parseFloat(startNums[matchIndex - 1]) || 0; //these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.

      pt._pt = {
        _next: pt._pt,
        p: chunk || matchIndex === 1 ? chunk : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: startNum,
        c: endNum.charAt(1) === "=" ? _parseRelative(startNum, endNum) - startNum : parseFloat(endNum) - startNum,
        m: color && color < 4 ? Math.round : 0
      };
      index = _complexStringNumExp.lastIndex;
    }
  }

  pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)

  pt.fp = funcParam;

  if (_relExp.test(end) || hasRandom) {
    pt.e = 0; //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
  }

  this._pt = pt; //start the linked list with this new PropTween. Remember, we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.

  return pt;
},
    _addPropTween = function _addPropTween(target, prop, start, end, index, targets, modifier, stringFilter, funcParam, optional) {
  _isFunction(end) && (end = end(index || 0, target, targets));
  var currentValue = target[prop],
      parsedStart = start !== "get" ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](),
      setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc,
      pt;

  if (_isString(end)) {
    if (~end.indexOf("random(")) {
      end = _replaceRandom(end);
    }

    if (end.charAt(1) === "=") {
      pt = _parseRelative(parsedStart, end) + (getUnit(parsedStart) || 0);

      if (pt || pt === 0) {
        // to avoid isNaN, like if someone passes in a value like "!= whatever"
        end = pt;
      }
    }
  }

  if (!optional || parsedStart !== end || _forceAllPropTweens) {
    if (!isNaN(parsedStart * end) && end !== "") {
      // fun fact: any number multiplied by "" is evaluated as the number 0!
      pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
      funcParam && (pt.fp = funcParam);
      modifier && pt.modifier(modifier, this, target);
      return this._pt = pt;
    }

    !currentValue && !(prop in target) && _missingPlugin(prop, end);
    return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
  }
},
    //creates a copy of the vars object and processes any function-based values (putting the resulting values directly into the copy) as well as strings with "random()" in them. It does NOT process relative values.
_processVars = function _processVars(vars, index, target, targets, tween) {
  _isFunction(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));

  if (!_isObject(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) {
    return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
  }

  var copy = {},
      p;

  for (p in vars) {
    copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
  }

  return copy;
},
    _checkPlugin = function _checkPlugin(property, vars, tween, index, target, targets) {
  var plugin, pt, ptLookup, i;

  if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
    tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);

    if (tween !== _quickTween) {
      ptLookup = tween._ptLookup[tween._targets.indexOf(target)]; //note: we can't use tween._ptLookup[index] because for staggered tweens, the index from the fullTargets array won't match what it is in each individual tween that spawns from the stagger.

      i = plugin._props.length;

      while (i--) {
        ptLookup[plugin._props[i]] = pt;
      }
    }
  }

  return plugin;
},
    _overwritingTween,
    //store a reference temporarily so we can avoid overwriting itself.
_forceAllPropTweens,
    _initTween = function _initTween(tween, time, tTime) {
  var vars = tween.vars,
      ease = vars.ease,
      startAt = vars.startAt,
      immediateRender = vars.immediateRender,
      lazy = vars.lazy,
      onUpdate = vars.onUpdate,
      onUpdateParams = vars.onUpdateParams,
      callbackScope = vars.callbackScope,
      runBackwards = vars.runBackwards,
      yoyoEase = vars.yoyoEase,
      keyframes = vars.keyframes,
      autoRevert = vars.autoRevert,
      dur = tween._dur,
      prevStartAt = tween._startAt,
      targets = tween._targets,
      parent = tween.parent,
      fullTargets = parent && parent.data === "nested" ? parent.vars.targets : targets,
      autoOverwrite = tween._overwrite === "auto" && !_suppressOverwrites,
      tl = tween.timeline,
      cleanVars,
      i,
      p,
      pt,
      target,
      hasPriority,
      gsData,
      harness,
      plugin,
      ptLookup,
      index,
      harnessVars,
      overwritten;
  tl && (!keyframes || !ease) && (ease = "none");
  tween._ease = _parseEase(ease, _defaults.ease);
  tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults.ease)) : 0;

  if (yoyoEase && tween._yoyo && !tween._repeat) {
    //there must have been a parent timeline with yoyo:true that is currently in its yoyo phase, so flip the eases.
    yoyoEase = tween._yEase;
    tween._yEase = tween._ease;
    tween._ease = yoyoEase;
  }

  tween._from = !tl && !!vars.runBackwards; //nested timelines should never run backwards - the backwards-ness is in the child tweens.

  if (!tl || keyframes && !vars.stagger) {
    //if there's an internal timeline, skip all the parsing because we passed that task down the chain.
    harness = targets[0] ? _getCache(targets[0]).harness : 0;
    harnessVars = harness && vars[harness.prop]; //someone may need to specify CSS-specific values AND non-CSS values, like if the element has an "x" property plus it's a standard DOM element. We allow people to distinguish by wrapping plugin-specific stuff in a css:{} object for example.

    cleanVars = _copyExcluding(vars, _reservedProps);

    if (prevStartAt) {
      prevStartAt._zTime < 0 && prevStartAt.progress(1); // in case it's a lazy startAt that hasn't rendered yet.

      time < 0 && runBackwards && immediateRender && !autoRevert ? prevStartAt.render(-1, true) : prevStartAt.revert(runBackwards && dur ? _revertConfigNoKill : _startAtRevertConfig); // if it's a "startAt" (not "from()" or runBackwards: true), we only need to do a shallow revert (keep transforms cached in CSSPlugin)
      // don't just _removeFromParent(prevStartAt.render(-1, true)) because that'll leave inline styles. We're creating a new _startAt for "startAt" tweens that re-capture things to ensure that if the pre-tween values changed since the tween was created, they're recorded.

      prevStartAt._lazy = 0;
    }

    if (startAt) {
      _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
        data: "isStart",
        overwrite: false,
        parent: parent,
        immediateRender: true,
        lazy: _isNotFalse(lazy),
        startAt: null,
        delay: 0,
        onUpdate: onUpdate,
        onUpdateParams: onUpdateParams,
        callbackScope: callbackScope,
        stagger: 0
      }, startAt))); //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, from, to).fromTo(e, to, from);


      tween._startAt._dp = 0; // don't allow it to get put back into root timeline! Like when revert() is called and totalTime() gets set.

      time < 0 && (_reverting || !immediateRender && !autoRevert) && tween._startAt.revert(_revertConfigNoKill); // rare edge case, like if a render is forced in the negative direction of a non-initted tween.

      if (immediateRender) {
        if (dur && time <= 0 && tTime <= 0) {
          // check tTime here because in the case of a yoyo tween whose playhead gets pushed to the end like tween.progress(1), we should allow it through so that the onComplete gets fired properly.
          time && (tween._zTime = time);
          return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a Timeline, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
        }
      }
    } else if (runBackwards && dur) {
      //from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
      if (!prevStartAt) {
        time && (immediateRender = false); //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0

        p = _setDefaults({
          overwrite: false,
          data: "isFromStart",
          //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
          lazy: immediateRender && _isNotFalse(lazy),
          immediateRender: immediateRender,
          //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
          stagger: 0,
          parent: parent //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y:gsap.utils.wrap([-100,100])})

        }, cleanVars);
        harnessVars && (p[harness.prop] = harnessVars); // in case someone does something like .from(..., {css:{}})

        _removeFromParent(tween._startAt = Tween.set(targets, p));

        tween._startAt._dp = 0; // don't allow it to get put back into root timeline!

        time < 0 && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween._startAt.render(-1, true));
        tween._zTime = time;

        if (!immediateRender) {
          _initTween(tween._startAt, _tinyNum, _tinyNum); //ensures that the initial values are recorded

        } else if (!time) {
          return;
        }
      }
    }

    tween._pt = tween._ptCache = 0;
    lazy = dur && _isNotFalse(lazy) || lazy && !dur;

    for (i = 0; i < targets.length; i++) {
      target = targets[i];
      gsData = target._gsap || _harness(targets)[i]._gsap;
      tween._ptLookup[i] = ptLookup = {};
      _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)

      index = fullTargets === targets ? i : fullTargets.indexOf(target);

      if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
        tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);

        plugin._props.forEach(function (name) {
          ptLookup[name] = pt;
        });

        plugin.priority && (hasPriority = 1);
      }

      if (!harness || harnessVars) {
        for (p in cleanVars) {
          if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) {
            plugin.priority && (hasPriority = 1);
          } else {
            ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
          }
        }
      }

      tween._op && tween._op[i] && tween.kill(target, tween._op[i]);

      if (autoOverwrite && tween._pt) {
        _overwritingTween = tween;

        _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time)); // make sure the overwriting doesn't overwrite THIS tween!!!


        overwritten = !tween.parent;
        _overwritingTween = 0;
      }

      tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
    }

    hasPriority && _sortPropTweensByPriority(tween);
    tween._onInit && tween._onInit(tween); //plugins like RoundProps must wait until ALL of the PropTweens are instantiated. In the plugin's init() function, it sets the _onInit on the tween instance. May not be pretty/intuitive, but it's fast and keeps file size down.
  }

  tween._onUpdate = onUpdate;
  tween._initted = (!tween._op || tween._pt) && !overwritten; // if overwrittenProps resulted in the entire tween being killed, do NOT flag it as initted or else it may render for one tick.

  keyframes && time <= 0 && tl.render(_bigNum, true, true); // if there's a 0% keyframe, it'll render in the "before" state for any staggered/delayed animations thus when the following tween initializes, it'll use the "before" state instead of the "after" state as the initial values.
},
    _updatePropTweens = function _updatePropTweens(tween, property, value, start, startIsRelative, ratio, time) {
  var ptCache = (tween._pt && tween._ptCache || (tween._ptCache = {}))[property],
      pt,
      rootPT,
      lookup,
      i;

  if (!ptCache) {
    ptCache = tween._ptCache[property] = [];
    lookup = tween._ptLookup;
    i = tween._targets.length;

    while (i--) {
      pt = lookup[i][property];

      if (pt && pt.d && pt.d._pt) {
        // it's a plugin, so find the nested PropTween
        pt = pt.d._pt;

        while (pt && pt.p !== property && pt.fp !== property) {
          // "fp" is functionParam for things like setting CSS variables which require .setProperty("--var-name", value)
          pt = pt._next;
        }
      }

      if (!pt) {
        // there is no PropTween associated with that property, so we must FORCE one to be created and ditch out of this
        // if the tween has other properties that already rendered at new positions, we'd normally have to rewind to put them back like tween.render(0, true) before forcing an _initTween(), but that can create another edge case like tweening a timeline's progress would trigger onUpdates to fire which could move other things around. It's better to just inform users that .resetTo() should ONLY be used for tweens that already have that property. For example, you can't gsap.to(...{ y: 0 }) and then tween.restTo("x", 200) for example.
        _forceAllPropTweens = 1; // otherwise, when we _addPropTween() and it finds no change between the start and end values, it skips creating a PropTween (for efficiency...why tween when there's no difference?) but in this case we NEED that PropTween created so we can edit it.

        tween.vars[property] = "+=0";

        _initTween(tween, time);

        _forceAllPropTweens = 0;
        return 1;
      }

      ptCache.push(pt);
    }
  }

  i = ptCache.length;

  while (i--) {
    rootPT = ptCache[i];
    pt = rootPT._pt || rootPT; // complex values may have nested PropTweens. We only accommodate the FIRST value.

    pt.s = (start || start === 0) && !startIsRelative ? start : pt.s + (start || 0) + ratio * pt.c;
    pt.c = value - pt.s;
    rootPT.e && (rootPT.e = _round(value) + getUnit(rootPT.e)); // mainly for CSSPlugin (end value)

    rootPT.b && (rootPT.b = pt.s + getUnit(rootPT.b)); // (beginning value)
  }
},
    _addAliasesToVars = function _addAliasesToVars(targets, vars) {
  var harness = targets[0] ? _getCache(targets[0]).harness : 0,
      propertyAliases = harness && harness.aliases,
      copy,
      p,
      i,
      aliases;

  if (!propertyAliases) {
    return vars;
  }

  copy = _merge({}, vars);

  for (p in propertyAliases) {
    if (p in copy) {
      aliases = propertyAliases[p].split(",");
      i = aliases.length;

      while (i--) {
        copy[aliases[i]] = copy[p];
      }
    }
  }

  return copy;
},
    // parses multiple formats, like {"0%": {x: 100}, {"50%": {x: -20}} and { x: {"0%": 100, "50%": -20} }, and an "ease" can be set on any object. We populate an "allProps" object with an Array for each property, like {x: [{}, {}], y:[{}, {}]} with data for each property tween. The objects have a "t" (time), "v", (value), and "e" (ease) property. This allows us to piece together a timeline later.
_parseKeyframe = function _parseKeyframe(prop, obj, allProps, easeEach) {
  var ease = obj.ease || easeEach || "power1.inOut",
      p,
      a;

  if (_isArray(obj)) {
    a = allProps[prop] || (allProps[prop] = []); // t = time (out of 100), v = value, e = ease

    obj.forEach(function (value, i) {
      return a.push({
        t: i / (obj.length - 1) * 100,
        v: value,
        e: ease
      });
    });
  } else {
    for (p in obj) {
      a = allProps[p] || (allProps[p] = []);
      p === "ease" || a.push({
        t: parseFloat(prop),
        v: obj[p],
        e: ease
      });
    }
  }
},
    _parseFuncOrString = function _parseFuncOrString(value, tween, i, target, targets) {
  return _isFunction(value) ? value.call(tween, i, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
},
    _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
    _staggerPropsToSkip = {};

_forEachName(_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger", function (name) {
  return _staggerPropsToSkip[name] = 1;
});
/*
 * --------------------------------------------------------------------------------------
 * TWEEN
 * --------------------------------------------------------------------------------------
 */


var Tween = /*#__PURE__*/function (_Animation2) {
  _inheritsLoose(Tween, _Animation2);

  function Tween(targets, vars, position, skipInherit) {
    var _this3;

    if (typeof vars === "number") {
      position.duration = vars;
      vars = position;
      position = null;
    }

    _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars)) || this;
    var _this3$vars = _this3.vars,
        duration = _this3$vars.duration,
        delay = _this3$vars.delay,
        immediateRender = _this3$vars.immediateRender,
        stagger = _this3$vars.stagger,
        overwrite = _this3$vars.overwrite,
        keyframes = _this3$vars.keyframes,
        defaults = _this3$vars.defaults,
        scrollTrigger = _this3$vars.scrollTrigger,
        yoyoEase = _this3$vars.yoyoEase,
        parent = vars.parent || _globalTimeline,
        parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber(targets[0]) : "length" in vars) ? [targets] : toArray(targets),
        tl,
        i,
        copy,
        l,
        p,
        curTarget,
        staggerFunc,
        staggerVarsToMerge;
    _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://greensock.com", !_config.nullTargetWarn) || [];
    _this3._ptLookup = []; //PropTween lookup. An array containing an object for each target, having keys for each tweening property

    _this3._overwrite = overwrite;

    if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
      vars = _this3.vars;
      tl = _this3.timeline = new Timeline({
        data: "nested",
        defaults: defaults || {},
        targets: parent && parent.data === "nested" ? parent.vars.targets : parsedTargets
      }); // we need to store the targets because for staggers and keyframes, we end up creating an individual tween for each but function-based values need to know the index and the whole Array of targets.

      tl.kill();
      tl.parent = tl._dp = _assertThisInitialized(_this3);
      tl._start = 0;

      if (stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
        l = parsedTargets.length;
        staggerFunc = stagger && distribute(stagger);

        if (_isObject(stagger)) {
          //users can pass in callbacks like onStart/onComplete in the stagger object. These should fire with each individual tween.
          for (p in stagger) {
            if (~_staggerTweenProps.indexOf(p)) {
              staggerVarsToMerge || (staggerVarsToMerge = {});
              staggerVarsToMerge[p] = stagger[p];
            }
          }
        }

        for (i = 0; i < l; i++) {
          copy = _copyExcluding(vars, _staggerPropsToSkip);
          copy.stagger = 0;
          yoyoEase && (copy.yoyoEase = yoyoEase);
          staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
          curTarget = parsedTargets[i]; //don't just copy duration or delay because if they're a string or function, we'd end up in an infinite loop because _isFuncOrString() would evaluate as true in the child tweens, entering this loop, etc. So we parse the value straight from vars and default to 0.

          copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
          copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;

          if (!stagger && l === 1 && copy.delay) {
            // if someone does delay:"random(1, 5)", repeat:-1, for example, the delay shouldn't be inside the repeat.
            _this3._delay = delay = copy.delay;
            _this3._start += delay;
            copy.delay = 0;
          }

          tl.to(curTarget, copy, staggerFunc ? staggerFunc(i, curTarget, parsedTargets) : 0);
          tl._ease = _easeMap.none;
        }

        tl.duration() ? duration = delay = 0 : _this3.timeline = 0; // if the timeline's duration is 0, we don't need a timeline internally!
      } else if (keyframes) {
        _inheritDefaults(_setDefaults(tl.vars.defaults, {
          ease: "none"
        }));

        tl._ease = _parseEase(keyframes.ease || vars.ease || "none");
        var time = 0,
            a,
            kf,
            v;

        if (_isArray(keyframes)) {
          keyframes.forEach(function (frame) {
            return tl.to(parsedTargets, frame, ">");
          });
          tl.duration(); // to ensure tl._dur is cached because we tap into it for performance purposes in the render() method.
        } else {
          copy = {};

          for (p in keyframes) {
            p === "ease" || p === "easeEach" || _parseKeyframe(p, keyframes[p], copy, keyframes.easeEach);
          }

          for (p in copy) {
            a = copy[p].sort(function (a, b) {
              return a.t - b.t;
            });
            time = 0;

            for (i = 0; i < a.length; i++) {
              kf = a[i];
              v = {
                ease: kf.e,
                duration: (kf.t - (i ? a[i - 1].t : 0)) / 100 * duration
              };
              v[p] = kf.v;
              tl.to(parsedTargets, v, time);
              time += v.duration;
            }
          }

          tl.duration() < duration && tl.to({}, {
            duration: duration - tl.duration()
          }); // in case keyframes didn't go to 100%
        }
      }

      duration || _this3.duration(duration = tl.duration());
    } else {
      _this3.timeline = 0; //speed optimization, faster lookups (no going up the prototype chain)
    }

    if (overwrite === true && !_suppressOverwrites) {
      _overwritingTween = _assertThisInitialized(_this3);

      _globalTimeline.killTweensOf(parsedTargets);

      _overwritingTween = 0;
    }

    _addToTimeline(parent, _assertThisInitialized(_this3), position);

    vars.reversed && _this3.reverse();
    vars.paused && _this3.paused(true);

    if (immediateRender || !duration && !keyframes && _this3._start === _roundPrecise(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
      _this3._tTime = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)

      _this3.render(Math.max(0, -delay) || 0); //in case delay is negative

    }

    scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
    return _this3;
  }

  var _proto3 = Tween.prototype;

  _proto3.render = function render(totalTime, suppressEvents, force) {
    var prevTime = this._time,
        tDur = this._tDur,
        dur = this._dur,
        isNegative = totalTime < 0,
        tTime = totalTime > tDur - _tinyNum && !isNegative ? tDur : totalTime < _tinyNum ? 0 : totalTime,
        time,
        pt,
        iteration,
        cycleDuration,
        prevIteration,
        isYoyo,
        ratio,
        timeline,
        yoyoEase;

    if (!dur) {
      _renderZeroDurationTween(this, totalTime, suppressEvents, force);
    } else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== isNegative) {
      //this senses if we're crossing over the start time, in which case we must record _zTime and force the render, but we do it in this lengthy conditional way for performance reasons (usually we can skip the calculations): this._initted && (this._zTime < 0) !== (totalTime < 0)
      time = tTime;
      timeline = this.timeline;

      if (this._repeat) {
        //adjust the time for repeats and yoyos
        cycleDuration = dur + this._rDelay;

        if (this._repeat < -1 && isNegative) {
          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
        }

        time = _roundPrecise(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

        if (tTime === tDur) {
          // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
          iteration = this._repeat;
          time = dur;
        } else {
          iteration = ~~(tTime / cycleDuration);

          if (iteration && iteration === tTime / cycleDuration) {
            time = dur;
            iteration--;
          }

          time > dur && (time = dur);
        }

        isYoyo = this._yoyo && iteration & 1;

        if (isYoyo) {
          yoyoEase = this._yEase;
          time = dur - time;
        }

        prevIteration = _animationCycle(this._tTime, cycleDuration);

        if (time === prevTime && !force && this._initted) {
          //could be during the repeatDelay part. No need to render and fire callbacks.
          this._tTime = tTime;
          return this;
        }

        if (iteration !== prevIteration) {
          timeline && this._yEase && _propagateYoyoEase(timeline, isYoyo); //repeatRefresh functionality

          if (this.vars.repeatRefresh && !isYoyo && !this._lock) {
            this._lock = force = 1; //force, otherwise if lazy is true, the _attemptInitTween() will return and we'll jump out and get caught bouncing on each tick.

            this.render(_roundPrecise(cycleDuration * iteration), true).invalidate()._lock = 0;
          }
        }
      }

      if (!this._initted) {
        if (_attemptInitTween(this, isNegative ? totalTime : time, force, suppressEvents, tTime)) {
          this._tTime = 0; // in constructor if immediateRender is true, we set _tTime to -_tinyNum to have the playhead cross the starting point but we can't leave _tTime as a negative number.

          return this;
        }

        if (prevTime !== this._time) {
          // rare edge case - during initialization, an onUpdate in the _startAt (.fromTo()) might force this tween to render at a different spot in which case we should ditch this render() call so that it doesn't revert the values.
          return this;
        }

        if (dur !== this._dur) {
          // while initting, a plugin like InertiaPlugin might alter the duration, so rerun from the start to ensure everything renders as it should.
          return this.render(totalTime, suppressEvents, force);
        }
      }

      this._tTime = tTime;
      this._time = time;

      if (!this._act && this._ts) {
        this._act = 1; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

        this._lazy = 0;
      }

      this.ratio = ratio = (yoyoEase || this._ease)(time / dur);

      if (this._from) {
        this.ratio = ratio = 1 - ratio;
      }

      if (time && !prevTime && !suppressEvents) {
        _callback(this, "onStart");

        if (this._tTime !== tTime) {
          // in case the onStart triggered a render at a different spot, eject. Like if someone did animation.pause(0.5) or something inside the onStart.
          return this;
        }
      }

      pt = this._pt;

      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }

      timeline && timeline.render(totalTime < 0 ? totalTime : !time && isYoyo ? -_tinyNum : timeline._dur * timeline._ease(time / this._dur), suppressEvents, force) || this._startAt && (this._zTime = totalTime);

      if (this._onUpdate && !suppressEvents) {
        isNegative && _rewindStartAt(this, totalTime, suppressEvents, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.

        _callback(this, "onUpdate");
      }

      this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback(this, "onRepeat");

      if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
        isNegative && !this._onUpdate && _rewindStartAt(this, totalTime, true, true);
        (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if we're rendering at exactly a time of 0, as there could be autoRevert values that should get set on the next tick (if the playhead goes backward beyond the startTime, negative totalTime). Don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

        if (!suppressEvents && !(isNegative && !prevTime) && (tTime || prevTime || isYoyo)) {
          // if prevTime and tTime are zero, we shouldn't fire the onReverseComplete. This could happen if you gsap.to(... {paused:true}).play();
          _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);

          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
        }
      }
    }

    return this;
  };

  _proto3.targets = function targets() {
    return this._targets;
  };

  _proto3.invalidate = function invalidate(soft) {
    // "soft" gives us a way to clear out everything EXCEPT the recorded pre-"from" portion of from() tweens. Otherwise, for example, if you tween.progress(1).render(0, true true).invalidate(), the "from" values would persist and then on the next render, the from() tweens would initialize and the current value would match the "from" values, thus animate from the same value to the same value (no animation). We tap into this in ScrollTrigger's refresh() where we must push a tween to completion and then back again but honor its init state in case the tween is dependent on another tween further up on the page.
    (!soft || !this.vars.runBackwards) && (this._startAt = 0);
    this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0;
    this._ptLookup = [];
    this.timeline && this.timeline.invalidate(soft);
    return _Animation2.prototype.invalidate.call(this, soft);
  };

  _proto3.resetTo = function resetTo(property, value, start, startIsRelative) {
    _tickerActive || _ticker.wake();
    this._ts || this.play();
    var time = Math.min(this._dur, (this._dp._time - this._start) * this._ts),
        ratio;
    this._initted || _initTween(this, time);
    ratio = this._ease(time / this._dur); // don't just get tween.ratio because it may not have rendered yet.
    // possible future addition to allow an object with multiple values to update, like tween.resetTo({x: 100, y: 200}); At this point, it doesn't seem worth the added kb given the fact that most users will likely opt for the convenient gsap.quickTo() way of interacting with this method.
    // if (_isObject(property)) { // performance optimization
    // 	for (p in property) {
    // 		if (_updatePropTweens(this, p, property[p], value ? value[p] : null, start, ratio, time)) {
    // 			return this.resetTo(property, value, start, startIsRelative); // if a PropTween wasn't found for the property, it'll get forced with a re-initialization so we need to jump out and start over again.
    // 		}
    // 	}
    // } else {

    if (_updatePropTweens(this, property, value, start, startIsRelative, ratio, time)) {
      return this.resetTo(property, value, start, startIsRelative); // if a PropTween wasn't found for the property, it'll get forced with a re-initialization so we need to jump out and start over again.
    } //}


    _alignPlayhead(this, 0);

    this.parent || _addLinkedListItem(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0);
    return this.render(0);
  };

  _proto3.kill = function kill(targets, vars) {
    if (vars === void 0) {
      vars = "all";
    }

    if (!targets && (!vars || vars === "all")) {
      this._lazy = this._pt = 0;
      return this.parent ? _interrupt(this) : this;
    }

    if (this.timeline) {
      var tDur = this.timeline.totalDuration();
      this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this); // if nothing is left tweening, interrupt.

      this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1); // if a nested tween is killed that changes the duration, it should affect this tween's duration. We must use the ratio, though, because sometimes the internal timeline is stretched like for keyframes where they don't all add up to whatever the parent tween's duration was set to.

      return this;
    }

    var parsedTargets = this._targets,
        killingTargets = targets ? toArray(targets) : parsedTargets,
        propTweenLookup = this._ptLookup,
        firstPT = this._pt,
        overwrittenProps,
        curLookup,
        curOverwriteProps,
        props,
        p,
        pt,
        i;

    if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
      vars === "all" && (this._pt = 0);
      return _interrupt(this);
    }

    overwrittenProps = this._op = this._op || [];

    if (vars !== "all") {
      //so people can pass in a comma-delimited list of property names
      if (_isString(vars)) {
        p = {};

        _forEachName(vars, function (name) {
          return p[name] = 1;
        });

        vars = p;
      }

      vars = _addAliasesToVars(parsedTargets, vars);
    }

    i = parsedTargets.length;

    while (i--) {
      if (~killingTargets.indexOf(parsedTargets[i])) {
        curLookup = propTweenLookup[i];

        if (vars === "all") {
          overwrittenProps[i] = vars;
          props = curLookup;
          curOverwriteProps = {};
        } else {
          curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
          props = vars;
        }

        for (p in props) {
          pt = curLookup && curLookup[p];

          if (pt) {
            if (!("kill" in pt.d) || pt.d.kill(p) === true) {
              _removeLinkedListItem(this, pt, "_pt");
            }

            delete curLookup[p];
          }

          if (curOverwriteProps !== "all") {
            curOverwriteProps[p] = 1;
          }
        }
      }
    }

    this._initted && !this._pt && firstPT && _interrupt(this); //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.

    return this;
  };

  Tween.to = function to(targets, vars) {
    return new Tween(targets, vars, arguments[2]);
  };

  Tween.from = function from(targets, vars) {
    return _createTweenType(1, arguments);
  };

  Tween.delayedCall = function delayedCall(delay, callback, params, scope) {
    return new Tween(callback, 0, {
      immediateRender: false,
      lazy: false,
      overwrite: false,
      delay: delay,
      onComplete: callback,
      onReverseComplete: callback,
      onCompleteParams: params,
      onReverseCompleteParams: params,
      callbackScope: scope
    }); // we must use onReverseComplete too for things like timeline.add(() => {...}) which should be triggered in BOTH directions (forward and reverse)
  };

  Tween.fromTo = function fromTo(targets, fromVars, toVars) {
    return _createTweenType(2, arguments);
  };

  Tween.set = function set(targets, vars) {
    vars.duration = 0;
    vars.repeatDelay || (vars.repeat = 0);
    return new Tween(targets, vars);
  };

  Tween.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    return _globalTimeline.killTweensOf(targets, props, onlyActive);
  };

  return Tween;
}(Animation);

_setDefaults(Tween.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
}); //add the pertinent timeline methods to Tween instances so that users can chain conveniently and create a timeline automatically. (removed due to concerns that it'd ultimately add to more confusion especially for beginners)
// _forEachName("to,from,fromTo,set,call,add,addLabel,addPause", name => {
// 	Tween.prototype[name] = function() {
// 		let tl = new Timeline();
// 		return _addToTimeline(tl, this)[name].apply(tl, toArray(arguments));
// 	}
// });
//for backward compatibility. Leverage the timeline calls.


_forEachName("staggerTo,staggerFrom,staggerFromTo", function (name) {
  Tween[name] = function () {
    var tl = new Timeline(),
        params = _slice.call(arguments, 0);

    params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
    return tl[name].apply(tl, params);
  };
});
/*
 * --------------------------------------------------------------------------------------
 * PROPTWEEN
 * --------------------------------------------------------------------------------------
 */


var _setterPlain = function _setterPlain(target, property, value) {
  return target[property] = value;
},
    _setterFunc = function _setterFunc(target, property, value) {
  return target[property](value);
},
    _setterFuncWithParam = function _setterFuncWithParam(target, property, value, data) {
  return target[property](data.fp, value);
},
    _setterAttribute = function _setterAttribute(target, property, value) {
  return target.setAttribute(property, value);
},
    _getSetter = function _getSetter(target, property) {
  return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
},
    _renderPlain = function _renderPlain(ratio, data) {
  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1000000) / 1000000, data);
},
    _renderBoolean = function _renderBoolean(ratio, data) {
  return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
},
    _renderComplexString = function _renderComplexString(ratio, data) {
  var pt = data._pt,
      s = "";

  if (!ratio && data.b) {
    //b = beginning string
    s = data.b;
  } else if (ratio === 1 && data.e) {
    //e = ending string
    s = data.e;
  } else {
    while (pt) {
      s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 10000) / 10000) + s; //we use the "p" property for the text inbetween (like a suffix). And in the context of a complex string, the modifier (m) is typically just Math.round(), like for RGB colors.

      pt = pt._next;
    }

    s += data.c; //we use the "c" of the PropTween to store the final chunk of non-numeric text.
  }

  data.set(data.t, data.p, s, data);
},
    _renderPropTweens = function _renderPropTweens(ratio, data) {
  var pt = data._pt;

  while (pt) {
    pt.r(ratio, pt.d);
    pt = pt._next;
  }
},
    _addPluginModifier = function _addPluginModifier(modifier, tween, target, property) {
  var pt = this._pt,
      next;

  while (pt) {
    next = pt._next;
    pt.p === property && pt.modifier(modifier, tween, target);
    pt = next;
  }
},
    _killPropTweensOf = function _killPropTweensOf(property) {
  var pt = this._pt,
      hasNonDependentRemaining,
      next;

  while (pt) {
    next = pt._next;

    if (pt.p === property && !pt.op || pt.op === property) {
      _removeLinkedListItem(this, pt, "_pt");
    } else if (!pt.dep) {
      hasNonDependentRemaining = 1;
    }

    pt = next;
  }

  return !hasNonDependentRemaining;
},
    _setterWithModifier = function _setterWithModifier(target, property, value, data) {
  data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
},
    _sortPropTweensByPriority = function _sortPropTweensByPriority(parent) {
  var pt = parent._pt,
      next,
      pt2,
      first,
      last; //sorts the PropTween linked list in order of priority because some plugins need to do their work after ALL of the PropTweens were created (like RoundPropsPlugin and ModifiersPlugin)

  while (pt) {
    next = pt._next;
    pt2 = first;

    while (pt2 && pt2.pr > pt.pr) {
      pt2 = pt2._next;
    }

    if (pt._prev = pt2 ? pt2._prev : last) {
      pt._prev._next = pt;
    } else {
      first = pt;
    }

    if (pt._next = pt2) {
      pt2._prev = pt;
    } else {
      last = pt;
    }

    pt = next;
  }

  parent._pt = first;
}; //PropTween key: t = target, p = prop, r = renderer, d = data, s = start, c = change, op = overwriteProperty (ONLY populated when it's different than p), pr = priority, _next/_prev for the linked list siblings, set = setter, m = modifier, mSet = modifierSetter (the original setter, before a modifier was added)


var PropTween = /*#__PURE__*/function () {
  function PropTween(next, target, prop, start, change, renderer, data, setter, priority) {
    this.t = target;
    this.s = start;
    this.c = change;
    this.p = prop;
    this.r = renderer || _renderPlain;
    this.d = data || this;
    this.set = setter || _setterPlain;
    this.pr = priority || 0;
    this._next = next;

    if (next) {
      next._prev = this;
    }
  }

  var _proto4 = PropTween.prototype;

  _proto4.modifier = function modifier(func, tween, target) {
    this.mSet = this.mSet || this.set; //in case it was already set (a PropTween can only have one modifier)

    this.set = _setterWithModifier;
    this.m = func;
    this.mt = target; //modifier target

    this.tween = tween;
  };

  return PropTween;
}(); //Initialization tasks

_forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function (name) {
  return _reservedProps[name] = 1;
});

_globals.TweenMax = _globals.TweenLite = Tween;
_globals.TimelineLite = _globals.TimelineMax = Timeline;
_globalTimeline = new Timeline({
  sortChildren: false,
  defaults: _defaults,
  autoRemoveChildren: true,
  id: "root",
  smoothChildTiming: true
});
_config.stringFilter = _colorStringFilter;

var _media = [],
    _listeners = {},
    _emptyArray = [],
    _lastMediaTime = 0,
    _dispatch = function _dispatch(type) {
  return (_listeners[type] || _emptyArray).map(function (f) {
    return f();
  });
},
    _onMediaChange = function _onMediaChange() {
  var time = Date.now(),
      matches = [];

  if (time - _lastMediaTime > 2) {
    _dispatch("matchMediaInit");

    _media.forEach(function (c) {
      var queries = c.queries,
          conditions = c.conditions,
          match,
          p,
          anyMatch,
          toggled;

      for (p in queries) {
        match = _win.matchMedia(queries[p]).matches; // Firefox doesn't update the "matches" property of the MediaQueryList object correctly - it only does so as it calls its change handler - so we must re-create a media query here to ensure it's accurate.

        match && (anyMatch = 1);

        if (match !== conditions[p]) {
          conditions[p] = match;
          toggled = 1;
        }
      }

      if (toggled) {
        c.revert();
        anyMatch && matches.push(c);
      }
    });

    _dispatch("matchMediaRevert");

    matches.forEach(function (c) {
      return c.onMatch(c);
    });
    _lastMediaTime = time;

    _dispatch("matchMedia");
  }
};

var Context = /*#__PURE__*/function () {
  function Context(func, scope) {
    this.selector = scope && selector(scope);
    this.data = [];
    this._r = []; // returned/cleanup functions

    this.isReverted = false;
    func && this.add(func);
  }

  var _proto5 = Context.prototype;

  _proto5.add = function add(name, func, scope) {
    if (_isFunction(name)) {
      scope = func;
      func = name;
      name = _isFunction;
    }

    var self = this,
        f = function f() {
      var prev = _context,
          prevSelector = self.selector,
          result;
      prev && prev !== self && prev.data.push(self);
      scope && (self.selector = selector(scope));
      _context = self;
      result = func.apply(self, arguments);
      _isFunction(result) && self._r.push(result);
      _context = prev;
      self.selector = prevSelector;
      self.isReverted = false;
      return result;
    };

    self.last = f;
    return name === _isFunction ? f(self) : name ? self[name] = f : f;
  };

  _proto5.ignore = function ignore(func) {
    var prev = _context;
    _context = null;
    func(this);
    _context = prev;
  };

  _proto5.getTweens = function getTweens() {
    var a = [];
    this.data.forEach(function (e) {
      return e instanceof Context ? a.push.apply(a, e.getTweens()) : e instanceof Tween && !(e.parent && e.parent.data === "nested") && a.push(e);
    });
    return a;
  };

  _proto5.clear = function clear() {
    this._r.length = this.data.length = 0;
  };

  _proto5.kill = function kill(revert, matchMedia) {
    var _this4 = this;

    if (revert) {
      var tweens = this.getTweens();
      this.data.forEach(function (t) {
        // Flip plugin tweens are very different in that they should actually be pushed to their end. The plugin replaces the timeline's .revert() method to do exactly that. But we also need to remove any of those nested tweens inside the flip timeline so that they don't get individually reverted.
        if (t.data === "isFlip") {
          t.revert();
          t.getChildren(true, true, false).forEach(function (tween) {
            return tweens.splice(tweens.indexOf(tween), 1);
          });
        }
      }); // save as an object so that we can cache the globalTime for each tween to optimize performance during the sort

      tweens.map(function (t) {
        return {
          g: t.globalTime(0),
          t: t
        };
      }).sort(function (a, b) {
        return b.g - a.g || -1;
      }).forEach(function (o) {
        return o.t.revert(revert);
      }); // note: all of the _startAt tweens should be reverted in reverse order that thy were created, and they'll all have the same globalTime (-1) so the " || -1" in the sort keeps the order properly.

      this.data.forEach(function (e) {
        return !(e instanceof Animation) && e.revert && e.revert(revert);
      });

      this._r.forEach(function (f) {
        return f(revert, _this4);
      });

      this.isReverted = true;
    } else {
      this.data.forEach(function (e) {
        return e.kill && e.kill();
      });
    }

    this.clear();

    if (matchMedia) {
      var i = _media.indexOf(this);

      !!~i && _media.splice(i, 1);
    }
  };

  _proto5.revert = function revert(config) {
    this.kill(config || {});
  };

  return Context;
}();

var MatchMedia = /*#__PURE__*/function () {
  function MatchMedia(scope) {
    this.contexts = [];
    this.scope = scope;
  }

  var _proto6 = MatchMedia.prototype;

  _proto6.add = function add(conditions, func, scope) {
    _isObject(conditions) || (conditions = {
      matches: conditions
    });
    var context = new Context(0, scope || this.scope),
        cond = context.conditions = {},
        mq,
        p,
        active;
    this.contexts.push(context);
    func = context.add("onMatch", func);
    context.queries = conditions;

    for (p in conditions) {
      if (p === "all") {
        active = 1;
      } else {
        mq = _win.matchMedia(conditions[p]);

        if (mq) {
          _media.indexOf(context) < 0 && _media.push(context);
          (cond[p] = mq.matches) && (active = 1);
          mq.addListener ? mq.addListener(_onMediaChange) : mq.addEventListener("change", _onMediaChange);
        }
      }
    }

    active && func(context);
    return this;
  } // refresh() {
  // 	let time = _lastMediaTime,
  // 		media = _media;
  // 	_lastMediaTime = -1;
  // 	_media = this.contexts;
  // 	_onMediaChange();
  // 	_lastMediaTime = time;
  // 	_media = media;
  // }
  ;

  _proto6.revert = function revert(config) {
    this.kill(config || {});
  };

  _proto6.kill = function kill(revert) {
    this.contexts.forEach(function (c) {
      return c.kill(revert, true);
    });
  };

  return MatchMedia;
}();
/*
 * --------------------------------------------------------------------------------------
 * GSAP
 * --------------------------------------------------------------------------------------
 */


var _gsap = {
  registerPlugin: function registerPlugin() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    args.forEach(function (config) {
      return _createPlugin(config);
    });
  },
  timeline: function timeline(vars) {
    return new Timeline(vars);
  },
  getTweensOf: function getTweensOf(targets, onlyActive) {
    return _globalTimeline.getTweensOf(targets, onlyActive);
  },
  getProperty: function getProperty(target, property, unit, uncache) {
    _isString(target) && (target = toArray(target)[0]); //in case selector text or an array is passed in

    var getter = _getCache(target || {}).get,
        format = unit ? _passThrough : _numericIfPossible;

    unit === "native" && (unit = "");
    return !target ? target : !property ? function (property, unit, uncache) {
      return format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
    } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
  },
  quickSetter: function quickSetter(target, property, unit) {
    target = toArray(target);

    if (target.length > 1) {
      var setters = target.map(function (t) {
        return gsap.quickSetter(t, property, unit);
      }),
          l = setters.length;
      return function (value) {
        var i = l;

        while (i--) {
          setters[i](value);
        }
      };
    }

    target = target[0] || {};

    var Plugin = _plugins[property],
        cache = _getCache(target),
        p = cache.harness && (cache.harness.aliases || {})[property] || property,
        // in case it's an alias, like "rotate" for "rotation".
    setter = Plugin ? function (value) {
      var p = new Plugin();
      _quickTween._pt = 0;
      p.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
      p.render(1, p);
      _quickTween._pt && _renderPropTweens(1, _quickTween);
    } : cache.set(target, p);

    return Plugin ? setter : function (value) {
      return setter(target, p, unit ? value + unit : value, cache, 1);
    };
  },
  quickTo: function quickTo(target, property, vars) {
    var _merge2;

    var tween = gsap.to(target, _merge((_merge2 = {}, _merge2[property] = "+=0.1", _merge2.paused = true, _merge2), vars || {})),
        func = function func(value, start, startIsRelative) {
      return tween.resetTo(property, value, start, startIsRelative);
    };

    func.tween = tween;
    return func;
  },
  isTweening: function isTweening(targets) {
    return _globalTimeline.getTweensOf(targets, true).length > 0;
  },
  defaults: function defaults(value) {
    value && value.ease && (value.ease = _parseEase(value.ease, _defaults.ease));
    return _mergeDeep(_defaults, value || {});
  },
  config: function config(value) {
    return _mergeDeep(_config, value || {});
  },
  registerEffect: function registerEffect(_ref3) {
    var name = _ref3.name,
        effect = _ref3.effect,
        plugins = _ref3.plugins,
        defaults = _ref3.defaults,
        extendTimeline = _ref3.extendTimeline;
    (plugins || "").split(",").forEach(function (pluginName) {
      return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
    });

    _effects[name] = function (targets, vars, tl) {
      return effect(toArray(targets), _setDefaults(vars || {}, defaults), tl);
    };

    if (extendTimeline) {
      Timeline.prototype[name] = function (targets, vars, position) {
        return this.add(_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}, this), position);
      };
    }
  },
  registerEase: function registerEase(name, ease) {
    _easeMap[name] = _parseEase(ease);
  },
  parseEase: function parseEase(ease, defaultEase) {
    return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
  },
  getById: function getById(id) {
    return _globalTimeline.getById(id);
  },
  exportRoot: function exportRoot(vars, includeDelayedCalls) {
    if (vars === void 0) {
      vars = {};
    }

    var tl = new Timeline(vars),
        child,
        next;
    tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);

    _globalTimeline.remove(tl);

    tl._dp = 0; //otherwise it'll get re-activated when adding children and be re-introduced into _globalTimeline's linked list (then added to itself).

    tl._time = tl._tTime = _globalTimeline._time;
    child = _globalTimeline._first;

    while (child) {
      next = child._next;

      if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
        _addToTimeline(tl, child, child._start - child._delay);
      }

      child = next;
    }

    _addToTimeline(_globalTimeline, tl, 0);

    return tl;
  },
  context: function context(func, scope) {
    return func ? new Context(func, scope) : _context;
  },
  matchMedia: function matchMedia(scope) {
    return new MatchMedia(scope);
  },
  matchMediaRefresh: function matchMediaRefresh() {
    return _media.forEach(function (c) {
      var cond = c.conditions,
          found,
          p;

      for (p in cond) {
        if (cond[p]) {
          cond[p] = false;
          found = 1;
        }
      }

      found && c.revert();
    }) || _onMediaChange();
  },
  addEventListener: function addEventListener(type, callback) {
    var a = _listeners[type] || (_listeners[type] = []);
    ~a.indexOf(callback) || a.push(callback);
  },
  removeEventListener: function removeEventListener(type, callback) {
    var a = _listeners[type],
        i = a && a.indexOf(callback);
    i >= 0 && a.splice(i, 1);
  },
  utils: {
    wrap: wrap,
    wrapYoyo: wrapYoyo,
    distribute: distribute,
    random: random,
    snap: snap,
    normalize: normalize,
    getUnit: getUnit,
    clamp: clamp,
    splitColor: splitColor,
    toArray: toArray,
    selector: selector,
    mapRange: mapRange,
    pipe: pipe,
    unitize: unitize,
    interpolate: interpolate,
    shuffle: shuffle
  },
  install: _install,
  effects: _effects,
  ticker: _ticker,
  updateRoot: Timeline.updateRoot,
  plugins: _plugins,
  globalTimeline: _globalTimeline,
  core: {
    PropTween: PropTween,
    globals: _addGlobal,
    Tween: Tween,
    Timeline: Timeline,
    Animation: Animation,
    getCache: _getCache,
    _removeLinkedListItem: _removeLinkedListItem,
    reverting: function reverting() {
      return _reverting;
    },
    context: function context(toAdd) {
      if (toAdd && _context) {
        _context.data.push(toAdd);

        toAdd._ctx = _context;
      }

      return _context;
    },
    suppressOverwrites: function suppressOverwrites(value) {
      return _suppressOverwrites = value;
    }
  }
};

_forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function (name) {
  return _gsap[name] = Tween[name];
});

_ticker.add(Timeline.updateRoot);

_quickTween = _gsap.to({}, {
  duration: 0
}); // ---- EXTRA PLUGINS --------------------------------------------------------

var _getPluginPropTween = function _getPluginPropTween(plugin, prop) {
  var pt = plugin._pt;

  while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
    pt = pt._next;
  }

  return pt;
},
    _addModifiers = function _addModifiers(tween, modifiers) {
  var targets = tween._targets,
      p,
      i,
      pt;

  for (p in modifiers) {
    i = targets.length;

    while (i--) {
      pt = tween._ptLookup[i][p];

      if (pt && (pt = pt.d)) {
        if (pt._pt) {
          // is a plugin
          pt = _getPluginPropTween(pt, p);
        }

        pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
      }
    }
  }
},
    _buildModifierPlugin = function _buildModifierPlugin(name, modifier) {
  return {
    name: name,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function init(target, vars, tween) {
      tween._onInit = function (tween) {
        var temp, p;

        if (_isString(vars)) {
          temp = {};

          _forEachName(vars, function (name) {
            return temp[name] = 1;
          }); //if the user passes in a comma-delimited list of property names to roundProps, like "x,y", we round to whole numbers.


          vars = temp;
        }

        if (modifier) {
          temp = {};

          for (p in vars) {
            temp[p] = modifier(vars[p]);
          }

          vars = temp;
        }

        _addModifiers(tween, vars);
      };
    }
  };
}; //register core plugins


var gsap = _gsap.registerPlugin({
  name: "attr",
  init: function init(target, vars, tween, index, targets) {
    var p, pt, v;
    this.tween = tween;

    for (p in vars) {
      v = target.getAttribute(p) || "";
      pt = this.add(target, "setAttribute", (v || 0) + "", vars[p], index, targets, 0, 0, p);
      pt.op = p;
      pt.b = v; // record the beginning value so we can revert()

      this._props.push(p);
    }
  },
  render: function render(ratio, data) {
    var pt = data._pt;

    while (pt) {
      _reverting ? pt.set(pt.t, pt.p, pt.b, pt) : pt.r(ratio, pt.d); // if reverting, go back to the original (pt.b)

      pt = pt._next;
    }
  }
}, {
  name: "endArray",
  init: function init(target, value) {
    var i = value.length;

    while (i--) {
      this.add(target, i, target[i] || 0, value[i], 0, 0, 0, 0, 0, 1);
    }
  }
}, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap; //to prevent the core plugins from being dropped via aggressive tree shaking, we must include them in the variable declaration in this way.

Tween.version = Timeline.version = gsap.version = "3.11.3";
_coreReady = 1;
_windowExists() && _wake();
var Power0 = _easeMap.Power0,
    Power1 = _easeMap.Power1,
    Power2 = _easeMap.Power2,
    Power3 = _easeMap.Power3,
    Power4 = _easeMap.Power4,
    Linear = _easeMap.Linear,
    Quad = _easeMap.Quad,
    Cubic = _easeMap.Cubic,
    Quart = _easeMap.Quart,
    Quint = _easeMap.Quint,
    Strong = _easeMap.Strong,
    Elastic = _easeMap.Elastic,
    Back = _easeMap.Back,
    SteppedEase = _easeMap.SteppedEase,
    Bounce = _easeMap.Bounce,
    Sine = _easeMap.Sine,
    Expo = _easeMap.Expo,
    Circ = _easeMap.Circ;

 //export some internal methods/orojects for use in CSSPlugin so that we can externalize that file and allow custom builds that exclude it.



/***/ }),

/***/ "./node_modules/gsap/index.js":
/*!************************************!*\
  !*** ./node_modules/gsap/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Back": () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Back),
/* harmony export */   "Bounce": () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Bounce),
/* harmony export */   "CSSPlugin": () => (/* reexport safe */ _CSSPlugin_js__WEBPACK_IMPORTED_MODULE_1__.CSSPlugin),
/* harmony export */   "Circ": () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Circ),
/* harmony export */   "Cubic": () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Cubic),
/* harmony export */   "Elastic": () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Elastic),
/* harmony export */   "Expo": () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Expo),
/* harmony export */   "Linear": () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Linear),
/* harmony export */   "Power0": () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Power0),
/* harmony export */   "Power1": () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Power1),
/* harmony export */   "Power2": () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Power2),
/* harmony export */   "Power3": () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Power3),
/* harmony export */   "Power4": () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Power4),
/* harmony export */   "Quad": () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Quad),
/* harmony export */   "Quart": () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Quart),
/* harmony export */   "Quint": () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Quint),
/* harmony export */   "Sine": () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Sine),
/* harmony export */   "SteppedEase": () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.SteppedEase),
/* harmony export */   "Strong": () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Strong),
/* harmony export */   "TimelineLite": () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.TimelineLite),
/* harmony export */   "TimelineMax": () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.TimelineMax),
/* harmony export */   "TweenLite": () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.TweenLite),
/* harmony export */   "TweenMax": () => (/* binding */ TweenMaxWithCSS),
/* harmony export */   "default": () => (/* binding */ gsapWithCSS),
/* harmony export */   "gsap": () => (/* binding */ gsapWithCSS)
/* harmony export */ });
/* harmony import */ var _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gsap-core.js */ "./node_modules/gsap/gsap-core.js");
/* harmony import */ var _CSSPlugin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CSSPlugin.js */ "./node_modules/gsap/CSSPlugin.js");


var gsapWithCSS = _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.gsap.registerPlugin(_CSSPlugin_js__WEBPACK_IMPORTED_MODULE_1__.CSSPlugin) || _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.gsap,
    // to protect from tree shaking
TweenMaxWithCSS = gsapWithCSS.core.Tween;


/***/ }),

/***/ "./node_modules/gsap/utils/matrix.js":
/*!*******************************************!*\
  !*** ./node_modules/gsap/utils/matrix.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Matrix2D": () => (/* binding */ Matrix2D),
/* harmony export */   "_getCTM": () => (/* binding */ _getCTM),
/* harmony export */   "_getDocScrollLeft": () => (/* binding */ _getDocScrollLeft),
/* harmony export */   "_getDocScrollTop": () => (/* binding */ _getDocScrollTop),
/* harmony export */   "_isFixed": () => (/* binding */ _isFixed),
/* harmony export */   "_setDoc": () => (/* binding */ _setDoc),
/* harmony export */   "getGlobalMatrix": () => (/* binding */ getGlobalMatrix)
/* harmony export */ });
/*!
 * matrix 3.11.3
 * https://greensock.com
 *
 * Copyright 2008-2022, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var _doc,
    _win,
    _docElement,
    _body,
    _divContainer,
    _svgContainer,
    _identityMatrix,
    _gEl,
    _transformProp = "transform",
    _transformOriginProp = _transformProp + "Origin",
    _hasOffsetBug,
    _setDoc = function _setDoc(element) {
  var doc = element.ownerDocument || element;

  if (!(_transformProp in element.style) && "msTransform" in element.style) {
    //to improve compatibility with old Microsoft browsers
    _transformProp = "msTransform";
    _transformOriginProp = _transformProp + "Origin";
  }

  while (doc.parentNode && (doc = doc.parentNode)) {}

  _win = window;
  _identityMatrix = new Matrix2D();

  if (doc) {
    _doc = doc;
    _docElement = doc.documentElement;
    _body = doc.body;
    _gEl = _doc.createElementNS("http://www.w3.org/2000/svg", "g"); // prevent any existing CSS from transforming it

    _gEl.style.transform = "none"; // now test for the offset reporting bug. Use feature detection instead of browser sniffing to make things more bulletproof and future-proof. Hopefully Safari will fix their bug soon but it's 2020 and it's still not fixed.

    var d1 = doc.createElement("div"),
        d2 = doc.createElement("div");

    _body.appendChild(d1);

    d1.appendChild(d2);
    d1.style.position = "static";
    d1.style[_transformProp] = "translate3d(0,0,1px)";
    _hasOffsetBug = d2.offsetParent !== d1;

    _body.removeChild(d1);
  }

  return doc;
},
    _forceNonZeroScale = function _forceNonZeroScale(e) {
  // walks up the element's ancestors and finds any that had their scale set to 0 via GSAP, and changes them to 0.0001 to ensure that measurements work. Firefox has a bug that causes it to incorrectly report getBoundingClientRect() when scale is 0.
  var a, cache;

  while (e && e !== _body) {
    cache = e._gsap;
    cache && cache.uncache && cache.get(e, "x"); // force re-parsing of transforms if necessary

    if (cache && !cache.scaleX && !cache.scaleY && cache.renderTransform) {
      cache.scaleX = cache.scaleY = 1e-4;
      cache.renderTransform(1, cache);
      a ? a.push(cache) : a = [cache];
    }

    e = e.parentNode;
  }

  return a;
},
    // possible future addition: pass an element to _forceDisplay() and it'll walk up all its ancestors and make sure anything with display: none is set to display: block, and if there's no parentNode, it'll add it to the body. It returns an Array that you can then feed to _revertDisplay() to have it revert all the changes it made.
// _forceDisplay = e => {
// 	let a = [],
// 		parent;
// 	while (e && e !== _body) {
// 		parent = e.parentNode;
// 		(_win.getComputedStyle(e).display === "none" || !parent) && a.push(e, e.style.display, parent) && (e.style.display = "block");
// 		parent || _body.appendChild(e);
// 		e = parent;
// 	}
// 	return a;
// },
// _revertDisplay = a => {
// 	for (let i = 0; i < a.length; i+=3) {
// 		a[i+1] ? (a[i].style.display = a[i+1]) : a[i].style.removeProperty("display");
// 		a[i+2] || a[i].parentNode.removeChild(a[i]);
// 	}
// },
_svgTemps = [],
    //we create 3 elements for SVG, and 3 for other DOM elements and cache them for performance reasons. They get nested in _divContainer and _svgContainer so that just one element is added to the DOM on each successive attempt. Again, performance is key.
_divTemps = [],
    _getDocScrollTop = function _getDocScrollTop() {
  return _win.pageYOffset || _doc.scrollTop || _docElement.scrollTop || _body.scrollTop || 0;
},
    _getDocScrollLeft = function _getDocScrollLeft() {
  return _win.pageXOffset || _doc.scrollLeft || _docElement.scrollLeft || _body.scrollLeft || 0;
},
    _svgOwner = function _svgOwner(element) {
  return element.ownerSVGElement || ((element.tagName + "").toLowerCase() === "svg" ? element : null);
},
    _isFixed = function _isFixed(element) {
  if (_win.getComputedStyle(element).position === "fixed") {
    return true;
  }

  element = element.parentNode;

  if (element && element.nodeType === 1) {
    // avoid document fragments which will throw an error.
    return _isFixed(element);
  }
},
    _createSibling = function _createSibling(element, i) {
  if (element.parentNode && (_doc || _setDoc(element))) {
    var svg = _svgOwner(element),
        ns = svg ? svg.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml",
        type = svg ? i ? "rect" : "g" : "div",
        x = i !== 2 ? 0 : 100,
        y = i === 3 ? 100 : 0,
        css = "position:absolute;display:block;pointer-events:none;margin:0;padding:0;",
        e = _doc.createElementNS ? _doc.createElementNS(ns.replace(/^https/, "http"), type) : _doc.createElement(type);

    if (i) {
      if (!svg) {
        if (!_divContainer) {
          _divContainer = _createSibling(element);
          _divContainer.style.cssText = css;
        }

        e.style.cssText = css + "width:0.1px;height:0.1px;top:" + y + "px;left:" + x + "px";

        _divContainer.appendChild(e);
      } else {
        _svgContainer || (_svgContainer = _createSibling(element));
        e.setAttribute("width", 0.01);
        e.setAttribute("height", 0.01);
        e.setAttribute("transform", "translate(" + x + "," + y + ")");

        _svgContainer.appendChild(e);
      }
    }

    return e;
  }

  throw "Need document and parent.";
},
    _consolidate = function _consolidate(m) {
  // replaces SVGTransformList.consolidate() because a bug in Firefox causes it to break pointer events. See https://greensock.com/forums/topic/23248-touch-is-not-working-on-draggable-in-firefox-windows-v324/?tab=comments#comment-109800
  var c = new Matrix2D(),
      i = 0;

  for (; i < m.numberOfItems; i++) {
    c.multiply(m.getItem(i).matrix);
  }

  return c;
},
    _getCTM = function _getCTM(svg) {
  var m = svg.getCTM(),
      transform;

  if (!m) {
    // Firefox returns null for getCTM() on root <svg> elements, so this is a workaround using a <g> that we temporarily append.
    transform = svg.style[_transformProp];
    svg.style[_transformProp] = "none"; // a bug in Firefox causes css transforms to contaminate the getCTM()

    svg.appendChild(_gEl);
    m = _gEl.getCTM();
    svg.removeChild(_gEl);
    transform ? svg.style[_transformProp] = transform : svg.style.removeProperty(_transformProp.replace(/([A-Z])/g, "-$1").toLowerCase());
  }

  return m || _identityMatrix.clone(); // Firefox will still return null if the <svg> has a width/height of 0 in the browser.
},
    _placeSiblings = function _placeSiblings(element, adjustGOffset) {
  var svg = _svgOwner(element),
      isRootSVG = element === svg,
      siblings = svg ? _svgTemps : _divTemps,
      parent = element.parentNode,
      container,
      m,
      b,
      x,
      y,
      cs;

  if (element === _win) {
    return element;
  }

  siblings.length || siblings.push(_createSibling(element, 1), _createSibling(element, 2), _createSibling(element, 3));
  container = svg ? _svgContainer : _divContainer;

  if (svg) {
    if (isRootSVG) {
      b = _getCTM(element);
      x = -b.e / b.a;
      y = -b.f / b.d;
      m = _identityMatrix;
    } else if (element.getBBox) {
      b = element.getBBox();
      m = element.transform ? element.transform.baseVal : {}; // IE11 doesn't follow the spec.

      m = !m.numberOfItems ? _identityMatrix : m.numberOfItems > 1 ? _consolidate(m) : m.getItem(0).matrix; // don't call m.consolidate().matrix because a bug in Firefox makes pointer events not work when consolidate() is called on the same tick as getBoundingClientRect()! See https://greensock.com/forums/topic/23248-touch-is-not-working-on-draggable-in-firefox-windows-v324/?tab=comments#comment-109800

      x = m.a * b.x + m.c * b.y;
      y = m.b * b.x + m.d * b.y;
    } else {
      // may be a <mask> which has no getBBox() so just use defaults instead of throwing errors.
      m = new Matrix2D();
      x = y = 0;
    }

    if (adjustGOffset && element.tagName.toLowerCase() === "g") {
      x = y = 0;
    }

    (isRootSVG ? svg : parent).appendChild(container);
    container.setAttribute("transform", "matrix(" + m.a + "," + m.b + "," + m.c + "," + m.d + "," + (m.e + x) + "," + (m.f + y) + ")");
  } else {
    x = y = 0;

    if (_hasOffsetBug) {
      // some browsers (like Safari) have a bug that causes them to misreport offset values. When an ancestor element has a transform applied, it's supposed to treat it as if it's position: relative (new context). Safari botches this, so we need to find the closest ancestor (between the element and its offsetParent) that has a transform applied and if one is found, grab its offsetTop/Left and subtract them to compensate.
      m = element.offsetParent;
      b = element;

      while (b && (b = b.parentNode) && b !== m && b.parentNode) {
        if ((_win.getComputedStyle(b)[_transformProp] + "").length > 4) {
          x = b.offsetLeft;
          y = b.offsetTop;
          b = 0;
        }
      }
    }

    cs = _win.getComputedStyle(element);

    if (cs.position !== "absolute" && cs.position !== "fixed") {
      m = element.offsetParent;

      while (parent && parent !== m) {
        // if there's an ancestor element between the element and its offsetParent that's scrolled, we must factor that in.
        x += parent.scrollLeft || 0;
        y += parent.scrollTop || 0;
        parent = parent.parentNode;
      }
    }

    b = container.style;
    b.top = element.offsetTop - y + "px";
    b.left = element.offsetLeft - x + "px";
    b[_transformProp] = cs[_transformProp];
    b[_transformOriginProp] = cs[_transformOriginProp]; // b.border = m.border;
    // b.borderLeftStyle = m.borderLeftStyle;
    // b.borderTopStyle = m.borderTopStyle;
    // b.borderLeftWidth = m.borderLeftWidth;
    // b.borderTopWidth = m.borderTopWidth;

    b.position = cs.position === "fixed" ? "fixed" : "absolute";
    element.parentNode.appendChild(container);
  }

  return container;
},
    _setMatrix = function _setMatrix(m, a, b, c, d, e, f) {
  m.a = a;
  m.b = b;
  m.c = c;
  m.d = d;
  m.e = e;
  m.f = f;
  return m;
};

var Matrix2D = /*#__PURE__*/function () {
  function Matrix2D(a, b, c, d, e, f) {
    if (a === void 0) {
      a = 1;
    }

    if (b === void 0) {
      b = 0;
    }

    if (c === void 0) {
      c = 0;
    }

    if (d === void 0) {
      d = 1;
    }

    if (e === void 0) {
      e = 0;
    }

    if (f === void 0) {
      f = 0;
    }

    _setMatrix(this, a, b, c, d, e, f);
  }

  var _proto = Matrix2D.prototype;

  _proto.inverse = function inverse() {
    var a = this.a,
        b = this.b,
        c = this.c,
        d = this.d,
        e = this.e,
        f = this.f,
        determinant = a * d - b * c || 1e-10;
    return _setMatrix(this, d / determinant, -b / determinant, -c / determinant, a / determinant, (c * f - d * e) / determinant, -(a * f - b * e) / determinant);
  };

  _proto.multiply = function multiply(matrix) {
    var a = this.a,
        b = this.b,
        c = this.c,
        d = this.d,
        e = this.e,
        f = this.f,
        a2 = matrix.a,
        b2 = matrix.c,
        c2 = matrix.b,
        d2 = matrix.d,
        e2 = matrix.e,
        f2 = matrix.f;
    return _setMatrix(this, a2 * a + c2 * c, a2 * b + c2 * d, b2 * a + d2 * c, b2 * b + d2 * d, e + e2 * a + f2 * c, f + e2 * b + f2 * d);
  };

  _proto.clone = function clone() {
    return new Matrix2D(this.a, this.b, this.c, this.d, this.e, this.f);
  };

  _proto.equals = function equals(matrix) {
    var a = this.a,
        b = this.b,
        c = this.c,
        d = this.d,
        e = this.e,
        f = this.f;
    return a === matrix.a && b === matrix.b && c === matrix.c && d === matrix.d && e === matrix.e && f === matrix.f;
  };

  _proto.apply = function apply(point, decoratee) {
    if (decoratee === void 0) {
      decoratee = {};
    }

    var x = point.x,
        y = point.y,
        a = this.a,
        b = this.b,
        c = this.c,
        d = this.d,
        e = this.e,
        f = this.f;
    decoratee.x = x * a + y * c + e || 0;
    decoratee.y = x * b + y * d + f || 0;
    return decoratee;
  };

  return Matrix2D;
}(); // Feed in an element and it'll return a 2D matrix (optionally inverted) so that you can translate between coordinate spaces.
// Inverting lets you translate a global point into a local coordinate space. No inverting lets you go the other way.
// We needed this to work around various browser bugs, like Firefox doesn't accurately report getScreenCTM() when there
// are transforms applied to ancestor elements.
// The matrix math to convert any x/y coordinate is as follows, which is wrapped in a convenient apply() method of Matrix2D above:
//     tx = m.a * x + m.c * y + m.e
//     ty = m.b * x + m.d * y + m.f

function getGlobalMatrix(element, inverse, adjustGOffset, includeScrollInFixed) {
  // adjustGOffset is typically used only when grabbing an element's PARENT's global matrix, and it ignores the x/y offset of any SVG <g> elements because they behave in a special way.
  if (!element || !element.parentNode || (_doc || _setDoc(element)).documentElement === element) {
    return new Matrix2D();
  }

  var zeroScales = _forceNonZeroScale(element),
      svg = _svgOwner(element),
      temps = svg ? _svgTemps : _divTemps,
      container = _placeSiblings(element, adjustGOffset),
      b1 = temps[0].getBoundingClientRect(),
      b2 = temps[1].getBoundingClientRect(),
      b3 = temps[2].getBoundingClientRect(),
      parent = container.parentNode,
      isFixed = !includeScrollInFixed && _isFixed(element),
      m = new Matrix2D((b2.left - b1.left) / 100, (b2.top - b1.top) / 100, (b3.left - b1.left) / 100, (b3.top - b1.top) / 100, b1.left + (isFixed ? 0 : _getDocScrollLeft()), b1.top + (isFixed ? 0 : _getDocScrollTop()));

  parent.removeChild(container);

  if (zeroScales) {
    b1 = zeroScales.length;

    while (b1--) {
      b2 = zeroScales[b1];
      b2.scaleX = b2.scaleY = 0;
      b2.renderTransform(1, b2);
    }
  }

  return inverse ? m.inverse() : m;
}
 // export function getMatrix(element) {
// 	_doc || _setDoc(element);
// 	let m = (_win.getComputedStyle(element)[_transformProp] + "").substr(7).match(/[-.]*\d+[.e\-+]*\d*[e\-\+]*\d*/g),
// 		is2D = m && m.length === 6;
// 	return !m || m.length < 6 ? new Matrix2D() : new Matrix2D(+m[0], +m[1], +m[is2D ? 2 : 4], +m[is2D ? 3 : 5], +m[is2D ? 4 : 12], +m[is2D ? 5 : 13]);
// }

/***/ }),

/***/ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var reactIs = __webpack_require__(/*! react-is */ "./node_modules/hoist-non-react-statics/node_modules/react-is/index.js");

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

function getStatics(component) {
  // React v16.11 and below
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above


  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }

  return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),

/***/ "./node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.development.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.development.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/hoist-non-react-statics/node_modules/react-is/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/node_modules/react-is/index.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "./src/comps/_layout/_layout.scss":
/*!****************************************!*\
  !*** ./src/comps/_layout/_layout.scss ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/comps/_layout/header.scss":
/*!***************************************!*\
  !*** ./src/comps/_layout/header.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) { /**/ }
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bigint: createPrimitiveTypeChecker('bigint'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message, data) {
    this.message = message;
    this.data = data && typeof data === 'object' ? data: {};
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError(
          'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
          {expectedType: expectedType}
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      var expectedTypes = [];
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
        if (checkerResult == null) {
          return null;
        }
        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
          expectedTypes.push(checkerResult.data.expectedType);
        }
      }
      var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function invalidValidatorError(componentName, location, propFullName, key, type) {
    return new PropTypeError(
      (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
      'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
    );
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (has(shapeTypes, key) && typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else {}


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/prop-types/lib/has.js":
/*!********************************************!*\
  !*** ./node_modules/prop-types/lib/has.js ***!
  \********************************************/
/***/ ((module) => {

module.exports = Function.call.bind(Object.prototype.hasOwnProperty);


/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/index.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "./node_modules/react-transition-group/esm/Transition.js":
/*!***************************************************************!*\
  !*** ./node_modules/react-transition-group/esm/Transition.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ENTERED": () => (/* binding */ ENTERED),
/* harmony export */   "ENTERING": () => (/* binding */ ENTERING),
/* harmony export */   "EXITED": () => (/* binding */ EXITED),
/* harmony export */   "EXITING": () => (/* binding */ EXITING),
/* harmony export */   "UNMOUNTED": () => (/* binding */ UNMOUNTED),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config */ "./node_modules/react-transition-group/esm/config.js");
/* harmony import */ var _utils_PropTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/PropTypes */ "./node_modules/react-transition-group/esm/utils/PropTypes.js");
/* harmony import */ var _TransitionGroupContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TransitionGroupContext */ "./node_modules/react-transition-group/esm/TransitionGroupContext.js");








var UNMOUNTED = 'unmounted';
var EXITED = 'exited';
var ENTERING = 'entering';
var ENTERED = 'entered';
var EXITING = 'exiting';
/**
 * The Transition component lets you describe a transition from one component
 * state to another _over time_ with a simple declarative API. Most commonly
 * it's used to animate the mounting and unmounting of a component, but can also
 * be used to describe in-place transition states as well.
 *
 * ---
 *
 * **Note**: `Transition` is a platform-agnostic base component. If you're using
 * transitions in CSS, you'll probably want to use
 * [`CSSTransition`](https://reactcommunity.org/react-transition-group/css-transition)
 * instead. It inherits all the features of `Transition`, but contains
 * additional features necessary to play nice with CSS transitions (hence the
 * name of the component).
 *
 * ---
 *
 * By default the `Transition` component does not alter the behavior of the
 * component it renders, it only tracks "enter" and "exit" states for the
 * components. It's up to you to give meaning and effect to those states. For
 * example we can add styles to a component when it enters or exits:
 *
 * ```jsx
 * import { Transition } from 'react-transition-group';
 *
 * const duration = 300;
 *
 * const defaultStyle = {
 *   transition: `opacity ${duration}ms ease-in-out`,
 *   opacity: 0,
 * }
 *
 * const transitionStyles = {
 *   entering: { opacity: 1 },
 *   entered:  { opacity: 1 },
 *   exiting:  { opacity: 0 },
 *   exited:  { opacity: 0 },
 * };
 *
 * const Fade = ({ in: inProp }) => (
 *   <Transition in={inProp} timeout={duration}>
 *     {state => (
 *       <div style={{
 *         ...defaultStyle,
 *         ...transitionStyles[state]
 *       }}>
 *         I'm a fade Transition!
 *       </div>
 *     )}
 *   </Transition>
 * );
 * ```
 *
 * There are 4 main states a Transition can be in:
 *  - `'entering'`
 *  - `'entered'`
 *  - `'exiting'`
 *  - `'exited'`
 *
 * Transition state is toggled via the `in` prop. When `true` the component
 * begins the "Enter" stage. During this stage, the component will shift from
 * its current transition state, to `'entering'` for the duration of the
 * transition and then to the `'entered'` stage once it's complete. Let's take
 * the following example (we'll use the
 * [useState](https://reactjs.org/docs/hooks-reference.html#usestate) hook):
 *
 * ```jsx
 * function App() {
 *   const [inProp, setInProp] = useState(false);
 *   return (
 *     <div>
 *       <Transition in={inProp} timeout={500}>
 *         {state => (
 *           // ...
 *         )}
 *       </Transition>
 *       <button onClick={() => setInProp(true)}>
 *         Click to Enter
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 *
 * When the button is clicked the component will shift to the `'entering'` state
 * and stay there for 500ms (the value of `timeout`) before it finally switches
 * to `'entered'`.
 *
 * When `in` is `false` the same thing happens except the state moves from
 * `'exiting'` to `'exited'`.
 */

var Transition = /*#__PURE__*/function (_React$Component) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(Transition, _React$Component);

  function Transition(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    var parentGroup = context; // In the context of a TransitionGroup all enters are really appears

    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
    var initialStatus;
    _this.appearStatus = null;

    if (props.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.appearStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }

    _this.state = {
      status: initialStatus
    };
    _this.nextCallback = null;
    return _this;
  }

  Transition.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var nextIn = _ref.in;

    if (nextIn && prevState.status === UNMOUNTED) {
      return {
        status: EXITED
      };
    }

    return null;
  } // getSnapshotBeforeUpdate(prevProps) {
  //   let nextStatus = null
  //   if (prevProps !== this.props) {
  //     const { status } = this.state
  //     if (this.props.in) {
  //       if (status !== ENTERING && status !== ENTERED) {
  //         nextStatus = ENTERING
  //       }
  //     } else {
  //       if (status === ENTERING || status === ENTERED) {
  //         nextStatus = EXITING
  //       }
  //     }
  //   }
  //   return { nextStatus }
  // }
  ;

  var _proto = Transition.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.updateStatus(true, this.appearStatus);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var nextStatus = null;

    if (prevProps !== this.props) {
      var status = this.state.status;

      if (this.props.in) {
        if (status !== ENTERING && status !== ENTERED) {
          nextStatus = ENTERING;
        }
      } else {
        if (status === ENTERING || status === ENTERED) {
          nextStatus = EXITING;
        }
      }
    }

    this.updateStatus(false, nextStatus);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };

  _proto.getTimeouts = function getTimeouts() {
    var timeout = this.props.timeout;
    var exit, enter, appear;
    exit = enter = appear = timeout;

    if (timeout != null && typeof timeout !== 'number') {
      exit = timeout.exit;
      enter = timeout.enter; // TODO: remove fallback for next major

      appear = timeout.appear !== undefined ? timeout.appear : enter;
    }

    return {
      exit: exit,
      enter: enter,
      appear: appear
    };
  };

  _proto.updateStatus = function updateStatus(mounting, nextStatus) {
    if (mounting === void 0) {
      mounting = false;
    }

    if (nextStatus !== null) {
      // nextStatus will always be ENTERING or EXITING.
      this.cancelNextCallback();

      if (nextStatus === ENTERING) {
        this.performEnter(mounting);
      } else {
        this.performExit();
      }
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({
        status: UNMOUNTED
      });
    }
  };

  _proto.performEnter = function performEnter(mounting) {
    var _this2 = this;

    var enter = this.props.enter;
    var appearing = this.context ? this.context.isMounting : mounting;

    var _ref2 = this.props.nodeRef ? [appearing] : [react_dom__WEBPACK_IMPORTED_MODULE_3___default().findDOMNode(this), appearing],
        maybeNode = _ref2[0],
        maybeAppearing = _ref2[1];

    var timeouts = this.getTimeouts();
    var enterTimeout = appearing ? timeouts.appear : timeouts.enter; // no enter animation skip right to ENTERED
    // if we are mounting and running this it means appear _must_ be set

    if (!mounting && !enter || _config__WEBPACK_IMPORTED_MODULE_4__["default"].disabled) {
      this.safeSetState({
        status: ENTERED
      }, function () {
        _this2.props.onEntered(maybeNode);
      });
      return;
    }

    this.props.onEnter(maybeNode, maybeAppearing);
    this.safeSetState({
      status: ENTERING
    }, function () {
      _this2.props.onEntering(maybeNode, maybeAppearing);

      _this2.onTransitionEnd(enterTimeout, function () {
        _this2.safeSetState({
          status: ENTERED
        }, function () {
          _this2.props.onEntered(maybeNode, maybeAppearing);
        });
      });
    });
  };

  _proto.performExit = function performExit() {
    var _this3 = this;

    var exit = this.props.exit;
    var timeouts = this.getTimeouts();
    var maybeNode = this.props.nodeRef ? undefined : react_dom__WEBPACK_IMPORTED_MODULE_3___default().findDOMNode(this); // no exit animation skip right to EXITED

    if (!exit || _config__WEBPACK_IMPORTED_MODULE_4__["default"].disabled) {
      this.safeSetState({
        status: EXITED
      }, function () {
        _this3.props.onExited(maybeNode);
      });
      return;
    }

    this.props.onExit(maybeNode);
    this.safeSetState({
      status: EXITING
    }, function () {
      _this3.props.onExiting(maybeNode);

      _this3.onTransitionEnd(timeouts.exit, function () {
        _this3.safeSetState({
          status: EXITED
        }, function () {
          _this3.props.onExited(maybeNode);
        });
      });
    });
  };

  _proto.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };

  _proto.safeSetState = function safeSetState(nextState, callback) {
    // This shouldn't be necessary, but there are weird race conditions with
    // setState callbacks and unmounting in testing, so always make sure that
    // we can cancel any pending setState callbacks after we unmount.
    callback = this.setNextCallback(callback);
    this.setState(nextState, callback);
  };

  _proto.setNextCallback = function setNextCallback(callback) {
    var _this4 = this;

    var active = true;

    this.nextCallback = function (event) {
      if (active) {
        active = false;
        _this4.nextCallback = null;
        callback(event);
      }
    };

    this.nextCallback.cancel = function () {
      active = false;
    };

    return this.nextCallback;
  };

  _proto.onTransitionEnd = function onTransitionEnd(timeout, handler) {
    this.setNextCallback(handler);
    var node = this.props.nodeRef ? this.props.nodeRef.current : react_dom__WEBPACK_IMPORTED_MODULE_3___default().findDOMNode(this);
    var doesNotHaveTimeoutOrListener = timeout == null && !this.props.addEndListener;

    if (!node || doesNotHaveTimeoutOrListener) {
      setTimeout(this.nextCallback, 0);
      return;
    }

    if (this.props.addEndListener) {
      var _ref3 = this.props.nodeRef ? [this.nextCallback] : [node, this.nextCallback],
          maybeNode = _ref3[0],
          maybeNextCallback = _ref3[1];

      this.props.addEndListener(maybeNode, maybeNextCallback);
    }

    if (timeout != null) {
      setTimeout(this.nextCallback, timeout);
    }
  };

  _proto.render = function render() {
    var status = this.state.status;

    if (status === UNMOUNTED) {
      return null;
    }

    var _this$props = this.props,
        children = _this$props.children,
        _in = _this$props.in,
        _mountOnEnter = _this$props.mountOnEnter,
        _unmountOnExit = _this$props.unmountOnExit,
        _appear = _this$props.appear,
        _enter = _this$props.enter,
        _exit = _this$props.exit,
        _timeout = _this$props.timeout,
        _addEndListener = _this$props.addEndListener,
        _onEnter = _this$props.onEnter,
        _onEntering = _this$props.onEntering,
        _onEntered = _this$props.onEntered,
        _onExit = _this$props.onExit,
        _onExiting = _this$props.onExiting,
        _onExited = _this$props.onExited,
        _nodeRef = _this$props.nodeRef,
        childProps = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(_this$props, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);

    return (
      /*#__PURE__*/
      // allows for nested Transitions
      react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_TransitionGroupContext__WEBPACK_IMPORTED_MODULE_5__["default"].Provider, {
        value: null
      }, typeof children === 'function' ? children(status, childProps) : react__WEBPACK_IMPORTED_MODULE_2___default().cloneElement(react__WEBPACK_IMPORTED_MODULE_2___default().Children.only(children), childProps))
    );
  };

  return Transition;
}((react__WEBPACK_IMPORTED_MODULE_2___default().Component));

Transition.contextType = _TransitionGroupContext__WEBPACK_IMPORTED_MODULE_5__["default"];
Transition.propTypes =  true ? {
  /**
   * A React reference to DOM element that need to transition:
   * https://stackoverflow.com/a/51127130/4671932
   *
   *   - When `nodeRef` prop is used, `node` is not passed to callback functions
   *      (e.g. `onEnter`) because user already has direct access to the node.
   *   - When changing `key` prop of `Transition` in a `TransitionGroup` a new
   *     `nodeRef` need to be provided to `Transition` with changed `key` prop
   *     (see
   *     [test/CSSTransition-test.js](https://github.com/reactjs/react-transition-group/blob/13435f897b3ab71f6e19d724f145596f5910581c/test/CSSTransition-test.js#L362-L437)).
   */
  nodeRef: prop_types__WEBPACK_IMPORTED_MODULE_6___default().shape({
    current: typeof Element === 'undefined' ? (prop_types__WEBPACK_IMPORTED_MODULE_6___default().any) : function (propValue, key, componentName, location, propFullName, secret) {
      var value = propValue[key];
      return prop_types__WEBPACK_IMPORTED_MODULE_6___default().instanceOf(value && 'ownerDocument' in value ? value.ownerDocument.defaultView.Element : Element)(propValue, key, componentName, location, propFullName, secret);
    }
  }),

  /**
   * A `function` child can be used instead of a React element. This function is
   * called with the current transition status (`'entering'`, `'entered'`,
   * `'exiting'`, `'exited'`), which can be used to apply context
   * specific props to a component.
   *
   * ```jsx
   * <Transition in={this.state.in} timeout={150}>
   *   {state => (
   *     <MyComponent className={`fade fade-${state}`} />
   *   )}
   * </Transition>
   * ```
   */
  children: prop_types__WEBPACK_IMPORTED_MODULE_6___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_6___default().func.isRequired), (prop_types__WEBPACK_IMPORTED_MODULE_6___default().element.isRequired)]).isRequired,

  /**
   * Show the component; triggers the enter or exit states
   */
  in: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool),

  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool),

  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool),

  /**
   * By default the child component does not perform the enter transition when
   * it first mounts, regardless of the value of `in`. If you want this
   * behavior, set both `appear` and `in` to `true`.
   *
   * > **Note**: there are no special appear states like `appearing`/`appeared`, this prop
   * > only adds an additional enter transition. However, in the
   * > `<CSSTransition>` component that first enter transition does result in
   * > additional `.appear-*` classes, that way you can choose to style it
   * > differently.
   */
  appear: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool),

  /**
   * Enable or disable enter transitions.
   */
  enter: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool),

  /**
   * Enable or disable exit transitions.
   */
  exit: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool),

  /**
   * The duration of the transition, in milliseconds.
   * Required unless `addEndListener` is provided.
   *
   * You may specify a single timeout for all transitions:
   *
   * ```jsx
   * timeout={500}
   * ```
   *
   * or individually:
   *
   * ```jsx
   * timeout={{
   *  appear: 500,
   *  enter: 300,
   *  exit: 500,
   * }}
   * ```
   *
   * - `appear` defaults to the value of `enter`
   * - `enter` defaults to `0`
   * - `exit` defaults to `0`
   *
   * @type {number | { enter?: number, exit?: number, appear?: number }}
   */
  timeout: function timeout(props) {
    var pt = _utils_PropTypes__WEBPACK_IMPORTED_MODULE_7__.timeoutsShape;
    if (!props.addEndListener) pt = pt.isRequired;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return pt.apply(void 0, [props].concat(args));
  },

  /**
   * Add a custom transition end trigger. Called with the transitioning
   * DOM node and a `done` callback. Allows for more fine grained transition end
   * logic. Timeouts are still used as a fallback if provided.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * ```jsx
   * addEndListener={(node, done) => {
   *   // use the css transitionend event to mark the finish of a transition
   *   node.addEventListener('transitionend', done, false);
   * }}
   * ```
   */
  addEndListener: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func),

  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func),

  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func),

  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func),

  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func),

  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func),

  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func)
} : 0; // Name the function so it is clearer in the documentation

function noop() {}

Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,
  onEnter: noop,
  onEntering: noop,
  onEntered: noop,
  onExit: noop,
  onExiting: noop,
  onExited: noop
};
Transition.UNMOUNTED = UNMOUNTED;
Transition.EXITED = EXITED;
Transition.ENTERING = ENTERING;
Transition.ENTERED = ENTERED;
Transition.EXITING = EXITING;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Transition);

/***/ }),

/***/ "./node_modules/react-transition-group/esm/TransitionGroup.js":
/*!********************************************************************!*\
  !*** ./node_modules/react-transition-group/esm/TransitionGroup.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _TransitionGroupContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TransitionGroupContext */ "./node_modules/react-transition-group/esm/TransitionGroupContext.js");
/* harmony import */ var _utils_ChildMapping__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/ChildMapping */ "./node_modules/react-transition-group/esm/utils/ChildMapping.js");









var values = Object.values || function (obj) {
  return Object.keys(obj).map(function (k) {
    return obj[k];
  });
};

var defaultProps = {
  component: 'div',
  childFactory: function childFactory(child) {
    return child;
  }
};
/**
 * The `<TransitionGroup>` component manages a set of transition components
 * (`<Transition>` and `<CSSTransition>`) in a list. Like with the transition
 * components, `<TransitionGroup>` is a state machine for managing the mounting
 * and unmounting of components over time.
 *
 * Consider the example below. As items are removed or added to the TodoList the
 * `in` prop is toggled automatically by the `<TransitionGroup>`.
 *
 * Note that `<TransitionGroup>`  does not define any animation behavior!
 * Exactly _how_ a list item animates is up to the individual transition
 * component. This means you can mix and match animations across different list
 * items.
 */

var TransitionGroup = /*#__PURE__*/function (_React$Component) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__["default"])(TransitionGroup, _React$Component);

  function TransitionGroup(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;

    var handleExited = _this.handleExited.bind((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this)); // Initial children should all be entering, dependent on appear


    _this.state = {
      contextValue: {
        isMounting: true
      },
      handleExited: handleExited,
      firstRender: true
    };
    return _this;
  }

  var _proto = TransitionGroup.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.mounted = true;
    this.setState({
      contextValue: {
        isMounting: false
      }
    });
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.mounted = false;
  };

  TransitionGroup.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, _ref) {
    var prevChildMapping = _ref.children,
        handleExited = _ref.handleExited,
        firstRender = _ref.firstRender;
    return {
      children: firstRender ? (0,_utils_ChildMapping__WEBPACK_IMPORTED_MODULE_5__.getInitialChildMapping)(nextProps, handleExited) : (0,_utils_ChildMapping__WEBPACK_IMPORTED_MODULE_5__.getNextChildMapping)(nextProps, prevChildMapping, handleExited),
      firstRender: false
    };
  } // node is `undefined` when user provided `nodeRef` prop
  ;

  _proto.handleExited = function handleExited(child, node) {
    var currentChildMapping = (0,_utils_ChildMapping__WEBPACK_IMPORTED_MODULE_5__.getChildMapping)(this.props.children);
    if (child.key in currentChildMapping) return;

    if (child.props.onExited) {
      child.props.onExited(node);
    }

    if (this.mounted) {
      this.setState(function (state) {
        var children = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state.children);

        delete children[child.key];
        return {
          children: children
        };
      });
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        Component = _this$props.component,
        childFactory = _this$props.childFactory,
        props = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(_this$props, ["component", "childFactory"]);

    var contextValue = this.state.contextValue;
    var children = values(this.state.children).map(childFactory);
    delete props.appear;
    delete props.enter;
    delete props.exit;

    if (Component === null) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_TransitionGroupContext__WEBPACK_IMPORTED_MODULE_6__["default"].Provider, {
        value: contextValue
      }, children);
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_TransitionGroupContext__WEBPACK_IMPORTED_MODULE_6__["default"].Provider, {
      value: contextValue
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Component, props, children));
  };

  return TransitionGroup;
}((react__WEBPACK_IMPORTED_MODULE_4___default().Component));

TransitionGroup.propTypes =  true ? {
  /**
   * `<TransitionGroup>` renders a `<div>` by default. You can change this
   * behavior by providing a `component` prop.
   * If you use React v16+ and would like to avoid a wrapping `<div>` element
   * you can pass in `component={null}`. This is useful if the wrapping div
   * borks your css styles.
   */
  component: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().any),

  /**
   * A set of `<Transition>` components, that are toggled `in` and out as they
   * leave. the `<TransitionGroup>` will inject specific transition props, so
   * remember to spread them through if you are wrapping the `<Transition>` as
   * with our `<Fade>` example.
   *
   * While this component is meant for multiple `Transition` or `CSSTransition`
   * children, sometimes you may want to have a single transition child with
   * content that you want to be transitioned out and in when you change it
   * (e.g. routes, images etc.) In that case you can change the `key` prop of
   * the transition child as you change its content, this will cause
   * `TransitionGroup` to transition the child out and back in.
   */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().node),

  /**
   * A convenience prop that enables or disables appear animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  appear: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool),

  /**
   * A convenience prop that enables or disables enter animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  enter: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool),

  /**
   * A convenience prop that enables or disables exit animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  exit: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool),

  /**
   * You may need to apply reactive updates to a child as it is exiting.
   * This is generally done by using `cloneElement` however in the case of an exiting
   * child the element has already been removed and not accessible to the consumer.
   *
   * If you do need to update a child as it leaves you can provide a `childFactory`
   * to wrap every child, even the ones that are leaving.
   *
   * @type Function(child: ReactElement) -> ReactElement
   */
  childFactory: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func)
} : 0;
TransitionGroup.defaultProps = defaultProps;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TransitionGroup);

/***/ }),

/***/ "./node_modules/react-transition-group/esm/TransitionGroupContext.js":
/*!***************************************************************************!*\
  !*** ./node_modules/react-transition-group/esm/TransitionGroupContext.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (react__WEBPACK_IMPORTED_MODULE_0___default().createContext(null));

/***/ }),

/***/ "./node_modules/react-transition-group/esm/config.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-transition-group/esm/config.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  disabled: false
});

/***/ }),

/***/ "./node_modules/react-transition-group/esm/utils/ChildMapping.js":
/*!***********************************************************************!*\
  !*** ./node_modules/react-transition-group/esm/utils/ChildMapping.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getChildMapping": () => (/* binding */ getChildMapping),
/* harmony export */   "getInitialChildMapping": () => (/* binding */ getInitialChildMapping),
/* harmony export */   "getNextChildMapping": () => (/* binding */ getNextChildMapping),
/* harmony export */   "mergeChildMappings": () => (/* binding */ mergeChildMappings)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Given `this.props.children`, return an object mapping key to child.
 *
 * @param {*} children `this.props.children`
 * @return {object} Mapping of key to child
 */

function getChildMapping(children, mapFn) {
  var mapper = function mapper(child) {
    return mapFn && (0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(child) ? mapFn(child) : child;
  };

  var result = Object.create(null);
  if (children) react__WEBPACK_IMPORTED_MODULE_0__.Children.map(children, function (c) {
    return c;
  }).forEach(function (child) {
    // run the map function here instead so that the key is the computed one
    result[child.key] = mapper(child);
  });
  return result;
}
/**
 * When you're adding or removing children some may be added or removed in the
 * same render pass. We want to show *both* since we want to simultaneously
 * animate elements in and out. This function takes a previous set of keys
 * and a new set of keys and merges them with its best guess of the correct
 * ordering. In the future we may expose some of the utilities in
 * ReactMultiChild to make this easy, but for now React itself does not
 * directly have this concept of the union of prevChildren and nextChildren
 * so we implement it here.
 *
 * @param {object} prev prev children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @param {object} next next children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @return {object} a key set that contains all keys in `prev` and all keys
 * in `next` in a reasonable order.
 */

function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};

  function getValueForKey(key) {
    return key in next ? next[key] : prev[key];
  } // For each key of `next`, the list of keys to insert before that key in
  // the combined list


  var nextKeysPending = Object.create(null);
  var pendingKeys = [];

  for (var prevKey in prev) {
    if (prevKey in next) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }

  var i;
  var childMapping = {};

  for (var nextKey in next) {
    if (nextKeysPending[nextKey]) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        var pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
      }
    }

    childMapping[nextKey] = getValueForKey(nextKey);
  } // Finally, add the keys which didn't appear before any key in `next`


  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }

  return childMapping;
}

function getProp(child, prop, props) {
  return props[prop] != null ? props[prop] : child.props[prop];
}

function getInitialChildMapping(props, onExited) {
  return getChildMapping(props.children, function (child) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(child, {
      onExited: onExited.bind(null, child),
      in: true,
      appear: getProp(child, 'appear', props),
      enter: getProp(child, 'enter', props),
      exit: getProp(child, 'exit', props)
    });
  });
}
function getNextChildMapping(nextProps, prevChildMapping, onExited) {
  var nextChildMapping = getChildMapping(nextProps.children);
  var children = mergeChildMappings(prevChildMapping, nextChildMapping);
  Object.keys(children).forEach(function (key) {
    var child = children[key];
    if (!(0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(child)) return;
    var hasPrev = (key in prevChildMapping);
    var hasNext = (key in nextChildMapping);
    var prevChild = prevChildMapping[key];
    var isLeaving = (0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(prevChild) && !prevChild.props.in; // item is new (entering)

    if (hasNext && (!hasPrev || isLeaving)) {
      // console.log('entering', key)
      children[key] = (0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(child, {
        onExited: onExited.bind(null, child),
        in: true,
        exit: getProp(child, 'exit', nextProps),
        enter: getProp(child, 'enter', nextProps)
      });
    } else if (!hasNext && hasPrev && !isLeaving) {
      // item is old (exiting)
      // console.log('leaving', key)
      children[key] = (0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(child, {
        in: false
      });
    } else if (hasNext && hasPrev && (0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(prevChild)) {
      // item hasn't changed transition states
      // copy over the last transition props;
      // console.log('unchanged', key)
      children[key] = (0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(child, {
        onExited: onExited.bind(null, child),
        in: prevChild.props.in,
        exit: getProp(child, 'exit', nextProps),
        enter: getProp(child, 'enter', nextProps)
      });
    }
  });
  return children;
}

/***/ }),

/***/ "./node_modules/react-transition-group/esm/utils/PropTypes.js":
/*!********************************************************************!*\
  !*** ./node_modules/react-transition-group/esm/utils/PropTypes.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "classNamesShape": () => (/* binding */ classNamesShape),
/* harmony export */   "timeoutsShape": () => (/* binding */ timeoutsShape)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);

var timeoutsShape =  true ? prop_types__WEBPACK_IMPORTED_MODULE_0___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_0___default().number), prop_types__WEBPACK_IMPORTED_MODULE_0___default().shape({
  enter: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().number),
  exit: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().number),
  appear: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().number)
}).isRequired]) : 0;
var classNamesShape =  true ? prop_types__WEBPACK_IMPORTED_MODULE_0___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_0___default().string), prop_types__WEBPACK_IMPORTED_MODULE_0___default().shape({
  enter: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
  exit: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
  active: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string)
}), prop_types__WEBPACK_IMPORTED_MODULE_0___default().shape({
  enter: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
  enterDone: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
  enterActive: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
  exit: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
  exitDone: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
  exitActive: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string)
})]) : 0;

/***/ }),

/***/ "./node_modules/react-uuid/uuid.js":
/*!*****************************************!*\
  !*** ./node_modules/react-uuid/uuid.js ***!
  \*****************************************/
/***/ ((module) => {

/**
A function that returns a universally unique identifier (uuid).  
example: 1b83fd69-abe7-468c-bea1-306a8aa1c81d
@returns `string` : 32 character uuid (see example)
*/
function uuid() {
	const hashTable = [
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
	];
	let uuid = [];
	for (let i = 0; i < 36; i++) {
		if (i === 8 || i === 13 || i === 18 || i === 23) {
			uuid[i] = "-";
		} else {
			uuid[i] = hashTable[Math.ceil(Math.random() * hashTable.length - 1)];
		}
	}
	return uuid.join("");
}

module.exports = uuid;


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = window["ReactDOM"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _assertThisInitialized)
/* harmony export */ });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inheritsLoose)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subClass, superClass);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _objectWithoutPropertiesLoose)
/* harmony export */ });
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

/***/ }),

/***/ "./node_modules/stylis/src/Enum.js":
/*!*****************************************!*\
  !*** ./node_modules/stylis/src/Enum.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CHARSET": () => (/* binding */ CHARSET),
/* harmony export */   "COMMENT": () => (/* binding */ COMMENT),
/* harmony export */   "COUNTER_STYLE": () => (/* binding */ COUNTER_STYLE),
/* harmony export */   "DECLARATION": () => (/* binding */ DECLARATION),
/* harmony export */   "DOCUMENT": () => (/* binding */ DOCUMENT),
/* harmony export */   "FONT_FACE": () => (/* binding */ FONT_FACE),
/* harmony export */   "FONT_FEATURE_VALUES": () => (/* binding */ FONT_FEATURE_VALUES),
/* harmony export */   "IMPORT": () => (/* binding */ IMPORT),
/* harmony export */   "KEYFRAMES": () => (/* binding */ KEYFRAMES),
/* harmony export */   "MEDIA": () => (/* binding */ MEDIA),
/* harmony export */   "MOZ": () => (/* binding */ MOZ),
/* harmony export */   "MS": () => (/* binding */ MS),
/* harmony export */   "NAMESPACE": () => (/* binding */ NAMESPACE),
/* harmony export */   "PAGE": () => (/* binding */ PAGE),
/* harmony export */   "RULESET": () => (/* binding */ RULESET),
/* harmony export */   "SUPPORTS": () => (/* binding */ SUPPORTS),
/* harmony export */   "VIEWPORT": () => (/* binding */ VIEWPORT),
/* harmony export */   "WEBKIT": () => (/* binding */ WEBKIT)
/* harmony export */ });
var MS = '-ms-'
var MOZ = '-moz-'
var WEBKIT = '-webkit-'

var COMMENT = 'comm'
var RULESET = 'rule'
var DECLARATION = 'decl'

var PAGE = '@page'
var MEDIA = '@media'
var IMPORT = '@import'
var CHARSET = '@charset'
var VIEWPORT = '@viewport'
var SUPPORTS = '@supports'
var DOCUMENT = '@document'
var NAMESPACE = '@namespace'
var KEYFRAMES = '@keyframes'
var FONT_FACE = '@font-face'
var COUNTER_STYLE = '@counter-style'
var FONT_FEATURE_VALUES = '@font-feature-values'


/***/ }),

/***/ "./node_modules/stylis/src/Middleware.js":
/*!***********************************************!*\
  !*** ./node_modules/stylis/src/Middleware.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "middleware": () => (/* binding */ middleware),
/* harmony export */   "namespace": () => (/* binding */ namespace),
/* harmony export */   "prefixer": () => (/* binding */ prefixer),
/* harmony export */   "rulesheet": () => (/* binding */ rulesheet)
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");
/* harmony import */ var _Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Tokenizer.js */ "./node_modules/stylis/src/Tokenizer.js");
/* harmony import */ var _Serializer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Serializer.js */ "./node_modules/stylis/src/Serializer.js");
/* harmony import */ var _Prefixer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Prefixer.js */ "./node_modules/stylis/src/Prefixer.js");






/**
 * @param {function[]} collection
 * @return {function}
 */
function middleware (collection) {
	var length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(collection)

	return function (element, index, children, callback) {
		var output = ''

		for (var i = 0; i < length; i++)
			output += collection[i](element, index, children, callback) || ''

		return output
	}
}

/**
 * @param {function} callback
 * @return {function}
 */
function rulesheet (callback) {
	return function (element) {
		if (!element.root)
			if (element = element.return)
				callback(element)
	}
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 */
function prefixer (element, index, children, callback) {
	if (element.length > -1)
		if (!element.return)
			switch (element.type) {
				case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.DECLARATION: element.return = (0,_Prefixer_js__WEBPACK_IMPORTED_MODULE_2__.prefix)(element.value, element.length, children)
					return
				case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.KEYFRAMES:
					return (0,_Serializer_js__WEBPACK_IMPORTED_MODULE_3__.serialize)([(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {value: (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(element.value, '@', '@' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT)})], callback)
				case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.RULESET:
					if (element.length)
						return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.combine)(element.props, function (value) {
							switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(value, /(::plac\w+|:read-\w+)/)) {
								// :read-(only|write)
								case ':read-only': case ':read-write':
									return (0,_Serializer_js__WEBPACK_IMPORTED_MODULE_3__.serialize)([(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(read-\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + '$1')]})], callback)
								// :placeholder
								case '::placeholder':
									return (0,_Serializer_js__WEBPACK_IMPORTED_MODULE_3__.serialize)([
										(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(plac\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'input-$1')]}),
										(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(plac\w+)/, ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + '$1')]}),
										(0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.copy)(element, {props: [(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /:(plac\w+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'input-$1')]})
									], callback)
							}

							return ''
						})
			}
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 */
function namespace (element) {
	switch (element.type) {
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.RULESET:
			element.props = element.props.map(function (value) {
				return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.combine)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_4__.tokenize)(value), function (value, index, children) {
					switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, 0)) {
						// \f
						case 12:
							return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(value, 1, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(value))
						// \0 ( + > ~
						case 0: case 40: case 43: case 62: case 126:
							return value
						// :
						case 58:
							if (children[++index] === 'global')
								children[index] = '', children[++index] = '\f' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(children[index], index = 1, -1)
						// \s
						case 32:
							return index === 1 ? '' : value
						default:
							switch (index) {
								case 0: element = value
									return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(children) > 1 ? '' : value
								case index = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(children) - 1: case 2:
									return index === 2 ? value + element + element : value + element
								default:
									return value
							}
					}
				})
			})
	}
}


/***/ }),

/***/ "./node_modules/stylis/src/Parser.js":
/*!*******************************************!*\
  !*** ./node_modules/stylis/src/Parser.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "comment": () => (/* binding */ comment),
/* harmony export */   "compile": () => (/* binding */ compile),
/* harmony export */   "declaration": () => (/* binding */ declaration),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "ruleset": () => (/* binding */ ruleset)
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");
/* harmony import */ var _Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tokenizer.js */ "./node_modules/stylis/src/Tokenizer.js");




/**
 * @param {string} value
 * @return {object[]}
 */
function compile (value) {
	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.dealloc)(parse('', null, null, null, [''], value = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.alloc)(value), 0, [0], value))
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {string[]} rule
 * @param {string[]} rules
 * @param {string[]} rulesets
 * @param {number[]} pseudo
 * @param {number[]} points
 * @param {string[]} declarations
 * @return {object}
 */
function parse (value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
	var index = 0
	var offset = 0
	var length = pseudo
	var atrule = 0
	var property = 0
	var previous = 0
	var variable = 1
	var scanning = 1
	var ampersand = 1
	var character = 0
	var type = ''
	var props = rules
	var children = rulesets
	var reference = rule
	var characters = type

	while (scanning)
		switch (previous = character, character = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.next)()) {
			// (
			case 40:
				if (previous != 108 && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.charat)(characters, length - 1) == 58) {
					if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.indexof)(characters += (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.delimit)(character), '&', '&\f'), '&\f') != -1)
						ampersand = -1
					break
				}
			// " ' [
			case 34: case 39: case 91:
				characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.delimit)(character)
				break
			// \t \n \r \s
			case 9: case 10: case 13: case 32:
				characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.whitespace)(previous)
				break
			// \
			case 92:
				characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.escaping)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.caret)() - 1, 7)
				continue
			// /
			case 47:
				switch ((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.peek)()) {
					case 42: case 47:
						;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(comment((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.commenter)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.next)(), (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.caret)()), root, parent), declarations)
						break
					default:
						characters += '/'
				}
				break
			// {
			case 123 * variable:
				points[index++] = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) * ampersand
			// } ; \0
			case 125 * variable: case 59: case 0:
				switch (character) {
					// \0 }
					case 0: case 125: scanning = 0
					// ;
					case 59 + offset:
						if (property > 0 && ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) - length))
							(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(property > 32 ? declaration(characters + ';', rule, parent, length - 1) : declaration((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(characters, ' ', '') + ';', rule, parent, length - 2), declarations)
						break
					// @ ;
					case 59: characters += ';'
					// { rule/at-rule
					default:
						;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length), rulesets)

						if (character === 123)
							if (offset === 0)
								parse(characters, root, reference, reference, props, rulesets, length, points, children)
							else
								switch (atrule === 99 && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.charat)(characters, 3) === 110 ? 100 : atrule) {
									// d m s
									case 100: case 109: case 115:
										parse(value, reference, reference, rule && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.append)(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length), children), rules, children, length, points, rule ? props : children)
										break
									default:
										parse(characters, reference, reference, reference, [''], children, 0, points, children)
								}
				}

				index = offset = property = 0, variable = ampersand = 1, type = characters = '', length = pseudo
				break
			// :
			case 58:
				length = 1 + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters), property = previous
			default:
				if (variable < 1)
					if (character == 123)
						--variable
					else if (character == 125 && variable++ == 0 && (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.prev)() == 125)
						continue

				switch (characters += (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.from)(character), character * variable) {
					// &
					case 38:
						ampersand = offset > 0 ? 1 : (characters += '\f', -1)
						break
					// ,
					case 44:
						points[index++] = ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) - 1) * ampersand, ampersand = 1
						break
					// @
					case 64:
						// -
						if ((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.peek)() === 45)
							characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.delimit)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.next)())

						atrule = (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.peek)(), offset = length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(type = characters += (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.identifier)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.caret)())), character++
						break
					// -
					case 45:
						if (previous === 45 && (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.strlen)(characters) == 2)
							variable = 0
				}
		}

	return rulesets
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} index
 * @param {number} offset
 * @param {string[]} rules
 * @param {number[]} points
 * @param {string} type
 * @param {string[]} props
 * @param {string[]} children
 * @param {number} length
 * @return {object}
 */
function ruleset (value, root, parent, index, offset, rules, points, type, props, children, length) {
	var post = offset - 1
	var rule = offset === 0 ? rules : ['']
	var size = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.sizeof)(rule)

	for (var i = 0, j = 0, k = 0; i < index; ++i)
		for (var x = 0, y = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, post + 1, post = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.abs)(j = points[i])), z = value; x < size; ++x)
			if (z = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.trim)(j > 0 ? rule[x] + ' ' + y : (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.replace)(y, /&\f/g, rule[x])))
				props[k++] = z

	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.node)(value, root, parent, offset === 0 ? _Enum_js__WEBPACK_IMPORTED_MODULE_2__.RULESET : type, props, children, length)
}

/**
 * @param {number} value
 * @param {object} root
 * @param {object?} parent
 * @return {object}
 */
function comment (value, root, parent) {
	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.node)(value, root, parent, _Enum_js__WEBPACK_IMPORTED_MODULE_2__.COMMENT, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.from)((0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.char)()), (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, 2, -2), 0)
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} length
 * @return {object}
 */
function declaration (value, root, parent, length) {
	return (0,_Tokenizer_js__WEBPACK_IMPORTED_MODULE_0__.node)(value, root, parent, _Enum_js__WEBPACK_IMPORTED_MODULE_2__.DECLARATION, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, 0, length), (0,_Utility_js__WEBPACK_IMPORTED_MODULE_1__.substr)(value, length + 1, -1), length)
}


/***/ }),

/***/ "./node_modules/stylis/src/Prefixer.js":
/*!*********************************************!*\
  !*** ./node_modules/stylis/src/Prefixer.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "prefix": () => (/* binding */ prefix)
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");



/**
 * @param {string} value
 * @param {number} length
 * @param {object[]} children
 * @return {string}
 */
function prefix (value, length, children) {
	switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.hash)(value, length)) {
		// color-adjust
		case 5103:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'print-' + value + value
		// animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
		case 5737: case 4201: case 3177: case 3433: case 1641: case 4457: case 2921:
		// text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
		case 5572: case 6356: case 5844: case 3191: case 6645: case 3005:
		// mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
		case 6391: case 5879: case 5623: case 6135: case 4599: case 4855:
		// background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
		case 4215: case 6389: case 5109: case 5365: case 5621: case 3829:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + value
		// tab-size
		case 4789:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + value + value
		// appearance, user-select, transform, hyphens, text-size-adjust
		case 5349: case 4246: case 4810: case 6968: case 2756:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + value + value
		// writing-mode
		case 5936:
			switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 11)) {
				// vertical-l(r)
				case 114:
					return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /[svh]\w+-[tblr]{2}/, 'tb') + value
				// vertical-r(l)
				case 108:
					return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value
				// horizontal(-)tb
				case 45:
					return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /[svh]\w+-[tblr]{2}/, 'lr') + value
				// default: fallthrough to below
			}
		// flex, flex-direction, scroll-snap-type, writing-mode
		case 6828: case 4268: case 2903:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + value + value
		// order
		case 6165:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-' + value + value
		// align-items
		case 5187:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(\w+).+(:[^]+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-$1$2' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-$1$2') + value
		// align-self
		case 5443:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-item-' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /flex-|-self/g, '') + (!(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(value, /flex-|baseline/) ? _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'grid-row-' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /flex-|-self/g, '') : '') + value
		// align-content
		case 4675:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-line-pack' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /align-content|flex-|-self/g, '') + value
		// flex-shrink
		case 5548:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'shrink', 'negative') + value
		// flex-basis
		case 5292:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'basis', 'preferred-size') + value
		// flex-grow
		case 6060:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, '-grow', '') + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'grow', 'positive') + value
		// transition
		case 4554:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /([^-])(transform)/g, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2') + value
		// cursor
		case 6187:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(zoom-|grab)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1'), /(image-set)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1'), value, '') + value
		// background, background-image
		case 5495: case 3959:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(image-set\([^]*)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1' + '$`$1')
		// justify-content
		case 4968:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+:)(flex-)?(.*)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + 'box-pack:$3' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + value + value
		// justify-self
		case 4200:
			if (!(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(value, /flex-|baseline/)) return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'grid-column-align' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(value, length) + value
			break
		// grid-template-(columns|rows)
		case 2592: case 3360:
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'template-', '') + value
		// grid-(row|column)-start
		case 4384: case 3616:
			if (children && children.some(function (element, index) { return length = index, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(element.props, /grid-\w+-end/) })) {
				return ~(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.indexof)(value + (children = children[length].value), 'span') ? value : (_Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, '-start', '') + value + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + 'grid-row-span:' + (~(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.indexof)(children, 'span') ? (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(children, /\d+/) : +(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(children, /\d+/) - +(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(value, /\d+/)) + ';')
			}
			return _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, '-start', '') + value
		// grid-(row|column)-end
		case 4896: case 4128:
			return (children && children.some(function (element) { return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.match)(element.props, /grid-\w+-start/) })) ? value : _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, '-end', '-span'), 'span ', '') + value
		// (margin|padding)-inline-(start|end)
		case 4095: case 3583: case 4068: case 2532:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+)-inline(.+)/, _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$1$2') + value
		// (min|max)?(width|height|inline-size|block-size)
		case 8116: case 7059: case 5753: case 5535:
		case 5445: case 5701: case 4933: case 4677:
		case 5533: case 5789: case 5021: case 4765:
			// stretch, max-content, min-content, fill-available
			if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(value) - 1 - length > 6)
				switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 1)) {
					// (m)ax-content, (m)in-content
					case 109:
						// -
						if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 4) !== 45)
							break
					// (f)ill-available, (f)it-content
					case 102:
						return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+:)(.+)-([^]+)/, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2-$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MOZ + ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 3) == 108 ? '$3' : '$2-$3')) + value
					// (s)tretch
					case 115:
						return ~(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.indexof)(value, 'stretch') ? prefix((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'stretch', 'fill-available'), length, children) + value : value
				}
			break
		// grid-(column|row)
		case 5152: case 5920:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function (_, a, b, c, d, e, f) { return (_Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + a + ':' + b + f) + (c ? (_Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + a + '-span:' + (d ? e : +e - +b)) + f : '') + value })
		// position: sticky
		case 4949:
			// stick(y)?
			if ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, length + 6) === 121)
				return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, ':', ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT) + value
			break
		// display: (flex|inline-flex|grid|inline-grid)
		case 6444:
			switch ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, 14) === 45 ? 18 : 11)) {
				// (inline-)?fle(x)
				case 120:
					return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + ((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.WEBKIT + '$2$3' + '$1' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS + '$2box$3') + value
				// (inline-)?gri(d)
				case 100:
					return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, ':', ':' + _Enum_js__WEBPACK_IMPORTED_MODULE_1__.MS) + value
			}
			break
		// scroll-margin, scroll-margin-(top|right|bottom|left)
		case 5719: case 2647: case 2135: case 3927: case 2391:
			return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.replace)(value, 'scroll-', 'scroll-snap-') + value
	}

	return value
}


/***/ }),

/***/ "./node_modules/stylis/src/Serializer.js":
/*!***********************************************!*\
  !*** ./node_modules/stylis/src/Serializer.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "serialize": () => (/* binding */ serialize),
/* harmony export */   "stringify": () => (/* binding */ stringify)
/* harmony export */ });
/* harmony import */ var _Enum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum.js */ "./node_modules/stylis/src/Enum.js");
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");



/**
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function serialize (children, callback) {
	var output = ''
	var length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.sizeof)(children)

	for (var i = 0; i < length; i++)
		output += callback(children[i], i, children, callback) || ''

	return output
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function stringify (element, index, children, callback) {
	switch (element.type) {
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.IMPORT: case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.DECLARATION: return element.return = element.return || element.value
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.COMMENT: return ''
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.KEYFRAMES: return element.return = element.value + '{' + serialize(element.children, callback) + '}'
		case _Enum_js__WEBPACK_IMPORTED_MODULE_1__.RULESET: element.value = element.props.join(',')
	}

	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(children = serialize(element.children, callback)) ? element.return = element.value + '{' + children + '}' : ''
}


/***/ }),

/***/ "./node_modules/stylis/src/Tokenizer.js":
/*!**********************************************!*\
  !*** ./node_modules/stylis/src/Tokenizer.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "alloc": () => (/* binding */ alloc),
/* harmony export */   "caret": () => (/* binding */ caret),
/* harmony export */   "char": () => (/* binding */ char),
/* harmony export */   "character": () => (/* binding */ character),
/* harmony export */   "characters": () => (/* binding */ characters),
/* harmony export */   "column": () => (/* binding */ column),
/* harmony export */   "commenter": () => (/* binding */ commenter),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "dealloc": () => (/* binding */ dealloc),
/* harmony export */   "delimit": () => (/* binding */ delimit),
/* harmony export */   "delimiter": () => (/* binding */ delimiter),
/* harmony export */   "escaping": () => (/* binding */ escaping),
/* harmony export */   "identifier": () => (/* binding */ identifier),
/* harmony export */   "length": () => (/* binding */ length),
/* harmony export */   "line": () => (/* binding */ line),
/* harmony export */   "next": () => (/* binding */ next),
/* harmony export */   "node": () => (/* binding */ node),
/* harmony export */   "peek": () => (/* binding */ peek),
/* harmony export */   "position": () => (/* binding */ position),
/* harmony export */   "prev": () => (/* binding */ prev),
/* harmony export */   "slice": () => (/* binding */ slice),
/* harmony export */   "token": () => (/* binding */ token),
/* harmony export */   "tokenize": () => (/* binding */ tokenize),
/* harmony export */   "tokenizer": () => (/* binding */ tokenizer),
/* harmony export */   "whitespace": () => (/* binding */ whitespace)
/* harmony export */ });
/* harmony import */ var _Utility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility.js */ "./node_modules/stylis/src/Utility.js");


var line = 1
var column = 1
var length = 0
var position = 0
var character = 0
var characters = ''

/**
 * @param {string} value
 * @param {object | null} root
 * @param {object | null} parent
 * @param {string} type
 * @param {string[] | string} props
 * @param {object[] | string} children
 * @param {number} length
 */
function node (value, root, parent, type, props, children, length) {
	return {value: value, root: root, parent: parent, type: type, props: props, children: children, line: line, column: column, length: length, return: ''}
}

/**
 * @param {object} root
 * @param {object} props
 * @return {object}
 */
function copy (root, props) {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.assign)(node('', null, null, '', null, null, 0), root, {length: -root.length}, props)
}

/**
 * @return {number}
 */
function char () {
	return character
}

/**
 * @return {number}
 */
function prev () {
	character = position > 0 ? (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, --position) : 0

	if (column--, character === 10)
		column = 1, line--

	return character
}

/**
 * @return {number}
 */
function next () {
	character = position < length ? (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, position++) : 0

	if (column++, character === 10)
		column = 1, line++

	return character
}

/**
 * @return {number}
 */
function peek () {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.charat)(characters, position)
}

/**
 * @return {number}
 */
function caret () {
	return position
}

/**
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function slice (begin, end) {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.substr)(characters, begin, end)
}

/**
 * @param {number} type
 * @return {number}
 */
function token (type) {
	switch (type) {
		// \0 \t \n \r \s whitespace token
		case 0: case 9: case 10: case 13: case 32:
			return 5
		// ! + , / > @ ~ isolate token
		case 33: case 43: case 44: case 47: case 62: case 64: case 126:
		// ; { } breakpoint token
		case 59: case 123: case 125:
			return 4
		// : accompanied token
		case 58:
			return 3
		// " ' ( [ opening delimit token
		case 34: case 39: case 40: case 91:
			return 2
		// ) ] closing delimit token
		case 41: case 93:
			return 1
	}

	return 0
}

/**
 * @param {string} value
 * @return {any[]}
 */
function alloc (value) {
	return line = column = 1, length = (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.strlen)(characters = value), position = 0, []
}

/**
 * @param {any} value
 * @return {any}
 */
function dealloc (value) {
	return characters = '', value
}

/**
 * @param {number} type
 * @return {string}
 */
function delimit (type) {
	return (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.trim)(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)))
}

/**
 * @param {string} value
 * @return {string[]}
 */
function tokenize (value) {
	return dealloc(tokenizer(alloc(value)))
}

/**
 * @param {number} type
 * @return {string}
 */
function whitespace (type) {
	while (character = peek())
		if (character < 33)
			next()
		else
			break

	return token(type) > 2 || token(character) > 3 ? '' : ' '
}

/**
 * @param {string[]} children
 * @return {string[]}
 */
function tokenizer (children) {
	while (next())
		switch (token(character)) {
			case 0: (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)(identifier(position - 1), children)
				break
			case 2: ;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)(delimit(character), children)
				break
			default: ;(0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.append)((0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.from)(character), children)
		}

	return children
}

/**
 * @param {number} index
 * @param {number} count
 * @return {string}
 */
function escaping (index, count) {
	while (--count && next())
		// not 0-9 A-F a-f
		if (character < 48 || character > 102 || (character > 57 && character < 65) || (character > 70 && character < 97))
			break

	return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32))
}

/**
 * @param {number} type
 * @return {number}
 */
function delimiter (type) {
	while (next())
		switch (character) {
			// ] ) " '
			case type:
				return position
			// " '
			case 34: case 39:
				if (type !== 34 && type !== 39)
					delimiter(character)
				break
			// (
			case 40:
				if (type === 41)
					delimiter(type)
				break
			// \
			case 92:
				next()
				break
		}

	return position
}

/**
 * @param {number} type
 * @param {number} index
 * @return {number}
 */
function commenter (type, index) {
	while (next())
		// //
		if (type + character === 47 + 10)
			break
		// /*
		else if (type + character === 42 + 42 && peek() === 47)
			break

	return '/*' + slice(index, position - 1) + '*' + (0,_Utility_js__WEBPACK_IMPORTED_MODULE_0__.from)(type === 47 ? type : next())
}

/**
 * @param {number} index
 * @return {string}
 */
function identifier (index) {
	while (!token(peek()))
		next()

	return slice(index, position)
}


/***/ }),

/***/ "./node_modules/stylis/src/Utility.js":
/*!********************************************!*\
  !*** ./node_modules/stylis/src/Utility.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "abs": () => (/* binding */ abs),
/* harmony export */   "append": () => (/* binding */ append),
/* harmony export */   "assign": () => (/* binding */ assign),
/* harmony export */   "charat": () => (/* binding */ charat),
/* harmony export */   "combine": () => (/* binding */ combine),
/* harmony export */   "from": () => (/* binding */ from),
/* harmony export */   "hash": () => (/* binding */ hash),
/* harmony export */   "indexof": () => (/* binding */ indexof),
/* harmony export */   "match": () => (/* binding */ match),
/* harmony export */   "replace": () => (/* binding */ replace),
/* harmony export */   "sizeof": () => (/* binding */ sizeof),
/* harmony export */   "strlen": () => (/* binding */ strlen),
/* harmony export */   "substr": () => (/* binding */ substr),
/* harmony export */   "trim": () => (/* binding */ trim)
/* harmony export */ });
/**
 * @param {number}
 * @return {number}
 */
var abs = Math.abs

/**
 * @param {number}
 * @return {string}
 */
var from = String.fromCharCode

/**
 * @param {object}
 * @return {object}
 */
var assign = Object.assign

/**
 * @param {string} value
 * @param {number} length
 * @return {number}
 */
function hash (value, length) {
	return charat(value, 0) ^ 45 ? (((((((length << 2) ^ charat(value, 0)) << 2) ^ charat(value, 1)) << 2) ^ charat(value, 2)) << 2) ^ charat(value, 3) : 0
}

/**
 * @param {string} value
 * @return {string}
 */
function trim (value) {
	return value.trim()
}

/**
 * @param {string} value
 * @param {RegExp} pattern
 * @return {string?}
 */
function match (value, pattern) {
	return (value = pattern.exec(value)) ? value[0] : value
}

/**
 * @param {string} value
 * @param {(string|RegExp)} pattern
 * @param {string} replacement
 * @return {string}
 */
function replace (value, pattern, replacement) {
	return value.replace(pattern, replacement)
}

/**
 * @param {string} value
 * @param {string} search
 * @return {number}
 */
function indexof (value, search) {
	return value.indexOf(search)
}

/**
 * @param {string} value
 * @param {number} index
 * @return {number}
 */
function charat (value, index) {
	return value.charCodeAt(index) | 0
}

/**
 * @param {string} value
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function substr (value, begin, end) {
	return value.slice(begin, end)
}

/**
 * @param {string} value
 * @return {number}
 */
function strlen (value) {
	return value.length
}

/**
 * @param {any[]} value
 * @return {number}
 */
function sizeof (value) {
	return value.length
}

/**
 * @param {any} value
 * @param {any[]} array
 * @return {any}
 */
function append (value, array) {
	return array.push(value), value
}

/**
 * @param {string[]} array
 * @param {function} callback
 * @return {string}
 */
function combine (array, callback) {
	return array.map(callback).join('')
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_page_store_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pages/page-store/__store */ "./src/pages/page-store/__store.jsx");

// import 'josh2/page-store/__store';
})();

/******/ })()
;
//# sourceMappingURL=index.js.map