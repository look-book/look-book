import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Container } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { CalendarIcon } from "@mui/x-date-pickers";

const presidents = [
  {
    value: "Donald J. Trump",
    label: "Donald J. Trump",
  },
  {
    value: "Joseph R. Biden",
    label: "Joseph R. Biden",
  },
  {
    value: "Bill Clinton",
    label: "Bill Clinton",
  },
];

const states = [
  {
    value: "Florida",
    label: "Florida",
  },
  {
    value: "California",
    label: "California",
  },
  {
    value: "Nevada",
    label: "Nevada",
  },
];
const circles = [
  {
    value: "first photo - A",
    label: "first photo - A",
  },
  {
    value: "second photo - B",
    label: "second photo - B",
  },
  {
    value: "third photo - C",
    label: "third photo - C",
  },
];

const squares = [
  {
    value: "first photo - 1",
    label: "first photo - 1",
  },
  {
    value: "second photo - 2",
    label: "second photo - 2",
  },
  {
    value: "third photo - 3",
    label: "third photo - 3",
  },
];

const sums = [
  {
    value: "4",
    label: "4",
  },
  {
    value: "6",
    label: "6",
  },
  {
    value: "5",
    label: "5",
  },
];

const colors = [
  {
    value: "COLOR RED",
    label: "COLOR RED",
  },
  {
    value: "Color Blue",
    label: "Color Blue",
  },
  {
    value: "Color yellow",
    label: "Color yellow",
  },
];

const afterNumbers = [
  {
    value: "Number 15",
    label: "Number 15",
  },
  {
    value: "Number 10",
    label: "Number 10",
  },
  {
    value: "Number 12",
    label: "Number 12",
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

      <Box
        component="form"
        className="evaluationForm"
        sx={{
          "& .MuiTextField-root": { m: 2, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <h3>Questions for subsequent recall test</h3>
        <div>
          <TextField
            id="outlined-select-president"
            select
            label=""
            helperText="Who is the current President? "
            variant="filled"
          >
            {presidents.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label=""
            helperText="What state are you in?"
            id="outlined-select-states"
            select
            variant="filled"
          >
            {states.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div>
          <TextField
            id="filled-select-square"
            select
            label=""
            helperText="Which one is a square? "
            variant="filled"
          >
            {squares.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="filled-select-circle"
            select
            label=""
            helperText="Which one is a circle? "
            variant="filled"
          >
            {circles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div>
          <TextField
            id="filled-select-after"
            select
            label=""
            helperText="What number comes after 11?"
            variant="filled"
          >
            {afterNumbers.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="filled-select-colors"
            select
            label=""
            helperText="What color is shown?  "
            variant="filled"
          >
            {colors.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div>
          <TextField
            id="standard-select-sum"
            select
            label=""
            helperText="What is 2 + 2?"
            variant="filled"
          >
            {sums.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </Box>
    </Container>
  );
}

export default EvaluationTest;
