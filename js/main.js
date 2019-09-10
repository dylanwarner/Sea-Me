// sounds
let splashSound;
let woinkSound;

(function () {
    var canvas = new fabric.Canvas('canvas');
    var canvas_el = document.getElementById('canvas');

    $(document).ready(function () {

        /* Bring active object to the front of the canvas */
        canvas.on('mouse:down', function (e) {
            if (!(typeof (e.target) === 'undefined')) {
                canvas.bringToFront(e.target);
            }
        });

    // Load Sounds
    splashSound = new Howl({
	        src: ['media/splash.mp3']
});

    woinkSound = new Howl({
	        src: ['media/woink.mp3']
});

        /* Define drag and drop zones */
        var $drop = $('#canvas-drop-area'),
            $gallery = $('#image-list li');

        /* Define the draggable properties */
        $gallery.draggable({
            start: function () {
                woinkSound.play();
                $drop.css({
                    'display': 'block'
                })
            },
            stop: function () {
                $(this).find('img').css({
                    'opacity': 0.4
                });
                $drop.css({
                    'display': 'none'
                });
            },
            revert: true
        });

        /* Define the events for droppable properties */
        $drop.droppable({
            over: function (event, ui) {
                $(this).addClass('active');
            },
            drop: function (event, ui) {
                var image = event.originalEvent.target.src,
                    loc = windowToCanvas(canvas_el, event.clientX, event.clientY);

                img_to_canvas(image, loc.x, loc.y);
            },
            out: function (event, ui) {
                $(this).removeClass('active');
            },
            deactivate: function (event, ui) {
                $(this).removeClass('active');
            }
        });
    });

    var img_to_canvas = function(image, x, y) {
        var img = new Image();
        img.src = image;
        splashSound.play();
        fabric.Image.fromURL(img.src, function (source) {
            img = source.set({
                left: x,
                top: y,
                angle: 0
            });
            canvas.add(img);
            canvas.renderAll();
        });
    }

    var windowToCanvas = function(canvas, x, y) {
        var bbox = canvas.getBoundingClientRect();
        return {
            x: x - bbox.left * (canvas.width / bbox.width),
            y: y - bbox.top * (canvas.height / bbox.height)
        };
    }
})();