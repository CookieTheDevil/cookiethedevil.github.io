(() => {
    const loadingScreen = document.querySelector("#loading-screen");

    const galleryImages = Array.from(
        document.querySelectorAll(".snapshot-gallery img")
    );

    if (!loadingScreen || galleryImages.length === 0) {
        return;
    }

    const minimumLoadingTime = 2000; // 2 seconds
    const startTime = Date.now();

    let finishedImages = 0;
    let hasHiddenLoader = false;

    const hideLoadingScreen = () => {
        if (hasHiddenLoader) {
            return;
        }

        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(
            minimumLoadingTime - elapsedTime,
            0
        );

        window.setTimeout(() => {
            if (hasHiddenLoader) {
                return;
            }

            hasHiddenLoader = true;
            loadingScreen.classList.add("is-hidden");

            window.setTimeout(() => {
                loadingScreen.remove();
            }, 400);
        }, remainingTime);
    };

    const imageFinished = () => {
        finishedImages += 1;

        if (finishedImages >= galleryImages.length) {
            hideLoadingScreen();
        }
    };

    galleryImages.forEach((image) => {
        // Make sure every gallery image starts loading immediately
        image.loading = "eager";

        if (image.complete) {
            imageFinished();
            return;
        }

        image.addEventListener("load", imageFinished, { once: true });
        image.addEventListener("error", imageFinished, { once: true });
    });

    // Emergency fallback
    window.setTimeout(() => {
        hideLoadingScreen();
    }, 30000);
})();