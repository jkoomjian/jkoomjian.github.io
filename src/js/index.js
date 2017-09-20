window.addEventListener('load', function() {
  window.legoSpace = new LegoSpace();
  legoSpace.xPlane = new XPlane(legoSpace);
  legoSpace.yPlane = new YPlane(legoSpace);
  legoSpace.zPlane = new ZPlane(legoSpace);
  initEventHandlers();
  Utils.addHandlers('#nav-toggle, #nav-close', 'click', toggleNav);
  askPermission();
  initializeServiceWorker();
});

function initializeServiceWorker() {
  // the 'progressive' part of progressive web apps
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service_worker.js')
      .then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration);
      }, function(err) {
        // registration failed
        console.log('ServiceWorker registration failed: ', err);
      });
  };
}

function toggleNav() {
  const action = document.body.classList.contains('openNav') ? 'remove' : 'add';
  document.body.classList[action]('openNav');
}

function askPermission() {
  return new Promise(function(resolve, reject) {
    const permissionResult = Notification.requestPermission(function(result) {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  })
  .then(function(permissionResult) {
    if (permissionResult !== 'granted') {
      throw new Error('We weren\'t granted permission.');
    }
  });
}

// Testing
// function runTest() {
//   var testLego = new Lego(document.querySelector(".lego-pile.red"), 0, 0);
//   testLego.offsetY = 0;
//   testLego.drag(374, 260);
//
//   //X movement
//   testLego.drag(444, 260);
//   testLego.drag(514, 260);
//
//   //Z Movement
//   // lego.drag(704, 260);
// }
