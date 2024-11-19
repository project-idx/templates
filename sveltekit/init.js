import {create} from 'sv';

function parseArgs() {
  const args = {};

  process.argv.slice(2).forEach(arg => {
    const [key, value] = arg.split('=');

    if (value === 'true' || value === 'false') {
      args[key] = value === 'true';
    } else {
      args[key] = value;
    }
  });

  return args;
}

const options = parseArgs();

await create(options.name, {...options, types: options.types === 'null' ? null : options.types});
