const client = require('./client');
const util = require('util');

//const REPLACE_ME = 'HELP REPLACE ME!!!!';//remove this//

// GET - /api/video-games - get all video games// replace the value in parens. to get all the videogames//
async function getAllVideoGames() {
    try {
        const { rows: videoGames } = await client.query(`
        SELECT * FROM videoGames
        `);
        return videoGames;
    } catch (error) {
        throw new Error("Make sure you have replaced the REPLACE_ME placeholder.")
    }
}
// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
    try {
        const { rows: [videoGame] } = await client.query(`
            SELECT * FROM videoGames
            WHERE id = $1;
        `, [id]);
        return videoGame;
    } catch (error) {
        throw error;
    }
}

// POST - /api/video-games - create a new video game
async function createVideoGame(body) {
    // LOGIC GOES HERE //make a POST that adds a videogame to database //
    try{
        const { rows: [videoGame]}= await client.query(`
        INSERT INTO videoGames (name, description, price, "inStock", "isPopular", "imgUrl")
        VALUES
          ('Tetris','Classic block puzzle game!', 100, true, true, 'https://i.imgur.com/3J3wW9S.png' )

        `, [body.name, body.description, body.price, body.inStock, body.isPopular, body.imgUrl ]);
        return videoGame;
    }catch(error){
        throw(error);
    }
}

// PUT - /api/video-games/:id - update a single video game by id
async function updateVideoGame(id, fields = {}) {
    // LOGIC GOES HERE // Make a PUT that updates a game in the database //
    const setString= Object.keys(fields).map((
        key, index)=> `"${key}" =$${index + 1}`).join(',');

        if(setString.length === 0){
            return;
        }
        try{
            const { rows:[videoGames] }= await client.query(`
            UPDATE videoGames
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
            `, Object.values(fields));
            return videoGame;
        }catch(error){
            throw(error);
        }

}

// DELETE - /api/video-games/:id - delete a single video game by id
async function deleteVideoGame(id) {
    // LOGIC GOES HERE// async function to delete a videoGame from the database //
    try{
        const { rows:[videoGame] } =
        await client.query(`
        DELETE FROM videoGames
        WHERE id= $7
        RETURNING *;
        `, [id]);
        return videoGame;
    }catch(error){
        throw(error);
    }
}

module.exports = {
    getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame
}