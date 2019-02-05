// Find post edit form
let postEditForm = document.getElementById('postEditForm');
// Add submit event listener to post edit form
postEditForm.addEventListener('submit', (event) => {
    // find length of uploaded images
    let imageUploads = document.getElementById('imageUpload').files.length;
    // find total number of existing images
    let existingImages = document.querySelectorAll('.imageDeleteCheckbox').length;
    // find total number of potential image deletions
    let imageDeletions =  document.querySelectorAll('.imageDeleteCheckbox:checked').length;

    // figure out if the form can be submitted or not
    if (imageUploads <= 4) {
        let newTotalImages = existingImages - imageDeletions + imageUploads;
        if (newTotalImages > 4) {
            event.preventDefault();
            let newTotalAvg = newTotalImages - 4;
            alert(`You need to remove at least ${newTotalAvg} more image${newTotalAvg == 1 ? '' : 's'}!`);
        }
    } else {
        event.preventDefault();
        alert(`You can only upload 4 images per product!`);
    }
});