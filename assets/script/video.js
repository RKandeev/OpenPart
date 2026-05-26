(function () {
    var video = document.querySelector('.video-block video');
    if (!video) {
        return;
    }

    var source = video.querySelector('source[data-src]');
    if (!source) {
        return;
    }

    var loadVideo = function () {
        if (source.getAttribute('src')) {
            return;
        }
        source.setAttribute('src', source.getAttribute('data-src'));
        source.removeAttribute('data-src');
        video.load();
    };

    if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries, observer) {
            if (entries[0].isIntersecting) {
                loadVideo();
                observer.disconnect();
            }
        }, { rootMargin: '300px' }).observe(video);
    } else {
        video.addEventListener('play', loadVideo, { once: true });
    }
})();
