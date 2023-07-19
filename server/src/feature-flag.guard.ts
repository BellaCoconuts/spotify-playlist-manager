import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  mixin,
  NotFoundException,
  Type,
} from '@nestjs/common';
import { FeatureService } from './feature/feature.service';

function FeatureFlagGuard(featureFlagKey: string): Type<CanActivate> {
  @Injectable()
  class Guard implements CanActivate {
    constructor(
      @Inject(FeatureService) private featureService: FeatureService,
    ) {}

    async canActivate(context: ExecutionContext) {
      const isEnabled = await this.featureService.isFeatureEnabled({
        key: featureFlagKey,
      });

      if (!isEnabled) {
        const httpContext = context.switchToHttp();
        const req = httpContext.getRequest();
        throw new NotFoundException(
          `Feature disabled ${req.method} on ${req.url}`,
        );
      }

      return true;
    }
  }

  return mixin(Guard);
}

export { FeatureFlagGuard };
