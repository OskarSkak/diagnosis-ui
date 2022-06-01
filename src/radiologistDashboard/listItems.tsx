import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsIcon from '@mui/icons-material/Settings'
import ProfileIcon from '@mui/icons-material/AccountCircle'
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PendingActionsIcon />
      </ListItemIcon>
      <ListItemText primary="Actions Pending" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Patients" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <FolderCopyOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
      <InfoOutlinedIcon/>
      </ListItemIcon>
      <ListItemText primary="Information"/>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
      <BarChartIcon/>
      </ListItemIcon>
      <ListItemText primary="Diagnostics"/>
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Settings
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <ProfileIcon />
      </ListItemIcon>
      <ListItemText primary="Account settings" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="General" />
    </ListItemButton>
    {/* <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton> */}
  </React.Fragment>
);