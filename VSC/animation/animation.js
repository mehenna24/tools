
const animatedBox = document.createElement('div');
animatedBox.style.backgroundColor = 'blue';
animatedBox.style.width = '20px';
animatedBox.style.height = '20px';
animatedBox.style.borderRadius = '50%';
animatedBox.style.position = 'absolute'; 


animatedBox.style.left = '0px';
animatedBox.style.top = '0px';

document.body.appendChild(animatedBox);

var position = 0;
var direction = 1;

function animate() {
    position += direction * 5;
    animatedBox.style.left = position + 'px';
    animatedBox.style.top = position + 'px';

    if (position >= window.innerWidth || position <= 0) { 
        direction *= -1;
    }

    if (position >= window.innerHeight  || position <= 0) { 
        direction *= -1;
    }

 
    requestAnimationFrame(animate);
}


animate();