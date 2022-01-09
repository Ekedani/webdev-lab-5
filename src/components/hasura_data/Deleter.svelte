<script>
    import GraphQLRequests from '../../helpers/GraphQLRequests';
    import GraphQLHelper from '../../helpers/GraphQLHelper';
    import { games, isLoading, modal } from '../../store';
    import Message from '../Message.svelte';
    import { bind } from 'svelte-simple-modal';

    export let gameID;

    async function handleClick() {
        try {
            $isLoading++;
            await GraphQLHelper.startExecuteMyMutation(GraphQLRequests.deleteGameByID(gameID));
            let index = $games.findIndex(game => game.id === gameID);
            games.update((x) => {
                x.splice(index, 1);
                return x;
            });
            $modal = bind(Message, { message: 'Success!' });
        } catch (exception) {
            $modal = bind(Message, { message: ('Error: ' + exception.message) });
        } finally {
            $isLoading--;
        }
    }
</script>

<button on:click={handleClick}>Delete</button>

<style>
    button {
        background-color: var(--element-background);
        color: var(--button-text);
        border: 2px solid var(--main-color);
    }

    button:hover {
        background-color: var(--main-color);
        color: var(--button-text-hover);
    }
</style>
