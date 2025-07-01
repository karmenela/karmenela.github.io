// Load confetti script
const script = document.createElement('script');
script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
document.head.appendChild(script);

// Hash function to generate love score from names
function getLovePercentage(name1, name2) {
    const combined = (name1 + name2).toLowerCase().replace(/\s+/g, '');
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
        hash = combined.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }
    return Math.abs(hash % 101);
}

// Get message based on percentage
function getMessage(percent) {
    if (percent >= 90) return "💖 Soulmates! Meant to be together forever.";
    if (percent >= 70) return "💘 A strong bond with lots of potential!";
    if (percent >= 50) return "💞 There's something special brewing...";
    if (percent >= 30) return "💓 Maybe just friends... or maybe more?";
    return "💔 Hmmm... not the strongest match, but who knows?";
}

// Main interactive logic
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("calc-btn");
    const resultCircle = document.getElementById("result-circle");

    // Create and append message box
    const messageBox = document.createElement("div");
    messageBox.id = "love-message";
    messageBox.style.fontSize = "1.2rem";
    messageBox.style.marginTop = "20px";
    messageBox.style.fontWeight = "500";
    messageBox.style.display = "none";
    messageBox.style.opacity = 0;
    messageBox.style.transition = "opacity 1s";
    resultCircle.parentNode.appendChild(messageBox);

    btn.addEventListener("click", () => {
        const name1 = document.getElementById("name1").value.trim();
        const name2 = document.getElementById("name2").value.trim();

        if (!name1 || !name2) {
            alert("Please enter both names 💔");
            return;
        }

        const percent = getLovePercentage(name1, name2);
        const message = getMessage(percent);

        let current = 0;
        resultCircle.textContent = "0%";
        resultCircle.classList.add("show");
        messageBox.style.display = "none";
        messageBox.style.opacity = 0;

        const interval = setInterval(() => {
            if (current < percent) {
                current++;
                resultCircle.textContent = `${current}%`;
            } else {
                clearInterval(interval);
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
                // Show the message
                messageBox.textContent = message;
                messageBox.style.display = "block";
                setTimeout(() => messageBox.style.opacity = 1, 100);
            }
        }, 20);
    });
});
