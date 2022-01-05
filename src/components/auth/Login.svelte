<script>
    import auth from '../../auth/authService';
    import { getContext } from 'svelte';
    import Message from '../Message.svelte';
    import { isLoading } from '../../store';

    const { open } = getContext('simple-modal');

    export let auth0Client;

    function login() {
        isLoading.set(true);
        auth.loginWithPopup(auth0Client).catch(error => {
            open(Message, { message: 'Error: ' + error.message });
        });
        isLoading.set(false);
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
