var myCallback = function (requestInstance) {
  console.log('hi im an outside callback, things should be loaded now, heres your xml instance :) ', requestInstance)
};

// Copy paste this snippet into your console
(function (callback) {
  // Save open function
  var origOpen = XMLHttpRequest.prototype.open;
  // Create stack for holding started requests incase multiple requests are started before the responses come back
  var requestStack = [];
  XMLHttpRequest.prototype.open = function () {
    // Request started, push XML instance on stack
    requestStack.push(this);
    // Add event listener for loadend, we want this to fire off even if request is aborted or has an error as well as completed
    this.addEventListener('loadend', function () {
      // Pop instance off stack
      var xmlInstance = requestStack.pop();
      if (requestStack.length === 0) {
        // Pass popped instance to callback
        callback(xmlInstance)
      }
    });
    // Call saved open prototype
    origOpen.apply(this, arguments);
  };
  // Pass your callback into the IIFE here
})(myCallback);
