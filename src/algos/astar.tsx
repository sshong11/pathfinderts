type Node = {
    row: number,
    col: number,
    isStart: boolean,
    isEnd: boolean,
    distance: number,
    visited: boolean,
    isWall: boolean,
    previous: any,
    fScore: any,
    gScore: any,
    hScore: any
}

// gScore = current nodes distance from start node
// hScore = heuristic, distance from end node
// fScore = g + h

export function astar(grid: any, start: any, end: any) {

    const openSet = []
    const closedSet = []
    openSet.push(start)
    openSet[0].gScore = 0
    openSet[0].hScore = manhattanDistance(start, end)

    while(openSet.length > 0) {
        // take the lowest fScore
        sortNodesFScore(openSet)
        let currentNode: any = openSet.shift()
        closedSet.push(currentNode)

        if (currentNode === end) return closedSet

        for (let neighbor of getNeighborNodes(grid, currentNode)) {
            if (neighbor.isWall === true) continue

            // tentative g score is distance from start to neighbor to current node
            let tentative_gScore = currentNode.gScore + 1

            // current nodes path is better than neighbors path
            if (tentative_gScore < neighbor.gScore) {
                neighbor.gScore = tentative_gScore
                neighbor.hScore = manhattanDistance(neighbor, end)
                neighbor.fScore = neighbor.gScore + neighbor.hScore
                neighbor.previous = currentNode

                // if not in openSet, returns undefined
                if (inSet(neighbor, openSet) !== true) {
                    openSet.push(neighbor)
                }
            }
        }
    }

    return closedSet
}

function inSet(neighbor: any, openset: any) {
    for (let i = openset.length - 1; i >= 0; i++) {
        if (openset[i].row === neighbor.row && openset[i].col === neighbor.col) {
            return true
        } else {
            return false
        }
    }
}

// get lowest f score
function sortNodesFScore(nodes: Node[]) {
    nodes.sort((a, b) => a.fScore - b.fScore)
}

function getNeighborNodes(grid: any, node: any) {
    const neighbors = []
    const {row, col} = node

    if (row > 0) {
        neighbors.push(grid[row - 1][col])
    }

    if (row < grid.length - 1) {
        neighbors.push(grid[row + 1][col])
    }

    if (col > 0) {
        neighbors.push(grid[row][col - 1])
    }

    if (col < grid[0].length - 1) {
        neighbors.push(grid[row][col + 1])
    }

    return neighbors
}

// used for grids without diagonal movement, based off manhattan city blocks for car routes
function manhattanDistance(currentNode: any, endNode: any) {
    const cnRow = currentNode.row
    const cnCol = currentNode.col
    const enRow = endNode.row
    const enCol = endNode.col
    

    return (Math.abs(cnCol - enCol) + Math.abs(cnRow - enRow))
}