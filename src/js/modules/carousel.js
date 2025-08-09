// Multi-Carousel functionality - Simplified version
export function initMultiCarousel() {
    // Configuration - dynamic based on screen size
    const totalItems = document.querySelectorAll(
        ".multi-carousel-item:not(.clone)"
    ).length;
    const maxCenterWidth = 1280;

    // DOM elements
    const carousel = document.getElementById("multiCarousel");
    const carouselInner = document.getElementById("carouselInner");
    const carouselIndicators = document.getElementById("carouselIndicators");

    // Function to calculate slide widths based on container width
    function calculateSlideWidths() {
        const containerWidth = carousel.offsetWidth;
        const isMobile = window.innerWidth < 720;
        if (isMobile) {
            document.documentElement.style.setProperty("--slide-width", "100%");
            return { slideWidthPercent: 100, translateOffset: 0 };
        }
        let centerWidthPercent;
        if (containerWidth <= maxCenterWidth) {
            centerWidthPercent = 80;
        } else {
            centerWidthPercent = (maxCenterWidth / containerWidth) * 100;
        }
        document.documentElement.style.setProperty(
            "--slide-width",
            `${centerWidthPercent}%`
        );
        const translateOffset = (100 - centerWidthPercent) / 2;
        return {
            slideWidthPercent: centerWidthPercent,
            translateOffset: translateOffset
        };
    }

    // Function to update configuration based on screen size
    function updateConfig() {
        return calculateSlideWidths();
    }

    // Function to get the slide number (1, 2, 3) from an element
    function getSlideNumber(element) {
        if (!element) return -1;

        const itemNumber = element.querySelector(".item-number");
        if (itemNumber) {
            return parseInt(itemNumber.textContent, 10);
        }

        return -1;
    }

    // Function to update center item highlighting
    function updateCenterItem() {
        const allItems = document.querySelectorAll(".multi-carousel-item, .clone");
        const centerIndex = Math.round(position);

        // Reset all slides first
        allItems.forEach((item) => {
            item.style.opacity = "";
            item.classList.remove("center");
        });

        if (allItems[centerIndex]) {
            const newCenterItem = allItems[centerIndex];
            newCenterItem.classList.add("center");
        }

        // Update indicators
        updateIndicators();
    }

    // Function to update indicator states
    function updateIndicators() {
        const indicators = document.querySelectorAll(".carousel-indicator");
        const currentSlideIndex = (position - 2 + totalItems) % totalItems;
        
        indicators.forEach((indicator, index) => {
            if (index === currentSlideIndex) {
                indicator.classList.add("active");
            } else {
                indicator.classList.remove("active");
            }
        });
    }

    // Dynamically add clone elements for infinite loop effect
    function initializeClones() {
        const originalItems = Array.from(
            document.querySelectorAll(".multi-carousel-item:not(.clone)")
        );
        document.querySelectorAll(".clone").forEach((clone) => clone.remove());

        const clonesNeeded = 2;

        // Prepend end clones
        originalItems
            .slice(-clonesNeeded)
            .reverse()
            .forEach((item) => {
                const clone = item.cloneNode(true);
                clone.classList.add("clone");
                clone.style.opacity = "";
                carouselInner.prepend(clone);
            });

        // Append start clones
        originalItems.slice(0, clonesNeeded).forEach((item) => {
            const clone = item.cloneNode(true);
            clone.classList.add("clone");
            clone.style.opacity = "";
            carouselInner.append(clone);
        });
    }

    // Set carousel height
    function setCarouselHeight() {
        document.documentElement.style.setProperty(
            "--carousel-height",
            "calc(100vh - 5rem)"
        );
    }

    // Update carousel position visually
    let slideConfig = updateConfig();
    initializeClones();
    setCarouselHeight();

    let position = 2;
    let isAnimating = false;

    // Pre-load all images to prevent flash on first slide
    function preloadImages() {
        const allImages = document.querySelectorAll(
            ".multi-carousel-item img, .clone img"
        );
        return Promise.all(
            Array.from(allImages).map((img) => {
                return new Promise((resolve) => {
                    if (img.complete) {
                        resolve();
                    } else {
                        img.onload = () => resolve();
                        img.onerror = () => resolve();
                    }
                });
            })
        );
    }

    function updateCarouselPosition(animate = true) {
        carouselInner.style.transition = animate ? "transform 0.5s ease" : "none";
        const { slideWidthPercent, translateOffset } = slideConfig;
        const translateX = -position * slideWidthPercent + translateOffset;
        carouselInner.style.transform = `translateX(${translateX}%)`;

        setTimeout(() => {
            updateCenterItem();
        }, animate ? 50 : 0);
    }

    // Function to go to a specific slide
    function goToSlide(slideIndex) {
        if (isAnimating) return;
        isAnimating = true;
        
        // Calculate the position for the target slide
        // We need to account for the 2 clones at the beginning
        position = slideIndex + 2;
        
        updateCarouselPosition();
    }

    // Preload images and then initialize carousel properly
    preloadImages().then(() => {
        // Set initial position without animation
        updateCarouselPosition(false);
        updateCenterItem();

        // Make carousel visible after everything is positioned
        setTimeout(() => {
            carouselInner.classList.add("initialized");
        }, 50);
    });

    carouselInner.addEventListener("transitionend", function (event) {
        if (event.target !== carouselInner || event.propertyName !== "transform")
            return;
        isAnimating = false;

        if (position >= totalItems + 2) {
            // When we reach the end clones, jump to the real slides without animation
            position = 2 + (position - (totalItems + 2));
            carouselInner.style.transition = "none";
            const { slideWidthPercent, translateOffset } = slideConfig;
            const translateX = -position * slideWidthPercent + translateOffset;
            carouselInner.style.transform = `translateX(${translateX}%)`;

            // Force reflow to ensure the transition is applied
            void carouselInner.offsetWidth;
            updateCenterItem();
        } else if (position < 2) {
            // When we reach the beginning clones, jump to the real slides without animation
            position = totalItems + position;
            carouselInner.style.transition = "none";
            const { slideWidthPercent, translateOffset } = slideConfig;
            const translateX = -position * slideWidthPercent + translateOffset;
            carouselInner.style.transform = `translateX(${translateX}%)`;

            // Force reflow to ensure the transition is applied
            void carouselInner.offsetWidth;
            updateCenterItem();
        }
    });

    // Add click event listeners to indicators
    if (carouselIndicators) {
        carouselIndicators.addEventListener("click", (e) => {
            if (e.target.classList.contains("carousel-indicator")) {
                const slideIndex = parseInt(e.target.dataset.slide);
                goToSlide(slideIndex);
            }
        });
    }

    // Keyboard navigation
    document.addEventListener("keydown", function (e) {
        if (
            carousel.offsetParent === null ||
            document.activeElement.tagName === "INPUT" ||
            document.activeElement.tagName === "TEXTAREA" ||
            document.activeElement.isContentEditable
        )
            return;
        switch (e.key) {
            case "ArrowLeft":
                e.preventDefault();
                const prevIndex = ((position - 2 - 1 + totalItems) % totalItems);
                goToSlide(prevIndex);
                break;
            case "ArrowRight":
                e.preventDefault();
                const nextIndex = ((position - 2 + 1) % totalItems);
                goToSlide(nextIndex);
                break;
        }
    });

    // Resize handler
    window.addEventListener("resize", function () {
        slideConfig = updateConfig();
        setCarouselHeight();
        updateCarouselPosition(false);
    });
}
