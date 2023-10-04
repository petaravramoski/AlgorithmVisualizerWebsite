// Delay function to pause execution for a specified time
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Flag to indicate if reset was requested
let resetRequested = false;

// Function to merge two subarrays with a delay
async function merge(arr, l, m, r) {
    const n1 = m - l + 1;
    const n2 = r - m;

    const L = new Array(n1);
    const R = new Array(n2);

    for (let i = 0; i < n1; i++) {
        L[i] = arr[l + i];
    }
    for (let j = 0; j < n2; j++) {
        R[j] = arr[m + 1 + j];
    }

    let i = 0;
    let j = 0;
    let k = l;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
        generateBars(arr); // Update the visualization
        await sleep(delay); // Delay for visualization

        // Check if reset was requested
        if (resetRequested) {
            return;
        }
    }

    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
        generateBars(arr); // Update the visualization
        await sleep(delay); // Delay for visualization

        // Check if reset was requested
        if (resetRequested) {
            return;
        }
    }

    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
        generateBars(arr); // Update the visualization
        await sleep(delay); // Delay for visualization

        // Check if reset was requested
        if (resetRequested) {
            return;
        }
    }
}

//Merge Sort function with delay
async function mergeSort(arr, l, r) {
    resetRequested = false;//Reset the flag before sorting begins
    if (l < r) {
        const m = l + Math.floor((r - l) / 2);
        await mergeSort(arr, l, m);
        await mergeSort(arr, m + 1, r);
        await merge(arr, l, m, r);

        // Add this line to print the sorted array
        if (l === 0 && r === arr.length - 1) {
            console.log("Sorted Array (Merge Sort):", arr);
        }
    }
}
//Function to add an event listener to the reset button
function addResetButtonListener() {
    const resetButton = document.getElementById("resetButton");

    resetButton.addEventListener("click", () => {
        resetRequested = true; //Set the resetRequested flag to true when the reset button is clicked
        //Reset other variables and flags here as needed
        currentIndex = -1; //Reset the current index
        resetRequested = false; //Reset the resetRequested flag
    });
}

// Call addResetButtonListener to set up the event listener
addResetButtonListener();