// Find post edit form
let postNewForm = document.getElementById('postNewForm');
// Add submit event listener to post edit form
postNewForm.addEventListener('submit', (event) => {
    // find length of uploaded images
    let imageUploads = document.getElementById('imageUpload').files.length;

    // figure out if the form can be submitted or not
    if (imageUploads > 4) {
        event.preventDefault();
        alert(`You can only upload 4 images per product!`);
    }
});