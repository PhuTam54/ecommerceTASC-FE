export class ApiResponse<T> {
  success: boolean = false;
  message!: string;
  data!: T;
}
