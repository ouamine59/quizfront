export interface Questions{
    question: string, 
    reponse : string[],
    checkbox : string[]
}
export interface Quiz{
    titre: string,
    questions: Questions[]
}

