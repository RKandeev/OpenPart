(function () {
    if (typeof lottie === 'undefined') {
        return;
    }

    var animations = [
        { id: 'logo-animation', path: './assets/animations/logo.json' },
        { id: 'chess-animation', path: './assets/animations/chess.json' },
        { id: 'magnifier-animation', path: './assets/animations/magnifier.json' },
        { id: 'directions-animation', path: './assets/animations/directions.json' },
        { id: 'calc-animation', path: './assets/animations/calc.json' },
        { id: 'stairs-animation', path: './assets/animations/stairs.json' },
        { id: 'sensor-animation', path: './assets/animations/sensor.json' },
        { id: 'matrix-animation', path: './assets/animations/matrix.json' },
        { id: 'about-animation', path: './assets/animations/scheme.json', threshold: 0.5 },
        { id: 'end-sensor', path: './assets/animations/sensor.json' },
        { id: 'end-sensor2', path: './assets/animations/matrix.json' },
        { id: 'animated-logo2', path: './assets/animations/logo.json' }
    ];

    function whenVisible(element, threshold, callback) {
        if (!('IntersectionObserver' in window)) {
            callback();
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    callback();
                    observer.disconnect();
                }
            });
        }, { threshold: threshold || 0.2, rootMargin: '80px' });

        observer.observe(element);
    }

    animations.forEach(function (config) {
        var container = document.getElementById(config.id);
        if (!container) {
            return;
        }

        whenVisible(container, config.threshold, function () {
            lottie.loadAnimation({
                container: container,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                path: config.path
            });
        });
    });
})();
