import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuizData, QuizOption, QuizQuestion } from '../../models/quiz';
import { QuizService } from '../../services/quiz';

type Step = 'loading' | 'error' | 'gender' | 'question' | 'result';

const CHARACTER_IMAGES: Record<string, Record<string, string>> = {
  magician: { female: 'wizard-f.png', male: 'wizard-m.png' },
  ogre: { female: 'ogre-f.png', male: 'ogre-m.png' },
  jester: { female: 'jester-f.png', male: 'jester-m.png' },
  knight: { female: 'knight-f.png', male: 'knight-m.png' },
  hunter: { female: 'hunter-f.png', male: 'hunter-m.png' },
  princess: { female: 'princess-f.png', male: 'princess-f.png' },
};

const TRANSITION_MS = 250;

@Component({
  imports: [RouterLink],
  selector: 'app-quiz',
  styleUrl: './quiz.scss',
  templateUrl: './quiz.html',
})
export class Quiz implements OnInit {
  private quizService = inject(QuizService);

  step = signal<Step>('loading');
  quizData = signal<QuizData | null>(null);
  currentQuestionIndex = signal(0);
  resultCharacter = signal<string | null>(null);
  transitioning = signal(false);

  private gender: string | null = null;
  private scores: Record<string, number> = {};

  ngOnInit(): void {
    this.loadQuiz();
  }

  loadQuiz(): void {
    this.step.set('loading');
    this.quizService.getQuiz().subscribe({
      next: data => {
        this.quizData.set(data);
        this.scores = Object.fromEntries(data.characters.map(character => [character, 0]));
        this.currentQuestionIndex.set(0);
        this.step.set('gender');
      },
      error: () => this.step.set('error'),
    });
  }

  get currentQuestion(): QuizQuestion | null {
    const data = this.quizData();
    return data ? data.questions[this.currentQuestionIndex()] : null;
  }

  get totalQuestions(): number {
    return this.quizData()?.questions.length ?? 0;
  }

  get progressPercent(): number {
    return ((this.currentQuestionIndex() + 1) / this.totalQuestions) * 100;
  }

  selectGender(option: QuizOption): void {
    if (this.transitioning()) {
      return;
    }
    this.gender = option.id;
    this.transitionTo(() => this.step.set('question'));
  }

  selectAnswer(option: QuizOption): void {
    if (this.transitioning()) {
      return;
    }
    for (const [character, points] of Object.entries(option.scores ?? {})) {
      this.scores[character] = (this.scores[character] ?? 0) + points;
    }

    this.transitionTo(() => {
      if (this.currentQuestionIndex() + 1 < this.totalQuestions) {
        this.currentQuestionIndex.update(index => index + 1);
      } else {
        this.resultCharacter.set(this.computeResultCharacter());
        this.step.set('result');
      }
    });
  }

  private transitionTo(applyChange: () => void): void {
    this.transitioning.set(true);
    setTimeout(() => {
      applyChange();
      this.transitioning.set(false);
    }, TRANSITION_MS);
  }

  resultImage(): string | null {
    const character = this.resultCharacter();
    if (!character) {
      return null;
    }
    const variants = CHARACTER_IMAGES[character];
    const file = variants?.[this.gender ?? ''];
    return file ? `/characters/${file}` : null;
  }

  resultDescription(): string | null {
    const character = this.resultCharacter();
    return character ? this.quizData()?.characterDescriptions[character] ?? null : null;
  }

  restart(): void {
    this.gender = null;
    this.resultCharacter.set(null);
    this.loadQuiz();
  }

  private computeResultCharacter(): string {
    return Object.entries(this.scores).reduce((best, [character, points]) =>
      points > best[1] ? [character, points] : best,
    )[0];
  }
}
