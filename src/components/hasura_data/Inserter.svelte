<script>
    import GraphQLHelper from '../../helpers/GraphQLHelper';
    import GraphQLRequests from '../../helpers/GraphQLRequests';
    import { games, isLoading, modal } from '../../store';
    import { getContext } from 'svelte';
    import Message from '../Message.svelte';
    import { bind } from 'svelte-simple-modal';

    const { open } = getContext('simple-modal');

    let title = '';
    let studio = '';
    let genre = '';

    async function handleClick() {
        isLoading.update(n => n + 1);
        try {
            const inserted = await GraphQLHelper.startExecuteMyMutation(GraphQLRequests.insertGame(title, studio, genre));
            open(Message, {message: "Success!"})
            games.update((n) => [...n, {
                id : inserted.insert_lab_5_game_one.id,
                title : inserted.insert_lab_5_game_one.title,
                studio : inserted.insert_lab_5_game_one.studio,
                genre : inserted.insert_lab_5_game_one.genre
            }]);
        } catch (exception) {
            modal.set(bind(Message, { message: ("Error: " + exception.message)}));
        } finally {
            isLoading.update(n => n - 1);
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
        padding: 5px;
        align-self: center;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 75%;
    }

    button {
        width: 100px;
        text-transform: uppercase;
        background-color: var(--button-text-hover);
        color: var(--button-text);
        border: 2px solid var(--main-color);
    }

    button:hover {
        background-color: var(--main-color);
        color: var(--button-text-hover);
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
