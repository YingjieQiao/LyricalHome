import * as React from 'react';
import axios from "axios";

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import styles from "./Ranking.module.css";


const columns = [
  { id: 'rank', label: 'rank', minWidth: 20 },
  {
    id: 'word',
    label: 'word',
    minWidth: 20,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(rank, word) {
  return { rank, word };
}




class Ranking extends React.Component {
    
    constructor(props) {
        super(props);


        this.state = {
            page: 0,
            rowsPerPage: 10,
            word: "",
            topic: "Poets",
            rows: [
                // createData('India', 'IN'),
                // createData('China', 'CN'),

            ],
            limit: 10
        }
    }

    


    handleChange = (event) => {
        let flag = event.target.value;
        console.log(flag);
        
        let data = []
        let i = 1;

        if (flag === 1) {
            axios({
                url: "http://localhost:8000/poets/" + this.state.limit,
                method: 'GET',
            }).then((res) => {
                console.log(res);
                console.log(Object.keys(res.data).length);
                const keys = Object.keys(res.data);
                keys.forEach(key => {
                    data.push(createData(i++, key))
                })
                this.setState({rows: data});
            });
        } else if (flag === 2) {
            axios({
                url: "http://localhost:8000/seasons/" ,
                method: 'GET',
            }).then((res) => {
                console.log(res);
                console.log(Object.keys(res.data).length);
                const keys = Object.keys(res.data);
                keys.forEach(key => {
                    data.push(createData(i++, key))
                })
                this.setState({rows: data});
            });
        } else if (flag === 3) {
            axios({
                url: "http://localhost:8000/colours/" ,
                method: 'GET',
            }).then((res) => {
                console.log(res);
                console.log(Object.keys(res.data).length);
                const keys = Object.keys(res.data);
                keys.forEach(key => {
                    data.push(createData(i++, key))
                })
                this.setState({rows: data});
            });
        } else if (flag === 4) {
            axios({
                url: "http://localhost:8000/animals/" ,
                method: 'GET',
            }).then((res) => {
                console.log(res);
                console.log(Object.keys(res.data).length);
                const keys = Object.keys(res.data);
                keys.forEach(key => {
                    data.push(createData(i++, key))
                })
                this.setState({rows: data});
            });
        } else if (flag === 5) {
            axios({
                url: "http://localhost:8000/plants/" ,
                method: 'GET',
            }).then((res) => {
                console.log(res);
                console.log(Object.keys(res.data).length);
                const keys = Object.keys(res.data);
                keys.forEach(key => {
                    data.push(createData(i++, key))
                })
                this.setState({rows: data});
            });
        } else if (flag === 6) {
            axios({
                url: "http://localhost:8000/location/" + this.state.limit,
                method: 'GET',
            }).then((res) => {
                console.log(res);
                console.log(Object.keys(res.data).length);
                const keys = Object.keys(res.data);
                keys.forEach(key => {
                    data.push(createData(i++, key))
                })
                this.setState({rows: data});
            });
        } else if (flag === 7) {
            axios({
                url: "http://localhost:8000/time/" + this.state.limit,
                method: 'GET',
            }).then((res) => {
                console.log(res);
                console.log(Object.keys(res.data).length);
                const keys = Object.keys(res.data);
                keys.forEach(key => {
                    data.push(createData(i++, key))
                })
                this.setState({rows: data});
            });
        } else if (flag === 8) {
            axios({
                url: "http://localhost:8000/scenario/" + this.state.limit,
                method: 'GET',
            }).then((res) => {
                console.log(res);
                console.log(Object.keys(res.data).length);
                const keys = Object.keys(res.data);
                keys.forEach(key => {
                    data.push(createData(i++, key))
                })
                this.setState({rows: data});
            });
        }
         
        this.setState({topic: "asd"})
    }



    render() {
        return (
            <div className={styles.overall}>

                <div className={styles.spaced_div}>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Topics</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.age}
                        label="Topics"
                        onChange={this.handleChange}
                        >
                        <MenuItem value={1}>Poets</MenuItem>
                        <MenuItem value={2}>Seasons</MenuItem>
                        <MenuItem value={3}>Colours</MenuItem>
                        <MenuItem value={4}>Animals</MenuItem>
                        <MenuItem value={5}>Plants</MenuItem>
                        <MenuItem value={6}>Location</MenuItem>
                        <MenuItem value={7}>Time</MenuItem>
                        <MenuItem value={8}>Scenario</MenuItem>
                        </Select>
                    </FormControl>
                    </Box>
                </div>

                <Paper sx={{ width: '60%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.rows
                      .slice(this.state.page * this.state.rowsPerPage, 
                      this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                      .map((row) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={this.state.rows.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                onPageChange={this.state.handleChangePage}
                onRowsPerPageChange={this.state.handleChangeRowsPerPage}
              />
            </Paper>
            </div>
          );
    }
}

export default Ranking;
