// Add scroll animation styles
const style = document.createElement('style');
style.textContent = `
  .fade-in-up {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  
  .fade-in-up.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .slide-up {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  
  .slide-up.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .gallery-img {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .gallery-img.visible {
    opacity: 1;
    transform: scale(1);
  }
  
  .step-box {
    opacity: 0;
    transform: scale(0.8);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .step-box.visible {
    opacity: 1;
    transform: scale(1);
  }
  
  .footer-slide {
    opacity: 0;
    transform: translateY(60px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  
  .footer-slide.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

// Initialize scroll observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains('step-box')) {
        // Stagger animation for step boxes
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 150);
      } else {
        entry.target.classList.add('visible');
      }
    }
  });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fade-in-up, .slide-up, .gallery-img, .step-box, .footer-slide').forEach(el => {
    observer.observe(el);
  });
});

const pairAddress = "9bTf3SMyrCf9Rufehn8vtMd2BFEZGRkHTtB4KY3UZemr";

async function loadTokenData() {
    try {
        const res = await fetch(`https://api.dexscreener.com/latest/dex/pairs/solana/${pairAddress}`);

        const data = await res.json();
        const pair = data.pairs[0];

            if (pair) {
        document.getElementById("price").textContent = "$" + Number(pair.priceUsd).toFixed(6);
        document.getElementById("liquidity").textContent = "$" + Math.round(pair.liquidity.usd).toLocaleString();
        document.getElementById("mc").textContent = "$" + Math.round(pair.fdv).toLocaleString();
        document.getElementById("vol").textContent = "$" + Math.round(pair.volume.h24).toLocaleString();
            }
    } catch (err) {
        console.log("error loading token data", err);
    }
}

loadTokenData();
setInterval(loadTokenData, 10000);


function copyCA() {
  const text = document.getElementById("contractAddress").innerText;
  navigator.clipboard.writeText(text);

  const btn = event.target;
  btn.innerText = "COPIED";
  
  setTimeout(() => {
    btn.innerText = "COPY";
  }, 1500);
}

document.querySelectorAll('section img').forEach(img => {
  img.addEventListener('click', () => {
    document.getElementById('lightboxImg').src = img.src;
    document.getElementById('lightbox').classList.remove('hidden');
  });
});

document.getElementById('lightbox').addEventListener('click', () => {
  document.getElementById('lightbox').classList.add('hidden');
});