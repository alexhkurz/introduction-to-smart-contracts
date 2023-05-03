import { serve } from 'aleph/server';
import react from 'aleph/plugins/react';
import unocss from 'aleph/plugins/unocss';
import config from '~/unocss.config.ts';
import denoDeploy from 'aleph/plugins/deploy';
import modules from '~/routes/_export.ts';

serve({
  plugins: [
    denoDeploy({ moduleMain: import.meta.url, modules }),
    react({ ssr: true }),
    unocss(config),
  ],
});
