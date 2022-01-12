<script>
    import auth from '../../auth/AuthService';
    import Message from '../Message.svelte';
    import { getContext } from 'svelte';
    import { isLoading, modal } from '../../store';
    import { bind } from 'svelte-simple-modal';

    export let auth0Client;

    const { open } = getContext('simple-modal');

    function logout() {
        $isLoading++;
        auth.logout(auth0Client).catch(exception => {
            $modal = (bind(Message, { message: ("Error: " + exception.message)}));
        });
        $isLoading--;
    }
</script>

<button on:click={logout}>Log out</button>

<style>
    button {
        width: 100px;
        text-transform: uppercase;
        background-color: var(--element-background);
        color: var(--button-text);
        border: 2px solid var(--main-color);
    }

    button:hover {
        background-color: var(--main-color);
        color: var(--button-text-hover);
    }
</style>
