class GraphQLHelper {
    constructor() {
        /* eslint-disable */
        this.API_URL = API_ROOT;
        /* eslint-enable */
    }

    async fetchGraphQL(operationsDoc, operationName, variables) {
        return fetch(this.API_URL, {
            method: 'POST',
            body: JSON.stringify({
                query: operationsDoc,
                variables: variables,
                operationName: operationName
            })
        }).then((result) => {
            return result.json();
        });
    }

    fetchMyQuery(operationsDoc) {
        return this.fetchGraphQL(operationsDoc, 'MyQuery', {});
    }

    async startFetchMyQuery(operationsDoc) {
        const { errors, data } = await this.fetchMyQuery(operationsDoc);

        if (errors) {
            throw new Error(errors[0].message);
        }
        return data;
    }

    async startExecuteMyMutation(operationsDoc, variables = {}) {
        const { errors, data } = await this.executeMyMutation(
            operationsDoc,
            variables
        );
        if (errors) {
            throw new Error(errors[0].message);
        }
        return data;
    }

    executeMyMutation(operationsDoc, variables) {
        return this.fetchGraphQL(operationsDoc, 'MyMutation', variables);
    }
}

export default new GraphQLHelper();
