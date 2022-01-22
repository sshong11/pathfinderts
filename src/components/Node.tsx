interface AppProps {
    row: number,
    col: number,
    isStart: boolean,
    isEnd: boolean,
    isWall: boolean,
}

function Node({row, col, isStart, isEnd, isWall}: AppProps) {

    let nodeClass: string = ''

    if (isStart === true) {
        nodeClass = 'node-start'
    } else if (isEnd === true) {
        nodeClass = 'node-end'
    } else if (isWall === true) {
        nodeClass = 'node-wall'
    } else {
        nodeClass = 'node'
    }


    return <div 
        className={`node ${nodeClass}`}
        id={`node-${row}-${col}`}
    ></div>
}

export default Node