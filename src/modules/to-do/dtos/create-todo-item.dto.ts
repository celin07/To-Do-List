import { IsInt, Length } from "class-validator"

export class CreateTodoItem {
    @Length(1, 10)
    text: string

    @IsInt()
    dificult: number
}