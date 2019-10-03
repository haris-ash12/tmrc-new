import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  newsObject: any = {};
  news: any[] = [];

  constructor(private route: ActivatedRoute, private newsService: NewsService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let newsSlug = params.get('slug');
      newsSlug = 'slug=' + newsSlug;

      this.newsService.getByQueryParams(newsSlug).subscribe((news: any) => {
        console.log(news);
        let newsDescription = unescape(news.Description);
        let newsObj = {
          title: news.Title,
          datePosted: news.CreatedDate,
          description: newsDescription,
          featureImage: news.FeatureImage
        };

        this.newsObject = newsObj;

        console.log(newsObj);
      });
    });

    this.newsService.getAll().subscribe((newsResponse: any[]) => {
      for (let i = 0; i < newsResponse.length; i++) {
        let newsObject = {
          title: newsResponse[i].Title,
          datePosted: newsResponse[i].CreatedDate,
          slug: newsResponse[i].Slug
        };
        this.news.push(newsObject);
      }
    });
  }
}
