export type Puzzle = {
    id: number
    pieces: 500 | 1000
    image: string
}

export const jigsawList: Puzzle[] = Array.from({ length: 13 }, (_, i) => {
    const id = i + 1
    return {
        id,
        pieces: id === 7 ? 500 : 1000,
        image: `/images/jigsaw/${id}.jpg`,
    }
})
