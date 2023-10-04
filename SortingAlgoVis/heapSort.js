// Function to perform the heap sort with delay
function heapSortWithDelay(arr) {
    const N = arr.length;
    let i = 0;
    let resetRequested = false; // Flag to check if reset was requested

    // Function to reset the sorting process
    function resetSorting() {
        i = 0; // Reset i
        resetRequested = false; // Reset the flag
    }

    // Build max heap (rearrange array)
    async function buildMaxHeap() {
        for (let i = Math.floor(N / 2) - 1; i >= 0; i--) {
            await maxHeapify(arr, N, i);
            generateBars(arr); // Update the visualization
            await sleep(delay); // Delay for visualization
        }
    }

    // One by one extract an element from heap
    async function extractMax() {
        if (i >= N || resetRequested) {
            // If we've reached the end or a reset was requested, stop sorting
            resetSorting();
            return;
        }

        // Move current root to end
        const temp = arr[0];
        arr[0] = arr[N - 1 - i];
        arr[N - 1 - i] = temp;

        await maxHeapify(arr, N - 1 - i, 0);
        generateBars(arr); // Update the visualization
        await sleep(delay); // Delay for visualization

        i++;
        extractMax();
    }

    buildMaxHeap().then(() => {
        if (!resetRequested) {
            // If a reset was requested during building the heap, don't start extraction
            extractMax();
        }
    });

    // Function to add an event listener to the reset button
    function addResetButtonListener() {
        const resetButton = document.getElementById("resetButton");

        resetButton.addEventListener("click", () => {
            resetRequested = true;
        });
    }

    // Call addResetButtonListener to set up the event listener
    addResetButtonListener();
}


// To heapify a subtree rooted with node i which is
// an index in arr[]. n is size of heap
async function maxHeapify(arr, N, i) {
    let largest = i; // Initialize largest as root
    const l = 2 * i + 1; // left = 2*i + 1
    const r = 2 * i + 2; // right = 2*i + 2

    // If left child is larger than root
    if (l < N && arr[l] > arr[largest]) {
        largest = l;
    }

    // If right child is larger than largest so far
    if (r < N && arr[r] > arr[largest]) {
        largest = r;
    }

    // If largest is not root
    if (largest !== i) {
        const swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;

        // Recursively heapify the affected sub-tree
        await maxHeapify(arr, N, largest);
    }
}


// Function to add an event listener to the reset button
function addResetButtonListener() {
    const resetButton = document.getElementById("resetButton");

    resetButton.addEventListener("click", () => {
        // Set the resetRequested flag to true when the reset button is clicked
        resetRequested = true;
    });
}



// Call addResetButtonListener to set up the event listener
addResetButtonListener();