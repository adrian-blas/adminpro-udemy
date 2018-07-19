import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-videos-profile',
  templateUrl: './videos-profile.component.html',
  styles: []
})
export class VideosProfileComponent implements OnInit {

  player: YT.Player;
  public id: string = 'GFvxugJrL7M';

  savePlayer (player) {
    this.player = player;
    console.log('video url', player.getVideoUrl());
    console.log('player', player);
  }

  onStateChange(event){
    // console.log('player state', event.data);
  }

  constructor() { }

  ngOnInit() {
  }

}
