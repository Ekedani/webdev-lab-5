<script>
    import GraphQLHelper from '../../helpers/GraphQLHelper';
    import GraphQLRequests from '../../helpers/GraphQLRequests';
    import { games, isLoading } from '../../store';
    import { getContext } from 'svelte';
    import Message from '../Message.svelte';

    const { open } = getContext('simple-modal');

    let title = '';
    let studio = '';
    let genre = '';

    async function handleClick() {
        isLoading.set(true);
        try {
            await GraphQLHelper.startExecuteMyMutation(GraphQLRequests.insertGame(title, studio, genre));
            open(Message, {modalText: "Success!"})
            games.update((n) => [...n, {
                title,
                studio,
                genre
            }]);
        } catch (exception) {
            open(Message, {modalText: ("Error: " + exception.message)})
        } finally {
            isLoading.set(false);
        }
    }
</script>

<div>
    <label>
        Title<input bind:value={title}>
    </label>
    <label>
        Studio<input bind:value={studio}>
    </label>
    <label>
        Genre<input bind:value={genre}>
    </label>
    <button on:click={handleClick}>Add Film</button>
</div>

<style>
    div {
        align-self: center;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 75%;
    }

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

    @media (max-width: 640px) {
        div {
            max-width: none;
            flex-direction: column;
            align-items: stretch;
        }
        button, input{
            width: 100%;
        }
    }
</style>
