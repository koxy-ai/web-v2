interface FailedFuncResponse {
    success: false;
    error: string;
}

interface SuccessFuncResponse<T = any> {
    success: true;
    data: T;
}

type FuncResponse<T = any> = FailedFuncResponse | SuccessFuncResponse<T>;