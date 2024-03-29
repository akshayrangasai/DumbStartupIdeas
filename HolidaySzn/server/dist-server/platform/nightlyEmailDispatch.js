"use strict";

var _messages = _interopRequireDefault(require("../models/messages"));
var _user = _interopRequireDefault(require("../models/user"));
var _finalEmail = _interopRequireDefault(require("../models/finalEmail"));
var _recepient = _interopRequireDefault(require("../models/recepient"));
var _occasion = _interopRequireDefault(require("../models/occasion"));
var _messageFormatter = require("./messageFormatter");
var _emailHandler = require("./emailHandler");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
//const recepientModel = require('../models/recepient');
function updateSentEmails(_x) {
  return _updateSentEmails.apply(this, arguments);
}
function _updateSentEmails() {
  _updateSentEmails = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(finalEmailDoc) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            _finalEmail["default"].create(finalEmailDoc).then(function (data) {
              resolve(data);
            })["catch"](function (err) {
              (0, _emailHandler.errorEmail)("akshayrangasai.d@gmail.com", err);
              reject(err);
            });
          }));
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _updateSentEmails.apply(this, arguments);
}
function getMessagesForTheDay() {
  return _getMessagesForTheDay.apply(this, arguments);
}
function _getMessagesForTheDay() {
  _getMessagesForTheDay = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var messageArray;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _messages["default"].aggregate([{
            $match: {
              $expr: {
                $and: [{
                  $eq: [{
                    $dayOfMonth: '$occasionDate'
                  }, {
                    $dayOfMonth: new Date()
                  }]
                }, {
                  $eq: [{
                    $month: '$occasionDate'
                  }, {
                    $month: new Date()
                  }]
                }]
              }
            }
          }]);
        case 2:
          messageArray = _context2.sent;
          return _context2.abrupt("return", messageArray);
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _getMessagesForTheDay.apply(this, arguments);
}
function emailDispatch(_x2, _x3) {
  return _emailDispatch.apply(this, arguments);
}
function _emailDispatch() {
  _emailDispatch = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var results, emailsForTheDay, i, fromEmail, toEmail, fromName, toName, recepient, emailSubject, emailMessage, _emailSender, notificationSubject, notificationMessage, notifySend, emailUpdateDic, updateData;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return getMessagesForTheDay();
        case 2:
          results = _context3.sent;
          console.log("got messages for day, there are ", results.length, " messages");
          if (!(results.length > 0)) {
            _context3.next = 58;
            break;
          }
          emailsForTheDay = new Array();
          i = 0;
        case 7:
          if (!(i < results.length)) {
            _context3.next = 56;
            break;
          }
          fromEmail = results[i].fromEmail;
          toEmail = results[i].toEmail;
          fromName = results[i].fromName;
          toName = results[i].toName;
          _context3.next = 14;
          return _recepient["default"].findOne({
            toEmail: toEmail
          });
        case 14:
          recepient = _context3.sent;
          emailSubject = results[i].emailSubject;
          if (!results[i].formattedMessage) {
            _context3.next = 20;
            break;
          }
          _context3.t0 = results[i].formattedMessage;
          _context3.next = 23;
          break;
        case 20:
          _context3.next = 22;
          return (0, _messageFormatter.greetingsFormat)(results[i].message);
        case 22:
          _context3.t0 = _context3.sent;
        case 23:
          emailMessage = _context3.t0;
          _context3.prev = 24;
          console.log(fromEmail, toEmail);
          _context3.next = 28;
          return (0, _emailHandler.sendEmail)(fromEmail, toEmail, emailSubject, emailMessage);
        case 28:
          _emailSender = _context3.sent;
          _context3.next = 35;
          break;
        case 31:
          _context3.prev = 31;
          _context3.t1 = _context3["catch"](24);
          console.log(_context3.t1);
          return _context3.abrupt("continue", 53);
        case 35:
          //below sends a notification that an email has been sent when we run this dispatch automatically
          notificationSubject = "[greetings.ai] notification for " + toEmail;
          notificationMessage = "greetings sent to " + toEmail + "with subject " + emailSubject;
          _context3.prev = 37;
          _context3.next = 40;
          return (0, _emailHandler.sendEmail)(fromEmail, fromEmail, notificationSubject, notificationMessage);
        case 40:
          notifySend = _context3.sent;
          console.log(notificationSubject);
          _context3.next = 47;
          break;
        case 44:
          _context3.prev = 44;
          _context3.t2 = _context3["catch"](37);
          console.log(_context3.t2);
        case 47:
          emailUpdateDic = {
            recepientId: recepient._id,
            fromUser: results[i].fromUser,
            occasionId: results[i].occasionId,
            messageId: results[i]._id,
            toName: toName,
            toEmail: toEmail,
            emailSubject: emailSubject,
            emailBody: emailMessage,
            emailDate: new Date(),
            emailId: emailSender.id,
            emailThreadId: emailSender.threadId,
            emailLabels: emailSender.labelIds,
            formatting: true,
            autoSend: true
          };
          _context3.next = 50;
          return updateSentEmails(emailUpdateDic);
        case 50:
          updateData = _context3.sent;
          emailsForTheDay.push(updateData);
          if (i == results.length - 1) {
            //console.log(emailsForTheDay.length);

            res.send(emailsForTheDay.map(function (data) {
              return data._id;
            }));
          }
        case 53:
          i++;
          _context3.next = 7;
          break;
        case 56:
          _context3.next = 59;
          break;
        case 58:
          res.json({});
        case 59:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[24, 31], [37, 44]]);
  }));
  return _emailDispatch.apply(this, arguments);
}
function emailBulkDispatchTest(_x4, _x5) {
  return _emailBulkDispatchTest.apply(this, arguments);
}
function _emailBulkDispatchTest() {
  _emailBulkDispatchTest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var resposne;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return emailDispatch(req, res);
        case 2:
          resposne = _context4.sent;
        case 3:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _emailBulkDispatchTest.apply(this, arguments);
}
function emailDispatchTest(_x6, _x7) {
  return _emailDispatchTest.apply(this, arguments);
} //Adding a comment here for a push to github to keep the action alive
function _emailDispatchTest() {
  _emailDispatchTest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var occasionId, messageData, emailSubject, emailMessage, fromEmail, toEmail, _emailSender2, recepient, notificationSubject, notificationMessage, notifySend, emailUpdateDic, updateData;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          occasionId = req.params.id;
          _context5.prev = 1;
          _context5.next = 4;
          return _messages["default"].findOne({
            occasionId: occasionId
          });
        case 4:
          messageData = _context5.sent;
          emailSubject = messageData.emailSubject;
          emailMessage = messageData.formattedMessage;
          fromEmail = req.user.email;
          toEmail = messageData.toEmail;
          console.log(toEmail);
          _context5.next = 12;
          return (0, _emailHandler.sendEmail)(fromEmail, toEmail, emailSubject, emailMessage);
        case 12:
          _emailSender2 = _context5.sent;
          _context5.next = 15;
          return _recepient["default"].findOne({
            toEmail: toEmail
          });
        case 15:
          recepient = _context5.sent;
          //below sends a notification that an email has been sent when we run this dispatch automatically
          notificationSubject = "[greetings.ai] notification for " + toEmail;
          notificationMessage = "greetings sent to " + toEmail + "with subject " + emailSubject;
          _context5.prev = 18;
          _context5.next = 21;
          return (0, _emailHandler.sendEmail)(fromEmail, fromEmail, notificationSubject, notificationMessage);
        case 21:
          notifySend = _context5.sent;
          console.log(notificationSubject);
          _context5.next = 28;
          break;
        case 25:
          _context5.prev = 25;
          _context5.t0 = _context5["catch"](18);
          console.log(_context5.t0);
        case 28:
          emailUpdateDic = {
            recepientId: recepient._id,
            fromUser: messageData.fromUser,
            occasionId: messageData.occasionId,
            messageId: messageData._id,
            toName: messageData.toName,
            toEmail: toEmail,
            emailSubject: emailSubject,
            emailBody: emailMessage,
            emailDate: new Date(),
            emailId: _emailSender2.id,
            emailThreadId: _emailSender2.threadId,
            emailLabels: _emailSender2.labelIds,
            formatting: true,
            autoSend: false
          };
          _context5.next = 31;
          return updateSentEmails(emailUpdateDic);
        case 31:
          updateData = _context5.sent;
          console.log(updateData);
          res.send(_emailSender2);
          _context5.next = 39;
          break;
        case 36:
          _context5.prev = 36;
          _context5.t1 = _context5["catch"](1);
          res.sendStatus(500);
        case 39:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 36], [18, 25]]);
  }));
  return _emailDispatchTest.apply(this, arguments);
}
module.exports = {
  emailDispatch: emailDispatch,
  emailDispatchTest: emailDispatchTest,
  emailBulkDispatchTest: emailBulkDispatchTest
};