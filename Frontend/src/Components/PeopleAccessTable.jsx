import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Link,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${TableCell.root}`]: {
    padding: theme.spacing(2),
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const PeopleAccessTable = ({ title, data }) => {
  return (
    <Card>
      <CardHeader title={title} sx={{ backgroundColor: alpha("#1976d2", 0.1) }} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell align="right">Files</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(data).map(([email, files]) => (
                <StyledTableRow key={email}>
                  <StyledTableCell component="th" scope="row">
                    {email}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {files.map((file) => (
                      <Link
                        key={file.id}
                        href={file.webViewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#f50057", textDecoration: "none" }}
                      >
                        {file.name}
                      </Link>
                    ))}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default PeopleAccessTable;
