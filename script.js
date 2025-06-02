document.addEventListener('DOMContentLoaded', () => {
    const blowButton = document.getElementById('blowButton');
    const rubLampButton = document.getElementById('rubLampButton');
    const candles = document.querySelectorAll('.candle');
    const cakeScreen = document.querySelector('.cake-screen');
    const fortuneScreen = document.querySelector('.fortune-screen');
    const magicLampContainer = document.querySelector('.magic-lamp-container');
    const wishTextContainer = document.querySelector('.wish-text-container');
    const mainWishText = document.querySelector('.main-wish');
    const additionalText = document.querySelector('.additional-text');

    let isBlowing = false;

    // Üfleme sesi efekti
    const blowSound = document.getElementById('blowSound');
    blowSound.src = 'Blowing - Sound Effect.mp3';
    blowSound.volume = 0.9; // Ses seviyesini artır (0.0 ile 1.0 arası)

    function blowCandles() {
        if (isBlowing) return;
        isBlowing = true;
        
        // Üfleme sesini çal
        blowSound.play();

        // Her mumu sırayla söndür
        candles.forEach((candle, index) => {
            setTimeout(() => {
                const flame = candle.querySelector('.flame');
                flame.style.animation = 'none';
                flame.style.transform = 'translateX(-50%) scale(0)';
                flame.style.opacity = '0';
                
                setTimeout(() => {
                    candle.setAttribute('data-lit', 'false');
                }, 300);
            }, index * 200);
        });

        // Konfeti efekti
        createConfetti();

        // Butonu devre dışı bırak
        blowButton.disabled = true;
        blowButton.style.opacity = '0.5';

        // 2 saniye sonra ekranı değiştir
        setTimeout(() => {
            cakeScreen.classList.add('slide-up');
            fortuneScreen.style.display = 'flex';
            setTimeout(() => {
                fortuneScreen.classList.add('slide-up');
            }, 100);
        }, 2000);
    }

    function rubLamp() {
        // Lamba ovuşturma veya duman efekti eklenebilir burada

        // Metinleri görünür yap
        wishTextContainer.style.display = 'block'; // Display none'dan block yap
        setTimeout(() => {
             wishTextContainer.classList.add('show'); // Animasyonu başlatmak için class ekle
        }, 50);
       

        // Butonu devre dışı bırak
        rubLampButton.disabled = true;
        rubLampButton.style.opacity = '0.5';
    }

    function createConfetti() {
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            document.body.appendChild(confetti);

            // Konfeti elementini temizle
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }

    // Konfeti stillerini ekle
    const style = document.createElement('style');
    style.textContent = `
        .confetti {
            position: fixed;
            top: -10px;
            width: 10px;
            height: 10px;
            animation: fall linear forwards;
            z-index: 1000;
        }

        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);

    blowButton.addEventListener('click', blowCandles);
    rubLampButton.addEventListener('click', rubLamp);
}); 