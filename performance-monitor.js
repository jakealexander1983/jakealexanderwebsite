// Performance Monitoring Script
// Add this to track Core Web Vitals and performance metrics

// Track LCP (Largest Contentful Paint)
function trackLCP() {
    new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
        // Send to analytics if needed
    }).observe({entryTypes: ['largest-contentful-paint']});
}

// Track FID (First Input Delay)
function trackFID() {
    new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
            console.log('FID:', entry.processingStart - entry.startTime);
            // Send to analytics if needed
        }
    }).observe({entryTypes: ['first-input']});
}

// Track CLS (Cumulative Layout Shift)
function trackCLS() {
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
            if (!entry.hadRecentInput) {
                clsValue += entry.value;
            }
        }
        console.log('CLS:', clsValue);
        // Send to analytics if needed
    }).observe({entryTypes: ['layout-shift']});
}

// Track TTFB (Time to First Byte)
function trackTTFB() {
    new PerformanceObserver((entryList) => {
        const [pageNav] = entryList.getEntries();
        console.log('TTFB:', pageNav.responseStart - pageNav.requestStart);
        // Send to analytics if needed
    }).observe({entryTypes: ['navigation']});
}

// Track Font Loading Performance
function trackFontLoading() {
    if ('fonts' in document) {
        document.fonts.ready.then(() => {
            console.log('All fonts loaded at:', performance.now());
        });
    }
}

// Track Image Loading
function trackImageLoading() {
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
        img.addEventListener('load', () => {
            console.log(`Image ${index + 1} loaded at:`, performance.now());
        });
    });
}

// Initialize all tracking
if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        trackLCP();
        trackFID();
        trackCLS();
        trackTTFB();
        trackFontLoading();
        trackImageLoading();
        
        // Log performance timing
        console.log('Performance Metrics:', {
            'DOM Content Loaded': performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd,
            'Load Complete': performance.getEntriesByType('navigation')[0].loadEventEnd,
            'First Paint': performance.getEntriesByName('first-paint')[0]?.startTime,
            'First Contentful Paint': performance.getEntriesByName('first-contentful-paint')[0]?.startTime
        });
    });
}