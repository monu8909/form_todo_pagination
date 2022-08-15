import React, { useState, useEffect, useContext } from "react";

import {
  TextField,
  Button,
  Link,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  InputAdornment,
  IconButton,
  makeStyles,
  MenuItem,
  Box,
  Grid,
  Typography,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";
import axios from "axios";
import VisibilityIcon from '@material-ui/icons/Visibility';   
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Formik, Form } from "formik";
import * as yep from "yup";
const useStyles = makeStyles((theme) => ({
  suparBox: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "7rem",
  },
  MainBox: {
    padding: "20px",
    border: "1px solid black",
    borderRadius: "10px",
    width: "600px",
    background: "#73c8db",
    border: "1px solid lawngreen",
  },
  typo: {
    textAlign:"center",
    fontSize: "30px",
    fontWeight: "700",
    fontFamily: '"Red Rose",  cursive',
  },
  inputBoxTextfield: {
    position: "relative",
    padding: "5px",
    border: "1px solid black",
    borderRadius: "5px",
  },
  submitButton: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
  },
  lebeltypo:{
    marginTop:"15px"
  }
}));
const FormValidation = () => {
  //
  // const history = useHistory();
  // const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [countries, setCountries] = useState([]);
  const [showStates, setShowStates] = useState([]);

  const [states, setStates] = useState([]);
  const formValidationSchema = yep.object().shape({
    name: yep
      .string()
      .required("First name is required")
      .min(2, "Please enter atleast 2 characters")
      .max(35, "You can enter only 35 characters")
      .matches("^[A-Za-z]", "Only alphabets are  acceptable."),
    dateOfBirth: yep
      .string()
      .required("DOB is Required")
      .test(
        "DOB",
        "You must be 18 years old or above",
        (date) => moment().diff(moment(date), "years") >= 18
      ),
    email: yep
      .string()
      .email("Please enter a valid Email address")
      .required("Email address is required"),
    password: yep
      .string()
      .required("Password is required")
      .min(8, "Please enter atleast 8 characters")
      .max(16, "You can enter only 16 characters")

      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must be at least 10 Characters long, Must be atleast One Uppercase letter, Must be atleast One Lowercase letter, Must be at least One digit, Must be at least one special case Character"
      ),
    confirmPassword: yep
      .string()
      .min(8, "Please enter atleast 8 characters")
      .max(16, "You can enter only 16 characters")

      .required("Confirmation of your password is required")
      .oneOf([yep.ref("password"), null], "Passwords must match"),
    country: yep.string().required("Country is required"),
    state: yep.string().required("State is required"),
  });
  const formInitialSchema = {
    name: "",
    dateOfBirth: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    state: "",
  };
  const handleFormSubmit = async (values) => {
    console.log(values, "bjhdshfusbi");
    alert("Your form has been submit");
    // navigate("/login");
  };
  const classes = useStyles();
  useEffect(() => {
    axios.get("/countries.json").then(function (response) {
      console.log("dlsksdff", response);
      setCountries(response.data.countries);
      axios.get("/states.json").then(function (response) {
        setStates(response.data.states);
      });
    });
  }, []);
  const changeStateList = (name) => {
    const selectted = states.filter((cont) => {
      return cont.name === name;
    });
    if (selectted.length !== 0) {
      const contId = selectted[0].id;
    }
  };
  const changeState = (e) => {
    const name = e.target.value;
    changeStateList(name);
  };

  const changeCountryList = (name) => {
    const selectted = countries?.filter((cont) => {
      return cont.name === name;
    });
    const contId = selectted[0]?.id;

    const allState = states?.filter((state) => {
      return state.country_id === contId;
    });
    setShowStates(allState);
  };

  const changeCountry = (e) => {
    const name = e.target.value;
    changeCountryList(name);
  };

  return (
    <div>
      <Formik
        initialValues={formInitialSchema}
        initialStatus={{
          success: false,
          successMsg: "",
        }}
        validationSchema={formValidationSchema}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ errors, handleBlur, handleChange, touched, values }) => (
          <Form>
            <Box className={classes.suparBox}>
              <Box className="MainBox">
                <Typography className={classes.typo}>Sign Up Form</Typography>
                <Typography className={classes.lebeltypo}>Name</Typography>
                <TextField
                  className={classes.inputField}
                  id="outlined-basic"
                  type="text"
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={values.name}
                  error={Boolean(touched.name && errors.name)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <FormHelperText
                  error
                  style={{
                    margin: "0px",
                    fontSize: "12px",
                    paddingBottom: "0px !important",
                  }}
                >
                  {touched.name && errors.name}
                </FormHelperText>
                <Box style={{ width: "100%" }}>
                <Typography className={classes.lebeltypo}>Date of Birth</Typography>

                  <TextField
                    variant="outlined"
                    fullWidth
                    style={{
                      marginTop: "5px",
                    }}
                    inputStyle={{
                      background: "transparent",
                      color: "#fff",
                    }}
                    error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
                    value={values.dateOfBirth}
                    id="datetime-local"
                    type="datetime-local"
                    format="DD/MM/YYYY"
                    name="dateOfBirth"
                    onChange={handleChange}
                  />

                  <FormHelperText
                    error
                    style={{
                      margin: "0px",
                      fontSize: "12px",
                      paddingBottom: "0px !important",
                    }}
                  >
                    {touched.dateOfBirth && errors.dateOfBirth}
                  </FormHelperText>
                <Typography className={classes.lebeltypo}>Email</Typography>

                  <TextField
                    style={{
                      marginTop: "5px",
                    }}
                    type="text"
                    variant="outlined"
                    name="email"
                    value={values.email}
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <FormHelperText error>
                    {touched.email && errors.email}
                  </FormHelperText>
<Typography className={classes.lebeltypo}>Password</Typography>
                  <TextField
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    name="password"
                    value={values.password}
                    error={Boolean(touched.password && errors.password)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{ marginTop: "5px" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormHelperText error>
                    {touched.password && errors.password}
                  </FormHelperText>
<Typography className={classes.lebeltypo}>Password Confirm</Typography>

                  <TextField
                    fullWidth
                    type={showPasswordConfirm ? "text" : "password"}
                    variant="outlined"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    error={Boolean(
                      touched.confirmPassword && errors.confirmPassword
                    )}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{ marginTop: "5px" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              setShowPasswordConfirm(!showPasswordConfirm)
                            }
                            edge="end"
                          >
                            {showPasswordConfirm ? 
                             <VisibilityIcon /> : <VisibilityOffIcon />
                    }
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormHelperText error>
                    {touched.confirmPassword && errors.confirmPassword}
                  </FormHelperText>
                  <Typography className={classes.lebeltypo}>Select Country</Typography>
                  <Select
                    className={classes.inputField}
                    variant="outlined"
                    style={{ marginTop: "5px" }}
                    error={Boolean(touched.country && errors.country)}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changeCountry(e);
                    }}
                    fullWidth
                    name="country"
                    value={values.country}
                  >
                    <MenuItem value="0">
                      <em>None</em>
                    </MenuItem>
                    {countries.map((countries) => {
                      return (
                        <MenuItem
                          key={countries.name + countries.id}
                          value={countries.name}
                        >
                          {countries.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText error style={{ paddingLeft: "0px" }}>
                    {touched.country && errors.country}
                  </FormHelperText>
                  <Typography className={classes.lebeltypo}>Select State</Typography>
                  
                  <Select
                    className={classes.inputField}
                    variant="outlined"
                    style={{ marginTop: "5px" }}
                    error={Boolean(touched.state && errors.state)}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      changeState(e);
                      handleChange(e);
                    }}
                    fullWidth
                    name="state"
                    value={values.state}
                  >
                    <MenuItem value="0">
                      <em>None</em>
                    </MenuItem>
                    {showStates.lenght !== 0 &&
                      showStates.map((state) => {
                        return (
                          <MenuItem
                            key={state.name + state.id}
                            value={state.name}
                          >
                            {state.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                  <FormHelperText
                    error
                    style={{ margin: "0px", fontSize: "12px" }}
                  >
                    {touched.state && errors.state}
                  </FormHelperText>
                </Box>
            <Box className={classes.submitButton}>
              <Button variant="contained" color="secondary" type="submit">
                Submit
              </Button>
            </Box>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormValidation;
