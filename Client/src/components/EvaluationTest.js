import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Container } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { CalendarIcon } from "@mui/x-date-pickers";

//craete an array of questions giving the choice as boolean
let questions = [{
  question: "What does Html stand for?",
  answers: [{
    "textContent": "Hypertext Markup Language",
    isCorrect: true
  },
    {
    "textContent": "Hyperlinks and Text Markup Language",
    isCorrect: false
    },
    {
    "textContent": "Home Tool Markup Language ",
    isCorrect:false
},
]
},
{
  question: "Who is making the Web standards?",
  answers: [{
    "textContent": "Google",
    isCorrect: false
  },
  {
    "textContent": "Mozilla",
    isCorrect: false
  },
    {
    "textContent": "Microsoft",
    isCorrect: false
  },
    {
    "textContent": "The World Wide Web Consortium",
    isCorrect: true
  },
]
},
{
  question: "What does CSS stand for?",
  answers: [{
    "textContent": "Colorful Style Sheets",
    isCorrect: false
  },
  {
    "textContent": "Computer Style Sheets",
    isCorrect: false
  },
  {
    "textContent" : "Creative Style Sheets",
    isCorrect: false
  },
  {
  "textContent": "Cascading Style Sheets",
  isCorrect: true
  },
  ]
},
{
  question:
    "Where in an HTML document is the correct place to refer to an external style sheet?",
  answers: [{
    "textContent": "In the < body > section",
    isCorrect: false
  },
    {
      "textContent": "At the end of the document",
      isCorrect: false
    },
    {
      "textContent": "In the < head > section",
      isCorrect: true
    },
]
},
{
  question: "Whict is the correct CSS syntax?",
  answers: [{
    "textContent" : "{body; color:black;}",
    isCorrect: false
  },
  {
    "textContent": "body: color:black;",
    isCorrect: false
  },
  {
    "textContent": "{body:color=black;}",
    isCorrect: false
  },
  {
    "textContent": "body{color:black;}",
    isCorrect: true
  },
]
},
{
  question:
    "What is the correct syntax for referring to an external script called 'xxx.js'?",
  answers: [{
    "textContent": "< script name = 'xxx.js' >",
    isCorrect: false
  },
  {
    "textContent" : "< script href = 'xxx.js' >",
    isCorrect: false
  },
  {
    "textContent": "< script src = 'xxx.js' >",
    isCorrect: true
  },
]
},
{
  question: "Inside which HTML element do we put the JavaScript?",
  answers: [{
    "textContent" : "< scripting >",
    isCorrect: false
  },
  {
    "textContent": "< script >",
    isCorrect: true
  },
  {
    "textContent": "javascript",
    isCorrect: false
  },
  {
    "textContent": "< js >",
    isCorrect: false
  },
]
},
{
  question: "Who invented JavaScript?",
  answers: [{
    "textContent": "Douglas Crockford",
    isCorrect: false
  },
  {
    "textContent": "Sheryl Sandberg",
    isCorrect: false
  },
  {
    "textContent": "Brendan Eich",
    isCorrect: true
  },
]
},
{
  question: "Which one of these is a JavaScript package manager?",
  answers: [{
    "textContent" : "Node.js",
    isCorrect: false
  },
  {
    "textContent": "TypeScript",
    isCorrect: false
  },
  {
    "textContent": "npm",
    isCorrect: true
  },
]
},
{
  question: "Which tool can you use to ensure code quality?",
  answers: [{
    "textContent": "Angular",
    isCorrect: false
  },
    {
    "textContent": "jQuery",
    isCorrect: false
  },
  {
    "textContent": "RequireJS",
    isCorrect: false
  },
  {
    "textContent": "ESLint",
    isCorrect: true
  },
]
},
];


function EvaluationTest() {
  return (
    <Container>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <InputLabel htmlFor="input-with-icon-adornment">
            <AccountCircle /> Patient Name:{" "}
          </InputLabel>
          <TextField id="input-with-sx" variant="standard" className="p-2"/>
        </Box>

        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <InputLabel htmlFor="input-with-icon-adornment">
            <CalendarIcon /> Evaluation Date:
          </InputLabel>
          <TextField id="input-with-sx" variant="standard" className="p-2"/>
        </Box>
      </Box>

      
    </Container>
  );
}

export default EvaluationTest;
