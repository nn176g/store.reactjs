import React, { useEffect, useState } from 'react';
import { styled  } from "@mui/material/styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import api from '../servicies/SiteServicies';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const BasicTable = () => {    

  const [cinemas,setCinemas] = useState([]);

  const getCinemas = async () => {
    try{
      const response = await api.getIndex();//.then((response) => {
    //     console.log("🚀 ~ file: cinemas.jsx:38 ~ data ~ response:", response.data)
        setCinemas(response.data);
    //   });
      console.log("🚀 ~ file: cinemas.jsx:42 ~ response ~ response:", response)
    }catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    getCinemas();
  }, []);

//   const getProductData = async () => {
//     try {
//       const data = await axios.get(
//         "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline"
//       );
//       console.log(data.data);
//       setProduct(data.data);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   useEffect(() => {
//     getProductData();
//   }, []);
  
  return (
    <div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">City</TableCell>
            <TableCell align="center">State</TableCell>
            <TableCell align="center">Open Time</TableCell>
            <TableCell align="center">Close Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cinemas.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
              <StyledTableCell align="left">{row.address}</StyledTableCell>
              <StyledTableCell align="left">{row.city}</StyledTableCell>
              <StyledTableCell align="left">{row.state}</StyledTableCell>
              <StyledTableCell align="left">{row.openTime.substring(row.openTime.length-8,row.openTime.length)}</StyledTableCell>
              <StyledTableCell align="left">{row.closeTime.substring(row.closeTime.length-8,row.closeTime.length)}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
export default BasicTable;