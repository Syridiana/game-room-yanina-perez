import { Component, OnInit } from '@angular/core';
import { ScoreI } from 'src/app/Entities/score-interface';
import { ScoresService } from 'src/app/Services/scores.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {
  scoreList?: ScoreI[];

  constructor(private scoreService: ScoresService) {
    this.scoreService.getScores().subscribe(scores => {
      this.scoreList = scores;
    })
   }

  ngOnInit(): void {
  }

}
