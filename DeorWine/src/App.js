import "./App.css";
import { Box, Typography } from "@material-ui/core";
import FormValidation from "./component/FormValidation";
import TODO from "./component/TODO";
import TablePagination from "./component/TablePagination";
function App() {
  return (
    <div className="App">
      <Box>
        <FormValidation />
        <TODO />
        <TablePagination/>
      </Box>
    </div>
  );
}

export default App;
