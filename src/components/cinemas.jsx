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
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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
  const [horaInicio,sethoraInicio] = useState('');
  const [horaCierre,sethoraCierre] = useState('');

  const getCinemas = async () => {
    try{
      const response = await api.getIndex();
        setCinemas(response.data);
    }catch(e){
      console.log(e);
    }
  }

  const getCinemasPorHoras = async () => {
    try{
      const response = await api.GetCinemaByHours(horaInicio,horaCierre);
        setCinemas(response.data);
    }catch(e){
      console.log(e);
    }    
  }

    const _handleTextFieldChangeHoraInicio = event => {
        sethoraInicio(event.target.value);
    }
    
    const _handleTextFieldChangeHoraCierrre = event => {
        sethoraCierre(event.target.value);
    }

  useEffect(() => {
    getCinemas();
  }, []);
  
  return (
    <div>
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <div>
                <TextField
                required
                id="openTime"
                label="Hora de Inicio"
                value={horaInicio}
                onChange={_handleTextFieldChangeHoraInicio}
                />
                <TextField
                required
                id="closeTime"
                label="Hora de cierre"
                value={horaCierre}
                onChange={_handleTextFieldChangeHoraCierrre}
                />
            </div>
        </Box>
        <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={horaInicio !== '' && horaCierre !== '' ? getCinemasPorHoras : getCinemas}>Buscar</Button>
        </Stack>
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