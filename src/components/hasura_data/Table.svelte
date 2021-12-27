<script>
    import Loader from '../Loader.svelte';
    export let games;
    console.log(JSON.stringify(games))
</script>

<table>
    <tr>
        <th>Title</th>
        <th>Studio</th>
        <th>Genre</th>
    </tr>
    {#each $games as game}
        <tr>
            <td>{game.title}</td>
            <td>{game.studio}</td>
            <td>{game.genre}</td>
        </tr>
    {/each}
</table>

<style>
    table {
        border-collapse: collapse;
        width: 70%;
        font-weight: 100;
    }

    table td, table th {
        border: 1px solid #ddd;
        padding: 12px;
        text-align: left;
    }

    table th {
        background-color: #f44336;
        color: white;
    }
</style>
