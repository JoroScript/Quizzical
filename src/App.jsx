import React, { useState } from 'react'
import Question from "./Question"
import he from "he";
export default function App() {
  const [screen,setScreen] = useState("start");
  const [correctCount,setCorrectCount] = useState(0)
 const [questionsArray,setQuestionsArray] = useState([]);
 const [myAnswers,setMyAnswers] = useState(new Array(5).fill(null));
 console.log(questionsArray);
  
  function startQuiz(){
    setScreen("quiz");
  }
  if(screen==="start"){
    document.body.style.height="100vh";
  }
  else {
    document.body.style.height="100%";
  }
 React.useEffect(()=>{
  fetch("https://opentdb.com/api.php?amount=5")
  .then(res=>res.json())
  .then(data=>setQuestionsArray(data.results))
 },[]);
 function getRandomNum(arrayLength){
  return Math.floor(Math.random()*arrayLength);
 }
 
 
 const  questionElements= questionsArray.length!==0 ? questionsArray.map((questionInArray,index)=>{
    const randomIndex=getRandomNum(questionsArray.length)
    let answersArray = [...questionInArray.incorrect_answers]; // Create a shallow copy
    answersArray.splice(randomIndex,0,questionInArray.correct_answer);
    return(
    <>
    <Question screen={screen} index={index} setAnswers={setMyAnswers} key={index} correctAnswer={he.decode(questionInArray.correct_answer)} answersArray={answersArray} 
    question={he.decode(questionInArray.question)}/>
    </>
 )}) : "";
 
 
 
 function checkAnswers(){
  if(myAnswers.every(answer=>answer!==null)){
    console.log(questionsArray[0].correct_answer);
    setScreen("checkAnswers")
    let count=0;
    questionsArray.map((question,index)=>{
      question.correct_answer==myAnswers[index] ? count=count+1 : console.log("wrong");
    })
    console.log(count);
    setCorrectCount(count);
    console.log(myAnswers);
    console.log(questionsArray);
  }
 }
// return <Question question={questionInArray.question}/>
if(screen==="start"){
  return(
    <div className="startCont">
        <h1>Quizzical</h1>
        <p>Test Your Knowledge</p>
    <button onClick={startQuiz}>Start Quiz!</button>
    </div>
  )
}
else if(screen==="quiz"){
  return (
    <main>
    {questionElements}
    <button onClick={checkAnswers}>checkAnswers</button>
    </main>
  )
}
else {
  return(
    <main>
    
    {questionElements}
    <h1>You scored  {correctCount}/{myAnswers.length}</h1>    
    </main>
  )
}
}

