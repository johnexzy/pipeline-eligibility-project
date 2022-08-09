export type MainResponseType = {
    info: any;
    results: ResponseData[];
};
export type ResponseData = {
    [key: number]: ResponseDataType[];
    paging: {
        next: string;
        previous: string;
    };
};
export type ResponseDataType = {
    gender: "male" | "female";
    id: string;
    row: number;
   
    age: number;
};