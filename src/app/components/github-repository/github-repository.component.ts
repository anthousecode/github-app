import {Component, ElementRef, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {GithubItem} from '../../store/github/github.reducer';

@Component({
  selector: 'app-github-repository',
  templateUrl: './github-repository.component.html',
  styleUrls: ['./github-repository.component.scss'],
})
export class GithubRepositoryComponent implements OnInit {

  @Input() repository: GithubItem;
  constructor() { }

  ngOnInit(): void {
  }

  public copyToClipboard(input: HTMLInputElement): void {
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand('copy');
  }

}
