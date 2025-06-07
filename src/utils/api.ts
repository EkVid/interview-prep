const BASE_URL = 'http://localhost:8080'; // local development URL

// register user
export async function registerUser(username: String, email: String){
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method:'POST',
        headers: {
            contentType: 'application/json',
        },
        body: JSON.stringify({username, email})
    });

    return res.json();
}

// login
export async function loginUser(email: String, password: String){
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method:'POST',
        headers: {
            contentType: 'application/json',
        },
        body: JSON.stringify({email, password})
    });

    return res.json();
}

// logout
export async function logoutUser(){
    const res = await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include', // include cookies for session management
    });

    return res.json();
}