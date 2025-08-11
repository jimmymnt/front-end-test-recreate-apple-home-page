// Footer collapsible functionality
export function initFooter() {
    const footerRoot = document.querySelector('.footer');
    if (!footerRoot) return;

    const allHeaders = footerRoot.querySelectorAll('.footer__section-header');

    allHeaders.forEach((header) => {
        header.addEventListener('click', () => {
            if (window.innerWidth <= 734) {
                const isExpanded = header.classList.contains('expanded');

                // Close all other headers
                allHeaders.forEach((otherHeader) => {
                    if (otherHeader !== header) {
                        otherHeader.classList.remove('expanded');
                    }
                });

                // Toggle current header
                if (isExpanded) {
                    header.classList.remove('expanded');
                } else {
                    header.classList.add('expanded');
                }
            }
        });
    });

    // Handle window resize: reset state on desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 734) {
            allHeaders.forEach((header) => header.classList.remove('expanded'));
        }
    });
}
