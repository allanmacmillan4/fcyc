import { Component, ViewChild } from '@angular/core';

import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { AboutPage } from '../pages/about/about';
import { ConvenorPage } from '../pages/convenor/convenor';
import { MapPage } from '../pages/map/map';
import { CommitteePage } from '../pages/committee/committee';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SchedulePage } from '../pages/schedule/schedule';
import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { ContactPage } from '../pages/contact/contact';
import { InformationPage } from '../pages/information/information';
import { ImportantPage } from '../pages/important/important';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.template.html'
})
export class ConferenceApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageInterface[] = [
    { title: 'Welcome', name: 'TabsPage', component: TabsPage, tabComponent: AboutPage, index: 0, icon: 'md-thumbs-up' },
    { title: 'Schedule', name: 'TabsPage', component: TabsPage, tabComponent: SchedulePage, index: 1, icon: 'md-calendar' },
    { title: 'Speakers', name: 'TabsPage', component: TabsPage, tabComponent: SpeakerListPage, index: 2, icon: 'md-contacts' },
    { title: 'Floorplan', name: 'TabsPage', component: TabsPage, tabComponent: MapPage, index: 3, icon: 'md-map' },
  ];
  loggedOutPages: PageInterface[] = [
    { title: 'Convenor\'s Message', name: 'ConvenorPage', component: ConvenorPage, icon: 'md-text' },
    { title: 'Essential Information', name: 'InformationPage', component: InformationPage, icon: 'md-information-circle' },
    { title: 'Important People', name: 'ImportantPage', component: ImportantPage, icon: 'md-pizza' },
    { title: 'Contact Info', name: 'ContactPage', component: ContactPage, icon: 'md-help' },
    { title: 'The Committee', name: 'CommitteePage', component: CommitteePage, icon: 'ios-people' }
  ];
  rootPage: any;

  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public confData: ConferenceData,
    public storage: Storage,
    public splashScreen: SplashScreen
  ) {

    // Check if the user has already seen the tutorial
    this.storage.get('alks')
      .then((pwdCorrect) => {
        if (pwdCorrect) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = TutorialPage;
        }
        this.platformReady()
      });

    // load the conference data
    confData.load();

    // decide which menu items should be hidden by current login status stored in local storage
    this.enableMenu(true);

  }

  openPage(page: PageInterface) {
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      // Set the root of the nav with params if it's a tab index
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }

  }

  openTutorial() {
    this.nav.setRoot(TutorialPage);
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }
}
