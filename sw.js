const staticCacheName = 'calculator-v7.4.25';

const assets = [
    'scientific-calculator',
    '/website/index.html',
    '/website/style/style.css',
    '/website/script/script.js',
    '/website/script/app.js',
    '/website/img/favicon.ico',
    '/website/style/fonts/charm.woff2',
    '/website/style/fonts/pt-sans.woff2',
    '/website/style/fonts/tangerine.woff2'
];

self.addEventListener('install', event => {
    // console.log('Service worker has been installed');
    // pre-caching assets
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            cache.addAll(assets)
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys.filter(key => key !== staticCacheName).map(key => caches.delete(key))
        )
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cacheResponse => {
            return cacheResponse || fetch(event.request);
        })
    );
})