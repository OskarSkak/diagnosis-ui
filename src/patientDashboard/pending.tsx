import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Divider, Grid, Stack, TextField, Typography } from '@mui/material';
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
import FilesDragAndDrop from './FilesDragAndDrop';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import { GenerateISICReportRequest, Report } from '../types/report';
import { useFilePicker } from "use-file-picker";

function getIcon(id: string){
  if(id === 'n') return <CircleOutlinedIcon fontSize='small'/>
  if(id === 'y') return <CircleRoundedIcon fontSize='small'/>
}


function preventDefault(event: any) {
  event.preventDefault();
}

export default function Pending() {
  const [open, setOpen] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

  const [reports, setReports] = React.useState<Report[]>([])
  const [request, setRequest] = React.useState<GenerateISICReportRequest>({age: 42, name: 'patient', patient_message: '', sex: 'male'})
  const [report, setReport] = React.useState<Report>()

  const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
    readAs: 'DataURL',
    accept: '.png,.jpg',
  });

  const postRequest = () => {
    var formData = new FormData()
    var imagefile = filesContent[0].content
    formData.append("image", imagefile)
    
    const options = {
      method: 'POST',
      body: formData,
      headers: {
          'Content-Type': 'multipart/form-data',
        }
    }

    fetch(`http://localhost:5000/report/ISIC/generate?name=${request.name}&age=${request.age}&sex=${request.sex}&patient_message=${request.patient_message}`, options)
  }

  React.useEffect(() => {
    console.log(filesContent)
  }, [filesContent])

  const isProbableEnough = () => {
    if (report?.confidence !== undefined)
      if (report.confidence > 90)
        return true
    
    return false
  }

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

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
    console.log(open)
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
      <Grid container spacing={3} alignItems={"center"} justifyItems={"space-between"}>
        <Grid item>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        My requests
      </Typography>
      </Grid>
      <Grid item>
      <Button variant='outlined' onClick={() => {
        
        setOpenCreate(true);
        setScroll('paper');
        }}>
                  Create new request
      </Button>
      </Grid>
      </Grid>
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
          {reports.filter(x => x.user_name === 'patient').map((row) => (
            <TableRow key={row.id}>
              <TableCell>{`${row.created}`}</TableCell>
              <TableCell>{row.user_name}</TableCell>
              <TableCell><CircleRoundedIcon fontSize='small'/></TableCell>
              <TableCell>{row.confidence > row.historic_confidence ? getIcon('y'): getIcon('y')}</TableCell>
              <TableCell>{getIcon(row.aut_diagnosis !== row.cust_diagnosis ? 'y' : 'n')}</TableCell>
              <TableCell>
              <Button onClick={() => {
                  setReport(row)
                  setOpen(true);
                  setScroll('paper');
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
                  <DialogTitle id="scroll-dialog-title">Created request</DialogTitle>
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
                          maxRows={4}
                          value={report?.user_name}
                          disabled={true}
                          onChange={() => console.log("onChange")}
                        />
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Age"
                          maxRows={4}
                          value={report?.age}
                          disabled={true}
                          style = {{width: 70}}
                          onChange={() => console.log("onChange")}
                        />
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Sex"
                          maxRows={4}
                          value={report?.sex}
                          disabled={true}
                          style = {{width: 90}}
                          onChange={() => console.log("onChange")}
                        />
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Prev. requests"
                          multiline
                          fullWidth
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
                        <h6>Submitted image</h6>
                          <img src={`http://localhost:5000/image?path=${report?.request_image}`} width="160px" height="160px"/>
                          
                        </Stack>

                        <Divider style={{padding: '10px'}}/>
                        {report?.cust_evaluated || isProbableEnough() ? 
                        (<div>
                          <h4>Response</h4>
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
                            disabled={true}
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
                            disabled={true}
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
                          <Stack direction={'column'} spacing={2} style={{padding: '10px'}}>
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
                          disabled={true}
                        />
                        </Stack>
                        <Stack direction={'column'} spacing={2} style={{padding: '10px'}}>
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
                          disabled={true}
                        />
                        </Stack>
                        </div>) 
                        : (<div>Automated diagnosis can not be determined. Please wait for manual inspection.</div>)  
                      }
                    </DialogContentText>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See archived requests
      </Link>





      <Dialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Create request</DialogTitle>
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
                maxRows={4}
                value={"patient"}
                disabled={true}
                onChange={() => console.log("onChange")}
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Age"
                maxRows={4}
                value={"42"}
                disabled={true}
                style = {{width: 70}}
                onChange={() => console.log("onChange")}
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Sex"
                maxRows={4}
                value={"Male"}
                disabled={true}
                style = {{width: 90}}
                onChange={() => console.log("onChange")}
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Prev. requests"
                multiline
                fullWidth
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
                label="Submit a message"
                multiline
                //maxRows={10}
                value={request.patient_message}
                // style = {{width: 130}}
                onChange={(e) => {
                  setRequest({...request, patient_message: e.target.value})
                }}
              />
              <Box component="span" sx={{ p: 2, border: '1px dashed grey' }} alignContent={"center"}>
                <Stack justifyContent="center" direction={"row"}>
                  <Stack direction={"column"}>
                    <div>  </div>
                
                <Button onClick={() => openFileSelector()}>Drop file or select from file system to upload</Button>
                {filesContent.map((file, index) => (
                  <div key={index}>
                    <h6>{file.name}</h6>
                    <img alt={file.name} src={file.content} height={'200px'} width={'200px'}></img>
                    <br />
                  </div>
                ))}
                </Stack>
                </Stack>
              </Box>
              </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreate(false)}>Cancel</Button>
          <Button onClick={postRequest}>Create request</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}