(function () {
    var DELAY_MS = 3000;
    var boot = document.getElementById('page-boot');
    if (!boot) {
        return;
    }

    var rendered = false;
    var bootVisible = false;
    var showTimer = setTimeout(function () {
        if (!rendered) {
            bootVisible = true;
            boot.classList.add('is-visible');
            boot.setAttribute('aria-hidden', 'false');
            boot.setAttribute('aria-busy', 'true');
        }
    }, DELAY_MS);

    function markRendered() {
        if (rendered) {
            return;
        }
        rendered = true;
        clearTimeout(showTimer);
        if (bootVisible) {
            boot.classList.remove('is-visible');
            boot.setAttribute('aria-hidden', 'true');
            boot.removeAttribute('aria-busy');
        }
    }

    function isContentVisible() {
        var el = document.querySelector('header.wrapper, header, main, .wrapper');
        if (!el) {
            return document.readyState !== 'loading' && document.body.children.length > 1;
        }
        var rect = el.getBoundingClientRect();
        if (rect.height < 20 || rect.width < 20) {
            return false;
        }
        var style = window.getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden' && parseFloat(style.opacity) > 0;
    }

    function waitFonts(done) {
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(done).catch(done);
        } else {
            done();
        }
    }

    function poll() {
        if (rendered) {
            return;
        }
        if (isContentVisible()) {
            waitFonts(markRendered);
            return;
        }
        requestAnimationFrame(poll);
    }

    function startPoll() {
        requestAnimationFrame(function () {
            requestAnimationFrame(poll);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startPoll);
    } else {
        startPoll();
    }

    window.addEventListener('load', markRendered);
})();
