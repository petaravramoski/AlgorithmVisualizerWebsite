// Delay function to pause execution for a specified time
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to shuffle an array
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
}

// Variable to keep track of the current animation
let currentAnimation = null;

// Bogo Sort function with delay
async function bogoSortWithDelay(arr) {
    currentAnimation = "bogoSort"; // Set the current animation

    while (!isSorted(arr) && currentAnimation === "bogoSort") {
        shuffleArray(arr);
        generateBars(arr);
        await sleep(delay); // Delay for visualization
    }

    if (currentAnimation === "bogoSort") {
        currentAnimation = null; // Reset the current animation if it wasn't manually stopped
    }
}

// Function to check if an array is sorted
function isSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
}

// Function to reset the sorting process
function resetSorting() {
    currentAnimation = null; // Reset the current animation variable
}

// Add an event listener to the reset button to reset the algorithm
function addResetButtonListener() {
    const resetButton = document.getElementById("resetButton");

    resetButton.addEventListener("click", () => {
        resetSorting();
        generateBars(currentArray); // Generate new bars
    });
}

// Call addResetButtonListener to set up the event listener
addResetButtonListener();