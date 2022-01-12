<script>
    import Deleter from './Deleter.svelte';

    export let games;
</script>
{#if !($games.length)}
    <p>You have not games to play. Maybe you should add some?</p>
{:else if ($games.length)}
    <p>You can see your data below this text:</p>
    <table>
        <tr>
            <th>Title</th>
            <th>Studio</th>
            <th>Genre</th>
            <th>Delete</th>
        </tr>
        {#each $games as game, key (game.id)}
            <tr>
                <td>{game.title}</td>
                <td>{game.studio}</td>
                <td>{game.genre}</td>
                <td>
                    <Deleter gameID={game.id}/>
                </td>
            </tr>
        {/each}
    </table>
{/if}

<style>
    table {
        border-collapse: collapse;
        width: 70%;
        font-weight: 100;
    }

    table td, table th {
        border: 1px solid var(--table-border-color);
        padding: 12px;
        text-align: left;
    }

    table th {
        background-color: var(--main-color);
        color: var(--element-background);
    }
</style>
