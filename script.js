document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("reveal-button");
    const progressBar = document.getElementById("progress-bar");
    const cookieImage = document.getElementById("cookie-image");
    const fortuneText = document.getElementById("fortune-text");

    const fortunes = [
        "The moment you’ve been waiting for is already on its way. Brace yourself.",
        "A silence will break — and with it, the truth you’ve longed to hear.",
        "Fate has not forgotten you. Your time is near.",
        "What was once lost will return when you least expect it.",
        "Your name will be spoken in a room you haven’t entered yet.",
        "An unseen force is guiding you — trust the chills on your skin.",
        "Be careful what you wish for — some doors don’t close once opened.",
        "A shadow from the past is about to knock. Will you answer?",
        "Not all smiles are kind. Watch closely.",
        "You will soon face a choice that can’t be undone."

    ];

    button.addEventListener("click", function () {
        button.disabled = true; // disable button
        let progress = 0;

        const interval = setInterval(() => {
            progress += 2;
            progressBar.style.width = `${progress}%`;
            progressBar.setAttribute("aria-valuenow", progress);

            if (progress >= 100) {
                clearInterval(interval);

                // Change image
                cookieImage.src = "img/cookie_opened.jpg";

                // Show fortune
                const random = Math.floor(Math.random() * fortunes.length);
                fortuneText.textContent = fortunes[random];
                fortuneText.style.display = "block";
                fortuneText.style.opacity = 0;

                let opacity = 0;
                const fade = setInterval(() => {
                    opacity += 0.05;
                    fortuneText.style.opacity = opacity;
                    if (opacity >= 1) clearInterval(fade);
                }, 50);
            }
        }, 50);
    });
});
