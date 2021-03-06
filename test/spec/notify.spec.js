var notify = require('../../lib/notify');
describe('Notifying All', function() {
    var notifier, lib, callback;
    beforeEach(function() {
        notifier = {
            notify: function(repos) {}
        };
        lib = new notify();
        lib.add(notifier);

        spyOn(notifier, 'notify');

        callback = function() {}
        lib.notifyAll('somedata', callback);
    });
    it('should ensure attached notifier is called', function() {
        expect(notifier.notify).toHaveBeenCalled();
    });
    it('should have been called with provided repo data', function() {
        expect(notifier.notify.mostRecentCall.args[0]).toEqual('somedata');
        expect(notifier.notify.mostRecentCall.args[1] instanceof Function).toBeTruthy()
    });
});

describe('Adding notifier', function() {
    var notifier, lib;
    beforeEach(function() {
        lib = new notify();
    });
    it('should throw an exception', function() {
        var addInvalid = function() {
            lib.add({nonotify: function() {}});
        }
        expect(addInvalid).toThrow();
    });
    it('should not throw an exception', function() {
        var addValid = function() {
            lib.add({notify: function() {}});
        }
        expect(addValid).not.toThrow();
    });
});
