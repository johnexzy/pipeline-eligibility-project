[![Codacy Badge](https://app.codacy.com/project/badge/Grade/8c4afc4a6b0d40f98a4aa2cc32c25404)](https://www.codacy.com/gh/johnexzy/pipeline-eligibility-project/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=johnexzy/pipeline-eligibility-project&amp;utm_campaign=Badge_Grade)

# Frontend Assessment

Build and deploy a very simple frontend app for paginated data, that does the following
1.  Fetches (randomised) data from `https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84` which can be paged by appending `&page=N` where N is the page you want to fetch. E.g appending `&page=1` retrieves the first page, while `&page=4` retrieves the 4th page.
2.  Displays the fetched data in a HTML table with 5 rows (the API only returns 5 records), and allows the user to page next/previous with buttons in the UI
## Note
1.  This comes as a purely HTML/CSS/JS project with [Parcel](https://parceljs.org/docs/) handling build and transpilation. 
2.  We strongly recommend you complete the challenge with this setup, and only use a framework (like Vue/react/Angular) only if absolutely necessary and for which you will be required to provide reasonable justification as part of your evaluation

