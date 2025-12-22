// A complex, real-world example with multiple layered issues
class DynamicDashboard {
    constructor(userId) {
        this.userId = userId;
        this.dataCache = {}; // Potential memory leak: unbounded cache
        this.activeRequests = new Map();
        this.init();
    }

    init() {
        // ISSUE 1: PERFORMANCE (Unoptimized Listener)
        // Adding a scroll listener that executes heavy logic 
        // hundreds of times per second without throttling.
        window.addEventListener('scroll', () => this.refreshUIPositions());
    }

    async updateProfile(userInput) {
        // ISSUE 2: SECURITY (DOM XSS)
        // Directly using user input to update HTML.
        const statusElement = document.getElementById('status-message');
        statusElement.innerHTML = `Welcome back, ${userInput.name}`; // VULNERABLE
    }

    async fetchData(resourceType) {
        // ISSUE 3: LOGIC (Async Race Condition)
        // If fetchData('users') is called twice rapidly, the second request
        // might finish before the first, but the first will eventually 
        // overwrite the state with "stale" data.
        const response = await fetch(`/api/${this.userId}/${resourceType}`);
        const data = await response.json();
        
        this.dataCache[resourceType] = data; 
        this.render(data);
    }

    render(data) {
        const container = document.getElementById('data-list');
        
        // ISSUE 4: PERFORMANCE (Layout Thrashing)
        // Modifying the DOM 1000+ times in a loop causes the browser
        // to recalculate layout on every iteration.
        data.items.forEach(item => {
            const div = document.createElement('div');
            div.textContent = item.label;
            container.appendChild(div); // Inefficient: triggers reflow
        });
    }

    destroy() {
        // ISSUE 5: MEMORY LEAK (Forgotten cleanup)
        // The scroll listener added in init() is never removed.
        // Even if this class instance is deleted, the listener
        // keeps a reference to `this`, preventing garbage collection.
        console.log("Dashboard destroyed, but listeners remain...");
    }
}
