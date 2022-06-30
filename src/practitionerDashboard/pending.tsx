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
import basederm from '../images/baseDermatofibroma497.png'
import derm from '../images/Dermatofibromahide_rest_false497.png'
import { Report } from '../types/report';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';



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
  const [reports, setReports] = React.useState<Report[]>([])
  const [report, setReport] = React.useState<Report>()

  const fetchAll = () => {
    fetch('http://localhost:5000/report/?dataset=ISIC')
        .then(response => response.json())
        .then(data => {
          setReports(data)
          console.log(data)
        })
  }

  React.useEffect(() => {
    if(reports.length === 0)
      fetch('http://localhost:5000/report/?dataset=ISIC')
        .then(response => response.json())
        .then(data => {
          setReports(data)
          console.log(data)
        })
  }, []);

  const handleResolve = () => {
    
    const requestOptions = {
      method: 'POST',
      // headers: { 'Content-Type': 'application/json'},
      // body: JSON.stringify({
      //   cust_evaluated: report?.cust_evaluated,
      //   cust_diagnosis: report?.cust_diagnosis === report?.aut_diagnosis,
      //   cust_concern: report?.cust_concern,
      //   cust_inspection: report?.cust_inspection,
      //   cust_description: report?.cust_description,
      //   name: report?.user_name,
      //   request_id: report?.id,
      //   user_id: 1
      // })
    };

    fetch(`http://localhost:5000/report/ISIC?cust_evaluated=${true}&cust_diagnosis=${report?.cust_diagnosis}&cust_concern=${report?.cust_concern}&cust_inspection=${report?.cust_inspection}&name=${report?.user_name}&request_id=${report?.id}&user_id=${report?.user_id}&cust_description=${report?.cust_description}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
    
    fetchAll()
    handleClose()
  }

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    console.log("fkldsajfkldas")
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
    setReport(undefined)
  };

  React.useEffect(() => {
    if (report !== undefined){
      setOpen(true)
    }
  }, [report])

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
          {reports.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{`${row.created}`}</TableCell>
              <TableCell>{row.user_name}</TableCell>
              <TableCell><CircleRoundedIcon fontSize='small'/></TableCell>
              <TableCell>{row.confidence > row.historic_confidence ? getIcon('y'): getIcon('y')}</TableCell>
              <TableCell>{getIcon(row.aut_diagnosis !== row.cust_diagnosis ? 'y' : 'n')}</TableCell>
              <TableCell>
                <Button onClick={() => {
                  handleClickOpen('paper')
                  setReport(row)
                }}>
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
                      <Stack direction={"column"} spacing={3}>
                        <Stack direction={"row"} spacing={2}>
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Patient name"
                          multiline
                          maxRows={4}
                          value={report?.user_name}
                          disabled={true}
                          onChange={(e) => console.log()}
                        />
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Age"
                          multiline
                          maxRows={4}
                          value={report?.age}
                          style = {{width: 70}}
                          disabled={true}
                          onChange={() => console.log("onChange")}
                        />
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Sex"
                          multiline
                          maxRows={4}
                          value={report?.sex}
                          style = {{width: 100}}
                          disabled={true}
                          onChange={() => console.log("onChange")}
                        />
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Prev. requests"
                          multiline
                          maxRows={4}
                          value={reports.filter(x => x.user_name === report?.user_name).length}
                          style = {{width: 130}}
                          disabled={true}
                          onChange={() => console.log("onChange")}
                        />
                        <Button>History</Button>
                        </Stack>
                        {/* <Table size="small">
                          <TableBody>
                            <TableCell><b>Name</b></TableCell>
                            <TableCell>Idris Donald</TableCell>
                            <TableCell><b>Age</b></TableCell>
                            <TableCell>42</TableCell>
                          </TableBody>
                        </Table> */}
                        </Stack>
                        <Stack direction={"column"} spacing={2}>
                          <Divider style={{padding: '8px'}}/>
                          <TextField
                          id="outlined-multiline-flexible"
                          label="Patient submitted message"
                          multiline
                          //maxRows={10}
                          value={report?.request_text}
                          disabled={true}
                          // style = {{width: 130}}
                          onChange={() => console.log("onChange")}
                        />
                        <Stack direction={"row"} spacing={4}>
                          <div>
                        <h6>Patient submitted image</h6>
                        <img src={basederm} width="220px" height="220px"/>
                        </div>
                        <div>
                          <h6>Segmented deciding features</h6>
                          <img src={derm} width="220px" height="220px"/>
                        </div>
                        </Stack>
                        <Divider style={{padding: '3px'}}/>
                        </Stack>
                        <Stack direction={"row"}>
                          <h5>Automated diagnosis</h5>
                         
                        </Stack>
                        <Stack direction={"row"} spacing={2}>
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Diagnosis"
                          multiline
                          maxRows={4}
                          value={report?.aut_diagnosis}
                          style = {{width: 170}}
                          disabled={true}
                        />
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Confidence"
                          
                          value={report?.confidence}
                          disabled={true}
                          style = {{width: 130}}
                          onChange={() => console.log("onChange")}
                        />
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Historic confidence"
                          multiline
                          maxRows={4}
                          value={report?.historic_confidence}
                          disabled={true}
                          style = {{width: 130}}
                          onChange={() => console.log("onChange")}
                        />
                         <InfoOutlinedIcon fontSize='small' style={{padding: "2px"}}/>
                        
                        </Stack>
                        <Stack direction={"row"}>
                        <h5>Suggested response</h5>
                         
                        </Stack>
                        <Stack direction={"column"} spacing={2}>
                          
                          <Stack direction={"row"} spacing={2}>
                          <TextField
                            id="outlined-multiline-flexible"
                            label="Diagnosis"
                            multiline
                            maxRows={4}
                            value={report?.cust_diagnosis}
                            style = {{width: 170}}
                            onChange={(e) => {
                              if (report !== undefined) {
                                setReport({...report, cust_diagnosis: e.target.value})
                              }
                            }}
                          />
                          <TextField
                            id="outlined-multiline-flexible"
                            label="Level of concern"
                            multiline
                            maxRows={4}
                            value={report?.cust_concern}
                            style = {{width: 150}}
                            onChange={(e) => {
                              if (report !== undefined) {
                                setReport({...report, cust_concern: e.target.value})
                              }
                            }}
                          />
                          <TextField
                            id="outlined-multiline-flexible"
                            label="Need in-office inspection"
                            multiline
                            maxRows={4}
                            value={report?.cust_concern === 'high' || report?.cust_concern === 'medium' ? 'yes' : 'no'}
                            style = {{width: 180}}
                            disabled = {true}
                            // onChange={(e) => {
                            //   if (report !== undefined) {
                            //     setReport({...report, cust_concern: e.target.value})
                            //   }
                            // }}
                          />
                          </Stack>
                          <TextField
                          id="outlined-multiline-flexible"
                          label="Description of diagnosis"
                          multiline
                          //maxRows={10}
                          value={report?.cust_description}
                          // style = {{width: 130}}
                          onChange={(e) => {
                            if (report !== undefined) {
                              setReport({...report, cust_description: e.target.value})
                            }
                          }}
                        />
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Recommended course of action"
                          multiline
                          //maxRows={10}
                          value={report?.cust_course_of_action}
                          // style = {{width: 130}}
                          onChange={(e) => {
                            if (report !== undefined) {
                              setReport({...report, cust_course_of_action: e.target.value})
                            }
                          }}
                        />
                        </Stack>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Reject automated diagnosis</Button>
                    <Button onClick={handleResolve}>Resolve</Button>
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