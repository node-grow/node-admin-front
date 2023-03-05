(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["PermissionTransfer"] = factory();
	else
		root["PermissionTransfer"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 9662:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);
var tryToString = __webpack_require__(6330);

var TypeError = global.TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 6077:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);

var String = global.String;
var TypeError = global.TypeError;

module.exports = function (argument) {
  if (typeof argument == 'object' || isCallable(argument)) return argument;
  throw TypeError("Can't set " + String(argument) + ' as a prototype');
};


/***/ }),

/***/ 1223:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(5112);
var create = __webpack_require__(30);
var defineProperty = (__webpack_require__(3070).f);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  defineProperty(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ 9670:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);

var String = global.String;
var TypeError = global.TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw TypeError(String(argument) + ' is not an object');
};


/***/ }),

/***/ 1318:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(5656);
var toAbsoluteIndex = __webpack_require__(1400);
var lengthOfArrayLike = __webpack_require__(6244);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 4326:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ 648:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var TO_STRING_TAG_SUPPORT = __webpack_require__(1694);
var isCallable = __webpack_require__(614);
var classofRaw = __webpack_require__(4326);
var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var Object = global.Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ 7741:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var $Error = Error;
var replace = uncurryThis(''.replace);

var TEST = (function (arg) { return String($Error(arg).stack); })('zxcasd');
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

module.exports = function (stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
    while (dropEntries--) stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  } return stack;
};


/***/ }),

/***/ 9920:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var hasOwn = __webpack_require__(2597);
var ownKeys = __webpack_require__(3887);
var getOwnPropertyDescriptorModule = __webpack_require__(1236);
var definePropertyModule = __webpack_require__(3070);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ 8880:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var definePropertyModule = __webpack_require__(3070);
var createPropertyDescriptor = __webpack_require__(9114);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 9114:
/***/ (function(module) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 8052:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);
var createNonEnumerableProperty = __webpack_require__(8880);
var makeBuiltIn = __webpack_require__(6339);
var defineGlobalProperty = __webpack_require__(3072);

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    if (!options.unsafe) delete O[key];
    else if (O[key]) simple = true;
    if (simple) O[key] = value;
    else createNonEnumerableProperty(O, key, value);
  } return O;
};


/***/ }),

/***/ 3072:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);

// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ 9781:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ 317:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 8113:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ 7392:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var userAgent = __webpack_require__(8113);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ 748:
/***/ (function(module) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 2914:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var createPropertyDescriptor = __webpack_require__(9114);

module.exports = !fails(function () {
  var error = Error('a');
  if (!('stack' in error)) return true;
  // eslint-disable-next-line es-x/no-object-defineproperty -- safe
  Object.defineProperty(error, 'stack', createPropertyDescriptor(1, 7));
  return error.stack !== 7;
});


/***/ }),

/***/ 2109:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var getOwnPropertyDescriptor = (__webpack_require__(1236).f);
var createNonEnumerableProperty = __webpack_require__(8880);
var defineBuiltIn = __webpack_require__(8052);
var defineGlobalProperty = __webpack_require__(3072);
var copyConstructorProperties = __webpack_require__(9920);
var isForced = __webpack_require__(4705);

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 7293:
/***/ (function(module) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 2104:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(4374);

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es-x/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ }),

/***/ 4374:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);

module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ 6916:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(4374);

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 6530:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var hasOwn = __webpack_require__(2597);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 1702:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(4374);

var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var uncurryThis = NATIVE_BIND && bind.bind(call, call);

module.exports = NATIVE_BIND ? function (fn) {
  return fn && uncurryThis(fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 5005:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 8173:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var aCallable = __webpack_require__(9662);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};


/***/ }),

/***/ 7854:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es-x/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ 2597:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var toObject = __webpack_require__(7908);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es-x/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ 3501:
/***/ (function(module) {

module.exports = {};


/***/ }),

/***/ 490:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ 4664:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);
var createElement = __webpack_require__(317);

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ 8361:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var uncurryThis = __webpack_require__(1702);
var fails = __webpack_require__(7293);
var classof = __webpack_require__(4326);

var Object = global.Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : Object(it);
} : Object;


/***/ }),

/***/ 9587:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);
var setPrototypeOf = __webpack_require__(7674);

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ 2788:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var isCallable = __webpack_require__(614);
var store = __webpack_require__(5465);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 8340:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(111);
var createNonEnumerableProperty = __webpack_require__(8880);

// `InstallErrorCause` abstract operation
// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
module.exports = function (O, options) {
  if (isObject(options) && 'cause' in options) {
    createNonEnumerableProperty(O, 'cause', options.cause);
  }
};


/***/ }),

/***/ 9909:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(8536);
var global = __webpack_require__(7854);
var uncurryThis = __webpack_require__(1702);
var isObject = __webpack_require__(111);
var createNonEnumerableProperty = __webpack_require__(8880);
var hasOwn = __webpack_require__(2597);
var shared = __webpack_require__(5465);
var sharedKey = __webpack_require__(6200);
var hiddenKeys = __webpack_require__(3501);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);
  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 614:
/***/ (function(module) {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ 4705:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 111:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 1913:
/***/ (function(module) {

module.exports = false;


/***/ }),

/***/ 2190:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var getBuiltIn = __webpack_require__(5005);
var isCallable = __webpack_require__(614);
var isPrototypeOf = __webpack_require__(7976);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var Object = global.Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, Object(it));
};


/***/ }),

/***/ 6244:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toLength = __webpack_require__(7466);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ 6339:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);
var hasOwn = __webpack_require__(2597);
var DESCRIPTORS = __webpack_require__(9781);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(6530).CONFIGURABLE);
var inspectSource = __webpack_require__(2788);
var InternalStateModule = __webpack_require__(9909);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (String(name).slice(0, 7) === 'Symbol(') {
    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    defineProperty(value, 'name', { value: name, configurable: true });
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),

/***/ 4758:
/***/ (function(module) {

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es-x/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ 133:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es-x/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(7392);
var fails = __webpack_require__(7293);

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 8536:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);
var inspectSource = __webpack_require__(2788);

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ 6277:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toString = __webpack_require__(1340);

module.exports = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString(argument);
};


/***/ }),

/***/ 30:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(9670);
var definePropertiesModule = __webpack_require__(6048);
var enumBugKeys = __webpack_require__(748);
var hiddenKeys = __webpack_require__(3501);
var html = __webpack_require__(490);
var documentCreateElement = __webpack_require__(317);
var sharedKey = __webpack_require__(6200);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es-x/no-object-create -- safe
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};


/***/ }),

/***/ 6048:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(3353);
var definePropertyModule = __webpack_require__(3070);
var anObject = __webpack_require__(9670);
var toIndexedObject = __webpack_require__(5656);
var objectKeys = __webpack_require__(1956);

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es-x/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};


/***/ }),

/***/ 3070:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var global = __webpack_require__(7854);
var DESCRIPTORS = __webpack_require__(9781);
var IE8_DOM_DEFINE = __webpack_require__(4664);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(3353);
var anObject = __webpack_require__(9670);
var toPropertyKey = __webpack_require__(4948);

var TypeError = global.TypeError;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 1236:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var call = __webpack_require__(6916);
var propertyIsEnumerableModule = __webpack_require__(5296);
var createPropertyDescriptor = __webpack_require__(9114);
var toIndexedObject = __webpack_require__(5656);
var toPropertyKey = __webpack_require__(4948);
var hasOwn = __webpack_require__(2597);
var IE8_DOM_DEFINE = __webpack_require__(4664);

// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ 8006:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(6324);
var enumBugKeys = __webpack_require__(748);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es-x/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 5181:
/***/ (function(__unused_webpack_module, exports) {

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 7976:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 6324:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var hasOwn = __webpack_require__(2597);
var toIndexedObject = __webpack_require__(5656);
var indexOf = (__webpack_require__(1318).indexOf);
var hiddenKeys = __webpack_require__(3501);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ 1956:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(6324);
var enumBugKeys = __webpack_require__(748);

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es-x/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ 5296:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 7674:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable no-proto -- safe */
var uncurryThis = __webpack_require__(1702);
var anObject = __webpack_require__(9670);
var aPossiblePrototype = __webpack_require__(6077);

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es-x/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
    setter = uncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ 2140:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var call = __webpack_require__(6916);
var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);

var TypeError = global.TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 3887:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);
var uncurryThis = __webpack_require__(1702);
var getOwnPropertyNamesModule = __webpack_require__(8006);
var getOwnPropertySymbolsModule = __webpack_require__(5181);
var anObject = __webpack_require__(9670);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 2626:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var defineProperty = (__webpack_require__(3070).f);

module.exports = function (Target, Source, key) {
  key in Target || defineProperty(Target, key, {
    configurable: true,
    get: function () { return Source[key]; },
    set: function (it) { Source[key] = it; }
  });
};


/***/ }),

/***/ 4488:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);

var TypeError = global.TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 6200:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var shared = __webpack_require__(2309);
var uid = __webpack_require__(9711);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 5465:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var defineGlobalProperty = __webpack_require__(3072);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || defineGlobalProperty(SHARED, {});

module.exports = store;


/***/ }),

/***/ 2309:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var IS_PURE = __webpack_require__(1913);
var store = __webpack_require__(5465);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.22.7',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.22.7/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ 1400:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(9303);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 5656:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(8361);
var requireObjectCoercible = __webpack_require__(4488);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 9303:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var trunc = __webpack_require__(4758);

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ 7466:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(9303);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 7908:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var requireObjectCoercible = __webpack_require__(4488);

var Object = global.Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 7593:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var call = __webpack_require__(6916);
var isObject = __webpack_require__(111);
var isSymbol = __webpack_require__(2190);
var getMethod = __webpack_require__(8173);
var ordinaryToPrimitive = __webpack_require__(2140);
var wellKnownSymbol = __webpack_require__(5112);

var TypeError = global.TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 4948:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toPrimitive = __webpack_require__(7593);
var isSymbol = __webpack_require__(2190);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ 1694:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ 1340:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var classof = __webpack_require__(648);

var String = global.String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return String(argument);
};


/***/ }),

/***/ 6330:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);

var String = global.String;

module.exports = function (argument) {
  try {
    return String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 9711:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 3307:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es-x/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(133);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 3353:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});


/***/ }),

/***/ 5112:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var shared = __webpack_require__(2309);
var hasOwn = __webpack_require__(2597);
var uid = __webpack_require__(9711);
var NATIVE_SYMBOL = __webpack_require__(133);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 9191:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(5005);
var hasOwn = __webpack_require__(2597);
var createNonEnumerableProperty = __webpack_require__(8880);
var isPrototypeOf = __webpack_require__(7976);
var setPrototypeOf = __webpack_require__(7674);
var copyConstructorProperties = __webpack_require__(9920);
var proxyAccessor = __webpack_require__(2626);
var inheritIfRequired = __webpack_require__(9587);
var normalizeStringArgument = __webpack_require__(6277);
var installErrorCause = __webpack_require__(8340);
var clearErrorStack = __webpack_require__(7741);
var ERROR_STACK_INSTALLABLE = __webpack_require__(2914);
var DESCRIPTORS = __webpack_require__(9781);
var IS_PURE = __webpack_require__(1913);

module.exports = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
  var STACK_TRACE_LIMIT = 'stackTraceLimit';
  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
  var path = FULL_NAME.split('.');
  var ERROR_NAME = path[path.length - 1];
  var OriginalError = getBuiltIn.apply(null, path);

  if (!OriginalError) return;

  var OriginalErrorPrototype = OriginalError.prototype;

  // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
  if (!IS_PURE && hasOwn(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;

  if (!FORCED) return OriginalError;

  var BaseError = getBuiltIn('Error');

  var WrappedError = wrapper(function (a, b) {
    var message = normalizeStringArgument(IS_AGGREGATE_ERROR ? b : a, undefined);
    var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
    if (message !== undefined) createNonEnumerableProperty(result, 'message', message);
    if (ERROR_STACK_INSTALLABLE) createNonEnumerableProperty(result, 'stack', clearErrorStack(result.stack, 2));
    if (this && isPrototypeOf(OriginalErrorPrototype, this)) inheritIfRequired(result, this, WrappedError);
    if (arguments.length > OPTIONS_POSITION) installErrorCause(result, arguments[OPTIONS_POSITION]);
    return result;
  });

  WrappedError.prototype = OriginalErrorPrototype;

  if (ERROR_NAME !== 'Error') {
    if (setPrototypeOf) setPrototypeOf(WrappedError, BaseError);
    else copyConstructorProperties(WrappedError, BaseError, { name: true });
  } else if (DESCRIPTORS && STACK_TRACE_LIMIT in OriginalError) {
    proxyAccessor(WrappedError, OriginalError, STACK_TRACE_LIMIT);
    proxyAccessor(WrappedError, OriginalError, 'prepareStackTrace');
  }

  copyConstructorProperties(WrappedError, OriginalError);

  if (!IS_PURE) try {
    // Safari 13- bug: WebAssembly errors does not have a proper `.name`
    if (OriginalErrorPrototype.name !== ERROR_NAME) {
      createNonEnumerableProperty(OriginalErrorPrototype, 'name', ERROR_NAME);
    }
    OriginalErrorPrototype.constructor = WrappedError;
  } catch (error) { /* empty */ }

  return WrappedError;
};


/***/ }),

/***/ 6699:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var $includes = (__webpack_require__(1318).includes);
var fails = __webpack_require__(7293);
var addToUnscopables = __webpack_require__(1223);

// FF99+ bug
var BROKEN_ON_SPARSE = fails(function () {
  return !Array(1).includes();
});

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');


/***/ }),

/***/ 1703:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable no-unused-vars -- required for functions `.length` */
var $ = __webpack_require__(2109);
var global = __webpack_require__(7854);
var apply = __webpack_require__(2104);
var wrapErrorConstructorWithCause = __webpack_require__(9191);

var WEB_ASSEMBLY = 'WebAssembly';
var WebAssembly = global[WEB_ASSEMBLY];

var FORCED = Error('e', { cause: 7 }).cause !== 7;

var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  var O = {};
  O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED);
  $({ global: true, constructor: true, arity: 1, forced: FORCED }, O);
};

var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  if (WebAssembly && WebAssembly[ERROR_NAME]) {
    var O = {};
    O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED);
    $({ target: WEB_ASSEMBLY, stat: true, constructor: true, arity: 1, forced: FORCED }, O);
  }
};

// https://github.com/tc39/proposal-error-cause
exportGlobalErrorCauseWrapper('Error', function (init) {
  return function Error(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('EvalError', function (init) {
  return function EvalError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('RangeError', function (init) {
  return function RangeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('ReferenceError', function (init) {
  return function ReferenceError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('SyntaxError', function (init) {
  return function SyntaxError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('TypeError', function (init) {
  return function TypeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('URIError', function (init) {
  return function URIError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('CompileError', function (init) {
  return function CompileError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('LinkError', function (init) {
  return function LinkError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {
  return function RuntimeError(message) { return apply(init, this, arguments); };
});


/***/ }),

/***/ 5998:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8081);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".bg-red[data-v-446868fe]{background:red}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 3645:
/***/ (function(module) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ 8081:
/***/ (function(module) {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 1016:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(1703);

var _typeof = (__webpack_require__(5496)["default"]);

function _regeneratorRuntime() {
  "use strict";
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) {
            if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
          }

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {
        "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      }
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 5496:
/***/ (function(module) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}

module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 5108:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// TODO(Babel 8): Remove this file.
var runtime = __webpack_require__(1016)();

module.exports = runtime; // Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

/***/ }),

/***/ 7066:
/***/ (function(__unused_webpack_module, exports) {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = ({
  value: true
}); // runtime helper for setting properties on components
// in a tree-shakable way

exports.Z = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;

  for (const [key, val] of props) {
    target[key] = val;
  }

  return target;
};

/***/ }),

/***/ 8186:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5998);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(1122)/* ["default"] */ .Z)
var update = add("fde1b616", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 1122:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ addStylesClient; }
});

;// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles(parentId, list) {
  var styles = [];
  var newStyles = {};

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    };

    if (!newStyles[id]) {
      styles.push(newStyles[id] = {
        id: id,
        parts: [part]
      });
    } else {
      newStyles[id].parts.push(part);
    }
  }

  return styles;
}
;// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesClient.js
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
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
/******/ 			id: moduleId,
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
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "";
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ entry_lib; }
});

// NAMESPACE OBJECT: ./node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js
var runtime_dom_esm_bundler_namespaceObject = {};
__webpack_require__.r(runtime_dom_esm_bundler_namespaceObject);
__webpack_require__.d(runtime_dom_esm_bundler_namespaceObject, {
  "BaseTransition": function() { return BaseTransition; },
  "Comment": function() { return Comment; },
  "EffectScope": function() { return EffectScope; },
  "Fragment": function() { return runtime_core_esm_bundler_Fragment; },
  "KeepAlive": function() { return KeepAlive; },
  "ReactiveEffect": function() { return ReactiveEffect; },
  "Static": function() { return Static; },
  "Suspense": function() { return Suspense; },
  "Teleport": function() { return Teleport; },
  "Text": function() { return runtime_core_esm_bundler_Text; },
  "Transition": function() { return Transition; },
  "TransitionGroup": function() { return TransitionGroup; },
  "VueElement": function() { return VueElement; },
  "callWithAsyncErrorHandling": function() { return callWithAsyncErrorHandling; },
  "callWithErrorHandling": function() { return callWithErrorHandling; },
  "camelize": function() { return shared_esm_bundler_camelize; },
  "capitalize": function() { return shared_esm_bundler_capitalize; },
  "cloneVNode": function() { return cloneVNode; },
  "compatUtils": function() { return compatUtils; },
  "computed": function() { return runtime_core_esm_bundler_computed; },
  "createApp": function() { return createApp; },
  "createBlock": function() { return createBlock; },
  "createCommentVNode": function() { return createCommentVNode; },
  "createElementBlock": function() { return createElementBlock; },
  "createElementVNode": function() { return createBaseVNode; },
  "createHydrationRenderer": function() { return createHydrationRenderer; },
  "createPropsRestProxy": function() { return createPropsRestProxy; },
  "createRenderer": function() { return createRenderer; },
  "createSSRApp": function() { return createSSRApp; },
  "createSlots": function() { return createSlots; },
  "createStaticVNode": function() { return createStaticVNode; },
  "createTextVNode": function() { return createTextVNode; },
  "createVNode": function() { return createVNode; },
  "customRef": function() { return customRef; },
  "defineAsyncComponent": function() { return defineAsyncComponent; },
  "defineComponent": function() { return defineComponent; },
  "defineCustomElement": function() { return defineCustomElement; },
  "defineEmits": function() { return defineEmits; },
  "defineExpose": function() { return defineExpose; },
  "defineProps": function() { return defineProps; },
  "defineSSRCustomElement": function() { return defineSSRCustomElement; },
  "devtools": function() { return devtools; },
  "effect": function() { return effect; },
  "effectScope": function() { return effectScope; },
  "getCurrentInstance": function() { return getCurrentInstance; },
  "getCurrentScope": function() { return getCurrentScope; },
  "getTransitionRawChildren": function() { return getTransitionRawChildren; },
  "guardReactiveProps": function() { return guardReactiveProps; },
  "h": function() { return runtime_core_esm_bundler_h; },
  "handleError": function() { return handleError; },
  "hydrate": function() { return hydrate; },
  "initCustomFormatter": function() { return runtime_core_esm_bundler_initCustomFormatter; },
  "initDirectivesForSSR": function() { return initDirectivesForSSR; },
  "inject": function() { return runtime_core_esm_bundler_inject; },
  "isMemoSame": function() { return isMemoSame; },
  "isProxy": function() { return isProxy; },
  "isReactive": function() { return isReactive; },
  "isReadonly": function() { return isReadonly; },
  "isRef": function() { return isRef; },
  "isRuntimeOnly": function() { return runtime_core_esm_bundler_isRuntimeOnly; },
  "isShallow": function() { return isShallow; },
  "isVNode": function() { return runtime_core_esm_bundler_isVNode; },
  "markRaw": function() { return markRaw; },
  "mergeDefaults": function() { return mergeDefaults; },
  "mergeProps": function() { return mergeProps; },
  "nextTick": function() { return runtime_core_esm_bundler_nextTick; },
  "normalizeClass": function() { return normalizeClass; },
  "normalizeProps": function() { return normalizeProps; },
  "normalizeStyle": function() { return normalizeStyle; },
  "onActivated": function() { return onActivated; },
  "onBeforeMount": function() { return onBeforeMount; },
  "onBeforeUnmount": function() { return onBeforeUnmount; },
  "onBeforeUpdate": function() { return onBeforeUpdate; },
  "onDeactivated": function() { return onDeactivated; },
  "onErrorCaptured": function() { return onErrorCaptured; },
  "onMounted": function() { return onMounted; },
  "onRenderTracked": function() { return onRenderTracked; },
  "onRenderTriggered": function() { return onRenderTriggered; },
  "onScopeDispose": function() { return onScopeDispose; },
  "onServerPrefetch": function() { return onServerPrefetch; },
  "onUnmounted": function() { return onUnmounted; },
  "onUpdated": function() { return onUpdated; },
  "openBlock": function() { return openBlock; },
  "popScopeId": function() { return popScopeId; },
  "provide": function() { return provide; },
  "proxyRefs": function() { return proxyRefs; },
  "pushScopeId": function() { return pushScopeId; },
  "queuePostFlushCb": function() { return queuePostFlushCb; },
  "reactive": function() { return reactive; },
  "readonly": function() { return readonly; },
  "ref": function() { return ref; },
  "registerRuntimeCompiler": function() { return registerRuntimeCompiler; },
  "render": function() { return render; },
  "renderList": function() { return renderList; },
  "renderSlot": function() { return renderSlot; },
  "resolveComponent": function() { return resolveComponent; },
  "resolveDirective": function() { return resolveDirective; },
  "resolveDynamicComponent": function() { return resolveDynamicComponent; },
  "resolveFilter": function() { return resolveFilter; },
  "resolveTransitionHooks": function() { return resolveTransitionHooks; },
  "setBlockTracking": function() { return setBlockTracking; },
  "setDevtoolsHook": function() { return setDevtoolsHook; },
  "setTransitionHooks": function() { return setTransitionHooks; },
  "shallowReactive": function() { return shallowReactive; },
  "shallowReadonly": function() { return shallowReadonly; },
  "shallowRef": function() { return shallowRef; },
  "ssrContextKey": function() { return ssrContextKey; },
  "ssrUtils": function() { return ssrUtils; },
  "stop": function() { return stop; },
  "toDisplayString": function() { return toDisplayString; },
  "toHandlerKey": function() { return toHandlerKey; },
  "toHandlers": function() { return toHandlers; },
  "toRaw": function() { return reactivity_esm_bundler_toRaw; },
  "toRef": function() { return toRef; },
  "toRefs": function() { return toRefs; },
  "transformVNodeArgs": function() { return transformVNodeArgs; },
  "triggerRef": function() { return triggerRef; },
  "unref": function() { return reactivity_esm_bundler_unref; },
  "useAttrs": function() { return useAttrs; },
  "useCssModule": function() { return useCssModule; },
  "useCssVars": function() { return useCssVars; },
  "useSSRContext": function() { return useSSRContext; },
  "useSlots": function() { return useSlots; },
  "useTransitionState": function() { return useTransitionState; },
  "vModelCheckbox": function() { return vModelCheckbox; },
  "vModelDynamic": function() { return vModelDynamic; },
  "vModelRadio": function() { return vModelRadio; },
  "vModelSelect": function() { return vModelSelect; },
  "vModelText": function() { return vModelText; },
  "vShow": function() { return vShow; },
  "version": function() { return version; },
  "warn": function() { return runtime_core_esm_bundler_warn; },
  "watch": function() { return watch; },
  "watchEffect": function() { return watchEffect; },
  "watchPostEffect": function() { return watchPostEffect; },
  "watchSyncEffect": function() { return watchSyncEffect; },
  "withAsyncContext": function() { return withAsyncContext; },
  "withCtx": function() { return withCtx; },
  "withDefaults": function() { return withDefaults; },
  "withDirectives": function() { return withDirectives; },
  "withKeys": function() { return withKeys; },
  "withMemo": function() { return withMemo; },
  "withModifiers": function() { return withModifiers; },
  "withScopeId": function() { return withScopeId; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
/* eslint-disable no-var */
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js


function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
function extends_extends() {
  extends_extends = Object.assign ? Object.assign.bind() : function (target) {
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
  return extends_extends.apply(this, arguments);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
function typeof_typeof(obj) {
  "@babel/helpers - typeof";

  return typeof_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, typeof_typeof(obj);
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__(6699);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.error.cause.js
var es_error_cause = __webpack_require__(1703);
;// CONCATENATED MODULE: ./node_modules/@vue/shared/dist/shared.esm-bundler.js
/**
 * Make a map and return a function for checking if a key
 * is in that map.
 * IMPORTANT: all calls of this function must be prefixed with
 * \/\*#\_\_PURE\_\_\*\/
 * So that rollup can tree-shake them if necessary.
 */
function shared_esm_bundler_makeMap(str, expectsLowerCase) {
  const map = Object.create(null);
  const list = str.split(',');

  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }

  return expectsLowerCase ? val => !!map[val.toLowerCase()] : val => !!map[val];
}
/**
 * dev only flag -> name mapping
 */


const PatchFlagNames = {
  [1
  /* TEXT */
  ]: `TEXT`,
  [2
  /* CLASS */
  ]: `CLASS`,
  [4
  /* STYLE */
  ]: `STYLE`,
  [8
  /* PROPS */
  ]: `PROPS`,
  [16
  /* FULL_PROPS */
  ]: `FULL_PROPS`,
  [32
  /* HYDRATE_EVENTS */
  ]: `HYDRATE_EVENTS`,
  [64
  /* STABLE_FRAGMENT */
  ]: `STABLE_FRAGMENT`,
  [128
  /* KEYED_FRAGMENT */
  ]: `KEYED_FRAGMENT`,
  [256
  /* UNKEYED_FRAGMENT */
  ]: `UNKEYED_FRAGMENT`,
  [512
  /* NEED_PATCH */
  ]: `NEED_PATCH`,
  [1024
  /* DYNAMIC_SLOTS */
  ]: `DYNAMIC_SLOTS`,
  [2048
  /* DEV_ROOT_FRAGMENT */
  ]: `DEV_ROOT_FRAGMENT`,
  [-1
  /* HOISTED */
  ]: `HOISTED`,
  [-2
  /* BAIL */
  ]: `BAIL`
};
/**
 * Dev only
 */

const slotFlagsText = {
  [1
  /* STABLE */
  ]: 'STABLE',
  [2
  /* DYNAMIC */
  ]: 'DYNAMIC',
  [3
  /* FORWARDED */
  ]: 'FORWARDED'
};
const GLOBALS_WHITE_LISTED = 'Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,' + 'decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,' + 'Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt';
const isGloballyWhitelisted = /*#__PURE__*/shared_esm_bundler_makeMap(GLOBALS_WHITE_LISTED);
const range = 2;

function generateCodeFrame(source, start = 0, end = source.length) {
  // Split the content into individual lines but capture the newline sequence
  // that separated each line. This is important because the actual sequence is
  // needed to properly take into account the full line length for offset
  // comparison
  let lines = source.split(/(\r?\n)/); // Separate the lines and newline sequences into separate arrays for easier referencing

  const newlineSequences = lines.filter((_, idx) => idx % 2 === 1);
  lines = lines.filter((_, idx) => idx % 2 === 0);
  let count = 0;
  const res = [];

  for (let i = 0; i < lines.length; i++) {
    count += lines[i].length + (newlineSequences[i] && newlineSequences[i].length || 0);

    if (count >= start) {
      for (let j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length) continue;
        const line = j + 1;
        res.push(`${line}${' '.repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`);
        const lineLength = lines[j].length;
        const newLineSeqLength = newlineSequences[j] && newlineSequences[j].length || 0;

        if (j === i) {
          // push underline
          const pad = start - (count - (lineLength + newLineSeqLength));
          const length = Math.max(1, end > count ? lineLength - pad : end - start);
          res.push(`   |  ` + ' '.repeat(pad) + '^'.repeat(length));
        } else if (j > i) {
          if (end > count) {
            const length = Math.max(Math.min(end - count, lineLength), 1);
            res.push(`   |  ` + '^'.repeat(length));
          }

          count += lineLength + newLineSeqLength;
        }
      }

      break;
    }
  }

  return res.join('\n');
}
/**
 * On the client we only need to offer special cases for boolean attributes that
 * have different names from their corresponding dom properties:
 * - itemscope -> N/A
 * - allowfullscreen -> allowFullscreen
 * - formnovalidate -> formNoValidate
 * - ismap -> isMap
 * - nomodule -> noModule
 * - novalidate -> noValidate
 * - readonly -> readOnly
 */


const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /*#__PURE__*/shared_esm_bundler_makeMap(specialBooleanAttrs);
/**
 * The full list is needed during SSR to produce the correct initial markup.
 */

const isBooleanAttr = /*#__PURE__*/shared_esm_bundler_makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,` + `loop,open,required,reversed,scoped,seamless,` + `checked,muted,multiple,selected`);
/**
 * Boolean attributes should be included if the value is truthy or ''.
 * e.g. `<select multiple>` compiles to `{ multiple: '' }`
 */

function includeBooleanAttr(value) {
  return !!value || value === '';
}

const unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
const attrValidationCache = {};

function isSSRSafeAttrName(name) {
  if (attrValidationCache.hasOwnProperty(name)) {
    return attrValidationCache[name];
  }

  const isUnsafe = unsafeAttrCharRE.test(name);

  if (isUnsafe) {
    console.error(`unsafe attribute name: ${name}`);
  }

  return attrValidationCache[name] = !isUnsafe;
}

const propsToAttrMap = {
  acceptCharset: 'accept-charset',
  className: 'class',
  htmlFor: 'for',
  httpEquiv: 'http-equiv'
};
/**
 * CSS properties that accept plain numbers
 */

const isNoUnitNumericStyleProp = /*#__PURE__*/(/* unused pure expression or super */ null && (shared_esm_bundler_makeMap(`animation-iteration-count,border-image-outset,border-image-slice,` + `border-image-width,box-flex,box-flex-group,box-ordinal-group,column-count,` + `columns,flex,flex-grow,flex-positive,flex-shrink,flex-negative,flex-order,` + `grid-row,grid-row-end,grid-row-span,grid-row-start,grid-column,` + `grid-column-end,grid-column-span,grid-column-start,font-weight,line-clamp,` + `line-height,opacity,order,orphans,tab-size,widows,z-index,zoom,` + // SVG
`fill-opacity,flood-opacity,stop-opacity,stroke-dasharray,stroke-dashoffset,` + `stroke-miterlimit,stroke-opacity,stroke-width`)));
/**
 * Known attributes, this is used for stringification of runtime static nodes
 * so that we don't stringify bindings that cannot be set from HTML.
 * Don't also forget to allow `data-*` and `aria-*`!
 * Generated from https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
 */

const isKnownHtmlAttr = /*#__PURE__*/(/* unused pure expression or super */ null && (shared_esm_bundler_makeMap(`accept,accept-charset,accesskey,action,align,allow,alt,async,` + `autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,` + `border,buffered,capture,challenge,charset,checked,cite,class,code,` + `codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,` + `coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,` + `disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,` + `formaction,formenctype,formmethod,formnovalidate,formtarget,headers,` + `height,hidden,high,href,hreflang,http-equiv,icon,id,importance,integrity,` + `ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,` + `manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,` + `open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,` + `referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,` + `selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,` + `start,step,style,summary,tabindex,target,title,translate,type,usemap,` + `value,width,wrap`)));
/**
 * Generated from https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute
 */

const isKnownSvgAttr = /*#__PURE__*/(/* unused pure expression or super */ null && (shared_esm_bundler_makeMap(`xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,` + `arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,` + `baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,` + `clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,` + `color-interpolation-filters,color-profile,color-rendering,` + `contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,` + `descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,` + `dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,` + `fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,` + `font-family,font-size,font-size-adjust,font-stretch,font-style,` + `font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,` + `glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,` + `gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,` + `horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,` + `k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,` + `lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,` + `marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,` + `mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,` + `name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,` + `overflow,overline-position,overline-thickness,panose-1,paint-order,path,` + `pathLength,patternContentUnits,patternTransform,patternUnits,ping,` + `pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,` + `preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,` + `rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,` + `restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,` + `specularConstant,specularExponent,speed,spreadMethod,startOffset,` + `stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,` + `strikethrough-position,strikethrough-thickness,string,stroke,` + `stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,` + `stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,` + `systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,` + `text-decoration,text-rendering,textLength,to,transform,transform-origin,` + `type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,` + `unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,` + `v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,` + `vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,` + `writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,` + `xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,` + `xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan`)));

function normalizeStyle(value) {
  if (shared_esm_bundler_isArray(value)) {
    const res = {};

    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = shared_esm_bundler_isString(item) ? parseStringStyle(item) : normalizeStyle(item);

      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }

    return res;
  } else if (shared_esm_bundler_isString(value)) {
    return value;
  } else if (shared_esm_bundler_isObject(value)) {
    return value;
  }
}

const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;

function parseStringStyle(cssText) {
  const ret = {};
  cssText.split(listDelimiterRE).forEach(item => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}

function stringifyStyle(styles) {
  let ret = '';

  if (!styles || shared_esm_bundler_isString(styles)) {
    return ret;
  }

  for (const key in styles) {
    const value = styles[key];
    const normalizedKey = key.startsWith(`--`) ? key : shared_esm_bundler_hyphenate(key);

    if (shared_esm_bundler_isString(value) || typeof value === 'number' && isNoUnitNumericStyleProp(normalizedKey)) {
      // only render valid values
      ret += `${normalizedKey}:${value};`;
    }
  }

  return ret;
}

function normalizeClass(value) {
  let res = '';

  if (shared_esm_bundler_isString(value)) {
    res = value;
  } else if (shared_esm_bundler_isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);

      if (normalized) {
        res += normalized + ' ';
      }
    }
  } else if (shared_esm_bundler_isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + ' ';
      }
    }
  }

  return res.trim();
}

function normalizeProps(props) {
  if (!props) return null;
  let {
    class: klass,
    style
  } = props;

  if (klass && !shared_esm_bundler_isString(klass)) {
    props.class = normalizeClass(klass);
  }

  if (style) {
    props.style = normalizeStyle(style);
  }

  return props;
} // These tag configs are shared between compiler-dom and runtime-dom, so they
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element


const HTML_TAGS = 'html,body,base,head,link,meta,style,title,address,article,aside,footer,' + 'header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,' + 'figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,' + 'data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,' + 'time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,' + 'canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,' + 'th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,' + 'option,output,progress,select,textarea,details,dialog,menu,' + 'summary,template,blockquote,iframe,tfoot'; // https://developer.mozilla.org/en-US/docs/Web/SVG/Element

const SVG_TAGS = 'svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,' + 'defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,' + 'feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,' + 'feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,' + 'feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,' + 'fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,' + 'foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,' + 'mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,' + 'polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,' + 'text,textPath,title,tspan,unknown,use,view';
const VOID_TAGS = 'area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr';
/**
 * Compiler only.
 * Do NOT use in runtime code paths unless behind `(process.env.NODE_ENV !== 'production')` flag.
 */

const shared_esm_bundler_isHTMLTag = /*#__PURE__*/shared_esm_bundler_makeMap(HTML_TAGS);
/**
 * Compiler only.
 * Do NOT use in runtime code paths unless behind `(process.env.NODE_ENV !== 'production')` flag.
 */

const shared_esm_bundler_isSVGTag = /*#__PURE__*/shared_esm_bundler_makeMap(SVG_TAGS);
/**
 * Compiler only.
 * Do NOT use in runtime code paths unless behind `(process.env.NODE_ENV !== 'production')` flag.
 */

const isVoidTag = /*#__PURE__*/shared_esm_bundler_makeMap(VOID_TAGS);
const escapeRE = /["'&<>]/;

function escapeHtml(string) {
  const str = '' + string;
  const match = escapeRE.exec(str);

  if (!match) {
    return str;
  }

  let html = '';
  let escaped;
  let index;
  let lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        // "
        escaped = '&quot;';
        break;

      case 38:
        // &
        escaped = '&amp;';
        break;

      case 39:
        // '
        escaped = '&#39;';
        break;

      case 60:
        // <
        escaped = '&lt;';
        break;

      case 62:
        // >
        escaped = '&gt;';
        break;

      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.slice(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escaped;
  }

  return lastIndex !== index ? html + str.slice(lastIndex, index) : html;
} // https://www.w3.org/TR/html52/syntax.html#comments


const commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;

function escapeHtmlComment(src) {
  return src.replace(commentStripRE, '');
}

function looseCompareArrays(a, b) {
  if (a.length !== b.length) return false;
  let equal = true;

  for (let i = 0; equal && i < a.length; i++) {
    equal = looseEqual(a[i], b[i]);
  }

  return equal;
}

function looseEqual(a, b) {
  if (a === b) return true;
  let aValidType = isDate(a);
  let bValidType = isDate(b);

  if (aValidType || bValidType) {
    return aValidType && bValidType ? a.getTime() === b.getTime() : false;
  }

  aValidType = isSymbol(a);
  bValidType = isSymbol(b);

  if (aValidType || bValidType) {
    return a === b;
  }

  aValidType = shared_esm_bundler_isArray(a);
  bValidType = shared_esm_bundler_isArray(b);

  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareArrays(a, b) : false;
  }

  aValidType = shared_esm_bundler_isObject(a);
  bValidType = shared_esm_bundler_isObject(b);

  if (aValidType || bValidType) {
    /* istanbul ignore if: this if will probably never be called */
    if (!aValidType || !bValidType) {
      return false;
    }

    const aKeysCount = Object.keys(a).length;
    const bKeysCount = Object.keys(b).length;

    if (aKeysCount !== bKeysCount) {
      return false;
    }

    for (const key in a) {
      const aHasKey = a.hasOwnProperty(key);
      const bHasKey = b.hasOwnProperty(key);

      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
        return false;
      }
    }
  }

  return String(a) === String(b);
}

function looseIndexOf(arr, val) {
  return arr.findIndex(item => looseEqual(item, val));
}
/**
 * For converting {{ interpolation }} values to displayed strings.
 * @private
 */


const toDisplayString = val => {
  return shared_esm_bundler_isString(val) ? val : val == null ? '' : shared_esm_bundler_isArray(val) || shared_esm_bundler_isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};

const replacer = (_key, val) => {
  // can't use isRef here since @vue/shared has no deps
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val]) => {
        entries[`${key} =>`] = val;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (shared_esm_bundler_isObject(val) && !shared_esm_bundler_isArray(val) && !shared_esm_bundler_isPlainObject(val)) {
    return String(val);
  }

  return val;
};

const EMPTY_OBJ =  false ? 0 : {};
const EMPTY_ARR =  false ? 0 : [];

const shared_esm_bundler_NOOP = () => {};
/**
 * Always return false.
 */


const shared_esm_bundler_NO = () => false;

const onRE = /^on[^a-z]/;

const shared_esm_bundler_isOn = key => onRE.test(key);

const isModelListener = key => key.startsWith('onUpdate:');

const shared_esm_bundler_extend = Object.assign;

const remove = (arr, el) => {
  const i = arr.indexOf(el);

  if (i > -1) {
    arr.splice(i, 1);
  }
};

const shared_esm_bundler_hasOwnProperty = Object.prototype.hasOwnProperty;

const shared_esm_bundler_hasOwn = (val, key) => shared_esm_bundler_hasOwnProperty.call(val, key);

const shared_esm_bundler_isArray = Array.isArray;

const isMap = val => toTypeString(val) === '[object Map]';

const isSet = val => toTypeString(val) === '[object Set]';

const isDate = val => toTypeString(val) === '[object Date]';

const isFunction = val => typeof val === 'function';

const shared_esm_bundler_isString = val => typeof val === 'string';

const isSymbol = val => typeof val === 'symbol';

const shared_esm_bundler_isObject = val => val !== null && typeof val === 'object';

const isPromise = val => {
  return shared_esm_bundler_isObject(val) && isFunction(val.then) && isFunction(val.catch);
};

const objectToString = Object.prototype.toString;

const toTypeString = value => objectToString.call(value);

const shared_esm_bundler_toRawType = value => {
  // extract "RawType" from strings like "[object RawType]"
  return toTypeString(value).slice(8, -1);
};

const shared_esm_bundler_isPlainObject = val => toTypeString(val) === '[object Object]';

const isIntegerKey = key => shared_esm_bundler_isString(key) && key !== 'NaN' && key[0] !== '-' && '' + parseInt(key, 10) === key;

const isReservedProp = /*#__PURE__*/shared_esm_bundler_makeMap( // the leading comma is intentional so empty string "" is also included
',key,ref,ref_for,ref_key,' + 'onVnodeBeforeMount,onVnodeMounted,' + 'onVnodeBeforeUpdate,onVnodeUpdated,' + 'onVnodeBeforeUnmount,onVnodeUnmounted');
const shared_esm_bundler_isBuiltInDirective = /*#__PURE__*/shared_esm_bundler_makeMap('bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo');

const cacheStringFunction = fn => {
  const cache = Object.create(null);
  return str => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};

const camelizeRE = /-(\w)/g;
/**
 * @private
 */

const shared_esm_bundler_camelize = cacheStringFunction(str => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '');
});
const hyphenateRE = /\B([A-Z])/g;
/**
 * @private
 */

const shared_esm_bundler_hyphenate = cacheStringFunction(str => str.replace(hyphenateRE, '-$1').toLowerCase());
/**
 * @private
 */

const shared_esm_bundler_capitalize = cacheStringFunction(str => str.charAt(0).toUpperCase() + str.slice(1));
/**
 * @private
 */

const toHandlerKey = cacheStringFunction(str => str ? `on${shared_esm_bundler_capitalize(str)}` : ``); // compare whether a value has changed, accounting for NaN.

const hasChanged = (value, oldValue) => !Object.is(value, oldValue);

const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};

const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};

const toNumber = val => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};

let _globalThis;

const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof __webpack_require__.g !== 'undefined' ? __webpack_require__.g : {});
};

const identRE = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;

function genPropsAccessExp(name) {
  return identRE.test(name) ? `__props.${name}` : `__props[${JSON.stringify(name)}]`;
}


;// CONCATENATED MODULE: ./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js


function reactivity_esm_bundler_warn(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}

let activeEffectScope;

class EffectScope {
  constructor(detached = false) {
    /**
     * @internal
     */
    this.active = true;
    /**
     * @internal
     */

    this.effects = [];
    /**
     * @internal
     */

    this.cleanups = [];

    if (!detached && activeEffectScope) {
      this.parent = activeEffectScope;
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }

  run(fn) {
    if (this.active) {
      const currentEffectScope = activeEffectScope;

      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else if (false) {}
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */


  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */


  off() {
    activeEffectScope = this.parent;
  }

  stop(fromParent) {
    if (this.active) {
      let i, l;

      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }

      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }

      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      } // nested scope, dereference from parent to avoid memory leaks


      if (this.parent && !fromParent) {
        // optimized O(1) removal
        const last = this.parent.scopes.pop();

        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }

      this.active = false;
    }
  }

}

function effectScope(detached) {
  return new EffectScope(detached);
}

function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}

function getCurrentScope() {
  return activeEffectScope;
}

function onScopeDispose(fn) {
  if (activeEffectScope) {
    activeEffectScope.cleanups.push(fn);
  } else if (false) {}
}

const createDep = effects => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};

const wasTracked = dep => (dep.w & trackOpBit) > 0;

const newTracked = dep => (dep.n & trackOpBit) > 0;

const initDepMarkers = ({
  deps
}) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit; // set was tracked
    }
  }
};

const finalizeDepMarkers = effect => {
  const {
    deps
  } = effect;

  if (deps.length) {
    let ptr = 0;

    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];

      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      } // clear bits


      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }

    deps.length = ptr;
  }
};

const targetMap = new WeakMap(); // The number of effects currently being tracked recursively.

let effectTrackDepth = 0;
let trackOpBit = 1;
/**
 * The bitwise track markers support at most 30 levels of recursion.
 * This value is chosen to enable modern JS engines to use a SMI on all platforms.
 * When recursion depth is greater, fall back to using a full cleanup.
 */

const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol( false ? 0 : '');
const MAP_KEY_ITERATE_KEY = Symbol( false ? 0 : '');

class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = undefined;
    recordEffectScope(this, scope);
  }

  run() {
    if (!this.active) {
      return this.fn();
    }

    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;

    while (parent) {
      if (parent === this) {
        return;
      }

      parent = parent.parent;
    }

    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;

      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }

      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }

      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = undefined;

      if (this.deferStop) {
        this.stop();
      }
    }
  }

  stop() {
    // stopped while running itself - defer the cleanup
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);

      if (this.onStop) {
        this.onStop();
      }

      this.active = false;
    }
  }

}

function cleanupEffect(effect) {
  const {
    deps
  } = effect;

  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
    }

    deps.length = 0;
  }
}

function effect(fn, options) {
  if (fn.effect) {
    fn = fn.effect.fn;
  }

  const _effect = new ReactiveEffect(fn);

  if (options) {
    shared_esm_bundler_extend(_effect, options);
    if (options.scope) recordEffectScope(_effect, options.scope);
  }

  if (!options || !options.lazy) {
    _effect.run();
  }

  const runner = _effect.run.bind(_effect);

  runner.effect = _effect;
  return runner;
}

function stop(runner) {
  runner.effect.stop();
}

let shouldTrack = true;
const trackStack = [];

function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}

function enableTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = true;
}

function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === undefined ? true : last;
}

function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);

    if (!depsMap) {
      targetMap.set(target, depsMap = new Map());
    }

    let dep = depsMap.get(key);

    if (!dep) {
      depsMap.set(key, dep = createDep());
    }

    const eventInfo =  false ? 0 : undefined;
    trackEffects(dep, eventInfo);
  }
}

function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack = false;

  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit; // set newly tracked

      shouldTrack = !wasTracked(dep);
    }
  } else {
    // Full cleanup mode.
    shouldTrack = !dep.has(activeEffect);
  }

  if (shouldTrack) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);

    if (false) {}
  }
}

function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);

  if (!depsMap) {
    // never been tracked
    return;
  }

  let deps = [];

  if (type === "clear"
  /* CLEAR */
  ) {
    // collection being cleared
    // trigger all effects for target
    deps = [...depsMap.values()];
  } else if (key === 'length' && shared_esm_bundler_isArray(target)) {
    depsMap.forEach((dep, key) => {
      if (key === 'length' || key >= newValue) {
        deps.push(dep);
      }
    });
  } else {
    // schedule runs for SET | ADD | DELETE
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    } // also run for iteration key on ADD | DELETE | Map.SET


    switch (type) {
      case "add"
      /* ADD */
      :
        if (!shared_esm_bundler_isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));

          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          // new index added to array -> length changes
          deps.push(depsMap.get('length'));
        }

        break;

      case "delete"
      /* DELETE */
      :
        if (!shared_esm_bundler_isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));

          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }

        break;

      case "set"
      /* SET */
      :
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }

        break;
    }
  }

  const eventInfo =  false ? 0 : undefined;

  if (deps.length === 1) {
    if (deps[0]) {
      if (false) {} else {
        triggerEffects(deps[0]);
      }
    }
  } else {
    const effects = [];

    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }

    if (false) {} else {
      triggerEffects(createDep(effects));
    }
  }
}

function triggerEffects(dep, debuggerEventExtraInfo) {
  // spread into array for stabilization
  const effects = shared_esm_bundler_isArray(dep) ? dep : [...dep];

  for (const effect of effects) {
    if (effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }

  for (const effect of effects) {
    if (!effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
}

function triggerEffect(effect, debuggerEventExtraInfo) {
  if (effect !== activeEffect || effect.allowRecurse) {
    if (false) {}

    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}

const isNonTrackableKeys = /*#__PURE__*/shared_esm_bundler_makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set( /*#__PURE__*/Object.getOwnPropertyNames(Symbol) // ios10.x Object.getOwnPropertyNames(Symbol) can enumerate 'arguments' and 'caller'
// but accessing them on Symbol leads to TypeError because Symbol is a strict mode
// function
.filter(key => key !== 'arguments' && key !== 'caller').map(key => Symbol[key]).filter(isSymbol));
const get = /*#__PURE__*/createGetter();
const shallowGet = /*#__PURE__*/createGetter(false, true);
const readonlyGet = /*#__PURE__*/createGetter(true);
const shallowReadonlyGet = /*#__PURE__*/createGetter(true, true);
const arrayInstrumentations = /*#__PURE__*/createArrayInstrumentations();

function createArrayInstrumentations() {
  const instrumentations = {};
  ['includes', 'indexOf', 'lastIndexOf'].forEach(key => {
    instrumentations[key] = function (...args) {
      const arr = reactivity_esm_bundler_toRaw(this);

      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get"
        /* GET */
        , i + '');
      } // we run the method using the original args first (which may be reactive)


      const res = arr[key](...args);

      if (res === -1 || res === false) {
        // if that didn't work, run it again using raw values.
        return arr[key](...args.map(reactivity_esm_bundler_toRaw));
      } else {
        return res;
      }
    };
  });
  ['push', 'pop', 'shift', 'unshift', 'splice'].forEach(key => {
    instrumentations[key] = function (...args) {
      pauseTracking();
      const res = reactivity_esm_bundler_toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}

function createGetter(isReadonly = false, shallow = false) {
  return function get(target, key, receiver) {
    if (key === "__v_isReactive"
    /* IS_REACTIVE */
    ) {
      return !isReadonly;
    } else if (key === "__v_isReadonly"
    /* IS_READONLY */
    ) {
      return isReadonly;
    } else if (key === "__v_isShallow"
    /* IS_SHALLOW */
    ) {
      return shallow;
    } else if (key === "__v_raw"
    /* RAW */
    && receiver === (isReadonly ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }

    const targetIsArray = shared_esm_bundler_isArray(target);

    if (!isReadonly && targetIsArray && shared_esm_bundler_hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }

    const res = Reflect.get(target, key, receiver);

    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }

    if (!isReadonly) {
      track(target, "get"
      /* GET */
      , key);
    }

    if (shallow) {
      return res;
    }

    if (isRef(res)) {
      // ref unwrapping - skip unwrap for Array + integer key.
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }

    if (shared_esm_bundler_isObject(res)) {
      // Convert returned value into a proxy as well. we do the isObject check
      // here to avoid invalid value warning. Also need to lazy access readonly
      // and reactive here to avoid circular dependency.
      return isReadonly ? readonly(res) : reactive(res);
    }

    return res;
  };
}

const set = /*#__PURE__*/createSetter();
const shallowSet = /*#__PURE__*/createSetter(true);

function createSetter(shallow = false) {
  return function set(target, key, value, receiver) {
    let oldValue = target[key];

    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }

    if (!shallow && !isReadonly(value)) {
      if (!isShallow(value)) {
        value = reactivity_esm_bundler_toRaw(value);
        oldValue = reactivity_esm_bundler_toRaw(oldValue);
      }

      if (!shared_esm_bundler_isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }

    const hadKey = shared_esm_bundler_isArray(target) && isIntegerKey(key) ? Number(key) < target.length : shared_esm_bundler_hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver); // don't trigger if target is something up in the prototype chain of original

    if (target === reactivity_esm_bundler_toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add"
        /* ADD */
        , key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set"
        /* SET */
        , key, value, oldValue);
      }
    }

    return result;
  };
}

function deleteProperty(target, key) {
  const hadKey = shared_esm_bundler_hasOwn(target, key);
  const oldValue = target[key];
  const result = Reflect.deleteProperty(target, key);

  if (result && hadKey) {
    trigger(target, "delete"
    /* DELETE */
    , key, undefined, oldValue);
  }

  return result;
}

function has(target, key) {
  const result = Reflect.has(target, key);

  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has"
    /* HAS */
    , key);
  }

  return result;
}

function reactivity_esm_bundler_ownKeys(target) {
  track(target, "iterate"
  /* ITERATE */
  , shared_esm_bundler_isArray(target) ? 'length' : ITERATE_KEY);
  return Reflect.ownKeys(target);
}

const mutableHandlers = {
  get,
  set,
  deleteProperty,
  has,
  ownKeys: reactivity_esm_bundler_ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,

  set(target, key) {
    if (false) {}

    return true;
  },

  deleteProperty(target, key) {
    if (false) {}

    return true;
  }

};
const shallowReactiveHandlers = /*#__PURE__*/shared_esm_bundler_extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
}); // Props handlers are special in the sense that it should not unwrap top-level
// refs (in order to allow refs to be explicitly passed down), but should
// retain the reactivity of the normal readonly object.

const shallowReadonlyHandlers = /*#__PURE__*/shared_esm_bundler_extend({}, readonlyHandlers, {
  get: shallowReadonlyGet
});

const toShallow = value => value;

const getProto = v => Reflect.getPrototypeOf(v);

function get$1(target, key, isReadonly = false, isShallow = false) {
  // #1772: readonly(reactive(Map)) should return readonly + reactive version
  // of the value
  target = target["__v_raw"
  /* RAW */
  ];
  const rawTarget = reactivity_esm_bundler_toRaw(target);
  const rawKey = reactivity_esm_bundler_toRaw(key);

  if (!isReadonly) {
    if (key !== rawKey) {
      track(rawTarget, "get"
      /* GET */
      , key);
    }

    track(rawTarget, "get"
    /* GET */
    , rawKey);
  }

  const {
    has
  } = getProto(rawTarget);
  const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;

  if (has.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    // #3602 readonly(reactive(Map))
    // ensure that the nested reactive `Map` can do tracking for itself
    target.get(key);
  }
}

function has$1(key, isReadonly = false) {
  const target = this["__v_raw"
  /* RAW */
  ];
  const rawTarget = reactivity_esm_bundler_toRaw(target);
  const rawKey = reactivity_esm_bundler_toRaw(key);

  if (!isReadonly) {
    if (key !== rawKey) {
      track(rawTarget, "has"
      /* HAS */
      , key);
    }

    track(rawTarget, "has"
    /* HAS */
    , rawKey);
  }

  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}

function size(target, isReadonly = false) {
  target = target["__v_raw"
  /* RAW */
  ];
  !isReadonly && track(reactivity_esm_bundler_toRaw(target), "iterate"
  /* ITERATE */
  , ITERATE_KEY);
  return Reflect.get(target, 'size', target);
}

function add(value) {
  value = reactivity_esm_bundler_toRaw(value);
  const target = reactivity_esm_bundler_toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);

  if (!hadKey) {
    target.add(value);
    trigger(target, "add"
    /* ADD */
    , value, value);
  }

  return this;
}

function set$1(key, value) {
  value = reactivity_esm_bundler_toRaw(value);
  const target = reactivity_esm_bundler_toRaw(this);
  const {
    has,
    get
  } = getProto(target);
  let hadKey = has.call(target, key);

  if (!hadKey) {
    key = reactivity_esm_bundler_toRaw(key);
    hadKey = has.call(target, key);
  } else if (false) {}

  const oldValue = get.call(target, key);
  target.set(key, value);

  if (!hadKey) {
    trigger(target, "add"
    /* ADD */
    , key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set"
    /* SET */
    , key, value, oldValue);
  }

  return this;
}

function deleteEntry(key) {
  const target = reactivity_esm_bundler_toRaw(this);
  const {
    has,
    get
  } = getProto(target);
  let hadKey = has.call(target, key);

  if (!hadKey) {
    key = reactivity_esm_bundler_toRaw(key);
    hadKey = has.call(target, key);
  } else if (false) {}

  const oldValue = get ? get.call(target, key) : undefined; // forward the operation before queueing reactions

  const result = target.delete(key);

  if (hadKey) {
    trigger(target, "delete"
    /* DELETE */
    , key, undefined, oldValue);
  }

  return result;
}

function clear() {
  const target = reactivity_esm_bundler_toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget =  false ? 0 : undefined; // forward the operation before queueing reactions

  const result = target.clear();

  if (hadItems) {
    trigger(target, "clear"
    /* CLEAR */
    , undefined, undefined, oldTarget);
  }

  return result;
}

function createForEach(isReadonly, isShallow) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"
    /* RAW */
    ];
    const rawTarget = reactivity_esm_bundler_toRaw(target);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    !isReadonly && track(rawTarget, "iterate"
    /* ITERATE */
    , ITERATE_KEY);
    return target.forEach((value, key) => {
      // important: make sure the callback is
      // 1. invoked with the reactive map as `this` and 3rd arg
      // 2. the value received should be a corresponding reactive/readonly.
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}

function createIterableMethod(method, isReadonly, isShallow) {
  return function (...args) {
    const target = this["__v_raw"
    /* RAW */
    ];
    const rawTarget = reactivity_esm_bundler_toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === 'entries' || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === 'keys' && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    !isReadonly && track(rawTarget, "iterate"
    /* ITERATE */
    , isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY); // return a wrapped iterator which returns observed versions of the
    // values emitted from the real iterator

    return {
      // iterator protocol
      next() {
        const {
          value,
          done
        } = innerIterator.next();
        return done ? {
          value,
          done
        } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },

      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }

    };
  };
}

function createReadonlyMethod(type) {
  return function (...args) {
    if (false) {}

    return type === "delete"
    /* DELETE */
    ? false : this;
  };
}

function createInstrumentations() {
  const mutableInstrumentations = {
    get(key) {
      return get$1(this, key);
    },

    get size() {
      return size(this);
    },

    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations = {
    get(key) {
      return get$1(this, key, false, true);
    },

    get size() {
      return size(this);
    },

    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations = {
    get(key) {
      return get$1(this, key, true);
    },

    get size() {
      return size(this, true);
    },

    has(key) {
      return has$1.call(this, key, true);
    },

    add: createReadonlyMethod("add"
    /* ADD */
    ),
    set: createReadonlyMethod("set"
    /* SET */
    ),
    delete: createReadonlyMethod("delete"
    /* DELETE */
    ),
    clear: createReadonlyMethod("clear"
    /* CLEAR */
    ),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations = {
    get(key) {
      return get$1(this, key, true, true);
    },

    get size() {
      return size(this, true);
    },

    has(key) {
      return has$1.call(this, key, true);
    },

    add: createReadonlyMethod("add"
    /* ADD */
    ),
    set: createReadonlyMethod("set"
    /* SET */
    ),
    delete: createReadonlyMethod("delete"
    /* DELETE */
    ),
    clear: createReadonlyMethod("clear"
    /* CLEAR */
    ),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ['keys', 'values', 'entries', Symbol.iterator];
  iteratorMethods.forEach(method => {
    mutableInstrumentations[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations[method] = createIterableMethod(method, true, false);
    shallowInstrumentations[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations[method] = createIterableMethod(method, true, true);
  });
  return [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations];
}

const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* #__PURE__*/createInstrumentations();

function createInstrumentationGetter(isReadonly, shallow) {
  const instrumentations = shallow ? isReadonly ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive"
    /* IS_REACTIVE */
    ) {
      return !isReadonly;
    } else if (key === "__v_isReadonly"
    /* IS_READONLY */
    ) {
      return isReadonly;
    } else if (key === "__v_raw"
    /* RAW */
    ) {
      return target;
    }

    return Reflect.get(shared_esm_bundler_hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}

const mutableCollectionHandlers = {
  get: /*#__PURE__*/createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /*#__PURE__*/createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /*#__PURE__*/createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /*#__PURE__*/createInstrumentationGetter(true, true)
};

function checkIdentityKeys(target, has, key) {
  const rawKey = reactivity_esm_bundler_toRaw(key);

  if (rawKey !== key && has.call(target, rawKey)) {
    const type = toRawType(target);
    console.warn(`Reactive ${type} contains both the raw and reactive ` + `versions of the same object${type === `Map` ? ` as keys` : ``}, ` + `which can lead to inconsistencies. ` + `Avoid differentiating between the raw and reactive versions ` + `of an object and only use the reactive version if possible.`);
  }
}

const reactiveMap = new WeakMap();
const shallowReactiveMap = new WeakMap();
const readonlyMap = new WeakMap();
const shallowReadonlyMap = new WeakMap();

function targetTypeMap(rawType) {
  switch (rawType) {
    case 'Object':
    case 'Array':
      return 1
      /* COMMON */
      ;

    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2
      /* COLLECTION */
      ;

    default:
      return 0
      /* INVALID */
      ;
  }
}

function getTargetType(value) {
  return value["__v_skip"
  /* SKIP */
  ] || !Object.isExtensible(value) ? 0
  /* INVALID */
  : targetTypeMap(shared_esm_bundler_toRawType(value));
}

function reactive(target) {
  // if trying to observe a readonly proxy, return the readonly version.
  if (isReadonly(target)) {
    return target;
  }

  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
/**
 * Return a shallowly-reactive copy of the original object, where only the root
 * level properties are reactive. It also does not auto-unwrap refs (even at the
 * root level).
 */


function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
/**
 * Creates a readonly copy of the original object. Note the returned copy is not
 * made reactive, but `readonly` can be called on an already reactive object.
 */


function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
/**
 * Returns a reactive-copy of the original object, where only the root level
 * properties are readonly, and does NOT unwrap refs nor recursively convert
 * returned properties.
 * This is used for creating the props proxy object for stateful components.
 */


function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
}

function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
  if (!shared_esm_bundler_isObject(target)) {
    if (false) {}

    return target;
  } // target is already a Proxy, return it.
  // exception: calling readonly() on a reactive object


  if (target["__v_raw"
  /* RAW */
  ] && !(isReadonly && target["__v_isReactive"
  /* IS_REACTIVE */
  ])) {
    return target;
  } // target already has corresponding Proxy


  const existingProxy = proxyMap.get(target);

  if (existingProxy) {
    return existingProxy;
  } // only specific value types can be observed.


  const targetType = getTargetType(target);

  if (targetType === 0
  /* INVALID */
  ) {
    return target;
  }

  const proxy = new Proxy(target, targetType === 2
  /* COLLECTION */
  ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}

function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"
    /* RAW */
    ]);
  }

  return !!(value && value["__v_isReactive"
  /* IS_REACTIVE */
  ]);
}

function isReadonly(value) {
  return !!(value && value["__v_isReadonly"
  /* IS_READONLY */
  ]);
}

function isShallow(value) {
  return !!(value && value["__v_isShallow"
  /* IS_SHALLOW */
  ]);
}

function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}

function reactivity_esm_bundler_toRaw(observed) {
  const raw = observed && observed["__v_raw"
  /* RAW */
  ];
  return raw ? reactivity_esm_bundler_toRaw(raw) : observed;
}

function markRaw(value) {
  def(value, "__v_skip"
  /* SKIP */
  , true);
  return value;
}

const toReactive = value => shared_esm_bundler_isObject(value) ? reactive(value) : value;

const toReadonly = value => shared_esm_bundler_isObject(value) ? readonly(value) : value;

function trackRefValue(ref) {
  if (shouldTrack && activeEffect) {
    ref = reactivity_esm_bundler_toRaw(ref);

    if (false) {} else {
      trackEffects(ref.dep || (ref.dep = createDep()));
    }
  }
}

function triggerRefValue(ref, newVal) {
  ref = reactivity_esm_bundler_toRaw(ref);

  if (ref.dep) {
    if (false) {} else {
      triggerEffects(ref.dep);
    }
  }
}

function isRef(r) {
  return !!(r && r.__v_isRef === true);
}

function ref(value) {
  return createRef(value, false);
}

function shallowRef(value) {
  return createRef(value, true);
}

function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }

  return new RefImpl(rawValue, shallow);
}

class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = undefined;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : reactivity_esm_bundler_toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }

  get value() {
    trackRefValue(this);
    return this._value;
  }

  set value(newVal) {
    newVal = this.__v_isShallow ? newVal : reactivity_esm_bundler_toRaw(newVal);

    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = this.__v_isShallow ? newVal : toReactive(newVal);
      triggerRefValue(this, newVal);
    }
  }

}

function triggerRef(ref) {
  triggerRefValue(ref,  false ? 0 : void 0);
}

function reactivity_esm_bundler_unref(ref) {
  return isRef(ref) ? ref.value : ref;
}

const shallowUnwrapHandlers = {
  get: (target, key, receiver) => reactivity_esm_bundler_unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];

    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};

function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}

class CustomRefImpl {
  constructor(factory) {
    this.dep = undefined;
    this.__v_isRef = true;
    const {
      get,
      set
    } = factory(() => trackRefValue(this), () => triggerRefValue(this));
    this._get = get;
    this._set = set;
  }

  get value() {
    return this._get();
  }

  set value(newVal) {
    this._set(newVal);
  }

}

function customRef(factory) {
  return new CustomRefImpl(factory);
}

function toRefs(object) {
  if (false) {}

  const ret = shared_esm_bundler_isArray(object) ? new Array(object.length) : {};

  for (const key in object) {
    ret[key] = toRef(object, key);
  }

  return ret;
}

class ObjectRefImpl {
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this.__v_isRef = true;
  }

  get value() {
    const val = this._object[this._key];
    return val === undefined ? this._defaultValue : val;
  }

  set value(newVal) {
    this._object[this._key] = newVal;
  }

}

function toRef(object, key, defaultValue) {
  const val = object[key];
  return isRef(val) ? val : new ObjectRefImpl(object, key, defaultValue);
}

class ComputedRefImpl {
  constructor(getter, _setter, isReadonly, isSSR) {
    this._setter = _setter;
    this.dep = undefined;
    this.__v_isRef = true;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"
    /* IS_READONLY */
    ] = isReadonly;
  }

  get value() {
    // the computed ref may get wrapped by other proxies e.g. readonly() #3376
    const self = reactivity_esm_bundler_toRaw(this);
    trackRefValue(self);

    if (self._dirty || !self._cacheable) {
      self._dirty = false;
      self._value = self.effect.run();
    }

    return self._value;
  }

  set value(newValue) {
    this._setter(newValue);
  }

}

function reactivity_esm_bundler_computed(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);

  if (onlyGetter) {
    getter = getterOrOptions;
    setter =  false ? 0 : shared_esm_bundler_NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }

  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);

  if (false) {}

  return cRef;
}

var _a;

const tick = /*#__PURE__*/(/* unused pure expression or super */ null && (Promise.resolve()));
const queue = (/* unused pure expression or super */ null && ([]));
let queued = false;

const scheduler = fn => {
  queue.push(fn);

  if (!queued) {
    queued = true;
    tick.then(flush);
  }
};

const flush = () => {
  for (let i = 0; i < queue.length; i++) {
    queue[i]();
  }

  queue.length = 0;
  queued = false;
};

class DeferredComputedRefImpl {
  constructor(getter) {
    this.dep = undefined;
    this._dirty = true;
    this.__v_isRef = true;
    this[_a] = true;
    let compareTarget;
    let hasCompareTarget = false;
    let scheduled = false;
    this.effect = new ReactiveEffect(getter, computedTrigger => {
      if (this.dep) {
        if (computedTrigger) {
          compareTarget = this._value;
          hasCompareTarget = true;
        } else if (!scheduled) {
          const valueToCompare = hasCompareTarget ? compareTarget : this._value;
          scheduled = true;
          hasCompareTarget = false;
          scheduler(() => {
            if (this.effect.active && this._get() !== valueToCompare) {
              triggerRefValue(this);
            }

            scheduled = false;
          });
        } // chained upstream computeds are notified synchronously to ensure
        // value invalidation in case of sync access; normal effects are
        // deferred to be triggered in scheduler.


        for (const e of this.dep) {
          if (e.computed instanceof DeferredComputedRefImpl) {
            e.scheduler(true
            /* computedTrigger */
            );
          }
        }
      }

      this._dirty = true;
    });
    this.effect.computed = this;
  }

  _get() {
    if (this._dirty) {
      this._dirty = false;
      return this._value = this.effect.run();
    }

    return this._value;
  }

  get value() {
    trackRefValue(this); // the computed ref may get wrapped by other proxies e.g. readonly() #3376

    return reactivity_esm_bundler_toRaw(this)._get();
  }

}

_a = "__v_isReadonly"
/* IS_READONLY */
;

function deferredComputed(getter) {
  return new DeferredComputedRefImpl(getter);
}


;// CONCATENATED MODULE: ./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js






const stack = [];

function pushWarningContext(vnode) {
  stack.push(vnode);
}

function popWarningContext() {
  stack.pop();
}

function runtime_core_esm_bundler_warn(msg, ...args) {
  // avoid props formatting or warn handler tracking deps that might be mutated
  // during patch, leading to infinite recursion.
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();

  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 11
    /* APP_WARN_HANDLER */
    , [msg + args.join(''), instance && instance.proxy, trace.map(({
      vnode
    }) => `at <${formatComponentName(instance, vnode.type)}>`).join('\n'), trace]);
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    /* istanbul ignore if */

    if (trace.length && // avoid spamming console during tests
    !false) {
      warnArgs.push(`\n`, ...formatTrace(trace));
    }

    console.warn(...warnArgs);
  }

  resetTracking();
}

function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];

  if (!currentVNode) {
    return [];
  } // we can't just use the stack because it will be incomplete during updates
  // that did not start from the root. Re-construct the parent chain using
  // instance parent pointers.


  const normalizedStack = [];

  while (currentVNode) {
    const last = normalizedStack[0];

    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }

    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }

  return normalizedStack;
}
/* istanbul ignore next */


function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...(i === 0 ? [] : [`\n`]), ...formatTraceEntry(entry));
  });
  return logs;
}

function formatTraceEntry({
  vnode,
  recurseCount
}) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
/* istanbul ignore next */


function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach(key => {
    res.push(...formatProp(key, props[key]));
  });

  if (keys.length > 3) {
    res.push(` ...`);
  }

  return res;
}
/* istanbul ignore next */


function formatProp(key, value, raw) {
  if (shared_esm_bundler_isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === 'number' || typeof value === 'boolean' || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, reactivity_esm_bundler_toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = reactivity_esm_bundler_toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}

const ErrorTypeStrings = {
  ["sp"
  /* SERVER_PREFETCH */
  ]: 'serverPrefetch hook',
  ["bc"
  /* BEFORE_CREATE */
  ]: 'beforeCreate hook',
  ["c"
  /* CREATED */
  ]: 'created hook',
  ["bm"
  /* BEFORE_MOUNT */
  ]: 'beforeMount hook',
  ["m"
  /* MOUNTED */
  ]: 'mounted hook',
  ["bu"
  /* BEFORE_UPDATE */
  ]: 'beforeUpdate hook',
  ["u"
  /* UPDATED */
  ]: 'updated',
  ["bum"
  /* BEFORE_UNMOUNT */
  ]: 'beforeUnmount hook',
  ["um"
  /* UNMOUNTED */
  ]: 'unmounted hook',
  ["a"
  /* ACTIVATED */
  ]: 'activated hook',
  ["da"
  /* DEACTIVATED */
  ]: 'deactivated hook',
  ["ec"
  /* ERROR_CAPTURED */
  ]: 'errorCaptured hook',
  ["rtc"
  /* RENDER_TRACKED */
  ]: 'renderTracked hook',
  ["rtg"
  /* RENDER_TRIGGERED */
  ]: 'renderTriggered hook',
  [0
  /* SETUP_FUNCTION */
  ]: 'setup function',
  [1
  /* RENDER_FUNCTION */
  ]: 'render function',
  [2
  /* WATCH_GETTER */
  ]: 'watcher getter',
  [3
  /* WATCH_CALLBACK */
  ]: 'watcher callback',
  [4
  /* WATCH_CLEANUP */
  ]: 'watcher cleanup function',
  [5
  /* NATIVE_EVENT_HANDLER */
  ]: 'native event handler',
  [6
  /* COMPONENT_EVENT_HANDLER */
  ]: 'component event handler',
  [7
  /* VNODE_HOOK */
  ]: 'vnode hook',
  [8
  /* DIRECTIVE_HOOK */
  ]: 'directive hook',
  [9
  /* TRANSITION_HOOK */
  ]: 'transition hook',
  [10
  /* APP_ERROR_HANDLER */
  ]: 'app errorHandler',
  [11
  /* APP_WARN_HANDLER */
  ]: 'app warnHandler',
  [12
  /* FUNCTION_REF */
  ]: 'ref function',
  [13
  /* ASYNC_COMPONENT_LOADER */
  ]: 'async component loader',
  [14
  /* SCHEDULER */
  ]: 'scheduler flush. This is likely a Vue internals bug. ' + 'Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core'
};

function callWithErrorHandling(fn, instance, type, args) {
  let res;

  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }

  return res;
}

function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);

    if (res && isPromise(res)) {
      res.catch(err => {
        handleError(err, instance, type);
      });
    }

    return res;
  }

  const values = [];

  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }

  return values;
}

function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;

  if (instance) {
    let cur = instance.parent; // the exposed instance is the render proxy to keep it consistent with 2.x

    const exposedInstance = instance.proxy; // in production the hook receives only the error code

    const errorInfo =  false ? 0 : type;

    while (cur) {
      const errorCapturedHooks = cur.ec;

      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }

      cur = cur.parent;
    } // app-level handling


    const appErrorHandler = instance.appContext.config.errorHandler;

    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10
      /* APP_ERROR_HANDLER */
      , [err, exposedInstance, errorInfo]);
      return;
    }
  }

  logError(err, type, contextVNode, throwInDev);
}

function logError(err, type, contextVNode, throwInDev = true) {
  if (false) {} else {
    // recover in prod to reduce the impact on end-user
    console.error(err);
  }
}

let isFlushing = false;
let isFlushPending = false;
const runtime_core_esm_bundler_queue = [];
let flushIndex = 0;
const pendingPreFlushCbs = [];
let activePreFlushCbs = null;
let preFlushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /*#__PURE__*/Promise.resolve();
let currentFlushPromise = null;
let currentPreFlushParentJob = null;
const RECURSION_LIMIT = 100;

function runtime_core_esm_bundler_nextTick(fn) {
  const p = currentFlushPromise || resolvedPromise;
  return fn ? p.then(this ? fn.bind(this) : fn) : p;
} // #2768
// Use binary-search to find a suitable position in the queue,
// so that the queue maintains the increasing order of job's id,
// which can prevent the job from being skipped and also can avoid repeated patching.


function findInsertionIndex(id) {
  // the start index should be `flushIndex + 1`
  let start = flushIndex + 1;
  let end = runtime_core_esm_bundler_queue.length;

  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(runtime_core_esm_bundler_queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }

  return start;
}

function queueJob(job) {
  // the dedupe search uses the startIndex argument of Array.includes()
  // by default the search index includes the current job that is being run
  // so it cannot recursively trigger itself again.
  // if the job is a watch() callback, the search will start with a +1 index to
  // allow it recursively trigger itself - it is the user's responsibility to
  // ensure it doesn't end up in an infinite loop.
  if ((!runtime_core_esm_bundler_queue.length || !runtime_core_esm_bundler_queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) && job !== currentPreFlushParentJob) {
    if (job.id == null) {
      runtime_core_esm_bundler_queue.push(job);
    } else {
      runtime_core_esm_bundler_queue.splice(findInsertionIndex(job.id), 0, job);
    }

    queueFlush();
  }
}

function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}

function invalidateJob(job) {
  const i = runtime_core_esm_bundler_queue.indexOf(job);

  if (i > flushIndex) {
    runtime_core_esm_bundler_queue.splice(i, 1);
  }
}

function queueCb(cb, activeQueue, pendingQueue, index) {
  if (!shared_esm_bundler_isArray(cb)) {
    if (!activeQueue || !activeQueue.includes(cb, cb.allowRecurse ? index + 1 : index)) {
      pendingQueue.push(cb);
    }
  } else {
    // if cb is an array, it is a component lifecycle hook which can only be
    // triggered by a job, which is already deduped in the main queue, so
    // we can skip duplicate check here to improve perf
    pendingQueue.push(...cb);
  }

  queueFlush();
}

function queuePreFlushCb(cb) {
  queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
}

function queuePostFlushCb(cb) {
  queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
}

function flushPreFlushCbs(seen, parentJob = null) {
  if (pendingPreFlushCbs.length) {
    currentPreFlushParentJob = parentJob;
    activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
    pendingPreFlushCbs.length = 0;

    if (false) {}

    for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
      if (false) {}

      activePreFlushCbs[preFlushIndex]();
    }

    activePreFlushCbs = null;
    preFlushIndex = 0;
    currentPreFlushParentJob = null; // recursively flush until it drains

    flushPreFlushCbs(seen, parentJob);
  }
}

function flushPostFlushCbs(seen) {
  // flush any pre cbs queued during the flush (e.g. pre watchers)
  flushPreFlushCbs();

  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0; // #1947 already has active queue, nested flushPostFlushCbs call

    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }

    activePostFlushCbs = deduped;

    if (false) {}

    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));

    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (false) {}

      activePostFlushCbs[postFlushIndex]();
    }

    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}

const getId = job => job.id == null ? Infinity : job.id;

function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;

  if (false) {}

  flushPreFlushCbs(seen); // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child so its render effect will have smaller
  //    priority number)
  // 2. If a component is unmounted during a parent component's update,
  //    its update can be skipped.

  runtime_core_esm_bundler_queue.sort((a, b) => getId(a) - getId(b)); // conditional usage of checkRecursiveUpdate must be determined out of
  // try ... catch block since Rollup by default de-optimizes treeshaking
  // inside try-catch. This can leave all warning code unshaked. Although
  // they would get eventually shaken by a minifier like terser, some minifiers
  // would fail to do that (e.g. https://github.com/evanw/esbuild/issues/1610)

  const check =  false ? 0 : shared_esm_bundler_NOOP;

  try {
    for (flushIndex = 0; flushIndex < runtime_core_esm_bundler_queue.length; flushIndex++) {
      const job = runtime_core_esm_bundler_queue[flushIndex];

      if (job && job.active !== false) {
        if (false) {} // console.log(`running:`, job.id)


        callWithErrorHandling(job, null, 14
        /* SCHEDULER */
        );
      }
    }
  } finally {
    flushIndex = 0;
    runtime_core_esm_bundler_queue.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null; // some postFlushCb queued jobs!
    // keep flushing until it drains.

    if (runtime_core_esm_bundler_queue.length || pendingPreFlushCbs.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}

function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);

    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      runtime_core_esm_bundler_warn(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. ` + `This means you have a reactive effect that is mutating its own ` + `dependencies and thus recursively triggering itself. Possible sources ` + `include component template, render function, updated hook or ` + `watcher source function.`);
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
/* eslint-disable no-restricted-globals */


let isHmrUpdating = false;
const hmrDirtyComponents = new Set(); // Expose the HMR runtime on the global object
// This makes it entirely tree-shakable without polluting the exports and makes
// it easier to be used in toolings like vue-loader
// Note: for a component to be eligible for HMR it also needs the __hmrId option
// to be set so that its instances can be registered / removed.

if (false) {}

const map = new Map();

function registerHMR(instance) {
  const id = instance.type.__hmrId;
  let record = map.get(id);

  if (!record) {
    createRecord(id, instance.type);
    record = map.get(id);
  }

  record.instances.add(instance);
}

function unregisterHMR(instance) {
  map.get(instance.type.__hmrId).instances.delete(instance);
}

function createRecord(id, initialDef) {
  if (map.has(id)) {
    return false;
  }

  map.set(id, {
    initialDef: normalizeClassComponent(initialDef),
    instances: new Set()
  });
  return true;
}

function normalizeClassComponent(component) {
  return isClassComponent(component) ? component.__vccOpts : component;
}

function rerender(id, newRender) {
  const record = map.get(id);

  if (!record) {
    return;
  } // update initial record (for not-yet-rendered component)


  record.initialDef.render = newRender;
  [...record.instances].forEach(instance => {
    if (newRender) {
      instance.render = newRender;
      normalizeClassComponent(instance.type).render = newRender;
    }

    instance.renderCache = []; // this flag forces child components with slot content to update

    isHmrUpdating = true;
    instance.update();
    isHmrUpdating = false;
  });
}

function reload(id, newComp) {
  const record = map.get(id);
  if (!record) return;
  newComp = normalizeClassComponent(newComp); // update initial def (for not-yet-rendered components)

  updateComponentDef(record.initialDef, newComp); // create a snapshot which avoids the set being mutated during updates

  const instances = [...record.instances];

  for (const instance of instances) {
    const oldComp = normalizeClassComponent(instance.type);

    if (!hmrDirtyComponents.has(oldComp)) {
      // 1. Update existing comp definition to match new one
      if (oldComp !== record.initialDef) {
        updateComponentDef(oldComp, newComp);
      } // 2. mark definition dirty. This forces the renderer to replace the
      // component on patch.


      hmrDirtyComponents.add(oldComp);
    } // 3. invalidate options resolution cache


    instance.appContext.optionsCache.delete(instance.type); // 4. actually update

    if (instance.ceReload) {
      // custom element
      hmrDirtyComponents.add(oldComp);
      instance.ceReload(newComp.styles);
      hmrDirtyComponents.delete(oldComp);
    } else if (instance.parent) {
      // 4. Force the parent instance to re-render. This will cause all updated
      // components to be unmounted and re-mounted. Queue the update so that we
      // don't end up forcing the same parent to re-render multiple times.
      queueJob(instance.parent.update); // instance is the inner component of an async custom element
      // invoke to reset styles

      if (instance.parent.type.__asyncLoader && instance.parent.ceReload) {
        instance.parent.ceReload(newComp.styles);
      }
    } else if (instance.appContext.reload) {
      // root instance mounted via createApp() has a reload method
      instance.appContext.reload();
    } else if (typeof window !== 'undefined') {
      // root instance inside tree created via raw render(). Force reload.
      window.location.reload();
    } else {
      console.warn('[HMR] Root or manually mounted instance modified. Full reload required.');
    }
  } // 5. make sure to cleanup dirty hmr components after update


  queuePostFlushCb(() => {
    for (const instance of instances) {
      hmrDirtyComponents.delete(normalizeClassComponent(instance.type));
    }
  });
}

function updateComponentDef(oldComp, newComp) {
  extend(oldComp, newComp);

  for (const key in oldComp) {
    if (key !== '__file' && !(key in newComp)) {
      delete oldComp[key];
    }
  }
}

function tryWrap(fn) {
  return (id, arg) => {
    try {
      return fn(id, arg);
    } catch (e) {
      console.error(e);
      console.warn(`[HMR] Something went wrong during Vue component hot-reload. ` + `Full reload required.`);
    }
  };
}

let devtools;
let buffer = [];
let devtoolsNotInstalled = false;

function emit(event, ...args) {
  if (devtools) {
    devtools.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({
      event,
      args
    });
  }
}

function setDevtoolsHook(hook, target) {
  var _a, _b;

  devtools = hook;

  if (devtools) {
    devtools.enabled = true;
    buffer.forEach(({
      event,
      args
    }) => devtools.emit(event, ...args));
    buffer = [];
  } else if ( // handle late devtools injection - only do this if we are in an actual
  // browser environment to avoid the timer handle stalling test runner exit
  // (#4815)
  typeof window !== 'undefined' && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  !((_b = (_a = window.navigator) === null || _a === void 0 ? void 0 : _a.userAgent) === null || _b === void 0 ? void 0 : _b.includes('jsdom'))) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push(newHook => {
      setDevtoolsHook(newHook, target);
    }); // clear buffer after 3s - the user probably doesn't have devtools installed
    // at all, and keeping the buffer will cause memory leaks (#4738)

    setTimeout(() => {
      if (!devtools) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3000);
  } else {
    // non-browser env, assume not installed
    devtoolsNotInstalled = true;
    buffer = [];
  }
}

function devtoolsInitApp(app, version) {
  emit("app:init"
  /* APP_INIT */
  , app, version, {
    Fragment: runtime_core_esm_bundler_Fragment,
    Text: runtime_core_esm_bundler_Text,
    Comment,
    Static
  });
}

function devtoolsUnmountApp(app) {
  emit("app:unmount"
  /* APP_UNMOUNT */
  , app);
}

const devtoolsComponentAdded = /*#__PURE__*/(/* unused pure expression or super */ null && (createDevtoolsComponentHook("component:added"
/* COMPONENT_ADDED */
)));
const devtoolsComponentUpdated = /*#__PURE__*/(/* unused pure expression or super */ null && (createDevtoolsComponentHook("component:updated"
/* COMPONENT_UPDATED */
)));
const devtoolsComponentRemoved = /*#__PURE__*/(/* unused pure expression or super */ null && (createDevtoolsComponentHook("component:removed"
/* COMPONENT_REMOVED */
)));

function createDevtoolsComponentHook(hook) {
  return component => {
    emit(hook, component.appContext.app, component.uid, component.parent ? component.parent.uid : undefined, component);
  };
}

const devtoolsPerfStart = /*#__PURE__*/(/* unused pure expression or super */ null && (createDevtoolsPerformanceHook("perf:start"
/* PERFORMANCE_START */
)));
const devtoolsPerfEnd = /*#__PURE__*/(/* unused pure expression or super */ null && (createDevtoolsPerformanceHook("perf:end"
/* PERFORMANCE_END */
)));

function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit(hook, component.appContext.app, component.uid, component, type, time);
  };
}

function devtoolsComponentEmit(component, event, params) {
  emit("component:emit"
  /* COMPONENT_EMIT */
  , component.appContext.app, component, event, params);
}

function emit$1(instance, event, ...rawArgs) {
  if (instance.isUnmounted) return;
  const props = instance.vnode.props || EMPTY_OBJ;

  if (false) {}

  let args = rawArgs;
  const isModelListener = event.startsWith('update:'); // for v-model update:xxx events, apply modifiers on args

  const modelArg = isModelListener && event.slice(7);

  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === 'modelValue' ? 'model' : modelArg}Modifiers`;
    const {
      number,
      trim
    } = props[modifiersKey] || EMPTY_OBJ;

    if (trim) {
      args = rawArgs.map(a => a.trim());
    }

    if (number) {
      args = rawArgs.map(toNumber);
    }
  }

  if (false) {}

  if (false) {}

  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(shared_esm_bundler_camelize(event))]; // for v-model update:xxx events, also trigger kebab-case equivalent
  // for props passed via kebab-case

  if (!handler && isModelListener) {
    handler = props[handlerName = toHandlerKey(shared_esm_bundler_hyphenate(event))];
  }

  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6
    /* COMPONENT_EVENT_HANDLER */
    , args);
  }

  const onceHandler = props[handlerName + `Once`];

  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }

    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6
    /* COMPONENT_EVENT_HANDLER */
    , args);
  }
}

function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);

  if (cached !== undefined) {
    return cached;
  }

  const raw = comp.emits;
  let normalized = {}; // apply mixin/extends props

  let hasExtends = false;

  if ( true && !isFunction(comp)) {
    const extendEmits = raw => {
      const normalizedFromExtend = normalizeEmitsOptions(raw, appContext, true);

      if (normalizedFromExtend) {
        hasExtends = true;
        shared_esm_bundler_extend(normalized, normalizedFromExtend);
      }
    };

    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }

    if (comp.extends) {
      extendEmits(comp.extends);
    }

    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }

  if (!raw && !hasExtends) {
    cache.set(comp, null);
    return null;
  }

  if (shared_esm_bundler_isArray(raw)) {
    raw.forEach(key => normalized[key] = null);
  } else {
    shared_esm_bundler_extend(normalized, raw);
  }

  cache.set(comp, normalized);
  return normalized;
} // Check if an incoming prop key is a declared emit event listener.
// e.g. With `emits: { click: null }`, props named `onClick` and `onclick` are
// both considered matched listeners.


function isEmitListener(options, key) {
  if (!options || !shared_esm_bundler_isOn(key)) {
    return false;
  }

  key = key.slice(2).replace(/Once$/, '');
  return shared_esm_bundler_hasOwn(options, key[0].toLowerCase() + key.slice(1)) || shared_esm_bundler_hasOwn(options, shared_esm_bundler_hyphenate(key)) || shared_esm_bundler_hasOwn(options, key);
}
/**
 * mark the current rendering instance for asset resolution (e.g.
 * resolveComponent, resolveDirective) during render
 */


let currentRenderingInstance = null;
let currentScopeId = null;
/**
 * Note: rendering calls maybe nested. The function returns the parent rendering
 * instance if present, which should be restored after the render is done:
 *
 * ```js
 * const prev = setCurrentRenderingInstance(i)
 * // ...render
 * setCurrentRenderingInstance(prev)
 * ```
 */

function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
/**
 * Set scope id when creating hoisted vnodes.
 * @private compiler helper
 */


function pushScopeId(id) {
  currentScopeId = id;
}
/**
 * Technically we no longer need this after 3.0.8 but we need to keep the same
 * API for backwards compat w/ code generated by compilers.
 * @private
 */


function popScopeId() {
  currentScopeId = null;
}
/**
 * Only for backwards compat
 * @private
 */


const withScopeId = _id => withCtx;
/**
 * Wrap a slot function to memoize current rendering instance
 * @private compiler helper
 */


function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot // false only
) {
  if (!ctx) return fn; // already normalized

  if (fn._n) {
    return fn;
  }

  const renderFnWithContext = (...args) => {
    // If a user calls a compiled slot inside a template expression (#1745), it
    // can mess up block tracking, so by default we disable block tracking and
    // force bail out when invoking a compiled slot (indicated by the ._d flag).
    // This isn't necessary if rendering a compiled `<slot>`, so we flip the
    // ._d flag off when invoking the wrapped fn inside `renderSlot`.
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }

    const prevInstance = setCurrentRenderingInstance(ctx);
    const res = fn(...args);
    setCurrentRenderingInstance(prevInstance);

    if (renderFnWithContext._d) {
      setBlockTracking(1);
    }

    if (false) {}

    return res;
  }; // mark normalized to avoid duplicated wrapping


  renderFnWithContext._n = true; // mark this as compiled by default
  // this is used in vnode.ts -> normalizeChildren() to set the slot
  // rendering flag.

  renderFnWithContext._c = true; // disable block tracking by default

  renderFnWithContext._d = true;
  return renderFnWithContext;
}
/**
 * dev only flag to track whether $attrs was used during render.
 * If $attrs was used during render then the warning for failed attrs
 * fallthrough can be suppressed.
 */


let accessedAttrs = false;

function markAttrsAccessed() {
  accessedAttrs = true;
}

function renderComponentRoot(instance) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    props,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit,
    render,
    renderCache,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance);

  if (false) {}

  try {
    if (vnode.shapeFlag & 4
    /* STATEFUL_COMPONENT */
    ) {
      // withProxy is a proxy with a different `has` trap only for
      // runtime-compiled render functions using `with` block.
      const proxyToUse = withProxy || proxy;
      result = normalizeVNode(render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx));
      fallthroughAttrs = attrs;
    } else {
      // functional
      const render = Component; // in dev, mark attrs accessed if optional props (attrs === props)

      if (false) {}

      result = normalizeVNode(render.length > 1 ? render(props,  false ? 0 : {
        attrs,
        slots,
        emit
      }) : render(props, null
      /* we know it doesn't need it */
      ));
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1
    /* RENDER_FUNCTION */
    );
    result = createVNode(Comment);
  } // attr merging
  // in dev mode, comments are preserved, and it's possible for a template
  // to have comments along side the root element which makes it a fragment


  let root = result;
  let setRoot = undefined;

  if (false
  /* DEV_ROOT_FRAGMENT */
  ) {}

  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const {
      shapeFlag
    } = root;

    if (keys.length) {
      if (shapeFlag & (1
      /* ELEMENT */
      | 6
      /* COMPONENT */
      )) {
        if (propsOptions && keys.some(isModelListener)) {
          // If a v-model listener (onUpdate:xxx) has a corresponding declared
          // prop, it indicates this component expects to handle v-model and
          // it should not fallthrough.
          // related: #1543, #1643, #1989
          fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
        }

        root = cloneVNode(root, fallthroughAttrs);
      } else if (false) {}
    }
  } // inherit directives


  if (vnode.dirs) {
    if (false) {} // clone before mutating since the root may be a hoisted vnode


    root = cloneVNode(root);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  } // inherit transition data


  if (vnode.transition) {
    if (false) {}

    root.transition = vnode.transition;
  }

  if (false) {} else {
    result = root;
  }

  setCurrentRenderingInstance(prev);
  return result;
}
/**
 * dev only
 * In dev mode, template root level comments are rendered, which turns the
 * template into a fragment root, but we need to locate the single element
 * root for attrs and scope id processing.
 */


const getChildRoot = vnode => {
  const rawChildren = vnode.children;
  const dynamicChildren = vnode.dynamicChildren;
  const childRoot = filterSingleRoot(rawChildren);

  if (!childRoot) {
    return [vnode, undefined];
  }

  const index = rawChildren.indexOf(childRoot);
  const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;

  const setRoot = updatedRoot => {
    rawChildren[index] = updatedRoot;

    if (dynamicChildren) {
      if (dynamicIndex > -1) {
        dynamicChildren[dynamicIndex] = updatedRoot;
      } else if (updatedRoot.patchFlag > 0) {
        vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
      }
    }
  };

  return [normalizeVNode(childRoot), setRoot];
};

function filterSingleRoot(children) {
  let singleRoot;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];

    if (runtime_core_esm_bundler_isVNode(child)) {
      // ignore user comment
      if (child.type !== Comment || child.children === 'v-if') {
        if (singleRoot) {
          // has more than 1 non-comment child, return now
          return;
        } else {
          singleRoot = child;
        }
      }
    } else {
      return;
    }
  }

  return singleRoot;
}

const getFunctionalFallthrough = attrs => {
  let res;

  for (const key in attrs) {
    if (key === 'class' || key === 'style' || shared_esm_bundler_isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }

  return res;
};

const filterModelListeners = (attrs, props) => {
  const res = {};

  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }

  return res;
};

const isElementRoot = vnode => {
  return vnode.shapeFlag & (6
  /* COMPONENT */
  | 1
  /* ELEMENT */
  ) || vnode.type === Comment // potential v-if branch switch
  ;
};

function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const {
    props: prevProps,
    children: prevChildren,
    component
  } = prevVNode;
  const {
    props: nextProps,
    children: nextChildren,
    patchFlag
  } = nextVNode;
  const emits = component.emitsOptions; // Parent component's render function was hot-updated. Since this may have
  // caused the child component's slots content to have changed, we need to
  // force the child to update as well.

  if (false) {} // force child update for runtime directive or transition on component vnode.


  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }

  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024
    /* DYNAMIC_SLOTS */
    ) {
      // slot content that references values that might have changed,
      // e.g. in a v-for
      return true;
    }

    if (patchFlag & 16
    /* FULL_PROPS */
    ) {
      if (!prevProps) {
        return !!nextProps;
      } // presence of this flag indicates props are always non-null


      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8
    /* PROPS */
    ) {
      const dynamicProps = nextVNode.dynamicProps;

      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];

        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    // this path is only taken by manually written render functions
    // so presence of any children leads to a forced update
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }

    if (prevProps === nextProps) {
      return false;
    }

    if (!prevProps) {
      return !!nextProps;
    }

    if (!nextProps) {
      return true;
    }

    return hasPropsChanged(prevProps, nextProps, emits);
  }

  return false;
}

function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);

  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }

  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];

    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }

  return false;
}

function updateHOCHostEl({
  vnode,
  parent
}, el // HostNode
) {
  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el;
    parent = parent.parent;
  }
}

const isSuspense = type => type.__isSuspense; // Suspense exposes a component-like API, and is treated like a component
// in the compiler, but internally it's a special built-in type that hooks
// directly into the renderer.


const SuspenseImpl = {
  name: 'Suspense',
  // In order to make Suspense tree-shakable, we need to avoid importing it
  // directly in the renderer. The renderer checks for the __isSuspense flag
  // on a vnode's type and calls the `process` method, passing in renderer
  // internals.
  __isSuspense: true,

  process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, // platform-specific impl passed from renderer
  rendererInternals) {
    if (n1 == null) {
      mountSuspense(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, rendererInternals);
    } else {
      patchSuspense(n1, n2, container, anchor, parentComponent, isSVG, slotScopeIds, optimized, rendererInternals);
    }
  },

  hydrate: hydrateSuspense,
  create: createSuspenseBoundary,
  normalize: normalizeSuspenseChildren
}; // Force-casted public typing for h and TSX props inference

const Suspense = SuspenseImpl;

function triggerEvent(vnode, name) {
  const eventListener = vnode.props && vnode.props[name];

  if (isFunction(eventListener)) {
    eventListener();
  }
}

function mountSuspense(vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, rendererInternals) {
  const {
    p: patch,
    o: {
      createElement
    }
  } = rendererInternals;
  const hiddenContainer = createElement('div');
  const suspense = vnode.suspense = createSuspenseBoundary(vnode, parentSuspense, parentComponent, container, hiddenContainer, anchor, isSVG, slotScopeIds, optimized, rendererInternals); // start mounting the content subtree in an off-dom container

  patch(null, suspense.pendingBranch = vnode.ssContent, hiddenContainer, null, parentComponent, suspense, isSVG, slotScopeIds); // now check if we have encountered any async deps

  if (suspense.deps > 0) {
    // has async
    // invoke @fallback event
    triggerEvent(vnode, 'onPending');
    triggerEvent(vnode, 'onFallback'); // mount the fallback tree

    patch(null, vnode.ssFallback, container, anchor, parentComponent, null, // fallback tree will not have suspense context
    isSVG, slotScopeIds);
    setActiveBranch(suspense, vnode.ssFallback);
  } else {
    // Suspense has no async deps. Just resolve.
    suspense.resolve();
  }
}

function patchSuspense(n1, n2, container, anchor, parentComponent, isSVG, slotScopeIds, optimized, {
  p: patch,
  um: unmount,
  o: {
    createElement
  }
}) {
  const suspense = n2.suspense = n1.suspense;
  suspense.vnode = n2;
  n2.el = n1.el;
  const newBranch = n2.ssContent;
  const newFallback = n2.ssFallback;
  const {
    activeBranch,
    pendingBranch,
    isInFallback,
    isHydrating
  } = suspense;

  if (pendingBranch) {
    suspense.pendingBranch = newBranch;

    if (isSameVNodeType(newBranch, pendingBranch)) {
      // same root type but content may have changed.
      patch(pendingBranch, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, isSVG, slotScopeIds, optimized);

      if (suspense.deps <= 0) {
        suspense.resolve();
      } else if (isInFallback) {
        patch(activeBranch, newFallback, container, anchor, parentComponent, null, // fallback tree will not have suspense context
        isSVG, slotScopeIds, optimized);
        setActiveBranch(suspense, newFallback);
      }
    } else {
      // toggled before pending tree is resolved
      suspense.pendingId++;

      if (isHydrating) {
        // if toggled before hydration is finished, the current DOM tree is
        // no longer valid. set it as the active branch so it will be unmounted
        // when resolved
        suspense.isHydrating = false;
        suspense.activeBranch = pendingBranch;
      } else {
        unmount(pendingBranch, parentComponent, suspense);
      } // increment pending ID. this is used to invalidate async callbacks
      // reset suspense state


      suspense.deps = 0; // discard effects from pending branch

      suspense.effects.length = 0; // discard previous container

      suspense.hiddenContainer = createElement('div');

      if (isInFallback) {
        // already in fallback state
        patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, isSVG, slotScopeIds, optimized);

        if (suspense.deps <= 0) {
          suspense.resolve();
        } else {
          patch(activeBranch, newFallback, container, anchor, parentComponent, null, // fallback tree will not have suspense context
          isSVG, slotScopeIds, optimized);
          setActiveBranch(suspense, newFallback);
        }
      } else if (activeBranch && isSameVNodeType(newBranch, activeBranch)) {
        // toggled "back" to current active branch
        patch(activeBranch, newBranch, container, anchor, parentComponent, suspense, isSVG, slotScopeIds, optimized); // force resolve

        suspense.resolve(true);
      } else {
        // switched to a 3rd branch
        patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, isSVG, slotScopeIds, optimized);

        if (suspense.deps <= 0) {
          suspense.resolve();
        }
      }
    }
  } else {
    if (activeBranch && isSameVNodeType(newBranch, activeBranch)) {
      // root did not change, just normal patch
      patch(activeBranch, newBranch, container, anchor, parentComponent, suspense, isSVG, slotScopeIds, optimized);
      setActiveBranch(suspense, newBranch);
    } else {
      // root node toggled
      // invoke @pending event
      triggerEvent(n2, 'onPending'); // mount pending branch in off-dom container

      suspense.pendingBranch = newBranch;
      suspense.pendingId++;
      patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, isSVG, slotScopeIds, optimized);

      if (suspense.deps <= 0) {
        // incoming branch has no async deps, resolve now.
        suspense.resolve();
      } else {
        const {
          timeout,
          pendingId
        } = suspense;

        if (timeout > 0) {
          setTimeout(() => {
            if (suspense.pendingId === pendingId) {
              suspense.fallback(newFallback);
            }
          }, timeout);
        } else if (timeout === 0) {
          suspense.fallback(newFallback);
        }
      }
    }
  }
}

let hasWarned = false;

function createSuspenseBoundary(vnode, parent, parentComponent, container, hiddenContainer, anchor, isSVG, slotScopeIds, optimized, rendererInternals, isHydrating = false) {
  /* istanbul ignore if */
  if (false) {}

  const {
    p: patch,
    m: move,
    um: unmount,
    n: next,
    o: {
      parentNode,
      remove
    }
  } = rendererInternals;
  const timeout = toNumber(vnode.props && vnode.props.timeout);
  const suspense = {
    vnode,
    parent,
    parentComponent,
    isSVG,
    container,
    hiddenContainer,
    anchor,
    deps: 0,
    pendingId: 0,
    timeout: typeof timeout === 'number' ? timeout : -1,
    activeBranch: null,
    pendingBranch: null,
    isInFallback: true,
    isHydrating,
    isUnmounted: false,
    effects: [],

    resolve(resume = false) {
      if (false) {}

      const {
        vnode,
        activeBranch,
        pendingBranch,
        pendingId,
        effects,
        parentComponent,
        container
      } = suspense;

      if (suspense.isHydrating) {
        suspense.isHydrating = false;
      } else if (!resume) {
        const delayEnter = activeBranch && pendingBranch.transition && pendingBranch.transition.mode === 'out-in';

        if (delayEnter) {
          activeBranch.transition.afterLeave = () => {
            if (pendingId === suspense.pendingId) {
              move(pendingBranch, container, anchor, 0
              /* ENTER */
              );
            }
          };
        } // this is initial anchor on mount


        let {
          anchor
        } = suspense; // unmount current active tree

        if (activeBranch) {
          // if the fallback tree was mounted, it may have been moved
          // as part of a parent suspense. get the latest anchor for insertion
          anchor = next(activeBranch);
          unmount(activeBranch, parentComponent, suspense, true);
        }

        if (!delayEnter) {
          // move content from off-dom container to actual container
          move(pendingBranch, container, anchor, 0
          /* ENTER */
          );
        }
      }

      setActiveBranch(suspense, pendingBranch);
      suspense.pendingBranch = null;
      suspense.isInFallback = false; // flush buffered effects
      // check if there is a pending parent suspense

      let parent = suspense.parent;
      let hasUnresolvedAncestor = false;

      while (parent) {
        if (parent.pendingBranch) {
          // found a pending parent suspense, merge buffered post jobs
          // into that parent
          parent.effects.push(...effects);
          hasUnresolvedAncestor = true;
          break;
        }

        parent = parent.parent;
      } // no pending parent suspense, flush all jobs


      if (!hasUnresolvedAncestor) {
        queuePostFlushCb(effects);
      }

      suspense.effects = []; // invoke @resolve event

      triggerEvent(vnode, 'onResolve');
    },

    fallback(fallbackVNode) {
      if (!suspense.pendingBranch) {
        return;
      }

      const {
        vnode,
        activeBranch,
        parentComponent,
        container,
        isSVG
      } = suspense; // invoke @fallback event

      triggerEvent(vnode, 'onFallback');
      const anchor = next(activeBranch);

      const mountFallback = () => {
        if (!suspense.isInFallback) {
          return;
        } // mount the fallback tree


        patch(null, fallbackVNode, container, anchor, parentComponent, null, // fallback tree will not have suspense context
        isSVG, slotScopeIds, optimized);
        setActiveBranch(suspense, fallbackVNode);
      };

      const delayEnter = fallbackVNode.transition && fallbackVNode.transition.mode === 'out-in';

      if (delayEnter) {
        activeBranch.transition.afterLeave = mountFallback;
      }

      suspense.isInFallback = true; // unmount current active branch

      unmount(activeBranch, parentComponent, null, // no suspense so unmount hooks fire now
      true // shouldRemove
      );

      if (!delayEnter) {
        mountFallback();
      }
    },

    move(container, anchor, type) {
      suspense.activeBranch && move(suspense.activeBranch, container, anchor, type);
      suspense.container = container;
    },

    next() {
      return suspense.activeBranch && next(suspense.activeBranch);
    },

    registerDep(instance, setupRenderEffect) {
      const isInPendingSuspense = !!suspense.pendingBranch;

      if (isInPendingSuspense) {
        suspense.deps++;
      }

      const hydratedEl = instance.vnode.el;
      instance.asyncDep.catch(err => {
        handleError(err, instance, 0
        /* SETUP_FUNCTION */
        );
      }).then(asyncSetupResult => {
        // retry when the setup() promise resolves.
        // component may have been unmounted before resolve.
        if (instance.isUnmounted || suspense.isUnmounted || suspense.pendingId !== instance.suspenseId) {
          return;
        } // retry from this component


        instance.asyncResolved = true;
        const {
          vnode
        } = instance;

        if (false) {}

        handleSetupResult(instance, asyncSetupResult, false);

        if (hydratedEl) {
          // vnode may have been replaced if an update happened before the
          // async dep is resolved.
          vnode.el = hydratedEl;
        }

        const placeholder = !hydratedEl && instance.subTree.el;
        setupRenderEffect(instance, vnode, // component may have been moved before resolve.
        // if this is not a hydration, instance.subTree will be the comment
        // placeholder.
        parentNode(hydratedEl || instance.subTree.el), // anchor will not be used if this is hydration, so only need to
        // consider the comment placeholder case.
        hydratedEl ? null : next(instance.subTree), suspense, isSVG, optimized);

        if (placeholder) {
          remove(placeholder);
        }

        updateHOCHostEl(instance, vnode.el);

        if (false) {} // only decrease deps count if suspense is not already resolved


        if (isInPendingSuspense && --suspense.deps === 0) {
          suspense.resolve();
        }
      });
    },

    unmount(parentSuspense, doRemove) {
      suspense.isUnmounted = true;

      if (suspense.activeBranch) {
        unmount(suspense.activeBranch, parentComponent, parentSuspense, doRemove);
      }

      if (suspense.pendingBranch) {
        unmount(suspense.pendingBranch, parentComponent, parentSuspense, doRemove);
      }
    }

  };
  return suspense;
}

function hydrateSuspense(node, vnode, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, rendererInternals, hydrateNode) {
  /* eslint-disable no-restricted-globals */
  const suspense = vnode.suspense = createSuspenseBoundary(vnode, parentSuspense, parentComponent, node.parentNode, document.createElement('div'), null, isSVG, slotScopeIds, optimized, rendererInternals, true
  /* hydrating */
  ); // there are two possible scenarios for server-rendered suspense:
  // - success: ssr content should be fully resolved
  // - failure: ssr content should be the fallback branch.
  // however, on the client we don't really know if it has failed or not
  // attempt to hydrate the DOM assuming it has succeeded, but we still
  // need to construct a suspense boundary first

  const result = hydrateNode(node, suspense.pendingBranch = vnode.ssContent, parentComponent, suspense, slotScopeIds, optimized);

  if (suspense.deps === 0) {
    suspense.resolve();
  }

  return result;
  /* eslint-enable no-restricted-globals */
}

function normalizeSuspenseChildren(vnode) {
  const {
    shapeFlag,
    children
  } = vnode;
  const isSlotChildren = shapeFlag & 32
  /* SLOTS_CHILDREN */
  ;
  vnode.ssContent = normalizeSuspenseSlot(isSlotChildren ? children.default : children);
  vnode.ssFallback = isSlotChildren ? normalizeSuspenseSlot(children.fallback) : createVNode(Comment);
}

function normalizeSuspenseSlot(s) {
  let block;

  if (isFunction(s)) {
    const trackBlock = isBlockTreeEnabled && s._c;

    if (trackBlock) {
      // disableTracking: false
      // allow block tracking for compiled slots
      // (see ./componentRenderContext.ts)
      s._d = false;
      openBlock();
    }

    s = s();

    if (trackBlock) {
      s._d = true;
      block = currentBlock;
      closeBlock();
    }
  }

  if (shared_esm_bundler_isArray(s)) {
    const singleChild = filterSingleRoot(s);

    if (false) {}

    s = singleChild;
  }

  s = normalizeVNode(s);

  if (block && !s.dynamicChildren) {
    s.dynamicChildren = block.filter(c => c !== s);
  }

  return s;
}

function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (shared_esm_bundler_isArray(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}

function setActiveBranch(suspense, branch) {
  suspense.activeBranch = branch;
  const {
    vnode,
    parentComponent
  } = suspense;
  const el = vnode.el = branch.el; // in case suspense is the root node of a component,
  // recursively update the HOC el

  if (parentComponent && parentComponent.subTree === vnode) {
    parentComponent.vnode.el = el;
    updateHOCHostEl(parentComponent, el);
  }
}

function provide(key, value) {
  if (!currentInstance) {
    if (false) {}
  } else {
    let provides = currentInstance.provides; // by default an instance inherits its parent's provides object
    // but when it needs to provide values of its own, it creates its
    // own provides object using parent provides object as prototype.
    // this way in `inject` we can simply look up injections from direct
    // parent and let the prototype chain do the work.

    const parentProvides = currentInstance.parent && currentInstance.parent.provides;

    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    } // TS doesn't allow symbol as index type


    provides[key] = value;
  }
}

function runtime_core_esm_bundler_inject(key, defaultValue, treatDefaultAsFactory = false) {
  // fallback to `currentRenderingInstance` so that this can be called in
  // a functional component
  const instance = currentInstance || currentRenderingInstance;

  if (instance) {
    // #2400
    // to support `app.use` plugins,
    // fallback to appContext's `provides` if the instance is at root
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;

    if (provides && key in provides) {
      // TS doesn't allow symbol as index type
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else if (false) {}
  } else if (false) {}
} // Simple effect.


function watchEffect(effect, options) {
  return doWatch(effect, null, options);
}

function watchPostEffect(effect, options) {
  return doWatch(effect, null,  false ? 0 : {
    flush: 'post'
  });
}

function watchSyncEffect(effect, options) {
  return doWatch(effect, null,  false ? 0 : {
    flush: 'sync'
  });
} // initial value for watchers to trigger on undefined initial values


const INITIAL_WATCHER_VALUE = {}; // implementation

function watch(source, cb, options) {
  if (false) {}

  return doWatch(source, cb, options);
}

function doWatch(source, cb, {
  immediate,
  deep,
  flush,
  onTrack,
  onTrigger
} = EMPTY_OBJ) {
  if (false) {}

  const warnInvalidSource = s => {
    runtime_core_esm_bundler_warn(`Invalid watch source: `, s, `A watch source can only be a getter/effect function, a ref, ` + `a reactive object, or an array of these types.`);
  };

  const instance = currentInstance;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;

  if (isRef(source)) {
    getter = () => source.value;

    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => source;

    deep = true;
  } else if (shared_esm_bundler_isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some(s => isReactive(s) || isShallow(s));

    getter = () => source.map(s => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return traverse(s);
      } else if (isFunction(s)) {
        return callWithErrorHandling(s, instance, 2
        /* WATCH_GETTER */
        );
      } else {
         false && 0;
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      // getter with cb
      getter = () => callWithErrorHandling(source, instance, 2
      /* WATCH_GETTER */
      );
    } else {
      // no cb -> simple effect
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }

        if (cleanup) {
          cleanup();
        }

        return callWithAsyncErrorHandling(source, instance, 3
        /* WATCH_CALLBACK */
        , [onCleanup]);
      };
    }
  } else {
    getter = shared_esm_bundler_NOOP;
     false && 0;
  }

  if (cb && deep) {
    const baseGetter = getter;

    getter = () => traverse(baseGetter());
  }

  let cleanup;

  let onCleanup = fn => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, 4
      /* WATCH_CLEANUP */
      );
    };
  }; // in SSR there is no need to setup an actual effect, and it should be noop
  // unless it's eager


  if (isInSSRComponentSetup) {
    // we will also not call the invalidate callback (+ runner is not set up)
    onCleanup = shared_esm_bundler_NOOP;

    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3
      /* WATCH_CALLBACK */
      , [getter(), isMultiSource ? [] : undefined, onCleanup]);
    }

    return shared_esm_bundler_NOOP;
  }

  let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;

  const job = () => {
    if (!effect.active) {
      return;
    }

    if (cb) {
      // watch(source, cb)
      const newValue = effect.run();

      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        // cleanup before running cb again
        if (cleanup) {
          cleanup();
        }

        callWithAsyncErrorHandling(cb, instance, 3
        /* WATCH_CALLBACK */
        , [newValue, // pass undefined as the old value when it's changed for the first time
        oldValue === INITIAL_WATCHER_VALUE ? undefined : oldValue, onCleanup]);
        oldValue = newValue;
      }
    } else {
      // watchEffect
      effect.run();
    }
  }; // important: mark the job as a watcher callback so that scheduler knows
  // it is allowed to self-trigger (#1727)


  job.allowRecurse = !!cb;
  let scheduler;

  if (flush === 'sync') {
    scheduler = job; // the scheduler function gets called directly
  } else if (flush === 'post') {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    // default: 'pre'
    scheduler = () => queuePreFlushCb(job);
  }

  const effect = new ReactiveEffect(getter, scheduler);

  if (false) {} // initial run


  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === 'post') {
    queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }

  return () => {
    effect.stop();

    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
} // this.$watch


function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = shared_esm_bundler_isString(source) ? source.includes('.') ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;

  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }

  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);

  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }

  return res;
}

function createPathGetter(ctx, path) {
  const segments = path.split('.');
  return () => {
    let cur = ctx;

    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }

    return cur;
  };
}

function traverse(value, seen) {
  if (!shared_esm_bundler_isObject(value) || value["__v_skip"
  /* SKIP */
  ]) {
    return value;
  }

  seen = seen || new Set();

  if (seen.has(value)) {
    return value;
  }

  seen.add(value);

  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (shared_esm_bundler_isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach(v => {
      traverse(v, seen);
    });
  } else if (shared_esm_bundler_isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }

  return value;
}

function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: new Map()
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}

const TransitionHookValidator = [Function, Array];
const BaseTransitionImpl = {
  name: `BaseTransition`,
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    // enter
    onBeforeEnter: TransitionHookValidator,
    onEnter: TransitionHookValidator,
    onAfterEnter: TransitionHookValidator,
    onEnterCancelled: TransitionHookValidator,
    // leave
    onBeforeLeave: TransitionHookValidator,
    onLeave: TransitionHookValidator,
    onAfterLeave: TransitionHookValidator,
    onLeaveCancelled: TransitionHookValidator,
    // appear
    onBeforeAppear: TransitionHookValidator,
    onAppear: TransitionHookValidator,
    onAfterAppear: TransitionHookValidator,
    onAppearCancelled: TransitionHookValidator
  },

  setup(props, {
    slots
  }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevTransitionKey;
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);

      if (!children || !children.length) {
        return;
      }

      let child = children[0];

      if (children.length > 1) {
        let hasFound = false; // locate first non-comment child

        for (const c of children) {
          if (c.type !== Comment) {
            if (false) {}

            child = c;
            hasFound = true;
            if (true) break;
          }
        }
      } // there's no need to track reactivity for these props so use the raw
      // props for a bit better perf


      const rawProps = reactivity_esm_bundler_toRaw(props);
      const {
        mode
      } = rawProps; // check mode

      if (false) {}

      if (state.isLeaving) {
        return emptyPlaceholder(child);
      } // in the case of <transition><keep-alive/></transition>, we need to
      // compare the type of the kept-alive children.


      const innerChild = getKeepAliveChild(child);

      if (!innerChild) {
        return emptyPlaceholder(child);
      }

      const enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
      setTransitionHooks(innerChild, enterHooks);
      const oldChild = instance.subTree;
      const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      let transitionKeyChanged = false;
      const {
        getTransitionKey
      } = innerChild.type;

      if (getTransitionKey) {
        const key = getTransitionKey();

        if (prevTransitionKey === undefined) {
          prevTransitionKey = key;
        } else if (key !== prevTransitionKey) {
          prevTransitionKey = key;
          transitionKeyChanged = true;
        }
      } // handle mode


      if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
        const leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance); // update old tree's hooks in case of dynamic transition

        setTransitionHooks(oldInnerChild, leavingHooks); // switching between different views

        if (mode === 'out-in') {
          state.isLeaving = true; // return placeholder node and queue update when leave finishes

          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            instance.update();
          };

          return emptyPlaceholder(child);
        } else if (mode === 'in-out' && innerChild.type !== Comment) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild; // early removal callback

            el._leaveCb = () => {
              earlyRemove();
              el._leaveCb = undefined;
              delete enterHooks.delayedLeave;
            };

            enterHooks.delayedLeave = delayedLeave;
          };
        }
      }

      return child;
    };
  }

}; // export the public type for h/tsx inference
// also to avoid inline import() in generated d.ts files

const BaseTransition = BaseTransitionImpl;

function getLeavingNodesForType(state, vnode) {
  const {
    leavingVNodes
  } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);

  if (!leavingVNodesCache) {
    leavingVNodesCache = Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }

  return leavingVNodesCache;
} // The transition hooks are attached to the vnode as vnode.transition
// and will be called at appropriate timing in the renderer.


function resolveTransitionHooks(vnode, props, state, instance) {
  const {
    appear,
    mode,
    persisted = false,
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onEnterCancelled,
    onBeforeLeave,
    onLeave,
    onAfterLeave,
    onLeaveCancelled,
    onBeforeAppear,
    onAppear,
    onAfterAppear,
    onAppearCancelled
  } = props;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);

  const callHook = (hook, args) => {
    hook && callWithAsyncErrorHandling(hook, instance, 9
    /* TRANSITION_HOOK */
    , args);
  };

  const callAsyncHook = (hook, args) => {
    const done = args[1];
    callHook(hook, args);

    if (shared_esm_bundler_isArray(hook)) {
      if (hook.every(hook => hook.length <= 1)) done();
    } else if (hook.length <= 1) {
      done();
    }
  };

  const hooks = {
    mode,
    persisted,

    beforeEnter(el) {
      let hook = onBeforeEnter;

      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      } // for same element (v-show)


      if (el._leaveCb) {
        el._leaveCb(true
        /* cancelled */
        );
      } // for toggled element with same key (v-if)


      const leavingVNode = leavingVNodesCache[key];

      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
        // force early removal (not cancelled)
        leavingVNode.el._leaveCb();
      }

      callHook(hook, [el]);
    },

    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;

      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }

      let called = false;

      const done = el._enterCb = cancelled => {
        if (called) return;
        called = true;

        if (cancelled) {
          callHook(cancelHook, [el]);
        } else {
          callHook(afterHook, [el]);
        }

        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }

        el._enterCb = undefined;
      };

      if (hook) {
        callAsyncHook(hook, [el, done]);
      } else {
        done();
      }
    },

    leave(el, remove) {
      const key = String(vnode.key);

      if (el._enterCb) {
        el._enterCb(true
        /* cancelled */
        );
      }

      if (state.isUnmounting) {
        return remove();
      }

      callHook(onBeforeLeave, [el]);
      let called = false;

      const done = el._leaveCb = cancelled => {
        if (called) return;
        called = true;
        remove();

        if (cancelled) {
          callHook(onLeaveCancelled, [el]);
        } else {
          callHook(onAfterLeave, [el]);
        }

        el._leaveCb = undefined;

        if (leavingVNodesCache[key] === vnode) {
          delete leavingVNodesCache[key];
        }
      };

      leavingVNodesCache[key] = vnode;

      if (onLeave) {
        callAsyncHook(onLeave, [el, done]);
      } else {
        done();
      }
    },

    clone(vnode) {
      return resolveTransitionHooks(vnode, props, state, instance);
    }

  };
  return hooks;
} // the placeholder really only handles one special case: KeepAlive
// in the case of a KeepAlive in a leave phase we need to return a KeepAlive
// placeholder with empty content to avoid the KeepAlive instance from being
// unmounted.


function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}

function getKeepAliveChild(vnode) {
  return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : undefined : vnode;
}

function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6
  /* COMPONENT */
  && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128
  /* SUSPENSE */
  ) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}

function getTransitionRawChildren(children, keepComment = false, parentKey) {
  let ret = [];
  let keyedFragmentCount = 0;

  for (let i = 0; i < children.length; i++) {
    let child = children[i]; // #5360 inherit parent key in case of <template v-for>

    const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i); // handle fragment children case, e.g. v-for

    if (child.type === runtime_core_esm_bundler_Fragment) {
      if (child.patchFlag & 128
      /* KEYED_FRAGMENT */
      ) keyedFragmentCount++;
      ret = ret.concat(getTransitionRawChildren(child.children, keepComment, key));
    } // comment placeholders should be skipped, e.g. v-if
    else if (keepComment || child.type !== Comment) {
      ret.push(key != null ? cloneVNode(child, {
        key
      }) : child);
    }
  } // #1126 if a transition children list contains multiple sub fragments, these
  // fragments will be merged into a flat children array. Since each v-for
  // fragment may contain different static bindings inside, we need to de-op
  // these children to force full diffs to ensure correct behavior.


  if (keyedFragmentCount > 1) {
    for (let i = 0; i < ret.length; i++) {
      ret[i].patchFlag = -2
      /* BAIL */
      ;
    }
  }

  return ret;
} // implementation, close to no-op


function defineComponent(options) {
  return isFunction(options) ? {
    setup: options,
    name: options.name
  } : options;
}

const isAsyncWrapper = i => !!i.type.__asyncLoader;

function defineAsyncComponent(source) {
  if (isFunction(source)) {
    source = {
      loader: source
    };
  }

  const {
    loader,
    loadingComponent,
    errorComponent,
    delay = 200,
    timeout,
    // undefined = never times out
    suspensible = true,
    onError: userOnError
  } = source;
  let pendingRequest = null;
  let resolvedComp;
  let retries = 0;

  const retry = () => {
    retries++;
    pendingRequest = null;
    return load();
  };

  const load = () => {
    let thisRequest;
    return pendingRequest || (thisRequest = pendingRequest = loader().catch(err => {
      err = err instanceof Error ? err : new Error(String(err));

      if (userOnError) {
        return new Promise((resolve, reject) => {
          const userRetry = () => resolve(retry());

          const userFail = () => reject(err);

          userOnError(err, userRetry, userFail, retries + 1);
        });
      } else {
        throw err;
      }
    }).then(comp => {
      if (thisRequest !== pendingRequest && pendingRequest) {
        return pendingRequest;
      }

      if (false) {} // interop module default


      if (comp && (comp.__esModule || comp[Symbol.toStringTag] === 'Module')) {
        comp = comp.default;
      }

      if (false) {}

      resolvedComp = comp;
      return comp;
    }));
  };

  return defineComponent({
    name: 'AsyncComponentWrapper',
    __asyncLoader: load,

    get __asyncResolved() {
      return resolvedComp;
    },

    setup() {
      const instance = currentInstance; // already resolved

      if (resolvedComp) {
        return () => createInnerComp(resolvedComp, instance);
      }

      const onError = err => {
        pendingRequest = null;
        handleError(err, instance, 13
        /* ASYNC_COMPONENT_LOADER */
        , !errorComponent
        /* do not throw in dev if user provided error component */
        );
      }; // suspense-controlled or SSR.


      if (suspensible && instance.suspense || isInSSRComponentSetup) {
        return load().then(comp => {
          return () => createInnerComp(comp, instance);
        }).catch(err => {
          onError(err);
          return () => errorComponent ? createVNode(errorComponent, {
            error: err
          }) : null;
        });
      }

      const loaded = ref(false);
      const error = ref();
      const delayed = ref(!!delay);

      if (delay) {
        setTimeout(() => {
          delayed.value = false;
        }, delay);
      }

      if (timeout != null) {
        setTimeout(() => {
          if (!loaded.value && !error.value) {
            const err = new Error(`Async component timed out after ${timeout}ms.`);
            onError(err);
            error.value = err;
          }
        }, timeout);
      }

      load().then(() => {
        loaded.value = true;

        if (instance.parent && isKeepAlive(instance.parent.vnode)) {
          // parent is keep-alive, force update so the loaded component's
          // name is taken into account
          queueJob(instance.parent.update);
        }
      }).catch(err => {
        onError(err);
        error.value = err;
      });
      return () => {
        if (loaded.value && resolvedComp) {
          return createInnerComp(resolvedComp, instance);
        } else if (error.value && errorComponent) {
          return createVNode(errorComponent, {
            error: error.value
          });
        } else if (loadingComponent && !delayed.value) {
          return createVNode(loadingComponent);
        }
      };
    }

  });
}

function createInnerComp(comp, {
  vnode: {
    ref,
    props,
    children,
    shapeFlag
  },
  parent
}) {
  const vnode = createVNode(comp, props, children); // ensure inner component inherits the async wrapper's ref owner

  vnode.ref = ref;
  return vnode;
}

const isKeepAlive = vnode => vnode.type.__isKeepAlive;

const KeepAliveImpl = {
  name: `KeepAlive`,
  // Marker for special handling inside the renderer. We are not using a ===
  // check directly on KeepAlive in the renderer, because importing it directly
  // would prevent it from being tree-shaken.
  __isKeepAlive: true,
  props: {
    include: [String, RegExp, Array],
    exclude: [String, RegExp, Array],
    max: [String, Number]
  },

  setup(props, {
    slots
  }) {
    const instance = getCurrentInstance(); // KeepAlive communicates with the instantiated renderer via the
    // ctx where the renderer passes in its internals,
    // and the KeepAlive instance exposes activate/deactivate implementations.
    // The whole point of this is to avoid importing KeepAlive directly in the
    // renderer to facilitate tree-shaking.

    const sharedContext = instance.ctx; // if the internal renderer is not registered, it indicates that this is server-side rendering,
    // for KeepAlive, we just need to render its children

    if (!sharedContext.renderer) {
      return () => {
        const children = slots.default && slots.default();
        return children && children.length === 1 ? children[0] : children;
      };
    }

    const cache = new Map();
    const keys = new Set();
    let current = null;

    if (false) {}

    const parentSuspense = instance.suspense;
    const {
      renderer: {
        p: patch,
        m: move,
        um: _unmount,
        o: {
          createElement
        }
      }
    } = sharedContext;
    const storageContainer = createElement('div');

    sharedContext.activate = (vnode, container, anchor, isSVG, optimized) => {
      const instance = vnode.component;
      move(vnode, container, anchor, 0
      /* ENTER */
      , parentSuspense); // in case props have changed

      patch(instance.vnode, vnode, container, anchor, instance, parentSuspense, isSVG, vnode.slotScopeIds, optimized);
      queuePostRenderEffect(() => {
        instance.isDeactivated = false;

        if (instance.a) {
          invokeArrayFns(instance.a);
        }

        const vnodeHook = vnode.props && vnode.props.onVnodeMounted;

        if (vnodeHook) {
          invokeVNodeHook(vnodeHook, instance.parent, vnode);
        }
      }, parentSuspense);

      if (false) {}
    };

    sharedContext.deactivate = vnode => {
      const instance = vnode.component;
      move(vnode, storageContainer, null, 1
      /* LEAVE */
      , parentSuspense);
      queuePostRenderEffect(() => {
        if (instance.da) {
          invokeArrayFns(instance.da);
        }

        const vnodeHook = vnode.props && vnode.props.onVnodeUnmounted;

        if (vnodeHook) {
          invokeVNodeHook(vnodeHook, instance.parent, vnode);
        }

        instance.isDeactivated = true;
      }, parentSuspense);

      if (false) {}
    };

    function unmount(vnode) {
      // reset the shapeFlag so it can be properly unmounted
      resetShapeFlag(vnode);

      _unmount(vnode, instance, parentSuspense, true);
    }

    function pruneCache(filter) {
      cache.forEach((vnode, key) => {
        const name = getComponentName(vnode.type);

        if (name && (!filter || !filter(name))) {
          pruneCacheEntry(key);
        }
      });
    }

    function pruneCacheEntry(key) {
      const cached = cache.get(key);

      if (!current || cached.type !== current.type) {
        unmount(cached);
      } else if (current) {
        // current active instance should no longer be kept-alive.
        // we can't unmount it now but it might be later, so reset its flag now.
        resetShapeFlag(current);
      }

      cache.delete(key);
      keys.delete(key);
    } // prune cache on include/exclude prop change


    watch(() => [props.include, props.exclude], ([include, exclude]) => {
      include && pruneCache(name => matches(include, name));
      exclude && pruneCache(name => !matches(exclude, name));
    }, // prune post-render after `current` has been updated
    {
      flush: 'post',
      deep: true
    }); // cache sub tree after render

    let pendingCacheKey = null;

    const cacheSubtree = () => {
      // fix #1621, the pendingCacheKey could be 0
      if (pendingCacheKey != null) {
        cache.set(pendingCacheKey, getInnerChild(instance.subTree));
      }
    };

    onMounted(cacheSubtree);
    onUpdated(cacheSubtree);
    onBeforeUnmount(() => {
      cache.forEach(cached => {
        const {
          subTree,
          suspense
        } = instance;
        const vnode = getInnerChild(subTree);

        if (cached.type === vnode.type) {
          // current instance will be unmounted as part of keep-alive's unmount
          resetShapeFlag(vnode); // but invoke its deactivated hook here

          const da = vnode.component.da;
          da && queuePostRenderEffect(da, suspense);
          return;
        }

        unmount(cached);
      });
    });
    return () => {
      pendingCacheKey = null;

      if (!slots.default) {
        return null;
      }

      const children = slots.default();
      const rawVNode = children[0];

      if (children.length > 1) {
        if (false) {}

        current = null;
        return children;
      } else if (!runtime_core_esm_bundler_isVNode(rawVNode) || !(rawVNode.shapeFlag & 4
      /* STATEFUL_COMPONENT */
      ) && !(rawVNode.shapeFlag & 128
      /* SUSPENSE */
      )) {
        current = null;
        return rawVNode;
      }

      let vnode = getInnerChild(rawVNode);
      const comp = vnode.type; // for async components, name check should be based in its loaded
      // inner component if available

      const name = getComponentName(isAsyncWrapper(vnode) ? vnode.type.__asyncResolved || {} : comp);
      const {
        include,
        exclude,
        max
      } = props;

      if (include && (!name || !matches(include, name)) || exclude && name && matches(exclude, name)) {
        current = vnode;
        return rawVNode;
      }

      const key = vnode.key == null ? comp : vnode.key;
      const cachedVNode = cache.get(key); // clone vnode if it's reused because we are going to mutate it

      if (vnode.el) {
        vnode = cloneVNode(vnode);

        if (rawVNode.shapeFlag & 128
        /* SUSPENSE */
        ) {
          rawVNode.ssContent = vnode;
        }
      } // #1513 it's possible for the returned vnode to be cloned due to attr
      // fallthrough or scopeId, so the vnode here may not be the final vnode
      // that is mounted. Instead of caching it directly, we store the pending
      // key and cache `instance.subTree` (the normalized vnode) in
      // beforeMount/beforeUpdate hooks.


      pendingCacheKey = key;

      if (cachedVNode) {
        // copy over mounted state
        vnode.el = cachedVNode.el;
        vnode.component = cachedVNode.component;

        if (vnode.transition) {
          // recursively update transition hooks on subTree
          setTransitionHooks(vnode, vnode.transition);
        } // avoid vnode being mounted as fresh


        vnode.shapeFlag |= 512
        /* COMPONENT_KEPT_ALIVE */
        ; // make this key the freshest

        keys.delete(key);
        keys.add(key);
      } else {
        keys.add(key); // prune oldest entry

        if (max && keys.size > parseInt(max, 10)) {
          pruneCacheEntry(keys.values().next().value);
        }
      } // avoid vnode being unmounted


      vnode.shapeFlag |= 256
      /* COMPONENT_SHOULD_KEEP_ALIVE */
      ;
      current = vnode;
      return isSuspense(rawVNode.type) ? rawVNode : vnode;
    };
  }

}; // export the public type for h/tsx inference
// also to avoid inline import() in generated d.ts files

const KeepAlive = KeepAliveImpl;

function matches(pattern, name) {
  if (shared_esm_bundler_isArray(pattern)) {
    return pattern.some(p => matches(p, name));
  } else if (shared_esm_bundler_isString(pattern)) {
    return pattern.split(',').includes(name);
  } else if (pattern.test) {
    return pattern.test(name);
  }
  /* istanbul ignore next */


  return false;
}

function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a"
  /* ACTIVATED */
  , target);
}

function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da"
  /* DEACTIVATED */
  , target);
}

function registerKeepAliveHook(hook, type, target = currentInstance) {
  // cache the deactivate branch check wrapper for injected hooks so the same
  // hook can be properly deduped by the scheduler. "__wdc" stands for "with
  // deactivation check".
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    // only fire the hook if the target instance is NOT in a deactivated branch.
    let current = target;

    while (current) {
      if (current.isDeactivated) {
        return;
      }

      current = current.parent;
    }

    return hook();
  });

  injectHook(type, wrappedHook, target); // In addition to registering it on the target instance, we walk up the parent
  // chain and register it on all ancestor instances that are keep-alive roots.
  // This avoids the need to walk the entire component tree when invoking these
  // hooks, and more importantly, avoids the need to track child components in
  // arrays.

  if (target) {
    let current = target.parent;

    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }

      current = current.parent;
    }
  }
}

function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  // injectHook wraps the original for error handling, so make sure to remove
  // the wrapped version.
  const injected = injectHook(type, hook, keepAliveRoot, true
  /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}

function resetShapeFlag(vnode) {
  let shapeFlag = vnode.shapeFlag;

  if (shapeFlag & 256
  /* COMPONENT_SHOULD_KEEP_ALIVE */
  ) {
    shapeFlag -= 256
    /* COMPONENT_SHOULD_KEEP_ALIVE */
    ;
  }

  if (shapeFlag & 512
  /* COMPONENT_KEPT_ALIVE */
  ) {
    shapeFlag -= 512
    /* COMPONENT_KEPT_ALIVE */
    ;
  }

  vnode.shapeFlag = shapeFlag;
}

function getInnerChild(vnode) {
  return vnode.shapeFlag & 128
  /* SUSPENSE */
  ? vnode.ssContent : vnode;
}

function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []); // cache the error handling wrapper for injected hooks so the same hook
    // can be properly deduped by the scheduler. "__weh" stands for "with error
    // handling".

    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      } // disable tracking inside all lifecycle hooks
      // since they can potentially be called inside effects.


      pauseTracking(); // Set currentInstance during hook invocation.
      // This assumes the hook does not synchronously trigger other hooks, which
      // can only be false when the user does something really funky.

      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });

    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }

    return wrappedHook;
  } else if (false) {}
}

const createHook = lifecycle => (hook, target = currentInstance) => // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
(!isInSSRComponentSetup || lifecycle === "sp"
/* SERVER_PREFETCH */
) && injectHook(lifecycle, hook, target);

const onBeforeMount = createHook("bm"
/* BEFORE_MOUNT */
);
const onMounted = createHook("m"
/* MOUNTED */
);
const onBeforeUpdate = createHook("bu"
/* BEFORE_UPDATE */
);
const onUpdated = createHook("u"
/* UPDATED */
);
const onBeforeUnmount = createHook("bum"
/* BEFORE_UNMOUNT */
);
const onUnmounted = createHook("um"
/* UNMOUNTED */
);
const onServerPrefetch = createHook("sp"
/* SERVER_PREFETCH */
);
const onRenderTriggered = createHook("rtg"
/* RENDER_TRIGGERED */
);
const onRenderTracked = createHook("rtc"
/* RENDER_TRACKED */
);

function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec"
  /* ERROR_CAPTURED */
  , hook, target);
}
/**
Runtime helper for applying directives to a vnode. Example usage:

const comp = resolveComponent('comp')
const foo = resolveDirective('foo')
const bar = resolveDirective('bar')

return withDirectives(h(comp), [
  [foo, this.x],
  [bar, this.y]
])
*/


function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    runtime_core_esm_bundler_warn('Do not use built-in directive ids as custom directive id: ' + name);
  }
}
/**
 * Adds directives to a VNode.
 */


function withDirectives(vnode, directives) {
  const internalInstance = currentRenderingInstance;

  if (internalInstance === null) {
     false && 0;
    return vnode;
  }

  const instance = getExposeProxy(internalInstance) || internalInstance.proxy;
  const bindings = vnode.dirs || (vnode.dirs = []);

  for (let i = 0; i < directives.length; i++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];

    if (isFunction(dir)) {
      dir = {
        mounted: dir,
        updated: dir
      };
    }

    if (dir.deep) {
      traverse(value);
    }

    bindings.push({
      dir,
      instance,
      value,
      oldValue: void 0,
      arg,
      modifiers
    });
  }

  return vnode;
}

function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;

  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];

    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }

    let hook = binding.dir[name];

    if (hook) {
      // disable tracking inside all lifecycle hooks
      // since they can potentially be called inside effects.
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8
      /* DIRECTIVE_HOOK */
      , [vnode.el, binding, vnode, prevVNode]);
      resetTracking();
    }
  }
}

const COMPONENTS = 'components';
const DIRECTIVES = 'directives';
/**
 * @private
 */

function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}

const NULL_DYNAMIC_COMPONENT = Symbol();
/**
 * @private
 */

function resolveDynamicComponent(component) {
  if (shared_esm_bundler_isString(component)) {
    return resolveAsset(COMPONENTS, component, false) || component;
  } else {
    // invalid types will fallthrough to createVNode and raise warning
    return component || NULL_DYNAMIC_COMPONENT;
  }
}
/**
 * @private
 */


function resolveDirective(name) {
  return resolveAsset(DIRECTIVES, name);
} // implementation


function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;

  if (instance) {
    const Component = instance.type; // explicit self name has highest priority

    if (type === COMPONENTS) {
      const selfName = getComponentName(Component);

      if (selfName && (selfName === name || selfName === shared_esm_bundler_camelize(name) || selfName === shared_esm_bundler_capitalize(shared_esm_bundler_camelize(name)))) {
        return Component;
      }
    }

    const res = // local registration
    // check instance[type] first which is resolved for options API
    resolve(instance[type] || Component[type], name) || // global registration
    resolve(instance.appContext[type], name);

    if (!res && maybeSelfReference) {
      // fallback to implicit self-reference
      return Component;
    }

    if (false) {}

    return res;
  } else if (false) {}
}

function resolve(registry, name) {
  return registry && (registry[name] || registry[shared_esm_bundler_camelize(name)] || registry[shared_esm_bundler_capitalize(shared_esm_bundler_camelize(name))]);
}
/**
 * Actual implementation
 */


function renderList(source, renderItem, cache, index) {
  let ret;
  const cached = cache && cache[index];

  if (shared_esm_bundler_isArray(source) || shared_esm_bundler_isString(source)) {
    ret = new Array(source.length);

    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, undefined, cached && cached[i]);
    }
  } else if (typeof source === 'number') {
    if (false) {}

    ret = new Array(source);

    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, undefined, cached && cached[i]);
    }
  } else if (shared_esm_bundler_isObject(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i) => renderItem(item, i, undefined, cached && cached[i]));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);

      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached && cached[i]);
      }
    }
  } else {
    ret = [];
  }

  if (cache) {
    cache[index] = ret;
  }

  return ret;
}
/**
 * Compiler runtime helper for creating dynamic slots object
 * @private
 */


function createSlots(slots, dynamicSlots) {
  for (let i = 0; i < dynamicSlots.length; i++) {
    const slot = dynamicSlots[i]; // array of dynamic slot generated by <template v-for="..." #[...]>

    if (shared_esm_bundler_isArray(slot)) {
      for (let j = 0; j < slot.length; j++) {
        slots[slot[j].name] = slot[j].fn;
      }
    } else if (slot) {
      // conditional single slot generated by <template v-if="..." #foo>
      slots[slot.name] = slot.fn;
    }
  }

  return slots;
}
/**
 * Compiler runtime helper for rendering `<slot/>`
 * @private
 */


function renderSlot(slots, name, props = {}, // this is not a user-facing function, so the fallback is always generated by
// the compiler and guaranteed to be a function returning an array
fallback, noSlotted) {
  if (currentRenderingInstance.isCE || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.isCE) {
    return createVNode('slot', name === 'default' ? null : {
      name
    }, fallback && fallback());
  }

  let slot = slots[name];

  if (false) {} // a compiled slot disables block tracking by default to avoid manual
  // invocation interfering with template-based block tracking, but in
  // `renderSlot` we can be sure that it's template-based so we can force
  // enable it.


  if (slot && slot._c) {
    slot._d = false;
  }

  openBlock();
  const validSlotContent = slot && ensureValidVNode(slot(props));
  const rendered = createBlock(runtime_core_esm_bundler_Fragment, {
    key: props.key || `_${name}`
  }, validSlotContent || (fallback ? fallback() : []), validSlotContent && slots._ === 1
  /* STABLE */
  ? 64
  /* STABLE_FRAGMENT */
  : -2
  /* BAIL */
  );

  if (!noSlotted && rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + '-s'];
  }

  if (slot && slot._c) {
    slot._d = true;
  }

  return rendered;
}

function ensureValidVNode(vnodes) {
  return vnodes.some(child => {
    if (!runtime_core_esm_bundler_isVNode(child)) return true;
    if (child.type === Comment) return false;
    if (child.type === runtime_core_esm_bundler_Fragment && !ensureValidVNode(child.children)) return false;
    return true;
  }) ? vnodes : null;
}
/**
 * For prefixing keys in v-on="obj" with "on"
 * @private
 */


function toHandlers(obj) {
  const ret = {};

  if (false) {}

  for (const key in obj) {
    ret[toHandlerKey(key)] = obj[key];
  }

  return ret;
}
/**
 * #2437 In Vue 3, functional components do not have a public instance proxy but
 * they exist in the internal parent chain. For code that relies on traversing
 * public $parent chains, skip functional ones and go to the parent instead.
 */


const getPublicInstance = i => {
  if (!i) return null;
  if (isStatefulComponent(i)) return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};

const publicPropertiesMap = // Move PURE marker to new line to workaround compiler discarding it
// due to type annotation

/*#__PURE__*/
shared_esm_bundler_extend(Object.create(null), {
  $: i => i,
  $el: i => i.vnode.el,
  $data: i => i.data,
  $props: i =>  false ? 0 : i.props,
  $attrs: i =>  false ? 0 : i.attrs,
  $slots: i =>  false ? 0 : i.slots,
  $refs: i =>  false ? 0 : i.refs,
  $parent: i => getPublicInstance(i.parent),
  $root: i => getPublicInstance(i.root),
  $emit: i => i.emit,
  $options: i =>  true ? resolveMergedOptions(i) : 0,
  $forceUpdate: i => i.f || (i.f = () => queueJob(i.update)),
  $nextTick: i => i.n || (i.n = runtime_core_esm_bundler_nextTick.bind(i.proxy)),
  $watch: i =>  true ? instanceWatch.bind(i) : 0
});

const isReservedPrefix = key => key === '_' || key === '$';

const PublicInstanceProxyHandlers = {
  get({
    _: instance
  }, key) {
    const {
      ctx,
      setupState,
      data,
      props,
      accessCache,
      type,
      appContext
    } = instance; // for internal formatters to know that this is a Vue instance

    if (false) {} // prioritize <script setup> bindings during dev.
    // this allows even properties that start with _ or $ to be used - so that
    // it aligns with the production behavior where the render fn is inlined and
    // indeed has access to all declared variables.


    if (false) {} // data / props / ctx
    // This getter gets called for every property access on the render context
    // during render and is a major hotspot. The most expensive part of this
    // is the multiple hasOwn() calls. It's much faster to do a simple property
    // access on a plain object, so we use an accessCache object (with null
    // prototype) to memoize what access type a key corresponds to.


    let normalizedProps;

    if (key[0] !== '$') {
      const n = accessCache[key];

      if (n !== undefined) {
        switch (n) {
          case 1
          /* SETUP */
          :
            return setupState[key];

          case 2
          /* DATA */
          :
            return data[key];

          case 4
          /* CONTEXT */
          :
            return ctx[key];

          case 3
          /* PROPS */
          :
            return props[key];
          // default: just fallthrough
        }
      } else if (setupState !== EMPTY_OBJ && shared_esm_bundler_hasOwn(setupState, key)) {
        accessCache[key] = 1
        /* SETUP */
        ;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && shared_esm_bundler_hasOwn(data, key)) {
        accessCache[key] = 2
        /* DATA */
        ;
        return data[key];
      } else if ( // only cache other properties when instance has declared (thus stable)
      // props
      (normalizedProps = instance.propsOptions[0]) && shared_esm_bundler_hasOwn(normalizedProps, key)) {
        accessCache[key] = 3
        /* PROPS */
        ;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && shared_esm_bundler_hasOwn(ctx, key)) {
        accessCache[key] = 4
        /* CONTEXT */
        ;
        return ctx[key];
      } else if ( false || shouldCacheAccess) {
        accessCache[key] = 0
        /* OTHER */
        ;
      }
    }

    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties; // public $xxx properties

    if (publicGetter) {
      if (key === '$attrs') {
        track(instance, "get"
        /* GET */
        , key);
         false && 0;
      }

      return publicGetter(instance);
    } else if ( // css module (injected by vue-loader)
    (cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && shared_esm_bundler_hasOwn(ctx, key)) {
      // user may set custom properties to `this` that start with `$`
      accessCache[key] = 4
      /* CONTEXT */
      ;
      return ctx[key];
    } else if ( // global properties
    globalProperties = appContext.config.globalProperties, shared_esm_bundler_hasOwn(globalProperties, key)) {
      {
        return globalProperties[key];
      }
    } else if (false) {}
  },

  set({
    _: instance
  }, key, value) {
    const {
      data,
      setupState,
      ctx
    } = instance;

    if (setupState !== EMPTY_OBJ && shared_esm_bundler_hasOwn(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && shared_esm_bundler_hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (shared_esm_bundler_hasOwn(instance.props, key)) {
       false && 0;
      return false;
    }

    if (key[0] === '$' && key.slice(1) in instance) {
       false && 0;
      return false;
    } else {
      if (false) {} else {
        ctx[key] = value;
      }
    }

    return true;
  },

  has({
    _: {
      data,
      setupState,
      accessCache,
      ctx,
      appContext,
      propsOptions
    }
  }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && shared_esm_bundler_hasOwn(data, key) || setupState !== EMPTY_OBJ && shared_esm_bundler_hasOwn(setupState, key) || (normalizedProps = propsOptions[0]) && shared_esm_bundler_hasOwn(normalizedProps, key) || shared_esm_bundler_hasOwn(ctx, key) || shared_esm_bundler_hasOwn(publicPropertiesMap, key) || shared_esm_bundler_hasOwn(appContext.config.globalProperties, key);
  },

  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      // invalidate key cache of a getter based property #5417
      target._.accessCache[key] = 0;
    } else if (shared_esm_bundler_hasOwn(descriptor, 'value')) {
      this.set(target, key, descriptor.value, null);
    }

    return Reflect.defineProperty(target, key, descriptor);
  }

};

if (false) {}

const RuntimeCompiledPublicInstanceProxyHandlers = /*#__PURE__*/shared_esm_bundler_extend({}, PublicInstanceProxyHandlers, {
  get(target, key) {
    // fast path for unscopables when using `with` block
    if (key === Symbol.unscopables) {
      return;
    }

    return PublicInstanceProxyHandlers.get(target, key, target);
  },

  has(_, key) {
    const has = key[0] !== '_' && !isGloballyWhitelisted(key);

    if (false) {}

    return has;
  }

}); // dev only
// In dev mode, the proxy target exposes the same properties as seen on `this`
// for easier console inspection. In prod mode it will be an empty object so
// these properties definitions can be skipped.

function createDevRenderContext(instance) {
  const target = {}; // expose internal instance for proxy handlers

  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  }); // expose public properties

  Object.keys(publicPropertiesMap).forEach(key => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: NOOP
    });
  });
  return target;
} // dev only


function exposePropsOnRenderContext(instance) {
  const {
    ctx,
    propsOptions: [propsOptions]
  } = instance;

  if (propsOptions) {
    Object.keys(propsOptions).forEach(key => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
} // dev only


function exposeSetupStateOnRenderContext(instance) {
  const {
    ctx,
    setupState
  } = instance;
  Object.keys(toRaw(setupState)).forEach(key => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        runtime_core_esm_bundler_warn(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" ` + `which are reserved prefixes for Vue internals.`);
        return;
      }

      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}

function createDuplicateChecker() {
  const cache = Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      runtime_core_esm_bundler_warn(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}

let shouldCacheAccess = true;

function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx; // do not cache property access on public proxy during state initialization

  shouldCacheAccess = false; // call beforeCreate first before accessing other options since
  // the hook may mutate resolved options (#2791)

  if (options.beforeCreate) {
    callHook(options.beforeCreate, instance, "bc"
    /* BEFORE_CREATE */
    );
  }

  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties =  false ? 0 : null;

  if (false) {} // options initialization order (to be consistent with Vue 2):
  // - props (already done outside of this function)
  // - inject
  // - methods
  // - data (deferred since it relies on `this` access)
  // - computed
  // - watch (deferred since it relies on `this` access)


  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }

  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];

      if (isFunction(methodHandler)) {
        // In dev mode, we use the `createRenderContext` function to define
        // methods to the proxy target, and those are read-only but
        // reconfigurable, so it needs to be redefined here
        if (false) {} else {
          ctx[key] = methodHandler.bind(publicThis);
        }

        if (false) {}
      } else if (false) {}
    }
  }

  if (dataOptions) {
    if (false) {}

    const data = dataOptions.call(publicThis, publicThis);

    if (false) {}

    if (!shared_esm_bundler_isObject(data)) {
       false && 0;
    } else {
      instance.data = reactive(data);

      if (false) {}
    }
  } // state initialization complete at this point - start caching access


  shouldCacheAccess = true;

  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : shared_esm_bundler_NOOP;

      if (false) {}

      const set = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) :  false ? 0 : shared_esm_bundler_NOOP;
      const c = runtime_core_esm_bundler_computed({
        get,
        set
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: v => c.value = v
      });

      if (false) {}
    }
  }

  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }

  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach(key => {
      provide(key, provides[key]);
    });
  }

  if (created) {
    callHook(created, instance, "c"
    /* CREATED */
    );
  }

  function registerLifecycleHook(register, hook) {
    if (shared_esm_bundler_isArray(hook)) {
      hook.forEach(_hook => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }

  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);

  if (shared_esm_bundler_isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach(key => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: val => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  } // options that are handled when creating the instance but also need to be
  // applied from mixins


  if (render && instance.render === shared_esm_bundler_NOOP) {
    instance.render = render;
  }

  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  } // asset options.


  if (components) instance.components = components;
  if (directives) instance.directives = directives;
}

function resolveInjections(injectOptions, ctx, checkDuplicateProperties = shared_esm_bundler_NOOP, unwrapRef = false) {
  if (shared_esm_bundler_isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }

  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;

    if (shared_esm_bundler_isObject(opt)) {
      if ('default' in opt) {
        injected = runtime_core_esm_bundler_inject(opt.from || key, opt.default, true
        /* treat default function as factory */
        );
      } else {
        injected = runtime_core_esm_bundler_inject(opt.from || key);
      }
    } else {
      injected = runtime_core_esm_bundler_inject(opt);
    }

    if (isRef(injected)) {
      // TODO remove the check in 3.3
      if (unwrapRef) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: v => injected.value = v
        });
      } else {
        if (false) {}

        ctx[key] = injected;
      }
    } else {
      ctx[key] = injected;
    }

    if (false) {}
  }
}

function callHook(hook, instance, type) {
  callWithAsyncErrorHandling(shared_esm_bundler_isArray(hook) ? hook.map(h => h.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}

function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes('.') ? createPathGetter(publicThis, key) : () => publicThis[key];

  if (shared_esm_bundler_isString(raw)) {
    const handler = ctx[raw];

    if (isFunction(handler)) {
      watch(getter, handler);
    } else if (false) {}
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (shared_esm_bundler_isObject(raw)) {
    if (shared_esm_bundler_isArray(raw)) {
      raw.forEach(r => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];

      if (isFunction(handler)) {
        watch(getter, handler, raw);
      } else if (false) {}
    }
  } else if (false) {}
}
/**
 * Resolve merged options and cache it on the component.
 * This is done only once per-component since the merging does not involve
 * instances.
 */


function resolveMergedOptions(instance) {
  const base = instance.type;
  const {
    mixins,
    extends: extendsOptions
  } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: {
      optionMergeStrategies
    }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;

  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};

    if (globalMixins.length) {
      globalMixins.forEach(m => mergeOptions(resolved, m, optionMergeStrategies, true));
    }

    mergeOptions(resolved, base, optionMergeStrategies);
  }

  cache.set(base, resolved);
  return resolved;
}

function mergeOptions(to, from, strats, asMixin = false) {
  const {
    mixins,
    extends: extendsOptions
  } = from;

  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }

  if (mixins) {
    mixins.forEach(m => mergeOptions(to, m, strats, true));
  }

  for (const key in from) {
    if (asMixin && key === 'expose') {
       false && 0;
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }

  return to;
}

const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};

function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }

  if (!to) {
    return from;
  }

  return function mergedDataFn() {
    return shared_esm_bundler_extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
  };
}

function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}

function normalizeInject(raw) {
  if (shared_esm_bundler_isArray(raw)) {
    const res = {};

    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }

    return res;
  }

  return raw;
}

function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}

function mergeObjectOptions(to, from) {
  return to ? shared_esm_bundler_extend(shared_esm_bundler_extend(Object.create(null), to), from) : from;
}

function mergeWatchOptions(to, from) {
  if (!to) return from;
  if (!from) return to;
  const merged = shared_esm_bundler_extend(Object.create(null), to);

  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }

  return merged;
}

function initProps(instance, rawProps, isStateful, // result of bitwise flag comparison
isSSR = false) {
  const props = {};
  const attrs = {};
  def(attrs, InternalObjectKey, 1);
  instance.propsDefaults = Object.create(null);
  setFullProps(instance, rawProps, props, attrs); // ensure all declared prop keys are present

  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = undefined;
    }
  } // validation


  if (false) {}

  if (isStateful) {
    // stateful
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      // functional w/ optional props, props === attrs
      instance.props = attrs;
    } else {
      // functional w/ declared props
      instance.props = props;
    }
  }

  instance.attrs = attrs;
}

function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: {
      patchFlag
    }
  } = instance;
  const rawCurrentProps = reactivity_esm_bundler_toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;

  if ( // always force full diff in dev
  // - #1942 if hmr is enabled with sfc component
  // - vite#872 non-sfc component used by sfc component
   true && (optimized || patchFlag > 0) && !(patchFlag & 16
  /* FULL_PROPS */
  )) {
    if (patchFlag & 8
    /* PROPS */
    ) {
      // Compiler-generated props & no keys change, just set the updated
      // the props.
      const propsToUpdate = instance.vnode.dynamicProps;

      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i]; // skip if the prop key is a declared emit event listener

        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        } // PROPS flag guarantees rawProps to be non-null


        const value = rawProps[key];

        if (options) {
          // attr / props separation was done on init and will be consistent
          // in this code path, so just check if attrs have it.
          if (shared_esm_bundler_hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = shared_esm_bundler_camelize(key);
            props[camelizedKey] = runtime_core_esm_bundler_resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false
            /* isAbsent */
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    // full props update.
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    } // in case of dynamic props, check if we need to delete keys from
    // the props object


    let kebabKey;

    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !shared_esm_bundler_hasOwn(rawProps, key) && ( // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      (kebabKey = shared_esm_bundler_hyphenate(key)) === key || !shared_esm_bundler_hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && ( // for camelCase
          rawPrevProps[key] !== undefined || // for kebab-case
          rawPrevProps[kebabKey] !== undefined)) {
            props[key] = runtime_core_esm_bundler_resolvePropValue(options, rawCurrentProps, key, undefined, instance, true
            /* isAbsent */
            );
          }
        } else {
          delete props[key];
        }
      }
    } // in the case of functional component w/o props declaration, props and
    // attrs point to the same object so it should already have been updated.


    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !shared_esm_bundler_hasOwn(rawProps, key) && !false) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  } // trigger updates for $attrs in case it's used in component slots


  if (hasAttrsChanged) {
    trigger(instance, "set"
    /* SET */
    , '$attrs');
  }

  if (false) {}
}

function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;

  if (rawProps) {
    for (let key in rawProps) {
      // key, ref are reserved and never passed down
      if (isReservedProp(key)) {
        continue;
      }

      const value = rawProps[key]; // prop option names are camelized during normalization, so to support
      // kebab -> camel conversion here we need to camelize the key.

      let camelKey;

      if (options && shared_esm_bundler_hasOwn(options, camelKey = shared_esm_bundler_camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }

  if (needCastKeys) {
    const rawCurrentProps = reactivity_esm_bundler_toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;

    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = runtime_core_esm_bundler_resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !shared_esm_bundler_hasOwn(castValues, key));
    }
  }

  return hasAttrsChanged;
}

function runtime_core_esm_bundler_resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];

  if (opt != null) {
    const hasDefault = shared_esm_bundler_hasOwn(opt, 'default'); // default values

    if (hasDefault && value === undefined) {
      const defaultValue = opt.default;

      if (opt.type !== Function && isFunction(defaultValue)) {
        const {
          propsDefaults
        } = instance;

        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    } // boolean casting


    if (opt[0
    /* shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[1
      /* shouldCastTrue */
      ] && (value === '' || value === shared_esm_bundler_hyphenate(key))) {
        value = true;
      }
    }
  }

  return value;
}

function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);

  if (cached) {
    return cached;
  }

  const raw = comp.props;
  const normalized = {};
  const needCastKeys = []; // apply mixin/extends props

  let hasExtends = false;

  if ( true && !isFunction(comp)) {
    const extendProps = raw => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw, appContext, true);
      shared_esm_bundler_extend(normalized, props);
      if (keys) needCastKeys.push(...keys);
    };

    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }

    if (comp.extends) {
      extendProps(comp.extends);
    }

    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }

  if (!raw && !hasExtends) {
    cache.set(comp, EMPTY_ARR);
    return EMPTY_ARR;
  }

  if (shared_esm_bundler_isArray(raw)) {
    for (let i = 0; i < raw.length; i++) {
      if (false) {}

      const normalizedKey = shared_esm_bundler_camelize(raw[i]);

      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (false) {}

    for (const key in raw) {
      const normalizedKey = shared_esm_bundler_camelize(key);

      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = shared_esm_bundler_isArray(opt) || isFunction(opt) ? {
          type: opt
        } : opt;

        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[0
          /* shouldCast */
          ] = booleanIndex > -1;
          prop[1
          /* shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex; // if the prop needs boolean casting or default value

          if (booleanIndex > -1 || shared_esm_bundler_hasOwn(prop, 'default')) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }

  const res = [normalized, needCastKeys];
  cache.set(comp, res);
  return res;
}

function validatePropName(key) {
  if (key[0] !== '$') {
    return true;
  } else if (false) {}

  return false;
} // use function string name to check type constructors
// so that it works across vms / iframes.


function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ctor === null ? 'null' : '';
}

function isSameType(a, b) {
  return getType(a) === getType(b);
}

function getTypeIndex(type, expectedTypes) {
  if (shared_esm_bundler_isArray(expectedTypes)) {
    return expectedTypes.findIndex(t => isSameType(t, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }

  return -1;
}
/**
 * dev only
 */


function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];

  for (const key in options) {
    let opt = options[key];
    if (opt == null) continue;
    validateProp(key, resolvedValues[key], opt, !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key)));
  }
}
/**
 * dev only
 */


function validateProp(name, value, prop, isAbsent) {
  const {
    type,
    required,
    validator
  } = prop; // required!

  if (required && isAbsent) {
    runtime_core_esm_bundler_warn('Missing required prop: "' + name + '"');
    return;
  } // missing but optional


  if (value == null && !prop.required) {
    return;
  } // type check


  if (type != null && type !== true) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = []; // value is valid as long as one of the specified types match

    for (let i = 0; i < types.length && !isValid; i++) {
      const {
        valid,
        expectedType
      } = assertType(value, types[i]);
      expectedTypes.push(expectedType || '');
      isValid = valid;
    }

    if (!isValid) {
      runtime_core_esm_bundler_warn(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  } // custom validator


  if (validator && !validator(value)) {
    runtime_core_esm_bundler_warn('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}

const isSimpleType = /*#__PURE__*/(/* unused pure expression or super */ null && (makeMap('String,Number,Boolean,Function,Symbol,BigInt')));
/**
 * dev only
 */

function assertType(value, type) {
  let valid;
  const expectedType = getType(type);

  if (isSimpleType(expectedType)) {
    const t = typeof value;
    valid = t === expectedType.toLowerCase(); // for primitive wrapper objects

    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isObject(value);
  } else if (expectedType === 'Array') {
    valid = isArray(value);
  } else if (expectedType === 'null') {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }

  return {
    valid,
    expectedType
  };
}
/**
 * dev only
 */


function getInvalidTypeMessage(name, value, expectedTypes) {
  let message = `Invalid prop: type check failed for prop "${name}".` + ` Expected ${expectedTypes.map(capitalize).join(' | ')}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType); // check if we need to specify expected value

  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }

  message += `, got ${receivedType} `; // check if we need to specify received value

  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }

  return message;
}
/**
 * dev only
 */


function styleValue(value, type) {
  if (type === 'String') {
    return `"${value}"`;
  } else if (type === 'Number') {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
/**
 * dev only
 */


function isExplicable(type) {
  const explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(elem => type.toLowerCase() === elem);
}
/**
 * dev only
 */


function isBoolean(...args) {
  return args.some(elem => elem.toLowerCase() === 'boolean');
}

const isInternalKey = key => key[0] === '_' || key === '$stable';

const normalizeSlotValue = value => shared_esm_bundler_isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];

const normalizeSlot = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    // already normalized - #5353
    return rawSlot;
  }

  const normalized = withCtx((...args) => {
    if (false) {}

    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};

const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;

  for (const key in rawSlots) {
    if (isInternalKey(key)) continue;
    const value = rawSlots[key];

    if (isFunction(value)) {
      slots[key] = normalizeSlot(key, value, ctx);
    } else if (value != null) {
      if (false) {}

      const normalized = normalizeSlotValue(value);

      slots[key] = () => normalized;
    }
  }
};

const normalizeVNodeSlots = (instance, children) => {
  if (false) {}

  const normalized = normalizeSlotValue(children);

  instance.slots.default = () => normalized;
};

const initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & 32
  /* SLOTS_CHILDREN */
  ) {
    const type = children._;

    if (type) {
      // users can get the shallow readonly version of the slots object through `this.$slots`,
      // we should avoid the proxy object polluting the slots of the internal instance
      instance.slots = reactivity_esm_bundler_toRaw(children); // make compiler marker non-enumerable

      def(children, '_', type);
    } else {
      normalizeObjectSlots(children, instance.slots = {});
    }
  } else {
    instance.slots = {};

    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }

  def(instance.slots, InternalObjectKey, 1);
};

const updateSlots = (instance, children, optimized) => {
  const {
    vnode,
    slots
  } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;

  if (vnode.shapeFlag & 32
  /* SLOTS_CHILDREN */
  ) {
    const type = children._;

    if (type) {
      // compiled slots.
      if (false) {} else if (optimized && type === 1
      /* STABLE */
      ) {
        // compiled AND stable.
        // no need to update, and skip stale slots removal.
        needDeletionCheck = false;
      } else {
        // compiled but dynamic (v-if/v-for on slots) - update slots, but skip
        // normalization.
        shared_esm_bundler_extend(slots, children); // #2893
        // when rendering the optimized slots by manually written render function,
        // we need to delete the `slots._` flag if necessary to make subsequent updates reliable,
        // i.e. let the `renderSlot` create the bailed Fragment

        if (!optimized && type === 1
        /* STABLE */
        ) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }

    deletionComparisonTarget = children;
  } else if (children) {
    // non slot object children (direct value) passed to a component
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = {
      default: 1
    };
  } // delete stale slots


  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
        delete slots[key];
      }
    }
  }
};

function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: shared_esm_bundler_NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: undefined,
      warnHandler: undefined,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap()
  };
}

let uid = 0;

function createAppAPI(render, hydrate) {
  return function createApp(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = Object.assign({}, rootComponent);
    }

    if (rootProps != null && !shared_esm_bundler_isObject(rootProps)) {
       false && 0;
      rootProps = null;
    }

    const context = createAppContext();
    const installedPlugins = new Set();
    let isMounted = false;
    const app = context.app = {
      _uid: uid++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,

      get config() {
        return context.config;
      },

      set config(v) {
        if (false) {}
      },

      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) {
           false && 0;
        } else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else if (false) {}

        return app;
      },

      mixin(mixin) {
        if (true) {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else if (false) {}
        } else {}

        return app;
      },

      component(name, component) {
        if (false) {}

        if (!component) {
          return context.components[name];
        }

        if (false) {}

        context.components[name] = component;
        return app;
      },

      directive(name, directive) {
        if (false) {}

        if (!directive) {
          return context.directives[name];
        }

        if (false) {}

        context.directives[name] = directive;
        return app;
      },

      mount(rootContainer, isHydrate, isSVG) {
        if (!isMounted) {
          // #5571
          if (false) {}

          const vnode = createVNode(rootComponent, rootProps); // store app context on the root VNode.
          // this will be set on the root instance on initial mount.

          vnode.appContext = context; // HMR root reload

          if (false) {}

          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render(vnode, rootContainer, isSVG);
          }

          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;

          if (false) {}

          return getExposeProxy(vnode.component) || vnode.component.proxy;
        } else if (false) {}
      },

      unmount() {
        if (isMounted) {
          render(null, app._container);

          if (false) {}

          delete app._container.__vue_app__;
        } else if (false) {}
      },

      provide(key, value) {
        if (false) {}

        context.provides[key] = value;
        return app;
      }

    };
    return app;
  };
}
/**
 * Function for handling a template ref
 */


function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (shared_esm_bundler_isArray(rawRef)) {
    rawRef.forEach((r, i) => setRef(r, oldRawRef && (shared_esm_bundler_isArray(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
    return;
  }

  if (isAsyncWrapper(vnode) && !isUnmount) {
    // when mounting async components, nothing needs to be done,
    // because the template ref is forwarded to inner component
    return;
  }

  const refValue = vnode.shapeFlag & 4
  /* STATEFUL_COMPONENT */
  ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value = isUnmount ? null : refValue;
  const {
    i: owner,
    r: ref
  } = rawRef;

  if (false) {}

  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState; // dynamic ref changed. unset old ref

  if (oldRef != null && oldRef !== ref) {
    if (shared_esm_bundler_isString(oldRef)) {
      refs[oldRef] = null;

      if (shared_esm_bundler_hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }

  if (isFunction(ref)) {
    callWithErrorHandling(ref, owner, 12
    /* FUNCTION_REF */
    , [value, refs]);
  } else {
    const _isString = shared_esm_bundler_isString(ref);

    const _isRef = isRef(ref);

    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? refs[ref] : ref.value;

          if (isUnmount) {
            shared_esm_bundler_isArray(existing) && remove(existing, refValue);
          } else {
            if (!shared_esm_bundler_isArray(existing)) {
              if (_isString) {
                refs[ref] = [refValue];

                if (shared_esm_bundler_hasOwn(setupState, ref)) {
                  setupState[ref] = refs[ref];
                }
              } else {
                ref.value = [refValue];
                if (rawRef.k) refs[rawRef.k] = ref.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref] = value;

          if (shared_esm_bundler_hasOwn(setupState, ref)) {
            setupState[ref] = value;
          }
        } else if (isRef(ref)) {
          ref.value = value;
          if (rawRef.k) refs[rawRef.k] = value;
        } else if (false) {}
      };

      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    } else if (false) {}
  }
}

let hasMismatch = false;

const isSVGContainer = container => /svg/.test(container.namespaceURI) && container.tagName !== 'foreignObject';

const isComment = node => node.nodeType === 8
/* COMMENT */
; // Note: hydration is DOM-specific
// But we have to place it in core due to tight coupling with core - splitting
// it out creates a ton of unnecessary complexity.
// Hydration also depends on some renderer internal logic which needs to be
// passed in via arguments.


function createHydrationFunctions(rendererInternals) {
  const {
    mt: mountComponent,
    p: patch,
    o: {
      patchProp,
      createText,
      nextSibling,
      parentNode,
      remove,
      insert,
      createComment
    }
  } = rendererInternals;

  const hydrate = (vnode, container) => {
    if (!container.hasChildNodes()) {
       false && 0;
      patch(null, vnode, container);
      flushPostFlushCbs();
      return;
    }

    hasMismatch = false;
    hydrateNode(container.firstChild, vnode, null, null, null);
    flushPostFlushCbs();

    if (hasMismatch && !false) {
      // this error should show up in production
      console.error(`Hydration completed but contains mismatches.`);
    }
  };

  const hydrateNode = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized = false) => {
    const isFragmentStart = isComment(node) && node.data === '[';

    const onMismatch = () => handleMismatch(node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragmentStart);

    const {
      type,
      ref,
      shapeFlag,
      patchFlag
    } = vnode;
    const domType = node.nodeType;
    vnode.el = node;

    if (patchFlag === -2
    /* BAIL */
    ) {
      optimized = false;
      vnode.dynamicChildren = null;
    }

    let nextNode = null;

    switch (type) {
      case runtime_core_esm_bundler_Text:
        if (domType !== 3
        /* TEXT */
        ) {
          // #5728 empty text node inside a slot can cause hydration failure
          // because the server rendered HTML won't contain a text node
          if (vnode.children === '') {
            insert(vnode.el = createText(''), parentNode(node), node);
            nextNode = node;
          } else {
            nextNode = onMismatch();
          }
        } else {
          if (node.data !== vnode.children) {
            hasMismatch = true;
             false && 0;
            node.data = vnode.children;
          }

          nextNode = nextSibling(node);
        }

        break;

      case Comment:
        if (domType !== 8
        /* COMMENT */
        || isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = nextSibling(node);
        }

        break;

      case Static:
        if (domType !== 1
        /* ELEMENT */
        ) {
          nextNode = onMismatch();
        } else {
          // determine anchor, adopt content
          nextNode = node; // if the static vnode has its content stripped during build,
          // adopt it from the server-rendered HTML.

          const needToAdoptContent = !vnode.children.length;

          for (let i = 0; i < vnode.staticCount; i++) {
            if (needToAdoptContent) vnode.children += nextNode.outerHTML;

            if (i === vnode.staticCount - 1) {
              vnode.anchor = nextNode;
            }

            nextNode = nextSibling(nextNode);
          }

          return nextNode;
        }

        break;

      case runtime_core_esm_bundler_Fragment:
        if (!isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = hydrateFragment(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
        }

        break;

      default:
        if (shapeFlag & 1
        /* ELEMENT */
        ) {
          if (domType !== 1
          /* ELEMENT */
          || vnode.type.toLowerCase() !== node.tagName.toLowerCase()) {
            nextNode = onMismatch();
          } else {
            nextNode = hydrateElement(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
          }
        } else if (shapeFlag & 6
        /* COMPONENT */
        ) {
          // when setting up the render effect, if the initial vnode already
          // has .el set, the component will perform hydration instead of mount
          // on its sub-tree.
          vnode.slotScopeIds = slotScopeIds;
          const container = parentNode(node);
          mountComponent(vnode, container, null, parentComponent, parentSuspense, isSVGContainer(container), optimized); // component may be async, so in the case of fragments we cannot rely
          // on component's rendered output to determine the end of the fragment
          // instead, we do a lookahead to find the end anchor node.

          nextNode = isFragmentStart ? locateClosingAsyncAnchor(node) : nextSibling(node); // #4293 teleport as component root

          if (nextNode && isComment(nextNode) && nextNode.data === 'teleport end') {
            nextNode = nextSibling(nextNode);
          } // #3787
          // if component is async, it may get moved / unmounted before its
          // inner component is loaded, so we need to give it a placeholder
          // vnode that matches its adopted DOM.


          if (isAsyncWrapper(vnode)) {
            let subTree;

            if (isFragmentStart) {
              subTree = createVNode(runtime_core_esm_bundler_Fragment);
              subTree.anchor = nextNode ? nextNode.previousSibling : container.lastChild;
            } else {
              subTree = node.nodeType === 3 ? createTextVNode('') : createVNode('div');
            }

            subTree.el = node;
            vnode.component.subTree = subTree;
          }
        } else if (shapeFlag & 64
        /* TELEPORT */
        ) {
          if (domType !== 8
          /* COMMENT */
          ) {
            nextNode = onMismatch();
          } else {
            nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, rendererInternals, hydrateChildren);
          }
        } else if (shapeFlag & 128
        /* SUSPENSE */
        ) {
          nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, isSVGContainer(parentNode(node)), slotScopeIds, optimized, rendererInternals, hydrateNode);
        } else if (false) {}

    }

    if (ref != null) {
      setRef(ref, null, parentSuspense, vnode);
    }

    return nextNode;
  };

  const hydrateElement = (el, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!vnode.dynamicChildren;
    const {
      type,
      props,
      patchFlag,
      shapeFlag,
      dirs
    } = vnode; // #4006 for form elements with non-string v-model value bindings
    // e.g. <option :value="obj">, <input type="checkbox" :true-value="1">

    const forcePatchValue = type === 'input' && dirs || type === 'option'; // skip props & children if this is hoisted static nodes
    // #5405 in dev, always hydrate children for HMR

    if ( false || forcePatchValue || patchFlag !== -1
    /* HOISTED */
    ) {
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, 'created');
      } // props


      if (props) {
        if (forcePatchValue || !optimized || patchFlag & (16
        /* FULL_PROPS */
        | 32
        /* HYDRATE_EVENTS */
        )) {
          for (const key in props) {
            if (forcePatchValue && key.endsWith('value') || shared_esm_bundler_isOn(key) && !isReservedProp(key)) {
              patchProp(el, key, null, props[key], false, undefined, parentComponent);
            }
          }
        } else if (props.onClick) {
          // Fast path for click listeners (which is most often) to avoid
          // iterating through props.
          patchProp(el, 'onClick', null, props.onClick, false, undefined, parentComponent);
        }
      } // vnode / directive hooks


      let vnodeHooks;

      if (vnodeHooks = props && props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHooks, parentComponent, vnode);
      }

      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, 'beforeMount');
      }

      if ((vnodeHooks = props && props.onVnodeMounted) || dirs) {
        queueEffectWithSuspense(() => {
          vnodeHooks && invokeVNodeHook(vnodeHooks, parentComponent, vnode);
          dirs && invokeDirectiveHook(vnode, null, parentComponent, 'mounted');
        }, parentSuspense);
      } // children


      if (shapeFlag & 16
      /* ARRAY_CHILDREN */
      && // skip if element has innerHTML / textContent
      !(props && (props.innerHTML || props.textContent))) {
        let next = hydrateChildren(el.firstChild, vnode, el, parentComponent, parentSuspense, slotScopeIds, optimized);
        let hasWarned = false;

        while (next) {
          hasMismatch = true;

          if (false) {} // The SSRed DOM contains more nodes than it should. Remove them.


          const cur = next;
          next = next.nextSibling;
          remove(cur);
        }
      } else if (shapeFlag & 8
      /* TEXT_CHILDREN */
      ) {
        if (el.textContent !== vnode.children) {
          hasMismatch = true;
           false && 0;
          el.textContent = vnode.children;
        }
      }
    }

    return el.nextSibling;
  };

  const hydrateChildren = (node, parentVNode, container, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!parentVNode.dynamicChildren;
    const children = parentVNode.children;
    const l = children.length;
    let hasWarned = false;

    for (let i = 0; i < l; i++) {
      const vnode = optimized ? children[i] : children[i] = normalizeVNode(children[i]);

      if (node) {
        node = hydrateNode(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
      } else if (vnode.type === runtime_core_esm_bundler_Text && !vnode.children) {
        continue;
      } else {
        hasMismatch = true;

        if (false) {} // the SSRed DOM didn't contain enough nodes. Mount the missing ones.


        patch(null, vnode, container, null, parentComponent, parentSuspense, isSVGContainer(container), slotScopeIds);
      }
    }

    return node;
  };

  const hydrateFragment = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    const {
      slotScopeIds: fragmentSlotScopeIds
    } = vnode;

    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }

    const container = parentNode(node);
    const next = hydrateChildren(nextSibling(node), vnode, container, parentComponent, parentSuspense, slotScopeIds, optimized);

    if (next && isComment(next) && next.data === ']') {
      return nextSibling(vnode.anchor = next);
    } else {
      // fragment didn't hydrate successfully, since we didn't get a end anchor
      // back. This should have led to node/children mismatch warnings.
      hasMismatch = true; // since the anchor is missing, we need to create one and insert it

      insert(vnode.anchor = createComment(`]`), container, next);
      return next;
    }
  };

  const handleMismatch = (node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragment) => {
    hasMismatch = true;
     false && 0;
    vnode.el = null;

    if (isFragment) {
      // remove excessive fragment nodes
      const end = locateClosingAsyncAnchor(node);

      while (true) {
        const next = nextSibling(node);

        if (next && next !== end) {
          remove(next);
        } else {
          break;
        }
      }
    }

    const next = nextSibling(node);
    const container = parentNode(node);
    remove(node);
    patch(null, vnode, container, next, parentComponent, parentSuspense, isSVGContainer(container), slotScopeIds);
    return next;
  };

  const locateClosingAsyncAnchor = node => {
    let match = 0;

    while (node) {
      node = nextSibling(node);

      if (node && isComment(node)) {
        if (node.data === '[') match++;

        if (node.data === ']') {
          if (match === 0) {
            return nextSibling(node);
          } else {
            match--;
          }
        }
      }
    }

    return node;
  };

  return [hydrate, hydrateNode];
}
/* eslint-disable no-restricted-globals */


let supported;
let perf;

function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark(`vue-${type}-${instance.uid}`);
  }

  if (false) {}
}

function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf.mark(endTag);
    perf.measure(`<${formatComponentName(instance, instance.type)}> ${type}`, startTag, endTag);
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }

  if (false) {}
}

function isSupported() {
  if (supported !== undefined) {
    return supported;
  }

  if (typeof window !== 'undefined' && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }

  return supported;
}
/**
 * This is only called in esm-bundler builds.
 * It is called when a renderer is created, in `baseCreateRenderer` so that
 * importing runtime-core is side-effects free.
 *
 * istanbul-ignore-next
 */


function initFeatureFlags() {
  const needWarn = [];

  if (false) {}

  if (false) {}

  if (false) {}
}

const queuePostRenderEffect = queueEffectWithSuspense;
/**
 * The createRenderer function accepts two generic arguments:
 * HostNode and HostElement, corresponding to Node and Element types in the
 * host environment. For example, for runtime-dom, HostNode would be the DOM
 * `Node` interface and HostElement would be the DOM `Element` interface.
 *
 * Custom renderers can pass in the platform specific types like this:
 *
 * ``` js
 * const { render, createApp } = createRenderer<Node, Element>({
 *   patchProp,
 *   ...nodeOps
 * })
 * ```
 */

function createRenderer(options) {
  return baseCreateRenderer(options);
} // Separate API for creating hydration-enabled renderer.
// Hydration logic is only used when calling this function, making it
// tree-shakable.


function createHydrationRenderer(options) {
  return baseCreateRenderer(options, createHydrationFunctions);
} // implementation


function baseCreateRenderer(options, createHydrationFns) {
  // compile-time feature flags check
  {
    initFeatureFlags();
  }
  const target = getGlobalThis();
  target.__VUE__ = true;

  if (false) {}

  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = shared_esm_bundler_NOOP,
    cloneNode: hostCloneNode,
    insertStaticContent: hostInsertStaticContent
  } = options; // Note: functions inside this closure should use `const xxx = () => {}`
  // style in order to prevent being inlined by minifiers.

  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized =  false ? 0 : !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    } // patching & not same type, unmount old tree


    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }

    if (n2.patchFlag === -2
    /* BAIL */
    ) {
      optimized = false;
      n2.dynamicChildren = null;
    }

    const {
      type,
      ref,
      shapeFlag
    } = n2;

    switch (type) {
      case runtime_core_esm_bundler_Text:
        processText(n1, n2, container, anchor);
        break;

      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;

      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG);
        } else if (false) {}

        break;

      case runtime_core_esm_bundler_Fragment:
        processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        break;

      default:
        if (shapeFlag & 1
        /* ELEMENT */
        ) {
          processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 6
        /* COMPONENT */
        ) {
          processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 64
        /* TELEPORT */
        ) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else if (shapeFlag & 128
        /* SUSPENSE */
        ) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else if (false) {}

    } // set ref


    if (ref != null && parentComponent) {
      setRef(ref, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };

  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
    } else {
      const el = n2.el = n1.el;

      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };

  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateComment(n2.children || ''), container, anchor);
    } else {
      // there's no support for dynamic comments
      n2.el = n1.el;
    }
  };

  const mountStaticNode = (n2, container, anchor, isSVG) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG, n2.el, n2.anchor);
  };
  /**
   * Dev / HMR only
   */


  const patchStaticNode = (n1, n2, container, isSVG) => {
    // static nodes are only patched during dev for HMR
    if (n2.children !== n1.children) {
      const anchor = hostNextSibling(n1.anchor); // remove existing

      removeStaticNode(n1);
      [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG);
    } else {
      n2.el = n1.el;
      n2.anchor = n1.anchor;
    }
  };

  const moveStaticNode = ({
    el,
    anchor
  }, container, nextSibling) => {
    let next;

    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }

    hostInsert(anchor, container, nextSibling);
  };

  const removeStaticNode = ({
    el,
    anchor
  }) => {
    let next;

    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }

    hostRemove(anchor);
  };

  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    isSVG = isSVG || n2.type === 'svg';

    if (n1 == null) {
      mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };

  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const {
      type,
      props,
      shapeFlag,
      transition,
      patchFlag,
      dirs
    } = vnode;

    if ( true && vnode.el && hostCloneNode !== undefined && patchFlag === -1
    /* HOISTED */
    ) {
      // If a vnode has non-null el, it means it's being reused.
      // Only static vnodes can be reused, so its mounted DOM nodes should be
      // exactly the same, and we can simply do a clone here.
      // only do this in production since cloned trees cannot be HMR updated.
      el = vnode.el = hostCloneNode(vnode.el);
    } else {
      el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props); // mount children first, since some props may rely on child content
      // being already rendered, e.g. `<select value>`

      if (shapeFlag & 8
      /* TEXT_CHILDREN */
      ) {
        hostSetElementText(el, vnode.children);
      } else if (shapeFlag & 16
      /* ARRAY_CHILDREN */
      ) {
        mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== 'foreignObject', slotScopeIds, optimized);
      }

      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, 'created');
      } // props


      if (props) {
        for (const key in props) {
          if (key !== 'value' && !isReservedProp(key)) {
            hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
        /**
         * Special case for setting value on DOM elements:
         * - it can be order-sensitive (e.g. should be set *after* min/max, #2325, #4024)
         * - it needs to be forced (#1471)
         * #2353 proposes adding another renderer option to configure this, but
         * the properties affects are so finite it is worth special casing it
         * here to reduce the complexity. (Special casing it also should not
         * affect non-DOM renderers)
         */


        if ('value' in props) {
          hostPatchProp(el, 'value', null, props.value);
        }

        if (vnodeHook = props.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
      } // scopeId


      setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    }

    if (false) {}

    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, 'beforeMount');
    } // #1583 For inside suspense + suspense not resolved case, enter hook should call when suspense resolved
    // #1689 For inside suspense + suspense resolved case, just call it


    const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;

    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }

    hostInsert(el, container, anchor);

    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, 'mounted');
      }, parentSuspense);
    }
  };

  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }

    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }

    if (parentComponent) {
      let subTree = parentComponent.subTree;

      if (false
      /* DEV_ROOT_FRAGMENT */
      ) {}

      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
      }
    }
  };

  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };

  const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let {
      patchFlag,
      dynamicChildren,
      dirs
    } = n2; // #1426 take the old vnode's patch flag into account since user may clone a
    // compiler-generated vnode, which de-opts to FULL_PROPS

    patchFlag |= n1.patchFlag & 16
    /* FULL_PROPS */
    ;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook; // disable recurse in beforeUpdate hooks

    parentComponent && toggleRecurse(parentComponent, false);

    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }

    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, 'beforeUpdate');
    }

    parentComponent && toggleRecurse(parentComponent, true);

    if (false) {}

    const areChildrenSVG = isSVG && n2.type !== 'foreignObject';

    if (dynamicChildren) {
      patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);

      if (false) {}
    } else if (!optimized) {
      // full diff
      patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
    }

    if (patchFlag > 0) {
      // the presence of a patchFlag means this element's render code was
      // generated by the compiler and can take the fast path.
      // in this path old node and new node are guaranteed to have the same shape
      // (i.e. at the exact same position in the source template)
      if (patchFlag & 16
      /* FULL_PROPS */
      ) {
        // element props contain dynamic keys, full diff needed
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
      } else {
        // class
        // this flag is matched when the element has dynamic class bindings.
        if (patchFlag & 2
        /* CLASS */
        ) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, 'class', null, newProps.class, isSVG);
          }
        } // style
        // this flag is matched when the element has dynamic style bindings


        if (patchFlag & 4
        /* STYLE */
        ) {
          hostPatchProp(el, 'style', oldProps.style, newProps.style, isSVG);
        } // props
        // This flag is matched when the element has dynamic prop/attr bindings
        // other than class and style. The keys of dynamic prop/attrs are saved for
        // faster iteration.
        // Note dynamic keys like :[foo]="bar" will cause this optimization to
        // bail out and go through a full diff because we need to unset the old key


        if (patchFlag & 8
        /* PROPS */
        ) {
          // if the flag is present then dynamicProps must be non-null
          const propsToUpdate = n2.dynamicProps;

          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key]; // #1471 force patch value

            if (next !== prev || key === 'value') {
              hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
        }
      } // text
      // This flag is matched when the element has only dynamic text children.


      if (patchFlag & 1
      /* TEXT */
      ) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      // unoptimized, full diff
      patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
    }

    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, 'updated');
      }, parentSuspense);
    }
  }; // The fast path for blocks.


  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i]; // Determine the container (parent element) for the patch.

      const container = // oldVNode may be an errored async setup() component inside Suspense
      // which will not have a mounted element
      oldVNode.el && ( // - In the case of a Fragment, we need to provide the actual parent
      // of the Fragment itself so it can move its children.
      oldVNode.type === runtime_core_esm_bundler_Fragment || // - In the case of different nodes, there is going to be a replacement
      // which also requires the correct parent container
      !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
      oldVNode.shapeFlag & (6
      /* COMPONENT */
      | 64
      /* TELEPORT */
      )) ? hostParentNode(oldVNode.el) : // In other cases, the parent container is not actually used so we
      // just pass the block element here to avoid a DOM parentNode call.
      fallbackContainer;
      patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
    }
  };

  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
    if (oldProps !== newProps) {
      for (const key in newProps) {
        // empty string is not valid prop
        if (isReservedProp(key)) continue;
        const next = newProps[key];
        const prev = oldProps[key]; // defer patching value

        if (next !== prev && key !== 'value') {
          hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }

      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
      }

      if ('value' in newProps) {
        hostPatchProp(el, 'value', oldProps.value, newProps.value);
      }
    }
  };

  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText('');
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText('');
    let {
      patchFlag,
      dynamicChildren,
      slotScopeIds: fragmentSlotScopeIds
    } = n2;

    if (false) {} // check if this is a slot fragment with :slotted scope ids


    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }

    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor); // a fragment can only have array children
      // since they are either generated by the compiler, or implicitly created
      // from arrays.

      mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      if (patchFlag > 0 && patchFlag & 64
      /* STABLE_FRAGMENT */
      && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren) {
        // a stable fragment (template root or <template v-for>) doesn't need to
        // patch children order, but it may contain dynamicChildren.
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);

        if (false) {} else if ( // #2080 if the stable fragment has a key, it's a <template v-for> that may
        //  get moved around. Make sure all root level vnodes inherit el.
        // #2134 or if it's a component root, it may also get moved around
        // as the component is being moved.
        n2.key != null || parentComponent && n2 === parentComponent.subTree) {
          traverseStaticChildren(n1, n2, true
          /* shallow */
          );
        }
      } else {
        // keyed / unkeyed, or manual fragments.
        // for keyed & unkeyed, since they are compiler generated from v-for,
        // each child is guaranteed to be a block so the fragment will never
        // have dynamicChildren.
        patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    }
  };

  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;

    if (n1 == null) {
      if (n2.shapeFlag & 512
      /* COMPONENT_KEPT_ALIVE */
      ) {
        parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
      } else {
        mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };

  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);

    if (false) {}

    if (false) {} // inject renderer internals for keepAlive


    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    } // resolve props and slots for setup context


    {
      if (false) {}

      setupComponent(instance);

      if (false) {}
    } // setup() is async. This component relies on async logic to be resolved
    // before proceeding

    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect); // Give it a placeholder if this is not hydration
      // TODO handle self-defined fallback

      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }

      return;
    }

    setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);

    if (false) {}
  };

  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;

    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        // async & still pending - just update props and slots
        // since the component's reactive effect for render isn't set-up yet
        if (false) {}

        updateComponentPreRender(instance, n2, optimized);

        if (false) {}

        return;
      } else {
        // normal update
        instance.next = n2; // in case the child component is also queued, remove it to avoid
        // double updating the same child component in the same flush.

        invalidateJob(instance.update); // instance.update is the reactive effect.

        instance.update();
      }
    } else {
      // no update needed. just copy over properties
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };

  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const {
          el,
          props
        } = initialVNode;
        const {
          bm,
          m,
          parent
        } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false); // beforeMount hook

        if (bm) {
          invokeArrayFns(bm);
        } // onVnodeBeforeMount


        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }

        toggleRecurse(instance, true);

        if (el && hydrateNode) {
          // vnode has adopted host node - perform hydration instead of mount.
          const hydrateSubTree = () => {
            if (false) {}

            instance.subTree = renderComponentRoot(instance);

            if (false) {}

            if (false) {}

            hydrateNode(el, instance.subTree, instance, parentSuspense, null);

            if (false) {}
          };

          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then( // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !instance.isUnmounted && hydrateSubTree());
          } else {
            hydrateSubTree();
          }
        } else {
          if (false) {}

          const subTree = instance.subTree = renderComponentRoot(instance);

          if (false) {}

          if (false) {}

          patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);

          if (false) {}

          initialVNode.el = subTree.el;
        } // mounted hook


        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        } // onVnodeMounted


        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
        } // activated hook for keep-alive roots.
        // #1742 activated hook must be accessed after first render
        // since the hook may be injected by a child keep-alive


        if (initialVNode.shapeFlag & 256
        /* COMPONENT_SHOULD_KEEP_ALIVE */
        || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256
        /* COMPONENT_SHOULD_KEEP_ALIVE */
        ) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }

        instance.isMounted = true;

        if (false) {} // #2458: deference mount-only object parameters to prevent memleaks


        initialVNode = container = anchor = null;
      } else {
        // updateComponent
        // This is triggered by mutation of component's own state (next: null)
        // OR parent calling processComponent (next: VNode)
        let {
          next,
          bu,
          u,
          parent,
          vnode
        } = instance;
        let originNext = next;
        let vnodeHook;

        if (false) {} // Disallow component effect recursion during pre-lifecycle hooks.


        toggleRecurse(instance, false);

        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        } // beforeUpdate hook


        if (bu) {
          invokeArrayFns(bu);
        } // onVnodeBeforeUpdate


        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }

        toggleRecurse(instance, true); // render

        if (false) {}

        const nextTree = renderComponentRoot(instance);

        if (false) {}

        const prevTree = instance.subTree;
        instance.subTree = nextTree;

        if (false) {}

        patch(prevTree, nextTree, // parent may have changed if it's in a teleport
        hostParentNode(prevTree.el), // anchor may have changed if it's in a fragment
        getNextHostNode(prevTree), instance, parentSuspense, isSVG);

        if (false) {}

        next.el = nextTree.el;

        if (originNext === null) {
          // self-triggered update. In case of HOC, update parent component
          // vnode el. HOC is indicated by parent instance's subTree pointing
          // to child component's vnode
          updateHOCHostEl(instance, nextTree.el);
        } // updated hook


        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        } // onVnodeUpdated


        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
        }

        if (false) {}

        if (false) {}
      }
    }; // create reactive effect for rendering


    const effect = instance.effect = new ReactiveEffect(componentUpdateFn, () => queueJob(update), instance.scope // track it in component's effect scope
    );

    const update = instance.update = () => effect.run();

    update.id = instance.uid; // allowRecurse
    // #1801, #2043 component render effects should allow recursive updates

    toggleRecurse(instance, true);

    if (false) {}

    update();
  };

  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking(); // props update may have triggered pre-flush watchers.
    // flush them before the render update.

    flushPreFlushCbs(undefined, instance.update);
    resetTracking();
  };

  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const {
      patchFlag,
      shapeFlag
    } = n2; // fast path

    if (patchFlag > 0) {
      if (patchFlag & 128
      /* KEYED_FRAGMENT */
      ) {
        // this could be either fully-keyed or mixed (some keyed some not)
        // presence of patchFlag means children are guaranteed to be arrays
        patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      } else if (patchFlag & 256
      /* UNKEYED_FRAGMENT */
      ) {
        // unkeyed
        patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      }
    } // children has 3 possibilities: text, array or no children.


    if (shapeFlag & 8
    /* TEXT_CHILDREN */
    ) {
      // text children fast path
      if (prevShapeFlag & 16
      /* ARRAY_CHILDREN */
      ) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }

      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16
      /* ARRAY_CHILDREN */
      ) {
        // prev children was array
        if (shapeFlag & 16
        /* ARRAY_CHILDREN */
        ) {
          // two arrays, cannot assume anything, do full diff
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          // no new children, just unmount old
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        // prev children was text OR null
        // new children is array OR null
        if (prevShapeFlag & 8
        /* TEXT_CHILDREN */
        ) {
          hostSetElementText(container, '');
        } // mount new if array


        if (shapeFlag & 16
        /* ARRAY_CHILDREN */
        ) {
          mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      }
    }
  };

  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;

    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }

    if (oldLength > newLength) {
      // remove old
      unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
    } else {
      // mount new
      mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
    }
  }; // can be all-keyed or mixed


  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1; // prev ending index

    let e2 = l2 - 1; // next ending index
    // 1. sync from start
    // (a b) c
    // (a b) d e

    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);

      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }

      i++;
    } // 2. sync from end
    // a (b c)
    // d e (b c)


    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);

      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }

      e1--;
      e2--;
    } // 3. common sequence + mount
    // (a b)
    // (a b) c
    // i = 2, e1 = 1, e2 = 2
    // (a b)
    // c (a b)
    // i = 0, e1 = -1, e2 = 0


    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;

        while (i <= e2) {
          patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          i++;
        }
      }
    } // 4. common sequence + unmount
    // (a b) c
    // (a b)
    // i = 2, e1 = 2, e2 = 1
    // a (b c)
    // (b c)
    // i = 0, e1 = 0, e2 = -1
    else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } // 5. unknown sequence
    // [i ... e1 + 1]: a b [c d e] f g
    // [i ... e2 + 1]: a b [e d c h] f g
    // i = 2, e1 = 4, e2 = 5
    else {
      const s1 = i; // prev starting index

      const s2 = i; // next starting index
      // 5.1 build key:index map for newChildren

      const keyToNewIndexMap = new Map();

      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);

        if (nextChild.key != null) {
          if (false) {}

          keyToNewIndexMap.set(nextChild.key, i);
        }
      } // 5.2 loop through old children left to be patched and try to patch
      // matching nodes & remove nodes that are no longer present


      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false; // used to track whether any node has moved

      let maxNewIndexSoFar = 0; // works as Map<newIndex, oldIndex>
      // Note that oldIndex is offset by +1
      // and oldIndex = 0 is a special value indicating the new node has
      // no corresponding old node.
      // used for determining longest stable subsequence

      const newIndexToOldIndexMap = new Array(toBePatched);

      for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;

      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];

        if (patched >= toBePatched) {
          // all new children have been patched so this can only be a removal
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }

        let newIndex;

        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          // key-less node, try to locate a key-less node of the same type
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }

        if (newIndex === undefined) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;

          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }

          patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          patched++;
        }
      } // 5.3 move and mount
      // generate longest stable subsequence only when nodes have moved


      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1; // looping backwards so that we can use last patched node as anchor

      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;

        if (newIndexToOldIndexMap[i] === 0) {
          // mount new
          patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (moved) {
          // move if:
          // There is no stable subsequence (e.g. a reverse)
          // OR current node is not among the stable sequence
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2
            /* REORDER */
            );
          } else {
            j--;
          }
        }
      }
    }
  };

  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const {
      el,
      type,
      transition,
      children,
      shapeFlag
    } = vnode;

    if (shapeFlag & 6
    /* COMPONENT */
    ) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }

    if (shapeFlag & 128
    /* SUSPENSE */
    ) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }

    if (shapeFlag & 64
    /* TELEPORT */
    ) {
      type.move(vnode, container, anchor, internals);
      return;
    }

    if (type === runtime_core_esm_bundler_Fragment) {
      hostInsert(el, container, anchor);

      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }

      hostInsert(vnode.anchor, container, anchor);
      return;
    }

    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    } // single nodes


    const needTransition = moveType !== 2
    /* REORDER */
    && shapeFlag & 1
    /* ELEMENT */
    && transition;

    if (needTransition) {
      if (moveType === 0
      /* ENTER */
      ) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const {
          leave,
          delayLeave,
          afterLeave
        } = transition;

        const remove = () => hostInsert(el, container, anchor);

        const performLeave = () => {
          leave(el, () => {
            remove();
            afterLeave && afterLeave();
          });
        };

        if (delayLeave) {
          delayLeave(el, remove, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };

  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const {
      type,
      props,
      ref,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs
    } = vnode; // unset ref

    if (ref != null) {
      setRef(ref, null, parentSuspense, vnode, true);
    }

    if (shapeFlag & 256
    /* COMPONENT_SHOULD_KEEP_ALIVE */
    ) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }

    const shouldInvokeDirs = shapeFlag & 1
    /* ELEMENT */
    && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;

    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }

    if (shapeFlag & 6
    /* COMPONENT */
    ) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128
      /* SUSPENSE */
      ) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }

      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, 'beforeUnmount');
      }

      if (shapeFlag & 64
      /* TELEPORT */
      ) {
        vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
      } else if (dynamicChildren && ( // #1153: fast path should not be taken for non-stable (v-for) fragments
      type !== runtime_core_esm_bundler_Fragment || patchFlag > 0 && patchFlag & 64
      /* STABLE_FRAGMENT */
      )) {
        // fast path for block nodes: only need to unmount dynamic children.
        unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
      } else if (type === runtime_core_esm_bundler_Fragment && patchFlag & (128
      /* KEYED_FRAGMENT */
      | 256
      /* UNKEYED_FRAGMENT */
      ) || !optimized && shapeFlag & 16
      /* ARRAY_CHILDREN */
      ) {
        unmountChildren(children, parentComponent, parentSuspense);
      }

      if (doRemove) {
        remove(vnode);
      }
    }

    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, 'unmounted');
      }, parentSuspense);
    }
  };

  const remove = vnode => {
    const {
      type,
      el,
      anchor,
      transition
    } = vnode;

    if (type === runtime_core_esm_bundler_Fragment) {
      if (false) {} else {
        removeFragment(el, anchor);
      }

      return;
    }

    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }

    const performRemove = () => {
      hostRemove(el);

      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };

    if (vnode.shapeFlag & 1
    /* ELEMENT */
    && transition && !transition.persisted) {
      const {
        leave,
        delayLeave
      } = transition;

      const performLeave = () => leave(el, performRemove);

      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };

  const removeFragment = (cur, end) => {
    // For fragments, directly remove all contained DOM nodes.
    // (fragment child nodes cannot have transition)
    let next;

    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }

    hostRemove(end);
  };

  const unmountComponent = (instance, parentSuspense, doRemove) => {
    if (false) {}

    const {
      bum,
      scope,
      update,
      subTree,
      um
    } = instance; // beforeUnmount hook

    if (bum) {
      invokeArrayFns(bum);
    } // stop effects in component scope


    scope.stop(); // update may be null if a component is unmounted before its async
    // setup has resolved.

    if (update) {
      // so that scheduler will no longer invoke it
      update.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    } // unmounted hook


    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }

    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense); // A component with async dep inside a pending suspense is unmounted before
    // its async dep resolves. This should remove the dep from the suspense, and
    // cause the suspense to resolve immediately if that was the last dep.

    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;

      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }

    if (false) {}
  };

  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };

  const getNextHostNode = vnode => {
    if (vnode.shapeFlag & 6
    /* COMPONENT */
    ) {
      return getNextHostNode(vnode.component.subTree);
    }

    if (vnode.shapeFlag & 128
    /* SUSPENSE */
    ) {
      return vnode.suspense.next();
    }

    return hostNextSibling(vnode.anchor || vnode.el);
  };

  const render = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, isSVG);
    }

    flushPostFlushCbs();
    container._vnode = vnode;
  };

  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;

  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(internals);
  }

  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  };
}

function toggleRecurse({
  effect,
  update
}, allowed) {
  effect.allowRecurse = update.allowRecurse = allowed;
}
/**
 * #1156
 * When a component is HMR-enabled, we need to make sure that all static nodes
 * inside a block also inherit the DOM element from the previous tree so that
 * HMR updates (which are full updates) can retrieve the element for patching.
 *
 * #2080
 * Inside keyed `template` fragment static children, if a fragment is moved,
 * the children will always be moved. Therefore, in order to ensure correct move
 * position, el should be inherited from previous nodes.
 */


function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;

  if (shared_esm_bundler_isArray(ch1) && shared_esm_bundler_isArray(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      // this is only called in the optimized path so array children are
      // guaranteed to be vnodes
      const c1 = ch1[i];
      let c2 = ch2[i];

      if (c2.shapeFlag & 1
      /* ELEMENT */
      && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32
        /* HYDRATE_EVENTS */
        ) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }

        if (!shallow) traverseStaticChildren(c1, c2);
      } // also inherit for comment nodes, but not placeholders (e.g. v-if which
      // would have received .el during block patch)


      if (false) {}
    }
  }
} // https://en.wikipedia.org/wiki/Longest_increasing_subsequence


function getSequence(arr) {
  const p = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;

  for (i = 0; i < len; i++) {
    const arrI = arr[i];

    if (arrI !== 0) {
      j = result[result.length - 1];

      if (arr[j] < arrI) {
        p[i] = j;
        result.push(i);
        continue;
      }

      u = 0;
      v = result.length - 1;

      while (u < v) {
        c = u + v >> 1;

        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }

      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1];
        }

        result[u] = i;
      }
    }
  }

  u = result.length;
  v = result[u - 1];

  while (u-- > 0) {
    result[u] = v;
    v = p[v];
  }

  return result;
}

const isTeleport = type => type.__isTeleport;

const isTeleportDisabled = props => props && (props.disabled || props.disabled === '');

const isTargetSVG = target => typeof SVGElement !== 'undefined' && target instanceof SVGElement;

const resolveTarget = (props, select) => {
  const targetSelector = props && props.to;

  if (shared_esm_bundler_isString(targetSelector)) {
    if (!select) {
       false && 0;
      return null;
    } else {
      const target = select(targetSelector);

      if (!target) {
         false && 0;
      }

      return target;
    }
  } else {
    if (false) {}

    return targetSelector;
  }
};

const TeleportImpl = {
  __isTeleport: true,

  process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals) {
    const {
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      o: {
        insert,
        querySelector,
        createText,
        createComment
      }
    } = internals;
    const disabled = isTeleportDisabled(n2.props);
    let {
      shapeFlag,
      children,
      dynamicChildren
    } = n2; // #3302
    // HMR updated, force full diff

    if (false) {}

    if (n1 == null) {
      // insert anchors in the main view
      const placeholder = n2.el =  false ? 0 : createText('');
      const mainAnchor = n2.anchor =  false ? 0 : createText('');
      insert(placeholder, container, anchor);
      insert(mainAnchor, container, anchor);
      const target = n2.target = resolveTarget(n2.props, querySelector);
      const targetAnchor = n2.targetAnchor = createText('');

      if (target) {
        insert(targetAnchor, target); // #2652 we could be teleporting from a non-SVG tree into an SVG tree

        isSVG = isSVG || isTargetSVG(target);
      } else if (false) {}

      const mount = (container, anchor) => {
        // Teleport *always* has Array children. This is enforced in both the
        // compiler and vnode children normalization.
        if (shapeFlag & 16
        /* ARRAY_CHILDREN */
        ) {
          mountChildren(children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      };

      if (disabled) {
        mount(container, mainAnchor);
      } else if (target) {
        mount(target, targetAnchor);
      }
    } else {
      // update content
      n2.el = n1.el;
      const mainAnchor = n2.anchor = n1.anchor;
      const target = n2.target = n1.target;
      const targetAnchor = n2.targetAnchor = n1.targetAnchor;
      const wasDisabled = isTeleportDisabled(n1.props);
      const currentContainer = wasDisabled ? container : target;
      const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
      isSVG = isSVG || isTargetSVG(target);

      if (dynamicChildren) {
        // fast path when the teleport happens to be a block root
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, currentContainer, parentComponent, parentSuspense, isSVG, slotScopeIds); // even in block tree mode we need to make sure all root-level nodes
        // in the teleport inherit previous DOM references so that they can
        // be moved in future patches.

        traverseStaticChildren(n1, n2, true);
      } else if (!optimized) {
        patchChildren(n1, n2, currentContainer, currentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, false);
      }

      if (disabled) {
        if (!wasDisabled) {
          // enabled -> disabled
          // move into main container
          moveTeleport(n2, container, mainAnchor, internals, 1
          /* TOGGLE */
          );
        }
      } else {
        // target changed
        if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
          const nextTarget = n2.target = resolveTarget(n2.props, querySelector);

          if (nextTarget) {
            moveTeleport(n2, nextTarget, null, internals, 0
            /* TARGET_CHANGE */
            );
          } else if (false) {}
        } else if (wasDisabled) {
          // disabled -> enabled
          // move into teleport target
          moveTeleport(n2, target, targetAnchor, internals, 1
          /* TOGGLE */
          );
        }
      }
    }
  },

  remove(vnode, parentComponent, parentSuspense, optimized, {
    um: unmount,
    o: {
      remove: hostRemove
    }
  }, doRemove) {
    const {
      shapeFlag,
      children,
      anchor,
      targetAnchor,
      target,
      props
    } = vnode;

    if (target) {
      hostRemove(targetAnchor);
    } // an unmounted teleport should always remove its children if not disabled


    if (doRemove || !isTeleportDisabled(props)) {
      hostRemove(anchor);

      if (shapeFlag & 16
      /* ARRAY_CHILDREN */
      ) {
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          unmount(child, parentComponent, parentSuspense, true, !!child.dynamicChildren);
        }
      }
    }
  },

  move: moveTeleport,
  hydrate: hydrateTeleport
};

function moveTeleport(vnode, container, parentAnchor, {
  o: {
    insert
  },
  m: move
}, moveType = 2
/* REORDER */
) {
  // move target anchor if this is a target change.
  if (moveType === 0
  /* TARGET_CHANGE */
  ) {
    insert(vnode.targetAnchor, container, parentAnchor);
  }

  const {
    el,
    anchor,
    shapeFlag,
    children,
    props
  } = vnode;
  const isReorder = moveType === 2
  /* REORDER */
  ; // move main view anchor if this is a re-order.

  if (isReorder) {
    insert(el, container, parentAnchor);
  } // if this is a re-order and teleport is enabled (content is in target)
  // do not move children. So the opposite is: only move children if this
  // is not a reorder, or the teleport is disabled


  if (!isReorder || isTeleportDisabled(props)) {
    // Teleport has either Array children or no children.
    if (shapeFlag & 16
    /* ARRAY_CHILDREN */
    ) {
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, parentAnchor, 2
        /* REORDER */
        );
      }
    }
  } // move main view anchor if this is a re-order.


  if (isReorder) {
    insert(anchor, container, parentAnchor);
  }
}

function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, {
  o: {
    nextSibling,
    parentNode,
    querySelector
  }
}, hydrateChildren) {
  const target = vnode.target = resolveTarget(vnode.props, querySelector);

  if (target) {
    // if multiple teleports rendered to the same target element, we need to
    // pick up from where the last teleport finished instead of the first node
    const targetNode = target._lpa || target.firstChild;

    if (vnode.shapeFlag & 16
    /* ARRAY_CHILDREN */
    ) {
      if (isTeleportDisabled(vnode.props)) {
        vnode.anchor = hydrateChildren(nextSibling(node), vnode, parentNode(node), parentComponent, parentSuspense, slotScopeIds, optimized);
        vnode.targetAnchor = targetNode;
      } else {
        vnode.anchor = nextSibling(node); // lookahead until we find the target anchor
        // we cannot rely on return value of hydrateChildren() because there
        // could be nested teleports

        let targetAnchor = targetNode;

        while (targetAnchor) {
          targetAnchor = nextSibling(targetAnchor);

          if (targetAnchor && targetAnchor.nodeType === 8 && targetAnchor.data === 'teleport anchor') {
            vnode.targetAnchor = targetAnchor;
            target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
            break;
          }
        }

        hydrateChildren(targetNode, vnode, target, parentComponent, parentSuspense, slotScopeIds, optimized);
      }
    }
  }

  return vnode.anchor && nextSibling(vnode.anchor);
} // Force-casted public typing for h and TSX props inference


const Teleport = TeleportImpl;
const runtime_core_esm_bundler_Fragment = Symbol( false ? 0 : undefined);
const runtime_core_esm_bundler_Text = Symbol( false ? 0 : undefined);
const Comment = Symbol( false ? 0 : undefined);
const Static = Symbol( false ? 0 : undefined); // Since v-if and v-for are the two possible ways node structure can dynamically
// change, once we consider v-if branches and each v-for fragment a block, we
// can divide a template into nested blocks, and within each block the node
// structure would be stable. This allows us to skip most children diffing
// and only worry about the dynamic nodes (indicated by patch flags).

const blockStack = [];
let currentBlock = null;
/**
 * Open a block.
 * This must be called before `createBlock`. It cannot be part of `createBlock`
 * because the children of the block are evaluated before `createBlock` itself
 * is called. The generated code typically looks like this:
 *
 * ```js
 * function render() {
 *   return (openBlock(),createBlock('div', null, [...]))
 * }
 * ```
 * disableTracking is true when creating a v-for fragment block, since a v-for
 * fragment always diffs its children.
 *
 * @private
 */

function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}

function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
} // Whether we should be tracking dynamic child nodes inside a block.
// Only tracks when this value is > 0
// We are not using a simple boolean because this value may need to be
// incremented/decremented by nested usage of v-once (see below)


let isBlockTreeEnabled = 1;
/**
 * Block tracking sometimes needs to be disabled, for example during the
 * creation of a tree that needs to be cached by v-once. The compiler generates
 * code like this:
 *
 * ``` js
 * _cache[1] || (
 *   setBlockTracking(-1),
 *   _cache[1] = createVNode(...),
 *   setBlockTracking(1),
 *   _cache[1]
 * )
 * ```
 *
 * @private
 */

function setBlockTracking(value) {
  isBlockTreeEnabled += value;
}

function setupBlock(vnode) {
  // save current block children on the block vnode
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null; // close block

  closeBlock(); // a block is always going to be patched, so track it as a child of its
  // parent block

  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }

  return vnode;
}
/**
 * @private
 */


function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, true
  /* isBlock */
  ));
}
/**
 * Create a block root vnode. Takes the same exact arguments as `createVNode`.
 * A block root keeps track of dynamic nodes within the block in the
 * `dynamicChildren` array.
 *
 * @private
 */


function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(createVNode(type, props, children, patchFlag, dynamicProps, true
  /* isBlock: prevent a block from tracking itself */
  ));
}

function runtime_core_esm_bundler_isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}

function isSameVNodeType(n1, n2) {
  if (false) {}

  return n1.type === n2.type && n1.key === n2.key;
}

let vnodeArgsTransformer;
/**
 * Internal API for registering an arguments transform for createVNode
 * used for creating stubs in the test-utils
 * It is *internal* but needs to be exposed for test-utils to pick up proper
 * typings
 */

function transformVNodeArgs(transformer) {
  vnodeArgsTransformer = transformer;
}

const createVNodeWithArgsTransform = (...args) => {
  return _createVNode(...(vnodeArgsTransformer ? vnodeArgsTransformer(args, currentRenderingInstance) : args));
};

const InternalObjectKey = `__vInternal`;

const normalizeKey = ({
  key
}) => key != null ? key : null;

const normalizeRef = ({
  ref,
  ref_key,
  ref_for
}) => {
  return ref != null ? shared_esm_bundler_isString(ref) || isRef(ref) || isFunction(ref) ? {
    i: currentRenderingInstance,
    r: ref,
    k: ref_key,
    f: !!ref_for
  } : ref : null;
};

function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === runtime_core_esm_bundler_Fragment ? 0 : 1
/* ELEMENT */
, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null
  };

  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children); // normalize suspense children

    if (shapeFlag & 128
    /* SUSPENSE */
    ) {
      type.normalize(vnode);
    }
  } else if (children) {
    // compiled element vnode - if children is passed, only possible types are
    // string or Array.
    vnode.shapeFlag |= shared_esm_bundler_isString(children) ? 8
    /* TEXT_CHILDREN */
    : 16
    /* ARRAY_CHILDREN */
    ;
  } // validate key


  if (false) {} // track vnode for block tree


  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && ( // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  vnode.patchFlag > 0 || shapeFlag & 6
  /* COMPONENT */
  ) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32
  /* HYDRATE_EVENTS */
  ) {
    currentBlock.push(vnode);
  }

  return vnode;
}

const createVNode =  false ? 0 : _createVNode;

function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    if (false) {}

    type = Comment;
  }

  if (runtime_core_esm_bundler_isVNode(type)) {
    // createVNode receiving an existing vnode. This happens in cases like
    // <component :is="vnode"/>
    // #2078 make sure to merge refs during the clone instead of overwriting it
    const cloned = cloneVNode(type, props, true
    /* mergeRef: true */
    );

    if (children) {
      normalizeChildren(cloned, children);
    }

    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6
      /* COMPONENT */
      ) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }

    cloned.patchFlag |= -2
    /* BAIL */
    ;
    return cloned;
  } // class component normalization.


  if (isClassComponent(type)) {
    type = type.__vccOpts;
  } // class & style normalization.


  if (props) {
    // for reactive or proxy objects, we need to clone it to enable mutation.
    props = guardReactiveProps(props);
    let {
      class: klass,
      style
    } = props;

    if (klass && !shared_esm_bundler_isString(klass)) {
      props.class = normalizeClass(klass);
    }

    if (shared_esm_bundler_isObject(style)) {
      // reactive state objects need to be cloned since they are likely to be
      // mutated
      if (isProxy(style) && !shared_esm_bundler_isArray(style)) {
        style = shared_esm_bundler_extend({}, style);
      }

      props.style = normalizeStyle(style);
    }
  } // encode the vnode type information into a bitmap


  const shapeFlag = shared_esm_bundler_isString(type) ? 1
  /* ELEMENT */
  : isSuspense(type) ? 128
  /* SUSPENSE */
  : isTeleport(type) ? 64
  /* TELEPORT */
  : shared_esm_bundler_isObject(type) ? 4
  /* STATEFUL_COMPONENT */
  : isFunction(type) ? 2
  /* FUNCTIONAL_COMPONENT */
  : 0;

  if (false) {}

  return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
}

function guardReactiveProps(props) {
  if (!props) return null;
  return isProxy(props) || InternalObjectKey in props ? shared_esm_bundler_extend({}, props) : props;
}

function cloneVNode(vnode, extraProps, mergeRef = false) {
  // This is intentionally NOT using spread or extend to avoid the runtime
  // key enumeration cost.
  const {
    props,
    ref,
    patchFlag,
    children
  } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? // #2078 in the case of <component :is="vnode" ref="extra"/>
    // if the vnode itself already has a ref, cloneVNode will need to merge
    // the refs so the single vnode can be set on multiple refs
    mergeRef && ref ? shared_esm_bundler_isArray(ref) ? ref.concat(normalizeRef(extraProps)) : [ref, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children:  false ? 0 : children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== runtime_core_esm_bundler_Fragment ? patchFlag === -1 // hoisted node
    ? 16
    /* FULL_PROPS */
    : patchFlag | 16
    /* FULL_PROPS */
    : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor
  };
  return cloned;
}
/**
 * Dev only, for HMR of hoisted vnodes reused in v-for
 * https://github.com/vitejs/vite/issues/2022
 */


function deepCloneVNode(vnode) {
  const cloned = cloneVNode(vnode);

  if (isArray(vnode.children)) {
    cloned.children = vnode.children.map(deepCloneVNode);
  }

  return cloned;
}
/**
 * @private
 */


function createTextVNode(text = ' ', flag = 0) {
  return createVNode(runtime_core_esm_bundler_Text, null, text, flag);
}
/**
 * @private
 */


function createStaticVNode(content, numberOfNodes) {
  // A static vnode can contain multiple stringified elements, and the number
  // of elements is necessary for hydration.
  const vnode = createVNode(Static, null, content);
  vnode.staticCount = numberOfNodes;
  return vnode;
}
/**
 * @private
 */


function createCommentVNode(text = '', // when used as the v-else branch, the comment node must be created as a
// block to ensure correct updates.
asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}

function normalizeVNode(child) {
  if (child == null || typeof child === 'boolean') {
    // empty placeholder
    return createVNode(Comment);
  } else if (shared_esm_bundler_isArray(child)) {
    // fragment
    return createVNode(runtime_core_esm_bundler_Fragment, null, // #3666, avoid reference pollution when reusing vnode
    child.slice());
  } else if (typeof child === 'object') {
    // already vnode, this should be the most common since compiled templates
    // always produce all-vnode children arrays
    return cloneIfMounted(child);
  } else {
    // strings and numbers
    return createVNode(runtime_core_esm_bundler_Text, null, String(child));
  }
} // optimized normalization for template-compiled render fns


function cloneIfMounted(child) {
  return child.el === null || child.memo ? child : cloneVNode(child);
}

function normalizeChildren(vnode, children) {
  let type = 0;
  const {
    shapeFlag
  } = vnode;

  if (children == null) {
    children = null;
  } else if (shared_esm_bundler_isArray(children)) {
    type = 16
    /* ARRAY_CHILDREN */
    ;
  } else if (typeof children === 'object') {
    if (shapeFlag & (1
    /* ELEMENT */
    | 64
    /* TELEPORT */
    )) {
      // Normalize slot to plain children for plain element and Teleport
      const slot = children.default;

      if (slot) {
        // _c marker is added by withCtx() indicating this is a compiled slot
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }

      return;
    } else {
      type = 32
      /* SLOTS_CHILDREN */
      ;
      const slotFlag = children._;

      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3
      /* FORWARDED */
      && currentRenderingInstance) {
        // a child component receives forwarded slots from the parent.
        // its slot type is determined by its parent's slot type.
        if (currentRenderingInstance.slots._ === 1
        /* STABLE */
        ) {
          children._ = 1
          /* STABLE */
          ;
        } else {
          children._ = 2
          /* DYNAMIC */
          ;
          vnode.patchFlag |= 1024
          /* DYNAMIC_SLOTS */
          ;
        }
      }
    }
  } else if (isFunction(children)) {
    children = {
      default: children,
      _ctx: currentRenderingInstance
    };
    type = 32
    /* SLOTS_CHILDREN */
    ;
  } else {
    children = String(children); // force teleport children to array so it can be moved around

    if (shapeFlag & 64
    /* TELEPORT */
    ) {
      type = 16
      /* ARRAY_CHILDREN */
      ;
      children = [createTextVNode(children)];
    } else {
      type = 8
      /* TEXT_CHILDREN */
      ;
    }
  }

  vnode.children = children;
  vnode.shapeFlag |= type;
}

function mergeProps(...args) {
  const ret = {};

  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];

    for (const key in toMerge) {
      if (key === 'class') {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === 'style') {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (shared_esm_bundler_isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];

        if (incoming && existing !== incoming && !(shared_esm_bundler_isArray(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== '') {
        ret[key] = toMerge[key];
      }
    }
  }

  return ret;
}

function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7
  /* VNODE_HOOK */
  , [vnode, prevVNode]);
}

const emptyAppContext = createAppContext();
let uid$1 = 0;

function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type; // inherit parent app context - or - if root, adopt from root vnode

  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid$1++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(true
    /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };

  if (false) {} else {
    instance.ctx = {
      _: instance
    };
  }

  instance.root = parent ? parent.root : instance;
  instance.emit = emit$1.bind(null, instance); // apply custom element special handling

  if (vnode.ce) {
    vnode.ce(instance);
  }

  return instance;
}

let currentInstance = null;

const getCurrentInstance = () => currentInstance || currentRenderingInstance;

const setCurrentInstance = instance => {
  currentInstance = instance;
  instance.scope.on();
};

const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};

const isBuiltInTag = /*#__PURE__*/(/* unused pure expression or super */ null && (makeMap('slot,component')));

function validateComponentName(name, config) {
  const appIsNativeTag = config.isNativeTag || NO;

  if (isBuiltInTag(name) || appIsNativeTag(name)) {
    runtime_core_esm_bundler_warn('Do not use built-in or reserved HTML elements as component id: ' + name);
  }
}

function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4
  /* STATEFUL_COMPONENT */
  ;
}

let isInSSRComponentSetup = false;

function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const {
    props,
    children
  } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : undefined;
  isInSSRComponentSetup = false;
  return setupResult;
}

function setupStatefulComponent(instance, isSSR) {
  var _a;

  const Component = instance.type;

  if (false) {} // 0. create render proxy property access cache


  instance.accessCache = Object.create(null); // 1. create public instance / render proxy
  // also mark it raw so it's never observed

  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));

  if (false) {} // 2. call setup()


  const {
    setup
  } = Component;

  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0
    /* SETUP_FUNCTION */
    , [ false ? 0 : instance.props, setupContext]);
    resetTracking();
    unsetCurrentInstance();

    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);

      if (isSSR) {
        // return the promise so server-renderer can wait on it
        return setupResult.then(resolvedResult => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch(e => {
          handleError(e, instance, 0
          /* SETUP_FUNCTION */
          );
        });
      } else {
        // async setup returned Promise.
        // bail here and wait for re-entry.
        instance.asyncDep = setupResult;

        if (false) {}
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}

function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    // setup returned an inline render function
    if (instance.type.__ssrInlineRender) {
      // when the function's name is `ssrRender` (compiled by SFC inline mode),
      // set it as ssrRender instead.
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (shared_esm_bundler_isObject(setupResult)) {
    if (false) {} // setup returned bindings.
    // assuming a render function compiled from template is present.


    if (false) {}

    instance.setupState = proxyRefs(setupResult);

    if (false) {}
  } else if (false) {}

  finishComponentSetup(instance, isSSR);
}

let compile;
let installWithProxy;
/**
 * For runtime-dom to register the compiler.
 * Note the exported method uses any to avoid d.ts relying on the compiler types.
 */

function registerRuntimeCompiler(_compile) {
  compile = _compile;

  installWithProxy = i => {
    if (i.render._rc) {
      i.withProxy = new Proxy(i.ctx, RuntimeCompiledPublicInstanceProxyHandlers);
    }
  };
} // dev only


const runtime_core_esm_bundler_isRuntimeOnly = () => !compile;

function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type; // template / render function normalization
  // could be already set when returned from setup()

  if (!instance.render) {
    // only do on-the-fly compile if not in SSR - SSR on-the-fly compilation
    // is done by server-renderer
    if (!isSSR && compile && !Component.render) {
      const template = Component.template;

      if (template) {
        if (false) {}

        const {
          isCustomElement,
          compilerOptions
        } = instance.appContext.config;
        const {
          delimiters,
          compilerOptions: componentCompilerOptions
        } = Component;
        const finalCompilerOptions = shared_esm_bundler_extend(shared_esm_bundler_extend({
          isCustomElement,
          delimiters
        }, compilerOptions), componentCompilerOptions);
        Component.render = compile(template, finalCompilerOptions);

        if (false) {}
      }
    }

    instance.render = Component.render || shared_esm_bundler_NOOP; // for runtime-compiled render functions using `with` blocks, the render
    // proxy used needs a different `has` handler which is more performant and
    // also only allows a whitelist of globals to fallthrough.

    if (installWithProxy) {
      installWithProxy(instance);
    }
  } // support for 2.x options


  if (true) {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions(instance);
    resetTracking();
    unsetCurrentInstance();
  } // warn missing template/render
  // the runtime compilation of template in SSR is done by server-render


  if (false) {}
}

function createAttrsProxy(instance) {
  return new Proxy(instance.attrs,  false ? 0 : {
    get(target, key) {
      track(instance, "get"
      /* GET */
      , '$attrs');
      return target[key];
    }

  });
}

function createSetupContext(instance) {
  const expose = exposed => {
    if (false) {}

    instance.exposed = exposed || {};
  };

  let attrs;

  if (false) {} else {
    return {
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },

      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}

function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      }

    }));
  }
}

const classifyRE = /(?:^|[-_])(\w)/g;

const classify = str => str.replace(classifyRE, c => c.toUpperCase()).replace(/[-_]/g, '');

function getComponentName(Component) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name;
}
/* istanbul ignore next */


function formatComponentName(instance, Component, isRoot = false) {
  let name = getComponentName(Component);

  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);

    if (match) {
      name = match[1];
    }
  }

  if (!name && instance && instance.parent) {
    // try to infer the name based on reverse resolution
    const inferFromRegistry = registry => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };

    name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
  }

  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}

function isClassComponent(value) {
  return isFunction(value) && '__vccOpts' in value;
}

const runtime_core_esm_bundler_computed = (getterOrOptions, debugOptions) => {
  // @ts-ignore
  return reactivity_esm_bundler_computed(getterOrOptions, debugOptions, isInSSRComponentSetup);
}; // dev only


const warnRuntimeUsage = method => runtime_core_esm_bundler_warn(`${method}() is a compiler-hint helper that is only usable inside ` + `<script setup> of a single file component. Its arguments should be ` + `compiled away and passing it at runtime has no effect.`); // implementation


function defineProps() {
  if (false) {}

  return null;
} // implementation


function defineEmits() {
  if (false) {}

  return null;
}
/**
 * Vue `<script setup>` compiler macro for declaring a component's exposed
 * instance properties when it is accessed by a parent component via template
 * refs.
 *
 * `<script setup>` components are closed by default - i.e. variables inside
 * the `<script setup>` scope is not exposed to parent unless explicitly exposed
 * via `defineExpose`.
 *
 * This is only usable inside `<script setup>`, is compiled away in the
 * output and should **not** be actually called at runtime.
 */


function defineExpose(exposed) {
  if (false) {}
}
/**
 * Vue `<script setup>` compiler macro for providing props default values when
 * using type-based `defineProps` declaration.
 *
 * Example usage:
 * ```ts
 * withDefaults(defineProps<{
 *   size?: number
 *   labels?: string[]
 * }>(), {
 *   size: 3,
 *   labels: () => ['default label']
 * })
 * ```
 *
 * This is only usable inside `<script setup>`, is compiled away in the output
 * and should **not** be actually called at runtime.
 */


function withDefaults(props, defaults) {
  if (false) {}

  return null;
}

function useSlots() {
  return getContext().slots;
}

function useAttrs() {
  return getContext().attrs;
}

function getContext() {
  const i = getCurrentInstance();

  if (false) {}

  return i.setupContext || (i.setupContext = createSetupContext(i));
}
/**
 * Runtime helper for merging default declarations. Imported by compiled code
 * only.
 * @internal
 */


function mergeDefaults(raw, defaults) {
  const props = shared_esm_bundler_isArray(raw) ? raw.reduce((normalized, p) => (normalized[p] = {}, normalized), {}) : raw;

  for (const key in defaults) {
    const opt = props[key];

    if (opt) {
      if (shared_esm_bundler_isArray(opt) || isFunction(opt)) {
        props[key] = {
          type: opt,
          default: defaults[key]
        };
      } else {
        opt.default = defaults[key];
      }
    } else if (opt === null) {
      props[key] = {
        default: defaults[key]
      };
    } else if (false) {}
  }

  return props;
}
/**
 * Used to create a proxy for the rest element when destructuring props with
 * defineProps().
 * @internal
 */


function createPropsRestProxy(props, excludedKeys) {
  const ret = {};

  for (const key in props) {
    if (!excludedKeys.includes(key)) {
      Object.defineProperty(ret, key, {
        enumerable: true,
        get: () => props[key]
      });
    }
  }

  return ret;
}
/**
 * `<script setup>` helper for persisting the current instance context over
 * async/await flows.
 *
 * `@vue/compiler-sfc` converts the following:
 *
 * ```ts
 * const x = await foo()
 * ```
 *
 * into:
 *
 * ```ts
 * let __temp, __restore
 * const x = (([__temp, __restore] = withAsyncContext(() => foo())),__temp=await __temp,__restore(),__temp)
 * ```
 * @internal
 */


function withAsyncContext(getAwaitable) {
  const ctx = getCurrentInstance();

  if (false) {}

  let awaitable = getAwaitable();
  unsetCurrentInstance();

  if (isPromise(awaitable)) {
    awaitable = awaitable.catch(e => {
      setCurrentInstance(ctx);
      throw e;
    });
  }

  return [awaitable, () => setCurrentInstance(ctx)];
} // Actual implementation


function runtime_core_esm_bundler_h(type, propsOrChildren, children) {
  const l = arguments.length;

  if (l === 2) {
    if (shared_esm_bundler_isObject(propsOrChildren) && !shared_esm_bundler_isArray(propsOrChildren)) {
      // single vnode without props
      if (runtime_core_esm_bundler_isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      } // props without children


      return createVNode(type, propsOrChildren);
    } else {
      // omit props
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l === 3 && runtime_core_esm_bundler_isVNode(children)) {
      children = [children];
    }

    return createVNode(type, propsOrChildren, children);
  }
}

const ssrContextKey = Symbol( false ? 0 : ``);

const useSSRContext = () => {
  {
    const ctx = runtime_core_esm_bundler_inject(ssrContextKey);

    if (!ctx) {
      runtime_core_esm_bundler_warn(`Server rendering context not provided. Make sure to only call ` + `useSSRContext() conditionally in the server build.`);
    }

    return ctx;
  }
};

function runtime_core_esm_bundler_isShallow(value) {
  return !!(value && value["__v_isShallow"
  /* IS_SHALLOW */
  ]);
}

function runtime_core_esm_bundler_initCustomFormatter() {
  /* eslint-disable no-restricted-globals */
  if (true) {
    return;
  }

  const vueStyle = {
    style: 'color:#3ba776'
  };
  const numberStyle = {
    style: 'color:#0b1bc9'
  };
  const stringStyle = {
    style: 'color:#b62e24'
  };
  const keywordStyle = {
    style: 'color:#9d288c'
  }; // custom formatter for Chrome
  // https://www.mattzeunert.com/2016/02/19/custom-chrome-devtools-object-formatters.html

  const formatter = {
    header(obj) {
      // TODO also format ComponentPublicInstance & ctx.slots/attrs in setup
      if (!shared_esm_bundler_isObject(obj)) {
        return null;
      }

      if (obj.__isVue) {
        return ['div', vueStyle, `VueInstance`];
      } else if (isRef(obj)) {
        return ['div', {}, ['span', vueStyle, genRefFlag(obj)], '<', formatValue(obj.value), `>`];
      } else if (isReactive(obj)) {
        return ['div', {}, ['span', vueStyle, runtime_core_esm_bundler_isShallow(obj) ? 'ShallowReactive' : 'Reactive'], '<', formatValue(obj), `>${isReadonly(obj) ? ` (readonly)` : ``}`];
      } else if (isReadonly(obj)) {
        return ['div', {}, ['span', vueStyle, runtime_core_esm_bundler_isShallow(obj) ? 'ShallowReadonly' : 'Readonly'], '<', formatValue(obj), '>'];
      }

      return null;
    },

    hasBody(obj) {
      return obj && obj.__isVue;
    },

    body(obj) {
      if (obj && obj.__isVue) {
        return ['div', {}, ...formatInstance(obj.$)];
      }
    }

  };

  function formatInstance(instance) {
    const blocks = [];

    if (instance.type.props && instance.props) {
      blocks.push(createInstanceBlock('props', reactivity_esm_bundler_toRaw(instance.props)));
    }

    if (instance.setupState !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock('setup', instance.setupState));
    }

    if (instance.data !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock('data', reactivity_esm_bundler_toRaw(instance.data)));
    }

    const computed = extractKeys(instance, 'computed');

    if (computed) {
      blocks.push(createInstanceBlock('computed', computed));
    }

    const injected = extractKeys(instance, 'inject');

    if (injected) {
      blocks.push(createInstanceBlock('injected', injected));
    }

    blocks.push(['div', {}, ['span', {
      style: keywordStyle.style + ';opacity:0.66'
    }, '$ (internal): '], ['object', {
      object: instance
    }]]);
    return blocks;
  }

  function createInstanceBlock(type, target) {
    target = shared_esm_bundler_extend({}, target);

    if (!Object.keys(target).length) {
      return ['span', {}];
    }

    return ['div', {
      style: 'line-height:1.25em;margin-bottom:0.6em'
    }, ['div', {
      style: 'color:#476582'
    }, type], ['div', {
      style: 'padding-left:1.25em'
    }, ...Object.keys(target).map(key => {
      return ['div', {}, ['span', keywordStyle, key + ': '], formatValue(target[key], false)];
    })]];
  }

  function formatValue(v, asRaw = true) {
    if (typeof v === 'number') {
      return ['span', numberStyle, v];
    } else if (typeof v === 'string') {
      return ['span', stringStyle, JSON.stringify(v)];
    } else if (typeof v === 'boolean') {
      return ['span', keywordStyle, v];
    } else if (shared_esm_bundler_isObject(v)) {
      return ['object', {
        object: asRaw ? reactivity_esm_bundler_toRaw(v) : v
      }];
    } else {
      return ['span', stringStyle, String(v)];
    }
  }

  function extractKeys(instance, type) {
    const Comp = instance.type;

    if (isFunction(Comp)) {
      return;
    }

    const extracted = {};

    for (const key in instance.ctx) {
      if (isKeyOfType(Comp, key, type)) {
        extracted[key] = instance.ctx[key];
      }
    }

    return extracted;
  }

  function isKeyOfType(Comp, key, type) {
    const opts = Comp[type];

    if (shared_esm_bundler_isArray(opts) && opts.includes(key) || shared_esm_bundler_isObject(opts) && key in opts) {
      return true;
    }

    if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
      return true;
    }

    if (Comp.mixins && Comp.mixins.some(m => isKeyOfType(m, key, type))) {
      return true;
    }
  }

  function genRefFlag(v) {
    if (runtime_core_esm_bundler_isShallow(v)) {
      return `ShallowRef`;
    }

    if (v.effect) {
      return `ComputedRef`;
    }

    return `Ref`;
  }

  if (window.devtoolsFormatters) {
    window.devtoolsFormatters.push(formatter);
  } else {
    window.devtoolsFormatters = [formatter];
  }
}

function withMemo(memo, render, cache, index) {
  const cached = cache[index];

  if (cached && isMemoSame(cached, memo)) {
    return cached;
  }

  const ret = render(); // shallow clone

  ret.memo = memo.slice();
  return cache[index] = ret;
}

function isMemoSame(cached, memo) {
  const prev = cached.memo;

  if (prev.length != memo.length) {
    return false;
  }

  for (let i = 0; i < prev.length; i++) {
    if (hasChanged(prev[i], memo[i])) {
      return false;
    }
  } // make sure to let parent block track it when returning cached


  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(cached);
  }

  return true;
} // Core API ------------------------------------------------------------------


const version = "3.2.36";
const _ssrUtils = {
  createComponentInstance,
  setupComponent,
  renderComponentRoot,
  setCurrentRenderingInstance,
  isVNode: runtime_core_esm_bundler_isVNode,
  normalizeVNode
};
/**
 * SSR utils for \@vue/server-renderer. Only exposed in cjs builds.
 * @internal
 */

const ssrUtils = _ssrUtils;
/**
 * @internal only exposed in compat builds
 */

const resolveFilter = null;
/**
 * @internal only exposed in compat builds.
 */

const compatUtils = null;

;// CONCATENATED MODULE: ./node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js




const svgNS = 'http://www.w3.org/2000/svg';
const doc = typeof document !== 'undefined' ? document : null;
const templateContainer = doc && /*#__PURE__*/doc.createElement('template');
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: child => {
    const parent = child.parentNode;

    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, isSVG, is, props) => {
    const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? {
      is
    } : undefined);

    if (tag === 'select' && props && props.multiple != null) {
      el.setAttribute('multiple', props.multiple);
    }

    return el;
  },
  createText: text => doc.createTextNode(text),
  createComment: text => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: node => node.parentNode,
  nextSibling: node => node.nextSibling,
  querySelector: selector => doc.querySelector(selector),

  setScopeId(el, id) {
    el.setAttribute(id, '');
  },

  cloneNode(el) {
    const cloned = el.cloneNode(true); // #3072
    // - in `patchDOMProp`, we store the actual value in the `el._value` property.
    // - normally, elements using `:value` bindings will not be hoisted, but if
    //   the bound value is a constant, e.g. `:value="true"` - they do get
    //   hoisted.
    // - in production, hoisted nodes are cloned when subsequent inserts, but
    //   cloneNode() does not copy the custom property we attached.
    // - This may need to account for other custom DOM properties we attach to
    //   elements in addition to `_value` in the future.

    if (`_value` in el) {
      cloned._value = el._value;
    }

    return cloned;
  },

  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, isSVG, start, end) {
    // <parent> before | first ... last | anchor </parent>
    const before = anchor ? anchor.previousSibling : parent.lastChild; // #5308 can only take cached path if:
    // - has a single root node
    // - nextSibling info is still available

    if (start && (start === end || start.nextSibling)) {
      // cached
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling)) break;
      }
    } else {
      // fresh insert
      templateContainer.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
      const template = templateContainer.content;

      if (isSVG) {
        // remove outer svg wrapper
        const wrapper = template.firstChild;

        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }

        template.removeChild(wrapper);
      }

      parent.insertBefore(template, anchor);
    }

    return [// first
    before ? before.nextSibling : parent.firstChild, // last
    anchor ? anchor.previousSibling : parent.lastChild];
  }

}; // compiler should normalize class + :class bindings on the same element
// into a single binding ['staticClass', dynamic]

function patchClass(el, value, isSVG) {
  // directly setting className should be faster than setAttribute in theory
  // if this is an element during a transition, take the temporary transition
  // classes into account.
  const transitionClasses = el._vtc;

  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(' ');
  }

  if (value == null) {
    el.removeAttribute('class');
  } else if (isSVG) {
    el.setAttribute('class', value);
  } else {
    el.className = value;
  }
}

function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = shared_esm_bundler_isString(next);

  if (next && !isCssString) {
    for (const key in next) {
      setStyle(style, key, next[key]);
    }

    if (prev && !shared_esm_bundler_isString(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style, key, '');
        }
      }
    }
  } else {
    const currentDisplay = style.display;

    if (isCssString) {
      if (prev !== next) {
        style.cssText = next;
      }
    } else if (prev) {
      el.removeAttribute('style');
    } // indicates that the `display` of the element is controlled by `v-show`,
    // so we always keep the current `display` value regardless of the `style`
    // value, thus handing over control to `v-show`.


    if ('_vod' in el) {
      style.display = currentDisplay;
    }
  }
}

const importantRE = /\s*!important$/;

function setStyle(style, name, val) {
  if (shared_esm_bundler_isArray(val)) {
    val.forEach(v => setStyle(style, name, v));
  } else {
    if (val == null) val = '';

    if (name.startsWith('--')) {
      // custom property definition
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);

      if (importantRE.test(val)) {
        // !important
        style.setProperty(shared_esm_bundler_hyphenate(prefixed), val.replace(importantRE, ''), 'important');
      } else {
        style[prefixed] = val;
      }
    }
  }
}

const prefixes = ['Webkit', 'Moz', 'ms'];
const prefixCache = {};

function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];

  if (cached) {
    return cached;
  }

  let name = shared_esm_bundler_camelize(rawName);

  if (name !== 'filter' && name in style) {
    return prefixCache[rawName] = name;
  }

  name = shared_esm_bundler_capitalize(name);

  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;

    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }

  return rawName;
}

const xlinkNS = 'http://www.w3.org/1999/xlink';

function patchAttr(el, key, value, isSVG, instance) {
  if (isSVG && key.startsWith('xlink:')) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    // note we are only checking boolean attributes that don't have a
    // corresponding dom prop of the same name here.
    const isBoolean = isSpecialBooleanAttr(key);

    if (value == null || isBoolean && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean ? '' : value);
    }
  }
} // __UNSAFE__
// functions. The user is responsible for using them with only trusted content.


function patchDOMProp(el, key, value, // the following args are passed only due to potential innerHTML/textContent
// overriding existing VNodes, in which case the old tree must be properly
// unmounted.
prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === 'innerHTML' || key === 'textContent') {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }

    el[key] = value == null ? '' : value;
    return;
  }

  if (key === 'value' && el.tagName !== 'PROGRESS' && // custom elements may use _value internally
  !el.tagName.includes('-')) {
    // store value as _value as well since
    // non-string values will be stringified.
    el._value = value;
    const newValue = value == null ? '' : value;

    if (el.value !== newValue || // #4956: always set for OPTION elements because its value falls back to
    // textContent if no value attribute is present. And setting .value for
    // OPTION has no side effect
    el.tagName === 'OPTION') {
      el.value = newValue;
    }

    if (value == null) {
      el.removeAttribute(key);
    }

    return;
  }

  let needRemove = false;

  if (value === '' || value == null) {
    const type = typeof el[key];

    if (type === 'boolean') {
      // e.g. <select multiple> compiles to { multiple: '' }
      value = includeBooleanAttr(value);
    } else if (value == null && type === 'string') {
      // e.g. <div :id="null">
      value = '';
      needRemove = true;
    } else if (type === 'number') {
      // e.g. <img :width="null">
      // the value of some IDL attr must be greater than 0, e.g. input.size = 0 -> error
      value = 0;
      needRemove = true;
    }
  } // some properties perform value validation and throw,
  // some properties has getter, no setter, will error in 'use strict'
  // eg. <select :type="null"></select> <select :willValidate="null"></select>


  try {
    el[key] = value;
  } catch (e) {
    if (false) {}
  }

  needRemove && el.removeAttribute(key);
} // Async edge case fix requires storing an event listener's attach timestamp.


const [_getNow, skipTimestampCheck] = /*#__PURE__*/(() => {
  let _getNow = Date.now;
  let skipTimestampCheck = false;

  if (typeof window !== 'undefined') {
    // Determine what event timestamp the browser is using. Annoyingly, the
    // timestamp can either be hi-res (relative to page load) or low-res
    // (relative to UNIX epoch), so in order to compare time we have to use the
    // same timestamp type when saving the flush timestamp.
    if (Date.now() > document.createEvent('Event').timeStamp) {
      // if the low-res timestamp which is bigger than the event timestamp
      // (which is evaluated AFTER) it means the event is using a hi-res timestamp,
      // and we need to use the hi-res version for event listeners as well.
      _getNow = performance.now.bind(performance);
    } // #3485: Firefox <= 53 has incorrect Event.timeStamp implementation
    // and does not fire microtasks in between event propagation, so safe to exclude.


    const ffMatch = navigator.userAgent.match(/firefox\/(\d+)/i);
    skipTimestampCheck = !!(ffMatch && Number(ffMatch[1]) <= 53);
  }

  return [_getNow, skipTimestampCheck];
})(); // To avoid the overhead of repeatedly calling performance.now(), we cache
// and use the same timestamp for all event listeners attached in the same tick.


let cachedNow = 0;
const p = /*#__PURE__*/Promise.resolve();

const runtime_dom_esm_bundler_reset = () => {
  cachedNow = 0;
};

const getNow = () => cachedNow || (p.then(runtime_dom_esm_bundler_reset), cachedNow = _getNow());

function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}

function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}

function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  // vei = vue event invokers
  const invokers = el._vei || (el._vei = {});
  const existingInvoker = invokers[rawName];

  if (nextValue && existingInvoker) {
    // patch
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);

    if (nextValue) {
      // add
      const invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      // remove
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = undefined;
    }
  }
}

const optionsModifierRE = /(?:Once|Passive|Capture)$/;

function parseName(name) {
  let options;

  if (optionsModifierRE.test(name)) {
    options = {};
    let m;

    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }

  return [shared_esm_bundler_hyphenate(name.slice(2)), options];
}

function createInvoker(initialValue, instance) {
  const invoker = e => {
    // async edge case #6566: inner click event triggers patch, event handler
    // attached to outer element during patch, and triggered again. This
    // happens because browsers fire microtask ticks between event propagation.
    // the solution is simple: we save the timestamp when a handler is attached,
    // and the handler would only fire if the event passed to it was fired
    // AFTER it was attached.
    const timeStamp = e.timeStamp || _getNow();

    if (skipTimestampCheck || timeStamp >= invoker.attached - 1) {
      callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5
      /* NATIVE_EVENT_HANDLER */
      , [e]);
    }
  };

  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}

function patchStopImmediatePropagation(e, value) {
  if (shared_esm_bundler_isArray(value)) {
    const originalStop = e.stopImmediatePropagation;

    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };

    return value.map(fn => e => !e._stopped && fn && fn(e));
  } else {
    return value;
  }
}

const nativeOnRE = /^on[a-z]/;

const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  if (key === 'class') {
    patchClass(el, nextValue, isSVG);
  } else if (key === 'style') {
    patchStyle(el, prevValue, nextValue);
  } else if (shared_esm_bundler_isOn(key)) {
    // ignore v-model listeners
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === '.' ? (key = key.slice(1), true) : key[0] === '^' ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
  } else {
    // special case for <input v-model type="checkbox"> with
    // :true-value & :false-value
    // store value as dom properties since non-string values will be
    // stringified.
    if (key === 'true-value') {
      el._trueValue = nextValue;
    } else if (key === 'false-value') {
      el._falseValue = nextValue;
    }

    patchAttr(el, key, nextValue, isSVG);
  }
};

function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    // most keys must be set as attribute on svg elements to work
    // ...except innerHTML & textContent
    if (key === 'innerHTML' || key === 'textContent') {
      return true;
    } // or native onclick with function values


    if (key in el && nativeOnRE.test(key) && isFunction(value)) {
      return true;
    }

    return false;
  } // these are enumerated attrs, however their corresponding DOM properties
  // are actually booleans - this leads to setting it with a string "false"
  // value leading it to be coerced to `true`, so we need to always treat
  // them as attributes.
  // Note that `contentEditable` doesn't have this problem: its DOM
  // property is also enumerated string values.


  if (key === 'spellcheck' || key === 'draggable' || key === 'translate') {
    return false;
  } // #1787, #2840 form property on form elements is readonly and must be set as
  // attribute.


  if (key === 'form') {
    return false;
  } // #1526 <input list> must be set as attribute


  if (key === 'list' && el.tagName === 'INPUT') {
    return false;
  } // #2766 <textarea type> must be set as attribute


  if (key === 'type' && el.tagName === 'TEXTAREA') {
    return false;
  } // native onclick with string value, must be set as attribute


  if (nativeOnRE.test(key) && shared_esm_bundler_isString(value)) {
    return false;
  }

  return key in el;
}

function defineCustomElement(options, hydrate) {
  const Comp = defineComponent(options);

  class VueCustomElement extends VueElement {
    constructor(initialProps) {
      super(Comp, initialProps, hydrate);
    }

  }

  VueCustomElement.def = Comp;
  return VueCustomElement;
}

const defineSSRCustomElement = options => {
  // @ts-ignore
  return defineCustomElement(options, hydrate);
};

const BaseClass = typeof HTMLElement !== 'undefined' ? HTMLElement : class {};

class VueElement extends BaseClass {
  constructor(_def, _props = {}, hydrate) {
    super();
    this._def = _def;
    this._props = _props;
    /**
     * @internal
     */

    this._instance = null;
    this._connected = false;
    this._resolved = false;
    this._numberProps = null;

    if (this.shadowRoot && hydrate) {
      hydrate(this._createVNode(), this.shadowRoot);
    } else {
      if (false) {}

      this.attachShadow({
        mode: 'open'
      });
    }
  }

  connectedCallback() {
    this._connected = true;

    if (!this._instance) {
      this._resolveDef();
    }
  }

  disconnectedCallback() {
    this._connected = false;
    runtime_core_esm_bundler_nextTick(() => {
      if (!this._connected) {
        render(null, this.shadowRoot);
        this._instance = null;
      }
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */


  _resolveDef() {
    if (this._resolved) {
      return;
    }

    this._resolved = true; // set initial attrs

    for (let i = 0; i < this.attributes.length; i++) {
      this._setAttr(this.attributes[i].name);
    } // watch future attr changes


    new MutationObserver(mutations => {
      for (const m of mutations) {
        this._setAttr(m.attributeName);
      }
    }).observe(this, {
      attributes: true
    });

    const resolve = def => {
      const {
        props,
        styles
      } = def;
      const hasOptions = !shared_esm_bundler_isArray(props);
      const rawKeys = props ? hasOptions ? Object.keys(props) : props : []; // cast Number-type props set before resolve

      let numberProps;

      if (hasOptions) {
        for (const key in this._props) {
          const opt = props[key];

          if (opt === Number || opt && opt.type === Number) {
            this._props[key] = toNumber(this._props[key]);
            (numberProps || (numberProps = Object.create(null)))[key] = true;
          }
        }
      }

      this._numberProps = numberProps; // check if there are props set pre-upgrade or connect

      for (const key of Object.keys(this)) {
        if (key[0] !== '_') {
          this._setProp(key, this[key], true, false);
        }
      } // defining getter/setters on prototype


      for (const key of rawKeys.map(shared_esm_bundler_camelize)) {
        Object.defineProperty(this, key, {
          get() {
            return this._getProp(key);
          },

          set(val) {
            this._setProp(key, val);
          }

        });
      } // apply CSS


      this._applyStyles(styles); // initial render


      this._update();
    };

    const asyncDef = this._def.__asyncLoader;

    if (asyncDef) {
      asyncDef().then(resolve);
    } else {
      resolve(this._def);
    }
  }

  _setAttr(key) {
    let value = this.getAttribute(key);

    if (this._numberProps && this._numberProps[key]) {
      value = toNumber(value);
    }

    this._setProp(shared_esm_bundler_camelize(key), value, false);
  }
  /**
   * @internal
   */


  _getProp(key) {
    return this._props[key];
  }
  /**
   * @internal
   */


  _setProp(key, val, shouldReflect = true, shouldUpdate = true) {
    if (val !== this._props[key]) {
      this._props[key] = val;

      if (shouldUpdate && this._instance) {
        this._update();
      } // reflect


      if (shouldReflect) {
        if (val === true) {
          this.setAttribute(shared_esm_bundler_hyphenate(key), '');
        } else if (typeof val === 'string' || typeof val === 'number') {
          this.setAttribute(shared_esm_bundler_hyphenate(key), val + '');
        } else if (!val) {
          this.removeAttribute(shared_esm_bundler_hyphenate(key));
        }
      }
    }
  }

  _update() {
    render(this._createVNode(), this.shadowRoot);
  }

  _createVNode() {
    const vnode = createVNode(this._def, shared_esm_bundler_extend({}, this._props));

    if (!this._instance) {
      vnode.ce = instance => {
        this._instance = instance;
        instance.isCE = true; // HMR

        if (false) {} // intercept emit


        instance.emit = (event, ...args) => {
          this.dispatchEvent(new CustomEvent(event, {
            detail: args
          }));
        }; // locate nearest Vue custom element parent for provide/inject


        let parent = this;

        while (parent = parent && (parent.parentNode || parent.host)) {
          if (parent instanceof VueElement) {
            instance.parent = parent._instance;
            break;
          }
        }
      };
    }

    return vnode;
  }

  _applyStyles(styles) {
    if (styles) {
      styles.forEach(css => {
        const s = document.createElement('style');
        s.textContent = css;
        this.shadowRoot.appendChild(s); // record for HMR

        if (false) {}
      });
    }
  }

}

function useCssModule(name = '$style') {
  /* istanbul ignore else */
  {
    const instance = getCurrentInstance();

    if (!instance) {
       false && 0;
      return EMPTY_OBJ;
    }

    const modules = instance.type.__cssModules;

    if (!modules) {
       false && 0;
      return EMPTY_OBJ;
    }

    const mod = modules[name];

    if (!mod) {
       false && 0;
      return EMPTY_OBJ;
    }

    return mod;
  }
}
/**
 * Runtime helper for SFC's CSS variable injection feature.
 * @private
 */


function useCssVars(getter) {
  const instance = getCurrentInstance();
  /* istanbul ignore next */

  if (!instance) {
     false && 0;
    return;
  }

  const setVars = () => setVarsOnVNode(instance.subTree, getter(instance.proxy));

  watchPostEffect(setVars);
  onMounted(() => {
    const ob = new MutationObserver(setVars);
    ob.observe(instance.subTree.el.parentNode, {
      childList: true
    });
    onUnmounted(() => ob.disconnect());
  });
}

function setVarsOnVNode(vnode, vars) {
  if (vnode.shapeFlag & 128
  /* SUSPENSE */
  ) {
    const suspense = vnode.suspense;
    vnode = suspense.activeBranch;

    if (suspense.pendingBranch && !suspense.isHydrating) {
      suspense.effects.push(() => {
        setVarsOnVNode(suspense.activeBranch, vars);
      });
    }
  } // drill down HOCs until it's a non-component vnode


  while (vnode.component) {
    vnode = vnode.component.subTree;
  }

  if (vnode.shapeFlag & 1
  /* ELEMENT */
  && vnode.el) {
    setVarsOnNode(vnode.el, vars);
  } else if (vnode.type === runtime_core_esm_bundler_Fragment) {
    vnode.children.forEach(c => setVarsOnVNode(c, vars));
  } else if (vnode.type === Static) {
    let {
      el,
      anchor
    } = vnode;

    while (el) {
      setVarsOnNode(el, vars);
      if (el === anchor) break;
      el = el.nextSibling;
    }
  }
}

function setVarsOnNode(el, vars) {
  if (el.nodeType === 1) {
    const style = el.style;

    for (const key in vars) {
      style.setProperty(`--${key}`, vars[key]);
    }
  }
}

const TRANSITION = 'transition';
const ANIMATION = 'animation'; // DOM Transition is a higher-order-component based on the platform-agnostic
// base Transition component, with DOM-specific logic.

const Transition = (props, {
  slots
}) => runtime_core_esm_bundler_h(BaseTransition, resolveTransitionProps(props), slots);

Transition.displayName = 'Transition';
const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
const TransitionPropsValidators = Transition.props = /*#__PURE__*/shared_esm_bundler_extend({}, BaseTransition.props, DOMTransitionPropsValidators);
/**
 * #3227 Incoming hooks may be merged into arrays when wrapping Transition
 * with custom HOCs.
 */

const runtime_dom_esm_bundler_callHook = (hook, args = []) => {
  if (shared_esm_bundler_isArray(hook)) {
    hook.forEach(h => h(...args));
  } else if (hook) {
    hook(...args);
  }
};
/**
 * Check if a hook expects a callback (2nd arg), which means the user
 * intends to explicitly control the end of the transition.
 */


const hasExplicitCallback = hook => {
  return hook ? shared_esm_bundler_isArray(hook) ? hook.some(h => h.length > 1) : hook.length > 1 : false;
};

function resolveTransitionProps(rawProps) {
  const baseProps = {};

  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }

  if (rawProps.css === false) {
    return baseProps;
  }

  const {
    name = 'v',
    type,
    duration,
    enterFromClass = `${name}-enter-from`,
    enterActiveClass = `${name}-enter-active`,
    enterToClass = `${name}-enter-to`,
    appearFromClass = enterFromClass,
    appearActiveClass = enterActiveClass,
    appearToClass = enterToClass,
    leaveFromClass = `${name}-leave-from`,
    leaveActiveClass = `${name}-leave-active`,
    leaveToClass = `${name}-leave-to`
  } = rawProps;
  const durations = normalizeDuration(duration);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const {
    onBeforeEnter,
    onEnter,
    onEnterCancelled,
    onLeave,
    onLeaveCancelled,
    onBeforeAppear = onBeforeEnter,
    onAppear = onEnter,
    onAppearCancelled = onEnterCancelled
  } = baseProps;

  const finishEnter = (el, isAppear, done) => {
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };

  const finishLeave = (el, done) => {
    el._isLeaving = false;
    removeTransitionClass(el, leaveFromClass);
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };

  const makeEnterHook = isAppear => {
    return (el, done) => {
      const hook = isAppear ? onAppear : onEnter;

      const resolve = () => finishEnter(el, isAppear, done);

      runtime_dom_esm_bundler_callHook(hook, [el, resolve]);
      nextFrame(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);

        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el, type, enterDuration, resolve);
        }
      });
    };
  };

  return shared_esm_bundler_extend(baseProps, {
    onBeforeEnter(el) {
      runtime_dom_esm_bundler_callHook(onBeforeEnter, [el]);
      addTransitionClass(el, enterFromClass);
      addTransitionClass(el, enterActiveClass);
    },

    onBeforeAppear(el) {
      runtime_dom_esm_bundler_callHook(onBeforeAppear, [el]);
      addTransitionClass(el, appearFromClass);
      addTransitionClass(el, appearActiveClass);
    },

    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),

    onLeave(el, done) {
      el._isLeaving = true;

      const resolve = () => finishLeave(el, done);

      addTransitionClass(el, leaveFromClass); // force reflow so *-leave-from classes immediately take effect (#2593)

      forceReflow();
      addTransitionClass(el, leaveActiveClass);
      nextFrame(() => {
        if (!el._isLeaving) {
          // cancelled
          return;
        }

        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);

        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el, type, leaveDuration, resolve);
        }
      });
      runtime_dom_esm_bundler_callHook(onLeave, [el, resolve]);
    },

    onEnterCancelled(el) {
      finishEnter(el, false);
      runtime_dom_esm_bundler_callHook(onEnterCancelled, [el]);
    },

    onAppearCancelled(el) {
      finishEnter(el, true);
      runtime_dom_esm_bundler_callHook(onAppearCancelled, [el]);
    },

    onLeaveCancelled(el) {
      finishLeave(el);
      runtime_dom_esm_bundler_callHook(onLeaveCancelled, [el]);
    }

  });
}

function normalizeDuration(duration) {
  if (duration == null) {
    return null;
  } else if (shared_esm_bundler_isObject(duration)) {
    return [NumberOf(duration.enter), NumberOf(duration.leave)];
  } else {
    const n = NumberOf(duration);
    return [n, n];
  }
}

function NumberOf(val) {
  const res = toNumber(val);
  if (false) {}
  return res;
}

function validateDuration(val) {
  if (typeof val !== 'number') {
    warn(`<transition> explicit duration is not a valid number - ` + `got ${JSON.stringify(val)}.`);
  } else if (isNaN(val)) {
    warn(`<transition> explicit duration is NaN - ` + 'the duration expression might be incorrect.');
  }
}

function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach(c => c && el.classList.add(c));
  (el._vtc || (el._vtc = new Set())).add(cls);
}

function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach(c => c && el.classList.remove(c));
  const {
    _vtc
  } = el;

  if (_vtc) {
    _vtc.delete(cls);

    if (!_vtc.size) {
      el._vtc = undefined;
    }
  }
}

function nextFrame(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}

let endId = 0;

function whenTransitionEnds(el, expectedType, explicitTimeout, resolve) {
  const id = el._endId = ++endId;

  const resolveIfNotStale = () => {
    if (id === el._endId) {
      resolve();
    }
  };

  if (explicitTimeout) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }

  const {
    type,
    timeout,
    propCount
  } = getTransitionInfo(el, expectedType);

  if (!type) {
    return resolve();
  }

  const endEvent = type + 'end';
  let ended = 0;

  const end = () => {
    el.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };

  const onEnd = e => {
    if (e.target === el && ++ended >= propCount) {
      end();
    }
  };

  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(endEvent, onEnd);
}

function getTransitionInfo(el, expectedType) {
  const styles = window.getComputedStyle(el); // JSDOM may return undefined for transition properties

  const getStyleProperties = key => (styles[key] || '').split(', ');

  const transitionDelays = getStyleProperties(TRANSITION + 'Delay');
  const transitionDurations = getStyleProperties(TRANSITION + 'Duration');
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(ANIMATION + 'Delay');
  const animationDurations = getStyleProperties(ANIMATION + 'Duration');
  const animationTimeout = getTimeout(animationDelays, animationDurations);
  let type = null;
  let timeout = 0;
  let propCount = 0;
  /* istanbul ignore if */

  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }

  const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(styles[TRANSITION + 'Property']);
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
}

function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
} // Old versions of Chromium (below 61.0.3163.100) formats floating pointer
// numbers in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down
// (i.e. acting as a floor function) causing unexpected behaviors


function toMs(s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000;
} // synchronously force layout to put elements into a certain state


function forceReflow() {
  return document.body.offsetHeight;
}

const positionMap = new WeakMap();
const newPositionMap = new WeakMap();
const TransitionGroupImpl = {
  name: 'TransitionGroup',
  props: /*#__PURE__*/shared_esm_bundler_extend({}, TransitionPropsValidators, {
    tag: String,
    moveClass: String
  }),

  setup(props, {
    slots
  }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevChildren;
    let children;
    onUpdated(() => {
      // children is guaranteed to exist after initial render
      if (!prevChildren.length) {
        return;
      }

      const moveClass = props.moveClass || `${props.name || 'v'}-move`;

      if (!hasCSSTransform(prevChildren[0].el, instance.vnode.el, moveClass)) {
        return;
      } // we divide the work into three loops to avoid mixing DOM reads and writes
      // in each iteration - which helps prevent layout thrashing.


      prevChildren.forEach(callPendingCbs);
      prevChildren.forEach(recordPosition);
      const movedChildren = prevChildren.filter(applyTranslation); // force reflow to put everything in position

      forceReflow();
      movedChildren.forEach(c => {
        const el = c.el;
        const style = el.style;
        addTransitionClass(el, moveClass);
        style.transform = style.webkitTransform = style.transitionDuration = '';

        const cb = el._moveCb = e => {
          if (e && e.target !== el) {
            return;
          }

          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener('transitionend', cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        };

        el.addEventListener('transitionend', cb);
      });
    });
    return () => {
      const rawProps = reactivity_esm_bundler_toRaw(props);
      const cssTransitionProps = resolveTransitionProps(rawProps);
      let tag = rawProps.tag || runtime_core_esm_bundler_Fragment;
      prevChildren = children;
      children = slots.default ? getTransitionRawChildren(slots.default()) : [];

      for (let i = 0; i < children.length; i++) {
        const child = children[i];

        if (child.key != null) {
          setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
        } else if (false) {}
      }

      if (prevChildren) {
        for (let i = 0; i < prevChildren.length; i++) {
          const child = prevChildren[i];
          setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
          positionMap.set(child, child.el.getBoundingClientRect());
        }
      }

      return createVNode(tag, null, children);
    };
  }

};
const TransitionGroup = TransitionGroupImpl;

function callPendingCbs(c) {
  const el = c.el;

  if (el._moveCb) {
    el._moveCb();
  }

  if (el._enterCb) {
    el._enterCb();
  }
}

function recordPosition(c) {
  newPositionMap.set(c, c.el.getBoundingClientRect());
}

function applyTranslation(c) {
  const oldPos = positionMap.get(c);
  const newPos = newPositionMap.get(c);
  const dx = oldPos.left - newPos.left;
  const dy = oldPos.top - newPos.top;

  if (dx || dy) {
    const s = c.el.style;
    s.transform = s.webkitTransform = `translate(${dx}px,${dy}px)`;
    s.transitionDuration = '0s';
    return c;
  }
}

function hasCSSTransform(el, root, moveClass) {
  // Detect whether an element with the move class applied has
  // CSS transitions. Since the element may be inside an entering
  // transition at this very moment, we make a clone of it and remove
  // all other transition classes applied to ensure only the move class
  // is applied.
  const clone = el.cloneNode();

  if (el._vtc) {
    el._vtc.forEach(cls => {
      cls.split(/\s+/).forEach(c => c && clone.classList.remove(c));
    });
  }

  moveClass.split(/\s+/).forEach(c => c && clone.classList.add(c));
  clone.style.display = 'none';
  const container = root.nodeType === 1 ? root : root.parentNode;
  container.appendChild(clone);
  const {
    hasTransform
  } = getTransitionInfo(clone);
  container.removeChild(clone);
  return hasTransform;
}

const getModelAssigner = vnode => {
  const fn = vnode.props['onUpdate:modelValue'] || false;
  return shared_esm_bundler_isArray(fn) ? value => invokeArrayFns(fn, value) : fn;
};

function onCompositionStart(e) {
  e.target.composing = true;
}

function onCompositionEnd(e) {
  const target = e.target;

  if (target.composing) {
    target.composing = false;
    target.dispatchEvent(new Event('input'));
  }
} // We are exporting the v-model runtime directly as vnode hooks so that it can
// be tree-shaken in case v-model is never used.


const vModelText = {
  created(el, {
    modifiers: {
      lazy,
      trim,
      number
    }
  }, vnode) {
    el._assign = getModelAssigner(vnode);
    const castToNumber = number || vnode.props && vnode.props.type === 'number';
    addEventListener(el, lazy ? 'change' : 'input', e => {
      if (e.target.composing) return;
      let domValue = el.value;

      if (trim) {
        domValue = domValue.trim();
      }

      if (castToNumber) {
        domValue = toNumber(domValue);
      }

      el._assign(domValue);
    });

    if (trim) {
      addEventListener(el, 'change', () => {
        el.value = el.value.trim();
      });
    }

    if (!lazy) {
      addEventListener(el, 'compositionstart', onCompositionStart);
      addEventListener(el, 'compositionend', onCompositionEnd); // Safari < 10.2 & UIWebView doesn't fire compositionend when
      // switching focus before confirming composition choice
      // this also fixes the issue where some browsers e.g. iOS Chrome
      // fires "change" instead of "input" on autocomplete.

      addEventListener(el, 'change', onCompositionEnd);
    }
  },

  // set value on mounted so it's after min/max for type="range"
  mounted(el, {
    value
  }) {
    el.value = value == null ? '' : value;
  },

  beforeUpdate(el, {
    value,
    modifiers: {
      lazy,
      trim,
      number
    }
  }, vnode) {
    el._assign = getModelAssigner(vnode); // avoid clearing unresolved text. #2302

    if (el.composing) return;

    if (document.activeElement === el && el.type !== 'range') {
      if (lazy) {
        return;
      }

      if (trim && el.value.trim() === value) {
        return;
      }

      if ((number || el.type === 'number') && toNumber(el.value) === value) {
        return;
      }
    }

    const newValue = value == null ? '' : value;

    if (el.value !== newValue) {
      el.value = newValue;
    }
  }

};
const vModelCheckbox = {
  // #4096 array checkboxes need to be deep traversed
  deep: true,

  created(el, _, vnode) {
    el._assign = getModelAssigner(vnode);
    addEventListener(el, 'change', () => {
      const modelValue = el._modelValue;
      const elementValue = getValue(el);
      const checked = el.checked;
      const assign = el._assign;

      if (shared_esm_bundler_isArray(modelValue)) {
        const index = looseIndexOf(modelValue, elementValue);
        const found = index !== -1;

        if (checked && !found) {
          assign(modelValue.concat(elementValue));
        } else if (!checked && found) {
          const filtered = [...modelValue];
          filtered.splice(index, 1);
          assign(filtered);
        }
      } else if (isSet(modelValue)) {
        const cloned = new Set(modelValue);

        if (checked) {
          cloned.add(elementValue);
        } else {
          cloned.delete(elementValue);
        }

        assign(cloned);
      } else {
        assign(getCheckboxValue(el, checked));
      }
    });
  },

  // set initial checked on mount to wait for true-value/false-value
  mounted: setChecked,

  beforeUpdate(el, binding, vnode) {
    el._assign = getModelAssigner(vnode);
    setChecked(el, binding, vnode);
  }

};

function setChecked(el, {
  value,
  oldValue
}, vnode) {
  el._modelValue = value;

  if (shared_esm_bundler_isArray(value)) {
    el.checked = looseIndexOf(value, vnode.props.value) > -1;
  } else if (isSet(value)) {
    el.checked = value.has(vnode.props.value);
  } else if (value !== oldValue) {
    el.checked = looseEqual(value, getCheckboxValue(el, true));
  }
}

const vModelRadio = {
  created(el, {
    value
  }, vnode) {
    el.checked = looseEqual(value, vnode.props.value);
    el._assign = getModelAssigner(vnode);
    addEventListener(el, 'change', () => {
      el._assign(getValue(el));
    });
  },

  beforeUpdate(el, {
    value,
    oldValue
  }, vnode) {
    el._assign = getModelAssigner(vnode);

    if (value !== oldValue) {
      el.checked = looseEqual(value, vnode.props.value);
    }
  }

};
const vModelSelect = {
  // <select multiple> value need to be deep traversed
  deep: true,

  created(el, {
    value,
    modifiers: {
      number
    }
  }, vnode) {
    const isSetModel = isSet(value);
    addEventListener(el, 'change', () => {
      const selectedVal = Array.prototype.filter.call(el.options, o => o.selected).map(o => number ? toNumber(getValue(o)) : getValue(o));

      el._assign(el.multiple ? isSetModel ? new Set(selectedVal) : selectedVal : selectedVal[0]);
    });
    el._assign = getModelAssigner(vnode);
  },

  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(el, {
    value
  }) {
    setSelected(el, value);
  },

  beforeUpdate(el, _binding, vnode) {
    el._assign = getModelAssigner(vnode);
  },

  updated(el, {
    value
  }) {
    setSelected(el, value);
  }

};

function setSelected(el, value) {
  const isMultiple = el.multiple;

  if (isMultiple && !shared_esm_bundler_isArray(value) && !isSet(value)) {
     false && 0;
    return;
  }

  for (let i = 0, l = el.options.length; i < l; i++) {
    const option = el.options[i];
    const optionValue = getValue(option);

    if (isMultiple) {
      if (shared_esm_bundler_isArray(value)) {
        option.selected = looseIndexOf(value, optionValue) > -1;
      } else {
        option.selected = value.has(optionValue);
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) el.selectedIndex = i;
        return;
      }
    }
  }

  if (!isMultiple && el.selectedIndex !== -1) {
    el.selectedIndex = -1;
  }
} // retrieve raw value set via :value bindings


function getValue(el) {
  return '_value' in el ? el._value : el.value;
} // retrieve raw value for true-value and false-value set via :true-value or :false-value bindings


function getCheckboxValue(el, checked) {
  const key = checked ? '_trueValue' : '_falseValue';
  return key in el ? el[key] : checked;
}

const vModelDynamic = {
  created(el, binding, vnode) {
    callModelHook(el, binding, vnode, null, 'created');
  },

  mounted(el, binding, vnode) {
    callModelHook(el, binding, vnode, null, 'mounted');
  },

  beforeUpdate(el, binding, vnode, prevVNode) {
    callModelHook(el, binding, vnode, prevVNode, 'beforeUpdate');
  },

  updated(el, binding, vnode, prevVNode) {
    callModelHook(el, binding, vnode, prevVNode, 'updated');
  }

};

function resolveDynamicModel(tagName, type) {
  switch (tagName) {
    case 'SELECT':
      return vModelSelect;

    case 'TEXTAREA':
      return vModelText;

    default:
      switch (type) {
        case 'checkbox':
          return vModelCheckbox;

        case 'radio':
          return vModelRadio;

        default:
          return vModelText;
      }

  }
}

function callModelHook(el, binding, vnode, prevVNode, hook) {
  const modelToUse = resolveDynamicModel(el.tagName, vnode.props && vnode.props.type);
  const fn = modelToUse[hook];
  fn && fn(el, binding, vnode, prevVNode);
} // SSR vnode transforms, only used when user includes client-oriented render
// function in SSR


function initVModelForSSR() {
  vModelText.getSSRProps = ({
    value
  }) => ({
    value
  });

  vModelRadio.getSSRProps = ({
    value
  }, vnode) => {
    if (vnode.props && looseEqual(vnode.props.value, value)) {
      return {
        checked: true
      };
    }
  };

  vModelCheckbox.getSSRProps = ({
    value
  }, vnode) => {
    if (shared_esm_bundler_isArray(value)) {
      if (vnode.props && looseIndexOf(value, vnode.props.value) > -1) {
        return {
          checked: true
        };
      }
    } else if (isSet(value)) {
      if (vnode.props && value.has(vnode.props.value)) {
        return {
          checked: true
        };
      }
    } else if (value) {
      return {
        checked: true
      };
    }
  };

  vModelDynamic.getSSRProps = (binding, vnode) => {
    if (typeof vnode.type !== 'string') {
      return;
    }

    const modelToUse = resolveDynamicModel( // resolveDynamicModel expects an uppercase tag name, but vnode.type is lowercase
    vnode.type.toUpperCase(), vnode.props && vnode.props.type);

    if (modelToUse.getSSRProps) {
      return modelToUse.getSSRProps(binding, vnode);
    }
  };
}

const systemModifiers = ['ctrl', 'shift', 'alt', 'meta'];
const modifierGuards = {
  stop: e => e.stopPropagation(),
  prevent: e => e.preventDefault(),
  self: e => e.target !== e.currentTarget,
  ctrl: e => !e.ctrlKey,
  shift: e => !e.shiftKey,
  alt: e => !e.altKey,
  meta: e => !e.metaKey,
  left: e => 'button' in e && e.button !== 0,
  middle: e => 'button' in e && e.button !== 1,
  right: e => 'button' in e && e.button !== 2,
  exact: (e, modifiers) => systemModifiers.some(m => e[`${m}Key`] && !modifiers.includes(m))
};
/**
 * @private
 */

const withModifiers = (fn, modifiers) => {
  return (event, ...args) => {
    for (let i = 0; i < modifiers.length; i++) {
      const guard = modifierGuards[modifiers[i]];
      if (guard && guard(event, modifiers)) return;
    }

    return fn(event, ...args);
  };
}; // Kept for 2.x compat.
// Note: IE11 compat for `spacebar` and `del` is removed for now.


const keyNames = {
  esc: 'escape',
  space: ' ',
  up: 'arrow-up',
  left: 'arrow-left',
  right: 'arrow-right',
  down: 'arrow-down',
  delete: 'backspace'
};
/**
 * @private
 */

const withKeys = (fn, modifiers) => {
  return event => {
    if (!('key' in event)) {
      return;
    }

    const eventKey = shared_esm_bundler_hyphenate(event.key);

    if (modifiers.some(k => k === eventKey || keyNames[k] === eventKey)) {
      return fn(event);
    }
  };
};

const vShow = {
  beforeMount(el, {
    value
  }, {
    transition
  }) {
    el._vod = el.style.display === 'none' ? '' : el.style.display;

    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },

  mounted(el, {
    value
  }, {
    transition
  }) {
    if (transition && value) {
      transition.enter(el);
    }
  },

  updated(el, {
    value,
    oldValue
  }, {
    transition
  }) {
    if (!value === !oldValue) return;

    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },

  beforeUnmount(el, {
    value
  }) {
    setDisplay(el, value);
  }

};

function setDisplay(el, value) {
  el.style.display = value ? el._vod : 'none';
} // SSR vnode transforms, only used when user includes client-oriented render
// function in SSR


function initVShowForSSR() {
  vShow.getSSRProps = ({
    value
  }) => {
    if (!value) {
      return {
        style: {
          display: 'none'
        }
      };
    }
  };
}

const rendererOptions = /*#__PURE__*/shared_esm_bundler_extend({
  patchProp
}, nodeOps); // lazy create the renderer - this makes core renderer logic tree-shakable
// in case the user only imports reactivity utilities from Vue.

let renderer;
let enabledHydration = false;

function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}

function ensureHydrationRenderer() {
  renderer = enabledHydration ? renderer : createHydrationRenderer(rendererOptions);
  enabledHydration = true;
  return renderer;
} // use explicit type casts here to avoid import() calls in rolled-up d.ts


const render = (...args) => {
  ensureRenderer().render(...args);
};

const hydrate = (...args) => {
  ensureHydrationRenderer().hydrate(...args);
};

const createApp = (...args) => {
  const app = ensureRenderer().createApp(...args);

  if (false) {}

  const {
    mount
  } = app;

  app.mount = containerOrSelector => {
    const container = normalizeContainer(containerOrSelector);
    if (!container) return;
    const component = app._component;

    if (!isFunction(component) && !component.render && !component.template) {
      // __UNSAFE__
      // Reason: potential execution of JS expressions in in-DOM template.
      // The user must make sure the in-DOM template is trusted. If it's
      // rendered by the server, the template should not contain any user data.
      component.template = container.innerHTML;
    } // clear content before mounting


    container.innerHTML = '';
    const proxy = mount(container, false, container instanceof SVGElement);

    if (container instanceof Element) {
      container.removeAttribute('v-cloak');
      container.setAttribute('data-v-app', '');
    }

    return proxy;
  };

  return app;
};

const createSSRApp = (...args) => {
  const app = ensureHydrationRenderer().createApp(...args);

  if (false) {}

  const {
    mount
  } = app;

  app.mount = containerOrSelector => {
    const container = normalizeContainer(containerOrSelector);

    if (container) {
      return mount(container, true, container instanceof SVGElement);
    }
  };

  return app;
};

function injectNativeTagCheck(app) {
  // Inject `isNativeTag`
  // this is used for component name validation (dev only)
  Object.defineProperty(app.config, 'isNativeTag', {
    value: tag => isHTMLTag(tag) || isSVGTag(tag),
    writable: false
  });
} // dev only


function injectCompilerOptionsCheck(app) {
  if (isRuntimeOnly()) {
    const isCustomElement = app.config.isCustomElement;
    Object.defineProperty(app.config, 'isCustomElement', {
      get() {
        return isCustomElement;
      },

      set() {
        warn(`The \`isCustomElement\` config option is deprecated. Use ` + `\`compilerOptions.isCustomElement\` instead.`);
      }

    });
    const compilerOptions = app.config.compilerOptions;
    const msg = `The \`compilerOptions\` config option is only respected when using ` + `a build of Vue.js that includes the runtime compiler (aka "full build"). ` + `Since you are using the runtime-only build, \`compilerOptions\` ` + `must be passed to \`@vue/compiler-dom\` in the build setup instead.\n` + `- For vue-loader: pass it via vue-loader's \`compilerOptions\` loader option.\n` + `- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n` + `- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-dom`;
    Object.defineProperty(app.config, 'compilerOptions', {
      get() {
        warn(msg);
        return compilerOptions;
      },

      set() {
        warn(msg);
      }

    });
  }
}

function normalizeContainer(container) {
  if (shared_esm_bundler_isString(container)) {
    const res = document.querySelector(container);

    if (false) {}

    return res;
  }

  if (false) {}

  return container;
}

let ssrDirectiveInitialized = false;
/**
 * @internal
 */

const initDirectivesForSSR = () => {
  if (!ssrDirectiveInitialized) {
    ssrDirectiveInitialized = true;
    initVModelForSSR();
    initVShowForSSR();
  }
};


;// CONCATENATED MODULE: ./node_modules/@vue/compiler-core/dist/compiler-core.esm-bundler.js





function defaultOnError(error) {
  throw error;
}

function defaultOnWarn(msg) {
   false && 0;
}

function createCompilerError(code, loc, messages, additionalMessage) {
  const msg =  false ? 0 : code;
  const error = new SyntaxError(String(msg));
  error.code = code;
  error.loc = loc;
  return error;
}

const errorMessages = {
  // parse errors
  [0
  /* ABRUPT_CLOSING_OF_EMPTY_COMMENT */
  ]: 'Illegal comment.',
  [1
  /* CDATA_IN_HTML_CONTENT */
  ]: 'CDATA section is allowed only in XML context.',
  [2
  /* DUPLICATE_ATTRIBUTE */
  ]: 'Duplicate attribute.',
  [3
  /* END_TAG_WITH_ATTRIBUTES */
  ]: 'End tag cannot have attributes.',
  [4
  /* END_TAG_WITH_TRAILING_SOLIDUS */
  ]: "Illegal '/' in tags.",
  [5
  /* EOF_BEFORE_TAG_NAME */
  ]: 'Unexpected EOF in tag.',
  [6
  /* EOF_IN_CDATA */
  ]: 'Unexpected EOF in CDATA section.',
  [7
  /* EOF_IN_COMMENT */
  ]: 'Unexpected EOF in comment.',
  [8
  /* EOF_IN_SCRIPT_HTML_COMMENT_LIKE_TEXT */
  ]: 'Unexpected EOF in script.',
  [9
  /* EOF_IN_TAG */
  ]: 'Unexpected EOF in tag.',
  [10
  /* INCORRECTLY_CLOSED_COMMENT */
  ]: 'Incorrectly closed comment.',
  [11
  /* INCORRECTLY_OPENED_COMMENT */
  ]: 'Incorrectly opened comment.',
  [12
  /* INVALID_FIRST_CHARACTER_OF_TAG_NAME */
  ]: "Illegal tag name. Use '&lt;' to print '<'.",
  [13
  /* MISSING_ATTRIBUTE_VALUE */
  ]: 'Attribute value was expected.',
  [14
  /* MISSING_END_TAG_NAME */
  ]: 'End tag name was expected.',
  [15
  /* MISSING_WHITESPACE_BETWEEN_ATTRIBUTES */
  ]: 'Whitespace was expected.',
  [16
  /* NESTED_COMMENT */
  ]: "Unexpected '<!--' in comment.",
  [17
  /* UNEXPECTED_CHARACTER_IN_ATTRIBUTE_NAME */
  ]: 'Attribute name cannot contain U+0022 ("), U+0027 (\'), and U+003C (<).',
  [18
  /* UNEXPECTED_CHARACTER_IN_UNQUOTED_ATTRIBUTE_VALUE */
  ]: 'Unquoted attribute value cannot contain U+0022 ("), U+0027 (\'), U+003C (<), U+003D (=), and U+0060 (`).',
  [19
  /* UNEXPECTED_EQUALS_SIGN_BEFORE_ATTRIBUTE_NAME */
  ]: "Attribute name cannot start with '='.",
  [21
  /* UNEXPECTED_QUESTION_MARK_INSTEAD_OF_TAG_NAME */
  ]: "'<?' is allowed only in XML context.",
  [20
  /* UNEXPECTED_NULL_CHARACTER */
  ]: `Unexpected null character.`,
  [22
  /* UNEXPECTED_SOLIDUS_IN_TAG */
  ]: "Illegal '/' in tags.",
  // Vue-specific parse errors
  [23
  /* X_INVALID_END_TAG */
  ]: 'Invalid end tag.',
  [24
  /* X_MISSING_END_TAG */
  ]: 'Element is missing end tag.',
  [25
  /* X_MISSING_INTERPOLATION_END */
  ]: 'Interpolation end sign was not found.',
  [27
  /* X_MISSING_DYNAMIC_DIRECTIVE_ARGUMENT_END */
  ]: 'End bracket for dynamic directive argument was not found. ' + 'Note that dynamic directive argument cannot contain spaces.',
  [26
  /* X_MISSING_DIRECTIVE_NAME */
  ]: 'Legal directive name was expected.',
  // transform errors
  [28
  /* X_V_IF_NO_EXPRESSION */
  ]: `v-if/v-else-if is missing expression.`,
  [29
  /* X_V_IF_SAME_KEY */
  ]: `v-if/else branches must use unique keys.`,
  [30
  /* X_V_ELSE_NO_ADJACENT_IF */
  ]: `v-else/v-else-if has no adjacent v-if or v-else-if.`,
  [31
  /* X_V_FOR_NO_EXPRESSION */
  ]: `v-for is missing expression.`,
  [32
  /* X_V_FOR_MALFORMED_EXPRESSION */
  ]: `v-for has invalid expression.`,
  [33
  /* X_V_FOR_TEMPLATE_KEY_PLACEMENT */
  ]: `<template v-for> key should be placed on the <template> tag.`,
  [34
  /* X_V_BIND_NO_EXPRESSION */
  ]: `v-bind is missing expression.`,
  [35
  /* X_V_ON_NO_EXPRESSION */
  ]: `v-on is missing expression.`,
  [36
  /* X_V_SLOT_UNEXPECTED_DIRECTIVE_ON_SLOT_OUTLET */
  ]: `Unexpected custom directive on <slot> outlet.`,
  [37
  /* X_V_SLOT_MIXED_SLOT_USAGE */
  ]: `Mixed v-slot usage on both the component and nested <template>.` + `When there are multiple named slots, all slots should use <template> ` + `syntax to avoid scope ambiguity.`,
  [38
  /* X_V_SLOT_DUPLICATE_SLOT_NAMES */
  ]: `Duplicate slot names found. `,
  [39
  /* X_V_SLOT_EXTRANEOUS_DEFAULT_SLOT_CHILDREN */
  ]: `Extraneous children found when component already has explicitly named ` + `default slot. These children will be ignored.`,
  [40
  /* X_V_SLOT_MISPLACED */
  ]: `v-slot can only be used on components or <template> tags.`,
  [41
  /* X_V_MODEL_NO_EXPRESSION */
  ]: `v-model is missing expression.`,
  [42
  /* X_V_MODEL_MALFORMED_EXPRESSION */
  ]: `v-model value must be a valid JavaScript member expression.`,
  [43
  /* X_V_MODEL_ON_SCOPE_VARIABLE */
  ]: `v-model cannot be used on v-for or v-slot scope variables because they are not writable.`,
  [44
  /* X_INVALID_EXPRESSION */
  ]: `Error parsing JavaScript expression: `,
  [45
  /* X_KEEP_ALIVE_INVALID_CHILDREN */
  ]: `<KeepAlive> expects exactly one child component.`,
  // generic errors
  [46
  /* X_PREFIX_ID_NOT_SUPPORTED */
  ]: `"prefixIdentifiers" option is not supported in this build of compiler.`,
  [47
  /* X_MODULE_MODE_NOT_SUPPORTED */
  ]: `ES module mode is not supported in this build of compiler.`,
  [48
  /* X_CACHE_HANDLER_NOT_SUPPORTED */
  ]: `"cacheHandlers" option is only supported when the "prefixIdentifiers" option is enabled.`,
  [49
  /* X_SCOPE_ID_NOT_SUPPORTED */
  ]: `"scopeId" option is only supported in module mode.`,
  // just to fulfill types
  [50
  /* __EXTEND_POINT__ */
  ]: ``
};
const FRAGMENT = Symbol( false ? 0 : ``);
const TELEPORT = Symbol( false ? 0 : ``);
const SUSPENSE = Symbol( false ? 0 : ``);
const KEEP_ALIVE = Symbol( false ? 0 : ``);
const BASE_TRANSITION = Symbol( false ? 0 : ``);
const OPEN_BLOCK = Symbol( false ? 0 : ``);
const CREATE_BLOCK = Symbol( false ? 0 : ``);
const CREATE_ELEMENT_BLOCK = Symbol( false ? 0 : ``);
const CREATE_VNODE = Symbol( false ? 0 : ``);
const CREATE_ELEMENT_VNODE = Symbol( false ? 0 : ``);
const CREATE_COMMENT = Symbol( false ? 0 : ``);
const CREATE_TEXT = Symbol( false ? 0 : ``);
const CREATE_STATIC = Symbol( false ? 0 : ``);
const RESOLVE_COMPONENT = Symbol( false ? 0 : ``);
const RESOLVE_DYNAMIC_COMPONENT = Symbol( false ? 0 : ``);
const RESOLVE_DIRECTIVE = Symbol( false ? 0 : ``);
const RESOLVE_FILTER = Symbol( false ? 0 : ``);
const WITH_DIRECTIVES = Symbol( false ? 0 : ``);
const RENDER_LIST = Symbol( false ? 0 : ``);
const RENDER_SLOT = Symbol( false ? 0 : ``);
const CREATE_SLOTS = Symbol( false ? 0 : ``);
const TO_DISPLAY_STRING = Symbol( false ? 0 : ``);
const MERGE_PROPS = Symbol( false ? 0 : ``);
const NORMALIZE_CLASS = Symbol( false ? 0 : ``);
const NORMALIZE_STYLE = Symbol( false ? 0 : ``);
const NORMALIZE_PROPS = Symbol( false ? 0 : ``);
const GUARD_REACTIVE_PROPS = Symbol( false ? 0 : ``);
const TO_HANDLERS = Symbol( false ? 0 : ``);
const CAMELIZE = Symbol( false ? 0 : ``);
const CAPITALIZE = Symbol( false ? 0 : ``);
const TO_HANDLER_KEY = Symbol( false ? 0 : ``);
const SET_BLOCK_TRACKING = Symbol( false ? 0 : ``);
const PUSH_SCOPE_ID = Symbol( false ? 0 : ``);
const POP_SCOPE_ID = Symbol( false ? 0 : ``);
const WITH_CTX = Symbol( false ? 0 : ``);
const UNREF = Symbol( false ? 0 : ``);
const IS_REF = Symbol( false ? 0 : ``);
const WITH_MEMO = Symbol( false ? 0 : ``);
const IS_MEMO_SAME = Symbol( false ? 0 : ``); // Name mapping for runtime helpers that need to be imported from 'vue' in
// generated code. Make sure these are correctly exported in the runtime!
// Using `any` here because TS doesn't allow symbols as index type.

const helperNameMap = {
  [FRAGMENT]: `Fragment`,
  [TELEPORT]: `Teleport`,
  [SUSPENSE]: `Suspense`,
  [KEEP_ALIVE]: `KeepAlive`,
  [BASE_TRANSITION]: `BaseTransition`,
  [OPEN_BLOCK]: `openBlock`,
  [CREATE_BLOCK]: `createBlock`,
  [CREATE_ELEMENT_BLOCK]: `createElementBlock`,
  [CREATE_VNODE]: `createVNode`,
  [CREATE_ELEMENT_VNODE]: `createElementVNode`,
  [CREATE_COMMENT]: `createCommentVNode`,
  [CREATE_TEXT]: `createTextVNode`,
  [CREATE_STATIC]: `createStaticVNode`,
  [RESOLVE_COMPONENT]: `resolveComponent`,
  [RESOLVE_DYNAMIC_COMPONENT]: `resolveDynamicComponent`,
  [RESOLVE_DIRECTIVE]: `resolveDirective`,
  [RESOLVE_FILTER]: `resolveFilter`,
  [WITH_DIRECTIVES]: `withDirectives`,
  [RENDER_LIST]: `renderList`,
  [RENDER_SLOT]: `renderSlot`,
  [CREATE_SLOTS]: `createSlots`,
  [TO_DISPLAY_STRING]: `toDisplayString`,
  [MERGE_PROPS]: `mergeProps`,
  [NORMALIZE_CLASS]: `normalizeClass`,
  [NORMALIZE_STYLE]: `normalizeStyle`,
  [NORMALIZE_PROPS]: `normalizeProps`,
  [GUARD_REACTIVE_PROPS]: `guardReactiveProps`,
  [TO_HANDLERS]: `toHandlers`,
  [CAMELIZE]: `camelize`,
  [CAPITALIZE]: `capitalize`,
  [TO_HANDLER_KEY]: `toHandlerKey`,
  [SET_BLOCK_TRACKING]: `setBlockTracking`,
  [PUSH_SCOPE_ID]: `pushScopeId`,
  [POP_SCOPE_ID]: `popScopeId`,
  [WITH_CTX]: `withCtx`,
  [UNREF]: `unref`,
  [IS_REF]: `isRef`,
  [WITH_MEMO]: `withMemo`,
  [IS_MEMO_SAME]: `isMemoSame`
};

function registerRuntimeHelpers(helpers) {
  Object.getOwnPropertySymbols(helpers).forEach(s => {
    helperNameMap[s] = helpers[s];
  });
} // AST Utilities ---------------------------------------------------------------
// Some expressions, e.g. sequence and conditional expressions, are never
// associated with template nodes, so their source locations are just a stub.
// Container types like CompoundExpression also don't need a real location.


const locStub = {
  source: '',
  start: {
    line: 1,
    column: 1,
    offset: 0
  },
  end: {
    line: 1,
    column: 1,
    offset: 0
  }
};

function createRoot(children, loc = locStub) {
  return {
    type: 0
    /* ROOT */
    ,
    children,
    helpers: [],
    components: [],
    directives: [],
    hoists: [],
    imports: [],
    cached: 0,
    temps: 0,
    codegenNode: undefined,
    loc
  };
}

function createVNodeCall(context, tag, props, children, patchFlag, dynamicProps, directives, isBlock = false, disableTracking = false, isComponent = false, loc = locStub) {
  if (context) {
    if (isBlock) {
      context.helper(OPEN_BLOCK);
      context.helper(getVNodeBlockHelper(context.inSSR, isComponent));
    } else {
      context.helper(getVNodeHelper(context.inSSR, isComponent));
    }

    if (directives) {
      context.helper(WITH_DIRECTIVES);
    }
  }

  return {
    type: 13
    /* VNODE_CALL */
    ,
    tag,
    props,
    children,
    patchFlag,
    dynamicProps,
    directives,
    isBlock,
    disableTracking,
    isComponent,
    loc
  };
}

function createArrayExpression(elements, loc = locStub) {
  return {
    type: 17
    /* JS_ARRAY_EXPRESSION */
    ,
    loc,
    elements
  };
}

function createObjectExpression(properties, loc = locStub) {
  return {
    type: 15
    /* JS_OBJECT_EXPRESSION */
    ,
    loc,
    properties
  };
}

function createObjectProperty(key, value) {
  return {
    type: 16
    /* JS_PROPERTY */
    ,
    loc: locStub,
    key: shared_esm_bundler_isString(key) ? createSimpleExpression(key, true) : key,
    value
  };
}

function createSimpleExpression(content, isStatic = false, loc = locStub, constType = 0
/* NOT_CONSTANT */
) {
  return {
    type: 4
    /* SIMPLE_EXPRESSION */
    ,
    loc,
    content,
    isStatic,
    constType: isStatic ? 3
    /* CAN_STRINGIFY */
    : constType
  };
}

function createInterpolation(content, loc) {
  return {
    type: 5
    /* INTERPOLATION */
    ,
    loc,
    content: isString(content) ? createSimpleExpression(content, false, loc) : content
  };
}

function createCompoundExpression(children, loc = locStub) {
  return {
    type: 8
    /* COMPOUND_EXPRESSION */
    ,
    loc,
    children
  };
}

function createCallExpression(callee, args = [], loc = locStub) {
  return {
    type: 14
    /* JS_CALL_EXPRESSION */
    ,
    loc,
    callee,
    arguments: args
  };
}

function createFunctionExpression(params, returns = undefined, newline = false, isSlot = false, loc = locStub) {
  return {
    type: 18
    /* JS_FUNCTION_EXPRESSION */
    ,
    params,
    returns,
    newline,
    isSlot,
    loc
  };
}

function createConditionalExpression(test, consequent, alternate, newline = true) {
  return {
    type: 19
    /* JS_CONDITIONAL_EXPRESSION */
    ,
    test,
    consequent,
    alternate,
    newline,
    loc: locStub
  };
}

function createCacheExpression(index, value, isVNode = false) {
  return {
    type: 20
    /* JS_CACHE_EXPRESSION */
    ,
    index,
    value,
    isVNode,
    loc: locStub
  };
}

function createBlockStatement(body) {
  return {
    type: 21
    /* JS_BLOCK_STATEMENT */
    ,
    body,
    loc: locStub
  };
}

function createTemplateLiteral(elements) {
  return {
    type: 22
    /* JS_TEMPLATE_LITERAL */
    ,
    elements,
    loc: locStub
  };
}

function createIfStatement(test, consequent, alternate) {
  return {
    type: 23
    /* JS_IF_STATEMENT */
    ,
    test,
    consequent,
    alternate,
    loc: locStub
  };
}

function createAssignmentExpression(left, right) {
  return {
    type: 24
    /* JS_ASSIGNMENT_EXPRESSION */
    ,
    left,
    right,
    loc: locStub
  };
}

function createSequenceExpression(expressions) {
  return {
    type: 25
    /* JS_SEQUENCE_EXPRESSION */
    ,
    expressions,
    loc: locStub
  };
}

function createReturnStatement(returns) {
  return {
    type: 26
    /* JS_RETURN_STATEMENT */
    ,
    returns,
    loc: locStub
  };
}

const isStaticExp = p => p.type === 4
/* SIMPLE_EXPRESSION */
&& p.isStatic;

const isBuiltInType = (tag, expected) => tag === expected || tag === shared_esm_bundler_hyphenate(expected);

function isCoreComponent(tag) {
  if (isBuiltInType(tag, 'Teleport')) {
    return TELEPORT;
  } else if (isBuiltInType(tag, 'Suspense')) {
    return SUSPENSE;
  } else if (isBuiltInType(tag, 'KeepAlive')) {
    return KEEP_ALIVE;
  } else if (isBuiltInType(tag, 'BaseTransition')) {
    return BASE_TRANSITION;
  }
}

const nonIdentifierRE = /^\d|[^\$\w]/;

const isSimpleIdentifier = name => !nonIdentifierRE.test(name);

const validFirstIdentCharRE = /[A-Za-z_$\xA0-\uFFFF]/;
const validIdentCharRE = /[\.\?\w$\xA0-\uFFFF]/;
const whitespaceRE = /\s+[.[]\s*|\s*[.[]\s+/g;
/**
 * Simple lexer to check if an expression is a member expression. This is
 * lax and only checks validity at the root level (i.e. does not validate exps
 * inside square brackets), but it's ok since these are only used on template
 * expressions and false positives are invalid expressions in the first place.
 */

const isMemberExpressionBrowser = path => {
  // remove whitespaces around . or [ first
  path = path.trim().replace(whitespaceRE, s => s.trim());
  let state = 0
  /* inMemberExp */
  ;
  let stateStack = [];
  let currentOpenBracketCount = 0;
  let currentOpenParensCount = 0;
  let currentStringType = null;

  for (let i = 0; i < path.length; i++) {
    const char = path.charAt(i);

    switch (state) {
      case 0
      /* inMemberExp */
      :
        if (char === '[') {
          stateStack.push(state);
          state = 1
          /* inBrackets */
          ;
          currentOpenBracketCount++;
        } else if (char === '(') {
          stateStack.push(state);
          state = 2
          /* inParens */
          ;
          currentOpenParensCount++;
        } else if (!(i === 0 ? validFirstIdentCharRE : validIdentCharRE).test(char)) {
          return false;
        }

        break;

      case 1
      /* inBrackets */
      :
        if (char === `'` || char === `"` || char === '`') {
          stateStack.push(state);
          state = 3
          /* inString */
          ;
          currentStringType = char;
        } else if (char === `[`) {
          currentOpenBracketCount++;
        } else if (char === `]`) {
          if (! --currentOpenBracketCount) {
            state = stateStack.pop();
          }
        }

        break;

      case 2
      /* inParens */
      :
        if (char === `'` || char === `"` || char === '`') {
          stateStack.push(state);
          state = 3
          /* inString */
          ;
          currentStringType = char;
        } else if (char === `(`) {
          currentOpenParensCount++;
        } else if (char === `)`) {
          // if the exp ends as a call then it should not be considered valid
          if (i === path.length - 1) {
            return false;
          }

          if (! --currentOpenParensCount) {
            state = stateStack.pop();
          }
        }

        break;

      case 3
      /* inString */
      :
        if (char === currentStringType) {
          state = stateStack.pop();
          currentStringType = null;
        }

        break;
    }
  }

  return !currentOpenBracketCount && !currentOpenParensCount;
};

const isMemberExpressionNode = (/* unused pure expression or super */ null && (NOOP));
const isMemberExpression = isMemberExpressionBrowser;

function getInnerRange(loc, offset, length) {
  const source = loc.source.slice(offset, offset + length);
  const newLoc = {
    source,
    start: advancePositionWithClone(loc.start, loc.source, offset),
    end: loc.end
  };

  if (length != null) {
    newLoc.end = advancePositionWithClone(loc.start, loc.source, offset + length);
  }

  return newLoc;
}

function advancePositionWithClone(pos, source, numberOfCharacters = source.length) {
  return advancePositionWithMutation(shared_esm_bundler_extend({}, pos), source, numberOfCharacters);
} // advance by mutation without cloning (for performance reasons), since this
// gets called a lot in the parser


function advancePositionWithMutation(pos, source, numberOfCharacters = source.length) {
  let linesCount = 0;
  let lastNewLinePos = -1;

  for (let i = 0; i < numberOfCharacters; i++) {
    if (source.charCodeAt(i) === 10
    /* newline char code */
    ) {
      linesCount++;
      lastNewLinePos = i;
    }
  }

  pos.offset += numberOfCharacters;
  pos.line += linesCount;
  pos.column = lastNewLinePos === -1 ? pos.column + numberOfCharacters : numberOfCharacters - lastNewLinePos;
  return pos;
}

function assert(condition, msg) {
  /* istanbul ignore if */
  if (!condition) {
    throw new Error(msg || `unexpected compiler condition`);
  }
}

function findDir(node, name, allowEmpty = false) {
  for (let i = 0; i < node.props.length; i++) {
    const p = node.props[i];

    if (p.type === 7
    /* DIRECTIVE */
    && (allowEmpty || p.exp) && (shared_esm_bundler_isString(name) ? p.name === name : name.test(p.name))) {
      return p;
    }
  }
}

function findProp(node, name, dynamicOnly = false, allowEmpty = false) {
  for (let i = 0; i < node.props.length; i++) {
    const p = node.props[i];

    if (p.type === 6
    /* ATTRIBUTE */
    ) {
      if (dynamicOnly) continue;

      if (p.name === name && (p.value || allowEmpty)) {
        return p;
      }
    } else if (p.name === 'bind' && (p.exp || allowEmpty) && isStaticArgOf(p.arg, name)) {
      return p;
    }
  }
}

function isStaticArgOf(arg, name) {
  return !!(arg && isStaticExp(arg) && arg.content === name);
}

function hasDynamicKeyVBind(node) {
  return node.props.some(p => p.type === 7
  /* DIRECTIVE */
  && p.name === 'bind' && (!p.arg || // v-bind="obj"
  p.arg.type !== 4
  /* SIMPLE_EXPRESSION */
  || // v-bind:[_ctx.foo]
  !p.arg.isStatic) // v-bind:[foo]
  );
}

function isText(node) {
  return node.type === 5
  /* INTERPOLATION */
  || node.type === 2
  /* TEXT */
  ;
}

function isVSlot(p) {
  return p.type === 7
  /* DIRECTIVE */
  && p.name === 'slot';
}

function isTemplateNode(node) {
  return node.type === 1
  /* ELEMENT */
  && node.tagType === 3
  /* TEMPLATE */
  ;
}

function isSlotOutlet(node) {
  return node.type === 1
  /* ELEMENT */
  && node.tagType === 2
  /* SLOT */
  ;
}

function getVNodeHelper(ssr, isComponent) {
  return ssr || isComponent ? CREATE_VNODE : CREATE_ELEMENT_VNODE;
}

function getVNodeBlockHelper(ssr, isComponent) {
  return ssr || isComponent ? CREATE_BLOCK : CREATE_ELEMENT_BLOCK;
}

const propsHelperSet = new Set([NORMALIZE_PROPS, GUARD_REACTIVE_PROPS]);

function getUnnormalizedProps(props, callPath = []) {
  if (props && !shared_esm_bundler_isString(props) && props.type === 14
  /* JS_CALL_EXPRESSION */
  ) {
    const callee = props.callee;

    if (!shared_esm_bundler_isString(callee) && propsHelperSet.has(callee)) {
      return getUnnormalizedProps(props.arguments[0], callPath.concat(props));
    }
  }

  return [props, callPath];
}

function injectProp(node, prop, context) {
  let propsWithInjection;
  /**
   * 1. mergeProps(...)
   * 2. toHandlers(...)
   * 3. normalizeProps(...)
   * 4. normalizeProps(guardReactiveProps(...))
   *
   * we need to get the real props before normalization
   */

  let props = node.type === 13
  /* VNODE_CALL */
  ? node.props : node.arguments[2];
  let callPath = [];
  let parentCall;

  if (props && !shared_esm_bundler_isString(props) && props.type === 14
  /* JS_CALL_EXPRESSION */
  ) {
    const ret = getUnnormalizedProps(props);
    props = ret[0];
    callPath = ret[1];
    parentCall = callPath[callPath.length - 1];
  }

  if (props == null || shared_esm_bundler_isString(props)) {
    propsWithInjection = createObjectExpression([prop]);
  } else if (props.type === 14
  /* JS_CALL_EXPRESSION */
  ) {
    // merged props... add ours
    // only inject key to object literal if it's the first argument so that
    // if doesn't override user provided keys
    const first = props.arguments[0];

    if (!shared_esm_bundler_isString(first) && first.type === 15
    /* JS_OBJECT_EXPRESSION */
    ) {
      first.properties.unshift(prop);
    } else {
      if (props.callee === TO_HANDLERS) {
        // #2366
        propsWithInjection = createCallExpression(context.helper(MERGE_PROPS), [createObjectExpression([prop]), props]);
      } else {
        props.arguments.unshift(createObjectExpression([prop]));
      }
    }

    !propsWithInjection && (propsWithInjection = props);
  } else if (props.type === 15
  /* JS_OBJECT_EXPRESSION */
  ) {
    let alreadyExists = false; // check existing key to avoid overriding user provided keys

    if (prop.key.type === 4
    /* SIMPLE_EXPRESSION */
    ) {
      const propKeyName = prop.key.content;
      alreadyExists = props.properties.some(p => p.key.type === 4
      /* SIMPLE_EXPRESSION */
      && p.key.content === propKeyName);
    }

    if (!alreadyExists) {
      props.properties.unshift(prop);
    }

    propsWithInjection = props;
  } else {
    // single v-bind with expression, return a merged replacement
    propsWithInjection = createCallExpression(context.helper(MERGE_PROPS), [createObjectExpression([prop]), props]); // in the case of nested helper call, e.g. `normalizeProps(guardReactiveProps(props))`,
    // it will be rewritten as `normalizeProps(mergeProps({ key: 0 }, props))`,
    // the `guardReactiveProps` will no longer be needed

    if (parentCall && parentCall.callee === GUARD_REACTIVE_PROPS) {
      parentCall = callPath[callPath.length - 2];
    }
  }

  if (node.type === 13
  /* VNODE_CALL */
  ) {
    if (parentCall) {
      parentCall.arguments[0] = propsWithInjection;
    } else {
      node.props = propsWithInjection;
    }
  } else {
    if (parentCall) {
      parentCall.arguments[0] = propsWithInjection;
    } else {
      node.arguments[2] = propsWithInjection;
    }
  }
}

function toValidAssetId(name, type) {
  // see issue#4422, we need adding identifier on validAssetId if variable `name` has specific character
  return `_${type}_${name.replace(/[^\w]/g, (searchValue, replaceValue) => {
    return searchValue === '-' ? '_' : name.charCodeAt(replaceValue).toString();
  })}`;
} // Check if a node contains expressions that reference current context scope ids


function hasScopeRef(node, ids) {
  if (!node || Object.keys(ids).length === 0) {
    return false;
  }

  switch (node.type) {
    case 1
    /* ELEMENT */
    :
      for (let i = 0; i < node.props.length; i++) {
        const p = node.props[i];

        if (p.type === 7
        /* DIRECTIVE */
        && (hasScopeRef(p.arg, ids) || hasScopeRef(p.exp, ids))) {
          return true;
        }
      }

      return node.children.some(c => hasScopeRef(c, ids));

    case 11
    /* FOR */
    :
      if (hasScopeRef(node.source, ids)) {
        return true;
      }

      return node.children.some(c => hasScopeRef(c, ids));

    case 9
    /* IF */
    :
      return node.branches.some(b => hasScopeRef(b, ids));

    case 10
    /* IF_BRANCH */
    :
      if (hasScopeRef(node.condition, ids)) {
        return true;
      }

      return node.children.some(c => hasScopeRef(c, ids));

    case 4
    /* SIMPLE_EXPRESSION */
    :
      return !node.isStatic && isSimpleIdentifier(node.content) && !!ids[node.content];

    case 8
    /* COMPOUND_EXPRESSION */
    :
      return node.children.some(c => isObject(c) && hasScopeRef(c, ids));

    case 5
    /* INTERPOLATION */
    :
    case 12
    /* TEXT_CALL */
    :
      return hasScopeRef(node.content, ids);

    case 2
    /* TEXT */
    :
    case 3
    /* COMMENT */
    :
      return false;

    default:
      if (false) {}
      return false;
  }
}

function getMemoedVNodeCall(node) {
  if (node.type === 14
  /* JS_CALL_EXPRESSION */
  && node.callee === WITH_MEMO) {
    return node.arguments[1].returns;
  } else {
    return node;
  }
}

function makeBlock(node, {
  helper,
  removeHelper,
  inSSR
}) {
  if (!node.isBlock) {
    node.isBlock = true;
    removeHelper(getVNodeHelper(inSSR, node.isComponent));
    helper(OPEN_BLOCK);
    helper(getVNodeBlockHelper(inSSR, node.isComponent));
  }
}

const deprecationData = {
  ["COMPILER_IS_ON_ELEMENT"
  /* COMPILER_IS_ON_ELEMENT */
  ]: {
    message: `Platform-native elements with "is" prop will no longer be ` + `treated as components in Vue 3 unless the "is" value is explicitly ` + `prefixed with "vue:".`,
    link: `https://v3-migration.vuejs.org/breaking-changes/custom-elements-interop.html`
  },
  ["COMPILER_V_BIND_SYNC"
  /* COMPILER_V_BIND_SYNC */
  ]: {
    message: key => `.sync modifier for v-bind has been removed. Use v-model with ` + `argument instead. \`v-bind:${key}.sync\` should be changed to ` + `\`v-model:${key}\`.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/v-model.html`
  },
  ["COMPILER_V_BIND_PROP"
  /* COMPILER_V_BIND_PROP */
  ]: {
    message: `.prop modifier for v-bind has been removed and no longer necessary. ` + `Vue 3 will automatically set a binding as DOM property when appropriate.`
  },
  ["COMPILER_V_BIND_OBJECT_ORDER"
  /* COMPILER_V_BIND_OBJECT_ORDER */
  ]: {
    message: `v-bind="obj" usage is now order sensitive and behaves like JavaScript ` + `object spread: it will now overwrite an existing non-mergeable attribute ` + `that appears before v-bind in the case of conflict. ` + `To retain 2.x behavior, move v-bind to make it the first attribute. ` + `You can also suppress this warning if the usage is intended.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/v-bind.html`
  },
  ["COMPILER_V_ON_NATIVE"
  /* COMPILER_V_ON_NATIVE */
  ]: {
    message: `.native modifier for v-on has been removed as is no longer necessary.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/v-on-native-modifier-removed.html`
  },
  ["COMPILER_V_IF_V_FOR_PRECEDENCE"
  /* COMPILER_V_IF_V_FOR_PRECEDENCE */
  ]: {
    message: `v-if / v-for precedence when used on the same element has changed ` + `in Vue 3: v-if now takes higher precedence and will no longer have ` + `access to v-for scope variables. It is best to avoid the ambiguity ` + `with <template> tags or use a computed property that filters v-for ` + `data source.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/v-if-v-for.html`
  },
  ["COMPILER_NATIVE_TEMPLATE"
  /* COMPILER_NATIVE_TEMPLATE */
  ]: {
    message: `<template> with no special directives will render as a native template ` + `element instead of its inner content in Vue 3.`
  },
  ["COMPILER_INLINE_TEMPLATE"
  /* COMPILER_INLINE_TEMPLATE */
  ]: {
    message: `"inline-template" has been removed in Vue 3.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/inline-template-attribute.html`
  },
  ["COMPILER_FILTER"
  /* COMPILER_FILTERS */
  ]: {
    message: `filters have been removed in Vue 3. ` + `The "|" symbol will be treated as native JavaScript bitwise OR operator. ` + `Use method calls or computed properties instead.`,
    link: `https://v3-migration.vuejs.org/breaking-changes/filters.html`
  }
};

function getCompatValue(key, context) {
  const config = context.options ? context.options.compatConfig : context.compatConfig;
  const value = config && config[key];

  if (key === 'MODE') {
    return value || 3; // compiler defaults to v3 behavior
  } else {
    return value;
  }
}

function isCompatEnabled(key, context) {
  const mode = getCompatValue('MODE', context);
  const value = getCompatValue(key, context); // in v3 mode, only enable if explicitly set to true
  // otherwise enable for any non-false value

  return mode === 3 ? value === true : value !== false;
}

function checkCompatEnabled(key, context, loc, ...args) {
  const enabled = isCompatEnabled(key, context);

  if (false) {}

  return enabled;
}

function warnDeprecation(key, context, loc, ...args) {
  const val = getCompatValue(key, context);

  if (val === 'suppress-warning') {
    return;
  }

  const {
    message,
    link
  } = deprecationData[key];
  const msg = `(deprecation ${key}) ${typeof message === 'function' ? message(...args) : message}${link ? `\n  Details: ${link}` : ``}`;
  const err = new SyntaxError(msg);
  err.code = key;
  if (loc) err.loc = loc;
  context.onWarn(err);
} // The default decoder only provides escapes for characters reserved as part of
// the template syntax, and is only used if the custom renderer did not provide
// a platform-specific decoder.


const decodeRE = /&(gt|lt|amp|apos|quot);/g;
const decodeMap = {
  gt: '>',
  lt: '<',
  amp: '&',
  apos: "'",
  quot: '"'
};
const defaultParserOptions = {
  delimiters: [`{{`, `}}`],
  getNamespace: () => 0
  /* HTML */
  ,
  getTextMode: () => 0
  /* DATA */
  ,
  isVoidTag: shared_esm_bundler_NO,
  isPreTag: shared_esm_bundler_NO,
  isCustomElement: shared_esm_bundler_NO,
  decodeEntities: rawText => rawText.replace(decodeRE, (_, p1) => decodeMap[p1]),
  onError: defaultOnError,
  onWarn: defaultOnWarn,
  comments: "production" !== 'production'
};

function compiler_core_esm_bundler_baseParse(content, options = {}) {
  const context = createParserContext(content, options);
  const start = getCursor(context);
  return createRoot(parseChildren(context, 0
  /* DATA */
  , []), getSelection(context, start));
}

function createParserContext(content, rawOptions) {
  const options = shared_esm_bundler_extend({}, defaultParserOptions);
  let key;

  for (key in rawOptions) {
    // @ts-ignore
    options[key] = rawOptions[key] === undefined ? defaultParserOptions[key] : rawOptions[key];
  }

  return {
    options,
    column: 1,
    line: 1,
    offset: 0,
    originalSource: content,
    source: content,
    inPre: false,
    inVPre: false,
    onWarn: options.onWarn
  };
}

function parseChildren(context, mode, ancestors) {
  const parent = last(ancestors);
  const ns = parent ? parent.ns : 0
  /* HTML */
  ;
  const nodes = [];

  while (!isEnd(context, mode, ancestors)) {
    const s = context.source;
    let node = undefined;

    if (mode === 0
    /* DATA */
    || mode === 1
    /* RCDATA */
    ) {
      if (!context.inVPre && startsWith(s, context.options.delimiters[0])) {
        // '{{'
        node = parseInterpolation(context, mode);
      } else if (mode === 0
      /* DATA */
      && s[0] === '<') {
        // https://html.spec.whatwg.org/multipage/parsing.html#tag-open-state
        if (s.length === 1) {
          emitError(context, 5
          /* EOF_BEFORE_TAG_NAME */
          , 1);
        } else if (s[1] === '!') {
          // https://html.spec.whatwg.org/multipage/parsing.html#markup-declaration-open-state
          if (startsWith(s, '<!--')) {
            node = parseComment(context);
          } else if (startsWith(s, '<!DOCTYPE')) {
            // Ignore DOCTYPE by a limitation.
            node = parseBogusComment(context);
          } else if (startsWith(s, '<![CDATA[')) {
            if (ns !== 0
            /* HTML */
            ) {
              node = parseCDATA(context, ancestors);
            } else {
              emitError(context, 1
              /* CDATA_IN_HTML_CONTENT */
              );
              node = parseBogusComment(context);
            }
          } else {
            emitError(context, 11
            /* INCORRECTLY_OPENED_COMMENT */
            );
            node = parseBogusComment(context);
          }
        } else if (s[1] === '/') {
          // https://html.spec.whatwg.org/multipage/parsing.html#end-tag-open-state
          if (s.length === 2) {
            emitError(context, 5
            /* EOF_BEFORE_TAG_NAME */
            , 2);
          } else if (s[2] === '>') {
            emitError(context, 14
            /* MISSING_END_TAG_NAME */
            , 2);
            advanceBy(context, 3);
            continue;
          } else if (/[a-z]/i.test(s[2])) {
            emitError(context, 23
            /* X_INVALID_END_TAG */
            );
            parseTag(context, 1
            /* End */
            , parent);
            continue;
          } else {
            emitError(context, 12
            /* INVALID_FIRST_CHARACTER_OF_TAG_NAME */
            , 2);
            node = parseBogusComment(context);
          }
        } else if (/[a-z]/i.test(s[1])) {
          node = parseElement(context, ancestors); // 2.x <template> with no directive compat

          if (isCompatEnabled("COMPILER_NATIVE_TEMPLATE"
          /* COMPILER_NATIVE_TEMPLATE */
          , context) && node && node.tag === 'template' && !node.props.some(p => p.type === 7
          /* DIRECTIVE */
          && isSpecialTemplateDirective(p.name))) {
             false && 0;
            node = node.children;
          }
        } else if (s[1] === '?') {
          emitError(context, 21
          /* UNEXPECTED_QUESTION_MARK_INSTEAD_OF_TAG_NAME */
          , 1);
          node = parseBogusComment(context);
        } else {
          emitError(context, 12
          /* INVALID_FIRST_CHARACTER_OF_TAG_NAME */
          , 1);
        }
      }
    }

    if (!node) {
      node = parseText(context, mode);
    }

    if (shared_esm_bundler_isArray(node)) {
      for (let i = 0; i < node.length; i++) {
        pushNode(nodes, node[i]);
      }
    } else {
      pushNode(nodes, node);
    }
  } // Whitespace handling strategy like v2


  let removedWhitespace = false;

  if (mode !== 2
  /* RAWTEXT */
  && mode !== 1
  /* RCDATA */
  ) {
    const shouldCondense = context.options.whitespace !== 'preserve';

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      if (!context.inPre && node.type === 2
      /* TEXT */
      ) {
        if (!/[^\t\r\n\f ]/.test(node.content)) {
          const prev = nodes[i - 1];
          const next = nodes[i + 1]; // Remove if:
          // - the whitespace is the first or last node, or:
          // - (condense mode) the whitespace is adjacent to a comment, or:
          // - (condense mode) the whitespace is between two elements AND contains newline

          if (!prev || !next || shouldCondense && (prev.type === 3
          /* COMMENT */
          || next.type === 3
          /* COMMENT */
          || prev.type === 1
          /* ELEMENT */
          && next.type === 1
          /* ELEMENT */
          && /[\r\n]/.test(node.content))) {
            removedWhitespace = true;
            nodes[i] = null;
          } else {
            // Otherwise, the whitespace is condensed into a single space
            node.content = ' ';
          }
        } else if (shouldCondense) {
          // in condense mode, consecutive whitespaces in text are condensed
          // down to a single space.
          node.content = node.content.replace(/[\t\r\n\f ]+/g, ' ');
        }
      } // Remove comment nodes if desired by configuration.
      else if (node.type === 3
      /* COMMENT */
      && !context.options.comments) {
        removedWhitespace = true;
        nodes[i] = null;
      }
    }

    if (context.inPre && parent && context.options.isPreTag(parent.tag)) {
      // remove leading newline per html spec
      // https://html.spec.whatwg.org/multipage/grouping-content.html#the-pre-element
      const first = nodes[0];

      if (first && first.type === 2
      /* TEXT */
      ) {
        first.content = first.content.replace(/^\r?\n/, '');
      }
    }
  }

  return removedWhitespace ? nodes.filter(Boolean) : nodes;
}

function pushNode(nodes, node) {
  if (node.type === 2
  /* TEXT */
  ) {
    const prev = last(nodes); // Merge if both this and the previous node are text and those are
    // consecutive. This happens for cases like "a < b".

    if (prev && prev.type === 2
    /* TEXT */
    && prev.loc.end.offset === node.loc.start.offset) {
      prev.content += node.content;
      prev.loc.end = node.loc.end;
      prev.loc.source += node.loc.source;
      return;
    }
  }

  nodes.push(node);
}

function parseCDATA(context, ancestors) {
  advanceBy(context, 9);
  const nodes = parseChildren(context, 3
  /* CDATA */
  , ancestors);

  if (context.source.length === 0) {
    emitError(context, 6
    /* EOF_IN_CDATA */
    );
  } else {
    advanceBy(context, 3);
  }

  return nodes;
}

function parseComment(context) {
  const start = getCursor(context);
  let content; // Regular comment.

  const match = /--(\!)?>/.exec(context.source);

  if (!match) {
    content = context.source.slice(4);
    advanceBy(context, context.source.length);
    emitError(context, 7
    /* EOF_IN_COMMENT */
    );
  } else {
    if (match.index <= 3) {
      emitError(context, 0
      /* ABRUPT_CLOSING_OF_EMPTY_COMMENT */
      );
    }

    if (match[1]) {
      emitError(context, 10
      /* INCORRECTLY_CLOSED_COMMENT */
      );
    }

    content = context.source.slice(4, match.index); // Advancing with reporting nested comments.

    const s = context.source.slice(0, match.index);
    let prevIndex = 1,
        nestedIndex = 0;

    while ((nestedIndex = s.indexOf('<!--', prevIndex)) !== -1) {
      advanceBy(context, nestedIndex - prevIndex + 1);

      if (nestedIndex + 4 < s.length) {
        emitError(context, 16
        /* NESTED_COMMENT */
        );
      }

      prevIndex = nestedIndex + 1;
    }

    advanceBy(context, match.index + match[0].length - prevIndex + 1);
  }

  return {
    type: 3
    /* COMMENT */
    ,
    content,
    loc: getSelection(context, start)
  };
}

function parseBogusComment(context) {
  const start = getCursor(context);
  const contentStart = context.source[1] === '?' ? 1 : 2;
  let content;
  const closeIndex = context.source.indexOf('>');

  if (closeIndex === -1) {
    content = context.source.slice(contentStart);
    advanceBy(context, context.source.length);
  } else {
    content = context.source.slice(contentStart, closeIndex);
    advanceBy(context, closeIndex + 1);
  }

  return {
    type: 3
    /* COMMENT */
    ,
    content,
    loc: getSelection(context, start)
  };
}

function parseElement(context, ancestors) {
  // Start tag.
  const wasInPre = context.inPre;
  const wasInVPre = context.inVPre;
  const parent = last(ancestors);
  const element = parseTag(context, 0
  /* Start */
  , parent);
  const isPreBoundary = context.inPre && !wasInPre;
  const isVPreBoundary = context.inVPre && !wasInVPre;

  if (element.isSelfClosing || context.options.isVoidTag(element.tag)) {
    // #4030 self-closing <pre> tag
    if (isPreBoundary) {
      context.inPre = false;
    }

    if (isVPreBoundary) {
      context.inVPre = false;
    }

    return element;
  } // Children.


  ancestors.push(element);
  const mode = context.options.getTextMode(element, parent);
  const children = parseChildren(context, mode, ancestors);
  ancestors.pop(); // 2.x inline-template compat

  {
    const inlineTemplateProp = element.props.find(p => p.type === 6
    /* ATTRIBUTE */
    && p.name === 'inline-template');

    if (inlineTemplateProp && checkCompatEnabled("COMPILER_INLINE_TEMPLATE"
    /* COMPILER_INLINE_TEMPLATE */
    , context, inlineTemplateProp.loc)) {
      const loc = getSelection(context, element.loc.end);
      inlineTemplateProp.value = {
        type: 2
        /* TEXT */
        ,
        content: loc.source,
        loc
      };
    }
  }
  element.children = children; // End tag.

  if (startsWithEndTagOpen(context.source, element.tag)) {
    parseTag(context, 1
    /* End */
    , parent);
  } else {
    emitError(context, 24
    /* X_MISSING_END_TAG */
    , 0, element.loc.start);

    if (context.source.length === 0 && element.tag.toLowerCase() === 'script') {
      const first = children[0];

      if (first && startsWith(first.loc.source, '<!--')) {
        emitError(context, 8
        /* EOF_IN_SCRIPT_HTML_COMMENT_LIKE_TEXT */
        );
      }
    }
  }

  element.loc = getSelection(context, element.loc.start);

  if (isPreBoundary) {
    context.inPre = false;
  }

  if (isVPreBoundary) {
    context.inVPre = false;
  }

  return element;
}

const isSpecialTemplateDirective = /*#__PURE__*/shared_esm_bundler_makeMap(`if,else,else-if,for,slot`);

function parseTag(context, type, parent) {
  // Tag open.
  const start = getCursor(context);
  const match = /^<\/?([a-z][^\t\r\n\f />]*)/i.exec(context.source);
  const tag = match[1];
  const ns = context.options.getNamespace(tag, parent);
  advanceBy(context, match[0].length);
  advanceSpaces(context); // save current state in case we need to re-parse attributes with v-pre

  const cursor = getCursor(context);
  const currentSource = context.source; // check <pre> tag

  if (context.options.isPreTag(tag)) {
    context.inPre = true;
  } // Attributes.


  let props = parseAttributes(context, type); // check v-pre

  if (type === 0
  /* Start */
  && !context.inVPre && props.some(p => p.type === 7
  /* DIRECTIVE */
  && p.name === 'pre')) {
    context.inVPre = true; // reset context

    shared_esm_bundler_extend(context, cursor);
    context.source = currentSource; // re-parse attrs and filter out v-pre itself

    props = parseAttributes(context, type).filter(p => p.name !== 'v-pre');
  } // Tag close.


  let isSelfClosing = false;

  if (context.source.length === 0) {
    emitError(context, 9
    /* EOF_IN_TAG */
    );
  } else {
    isSelfClosing = startsWith(context.source, '/>');

    if (type === 1
    /* End */
    && isSelfClosing) {
      emitError(context, 4
      /* END_TAG_WITH_TRAILING_SOLIDUS */
      );
    }

    advanceBy(context, isSelfClosing ? 2 : 1);
  }

  if (type === 1
  /* End */
  ) {
    return;
  } // 2.x deprecation checks


  if (false) {}

  let tagType = 0
  /* ELEMENT */
  ;

  if (!context.inVPre) {
    if (tag === 'slot') {
      tagType = 2
      /* SLOT */
      ;
    } else if (tag === 'template') {
      if (props.some(p => p.type === 7
      /* DIRECTIVE */
      && isSpecialTemplateDirective(p.name))) {
        tagType = 3
        /* TEMPLATE */
        ;
      }
    } else if (isComponent(tag, props, context)) {
      tagType = 1
      /* COMPONENT */
      ;
    }
  }

  return {
    type: 1
    /* ELEMENT */
    ,
    ns,
    tag,
    tagType,
    props,
    isSelfClosing,
    children: [],
    loc: getSelection(context, start),
    codegenNode: undefined // to be created during transform phase

  };
}

function isComponent(tag, props, context) {
  const options = context.options;

  if (options.isCustomElement(tag)) {
    return false;
  }

  if (tag === 'component' || /^[A-Z]/.test(tag) || isCoreComponent(tag) || options.isBuiltInComponent && options.isBuiltInComponent(tag) || options.isNativeTag && !options.isNativeTag(tag)) {
    return true;
  } // at this point the tag should be a native tag, but check for potential "is"
  // casting


  for (let i = 0; i < props.length; i++) {
    const p = props[i];

    if (p.type === 6
    /* ATTRIBUTE */
    ) {
      if (p.name === 'is' && p.value) {
        if (p.value.content.startsWith('vue:')) {
          return true;
        } else if (checkCompatEnabled("COMPILER_IS_ON_ELEMENT"
        /* COMPILER_IS_ON_ELEMENT */
        , context, p.loc)) {
          return true;
        }
      }
    } else {
      // directive
      // v-is (TODO Deprecate)
      if (p.name === 'is') {
        return true;
      } else if ( // :is on plain element - only treat as component in compat mode
      p.name === 'bind' && isStaticArgOf(p.arg, 'is') && true && checkCompatEnabled("COMPILER_IS_ON_ELEMENT"
      /* COMPILER_IS_ON_ELEMENT */
      , context, p.loc)) {
        return true;
      }
    }
  }
}

function parseAttributes(context, type) {
  const props = [];
  const attributeNames = new Set();

  while (context.source.length > 0 && !startsWith(context.source, '>') && !startsWith(context.source, '/>')) {
    if (startsWith(context.source, '/')) {
      emitError(context, 22
      /* UNEXPECTED_SOLIDUS_IN_TAG */
      );
      advanceBy(context, 1);
      advanceSpaces(context);
      continue;
    }

    if (type === 1
    /* End */
    ) {
      emitError(context, 3
      /* END_TAG_WITH_ATTRIBUTES */
      );
    }

    const attr = parseAttribute(context, attributeNames); // Trim whitespace between class
    // https://github.com/vuejs/core/issues/4251

    if (attr.type === 6
    /* ATTRIBUTE */
    && attr.value && attr.name === 'class') {
      attr.value.content = attr.value.content.replace(/\s+/g, ' ').trim();
    }

    if (type === 0
    /* Start */
    ) {
      props.push(attr);
    }

    if (/^[^\t\r\n\f />]/.test(context.source)) {
      emitError(context, 15
      /* MISSING_WHITESPACE_BETWEEN_ATTRIBUTES */
      );
    }

    advanceSpaces(context);
  }

  return props;
}

function parseAttribute(context, nameSet) {
  // Name.
  const start = getCursor(context);
  const match = /^[^\t\r\n\f />][^\t\r\n\f />=]*/.exec(context.source);
  const name = match[0];

  if (nameSet.has(name)) {
    emitError(context, 2
    /* DUPLICATE_ATTRIBUTE */
    );
  }

  nameSet.add(name);

  if (name[0] === '=') {
    emitError(context, 19
    /* UNEXPECTED_EQUALS_SIGN_BEFORE_ATTRIBUTE_NAME */
    );
  }

  {
    const pattern = /["'<]/g;
    let m;

    while (m = pattern.exec(name)) {
      emitError(context, 17
      /* UNEXPECTED_CHARACTER_IN_ATTRIBUTE_NAME */
      , m.index);
    }
  }
  advanceBy(context, name.length); // Value

  let value = undefined;

  if (/^[\t\r\n\f ]*=/.test(context.source)) {
    advanceSpaces(context);
    advanceBy(context, 1);
    advanceSpaces(context);
    value = parseAttributeValue(context);

    if (!value) {
      emitError(context, 13
      /* MISSING_ATTRIBUTE_VALUE */
      );
    }
  }

  const loc = getSelection(context, start);

  if (!context.inVPre && /^(v-[A-Za-z0-9-]|:|\.|@|#)/.test(name)) {
    const match = /(?:^v-([a-z0-9-]+))?(?:(?::|^\.|^@|^#)(\[[^\]]+\]|[^\.]+))?(.+)?$/i.exec(name);
    let isPropShorthand = startsWith(name, '.');
    let dirName = match[1] || (isPropShorthand || startsWith(name, ':') ? 'bind' : startsWith(name, '@') ? 'on' : 'slot');
    let arg;

    if (match[2]) {
      const isSlot = dirName === 'slot';
      const startOffset = name.lastIndexOf(match[2]);
      const loc = getSelection(context, getNewPosition(context, start, startOffset), getNewPosition(context, start, startOffset + match[2].length + (isSlot && match[3] || '').length));
      let content = match[2];
      let isStatic = true;

      if (content.startsWith('[')) {
        isStatic = false;

        if (!content.endsWith(']')) {
          emitError(context, 27
          /* X_MISSING_DYNAMIC_DIRECTIVE_ARGUMENT_END */
          );
          content = content.slice(1);
        } else {
          content = content.slice(1, content.length - 1);
        }
      } else if (isSlot) {
        // #1241 special case for v-slot: vuetify relies extensively on slot
        // names containing dots. v-slot doesn't have any modifiers and Vue 2.x
        // supports such usage so we are keeping it consistent with 2.x.
        content += match[3] || '';
      }

      arg = {
        type: 4
        /* SIMPLE_EXPRESSION */
        ,
        content,
        isStatic,
        constType: isStatic ? 3
        /* CAN_STRINGIFY */
        : 0
        /* NOT_CONSTANT */
        ,
        loc
      };
    }

    if (value && value.isQuoted) {
      const valueLoc = value.loc;
      valueLoc.start.offset++;
      valueLoc.start.column++;
      valueLoc.end = advancePositionWithClone(valueLoc.start, value.content);
      valueLoc.source = valueLoc.source.slice(1, -1);
    }

    const modifiers = match[3] ? match[3].slice(1).split('.') : [];
    if (isPropShorthand) modifiers.push('prop'); // 2.x compat v-bind:foo.sync -> v-model:foo

    if (dirName === 'bind' && arg) {
      if (modifiers.includes('sync') && checkCompatEnabled("COMPILER_V_BIND_SYNC"
      /* COMPILER_V_BIND_SYNC */
      , context, loc, arg.loc.source)) {
        dirName = 'model';
        modifiers.splice(modifiers.indexOf('sync'), 1);
      }

      if (false) {}
    }

    return {
      type: 7
      /* DIRECTIVE */
      ,
      name: dirName,
      exp: value && {
        type: 4
        /* SIMPLE_EXPRESSION */
        ,
        content: value.content,
        isStatic: false,
        // Treat as non-constant by default. This can be potentially set to
        // other values by `transformExpression` to make it eligible for hoisting.
        constType: 0
        /* NOT_CONSTANT */
        ,
        loc: value.loc
      },
      arg,
      modifiers,
      loc
    };
  } // missing directive name or illegal directive name


  if (!context.inVPre && startsWith(name, 'v-')) {
    emitError(context, 26
    /* X_MISSING_DIRECTIVE_NAME */
    );
  }

  return {
    type: 6
    /* ATTRIBUTE */
    ,
    name,
    value: value && {
      type: 2
      /* TEXT */
      ,
      content: value.content,
      loc: value.loc
    },
    loc
  };
}

function parseAttributeValue(context) {
  const start = getCursor(context);
  let content;
  const quote = context.source[0];
  const isQuoted = quote === `"` || quote === `'`;

  if (isQuoted) {
    // Quoted value.
    advanceBy(context, 1);
    const endIndex = context.source.indexOf(quote);

    if (endIndex === -1) {
      content = parseTextData(context, context.source.length, 4
      /* ATTRIBUTE_VALUE */
      );
    } else {
      content = parseTextData(context, endIndex, 4
      /* ATTRIBUTE_VALUE */
      );
      advanceBy(context, 1);
    }
  } else {
    // Unquoted
    const match = /^[^\t\r\n\f >]+/.exec(context.source);

    if (!match) {
      return undefined;
    }

    const unexpectedChars = /["'<=`]/g;
    let m;

    while (m = unexpectedChars.exec(match[0])) {
      emitError(context, 18
      /* UNEXPECTED_CHARACTER_IN_UNQUOTED_ATTRIBUTE_VALUE */
      , m.index);
    }

    content = parseTextData(context, match[0].length, 4
    /* ATTRIBUTE_VALUE */
    );
  }

  return {
    content,
    isQuoted,
    loc: getSelection(context, start)
  };
}

function parseInterpolation(context, mode) {
  const [open, close] = context.options.delimiters;
  const closeIndex = context.source.indexOf(close, open.length);

  if (closeIndex === -1) {
    emitError(context, 25
    /* X_MISSING_INTERPOLATION_END */
    );
    return undefined;
  }

  const start = getCursor(context);
  advanceBy(context, open.length);
  const innerStart = getCursor(context);
  const innerEnd = getCursor(context);
  const rawContentLength = closeIndex - open.length;
  const rawContent = context.source.slice(0, rawContentLength);
  const preTrimContent = parseTextData(context, rawContentLength, mode);
  const content = preTrimContent.trim();
  const startOffset = preTrimContent.indexOf(content);

  if (startOffset > 0) {
    advancePositionWithMutation(innerStart, rawContent, startOffset);
  }

  const endOffset = rawContentLength - (preTrimContent.length - content.length - startOffset);
  advancePositionWithMutation(innerEnd, rawContent, endOffset);
  advanceBy(context, close.length);
  return {
    type: 5
    /* INTERPOLATION */
    ,
    content: {
      type: 4
      /* SIMPLE_EXPRESSION */
      ,
      isStatic: false,
      // Set `isConstant` to false by default and will decide in transformExpression
      constType: 0
      /* NOT_CONSTANT */
      ,
      content,
      loc: getSelection(context, innerStart, innerEnd)
    },
    loc: getSelection(context, start)
  };
}

function parseText(context, mode) {
  const endTokens = mode === 3
  /* CDATA */
  ? [']]>'] : ['<', context.options.delimiters[0]];
  let endIndex = context.source.length;

  for (let i = 0; i < endTokens.length; i++) {
    const index = context.source.indexOf(endTokens[i], 1);

    if (index !== -1 && endIndex > index) {
      endIndex = index;
    }
  }

  const start = getCursor(context);
  const content = parseTextData(context, endIndex, mode);
  return {
    type: 2
    /* TEXT */
    ,
    content,
    loc: getSelection(context, start)
  };
}
/**
 * Get text data with a given length from the current location.
 * This translates HTML entities in the text data.
 */


function parseTextData(context, length, mode) {
  const rawText = context.source.slice(0, length);
  advanceBy(context, length);

  if (mode === 2
  /* RAWTEXT */
  || mode === 3
  /* CDATA */
  || !rawText.includes('&')) {
    return rawText;
  } else {
    // DATA or RCDATA containing "&"". Entity decoding required.
    return context.options.decodeEntities(rawText, mode === 4
    /* ATTRIBUTE_VALUE */
    );
  }
}

function getCursor(context) {
  const {
    column,
    line,
    offset
  } = context;
  return {
    column,
    line,
    offset
  };
}

function getSelection(context, start, end) {
  end = end || getCursor(context);
  return {
    start,
    end,
    source: context.originalSource.slice(start.offset, end.offset)
  };
}

function last(xs) {
  return xs[xs.length - 1];
}

function startsWith(source, searchString) {
  return source.startsWith(searchString);
}

function advanceBy(context, numberOfCharacters) {
  const {
    source
  } = context;
  advancePositionWithMutation(context, source, numberOfCharacters);
  context.source = source.slice(numberOfCharacters);
}

function advanceSpaces(context) {
  const match = /^[\t\r\n\f ]+/.exec(context.source);

  if (match) {
    advanceBy(context, match[0].length);
  }
}

function getNewPosition(context, start, numberOfCharacters) {
  return advancePositionWithClone(start, context.originalSource.slice(start.offset, numberOfCharacters), numberOfCharacters);
}

function emitError(context, code, offset, loc = getCursor(context)) {
  if (offset) {
    loc.offset += offset;
    loc.column += offset;
  }

  context.options.onError(createCompilerError(code, {
    start: loc,
    end: loc,
    source: ''
  }));
}

function isEnd(context, mode, ancestors) {
  const s = context.source;

  switch (mode) {
    case 0
    /* DATA */
    :
      if (startsWith(s, '</')) {
        // TODO: probably bad performance
        for (let i = ancestors.length - 1; i >= 0; --i) {
          if (startsWithEndTagOpen(s, ancestors[i].tag)) {
            return true;
          }
        }
      }

      break;

    case 1
    /* RCDATA */
    :
    case 2
    /* RAWTEXT */
    :
      {
        const parent = last(ancestors);

        if (parent && startsWithEndTagOpen(s, parent.tag)) {
          return true;
        }

        break;
      }

    case 3
    /* CDATA */
    :
      if (startsWith(s, ']]>')) {
        return true;
      }

      break;
  }

  return !s;
}

function startsWithEndTagOpen(source, tag) {
  return startsWith(source, '</') && source.slice(2, 2 + tag.length).toLowerCase() === tag.toLowerCase() && /[\t\r\n\f />]/.test(source[2 + tag.length] || '>');
}

function hoistStatic(root, context) {
  walk(root, context, // Root node is unfortunately non-hoistable due to potential parent
  // fallthrough attributes.
  isSingleElementRoot(root, root.children[0]));
}

function isSingleElementRoot(root, child) {
  const {
    children
  } = root;
  return children.length === 1 && child.type === 1
  /* ELEMENT */
  && !isSlotOutlet(child);
}

function walk(node, context, doNotHoistNode = false) {
  const {
    children
  } = node;
  const originalCount = children.length;
  let hoistedCount = 0;

  for (let i = 0; i < children.length; i++) {
    const child = children[i]; // only plain elements & text calls are eligible for hoisting.

    if (child.type === 1
    /* ELEMENT */
    && child.tagType === 0
    /* ELEMENT */
    ) {
      const constantType = doNotHoistNode ? 0
      /* NOT_CONSTANT */
      : getConstantType(child, context);

      if (constantType > 0
      /* NOT_CONSTANT */
      ) {
        if (constantType >= 2
        /* CAN_HOIST */
        ) {
          child.codegenNode.patchFlag = -1
          /* HOISTED */
          + ( false ? 0 : ``);
          child.codegenNode = context.hoist(child.codegenNode);
          hoistedCount++;
          continue;
        }
      } else {
        // node may contain dynamic children, but its props may be eligible for
        // hoisting.
        const codegenNode = child.codegenNode;

        if (codegenNode.type === 13
        /* VNODE_CALL */
        ) {
          const flag = getPatchFlag(codegenNode);

          if ((!flag || flag === 512
          /* NEED_PATCH */
          || flag === 1
          /* TEXT */
          ) && getGeneratedPropsConstantType(child, context) >= 2
          /* CAN_HOIST */
          ) {
            const props = getNodeProps(child);

            if (props) {
              codegenNode.props = context.hoist(props);
            }
          }

          if (codegenNode.dynamicProps) {
            codegenNode.dynamicProps = context.hoist(codegenNode.dynamicProps);
          }
        }
      }
    } else if (child.type === 12
    /* TEXT_CALL */
    && getConstantType(child.content, context) >= 2
    /* CAN_HOIST */
    ) {
      child.codegenNode = context.hoist(child.codegenNode);
      hoistedCount++;
    } // walk further


    if (child.type === 1
    /* ELEMENT */
    ) {
      const isComponent = child.tagType === 1
      /* COMPONENT */
      ;

      if (isComponent) {
        context.scopes.vSlot++;
      }

      walk(child, context);

      if (isComponent) {
        context.scopes.vSlot--;
      }
    } else if (child.type === 11
    /* FOR */
    ) {
      // Do not hoist v-for single child because it has to be a block
      walk(child, context, child.children.length === 1);
    } else if (child.type === 9
    /* IF */
    ) {
      for (let i = 0; i < child.branches.length; i++) {
        // Do not hoist v-if single child because it has to be a block
        walk(child.branches[i], context, child.branches[i].children.length === 1);
      }
    }
  }

  if (hoistedCount && context.transformHoist) {
    context.transformHoist(children, context, node);
  } // all children were hoisted - the entire children array is hoistable.


  if (hoistedCount && hoistedCount === originalCount && node.type === 1
  /* ELEMENT */
  && node.tagType === 0
  /* ELEMENT */
  && node.codegenNode && node.codegenNode.type === 13
  /* VNODE_CALL */
  && shared_esm_bundler_isArray(node.codegenNode.children)) {
    node.codegenNode.children = context.hoist(createArrayExpression(node.codegenNode.children));
  }
}

function getConstantType(node, context) {
  const {
    constantCache
  } = context;

  switch (node.type) {
    case 1
    /* ELEMENT */
    :
      if (node.tagType !== 0
      /* ELEMENT */
      ) {
        return 0
        /* NOT_CONSTANT */
        ;
      }

      const cached = constantCache.get(node);

      if (cached !== undefined) {
        return cached;
      }

      const codegenNode = node.codegenNode;

      if (codegenNode.type !== 13
      /* VNODE_CALL */
      ) {
        return 0
        /* NOT_CONSTANT */
        ;
      }

      if (codegenNode.isBlock && node.tag !== 'svg' && node.tag !== 'foreignObject') {
        return 0
        /* NOT_CONSTANT */
        ;
      }

      const flag = getPatchFlag(codegenNode);

      if (!flag) {
        let returnType = 3
        /* CAN_STRINGIFY */
        ; // Element itself has no patch flag. However we still need to check:
        // 1. Even for a node with no patch flag, it is possible for it to contain
        // non-hoistable expressions that refers to scope variables, e.g. compiler
        // injected keys or cached event handlers. Therefore we need to always
        // check the codegenNode's props to be sure.

        const generatedPropsType = getGeneratedPropsConstantType(node, context);

        if (generatedPropsType === 0
        /* NOT_CONSTANT */
        ) {
          constantCache.set(node, 0
          /* NOT_CONSTANT */
          );
          return 0
          /* NOT_CONSTANT */
          ;
        }

        if (generatedPropsType < returnType) {
          returnType = generatedPropsType;
        } // 2. its children.


        for (let i = 0; i < node.children.length; i++) {
          const childType = getConstantType(node.children[i], context);

          if (childType === 0
          /* NOT_CONSTANT */
          ) {
            constantCache.set(node, 0
            /* NOT_CONSTANT */
            );
            return 0
            /* NOT_CONSTANT */
            ;
          }

          if (childType < returnType) {
            returnType = childType;
          }
        } // 3. if the type is not already CAN_SKIP_PATCH which is the lowest non-0
        // type, check if any of the props can cause the type to be lowered
        // we can skip can_patch because it's guaranteed by the absence of a
        // patchFlag.


        if (returnType > 1
        /* CAN_SKIP_PATCH */
        ) {
          for (let i = 0; i < node.props.length; i++) {
            const p = node.props[i];

            if (p.type === 7
            /* DIRECTIVE */
            && p.name === 'bind' && p.exp) {
              const expType = getConstantType(p.exp, context);

              if (expType === 0
              /* NOT_CONSTANT */
              ) {
                constantCache.set(node, 0
                /* NOT_CONSTANT */
                );
                return 0
                /* NOT_CONSTANT */
                ;
              }

              if (expType < returnType) {
                returnType = expType;
              }
            }
          }
        } // only svg/foreignObject could be block here, however if they are
        // static then they don't need to be blocks since there will be no
        // nested updates.


        if (codegenNode.isBlock) {
          // except set custom directives.
          for (let i = 0; i < node.props.length; i++) {
            const p = node.props[i];

            if (p.type === 7
            /* DIRECTIVE */
            ) {
              constantCache.set(node, 0
              /* NOT_CONSTANT */
              );
              return 0
              /* NOT_CONSTANT */
              ;
            }
          }

          context.removeHelper(OPEN_BLOCK);
          context.removeHelper(getVNodeBlockHelper(context.inSSR, codegenNode.isComponent));
          codegenNode.isBlock = false;
          context.helper(getVNodeHelper(context.inSSR, codegenNode.isComponent));
        }

        constantCache.set(node, returnType);
        return returnType;
      } else {
        constantCache.set(node, 0
        /* NOT_CONSTANT */
        );
        return 0
        /* NOT_CONSTANT */
        ;
      }

    case 2
    /* TEXT */
    :
    case 3
    /* COMMENT */
    :
      return 3
      /* CAN_STRINGIFY */
      ;

    case 9
    /* IF */
    :
    case 11
    /* FOR */
    :
    case 10
    /* IF_BRANCH */
    :
      return 0
      /* NOT_CONSTANT */
      ;

    case 5
    /* INTERPOLATION */
    :
    case 12
    /* TEXT_CALL */
    :
      return getConstantType(node.content, context);

    case 4
    /* SIMPLE_EXPRESSION */
    :
      return node.constType;

    case 8
    /* COMPOUND_EXPRESSION */
    :
      let returnType = 3
      /* CAN_STRINGIFY */
      ;

      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];

        if (shared_esm_bundler_isString(child) || isSymbol(child)) {
          continue;
        }

        const childType = getConstantType(child, context);

        if (childType === 0
        /* NOT_CONSTANT */
        ) {
          return 0
          /* NOT_CONSTANT */
          ;
        } else if (childType < returnType) {
          returnType = childType;
        }
      }

      return returnType;

    default:
      if (false) {}
      return 0
      /* NOT_CONSTANT */
      ;
  }
}

const allowHoistedHelperSet = new Set([NORMALIZE_CLASS, NORMALIZE_STYLE, NORMALIZE_PROPS, GUARD_REACTIVE_PROPS]);

function getConstantTypeOfHelperCall(value, context) {
  if (value.type === 14
  /* JS_CALL_EXPRESSION */
  && !shared_esm_bundler_isString(value.callee) && allowHoistedHelperSet.has(value.callee)) {
    const arg = value.arguments[0];

    if (arg.type === 4
    /* SIMPLE_EXPRESSION */
    ) {
      return getConstantType(arg, context);
    } else if (arg.type === 14
    /* JS_CALL_EXPRESSION */
    ) {
      // in the case of nested helper call, e.g. `normalizeProps(guardReactiveProps(exp))`
      return getConstantTypeOfHelperCall(arg, context);
    }
  }

  return 0
  /* NOT_CONSTANT */
  ;
}

function getGeneratedPropsConstantType(node, context) {
  let returnType = 3
  /* CAN_STRINGIFY */
  ;
  const props = getNodeProps(node);

  if (props && props.type === 15
  /* JS_OBJECT_EXPRESSION */
  ) {
    const {
      properties
    } = props;

    for (let i = 0; i < properties.length; i++) {
      const {
        key,
        value
      } = properties[i];
      const keyType = getConstantType(key, context);

      if (keyType === 0
      /* NOT_CONSTANT */
      ) {
        return keyType;
      }

      if (keyType < returnType) {
        returnType = keyType;
      }

      let valueType;

      if (value.type === 4
      /* SIMPLE_EXPRESSION */
      ) {
        valueType = getConstantType(value, context);
      } else if (value.type === 14
      /* JS_CALL_EXPRESSION */
      ) {
        // some helper calls can be hoisted,
        // such as the `normalizeProps` generated by the compiler for pre-normalize class,
        // in this case we need to respect the ConstantType of the helper's arguments
        valueType = getConstantTypeOfHelperCall(value, context);
      } else {
        valueType = 0
        /* NOT_CONSTANT */
        ;
      }

      if (valueType === 0
      /* NOT_CONSTANT */
      ) {
        return valueType;
      }

      if (valueType < returnType) {
        returnType = valueType;
      }
    }
  }

  return returnType;
}

function getNodeProps(node) {
  const codegenNode = node.codegenNode;

  if (codegenNode.type === 13
  /* VNODE_CALL */
  ) {
    return codegenNode.props;
  }
}

function getPatchFlag(node) {
  const flag = node.patchFlag;
  return flag ? parseInt(flag, 10) : undefined;
}

function createTransformContext(root, {
  filename = '',
  prefixIdentifiers = false,
  hoistStatic = false,
  cacheHandlers = false,
  nodeTransforms = [],
  directiveTransforms = {},
  transformHoist = null,
  isBuiltInComponent = shared_esm_bundler_NOOP,
  isCustomElement = shared_esm_bundler_NOOP,
  expressionPlugins = [],
  scopeId = null,
  slotted = true,
  ssr = false,
  inSSR = false,
  ssrCssVars = ``,
  bindingMetadata = EMPTY_OBJ,
  inline = false,
  isTS = false,
  onError = defaultOnError,
  onWarn = defaultOnWarn,
  compatConfig
}) {
  const nameMatch = filename.replace(/\?.*$/, '').match(/([^/\\]+)\.\w+$/);
  const context = {
    // options
    selfName: nameMatch && shared_esm_bundler_capitalize(shared_esm_bundler_camelize(nameMatch[1])),
    prefixIdentifiers,
    hoistStatic,
    cacheHandlers,
    nodeTransforms,
    directiveTransforms,
    transformHoist,
    isBuiltInComponent,
    isCustomElement,
    expressionPlugins,
    scopeId,
    slotted,
    ssr,
    inSSR,
    ssrCssVars,
    bindingMetadata,
    inline,
    isTS,
    onError,
    onWarn,
    compatConfig,
    // state
    root,
    helpers: new Map(),
    components: new Set(),
    directives: new Set(),
    hoists: [],
    imports: [],
    constantCache: new Map(),
    temps: 0,
    cached: 0,
    identifiers: Object.create(null),
    scopes: {
      vFor: 0,
      vSlot: 0,
      vPre: 0,
      vOnce: 0
    },
    parent: null,
    currentNode: root,
    childIndex: 0,
    inVOnce: false,

    // methods
    helper(name) {
      const count = context.helpers.get(name) || 0;
      context.helpers.set(name, count + 1);
      return name;
    },

    removeHelper(name) {
      const count = context.helpers.get(name);

      if (count) {
        const currentCount = count - 1;

        if (!currentCount) {
          context.helpers.delete(name);
        } else {
          context.helpers.set(name, currentCount);
        }
      }
    },

    helperString(name) {
      return `_${helperNameMap[context.helper(name)]}`;
    },

    replaceNode(node) {
      /* istanbul ignore if */
      if (false) {}

      context.parent.children[context.childIndex] = context.currentNode = node;
    },

    removeNode(node) {
      if (false) {}

      const list = context.parent.children;
      const removalIndex = node ? list.indexOf(node) : context.currentNode ? context.childIndex : -1;
      /* istanbul ignore if */

      if (false) {}

      if (!node || node === context.currentNode) {
        // current node removed
        context.currentNode = null;
        context.onNodeRemoved();
      } else {
        // sibling node removed
        if (context.childIndex > removalIndex) {
          context.childIndex--;
          context.onNodeRemoved();
        }
      }

      context.parent.children.splice(removalIndex, 1);
    },

    onNodeRemoved: () => {},

    addIdentifiers(exp) {},

    removeIdentifiers(exp) {},

    hoist(exp) {
      if (shared_esm_bundler_isString(exp)) exp = createSimpleExpression(exp);
      context.hoists.push(exp);
      const identifier = createSimpleExpression(`_hoisted_${context.hoists.length}`, false, exp.loc, 2
      /* CAN_HOIST */
      );
      identifier.hoisted = exp;
      return identifier;
    },

    cache(exp, isVNode = false) {
      return createCacheExpression(context.cached++, exp, isVNode);
    }

  };
  {
    context.filters = new Set();
  }
  return context;
}

function transform(root, options) {
  const context = createTransformContext(root, options);
  traverseNode(root, context);

  if (options.hoistStatic) {
    hoistStatic(root, context);
  }

  if (!options.ssr) {
    createRootCodegen(root, context);
  } // finalize meta information


  root.helpers = [...context.helpers.keys()];
  root.components = [...context.components];
  root.directives = [...context.directives];
  root.imports = context.imports;
  root.hoists = context.hoists;
  root.temps = context.temps;
  root.cached = context.cached;
  {
    root.filters = [...context.filters];
  }
}

function createRootCodegen(root, context) {
  const {
    helper
  } = context;
  const {
    children
  } = root;

  if (children.length === 1) {
    const child = children[0]; // if the single child is an element, turn it into a block.

    if (isSingleElementRoot(root, child) && child.codegenNode) {
      // single element root is never hoisted so codegenNode will never be
      // SimpleExpressionNode
      const codegenNode = child.codegenNode;

      if (codegenNode.type === 13
      /* VNODE_CALL */
      ) {
        makeBlock(codegenNode, context);
      }

      root.codegenNode = codegenNode;
    } else {
      // - single <slot/>, IfNode, ForNode: already blocks.
      // - single text node: always patched.
      // root codegen falls through via genNode()
      root.codegenNode = child;
    }
  } else if (children.length > 1) {
    // root has multiple nodes - return a fragment block.
    let patchFlag = 64
    /* STABLE_FRAGMENT */
    ;
    let patchFlagText = PatchFlagNames[64]; // check if the fragment actually contains a single valid child with
    // the rest being comments

    if (false) {}

    root.codegenNode = createVNodeCall(context, helper(FRAGMENT), undefined, root.children, patchFlag + ( false ? 0 : ``), undefined, undefined, true, undefined, false
    /* isComponent */
    );
  } else ;
}

function traverseChildren(parent, context) {
  let i = 0;

  const nodeRemoved = () => {
    i--;
  };

  for (; i < parent.children.length; i++) {
    const child = parent.children[i];
    if (shared_esm_bundler_isString(child)) continue;
    context.parent = parent;
    context.childIndex = i;
    context.onNodeRemoved = nodeRemoved;
    traverseNode(child, context);
  }
}

function traverseNode(node, context) {
  context.currentNode = node; // apply transform plugins

  const {
    nodeTransforms
  } = context;
  const exitFns = [];

  for (let i = 0; i < nodeTransforms.length; i++) {
    const onExit = nodeTransforms[i](node, context);

    if (onExit) {
      if (shared_esm_bundler_isArray(onExit)) {
        exitFns.push(...onExit);
      } else {
        exitFns.push(onExit);
      }
    }

    if (!context.currentNode) {
      // node was removed
      return;
    } else {
      // node may have been replaced
      node = context.currentNode;
    }
  }

  switch (node.type) {
    case 3
    /* COMMENT */
    :
      if (!context.ssr) {
        // inject import for the Comment symbol, which is needed for creating
        // comment nodes with `createVNode`
        context.helper(CREATE_COMMENT);
      }

      break;

    case 5
    /* INTERPOLATION */
    :
      // no need to traverse, but we need to inject toString helper
      if (!context.ssr) {
        context.helper(TO_DISPLAY_STRING);
      }

      break;
    // for container types, further traverse downwards

    case 9
    /* IF */
    :
      for (let i = 0; i < node.branches.length; i++) {
        traverseNode(node.branches[i], context);
      }

      break;

    case 10
    /* IF_BRANCH */
    :
    case 11
    /* FOR */
    :
    case 1
    /* ELEMENT */
    :
    case 0
    /* ROOT */
    :
      traverseChildren(node, context);
      break;
  } // exit transforms


  context.currentNode = node;
  let i = exitFns.length;

  while (i--) {
    exitFns[i]();
  }
}

function createStructuralDirectiveTransform(name, fn) {
  const matches = shared_esm_bundler_isString(name) ? n => n === name : n => name.test(n);
  return (node, context) => {
    if (node.type === 1
    /* ELEMENT */
    ) {
      const {
        props
      } = node; // structural directive transforms are not concerned with slots
      // as they are handled separately in vSlot.ts

      if (node.tagType === 3
      /* TEMPLATE */
      && props.some(isVSlot)) {
        return;
      }

      const exitFns = [];

      for (let i = 0; i < props.length; i++) {
        const prop = props[i];

        if (prop.type === 7
        /* DIRECTIVE */
        && matches(prop.name)) {
          // structural directives are removed to avoid infinite recursion
          // also we remove them *before* applying so that it can further
          // traverse itself in case it moves the node around
          props.splice(i, 1);
          i--;
          const onExit = fn(node, prop, context);
          if (onExit) exitFns.push(onExit);
        }
      }

      return exitFns;
    }
  };
}

const PURE_ANNOTATION = `/*#__PURE__*/`;

const aliasHelper = s => `${helperNameMap[s]}: _${helperNameMap[s]}`;

function createCodegenContext(ast, {
  mode = 'function',
  prefixIdentifiers = mode === 'module',
  sourceMap = false,
  filename = `template.vue.html`,
  scopeId = null,
  optimizeImports = false,
  runtimeGlobalName = `Vue`,
  runtimeModuleName = `vue`,
  ssrRuntimeModuleName = 'vue/server-renderer',
  ssr = false,
  isTS = false,
  inSSR = false
}) {
  const context = {
    mode,
    prefixIdentifiers,
    sourceMap,
    filename,
    scopeId,
    optimizeImports,
    runtimeGlobalName,
    runtimeModuleName,
    ssrRuntimeModuleName,
    ssr,
    isTS,
    inSSR,
    source: ast.loc.source,
    code: ``,
    column: 1,
    line: 1,
    offset: 0,
    indentLevel: 0,
    pure: false,
    map: undefined,

    helper(key) {
      return `_${helperNameMap[key]}`;
    },

    push(code, node) {
      context.code += code;
    },

    indent() {
      newline(++context.indentLevel);
    },

    deindent(withoutNewLine = false) {
      if (withoutNewLine) {
        --context.indentLevel;
      } else {
        newline(--context.indentLevel);
      }
    },

    newline() {
      newline(context.indentLevel);
    }

  };

  function newline(n) {
    context.push('\n' + `  `.repeat(n));
  }

  return context;
}

function generate(ast, options = {}) {
  const context = createCodegenContext(ast, options);
  if (options.onContextCreated) options.onContextCreated(context);
  const {
    mode,
    push,
    prefixIdentifiers,
    indent,
    deindent,
    newline,
    scopeId,
    ssr
  } = context;
  const hasHelpers = ast.helpers.length > 0;
  const useWithBlock = !prefixIdentifiers && mode !== 'module'; // preambles
  // in setup() inline mode, the preamble is generated in a sub context
  // and returned separately.

  const preambleContext = context;
  {
    genFunctionPreamble(ast, preambleContext);
  } // enter render function

  const functionName = ssr ? `ssrRender` : `render`;
  const args = ssr ? ['_ctx', '_push', '_parent', '_attrs'] : ['_ctx', '_cache'];
  const signature = args.join(', ');
  {
    push(`function ${functionName}(${signature}) {`);
  }
  indent();

  if (useWithBlock) {
    push(`with (_ctx) {`);
    indent(); // function mode const declarations should be inside with block
    // also they should be renamed to avoid collision with user properties

    if (hasHelpers) {
      push(`const { ${ast.helpers.map(aliasHelper).join(', ')} } = _Vue`);
      push(`\n`);
      newline();
    }
  } // generate asset resolution statements


  if (ast.components.length) {
    genAssets(ast.components, 'component', context);

    if (ast.directives.length || ast.temps > 0) {
      newline();
    }
  }

  if (ast.directives.length) {
    genAssets(ast.directives, 'directive', context);

    if (ast.temps > 0) {
      newline();
    }
  }

  if (ast.filters && ast.filters.length) {
    newline();
    genAssets(ast.filters, 'filter', context);
    newline();
  }

  if (ast.temps > 0) {
    push(`let `);

    for (let i = 0; i < ast.temps; i++) {
      push(`${i > 0 ? `, ` : ``}_temp${i}`);
    }
  }

  if (ast.components.length || ast.directives.length || ast.temps) {
    push(`\n`);
    newline();
  } // generate the VNode tree expression


  if (!ssr) {
    push(`return `);
  }

  if (ast.codegenNode) {
    genNode(ast.codegenNode, context);
  } else {
    push(`null`);
  }

  if (useWithBlock) {
    deindent();
    push(`}`);
  }

  deindent();
  push(`}`);
  return {
    ast,
    code: context.code,
    preamble: ``,
    // SourceMapGenerator does have toJSON() method but it's not in the types
    map: context.map ? context.map.toJSON() : undefined
  };
}

function genFunctionPreamble(ast, context) {
  const {
    ssr,
    prefixIdentifiers,
    push,
    newline,
    runtimeModuleName,
    runtimeGlobalName,
    ssrRuntimeModuleName
  } = context;
  const VueBinding = runtimeGlobalName; // Generate const declaration for helpers
  // In prefix mode, we place the const declaration at top so it's done
  // only once; But if we not prefixing, we place the declaration inside the
  // with block so it doesn't incur the `in` check cost for every helper access.

  if (ast.helpers.length > 0) {
    {
      // "with" mode.
      // save Vue in a separate variable to avoid collision
      push(`const _Vue = ${VueBinding}\n`); // in "with" mode, helpers are declared inside the with block to avoid
      // has check cost, but hoists are lifted out of the function - we need
      // to provide the helper here.

      if (ast.hoists.length) {
        const staticHelpers = [CREATE_VNODE, CREATE_ELEMENT_VNODE, CREATE_COMMENT, CREATE_TEXT, CREATE_STATIC].filter(helper => ast.helpers.includes(helper)).map(aliasHelper).join(', ');
        push(`const { ${staticHelpers} } = _Vue\n`);
      }
    }
  }

  genHoists(ast.hoists, context);
  newline();
  push(`return `);
}

function genAssets(assets, type, {
  helper,
  push,
  newline,
  isTS
}) {
  const resolver = helper(type === 'filter' ? RESOLVE_FILTER : type === 'component' ? RESOLVE_COMPONENT : RESOLVE_DIRECTIVE);

  for (let i = 0; i < assets.length; i++) {
    let id = assets[i]; // potential component implicit self-reference inferred from SFC filename

    const maybeSelfReference = id.endsWith('__self');

    if (maybeSelfReference) {
      id = id.slice(0, -6);
    }

    push(`const ${toValidAssetId(id, type)} = ${resolver}(${JSON.stringify(id)}${maybeSelfReference ? `, true` : ``})${isTS ? `!` : ``}`);

    if (i < assets.length - 1) {
      newline();
    }
  }
}

function genHoists(hoists, context) {
  if (!hoists.length) {
    return;
  }

  context.pure = true;
  const {
    push,
    newline,
    helper,
    scopeId,
    mode
  } = context;
  newline();

  for (let i = 0; i < hoists.length; i++) {
    const exp = hoists[i];

    if (exp) {
      push(`const _hoisted_${i + 1} = ${``}`);
      genNode(exp, context);
      newline();
    }
  }

  context.pure = false;
}

function isText$1(n) {
  return isString(n) || n.type === 4
  /* SIMPLE_EXPRESSION */
  || n.type === 2
  /* TEXT */
  || n.type === 5
  /* INTERPOLATION */
  || n.type === 8
  /* COMPOUND_EXPRESSION */
  ;
}

function genNodeListAsArray(nodes, context) {
  const multilines = nodes.length > 3 ||  false && 0;
  context.push(`[`);
  multilines && context.indent();
  genNodeList(nodes, context, multilines);
  multilines && context.deindent();
  context.push(`]`);
}

function genNodeList(nodes, context, multilines = false, comma = true) {
  const {
    push,
    newline
  } = context;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];

    if (shared_esm_bundler_isString(node)) {
      push(node);
    } else if (shared_esm_bundler_isArray(node)) {
      genNodeListAsArray(node, context);
    } else {
      genNode(node, context);
    }

    if (i < nodes.length - 1) {
      if (multilines) {
        comma && push(',');
        newline();
      } else {
        comma && push(', ');
      }
    }
  }
}

function genNode(node, context) {
  if (shared_esm_bundler_isString(node)) {
    context.push(node);
    return;
  }

  if (isSymbol(node)) {
    context.push(context.helper(node));
    return;
  }

  switch (node.type) {
    case 1
    /* ELEMENT */
    :
    case 9
    /* IF */
    :
    case 11
    /* FOR */
    :
       false && 0;
      genNode(node.codegenNode, context);
      break;

    case 2
    /* TEXT */
    :
      genText(node, context);
      break;

    case 4
    /* SIMPLE_EXPRESSION */
    :
      genExpression(node, context);
      break;

    case 5
    /* INTERPOLATION */
    :
      genInterpolation(node, context);
      break;

    case 12
    /* TEXT_CALL */
    :
      genNode(node.codegenNode, context);
      break;

    case 8
    /* COMPOUND_EXPRESSION */
    :
      genCompoundExpression(node, context);
      break;

    case 3
    /* COMMENT */
    :
      genComment(node, context);
      break;

    case 13
    /* VNODE_CALL */
    :
      genVNodeCall(node, context);
      break;

    case 14
    /* JS_CALL_EXPRESSION */
    :
      genCallExpression(node, context);
      break;

    case 15
    /* JS_OBJECT_EXPRESSION */
    :
      genObjectExpression(node, context);
      break;

    case 17
    /* JS_ARRAY_EXPRESSION */
    :
      genArrayExpression(node, context);
      break;

    case 18
    /* JS_FUNCTION_EXPRESSION */
    :
      genFunctionExpression(node, context);
      break;

    case 19
    /* JS_CONDITIONAL_EXPRESSION */
    :
      genConditionalExpression(node, context);
      break;

    case 20
    /* JS_CACHE_EXPRESSION */
    :
      genCacheExpression(node, context);
      break;

    case 21
    /* JS_BLOCK_STATEMENT */
    :
      genNodeList(node.body, context, true, false);
      break;
    // SSR only types

    case 22
    /* JS_TEMPLATE_LITERAL */
    :
      break;

    case 23
    /* JS_IF_STATEMENT */
    :
      break;

    case 24
    /* JS_ASSIGNMENT_EXPRESSION */
    :
      break;

    case 25
    /* JS_SEQUENCE_EXPRESSION */
    :
      break;

    case 26
    /* JS_RETURN_STATEMENT */
    :
      break;

    /* istanbul ignore next */

    case 10
    /* IF_BRANCH */
    :
      // noop
      break;

    default:
      if (false) {}

  }
}

function genText(node, context) {
  context.push(JSON.stringify(node.content), node);
}

function genExpression(node, context) {
  const {
    content,
    isStatic
  } = node;
  context.push(isStatic ? JSON.stringify(content) : content, node);
}

function genInterpolation(node, context) {
  const {
    push,
    helper,
    pure
  } = context;
  if (pure) push(PURE_ANNOTATION);
  push(`${helper(TO_DISPLAY_STRING)}(`);
  genNode(node.content, context);
  push(`)`);
}

function genCompoundExpression(node, context) {
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];

    if (shared_esm_bundler_isString(child)) {
      context.push(child);
    } else {
      genNode(child, context);
    }
  }
}

function genExpressionAsPropertyKey(node, context) {
  const {
    push
  } = context;

  if (node.type === 8
  /* COMPOUND_EXPRESSION */
  ) {
    push(`[`);
    genCompoundExpression(node, context);
    push(`]`);
  } else if (node.isStatic) {
    // only quote keys if necessary
    const text = isSimpleIdentifier(node.content) ? node.content : JSON.stringify(node.content);
    push(text, node);
  } else {
    push(`[${node.content}]`, node);
  }
}

function genComment(node, context) {
  const {
    push,
    helper,
    pure
  } = context;

  if (pure) {
    push(PURE_ANNOTATION);
  }

  push(`${helper(CREATE_COMMENT)}(${JSON.stringify(node.content)})`, node);
}

function genVNodeCall(node, context) {
  const {
    push,
    helper,
    pure
  } = context;
  const {
    tag,
    props,
    children,
    patchFlag,
    dynamicProps,
    directives,
    isBlock,
    disableTracking,
    isComponent
  } = node;

  if (directives) {
    push(helper(WITH_DIRECTIVES) + `(`);
  }

  if (isBlock) {
    push(`(${helper(OPEN_BLOCK)}(${disableTracking ? `true` : ``}), `);
  }

  if (pure) {
    push(PURE_ANNOTATION);
  }

  const callHelper = isBlock ? getVNodeBlockHelper(context.inSSR, isComponent) : getVNodeHelper(context.inSSR, isComponent);
  push(helper(callHelper) + `(`, node);
  genNodeList(genNullableArgs([tag, props, children, patchFlag, dynamicProps]), context);
  push(`)`);

  if (isBlock) {
    push(`)`);
  }

  if (directives) {
    push(`, `);
    genNode(directives, context);
    push(`)`);
  }
}

function genNullableArgs(args) {
  let i = args.length;

  while (i--) {
    if (args[i] != null) break;
  }

  return args.slice(0, i + 1).map(arg => arg || `null`);
} // JavaScript


function genCallExpression(node, context) {
  const {
    push,
    helper,
    pure
  } = context;
  const callee = shared_esm_bundler_isString(node.callee) ? node.callee : helper(node.callee);

  if (pure) {
    push(PURE_ANNOTATION);
  }

  push(callee + `(`, node);
  genNodeList(node.arguments, context);
  push(`)`);
}

function genObjectExpression(node, context) {
  const {
    push,
    indent,
    deindent,
    newline
  } = context;
  const {
    properties
  } = node;

  if (!properties.length) {
    push(`{}`, node);
    return;
  }

  const multilines = properties.length > 1 ||  false && 0;
  push(multilines ? `{` : `{ `);
  multilines && indent();

  for (let i = 0; i < properties.length; i++) {
    const {
      key,
      value
    } = properties[i]; // key

    genExpressionAsPropertyKey(key, context);
    push(`: `); // value

    genNode(value, context);

    if (i < properties.length - 1) {
      // will only reach this if it's multilines
      push(`,`);
      newline();
    }
  }

  multilines && deindent();
  push(multilines ? `}` : ` }`);
}

function genArrayExpression(node, context) {
  genNodeListAsArray(node.elements, context);
}

function genFunctionExpression(node, context) {
  const {
    push,
    indent,
    deindent
  } = context;
  const {
    params,
    returns,
    body,
    newline,
    isSlot
  } = node;

  if (isSlot) {
    // wrap slot functions with owner context
    push(`_${helperNameMap[WITH_CTX]}(`);
  }

  push(`(`, node);

  if (shared_esm_bundler_isArray(params)) {
    genNodeList(params, context);
  } else if (params) {
    genNode(params, context);
  }

  push(`) => `);

  if (newline || body) {
    push(`{`);
    indent();
  }

  if (returns) {
    if (newline) {
      push(`return `);
    }

    if (shared_esm_bundler_isArray(returns)) {
      genNodeListAsArray(returns, context);
    } else {
      genNode(returns, context);
    }
  } else if (body) {
    genNode(body, context);
  }

  if (newline || body) {
    deindent();
    push(`}`);
  }

  if (isSlot) {
    if (node.isNonScopedSlot) {
      push(`, undefined, true`);
    }

    push(`)`);
  }
}

function genConditionalExpression(node, context) {
  const {
    test,
    consequent,
    alternate,
    newline: needNewline
  } = node;
  const {
    push,
    indent,
    deindent,
    newline
  } = context;

  if (test.type === 4
  /* SIMPLE_EXPRESSION */
  ) {
    const needsParens = !isSimpleIdentifier(test.content);
    needsParens && push(`(`);
    genExpression(test, context);
    needsParens && push(`)`);
  } else {
    push(`(`);
    genNode(test, context);
    push(`)`);
  }

  needNewline && indent();
  context.indentLevel++;
  needNewline || push(` `);
  push(`? `);
  genNode(consequent, context);
  context.indentLevel--;
  needNewline && newline();
  needNewline || push(` `);
  push(`: `);
  const isNested = alternate.type === 19
  /* JS_CONDITIONAL_EXPRESSION */
  ;

  if (!isNested) {
    context.indentLevel++;
  }

  genNode(alternate, context);

  if (!isNested) {
    context.indentLevel--;
  }

  needNewline && deindent(true
  /* without newline */
  );
}

function genCacheExpression(node, context) {
  const {
    push,
    helper,
    indent,
    deindent,
    newline
  } = context;
  push(`_cache[${node.index}] || (`);

  if (node.isVNode) {
    indent();
    push(`${helper(SET_BLOCK_TRACKING)}(-1),`);
    newline();
  }

  push(`_cache[${node.index}] = `);
  genNode(node.value, context);

  if (node.isVNode) {
    push(`,`);
    newline();
    push(`${helper(SET_BLOCK_TRACKING)}(1),`);
    newline();
    push(`_cache[${node.index}]`);
    deindent();
  }

  push(`)`);
}

function walkIdentifiers(root, onIdentifier, includeAll = false, parentStack = [], knownIds = Object.create(null)) {
  {
    return;
  }
}

function isReferencedIdentifier(id, parent, parentStack) {
  {
    return false;
  }
}

function isInDestructureAssignment(parent, parentStack) {
  if (parent && (parent.type === 'ObjectProperty' || parent.type === 'ArrayPattern')) {
    let i = parentStack.length;

    while (i--) {
      const p = parentStack[i];

      if (p.type === 'AssignmentExpression') {
        return true;
      } else if (p.type !== 'ObjectProperty' && !p.type.endsWith('Pattern')) {
        break;
      }
    }
  }

  return false;
}

function walkFunctionParams(node, onIdent) {
  for (const p of node.params) {
    for (const id of extractIdentifiers(p)) {
      onIdent(id);
    }
  }
}

function walkBlockDeclarations(block, onIdent) {
  for (const stmt of block.body) {
    if (stmt.type === 'VariableDeclaration') {
      if (stmt.declare) continue;

      for (const decl of stmt.declarations) {
        for (const id of extractIdentifiers(decl.id)) {
          onIdent(id);
        }
      }
    } else if (stmt.type === 'FunctionDeclaration' || stmt.type === 'ClassDeclaration') {
      if (stmt.declare || !stmt.id) continue;
      onIdent(stmt.id);
    }
  }
}

function extractIdentifiers(param, nodes = []) {
  switch (param.type) {
    case 'Identifier':
      nodes.push(param);
      break;

    case 'MemberExpression':
      let object = param;

      while (object.type === 'MemberExpression') {
        object = object.object;
      }

      nodes.push(object);
      break;

    case 'ObjectPattern':
      for (const prop of param.properties) {
        if (prop.type === 'RestElement') {
          extractIdentifiers(prop.argument, nodes);
        } else {
          extractIdentifiers(prop.value, nodes);
        }
      }

      break;

    case 'ArrayPattern':
      param.elements.forEach(element => {
        if (element) extractIdentifiers(element, nodes);
      });
      break;

    case 'RestElement':
      extractIdentifiers(param.argument, nodes);
      break;

    case 'AssignmentPattern':
      extractIdentifiers(param.left, nodes);
      break;
  }

  return nodes;
}

const isFunctionType = node => {
  return /Function(?:Expression|Declaration)$|Method$/.test(node.type);
};

const isStaticProperty = node => node && (node.type === 'ObjectProperty' || node.type === 'ObjectMethod') && !node.computed;

const isStaticPropertyKey = (node, parent) => isStaticProperty(parent) && parent.key === node; // these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed


const prohibitedKeywordRE = new RegExp('\\b' + ('do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' + 'super,throw,while,yield,delete,export,import,return,switch,default,' + 'extends,finally,continue,debugger,function,arguments,typeof,void').split(',').join('\\b|\\b') + '\\b'); // strip strings in expressions

const stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;
/**
 * Validate a non-prefixed expression.
 * This is only called when using the in-browser runtime compiler since it
 * doesn't prefix expressions.
 */

function validateBrowserExpression(node, context, asParams = false, asRawStatements = false) {
  const exp = node.content; // empty expressions are validated per-directive since some directives
  // do allow empty expressions.

  if (!exp.trim()) {
    return;
  }

  try {
    new Function(asRawStatements ? ` ${exp} ` : `return ${asParams ? `(${exp}) => {}` : `(${exp})`}`);
  } catch (e) {
    let message = e.message;
    const keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);

    if (keywordMatch) {
      message = `avoid using JavaScript keyword as property name: "${keywordMatch[0]}"`;
    }

    context.onError(createCompilerError(44
    /* X_INVALID_EXPRESSION */
    , node.loc, undefined, message));
  }
}

const transformExpression = (node, context) => {
  if (node.type === 5
  /* INTERPOLATION */
  ) {
    node.content = processExpression(node.content, context);
  } else if (node.type === 1
  /* ELEMENT */
  ) {
    // handle directives on element
    for (let i = 0; i < node.props.length; i++) {
      const dir = node.props[i]; // do not process for v-on & v-for since they are special handled

      if (dir.type === 7
      /* DIRECTIVE */
      && dir.name !== 'for') {
        const exp = dir.exp;
        const arg = dir.arg; // do not process exp if this is v-on:arg - we need special handling
        // for wrapping inline statements.

        if (exp && exp.type === 4
        /* SIMPLE_EXPRESSION */
        && !(dir.name === 'on' && arg)) {
          dir.exp = processExpression(exp, context, // slot args must be processed as function params
          dir.name === 'slot');
        }

        if (arg && arg.type === 4
        /* SIMPLE_EXPRESSION */
        && !arg.isStatic) {
          dir.arg = processExpression(arg, context);
        }
      }
    }
  }
}; // Important: since this function uses Node.js only dependencies, it should
// always be used with a leading !true check so that it can be
// tree-shaken from the browser build.


function processExpression(node, context, // some expressions like v-slot props & v-for aliases should be parsed as
// function params
asParams = false, // v-on handler values may contain multiple statements
asRawStatements = false, localVars = Object.create(context.identifiers)) {
  {
    if (false) {}

    return node;
  }
}

const transformIf = createStructuralDirectiveTransform(/^(if|else|else-if)$/, (node, dir, context) => {
  return processIf(node, dir, context, (ifNode, branch, isRoot) => {
    // #1587: We need to dynamically increment the key based on the current
    // node's sibling nodes, since chained v-if/else branches are
    // rendered at the same depth
    const siblings = context.parent.children;
    let i = siblings.indexOf(ifNode);
    let key = 0;

    while (i-- >= 0) {
      const sibling = siblings[i];

      if (sibling && sibling.type === 9
      /* IF */
      ) {
        key += sibling.branches.length;
      }
    } // Exit callback. Complete the codegenNode when all children have been
    // transformed.


    return () => {
      if (isRoot) {
        ifNode.codegenNode = createCodegenNodeForBranch(branch, key, context);
      } else {
        // attach this branch's codegen node to the v-if root.
        const parentCondition = getParentCondition(ifNode.codegenNode);
        parentCondition.alternate = createCodegenNodeForBranch(branch, key + ifNode.branches.length - 1, context);
      }
    };
  });
}); // target-agnostic transform used for both Client and SSR

function processIf(node, dir, context, processCodegen) {
  if (dir.name !== 'else' && (!dir.exp || !dir.exp.content.trim())) {
    const loc = dir.exp ? dir.exp.loc : node.loc;
    context.onError(createCompilerError(28
    /* X_V_IF_NO_EXPRESSION */
    , dir.loc));
    dir.exp = createSimpleExpression(`true`, false, loc);
  }

  if (false) {}

  if (dir.name === 'if') {
    const branch = createIfBranch(node, dir);
    const ifNode = {
      type: 9
      /* IF */
      ,
      loc: node.loc,
      branches: [branch]
    };
    context.replaceNode(ifNode);

    if (processCodegen) {
      return processCodegen(ifNode, branch, true);
    }
  } else {
    // locate the adjacent v-if
    const siblings = context.parent.children;
    const comments = [];
    let i = siblings.indexOf(node);

    while (i-- >= -1) {
      const sibling = siblings[i];

      if (false
      /* COMMENT */
      ) {}

      if (sibling && sibling.type === 2
      /* TEXT */
      && !sibling.content.trim().length) {
        context.removeNode(sibling);
        continue;
      }

      if (sibling && sibling.type === 9
      /* IF */
      ) {
        // Check if v-else was followed by v-else-if
        if (dir.name === 'else-if' && sibling.branches[sibling.branches.length - 1].condition === undefined) {
          context.onError(createCompilerError(30
          /* X_V_ELSE_NO_ADJACENT_IF */
          , node.loc));
        } // move the node to the if node's branches


        context.removeNode();
        const branch = createIfBranch(node, dir);

        if (false) {} // check if user is forcing same key on different branches


        if (false) {}

        sibling.branches.push(branch);
        const onExit = processCodegen && processCodegen(sibling, branch, false); // since the branch was removed, it will not be traversed.
        // make sure to traverse here.

        traverseNode(branch, context); // call on exit

        if (onExit) onExit(); // make sure to reset currentNode after traversal to indicate this
        // node has been removed.

        context.currentNode = null;
      } else {
        context.onError(createCompilerError(30
        /* X_V_ELSE_NO_ADJACENT_IF */
        , node.loc));
      }

      break;
    }
  }
}

function createIfBranch(node, dir) {
  const isTemplateIf = node.tagType === 3
  /* TEMPLATE */
  ;
  return {
    type: 10
    /* IF_BRANCH */
    ,
    loc: node.loc,
    condition: dir.name === 'else' ? undefined : dir.exp,
    children: isTemplateIf && !findDir(node, 'for') ? node.children : [node],
    userKey: findProp(node, `key`),
    isTemplateIf
  };
}

function createCodegenNodeForBranch(branch, keyIndex, context) {
  if (branch.condition) {
    return createConditionalExpression(branch.condition, createChildrenCodegenNode(branch, keyIndex, context), // make sure to pass in asBlock: true so that the comment node call
    // closes the current block.
    createCallExpression(context.helper(CREATE_COMMENT), [ false ? 0 : '""', 'true']));
  } else {
    return createChildrenCodegenNode(branch, keyIndex, context);
  }
}

function createChildrenCodegenNode(branch, keyIndex, context) {
  const {
    helper
  } = context;
  const keyProperty = createObjectProperty(`key`, createSimpleExpression(`${keyIndex}`, false, locStub, 2
  /* CAN_HOIST */
  ));
  const {
    children
  } = branch;
  const firstChild = children[0];
  const needFragmentWrapper = children.length !== 1 || firstChild.type !== 1
  /* ELEMENT */
  ;

  if (needFragmentWrapper) {
    if (children.length === 1 && firstChild.type === 11
    /* FOR */
    ) {
      // optimize away nested fragments when child is a ForNode
      const vnodeCall = firstChild.codegenNode;
      injectProp(vnodeCall, keyProperty, context);
      return vnodeCall;
    } else {
      let patchFlag = 64
      /* STABLE_FRAGMENT */
      ;
      let patchFlagText = PatchFlagNames[64]; // check if the fragment actually contains a single valid child with
      // the rest being comments

      if (false) {}

      return createVNodeCall(context, helper(FRAGMENT), createObjectExpression([keyProperty]), children, patchFlag + ( false ? 0 : ``), undefined, undefined, true, false, false
      /* isComponent */
      , branch.loc);
    }
  } else {
    const ret = firstChild.codegenNode;
    const vnodeCall = getMemoedVNodeCall(ret); // Change createVNode to createBlock.

    if (vnodeCall.type === 13
    /* VNODE_CALL */
    ) {
      makeBlock(vnodeCall, context);
    } // inject branch key


    injectProp(vnodeCall, keyProperty, context);
    return ret;
  }
}

function isSameKey(a, b) {
  if (!a || a.type !== b.type) {
    return false;
  }

  if (a.type === 6
  /* ATTRIBUTE */
  ) {
    if (a.value.content !== b.value.content) {
      return false;
    }
  } else {
    // directive
    const exp = a.exp;
    const branchExp = b.exp;

    if (exp.type !== branchExp.type) {
      return false;
    }

    if (exp.type !== 4
    /* SIMPLE_EXPRESSION */
    || exp.isStatic !== branchExp.isStatic || exp.content !== branchExp.content) {
      return false;
    }
  }

  return true;
}

function getParentCondition(node) {
  while (true) {
    if (node.type === 19
    /* JS_CONDITIONAL_EXPRESSION */
    ) {
      if (node.alternate.type === 19
      /* JS_CONDITIONAL_EXPRESSION */
      ) {
        node = node.alternate;
      } else {
        return node;
      }
    } else if (node.type === 20
    /* JS_CACHE_EXPRESSION */
    ) {
      node = node.value;
    }
  }
}

const transformFor = createStructuralDirectiveTransform('for', (node, dir, context) => {
  const {
    helper,
    removeHelper
  } = context;
  return processFor(node, dir, context, forNode => {
    // create the loop render function expression now, and add the
    // iterator on exit after all children have been traversed
    const renderExp = createCallExpression(helper(RENDER_LIST), [forNode.source]);
    const isTemplate = isTemplateNode(node);
    const memo = findDir(node, 'memo');
    const keyProp = findProp(node, `key`);
    const keyExp = keyProp && (keyProp.type === 6
    /* ATTRIBUTE */
    ? createSimpleExpression(keyProp.value.content, true) : keyProp.exp);
    const keyProperty = keyProp ? createObjectProperty(`key`, keyExp) : null;
    const isStableFragment = forNode.source.type === 4
    /* SIMPLE_EXPRESSION */
    && forNode.source.constType > 0
    /* NOT_CONSTANT */
    ;
    const fragmentFlag = isStableFragment ? 64
    /* STABLE_FRAGMENT */
    : keyProp ? 128
    /* KEYED_FRAGMENT */
    : 256
    /* UNKEYED_FRAGMENT */
    ;
    forNode.codegenNode = createVNodeCall(context, helper(FRAGMENT), undefined, renderExp, fragmentFlag + ( false ? 0 : ``), undefined, undefined, true
    /* isBlock */
    , !isStableFragment
    /* disableTracking */
    , false
    /* isComponent */
    , node.loc);
    return () => {
      // finish the codegen now that all children have been traversed
      let childBlock;
      const {
        children
      } = forNode; // check <template v-for> key placement

      if (false) {}

      const needFragmentWrapper = children.length !== 1 || children[0].type !== 1
      /* ELEMENT */
      ;
      const slotOutlet = isSlotOutlet(node) ? node : isTemplate && node.children.length === 1 && isSlotOutlet(node.children[0]) ? node.children[0] // api-extractor somehow fails to infer this
      : null;

      if (slotOutlet) {
        // <slot v-for="..."> or <template v-for="..."><slot/></template>
        childBlock = slotOutlet.codegenNode;

        if (isTemplate && keyProperty) {
          // <template v-for="..." :key="..."><slot/></template>
          // we need to inject the key to the renderSlot() call.
          // the props for renderSlot is passed as the 3rd argument.
          injectProp(childBlock, keyProperty, context);
        }
      } else if (needFragmentWrapper) {
        // <template v-for="..."> with text or multi-elements
        // should generate a fragment block for each loop
        childBlock = createVNodeCall(context, helper(FRAGMENT), keyProperty ? createObjectExpression([keyProperty]) : undefined, node.children, 64
        /* STABLE_FRAGMENT */
        + ( false ? 0 : ``), undefined, undefined, true, undefined, false
        /* isComponent */
        );
      } else {
        // Normal element v-for. Directly use the child's codegenNode
        // but mark it as a block.
        childBlock = children[0].codegenNode;

        if (isTemplate && keyProperty) {
          injectProp(childBlock, keyProperty, context);
        }

        if (childBlock.isBlock !== !isStableFragment) {
          if (childBlock.isBlock) {
            // switch from block to vnode
            removeHelper(OPEN_BLOCK);
            removeHelper(getVNodeBlockHelper(context.inSSR, childBlock.isComponent));
          } else {
            // switch from vnode to block
            removeHelper(getVNodeHelper(context.inSSR, childBlock.isComponent));
          }
        }

        childBlock.isBlock = !isStableFragment;

        if (childBlock.isBlock) {
          helper(OPEN_BLOCK);
          helper(getVNodeBlockHelper(context.inSSR, childBlock.isComponent));
        } else {
          helper(getVNodeHelper(context.inSSR, childBlock.isComponent));
        }
      }

      if (memo) {
        const loop = createFunctionExpression(createForLoopParams(forNode.parseResult, [createSimpleExpression(`_cached`)]));
        loop.body = createBlockStatement([createCompoundExpression([`const _memo = (`, memo.exp, `)`]), createCompoundExpression([`if (_cached`, ...(keyExp ? [` && _cached.key === `, keyExp] : []), ` && ${context.helperString(IS_MEMO_SAME)}(_cached, _memo)) return _cached`]), createCompoundExpression([`const _item = `, childBlock]), createSimpleExpression(`_item.memo = _memo`), createSimpleExpression(`return _item`)]);
        renderExp.arguments.push(loop, createSimpleExpression(`_cache`), createSimpleExpression(String(context.cached++)));
      } else {
        renderExp.arguments.push(createFunctionExpression(createForLoopParams(forNode.parseResult), childBlock, true
        /* force newline */
        ));
      }
    };
  });
}); // target-agnostic transform used for both Client and SSR

function processFor(node, dir, context, processCodegen) {
  if (!dir.exp) {
    context.onError(createCompilerError(31
    /* X_V_FOR_NO_EXPRESSION */
    , dir.loc));
    return;
  }

  const parseResult = parseForExpression( // can only be simple expression because vFor transform is applied
  // before expression transform.
  dir.exp, context);

  if (!parseResult) {
    context.onError(createCompilerError(32
    /* X_V_FOR_MALFORMED_EXPRESSION */
    , dir.loc));
    return;
  }

  const {
    addIdentifiers,
    removeIdentifiers,
    scopes
  } = context;
  const {
    source,
    value,
    key,
    index
  } = parseResult;
  const forNode = {
    type: 11
    /* FOR */
    ,
    loc: dir.loc,
    source,
    valueAlias: value,
    keyAlias: key,
    objectIndexAlias: index,
    parseResult,
    children: isTemplateNode(node) ? node.children : [node]
  };
  context.replaceNode(forNode); // bookkeeping

  scopes.vFor++;
  const onExit = processCodegen && processCodegen(forNode);
  return () => {
    scopes.vFor--;
    if (onExit) onExit();
  };
}

const forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/; // This regex doesn't cover the case if key or index aliases have destructuring,
// but those do not make sense in the first place, so this works in practice.

const forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
const stripParensRE = /^\(|\)$/g;

function parseForExpression(input, context) {
  const loc = input.loc;
  const exp = input.content;
  const inMatch = exp.match(forAliasRE);
  if (!inMatch) return;
  const [, LHS, RHS] = inMatch;
  const result = {
    source: createAliasExpression(loc, RHS.trim(), exp.indexOf(RHS, LHS.length)),
    value: undefined,
    key: undefined,
    index: undefined
  };

  if (false) {}

  let valueContent = LHS.trim().replace(stripParensRE, '').trim();
  const trimmedOffset = LHS.indexOf(valueContent);
  const iteratorMatch = valueContent.match(forIteratorRE);

  if (iteratorMatch) {
    valueContent = valueContent.replace(forIteratorRE, '').trim();
    const keyContent = iteratorMatch[1].trim();
    let keyOffset;

    if (keyContent) {
      keyOffset = exp.indexOf(keyContent, trimmedOffset + valueContent.length);
      result.key = createAliasExpression(loc, keyContent, keyOffset);

      if (false) {}
    }

    if (iteratorMatch[2]) {
      const indexContent = iteratorMatch[2].trim();

      if (indexContent) {
        result.index = createAliasExpression(loc, indexContent, exp.indexOf(indexContent, result.key ? keyOffset + keyContent.length : trimmedOffset + valueContent.length));

        if (false) {}
      }
    }
  }

  if (valueContent) {
    result.value = createAliasExpression(loc, valueContent, trimmedOffset);

    if (false) {}
  }

  return result;
}

function createAliasExpression(range, content, offset) {
  return createSimpleExpression(content, false, getInnerRange(range, offset, content.length));
}

function createForLoopParams({
  value,
  key,
  index
}, memoArgs = []) {
  return createParamsList([value, key, index, ...memoArgs]);
}

function createParamsList(args) {
  let i = args.length;

  while (i--) {
    if (args[i]) break;
  }

  return args.slice(0, i + 1).map((arg, i) => arg || createSimpleExpression(`_`.repeat(i + 1), false));
}

const defaultFallback = createSimpleExpression(`undefined`, false); // A NodeTransform that:
// 1. Tracks scope identifiers for scoped slots so that they don't get prefixed
//    by transformExpression. This is only applied in non-browser builds with
//    { prefixIdentifiers: true }.
// 2. Track v-slot depths so that we know a slot is inside another slot.
//    Note the exit callback is executed before buildSlots() on the same node,
//    so only nested slots see positive numbers.

const trackSlotScopes = (node, context) => {
  if (node.type === 1
  /* ELEMENT */
  && (node.tagType === 1
  /* COMPONENT */
  || node.tagType === 3
  /* TEMPLATE */
  )) {
    // We are only checking non-empty v-slot here
    // since we only care about slots that introduce scope variables.
    const vSlot = findDir(node, 'slot');

    if (vSlot) {
      vSlot.exp;
      context.scopes.vSlot++;
      return () => {
        context.scopes.vSlot--;
      };
    }
  }
}; // A NodeTransform that tracks scope identifiers for scoped slots with v-for.
// This transform is only applied in non-browser builds with { prefixIdentifiers: true }


const trackVForSlotScopes = (node, context) => {
  let vFor;

  if (isTemplateNode(node) && node.props.some(isVSlot) && (vFor = findDir(node, 'for'))) {
    const result = vFor.parseResult = parseForExpression(vFor.exp, context);

    if (result) {
      const {
        value,
        key,
        index
      } = result;
      const {
        addIdentifiers,
        removeIdentifiers
      } = context;
      value && addIdentifiers(value);
      key && addIdentifiers(key);
      index && addIdentifiers(index);
      return () => {
        value && removeIdentifiers(value);
        key && removeIdentifiers(key);
        index && removeIdentifiers(index);
      };
    }
  }
};

const buildClientSlotFn = (props, children, loc) => createFunctionExpression(props, children, false
/* newline */
, true
/* isSlot */
, children.length ? children[0].loc : loc); // Instead of being a DirectiveTransform, v-slot processing is called during
// transformElement to build the slots object for a component.


function buildSlots(node, context, buildSlotFn = buildClientSlotFn) {
  context.helper(WITH_CTX);
  const {
    children,
    loc
  } = node;
  const slotsProperties = [];
  const dynamicSlots = []; // If the slot is inside a v-for or another v-slot, force it to be dynamic
  // since it likely uses a scope variable.

  let hasDynamicSlots = context.scopes.vSlot > 0 || context.scopes.vFor > 0; // 1. Check for slot with slotProps on component itself.
  //    <Comp v-slot="{ prop }"/>

  const onComponentSlot = findDir(node, 'slot', true);

  if (onComponentSlot) {
    const {
      arg,
      exp
    } = onComponentSlot;

    if (arg && !isStaticExp(arg)) {
      hasDynamicSlots = true;
    }

    slotsProperties.push(createObjectProperty(arg || createSimpleExpression('default', true), buildSlotFn(exp, children, loc)));
  } // 2. Iterate through children and check for template slots
  //    <template v-slot:foo="{ prop }">


  let hasTemplateSlots = false;
  let hasNamedDefaultSlot = false;
  const implicitDefaultChildren = [];
  const seenSlotNames = new Set();

  for (let i = 0; i < children.length; i++) {
    const slotElement = children[i];
    let slotDir;

    if (!isTemplateNode(slotElement) || !(slotDir = findDir(slotElement, 'slot', true))) {
      // not a <template v-slot>, skip.
      if (slotElement.type !== 3
      /* COMMENT */
      ) {
        implicitDefaultChildren.push(slotElement);
      }

      continue;
    }

    if (onComponentSlot) {
      // already has on-component slot - this is incorrect usage.
      context.onError(createCompilerError(37
      /* X_V_SLOT_MIXED_SLOT_USAGE */
      , slotDir.loc));
      break;
    }

    hasTemplateSlots = true;
    const {
      children: slotChildren,
      loc: slotLoc
    } = slotElement;
    const {
      arg: slotName = createSimpleExpression(`default`, true),
      exp: slotProps,
      loc: dirLoc
    } = slotDir; // check if name is dynamic.

    let staticSlotName;

    if (isStaticExp(slotName)) {
      staticSlotName = slotName ? slotName.content : `default`;
    } else {
      hasDynamicSlots = true;
    }

    const slotFunction = buildSlotFn(slotProps, slotChildren, slotLoc); // check if this slot is conditional (v-if/v-for)

    let vIf;
    let vElse;
    let vFor;

    if (vIf = findDir(slotElement, 'if')) {
      hasDynamicSlots = true;
      dynamicSlots.push(createConditionalExpression(vIf.exp, buildDynamicSlot(slotName, slotFunction), defaultFallback));
    } else if (vElse = findDir(slotElement, /^else(-if)?$/, true
    /* allowEmpty */
    )) {
      // find adjacent v-if
      let j = i;
      let prev;

      while (j--) {
        prev = children[j];

        if (prev.type !== 3
        /* COMMENT */
        ) {
          break;
        }
      }

      if (prev && isTemplateNode(prev) && findDir(prev, 'if')) {
        // remove node
        children.splice(i, 1);
        i--; // attach this slot to previous conditional

        let conditional = dynamicSlots[dynamicSlots.length - 1];

        while (conditional.alternate.type === 19
        /* JS_CONDITIONAL_EXPRESSION */
        ) {
          conditional = conditional.alternate;
        }

        conditional.alternate = vElse.exp ? createConditionalExpression(vElse.exp, buildDynamicSlot(slotName, slotFunction), defaultFallback) : buildDynamicSlot(slotName, slotFunction);
      } else {
        context.onError(createCompilerError(30
        /* X_V_ELSE_NO_ADJACENT_IF */
        , vElse.loc));
      }
    } else if (vFor = findDir(slotElement, 'for')) {
      hasDynamicSlots = true;
      const parseResult = vFor.parseResult || parseForExpression(vFor.exp, context);

      if (parseResult) {
        // Render the dynamic slots as an array and add it to the createSlot()
        // args. The runtime knows how to handle it appropriately.
        dynamicSlots.push(createCallExpression(context.helper(RENDER_LIST), [parseResult.source, createFunctionExpression(createForLoopParams(parseResult), buildDynamicSlot(slotName, slotFunction), true
        /* force newline */
        )]));
      } else {
        context.onError(createCompilerError(32
        /* X_V_FOR_MALFORMED_EXPRESSION */
        , vFor.loc));
      }
    } else {
      // check duplicate static names
      if (staticSlotName) {
        if (seenSlotNames.has(staticSlotName)) {
          context.onError(createCompilerError(38
          /* X_V_SLOT_DUPLICATE_SLOT_NAMES */
          , dirLoc));
          continue;
        }

        seenSlotNames.add(staticSlotName);

        if (staticSlotName === 'default') {
          hasNamedDefaultSlot = true;
        }
      }

      slotsProperties.push(createObjectProperty(slotName, slotFunction));
    }
  }

  if (!onComponentSlot) {
    const buildDefaultSlotProperty = (props, children) => {
      const fn = buildSlotFn(props, children, loc);

      if (context.compatConfig) {
        fn.isNonScopedSlot = true;
      }

      return createObjectProperty(`default`, fn);
    };

    if (!hasTemplateSlots) {
      // implicit default slot (on component)
      slotsProperties.push(buildDefaultSlotProperty(undefined, children));
    } else if (implicitDefaultChildren.length && // #3766
    // with whitespace: 'preserve', whitespaces between slots will end up in
    // implicitDefaultChildren. Ignore if all implicit children are whitespaces.
    implicitDefaultChildren.some(node => isNonWhitespaceContent(node))) {
      // implicit default slot (mixed with named slots)
      if (hasNamedDefaultSlot) {
        context.onError(createCompilerError(39
        /* X_V_SLOT_EXTRANEOUS_DEFAULT_SLOT_CHILDREN */
        , implicitDefaultChildren[0].loc));
      } else {
        slotsProperties.push(buildDefaultSlotProperty(undefined, implicitDefaultChildren));
      }
    }
  }

  const slotFlag = hasDynamicSlots ? 2
  /* DYNAMIC */
  : hasForwardedSlots(node.children) ? 3
  /* FORWARDED */
  : 1
  /* STABLE */
  ;
  let slots = createObjectExpression(slotsProperties.concat(createObjectProperty(`_`, // 2 = compiled but dynamic = can skip normalization, but must run diff
  // 1 = compiled and static = can skip normalization AND diff as optimized
  createSimpleExpression(slotFlag + ( false ? 0 : ``), false))), loc);

  if (dynamicSlots.length) {
    slots = createCallExpression(context.helper(CREATE_SLOTS), [slots, createArrayExpression(dynamicSlots)]);
  }

  return {
    slots,
    hasDynamicSlots
  };
}

function buildDynamicSlot(name, fn) {
  return createObjectExpression([createObjectProperty(`name`, name), createObjectProperty(`fn`, fn)]);
}

function hasForwardedSlots(children) {
  for (let i = 0; i < children.length; i++) {
    const child = children[i];

    switch (child.type) {
      case 1
      /* ELEMENT */
      :
        if (child.tagType === 2
        /* SLOT */
        || hasForwardedSlots(child.children)) {
          return true;
        }

        break;

      case 9
      /* IF */
      :
        if (hasForwardedSlots(child.branches)) return true;
        break;

      case 10
      /* IF_BRANCH */
      :
      case 11
      /* FOR */
      :
        if (hasForwardedSlots(child.children)) return true;
        break;
    }
  }

  return false;
}

function isNonWhitespaceContent(node) {
  if (node.type !== 2
  /* TEXT */
  && node.type !== 12
  /* TEXT_CALL */
  ) return true;
  return node.type === 2
  /* TEXT */
  ? !!node.content.trim() : isNonWhitespaceContent(node.content);
} // some directive transforms (e.g. v-model) may return a symbol for runtime
// import, which should be used instead of a resolveDirective call.


const directiveImportMap = new WeakMap(); // generate a JavaScript AST for this element's codegen

const transformElement = (node, context) => {
  // perform the work on exit, after all child expressions have been
  // processed and merged.
  return function postTransformElement() {
    node = context.currentNode;

    if (!(node.type === 1
    /* ELEMENT */
    && (node.tagType === 0
    /* ELEMENT */
    || node.tagType === 1
    /* COMPONENT */
    ))) {
      return;
    }

    const {
      tag,
      props
    } = node;
    const isComponent = node.tagType === 1
    /* COMPONENT */
    ; // The goal of the transform is to create a codegenNode implementing the
    // VNodeCall interface.

    let vnodeTag = isComponent ? resolveComponentType(node, context) : `"${tag}"`;
    const isDynamicComponent = shared_esm_bundler_isObject(vnodeTag) && vnodeTag.callee === RESOLVE_DYNAMIC_COMPONENT;
    let vnodeProps;
    let vnodeChildren;
    let vnodePatchFlag;
    let patchFlag = 0;
    let vnodeDynamicProps;
    let dynamicPropNames;
    let vnodeDirectives;
    let shouldUseBlock = // dynamic component may resolve to plain elements
    isDynamicComponent || vnodeTag === TELEPORT || vnodeTag === SUSPENSE || !isComponent && ( // <svg> and <foreignObject> must be forced into blocks so that block
    // updates inside get proper isSVG flag at runtime. (#639, #643)
    // This is technically web-specific, but splitting the logic out of core
    // leads to too much unnecessary complexity.
    tag === 'svg' || tag === 'foreignObject'); // props

    if (props.length > 0) {
      const propsBuildResult = buildProps(node, context, undefined, isComponent, isDynamicComponent);
      vnodeProps = propsBuildResult.props;
      patchFlag = propsBuildResult.patchFlag;
      dynamicPropNames = propsBuildResult.dynamicPropNames;
      const directives = propsBuildResult.directives;
      vnodeDirectives = directives && directives.length ? createArrayExpression(directives.map(dir => buildDirectiveArgs(dir, context))) : undefined;

      if (propsBuildResult.shouldUseBlock) {
        shouldUseBlock = true;
      }
    } // children


    if (node.children.length > 0) {
      if (vnodeTag === KEEP_ALIVE) {
        // Although a built-in component, we compile KeepAlive with raw children
        // instead of slot functions so that it can be used inside Transition
        // or other Transition-wrapping HOCs.
        // To ensure correct updates with block optimizations, we need to:
        // 1. Force keep-alive into a block. This avoids its children being
        //    collected by a parent block.
        shouldUseBlock = true; // 2. Force keep-alive to always be updated, since it uses raw children.

        patchFlag |= 1024
        /* DYNAMIC_SLOTS */
        ;

        if (false) {}
      }

      const shouldBuildAsSlots = isComponent && // Teleport is not a real component and has dedicated runtime handling
      vnodeTag !== TELEPORT && // explained above.
      vnodeTag !== KEEP_ALIVE;

      if (shouldBuildAsSlots) {
        const {
          slots,
          hasDynamicSlots
        } = buildSlots(node, context);
        vnodeChildren = slots;

        if (hasDynamicSlots) {
          patchFlag |= 1024
          /* DYNAMIC_SLOTS */
          ;
        }
      } else if (node.children.length === 1 && vnodeTag !== TELEPORT) {
        const child = node.children[0];
        const type = child.type; // check for dynamic text children

        const hasDynamicTextChild = type === 5
        /* INTERPOLATION */
        || type === 8
        /* COMPOUND_EXPRESSION */
        ;

        if (hasDynamicTextChild && getConstantType(child, context) === 0
        /* NOT_CONSTANT */
        ) {
          patchFlag |= 1
          /* TEXT */
          ;
        } // pass directly if the only child is a text node
        // (plain / interpolation / expression)


        if (hasDynamicTextChild || type === 2
        /* TEXT */
        ) {
          vnodeChildren = child;
        } else {
          vnodeChildren = node.children;
        }
      } else {
        vnodeChildren = node.children;
      }
    } // patchFlag & dynamicPropNames


    if (patchFlag !== 0) {
      if (false) {} else {
        vnodePatchFlag = String(patchFlag);
      }

      if (dynamicPropNames && dynamicPropNames.length) {
        vnodeDynamicProps = stringifyDynamicPropNames(dynamicPropNames);
      }
    }

    node.codegenNode = createVNodeCall(context, vnodeTag, vnodeProps, vnodeChildren, vnodePatchFlag, vnodeDynamicProps, vnodeDirectives, !!shouldUseBlock, false
    /* disableTracking */
    , isComponent, node.loc);
  };
};

function resolveComponentType(node, context, ssr = false) {
  let {
    tag
  } = node; // 1. dynamic component

  const isExplicitDynamic = isComponentTag(tag);
  const isProp = findProp(node, 'is');

  if (isProp) {
    if (isExplicitDynamic || isCompatEnabled("COMPILER_IS_ON_ELEMENT"
    /* COMPILER_IS_ON_ELEMENT */
    , context)) {
      const exp = isProp.type === 6
      /* ATTRIBUTE */
      ? isProp.value && createSimpleExpression(isProp.value.content, true) : isProp.exp;

      if (exp) {
        return createCallExpression(context.helper(RESOLVE_DYNAMIC_COMPONENT), [exp]);
      }
    } else if (isProp.type === 6
    /* ATTRIBUTE */
    && isProp.value.content.startsWith('vue:')) {
      // <button is="vue:xxx">
      // if not <component>, only is value that starts with "vue:" will be
      // treated as component by the parse phase and reach here, unless it's
      // compat mode where all is values are considered components
      tag = isProp.value.content.slice(4);
    }
  } // 1.5 v-is (TODO: Deprecate)


  const isDir = !isExplicitDynamic && findDir(node, 'is');

  if (isDir && isDir.exp) {
    return createCallExpression(context.helper(RESOLVE_DYNAMIC_COMPONENT), [isDir.exp]);
  } // 2. built-in components (Teleport, Transition, KeepAlive, Suspense...)


  const builtIn = isCoreComponent(tag) || context.isBuiltInComponent(tag);

  if (builtIn) {
    // built-ins are simply fallthroughs / have special handling during ssr
    // so we don't need to import their runtime equivalents
    if (!ssr) context.helper(builtIn);
    return builtIn;
  } // 5. user component (resolve)


  context.helper(RESOLVE_COMPONENT);
  context.components.add(tag);
  return toValidAssetId(tag, `component`);
}

function buildProps(node, context, props = node.props, isComponent, isDynamicComponent, ssr = false) {
  const {
    tag,
    loc: elementLoc,
    children
  } = node;
  let properties = [];
  const mergeArgs = [];
  const runtimeDirectives = [];
  const hasChildren = children.length > 0;
  let shouldUseBlock = false; // patchFlag analysis

  let patchFlag = 0;
  let hasRef = false;
  let hasClassBinding = false;
  let hasStyleBinding = false;
  let hasHydrationEventBinding = false;
  let hasDynamicKeys = false;
  let hasVnodeHook = false;
  const dynamicPropNames = [];

  const analyzePatchFlag = ({
    key,
    value
  }) => {
    if (isStaticExp(key)) {
      const name = key.content;
      const isEventHandler = shared_esm_bundler_isOn(name);

      if (isEventHandler && (!isComponent || isDynamicComponent) && // omit the flag for click handlers because hydration gives click
      // dedicated fast path.
      name.toLowerCase() !== 'onclick' && // omit v-model handlers
      name !== 'onUpdate:modelValue' && // omit onVnodeXXX hooks
      !isReservedProp(name)) {
        hasHydrationEventBinding = true;
      }

      if (isEventHandler && isReservedProp(name)) {
        hasVnodeHook = true;
      }

      if (value.type === 20
      /* JS_CACHE_EXPRESSION */
      || (value.type === 4
      /* SIMPLE_EXPRESSION */
      || value.type === 8
      /* COMPOUND_EXPRESSION */
      ) && getConstantType(value, context) > 0) {
        // skip if the prop is a cached handler or has constant value
        return;
      }

      if (name === 'ref') {
        hasRef = true;
      } else if (name === 'class') {
        hasClassBinding = true;
      } else if (name === 'style') {
        hasStyleBinding = true;
      } else if (name !== 'key' && !dynamicPropNames.includes(name)) {
        dynamicPropNames.push(name);
      } // treat the dynamic class and style binding of the component as dynamic props


      if (isComponent && (name === 'class' || name === 'style') && !dynamicPropNames.includes(name)) {
        dynamicPropNames.push(name);
      }
    } else {
      hasDynamicKeys = true;
    }
  };

  for (let i = 0; i < props.length; i++) {
    // static attribute
    const prop = props[i];

    if (prop.type === 6
    /* ATTRIBUTE */
    ) {
      const {
        loc,
        name,
        value
      } = prop;
      let isStatic = true;

      if (name === 'ref') {
        hasRef = true;

        if (context.scopes.vFor > 0) {
          properties.push(createObjectProperty(createSimpleExpression('ref_for', true), createSimpleExpression('true')));
        }
      } // skip is on <component>, or is="vue:xxx"


      if (name === 'is' && (isComponentTag(tag) || value && value.content.startsWith('vue:') || isCompatEnabled("COMPILER_IS_ON_ELEMENT"
      /* COMPILER_IS_ON_ELEMENT */
      , context))) {
        continue;
      }

      properties.push(createObjectProperty(createSimpleExpression(name, true, getInnerRange(loc, 0, name.length)), createSimpleExpression(value ? value.content : '', isStatic, value ? value.loc : loc)));
    } else {
      // directives
      const {
        name,
        arg,
        exp,
        loc
      } = prop;
      const isVBind = name === 'bind';
      const isVOn = name === 'on'; // skip v-slot - it is handled by its dedicated transform.

      if (name === 'slot') {
        if (!isComponent) {
          context.onError(createCompilerError(40
          /* X_V_SLOT_MISPLACED */
          , loc));
        }

        continue;
      } // skip v-once/v-memo - they are handled by dedicated transforms.


      if (name === 'once' || name === 'memo') {
        continue;
      } // skip v-is and :is on <component>


      if (name === 'is' || isVBind && isStaticArgOf(arg, 'is') && (isComponentTag(tag) || isCompatEnabled("COMPILER_IS_ON_ELEMENT"
      /* COMPILER_IS_ON_ELEMENT */
      , context))) {
        continue;
      } // skip v-on in SSR compilation


      if (isVOn && ssr) {
        continue;
      }

      if ( // #938: elements with dynamic keys should be forced into blocks
      isVBind && isStaticArgOf(arg, 'key') || // inline before-update hooks need to force block so that it is invoked
      // before children
      isVOn && hasChildren && isStaticArgOf(arg, 'vue:before-update')) {
        shouldUseBlock = true;
      }

      if (isVBind && isStaticArgOf(arg, 'ref') && context.scopes.vFor > 0) {
        properties.push(createObjectProperty(createSimpleExpression('ref_for', true), createSimpleExpression('true')));
      } // special case for v-bind and v-on with no argument


      if (!arg && (isVBind || isVOn)) {
        hasDynamicKeys = true;

        if (exp) {
          if (properties.length) {
            mergeArgs.push(createObjectExpression(dedupeProperties(properties), elementLoc));
            properties = [];
          }

          if (isVBind) {
            {
              // 2.x v-bind object order compat
              if (false) {}

              if (isCompatEnabled("COMPILER_V_BIND_OBJECT_ORDER"
              /* COMPILER_V_BIND_OBJECT_ORDER */
              , context)) {
                mergeArgs.unshift(exp);
                continue;
              }
            }
            mergeArgs.push(exp);
          } else {
            // v-on="obj" -> toHandlers(obj)
            mergeArgs.push({
              type: 14
              /* JS_CALL_EXPRESSION */
              ,
              loc,
              callee: context.helper(TO_HANDLERS),
              arguments: [exp]
            });
          }
        } else {
          context.onError(createCompilerError(isVBind ? 34
          /* X_V_BIND_NO_EXPRESSION */
          : 35
          /* X_V_ON_NO_EXPRESSION */
          , loc));
        }

        continue;
      }

      const directiveTransform = context.directiveTransforms[name];

      if (directiveTransform) {
        // has built-in directive transform.
        const {
          props,
          needRuntime
        } = directiveTransform(prop, node, context);
        !ssr && props.forEach(analyzePatchFlag);
        properties.push(...props);

        if (needRuntime) {
          runtimeDirectives.push(prop);

          if (isSymbol(needRuntime)) {
            directiveImportMap.set(prop, needRuntime);
          }
        }
      } else if (!shared_esm_bundler_isBuiltInDirective(name)) {
        // no built-in transform, this is a user custom directive.
        runtimeDirectives.push(prop); // custom dirs may use beforeUpdate so they need to force blocks
        // to ensure before-update gets called before children update

        if (hasChildren) {
          shouldUseBlock = true;
        }
      }
    }
  }

  let propsExpression = undefined; // has v-bind="object" or v-on="object", wrap with mergeProps

  if (mergeArgs.length) {
    if (properties.length) {
      mergeArgs.push(createObjectExpression(dedupeProperties(properties), elementLoc));
    }

    if (mergeArgs.length > 1) {
      propsExpression = createCallExpression(context.helper(MERGE_PROPS), mergeArgs, elementLoc);
    } else {
      // single v-bind with nothing else - no need for a mergeProps call
      propsExpression = mergeArgs[0];
    }
  } else if (properties.length) {
    propsExpression = createObjectExpression(dedupeProperties(properties), elementLoc);
  } // patchFlag analysis


  if (hasDynamicKeys) {
    patchFlag |= 16
    /* FULL_PROPS */
    ;
  } else {
    if (hasClassBinding && !isComponent) {
      patchFlag |= 2
      /* CLASS */
      ;
    }

    if (hasStyleBinding && !isComponent) {
      patchFlag |= 4
      /* STYLE */
      ;
    }

    if (dynamicPropNames.length) {
      patchFlag |= 8
      /* PROPS */
      ;
    }

    if (hasHydrationEventBinding) {
      patchFlag |= 32
      /* HYDRATE_EVENTS */
      ;
    }
  }

  if (!shouldUseBlock && (patchFlag === 0 || patchFlag === 32
  /* HYDRATE_EVENTS */
  ) && (hasRef || hasVnodeHook || runtimeDirectives.length > 0)) {
    patchFlag |= 512
    /* NEED_PATCH */
    ;
  } // pre-normalize props, SSR is skipped for now


  if (!context.inSSR && propsExpression) {
    switch (propsExpression.type) {
      case 15
      /* JS_OBJECT_EXPRESSION */
      :
        // means that there is no v-bind,
        // but still need to deal with dynamic key binding
        let classKeyIndex = -1;
        let styleKeyIndex = -1;
        let hasDynamicKey = false;

        for (let i = 0; i < propsExpression.properties.length; i++) {
          const key = propsExpression.properties[i].key;

          if (isStaticExp(key)) {
            if (key.content === 'class') {
              classKeyIndex = i;
            } else if (key.content === 'style') {
              styleKeyIndex = i;
            }
          } else if (!key.isHandlerKey) {
            hasDynamicKey = true;
          }
        }

        const classProp = propsExpression.properties[classKeyIndex];
        const styleProp = propsExpression.properties[styleKeyIndex]; // no dynamic key

        if (!hasDynamicKey) {
          if (classProp && !isStaticExp(classProp.value)) {
            classProp.value = createCallExpression(context.helper(NORMALIZE_CLASS), [classProp.value]);
          }

          if (styleProp && ( // the static style is compiled into an object,
          // so use `hasStyleBinding` to ensure that it is a dynamic style binding
          hasStyleBinding || styleProp.value.type === 4
          /* SIMPLE_EXPRESSION */
          && styleProp.value.content.trim()[0] === `[` || // v-bind:style and style both exist,
          // v-bind:style with static literal object
          styleProp.value.type === 17
          /* JS_ARRAY_EXPRESSION */
          )) {
            styleProp.value = createCallExpression(context.helper(NORMALIZE_STYLE), [styleProp.value]);
          }
        } else {
          // dynamic key binding, wrap with `normalizeProps`
          propsExpression = createCallExpression(context.helper(NORMALIZE_PROPS), [propsExpression]);
        }

        break;

      case 14
      /* JS_CALL_EXPRESSION */
      :
        // mergeProps call, do nothing
        break;

      default:
        // single v-bind
        propsExpression = createCallExpression(context.helper(NORMALIZE_PROPS), [createCallExpression(context.helper(GUARD_REACTIVE_PROPS), [propsExpression])]);
        break;
    }
  }

  return {
    props: propsExpression,
    directives: runtimeDirectives,
    patchFlag,
    dynamicPropNames,
    shouldUseBlock
  };
} // Dedupe props in an object literal.
// Literal duplicated attributes would have been warned during the parse phase,
// however, it's possible to encounter duplicated `onXXX` handlers with different
// modifiers. We also need to merge static and dynamic class / style attributes.
// - onXXX handlers / style: merge into array
// - class: merge into single expression with concatenation


function dedupeProperties(properties) {
  const knownProps = new Map();
  const deduped = [];

  for (let i = 0; i < properties.length; i++) {
    const prop = properties[i]; // dynamic keys are always allowed

    if (prop.key.type === 8
    /* COMPOUND_EXPRESSION */
    || !prop.key.isStatic) {
      deduped.push(prop);
      continue;
    }

    const name = prop.key.content;
    const existing = knownProps.get(name);

    if (existing) {
      if (name === 'style' || name === 'class' || shared_esm_bundler_isOn(name)) {
        compiler_core_esm_bundler_mergeAsArray(existing, prop);
      } // unexpected duplicate, should have emitted error during parse

    } else {
      knownProps.set(name, prop);
      deduped.push(prop);
    }
  }

  return deduped;
}

function compiler_core_esm_bundler_mergeAsArray(existing, incoming) {
  if (existing.value.type === 17
  /* JS_ARRAY_EXPRESSION */
  ) {
    existing.value.elements.push(incoming.value);
  } else {
    existing.value = createArrayExpression([existing.value, incoming.value], existing.loc);
  }
}

function buildDirectiveArgs(dir, context) {
  const dirArgs = [];
  const runtime = directiveImportMap.get(dir);

  if (runtime) {
    // built-in directive with runtime
    dirArgs.push(context.helperString(runtime));
  } else {
    {
      // inject statement for resolving directive
      context.helper(RESOLVE_DIRECTIVE);
      context.directives.add(dir.name);
      dirArgs.push(toValidAssetId(dir.name, `directive`));
    }
  }

  const {
    loc
  } = dir;
  if (dir.exp) dirArgs.push(dir.exp);

  if (dir.arg) {
    if (!dir.exp) {
      dirArgs.push(`void 0`);
    }

    dirArgs.push(dir.arg);
  }

  if (Object.keys(dir.modifiers).length) {
    if (!dir.arg) {
      if (!dir.exp) {
        dirArgs.push(`void 0`);
      }

      dirArgs.push(`void 0`);
    }

    const trueExpression = createSimpleExpression(`true`, false, loc);
    dirArgs.push(createObjectExpression(dir.modifiers.map(modifier => createObjectProperty(modifier, trueExpression)), loc));
  }

  return createArrayExpression(dirArgs, dir.loc);
}

function stringifyDynamicPropNames(props) {
  let propsNamesString = `[`;

  for (let i = 0, l = props.length; i < l; i++) {
    propsNamesString += JSON.stringify(props[i]);
    if (i < l - 1) propsNamesString += ', ';
  }

  return propsNamesString + `]`;
}

function isComponentTag(tag) {
  return tag === 'component' || tag === 'Component';
}

 false ? 0 : {};
 false ? 0 : [];

const compiler_core_esm_bundler_cacheStringFunction = fn => {
  const cache = Object.create(null);
  return str => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};

const compiler_core_esm_bundler_camelizeRE = /-(\w)/g;
/**
 * @private
 */

const compiler_core_esm_bundler_camelize = compiler_core_esm_bundler_cacheStringFunction(str => {
  return str.replace(compiler_core_esm_bundler_camelizeRE, (_, c) => c ? c.toUpperCase() : '');
});

const transformSlotOutlet = (node, context) => {
  if (isSlotOutlet(node)) {
    const {
      children,
      loc
    } = node;
    const {
      slotName,
      slotProps
    } = processSlotOutlet(node, context);
    const slotArgs = [context.prefixIdentifiers ? `_ctx.$slots` : `$slots`, slotName, '{}', 'undefined', 'true'];
    let expectedLen = 2;

    if (slotProps) {
      slotArgs[2] = slotProps;
      expectedLen = 3;
    }

    if (children.length) {
      slotArgs[3] = createFunctionExpression([], children, false, false, loc);
      expectedLen = 4;
    }

    if (context.scopeId && !context.slotted) {
      expectedLen = 5;
    }

    slotArgs.splice(expectedLen); // remove unused arguments

    node.codegenNode = createCallExpression(context.helper(RENDER_SLOT), slotArgs, loc);
  }
};

function processSlotOutlet(node, context) {
  let slotName = `"default"`;
  let slotProps = undefined;
  const nonNameProps = [];

  for (let i = 0; i < node.props.length; i++) {
    const p = node.props[i];

    if (p.type === 6
    /* ATTRIBUTE */
    ) {
      if (p.value) {
        if (p.name === 'name') {
          slotName = JSON.stringify(p.value.content);
        } else {
          p.name = compiler_core_esm_bundler_camelize(p.name);
          nonNameProps.push(p);
        }
      }
    } else {
      if (p.name === 'bind' && isStaticArgOf(p.arg, 'name')) {
        if (p.exp) slotName = p.exp;
      } else {
        if (p.name === 'bind' && p.arg && isStaticExp(p.arg)) {
          p.arg.content = compiler_core_esm_bundler_camelize(p.arg.content);
        }

        nonNameProps.push(p);
      }
    }
  }

  if (nonNameProps.length > 0) {
    const {
      props,
      directives
    } = buildProps(node, context, nonNameProps, false, false);
    slotProps = props;

    if (directives.length) {
      context.onError(createCompilerError(36
      /* X_V_SLOT_UNEXPECTED_DIRECTIVE_ON_SLOT_OUTLET */
      , directives[0].loc));
    }
  }

  return {
    slotName,
    slotProps
  };
}

const fnExpRE = /^\s*([\w$_]+|(async\s*)?\([^)]*?\))\s*=>|^\s*(async\s+)?function(?:\s+[\w$]+)?\s*\(/;

const transformOn = (dir, node, context, augmentor) => {
  const {
    loc,
    modifiers,
    arg
  } = dir;

  if (!dir.exp && !modifiers.length) {
    context.onError(createCompilerError(35
    /* X_V_ON_NO_EXPRESSION */
    , loc));
  }

  let eventName;

  if (arg.type === 4
  /* SIMPLE_EXPRESSION */
  ) {
    if (arg.isStatic) {
      let rawName = arg.content; // TODO deprecate @vnodeXXX usage

      if (rawName.startsWith('vue:')) {
        rawName = `vnode-${rawName.slice(4)}`;
      } // for all event listeners, auto convert it to camelCase. See issue #2249


      eventName = createSimpleExpression(toHandlerKey(shared_esm_bundler_camelize(rawName)), true, arg.loc);
    } else {
      // #2388
      eventName = createCompoundExpression([`${context.helperString(TO_HANDLER_KEY)}(`, arg, `)`]);
    }
  } else {
    // already a compound expression.
    eventName = arg;
    eventName.children.unshift(`${context.helperString(TO_HANDLER_KEY)}(`);
    eventName.children.push(`)`);
  } // handler processing


  let exp = dir.exp;

  if (exp && !exp.content.trim()) {
    exp = undefined;
  }

  let shouldCache = context.cacheHandlers && !exp && !context.inVOnce;

  if (exp) {
    const isMemberExp = isMemberExpression(exp.content);
    const isInlineStatement = !(isMemberExp || fnExpRE.test(exp.content));
    const hasMultipleStatements = exp.content.includes(`;`);

    if (false) {}

    if (isInlineStatement || shouldCache && isMemberExp) {
      // wrap inline statement in a function expression
      exp = createCompoundExpression([`${isInlineStatement ? `$event` : `${``}(...args)`} => ${hasMultipleStatements ? `{` : `(`}`, exp, hasMultipleStatements ? `}` : `)`]);
    }
  }

  let ret = {
    props: [createObjectProperty(eventName, exp || createSimpleExpression(`() => {}`, false, loc))]
  }; // apply extended compiler augmentor

  if (augmentor) {
    ret = augmentor(ret);
  }

  if (shouldCache) {
    // cache handlers so that it's always the same handler being passed down.
    // this avoids unnecessary re-renders when users use inline handlers on
    // components.
    ret.props[0].value = context.cache(ret.props[0].value);
  } // mark the key as handler for props normalization check


  ret.props.forEach(p => p.key.isHandlerKey = true);
  return ret;
}; // v-bind without arg is handled directly in ./transformElements.ts due to it affecting
// codegen for the entire props object. This transform here is only for v-bind
// *with* args.


const transformBind = (dir, _node, context) => {
  const {
    exp,
    modifiers,
    loc
  } = dir;
  const arg = dir.arg;

  if (arg.type !== 4
  /* SIMPLE_EXPRESSION */
  ) {
    arg.children.unshift(`(`);
    arg.children.push(`) || ""`);
  } else if (!arg.isStatic) {
    arg.content = `${arg.content} || ""`;
  } // .sync is replaced by v-model:arg


  if (modifiers.includes('camel')) {
    if (arg.type === 4
    /* SIMPLE_EXPRESSION */
    ) {
      if (arg.isStatic) {
        arg.content = shared_esm_bundler_camelize(arg.content);
      } else {
        arg.content = `${context.helperString(CAMELIZE)}(${arg.content})`;
      }
    } else {
      arg.children.unshift(`${context.helperString(CAMELIZE)}(`);
      arg.children.push(`)`);
    }
  }

  if (!context.inSSR) {
    if (modifiers.includes('prop')) {
      injectPrefix(arg, '.');
    }

    if (modifiers.includes('attr')) {
      injectPrefix(arg, '^');
    }
  }

  if (!exp || exp.type === 4
  /* SIMPLE_EXPRESSION */
  && !exp.content.trim()) {
    context.onError(createCompilerError(34
    /* X_V_BIND_NO_EXPRESSION */
    , loc));
    return {
      props: [createObjectProperty(arg, createSimpleExpression('', true, loc))]
    };
  }

  return {
    props: [createObjectProperty(arg, exp)]
  };
};

const injectPrefix = (arg, prefix) => {
  if (arg.type === 4
  /* SIMPLE_EXPRESSION */
  ) {
    if (arg.isStatic) {
      arg.content = prefix + arg.content;
    } else {
      arg.content = `\`${prefix}\${${arg.content}}\``;
    }
  } else {
    arg.children.unshift(`'${prefix}' + (`);
    arg.children.push(`)`);
  }
}; // Merge adjacent text nodes and expressions into a single expression
// e.g. <div>abc {{ d }} {{ e }}</div> should have a single expression node as child.


const transformText = (node, context) => {
  if (node.type === 0
  /* ROOT */
  || node.type === 1
  /* ELEMENT */
  || node.type === 11
  /* FOR */
  || node.type === 10
  /* IF_BRANCH */
  ) {
    // perform the transform on node exit so that all expressions have already
    // been processed.
    return () => {
      const children = node.children;
      let currentContainer = undefined;
      let hasText = false;

      for (let i = 0; i < children.length; i++) {
        const child = children[i];

        if (isText(child)) {
          hasText = true;

          for (let j = i + 1; j < children.length; j++) {
            const next = children[j];

            if (isText(next)) {
              if (!currentContainer) {
                currentContainer = children[i] = createCompoundExpression([child], child.loc);
              } // merge adjacent text node into current


              currentContainer.children.push(` + `, next);
              children.splice(j, 1);
              j--;
            } else {
              currentContainer = undefined;
              break;
            }
          }
        }
      }

      if (!hasText || // if this is a plain element with a single text child, leave it
      // as-is since the runtime has dedicated fast path for this by directly
      // setting textContent of the element.
      // for component root it's always normalized anyway.
      children.length === 1 && (node.type === 0
      /* ROOT */
      || node.type === 1
      /* ELEMENT */
      && node.tagType === 0
      /* ELEMENT */
      && // #3756
      // custom directives can potentially add DOM elements arbitrarily,
      // we need to avoid setting textContent of the element at runtime
      // to avoid accidentally overwriting the DOM elements added
      // by the user through custom directives.
      !node.props.find(p => p.type === 7
      /* DIRECTIVE */
      && !context.directiveTransforms[p.name]) && // in compat mode, <template> tags with no special directives
      // will be rendered as a fragment so its children must be
      // converted into vnodes.
      !(node.tag === 'template'))) {
        return;
      } // pre-convert text nodes into createTextVNode(text) calls to avoid
      // runtime normalization.


      for (let i = 0; i < children.length; i++) {
        const child = children[i];

        if (isText(child) || child.type === 8
        /* COMPOUND_EXPRESSION */
        ) {
          const callArgs = []; // createTextVNode defaults to single whitespace, so if it is a
          // single space the code could be an empty call to save bytes.

          if (child.type !== 2
          /* TEXT */
          || child.content !== ' ') {
            callArgs.push(child);
          } // mark dynamic text with flag so it gets patched inside a block


          if (!context.ssr && getConstantType(child, context) === 0
          /* NOT_CONSTANT */
          ) {
            callArgs.push(1
            /* TEXT */
            + ( false ? 0 : ``));
          }

          children[i] = {
            type: 12
            /* TEXT_CALL */
            ,
            content: child,
            loc: child.loc,
            codegenNode: createCallExpression(context.helper(CREATE_TEXT), callArgs)
          };
        }
      }
    };
  }
};

const seen = new WeakSet();

const transformOnce = (node, context) => {
  if (node.type === 1
  /* ELEMENT */
  && findDir(node, 'once', true)) {
    if (seen.has(node) || context.inVOnce) {
      return;
    }

    seen.add(node);
    context.inVOnce = true;
    context.helper(SET_BLOCK_TRACKING);
    return () => {
      context.inVOnce = false;
      const cur = context.currentNode;

      if (cur.codegenNode) {
        cur.codegenNode = context.cache(cur.codegenNode, true
        /* isVNode */
        );
      }
    };
  }
};

const transformModel = (dir, node, context) => {
  const {
    exp,
    arg
  } = dir;

  if (!exp) {
    context.onError(createCompilerError(41
    /* X_V_MODEL_NO_EXPRESSION */
    , dir.loc));
    return createTransformProps();
  }

  const rawExp = exp.loc.source;
  const expString = exp.type === 4
  /* SIMPLE_EXPRESSION */
  ? exp.content : rawExp; // im SFC <script setup> inline mode, the exp may have been transformed into
  // _unref(exp)

  context.bindingMetadata[rawExp];
  const maybeRef = !true
  /* SETUP_CONST */
  ;

  if (!expString.trim() || !isMemberExpression(expString) && !maybeRef) {
    context.onError(createCompilerError(42
    /* X_V_MODEL_MALFORMED_EXPRESSION */
    , exp.loc));
    return createTransformProps();
  }

  const propName = arg ? arg : createSimpleExpression('modelValue', true);
  const eventName = arg ? isStaticExp(arg) ? `onUpdate:${arg.content}` : createCompoundExpression(['"onUpdate:" + ', arg]) : `onUpdate:modelValue`;
  let assignmentExp;
  const eventArg = context.isTS ? `($event: any)` : `$event`;
  {
    assignmentExp = createCompoundExpression([`${eventArg} => ((`, exp, `) = $event)`]);
  }
  const props = [// modelValue: foo
  createObjectProperty(propName, dir.exp), // "onUpdate:modelValue": $event => (foo = $event)
  createObjectProperty(eventName, assignmentExp)]; // modelModifiers: { foo: true, "bar-baz": true }

  if (dir.modifiers.length && node.tagType === 1
  /* COMPONENT */
  ) {
    const modifiers = dir.modifiers.map(m => (isSimpleIdentifier(m) ? m : JSON.stringify(m)) + `: true`).join(`, `);
    const modifiersKey = arg ? isStaticExp(arg) ? `${arg.content}Modifiers` : createCompoundExpression([arg, ' + "Modifiers"']) : `modelModifiers`;
    props.push(createObjectProperty(modifiersKey, createSimpleExpression(`{ ${modifiers} }`, false, dir.loc, 2
    /* CAN_HOIST */
    )));
  }

  return createTransformProps(props);
};

function createTransformProps(props = []) {
  return {
    props
  };
}

const validDivisionCharRE = /[\w).+\-_$\]]/;

const transformFilter = (node, context) => {
  if (!isCompatEnabled("COMPILER_FILTER"
  /* COMPILER_FILTERS */
  , context)) {
    return;
  }

  if (node.type === 5
  /* INTERPOLATION */
  ) {
    // filter rewrite is applied before expression transform so only
    // simple expressions are possible at this stage
    rewriteFilter(node.content, context);
  }

  if (node.type === 1
  /* ELEMENT */
  ) {
    node.props.forEach(prop => {
      if (prop.type === 7
      /* DIRECTIVE */
      && prop.name !== 'for' && prop.exp) {
        rewriteFilter(prop.exp, context);
      }
    });
  }
};

function rewriteFilter(node, context) {
  if (node.type === 4
  /* SIMPLE_EXPRESSION */
  ) {
    parseFilter(node, context);
  } else {
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      if (typeof child !== 'object') continue;

      if (child.type === 4
      /* SIMPLE_EXPRESSION */
      ) {
        parseFilter(child, context);
      } else if (child.type === 8
      /* COMPOUND_EXPRESSION */
      ) {
        rewriteFilter(node, context);
      } else if (child.type === 5
      /* INTERPOLATION */
      ) {
        rewriteFilter(child.content, context);
      }
    }
  }
}

function parseFilter(node, context) {
  const exp = node.content;
  let inSingle = false;
  let inDouble = false;
  let inTemplateString = false;
  let inRegex = false;
  let curly = 0;
  let square = 0;
  let paren = 0;
  let lastFilterIndex = 0;
  let c,
      prev,
      i,
      expression,
      filters = [];

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);

    if (inSingle) {
      if (c === 0x27 && prev !== 0x5c) inSingle = false;
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5c) inDouble = false;
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5c) inTemplateString = false;
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5c) inRegex = false;
    } else if (c === 0x7c && // pipe
    exp.charCodeAt(i + 1) !== 0x7c && exp.charCodeAt(i - 1) !== 0x7c && !curly && !square && !paren) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22:
          inDouble = true;
          break;
        // "

        case 0x27:
          inSingle = true;
          break;
        // '

        case 0x60:
          inTemplateString = true;
          break;
        // `

        case 0x28:
          paren++;
          break;
        // (

        case 0x29:
          paren--;
          break;
        // )

        case 0x5b:
          square++;
          break;
        // [

        case 0x5d:
          square--;
          break;
        // ]

        case 0x7b:
          curly++;
          break;
        // {

        case 0x7d:
          curly--;
          break;
        // }
      }

      if (c === 0x2f) {
        // /
        let j = i - 1;
        let p; // find first non-whitespace prev char

        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') break;
        }

        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter() {
    filters.push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters.length) {
     false && 0;

    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i], context);
    }

    node.content = expression;
  }
}

function wrapFilter(exp, filter, context) {
  context.helper(RESOLVE_FILTER);
  const i = filter.indexOf('(');

  if (i < 0) {
    context.filters.add(filter);
    return `${toValidAssetId(filter, 'filter')}(${exp})`;
  } else {
    const name = filter.slice(0, i);
    const args = filter.slice(i + 1);
    context.filters.add(name);
    return `${toValidAssetId(name, 'filter')}(${exp}${args !== ')' ? ',' + args : args}`;
  }
}

const seen$1 = new WeakSet();

const transformMemo = (node, context) => {
  if (node.type === 1
  /* ELEMENT */
  ) {
    const dir = findDir(node, 'memo');

    if (!dir || seen$1.has(node)) {
      return;
    }

    seen$1.add(node);
    return () => {
      const codegenNode = node.codegenNode || context.currentNode.codegenNode;

      if (codegenNode && codegenNode.type === 13
      /* VNODE_CALL */
      ) {
        // non-component sub tree should be turned into a block
        if (node.tagType !== 1
        /* COMPONENT */
        ) {
          makeBlock(codegenNode, context);
        }

        node.codegenNode = createCallExpression(context.helper(WITH_MEMO), [dir.exp, createFunctionExpression(undefined, codegenNode), `_cache`, String(context.cached++)]);
      }
    };
  }
};

function getBaseTransformPreset(prefixIdentifiers) {
  return [[transformOnce, transformIf, transformMemo, transformFor, ...[transformFilter], ...( false ? 0 : []), transformSlotOutlet, transformElement, trackSlotScopes, transformText], {
    on: transformOn,
    bind: transformBind,
    model: transformModel
  }];
} // we name it `baseCompile` so that higher order compilers like
// @vue/compiler-dom can export `compile` while re-exporting everything else.


function baseCompile(template, options = {}) {
  const onError = options.onError || defaultOnError;
  const isModuleMode = options.mode === 'module';
  /* istanbul ignore if */

  {
    if (options.prefixIdentifiers === true) {
      onError(createCompilerError(46
      /* X_PREFIX_ID_NOT_SUPPORTED */
      ));
    } else if (isModuleMode) {
      onError(createCompilerError(47
      /* X_MODULE_MODE_NOT_SUPPORTED */
      ));
    }
  }
  const prefixIdentifiers = !true;

  if (options.cacheHandlers) {
    onError(createCompilerError(48
    /* X_CACHE_HANDLER_NOT_SUPPORTED */
    ));
  }

  if (options.scopeId && !isModuleMode) {
    onError(createCompilerError(49
    /* X_SCOPE_ID_NOT_SUPPORTED */
    ));
  }

  const ast = shared_esm_bundler_isString(template) ? compiler_core_esm_bundler_baseParse(template, options) : template;
  const [nodeTransforms, directiveTransforms] = getBaseTransformPreset();
  transform(ast, shared_esm_bundler_extend({}, options, {
    prefixIdentifiers,
    nodeTransforms: [...nodeTransforms, ...(options.nodeTransforms || []) // user transforms
    ],
    directiveTransforms: shared_esm_bundler_extend({}, directiveTransforms, options.directiveTransforms || {} // user transforms
    )
  }));
  return generate(ast, shared_esm_bundler_extend({}, options, {
    prefixIdentifiers
  }));
}

const noopDirectiveTransform = () => ({
  props: []
});


;// CONCATENATED MODULE: ./node_modules/@vue/compiler-dom/dist/compiler-dom.esm-bundler.js




const V_MODEL_RADIO = Symbol( false ? 0 : ``);
const V_MODEL_CHECKBOX = Symbol( false ? 0 : ``);
const V_MODEL_TEXT = Symbol( false ? 0 : ``);
const V_MODEL_SELECT = Symbol( false ? 0 : ``);
const V_MODEL_DYNAMIC = Symbol( false ? 0 : ``);
const V_ON_WITH_MODIFIERS = Symbol( false ? 0 : ``);
const V_ON_WITH_KEYS = Symbol( false ? 0 : ``);
const V_SHOW = Symbol( false ? 0 : ``);
const compiler_dom_esm_bundler_TRANSITION = Symbol( false ? 0 : ``);
const TRANSITION_GROUP = Symbol( false ? 0 : ``);
registerRuntimeHelpers({
  [V_MODEL_RADIO]: `vModelRadio`,
  [V_MODEL_CHECKBOX]: `vModelCheckbox`,
  [V_MODEL_TEXT]: `vModelText`,
  [V_MODEL_SELECT]: `vModelSelect`,
  [V_MODEL_DYNAMIC]: `vModelDynamic`,
  [V_ON_WITH_MODIFIERS]: `withModifiers`,
  [V_ON_WITH_KEYS]: `withKeys`,
  [V_SHOW]: `vShow`,
  [compiler_dom_esm_bundler_TRANSITION]: `Transition`,
  [TRANSITION_GROUP]: `TransitionGroup`
});
/* eslint-disable no-restricted-globals */

let decoder;

function decodeHtmlBrowser(raw, asAttr = false) {
  if (!decoder) {
    decoder = document.createElement('div');
  }

  if (asAttr) {
    decoder.innerHTML = `<div foo="${raw.replace(/"/g, '&quot;')}">`;
    return decoder.children[0].getAttribute('foo');
  } else {
    decoder.innerHTML = raw;
    return decoder.textContent;
  }
}

const isRawTextContainer = /*#__PURE__*/shared_esm_bundler_makeMap('style,iframe,script,noscript', true);
const parserOptions = {
  isVoidTag: isVoidTag,
  isNativeTag: tag => shared_esm_bundler_isHTMLTag(tag) || shared_esm_bundler_isSVGTag(tag),
  isPreTag: tag => tag === 'pre',
  decodeEntities: decodeHtmlBrowser,
  isBuiltInComponent: tag => {
    if (isBuiltInType(tag, `Transition`)) {
      return compiler_dom_esm_bundler_TRANSITION;
    } else if (isBuiltInType(tag, `TransitionGroup`)) {
      return TRANSITION_GROUP;
    }
  },

  // https://html.spec.whatwg.org/multipage/parsing.html#tree-construction-dispatcher
  getNamespace(tag, parent) {
    let ns = parent ? parent.ns : 0
    /* HTML */
    ;

    if (parent && ns === 2
    /* MATH_ML */
    ) {
      if (parent.tag === 'annotation-xml') {
        if (tag === 'svg') {
          return 1
          /* SVG */
          ;
        }

        if (parent.props.some(a => a.type === 6
        /* ATTRIBUTE */
        && a.name === 'encoding' && a.value != null && (a.value.content === 'text/html' || a.value.content === 'application/xhtml+xml'))) {
          ns = 0
          /* HTML */
          ;
        }
      } else if (/^m(?:[ions]|text)$/.test(parent.tag) && tag !== 'mglyph' && tag !== 'malignmark') {
        ns = 0
        /* HTML */
        ;
      }
    } else if (parent && ns === 1
    /* SVG */
    ) {
      if (parent.tag === 'foreignObject' || parent.tag === 'desc' || parent.tag === 'title') {
        ns = 0
        /* HTML */
        ;
      }
    }

    if (ns === 0
    /* HTML */
    ) {
      if (tag === 'svg') {
        return 1
        /* SVG */
        ;
      }

      if (tag === 'math') {
        return 2
        /* MATH_ML */
        ;
      }
    }

    return ns;
  },

  // https://html.spec.whatwg.org/multipage/parsing.html#parsing-html-fragments
  getTextMode({
    tag,
    ns
  }) {
    if (ns === 0
    /* HTML */
    ) {
      if (tag === 'textarea' || tag === 'title') {
        return 1
        /* RCDATA */
        ;
      }

      if (isRawTextContainer(tag)) {
        return 2
        /* RAWTEXT */
        ;
      }
    }

    return 0
    /* DATA */
    ;
  }

}; // Parse inline CSS strings for static style attributes into an object.
// This is a NodeTransform since it works on the static `style` attribute and
// converts it into a dynamic equivalent:
// style="color: red" -> :style='{ "color": "red" }'
// It is then processed by `transformElement` and included in the generated
// props.

const transformStyle = node => {
  if (node.type === 1
  /* ELEMENT */
  ) {
    node.props.forEach((p, i) => {
      if (p.type === 6
      /* ATTRIBUTE */
      && p.name === 'style' && p.value) {
        // replace p with an expression node
        node.props[i] = {
          type: 7
          /* DIRECTIVE */
          ,
          name: `bind`,
          arg: createSimpleExpression(`style`, true, p.loc),
          exp: parseInlineCSS(p.value.content, p.loc),
          modifiers: [],
          loc: p.loc
        };
      }
    });
  }
};

const parseInlineCSS = (cssText, loc) => {
  const normalized = parseStringStyle(cssText);
  return createSimpleExpression(JSON.stringify(normalized), false, loc, 3
  /* CAN_STRINGIFY */
  );
};

function createDOMCompilerError(code, loc) {
  return createCompilerError(code, loc,  false ? 0 : undefined);
}

const DOMErrorMessages = {
  [50
  /* X_V_HTML_NO_EXPRESSION */
  ]: `v-html is missing expression.`,
  [51
  /* X_V_HTML_WITH_CHILDREN */
  ]: `v-html will override element children.`,
  [52
  /* X_V_TEXT_NO_EXPRESSION */
  ]: `v-text is missing expression.`,
  [53
  /* X_V_TEXT_WITH_CHILDREN */
  ]: `v-text will override element children.`,
  [54
  /* X_V_MODEL_ON_INVALID_ELEMENT */
  ]: `v-model can only be used on <input>, <textarea> and <select> elements.`,
  [55
  /* X_V_MODEL_ARG_ON_ELEMENT */
  ]: `v-model argument is not supported on plain elements.`,
  [56
  /* X_V_MODEL_ON_FILE_INPUT_ELEMENT */
  ]: `v-model cannot be used on file inputs since they are read-only. Use a v-on:change listener instead.`,
  [57
  /* X_V_MODEL_UNNECESSARY_VALUE */
  ]: `Unnecessary value binding used alongside v-model. It will interfere with v-model's behavior.`,
  [58
  /* X_V_SHOW_NO_EXPRESSION */
  ]: `v-show is missing expression.`,
  [59
  /* X_TRANSITION_INVALID_CHILDREN */
  ]: `<Transition> expects exactly one child element or component.`,
  [60
  /* X_IGNORED_SIDE_EFFECT_TAG */
  ]: `Tags with side effect (<script> and <style>) are ignored in client component templates.`
};

const transformVHtml = (dir, node, context) => {
  const {
    exp,
    loc
  } = dir;

  if (!exp) {
    context.onError(createDOMCompilerError(50
    /* X_V_HTML_NO_EXPRESSION */
    , loc));
  }

  if (node.children.length) {
    context.onError(createDOMCompilerError(51
    /* X_V_HTML_WITH_CHILDREN */
    , loc));
    node.children.length = 0;
  }

  return {
    props: [createObjectProperty(createSimpleExpression(`innerHTML`, true, loc), exp || createSimpleExpression('', true))]
  };
};

const transformVText = (dir, node, context) => {
  const {
    exp,
    loc
  } = dir;

  if (!exp) {
    context.onError(createDOMCompilerError(52
    /* X_V_TEXT_NO_EXPRESSION */
    , loc));
  }

  if (node.children.length) {
    context.onError(createDOMCompilerError(53
    /* X_V_TEXT_WITH_CHILDREN */
    , loc));
    node.children.length = 0;
  }

  return {
    props: [createObjectProperty(createSimpleExpression(`textContent`, true), exp ? getConstantType(exp, context) > 0 ? exp : createCallExpression(context.helperString(TO_DISPLAY_STRING), [exp], loc) : createSimpleExpression('', true))]
  };
};

const compiler_dom_esm_bundler_transformModel = (dir, node, context) => {
  const baseResult = transformModel(dir, node, context); // base transform has errors OR component v-model (only need props)

  if (!baseResult.props.length || node.tagType === 1
  /* COMPONENT */
  ) {
    return baseResult;
  }

  if (dir.arg) {
    context.onError(createDOMCompilerError(55
    /* X_V_MODEL_ARG_ON_ELEMENT */
    , dir.arg.loc));
  }

  function checkDuplicatedValue() {
    const value = findProp(node, 'value');

    if (value) {
      context.onError(createDOMCompilerError(57
      /* X_V_MODEL_UNNECESSARY_VALUE */
      , value.loc));
    }
  }

  const {
    tag
  } = node;
  const isCustomElement = context.isCustomElement(tag);

  if (tag === 'input' || tag === 'textarea' || tag === 'select' || isCustomElement) {
    let directiveToUse = V_MODEL_TEXT;
    let isInvalidType = false;

    if (tag === 'input' || isCustomElement) {
      const type = findProp(node, `type`);

      if (type) {
        if (type.type === 7
        /* DIRECTIVE */
        ) {
          // :type="foo"
          directiveToUse = V_MODEL_DYNAMIC;
        } else if (type.value) {
          switch (type.value.content) {
            case 'radio':
              directiveToUse = V_MODEL_RADIO;
              break;

            case 'checkbox':
              directiveToUse = V_MODEL_CHECKBOX;
              break;

            case 'file':
              isInvalidType = true;
              context.onError(createDOMCompilerError(56
              /* X_V_MODEL_ON_FILE_INPUT_ELEMENT */
              , dir.loc));
              break;

            default:
              // text type
               false && 0;
              break;
          }
        }
      } else if (hasDynamicKeyVBind(node)) {
        // element has bindings with dynamic keys, which can possibly contain
        // "type".
        directiveToUse = V_MODEL_DYNAMIC;
      } else {
        // text type
         false && 0;
      }
    } else if (tag === 'select') {
      directiveToUse = V_MODEL_SELECT;
    } else {
      // textarea
       false && 0;
    } // inject runtime directive
    // by returning the helper symbol via needRuntime
    // the import will replaced a resolveDirective call.


    if (!isInvalidType) {
      baseResult.needRuntime = context.helper(directiveToUse);
    }
  } else {
    context.onError(createDOMCompilerError(54
    /* X_V_MODEL_ON_INVALID_ELEMENT */
    , dir.loc));
  } // native vmodel doesn't need the `modelValue` props since they are also
  // passed to the runtime as `binding.value`. removing it reduces code size.


  baseResult.props = baseResult.props.filter(p => !(p.key.type === 4
  /* SIMPLE_EXPRESSION */
  && p.key.content === 'modelValue'));
  return baseResult;
};

const isEventOptionModifier = /*#__PURE__*/shared_esm_bundler_makeMap(`passive,once,capture`);
const isNonKeyModifier = /*#__PURE__*/shared_esm_bundler_makeMap( // event propagation management
`stop,prevent,self,` + // system modifiers + exact
`ctrl,shift,alt,meta,exact,` + // mouse
`middle`); // left & right could be mouse or key modifiers based on event type

const maybeKeyModifier = /*#__PURE__*/shared_esm_bundler_makeMap('left,right');
const isKeyboardEvent = /*#__PURE__*/shared_esm_bundler_makeMap(`onkeyup,onkeydown,onkeypress`, true);

const resolveModifiers = (key, modifiers, context, loc) => {
  const keyModifiers = [];
  const nonKeyModifiers = [];
  const eventOptionModifiers = [];

  for (let i = 0; i < modifiers.length; i++) {
    const modifier = modifiers[i];

    if (modifier === 'native' && checkCompatEnabled("COMPILER_V_ON_NATIVE"
    /* COMPILER_V_ON_NATIVE */
    , context, loc)) {
      eventOptionModifiers.push(modifier);
    } else if (isEventOptionModifier(modifier)) {
      // eventOptionModifiers: modifiers for addEventListener() options,
      // e.g. .passive & .capture
      eventOptionModifiers.push(modifier);
    } else {
      // runtimeModifiers: modifiers that needs runtime guards
      if (maybeKeyModifier(modifier)) {
        if (isStaticExp(key)) {
          if (isKeyboardEvent(key.content)) {
            keyModifiers.push(modifier);
          } else {
            nonKeyModifiers.push(modifier);
          }
        } else {
          keyModifiers.push(modifier);
          nonKeyModifiers.push(modifier);
        }
      } else {
        if (isNonKeyModifier(modifier)) {
          nonKeyModifiers.push(modifier);
        } else {
          keyModifiers.push(modifier);
        }
      }
    }
  }

  return {
    keyModifiers,
    nonKeyModifiers,
    eventOptionModifiers
  };
};

const transformClick = (key, event) => {
  const isStaticClick = isStaticExp(key) && key.content.toLowerCase() === 'onclick';
  return isStaticClick ? createSimpleExpression(event, true) : key.type !== 4
  /* SIMPLE_EXPRESSION */
  ? createCompoundExpression([`(`, key, `) === "onClick" ? "${event}" : (`, key, `)`]) : key;
};

const compiler_dom_esm_bundler_transformOn = (dir, node, context) => {
  return transformOn(dir, node, context, baseResult => {
    const {
      modifiers
    } = dir;
    if (!modifiers.length) return baseResult;
    let {
      key,
      value: handlerExp
    } = baseResult.props[0];
    const {
      keyModifiers,
      nonKeyModifiers,
      eventOptionModifiers
    } = resolveModifiers(key, modifiers, context, dir.loc); // normalize click.right and click.middle since they don't actually fire

    if (nonKeyModifiers.includes('right')) {
      key = transformClick(key, `onContextmenu`);
    }

    if (nonKeyModifiers.includes('middle')) {
      key = transformClick(key, `onMouseup`);
    }

    if (nonKeyModifiers.length) {
      handlerExp = createCallExpression(context.helper(V_ON_WITH_MODIFIERS), [handlerExp, JSON.stringify(nonKeyModifiers)]);
    }

    if (keyModifiers.length && ( // if event name is dynamic, always wrap with keys guard
    !isStaticExp(key) || isKeyboardEvent(key.content))) {
      handlerExp = createCallExpression(context.helper(V_ON_WITH_KEYS), [handlerExp, JSON.stringify(keyModifiers)]);
    }

    if (eventOptionModifiers.length) {
      const modifierPostfix = eventOptionModifiers.map(shared_esm_bundler_capitalize).join('');
      key = isStaticExp(key) ? createSimpleExpression(`${key.content}${modifierPostfix}`, true) : createCompoundExpression([`(`, key, `) + "${modifierPostfix}"`]);
    }

    return {
      props: [createObjectProperty(key, handlerExp)]
    };
  });
};

const transformShow = (dir, node, context) => {
  const {
    exp,
    loc
  } = dir;

  if (!exp) {
    context.onError(createDOMCompilerError(58
    /* X_V_SHOW_NO_EXPRESSION */
    , loc));
  }

  return {
    props: [],
    needRuntime: context.helper(V_SHOW)
  };
};

const transformTransition = (node, context) => {
  if (node.type === 1
  /* ELEMENT */
  && node.tagType === 1
  /* COMPONENT */
  ) {
    const component = context.isBuiltInComponent(node.tag);

    if (component === compiler_dom_esm_bundler_TRANSITION) {
      return () => {
        if (!node.children.length) {
          return;
        } // warn multiple transition children


        if (hasMultipleChildren(node)) {
          context.onError(createDOMCompilerError(59
          /* X_TRANSITION_INVALID_CHILDREN */
          , {
            start: node.children[0].loc.start,
            end: node.children[node.children.length - 1].loc.end,
            source: ''
          }));
        } // check if it's s single child w/ v-show
        // if yes, inject "persisted: true" to the transition props


        const child = node.children[0];

        if (child.type === 1
        /* ELEMENT */
        ) {
          for (const p of child.props) {
            if (p.type === 7
            /* DIRECTIVE */
            && p.name === 'show') {
              node.props.push({
                type: 6
                /* ATTRIBUTE */
                ,
                name: 'persisted',
                value: undefined,
                loc: node.loc
              });
            }
          }
        }
      };
    }
  }
};

function hasMultipleChildren(node) {
  // #1352 filter out potential comment nodes.
  const children = node.children = node.children.filter(c => c.type !== 3
  /* COMMENT */
  && !(c.type === 2
  /* TEXT */
  && !c.content.trim()));
  const child = children[0];
  return children.length !== 1 || child.type === 11
  /* FOR */
  || child.type === 9
  /* IF */
  && child.branches.some(hasMultipleChildren);
}

const ignoreSideEffectTags = (node, context) => {
  if (node.type === 1
  /* ELEMENT */
  && node.tagType === 0
  /* ELEMENT */
  && (node.tag === 'script' || node.tag === 'style')) {
    context.onError(createDOMCompilerError(60
    /* X_IGNORED_SIDE_EFFECT_TAG */
    , node.loc));
    context.removeNode();
  }
};

const DOMNodeTransforms = [transformStyle, ...( false ? 0 : [])];
const DOMDirectiveTransforms = {
  cloak: noopDirectiveTransform,
  html: transformVHtml,
  text: transformVText,
  model: compiler_dom_esm_bundler_transformModel,
  on: compiler_dom_esm_bundler_transformOn,
  show: transformShow
};

function compiler_dom_esm_bundler_compile(template, options = {}) {
  return baseCompile(template, shared_esm_bundler_extend({}, parserOptions, options, {
    nodeTransforms: [// ignore <script> and <tag>
    // this is not put inside DOMNodeTransforms because that list is used
    // by compiler-ssr to generate vnode fallback branches
    ignoreSideEffectTags, ...DOMNodeTransforms, ...(options.nodeTransforms || [])],
    directiveTransforms: shared_esm_bundler_extend({}, DOMDirectiveTransforms, options.directiveTransforms || {}),
    transformHoist: null
  }));
}

function parse(template, options = {}) {
  return baseParse(template, extend({}, parserOptions, options));
}


;// CONCATENATED MODULE: ./node_modules/vue/dist/vue.esm-bundler.js






function initDev() {
  {
    initCustomFormatter();
  }
} // This entry is the "full-build" that includes both the runtime


if (false) {}

const compileCache = Object.create(null);

function compileToFunction(template, options) {
  if (!shared_esm_bundler_isString(template)) {
    if (template.nodeType) {
      template = template.innerHTML;
    } else {
       false && 0;
      return shared_esm_bundler_NOOP;
    }
  }

  const key = template;
  const cached = compileCache[key];

  if (cached) {
    return cached;
  }

  if (template[0] === '#') {
    const el = document.querySelector(template);

    if (false) {} // __UNSAFE__
    // Reason: potential execution of JS expressions in in-DOM template.
    // The user must make sure the in-DOM template is trusted. If it's rendered
    // by the server, the template should not contain any user data.


    template = el ? el.innerHTML : ``;
  }

  const {
    code
  } = compiler_dom_esm_bundler_compile(template, shared_esm_bundler_extend({
    hoistStatic: true,
    onError:  false ? 0 : undefined,
    onWarn:  false ? 0 : shared_esm_bundler_NOOP
  }, options));

  function onError(err, asWarning = false) {
    const message = asWarning ? err.message : `Template compilation error: ${err.message}`;
    const codeFrame = err.loc && generateCodeFrame(template, err.loc.start.offset, err.loc.end.offset);
    runtime_core_esm_bundler_warn(codeFrame ? `${message}\n${codeFrame}` : message);
  } // The wildcard import results in a huge object with every export
  // with keys that cannot be mangled, and can be quite heavy size-wise.
  // In the global build we know `Vue` is available globally so we can avoid
  // the wildcard object.


  const render = new Function('Vue', code)(runtime_dom_esm_bundler_namespaceObject);
  render._rc = true;
  return compileCache[key] = render;
}

registerRuntimeCompiler(compileToFunction);

;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/_util/css-animation/Event.js
var START_EVENT_NAME_MAP = {
  transitionstart: {
    transition: 'transitionstart',
    WebkitTransition: 'webkitTransitionStart',
    MozTransition: 'mozTransitionStart',
    OTransition: 'oTransitionStart',
    msTransition: 'MSTransitionStart'
  },
  animationstart: {
    animation: 'animationstart',
    WebkitAnimation: 'webkitAnimationStart',
    MozAnimation: 'mozAnimationStart',
    OAnimation: 'oAnimationStart',
    msAnimation: 'MSAnimationStart'
  }
};
var END_EVENT_NAME_MAP = {
  transitionend: {
    transition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'mozTransitionEnd',
    OTransition: 'oTransitionEnd',
    msTransition: 'MSTransitionEnd'
  },
  animationend: {
    animation: 'animationend',
    WebkitAnimation: 'webkitAnimationEnd',
    MozAnimation: 'mozAnimationEnd',
    OAnimation: 'oAnimationEnd',
    msAnimation: 'MSAnimationEnd'
  }
};
var startEvents = [];
var endEvents = [];

function detectEvents() {
  var testEl = document.createElement('div');
  var style = testEl.style;

  if (!('AnimationEvent' in window)) {
    delete START_EVENT_NAME_MAP.animationstart.animation;
    delete END_EVENT_NAME_MAP.animationend.animation;
  }

  if (!('TransitionEvent' in window)) {
    delete START_EVENT_NAME_MAP.transitionstart.transition;
    delete END_EVENT_NAME_MAP.transitionend.transition;
  }

  function process(EVENT_NAME_MAP, events) {
    for (var baseEventName in EVENT_NAME_MAP) {
      if (EVENT_NAME_MAP.hasOwnProperty(baseEventName)) {
        var baseEvents = EVENT_NAME_MAP[baseEventName];

        for (var styleName in baseEvents) {
          if (styleName in style) {
            events.push(baseEvents[styleName]);
            break;
          }
        }
      }
    }
  }

  process(START_EVENT_NAME_MAP, startEvents);
  process(END_EVENT_NAME_MAP, endEvents);
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  detectEvents();
}

function Event_addEventListener(node, eventName, eventListener) {
  node.addEventListener(eventName, eventListener, false);
}

function Event_removeEventListener(node, eventName, eventListener) {
  node.removeEventListener(eventName, eventListener, false);
}

var TransitionEvents = {
  // Start events
  startEvents: startEvents,
  addStartEventListener: function addStartEventListener(node, eventListener) {
    if (startEvents.length === 0) {
      setTimeout(eventListener, 0);
      return;
    }

    startEvents.forEach(function (startEvent) {
      Event_addEventListener(node, startEvent, eventListener);
    });
  },
  removeStartEventListener: function removeStartEventListener(node, eventListener) {
    if (startEvents.length === 0) {
      return;
    }

    startEvents.forEach(function (startEvent) {
      Event_removeEventListener(node, startEvent, eventListener);
    });
  },
  // End events
  endEvents: endEvents,
  addEndEventListener: function addEndEventListener(node, eventListener) {
    if (endEvents.length === 0) {
      setTimeout(eventListener, 0);
      return;
    }

    endEvents.forEach(function (endEvent) {
      Event_addEventListener(node, endEvent, eventListener);
    });
  },
  removeEndEventListener: function removeEndEventListener(node, eventListener) {
    if (endEvents.length === 0) {
      return;
    }

    endEvents.forEach(function (endEvent) {
      Event_removeEventListener(node, endEvent, eventListener);
    });
  }
};
/* harmony default export */ var css_animation_Event = (TransitionEvents);
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/_util/raf.js
var raf = function raf(callback) {
  return setTimeout(callback, 16);
};

var caf = function caf(num) {
  return clearTimeout(num);
};

if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
  raf = function raf(callback) {
    return window.requestAnimationFrame(callback);
  };

  caf = function caf(handle) {
    return window.cancelAnimationFrame(handle);
  };
}

var rafUUID = 0;
var rafIds = new Map();

function cleanup(id) {
  rafIds.delete(id);
}

function wrapperRaf(callback) {
  var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  rafUUID += 1;
  var id = rafUUID;

  function callRef(leftTimes) {
    if (leftTimes === 0) {
      // Clean up
      cleanup(id); // Trigger

      callback();
    } else {
      // Next raf
      var realId = raf(function () {
        callRef(leftTimes - 1);
      }); // Bind real raf id

      rafIds.set(id, realId);
    }
  }

  callRef(times);
  return id;
}

wrapperRaf.cancel = function (id) {
  var realId = rafIds.get(id);
  cleanup(realId);
  return caf(realId);
};
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function slicedToArray_slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/_util/isValid.js
var isValid = function isValid(value) {
  return value !== undefined && value !== null && value !== '';
};

/* harmony default export */ var _util_isValid = (isValid);
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/_util/props-util/index.js






var _this = undefined;






 // function getType(fn) {
//   const match = fn && fn.toString().match(/^\s*function (\w+)/);
//   return match ? match[1] : '';
// }

var splitAttrs = function splitAttrs(attrs) {
  var allAttrs = Object.keys(attrs);
  var eventAttrs = {};
  var onEvents = {};
  var extraAttrs = {};

  for (var i = 0, l = allAttrs.length; i < l; i++) {
    var key = allAttrs[i];

    if (isOn(key)) {
      eventAttrs[key[2].toLowerCase() + key.slice(3)] = attrs[key];
      onEvents[key] = attrs[key];
    } else {
      extraAttrs[key] = attrs[key];
    }
  }

  return {
    onEvents: onEvents,
    events: eventAttrs,
    extraAttrs: extraAttrs
  };
};

var parseStyleText = function parseStyleText() {
  var cssText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var camel = arguments.length > 1 ? arguments[1] : undefined;
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  if (_typeof(cssText) === 'object') return cssText;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);

      if (tmp.length > 1) {
        var k = camel ? camelize(tmp[0].trim()) : tmp[0].trim();
        res[k] = tmp[1].trim();
      }
    }
  });
  return res;
};

var hasProp = function hasProp(instance, prop) {
  return instance[prop] !== undefined;
}; // 重构后直接使用 hasProp 替换


var slotHasProp = function slotHasProp(slot, prop) {
  return hasProp(slot, prop);
};

var getScopedSlots = function getScopedSlots(ele) {
  return ele.data && ele.data.scopedSlots || {};
};

var getSlots = function getSlots(ele) {
  var componentOptions = ele.componentOptions || {};

  if (ele.$vnode) {
    componentOptions = ele.$vnode.componentOptions || {};
  }

  var children = ele.children || componentOptions.children || [];
  var slots = {};
  children.forEach(function (child) {
    if (!isEmptyElement(child)) {
      var name = child.data && child.data.slot || 'default';
      slots[name] = slots[name] || [];
      slots[name].push(child);
    }
  });
  return _extends(_extends({}, slots), getScopedSlots(ele));
};

var flattenChildren = function flattenChildren() {
  var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var filterEmpty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var temp = Array.isArray(children) ? children : [children];
  var res = [];
  temp.forEach(function (child) {
    if (Array.isArray(child)) {
      res.push.apply(res, _toConsumableArray(flattenChildren(child, filterEmpty)));
    } else if (child && child.type === runtime_core_esm_bundler_Fragment) {
      res.push.apply(res, _toConsumableArray(flattenChildren(child.children, filterEmpty)));
    } else if (child && runtime_core_esm_bundler_isVNode(child)) {
      if (filterEmpty && !isEmptyElement(child)) {
        res.push(child);
      } else if (!filterEmpty) {
        res.push(child);
      }
    } else if (_util_isValid(child)) {
      res.push(child);
    }
  });
  return res;
};

var getSlot = function getSlot(self) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'default';
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (isVNode(self)) {
    if (self.type === Fragment) {
      return name === 'default' ? flattenChildren(self.children) : [];
    } else if (self.children && self.children[name]) {
      return flattenChildren(self.children[name](options));
    } else {
      return [];
    }
  } else {
    var res = self.$slots[name] && self.$slots[name](options);
    return flattenChildren(res);
  }
};

var getAllChildren = function getAllChildren(ele) {
  var componentOptions = ele.componentOptions || {};

  if (ele.$vnode) {
    componentOptions = ele.$vnode.componentOptions || {};
  }

  return ele.children || componentOptions.children || [];
};

var getSlotOptions = function getSlotOptions() {
  throw Error('使用 .type 直接取值');
};

var findDOMNode = function findDOMNode(instance) {
  var _a;

  var node = ((_a = instance === null || instance === void 0 ? void 0 : instance.vnode) === null || _a === void 0 ? void 0 : _a.el) || instance && (instance.$el || instance);

  while (node && !node.tagName) {
    node = node.nextSibling;
  }

  return node;
};

var getOptionProps = function getOptionProps(instance) {
  var res = {};

  if (instance.$ && instance.$.vnode) {
    var props = instance.$.vnode.props || {};
    Object.keys(instance.$props).forEach(function (k) {
      var v = instance.$props[k];
      var hyphenateKey = hyphenate(k);

      if (v !== undefined || hyphenateKey in props) {
        res[k] = v; // 直接取 $props[k]
      }
    });
  } else if (isVNode(instance) && _typeof(instance.type) === 'object') {
    var originProps = instance.props || {};
    var _props = {};
    Object.keys(originProps).forEach(function (key) {
      _props[camelize(key)] = originProps[key];
    });
    var options = instance.type.props || {};
    Object.keys(options).forEach(function (k) {
      var v = resolvePropValue(options, _props, k, _props[k]);

      if (v !== undefined || k in _props) {
        res[k] = v;
      }
    });
  }

  return res;
};

var getComponent = function getComponent(instance) {
  var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'default';
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : instance;
  var execute = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var com = undefined;

  if (instance.$) {
    var temp = instance[prop];

    if (temp !== undefined) {
      return typeof temp === 'function' && execute ? temp(options) : temp;
    } else {
      com = instance.$slots[prop];
      com = execute && com ? com(options) : com;
    }
  } else if (isVNode(instance)) {
    var _temp = instance.props && instance.props[prop];

    if (_temp !== undefined && instance.props !== null) {
      return typeof _temp === 'function' && execute ? _temp(options) : _temp;
    } else if (instance.type === Fragment) {
      com = instance.children;
    } else if (instance.children && instance.children[prop]) {
      com = instance.children[prop];
      com = execute && com ? com(options) : com;
    }
  }

  if (Array.isArray(com)) {
    com = flattenChildren(com);
    com = com.length === 1 ? com[0] : com;
    com = com.length === 0 ? undefined : com;
  }

  return com;
};

var getComponentFromProp = function getComponentFromProp(instance, prop) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : instance;
  var execute = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

  if (instance.$createElement) {
    // const h = instance.$createElement;
    var temp = instance[prop];

    if (temp !== undefined) {
      return typeof temp === 'function' && execute ? temp(h, options) : temp;
    }

    return instance.$scopedSlots[prop] && execute && instance.$scopedSlots[prop](options) || instance.$scopedSlots[prop] || instance.$slots[prop] || undefined;
  } else {
    // const h = instance.context.$createElement;
    var _temp2 = getPropsData(instance)[prop];

    if (_temp2 !== undefined) {
      return typeof _temp2 === 'function' && execute ? _temp2(h, options) : _temp2;
    }

    var slotScope = getScopedSlots(instance)[prop];

    if (slotScope !== undefined) {
      return typeof slotScope === 'function' && execute ? slotScope(h, options) : slotScope;
    }

    var slotsProp = [];
    var componentOptions = instance.componentOptions || {};
    (componentOptions.children || []).forEach(function (child) {
      if (child.data && child.data.slot === prop) {
        if (child.data.attrs) {
          delete child.data.attrs.slot;
        }

        if (child.tag === 'template') {
          slotsProp.push(child.children);
        } else {
          slotsProp.push(child);
        }
      }
    });
    return slotsProp.length ? slotsProp : undefined;
  }
};

var getAllProps = function getAllProps(ele) {
  var props = getOptionProps(ele);

  if (ele.$) {
    props = _extends(_extends({}, props), _this.$attrs);
  } else {
    props = _extends(_extends({}, ele.props), props);
  }

  return props;
};

var getPropsData = function getPropsData(ins) {
  var vnode = ins.$ ? ins.$ : ins;
  var res = {};
  var originProps = vnode.props || {};
  var props = {};
  Object.keys(originProps).forEach(function (key) {
    props[camelize(key)] = originProps[key];
  });
  var options = isPlainObject(vnode.type) ? vnode.type.props : {};
  options && Object.keys(options).forEach(function (k) {
    var v = resolvePropValue(options, props, k, props[k]);

    if (k in props) {
      // 仅包含 props，不包含默认值
      res[k] = v;
    }
  });
  return _extends(_extends({}, props), res); // 合并事件、未声明属性等
};

var getValueByProp = function getValueByProp(ele, prop) {
  return getPropsData(ele)[prop];
};

var getAttrs = function getAttrs(ele) {
  var data = ele.data;

  if (ele.$vnode) {
    data = ele.$vnode.data;
  }

  return data ? data.attrs || {} : {};
};

var getKey = function getKey(ele) {
  var key = ele.key;
  return key;
};

function getEvents() {
  var ele = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var on = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var props = {};

  if (ele.$) {
    props = _extends(_extends({}, props), ele.$attrs);
  } else {
    props = _extends(_extends({}, props), ele.props);
  }

  return splitAttrs(props)[on ? 'onEvents' : 'events'];
}
function getEvent(child, event) {
  return child.props && child.props[event];
} // 获取 xxx.native 或者 原生标签 事件

function getDataEvents(child) {
  var events = {};

  if (child.data && child.data.on) {
    events = child.data.on;
  }

  return _extends({}, events);
} // use getListeners instead this.$listeners
// https://github.com/vueComponent/ant-design-vue/issues/1705

function getListeners(context) {
  return (context.$vnode ? context.$vnode.componentOptions.listeners : context.$listeners) || {};
}
function getClass(ele) {
  var props = (isVNode(ele) ? ele.props : ele.$attrs) || {};
  var tempCls = props.class || {};
  var cls = {};

  if (typeof tempCls === 'string') {
    tempCls.split(' ').forEach(function (c) {
      cls[c.trim()] = true;
    });
  } else if (Array.isArray(tempCls)) {
    classNames(tempCls).split(' ').forEach(function (c) {
      cls[c.trim()] = true;
    });
  } else {
    cls = _extends(_extends({}, cls), tempCls);
  }

  return cls;
}
function getStyle(ele, camel) {
  var props = (isVNode(ele) ? ele.props : ele.$attrs) || {};
  var style = props.style || {};

  if (typeof style === 'string') {
    style = parseStyleText(style, camel);
  } else if (camel && style) {
    // 驼峰化
    var res = {};
    Object.keys(style).forEach(function (k) {
      return res[camelize(k)] = style[k];
    });
    return res;
  }

  return style;
}
function props_util_getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}
function isFragment(c) {
  return c.length === 1 && c[0].type === Fragment;
}
function isEmptyContent(c) {
  return c === undefined || c === null || c === '' || Array.isArray(c) && c.length === 0;
}
function isEmptyElement(c) {
  return c && (c.type === Comment || c.type === runtime_core_esm_bundler_Fragment && c.children.length === 0 || c.type === runtime_core_esm_bundler_Text && c.children.trim() === '');
}
function isEmptySlot(c) {
  return !c || c().every(isEmptyElement);
}
function isStringElement(c) {
  return c && c.type === Text;
}
function filterEmpty() {
  var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var res = [];
  children.forEach(function (child) {
    if (Array.isArray(child)) {
      res.push.apply(res, _toConsumableArray(child));
    } else if (child.type === runtime_core_esm_bundler_Fragment) {
      res.push.apply(res, _toConsumableArray(child.children));
    } else {
      res.push(child);
    }
  });
  return res.filter(function (c) {
    return !isEmptyElement(c);
  });
}
function filterEmptyWithUndefined(children) {
  if (children) {
    var coms = filterEmpty(children);
    return coms.length ? coms : undefined;
  } else {
    return children;
  }
}
function props_util_mergeProps() {
  var args = [].slice.call(arguments, 0);
  var props = {};
  args.forEach(function () {
    var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    for (var _i = 0, _Object$entries = Object.entries(p); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          k = _Object$entries$_i[0],
          v = _Object$entries$_i[1];

      props[k] = props[k] || {};

      if (isPlainObject(v)) {
        _extends(props[k], v);
      } else {
        props[k] = v;
      }
    }
  });
  return props;
}

function isValidElement(element) {
  if (Array.isArray(element) && element.length === 1) {
    element = element[0];
  }

  return element && element.__v_isVNode && _typeof(element.type) !== 'symbol'; // remove text node
}

function getPropsSlot(slots, props) {
  var prop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'default';

  var _a, _b;

  return (_a = props[prop]) !== null && _a !== void 0 ? _a : (_b = slots[prop]) === null || _b === void 0 ? void 0 : _b.call(slots);
}

var getTextFromElement = function getTextFromElement(ele) {
  if (isValidElement(ele) && isStringElement(ele[0])) {
    return ele[0].children;
  }

  return ele;
};

/* harmony default export */ var props_util = ((/* unused pure expression or super */ null && (hasProp)));
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/_util/util.js

var util_isFunction = function isFunction(val) {
  return typeof val === 'function';
};
var controlDefaultValue = Symbol('controlDefaultValue');
var util_isArray = Array.isArray;
var util_isString = function isString(val) {
  return typeof val === 'string';
};
var util_isSymbol = function isSymbol(val) {
  return _typeof(val) === 'symbol';
};
var util_isObject = function isObject(val) {
  return val !== null && typeof_typeof(val) === 'object';
};
var util_onRE = /^on[^a-z]/;

var util_isOn = function isOn(key) {
  return util_onRE.test(key);
};

var util_cacheStringFunction = function cacheStringFunction(fn) {
  var cache = Object.create(null);
  return function (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};

var util_camelizeRE = /-(\w)/g;
var util_camelize = util_cacheStringFunction(function (str) {
  return str.replace(util_camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
var util_hyphenateRE = /\B([A-Z])/g;
var util_hyphenate = util_cacheStringFunction(function (str) {
  return str.replace(util_hyphenateRE, '-$1').toLowerCase();
});
var util_capitalize = util_cacheStringFunction(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
var util_hasOwnProperty = Object.prototype.hasOwnProperty;

var util_hasOwn = function hasOwn(val, key) {
  return util_hasOwnProperty.call(val, key);
}; // change from vue sourcecode


function util_resolvePropValue(options, props, key, value) {
  var opt = options[key];

  if (opt != null) {
    var hasDefault = util_hasOwn(opt, 'default'); // default values

    if (hasDefault && value === undefined) {
      var defaultValue = opt.default;
      value = opt.type !== Function && util_isFunction(defaultValue) ? defaultValue() : defaultValue;
    } // boolean casting


    if (opt.type === Boolean) {
      if (!util_hasOwn(props, key) && !hasDefault) {
        value = false;
      } else if (value === '') {
        value = true;
      }
    }
  }

  return value;
}

function getDataAndAriaProps(props) {
  return Object.keys(props).reduce(function (memo, key) {
    if (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-') {
      memo[key] = props[key];
    }

    return memo;
  }, {});
}
function toPx(val) {
  if (typeof val === 'number') return "".concat(val, "px");
  return val;
}
function renderHelper(v) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var defaultV = arguments.length > 2 ? arguments[2] : undefined;

  if (typeof v === 'function') {
    return v(props);
  }

  return v !== null && v !== void 0 ? v : defaultV;
}

;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/_util/classNames.js


function classNames_classNames() {
  var classes = [];

  for (var i = 0; i < arguments.length; i++) {
    var value = i < 0 || arguments.length <= i ? undefined : arguments[i];
    if (!value) continue;

    if (util_isString(value)) {
      classes.push(value);
    } else if (util_isArray(value)) {
      for (var _i = 0; _i < value.length; _i++) {
        var inner = classNames_classNames(value[_i]);

        if (inner) {
          classes.push(inner);
        }
      }
    } else if (util_isObject(value)) {
      for (var name in value) {
        if (value[name]) {
          classes.push(name);
        }
      }
    }
  }

  return classes.join(' ');
}

/* harmony default export */ var _util_classNames = (classNames_classNames);
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-pagination/locale/en_US.js
/* harmony default export */ var en_US = ({
  // Options.jsx
  items_per_page: '/ page',
  jump_to: 'Go to',
  jump_to_confirm: 'confirm',
  page: '',
  // Pagination.jsx
  prev_page: 'Previous Page',
  next_page: 'Next Page',
  prev_5: 'Previous 5 Pages',
  next_5: 'Next 5 Pages',
  prev_3: 'Previous 3 Pages',
  next_3: 'Next 3 Pages'
});
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-picker/locale/en_US.js
var locale = {
  locale: 'en_US',
  today: 'Today',
  now: 'Now',
  backToToday: 'Back to today',
  ok: 'Ok',
  clear: 'Clear',
  month: 'Month',
  year: 'Year',
  timeSelect: 'select time',
  dateSelect: 'select date',
  weekSelect: 'Choose a week',
  monthSelect: 'Choose a month',
  yearSelect: 'Choose a year',
  decadeSelect: 'Choose a decade',
  yearFormat: 'YYYY',
  dateFormat: 'M/D/YYYY',
  dayFormat: 'D',
  dateTimeFormat: 'M/D/YYYY HH:mm:ss',
  monthBeforeYear: true,
  previousMonth: 'Previous month (PageUp)',
  nextMonth: 'Next month (PageDown)',
  previousYear: 'Last year (Control + left)',
  nextYear: 'Next year (Control + right)',
  previousDecade: 'Last decade',
  nextDecade: 'Next decade',
  previousCentury: 'Last century',
  nextCentury: 'Next century'
};
/* harmony default export */ var locale_en_US = (locale);
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/time-picker/locale/en_US.js
var en_US_locale = {
  placeholder: 'Select time',
  rangePlaceholder: ['Start time', 'End time']
};
/* harmony default export */ var time_picker_locale_en_US = (en_US_locale);
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/date-picker/locale/en_US.js


 // Merge into a locale object

var locale_en_US_locale = {
  lang: extends_extends({
    placeholder: 'Select date',
    yearPlaceholder: 'Select year',
    quarterPlaceholder: 'Select quarter',
    monthPlaceholder: 'Select month',
    weekPlaceholder: 'Select week',
    rangePlaceholder: ['Start date', 'End date'],
    rangeYearPlaceholder: ['Start year', 'End year'],
    rangeQuarterPlaceholder: ['Start quarter', 'End quarter'],
    rangeMonthPlaceholder: ['Start month', 'End month'],
    rangeWeekPlaceholder: ['Start week', 'End week']
  }, locale_en_US),
  timePickerLocale: extends_extends({}, time_picker_locale_en_US)
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

/* harmony default export */ var date_picker_locale_en_US = (locale_en_US_locale);
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/calendar/locale/en_US.js

/* harmony default export */ var calendar_locale_en_US = (date_picker_locale_en_US);
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/locale/default.js
/* eslint-disable no-template-curly-in-string */




var typeTemplate = '${label} is not a valid ${type}';
var localeValues = {
  locale: 'en',
  Pagination: en_US,
  DatePicker: date_picker_locale_en_US,
  TimePicker: time_picker_locale_en_US,
  Calendar: calendar_locale_en_US,
  global: {
    placeholder: 'Please select'
  },
  Table: {
    filterTitle: 'Filter menu',
    filterConfirm: 'OK',
    filterReset: 'Reset',
    filterEmptyText: 'No filters',
    filterCheckall: 'Select all items',
    filterSearchPlaceholder: 'Search in filters',
    emptyText: 'No data',
    selectAll: 'Select current page',
    selectInvert: 'Invert current page',
    selectNone: 'Clear all data',
    selectionAll: 'Select all data',
    sortTitle: 'Sort',
    expand: 'Expand row',
    collapse: 'Collapse row',
    triggerDesc: 'Click to sort descending',
    triggerAsc: 'Click to sort ascending',
    cancelSort: 'Click to cancel sorting'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Cancel',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Cancel'
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Search here',
    itemUnit: 'item',
    itemsUnit: 'items',
    remove: 'Remove',
    selectCurrent: 'Select current page',
    removeCurrent: 'Remove current page',
    selectAll: 'Select all data',
    removeAll: 'Remove all data',
    selectInvert: 'Invert current page'
  },
  Upload: {
    uploading: 'Uploading...',
    removeFile: 'Remove file',
    uploadError: 'Upload error',
    previewFile: 'Preview file',
    downloadFile: 'Download file'
  },
  Empty: {
    description: 'No Data'
  },
  Icon: {
    icon: 'icon'
  },
  Text: {
    edit: 'Edit',
    copy: 'Copy',
    copied: 'Copied',
    expand: 'Expand'
  },
  PageHeader: {
    back: 'Back'
  },
  Form: {
    optional: '(optional)',
    defaultValidateMessages: {
      default: 'Field validation error for ${label}',
      required: 'Please enter ${label}',
      enum: '${label} must be one of [${enum}]',
      whitespace: '${label} cannot be a blank character',
      date: {
        format: '${label} date format is invalid',
        parse: '${label} cannot be converted to a date',
        invalid: '${label} is an invalid date'
      },
      types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        boolean: typeTemplate,
        integer: typeTemplate,
        float: typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate
      },
      string: {
        len: '${label} must be ${len} characters',
        min: '${label} must be at least ${min} characters',
        max: '${label} must be up to ${max} characters',
        range: '${label} must be between ${min}-${max} characters'
      },
      number: {
        len: '${label} must be equal to ${len}',
        min: '${label} must be minimum ${min}',
        max: '${label} must be maximum ${max}',
        range: '${label} must be between ${min}-${max}'
      },
      array: {
        len: 'Must be ${len} ${label}',
        min: 'At least ${min} ${label}',
        max: 'At most ${max} ${label}',
        range: 'The amount of ${label} must be between ${min}-${max}'
      },
      pattern: {
        mismatch: '${label} does not match the pattern ${pattern}'
      }
    }
  },
  Image: {
    preview: 'Preview'
  }
};
/* harmony default export */ var locale_default = (localeValues);
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/locale-provider/default.js

/* harmony default export */ var locale_provider_default = (locale_default);
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/locale-provider/LocaleReceiver.js



/* harmony default export */ var LocaleReceiver = (defineComponent({
  name: 'LocaleReceiver',
  props: {
    componentName: String,
    defaultLocale: {
      type: [Object, Function]
    },
    children: {
      type: Function
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var localeData = runtime_core_esm_bundler_inject('localeData', {});
    var locale = runtime_core_esm_bundler_computed(function () {
      var _props$componentName = props.componentName,
          componentName = _props$componentName === void 0 ? 'global' : _props$componentName,
          defaultLocale = props.defaultLocale;
      var locale = defaultLocale || locale_provider_default[componentName || 'global'];
      var antLocale = localeData.antLocale;
      var localeFromContext = componentName && antLocale ? antLocale[componentName] : {};
      return extends_extends(extends_extends({}, typeof locale === 'function' ? locale() : locale), localeFromContext || {});
    });
    var localeCode = runtime_core_esm_bundler_computed(function () {
      var antLocale = localeData.antLocale;
      var localeCode = antLocale && antLocale.locale; // Had use LocaleProvide but didn't set locale

      if (antLocale && antLocale.exist && !localeCode) {
        return locale_provider_default.locale;
      }

      return localeCode;
    });
    return function () {
      var children = props.children || slots.default;
      var antLocale = localeData.antLocale;
      return children === null || children === void 0 ? void 0 : children(locale.value, localeCode.value, antLocale);
    };
  }
}));
function useLocaleReceiver(componentName, defaultLocale, propsLocale) {
  var localeData = inject('localeData', {});
  var componentLocale = computed(function () {
    var antLocale = localeData.antLocale;
    var locale = unref(defaultLocale) || defaultLocaleData[componentName || 'global'];
    var localeFromContext = componentName && antLocale ? antLocale[componentName] : {};
    return _extends(_extends(_extends({}, typeof locale === 'function' ? locale() : locale), localeFromContext || {}), unref(propsLocale) || {});
  });
  return [componentLocale];
}
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/empty/empty.js



var Empty = function Empty() {
  var _useConfigInject = useConfigInject('empty', {}),
      getPrefixCls = _useConfigInject.getPrefixCls;

  var prefixCls = getPrefixCls('empty-img-default');
  return createVNode("svg", {
    "class": prefixCls,
    "width": "184",
    "height": "152",
    "viewBox": "0 0 184 152"
  }, [createVNode("g", {
    "fill": "none",
    "fill-rule": "evenodd"
  }, [createVNode("g", {
    "transform": "translate(24 31.67)"
  }, [createVNode("ellipse", {
    "class": "".concat(prefixCls, "-ellipse"),
    "cx": "67.797",
    "cy": "106.89",
    "rx": "67.797",
    "ry": "12.668"
  }, null), createVNode("path", {
    "class": "".concat(prefixCls, "-path-1"),
    "d": "M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
  }, null), createVNode("path", {
    "class": "".concat(prefixCls, "-path-2"),
    "d": "M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z",
    "transform": "translate(13.56)"
  }, null), createVNode("path", {
    "class": "".concat(prefixCls, "-path-3"),
    "d": "M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
  }, null), createVNode("path", {
    "class": "".concat(prefixCls, "-path-4"),
    "d": "M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
  }, null)]), createVNode("path", {
    "class": "".concat(prefixCls, "-path-5"),
    "d": "M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
  }, null), createVNode("g", {
    "class": "".concat(prefixCls, "-g"),
    "transform": "translate(149.65 15.383)"
  }, [createVNode("ellipse", {
    "cx": "20.654",
    "cy": "3.167",
    "rx": "2.849",
    "ry": "2.815"
  }, null), createVNode("path", {
    "d": "M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"
  }, null)])])]);
};

Empty.PRESENTED_IMAGE_DEFAULT = true;
/* harmony default export */ var empty = (Empty);
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/empty/simple.js



var Simple = function Simple() {
  var _useConfigInject = useConfigInject('empty', {}),
      getPrefixCls = _useConfigInject.getPrefixCls;

  var prefixCls = getPrefixCls('empty-img-simple');
  return createVNode("svg", {
    "class": prefixCls,
    "width": "64",
    "height": "41",
    "viewBox": "0 0 64 41"
  }, [createVNode("g", {
    "transform": "translate(0 1)",
    "fill": "none",
    "fill-rule": "evenodd"
  }, [createVNode("ellipse", {
    "class": "".concat(prefixCls, "-ellipse"),
    "fill": "#F5F5F5",
    "cx": "32",
    "cy": "33",
    "rx": "32",
    "ry": "7"
  }, null), createVNode("g", {
    "class": "".concat(prefixCls, "-g"),
    "fill-rule": "nonzero",
    "stroke": "#D9D9D9"
  }, [createVNode("path", {
    "d": "M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
  }, null), createVNode("path", {
    "d": "M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z",
    "fill": "#FAFAFA",
    "class": "".concat(prefixCls, "-path")
  }, null)])])]);
};

Simple.PRESENTED_IMAGE_SIMPLE = true;
/* harmony default export */ var simple = (Simple);
;// CONCATENATED MODULE: ./node_modules/vue-types/dist/vue-types.m.js


function e(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}

function t(t, n, r) {
  return n && e(t.prototype, n), r && e(t, r), t;
}

function n() {
  return (n = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];

      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }

    return e;
  }).apply(this, arguments);
}

function r(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t;
}

function i(e, t) {
  if (null == e) return {};
  var n,
      r,
      i = {},
      o = Object.keys(e);

  for (r = 0; r < o.length; r++) t.indexOf(n = o[r]) >= 0 || (i[n] = e[n]);

  return i;
}

function o(e) {
  return 1 == (null != (t = e) && "object" == typeof t && !1 === Array.isArray(t)) && "[object Object]" === Object.prototype.toString.call(e);
  var t;
}

var u = Object.prototype,
    a = u.toString,
    f = u.hasOwnProperty,
    c = /^\s*function (\w+)/;

function l(e) {
  var t,
      n = null !== (t = null == e ? void 0 : e.type) && void 0 !== t ? t : e;

  if (n) {
    var r = n.toString().match(c);
    return r ? r[1] : "";
  }

  return "";
}

var s = function (e) {
  var t, n;
  return !1 !== o(e) && "function" == typeof (t = e.constructor) && !1 !== o(n = t.prototype) && !1 !== n.hasOwnProperty("isPrototypeOf");
},
    v = function (e) {
  return e;
},
    y = v;

if (false) { var vue_types_m_p; }

var d = function (e, t) {
  return f.call(e, t);
},
    vue_types_m_h = Number.isInteger || function (e) {
  return "number" == typeof e && isFinite(e) && Math.floor(e) === e;
},
    b = Array.isArray || function (e) {
  return "[object Array]" === a.call(e);
},
    O = function (e) {
  return "[object Function]" === a.call(e);
},
    g = function (e) {
  return s(e) && d(e, "_vueTypes_name");
},
    m = function (e) {
  return s(e) && (d(e, "type") || ["_vueTypes_name", "validator", "default", "required"].some(function (t) {
    return d(e, t);
  }));
};

function j(e, t) {
  return Object.defineProperty(e.bind(t), "__original", {
    value: e
  });
}

function _(e, t, n) {
  var r;
  void 0 === n && (n = !1);
  var i = !0,
      o = "";
  r = s(e) ? e : {
    type: e
  };
  var u = g(r) ? r._vueTypes_name + " - " : "";

  if (m(r) && null !== r.type) {
    if (void 0 === r.type || !0 === r.type) return i;
    if (!r.required && void 0 === t) return i;
    b(r.type) ? (i = r.type.some(function (e) {
      return !0 === _(e, t, !0);
    }), o = r.type.map(function (e) {
      return l(e);
    }).join(" or ")) : i = "Array" === (o = l(r)) ? b(t) : "Object" === o ? s(t) : "String" === o || "Number" === o || "Boolean" === o || "Function" === o ? function (e) {
      if (null == e) return "";
      var t = e.constructor.toString().match(c);
      return t ? t[1] : "";
    }(t) === o : t instanceof r.type;
  }

  if (!i) {
    var a = u + 'value "' + t + '" should be of type "' + o + '"';
    return !1 === n ? (y(a), !1) : a;
  }

  if (d(r, "validator") && O(r.validator)) {
    var f = y,
        v = [];

    if (y = function (e) {
      v.push(e);
    }, i = r.validator(t), y = f, !i) {
      var p = (v.length > 1 ? "* " : "") + v.join("\n* ");
      return v.length = 0, !1 === n ? (y(p), i) : p;
    }
  }

  return i;
}

function T(e, t) {
  var n = Object.defineProperties(t, {
    _vueTypes_name: {
      value: e,
      writable: !0
    },
    isRequired: {
      get: function () {
        return this.required = !0, this;
      }
    },
    def: {
      value: function (e) {
        return void 0 !== e || this.default ? O(e) || !0 === _(this, e, !0) ? (this.default = b(e) ? function () {
          return [].concat(e);
        } : s(e) ? function () {
          return Object.assign({}, e);
        } : e, this) : (y(this._vueTypes_name + ' - invalid default value: "' + e + '"'), this) : this;
      }
    }
  }),
      r = n.validator;
  return O(r) && (n.validator = j(r, n)), n;
}

function w(e, t) {
  var n = T(e, t);
  return Object.defineProperty(n, "validate", {
    value: function (e) {
      return O(this.validator) && y(this._vueTypes_name + " - calling .validate() will overwrite the current custom validator function. Validator info:\n" + JSON.stringify(this)), this.validator = j(e, this), this;
    }
  });
}

function k(e, t, n) {
  var r,
      o,
      u = (r = t, o = {}, Object.getOwnPropertyNames(r).forEach(function (e) {
    o[e] = Object.getOwnPropertyDescriptor(r, e);
  }), Object.defineProperties({}, o));
  if (u._vueTypes_name = e, !s(n)) return u;
  var a,
      f,
      c = n.validator,
      l = i(n, ["validator"]);

  if (O(c)) {
    var v = u.validator;
    v && (v = null !== (f = (a = v).__original) && void 0 !== f ? f : a), u.validator = j(v ? function (e) {
      return v.call(this, e) && c.call(this, e);
    } : c, u);
  }

  return Object.assign(u, l);
}

function P(e) {
  return e.replace(/^(?!\s*$)/gm, "  ");
}

var x = function () {
  return w("any", {});
},
    A = function () {
  return w("function", {
    type: Function
  });
},
    E = function () {
  return w("boolean", {
    type: Boolean
  });
},
    N = function () {
  return w("string", {
    type: String
  });
},
    q = function () {
  return w("number", {
    type: Number
  });
},
    S = function () {
  return w("array", {
    type: Array
  });
},
    V = function () {
  return w("object", {
    type: Object
  });
},
    F = function () {
  return T("integer", {
    type: Number,
    validator: function (e) {
      return vue_types_m_h(e);
    }
  });
},
    D = function () {
  return T("symbol", {
    validator: function (e) {
      return "symbol" == typeof e;
    }
  });
};

function L(e, t) {
  if (void 0 === t && (t = "custom validation failed"), "function" != typeof e) throw new TypeError("[VueTypes error]: You must provide a function as argument");
  return T(e.name || "<<anonymous function>>", {
    validator: function (n) {
      var r = e(n);
      return r || y(this._vueTypes_name + " - " + t), r;
    }
  });
}

function Y(e) {
  if (!b(e)) throw new TypeError("[VueTypes error]: You must provide an array as argument.");
  var t = 'oneOf - value should be one of "' + e.join('", "') + '".',
      n = e.reduce(function (e, t) {
    if (null != t) {
      var n = t.constructor;
      -1 === e.indexOf(n) && e.push(n);
    }

    return e;
  }, []);
  return T("oneOf", {
    type: n.length > 0 ? n : void 0,
    validator: function (n) {
      var r = -1 !== e.indexOf(n);
      return r || y(t), r;
    }
  });
}

function B(e) {
  if (!b(e)) throw new TypeError("[VueTypes error]: You must provide an array as argument");

  for (var t = !1, n = [], r = 0; r < e.length; r += 1) {
    var i = e[r];

    if (m(i)) {
      if (g(i) && "oneOf" === i._vueTypes_name) {
        n = n.concat(i.type);
        continue;
      }

      if (O(i.validator) && (t = !0), !0 !== i.type && i.type) {
        n = n.concat(i.type);
        continue;
      }
    }

    n.push(i);
  }

  return n = n.filter(function (e, t) {
    return n.indexOf(e) === t;
  }), T("oneOfType", t ? {
    type: n,
    validator: function (t) {
      var n = [],
          r = e.some(function (e) {
        var r = _(g(e) && "oneOf" === e._vueTypes_name ? e.type || null : e, t, !0);

        return "string" == typeof r && n.push(r), !0 === r;
      });
      return r || y("oneOfType - provided value does not match any of the " + n.length + " passed-in validators:\n" + P(n.join("\n"))), r;
    }
  } : {
    type: n
  });
}

function I(e) {
  return T("arrayOf", {
    type: Array,
    validator: function (t) {
      var n,
          r = t.every(function (t) {
        return !0 === (n = _(e, t, !0));
      });
      return r || y("arrayOf - value validation error:\n" + P(n)), r;
    }
  });
}

function J(e) {
  return T("instanceOf", {
    type: e
  });
}

function M(e) {
  return T("objectOf", {
    type: Object,
    validator: function (t) {
      var n,
          r = Object.keys(t).every(function (r) {
        return !0 === (n = _(e, t[r], !0));
      });
      return r || y("objectOf - value validation error:\n" + P(n)), r;
    }
  });
}

function R(e) {
  var t = Object.keys(e),
      n = t.filter(function (t) {
    var n;
    return !!(null === (n = e[t]) || void 0 === n ? void 0 : n.required);
  }),
      r = T("shape", {
    type: Object,
    validator: function (r) {
      var i = this;
      if (!s(r)) return !1;
      var o = Object.keys(r);

      if (n.length > 0 && n.some(function (e) {
        return -1 === o.indexOf(e);
      })) {
        var u = n.filter(function (e) {
          return -1 === o.indexOf(e);
        });
        return y(1 === u.length ? 'shape - required property "' + u[0] + '" is not defined.' : 'shape - required properties "' + u.join('", "') + '" are not defined.'), !1;
      }

      return o.every(function (n) {
        if (-1 === t.indexOf(n)) return !0 === i._vueTypes_isLoose || (y('shape - shape definition does not include a "' + n + '" property. Allowed keys: "' + t.join('", "') + '".'), !1);

        var o = _(e[n], r[n], !0);

        return "string" == typeof o && y('shape - "' + n + '" property validation error:\n ' + P(o)), !0 === o;
      });
    }
  });
  return Object.defineProperty(r, "_vueTypes_isLoose", {
    writable: !0,
    value: !1
  }), Object.defineProperty(r, "loose", {
    get: function () {
      return this._vueTypes_isLoose = !0, this;
    }
  }), r;
}

var $ = function () {
  function e() {}

  return e.extend = function (e) {
    var t = this;
    if (b(e)) return e.forEach(function (e) {
      return t.extend(e);
    }), this;
    var n = e.name,
        r = e.validate,
        o = void 0 !== r && r,
        u = e.getter,
        a = void 0 !== u && u,
        f = i(e, ["name", "validate", "getter"]);
    if (d(this, n)) throw new TypeError('[VueTypes error]: Type "' + n + '" already defined');
    var c,
        l = f.type;
    return g(l) ? (delete f.type, Object.defineProperty(this, n, a ? {
      get: function () {
        return k(n, l, f);
      }
    } : {
      value: function () {
        var e,
            t = k(n, l, f);
        return t.validator && (t.validator = (e = t.validator).bind.apply(e, [t].concat([].slice.call(arguments)))), t;
      }
    })) : (c = a ? {
      get: function () {
        var e = Object.assign({}, f);
        return o ? w(n, e) : T(n, e);
      },
      enumerable: !0
    } : {
      value: function () {
        var e,
            t,
            r = Object.assign({}, f);
        return e = o ? w(n, r) : T(n, r), r.validator && (e.validator = (t = r.validator).bind.apply(t, [e].concat([].slice.call(arguments)))), e;
      },
      enumerable: !0
    }, Object.defineProperty(this, n, c));
  }, t(e, null, [{
    key: "any",
    get: function () {
      return x();
    }
  }, {
    key: "func",
    get: function () {
      return A().def(this.defaults.func);
    }
  }, {
    key: "bool",
    get: function () {
      return E().def(this.defaults.bool);
    }
  }, {
    key: "string",
    get: function () {
      return N().def(this.defaults.string);
    }
  }, {
    key: "number",
    get: function () {
      return q().def(this.defaults.number);
    }
  }, {
    key: "array",
    get: function () {
      return S().def(this.defaults.array);
    }
  }, {
    key: "object",
    get: function () {
      return V().def(this.defaults.object);
    }
  }, {
    key: "integer",
    get: function () {
      return F().def(this.defaults.integer);
    }
  }, {
    key: "symbol",
    get: function () {
      return D();
    }
  }]), e;
}();

function z(e) {
  var i;
  return void 0 === e && (e = {
    func: function () {},
    bool: !0,
    string: "",
    number: 0,
    array: function () {
      return [];
    },
    object: function () {
      return {};
    },
    integer: 0
  }), (i = function (i) {
    function o() {
      return i.apply(this, arguments) || this;
    }

    return r(o, i), t(o, null, [{
      key: "sensibleDefaults",
      get: function () {
        return n({}, this.defaults);
      },
      set: function (t) {
        this.defaults = !1 !== t ? n({}, !0 !== t ? t : e) : {};
      }
    }]), o;
  }($)).defaults = n({}, e), i;
}

$.defaults = {}, $.custom = L, $.oneOf = Y, $.instanceOf = J, $.oneOfType = B, $.arrayOf = I, $.objectOf = M, $.shape = R, $.utils = {
  validate: function (e, t) {
    return !0 === _(t, e, !0);
  },
  toType: function (e, t, n) {
    return void 0 === n && (n = !1), n ? w(e, t) : T(e, t);
  }
};

var C = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }

  return r(t, e), t;
}(z());

/* harmony default export */ var vue_types_m = ((/* unused pure expression or super */ null && (C)));

;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/_util/vue-types/index.js

var PropTypes = z({
  func: undefined,
  bool: undefined,
  string: undefined,
  number: undefined,
  array: undefined,
  object: undefined,
  integer: undefined
});
PropTypes.extend([{
  name: 'looseBool',
  getter: true,
  type: Boolean,
  default: undefined
}, {
  name: 'style',
  getter: true,
  type: [String, Object],
  default: undefined
}, {
  name: 'VueNode',
  getter: true,
  type: null
}]);
function withUndefined(type) {
  type.default = undefined;
  return type;
}
/* harmony default export */ var vue_types = (PropTypes);
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/_util/type.js
// https://stackoverflow.com/questions/46176165/ways-to-get-string-literal-type-of-array-values-without-enum-overhead
var tuple = function tuple() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args;
};
var tupleNum = function tupleNum() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return args;
};
var withInstall = function withInstall(comp) {
  var c = comp;

  c.install = function (app) {
    app.component(c.displayName || c.name, comp);
  };

  return comp;
};
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/empty/index.js





var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};










var defaultEmptyImg = createVNode(empty, null, null);

var simpleEmptyImg = createVNode(simple, null, null);

var empty_Empty = function Empty(props, _ref) {
  var _ref$slots = _ref.slots,
      slots = _ref$slots === void 0 ? {} : _ref$slots,
      attrs = _ref.attrs;

  var _a;

  var _useConfigInject = useConfigInject('empty', props),
      direction = _useConfigInject.direction,
      prefixClsRef = _useConfigInject.prefixCls;

  var prefixCls = prefixClsRef.value;

  var _b = extends_extends(extends_extends({}, props), attrs),
      _b$image = _b.image,
      image = _b$image === void 0 ? defaultEmptyImg : _b$image,
      _b$description = _b.description,
      description = _b$description === void 0 ? ((_a = slots.description) === null || _a === void 0 ? void 0 : _a.call(slots)) || undefined : _b$description,
      imageStyle = _b.imageStyle,
      _b$class = _b.class,
      className = _b$class === void 0 ? '' : _b$class,
      restProps = __rest(_b, ["image", "description", "imageStyle", "class"]);

  return createVNode(LocaleReceiver, {
    "componentName": "Empty",
    "children": function children(locale) {
      var _classNames;

      var des = typeof description !== 'undefined' ? description : locale.description;
      var alt = typeof des === 'string' ? des : 'empty';
      var imageNode = null;

      if (typeof image === 'string') {
        imageNode = createVNode("img", {
          "alt": alt,
          "src": image
        }, null);
      } else {
        imageNode = image;
      }

      return createVNode("div", _objectSpread2({
        "class": _util_classNames(prefixCls, className, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-normal"), image === simpleEmptyImg), _defineProperty(_classNames, "".concat(prefixCls, "-rtl"), direction.value === 'rtl'), _classNames))
      }, restProps), [createVNode("div", {
        "class": "".concat(prefixCls, "-image"),
        "style": imageStyle
      }, [imageNode]), des && createVNode("p", {
        "class": "".concat(prefixCls, "-description")
      }, [des]), slots.default && createVNode("div", {
        "class": "".concat(prefixCls, "-footer")
      }, [filterEmpty(slots.default())])]);
    }
  }, null);
};

empty_Empty.displayName = 'AEmpty';
empty_Empty.PRESENTED_IMAGE_DEFAULT = defaultEmptyImg;
empty_Empty.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;
empty_Empty.inheritAttrs = false;
empty_Empty.props = {
  prefixCls: String,
  image: vue_types.any,
  description: vue_types.any,
  imageStyle: {
    type: Object,
    default: undefined
  }
};
/* harmony default export */ var es_empty = (withInstall(empty_Empty));
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/config-provider/renderEmpty.js




var RenderEmpty = function RenderEmpty(props) {
  var _useConfigInject = useConfigInject('empty', props),
      prefixCls = _useConfigInject.prefixCls;

  var renderHtml = function renderHtml(componentName) {
    switch (componentName) {
      case 'Table':
      case 'List':
        return createVNode(es_empty, {
          "image": es_empty.PRESENTED_IMAGE_SIMPLE
        }, null);

      case 'Select':
      case 'TreeSelect':
      case 'Cascader':
      case 'Transfer':
      case 'Mentions':
        return createVNode(es_empty, {
          "image": es_empty.PRESENTED_IMAGE_SIMPLE,
          "class": "".concat(prefixCls.value, "-small")
        }, null);

      default:
        return createVNode(es_empty, null, null);
    }
  };

  return renderHtml(props.componentName);
};

function renderEmpty(componentName) {
  return createVNode(RenderEmpty, {
    "componentName": componentName
  }, null);
}

/* harmony default export */ var config_provider_renderEmpty = (renderEmpty);
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-util/warning.js
/* eslint-disable no-console */
var warned = {};
function warning(valid, message) {
  // Support uglify
  if (false) {}
}
function note(valid, message) {
  // Support uglify
  if (false) {}
}
function resetWarned() {
  warned = {};
}
function call(method, valid, message) {
  if (!valid && !warned[message]) {
    method(false, message);
    warned[message] = true;
  }
}
function warningOnce(valid, message) {
  call(warning, valid, message);
}
function noteOnce(valid, message) {
  call(note, valid, message);
}
/* harmony default export */ var vc_util_warning = (warningOnce);
/* eslint-enable */
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/_util/warning.js


/* harmony default export */ var _util_warning = (function (valid, component) {
  var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  vc_util_warning(valid, "[antdv: ".concat(component, "] ").concat(message));
});
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/locale-provider/index.js




var ANT_MARK = 'internalMark';
var LocaleProvider = defineComponent({
  name: 'ALocaleProvider',
  props: {
    locale: {
      type: Object
    },
    ANT_MARK__: String
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    _util_warning(props.ANT_MARK__ === ANT_MARK, 'LocaleProvider', '`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead');
    var state = reactive({
      antLocale: extends_extends(extends_extends({}, props.locale), {
        exist: true
      }),
      ANT_MARK__: ANT_MARK
    });
    provide('localeData', state);
    watch(function () {
      return props.locale;
    }, function () {
      state.antLocale = extends_extends(extends_extends({}, props.locale), {
        exist: true
      });
    }, {
      immediate: true
    });
    return function () {
      var _a;

      return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots);
    };
  }
});
/* istanbul ignore next */

LocaleProvider.install = function (app) {
  app.component(LocaleProvider.name, LocaleProvider);
  return app;
};

/* harmony default export */ var locale_provider = (withInstall(LocaleProvider));
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/_util/transition.js



var transition_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};



var SelectPlacements = tuple('bottomLeft', 'bottomRight', 'topLeft', 'topRight');

var getTransitionDirection = function getTransitionDirection(placement) {
  if (placement !== undefined && (placement === 'topLeft' || placement === 'topRight')) {
    return "slide-down";
  }

  return "slide-up";
};

var getTransitionProps = function getTransitionProps(transitionName) {
  var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (false) {}

  var transitionProps = transitionName ? _extends({
    name: transitionName,
    appear: true,
    // type: 'animation',
    // appearFromClass: `${transitionName}-appear ${transitionName}-appear-prepare`,
    // appearActiveClass: `antdv-base-transtion`,
    // appearToClass: `${transitionName}-appear ${transitionName}-appear-active`,
    enterFromClass: "".concat(transitionName, "-enter ").concat(transitionName, "-enter-prepare"),
    enterActiveClass: "".concat(transitionName, "-enter ").concat(transitionName, "-enter-prepare"),
    enterToClass: "".concat(transitionName, "-enter ").concat(transitionName, "-enter-active"),
    leaveFromClass: " ".concat(transitionName, "-leave"),
    leaveActiveClass: "".concat(transitionName, "-leave"),
    leaveToClass: "".concat(transitionName, "-leave ").concat(transitionName, "-leave-active")
  }, opt) : _extends({
    css: false
  }, opt);
  return transitionProps;
};
var getTransitionGroupProps = function getTransitionGroupProps(transitionName) {
  var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var transitionProps = transitionName ? extends_extends({
    name: transitionName,
    appear: true,
    // appearFromClass: `${transitionName}-appear ${transitionName}-appear-prepare`,
    appearActiveClass: "".concat(transitionName),
    appearToClass: "".concat(transitionName, "-appear ").concat(transitionName, "-appear-active"),
    enterFromClass: "".concat(transitionName, "-appear ").concat(transitionName, "-enter ").concat(transitionName, "-appear-prepare ").concat(transitionName, "-enter-prepare"),
    enterActiveClass: "".concat(transitionName),
    enterToClass: "".concat(transitionName, "-enter ").concat(transitionName, "-appear ").concat(transitionName, "-appear-active ").concat(transitionName, "-enter-active"),
    leaveActiveClass: "".concat(transitionName, " ").concat(transitionName, "-leave"),
    leaveToClass: "".concat(transitionName, "-leave-active")
  }, opt) : extends_extends({
    css: false
  }, opt);
  return transitionProps;
};
var transition_Transition = Transition;
var transition_TransitionGroup = TransitionGroup;

if (false) { var transition_warn; } // ================== Collapse Motion ==================


var getCollapsedHeight = function getCollapsedHeight() {
  return {
    height: 0,
    opacity: 0
  };
};

var getRealHeight = function getRealHeight(node) {
  return {
    height: "".concat(node.scrollHeight, "px"),
    opacity: 1
  };
};

var getCurrentHeight = function getCurrentHeight(node) {
  return {
    height: "".concat(node.offsetHeight, "px")
  };
};

var collapseMotion = function collapseMotion() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'ant-motion-collapse';
  var style = arguments.length > 1 ? arguments[1] : undefined;
  var className = arguments.length > 2 ? arguments[2] : undefined;
  return {
    name: name,
    appear: true,
    css: true,
    onBeforeEnter: function onBeforeEnter(node) {
      className.value = name;
      style.value = getCollapsedHeight(node);
    },
    onEnter: function onEnter(node) {
      nextTick(function () {
        style.value = getRealHeight(node);
      });
    },
    onAfterEnter: function onAfterEnter() {
      className.value = '';
      style.value = {};
    },
    onBeforeLeave: function onBeforeLeave(node) {
      className.value = name;
      style.value = getCurrentHeight(node);
    },
    onLeave: function onLeave(node) {
      setTimeout(function () {
        style.value = getCollapsedHeight(node);
      });
    },
    onAfterLeave: function onAfterLeave() {
      className.value = '';
      style.value = {};
    }
  };
};

var getTransitionName = function getTransitionName(rootPrefixCls, motion, transitionName) {
  if (transitionName !== undefined) {
    return transitionName;
  }

  return "".concat(rootPrefixCls, "-").concat(motion);
};


/* harmony default export */ var transition = (transition_Transition);
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-notification/Notice.js






/* harmony default export */ var Notice = (defineComponent({
  name: 'Notice',
  inheritAttrs: false,
  props: ['prefixCls', 'duration', 'updateMark', 'noticeKey', 'closeIcon', 'closable', 'props', 'onClick', 'onClose', 'holder', 'visible'],
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs,
        slots = _ref.slots;
    var closeTimer;
    var duration = runtime_core_esm_bundler_computed(function () {
      return props.duration === undefined ? 1.5 : props.duration;
    });

    var startCloseTimer = function startCloseTimer() {
      if (duration.value) {
        closeTimer = setTimeout(function () {
          close();
        }, duration.value * 1000);
      }
    };

    var clearCloseTimer = function clearCloseTimer() {
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
    };

    var close = function close(e) {
      if (e) {
        e.stopPropagation();
      }

      clearCloseTimer();
      var onClose = props.onClose,
          noticeKey = props.noticeKey;

      if (onClose) {
        onClose(noticeKey);
      }
    };

    var restartCloseTimer = function restartCloseTimer() {
      clearCloseTimer();
      startCloseTimer();
    };

    onMounted(function () {
      startCloseTimer();
    });
    onUnmounted(function () {
      clearCloseTimer();
    });
    watch([duration, function () {
      return props.updateMark;
    }, function () {
      return props.visible;
    }], function (_ref2, _ref3) {
      var _ref4 = slicedToArray_slicedToArray(_ref2, 3),
          preDuration = _ref4[0],
          preUpdateMark = _ref4[1],
          preVisible = _ref4[2];

      var _ref5 = slicedToArray_slicedToArray(_ref3, 3),
          newDuration = _ref5[0],
          newUpdateMark = _ref5[1],
          newVisible = _ref5[2];

      if (preDuration !== newDuration || preUpdateMark !== newUpdateMark || preVisible !== newVisible && newVisible) {
        restartCloseTimer();
      }
    }, {
      flush: 'post'
    });
    return function () {
      var _a, _b;

      var prefixCls = props.prefixCls,
          closable = props.closable,
          _props$closeIcon = props.closeIcon,
          closeIcon = _props$closeIcon === void 0 ? (_a = slots.closeIcon) === null || _a === void 0 ? void 0 : _a.call(slots) : _props$closeIcon,
          onClick = props.onClick,
          holder = props.holder;
      var className = attrs.class,
          style = attrs.style;
      var componentClass = "".concat(prefixCls, "-notice");
      var dataOrAriaAttributeProps = Object.keys(attrs).reduce(function (acc, key) {
        if (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-' || key === 'role') {
          acc[key] = attrs[key];
        }

        return acc;
      }, {});

      var node = createVNode("div", _objectSpread2({
        "class": _util_classNames(componentClass, className, _defineProperty({}, "".concat(componentClass, "-closable"), closable)),
        "style": style,
        "onMouseenter": clearCloseTimer,
        "onMouseleave": startCloseTimer,
        "onClick": onClick
      }, dataOrAriaAttributeProps), [createVNode("div", {
        "class": "".concat(componentClass, "-content")
      }, [(_b = slots.default) === null || _b === void 0 ? void 0 : _b.call(slots)]), closable ? createVNode("a", {
        "tabindex": 0,
        "onClick": close,
        "class": "".concat(componentClass, "-close")
      }, [closeIcon || createVNode("span", {
        "class": "".concat(componentClass, "-close-x")
      }, null)]) : null]);

      if (holder) {
        return createVNode(Teleport, {
          "to": holder
        }, {
          default: function _default() {
            return node;
          }
        });
      }

      return node;
    };
  }
}));
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-notification/Notification.js





var Notification_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};





var seed = 0;
var now = Date.now();

function getUuid() {
  var id = seed;
  seed += 1;
  return "rcNotification_".concat(now, "_").concat(id);
}

var Notification = defineComponent({
  name: 'Notification',
  inheritAttrs: false,
  props: ['prefixCls', 'transitionName', 'animation', 'maxCount', 'closeIcon'],
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs,
        expose = _ref.expose,
        slots = _ref.slots;
    var hookRefs = new Map();
    var notices = ref([]);
    var transitionProps = runtime_core_esm_bundler_computed(function () {
      var prefixCls = props.prefixCls,
          _props$animation = props.animation,
          animation = _props$animation === void 0 ? 'fade' : _props$animation;
      var name = props.transitionName;

      if (!name && animation) {
        name = "".concat(prefixCls, "-").concat(animation);
      }

      return getTransitionGroupProps(name);
    });

    var add = function add(originNotice, holderCallback) {
      var key = originNotice.key || getUuid();

      var notice = extends_extends(extends_extends({}, originNotice), {
        key: key
      });

      var maxCount = props.maxCount;
      var noticeIndex = notices.value.map(function (v) {
        return v.notice.key;
      }).indexOf(key);
      var updatedNotices = notices.value.concat();

      if (noticeIndex !== -1) {
        updatedNotices.splice(noticeIndex, 1, {
          notice: notice,
          holderCallback: holderCallback
        });
      } else {
        if (maxCount && notices.value.length >= maxCount) {
          // XXX, use key of first item to update new added (let React to move exsiting
          // instead of remove and mount). Same key was used before for both a) external
          // manual control and b) internal react 'key' prop , which is not that good.
          // eslint-disable-next-line no-param-reassign
          // zombieJ: Not know why use `updateKey`. This makes Notice infinite loop in jest.
          // Change to `updateMark` for compare instead.
          // https://github.com/react-component/notification/commit/32299e6be396f94040bfa82517eea940db947ece
          notice.key = updatedNotices[0].notice.key;
          notice.updateMark = getUuid(); // zombieJ: That's why. User may close by key directly.
          // We need record this but not re-render to avoid upper issue
          // https://github.com/react-component/notification/issues/129

          notice.userPassKey = key;
          updatedNotices.shift();
        }

        updatedNotices.push({
          notice: notice,
          holderCallback: holderCallback
        });
      }

      notices.value = updatedNotices;
    };

    var remove = function remove(removeKey) {
      notices.value = notices.value.filter(function (_ref2) {
        var _ref2$notice = _ref2.notice,
            key = _ref2$notice.key,
            userPassKey = _ref2$notice.userPassKey;
        var mergedKey = userPassKey || key;
        return mergedKey !== removeKey;
      });
    };

    expose({
      add: add,
      remove: remove,
      notices: notices
    });
    return function () {
      var _className;

      var _a;

      var prefixCls = props.prefixCls,
          _props$closeIcon = props.closeIcon,
          closeIcon = _props$closeIcon === void 0 ? (_a = slots.closeIcon) === null || _a === void 0 ? void 0 : _a.call(slots, {
        prefixCls: prefixCls
      }) : _props$closeIcon;
      var noticeNodes = notices.value.map(function (_ref3, index) {
        var notice = _ref3.notice,
            holderCallback = _ref3.holderCallback;
        var updateMark = index === notices.value.length - 1 ? notice.updateMark : undefined;
        var key = notice.key,
            userPassKey = notice.userPassKey;
        var content = notice.content;

        var noticeProps = extends_extends(extends_extends(extends_extends({
          prefixCls: prefixCls,
          closeIcon: typeof closeIcon === 'function' ? closeIcon({
            prefixCls: prefixCls
          }) : closeIcon
        }, notice), notice.props), {
          key: key,
          noticeKey: userPassKey || key,
          updateMark: updateMark,
          onClose: function onClose(noticeKey) {
            var _a;

            remove(noticeKey);
            (_a = notice.onClose) === null || _a === void 0 ? void 0 : _a.call(notice);
          },
          onClick: notice.onClick
        });

        if (holderCallback) {
          return createVNode("div", {
            "key": key,
            "class": "".concat(prefixCls, "-hook-holder"),
            "ref": function ref(div) {
              if (typeof key === 'undefined') {
                return;
              }

              if (div) {
                hookRefs.set(key, div);
                holderCallback(div, noticeProps);
              } else {
                hookRefs.delete(key);
              }
            }
          }, null);
        }

        return createVNode(Notice, noticeProps, {
          default: function _default() {
            return [typeof content === 'function' ? content({
              prefixCls: prefixCls
            }) : content];
          }
        });
      });
      var className = (_className = {}, _defineProperty(_className, prefixCls, 1), _defineProperty(_className, attrs.class, !!attrs.class), _className);
      return createVNode("div", {
        "class": className,
        "style": attrs.style || {
          top: '65px',
          left: '50%'
        }
      }, [createVNode(TransitionGroup, _objectSpread2({
        "tag": "div"
      }, transitionProps.value), {
        default: function _default() {
          return [noticeNodes];
        }
      })]);
    };
  }
});

Notification.newInstance = function newNotificationInstance(properties, callback) {
  var _a = properties || {},
      _a$name = _a.name,
      name = _a$name === void 0 ? 'notification' : _a$name,
      getContainer = _a.getContainer,
      appContext = _a.appContext,
      customizePrefixCls = _a.prefixCls,
      customRootPrefixCls = _a.rootPrefixCls,
      customTransitionName = _a.transitionName,
      hasTransitionName = _a.hasTransitionName,
      props = Notification_rest(_a, ["name", "getContainer", "appContext", "prefixCls", "rootPrefixCls", "transitionName", "hasTransitionName"]);

  var div = document.createElement('div');

  if (getContainer) {
    var root = getContainer();
    root.appendChild(div);
  } else {
    document.body.appendChild(div);
  }

  var Wrapper = defineComponent({
    name: 'NotificationWrapper',
    setup: function setup(_props, _ref4) {
      var attrs = _ref4.attrs;
      var notiRef = ref();
      onMounted(function () {
        callback({
          notice: function notice(noticeProps) {
            var _a;

            (_a = notiRef.value) === null || _a === void 0 ? void 0 : _a.add(noticeProps);
          },
          removeNotice: function removeNotice(key) {
            var _a;

            (_a = notiRef.value) === null || _a === void 0 ? void 0 : _a.remove(key);
          },
          destroy: function destroy() {
            render(null, div);

            if (div.parentNode) {
              div.parentNode.removeChild(div);
            }
          },
          component: notiRef
        });
      });
      return function () {
        var global = globalConfigForApi;
        var prefixCls = global.getPrefixCls(name, customizePrefixCls);
        var rootPrefixCls = global.getRootPrefixCls(customRootPrefixCls, prefixCls);
        var transitionName = hasTransitionName ? customTransitionName : "".concat(rootPrefixCls, "-").concat(customTransitionName);
        return createVNode(config_provider, _objectSpread2(_objectSpread2({}, global), {}, {
          "notUpdateGlobalConfig": true,
          "prefixCls": rootPrefixCls
        }), {
          default: function _default() {
            return [createVNode(Notification, _objectSpread2(_objectSpread2({
              "ref": notiRef
            }, attrs), {}, {
              "prefixCls": prefixCls,
              "transitionName": transitionName
            }), null)];
          }
        });
      };
    }
  });
  var vm = createVNode(Wrapper, props);
  vm.appContext = appContext || vm.appContext;
  render(vm, div);
};

/* harmony default export */ var vc_notification_Notification = (Notification);
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-notification/index.js
// based on rc-notification 4.5.7

/* harmony default export */ var vc_notification = (vc_notification_Notification);
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons-svg/es/asn/LoadingOutlined.js
// This icon file is generated automatically.
var LoadingOutlined = {
  "icon": {
    "tag": "svg",
    "attrs": {
      "viewBox": "0 0 1024 1024",
      "focusable": "false"
    },
    "children": [{
      "tag": "path",
      "attrs": {
        "d": "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"
      }
    }]
  },
  "name": "loading",
  "theme": "outlined"
};
/* harmony default export */ var asn_LoadingOutlined = (LoadingOutlined);
;// CONCATENATED MODULE: ./node_modules/@ctrl/tinycolor/dist/module/util.js
/**
 * Take input from [0, n] and return it as [0, 1]
 * @hidden
 */
function bound01(n, max) {
  if (isOnePointZero(n)) {
    n = '100%';
  }

  var isPercent = isPercentage(n);
  n = max === 360 ? n : Math.min(max, Math.max(0, parseFloat(n))); // Automatically convert percentage into number

  if (isPercent) {
    n = parseInt(String(n * max), 10) / 100;
  } // Handle floating point rounding errors


  if (Math.abs(n - max) < 0.000001) {
    return 1;
  } // Convert into [0, 1] range if it isn't already


  if (max === 360) {
    // If n is a hue given in degrees,
    // wrap around out-of-range values into [0, 360] range
    // then convert into [0, 1].
    n = (n < 0 ? n % max + max : n % max) / parseFloat(String(max));
  } else {
    // If n not a hue given in degrees
    // Convert into [0, 1] range if it isn't already.
    n = n % max / parseFloat(String(max));
  }

  return n;
}
/**
 * Force a number between 0 and 1
 * @hidden
 */

function clamp01(val) {
  return Math.min(1, Math.max(0, val));
}
/**
 * Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
 * <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
 * @hidden
 */

function isOnePointZero(n) {
  return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1;
}
/**
 * Check to see if string passed in is a percentage
 * @hidden
 */

function isPercentage(n) {
  return typeof n === 'string' && n.indexOf('%') !== -1;
}
/**
 * Return a valid alpha value [0,1] with all invalid values being set to 1
 * @hidden
 */

function boundAlpha(a) {
  a = parseFloat(a);

  if (isNaN(a) || a < 0 || a > 1) {
    a = 1;
  }

  return a;
}
/**
 * Replace a decimal with it's percentage value
 * @hidden
 */

function convertToPercentage(n) {
  if (n <= 1) {
    return "".concat(Number(n) * 100, "%");
  }

  return n;
}
/**
 * Force a hex value to have 2 characters
 * @hidden
 */

function util_pad2(c) {
  return c.length === 1 ? '0' + c : String(c);
}
;// CONCATENATED MODULE: ./node_modules/@ctrl/tinycolor/dist/module/conversion.js
 // `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

/**
 * Handle bounds / percentage checking to conform to CSS color spec
 * <http://www.w3.org/TR/css3-color/>
 * *Assumes:* r, g, b in [0, 255] or [0, 1]
 * *Returns:* { r, g, b } in [0, 255]
 */

function rgbToRgb(r, g, b) {
  return {
    r: bound01(r, 255) * 255,
    g: bound01(g, 255) * 255,
    b: bound01(b, 255) * 255
  };
}
/**
 * Converts an RGB color value to HSL.
 * *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
 * *Returns:* { h, s, l } in [0,1]
 */

function rgbToHsl(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h = 0;
  var s = 0;
  var l = (max + min) / 2;

  if (max === min) {
    s = 0;
    h = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;

      case g:
        h = (b - r) / d + 2;
        break;

      case b:
        h = (r - g) / d + 4;
        break;

      default:
        break;
    }

    h /= 6;
  }

  return {
    h: h,
    s: s,
    l: l
  };
}

function hue2rgb(p, q, t) {
  if (t < 0) {
    t += 1;
  }

  if (t > 1) {
    t -= 1;
  }

  if (t < 1 / 6) {
    return p + (q - p) * (6 * t);
  }

  if (t < 1 / 2) {
    return q;
  }

  if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6;
  }

  return p;
}
/**
 * Converts an HSL color value to RGB.
 *
 * *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
 * *Returns:* { r, g, b } in the set [0, 255]
 */


function hslToRgb(h, s, l) {
  var r;
  var g;
  var b;
  h = bound01(h, 360);
  s = bound01(s, 100);
  l = bound01(l, 100);

  if (s === 0) {
    // achromatic
    g = l;
    b = l;
    r = l;
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: r * 255,
    g: g * 255,
    b: b * 255
  };
}
/**
 * Converts an RGB color value to HSV
 *
 * *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
 * *Returns:* { h, s, v } in [0,1]
 */

function rgbToHsv(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h = 0;
  var v = max;
  var d = max - min;
  var s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;

      case g:
        h = (b - r) / d + 2;
        break;

      case b:
        h = (r - g) / d + 4;
        break;

      default:
        break;
    }

    h /= 6;
  }

  return {
    h: h,
    s: s,
    v: v
  };
}
/**
 * Converts an HSV color value to RGB.
 *
 * *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
 * *Returns:* { r, g, b } in the set [0, 255]
 */

function hsvToRgb(h, s, v) {
  h = bound01(h, 360) * 6;
  s = bound01(s, 100);
  v = bound01(v, 100);
  var i = Math.floor(h);
  var f = h - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);
  var mod = i % 6;
  var r = [v, q, p, p, t, v][mod];
  var g = [t, v, v, q, p, p][mod];
  var b = [p, p, t, v, v, q][mod];
  return {
    r: r * 255,
    g: g * 255,
    b: b * 255
  };
}
/**
 * Converts an RGB color to hex
 *
 * Assumes r, g, and b are contained in the set [0, 255]
 * Returns a 3 or 6 character hex
 */

function rgbToHex(r, g, b, allow3Char) {
  var hex = [util_pad2(Math.round(r).toString(16)), util_pad2(Math.round(g).toString(16)), util_pad2(Math.round(b).toString(16))]; // Return a 3 character hex if possible

  if (allow3Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1))) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
  }

  return hex.join('');
}
/**
 * Converts an RGBA color plus alpha transparency to hex
 *
 * Assumes r, g, b are contained in the set [0, 255] and
 * a in [0, 1]. Returns a 4 or 8 character rgba hex
 */
// eslint-disable-next-line max-params

function rgbaToHex(r, g, b, a, allow4Char) {
  var hex = [util_pad2(Math.round(r).toString(16)), util_pad2(Math.round(g).toString(16)), util_pad2(Math.round(b).toString(16)), util_pad2(convertDecimalToHex(a))]; // Return a 4 character hex if possible

  if (allow4Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1)) && hex[3].startsWith(hex[3].charAt(1))) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
  }

  return hex.join('');
}
/**
 * Converts an RGBA color to an ARGB Hex8 string
 * Rarely used, but required for "toFilter()"
 */

function rgbaToArgbHex(r, g, b, a) {
  var hex = [pad2(convertDecimalToHex(a)), pad2(Math.round(r).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16))];
  return hex.join('');
}
/** Converts a decimal to a hex value */

function convertDecimalToHex(d) {
  return Math.round(parseFloat(d) * 255).toString(16);
}
/** Converts a hex value to a decimal */

function convertHexToDecimal(h) {
  return parseIntFromHex(h) / 255;
}
/** Parse a base-16 hex value into a base-10 integer */

function parseIntFromHex(val) {
  return parseInt(val, 16);
}
function numberInputToObject(color) {
  return {
    r: color >> 16,
    g: (color & 0xff00) >> 8,
    b: color & 0xff
  };
}
;// CONCATENATED MODULE: ./node_modules/@ctrl/tinycolor/dist/module/css-color-names.js
// https://github.com/bahamas10/css-color-names/blob/master/css-color-names.json

/**
 * @hidden
 */
var names = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgreen: '#006400',
  darkgrey: '#a9a9a9',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkslategrey: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  goldenrod: '#daa520',
  gold: '#ffd700',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  grey: '#808080',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavenderblush: '#fff0f5',
  lavender: '#e6e6fa',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgray: '#d3d3d3',
  lightgreen: '#90ee90',
  lightgrey: '#d3d3d3',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightslategrey: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370db',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#db7093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  rebeccapurple: '#663399',
  red: '#ff0000',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  slategrey: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32'
};
;// CONCATENATED MODULE: ./node_modules/@ctrl/tinycolor/dist/module/format-input.js



/**
 * Given a string or object, convert that input to RGB
 *
 * Possible string inputs:
 * ```
 * "red"
 * "#f00" or "f00"
 * "#ff0000" or "ff0000"
 * "#ff000000" or "ff000000"
 * "rgb 255 0 0" or "rgb (255, 0, 0)"
 * "rgb 1.0 0 0" or "rgb (1, 0, 0)"
 * "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
 * "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
 * "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
 * "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
 * "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
 * ```
 */

function inputToRGB(color) {
  var rgb = {
    r: 0,
    g: 0,
    b: 0
  };
  var a = 1;
  var s = null;
  var v = null;
  var l = null;
  var ok = false;
  var format = false;

  if (typeof color === 'string') {
    color = stringInputToObject(color);
  }

  if (typeof color === 'object') {
    if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
      rgb = rgbToRgb(color.r, color.g, color.b);
      ok = true;
      format = String(color.r).substr(-1) === '%' ? 'prgb' : 'rgb';
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
      s = convertToPercentage(color.s);
      v = convertToPercentage(color.v);
      rgb = hsvToRgb(color.h, s, v);
      ok = true;
      format = 'hsv';
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
      s = convertToPercentage(color.s);
      l = convertToPercentage(color.l);
      rgb = hslToRgb(color.h, s, l);
      ok = true;
      format = 'hsl';
    }

    if (Object.prototype.hasOwnProperty.call(color, 'a')) {
      a = color.a;
    }
  }

  a = boundAlpha(a);
  return {
    ok: ok,
    format: color.format || format,
    r: Math.min(255, Math.max(rgb.r, 0)),
    g: Math.min(255, Math.max(rgb.g, 0)),
    b: Math.min(255, Math.max(rgb.b, 0)),
    a: a
  };
} // <http://www.w3.org/TR/css3-values/#integers>

var CSS_INTEGER = '[-\\+]?\\d+%?'; // <http://www.w3.org/TR/css3-values/#number-value>

var CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?'; // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.

var CSS_UNIT = "(?:".concat(CSS_NUMBER, ")|(?:").concat(CSS_INTEGER, ")"); // Actual matching.
// Parentheses and commas are optional, but not required.
// Whitespace can take the place of commas or opening paren

var PERMISSIVE_MATCH3 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var PERMISSIVE_MATCH4 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var matchers = {
  CSS_UNIT: new RegExp(CSS_UNIT),
  rgb: new RegExp('rgb' + PERMISSIVE_MATCH3),
  rgba: new RegExp('rgba' + PERMISSIVE_MATCH4),
  hsl: new RegExp('hsl' + PERMISSIVE_MATCH3),
  hsla: new RegExp('hsla' + PERMISSIVE_MATCH4),
  hsv: new RegExp('hsv' + PERMISSIVE_MATCH3),
  hsva: new RegExp('hsva' + PERMISSIVE_MATCH4),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};
/**
 * Permissive string parsing.  Take in a number of formats, and output an object
 * based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
 */

function stringInputToObject(color) {
  color = color.trim().toLowerCase();

  if (color.length === 0) {
    return false;
  }

  var named = false;

  if (names[color]) {
    color = names[color];
    named = true;
  } else if (color === 'transparent') {
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
      format: 'name'
    };
  } // Try to match string input using regular expressions.
  // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
  // Just return an object and let the conversion functions handle that.
  // This way the result will be the same whether the tinycolor is initialized with string or object.


  var match = matchers.rgb.exec(color);

  if (match) {
    return {
      r: match[1],
      g: match[2],
      b: match[3]
    };
  }

  match = matchers.rgba.exec(color);

  if (match) {
    return {
      r: match[1],
      g: match[2],
      b: match[3],
      a: match[4]
    };
  }

  match = matchers.hsl.exec(color);

  if (match) {
    return {
      h: match[1],
      s: match[2],
      l: match[3]
    };
  }

  match = matchers.hsla.exec(color);

  if (match) {
    return {
      h: match[1],
      s: match[2],
      l: match[3],
      a: match[4]
    };
  }

  match = matchers.hsv.exec(color);

  if (match) {
    return {
      h: match[1],
      s: match[2],
      v: match[3]
    };
  }

  match = matchers.hsva.exec(color);

  if (match) {
    return {
      h: match[1],
      s: match[2],
      v: match[3],
      a: match[4]
    };
  }

  match = matchers.hex8.exec(color);

  if (match) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      a: convertHexToDecimal(match[4]),
      format: named ? 'name' : 'hex8'
    };
  }

  match = matchers.hex6.exec(color);

  if (match) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      format: named ? 'name' : 'hex'
    };
  }

  match = matchers.hex4.exec(color);

  if (match) {
    return {
      r: parseIntFromHex(match[1] + match[1]),
      g: parseIntFromHex(match[2] + match[2]),
      b: parseIntFromHex(match[3] + match[3]),
      a: convertHexToDecimal(match[4] + match[4]),
      format: named ? 'name' : 'hex8'
    };
  }

  match = matchers.hex3.exec(color);

  if (match) {
    return {
      r: parseIntFromHex(match[1] + match[1]),
      g: parseIntFromHex(match[2] + match[2]),
      b: parseIntFromHex(match[3] + match[3]),
      format: named ? 'name' : 'hex'
    };
  }

  return false;
}
/**
 * Check to see if it looks like a CSS unit
 * (see `matchers` above for definition).
 */

function isValidCSSUnit(color) {
  return Boolean(matchers.CSS_UNIT.exec(String(color)));
}
;// CONCATENATED MODULE: ./node_modules/@ant-design/colors/dist/index.esm.js

var hueStep = 2; // 色相阶梯

var saturationStep = 0.16; // 饱和度阶梯，浅色部分

var saturationStep2 = 0.05; // 饱和度阶梯，深色部分

var brightnessStep1 = 0.05; // 亮度阶梯，浅色部分

var brightnessStep2 = 0.15; // 亮度阶梯，深色部分

var lightColorCount = 5; // 浅色数量，主色上

var darkColorCount = 4; // 深色数量，主色下
// 暗色主题颜色映射关系表

var darkColorMap = [{
  index: 7,
  opacity: 0.15
}, {
  index: 6,
  opacity: 0.25
}, {
  index: 5,
  opacity: 0.3
}, {
  index: 5,
  opacity: 0.45
}, {
  index: 5,
  opacity: 0.65
}, {
  index: 5,
  opacity: 0.85
}, {
  index: 4,
  opacity: 0.9
}, {
  index: 3,
  opacity: 0.95
}, {
  index: 2,
  opacity: 0.97
}, {
  index: 1,
  opacity: 0.98
}]; // Wrapper function ported from TinyColor.prototype.toHsv
// Keep it here because of `hsv.h * 360`

function toHsv(_ref) {
  var r = _ref.r,
      g = _ref.g,
      b = _ref.b;
  var hsv = rgbToHsv(r, g, b);
  return {
    h: hsv.h * 360,
    s: hsv.s,
    v: hsv.v
  };
} // Wrapper function ported from TinyColor.prototype.toHexString
// Keep it here because of the prefix `#`


function toHex(_ref2) {
  var r = _ref2.r,
      g = _ref2.g,
      b = _ref2.b;
  return "#".concat(rgbToHex(r, g, b, false));
} // Wrapper function ported from TinyColor.prototype.mix, not treeshakable.
// Amount in range [0, 1]
// Assume color1 & color2 has no alpha, since the following src code did so.


function mix(rgb1, rgb2, amount) {
  var p = amount / 100;
  var rgb = {
    r: (rgb2.r - rgb1.r) * p + rgb1.r,
    g: (rgb2.g - rgb1.g) * p + rgb1.g,
    b: (rgb2.b - rgb1.b) * p + rgb1.b
  };
  return rgb;
}

function getHue(hsv, i, light) {
  var hue; // 根据色相不同，色相转向不同

  if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
    hue = light ? Math.round(hsv.h) - hueStep * i : Math.round(hsv.h) + hueStep * i;
  } else {
    hue = light ? Math.round(hsv.h) + hueStep * i : Math.round(hsv.h) - hueStep * i;
  }

  if (hue < 0) {
    hue += 360;
  } else if (hue >= 360) {
    hue -= 360;
  }

  return hue;
}

function getSaturation(hsv, i, light) {
  // grey color don't change saturation
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s;
  }

  var saturation;

  if (light) {
    saturation = hsv.s - saturationStep * i;
  } else if (i === darkColorCount) {
    saturation = hsv.s + saturationStep;
  } else {
    saturation = hsv.s + saturationStep2 * i;
  } // 边界值修正


  if (saturation > 1) {
    saturation = 1;
  } // 第一格的 s 限制在 0.06-0.1 之间


  if (light && i === lightColorCount && saturation > 0.1) {
    saturation = 0.1;
  }

  if (saturation < 0.06) {
    saturation = 0.06;
  }

  return Number(saturation.toFixed(2));
}

function index_esm_getValue(hsv, i, light) {
  var value;

  if (light) {
    value = hsv.v + brightnessStep1 * i;
  } else {
    value = hsv.v - brightnessStep2 * i;
  }

  if (value > 1) {
    value = 1;
  }

  return Number(value.toFixed(2));
}

function index_esm_generate(color) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var patterns = [];
  var pColor = inputToRGB(color);

  for (var i = lightColorCount; i > 0; i -= 1) {
    var hsv = toHsv(pColor);
    var colorString = toHex(inputToRGB({
      h: getHue(hsv, i, true),
      s: getSaturation(hsv, i, true),
      v: index_esm_getValue(hsv, i, true)
    }));
    patterns.push(colorString);
  }

  patterns.push(toHex(pColor));

  for (var _i = 1; _i <= darkColorCount; _i += 1) {
    var _hsv = toHsv(pColor);

    var _colorString = toHex(inputToRGB({
      h: getHue(_hsv, _i),
      s: getSaturation(_hsv, _i),
      v: index_esm_getValue(_hsv, _i)
    }));

    patterns.push(_colorString);
  } // dark theme patterns


  if (opts.theme === 'dark') {
    return darkColorMap.map(function (_ref3) {
      var index = _ref3.index,
          opacity = _ref3.opacity;
      var darkColorString = toHex(mix(inputToRGB(opts.backgroundColor || '#141414'), inputToRGB(patterns[index]), opacity * 100));
      return darkColorString;
    });
  }

  return patterns;
}

var presetPrimaryColors = {
  red: '#F5222D',
  volcano: '#FA541C',
  orange: '#FA8C16',
  gold: '#FAAD14',
  yellow: '#FADB14',
  lime: '#A0D911',
  green: '#52C41A',
  cyan: '#13C2C2',
  blue: '#1890FF',
  geekblue: '#2F54EB',
  purple: '#722ED1',
  magenta: '#EB2F96',
  grey: '#666666'
};
var presetPalettes = {};
var presetDarkPalettes = {};
Object.keys(presetPrimaryColors).forEach(function (key) {
  presetPalettes[key] = index_esm_generate(presetPrimaryColors[key]);
  presetPalettes[key].primary = presetPalettes[key][5]; // dark presetPalettes

  presetDarkPalettes[key] = index_esm_generate(presetPrimaryColors[key], {
    theme: 'dark',
    backgroundColor: '#141414'
  });
  presetDarkPalettes[key].primary = presetDarkPalettes[key][5];
});
var red = presetPalettes.red;
var volcano = presetPalettes.volcano;
var gold = presetPalettes.gold;
var orange = presetPalettes.orange;
var yellow = presetPalettes.yellow;
var lime = presetPalettes.lime;
var green = presetPalettes.green;
var cyan = presetPalettes.cyan;
var blue = presetPalettes.blue;
var geekblue = presetPalettes.geekblue;
var purple = presetPalettes.purple;
var magenta = presetPalettes.magenta;
var grey = presetPalettes.grey;

;// CONCATENATED MODULE: ./node_modules/@ant-design/icons-vue/es/insert-css.js

// https://github.com/substack/insert-css
var containers = []; // will store container HTMLElement references

var styleElements = []; // will store {prepend: HTMLElement, append: HTMLElement}

var usage = 'insert-css: You need to provide a CSS string. Usage: insertCss(cssString[, options]).';

function createStyleElement() {
  var styleElement = document.createElement('style');
  styleElement.setAttribute('type', 'text/css');
  return styleElement;
} // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types


function insertCss(css, options) {
  options = options || {};

  if (css === undefined) {
    throw new Error(usage);
  }

  var position = options.prepend === true ? 'prepend' : 'append';
  var container = options.container !== undefined ? options.container : document.querySelector('head');
  var containerId = containers.indexOf(container); // first time we see this container, create the necessary entries

  if (containerId === -1) {
    containerId = containers.push(container) - 1;
    styleElements[containerId] = {};
  } // try to get the correponding container + position styleElement, create it otherwise


  var styleElement;

  if (styleElements[containerId] !== undefined && styleElements[containerId][position] !== undefined) {
    styleElement = styleElements[containerId][position];
  } else {
    styleElement = styleElements[containerId][position] = createStyleElement();

    if (position === 'prepend') {
      container.insertBefore(styleElement, container.childNodes[0]);
    } else {
      container.appendChild(styleElement);
    }
  } // strip potential UTF-8 BOM if css was read from a file


  if (css.charCodeAt(0) === 0xfeff) {
    css = css.substr(1, css.length);
  } // actually add the stylesheet


  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText += css;
  } else {
    styleElement.textContent += css;
  }

  return styleElement;
}

/* harmony default export */ var insert_css = (insertCss);
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons-vue/es/utils.js
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? Object(arguments[i]) : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      utils_defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function utils_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}




function utils_warn(valid, message) {
  // Support uglify
  if (false) {}
}
function utils_warning(valid, message) {
  utils_warn(valid, "[@ant-design/icons-vue] ".concat(message));
} // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

function isIconDefinition(target) {
  return typeof target === 'object' && typeof target.name === 'string' && typeof target.theme === 'string' && (typeof target.icon === 'object' || typeof target.icon === 'function');
}
function normalizeAttrs() {
  var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.keys(attrs).reduce(function (acc, key) {
    var val = attrs[key];

    switch (key) {
      case 'class':
        acc.className = val;
        delete acc["class"];
        break;

      default:
        acc[key] = val;
    }

    return acc;
  }, {});
}
function utils_generate(node, key, rootProps) {
  if (!rootProps) {
    return runtime_core_esm_bundler_h(node.tag, _objectSpread({
      key: key
    }, node.attrs), (node.children || []).map(function (child, index) {
      return utils_generate(child, "".concat(key, "-").concat(node.tag, "-").concat(index));
    }));
  }

  return runtime_core_esm_bundler_h(node.tag, _objectSpread({
    key: key
  }, rootProps, node.attrs), (node.children || []).map(function (child, index) {
    return utils_generate(child, "".concat(key, "-").concat(node.tag, "-").concat(index));
  }));
}
function getSecondaryColor(primaryColor) {
  // choose the second color
  return index_esm_generate(primaryColor)[0];
}
function normalizeTwoToneColors(twoToneColor) {
  if (!twoToneColor) {
    return [];
  }

  return Array.isArray(twoToneColor) ? twoToneColor : [twoToneColor];
} // These props make sure that the SVG behaviours like general text.
// Reference: https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4

var svgBaseProps = {
  width: '1em',
  height: '1em',
  fill: 'currentColor',
  'aria-hidden': 'true',
  focusable: 'false'
};
var iconStyles = "\n.anticon {\n  display: inline-block;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n";
var cssInjectedFlag = false;
var useInsertStyles = function useInsertStyles() {
  var styleStr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : iconStyles;
  runtime_core_esm_bundler_nextTick(function () {
    if (!cssInjectedFlag) {
      if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
        insert_css(styleStr, {
          prepend: true
        });
      }

      cssInjectedFlag = true;
    }
  });
};
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons-vue/es/components/IconBase.js
var _excluded = ["icon", "primaryColor", "secondaryColor"];

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

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

function IconBase_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? Object(arguments[i]) : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      IconBase_defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function IconBase_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}


var twoToneColorPalette = {
  primaryColor: '#333',
  secondaryColor: '#E6E6E6',
  calculated: false
};

function setTwoToneColors(_ref) {
  var primaryColor = _ref.primaryColor,
      secondaryColor = _ref.secondaryColor;
  twoToneColorPalette.primaryColor = primaryColor;
  twoToneColorPalette.secondaryColor = secondaryColor || getSecondaryColor(primaryColor);
  twoToneColorPalette.calculated = !!secondaryColor;
}

function getTwoToneColors() {
  return IconBase_objectSpread({}, twoToneColorPalette);
}

var IconBase = function IconBase(props, context) {
  var _props$context$attrs = IconBase_objectSpread({}, props, context.attrs),
      icon = _props$context$attrs.icon,
      primaryColor = _props$context$attrs.primaryColor,
      secondaryColor = _props$context$attrs.secondaryColor,
      restProps = _objectWithoutProperties(_props$context$attrs, _excluded);

  var colors = twoToneColorPalette;

  if (primaryColor) {
    colors = {
      primaryColor: primaryColor,
      secondaryColor: secondaryColor || getSecondaryColor(primaryColor)
    };
  }

  useInsertStyles();
  utils_warning(isIconDefinition(icon), "icon should be icon definiton, but got ".concat(icon));

  if (!isIconDefinition(icon)) {
    return null;
  }

  var target = icon;

  if (target && typeof target.icon === 'function') {
    target = IconBase_objectSpread({}, target, {
      icon: target.icon(colors.primaryColor, colors.secondaryColor)
    });
  }

  return utils_generate(target.icon, "svg-".concat(target.name), IconBase_objectSpread({}, restProps, {
    'data-icon': target.name,
    width: '1em',
    height: '1em',
    fill: 'currentColor',
    'aria-hidden': 'true'
  })); // },
};

IconBase.props = {
  icon: Object,
  primaryColor: String,
  secondaryColor: String,
  focusable: String
};
IconBase.inheritAttrs = false;
IconBase.displayName = 'IconBase';
IconBase.getTwoToneColors = getTwoToneColors;
IconBase.setTwoToneColors = setTwoToneColors;
/* harmony default export */ var components_IconBase = (IconBase);
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons-vue/es/components/twoTonePrimaryColor.js


function twoTonePrimaryColor_slicedToArray(arr, i) {
  return twoTonePrimaryColor_arrayWithHoles(arr) || twoTonePrimaryColor_iterableToArrayLimit(arr, i) || twoTonePrimaryColor_unsupportedIterableToArray(arr, i) || twoTonePrimaryColor_nonIterableRest();
}

function twoTonePrimaryColor_nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function twoTonePrimaryColor_unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return twoTonePrimaryColor_arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return twoTonePrimaryColor_arrayLikeToArray(o, minLen);
}

function twoTonePrimaryColor_arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function twoTonePrimaryColor_iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function twoTonePrimaryColor_arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}



function setTwoToneColor(twoToneColor) {
  var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor),
      _normalizeTwoToneColo2 = twoTonePrimaryColor_slicedToArray(_normalizeTwoToneColo, 2),
      primaryColor = _normalizeTwoToneColo2[0],
      secondaryColor = _normalizeTwoToneColo2[1];

  return components_IconBase.setTwoToneColors({
    primaryColor: primaryColor,
    secondaryColor: secondaryColor
  });
}
function getTwoToneColor() {
  var colors = components_IconBase.getTwoToneColors();

  if (!colors.calculated) {
    return colors.primaryColor;
  }

  return [colors.primaryColor, colors.secondaryColor];
}
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons-vue/es/components/AntdIcon.js

var AntdIcon_excluded = ["class", "icon", "spin", "rotate", "tabindex", "twoToneColor", "onClick"];


function AntdIcon_slicedToArray(arr, i) {
  return AntdIcon_arrayWithHoles(arr) || AntdIcon_iterableToArrayLimit(arr, i) || AntdIcon_unsupportedIterableToArray(arr, i) || AntdIcon_nonIterableRest();
}

function AntdIcon_nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function AntdIcon_unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return AntdIcon_arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return AntdIcon_arrayLikeToArray(o, minLen);
}

function AntdIcon_arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function AntdIcon_iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function AntdIcon_arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function AntdIcon_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? Object(arguments[i]) : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      AntdIcon_defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function AntdIcon_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function AntdIcon_objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = AntdIcon_objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function AntdIcon_objectWithoutPropertiesLoose(source, excluded) {
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



 // Initial setting

setTwoToneColor('#1890ff');

var Icon = function Icon(props, context) {
  var _classObj;

  var _props$context$attrs = AntdIcon_objectSpread({}, props, context.attrs),
      cls = _props$context$attrs["class"],
      icon = _props$context$attrs.icon,
      spin = _props$context$attrs.spin,
      rotate = _props$context$attrs.rotate,
      tabindex = _props$context$attrs.tabindex,
      twoToneColor = _props$context$attrs.twoToneColor,
      onClick = _props$context$attrs.onClick,
      restProps = AntdIcon_objectWithoutProperties(_props$context$attrs, AntdIcon_excluded);

  var classObj = (_classObj = {
    anticon: true
  }, AntdIcon_defineProperty(_classObj, "anticon-".concat(icon.name), Boolean(icon.name)), AntdIcon_defineProperty(_classObj, cls, cls), _classObj);
  var svgClassString = spin === '' || !!spin || icon.name === 'loading' ? 'anticon-spin' : '';
  var iconTabIndex = tabindex;

  if (iconTabIndex === undefined && onClick) {
    iconTabIndex = -1;
    restProps.tabindex = iconTabIndex;
  }

  var svgStyle = rotate ? {
    msTransform: "rotate(".concat(rotate, "deg)"),
    transform: "rotate(".concat(rotate, "deg)")
  } : undefined;

  var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor),
      _normalizeTwoToneColo2 = AntdIcon_slicedToArray(_normalizeTwoToneColo, 2),
      primaryColor = _normalizeTwoToneColo2[0],
      secondaryColor = _normalizeTwoToneColo2[1];

  return createVNode("span", AntdIcon_objectSpread({
    "role": "img",
    "aria-label": icon.name
  }, restProps, {
    "onClick": onClick,
    "class": classObj
  }), [createVNode(components_IconBase, {
    "class": svgClassString,
    "icon": icon,
    "primaryColor": primaryColor,
    "secondaryColor": secondaryColor,
    "style": svgStyle
  }, null)]);
};

Icon.props = {
  spin: Boolean,
  rotate: Number,
  icon: Object,
  twoToneColor: String
};
Icon.displayName = 'AntdIcon';
Icon.inheritAttrs = false;
Icon.getTwoToneColor = getTwoToneColor;
Icon.setTwoToneColor = setTwoToneColor;
/* harmony default export */ var AntdIcon = (Icon);
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons-vue/es/icons/LoadingOutlined.js


function LoadingOutlined_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? Object(arguments[i]) : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      LoadingOutlined_defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function LoadingOutlined_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
} // GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY





var LoadingOutlined_LoadingOutlined = function LoadingOutlined(props, context) {
  var p = LoadingOutlined_objectSpread({}, props, context.attrs);

  return createVNode(AntdIcon, LoadingOutlined_objectSpread({}, p, {
    "icon": asn_LoadingOutlined
  }), null);
};

LoadingOutlined_LoadingOutlined.displayName = 'LoadingOutlined';
LoadingOutlined_LoadingOutlined.inheritAttrs = false;
/* harmony default export */ var icons_LoadingOutlined = (LoadingOutlined_LoadingOutlined);
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons-svg/es/asn/ExclamationCircleFilled.js
// This icon file is generated automatically.
var ExclamationCircleFilled = {
  "icon": {
    "tag": "svg",
    "attrs": {
      "viewBox": "64 64 896 896",
      "focusable": "false"
    },
    "children": [{
      "tag": "path",
      "attrs": {
        "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"
      }
    }]
  },
  "name": "exclamation-circle",
  "theme": "filled"
};
/* harmony default export */ var asn_ExclamationCircleFilled = (ExclamationCircleFilled);
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons-vue/es/icons/ExclamationCircleFilled.js


function ExclamationCircleFilled_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? Object(arguments[i]) : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      ExclamationCircleFilled_defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function ExclamationCircleFilled_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
} // GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY





var ExclamationCircleFilled_ExclamationCircleFilled = function ExclamationCircleFilled(props, context) {
  var p = ExclamationCircleFilled_objectSpread({}, props, context.attrs);

  return createVNode(AntdIcon, ExclamationCircleFilled_objectSpread({}, p, {
    "icon": asn_ExclamationCircleFilled
  }), null);
};

ExclamationCircleFilled_ExclamationCircleFilled.displayName = 'ExclamationCircleFilled';
ExclamationCircleFilled_ExclamationCircleFilled.inheritAttrs = false;
/* harmony default export */ var icons_ExclamationCircleFilled = (ExclamationCircleFilled_ExclamationCircleFilled);
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons-svg/es/asn/CloseCircleFilled.js
// This icon file is generated automatically.
var CloseCircleFilled = {
  "icon": {
    "tag": "svg",
    "attrs": {
      "viewBox": "64 64 896 896",
      "focusable": "false"
    },
    "children": [{
      "tag": "path",
      "attrs": {
        "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"
      }
    }]
  },
  "name": "close-circle",
  "theme": "filled"
};
/* harmony default export */ var asn_CloseCircleFilled = (CloseCircleFilled);
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons-vue/es/icons/CloseCircleFilled.js


function CloseCircleFilled_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? Object(arguments[i]) : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      CloseCircleFilled_defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function CloseCircleFilled_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
} // GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY





var CloseCircleFilled_CloseCircleFilled = function CloseCircleFilled(props, context) {
  var p = CloseCircleFilled_objectSpread({}, props, context.attrs);

  return createVNode(AntdIcon, CloseCircleFilled_objectSpread({}, p, {
    "icon": asn_CloseCircleFilled
  }), null);
};

CloseCircleFilled_CloseCircleFilled.displayName = 'CloseCircleFilled';
CloseCircleFilled_CloseCircleFilled.inheritAttrs = false;
/* harmony default export */ var icons_CloseCircleFilled = (CloseCircleFilled_CloseCircleFilled);
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons-svg/es/asn/CheckCircleFilled.js
// This icon file is generated automatically.
var CheckCircleFilled = {
  "icon": {
    "tag": "svg",
    "attrs": {
      "viewBox": "64 64 896 896",
      "focusable": "false"
    },
    "children": [{
      "tag": "path",
      "attrs": {
        "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"
      }
    }]
  },
  "name": "check-circle",
  "theme": "filled"
};
/* harmony default export */ var asn_CheckCircleFilled = (CheckCircleFilled);
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons-vue/es/icons/CheckCircleFilled.js


function CheckCircleFilled_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? Object(arguments[i]) : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      CheckCircleFilled_defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function CheckCircleFilled_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
} // GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY





var CheckCircleFilled_CheckCircleFilled = function CheckCircleFilled(props, context) {
  var p = CheckCircleFilled_objectSpread({}, props, context.attrs);

  return createVNode(AntdIcon, CheckCircleFilled_objectSpread({}, p, {
    "icon": asn_CheckCircleFilled
  }), null);
};

CheckCircleFilled_CheckCircleFilled.displayName = 'CheckCircleFilled';
CheckCircleFilled_CheckCircleFilled.inheritAttrs = false;
/* harmony default export */ var icons_CheckCircleFilled = (CheckCircleFilled_CheckCircleFilled);
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons-svg/es/asn/InfoCircleFilled.js
// This icon file is generated automatically.
var InfoCircleFilled = {
  "icon": {
    "tag": "svg",
    "attrs": {
      "viewBox": "64 64 896 896",
      "focusable": "false"
    },
    "children": [{
      "tag": "path",
      "attrs": {
        "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"
      }
    }]
  },
  "name": "info-circle",
  "theme": "filled"
};
/* harmony default export */ var asn_InfoCircleFilled = (InfoCircleFilled);
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons-vue/es/icons/InfoCircleFilled.js


function InfoCircleFilled_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? Object(arguments[i]) : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      InfoCircleFilled_defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function InfoCircleFilled_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
} // GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY





var InfoCircleFilled_InfoCircleFilled = function InfoCircleFilled(props, context) {
  var p = InfoCircleFilled_objectSpread({}, props, context.attrs);

  return createVNode(AntdIcon, InfoCircleFilled_objectSpread({}, p, {
    "icon": asn_InfoCircleFilled
  }), null);
};

InfoCircleFilled_InfoCircleFilled.displayName = 'InfoCircleFilled';
InfoCircleFilled_InfoCircleFilled.inheritAttrs = false;
/* harmony default export */ var icons_InfoCircleFilled = (InfoCircleFilled_InfoCircleFilled);
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/message/index.js










var defaultDuration = 3;
var defaultTop;
var messageInstance;
var key = 1;
var localPrefixCls = '';
var transitionName = 'move-up';
var hasTransitionName = false;

var getContainer = function getContainer() {
  return document.body;
};

var maxCount;
var rtl = false;
function getKeyThenIncreaseKey() {
  return key++;
}

function setMessageConfig(options) {
  if (options.top !== undefined) {
    defaultTop = options.top;
    messageInstance = null; // delete messageInstance for new defaultTop
  }

  if (options.duration !== undefined) {
    defaultDuration = options.duration;
  }

  if (options.prefixCls !== undefined) {
    localPrefixCls = options.prefixCls;
  }

  if (options.getContainer !== undefined) {
    getContainer = options.getContainer;
    messageInstance = null; // delete messageInstance for new getContainer
  }

  if (options.transitionName !== undefined) {
    transitionName = options.transitionName;
    messageInstance = null; // delete messageInstance for new transitionName

    hasTransitionName = true;
  }

  if (options.maxCount !== undefined) {
    maxCount = options.maxCount;
    messageInstance = null;
  }

  if (options.rtl !== undefined) {
    rtl = options.rtl;
  }
}

function getMessageInstance(args, callback) {
  if (messageInstance) {
    callback(messageInstance);
    return;
  }

  vc_notification.newInstance({
    appContext: args.appContext,
    prefixCls: args.prefixCls || localPrefixCls,
    rootPrefixCls: args.rootPrefixCls,
    transitionName: transitionName,
    hasTransitionName: hasTransitionName,
    style: {
      top: defaultTop
    },
    getContainer: getContainer || args.getPopupContainer,
    maxCount: maxCount,
    name: 'message'
  }, function (instance) {
    if (messageInstance) {
      callback(messageInstance);
      return;
    }

    messageInstance = instance;
    callback(instance);
  });
}

var typeToIcon = {
  info: icons_InfoCircleFilled,
  success: icons_CheckCircleFilled,
  error: icons_CloseCircleFilled,
  warning: icons_ExclamationCircleFilled,
  loading: icons_LoadingOutlined
};

function notice(args) {
  var duration = args.duration !== undefined ? args.duration : defaultDuration;
  var target = args.key || getKeyThenIncreaseKey();
  var closePromise = new Promise(function (resolve) {
    var callback = function callback() {
      if (typeof args.onClose === 'function') {
        args.onClose();
      }

      return resolve(true);
    };

    getMessageInstance(args, function (instance) {
      instance.notice({
        key: target,
        duration: duration,
        style: args.style || {},
        class: args.class,
        content: function content(_ref) {
          var _classNames;

          var prefixCls = _ref.prefixCls;
          var Icon = typeToIcon[args.type];
          var iconNode = Icon ? createVNode(Icon, null, null) : '';
          var messageClass = _util_classNames("".concat(prefixCls, "-custom-content"), (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-").concat(args.type), args.type), _defineProperty(_classNames, "".concat(prefixCls, "-rtl"), rtl === true), _classNames));
          return createVNode("div", {
            "class": messageClass
          }, [typeof args.icon === 'function' ? args.icon() : args.icon || iconNode, createVNode("span", null, [typeof args.content === 'function' ? args.content() : args.content])]);
        },
        onClose: callback,
        onClick: args.onClick
      });
    });
  });

  var result = function result() {
    if (messageInstance) {
      messageInstance.removeNotice(target);
    }
  };

  result.then = function (filled, rejected) {
    return closePromise.then(filled, rejected);
  };

  result.promise = closePromise;
  return result;
}

function isArgsProps(content) {
  return Object.prototype.toString.call(content) === '[object Object]' && !!content.content;
}

var api = {
  open: notice,
  config: setMessageConfig,
  destroy: function destroy(messageKey) {
    if (messageInstance) {
      if (messageKey) {
        var _messageInstance = messageInstance,
            removeNotice = _messageInstance.removeNotice;
        removeNotice(messageKey);
      } else {
        var _messageInstance2 = messageInstance,
            destroy = _messageInstance2.destroy;
        destroy();
        messageInstance = null;
      }
    }
  }
};
function attachTypeApi(originalApi, type) {
  originalApi[type] = function (content, duration, onClose) {
    if (isArgsProps(content)) {
      return originalApi.open(extends_extends(extends_extends({}, content), {
        type: type
      }));
    }

    if (typeof duration === 'function') {
      onClose = duration;
      duration = undefined;
    }

    return originalApi.open({
      content: content,
      duration: duration,
      type: type,
      onClose: onClose
    });
  };
}
['success', 'info', 'warning', 'error', 'loading'].forEach(function (type) {
  return attachTypeApi(api, type);
});
api.warn = api.warning;
/** @private test Only function. Not work on production */

var getInstance = function getInstance() {
  return  false ? 0 : null;
};
/* harmony default export */ var message = (api);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(5108);
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons-svg/es/asn/CheckCircleOutlined.js
// This icon file is generated automatically.
var CheckCircleOutlined = {
  "icon": {
    "tag": "svg",
    "attrs": {
      "viewBox": "64 64 896 896",
      "focusable": "false"
    },
    "children": [{
      "tag": "path",
      "attrs": {
        "d": "M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"
      }
    }, {
      "tag": "path",
      "attrs": {
        "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
      }
    }]
  },
  "name": "check-circle",
  "theme": "outlined"
};
/* harmony default export */ var asn_CheckCircleOutlined = (CheckCircleOutlined);
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons-vue/es/icons/CheckCircleOutlined.js


function CheckCircleOutlined_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? Object(arguments[i]) : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      CheckCircleOutlined_defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function CheckCircleOutlined_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
} // GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY





var CheckCircleOutlined_CheckCircleOutlined = function CheckCircleOutlined(props, context) {
  var p = CheckCircleOutlined_objectSpread({}, props, context.attrs);

  return createVNode(AntdIcon, CheckCircleOutlined_objectSpread({}, p, {
    "icon": asn_CheckCircleOutlined
  }), null);
};

CheckCircleOutlined_CheckCircleOutlined.displayName = 'CheckCircleOutlined';
CheckCircleOutlined_CheckCircleOutlined.inheritAttrs = false;
/* harmony default export */ var icons_CheckCircleOutlined = (CheckCircleOutlined_CheckCircleOutlined);
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons-svg/es/asn/InfoCircleOutlined.js
// This icon file is generated automatically.
var InfoCircleOutlined = {
  "icon": {
    "tag": "svg",
    "attrs": {
      "viewBox": "64 64 896 896",
      "focusable": "false"
    },
    "children": [{
      "tag": "path",
      "attrs": {
        "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
      }
    }, {
      "tag": "path",
      "attrs": {
        "d": "M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"
      }
    }]
  },
  "name": "info-circle",
  "theme": "outlined"
};
/* harmony default export */ var asn_InfoCircleOutlined = (InfoCircleOutlined);
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons-vue/es/icons/InfoCircleOutlined.js


function InfoCircleOutlined_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? Object(arguments[i]) : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      InfoCircleOutlined_defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function InfoCircleOutlined_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
} // GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY





var InfoCircleOutlined_InfoCircleOutlined = function InfoCircleOutlined(props, context) {
  var p = InfoCircleOutlined_objectSpread({}, props, context.attrs);

  return createVNode(AntdIcon, InfoCircleOutlined_objectSpread({}, p, {
    "icon": asn_InfoCircleOutlined
  }), null);
};

InfoCircleOutlined_InfoCircleOutlined.displayName = 'InfoCircleOutlined';
InfoCircleOutlined_InfoCircleOutlined.inheritAttrs = false;
/* harmony default export */ var icons_InfoCircleOutlined = (InfoCircleOutlined_InfoCircleOutlined);
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons-svg/es/asn/CloseCircleOutlined.js
// This icon file is generated automatically.
var CloseCircleOutlined = {
  "icon": {
    "tag": "svg",
    "attrs": {
      "viewBox": "64 64 896 896",
      "focusable": "false"
    },
    "children": [{
      "tag": "path",
      "attrs": {
        "d": "M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"
      }
    }, {
      "tag": "path",
      "attrs": {
        "d": "M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
      }
    }]
  },
  "name": "close-circle",
  "theme": "outlined"
};
/* harmony default export */ var asn_CloseCircleOutlined = (CloseCircleOutlined);
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons-vue/es/icons/CloseCircleOutlined.js


function CloseCircleOutlined_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? Object(arguments[i]) : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      CloseCircleOutlined_defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function CloseCircleOutlined_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
} // GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY





var CloseCircleOutlined_CloseCircleOutlined = function CloseCircleOutlined(props, context) {
  var p = CloseCircleOutlined_objectSpread({}, props, context.attrs);

  return createVNode(AntdIcon, CloseCircleOutlined_objectSpread({}, p, {
    "icon": asn_CloseCircleOutlined
  }), null);
};

CloseCircleOutlined_CloseCircleOutlined.displayName = 'CloseCircleOutlined';
CloseCircleOutlined_CloseCircleOutlined.inheritAttrs = false;
/* harmony default export */ var icons_CloseCircleOutlined = (CloseCircleOutlined_CloseCircleOutlined);
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons-svg/es/asn/ExclamationCircleOutlined.js
// This icon file is generated automatically.
var ExclamationCircleOutlined = {
  "icon": {
    "tag": "svg",
    "attrs": {
      "viewBox": "64 64 896 896",
      "focusable": "false"
    },
    "children": [{
      "tag": "path",
      "attrs": {
        "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
      }
    }, {
      "tag": "path",
      "attrs": {
        "d": "M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z"
      }
    }]
  },
  "name": "exclamation-circle",
  "theme": "outlined"
};
/* harmony default export */ var asn_ExclamationCircleOutlined = (ExclamationCircleOutlined);
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons-vue/es/icons/ExclamationCircleOutlined.js


function ExclamationCircleOutlined_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? Object(arguments[i]) : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      ExclamationCircleOutlined_defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function ExclamationCircleOutlined_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
} // GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY





var ExclamationCircleOutlined_ExclamationCircleOutlined = function ExclamationCircleOutlined(props, context) {
  var p = ExclamationCircleOutlined_objectSpread({}, props, context.attrs);

  return createVNode(AntdIcon, ExclamationCircleOutlined_objectSpread({}, p, {
    "icon": asn_ExclamationCircleOutlined
  }), null);
};

ExclamationCircleOutlined_ExclamationCircleOutlined.displayName = 'ExclamationCircleOutlined';
ExclamationCircleOutlined_ExclamationCircleOutlined.inheritAttrs = false;
/* harmony default export */ var icons_ExclamationCircleOutlined = (ExclamationCircleOutlined_ExclamationCircleOutlined);
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons-svg/es/asn/CloseOutlined.js
// This icon file is generated automatically.
var CloseOutlined = {
  "icon": {
    "tag": "svg",
    "attrs": {
      "viewBox": "64 64 896 896",
      "focusable": "false"
    },
    "children": [{
      "tag": "path",
      "attrs": {
        "d": "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
      }
    }]
  },
  "name": "close",
  "theme": "outlined"
};
/* harmony default export */ var asn_CloseOutlined = (CloseOutlined);
;// CONCATENATED MODULE: ./node_modules/@ant-design/icons-vue/es/icons/CloseOutlined.js


function CloseOutlined_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? Object(arguments[i]) : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      CloseOutlined_defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function CloseOutlined_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
} // GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY





var CloseOutlined_CloseOutlined = function CloseOutlined(props, context) {
  var p = CloseOutlined_objectSpread({}, props, context.attrs);

  return createVNode(AntdIcon, CloseOutlined_objectSpread({}, p, {
    "icon": asn_CloseOutlined
  }), null);
};

CloseOutlined_CloseOutlined.displayName = 'CloseOutlined';
CloseOutlined_CloseOutlined.inheritAttrs = false;
/* harmony default export */ var icons_CloseOutlined = (CloseOutlined_CloseOutlined);
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/notification/index.js





var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};










var notificationInstance = {};
var notification_defaultDuration = 4.5;
var notification_defaultTop = '24px';
var defaultBottom = '24px';
var defaultPrefixCls = '';
var defaultPlacement = 'topRight';

var defaultGetContainer = function defaultGetContainer() {
  return document.body;
};

var defaultCloseIcon = null;
var notification_rtl = false;
var notification_maxCount;

function setNotificationConfig(options) {
  var duration = options.duration,
      placement = options.placement,
      bottom = options.bottom,
      top = options.top,
      getContainer = options.getContainer,
      closeIcon = options.closeIcon,
      prefixCls = options.prefixCls;

  if (prefixCls !== undefined) {
    defaultPrefixCls = prefixCls;
  }

  if (duration !== undefined) {
    notification_defaultDuration = duration;
  }

  if (placement !== undefined) {
    defaultPlacement = placement;
  }

  if (bottom !== undefined) {
    defaultBottom = typeof bottom === 'number' ? "".concat(bottom, "px") : bottom;
  }

  if (top !== undefined) {
    notification_defaultTop = typeof top === 'number' ? "".concat(top, "px") : top;
  }

  if (getContainer !== undefined) {
    defaultGetContainer = getContainer;
  }

  if (closeIcon !== undefined) {
    defaultCloseIcon = closeIcon;
  }

  if (options.rtl !== undefined) {
    notification_rtl = options.rtl;
  }

  if (options.maxCount !== undefined) {
    notification_maxCount = options.maxCount;
  }
}

function getPlacementStyle(placement) {
  var top = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : notification_defaultTop;
  var bottom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultBottom;
  var style;

  switch (placement) {
    case 'topLeft':
      style = {
        left: '0px',
        top: top,
        bottom: 'auto'
      };
      break;

    case 'topRight':
      style = {
        right: '0px',
        top: top,
        bottom: 'auto'
      };
      break;

    case 'bottomLeft':
      style = {
        left: '0px',
        top: 'auto',
        bottom: bottom
      };
      break;

    default:
      style = {
        right: '0px',
        top: 'auto',
        bottom: bottom
      };
      break;
  }

  return style;
}

function getNotificationInstance(_ref, callback) {
  var customizePrefixCls = _ref.prefixCls,
      _ref$placement = _ref.placement,
      placement = _ref$placement === void 0 ? defaultPlacement : _ref$placement,
      _ref$getContainer = _ref.getContainer,
      getContainer = _ref$getContainer === void 0 ? defaultGetContainer : _ref$getContainer,
      top = _ref.top,
      bottom = _ref.bottom,
      _ref$closeIcon = _ref.closeIcon,
      _closeIcon = _ref$closeIcon === void 0 ? defaultCloseIcon : _ref$closeIcon,
      appContext = _ref.appContext;

  var _globalConfig = globalConfig(),
      getPrefixCls = _globalConfig.getPrefixCls;

  var prefixCls = getPrefixCls('notification', customizePrefixCls || defaultPrefixCls);
  var cacheKey = "".concat(prefixCls, "-").concat(placement, "-").concat(notification_rtl);
  var cacheInstance = notificationInstance[cacheKey];

  if (cacheInstance) {
    Promise.resolve(cacheInstance).then(function (instance) {
      callback(instance);
    });
    return;
  }

  var notificationClass = _util_classNames("".concat(prefixCls, "-").concat(placement), _defineProperty({}, "".concat(prefixCls, "-rtl"), notification_rtl === true));
  vc_notification.newInstance({
    name: 'notification',
    prefixCls: customizePrefixCls || defaultPrefixCls,
    class: notificationClass,
    style: getPlacementStyle(placement, top, bottom),
    appContext: appContext,
    getContainer: getContainer,
    closeIcon: function closeIcon(_ref2) {
      var prefixCls = _ref2.prefixCls;

      var closeIconToRender = createVNode("span", {
        "class": "".concat(prefixCls, "-close-x")
      }, [renderHelper(_closeIcon, {}, createVNode(icons_CloseOutlined, {
        "class": "".concat(prefixCls, "-close-icon")
      }, null))]);

      return closeIconToRender;
    },
    maxCount: notification_maxCount,
    hasTransitionName: true
  }, function (notification) {
    notificationInstance[cacheKey] = notification;
    callback(notification);
  });
}

var notification_typeToIcon = {
  success: icons_CheckCircleOutlined,
  info: icons_InfoCircleOutlined,
  error: icons_CloseCircleOutlined,
  warning: icons_ExclamationCircleOutlined
};

function notification_notice(args) {
  var icon = args.icon,
      type = args.type,
      description = args.description,
      message = args.message,
      btn = args.btn;
  var duration = args.duration === undefined ? notification_defaultDuration : args.duration;
  getNotificationInstance(args, function (notification) {
    notification.notice({
      content: function content(_ref3) {
        var outerPrefixCls = _ref3.prefixCls;
        var prefixCls = "".concat(outerPrefixCls, "-notice");
        var iconNode = null;

        if (icon) {
          iconNode = function iconNode() {
            return createVNode("span", {
              "class": "".concat(prefixCls, "-icon")
            }, [renderHelper(icon)]);
          };
        } else if (type) {
          var Icon = notification_typeToIcon[type];

          iconNode = function iconNode() {
            return createVNode(Icon, {
              "class": "".concat(prefixCls, "-icon ").concat(prefixCls, "-icon-").concat(type)
            }, null);
          };
        }

        return createVNode("div", {
          "class": iconNode ? "".concat(prefixCls, "-with-icon") : ''
        }, [iconNode && iconNode(), createVNode("div", {
          "class": "".concat(prefixCls, "-message")
        }, [!description && iconNode ? createVNode("span", {
          "class": "".concat(prefixCls, "-message-single-line-auto-margin")
        }, null) : null, renderHelper(message)]), createVNode("div", {
          "class": "".concat(prefixCls, "-description")
        }, [renderHelper(description)]), btn ? createVNode("span", {
          "class": "".concat(prefixCls, "-btn")
        }, [renderHelper(btn)]) : null]);
      },
      duration: duration,
      closable: true,
      onClose: args.onClose,
      onClick: args.onClick,
      key: args.key,
      style: args.style || {},
      class: args.class
    });
  });
}

var notification_api = {
  open: notification_notice,
  close: function close(key) {
    Object.keys(notificationInstance).forEach(function (cacheKey) {
      return Promise.resolve(notificationInstance[cacheKey]).then(function (instance) {
        instance.removeNotice(key);
      });
    });
  },
  config: setNotificationConfig,
  destroy: function destroy() {
    Object.keys(notificationInstance).forEach(function (cacheKey) {
      Promise.resolve(notificationInstance[cacheKey]).then(function (instance) {
        instance.destroy();
      });
      delete notificationInstance[cacheKey]; // lgtm[js/missing-await]
    });
  }
};
var iconTypes = ['success', 'info', 'warning', 'error'];
iconTypes.forEach(function (type) {
  notification_api[type] = function (args) {
    return notification_api.open(extends_extends(extends_extends({}, args), {
      type: type
    }));
  };
});
notification_api.warn = notification_api.warning;
/** @private test Only function. Not work on production */

var notification_getInstance = function getInstance(cacheKey) {
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return",  false ? 0 : null);

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
};
/* harmony default export */ var notification = (notification_api);
;// CONCATENATED MODULE: ./node_modules/@ctrl/tinycolor/dist/module/index.js





var TinyColor =
/** @class */
function () {
  function TinyColor(color, opts) {
    if (color === void 0) {
      color = '';
    }

    if (opts === void 0) {
      opts = {};
    }

    var _a; // If input is already a tinycolor, return itself


    if (color instanceof TinyColor) {
      // eslint-disable-next-line no-constructor-return
      return color;
    }

    if (typeof color === 'number') {
      color = numberInputToObject(color);
    }

    this.originalInput = color;
    var rgb = inputToRGB(color);
    this.originalInput = color;
    this.r = rgb.r;
    this.g = rgb.g;
    this.b = rgb.b;
    this.a = rgb.a;
    this.roundA = Math.round(100 * this.a) / 100;
    this.format = (_a = opts.format) !== null && _a !== void 0 ? _a : rgb.format;
    this.gradientType = opts.gradientType; // Don't let the range of [0,255] come back in [0,1].
    // Potentially lose a little bit of precision here, but will fix issues where
    // .5 gets interpreted as half of the total, instead of half of 1
    // If it was supposed to be 128, this was already taken care of by `inputToRgb`

    if (this.r < 1) {
      this.r = Math.round(this.r);
    }

    if (this.g < 1) {
      this.g = Math.round(this.g);
    }

    if (this.b < 1) {
      this.b = Math.round(this.b);
    }

    this.isValid = rgb.ok;
  }

  TinyColor.prototype.isDark = function () {
    return this.getBrightness() < 128;
  };

  TinyColor.prototype.isLight = function () {
    return !this.isDark();
  };
  /**
   * Returns the perceived brightness of the color, from 0-255.
   */


  TinyColor.prototype.getBrightness = function () {
    // http://www.w3.org/TR/AERT#color-contrast
    var rgb = this.toRgb();
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  };
  /**
   * Returns the perceived luminance of a color, from 0-1.
   */


  TinyColor.prototype.getLuminance = function () {
    // http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
    var rgb = this.toRgb();
    var R;
    var G;
    var B;
    var RsRGB = rgb.r / 255;
    var GsRGB = rgb.g / 255;
    var BsRGB = rgb.b / 255;

    if (RsRGB <= 0.03928) {
      R = RsRGB / 12.92;
    } else {
      // eslint-disable-next-line prefer-exponentiation-operator
      R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
    }

    if (GsRGB <= 0.03928) {
      G = GsRGB / 12.92;
    } else {
      // eslint-disable-next-line prefer-exponentiation-operator
      G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
    }

    if (BsRGB <= 0.03928) {
      B = BsRGB / 12.92;
    } else {
      // eslint-disable-next-line prefer-exponentiation-operator
      B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
    }

    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  };
  /**
   * Returns the alpha value of a color, from 0-1.
   */


  TinyColor.prototype.getAlpha = function () {
    return this.a;
  };
  /**
   * Sets the alpha value on the current color.
   *
   * @param alpha - The new alpha value. The accepted range is 0-1.
   */


  TinyColor.prototype.setAlpha = function (alpha) {
    this.a = boundAlpha(alpha);
    this.roundA = Math.round(100 * this.a) / 100;
    return this;
  };
  /**
   * Returns the object as a HSVA object.
   */


  TinyColor.prototype.toHsv = function () {
    var hsv = rgbToHsv(this.r, this.g, this.b);
    return {
      h: hsv.h * 360,
      s: hsv.s,
      v: hsv.v,
      a: this.a
    };
  };
  /**
   * Returns the hsva values interpolated into a string with the following format:
   * "hsva(xxx, xxx, xxx, xx)".
   */


  TinyColor.prototype.toHsvString = function () {
    var hsv = rgbToHsv(this.r, this.g, this.b);
    var h = Math.round(hsv.h * 360);
    var s = Math.round(hsv.s * 100);
    var v = Math.round(hsv.v * 100);
    return this.a === 1 ? "hsv(".concat(h, ", ").concat(s, "%, ").concat(v, "%)") : "hsva(".concat(h, ", ").concat(s, "%, ").concat(v, "%, ").concat(this.roundA, ")");
  };
  /**
   * Returns the object as a HSLA object.
   */


  TinyColor.prototype.toHsl = function () {
    var hsl = rgbToHsl(this.r, this.g, this.b);
    return {
      h: hsl.h * 360,
      s: hsl.s,
      l: hsl.l,
      a: this.a
    };
  };
  /**
   * Returns the hsla values interpolated into a string with the following format:
   * "hsla(xxx, xxx, xxx, xx)".
   */


  TinyColor.prototype.toHslString = function () {
    var hsl = rgbToHsl(this.r, this.g, this.b);
    var h = Math.round(hsl.h * 360);
    var s = Math.round(hsl.s * 100);
    var l = Math.round(hsl.l * 100);
    return this.a === 1 ? "hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)") : "hsla(".concat(h, ", ").concat(s, "%, ").concat(l, "%, ").concat(this.roundA, ")");
  };
  /**
   * Returns the hex value of the color.
   * @param allow3Char will shorten hex value to 3 char if possible
   */


  TinyColor.prototype.toHex = function (allow3Char) {
    if (allow3Char === void 0) {
      allow3Char = false;
    }

    return rgbToHex(this.r, this.g, this.b, allow3Char);
  };
  /**
   * Returns the hex value of the color -with a # appened.
   * @param allow3Char will shorten hex value to 3 char if possible
   */


  TinyColor.prototype.toHexString = function (allow3Char) {
    if (allow3Char === void 0) {
      allow3Char = false;
    }

    return '#' + this.toHex(allow3Char);
  };
  /**
   * Returns the hex 8 value of the color.
   * @param allow4Char will shorten hex value to 4 char if possible
   */


  TinyColor.prototype.toHex8 = function (allow4Char) {
    if (allow4Char === void 0) {
      allow4Char = false;
    }

    return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char);
  };
  /**
   * Returns the hex 8 value of the color -with a # appened.
   * @param allow4Char will shorten hex value to 4 char if possible
   */


  TinyColor.prototype.toHex8String = function (allow4Char) {
    if (allow4Char === void 0) {
      allow4Char = false;
    }

    return '#' + this.toHex8(allow4Char);
  };
  /**
   * Returns the object as a RGBA object.
   */


  TinyColor.prototype.toRgb = function () {
    return {
      r: Math.round(this.r),
      g: Math.round(this.g),
      b: Math.round(this.b),
      a: this.a
    };
  };
  /**
   * Returns the RGBA values interpolated into a string with the following format:
   * "RGBA(xxx, xxx, xxx, xx)".
   */


  TinyColor.prototype.toRgbString = function () {
    var r = Math.round(this.r);
    var g = Math.round(this.g);
    var b = Math.round(this.b);
    return this.a === 1 ? "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")") : "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(this.roundA, ")");
  };
  /**
   * Returns the object as a RGBA object.
   */


  TinyColor.prototype.toPercentageRgb = function () {
    var fmt = function (x) {
      return "".concat(Math.round(bound01(x, 255) * 100), "%");
    };

    return {
      r: fmt(this.r),
      g: fmt(this.g),
      b: fmt(this.b),
      a: this.a
    };
  };
  /**
   * Returns the RGBA relative values interpolated into a string
   */


  TinyColor.prototype.toPercentageRgbString = function () {
    var rnd = function (x) {
      return Math.round(bound01(x, 255) * 100);
    };

    return this.a === 1 ? "rgb(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%)") : "rgba(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%, ").concat(this.roundA, ")");
  };
  /**
   * The 'real' name of the color -if there is one.
   */


  TinyColor.prototype.toName = function () {
    if (this.a === 0) {
      return 'transparent';
    }

    if (this.a < 1) {
      return false;
    }

    var hex = '#' + rgbToHex(this.r, this.g, this.b, false);

    for (var _i = 0, _a = Object.entries(names); _i < _a.length; _i++) {
      var _b = _a[_i],
          key = _b[0],
          value = _b[1];

      if (hex === value) {
        return key;
      }
    }

    return false;
  };

  TinyColor.prototype.toString = function (format) {
    var formatSet = Boolean(format);
    format = format !== null && format !== void 0 ? format : this.format;
    var formattedString = false;
    var hasAlpha = this.a < 1 && this.a >= 0;
    var needsAlphaFormat = !formatSet && hasAlpha && (format.startsWith('hex') || format === 'name');

    if (needsAlphaFormat) {
      // Special case for "transparent", all other non-alpha formats
      // will return rgba when there is transparency.
      if (format === 'name' && this.a === 0) {
        return this.toName();
      }

      return this.toRgbString();
    }

    if (format === 'rgb') {
      formattedString = this.toRgbString();
    }

    if (format === 'prgb') {
      formattedString = this.toPercentageRgbString();
    }

    if (format === 'hex' || format === 'hex6') {
      formattedString = this.toHexString();
    }

    if (format === 'hex3') {
      formattedString = this.toHexString(true);
    }

    if (format === 'hex4') {
      formattedString = this.toHex8String(true);
    }

    if (format === 'hex8') {
      formattedString = this.toHex8String();
    }

    if (format === 'name') {
      formattedString = this.toName();
    }

    if (format === 'hsl') {
      formattedString = this.toHslString();
    }

    if (format === 'hsv') {
      formattedString = this.toHsvString();
    }

    return formattedString || this.toHexString();
  };

  TinyColor.prototype.toNumber = function () {
    return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
  };

  TinyColor.prototype.clone = function () {
    return new TinyColor(this.toString());
  };
  /**
   * Lighten the color a given amount. Providing 100 will always return white.
   * @param amount - valid between 1-100
   */


  TinyColor.prototype.lighten = function (amount) {
    if (amount === void 0) {
      amount = 10;
    }

    var hsl = this.toHsl();
    hsl.l += amount / 100;
    hsl.l = clamp01(hsl.l);
    return new TinyColor(hsl);
  };
  /**
   * Brighten the color a given amount, from 0 to 100.
   * @param amount - valid between 1-100
   */


  TinyColor.prototype.brighten = function (amount) {
    if (amount === void 0) {
      amount = 10;
    }

    var rgb = this.toRgb();
    rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
    rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
    rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
    return new TinyColor(rgb);
  };
  /**
   * Darken the color a given amount, from 0 to 100.
   * Providing 100 will always return black.
   * @param amount - valid between 1-100
   */


  TinyColor.prototype.darken = function (amount) {
    if (amount === void 0) {
      amount = 10;
    }

    var hsl = this.toHsl();
    hsl.l -= amount / 100;
    hsl.l = clamp01(hsl.l);
    return new TinyColor(hsl);
  };
  /**
   * Mix the color with pure white, from 0 to 100.
   * Providing 0 will do nothing, providing 100 will always return white.
   * @param amount - valid between 1-100
   */


  TinyColor.prototype.tint = function (amount) {
    if (amount === void 0) {
      amount = 10;
    }

    return this.mix('white', amount);
  };
  /**
   * Mix the color with pure black, from 0 to 100.
   * Providing 0 will do nothing, providing 100 will always return black.
   * @param amount - valid between 1-100
   */


  TinyColor.prototype.shade = function (amount) {
    if (amount === void 0) {
      amount = 10;
    }

    return this.mix('black', amount);
  };
  /**
   * Desaturate the color a given amount, from 0 to 100.
   * Providing 100 will is the same as calling greyscale
   * @param amount - valid between 1-100
   */


  TinyColor.prototype.desaturate = function (amount) {
    if (amount === void 0) {
      amount = 10;
    }

    var hsl = this.toHsl();
    hsl.s -= amount / 100;
    hsl.s = clamp01(hsl.s);
    return new TinyColor(hsl);
  };
  /**
   * Saturate the color a given amount, from 0 to 100.
   * @param amount - valid between 1-100
   */


  TinyColor.prototype.saturate = function (amount) {
    if (amount === void 0) {
      amount = 10;
    }

    var hsl = this.toHsl();
    hsl.s += amount / 100;
    hsl.s = clamp01(hsl.s);
    return new TinyColor(hsl);
  };
  /**
   * Completely desaturates a color into greyscale.
   * Same as calling `desaturate(100)`
   */


  TinyColor.prototype.greyscale = function () {
    return this.desaturate(100);
  };
  /**
   * Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
   * Values outside of this range will be wrapped into this range.
   */


  TinyColor.prototype.spin = function (amount) {
    var hsl = this.toHsl();
    var hue = (hsl.h + amount) % 360;
    hsl.h = hue < 0 ? 360 + hue : hue;
    return new TinyColor(hsl);
  };
  /**
   * Mix the current color a given amount with another color, from 0 to 100.
   * 0 means no mixing (return current color).
   */


  TinyColor.prototype.mix = function (color, amount) {
    if (amount === void 0) {
      amount = 50;
    }

    var rgb1 = this.toRgb();
    var rgb2 = new TinyColor(color).toRgb();
    var p = amount / 100;
    var rgba = {
      r: (rgb2.r - rgb1.r) * p + rgb1.r,
      g: (rgb2.g - rgb1.g) * p + rgb1.g,
      b: (rgb2.b - rgb1.b) * p + rgb1.b,
      a: (rgb2.a - rgb1.a) * p + rgb1.a
    };
    return new TinyColor(rgba);
  };

  TinyColor.prototype.analogous = function (results, slices) {
    if (results === void 0) {
      results = 6;
    }

    if (slices === void 0) {
      slices = 30;
    }

    var hsl = this.toHsl();
    var part = 360 / slices;
    var ret = [this];

    for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results;) {
      hsl.h = (hsl.h + part) % 360;
      ret.push(new TinyColor(hsl));
    }

    return ret;
  };
  /**
   * taken from https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js
   */


  TinyColor.prototype.complement = function () {
    var hsl = this.toHsl();
    hsl.h = (hsl.h + 180) % 360;
    return new TinyColor(hsl);
  };

  TinyColor.prototype.monochromatic = function (results) {
    if (results === void 0) {
      results = 6;
    }

    var hsv = this.toHsv();
    var h = hsv.h;
    var s = hsv.s;
    var v = hsv.v;
    var res = [];
    var modification = 1 / results;

    while (results--) {
      res.push(new TinyColor({
        h: h,
        s: s,
        v: v
      }));
      v = (v + modification) % 1;
    }

    return res;
  };

  TinyColor.prototype.splitcomplement = function () {
    var hsl = this.toHsl();
    var h = hsl.h;
    return [this, new TinyColor({
      h: (h + 72) % 360,
      s: hsl.s,
      l: hsl.l
    }), new TinyColor({
      h: (h + 216) % 360,
      s: hsl.s,
      l: hsl.l
    })];
  };
  /**
   * Compute how the color would appear on a background
   */


  TinyColor.prototype.onBackground = function (background) {
    var fg = this.toRgb();
    var bg = new TinyColor(background).toRgb();
    return new TinyColor({
      r: bg.r + (fg.r - bg.r) * fg.a,
      g: bg.g + (fg.g - bg.g) * fg.a,
      b: bg.b + (fg.b - bg.b) * fg.a
    });
  };
  /**
   * Alias for `polyad(3)`
   */


  TinyColor.prototype.triad = function () {
    return this.polyad(3);
  };
  /**
   * Alias for `polyad(4)`
   */


  TinyColor.prototype.tetrad = function () {
    return this.polyad(4);
  };
  /**
   * Get polyad colors, like (for 1, 2, 3, 4, 5, 6, 7, 8, etc...)
   * monad, dyad, triad, tetrad, pentad, hexad, heptad, octad, etc...
   */


  TinyColor.prototype.polyad = function (n) {
    var hsl = this.toHsl();
    var h = hsl.h;
    var result = [this];
    var increment = 360 / n;

    for (var i = 1; i < n; i++) {
      result.push(new TinyColor({
        h: (h + i * increment) % 360,
        s: hsl.s,
        l: hsl.l
      }));
    }

    return result;
  };
  /**
   * compare color vs current color
   */


  TinyColor.prototype.equals = function (color) {
    return this.toRgbString() === new TinyColor(color).toRgbString();
  };

  return TinyColor;
}();

 // kept for backwards compatability with v1

function tinycolor(color, opts) {
  if (color === void 0) {
    color = '';
  }

  if (opts === void 0) {
    opts = {};
  }

  return new TinyColor(color, opts);
}
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/_util/canUseDom.js
function canUseDom() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

/* harmony default export */ var _util_canUseDom = (canUseDom);
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-util/Dom/dynamicCSS.js

var MARK_KEY = "vc-util-key";

function getMark() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      mark = _ref.mark;

  if (mark) {
    return mark.startsWith('data-') ? mark : "data-".concat(mark);
  }

  return MARK_KEY;
}

function dynamicCSS_getContainer(option) {
  if (option.attachTo) {
    return option.attachTo;
  }

  var head = document.querySelector('head');
  return head || document.body;
}

function injectCSS(css) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _a, _b;

  if (!_util_canUseDom()) {
    return null;
  }

  var styleNode = document.createElement('style');

  if ((_a = option.csp) === null || _a === void 0 ? void 0 : _a.nonce) {
    styleNode.nonce = (_b = option.csp) === null || _b === void 0 ? void 0 : _b.nonce;
  }

  styleNode.innerHTML = css;
  var container = dynamicCSS_getContainer(option);
  var firstChild = container.firstChild;

  if (option.prepend && container.prepend) {
    // Use `prepend` first
    container.prepend(styleNode);
  } else if (option.prepend && firstChild) {
    // Fallback to `insertBefore` like IE not support `prepend`
    container.insertBefore(styleNode, firstChild);
  } else {
    container.appendChild(styleNode);
  }

  return styleNode;
}
var containerCache = new Map();

function findExistNode(key) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var container = dynamicCSS_getContainer(option);
  return Array.from(containerCache.get(container).children).find(function (node) {
    return node.tagName === 'STYLE' && node.getAttribute(getMark(option)) === key;
  });
}

function removeCSS(key) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _a;

  var existNode = findExistNode(key, option);
  (_a = existNode === null || existNode === void 0 ? void 0 : existNode.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(existNode);
}
function updateCSS(css, key) {
  var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _a, _b, _c;

  var container = dynamicCSS_getContainer(option); // Get real parent

  if (!containerCache.has(container)) {
    var placeholderStyle = injectCSS('', option);
    var parentNode = placeholderStyle.parentNode;
    containerCache.set(container, parentNode);
    parentNode.removeChild(placeholderStyle);
  }

  var existNode = findExistNode(key, option);

  if (existNode) {
    if (((_a = option.csp) === null || _a === void 0 ? void 0 : _a.nonce) && existNode.nonce !== ((_b = option.csp) === null || _b === void 0 ? void 0 : _b.nonce)) {
      existNode.nonce = (_c = option.csp) === null || _c === void 0 ? void 0 : _c.nonce;
    }

    if (existNode.innerHTML !== css) {
      existNode.innerHTML = css;
    }

    return existNode;
  }

  var newNode = injectCSS(css, option);
  newNode.setAttribute(getMark(option), key);
  return newNode;
}
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-util/devWarning.js


/* harmony default export */ var devWarning = (function (valid, component, message) {
  vc_util_warning(valid, "[ant-design-vue: ".concat(component, "] ").concat(message));
});
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/config-provider/cssVariables.js
/* eslint-disable import/prefer-default-export, prefer-destructuring */





var dynamicStyleMark = "-ant-".concat(Date.now(), "-").concat(Math.random());
function registerTheme(globalPrefixCls, theme) {
  var variables = {};

  var formatColor = function formatColor(color, updater) {
    var clone = color.clone();
    clone = (updater === null || updater === void 0 ? void 0 : updater(clone)) || clone;
    return clone.toRgbString();
  };

  var fillColor = function fillColor(colorVal, type) {
    var baseColor = new TinyColor(colorVal);
    var colorPalettes = index_esm_generate(baseColor.toRgbString());
    variables["".concat(type, "-color")] = formatColor(baseColor);
    variables["".concat(type, "-color-disabled")] = colorPalettes[1];
    variables["".concat(type, "-color-hover")] = colorPalettes[4];
    variables["".concat(type, "-color-active")] = colorPalettes[7];
    variables["".concat(type, "-color-outline")] = baseColor.clone().setAlpha(0.2).toRgbString();
    variables["".concat(type, "-color-deprecated-bg")] = colorPalettes[1];
    variables["".concat(type, "-color-deprecated-border")] = colorPalettes[3];
  }; // ================ Primary Color ================


  if (theme.primaryColor) {
    fillColor(theme.primaryColor, 'primary');
    var primaryColor = new TinyColor(theme.primaryColor);
    var primaryColors = index_esm_generate(primaryColor.toRgbString()); // Legacy - We should use semantic naming standard

    primaryColors.forEach(function (color, index) {
      variables["primary-".concat(index + 1)] = color;
    }); // Deprecated

    variables['primary-color-deprecated-l-35'] = formatColor(primaryColor, function (c) {
      return c.lighten(35);
    });
    variables['primary-color-deprecated-l-20'] = formatColor(primaryColor, function (c) {
      return c.lighten(20);
    });
    variables['primary-color-deprecated-t-20'] = formatColor(primaryColor, function (c) {
      return c.tint(20);
    });
    variables['primary-color-deprecated-t-50'] = formatColor(primaryColor, function (c) {
      return c.tint(50);
    });
    variables['primary-color-deprecated-f-12'] = formatColor(primaryColor, function (c) {
      return c.setAlpha(c.getAlpha() * 0.12);
    });
    var primaryActiveColor = new TinyColor(primaryColors[0]);
    variables['primary-color-active-deprecated-f-30'] = formatColor(primaryActiveColor, function (c) {
      return c.setAlpha(c.getAlpha() * 0.3);
    });
    variables['primary-color-active-deprecated-d-02'] = formatColor(primaryActiveColor, function (c) {
      return c.darken(2);
    });
  } // ================ Success Color ================


  if (theme.successColor) {
    fillColor(theme.successColor, 'success');
  } // ================ Warning Color ================


  if (theme.warningColor) {
    fillColor(theme.warningColor, 'warning');
  } // ================= Error Color =================


  if (theme.errorColor) {
    fillColor(theme.errorColor, 'error');
  } // ================= Info Color ==================


  if (theme.infoColor) {
    fillColor(theme.infoColor, 'info');
  } // Convert to css variables


  var cssList = Object.keys(variables).map(function (key) {
    return "--".concat(globalPrefixCls, "-").concat(key, ": ").concat(variables[key], ";");
  });

  if (_util_canUseDom()) {
    updateCSS("\n  :root {\n    ".concat(cssList.join('\n'), "\n  }\n  "), "".concat(dynamicStyleMark, "-dynamic-theme"));
  } else {
    devWarning(false, 'ConfigProvider', 'SSR do not support dynamic theme with css variables.');
  }
}
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/config-provider/context.js

var GlobalFormContextKey = Symbol('GlobalFormContextKey');
var useProvideGlobalForm = function useProvideGlobalForm(state) {
  provide(GlobalFormContextKey, state);
};
var useInjectGlobalForm = function useInjectGlobalForm() {
  return inject(GlobalFormContextKey, {});
};
var GlobalConfigContextKey = Symbol('GlobalConfigContextKey');
var configProviderProps = function configProviderProps() {
  return {
    getTargetContainer: {
      type: Function
    },
    getPopupContainer: {
      type: Function
    },
    prefixCls: String,
    getPrefixCls: {
      type: Function
    },
    renderEmpty: {
      type: Function
    },
    transformCellText: {
      type: Function
    },
    csp: {
      type: Object,
      default: undefined
    },
    input: {
      type: Object
    },
    autoInsertSpaceInButton: {
      type: Boolean,
      default: undefined
    },
    locale: {
      type: Object,
      default: undefined
    },
    pageHeader: {
      type: Object
    },
    componentSize: {
      type: String
    },
    direction: {
      type: String
    },
    space: {
      type: Object
    },
    virtual: {
      type: Boolean,
      default: undefined
    },
    dropdownMatchSelectWidth: {
      type: [Number, Boolean],
      default: true
    },
    form: {
      type: Object,
      default: undefined
    },
    // internal use
    notUpdateGlobalConfig: Boolean
  };
};
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/config-provider/index.js












var config_provider_defaultPrefixCls = 'ant';

function getGlobalPrefixCls() {
  return globalConfigForApi.prefixCls || config_provider_defaultPrefixCls;
}

var globalConfigByCom = reactive({});
var globalConfigBySet = reactive({}); // 权重最大

var globalConfigForApi = reactive({});
watchEffect(function () {
  extends_extends(globalConfigForApi, globalConfigByCom, globalConfigBySet);

  globalConfigForApi.prefixCls = getGlobalPrefixCls();

  globalConfigForApi.getPrefixCls = function (suffixCls, customizePrefixCls) {
    if (customizePrefixCls) return customizePrefixCls;
    return suffixCls ? "".concat(globalConfigForApi.prefixCls, "-").concat(suffixCls) : globalConfigForApi.prefixCls;
  };

  globalConfigForApi.getRootPrefixCls = function (rootPrefixCls, customizePrefixCls) {
    // Customize rootPrefixCls is first priority
    if (rootPrefixCls) {
      return rootPrefixCls;
    } // If Global prefixCls provided, use this


    if (globalConfigForApi.prefixCls) {
      return globalConfigForApi.prefixCls;
    } // [Legacy] If customize prefixCls provided, we cut it to get the prefixCls


    if (customizePrefixCls && customizePrefixCls.includes('-')) {
      return customizePrefixCls.replace(/^(.*)-[^-]*$/, '$1');
    } // Fallback to default prefixCls


    return getGlobalPrefixCls();
  };
});
var stopWatchEffect;

var setGlobalConfig = function setGlobalConfig(params) {
  if (stopWatchEffect) {
    stopWatchEffect();
  }

  stopWatchEffect = watchEffect(function () {
    extends_extends(globalConfigBySet, reactive(params));
  });

  if (params.theme) {
    registerTheme(getGlobalPrefixCls(), params.theme);
  }
};

var globalConfig = function globalConfig() {
  return {
    getPrefixCls: function getPrefixCls(suffixCls, customizePrefixCls) {
      if (customizePrefixCls) return customizePrefixCls;
      return suffixCls ? "".concat(getGlobalPrefixCls(), "-").concat(suffixCls) : getGlobalPrefixCls();
    },
    getRootPrefixCls: function getRootPrefixCls(rootPrefixCls, customizePrefixCls) {
      // Customize rootPrefixCls is first priority
      if (rootPrefixCls) {
        return rootPrefixCls;
      } // If Global prefixCls provided, use this


      if (globalConfigForApi.prefixCls) {
        return globalConfigForApi.prefixCls;
      } // [Legacy] If customize prefixCls provided, we cut it to get the prefixCls


      if (customizePrefixCls && customizePrefixCls.includes('-')) {
        return customizePrefixCls.replace(/^(.*)-[^-]*$/, '$1');
      } // Fallback to default prefixCls


      return getGlobalPrefixCls();
    }
  };
};
var ConfigProvider = defineComponent({
  name: 'AConfigProvider',
  inheritAttrs: false,
  props: configProviderProps(),
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var getPrefixCls = function getPrefixCls(suffixCls, customizePrefixCls) {
      var _props$prefixCls = props.prefixCls,
          prefixCls = _props$prefixCls === void 0 ? 'ant' : _props$prefixCls;
      if (customizePrefixCls) return customizePrefixCls;
      return suffixCls ? "".concat(prefixCls, "-").concat(suffixCls) : prefixCls;
    };

    var renderEmptyComponent = function renderEmptyComponent(name) {
      var renderEmpty = props.renderEmpty || slots.renderEmpty || config_provider_renderEmpty;
      return renderEmpty(name);
    };

    var getPrefixClsWrapper = function getPrefixClsWrapper(suffixCls, customizePrefixCls) {
      var prefixCls = props.prefixCls;
      if (customizePrefixCls) return customizePrefixCls;
      var mergedPrefixCls = prefixCls || getPrefixCls('');
      return suffixCls ? "".concat(mergedPrefixCls, "-").concat(suffixCls) : mergedPrefixCls;
    };

    var configProvider = reactive(extends_extends(extends_extends({}, props), {
      getPrefixCls: getPrefixClsWrapper,
      renderEmpty: renderEmptyComponent
    }));
    Object.keys(props).forEach(function (key) {
      watch(function () {
        return props[key];
      }, function () {
        configProvider[key] = props[key];
      });
    });

    if (!props.notUpdateGlobalConfig) {
      extends_extends(globalConfigByCom, configProvider);

      watch(configProvider, function () {
        extends_extends(globalConfigByCom, configProvider);
      });
    }

    var validateMessagesRef = runtime_core_esm_bundler_computed(function () {
      var _a, _b; // Additional Form provider


      var validateMessages = {};

      if (props.locale) {
        validateMessages = ((_a = props.locale.Form) === null || _a === void 0 ? void 0 : _a.defaultValidateMessages) || ((_b = locale_default.Form) === null || _b === void 0 ? void 0 : _b.defaultValidateMessages) || {};
      }

      if (props.form && props.form.validateMessages) {
        validateMessages = extends_extends(extends_extends({}, validateMessages), props.form.validateMessages);
      }

      return validateMessages;
    });
    useProvideGlobalForm({
      validateMessages: validateMessagesRef
    });
    provide('configProvider', configProvider);

    var renderProvider = function renderProvider(legacyLocale) {
      var _a;

      return createVNode(locale_provider, {
        "locale": props.locale || legacyLocale,
        "ANT_MARK__": ANT_MARK
      }, {
        default: function _default() {
          return [(_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)];
        }
      });
    };

    watchEffect(function () {
      if (props.direction) {
        message.config({
          rtl: props.direction === 'rtl'
        });
        notification.config({
          rtl: props.direction === 'rtl'
        });
      }
    });
    return function () {
      return createVNode(LocaleReceiver, {
        "children": function children(_, __, legacyLocale) {
          return renderProvider(legacyLocale);
        }
      }, null);
    };
  }
});
var defaultConfigProvider = reactive({
  getPrefixCls: function getPrefixCls(suffixCls, customizePrefixCls) {
    if (customizePrefixCls) return customizePrefixCls;
    return suffixCls ? "ant-".concat(suffixCls) : 'ant';
  },
  renderEmpty: config_provider_renderEmpty,
  direction: 'ltr'
});
ConfigProvider.config = setGlobalConfig;

ConfigProvider.install = function (app) {
  app.component(ConfigProvider.name, ConfigProvider);
};

/* harmony default export */ var config_provider = (ConfigProvider);
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/_util/hooks/useConfigInject.js


/* harmony default export */ var useConfigInject = (function (name, props) {
  var configProvider = runtime_core_esm_bundler_inject('configProvider', defaultConfigProvider);
  var prefixCls = runtime_core_esm_bundler_computed(function () {
    return configProvider.getPrefixCls(name, props.prefixCls);
  });
  var direction = runtime_core_esm_bundler_computed(function () {
    var _a;

    return (_a = props.direction) !== null && _a !== void 0 ? _a : configProvider.direction;
  });
  var rootPrefixCls = runtime_core_esm_bundler_computed(function () {
    return configProvider.getPrefixCls();
  });
  var autoInsertSpaceInButton = runtime_core_esm_bundler_computed(function () {
    return configProvider.autoInsertSpaceInButton;
  });
  var renderEmpty = runtime_core_esm_bundler_computed(function () {
    return configProvider.renderEmpty;
  });
  var space = runtime_core_esm_bundler_computed(function () {
    return configProvider.space;
  });
  var pageHeader = runtime_core_esm_bundler_computed(function () {
    return configProvider.pageHeader;
  });
  var form = runtime_core_esm_bundler_computed(function () {
    return configProvider.form;
  });
  var getTargetContainer = runtime_core_esm_bundler_computed(function () {
    return props.getTargetContainer || configProvider.getTargetContainer;
  });
  var getPopupContainer = runtime_core_esm_bundler_computed(function () {
    return props.getPopupContainer || configProvider.getPopupContainer;
  });
  var dropdownMatchSelectWidth = runtime_core_esm_bundler_computed(function () {
    var _a;

    return (_a = props.dropdownMatchSelectWidth) !== null && _a !== void 0 ? _a : configProvider.dropdownMatchSelectWidth;
  });
  var virtual = runtime_core_esm_bundler_computed(function () {
    return (props.virtual === undefined ? configProvider.virtual !== false : props.virtual !== false) && dropdownMatchSelectWidth.value !== false;
  });
  var size = runtime_core_esm_bundler_computed(function () {
    return props.size || configProvider.componentSize;
  });
  var autocomplete = runtime_core_esm_bundler_computed(function () {
    var _a;

    return props.autocomplete || ((_a = configProvider.input) === null || _a === void 0 ? void 0 : _a.autocomplete);
  });
  var csp = runtime_core_esm_bundler_computed(function () {
    return configProvider.csp;
  });
  return {
    configProvider: configProvider,
    prefixCls: prefixCls,
    direction: direction,
    size: size,
    getTargetContainer: getTargetContainer,
    getPopupContainer: getPopupContainer,
    space: space,
    pageHeader: pageHeader,
    form: form,
    autoInsertSpaceInButton: autoInsertSpaceInButton,
    renderEmpty: renderEmpty,
    virtual: virtual,
    dropdownMatchSelectWidth: dropdownMatchSelectWidth,
    rootPrefixCls: rootPrefixCls,
    getPrefixCls: configProvider.getPrefixCls,
    autocomplete: autocomplete,
    csp: csp
  };
});
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/_util/wave.js





var styleForPesudo; // Where el is the DOM element you'd like to test for visibility

function isHidden(element) {
  if (false) {}

  return !element || element.offsetParent === null;
}

function isNotGrey(color) {
  // eslint-disable-next-line no-useless-escape
  var match = (color || '').match(/rgba?\((\d*), (\d*), (\d*)(, [\.\d]*)?\)/);

  if (match && match[1] && match[2] && match[3]) {
    return !(match[1] === match[2] && match[2] === match[3]);
  }

  return true;
}

/* harmony default export */ var wave = (defineComponent({
  name: 'Wave',
  props: {
    insertExtraNode: Boolean,
    disabled: Boolean
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        expose = _ref.expose;
    var instance = getCurrentInstance();

    var _useConfigInject = useConfigInject('', props),
        csp = _useConfigInject.csp,
        prefixCls = _useConfigInject.prefixCls;

    expose({
      csp: csp
    });
    var eventIns = null;
    var clickWaveTimeoutId = null;
    var animationStartId = null;
    var animationStart = false;
    var extraNode = null;
    var isUnmounted = false;

    var onTransitionStart = function onTransitionStart(e) {
      if (isUnmounted) return;
      var node = findDOMNode(instance);

      if (!e || e.target !== node) {
        return;
      }

      if (!animationStart) {
        resetEffect(node);
      }
    };

    var onTransitionEnd = function onTransitionEnd(e) {
      if (!e || e.animationName !== 'fadeEffect') {
        return;
      }

      resetEffect(e.target);
    };

    var getAttributeName = function getAttributeName() {
      var insertExtraNode = props.insertExtraNode;
      return insertExtraNode ? "".concat(prefixCls.value, "-click-animating") : "".concat(prefixCls.value, "-click-animating-without-extra-node");
    };

    var onClick = function onClick(node, waveColor) {
      var _a;

      var insertExtraNode = props.insertExtraNode,
          disabled = props.disabled;

      if (disabled || !node || isHidden(node) || node.className.indexOf('-leave') >= 0) {
        return;
      }

      extraNode = document.createElement('div');
      extraNode.className = "".concat(prefixCls.value, "-click-animating-node");
      var attributeName = getAttributeName();
      node.removeAttribute(attributeName);
      node.setAttribute(attributeName, 'true'); // Not white or transparent or grey

      styleForPesudo = styleForPesudo || document.createElement('style');

      if (waveColor && waveColor !== '#ffffff' && waveColor !== 'rgb(255, 255, 255)' && isNotGrey(waveColor) && !/rgba\(\d*, \d*, \d*, 0\)/.test(waveColor) && // any transparent rgba color
      waveColor !== 'transparent') {
        // Add nonce if CSP exist
        if ((_a = csp.value) === null || _a === void 0 ? void 0 : _a.nonce) {
          styleForPesudo.nonce = csp.value.nonce;
        }

        extraNode.style.borderColor = waveColor;
        styleForPesudo.innerHTML = "\n        [".concat(prefixCls.value, "-click-animating-without-extra-node='true']::after, .").concat(prefixCls.value, "-click-animating-node {\n          --antd-wave-shadow-color: ").concat(waveColor, ";\n        }");

        if (!document.body.contains(styleForPesudo)) {
          document.body.appendChild(styleForPesudo);
        }
      }

      if (insertExtraNode) {
        node.appendChild(extraNode);
      }

      css_animation_Event.addStartEventListener(node, onTransitionStart);
      css_animation_Event.addEndEventListener(node, onTransitionEnd);
    };

    var resetEffect = function resetEffect(node) {
      if (!node || node === extraNode || !(node instanceof Element)) {
        return;
      }

      var insertExtraNode = props.insertExtraNode;
      var attributeName = getAttributeName();
      node.setAttribute(attributeName, 'false'); // edge has bug on `removeAttribute` #14466

      if (styleForPesudo) {
        styleForPesudo.innerHTML = '';
      }

      if (insertExtraNode && extraNode && node.contains(extraNode)) {
        node.removeChild(extraNode);
      }

      css_animation_Event.removeStartEventListener(node, onTransitionStart);
      css_animation_Event.removeEndEventListener(node, onTransitionEnd);
    };

    var bindAnimationEvent = function bindAnimationEvent(node) {
      if (!node || !node.getAttribute || node.getAttribute('disabled') || node.className.indexOf('disabled') >= 0) {
        return;
      }

      var newClick = function newClick(e) {
        // Fix radio button click twice
        if (e.target.tagName === 'INPUT' || isHidden(e.target)) {
          return;
        }

        resetEffect(node); // Get wave color from target

        var waveColor = getComputedStyle(node).getPropertyValue('border-top-color') || // Firefox Compatible
        getComputedStyle(node).getPropertyValue('border-color') || getComputedStyle(node).getPropertyValue('background-color');
        clickWaveTimeoutId = setTimeout(function () {
          return onClick(node, waveColor);
        }, 0);
        wrapperRaf.cancel(animationStartId);
        animationStart = true; // Render to trigger transition event cost 3 frames. Let's delay 10 frames to reset this.

        animationStartId = wrapperRaf(function () {
          animationStart = false;
        }, 10);
      };

      node.addEventListener('click', newClick, true);
      return {
        cancel: function cancel() {
          node.removeEventListener('click', newClick, true);
        }
      };
    };

    onMounted(function () {
      runtime_core_esm_bundler_nextTick(function () {
        var node = findDOMNode(instance);

        if (node.nodeType !== 1) {
          return;
        }

        eventIns = bindAnimationEvent(node);
      });
    });
    onBeforeUnmount(function () {
      if (eventIns) {
        eventIns.cancel();
      }

      clearTimeout(clickWaveTimeoutId);
      isUnmounted = true;
    });
    return function () {
      var _a;

      return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)[0];
    };
  }
}));
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/button/buttonTypes.js

function convertLegacyProps(type) {
  if (type === 'danger') {
    return {
      danger: true
    };
  }

  return {
    type: type
  };
}
var buttonProps = function buttonProps() {
  return {
    prefixCls: String,
    type: String,
    htmlType: {
      type: String,
      default: 'button'
    },
    shape: {
      type: String
    },
    size: {
      type: String
    },
    loading: {
      type: [Boolean, Object],
      default: function _default() {
        return false;
      }
    },
    disabled: {
      type: Boolean,
      default: undefined
    },
    ghost: {
      type: Boolean,
      default: undefined
    },
    block: {
      type: Boolean,
      default: undefined
    },
    danger: {
      type: Boolean,
      default: undefined
    },
    icon: vue_types.any,
    href: String,
    target: String,
    title: String,
    onClick: {
      type: Function
    },
    onMousedown: {
      type: Function
    }
  };
};
/* harmony default export */ var buttonTypes = (buttonProps);
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/_util/props-util/initDefaultProps.js



var initDefaultProps = function initDefaultProps(types, defaultProps) {
  var propTypes = extends_extends({}, types);

  Object.keys(defaultProps).forEach(function (k) {
    var prop = propTypes[k];

    if (prop) {
      if (prop.type || prop.default) {
        prop.default = defaultProps[k];
      } else if (prop.def) {
        prop.def(defaultProps[k]);
      } else {
        propTypes[k] = {
          type: prop,
          default: defaultProps[k]
        };
      }
    } else {
      throw new Error("not have ".concat(k, " prop"));
    }
  });
  return propTypes;
};

/* harmony default export */ var props_util_initDefaultProps = (initDefaultProps);
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/button/LoadingIcon.js





var getCollapsedWidth = function getCollapsedWidth(node) {
  if (node) {
    node.style.width = '0px';
    node.style.opacity = '0';
    node.style.transform = 'scale(0)';
  }
};

var getRealWidth = function getRealWidth(node) {
  runtime_core_esm_bundler_nextTick(function () {
    if (node) {
      node.style.width = "".concat(node.scrollWidth, "px");
      node.style.opacity = '1';
      node.style.transform = 'scale(1)';
    }
  });
};

var resetStyle = function resetStyle(node) {
  if (node && node.style) {
    node.style.width = null;
    node.style.opacity = null;
    node.style.transform = null;
  }
};

/* harmony default export */ var LoadingIcon = (defineComponent({
  name: 'LoadingIcon',
  props: {
    prefixCls: String,
    loading: [Boolean, Object],
    existIcon: Boolean
  },
  setup: function setup(props) {
    return function () {
      var existIcon = props.existIcon,
          prefixCls = props.prefixCls,
          loading = props.loading;

      if (existIcon) {
        return createVNode("span", {
          "class": "".concat(prefixCls, "-loading-icon")
        }, [createVNode(icons_LoadingOutlined, null, null)]);
      }

      var visible = !!loading;
      return createVNode(transition, {
        "name": "".concat(prefixCls, "-loading-icon-motion"),
        "onBeforeEnter": getCollapsedWidth,
        "onEnter": getRealWidth,
        "onAfterEnter": resetStyle,
        "onBeforeLeave": getRealWidth,
        "onLeave": function onLeave(node) {
          setTimeout(function () {
            getCollapsedWidth(node);
          });
        },
        "onAfterLeave": resetStyle
      }, {
        default: function _default() {
          return [visible ? createVNode("span", {
            "class": "".concat(prefixCls, "-loading-icon")
          }, [createVNode(icons_LoadingOutlined, null, null)]) : null];
        }
      });
    };
  }
}));
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/button/button.js












var rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
var isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);

function isUnborderedButtonType(type) {
  return type === 'text' || type === 'link';
}


/* harmony default export */ var button_button = (defineComponent({
  name: 'AButton',
  inheritAttrs: false,
  __ANT_BUTTON: true,
  props: props_util_initDefaultProps(buttonTypes(), {
    type: 'default'
  }),
  slots: ['icon'],
  // emits: ['click', 'mousedown'],
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        attrs = _ref.attrs,
        emit = _ref.emit;

    var _useConfigInject = useConfigInject('btn', props),
        prefixCls = _useConfigInject.prefixCls,
        autoInsertSpaceInButton = _useConfigInject.autoInsertSpaceInButton,
        direction = _useConfigInject.direction,
        size = _useConfigInject.size;

    var buttonNodeRef = ref(null);
    var delayTimeoutRef = ref(undefined);
    var isNeedInserted = false;
    var innerLoading = ref(false);
    var hasTwoCNChar = ref(false);
    var autoInsertSpace = runtime_core_esm_bundler_computed(function () {
      return autoInsertSpaceInButton.value !== false;
    }); // =============== Update Loading ===============

    var loadingOrDelay = runtime_core_esm_bundler_computed(function () {
      return typeof_typeof(props.loading) === 'object' && props.loading.delay ? props.loading.delay || true : !!props.loading;
    });
    watch(loadingOrDelay, function (val) {
      clearTimeout(delayTimeoutRef.value);

      if (typeof loadingOrDelay.value === 'number') {
        delayTimeoutRef.value = setTimeout(function () {
          innerLoading.value = val;
        }, loadingOrDelay.value);
      } else {
        innerLoading.value = val;
      }
    }, {
      immediate: true
    });
    var classes = runtime_core_esm_bundler_computed(function () {
      var _ref2;

      var type = props.type,
          _props$shape = props.shape,
          shape = _props$shape === void 0 ? 'default' : _props$shape,
          ghost = props.ghost,
          block = props.block,
          danger = props.danger;
      var pre = prefixCls.value;
      var sizeClassNameMap = {
        large: 'lg',
        small: 'sm',
        middle: undefined
      };
      var sizeFullname = size.value;
      var sizeCls = sizeFullname ? sizeClassNameMap[sizeFullname] || '' : '';
      return _ref2 = {}, _defineProperty(_ref2, "".concat(pre), true), _defineProperty(_ref2, "".concat(pre, "-").concat(type), type), _defineProperty(_ref2, "".concat(pre, "-").concat(shape), shape !== 'default' && shape), _defineProperty(_ref2, "".concat(pre, "-").concat(sizeCls), sizeCls), _defineProperty(_ref2, "".concat(pre, "-loading"), innerLoading.value), _defineProperty(_ref2, "".concat(pre, "-background-ghost"), ghost && !isUnborderedButtonType(type)), _defineProperty(_ref2, "".concat(pre, "-two-chinese-chars"), hasTwoCNChar.value && autoInsertSpace.value), _defineProperty(_ref2, "".concat(pre, "-block"), block), _defineProperty(_ref2, "".concat(pre, "-dangerous"), !!danger), _defineProperty(_ref2, "".concat(pre, "-rtl"), direction.value === 'rtl'), _ref2;
    });

    var fixTwoCNChar = function fixTwoCNChar() {
      // Fix for HOC usage like <FormatMessage />
      var node = buttonNodeRef.value;

      if (!node || autoInsertSpaceInButton.value === false) {
        return;
      }

      var buttonText = node.textContent;

      if (isNeedInserted && isTwoCNChar(buttonText)) {
        if (!hasTwoCNChar.value) {
          hasTwoCNChar.value = true;
        }
      } else if (hasTwoCNChar.value) {
        hasTwoCNChar.value = false;
      }
    };

    var handleClick = function handleClick(event) {
      // https://github.com/ant-design/ant-design/issues/30207
      if (innerLoading.value || props.disabled) {
        event.preventDefault();
        return;
      }

      emit('click', event);
    };

    var insertSpace = function insertSpace(child, needInserted) {
      var SPACE = needInserted ? ' ' : '';

      if (child.type === runtime_core_esm_bundler_Text) {
        var text = child.children.trim();

        if (isTwoCNChar(text)) {
          text = text.split('').join(SPACE);
        }

        return createVNode("span", null, [text]);
      }

      return child;
    };

    watchEffect(function () {
      devWarning(!(props.ghost && isUnborderedButtonType(props.type)), 'Button', "`link` or `text` button can't be a `ghost` button.");
    });
    onMounted(fixTwoCNChar);
    onUpdated(fixTwoCNChar);
    onBeforeUnmount(function () {
      delayTimeoutRef.value && clearTimeout(delayTimeoutRef.value);
    });
    return function () {
      var _a, _b;

      var _props$icon = props.icon,
          icon = _props$icon === void 0 ? (_a = slots.icon) === null || _a === void 0 ? void 0 : _a.call(slots) : _props$icon;
      var children = flattenChildren((_b = slots.default) === null || _b === void 0 ? void 0 : _b.call(slots));
      isNeedInserted = children.length === 1 && !icon && !isUnborderedButtonType(props.type);
      var type = props.type,
          htmlType = props.htmlType,
          disabled = props.disabled,
          href = props.href,
          title = props.title,
          target = props.target,
          onMousedown = props.onMousedown;
      var iconType = innerLoading.value ? 'loading' : icon;

      var buttonProps = extends_extends(extends_extends({}, attrs), {
        title: title,
        disabled: disabled,
        class: [classes.value, attrs.class, _defineProperty({}, "".concat(prefixCls.value, "-icon-only"), children.length === 0 && !!iconType)],
        onClick: handleClick,
        onMousedown: onMousedown
      }); // https://github.com/vueComponent/ant-design-vue/issues/4930


      if (!disabled) {
        delete buttonProps.disabled;
      }

      var iconNode = icon && !innerLoading.value ? icon : createVNode(LoadingIcon, {
        "existIcon": !!icon,
        "prefixCls": prefixCls.value,
        "loading": !!innerLoading.value
      }, null);
      var kids = children.map(function (child) {
        return insertSpace(child, isNeedInserted && autoInsertSpace.value);
      });

      if (href !== undefined) {
        return createVNode("a", _objectSpread2(_objectSpread2({}, buttonProps), {}, {
          "href": href,
          "target": target,
          "ref": buttonNodeRef
        }), [iconNode, kids]);
      }

      var buttonNode = createVNode("button", _objectSpread2(_objectSpread2({}, buttonProps), {}, {
        "ref": buttonNodeRef,
        "type": htmlType
      }), [iconNode, kids]);

      if (isUnborderedButtonType(type)) {
        return buttonNode;
      }

      return createVNode(wave, {
        "ref": "wave",
        "disabled": !!innerLoading.value
      }, {
        default: function _default() {
          return [buttonNode];
        }
      });
    };
  }
}));
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/_util/unreachableException.js




var UnreachableException = /*#__PURE__*/_createClass(function UnreachableException(value) {
  _classCallCheck(this, UnreachableException);

  this.error = new Error("unreachable case: ".concat(JSON.stringify(value)));
});


;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/button/button-group.js






var buttonGroupProps = function buttonGroupProps() {
  return {
    prefixCls: String,
    size: {
      type: String
    }
  };
};
/* harmony default export */ var button_group = (defineComponent({
  name: 'AButtonGroup',
  props: buttonGroupProps(),
  setup: function setup(props, _ref) {
    var slots = _ref.slots;

    var _useConfigInject = useConfigInject('btn-group', props),
        prefixCls = _useConfigInject.prefixCls,
        direction = _useConfigInject.direction;

    var classes = runtime_core_esm_bundler_computed(function () {
      var _ref2;

      var size = props.size; // large => lg
      // small => sm

      var sizeCls = '';

      switch (size) {
        case 'large':
          sizeCls = 'lg';
          break;

        case 'small':
          sizeCls = 'sm';
          break;

        case 'middle':
        case undefined:
          break;

        default:
          // eslint-disable-next-line no-console
          console.warn(new UnreachableException(size).error);
      }

      return _ref2 = {}, _defineProperty(_ref2, "".concat(prefixCls.value), true), _defineProperty(_ref2, "".concat(prefixCls.value, "-").concat(sizeCls), sizeCls), _defineProperty(_ref2, "".concat(prefixCls.value, "-rtl"), direction.value === 'rtl'), _ref2;
    });
    return function () {
      var _a;

      return createVNode("div", {
        "class": classes.value
      }, [flattenChildren((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots))]);
    };
  }
}));
;// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/button/index.js


button_button.Group = button_group;
/* istanbul ignore next */

button_button.install = function (app) {
  app.component(button_button.name, button_button);
  app.component(button_group.name, button_group);
  return app;
};


/* harmony default export */ var es_button = (button_button);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js??clonedRuleSet-86.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./remote/PermissionTransfer/PermissionTransfer.vue?vue&type=script&setup=true&lang=ts




var _withScopeId = function (n) {
  return pushScopeId("data-v-446868fe"), n = n(), popScopeId(), n;
};

var _hoisted_1 = /*#__PURE__*/_withScopeId(function () {
  /*#__PURE__*/
  return createBaseVNode("div", {
    class: "bg-red"
  }, "aa", -1);
});

var _hoisted_2 = /*#__PURE__*/createTextVNode("test");


/* harmony default export */ var PermissionTransfervue_type_script_setup_true_lang_ts = (/*#__PURE__*/defineComponent({
  name: 'PermissionTransfer',
  setup: function (__props) {
    console.log(getCurrentInstance());
    return function (_ctx, _cache) {
      return openBlock(), createElementBlock(runtime_core_esm_bundler_Fragment, null, [_hoisted_1, createVNode(reactivity_esm_bundler_unref(es_button), null, {
        default: withCtx(function () {
          return [_hoisted_2];
        }),
        _: 1
      })], 64);
    };
  }
}));
;// CONCATENATED MODULE: ./remote/PermissionTransfer/PermissionTransfer.vue?vue&type=script&setup=true&lang=ts
 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-57.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-57.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-57.use[2]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-57.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./remote/PermissionTransfer/PermissionTransfer.vue?vue&type=style&index=0&id=446868fe&scoped=true&lang=css
var PermissionTransfervue_type_style_index_0_id_446868fe_scoped_true_lang_css = __webpack_require__(8186);
;// CONCATENATED MODULE: ./remote/PermissionTransfer/PermissionTransfer.vue?vue&type=style&index=0&id=446868fe&scoped=true&lang=css

// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(7066);
;// CONCATENATED MODULE: ./remote/PermissionTransfer/PermissionTransfer.vue



;


const __exports__ = /*#__PURE__*/(0,exportHelper/* default */.Z)(PermissionTransfervue_type_script_setup_true_lang_ts, [['__scopeId',"data-v-446868fe"]])

/* harmony default export */ var PermissionTransfer = (__exports__);
;// CONCATENATED MODULE: ./remote/PermissionTransfer/index.js


/* harmony default export */ function remote_PermissionTransfer(props) {
  return createApp(PermissionTransfer, props);
}
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = (remote_PermissionTransfer);


}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=PermissionTransfer.umd.js.map