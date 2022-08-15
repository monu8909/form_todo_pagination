import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";

import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
const useStyles = makeStyles((theme) => ({
  displayBox: {
    display: "flex",
  },
  Icons: {
    background: "linear-gradient(45deg, black, transparent)",
    color: "aliceblue",
  },
  displayBox1: {
    display: "flex",
    alignItems: "center",
    padding: "5px 10px",
    borderRadius: "5px",
    justifyContent: "space-between",
  },
  todoList: {
    border: "1px solid black",
    borderRadius: "10px",
    marginTop: "25px",
  },
  orderList: {
    padding: "0px",
  },
  typoHeading: {
    textAlign: "center",
    fontSize: "30px",
    margin: "20px",
    fontFamily: '"Red Rose",  cursive',
    fontWeight: "700",
  },
  mainBox: {
    width: "60vh",
    backgroundColor: "#73c8db",
    borderWidth: 1,
    marginTop: "10vh",
    padding: "5vh",
    borderRadius: "10px",
    minHeight: "60vh",
    border: "1px solid lawngreen",
  },
  taskList: {
    fontSize: "20px",
    fontWeight: "500",
    fontFamily: '"Red Rose",  cursive',
  },
  completeTast: {
    textAlign: "center",
    color: "blue",
    fontWeight: "700",
    fontSize: "30px",
  },
}));
function TODO() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [checktrue, setCheckTrue] = useState(true);
  const [input, setInput] = useState([]);
  const [newinput, setNewInput] = useState([]);
  console.log("newinput-->>>", newinput);
  const [iconchange, setIconChange] = useState(false);
  const [completetask, setCompleteTask] = useState([]);
  console.log("completetask--->>>", completetask);

  // ========== ADD ITEMS IN LIST =========

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const listofitems = () => {
    if (!input) {
    } else {
      setNewInput((prev) => {
        return [...prev, input];
      });
      setIconChange(!iconchange);
      setInput("");
    }
  };
  // Complete the trask show in down

  const CompleteCheckItem = () => {
    if (!input) {
    } else {
      completetask((prev) => {
        return [...prev, input];
      });
      setCompleteTask((prev) => {
        return [...prev, input];
      });
    }
  };
  //  ========= DELETE ITEM FUNCTION ==========
  const deleteitem = (id) => {
    const updateditem = newinput.filter((elem, index) => {
      return index !== id;
    });
    setNewInput(updateditem);
  };
  const saveItem = (id) => {
    const checkItem = newinput.filter((elem, i) => {
      console.log("i----->>>>", i, id);
      return i === id;
    });
    setCompleteTask((prev) => {
      return [...prev, checkItem];
    });
  };
  return (
    <>
      <Box className="submitButton">
        <Box className="MainBox">
          <Typography className={classes.typoHeading}>TODO LIST</Typography>
          <Box>
            <Box className={classes.displayBox}>
              <TextField
                fullWidth
                id="outlined-basic"
                variant="outlined"
                placeholder="Add Task......"
                value={input}
                //   onClick={() => setIconChange(!iconchange)}
                onChange={(e) => setInput(e.target.value)}
              />{" "}
              &nbsp;&nbsp;
              <Button onClick={listofitems} className={classes.Icons}>
                {input === "" ? (
                  <EditRoundedIcon />
                ) : (
                  <AddCircleOutlineRoundedIcon />
                )}
              </Button>
            </Box>
          </Box>
          <ol className={classes.orderList}>
            {newinput.map((val, ind) => {
              return (
                <Box className={classes.todoList}>
                  <Box key={ind}>
                    <li>
                      <Box className={classes.displayBox1}>
                        <Typography className={classes.taskList}>
                          {val}
                        </Typography>
                        <Box>
                          <IconButton>
                            <DeleteRoundedIcon
                              onClick={() => deleteitem(ind)}
                              style={{ color: "red" }}
                            />
                          </IconButton>
                          <Checkbox
                            checked={checked}
                            onChange={(event) => {
                              handleChange(event);
                              saveItem(ind);
                              deleteitem(ind);
                              CompleteCheckItem();
                              setChecked(false)
                            }}
                            inputProps={{ "aria-label": "primary checkbox" }}
                          />
                        </Box>
                      </Box>
                    </li>
                  </Box>
                </Box>
              );
            })}
          </ol>
          {completetask === "" || completetask.length === 0 ? (
            ""
          ) : (
            <>
              <Typography className={classes.completeTast}>
                Completed Task
              </Typography>
              <ol className={classes.orderList}>
                {completetask.map((checkdata, ind) => {
                  return (
                    <>
                      <Box key={ind} className={classes.todoList}>
                        {console.log("ind-->>>", ind)}
                        <li>
                          <Box className={classes.displayBox1}>
                            <Typography className={classes.taskList}>
                              {checkdata}
                            </Typography>
                            <Box>
                              <Checkbox
                                checked={checktrue}
                                inputProps={{
                                  "aria-label": "primary checkbox",
                                }}
                              />
                            </Box>
                          </Box>
                        </li>
                      </Box>
                    </>
                  );
                })}
              </ol>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

export default TODO;
