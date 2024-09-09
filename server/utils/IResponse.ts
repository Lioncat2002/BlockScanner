type Err = {
    statusCode: number;
    message: string;
    success : false ;
  };
  
  type Success<T> = {
    statusCode : number;
    data : T ;
    success : true ;
  }
  
  
  export type Response<T> = Success<T> | Err