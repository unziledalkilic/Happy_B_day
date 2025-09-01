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
    blowSound.volume = 0.9;

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
        // Metinleri görünür yap
        wishTextContainer.style.display = 'block';
        setTimeout(() => {
             wishTextContainer.classList.add('show');
        }, 50);

        // Sonraki bölüm butonunu göster
        setTimeout(() => {
            nextSectionButton.style.display = 'inline-block';
        }, 2000);

        // Butonu devre dışı bırak
        rubLampButton.disabled = true;
        rubLampButton.style.opacity = '0.5';
    }

    // Galeri elementleri
    const nextSectionButton = document.getElementById('nextSectionButton');
    const galleryScreen = document.querySelector('.gallery-screen');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const prevButtons = document.querySelectorAll('.prev-button');
    const nextButtons = document.querySelectorAll('.next-button');
    const imageCounters = document.querySelectorAll('.image-counter');

    let currentImageIndex = 0;
    let autoPlayInterval = null;
    let isAutoPlaying = false;

    function goToGallery() {
        // Dilek ekranını yukarı kaydır
        fortuneScreen.classList.remove('slide-up');
        fortuneScreen.style.transform = 'translateY(-100%)';
        
        // Galeri ekranını göster ve yukarı kaydır
        galleryScreen.style.display = 'flex';
        setTimeout(() => {
            galleryScreen.classList.add('slide-up');
            // Galeri açıldığında otomatik kaydırma hemen başlar
            setTimeout(() => {
                startAutoPlay();
            }, 500); // 1 saniyeden 500ms'ye düşürüldü
        }, 100);
    }

    // Galeri fonksiyonları
    function showImage(index) {
        console.log('showImage called with index:', index); // Debug için
        console.log('Total gallery items:', galleryItems.length); // Debug için
        
        // Tüm fotoğrafları gizle
        galleryItems.forEach((item, i) => {
            if (i === index) {
                console.log('Showing item', i); // Debug için
                item.style.display = 'flex';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            } else {
                console.log('Hiding item', i); // Debug için
                item.style.display = 'none';
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
            }
        });
        
        currentImageIndex = index;
        console.log('Current image index set to:', currentImageIndex); // Debug için
        updateImageCounter();
        updateNavigationButtons();
    }

    function nextImage() {
        console.log('nextImage called'); // Debug için
        const nextIndex = (currentImageIndex + 1) % galleryItems.length;
        showImage(nextIndex);
        // Manuel geçişte otomatik kaydırma devam eder
        // stopAutoPlay(); // Bu satır kaldırıldı
    }

    function prevImage() {
        console.log('prevImage called'); // Debug için
        const prevIndex = currentImageIndex === 0 ? galleryItems.length - 1 : currentImageIndex - 1;
        showImage(prevIndex);
        // Manuel geçişte otomatik kaydırma devam eder
        // stopAutoPlay(); // Bu satır kaldırıldı
    }

    function updateImageCounter() {
        imageCounters.forEach(counter => {
            counter.textContent = `${currentImageIndex + 1} / ${galleryItems.length}`;
        });
    }

    function updateNavigationButtons() {
        prevButtons.forEach(button => {
            button.disabled = false;
        });
        nextButtons.forEach(button => {
            button.disabled = false;
        });
    }

    function startAutoPlay() {
        console.log('startAutoPlay called'); // Debug için
        console.log('Gallery items count:', galleryItems.length); // Debug için
        console.log('Current image index:', currentImageIndex); // Debug için
        
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            console.log('Cleared existing interval'); // Debug için
        }
        
        isAutoPlaying = true;
        console.log('Auto play started, interval will be 2 seconds'); // Debug için
        
        autoPlayInterval = setInterval(() => {
            console.log('Auto play next image, current:', currentImageIndex); // Debug için
            const nextIndex = (currentImageIndex + 1) % galleryItems.length;
            console.log('Next index will be:', nextIndex); // Debug için
            showImage(nextIndex);
        }, 2000); // 3 saniyeden 2 saniyeye düşürüldü
    }

    function stopAutoPlay() {
        console.log('stopAutoPlay called'); // Debug için
        isAutoPlaying = false;
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
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

    // Event listeners
    blowButton.addEventListener('click', blowCandles);
    rubLampButton.addEventListener('click', rubLamp);
    nextSectionButton.addEventListener('click', goToGallery);
    
    // Galeri butonlarına event listener ekle
    console.log('Adding event listeners to buttons...'); // Debug için
    console.log('prevButtons found:', prevButtons.length); // Debug için
    console.log('nextButtons found:', nextButtons.length); // Debug için
    
    // Event delegation kullanarak butonları yakala
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('prev-button')) {
            console.log('Prev button clicked via delegation!'); // Debug için
            e.preventDefault();
            e.stopPropagation();
            prevImage();
        } else if (e.target.classList.contains('next-button')) {
            console.log('Next button clicked via delegation!'); // Debug için
            e.preventDefault();
            e.stopPropagation();
            nextImage();
        }
    });

    // Galeri item'larına tıklama efekti
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            showImage(index);
            // Tıklandığında otomatik kaydırma devam eder
            // stopAutoPlay(); // Bu satır kaldırıldı
        });
    });

    // İlk fotoğrafı göster
    console.log('Initializing gallery...'); // Debug için
    showImage(0);

    // Klavye kontrolleri
    document.addEventListener('keydown', (e) => {
        if (galleryScreen.style.display === 'flex') {
            switch(e.key) {
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
            }
        }
    });
});
