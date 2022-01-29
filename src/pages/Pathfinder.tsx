import React from 'react'
import Node from '../components/Node'
import { dijkstra, getShortestPath } from '../algos/dijkstra'
import { astar } from '../algos/astar'
import CreatePost from '../components/CreatePost'

var START_ROW2: any = 7
var START_COL2: any = 9
var END_ROW2: any = 7
var END_COL2: any = 34



function Pathfinder() {

    const [START_ROW, setStartRow] = React.useState(7)
    const [START_COL, setStartCol] = React.useState(9)
    const [END_ROW, setEndRow] = React.useState(7)
    const [END_COL, setEndCol] = React.useState(34)

    type Node = {
        row: number,
        col: number,
        isStart: boolean,
        isEnd: boolean,
        distance: number,
        visited: boolean,
        isWall: boolean,
        previous: any,
        gScore: any,
        fScore: any,
        hScore: any
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
            gScore: Infinity,
            fScore: Infinity,
            hScore: null
        }
    }


    function createGrid() {
        const list = []
        const rowLength = 17
        const colLength = 43

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
                            if ((node.row === START_ROW && node.col === START_COL) || (node.row === END_ROW && node.col === END_COL)) {
                                return
                            } else {
                            document.getElementById(`node-${node.row}-${node.col}`)!.className = "node node-best"
                            }
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


    function startAnimationDijkstra() {
        const start = grid[START_ROW][START_COL]
        const end = grid[END_ROW][END_COL]
        const visitedNodesOrdered: any = dijkstra(grid, start, end)
        const nodesShortestPath = getShortestPath(end)
        animatePathfinder(visitedNodesOrdered, nodesShortestPath)
    }

    function startAnimationAStar() {
        const start = grid[START_ROW][START_COL]
        const end = grid[END_ROW][END_COL]
        const visitedNodesOrdered: Node[] = astar(grid, start, end)
        const nodesShortestPath = getShortestPath(end)
        animatePathfinder(visitedNodesOrdered, nodesShortestPath)
    }

    function clearGrid() {
        setGrid(createGrid())
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if ((grid[i][j].row === START_ROW && grid[i][j].col === START_COL) || (grid[i][j].row === END_ROW && grid[i][j].col === END_COL)) {
                    continue
                }
                document.getElementById(`node-${grid[i][j].row}-${grid[i][j].col}`)!.className = "node node"
            }
        }
    }

    function setGridSize(e: React.ChangeEvent<HTMLInputElement>) {
        document.getElementById(`node-${START_ROW2}-${START_COL2}`)!.className = "node node"
        document.getElementById(`node-${END_ROW2}-${END_COL2}`)!.className = "node node"


        // const newGrid = grid.slice()
        // const node = newGrid[START_ROW][START_COL]
        // node.isStart = false
        // newGrid[START_ROW][START_COL] = node


        if (e.target.name === "startRow") {
            START_ROW2 = e.target.value
            setStartRow(parseInt(e.target.value))
        } else if (e.target.name === "startCol") {
            START_COL2 = e.target.value
            setStartCol(parseInt(e.target.value))
        } else if (e.target.name ==="endRow") {
            END_ROW2 = e.target.value
            setEndRow(parseInt(e.target.value))
        } else if (e.target.name ==="endCol") {
            END_COL2 = e.target.value
            setEndCol(parseInt(e.target.value))
        }

        document.getElementById(`node-${START_ROW2}-${START_COL2}`)!.className = "node node-start"
        document.getElementById(`node-${END_ROW2}-${END_COL2}`)!.className = "node node-end"


        // const newNode = newGrid[START_ROW][START_COL]
        // newNode.isStart = true
        // newGrid[START_ROW][START_COL] = newNode

        // setGrid(newGrid)

    }


    function inputGridSize() {
        return (<div className="gridInput">
            <div className="setStart">
                <h3>Set Start Point</h3>
                <input
                    type="number"
                    name="startRow"
                    id="startRow"
                    min="0"
                    max={grid.length - 1}
                    defaultValue={START_ROW}
                    onChange={setGridSize}
                ></input>
                <input
                    type="number"
                    name="startCol"
                    id="startCol"
                    min="0"
                    max={grid[0].length - 1}
                    defaultValue={START_COL}
                    onChange={setGridSize}
                ></input>
            </div>

            <div className="setEnd">
                <h3>Set End Point</h3>
                <input
                    type="number"
                    name="endRow"
                    id="endRow"
                    min="0"
                    max={grid.length - 1}
                    defaultValue={END_ROW}
                    onChange={setGridSize}
                ></input>
                <input
                    type="number"
                    name="endCol"
                    id="endCol"
                    min="0"
                    max={grid[0].length - 1}
                    defaultValue={END_COL}
                    onChange={setGridSize}
                ></input>
            </div>
        </div>)
    }

    return <div className="pathfinder">
        <div className="menu">
            <button onClick={() => startAnimationDijkstra()}>Dijkstra</button>
            <button onClick={() => startAnimationAStar()}>A* (A Star)</button>
            <button onClick={() => clearGrid()}>Clear Grid</button>
            {inputGridSize()}
        </div>
        <div className="grid">
            {grid.map((row, rowKey) => {
                return <div key={rowKey}>
                    {row.map((node, nodeKey) => {
                        const {row, col, isStart, isEnd, isWall, gScore, fScore, hScore} = node
                        return (
                        <Node
                            key={nodeKey}
                            row={row}
                            col={col}
                            isStart={isStart}
                            isEnd={isEnd}
                            isWall={isWall}
                            gScore={gScore}
                            fScore={fScore}
                            hScore={hScore}
                            onMouseDown={(row: number, col: number) => handleMouseDown(row, col)}
                            onMouseEnter={(row: number, col: number) => handleMouseEnter(row, col)}
                            onMouseUp={() => handleMouseUp()}
                        />)
                    })}
                </div>
            })}
        </div>
        <CreatePost />
    </div>
}

export default Pathfinder