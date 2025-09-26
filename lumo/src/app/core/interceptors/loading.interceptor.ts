import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';

let activeRequests = 0;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  activeRequests++;
  
  // You can emit loading state here if you have a loading service
  // loadingService.setLoading(true);

  return next(req).pipe(
    finalize(() => {
      activeRequests--;
      
      if (activeRequests === 0) {
        // loadingService.setLoading(false);
      }
    })
  );
};
