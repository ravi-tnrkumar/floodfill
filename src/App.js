import './App.css';
import Board from './components/Board';
import {  useState } from 'react';
import _ from 'lodash';

let origArray = [
  [0,1,1,0,0,1,1,1,0,0],
  [0,1,0,0,0,0,1,1,0,0],
  [0,0,1,0,0,1,0,1,0,0],
  [1,1,1,0,0,1,0,1,0,0],
  [0,1,0,0,0,0,0,1,0,0],
  [0,1,1,1,0,1,0,0,0,0],
  [0,1,1,0,0,1,0,1,0,0],
  [0,1,1,0,0,1,1,0,0,0],
  [0,1,1,1,1,1,1,1,0,0],
  [0,1,1,1,0,1,1,1,0,0]
];

let data  = _.cloneDeep(origArray);

function floodFill(inputArray, row, col, oldValue, newValue) {
  
    // console.log(`floodFill(inputArray, ${row}, ${col}, ${data[row][col]}, 2)`);

    if (!inputArray || inputArray.length === 0) return;

    let numRows = inputArray.length - 1;
    let numCols = inputArray[0].length - 1;

    if (row < 0 || row > numRows) return; //exit
    if (col < 0 || col > numCols) return; //exit

    if (inputArray[row][col] === newValue) { //exit
        return;
    }

    if (inputArray[row][col] !== oldValue) { //exit
        return;
    }

    if (inputArray[row][col] === oldValue) { //change
      inputArray[row][col] = newValue;
  }

    floodFill(inputArray, row-1, col, oldValue, newValue);
    floodFill(inputArray, row+1, col, oldValue, newValue);
    floodFill(inputArray, row, col-1, oldValue, newValue);
    floodFill(inputArray, row, col+1, oldValue, newValue);
    floodFill(inputArray, row-1, col-1, oldValue, newValue);
    floodFill(inputArray, row-1, col+1, oldValue, newValue);
    floodFill(inputArray, row+1, col-1, oldValue, newValue);
    floodFill(inputArray, row+1, col+1, oldValue, newValue);
    
}

function handleCellClick(event) {

    const dimension = (event?.target?.id+"").split('_').slice(1,3);
    const row = parseInt(dimension[0]);
    const col = parseInt(dimension[1]);

    // console.log(row + ' X ' + col);
    console.log(`floodFill(data, ${row}, ${col}, ${data[row][col]}, 2)`);
    floodFill(data, row, col, data[row][col], 2);
    console.log(`Final Data => ${data}`);
    
}


function App() {
  const [inputData, setInputData] = useState(data);
  const [isRefreshed, setIsRefreshed] = useState(true);

  let refresh = () => {
    setIsRefreshed(false);
    setTimeout(()=> {
      setInputData(data);
      setIsRefreshed(true);
    }, 500);
  }

  let reload = () => {
    setIsRefreshed(false);
    setTimeout(()=> {
      data = _.cloneDeep(origArray);
      setInputData(data);
      setIsRefreshed(true);
    }, 500);
  }

  return (
    <>
      {
        isRefreshed ?
          <Board
            twoDimArray={inputData} 
            handleClick={(event) => {
              handleCellClick(event);
              refresh();
            }}>        
          </Board>:
          ''
      }
      {/* <button onClick={refresh}>Refresh Grid After Running Floodfill !!</button>
      &nbsp;&nbsp; */}
      <button onClick={reload}>Reload View !!</button>
    </>
  );
}

export default App;
