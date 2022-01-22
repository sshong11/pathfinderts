type Node = {
    row: number,
    col: number,
    isStart: boolean,
    isEnd: boolean,
    distance: number,
    visited: boolean,
    isWall: boolean,
    previous: any,
}


export function dijkstra(grid: Node[][], start: Node, end: Node) {

    const visitedNodesOrdered = []
    const unvisitedNodes = getAllNodes(grid)
    start.distance = 0

    while (unvisitedNodes.length != 0) {
        sortNodes(unvisitedNodes)
        const closeNode: any = unvisitedNodes.shift()
        if (closeNode.isWall) continue
        if (closeNode.distance === Infinity) return visitedNodesOrdered
        closeNode.visited = true
        visitedNodesOrdered.push(closeNode)

        if (closeNode == end) {
            return visitedNodesOrdered
        }
        updateNeighbors(grid, closeNode)
    }

}


function getAllNodes(grid: Node[][]) {
    const nodes = []
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            nodes.push(grid[i][j])
        }
    }

    return nodes
}


function getNeighborNodes(grid: Node[][], node: Node) {
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

    return neighbors.filter(neighbor => !neighbor.visited)
}


function updateNeighbors(grid: Node[][], node: Node) {
    const neighbors = getNeighborNodes(grid, node)

    for (const neighbor of neighbors) {
        neighbor.distance = node.distance + 1
        neighbor.previous = node
    }
}


function sortNodes(unvisited: Node[]) {
    unvisited.sort((a, b) => a.distance - b.distance)
}


export function getShortestPath(end: Node): Node[] {
    const bestPathOrder = []
    let current = end
    while (current !== null) {
        bestPathOrder.unshift(current)
        current = current.previous
    }

    return bestPathOrder
}