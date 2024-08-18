import { ErrorProps } from "./ErrorMessage.types";
  
  export default function Error({ message }: ErrorProps) {
    return (
      <div>
        <p>{message}</p>
      </div>
    );
  }
  