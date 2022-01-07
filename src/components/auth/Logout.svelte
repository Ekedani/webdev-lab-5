<script>
    import auth from '../../auth/AuthService';
    import Message from '../Message.svelte';
    import { getContext } from 'svelte';
    import { isLoading, modal } from '../../store';
    import { bind } from 'svelte-simple-modal';

    export let auth0Client;

    const { open } = getContext('simple-modal');

    function logout() {
        isLoading.update(n => n + 1);
        auth.logout(auth0Client).catch(exception => {
            modal.set(bind(Message, { message: ("Error: " + exception.message)}));
        });
        isLoading.update(n => n - 1);
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
