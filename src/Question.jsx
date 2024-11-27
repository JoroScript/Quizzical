import React from "react";
import he from "he";

export default function Question(props){
    const [checkedIndex,setCheckedIndex]=React.useState("");
    const [answersArray,setAnswersArray] = React.useState(()=>{
       return props.answersArray.map((answer,index)=>{
            return {
                text: he.decode(answer),
                id: index
            }
        })
    });    
    React.useEffect(()=>{
        if(checkedIndex!==""){
            props.setAnswers((prevAnswers)=>{
                let copiedArray=[...prevAnswers]
                copiedArray.splice(props.index,1,answersArray[checkedIndex].text);
                return copiedArray
               }) 
        }

    },[checkedIndex])
    function makeChoice(answerId){
        if(props.screen!=="checkAnswers"){
            setCheckedIndex(answersArray[answerId].id);
        }
            // const newAnswersArray=prevAnswersArray.map(prevAnswer=>{
            //     return prevAnswer.id===answerId ? {...prevAnswer, checked: !prevAnswer.checked} : prevAnswer
            // })
            // return newAnswersArray
    }
    const answers=answersArray.map((answer)=>{
        let style="";
        if(props.screen==="checkAnswers"){
            if(answer.text===props.correctAnswer){
                style="correct";
            }
            else if(checkedIndex===answer.id){
                style="incorrect";
            }
        }
        else if(answer.id===checkedIndex){
            style="checked"
        }
      
        return <button className={`answerButton ${style}`} key={answer.id} onClick={()=>makeChoice(answer.id)}>{answer.text}</button>
    })
    return(
        <div className="questionCont">
        <h4>{props.question}</h4>
        <div className="answersCont">{answers}</div>
        <hr></hr>
        </div>
    )
}