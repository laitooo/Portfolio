export type Puzzle = {
    id: number
    name: string
    pieces: 500 | 1000
    image: string
    width: number
    height: number
}

type PuzzleMeta = { name: string; width: number; height: number }

// TODO: replace `name` values with the real puzzle titles.
const meta: Record<number, PuzzleMeta> = {
    1:  { name: 'Puzzle #1',  width: 1268, height: 1776 },
    2:  { name: 'Puzzle #2',  width: 3330, height: 1704 },
    3:  { name: 'Puzzle #3',  width: 4000, height: 1848 },
    4:  { name: 'Puzzle #4',  width: 4000, height: 1848 },
    5:  { name: 'Puzzle #5',  width: 1344, height: 1734 },
    6:  { name: 'Puzzle #6',  width: 1848, height: 2464 },
    7:  { name: 'Puzzle #7',  width: 3832, height: 2700 },
    8:  { name: 'Puzzle #8',  width: 4000, height: 3000 },
    9:  { name: 'Puzzle #9',  width: 4000, height: 3000 },
    10: { name: 'Puzzle #10', width: 4000, height: 3000 },
    11: { name: 'Puzzle #11', width: 4000, height: 3000 },
    12: { name: 'Puzzle #12', width: 3132, height: 2194 },
    13: { name: 'Puzzle #13', width: 4000, height: 3000 },
}

export const jigsawList: Puzzle[] = Object.keys(meta)
    .map(Number)
    .sort((a, b) => a - b)
    .map((id) => ({
        id,
        name: meta[id].name,
        pieces: id === 7 ? 500 : 1000,
        image: `/images/jigsaw/${id}.jpg`,
        width: meta[id].width,
        height: meta[id].height,
    }))
