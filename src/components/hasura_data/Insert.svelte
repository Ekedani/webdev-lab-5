<script>
    import Dialog from '../Dialog.svelte';
    import GraphQLHelper from '../../helpers/GraphQLHelper';
    import GraphQLRequests from '../../helpers/GraphQLRequests';
    import { games } from '../../store';
    import { getContext } from 'svelte';
    import Message from '../Message.svelte';
    import Loader from '../Loader.svelte';

    const { open } = getContext('simple-modal');
    let isLoading = false;

    const onOkay = (title, studio, genre) => {
        isLoading = true;
        insertGame(title, studio, genre);
        isLoading = false;
    };

    const insertGame = async (title, studio, genre) => {
        try {
            await GraphQLHelper.startExecuteMyMutation(
                GraphQLRequests.insertGame(title, studio, genre),
            );
            games.update((n) => [...n, {
                title,
                studio,
                genre
            }]);
        } catch (error) {
            open(Message, { message: 'An error happened!' });
        }
    };

    function showDialog() {
        open(
            Dialog,
            {
                message: 'Input properties',
                onOkay
            },
        );
    }
</script>

<button on:click={showDialog}>Insert</button>
{#if isLoading}
    <Loader/>
{/if}

<style>
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
