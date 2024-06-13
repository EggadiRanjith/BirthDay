const confettiCanvas = document.getElementById('confettiCanvas');
const confettiCtx = confettiCanvas.getContext('2d');
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

const numBlasts = 5; // Number of image blasts
const maxScale = 0.001; // Maximum scale of the image
const minScale = 0.001; // Minimum scale of the image
const blastSpeed = 0.005; // Speed of blast animation (lower for slower animation)
const blastRotationSpeed = 0.005; // Rotation speed of blast animation
const blastImages = ['flower.png']; // Array of blast image paths

let blasts = [];

class Blast {
    constructor() {
        this.x = Math.random() * confettiCanvas.width;
        this.y = Math.random() * confettiCanvas.height;
        this.scale = Math.random() * (maxScale - minScale) + minScale;
        this.image = new Image();
        this.image.src = blastImages[Math.floor(Math.random() * blastImages.length)];
        this.alpha = 1; // Initial opacity
        this.rotation = Math.random() * Math.PI * 2; // Initial rotation angle
    }

    update() {
        this.scale += blastSpeed;
        this.alpha -= 0.003; // Decrease opacity over time
        this.rotation += blastRotationSpeed; // Rotate over time
    }

    draw() {
        confettiCtx.save();
        confettiCtx.globalAlpha = this.alpha;
        confettiCtx.translate(this.x, this.y);
        confettiCtx.rotate(this.rotation);
        confettiCtx.drawImage(this.image, -this.image.width * this.scale / 2, -this.image.height * this.scale / 2, this.image.width * this.scale, this.image.height * this.scale);
        confettiCtx.restore();
    }
}

function initBlasts() {
    blasts = [];
    for (let i = 0; i < numBlasts; i++) {
        blasts.push(new Blast());
    }
}

function animateBlasts() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    blasts.forEach(blast => {
        blast.update();
        blast.draw();
    });

    // Remove blasts that have faded out
    blasts = blasts.filter(blast => blast.alpha > 0);

    // Add new blasts continuously
    if (blasts.length < numBlasts) {
        blasts.push(new Blast());
    }

    requestAnimationFrame(animateBlasts);
}

window.addEventListener('load', () => {
    initBlasts();
    animateBlasts();
});

window.addEventListener('resize', () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    initBlasts();
});
