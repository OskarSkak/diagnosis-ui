export type GenerateReportResponse = {
    name: string,
    age: number,
    sex: string,
    patient_message: string,
    class_code: number,
    aut_desc: string,
    aut_course_action: string,
    aut_concern: string,
    img_path: string,
    identified_class: number,
    dataset: string
}

export type GenerateISICReportRequest = {
    name: string,
    age: number,
    sex: string,
    patient_message: string
}

export type SaveFinalISICReportRequest = {
    cust_evaluated: boolean
    cust_diagnosis: string
    cust_concern: string
    cust_inspection: string
    cust_description: string
    name: string
    request_id: number
    user_id: number
}

export type SaveFinalRadReportRequest = {
    cust_evaluated: boolean
    cust_diagnosis: string
    request_id: number
    user_id: number
}

export type GetAllReportsRequest = {
    dataset: string
}

export type GenerateRadReportRequest = {
    name: string
    age: number
    sex: string
    patient_message: string
}

export type GetImageRequest = {
    path: string
}

export type Report = {
    age: number,
    aut_concern: string,
    aut_description: string
    aut_diagnosis: string
    aut_inspection: string
    confidence: number
    created: string
    cust_concern: string
    cust_description: string
    cust_diagnosis: string
    cust_evaluated: boolean
    cust_inspection: string
    dataset: string
    generated: boolean
    historic_confidence: number
    id: number
    request_image: string
    request_text: string
    resolved: boolean
    sex: string
    user_id: number
    xai_image: string,
    user_name: string,
    aut_course_action: string,
    cust_course_of_action: string
}