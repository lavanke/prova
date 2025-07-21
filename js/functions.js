var $window = $(window),
    gardenCtx, gardenCanvas, $garden, garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height();
let activeFloatingItems = 0;
const MAX_FLOATING_ITEMS = 13;

$(function () {
    // setup garden
    $loveHeart = $("#loveHeart");
    var offsetX = $loveHeart.width() / 2;
    var offsetY = $loveHeart.height() / 2 - 55;
    $garden = $("#garden");
    gardenCanvas = $garden[0];
    gardenCanvas.width = $("#loveHeart").width();
    gardenCanvas.height = $("#loveHeart").height();
    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter";
    garden = new Garden(gardenCtx, gardenCanvas);

    $("#content").css("width", $loveHeart.width() + $("#code").width());
    $("#content").css("height", Math.max($loveHeart.height(), $("#code").height()));
    $("#content").css("margin-top", Math.max(($window.height() - $("#content").height()) / 2, 10));
    $("#content").css("margin-left", Math.max(($window.width() - $("#content").width()) / 2, 10));

    // renderLoop
    setInterval(function () {
        garden.render();
    }, Garden.options.growSpeed);
});

$(window).resize(function () {
    var newWidth = $(window).width();
    var newHeight = $(window).height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});

function getHeartPoint(angle) {
    var t = angle / Math.PI;
    var x = 19.5 * (16 * Math.pow(Math.sin(t), 3));
    var y = -20 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return new Array(offsetX + x, offsetY + y);
}

function startHeartAnimation() {
    var interval = 50;
    var angle = 10;
    var heart = new Array();
    var animationTimer = setInterval(function () {
        var bloom = getHeartPoint(angle);
        var draw = true;
        for (var i = 0; i < heart.length; i++) {
            var p = heart[i];
            var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
            if (distance < Garden.options.bloomRadius.max * 1.3) {
                draw = false;
                break;
            }
        }
        if (draw) {
            heart.push(bloom);
            garden.createRandomBloom(bloom[0], bloom[1]);
        }
        if (angle >= 30) {
            clearInterval(animationTimer);
            showMessages();
        } else {
            angle += 0.2;
        }
    }, interval);
}

(function ($) {
    $.fn.typewriter = function () {
        this.each(function () {
            var $ele = $(this), str = $ele.html(), progress = 0;
            $ele.html('');
            var timer = setInterval(function () {
                var current = str.substr(progress, 1);
                if (current == '<') {
                    progress = str.indexOf('>', progress) + 1;
                } else {
                    progress++;
                }
                $ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
                if (progress >= str.length) {
                    clearInterval(timer);
                }
            }, 75);
        });
        return this;
    };
})(jQuery);

function timeElapse(date) {
    var current = new Date();
    var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
    var days = Math.floor(seconds / (3600 * 24));
    seconds = seconds % (3600 * 24);
    var hours = Math.floor(seconds / 3600);
    if (hours < 10) {
        hours = "0" + hours;
    }
    seconds = seconds % 3600;
    var minutes = Math.floor(seconds / 60);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    seconds = seconds % 60;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var result = "<span class=\"digit\">" + days + "</span> days <span class=\"digit\">" + hours + "</span> hours <span class=\"digit\">" + minutes + "</span> minutes <span class=\"digit\">" + seconds + "</span> seconds";
    $("#elapseClock").html(result);
}

function showMessages() {
    adjustWordsPosition();
    $('#messages').fadeIn(5000, function () {
        showLoveU();
    });

    // Mostra il pulsante play dopo che l'animazione è finita
    $('#playButtonOverlay').fadeIn(1000);
}

function adjustWordsPosition() {
    $('#words').css("position", "absolute");
    $('#words').css("top", $("#garden").position().top + 195);
    $('#words').css("left", $("#garden").position().left + 70);
}

function adjustCodePosition() {
    $('#code').css("margin-top", ($("#garden").height() - $("#code").height()) / 2);
}

function showLoveU() {
    $('#loveu').fadeIn(3000);
}

// Timeline Scroll Animation
function checkTimelineVisibility() {
    const items = document.querySelectorAll('.timeline-item');
    const windowHeight = window.innerHeight;

    items.forEach((item, index) => {
        const boxTop = item.getBoundingClientRect().top;
        if (boxTop < windowHeight - 100) {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 200); // Ritardo per farli apparire uno alla volta
        }
    });
}

window.addEventListener('scroll', checkTimelineVisibility);
window.addEventListener('load', checkTimelineVisibility);

let timelineLineDrawn = false;

function animateTimelineLine() {
    const timeline = document.getElementById('timeline');
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (!timelineLineDrawn && rect.top < windowHeight - 100) {
        const lineElement = document.createElement('div');
        lineElement.id = 'animated-line';
        timeline.appendChild(lineElement);

        // Forza il browser a calcolare l'altezza
        void lineElement.offsetWidth;

        // Applica l'altezza finale
        lineElement.style.height = `${timeline.offsetHeight}px`;
        timelineLineDrawn = true;
    }
}

// Richiama l'animazione quando l'utente scrolla
window.addEventListener('scroll', animateTimelineLine);
window.addEventListener('load', animateTimelineLine);

document.addEventListener("DOMContentLoaded", function () {
    const futureMessages = [
        "un giorno ti chiederò di sposarmi ❤",
        "un giorno vivremo insieme in una casa tutta nostra",
        "ti amerò sempre, anche tra mille anni",
        "un giorno ci sveglieremo insieme ogni mattina ❤",
        "un giorno ti regalerò un anello con il tuo nome inciso",
        "ei bimba un figlio con me lo vuoi?",
        "tiamo da morire principessa",
        "dai sbrigati a darmi quelle mani che ci sposiamo",
        "credi sempre in te stessa, sei la migliore",
        "un giorno realizzeremo tutti i nostri sogni insieme",
        "dove vuoi andare che ti ci porto?",
        "ti amerò per sempre"
    ];

    const button = document.getElementById('futureButton');
    if (button) {
button.addEventListener('click', function () {
    const messageDiv = document.getElementById('futureMessage');
    const randomMessage = futureMessages[Math.floor(Math.random() * futureMessages.length)];

    messageDiv.innerHTML = '';
    messageDiv.classList.add('show');
    messageDiv.style.opacity = 0;
    messageDiv.style.transform = 'scale(0.8)';
    messageDiv.style.transition = 'all 0.4s ease';
    messageDiv.style.transformOrigin = 'center';

    setTimeout(() => {
        messageDiv.style.opacity = 1;
        messageDiv.style.transform = 'scale(1)';
        typeWriterEffect(messageDiv, randomMessage, 40);
    }, 200);
});
    }

    // --- Codice dei fiorellini e cuoricini ---
    const icons = ['❤', '🌸', '🌼', '🌷', '🌹', '💐'];
    const container = document.getElementById('floating-icons');

    function createFloatingItem() {
        if (!container) return;
        if (activeFloatingItems >= MAX_FLOATING_ITEMS) return;

        const icon = document.createElement('div');
        icon.classList.add('floating-item');
        icon.textContent = icons[Math.floor(Math.random() * icons.length)];

        // Posizione casuale
        icon.style.left = Math.random() * 100 + 'vw';
        icon.style.top = Math.random() * 100 + 'vh';

        // Durata e dimensione casuali
        const duration = 15 + Math.random() * 10;
        icon.style.animationDuration = duration + 's';

        // Aumentiamo il contatore
        activeFloatingItems++;

        // Reazione al click
icon.addEventListener('click', () => {
    // Effetto esplosione
    explodeIcon(icon);
    icon.classList.add('fade-out');
    setTimeout(() => icon.remove(), 500);
});

// Effetto quando il mouse passa sopra
icon.addEventListener('mouseenter', () => {
    icon.style.color = '#ff3399';
    icon.style.transform = 'scale(1.5)';
});
icon.addEventListener('mouseleave', () => {
    icon.style.color = '#ff99cc';
    icon.style.transform = 'scale(1)';
});
        // Rimuovi dal contatore quando l'emoji scompare
        icon.addEventListener('animationend', () => {
            icon.remove();
            activeFloatingItems = Math.max(0, activeFloatingItems - 1);
        });

        icon.addEventListener('transitionend', () => {
            icon.remove();
            activeFloatingItems = Math.max(0, activeFloatingItems - 1);
        });

        container.appendChild(icon);
    }

    // Crea un fiorellino ogni 2-4 secondi
    setInterval(() => {
        createFloatingItem();
    }, Math.random() * 1000 + 2000);
});

function explodeIcon(element) {
    const parent = document.getElementById('floating-icons');
    const explosionCount = Math.min(8, MAX_FLOATING_ITEMS - activeFloatingItems);

    if (explosionCount <= 0) return;

    const rect = element.getBoundingClientRect();

    for (let i = 0; i < explosionCount; i++) {
        const emoji = document.createElement('div');
        emoji.classList.add('floating-item', 'explode-emoji');
        emoji.textContent = element.textContent;

        emoji.style.left = `${rect.left + window.scrollX}px`;
        emoji.style.top = `${rect.top + window.scrollY}px`;

        const angle = Math.random() * 2 * Math.PI;
        const speed = 2 + Math.random() * 3;

        const velocity = {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed
        };

        activeFloatingItems++;

        parent.appendChild(emoji);

        let ticks = 0;
        const move = () => {
            emoji.style.left = parseFloat(emoji.style.left) + velocity.x + 'px';
            emoji.style.top = parseFloat(emoji.style.top) + velocity.y + 'px';

            velocity.y += 0.05;
            ticks++;

            if (ticks < 60) {
                requestAnimationFrame(move);
            } else {
                emoji.remove();
                activeFloatingItems = Math.max(0, activeFloatingItems - 1);
            }
        };

        requestAnimationFrame(move);

        // Rimuovi l'emoji dopo l'animazione
        setTimeout(() => {
            emoji.remove();
            activeFloatingItems = Math.max(0, activeFloatingItems - 1);
        }, 1000);
    }
}

function typeWriterEffect(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}