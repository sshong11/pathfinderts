import React from 'react'
import Node from '../components/Node'

const START_ROW = 5
const START_COL = 1
const END_ROW = 25
const END_COL = 45

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
        const rowLength = 30
        const colLength = 50

        for (let i = 0; i < rowLength; i++) {
            const temp = []
            for (let j = 0; j < colLength; j++) {
                temp.push(createNode(i, j))
            }
            list.push(temp)
        }

        return list

    }


    const [grid, setGrid] = React.useState(createGrid())


    return <div className="pathfinder">
        Pathfinder
        <div className="grid">
            {grid.map((row, rowKey) => {
                return <div key={rowKey}>
                    {row.map((node, nodeKey) => {
                        const {row, col, isStart, isEnd, visited, isWall} = node
                        return (
                        <Node
                            key={nodeKey}
                            row={row}
                            col={col}
                            isStart={isStart}
                            isEnd={isEnd}
                            isWall={isWall}
                        />)
                    })}
                </div>
            })}
        </div>
    </div>
}

export default Pathfinder