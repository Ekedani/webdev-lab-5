<script>
    import GraphQLRequests from '../../helpers/GraphQLRequests';
    import GraphQLHelper from '../../helpers/GraphQLHelper';
    import { getContext } from 'svelte';
    import { games, isLoading, modal } from '../../store';
    import Message from '../Message.svelte';
    import { bind } from 'svelte-simple-modal';

    const { open } = getContext('simple-modal');
    export let gameID;

    async function handleClick() {
        try {
            isLoading.set(true);
            await GraphQLHelper.startExecuteMyMutation(GraphQLRequests.deleteGameByID(gameID));
            games.update((x) => x.filter((game) => game.id !== gameID));
            open(Message, { message: 'Success!' });
        } catch (exception) {
            modal.set(bind(Message, { message: ("Error: " + exception.message)}));
        } finally {
            isLoading.set(false);
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
