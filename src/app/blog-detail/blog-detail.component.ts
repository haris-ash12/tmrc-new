import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { HelperValuesService } from '../services/helper-values.service';
import { BlogBySlugService } from '../services/blog-by-slug.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  yearsList: any[] = [];
  productsList: any[] = [];
  blog: any = {};

  constructor(
    private productsService: ProductsService,
    private blogSlugService: BlogBySlugService,
    private route: ActivatedRoute,
    private router: Router,
    private helperService: HelperValuesService
  ) {}

  ngOnInit() {
    // --- YEARS ---
    // Create constructor function for years list.
    function Years() {
      let startYear = 2017;
      let currentYear = new Date().getFullYear();
      this.list = [2017];

      let loopCount = currentYear - startYear;

      for (let i = 0; i < loopCount; i++) {
        startYear = startYear + 1;
        this.list.push(startYear);
      }
    }

    const years = new Years();
    // Get list and display them in reverse order.
    this.yearsList = years.list.reverse();

    // --- PRODUCTS ---
    this.productsService.getAll().subscribe((productsResponse: any[]) => {
      for (let i = 0; i < productsResponse.length; i++) {
        let productObject = {
          title: productsResponse[i].CatName,
          id: productsResponse[i].Id
        };
        this.productsList.push(productObject);
      }
    });

    let slugValue = this.route.snapshot.paramMap.get('slug');
    let slug = 'slug=' + slugValue;
    this.blogSlugService.getByQueryParams(slug).subscribe((blogResponse: any) => {
      let description = unescape(blogResponse.Description);
      this.blog = {
        title: blogResponse.Title,
        description: description,
        datePosted: blogResponse.CreatedDate,
        slug: blogResponse.slug,
        productCategory: blogResponse.CatName
      };
      console.log(description);
    });
  }

  productClicked(productId) {
    this.helperService.productId = productId;
    this.router.navigate(['/blog']);
  }

  yearsClicked(year) {
    this.helperService.yearId = year;
    this.router.navigate(['/blog']);
  }
}

// Create a blog service to get specific blogs.
// endpoint: http://webapp.tmrc.ga/api/getblogscategorybyslug?countrycode=pk&slug=" here comes the slug"
// Get response object
// Display it in the template.
