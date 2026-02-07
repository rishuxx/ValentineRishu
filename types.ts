
export enum ValentineDay {
  ROSE = 'rose',
  PROPOSE = 'propose',
  CHOCOLATE = 'chocolate',
  TEDDY = 'teddy',
  PROMISE = 'promise',
  HUG = 'hug',
  KISS = 'kiss',
  VALENTINE = 'valentine'
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface DayConfig {
  id: ValentineDay;
  title: string;
  date: number;
  icon: string;
  color: string;
  message: string;
  passwords: string[];
  hint: string;
}

export interface SecretReply {
  dayId: string;
  dayTitle: string;
  message: string;
  timestamp: number;
}
