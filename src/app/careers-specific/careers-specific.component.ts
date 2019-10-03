import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CareersService } from "../services/careers.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-careers-specific",
  templateUrl: "./careers-specific.component.html",
  styleUrls: ["./careers-specific.component.scss"]
})
export class CareersSpecificComponent implements OnInit {
  career: any = {};
  career_slug: string = "";
  fileToUpload: File = null;

  constructor(
    private route: ActivatedRoute,
    private careersService: CareersService,
    private httpCLient: HttpClient
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let careerSlug = params.get("specificCareer");
      careerSlug = "search=" + careerSlug;

      this.careersService.getByQueryParams(careerSlug).subscribe((careerResponse: any[]) => {
        let description = unescape(careerResponse[0].Description);
        this.career_slug = careerResponse[0].Slug;
        let careerObject = {
          title: careerResponse[0].JobTitle,
          position: careerResponse[0].NoOfPosition,
          cities: careerResponse[0].Cities,
          type: careerResponse[0].JobType,
          description: description,
          slug: careerResponse[0].Slug
        };

        this.career = careerObject;
        console.log(this.career);
      });
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    // console.log(this.fileToUpload);
  }

  save(f) {
    const formData: FormData = new FormData();
    formData.append("", this.fileToUpload, this.fileToUpload.name);
    formData.append("Name", f.value.name);
    formData.append("Email", f.value.email);
    formData.append("PhoneNo", f.value.phone);
    formData.append("CoverLetter", f.value.coverLetter);
    formData.append("slug", this.career_slug);

    f.reset();

    console.log("Uploading form data ...");

    this.httpCLient
      .post("http://web.tmrc1.ga/api/submitapplication", formData)
      .subscribe(res => console.log(res));
  }
}
