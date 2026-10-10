import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { QuizData } from '../../models/quiz';
import { Quiz } from './quiz';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const QUIZ_DATA: QuizData = {
  characters: ['magician', 'ogre'],
  genderQuestion: {
    id: 'gender',
    question: 'What gender do you identify as?',
    options: [
      { id: 'female', label: 'Female' },
      { id: 'male', label: 'Male' },
    ],
  },
  questions: [
    {
      id: 1,
      question: 'Question 1?',
      options: [
        { id: 'a', label: 'Magician answer', scores: { magician: 2 } },
        { id: 'b', label: 'Ogre answer', scores: { ogre: 2 } },
      ],
    },
  ],
};

describe('Quiz', () => {
  let component: Quiz;
  let fixture: ComponentFixture<Quiz>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Quiz],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Quiz);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();

    httpMock.expectOne('/questions').flush(QUIZ_DATA);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the gender question first, then the character questions', async () => {
    expect(component.step()).toBe('gender');

    component.selectGender(QUIZ_DATA.genderQuestion.options[1]);
    await wait(300);
    expect(component.step()).toBe('question');
    expect(component.currentQuestion?.question).toBe('Question 1?');
  });

  it('picks the character with the highest score once all questions are answered', async () => {
    component.selectGender(QUIZ_DATA.genderQuestion.options[1]);
    await wait(300);
    component.selectAnswer(QUIZ_DATA.questions[0].options[0]);
    await wait(300);

    expect(component.step()).toBe('result');
    expect(component.resultCharacter()).toBe('magician');
  });
});
