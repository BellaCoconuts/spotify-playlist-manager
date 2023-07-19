import { Injectable, Logger } from '@nestjs/common';
import { FeatureEnabled } from './FeatureEnabled.interface';
import { AppConfigurationClient } from '@azure/app-configuration';

@Injectable()
export class FeatureService {
  private readonly logger = new Logger(FeatureService.name);
  private readonly client: AppConfigurationClient;

  constructor() {
    this.client = new AppConfigurationClient(
      'Endpoint=https://spotify-app-configurator.azconfig.io;Id=1ve2-lo-s0:ZvT8nSOVLwdzr9wtVnx/;Secret=kzUFp/5MlXd3iOFn36D6gGAH9BFNJZA7uBPjGmnQgY4=',
    );
  }

  async isFeatureEnabled({ key }: FeatureEnabled): Promise<boolean> {
    const result = await this.client.getConfigurationSetting({
      key: `.appconfig.featureflag/${key.toString().trim()}`,
    });

    if (result?.value) {
      const isFeatureEnabled = JSON.parse(result.value).enabled;
      this.logger.log(`feature result for ${key} is ${isFeatureEnabled}`);
      return isFeatureEnabled;
    } else {
      this.logger.error('Unable to parse log result');
      return false;
    }
  }
}
