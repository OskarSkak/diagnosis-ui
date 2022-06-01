import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Generate Order Data
function createData(id: number, date: string, name: string, reportGenerated: string, manuallyResolved: string, amount: number) {
  return { id, date, name, reportGenerated, manuallyResolved, amount };
}

function getIcon(id: string){
  if(id === 'n') return <CircleOutlinedIcon/>
  if(id === 'y') return <CircleRoundedIcon/>
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Idris Donald',
    'n',
    'y',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Francisco Ballard',
    'y',
    'n',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'y', 'y', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Nell Freeman',
    'y',
    'n',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Janice Hopkins',
    'n',
    'n',
    212.79,
  ),
];

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function preventDefault(event: any) {
  event.preventDefault();
}

function getDate() {
    const today = new Date()
    const date = today.getDate()
    const month = today.getMonth()
    const year = today.getFullYear()
    return `${date} ${monthNames[month]}, ${year}`
}

export default function PendingToday() {
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        New requests
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            {/* <TableCell>Report generated</TableCell>
            <TableCell>Auto resolved</TableCell>
            <TableCell>Manually resolved</TableCell> */}
            <TableCell>Go to</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{getDate()}</TableCell>
              <TableCell>{row.name}</TableCell>
              {/* <TableCell><CircleRoundedIcon/></TableCell> */}
              {/* <TableCell>{getIcon(row.reportGenerated)}</TableCell>
              <TableCell>{getIcon(row.manuallyResolved)}</TableCell> */}
              <TableCell><ArrowForwardIosIcon/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See archived requests
      </Link>
    </React.Fragment>
  );
}