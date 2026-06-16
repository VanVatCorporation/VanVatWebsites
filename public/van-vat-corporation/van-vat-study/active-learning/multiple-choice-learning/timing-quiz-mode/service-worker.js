self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        '/',
        'https://academy.vanvatcorp.com/active-learning/multiple-choice-learning/timing-quiz-mode/index.html',
        'https://academy.vanvatcorp.com/active-learning/multiple-choice-learning/timing-quiz-mode/confetti-lib.js',
        'https://academy.vanvatcorp.com/active-learning/multiple-choice-learning/timing-quiz-mode/testHandler.js'
      ]);
    })
  );
});