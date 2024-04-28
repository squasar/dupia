import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

/*platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => alert(err));*/

platformBrowserDynamic().bootstrapModule(AppModule).then(() => {
  //alert("FOUND ONE::: serviceWorker in navigator : "+('serviceWorker' in navigator)+"    AND    environment.production: "+(environment.production));
  if ('serviceWorker' in navigator && environment.production) {
    navigator.serviceWorker.register('./ngsw-worker.js');
    //alert("FOUND TWO");
  }
}).catch(err => alert(err));