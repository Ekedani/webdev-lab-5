<script>
    import { getContext } from 'svelte';

    export let message;
    export let onOkay = () => {
    };

    const {
        close,
        open
    } = getContext('simple-modal');

    let title;
    let studio;
    let genre;

    function _onOkay() {
        onOkay(title, studio, genre);
        close();
    }
</script>

<style>
    h2 {
        font-size: 2rem;
        text-align: center;
    }

    input {
        width: 100%;
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
</style>

<h2>{message}</h2>
<label>Title<input type="text" bind:value={title}/></label>
<label>Studio<input type="text" bind:value={studio}/></label>
<label>Genre<input type="text" bind:value={genre}/></label>

<button on:click={_onOkay}>
    Okay
</button>
