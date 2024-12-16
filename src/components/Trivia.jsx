import { useEffect, useState } from "react"
import useSound from "use-sound";
import play from "../assets/play.mp3"
import wait from "../assets/wait.mp3"
import wrong from "../assets/wrong.mp3"
import correct from "../assets/correct.mp3"
import clock from "../assets/clock.mp3"


export default function Trivia({data,setStop,questionNumber,setquestionNumber}) {

    const [question,setQuestion]=useState(null);
    const [selectedAnswer,setSelectedAnswer]= useState(null);
    const [className,setclassName]=useState("answer");
    const [letsPlay]= useSound(play);
    const [correctAnswer]= useSound(correct);
    const [wrongAnswer]= useSound(wrong);
    const [waiting]= useSound(wait);
    const [clockSound]= useSound(clock);
   
    useEffect(()=>{
      letsPlay();
      delay(3000,()=>{
        clockSound();
      });

    },[letsPlay,clockSound]);


    useEffect( ()=>{
        setQuestion(data[questionNumber-1])
    },
    [data,questionNumber]
    );

    const delay =(duration,callback)=>{
        setTimeout(()=>{
                callback();
        }, duration);
}

    const handleClick=(a)=>{
        setSelectedAnswer(a);
        setclassName("answer active");

        delay(3000,()=>setclassName(a.correct ? "answer correct" : "answer wrong"));
        //   setTimeout(() => {
        //         setclassName(a.correct ? "answer correct" : "answer wrong");
        //       }, 3000);

        delay(6000, ()=>{
            if(a.correct){
              correctAnswer();
              delay(1000 , ()=>{      // correct answer sound then the after 1 sec is the next question
                setquestionNumber((prev)=> prev+1);
                setSelectedAnswer(null);
              });
            }
            else
            {
              wrongAnswer();
              delay(1000,()=>{

                setStop(true);
              });
            }
        });
    }

   

  return (
    <div className="trivia">
      <div className="questions">{question?.question}</div>
      <div className="answers">

       { question?.answers.map((a) => (
         <div className={selectedAnswer == a? className : "answer"} onClick={()=>handleClick(a)}>{a.text}</div>
       )

        )}

       
      </div>
    </div>
  )
}
