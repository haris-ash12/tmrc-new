import { Component, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, share } from "rxjs/operators";
import { MenuService } from "../services/menus/menu.service";
import { NewsService } from "../services/news.service";

@Component({
  selector: "app-main-nav",
  templateUrl: "./main-nav.component.html",
  styleUrls: ["./main-nav.component.scss"]
})
export class MainNavComponent implements OnInit {
  menus: any[] = [];
  news: any = [];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    share()
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private menuService: MenuService,
    private newsService: NewsService
  ) {}

  ngOnInit() {
    let parentMenus: any[] = [];

    // call menu service, getData and make logic.
    this.menuService.getAll().subscribe((menus: any[]) => {
      for (let i = 0; i < menus.length; i++) {
        if (menus[i].ParentId === 0) {
          let parentMenuObject = {
            id: menus[i].TitleId,
            titleName: menus[i].TitleName,
            slug: menus[i].Slug,
            priority: menus[i].Priority
          };
          parentMenus.push(parentMenuObject);
        }
      }
      // Log parent menu
      // console.log('Parent Menu ...');
      // console.log(parentMenus);

      for (let i = 0; i < parentMenus.length; i++) {
        let subMenus: any[] = [];
        for (let j = 0; j < menus.length; j++) {
          if (parentMenus[i].id === menus[j].ParentId) {
            // console.log(parentMenus[i].titleName + '......');

            let singleChildObject = {
              id: menus[j].TitleId,
              titleName: menus[j].TitleName,
              slug: menus[j].Slug
            };
            subMenus.push(singleChildObject);

            // console.log('...' + menus[j].TitleName);
          }
        }
        parentMenus[i]["children"] = subMenus;
      }

      // console.log(parentMenus);
      this.menus = parentMenus;
      // console.log(this.menus);

      //------------------------
      this.newsService.getAll().subscribe((newsResponse: any[]) => {
        // console.log(newsResponse);

        for (let i = 0; i < newsResponse.length; i++) {
          let newsObject = {
            title: newsResponse[i].Title,
            datePosted: newsResponse[i].CreatedDate,
            slug: newsResponse[i].Slug
          };
          this.news.push(newsObject);
        }
      });
      //------------------------
    });
  }
}
