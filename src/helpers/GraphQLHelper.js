import { get } from 'svelte/store';
import { token } from '../store';

class GraphQLHelper {
    constructor() {
        /* eslint-disable */
        //TODO: To .env
        this.API_URL = 'https://webdev-lab-5.herokuapp.com/v1/graphql';
        /* eslint-enable */
    }

    async fetchGraphQL(operationsDoc, operationName, variables) {
        const result = await fetch(this.API_URL, {
            method: 'POST',
            body: JSON.stringify({
                query: operationsDoc,
                variables: variables,
                operationName: operationName
            }),
            headers: {
                Authorization: `Bearer ${get(token)}`
            }
        });

        return await result.json();
    }

    fetchMyQuery(operationsDoc) {
        return this.fetchGraphQL(operationsDoc, 'MyQuery', {});
    }

    async startFetchMyQuery(operationsDoc) {
        const { errors, data } = await this.fetchMyQuery(operationsDoc);

        if (errors) {
            throw new Error(errors);
        }
        return data;
    }

    async startExecuteMyMutation(operationsDoc, variables = {}) {
        const { errors, data } = await this.executeMyMutation(
            operationsDoc,
            variables
        );
        if (errors) {
            throw new Error(errors);
        }
        return data;
    }

    executeMyMutation(operationsDoc, variables) {
        return this.fetchGraphQL(operationsDoc, 'MyMutation', variables);
    }
}

export default new GraphQLHelper();
