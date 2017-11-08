
import * as mod from './mod.js'
console.log(mod)

;(function (win) {
    function importHtml(href) {
        return new Promise(function (resolve, reject) {
            const link = document.createElement('link');
            link.onload = resolve;
            link.onerror = reject;
            link.rel = 'import';
            link.href = href;
            document.head.appendChild(link);
        });
    }

    win.onload = function () {
        var $QI = document.querySelector('.js-lib-qi');
        console.log($QI)
        window.QI = $QI.QI;
        var $page = document.querySelector('#js-page-container')
        var $widgets = $page.querySelectorAll('.js-widget');
        Array.from($widgets).forEach(function (widget) {
            var src = widget.getAttribute('data-widget-src')
            importHtml(src)
                .then(function (widget) {
                    // console.log(widget)
                })
        })
    }

    // if ('serviceWorker' in navigator) {
    //     navigator.serviceWorker
    //         .register('./service-worker.js')
    //         .then(function () {
    //             console.log('Service Worker Registered');
    //         })
    //         .catch(function (err) {
    //             console.log('registration fail with ' + err)
    //         });
    // }
})(window)