<script>
    import GraphQLRequests from '../../helpers/GraphQLRequests';
    import GraphQLHelper from '../../helpers/GraphQLHelper';
    import {getContext} from 'svelte';
    import { games, isLoading } from '../../store';
    import Message from '../Message.svelte';

    const {open} = getContext('simple-modal');
    export let gameID;

    async function handleClick() {
        try {
            isLoading.set(true);
            await GraphQLHelper.startExecuteMyMutation(GraphQLRequests.deleteGameByID(gameID));
            games.update((x) => x.filter((game) => game.id !== gameID));
            open(Message, {message: "Success!"});
        } catch (exception) {
            open(Message, {message: ("Error: " + exception.message)})
        }finally {
            isLoading.set(false);
        }
    }
</script>

<button on:click={handleClick}>Delete</button>

<style>
    button {
        background-color: white;
        color: black;
        border: 2px solid #f44336;
    }
    button:hover {
        background-color: #f44336;
        color: white;
    }
</style>
