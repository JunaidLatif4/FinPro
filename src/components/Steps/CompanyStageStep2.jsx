import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import "./CSS/CompanyStageStep2.scss";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CompanyStageStep2 = () => {
  const classes = useStyles();
  
  const revenueData = [
    "revenue1",
    "revenue2",
    "revenue3",
    "revenue4",
    "revenue5",
    "revenue6",
  ];

  const [revenue, setRevenue] = React.useState("");
  const [number, setNumber] = React.useState("");

  const revenueChange = (event) => {
    setRevenue(event.target.value);
  };
  const numberChange = (event) => {
    setNumber(event.target.value);
  };

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <div className="companystagestep2_container">
        <h2> What's your company stage ?</h2>
        <div className="selection">
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Revenue</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={revenue}
              onChange={revenueChange}
              label="Revenue"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"10"}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Number of Employess
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={number}
              onChange={numberChange}
              label="Number of Employess"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"10"}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={age}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

        </div>
      </div>
    </>
  );
};

export default CompanyStageStep2;
