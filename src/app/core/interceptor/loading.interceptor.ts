import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from "rxjs";
import { inject } from "@angular/core";
import { LoadingService } from "@core/services/loading.service";

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadService =  inject(LoadingService);
  loadService.show();

  return next(req).pipe(
    finalize(()=> {
      loadService.hide();
    }),
  );
};
