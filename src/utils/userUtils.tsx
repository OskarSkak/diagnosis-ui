
export const isPatient = (user: string, pass: string) => {
    return user === 'patient' && pass === 'password'
}

export const isPractitioner = (user: string, pass: string) => {
    return user === 'practitioner' && pass === 'password'
}

export const isRadiologist = (user: string, pass: string) => {
    return user === 'radiologist' && pass === 'password'
}
