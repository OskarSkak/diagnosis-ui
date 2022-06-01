import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Divider, Stack, TextField, Typography } from '@mui/material';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import dermPic from '../images/ISIC_0025314.jpg'
import dermLimePic from '../images/dermLime.png'
import basederm from '../images/cov.png'
import derm from '../images/covSaliency.png'

// Generate Order Data
function createData(id: number, date: string, name: string, reportGenerated: string, manuallyResolved: string, amount: number) {
  return { id, date, name, reportGenerated, manuallyResolved, amount };
}

function getIcon(id: string){
  if(id === 'n') return <CircleOutlinedIcon fontSize='small'/>
  if(id === 'y') return <CircleRoundedIcon fontSize='small'/>
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

function preventDefault(event: any) {
  event.preventDefault();
}

export default function Pending() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Pending requests
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Report generated</TableCell>
            <TableCell>Auto resolved</TableCell>
            <TableCell>Manually resolved</TableCell>
            <TableCell>Go to</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell><CircleRoundedIcon fontSize='small'/></TableCell>
              <TableCell>{getIcon(row.reportGenerated)}</TableCell>
              <TableCell>{getIcon(row.manuallyResolved)}</TableCell>
              <TableCell>
                <Button onClick={handleClickOpen('paper')}>
                <ArrowForwardIosIcon/>
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  scroll={scroll}
                  aria-labelledby="scroll-dialog-title"
                  aria-describedby="scroll-dialog-description"
                >
                  <DialogTitle id="scroll-dialog-title">Request report</DialogTitle>
                  <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                      id="scroll-dialog-description"
                      ref={descriptionElementRef}
                      tabIndex={-1}
                    >
                      <Stack direction={"column"} spacing={2}>
                        <Stack direction={"row"} spacing={2}>
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Patient name"
                          multiline
                          maxRows={4}
                          value={"Sarah Jackson"}
                          onChange={() => console.log("onChange")}
                        />
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Age"
                          multiline
                          maxRows={4}
                          value={"31"}
                          style = {{width: 70}}
                          onChange={() => console.log("onChange")}
                        />
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Sex"
                          multiline
                          maxRows={4}
                          value={"Female"}
                          style = {{width: 100}}
                          onChange={() => console.log("onChange")}
                        />
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Previous"
                          multiline
                          maxRows={4}
                          value={"1"}
                          style = {{width: 130}}
                          onChange={() => console.log("onChange")}
                        />
                        <Button>History</Button>
                        </Stack>
                        </Stack>
                        <Stack direction={"column"} spacing={1}>
                          <Divider style={{padding: '8px'}}/>
                          <h5>Automated diagnosis</h5>
                        <Stack direction={"row"} spacing={8}>
                          <div>
                        <h6>Recorded image</h6>
                        <img src={basederm} width="160px" height="160px"/>
                        </div>
                        <div>
                          <h6>Most important features in automated diagnosis</h6>
                          <img src={derm} width="160px" height="160px"/>
                        </div>
                        </Stack>
                        <Divider style={{padding: '5px'}}/>
                        </Stack>
                        <Stack direction={"row"} spacing={2}>
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Diagnosis"
                          multiline
                          maxRows={4}
                          value={"COVID-19"}
                          style = {{width: 170}}
                          onChange={() => console.log("onChange")}
                        />
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Confidence"
                          multiline
                          maxRows={4}
                          value={"97%"}
                          style = {{width: 130}}
                          onChange={() => console.log("onChange")}
                        />
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Historic confidence"
                          multiline
                          maxRows={4}
                          value={"96%"}
                          style = {{width: 130}}
                          onChange={() => console.log("onChange")}
                        />
                         <InfoOutlinedIcon fontSize='small' style={{padding: "2px"}}/>
                        
                        </Stack>
                        
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Reject automated diagnosis</Button>
                    <Button onClick={handleClose}>Resolve</Button>
                  </DialogActions>
                </Dialog>
              </TableCell>
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