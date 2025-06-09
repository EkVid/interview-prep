interface Question {
    title: string;
    description?: string;   
    difficulty?: string;
    position?: string;
    type?: string;
    time?: string;
    tags?: string;
    solution?: string;
    isProgramming?: boolean;
    programmingLanguage?: string;
    company?: string;
    estimatedTime?: string;
  }

export default Question;