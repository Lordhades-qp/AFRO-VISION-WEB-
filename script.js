document.addEventListener("DOMContentLoaded", function () {
    const subscribeBtn = document.getElementById("subscribeBtn");
    const bdContent = document.getElementById("bdContent");
    const subscriptionPage = document.getElementById("subscriptionPage");
    const chapterList = document.getElementById("chapterList");
    const ratingStars = document.querySelectorAll(".rating-star");

    // Vérifier si l'utilisateur est déjà abonné
    if (localStorage.getItem("subscribed") === "true") {
        showBDContent();
    }

    // Gestion du bouton d'abonnement
    if (subscribeBtn) {
        subscribeBtn.addEventListener("click", function () {
            localStorage.setItem("subscribed", "true");
            showBDContent();
        });
    }

    // Afficher la section BD après abonnement
    function showBDContent() {
        if (subscriptionPage) subscriptionPage.style.display = "none";
        if (bdContent) bdContent.style.display = "block";
    }

    // Gestion des chapitres (exemple : navigation)
    if (chapterList) {
        chapterList.addEventListener("change", function () {
            const selectedChapter = chapterList.value;
            if (selectedChapter) {
                window.location.href = selectedChapter;
            }
        });
    }

    // Gestion des étoiles de notation
    ratingStars.forEach((star, index) => {
        star.addEventListener("click", function () {
            setRating(index + 1);
        });
    });

    function setRating(rating) {
        localStorage.setItem("userRating", rating);
        updateStars(rating);
    }

    function updateStars(rating) {
        ratingStars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add("rated");
            } else {
                star.classList.remove("rated");
            }
        });
    }

    // Charger la note précédente
    const savedRating = localStorage.getItem("userRating");
    if (savedRating) updateStars(parseInt(savedRating));

    // Mode hors ligne (cache les BD)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(() => console.log("Service Worker enregistré"))
            .catch(err => console.error("Service Worker erreur:", err));
    }
});
