import './App.css';
import Button from '@mui/material/Button'
import Grid from'@mui/material/Grid'
import Wrapper from './components/Wrapper';
import Screen from './components/Screen';
import History from './components/History';
import { useState } from 'react';
import Examples from "./reduxs/examples";
import store from "./reduxs/store";
import { setData } from './reduxs/action';

const btnValues = [
  [7, 8, 9, "+"],
  [4, 5, 6, "-"],
  [1, 2, 3, "x"],
  [0, "C", "=", "/"],
];

const expr = ['+','-','/','x'];

async function getExamples() {
  try {
    let response = await fetch('http://localhost:8080/math/examples?count=5')
    let responseJson = await response.json();
    addToStore(solveSomeExamples(responseJson));
    return responseJson;
   } catch(error) {
    console.error(error);
  }
}

function solveSomeExamples(exmp){
  let listOfExamples = exmp;
  console.log(listOfExamples);
  let results = [];
  for(let i = 0; i < listOfExamples.length; i++){
    results.push(listOfExamples[i] + "=" + solver(listOfExamples[i]));
  }
  return results;
}

function solver(expression){
  
  if(expression.includes('+')){
    return Number(expression.split('+')[0]) + Number(expression.split('+')[1]);
  } else if(expression.includes('-') && expression[0] != '-'){
    return Number(expression.split('-')[0]) - Number(expression.split('-')[1]);
  } else if(expression.includes('x')){
    return Number(expression.split('x')[0]) * Number(expression.split('x')[1]);
  } else if(expression.includes('/')){
    if(Number(expression.split('/')[1] == '0'))
      return "DBZ";
    else
      return Number(expression.split('/')[0]) / Number(expression.split('/')[1]);
  } else if(expression[0] == '-'){
    return -Number(expression.split('-')[1]) - Number(expression.split('-')[2]);
  } 
}

function isLastSymbolIsExpression(field){
  return expr.includes(field[field.length - 1]);
}

function addToStore(arr){
  let examples = [];
  arr.map((item) => {
    examples.push(item);
  });
  store.getState().examples.map((item) => {
    examples.push(item);
  });
  //examples.push(arr);
  console.log(examples);
  console.log(store.getState().examples);
  store.dispatch(setData({examples}));
}

function App() {
  const [fieldNum, setFieldNum] = useState('0'); 
  const [result, setResult] = useState('');
  const [isExpression, setIsExpression] = useState(false);
  const [isRes, setIsRes] = useState(false);
  const [expList, setExpList] = useState([]);

  function expressionSetter(expr){
    if(isRes){ 
      setIsRes(false);
      setIsExpression(true);
      setFieldNum(result + expr);
      setResult('');
    } else if(isExpression && isLastSymbolIsExpression(fieldNum)){
        if(isLastSymbolIsExpression(fieldNum))
           setFieldNum(fieldNum.slice(0, fieldNum.length - 1) + expr);
        else
          solver(fieldNum);
    } else{
      if(fieldNum.includes(expr) && (expr != '-' && fieldNum[0] != '-')){
        setFieldNum(fieldNum + "=");
        setResult(solver(fieldNum));
        setIsRes(true);
        setIsExpression(false);
      } else if(fieldNum.includes(expr) && (expr == '-' && fieldNum[0] != '-')){
        setFieldNum(fieldNum + "=");
        setResult(solver(fieldNum));
        setIsRes(true);
        setIsExpression(false);
      }
      else{
        setIsExpression(true);
        setFieldNum(fieldNum + expr);
      }
  }
}

 
  function btnClick(e){
    switch(e.target.value){
      case '+':
        expressionSetter('+');
        break;
      case '-':
        expressionSetter('-');
        break;
      case 'x':
        expressionSetter('x');
        break;
      case '/':
        expressionSetter('/');
        break;
      case '=':
        if(!isRes && isExpression && !isLastSymbolIsExpression(fieldNum)){
          setFieldNum(fieldNum + '=');
          setResult(solver(fieldNum));
          setIsRes(true);
          addToStore(expList.concat(fieldNum + "=" + solver(fieldNum)));
        }
        break;
      case 'C':
        setFieldNum('0');
        setIsRes(false);
        setIsExpression(false);
        setResult('');
        break;          
      default:
        if(!isRes)
          setFieldNum(fieldNum == '0' ? e.target.value : (fieldNum + e.target.value));
        else{
          setIsRes(false);
          setIsExpression(false);
          setFieldNum(result + e.target.value);
          setResult('');
        }
        break;
    }
  }

  return (
    <div className = "calc">
      <Wrapper>
        <Screen value={fieldNum} res={result}/>
        <Grid>
          {btnValues.flat().map((btn, i) => (
            <Button sx={{m: 0.5}} variant="outlined" color="secondary" value={btn} key={i} onClick={(e) => btnClick(e)}>{btn}</Button>
          ))}
        </Grid>
         <Button id="solveButton" variant="contained" color="warning" onClick={(e) =>{
                getExamples();
         }}>
          Get and solve examples
        </Button>
      </Wrapper>
      <Examples/>
    </div>
  );
}

export default App;
