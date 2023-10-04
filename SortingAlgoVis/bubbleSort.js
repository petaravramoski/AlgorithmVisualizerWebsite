async function bubbleSortWithDelay(arr) {
    let i = 0;
    let j = 0;

    function step() {
        if (i >= arr.length - 1) {
            // If we've reached the end, stop sorting
            return;
        }

        if (j >= arr.length - i - 1) {
            j = 0;
            i++;
        }

        if (arr[j] > arr[j + 1]) {
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            generateBars(arr);
        }

        j++;
        currentAnimation = setTimeout(step, delay);
    }

    currentAnimation = setTimeout(step, delay); // Start the sorting process

    // Add an event listener to the reset button to reset the algorithm
    resetButton.addEventListener("click", () => {
        clearTimeout(currentAnimation); // Stop the current animation (if any)
        i = 0; // Reset i
        j = 0; // Reset j
    });
}