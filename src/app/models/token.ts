export class Token {
  token: string;
  status: boolean;
  error: {
    status: boolean;
    message: string;
  };
}
