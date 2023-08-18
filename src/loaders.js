export async function getGamesLoader() {
    const response = await fetch('http://localhost:5000/games');
    const games = await response.json();
    return { games }
}

export async function getGameByIdLoader({ params }) {
    const response = await fetch(`http://localhost:5000/games/${params.id}`);

    if (response.ok) {
        const game = await response.json();
        return { game };
    }

    throw response;
}