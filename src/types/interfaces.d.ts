interface IOkResponseProps {
  message?: string;
  data?: any;
}

interface INotOkResponseProps {
  message?: string;
  error?: Error | string | undefined;
}

interface IBaseResponseProps {
  message: string;
  status: EResponseStatus;
  data?: IResponseData;
  error?: Error | string;
}
