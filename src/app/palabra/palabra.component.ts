import { Component, OnInit, ElementRef, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { palabras } from 'src/assets/WORDS';
import { BdService } from '../bd.service';
import { SoundService } from '../sound.service';

type answer =
  | {
      char: string;
      present: boolean;
      onPosition?: boolean;
    }
  | undefined;

type PalabrasType = {
  [key: string]: string[];
};

@Component({
  selector: 'app-palabra',
  templateUrl: './palabra.component.html',
  styleUrls: ['./palabra.component.scss']
})
export class PalabraComponent implements OnInit, AfterViewInit {

  constructor(private soundService: SoundService,
  private bdService: BdService,
  private toast: ToastrService){
  
  }

  successMessages: string[] = [
    "¡Muy bieeen bebitaa!",
    "¡Oleee mi bebeeeee!",
    "¡Vaya puta ama!",
    "¡Que grandeeeee!",
    "¡Super bieeeen!",
  ];

  mensajeSuccess = '';
  title = 'Bebedle';
  word: string = '';
  currentWord: string = 'holaa';
  answers: answer[][] = [[], [], [], [], []];
  currentRow: number = 0;
  currentCol: number = 0;
  rows: number[] = [0, 1, 2, 3, 4];
  columns: number[] = [0, 1, 2, 3, 4];
  chars: string[] = [];
  isWrong: boolean = false;
  inputs!: ElementRef[];
  gameOver?: boolean = false;
  success?: boolean = false;
  timer!: number;
  record!: number;
  categories!: string[];
  selectedCategory!: string;
  categoryWords!: string[];
  allWords!: string[];
  usedWords: Set<string> = new Set<string>();
  pistasUtilizadas: number = 0;
  letrasReveladas: string[] = [];


  getCategoryForCurrentWord(): string {
    // Verifica si la palabra actual existe en alguna categoría
    for (const category in palabras as any) {
      if (palabras.hasOwnProperty(category)) {
        const categoryWords = (palabras as PalabrasType)[category];
        if (categoryWords.includes(this.word)) {
          return category;
        }
      }
    }
    
    // Si no se encuentra en ninguna categoría, puedes devolver un mensaje o valor predeterminado
    return 'Categoría no encontrada';
  }
  
  revelarPista() {
    // Verifica si todavía hay letras ocultas para revelar
    if (this.pistasUtilizadas < 5) {
      let letraOcultaIndex = -1;
  
      // Encuentra la próxima letra oculta en la palabra
      for (let i = 0; i < 5; i++) {
        if (!this.answers[this.currentRow][i]?.present) {
          letraOcultaIndex = i;
          break;
        }
      }
  
      // Si se encuentra una letra oculta, réstala de las pistas restantes
      if (letraOcultaIndex !== -1) {
        this.pistasUtilizadas++;
        const letraOculta = this.word.charAt(letraOcultaIndex);
  
        // Actualiza la interfaz gráfica para mostrar la letra oculta
        this.answers[this.currentRow][letraOcultaIndex] = {
          char: letraOculta,
          present: true,
        };
  
        // Reemplaza la letra oculta en la variable 'word'
        this.word =
          this.word.substr(0, letraOcultaIndex) +
          letraOculta +
          this.word.substr(letraOcultaIndex + 1);
        
        this.letrasReveladas[letraOcultaIndex] = letraOculta;
      }
    }
  }
  
  
  
  

  ngOnInit(): void {
    this.soundService.stopAll();
    this.letrasReveladas = ['*', '*', '*', '*', '*'];
    
    this.categories = Object.keys(palabras);
    this.allWords = this.getAllWords();
    
    
    const storedWord = this.getStoredWord();
    const storedDate = this.getStoredWordDate();
    this.gameOver = this.getGameOver() as boolean;
    this.success = this.getSuccess() as boolean;
  
    if(this.success){
      this.getRandomSuccessMessage()
    }
    
    const storedUsedWords = this.getStoredUsedWords();
    if (storedUsedWords) {
      this.usedWords = storedUsedWords;
    }
  
    const currentDate = new Date().toLocaleDateString();
    if (storedWord && storedDate === currentDate) {
      this.word = storedWord;
    } else {
      this.word = this.generateWord();
      this.storeWord(this.word);
      this.storeWordDate(currentDate);
    }
    // this.word =  this.generateWord();
    console.log(this.word);
    console.log(this.allWords);
    console.log(this.usedWords);

    const now = new Date();
    const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = nextMidnight.getTime() - now.getTime();
    
    

    setTimeout(() => {
      const newWord = this.generateWord();
      if (newWord) {
        this.word = newWord;
        this.storeWord(this.word);
        this.storeWordDate(currentDate);

        setInterval(() => {
          const newWord = this.generateWord();
          if (newWord) {
            this.word = newWord;
            this.storeWord(this.word);
            this.storeWordDate(currentDate);
          }
        }, 24 * 60 * 60 * 1000);
      }
    }, timeUntilMidnight);
  }

  isNewDay(): boolean {
    const storedDate = localStorage.getItem('currentWordDate');
    const currentDate = new Date().toLocaleDateString();

    if (storedDate !== currentDate) {
      localStorage.setItem('currentWordDate', currentDate);
      return true;
    }

    return false;
  }
  storeUsedWords(usedWords: Set<string>): void {
    localStorage.setItem('usedWords', JSON.stringify(Array.from(usedWords)));
  }

  getStoredUsedWords(): Set<string> | null {
    const storedUsedWords = localStorage.getItem('usedWords');
    return storedUsedWords ? new Set(JSON.parse(storedUsedWords)) : null;
  }
  
  getSuccess(): boolean | null {
    const successValue = localStorage.getItem('success');
    return successValue === 'true';
  }

  storeSuccess(success: boolean): void {
    localStorage.setItem('success', success.toString());
    
    this.bdService.setMinijuegoCompletado('palabra', success);
  }
  
  getGameOver(): boolean | null {
    const gameOverValue = localStorage.getItem('gameOver');
    return gameOverValue === 'true';
  }

  storeGameOver(gameOver: boolean): void {
    localStorage.setItem('gameOver', gameOver.toString());
  }

  getStoredWordDate(): string | null {
    return localStorage.getItem('currentWordDate');
  }

  storeWordDate(date: string): void {
    localStorage.setItem('currentWordDate', date);
  }

  getStoredWord(): string | null {
    return localStorage.getItem('currentWord');
  }

  storeWord(word: string): void {
    localStorage.setItem('currentWord', word);
  }

  getAllWords(): string[] {
    const words: string[] = [];

    for (const category in palabras as any) {
      if (palabras.hasOwnProperty(category)) {
        this.categoryWords = (palabras as any)[category];
        words.push(...this.categoryWords);
      }
    }

    return words;
  }

  generateWord(): string {
    this.storeSuccess(false);
    this.success = false;
    console.log("this.success = false;")
    this.storeGameOver(false);
    this.gameOver = false;
    
  
    const randomCategoryIndex = Math.floor(Math.random() * this.categories.length);
    this.selectedCategory = this.categories[randomCategoryIndex];
    this.categoryWords = (palabras as PalabrasType)[this.selectedCategory];

    

    // Almacenar la palabra actual
    const previousWord = this.word;

    // Generar una nueva palabra diferente a la anterior
    do {
      this.word = this.categoryWords[Math.floor(Math.random() * this.categoryWords.length)];
    } while (this.word === previousWord || this.usedWords.has(this.word));

    this.usedWords.add(this.word);
    this.storeUsedWords(this.usedWords);

    return this.word;
  }

  @ViewChildren('input') inputList!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    this.inputs = this.inputList.toArray();
    this.inputs[0].nativeElement.focus();
    this.inputList.changes.subscribe((changes) => {
      this.inputs = changes.toArray();
      this.inputs[0].nativeElement.focus();
    });
  }

  getRandomSuccessMessage():void {
    const randomIndex = Math.floor(Math.random() * this.successMessages.length);
    this.mensajeSuccess = this.successMessages[randomIndex];
  }
  
  checkWord() {
    const isValidWord = this.categoryWords.includes(this.currentWord.trim());

    if(this.currentWord.trim() == this.word){
      if (!this.success) {
        this.bdService.incrementarPuntos(50);
        this.toast.success('Has ganado 50 puntos!', 'Enhorabuena bebita' );
      }
    
      this.success = true;
      this.gameOver = true;
      this.storeGameOver(true);
      this.storeSuccess(true);
      this.getRandomSuccessMessage();
      this.soundService.playAciertoSound();
    }

    if (isValidWord && !this.allWords.includes(this.currentWord.trim())) {
      this.gameOver = true;
      this.storeGameOver(true);
      this.answers[this.currentRow] = this.currentWord.split('').map((char, index) => ({
        char,
        present: true,
        onPosition: char === this.word[index],
      }));
    } else {
      
      for (let i = 0; i < 5; i++) {
        if (this.word[i] === this.currentWord[i]) {
          this.answers[this.currentRow][i] = {
            char: this.currentWord[i],
            present: true,
            onPosition: true,
          };
        } else if (this.word.includes(this.currentWord[i])) {
          this.answers[this.currentRow][i] = {
            char: this.currentWord[i],
            present: true,
            onPosition: false,
          };
        } else {
          this.answers[this.currentRow][i] = {
            char: this.currentWord[i],
            present: false,
          };
        }
      }
    }

    this.currentRow++;
    this.chars = [];
    if (this.currentRow >= 5) {
      this.storeGameOver(true);
      this.gameOver = true;
    }
  }

  handleInputChange(event: Event) {
    this.currentWord = this.chars.join('');
    this.currentCol = this.chars.length;
    this.currentCol !== 5 ? (this.currentCol = this.chars.length) : (this.currentCol = 0);
    this.inputs[this.currentCol].nativeElement.focus();

    if (this.chars.length === 5) {
      const isValidWord = this.allWords.includes(this.currentWord);

      if (isValidWord) {
        this.checkWord();
      } else {
        this.soundService.playErrorSound();
        this.isWrong = true;
        setTimeout(() => {
          this.isWrong = false;
          this.chars = [];
          this.currentWord = '';
        }, 400);
      }
    }
  }

  handleBackspace(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      this.currentWord = this.currentWord.slice(0, -1);
      this.chars.pop();
      this.currentCol = this.currentWord.length;
      this.inputs[this.currentCol].nativeElement.value = '';
      this.inputs[this.currentCol].nativeElement.focus();
    }
  }

  retry() {
    this.usedWords.clear();
    this.generateWord();
    this.currentWord = '';
    this.answers = [[], [], [], [], []];
    this.currentRow = 0;
    this.currentCol = 0;
    this.rows = [0, 1, 2, 3, 4];
    this.columns = [0, 1, 2, 3, 4];
    this.chars = [];
    this.isWrong = false;
    this.gameOver = false;
  }
}
