import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-linguineo-conversation',
  templateUrl: './linguineo-conversation.component.html',
  styleUrls: ['./linguineo-conversation.component.scss'],
  standalone: false
})
export class LinguineoConversationComponent implements OnInit, OnDestroy {

  @Input() accessToken!: string;

  ngOnInit(): void {
    this.addLinguineoConversationWebComponentListeners();
  }

  private addLinguineoConversationWebComponentListeners(): void {
    window.addEventListener('linguineo:end', this.onConversationFinished);
  }

  private removeLinguineoConversationWebComponentListeners(): void {
    window.removeEventListener('linguineo:end', this.onConversationFinished);
  }

  private onConversationFinished = (e: any): void => {
    console.log('Conversation finished', {e});
  }

  ngOnDestroy(): void {
    this.removeLinguineoConversationWebComponentListeners();
  }

}
