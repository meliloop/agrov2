// Declare general function to get or set status into storage
const statusPrompt = {
    get: () => {
        return localStorage.getItem('statusPrompt') || null;
    },
    set: (status) => {
        localStorage.setItem('statusPrompt', status);
        return;
    }
}
  
window.onload = (e) => { 
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('js/worker.js').then(function(registration) {
                console.log('Worker registration successful', registration.scope);
            }, function(err) {
                console.log('Worker registration failed', err);
            }).catch(function(err) {
                console.log(err);
            });
        });
    } else {
        console.log('Service Worker is not supported by browser.');
    }
    
    const buttonInstall = document.querySelector('#buttonInstall');

    let deferredPromptInstall;
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPromptInstall = e;
    });

    // Add event click function for Install button
    buttonInstall.addEventListener('click', (e) => {
        // Show the prompt
        deferredPromptInstall.prompt();
        // Wait for the user to respond to the prompt
        deferredPromptInstall.userChoice
            .then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    statusPrompt.set('accepted');
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                deferredPromptInstall = null;
            });
    });
  }