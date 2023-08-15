export async function getGamesLoader() {
    const response = await fetch('');
    const games = await response.json();
    return { games }
}