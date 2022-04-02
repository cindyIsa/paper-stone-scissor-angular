import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, Observable } from 'rxjs';
import { AppState } from '../models/appState';
import { gameOptions, gameResult, gameSelections } from '../models/game';
import { history } from '../models/history';
import { addNewResult } from '../store/actions/game';
import { drawRate, loseRate, totalPlayed, winRate } from '../store/selectors';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  selections = gameSelections
  constructor( private store:Store<AppState>) { }
  history$ = new Observable<history[]>()
  currentSelectLink = ""
  currentRandomLink = ""
  winrate = 0
  loserate = 0
  drawrate = 0
  totalplayed = 0
  ngOnInit(): void {
   this.history$ =  this.store.select((s)=> s.historys)
   this.store.select(winRate).subscribe(s=> this.winrate = s)
   this.store.select(loseRate).subscribe(s=> this.loserate = s)
   this.store.select(drawRate).subscribe(s=> this.drawrate = s)
   this.store.select(totalPlayed).subscribe(s=> this.totalplayed = s)
  }
  
  startGame = (select:any)=>{
    var currentSelect:history[] = []
    const random =Math.floor( Math.random()*3 )
    var currentResult = {
      userSelect:select.key,
      randomSelect:gameOptions[random],
      result:gameResult.win
    }
    const currentKey = Number(gameOptions[select.key])
    if( currentKey- random == 2 || currentKey - random == -1 ) {
      this.store.dispatch(addNewResult({result:currentResult }))
    }else if(currentKey == random ){
      this.store.dispatch(addNewResult({result:
        {...currentResult,result:gameResult.draw } }))
    }else{
      this.store.dispatch(addNewResult({result:
        {...currentResult,result:gameResult.lose } }))
    }

    this.history$.pipe(first()).subscribe(res=> { currentSelect= res })
    this.currentRandomLink = gameSelections[currentSelect[0].randomSelect]
    this.currentSelectLink = gameSelections[currentSelect[0].userSelect]
    console.log(this.currentSelectLink)
  }

}
