<script>
    import http from './helpers/GraphQLHelper';
    import GraphQLRequests from './helpers/GraphQLRequests';
    import { get } from 'svelte/store';
    import { games, isAuthenticated, token, user } from './store';
    import { onMount } from 'svelte';
    import auth from './auth/authService';
    import LoginButton from "./components/Login.svelte"
    import LogoutButton from "./components/Logout.svelte"
    import Table from './components/Table.svelte';

    let auth0Client;

    token.subscribe(async (value) => {
        if (value !== "") {
            const { lab_5_game: myGames } = await http.startFetchMyQuery(
                GraphQLRequests.getAllGames(),
            );
            games.set(myGames);
            console.log(JSON.stringify(get(games)))
        }
    });

    onMount(async () => {
        auth0Client = await auth.createClient();
        isAuthenticated.set(await auth0Client.isAuthenticated());
        const accessToken = await auth0Client.getIdTokenClaims();
        if (accessToken) {
            token.set(accessToken.__raw);}
    });
</script>

<main>
    {#if !$isAuthenticated}
        <h1>Please, login before start</h1>
        <LoginButton auth0Client={auth0Client}/>
    {:else}
        <h1>Hello {get(user).nickname}!</h1>
        <LogoutButton auth0Client={auth0Client}/>
        <p>You can see your data below this text:</p>
        <Table games={games}/>
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
