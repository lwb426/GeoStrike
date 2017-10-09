import { Component, Inject, Input, OnInit } from '@angular/core';
import { Team } from '../../../types';
import { Router } from '@angular/router';
import { AuthorizationMiddleware } from '../../../core/configured-apollo/network/authorization-middleware';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'you-win-dialog',
  templateUrl: './you-win-dialog.component.html',
  styleUrls: ['./you-win-dialog.component.scss']
})
export class YouWinDialogComponent implements OnInit {

  losingTeam: Team;

  constructor(private router: Router,
              private self : MdDialogRef<YouWinDialogComponent>,
              @Inject(MD_DIALOG_DATA) data: {losingTeam: Team}) {
    this.losingTeam = data.losingTeam;
  }

  ngOnInit() {
    document.onclick = undefined;
    document.exitPointerLock();
  }

  exitGame() {
    this.self.close();
    AuthorizationMiddleware.removeToken();
    this.router.navigateByUrl('/');
  }
}
