import React from 'react';
import { useUserContext } from './context/UserContext'
import './App.css';
import SignIn from './SignIn';
import PractitionerDashboard from './practitionerDashboard/dermDash';
import RadiologistDashboard from './radiologistDashboard/radDash';
import PatientDashboard from './patientDashboard/patientDash'

const App = () => {
  const {name, pass, validated} = useUserContext()

  const getDash = () => {
    if (name === 'practitioner') {
      return PractitionerDashboard()
    }
    if (name === 'radiologist'){
      return RadiologistDashboard(); 
    }
    if (name === 'patient'){
      return PatientDashboard();
    }
  }

  const render = () => {
    return (
      <>
      {validated ? getDash() : <SignIn/>}
      </>
    )
  }

  return render()
}

export default App;
