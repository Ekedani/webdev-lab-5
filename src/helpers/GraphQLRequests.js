export default class GraphQLRequests {
    static getAllGames() {
        return `
        query MyQuery {
        lab_5_game {
            genre
            id
            studio
            title
        }
    }`;
    }

    static insertGame(title, studio, genre) {
        return ` 
        mutation MyMutation {
            insert_lab_5_game_one(object: {title: "${title}", studio: "${studio}", genre: "${genre}"}) {
            id
            title
            studio
            genre
            }
        }`;
    }

    static deleteGameByID(id) {
        return ` 
        mutation MyMutation {
            delete_lab_5_game_by_pk(id: "${id}") {
                genre
                id
                studio
                title
            }
        }`;
    }
}
