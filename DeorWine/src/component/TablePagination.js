import React, { useState, useEffect } from "react";
import {
  withStyles,
  makeStyles,
  Container,
  Button,
  Box,
  Select,
  MenuItem,
} from "@material-ui/core";
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { Typography } from "@mui/material";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: "900",
    borderBottom: "1px solid #9B998A",
  },
  body: {
    fontSize: 14,
    fontFamily: "arial",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  mainBox: {
    marginTop: "50px",
    paddingBottom: "5rem",
  },
  imgSection: {
    width: "50px",
    height: "50px",
    borderRadius: "10px",
  },
  prevButton: {
    border: "1px solid black",
    color: "white",
    padding: "5px 15px",
  },
  Twobuttn: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
  },
  selecttypo: {
    color: "white",
    marginBottom: "5px",
  },
  selectBar1: {
    color: "white",
    background: "black",
    "&:hover": {
      color: "black",
      background: "white",
    },
  },
  selectBar: {
    width:"30%",
    border: "1px solid white",
    height: "52px",
    padding: "0px 15px",
    borderRadius: "5px",
    marginBottom: "50px",
  },
}));

export default function CustomizedTables() {
  const classes = useStyles();
  const [tabledata, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState();
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const handleChange = (event) => {
    setItemPerPage(event.target.value);
  };

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const pages = [];

  for (let i = 1; i <= Math.ceil(tabledata.length / itemPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = tabledata.slice(indexOfFirstItem, indexOfLastItem);
  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <Typography
          style={{ padding: "0px 20px", color: "white", marginTop: "5px" }}
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </Typography>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;

  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <Typography onClick={handleNextbtn}>&hellip;</Typography>
    );
  }

  let pageDecrementBtn = null;

  if (pages.length > maxPageNumberLimit) {
    pageDecrementBtn = (
      <Typography className={classes.prevIcons} onClick={handlePrevbtn}>
        &hellip;
      </Typography>
    );
  }

  const FetchData = async () => {
    const res = await axios({
      url: "https://newsapi.org/v2/everything?q=tesla&from=2022-07-14&sortBy=publishedAt&apiKey=7e9f13eef6b3485e9f9bc00ce148a174",
      method: "GET",
    })
      .then((res) => {
        setTableData(res?.data?.articles);
        console.log("res----->", res);
      })
      .catch((err) => {
        console.log("errr--->>", err);
      });
  };
  useEffect(() => {
    FetchData();
  }, []);

  return (
    <>
      <Box className={classes.mainBox}>
        <Container>
          <Box>
            <Typography className={classes.selecttypo}>
              Please select table data you want to{" "}
            </Typography>
            <Select
              className={classes.selectBar}
            
              value={itemPerPage}
              onChange={handleChange}
              label="Table Data"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem className={classes.selectBar1} value={10}>
                {" "}
                10
              </MenuItem>
              <MenuItem className={classes.selectBar1} value={20}>
                20
              </MenuItem>
              <MenuItem className={classes.selectBar1} value={30}>
                30
              </MenuItem>
            </Select>
          </Box>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Sr.NO</StyledTableCell>
                  <StyledTableCell align="left">Name</StyledTableCell>

                  <StyledTableCell align="left">Author</StyledTableCell>
                  <StyledTableCell align="left">URLtoImage</StyledTableCell>
                  <StyledTableCell align="left">Content</StyledTableCell>
                  <StyledTableCell align="left">Description</StyledTableCell>
                  <StyledTableCell align="left">PublishedAt</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {currentItems.map((data, index) => (
                  <StyledTableRow key="">
                    <StyledTableCell
                      component="th"
                      scope="row"
                      style={{ paddingTop: "20px" }}
                    >
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {data.source?.name ? data.source?.name : "no_name"}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {data.author ? data.author : "no_author"}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Box>
                        <img
                          className={classes.imgSection}
                          src={data.urlToImage}
                        ></img>
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {data.content}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {data.description}
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      {/* {data.publishedAt} */}
                      {moment(data.publishedAt).format("DD-MM-YYYY hh:mm:ss")}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box className={classes.Twobuttn}>
            {itemPerPage === "" || itemPerPage === undefined ? (
              "Data Not Found"
            ) : (
              <>
                <Button
                  className={classes.prevButton}
                  onClick={handlePrevbtn}
                  disabled={currentPage == pages[0] ? true : false}
                >
                  Prev
                </Button>
                {pageDecrementBtn}
                {renderPageNumbers}
                {pageIncrementBtn}

                <Button
                  className={classes.prevButton}
                  onClick={handleNextbtn}
                  disabled={
                    currentPage == pages[pages.length - 1] ? true : false
                  }
                >
                  Next
                </Button>
              </>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}
