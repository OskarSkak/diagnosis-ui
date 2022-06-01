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
                      <Stack direction={"column"} spacing={3}>
                        <Stack direction={"row"} spacing={2}>
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Patient name"
                          multiline
                          maxRows={4}
                          value={"Idris Donald"}
                          onChange={() => console.log("onChange")}
                        />
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Age"
                          multiline
                          maxRows={4}
                          value={"42"}
                          style = {{width: 70}}
                          onChange={() => console.log("onChange")}
                        />
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Sex"
                          multiline
                          maxRows={4}
                          value={"Male"}
                          style = {{width: 90}}
                          onChange={() => console.log("onChange")}
                        />
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Prev. requests"
                          multiline
                          maxRows={4}
                          value={"3"}
                          style = {{width: 130}}
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
                          value={"Slightly raised somewhat firm skin growth have developed on my leg. My concern is that it seems similar to several cancerous growths I have found examples of. I noticed it after being on a holiday with lots of sunbathing, but I can not recall if there used to be a birthmark there."}
                          // style = {{width: 130}}
                          onChange={() => console.log("onChange")}
                        />
                        <Stack direction={"row"} spacing={4}>
                          <div>
                        <h6>Patient submitted image</h6>
                        <img src={basederm} width="120px" height="120px"/>
                        </div>
                        <div>
                          <h6>Segmented deciding features</h6>
                          <img src={derm} width="120px" height="120px"/>
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
                          value={"Dermatofibroma"}
                          style = {{width: 170}}
                          onChange={() => console.log("onChange")}
                        />
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Confidence"
                          multiline
                          maxRows={4}
                          value={"86%"}
                          style = {{width: 130}}
                          onChange={() => console.log("onChange")}
                        />
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Historic confidence"
                          multiline
                          maxRows={4}
                          value={"92%"}
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
                            value={"Dermatofibroma"}
                            style = {{width: 170}}
                            onChange={() => console.log("onChange")}
                          />
                          <TextField
                            id="outlined-multiline-flexible"
                            label="Level of concern"
                            multiline
                            maxRows={4}
                            value={"Very low"}
                            style = {{width: 150}}
                            onChange={() => console.log("onChange")}
                          />
                          <TextField
                            id="outlined-multiline-flexible"
                            label="Need in-office inspection"
                            multiline
                            maxRows={4}
                            value={"No"}
                            style = {{width: 180}}
                            onChange={() => console.log("onChange")}
                          />
                          </Stack>
                          <TextField
                          id="outlined-multiline-flexible"
                          label="Description of diagnosis"
                          multiline
                          //maxRows={10}
                          value={"Dermatofibromas, or histiocytomas, are common noncancerous (benign) skin growths. They are firm to hard, and they are skin-colored or slightly pigmented. Dermatofibromas can be tender. These lesions usually persist for life, and they may heal as depressed scars after several years. Occasionally, dermatofibromas found in large numbers in grouped or linear clusters are seen in association with immune disturbances, such as leukemia, HIV, and lupus."}
                          // style = {{width: 130}}
                          onChange={() => console.log("onChange")}
                        />
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Recommended course of action"
                          multiline
                          //maxRows={10}
                          value={"Dermatofibromas are noncancerous lesions, but seek medical evaluation if a lesion begins to increase in size, becomes painful, or if large numbers of dermatofibromas in grouped or linear clusters are seen."}
                          // style = {{width: 130}}
                          onChange={() => console.log("onChange")}
                        />
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