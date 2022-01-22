import React from 'react'
import Node from '../components/Node'
import { dijkstra, getShortestPath } from '../algos/dijkstra'

const START_ROW = 1
const START_COL = 1
const END_ROW = 5
const END_COL = 15

function Pathfinder() {

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
    

    function createNode(row: number, col: number): Node {
        return {
            row: row,
            col: col,
            isStart: row === START_ROW && col === START_COL,
            isEnd: row === END_ROW && col === END_COL,
            distance: Infinity,
            visited: false,
            isWall: false,
            previous: null,
        }
    }


    function createGrid() {
        const list = []
        const rowLength = 10
        const colLength = 20

        for (let i = 0; i < rowLength; i++) {
            const temp = []
            for (let j = 0; j < colLength; j++) {
                temp.push(createNode(i, j))
            }
            list.push(temp)
        }

        return list

    }

    /////////////////////////////////////////////////////////////
    // mouse event listeners

    const [mousePressed, setMousePressed] = React.useState(false)

    const gridWithWall = (grid: Node[][], row: number, col: number) => {
        const newGrid = grid.slice()
        const node = newGrid[row][col]
        const newNode = {...node, isWall: !node.isWall}
        newGrid[row][col] = newNode
        return newGrid
    }

    function handleMouseDown(row: number, col: number) {
        const newGrid = gridWithWall(grid, row, col)
        setMousePressed(true)
        setGrid(newGrid)
    }

    function handleMouseEnter(row: number, col: number) {
        if (!mousePressed) return
        const newGrid = gridWithWall(grid, row, col)
        setGrid(newGrid)
    }

    function handleMouseUp() {
        setMousePressed(false)
    }
    /////////////////////////////////////////////////////////////


    const [grid, setGrid] = React.useState(createGrid())


    function animatePathfinder(visitedNodesOrdered: Node[], nodesShortestPath: Node[]) {
        for (let i = 0; i <= visitedNodesOrdered.length; i++) {

            // shortest path animation
            if (i === visitedNodesOrdered.length) {
                setTimeout(() => {
                    for (let i = 0; i < nodesShortestPath.length; i++) {
                        setTimeout(() => {
                            const node = nodesShortestPath[i]
                            document.getElementById(`node-${node.row}-${node.col}`)!.className = "node node-best"
                        }, 50 * i)
                    }
                }, 15 * i)
                return
            }

            // dijkstra animation
            setTimeout(() => {
                const node = visitedNodesOrdered[i]
                if ((node.row === START_ROW && node.col === START_COL) || (node.row === END_ROW && node.col === END_COL)) {
                    return
                } else {
                    document.getElementById(`node-${node.row}-${node.col}`)!.className = "node node-visited"
                }
            }, 15 * i)
        }
    }


    function startAnimation() {
        const start = grid[START_ROW][START_COL]
        const end = grid[END_ROW][END_COL]
        const visitedNodesOrdered: any = dijkstra(grid, start, end)
        const nodesShortestPath = getShortestPath(end)
        animatePathfinder(visitedNodesOrdered, nodesShortestPath)
    }


    return <div className="pathfinder">
        <button onClick={() => startAnimation()}>Dijkstra</button>
        <div className="grid">
            {grid.map((row, rowKey) => {
                return <div key={rowKey}>
                    {row.map((node, nodeKey) => {
                        const {row, col, isStart, isEnd, isWall} = node
                        return (
                        <Node
                            key={nodeKey}
                            row={row}
                            col={col}
                            isStart={isStart}
                            isEnd={isEnd}
                            isWall={isWall}
                            onMouseDown={(row: number, col: number) => handleMouseDown(row, col)}
                            onMouseEnter={(row: number, col: number) => handleMouseEnter(row, col)}
                            onMouseUp={() => handleMouseUp()}
                        />)
                    })}
                </div>
            })}
        </div>
    </div>
}

export default Pathfinder