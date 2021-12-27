export default class GraphQLRequests {
    static getAllGames() {
        return `
        query MyQuery {
        lab_5_game {
            genre
            id
            studio
            title
            user_id
        }
    }`;
    }
}
