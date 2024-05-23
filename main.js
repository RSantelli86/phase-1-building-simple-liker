// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
// Add the .hidden class to the error modal
const modal = document.getElementById('modal');
modal.classList.add('hidden');

// Get all the like-glyph elements
const likeGlyphs = document.querySelectorAll('.like-glyph');

// Add event listeners to each like-glyph
likeGlyphs.forEach(likeGlyph => {
  likeGlyph.addEventListener('click', () => {
    mimicServerCall()
      .then(() => {
        // When the "server" returns a success status:
        likeGlyph.innerHTML = FULL_HEART; // Change the heart to a full heart
        likeGlyph.classList.add('activated-heart'); // Add the .activated-heart class
      })
      .catch(error => {
        // When the "server" returns a failure status:
        const modalMessage = document.getElementById('modal-message');
        modalMessage.textContent = error; // Display the server error message in the modal
        modal.classList.remove('hidden'); // Display the error modal by removing the .hidden class

        // Use setTimeout to hide the modal after 3 seconds (add the .hidden class)
        setTimeout(() => {
          modal.classList.add('hidden');
        }, 3000);
      });

    // When a user clicks on a full heart:
    if (likeGlyph.innerHTML === FULL_HEART) {
      likeGlyph.innerHTML = EMPTY_HEART; // Change the heart back to an empty heart
      likeGlyph.classList.remove('activated-heart'); // Remove the .activated-heart class
    } else {
      // Invoke mimicServerCall to simulate making a server request
      mimicServerCall();
    }
  });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
