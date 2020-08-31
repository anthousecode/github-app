import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainContainerComponent} from './containers/main-container/main-container.component';
import {GithubItemContainerComponent} from './containers/github-item-container/github-item-container.component';

const routes: Routes = [
  {
    path: '',
    component: MainContainerComponent
  },
  {
    path: 'repository/:owner/:repo',
    component: GithubItemContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
