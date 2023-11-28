//* Spotify API Process

startMusic();

function startMusic() {
   getToken();
}

//The access token is a string which contains the credentials and permissions that can be used to access a given resource (e.g artists, albums or tracks) or user's data (e.g your profile or your playlists).
//To use the access token you must include the following header in your API calls:
// Authorization	Valid access token following the format: Bearer <Access Token>
//Note that the access token is valid for 1 hour (3600 seconds). After that time, the token expires and you need to request a new one.

//! Authorization code flow with PKCE - it is the recommended authorization flow if we are implementing authorization in a mobile app, single page web apps,
//! or any other type of application where the client secret can’t be safely stored.

//* Creation of code verifier - from Spotify for Developers
const generateRandomString = (length) => {
   const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   const values = crypto.getRandomValues(new Uint8Array(length));
   return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};


//* Code Challenge - from Spotify for Developers
//* Once the code verifier has been generated, we must transform (hash) it using the SHA256 algorithm.
//*This is the value that will be sent within the user authorization request.
const sha256 = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
}

//* Function base64encode - from Spotify for Developers
//* Returns the base64 representation of the digest we just calculated with the sha256 function  
const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

//* Code challenge generation - from Spotify for Developers
const codeVerifier = generateRandomString(128);
const hashed = await sha256(codeVerifier)
const codeChallenge = base64encode(hashed);

//* Request User Authorization - from Spotify for Developers
//* The app generates a PKCE code challenge and redirects to the Spotify authorization server login page by updating the window.location object value. 
//* This allows the user to grant permissions to our application
//* Please note that the code verifier value is stored locally using the localStorage JavaScript property for use in the next step of the authorization flow.

const clientId = '09492227f96b49f889b2baa58716b1a3';
const redirectUri = 'http://localhost:8080';

const scope = 'user-read-private user-read-email';
const authUrl = new URL("https://accounts.spotify.com/authorize")

//* generated in the previous step
window.localStorage.setItem('code_verifier', codeVerifier);

const params =  {
  response_type: 'code',
  client_id: clientId,
  scope,
  code_challenge_method: 'S256',
  code_challenge: codeChallenge,
  redirect_uri: redirectUri,
}

authUrl.search = new URLSearchParams(params).toString();
window.location.href = authUrl.toString();

 




