<script>
    import auth from '../../auth/AuthService';
    import { getContext } from 'svelte';
    import Message from '../Message.svelte';
    import { modal } from '../../store';
    import { bind } from 'svelte-simple-modal';

    const { open } = getContext('simple-modal');

    export let auth0Client;

    function login() {
        auth.loginWithPopup(auth0Client).catch(exception => {
            modal.set(bind(Message, { message: ("Error: " + exception.message)}));
        });
    }
</script>

<button on:click={login}>Log in</button>

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
