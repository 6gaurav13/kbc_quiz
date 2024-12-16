import { useEffect, useState } from "react";
import "./app.css"
import Trivia from "./components/Trivia"
import Timer from "./components/Timer"


function App() {

  const [questionNumber, setquestionNumber] = useState(1);
  const [stop, setStop] = useState(false); // used for checking timeout used for 2 case if time runs out or if wrong answer selected
  const [earned,setEarned]=useState(" Rs 0 ");
  const data = [
    {
      id: 1,
      question: "Rolex is a company that specializes in what type of product?",
      answers: [
        {
          text: "Phone",
          correct: false,
        },
        {
          text: "Watches",
          correct: true,
        },
        {
          text: "Food",
          correct: false,
        },
        {
          text: "Cosmetic",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: "When did the website `Facebook` launch?",
      answers: [
        {
          text: "2004",
          correct: true,
        },
        {
          text: "2005",
          correct: false,
        },
        {
          text: "2006",
          correct: false,
        },
        {
          text: "2007",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "Who played the character of harry potter in movie?",
      answers: [
        {
          text: "Johnny Deep",
          correct: false,
        },
        {
          text: "Leonardo Di Caprio",
          correct: false,
        },
        {
          text: "Denzel Washington",
          correct: false,
        },
        {
          text: "Daniel Red Cliff",
          correct: true,
        },
      ],
    },
  ];

  const moneyPyramid = [
    { id: 1, amount: "Rs 1,000" },
    { id: 2, amount: "Rs 2,000" },
    { id: 3, amount: "Rs 3,000" },
    { id: 4, amount: "Rs 5,000" },
    { id: 5, amount: "Rs 10,000" },
    { id: 6, amount: "Rs 20,000" },
    { id: 7, amount: "Rs 40,000" },
    { id: 8, amount: "Rs 80,000" },
    { id: 9, amount: "Rs 1,60,000" },
    { id: 10, amount: "Rs 3,20,000" },
    { id: 11, amount: "Rs 6,40,000" },
    { id: 12, amount: "Rs 12,50,000" },
    { id: 13, amount: "Rs 25,00,000" },
    { id: 14, amount: "Rs 50,00,000" },
    { id: 15, amount: "RS 1 CRORE" }
  ].reverse();

  useEffect(()=>{
    questionNumber>1 && setEarned(moneyPyramid.find((m)=>m.id === questionNumber-1).amount)
  },[questionNumber,moneyPyramid]);

  return (
    <div className="app">
      <div className="main">
        {stop ? <h1 className="endText">You earned : {earned}</h1>:(
          <>
        <div className="top">
          <div className="timer"><Timer setStop={setStop} questionNumber={questionNumber}/></div>
        </div>
        <div className="bottom">
          <Trivia
            data={data}
            setStop={setStop}
            questionNumber={questionNumber}
            setquestionNumber={setquestionNumber}
          />
        </div> </>)}
      </div>
      <div className="pyramid">

        <ul className="moneyList">
          {moneyPyramid.map(m => (
            <li className={questionNumber === m.id ? "moneyListItem active" : "moneyListItem"}>

              <span className="moneyListItemNumber">{m.id}</span>
              <span className="moneyListItemAmount">{m.amount}</span>
            </li>
          ))}
        </ul>

      </div>


    </div>
  );
}

export default App;
