import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity("user_response")
export class UserResponse {
  @ObjectIdColumn()
  id: string;

  @Column({ type: "string" })
  feeling: string;

  @Column({ type: "string" })
  hobbies: string;
}
