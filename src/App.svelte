<script>
    import http from './helpers/GraphQLHelper';
    import GraphQLRequests from './helpers/GraphQLRequests';
    import { games, isAuthenticated, token, isLoading, modal } from './store';
    import { onMount } from 'svelte';
    import auth from './auth/AuthService';
    import LoginButton from './components/auth/Login.svelte';
    import LogoutButton from './components/auth/Logout.svelte';
    import Table from './components/hasura_data/Table.svelte';
    import Insert from './components/hasura_data/Inserter.svelte';
    import { bind, Modal } from 'svelte-simple-modal';
    import Loader from './components/Loader.svelte';
    import Message from './components/Message.svelte';

    let auth0Client;

    token.subscribe(async (value) => {
        if (value !== '') {
            try {
                isLoading.set(true);
                const { lab_5_game: myGames } = await http.startFetchMyQuery(
                    GraphQLRequests.getAllGames(),
                );
                games.set(myGames);
            } catch (exception) {
                modal.set(bind(Message, { message: ("Error: " + exception.message)}));
            } finally {
                isLoading.set(false);
            }
        }
    });

    onMount(async () => {
        try {
            isLoading.set(true);
            auth0Client = await auth.createClient();
            isAuthenticated.set(await auth0Client.isAuthenticated());
            const accessToken = await auth0Client.getIdTokenClaims();
            if (accessToken) {
                token.set(accessToken.__raw);
            }
        } catch (exception) {
            modal.set(bind(Message, { message: ("Error: " + exception.message)}));
        } finally {
            isLoading.set(false);
        }
    });
</script>
<main>
    <Modal show={$modal}>
        {#if !$isAuthenticated}
            <h1>Please, log in before start</h1>
            <LoginButton auth0Client={auth0Client}/>
        {:else}
            <LogoutButton auth0Client={auth0Client}/>
            <Insert/>
            <p>You can see your data below this text:</p>
            <Table games={games}/>
        {/if}
    </Modal>
    {#if $isLoading}
        <Loader/>
    {/if}
</main>


<style>
    main {
        display: flex;
        flex-direction: column;
        text-align: center;
        align-items: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #f44336;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
