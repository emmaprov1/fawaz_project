import 'next-auth';
import { userType } from '../models/user';

declare module 'next-auth' {
  interface Session {
    user: User;
  }
  interface User {
    id: string;
    type?: userType;
  }
}
