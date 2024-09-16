interface FailedFuncResponse {
    success: false;
    error: string;
}

interface SuccessFuncResponse {
    success: true;
    data: any;
}

type FuncResponse = FailedFuncResponse | SuccessFuncResponse;