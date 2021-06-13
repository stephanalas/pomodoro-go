import React, { useState } from 'react';
import {
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const BlockError = () => {
  //local states
  const [answers, setAnswers] = useState({
    question1: 'true',
    question2: 'true',
    question3: 'true',
  });

  const handleChange = (ev) => {
    setAnswers({ ...answers, [ev.target.name]: ev.target.value });
  };

  console.log(answers);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Looks like you are getting distracted...
      </Typography>
      <img src="https://pomodoro-go.s3.us-east-2.amazonaws.com/Kapture+2021-05-31+at+15.38.20.gif" />
      <Typography variant="body1">
        Are you sure you want to break out of focus mode?
        <br />
        Answer the questions below if you really want to just take a quick look:
      </Typography>
      {answers.question1 === 'true' &&
      answers.question2 === 'true' &&
      answers.question3 === 'true' ? undefined : (
          <Alert severity="info">
          If any of the answers is No, then you should go back to what you were
          doing!
          </Alert>
        )}
      <br />
      <FormControl component="fieldset">
        <FormLabel component="legend">Content of question 1</FormLabel>
        <RadioGroup
          aria-label="question1"
          name="question1"
          value={answers.question1}
          onChange={handleChange}
        >
          <FormControlLabel value="true" control={<Radio />} label="Yes" />
          <FormControlLabel value="false" control={<Radio />} label="No" />
        </RadioGroup>
        <FormLabel component="legend">Content of question 2</FormLabel>
        <RadioGroup
          aria-label="question2"
          name="question2"
          value={answers.question2}
          onChange={handleChange}
        >
          <FormControlLabel value="true" control={<Radio />} label="Yes" />
          <FormControlLabel value="false" control={<Radio />} label="No" />
        </RadioGroup>
        <FormLabel component="legend">Content of question 1</FormLabel>
        <RadioGroup
          aria-label="question3"
          name="question3"
          value={answers.question3}
          onChange={handleChange}
        >
          <FormControlLabel value="true" control={<Radio />} label="Yes" />
          <FormControlLabel value="false" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default BlockError;
