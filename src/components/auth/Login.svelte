<script>
    import auth from '../../auth/authService';

    export let auth0Client;

    function login() {
        auth.loginWithPopup(auth0Client);
    }
</script>

<button on:click={login}>Log in</button>

<style>
    button {
        width: 100px;
        text-transform: uppercase;
        background-color: white;
        color: black;
        border: 2px solid #f44336;
    }

    button:hover {
        background-color: #f44336;
        color: white;
    }
</style>
