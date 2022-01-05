<script>
    import auth from '../../auth/AuthService';
    import Message from '../Message.svelte';
    import { getContext } from 'svelte';
    import { isLoading } from '../../store';

    export let auth0Client;

    const { open } = getContext('simple-modal');

    function logout() {
        isLoading.set(true);
        auth.logout(auth0Client).catch(error => {
            open(Message, { message: 'Error: ' + error.message });
        });
        isLoading.set(false);
    }
</script>

<button on:click={logout}>Log out</button>

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
